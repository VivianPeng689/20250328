let seaweeds = [];
let angle = 0;
const colors = ['#809bce', '#95b8d1', '#b8e0d2', '#d6eadf', '#eac4d5']; // 指定的五個顏色

function setup() {
  // 創建畫布，並設置透明背景
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('position', 'absolute');
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('z-index', '10'); // 畫布在 iframe 上方
  canvas.style('pointer-events', 'none'); // 讓畫布不攔截滑鼠事件
  clear(); // 設置透明背景

  // 創建 iframe 並設置屬性
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.bilibili.com/video/BV13y4y1g7uW/?spm_id_from=333.337.search-card.all.click');
  iframe.attribute('width', '100%');
  iframe.attribute('height', '100%');
  iframe.style('position', 'absolute');
  iframe.style('top', '0');
  iframe.style('left', '0');
  iframe.style('border', 'none');
  iframe.style('z-index', '-1'); // 確保 iframe 在畫布後面

  // 初始化 40 條水草的屬性，並設置間隔
  let spacing = width / 40; // 每條水草的水平間隔
  for (let i = 0; i < 40; i++) {
    seaweeds.push({
      baseX: i * spacing + random(-spacing / 4, spacing / 4), // 均勻分布並加入隨機偏移
      height: random(80, 200), // 提高水草的高度範圍
      color: color(random(colors) + '80'), // 從指定顏色中隨機選擇，加入透明度
      thickness: random(10, 20), // 隨機粗細
      frequency: random(0.02, 0.1), // 搖晃頻率
      swayOffset: random(TWO_PI), // 每條水草的初始相位偏移
    });
  }
}

function draw() {
  clear(); // 清除畫布，保持透明背景
  blendMode(BLEND); // 啟用顏色混合模式
  strokeWeight(1);
  noFill();

  for (let seaweed of seaweeds) {
    stroke(seaweed.color); // 設定水草顏色
    strokeWeight(seaweed.thickness); // 設定水草粗細

    beginShape();
    for (let y = height; y > height - seaweed.height; y -= 10) {
      // 計算每個節點的搖晃幅度
      let localAngle = angle * seaweed.frequency + y * 0.02 + seaweed.swayOffset; // 增加相位偏移
      let sway = sin(localAngle) * map(y, height, height - seaweed.height, 0, 50); // 搖晃幅度逐漸增加（底部固定）
      let x = seaweed.baseX + sway; // 基座固定，節點左右搖晃
      vertex(x, y);
    }
    endShape();
  }

  angle += 0.2; // 更新全局角度，讓搖晃速度加快
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // 重新計算每條水草的 baseX
  let spacing = width / 40; // 每條水草的水平間隔
  for (let i = 0; i < seaweeds.length; i++) {
    seaweeds[i].baseX = i * spacing + random(-spacing / 4, spacing / 4); // 更新 baseX
  }
}