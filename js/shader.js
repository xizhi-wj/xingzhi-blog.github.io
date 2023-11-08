import * as THREE from "three";
console.log(THREE);
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import * as dat from "dat.gui";
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
// const renderer = new THREE.WebGLRenderer();
// scene.add(camera);
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
// camera.position.z = 10;
// const axesHelper = new THREE.AxesHelper(10);
// scene.add(axesHelper);
// const orbitControls = new OrbitControls(camera, renderer.domElement);
// orbitControls.enableDamping = true;

// window.addEventListener("resize", () => {
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
// });

// const params = {
//   uWaresFrequency: 14,
//   uScale: 0.03,
//   uXzScale: 1.5,
//   uNoiseFrequency: 10,
//   uNoiseScale: 1.5,
//   uLowColor: "#ff0000",
//   uHighColor: "#ffff00",
//   uXSpeed: 1,
//   uZSpeed: 1,
//   uNoiseSpeed: 1,
//   uOpacity: 1,
// };

// const gui = new dat.GUI();

// const shaderMaterial = new THREE.ShaderMaterial({
//   vertexShader: `
//   precision lowp float;

// uniform float uWaresFrequency;
// uniform float uScale;
// uniform float uXzScale;
// uniform float uNoiseFrequency;
// uniform float uNoiseScale;
// uniform float uTime;

// uniform float uXSpeed;
// uniform float uZSpeed;
// uniform float uNoiseSpeed;

// //计算出的高度传递给片元着色器
// varying float vElevation;

// float random (vec2 st) {
//     return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
// }

// float noise (in vec2 _st) {
//     vec2 i = floor(_st);
//     vec2 f = fract(_st);

//     // Four corners in 2D of a tile
//     float a = random(i);
//     float b = random(i + vec2(1.0, 0.0));
//     float c = random(i + vec2(0.0, 1.0));
//     float d = random(i + vec2(1.0, 1.0));

//     vec2 u = f * f * (3.0 - 2.0 * f);

//     return mix(a, b, u.x) +
//             (c - a)* u.y * (1.0 - u.x) +
//             (d - b) * u.x * u.y;
// }

// void main() {
//     vec4 modelPosition = modelMatrix * vec4(position, 1.0);
//     float elevation = sin((modelPosition.x * uWaresFrequency + uTime * uXSpeed) / 10.0) * sin((modelPosition.z * uWaresFrequency * uXzScale + uTime * uZSpeed) / 10.0);

//     elevation += -abs(noise(vec2(modelPosition.xz * uNoiseFrequency + uTime * uNoiseSpeed))) * uNoiseScale;

//     vElevation = elevation;

//     elevation *= uScale;

//     modelPosition.y += elevation;
//     gl_Position = projectionMatrix * viewMatrix * modelPosition;
// }
//   `,
//   fragmentShader: `
//   precision lowp float;

// uniform vec3 uLowColor;
// uniform vec3 uHighColor;
// uniform float uOpacity;

// varying float vElevation;

// void main() {
//     float opacity = (vElevation + 1.0) / 2.0;
//     vec3 color = mix(uLowColor, uHighColor, opacity);
//     gl_FragColor = vec4(color, uOpacity);
// }
//   `,
//   side: THREE.DoubleSide,
//   transparent: true,
//   uniforms: {
//     uWaresFrequency: {
//       value: params.uWaresFrequency,
//     },
//     uScale: {
//       value: params.uScale,
//     },
//     uXzScale: {
//       value: params.uXzScale,
//     },
//     uNoiseFrequency: {
//       value: params.uNoiseFrequency,
//     },
//     uNoiseScale: {
//       value: params.uNoiseScale,
//     },
//     uTime: {
//       value: 0,
//     },
//     uLowColor: {
//       value: new THREE.Color(params.uLowColor),
//     },
//     uHighColor: {
//       value: new THREE.Color(params.uHighColor),
//     },
//     uXSpeed: {
//       value: params.uXSpeed,
//     },
//     uZSpeed: {
//       value: params.uZSpeed,
//     },
//     uNoiseSpeed: {
//       value: params.uNoiseSpeed,
//     },
//     uOpacity: {
//       value: params.uOpacity,
//     },
//   },
// });

// gui
//   .add(params, "uWaresFrequency")
//   .min(1)
//   .max(100)
//   .step(0.1)
//   .onChange((value) => {
//     shaderMaterial.uniforms.uWaresFrequency.value = value;
//   });
// gui
//   .add(params, "uScale")
//   .min(0)
//   .max(0.2)
//   .step(0.02)
//   .onChange((value) => {
//     shaderMaterial.uniforms.uScale.value = value;
//   });
// gui
//   .add(params, "uXzScale")
//   .min(0)
//   .max(5)
//   .step(0.1)
//   .onChange((value) => {
//     shaderMaterial.uniforms.uXzScale.value = value;
//   });
// gui
//   .add(params, "uNoiseFrequency")
//   .min(1)
//   .max(100)
//   .step(0.1)
//   .onChange((value) => {
//     shaderMaterial.uniforms.uNoiseFrequency.value = value;
//   });
// gui
//   .add(params, "uNoiseScale")
//   .min(0)
//   .max(5)
//   .step(0.01)
//   .onChange((value) => {
//     shaderMaterial.uniforms.uNoiseScale.value = value;
//   });
// gui.addColor(params, "uLowColor").onFinishChange((value) => {
//   shaderMaterial.uniforms.uLowColor.value = new THREE.Color(value);
// });
// gui.addColor(params, "uHighColor").onFinishChange((value) => {
//   shaderMaterial.uniforms.uHighColor.value = new THREE.Color(value);
// });

// gui
//   .add(params, "uXSpeed")
//   .min(0)
//   .max(5)
//   .step(0.01)
//   .onChange((value) => {
//     shaderMaterial.uniforms.uXSpeed.value = value;
//   });
// gui
//   .add(params, "uZSpeed")
//   .min(0)
//   .max(5)
//   .step(0.01)
//   .onChange((value) => {
//     shaderMaterial.uniforms.uZSpeed.value = value;
//   });
// gui
//   .add(params, "uNoiseSpeed")
//   .min(0)
//   .max(5)
//   .step(0.01)
//   .onChange((value) => {
//     shaderMaterial.uniforms.uNoiseSpeed.value = value;
//   });
// gui
//   .add(params, "uOpacity")
//   .min(0)
//   .max(1)
//   .step(0.01)
//   .onChange((value) => {
//     shaderMaterial.uniforms.uOpacity.value = value;
//   });

// const planeGeometry = new THREE.PlaneGeometry(10, 10, 1024, 1024);
// const planeMaterial = new THREE.MeshBasicMaterial({
//   color: 0x00ff00,
//   side: THREE.DoubleSide,
// });
// const plane = new THREE.Mesh(planeGeometry, shaderMaterial);
// plane.rotation.x = -Math.PI / 2;
// scene.add(plane);

// const clock = new THREE.Clock();

// const render = () => {
//   renderer.render(scene, camera);
//   const elapsedTime = clock.getElapsedTime();
//   shaderMaterial.uniforms.uTime.value = elapsedTime;
//   orbitControls.update();
//   requestAnimationFrame(render);
// };

// render();
