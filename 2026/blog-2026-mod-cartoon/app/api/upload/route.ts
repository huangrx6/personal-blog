import { auth } from '@/lib/auth/config';
import { prisma } from "@/lib/db/prisma";
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';

// Initialize S3 Client (R2)
const s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
});

export async function POST(request: Request) {
    try {
        // 1. Authenticate Request
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 2. Parsed Form Data
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const category = (formData.get("category") as string) || "general"; // Default to general

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // 3. Generate Unique Filename (Timestamp + Normalized Name)
        // sanitize filename to avoid issues
        const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const fileName = `${Date.now()}-${sanitizedName}`;
        const buffer = Buffer.from(await file.arrayBuffer());

        // 4. Upload to Cloudflare R2
        await s3Client.send(
            new PutObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME,
                Key: fileName,
                Body: buffer,
                ContentType: file.type,
            })
        );

        // 5. Return Public URL
        // Ensure R2_PUBLIC_URL does not have a trailing slash
        const publicUrlBase = process.env.R2_PUBLIC_URL?.replace(/\/$/, '');
        const imageUrl = `${publicUrlBase}/${fileName}`;

        // 6. Save to Database (New)
        try {
            await prisma.media.create({
                data: {
                    filename: fileName,
                    url: imageUrl,
                    type: file.type,
                    size: file.size,
                    category: category,
                    // We could inspect image dimensions here if we used 'sharp' or similar, but for now skip
                }
            });
        } catch (dbError) {
            console.error("Failed to save media to DB:", dbError);
            // Continue anyway, as upload succeeded
        }

        return NextResponse.json({ url: imageUrl });

    } catch (error) {
        console.error('R2 Upload Error:', error);
        return NextResponse.json(
            { error: 'Upload failed', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
