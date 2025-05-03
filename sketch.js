let capture;
let overlayGraphics;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全視窗畫布
  background('#ADCDB1'); // 設定背景顏色
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始影像，僅顯示繪製的影像

  // 建立與視訊畫面一樣大小的 Graphics
  overlayGraphics = createGraphics(capture.width, capture.height);
  drawOverlayGraphics(); // 初始化繪製 overlayGraphics
}

function draw() {
  background('#ADCDB1'); // 繪製背景
  translate(width / 2, height / 2); // 將原點移到畫布中心
  scale(-1, 1); // 水平翻轉影像
  image(capture, -capture.width / 2, -capture.height / 2); // 繪製翻轉後的影像

  // 顯示 overlayGraphics 在視訊畫面上方
  image(overlayGraphics, -capture.width / 2, -capture.height / 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 調整影像大小
  overlayGraphics = createGraphics(capture.width, capture.height); // 重新建立 Graphics
  drawOverlayGraphics(); // 重新繪製 overlayGraphics
}

function drawOverlayGraphics() {
  overlayGraphics.background(0); // 設定背景為黑色
  overlayGraphics.noStroke(); // 移除邊框

  // 每隔 20 單位繪製一個方框和圓
  for (let y = 0; y < overlayGraphics.height; y += 20) {
    for (let x = 0; x < overlayGraphics.width; x += 20) {
      // 從 capture 中取得對應位置的顏色
      let col = capture.get(x, y);
      let g = col[1]; // 保留 G 值
      overlayGraphics.fill(0, g, 100); // 設定方框顏色 (R=0, G=col[1], B=100)
      overlayGraphics.rect(x + 1, y + 1, 18, 18); // 繪製方框，稍微偏移以避免重疊

      overlayGraphics.fill(0); // 設定圓形顏色為黑色
      overlayGraphics.ellipse(x + 10, y + 10, 5, 5); // 繪製圓形，置於方框中心
    }
  }
}
