export declare function searchTenders(keyword: string, onlyActive: boolean, limit: number): Promise<string>;
export declare function searchByCategory(categoryCode: string, keyword: string | undefined, limit: number): Promise<string>;
export declare function getTenderDetail(unitId: string, jobNumber: string): Promise<string>;
export declare function listByDate(date: string, typeFilter: string | undefined, limit: number): Promise<string>;
export declare function listByUnit(unitId: string, limit: number): Promise<string>;
export declare function getCategories(type: string, search: string | undefined): Promise<string>;
