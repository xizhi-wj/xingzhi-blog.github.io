const sakura_canvas = document.createElement("canvas");

sakura_canvas.id = "sakura";
sakura_canvas.className = "sakura";

sakura_canvas.setAttribute(
  "style",
  "top: 0; left: 0; z-index: 100000; position: fixed; pointer-events: none;"
);

document.body.appendChild(sakura_canvas);

const canvas_height = window.innerHeight;

const canvas_width = window.innerWidth;

sakura_canvas.width = canvas_height;
sakura_canvas.height = canvas_width;

const ctx = sakura_canvas.getContext("2d");

const SAKURA_SUM = 50;

const sakura_array = [];

const sakura_img = new Image();

sakura_img.src =
  "https://xizhi-picgo.oss-cn-guangzhou.aliyuncs.com/xingzhiblog/sakura/sakura.png";

sakura_img.onload = () => {
  resize();
  //   document.body.appendChild(sakura_canvas);
  for (let i = 0; i < SAKURA_SUM; i++) {
    sakura_array.push(new Sakura());
  }
  render();
};

class Sakura {
  // 构造方法
  constructor() {
    // 随机生成花瓣的x, y坐标
    this.x = Math.random() * sakura_canvas.width;
    this.y = Math.random() * sakura_canvas.height * 2 - sakura_canvas.height;
    // 随机生成花瓣的宽高
    this.width = Math.random() * 15 + 15;
    this.height = Math.random() * 12 + 10;
    // 随机透明度
    this.opacity = this.width / 30;
    // 设置一个随机数，后面实现旋转角度效果时会用到
    this.rotate = Math.random();
    // 速度初始化
    this.xSpeed = Math.random() * 2 + 3;
    this.ySpeed = Math.random() + 1.5;
    this.rotateSpeed = Math.random() * 0.02;
  }

  // 绘制
  draw() {
    // 当花瓣超过canvas画布边界后，重新设置花瓣的坐标、速度、和转速
    if (this.x > sakura_canvas.width || this.y > sakura_canvas.height) {
      this.x = -sakura_img.width; // 刚好藏住
      this.y = Math.random() * sakura_canvas.height * 2 - sakura_canvas.height;
      this.rotate = Math.random();
      this.rotateSpeed = Math.random() * 0.02;
      this.xSpeed = Math.random() * 2 + 3;
      this.ySpeed = Math.random() + 1.5;
    }
    // 设置整个canvas透明度基数
    ctx.globalAlpha = this.opacity;
    ctx.drawImage(
      sakura_img,
      this.x,
      this.y,
      this.width * (0.6 + Math.abs(Math.cos(this.rotate)) / 3),
      this.height * (0.8 + Math.abs(Math.sin(this.rotate)) / 5)
    );
  }

  animate() {
    // this.x += this.xSpeed + mouseX * 5;
    // this.y += this.ySpeed + mouseX * 2;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.rotate += this.rotateSpeed;
    this.draw();
  }
}

const render = () => {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  sakura_array.forEach((sakura) => sakura.animate());
  requestAnimationFrame(render);
};

const resize = () => {
  sakura_canvas.width = window.innerWidth;
  sakura_canvas.height = window.innerHeight;
};

window.addEventListener("resize", resize);
