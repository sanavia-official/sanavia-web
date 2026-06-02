SANAVIA 官網 V3：靜態多頁版

本版本以 GitHub + Vercel 靜態網站部署為基礎，維持安心醫行 SANAVIA 的品牌視覺、溫暖專業語氣與線上申請流程。

## 頁面

- `index.html`：首頁
- `services.html`：服務說明
- `about.html`：關於我們
- `faq.html`：常見問題
- `blog.html`：專欄文章列表
- `blog-escort-service-intro.html`：陪診服務介紹文章
- `blog-day-surgery-return-home.html`：一日手術返家文章
- `blog-elder-visit-preparation.html`：長者看診資料準備文章
- `blog-care-service-comparison.html`：陪診、看護與居服比較文章
- `contact.html`：聯絡我們
- `booking.html`：線上申請入口
- `payment-report.html`：付款完成回報
- `refund.html`：取消與退款申請
- `recruit.html`：陪診員招募
- `terms.html`：服務條款
- `privacy.html`：隱私權政策
- `fees-refund.html`：收費與退款規則
- `payment-success.html`：付款完成提示頁

## 注意事項

- 本網站僅包含公開官網內容與一般服務資訊。
- Email 維持 `Care@sanavia.tw`。
- 品牌統一為「安心醫行 SANAVIA」。
- 官網列出的醫院為常見服務範圍，不代表官方合作關係。

## 部署

可直接放在 GitHub + Vercel 靜態網站部署。建議先推到 `develop` 分支測試 Vercel Preview，確認後再 PR 到 `main`。

## v3.01 更新

- 檢查全站主要入口、Footer、條款頁與表單連結一致性。
- 首頁「申請陪診服務」改導向 `booking.html`，避免跳過服務確認與條款勾選流程。
- 付款回報 CTA 改為「送出付款回報」，避免讓使用者誤解為再次付款。
- FAQ 與收費退款頁的當日取消文字統一為「恕無法退款」，語氣較溫和並與退款申請頁一致。
