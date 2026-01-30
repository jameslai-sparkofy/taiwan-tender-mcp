import axios from "axios";
const API_BASE = "https://pcc-api.openfun.app/api";
// 分類資料（內嵌常用分類）
const CATEGORIES = [
    // 工程類 - 裝修相關
    { code: "5174", type: "工程類", name: "地板及牆面貼磚工程" },
    { code: "5175", type: "工程類", name: "其他鋪地板、牆面及壁紙工程" },
    { code: "5177", type: "工程類", name: "室內裝潢工程" },
    { code: "5179", type: "工程類", name: "其他裝修工程" },
    { code: "5171", type: "工程類", name: "玻璃裝潢及窗戶玻璃裝修工程" },
    { code: "5172", type: "工程類", name: "粉刷工程" },
    { code: "5173", type: "工程類", name: "油漆工程" },
    { code: "5176", type: "工程類", name: "木材及金屬之加工及木作" },
    { code: "5178", type: "工程類", name: "裝飾品裝潢工程" },
    // 工程類 - 安裝相關
    { code: "5161", type: "工程類", name: "暖氣、通風及空調工程" },
    { code: "5162", type: "工程類", name: "水管及排水設施鋪設工程" },
    { code: "5163", type: "工程類", name: "瓦斯安裝工程" },
    { code: "5164", type: "工程類", name: "電力工程" },
    { code: "5165", type: "工程類", name: "絕緣工程" },
    { code: "5166", type: "工程類", name: "圍籬及護欄工程" },
    { code: "5169", type: "工程類", name: "其他安裝工程" },
    // 工程類 - 建築相關
    { code: "5121", type: "工程類", name: "單雙棟式住宅建築工程" },
    { code: "5122", type: "工程類", name: "多棟式住宅建築工程" },
    { code: "5123", type: "工程類", name: "倉儲及工業建築工程" },
    { code: "5124", type: "工程類", name: "商用建築工程" },
    { code: "5125", type: "工程類", name: "公共娛樂建築工程" },
    { code: "5126", type: "工程類", name: "旅館餐廳及相關建築工程" },
    { code: "5127", type: "工程類", name: "教育用建築工程" },
    { code: "5128", type: "工程類", name: "健身用建築工程" },
    { code: "5129", type: "工程類", name: "其他用途建築工程" },
    // 工程類 - 土木相關
    { code: "5131", type: "工程類", name: "快速道路、街道、馬路、鐵路及機場跑道" },
    { code: "5132", type: "工程類", name: "橋樑、高架快速道路、隧道及地鐵" },
    { code: "5133", type: "工程類", name: "水道、海港、水壩及其他水利工程" },
    { code: "5134", type: "工程類", name: "長程管線、通訊及電線纜" },
    { code: "5135", type: "工程類", name: "地區性管線及電纜、輔助性工程" },
    { code: "5137", type: "工程類", name: "運動及娛樂工程" },
    { code: "5139", type: "工程類", name: "其他土木工程" },
    // 工程類 - 基地相關
    { code: "5111", type: "工程類", name: "工址調查工程" },
    { code: "5112", type: "工程類", name: "拆除工程" },
    { code: "5113", type: "工程類", name: "基地整建及清理工程" },
    { code: "5114", type: "工程類", name: "開挖及土方工程" },
    { code: "5116", type: "工程類", name: "鷹架工程" },
    // 工程類 - 專業相關
    { code: "5151", type: "工程類", name: "基礎工程（含打樁）" },
    { code: "5152", type: "工程類", name: "鑽井工程" },
    { code: "5153", type: "工程類", name: "屋頂及防水工程" },
    { code: "5154", type: "工程類", name: "混凝土工程" },
    { code: "5155", type: "工程類", name: "鋼筋之灣紮及組立" },
    { code: "5156", type: "工程類", name: "泥水工程" },
    { code: "5159", type: "工程類", name: "其他專業工程" },
    // 勞務類 - 技術服務
    { code: "8671", type: "勞務類", name: "建築服務" },
    { code: "8672", type: "勞務類", name: "工程服務" },
    { code: "8673", type: "勞務類", name: "綜合工程服務" },
    { code: "8674", type: "勞務類", name: "都市計劃及景觀建築服務" },
    { code: "8675", type: "勞務類", name: "與科技工程有關之顧問服務" },
    { code: "8676", type: "勞務類", name: "技術檢定與分析服務" },
    // 勞務類 - 施工服務
    { code: "521", type: "勞務類", name: "建築施工服務" },
    { code: "522", type: "勞務類", name: "土木工程施工服務" },
    // 勞務類 - 電腦服務
    { code: "841", type: "勞務類", name: "與電腦硬體安裝有關之顧問服務" },
    { code: "842", type: "勞務類", name: "軟體執行服務" },
    { code: "843", type: "勞務類", name: "資料處理服務" },
    { code: "844", type: "勞務類", name: "資料庫服務" },
    { code: "845", type: "勞務類", name: "辦公室機器及設備維修服務" },
    { code: "849", type: "勞務類", name: "其他電腦服務" },
    // 勞務類 - 其他
    { code: "865", type: "勞務類", name: "管理顧問服務" },
    { code: "866", type: "勞務類", name: "與管理顧問有關之服務" },
    { code: "874", type: "勞務類", name: "建築物清潔服務" },
    { code: "886", type: "勞務類", name: "附帶於金屬產品、機械及設備維修之服務" },
    { code: "97", type: "勞務類", name: "其他服務" },
    // 財物類 - 電腦設備
    { code: "451", type: "財物類", name: "辦公室及會計機器" },
    { code: "452", type: "財物類", name: "計算機及其零件與配件" },
    // 財物類 - 電力設備
    { code: "461", type: "財物類", name: "電動機、發電機、變壓器" },
    { code: "462", type: "財物類", name: "電力傳輸、控制設備" },
    { code: "469", type: "財物類", name: "其他電力設備及零件" },
    // 財物類 - 通訊設備
    { code: "47", type: "財物類", name: "收音機、電視、通訊器材及儀器" },
    // 財物類 - 醫療設備
    { code: "481", type: "財物類", name: "醫療、外科及矯形設備" },
    { code: "482", type: "財物類", name: "測量、檢查、航行儀器" },
    // 財物類 - 建材
    { code: "15", type: "財物類", name: "石材、砂及泥土" },
    { code: "373", type: "財物類", name: "耐火產品及結構性非耐火黏土產品" },
    { code: "375", type: "財物類", name: "混凝土、水泥及灰泥商品" },
    { code: "376", type: "財物類", name: "供製碑或建築用石及其製品" },
    { code: "381", type: "財物類", name: "傢具" },
    { code: "387", type: "財物類", name: "建築預製結構" },
    // 財物類 - 運輸設備
    { code: "491", type: "財物類", name: "機動車、拖車、半拖車" },
    { code: "493", type: "財物類", name: "船舶" },
    { code: "496", type: "財物類", name: "航空器、太空船" },
];
// 可投標的公告類型
const ACTIVE_TENDER_TYPES = [
    "公開招標公告",
    "公開招標更正公告",
    "選擇性招標(建立合格廠商名單)公告",
    "選擇性招標(個案)公告",
    "經公開評選或公開徵求之限制性招標公告",
    "經公開評選或公開徵求之限制性招標更正公告",
    "公開取得報價單或企劃書公告",
    "公開取得報價單或企劃書更正公告",
];
// 解析民國日期
function parseROCDate(dateStr) {
    if (!dateStr || dateStr === "-")
        return null;
    const match = dateStr.match(/(\d+)\/(\d+)\/(\d+)(?:\s+(\d+):(\d+))?/);
    if (!match)
        return null;
    const year = parseInt(match[1]) + 1911;
    const month = parseInt(match[2]) - 1;
    const day = parseInt(match[3]);
    const hour = match[4] ? parseInt(match[4]) : 0;
    const minute = match[5] ? parseInt(match[5]) : 0;
    return new Date(year, month, day, hour, minute);
}
// 計算剩餘天數
function getRemainingDays(deadline) {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    const totalHours = diff / (1000 * 60 * 60);
    const days = Math.floor(totalHours / 24);
    if (diff < 0)
        return "已截止";
    if (days === 0 && totalHours > 0)
        return "今日截止";
    return `${days} 天`;
}
// 從詳細資料中提取欄位
function findInfo(history, keywords) {
    for (const rec of history) {
        if (!rec || !rec.detail)
            continue;
        const detail = rec.detail;
        const keys = Object.keys(detail);
        for (const kw of keywords) {
            const foundKey = keys.find((k) => k.includes(kw));
            if (foundKey && detail[foundKey] && !["-", "", "無"].includes(String(detail[foundKey]).trim())) {
                return String(detail[foundKey]).trim();
            }
        }
    }
    return "-";
}
// 搜尋標案
export async function searchTenders(keyword, onlyActive, limit) {
    const encodedKeyword = encodeURIComponent(keyword);
    const url = `${API_BASE}/searchbytitle?query=${encodedKeyword}`;
    const response = await axios.get(url, { timeout: 15000 });
    const records = response.data.records;
    if (!records || records.length === 0) {
        return `找不到與「${keyword}」相關的標案。`;
    }
    // 過濾招標中的案件
    let filtered = records;
    if (onlyActive) {
        filtered = records.filter((r) => ACTIVE_TENDER_TYPES.includes(r.brief.type));
    }
    // 去重（相同案號保留最新）
    const uniqueMap = new Map();
    filtered.forEach((rec) => {
        const key = `${rec.unit_id}_${rec.job_number}`;
        const existing = uniqueMap.get(key);
        if (!existing || rec.date > existing.date)
            uniqueMap.set(key, rec);
    });
    const sorted = Array.from(uniqueMap.values())
        .sort((a, b) => b.date - a.date)
        .slice(0, limit);
    if (sorted.length === 0) {
        return `找不到與「${keyword}」相關且招標中的案件。`;
    }
    // 建立表格
    let table = `### 「${keyword}」搜尋結果（共 ${sorted.length} 筆）\n\n`;
    table += "| 公告日 | 類型 | 標案名稱 | 機關 | 分類 |\n";
    table += "| :--- | :--- | :--- | :--- | :--- |\n";
    for (const t of sorted) {
        const dateStr = String(t.date);
        const formattedDate = `${dateStr.slice(0, 4)}/${dateStr.slice(4, 6)}/${dateStr.slice(6, 8)}`;
        const title = t.brief.title.length > 40 ? t.brief.title.slice(0, 40) + "..." : t.brief.title;
        const category = t.brief.category || "-";
        table += `| ${formattedDate} | ${t.brief.type} | ${title} | ${t.unit_name} | ${category} |\n`;
    }
    table += `\n> 使用 \`get_tender_detail\` 查詢詳細資訊，需提供 unit_id 和 job_number`;
    table += `\n> 資料來源：PCC-API (政府電子採購網)`;
    return table;
}
// 依分類搜尋
export async function searchByCategory(categoryCode, keyword, limit) {
    // 找出分類名稱
    const category = CATEGORIES.find((c) => c.code === categoryCode);
    const categoryName = category ? category.name : categoryCode;
    // 使用分類名稱作為關鍵字搜尋
    const searchKeyword = keyword || categoryName;
    const encodedKeyword = encodeURIComponent(searchKeyword);
    const url = `${API_BASE}/searchbytitle?query=${encodedKeyword}`;
    const response = await axios.get(url, { timeout: 15000 });
    const records = response.data.records;
    if (!records || records.length === 0) {
        return `找不到分類「${categoryCode} - ${categoryName}」相關的標案。`;
    }
    // 過濾符合分類代碼的案件
    const filtered = records.filter((r) => {
        const cat = r.brief.category || "";
        return cat.includes(categoryCode) || cat.includes(categoryName);
    });
    const sorted = filtered.slice(0, limit);
    if (sorted.length === 0) {
        return `找不到分類代碼「${categoryCode}」的標案。建議使用 search_tenders 搜尋關鍵字「${categoryName}」`;
    }
    let table = `### 分類「${categoryCode} - ${categoryName}」搜尋結果（共 ${sorted.length} 筆）\n\n`;
    table += "| 公告日 | 類型 | 標案名稱 | 機關 |\n";
    table += "| :--- | :--- | :--- | :--- |\n";
    for (const t of sorted) {
        const dateStr = String(t.date);
        const formattedDate = `${dateStr.slice(0, 4)}/${dateStr.slice(4, 6)}/${dateStr.slice(6, 8)}`;
        const title = t.brief.title.length > 45 ? t.brief.title.slice(0, 45) + "..." : t.brief.title;
        table += `| ${formattedDate} | ${t.brief.type} | ${title} | ${t.unit_name} |\n`;
    }
    return table;
}
// 取得標案詳情
export async function getTenderDetail(unitId, jobNumber) {
    const url = `${API_BASE}/tender?unit_id=${encodeURIComponent(unitId)}&job_number=${encodeURIComponent(jobNumber)}`;
    const response = await axios.get(url, { timeout: 10000 });
    const history = response.data.records;
    if (!history || history.length === 0) {
        return `找不到標案：unit_id=${unitId}, job_number=${jobNumber}`;
    }
    // 提取各項資訊
    const title = findInfo(history, ["標案名稱", "案名"]);
    const caseId = findInfo(history, ["標案案號", "案號"]);
    const unitName = findInfo(history, ["機關名稱"]);
    const unitAddr = findInfo(history, ["機關地址"]);
    const contact = findInfo(history, ["聯絡人"]);
    const phone = findInfo(history, ["聯絡電話"]);
    const email = findInfo(history, ["電子郵件"]);
    const category = findInfo(history, ["標的分類"]);
    const budget = findInfo(history, ["預算金額"]);
    const budgetPublic = findInfo(history, ["預算金額是否公開"]);
    const procMethod = findInfo(history, ["招標方式"]);
    const awardMethod = findInfo(history, ["決標方式"]);
    const status = findInfo(history, ["招標狀態"]);
    const publishDate = findInfo(history, ["公告日"]);
    const deadline = findInfo(history, ["截止投標"]);
    const openTime = findInfo(history, ["開標時間"]);
    const openPlace = findInfo(history, ["開標地點"]);
    const deposit = findInfo(history, ["是否須繳納押標金"]);
    const location = findInfo(history, ["履約地點"]);
    const period = findInfo(history, ["履約期限"]);
    const qualification = findInfo(history, ["廠商資格摘要"]);
    // 計算剩餘天數
    let remainingDays = "-";
    const deadlineDate = parseROCDate(deadline);
    if (deadlineDate) {
        remainingDays = getRemainingDays(deadlineDate);
    }
    // 取得連結
    let link = "-";
    const recWithUrl = history.find((r) => r.detail && r.detail.url);
    if (recWithUrl) {
        link = recWithUrl.detail.url;
        if (link.startsWith("/")) {
            link = `https://web.pcc.gov.tw${link}`;
        }
    }
    // 格式化輸出
    let output = `## ${title}\n\n`;
    output += `### 基本資訊\n`;
    output += `| 項目 | 內容 |\n`;
    output += `| :--- | :--- |\n`;
    output += `| 標案案號 | ${caseId} |\n`;
    output += `| 標的分類 | ${category} |\n`;
    output += `| 預算金額 | ${budget} ${budgetPublic === '是' ? '(公開)' : ''} |\n`;
    output += `| 招標方式 | ${procMethod} |\n`;
    output += `| 決標方式 | ${awardMethod} |\n`;
    output += `| 招標狀態 | ${status} |\n`;
    output += `\n### 時程\n`;
    output += `| 項目 | 內容 |\n`;
    output += `| :--- | :--- |\n`;
    output += `| 公告日 | ${publishDate} |\n`;
    output += `| 截止投標 | ${deadline} |\n`;
    output += `| **剩餘天數** | **${remainingDays}** |\n`;
    output += `| 開標時間 | ${openTime} |\n`;
    output += `| 開標地點 | ${openPlace} |\n`;
    output += `| 押標金 | ${deposit} |\n`;
    output += `\n### 機關資訊\n`;
    output += `| 項目 | 內容 |\n`;
    output += `| :--- | :--- |\n`;
    output += `| 機關名稱 | ${unitName} |\n`;
    output += `| 機關地址 | ${unitAddr} |\n`;
    output += `| 聯絡人 | ${contact} |\n`;
    output += `| 電話 | ${phone} |\n`;
    output += `| Email | ${email} |\n`;
    output += `\n### 履約資訊\n`;
    output += `| 項目 | 內容 |\n`;
    output += `| :--- | :--- |\n`;
    output += `| 履約地點 | ${location} |\n`;
    output += `| 履約期限 | ${period} |\n`;
    output += `| 廠商資格 | ${qualification.slice(0, 100)}${qualification.length > 100 ? '...' : ''} |\n`;
    output += `\n### 連結\n`;
    output += `[查看原始公告](${link})\n`;
    return output;
}
// 地區關鍵字對照表
const REGION_KEYWORDS = {
    "台北": ["臺北", "台北"],
    "新北": ["新北"],
    "桃園": ["桃園"],
    "台中": ["臺中", "台中"],
    "台南": ["臺南", "台南"],
    "高雄": ["高雄"],
    "基隆": ["基隆"],
    "新竹": ["新竹"],
    "苗栗": ["苗栗"],
    "彰化": ["彰化"],
    "南投": ["南投"],
    "雲林": ["雲林"],
    "嘉義": ["嘉義"],
    "屏東": ["屏東"],
    "宜蘭": ["宜蘭"],
    "花蓮": ["花蓮"],
    "台東": ["臺東", "台東"],
    "澎湖": ["澎湖"],
    "金門": ["金門"],
    "連江": ["連江", "馬祖"],
};
// 依日期列出標案（支援地區和關鍵字過濾）
export async function listByDate(date, typeFilter, limit, region, keyword) {
    const url = `${API_BASE}/listbydate?date=${date}`;
    const response = await axios.get(url, { timeout: 30000 });
    const records = response.data.records;
    if (!records || records.length === 0) {
        return `${date} 沒有標案公告。`;
    }
    let filtered = records;
    // 過濾公告類型
    if (typeFilter) {
        filtered = filtered.filter((r) => r.brief.type.includes(typeFilter));
    }
    // 過濾地區
    if (region) {
        const regionKeywords = REGION_KEYWORDS[region] || [region];
        filtered = filtered.filter((r) => {
            const unitName = r.unit_name || "";
            return regionKeywords.some((kw) => unitName.includes(kw));
        });
    }
    // 過濾關鍵字（標題）
    if (keyword) {
        const keywords = keyword.split(/[,，\s]+/).filter(Boolean);
        filtered = filtered.filter((r) => {
            const title = r.brief.title || "";
            return keywords.some((kw) => title.includes(kw));
        });
    }
    const sorted = filtered.slice(0, limit);
    const formattedDate = `${date.slice(0, 4)}/${date.slice(4, 6)}/${date.slice(6, 8)}`;
    // 建立過濾條件描述
    const filterDesc = [];
    if (region)
        filterDesc.push(`地區：${region}`);
    if (keyword)
        filterDesc.push(`關鍵字：${keyword}`);
    if (typeFilter)
        filterDesc.push(`類型：${typeFilter}`);
    const filterInfo = filterDesc.length > 0 ? `（${filterDesc.join("、")}）` : "";
    let table = `### ${formattedDate} 標案公告${filterInfo}（共 ${sorted.length} 筆，原始 ${records.length} 筆）\n\n`;
    if (sorted.length === 0) {
        table += `找不到符合條件的標案。\n`;
        table += `\n> 提示：可嘗試放寬搜尋條件，或使用不同的關鍵字。`;
        return table;
    }
    table += "| 類型 | 標案名稱 | 機關 | 案號 |\n";
    table += "| :--- | :--- | :--- | :--- |\n";
    for (const t of sorted) {
        const title = t.brief.title.length > 40 ? t.brief.title.slice(0, 40) + "..." : t.brief.title;
        table += `| ${t.brief.type} | ${title} | ${t.unit_name || "-"} | ${t.job_number} |\n`;
    }
    // 只在沒有過濾條件時顯示統計
    if (!region && !keyword && !typeFilter) {
        const typeCounts = {};
        records.forEach((r) => {
            typeCounts[r.brief.type] = (typeCounts[r.brief.type] || 0) + 1;
        });
        table += `\n### 公告類型統計\n`;
        Object.entries(typeCounts)
            .sort((a, b) => b[1] - a[1])
            .forEach(([type, count]) => {
            table += `- ${type}: ${count} 筆\n`;
        });
    }
    table += `\n> 使用 \`get_tender_detail\` 查詢詳情，需提供 unit_id 和 job_number`;
    return table;
}
// 依機關列出標案
export async function listByUnit(unitId, limit) {
    const url = `${API_BASE}/listbyunit?unit_id=${encodeURIComponent(unitId)}`;
    const response = await axios.get(url, { timeout: 15000 });
    const records = response.data.records;
    if (!records || records.length === 0) {
        return `找不到機關 ${unitId} 的標案。`;
    }
    const sorted = records.slice(0, limit);
    const unitName = sorted[0]?.unit_name || unitId;
    let table = `### ${unitName} 標案列表（共 ${sorted.length} 筆）\n\n`;
    table += "| 公告日 | 類型 | 標案名稱 | 案號 |\n";
    table += "| :--- | :--- | :--- | :--- |\n";
    for (const t of sorted) {
        const dateStr = String(t.date);
        const formattedDate = `${dateStr.slice(0, 4)}/${dateStr.slice(4, 6)}/${dateStr.slice(6, 8)}`;
        const title = t.brief.title.length > 40 ? t.brief.title.slice(0, 40) + "..." : t.brief.title;
        table += `| ${formattedDate} | ${t.brief.type} | ${title} | ${t.job_number} |\n`;
    }
    return table;
}
// 列出分類
export async function getCategories(type, search) {
    let filtered = CATEGORIES;
    // 依類型過濾
    if (type === "engineering") {
        filtered = CATEGORIES.filter((c) => c.type === "工程類");
    }
    else if (type === "goods") {
        filtered = CATEGORIES.filter((c) => c.type === "財物類");
    }
    else if (type === "services") {
        filtered = CATEGORIES.filter((c) => c.type === "勞務類");
    }
    // 依關鍵字過濾
    if (search) {
        filtered = filtered.filter((c) => c.name.includes(search) || c.code.includes(search));
    }
    if (filtered.length === 0) {
        return `找不到符合條件的分類。`;
    }
    let output = `### 標的分類清單（共 ${filtered.length} 項）\n\n`;
    output += "| 代碼 | 類型 | 名稱 |\n";
    output += "| :--- | :--- | :--- |\n";
    for (const c of filtered) {
        output += `| ${c.code} | ${c.type} | ${c.name} |\n`;
    }
    output += `\n> 使用 \`search_by_category\` 依分類代碼搜尋標案`;
    output += `\n> 完整分類清單請參考：https://data.gov.tw/dataset/6576`;
    return output;
}
