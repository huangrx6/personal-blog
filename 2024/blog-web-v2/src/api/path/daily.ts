import {Post} from "../server";

export interface DailyVO {
    code: number;
    data: DailyResponsePageData;
    message: string;
}

export interface DailyResponsePageData {
    countId: null;
    current: number;
    maxLimit: null;
    optimizeCountSql: boolean;
    orders: string[];
    pages: number;
    records: DailyRecords[];
    searchCount: boolean;
    size: number;
    total: number;
}

export interface DailyRecords {
    [date: string]: Array<DailyRecord>
}

export interface DailyRecord {
    content: string;
    create_time: string;
    id: number;
    tittle: string;
    illustration: string;
}

export interface DailyRequestVO {
    page_num: number;
    page_size: number;
}

export const acquireDaily = (param: DailyRequestVO) => {
    return Post(
        "/timeline/acquire/pull",
        {
            "page_num": param.page_num,
            "page_size": param.page_size
        }
    );
}

export const dailyApi = {
    acquireDaily
}