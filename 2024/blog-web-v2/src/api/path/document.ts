import {Get, Post} from "../server";

export interface DocumentResponsePageData {
    countId: null;
    current: number;
    maxLimit: null;
    optimizeCountSql: boolean;
    orders: string[];
    pages: number;
    records: DocumentResponseRecord[];
    searchCount: boolean;
    size: number;
    total: number;
}

export interface DocumentResponseRecord {
    author: string;
    author_avatar: string;
    category: string;
    cover: string;
    create_time: string;
    description: string;
    document_url: string;
    id: number;
    online: number;
    subcategory: string;
    title: string;
    update_time: string;
    views: number;
}

export interface DocumentRequestVO {
    page_num: number;
    page_size: number;
    category_id: number;
}

export const acquireDocument = (param: DocumentRequestVO) => {
    return Post("/document/acquire",
        {
            "page_num": param.page_num,
            "page_size": param.page_size,
            "category_id": param.category_id
        });
}

export const acquireDocumentById = (id: number) => {
    return Get(`/document/acquire/${id}`);
}

export const acquireLatelyDocument = (num: number) => {
    return Get(`/document/acquire/lately/${num}`);
}

export const addView = (id: number) => {
    return Post(`/document/add/view/${id}`,{});
}

export const documentApi = {
    acquireDocument,
    acquireDocumentById,
    acquireLatelyDocument,
    addView
}