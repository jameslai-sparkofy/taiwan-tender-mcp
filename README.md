# Taiwan Tender MCP

台灣政府標案查詢 MCP 伺服器，串接政府電子採購網 API。

## 功能

提供 6 個工具：

| 工具 | 功能 |
|------|------|
| `search_tenders` | 依關鍵字搜尋標案 |
| `search_by_category` | 依分類代碼搜尋 |
| `get_tender_detail` | 取得標案詳細資訊 |
| `list_tenders_by_date` | 列出指定日期的標案 |
| `list_tenders_by_unit` | 列出指定機關的標案 |
| `list_categories` | 列出標的分類代碼 |

## 安裝

```bash
cd taiwan-tender-mcp
npm install
npm run build
```

## 設定 Claude Desktop

編輯 Claude Desktop 設定檔：
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

加入以下設定：

```json
{
  "mcpServers": {
    "taiwan_tender": {
      "command": "node",
      "args": ["C:/claude/TW tender MCP/taiwan-tender-mcp/build/index.js"]
    }
  }
}
```

## 使用範例

對 Claude 說：
- 「搜尋近期的裝修標案」
- 「找地板相關的工程標案」
- 「查詢分類代碼 5174 的標案」
- 「列出今天的招標公告」
- 「查詢這個標案的詳細資訊」

## 常用分類代碼

### 工程類
| 代碼 | 名稱 |
|------|------|
| 5174 | 地板及牆面貼磚工程 |
| 5175 | 其他鋪地板、牆面及壁紙工程 |
| 5177 | 室內裝潢工程 |
| 5179 | 其他裝修工程 |
| 5164 | 電力工程 |
| 5162 | 水管及排水設施鋪設工程 |

### 勞務類
| 代碼 | 名稱 |
|------|------|
| 8671 | 建築服務（設計） |
| 8672 | 工程服務（技師） |
| 521 | 建築施工服務 |
| 522 | 土木工程施工服務 |

### 財物類
| 代碼 | 名稱 |
|------|------|
| 452 | 計算機及其零件與配件 |
| 15 | 石材、砂及泥土 |
| 381 | 傢具 |

## 資料來源

- API: https://pcc-api.openfun.app/
- 原始資料: [政府電子採購網](https://web.pcc.gov.tw/)
- 分類代碼: [政府資料開放平臺](https://data.gov.tw/dataset/6576)

## 授權

MIT License
