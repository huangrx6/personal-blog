"use client";

import { cn } from '@/lib/utils/cn';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './code-block';

interface MarkdownRendererProps {
    content: string;
    className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
    return (
        <div className={cn("prose prose-lg max-w-none", className)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    // Headings with neo-brutal style and IDs for TOC
                    h1: ({ children }) => {
                        const text = String(children);
                        const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-');
                        return (
                            <h1 id={id} className="text-4xl font-black tracking-tight mb-6 mt-10 first:mt-0 border-b-4 border-black pb-3 scroll-mt-24">
                                {children}
                            </h1>
                        );
                    },
                    h2: ({ children }) => {
                        const text = String(children);
                        const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-');
                        return (
                            <h2 id={id} className="text-3xl font-black tracking-tight mb-4 mt-8 scroll-mt-24">
                                {children}
                            </h2>
                        );
                    },
                    h3: ({ children }) => {
                        const text = String(children);
                        const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-');
                        return (
                            <h3 id={id} className="text-2xl font-bold mb-3 mt-6 scroll-mt-24">
                                {children}
                            </h3>
                        );
                    },
                    h4: ({ children }) => {
                        const text = String(children);
                        const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-');
                        return (
                            <h4 id={id} className="text-xl font-bold mb-2 mt-4 scroll-mt-24">
                                {children}
                            </h4>
                        );
                    },

                    // Paragraphs - using div to avoid hydration errors when nesting figures/images
                    p: ({ children }) => (
                        <div className="text-lg leading-relaxed mb-4 text-black/80">
                            {children}
                        </div>
                    ),

                    // Links with underline animation
                    a: ({ href, children }) => (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary font-bold underline underline-offset-4 decoration-2 decoration-primary/30 hover:decoration-primary transition-colors"
                        >
                            {children}
                        </a>
                    ),

                    // Blockquotes with neo-brutal style
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-primary bg-primary/5 pl-6 py-4 my-6 rounded-r-xl italic text-black/70">
                            {children}
                        </blockquote>
                    ),

                    // Code blocks - Using CodeBlock component with line numbers and copy
                    pre: ({ children }) => {
                        // Extract the code content and language from children
                        const codeElement = children as React.ReactElement<{ className?: string; children?: string }>;
                        const codeProps = codeElement?.props;
                        const className = codeProps?.className || '';
                        const language = className.replace('language-', '') || 'text';
                        const codeContent = codeProps?.children || '';

                        return (
                            <CodeBlock language={language}>
                                {String(codeContent)}
                            </CodeBlock>
                        );
                    },
                    code: ({ className, children }) => {
                        // Only handle inline code here, block code is handled by pre
                        const isInline = !className;
                        if (isInline) {
                            return (
                                <code className="bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono text-[0.9em] border border-primary/20 font-semibold">
                                    {children}
                                </code>
                            );
                        }
                        // Block code - return as-is, will be wrapped by pre
                        return <>{children}</>;
                    },

                    // Lists
                    ul: ({ children }) => (
                        <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                            {children}
                        </ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
                            {children}
                        </ol>
                    ),
                    li: ({ children }) => (
                        <li className="text-lg text-black/80">
                            {children}
                        </li>
                    ),

                    // Tables with neo-brutal style
                    table: ({ children }) => (
                        <div className="overflow-x-auto my-6">
                            <table className="w-full border-4 border-black rounded-xl overflow-hidden">
                                {children}
                            </table>
                        </div>
                    ),
                    thead: ({ children }) => (
                        <thead className="bg-primary text-white">
                            {children}
                        </thead>
                    ),
                    th: ({ children }) => (
                        <th className="px-4 py-3 text-left font-bold border-b-4 border-black">
                            {children}
                        </th>
                    ),
                    td: ({ children }) => (
                        <td className="px-4 py-3 border-b border-black/10">
                            {children}
                        </td>
                    ),

                    // Horizontal rule
                    hr: () => (
                        <hr className="border-t-4 border-black my-8" />
                    ),

                    // Images
                    img: ({ src, alt }) => (
                        <figure className="my-6">
                            <img
                                src={src}
                                alt={alt || ''}
                                className="w-full rounded-2xl border-4 border-black shadow-neo"
                            />
                            {alt && (
                                <figcaption className="text-center text-sm text-black/50 mt-2 font-medium">
                                    {alt}
                                </figcaption>
                            )}
                        </figure>
                    ),

                    // Strong and emphasis
                    strong: ({ children }) => (
                        <strong className="font-black text-black">
                            {children}
                        </strong>
                    ),
                    em: ({ children }) => (
                        <em className="italic text-black/80">
                            {children}
                        </em>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
