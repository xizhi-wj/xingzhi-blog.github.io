const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
camera.position.set(0, 0, 10);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const particle_box = document.createElement("div");
particle_box.id = "particle_box";
particle_box.className = "particle_box";
particle_box.setAttribute(
  "style",
  "top: 0; left: 0; z-index: -10; position: fixed; pointer-events: none;"
);
document.body.appendChild(particle_box);
particle_box.appendChild(renderer.domElement);
const renderParticle = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(renderParticle);
};
renderParticle();
window.addEventListener("resize", () => {
  //更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  //更新摄像机的投影矩阵
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  //设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});

const texture = new THREE.TextureLoader().load("https://img.hoshinagi.top/post/particle.png");
const count = 500;
for (let i = 0; i < 10; i++) {
  const positions = new Float32Array((count * 3) / 10);
  const colors = new Float32Array((count * 3) / 10);
  const particleGeometry = new THREE.BufferGeometry();
  const material = new THREE.PointsMaterial({
    map: texture, //纹理
    alphaMap: texture, //透明纹理
    size: 10, //粒子大小
    depthWrite: false, //是否开启深度描写
    blending: THREE.AdditiveBlending, //混合模式
    transparent: false, //是否透明
    vertexColors: true, //设置顶点的颜色
  });
  for (let j = 0; j < (count / 10) * 3; j++) {
    positions[j * 3] = Math.random() * 400 - 200;
    positions[j * 3 + 1] = Math.random() * 400 - 200;
    positions[j * 3 + 2] = Math.random() * 800 - 400;
    colors[j * 3] = Math.random();
    colors[j * 3 + 1] = Math.random();
    colors[j * 3 + 2] = Math.random();
  }

  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const points = new THREE.Points(particleGeometry, material);
  scene.add(points);
  gsap.to(points.position, {
    z: 400,
    duration: Math.random() * 5 + 3,
    repeat: -1,
    ease: "linear",
  });
}
