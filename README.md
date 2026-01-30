# Taiwan Tender MCP

台灣政府標案查詢 MCP 伺服器，串接政府電子採購網 API。

## 安裝方式

### 方法一：npx 直接使用（推薦）

在 Claude Desktop 設定檔中加入：

```json
{
  "mcpServers": {
    "taiwan_tender": {
      "command": "npx",
      "args": ["-y", "github:jameslai-sparkofy/taiwan-tender-mcp"]
    }
  }
}
```

### 方法二：本地安裝

```bash
git clone https://github.com/jameslai-sparkofy/taiwan-tender-mcp.git
cd taiwan-tender-mcp
npm install
npm run build
```

然後在設定檔中使用本地路徑：

```json
{
  "mcpServers": {
    "taiwan_tender": {
      "command": "node",
      "args": ["/path/to/taiwan-tender-mcp/build/index.js"]
    }
  }
}
```

## Claude Desktop 設定檔位置

- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

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
