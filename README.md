# 吳鑽 (Wuzuan) 個人網站

這是一個基於 Node.js 和 Express 的個人網站專案。

## 安裝與執行

### 前置需求
- [Node.js](https://nodejs.org/) (建議 v16 或以上)

### 1. 下載專案
將專案下載或是 Clone 到本地端：
```bash
git clone https://github.com/DM-WuzuanTW/wuzuantw.com.git
cd wuzuantw.com
```

### 2. 安裝依賴
執行以下指令安裝所需套件：
```bash
npm install
```

### 3. 啟動伺服器
**開發模式 (檔案變更時自動重啟)：**
```bash
npm run dev
```

**正式運行：**
```bash
npm start
```

伺服器預設會在 `http://localhost:3001` 運行。

### 4. 進階部署 (PM2)
在生產環境中，建議使用 PM2 來管理 Node.js 程序，確保網站穩定運行。

**安裝 PM2：**
```bash
npm install -g pm2
```

**啟動服務：**
```bash
pm2 start server.js --name "wuzuantw.com"
```

**常用指令：**
- 查看狀態：`pm2 status`
- 重啟服務：`pm2 restart wuzuantw.com`
- 停止服務：`pm2 stop wuzuantw.com`
- 查看日誌：`pm2 logs wuzuantw.com`
- 開機自啟：`pm2 startup` && `pm2 save`

## 專案結構
- `server.js`: 伺服器入口檔案
- `views/`: EJS 模板檔案 (HTML 結構)
  - `index.ejs`: 首頁
- `public/`: 靜態檔案 (CSS, JS, 圖片)
  - `css/`: 樣式表
  - `js/`: 前端腳本
  - `images/`: 圖片資源

## 自定義修改
- **修改內容**：編輯 `views/index.ejs`
- **修改樣式**：編輯 `public/css/style.css`
- **新增友站**：在 `index.ejs` 的 `#friends` 區塊新增 `<a>` 標籤

## Nginx 設定
詳細的 Nginx 反向代理與 SSL 設定教學，請參考 [NGINX_SETUP.md](./NGINX_SETUP.md)。

## 開發者

<table>
  <tr>
    <td align="center">
      <a href="https://wuzuantw.com">
        <img src="public/images/avatar.webp" width="100" alt="Wuzuan"><br>
        <b>Wuzuan</b>
      </a>
    </td>
    <td align="center">
      <a href="https://sange.ge">
        <img src="public/images/friends/Sangege.webp" width="100" alt="Sangege"><br>
        <b>Sangege</b>
      </a>
    </td>
  </tr>
</table>