#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { searchTenders, getTenderDetail, listByDate, listByUnit, getCategories, searchByCategory, } from "./tender-service.js";
const server = new McpServer({
    name: "taiwan-tender-mcp",
    version: "1.0.0",
});
// 工具 1: 搜尋標案（依關鍵字）
server.tool("search_tenders", "搜尋台灣政府標案，依關鍵字搜尋標案名稱。回傳招標中的標案列表，包含案名、機關、預算、截止日期等資訊。", {
    keyword: z.string().describe("搜尋關鍵字，例如：裝修、軟體、設備"),
    only_active: z.boolean().optional().default(true).describe("是否只顯示招標中的案件（預設 true）"),
    limit: z.number().optional().default(20).describe("回傳筆數上限（預設 20，最大 50）"),
}, async ({ keyword, only_active, limit }) => {
    try {
        const result = await searchTenders(keyword, only_active ?? true, Math.min(limit ?? 20, 50));
        return { content: [{ type: "text", text: result }] };
    }
    catch (error) {
        return { content: [{ type: "text", text: `搜尋失敗: ${error.message}` }] };
    }
});
// 工具 2: 依分類搜尋
server.tool("search_by_category", "依標的分類代碼搜尋標案。例如：5174（地板及牆面貼磚工程）、8672（工程服務）、452（計算機及其零件）", {
    category_code: z.string().describe("標的分類代碼，例如：5174、8672、452"),
    keyword: z.string().optional().describe("額外的關鍵字過濾（可選）"),
    limit: z.number().optional().default(20).describe("回傳筆數上限（預設 20）"),
}, async ({ category_code, keyword, limit }) => {
    try {
        const result = await searchByCategory(category_code, keyword, limit ?? 20);
        return { content: [{ type: "text", text: result }] };
    }
    catch (error) {
        return { content: [{ type: "text", text: `搜尋失敗: ${error.message}` }] };
    }
});
// 工具 3: 取得標案詳情
server.tool("get_tender_detail", "取得單一標案的詳細資訊，包含機關資料、採購資料、招標資料、領投開標資訊等完整內容。", {
    unit_id: z.string().describe("機關代碼，例如：3.9.22"),
    job_number: z.string().describe("標案案號，例如：T-114165"),
}, async ({ unit_id, job_number }) => {
    try {
        const result = await getTenderDetail(unit_id, job_number);
        return { content: [{ type: "text", text: result }] };
    }
    catch (error) {
        return { content: [{ type: "text", text: `查詢失敗: ${error.message}` }] };
    }
});
// 工具 4: 依日期列出標案
server.tool("list_tenders_by_date", "列出指定日期的所有標案公告。日期格式為 YYYYMMDD，例如：20260130", {
    date: z.string().describe("日期，格式 YYYYMMDD，例如：20260130"),
    type_filter: z.string().optional().describe("公告類型過濾，例如：公開招標公告、決標公告"),
    limit: z.number().optional().default(30).describe("回傳筆數上限（預設 30）"),
}, async ({ date, type_filter, limit }) => {
    try {
        const result = await listByDate(date, type_filter, limit ?? 30);
        return { content: [{ type: "text", text: result }] };
    }
    catch (error) {
        return { content: [{ type: "text", text: `查詢失敗: ${error.message}` }] };
    }
});
// 工具 5: 依機關列出標案
server.tool("list_tenders_by_unit", "列出指定機關的所有標案。需提供機關代碼（unit_id）。", {
    unit_id: z.string().describe("機關代碼，例如：3.9.22（國立清華大學）"),
    limit: z.number().optional().default(20).describe("回傳筆數上限（預設 20）"),
}, async ({ unit_id, limit }) => {
    try {
        const result = await listByUnit(unit_id, limit ?? 20);
        return { content: [{ type: "text", text: result }] };
    }
    catch (error) {
        return { content: [{ type: "text", text: `查詢失敗: ${error.message}` }] };
    }
});
// 工具 6: 列出分類
server.tool("list_categories", "列出政府採購標的分類代碼。可指定類型（工程類、財物類、勞務類）或搜尋關鍵字。", {
    type: z.enum(["all", "engineering", "goods", "services"]).optional().default("all")
        .describe("分類類型：all（全部）、engineering（工程類）、goods（財物類）、services（勞務類）"),
    search: z.string().optional().describe("搜尋分類名稱關鍵字，例如：地板、電腦、建築"),
}, async ({ type, search }) => {
    try {
        const result = await getCategories(type ?? "all", search);
        return { content: [{ type: "text", text: result }] };
    }
    catch (error) {
        return { content: [{ type: "text", text: `查詢失敗: ${error.message}` }] };
    }
});
// 啟動伺服器
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Taiwan Tender MCP server running on stdio");
}
main().catch((error) => {
    console.error("Server fatal error:", error);
    process.exit(1);
});
