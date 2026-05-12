console.log("これは正しいscript.jsです");

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

// --------------------
// canvas取得
// --------------------

const canvas = document.getElementById("canvas");

// --------------------
// シーン
// --------------------

const scene = new THREE.Scene();

// --------------------
// カメラ
// --------------------

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 5;

// --------------------
// レンダラー
// --------------------

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

// --------------------
// ライト
// --------------------

const light =
  new THREE.DirectionalLight(
    0xffffff,
    2
  );

light.position.set(5, 5, 5);

scene.add(light);

// 環境光
const light2 =
  new THREE.AmbientLight(
    0xffffff,
    0.3
  );

scene.add(light2);

// --------------------
// Sphere
// --------------------

const sphereGeometry =
  new THREE.SphereGeometry(
    0.5,
    32,
    16
  );

const sphereMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x00ff00
  });

const sphere =
  new THREE.Mesh(
    sphereGeometry,
    sphereMaterial
  );

// 初期位置
sphere.position.set(2, 0, 0);

scene.add(sphere);

// --------------------
// GLB読み込み
// --------------------

const loader = new GLTFLoader();

let cube;

loader.load(
  "./my3d.glb",

  (gltf) => {

    console.log("読み込み成功");

    cube = gltf.scene;

    // Cubeを単色に
    cube.traverse((node) => {

      if (node.isMesh) {

        node.material =
          new THREE.MeshStandardMaterial({
            color: 0x44aaff
          });

      }

    });

    // サイズ
    cube.scale.set(
      0.5,
      0.5,
      0.5
    );

    // 初期位置
    cube.position.set(
      -1.5,
      0,
      0
    );

    scene.add(cube);

  },

  undefined,

  (error) => {

    console.error(
      "読み込みエラー:",
      error
    );

  }
);

// --------------------
// アニメーション
// --------------------

function animate() {

  requestAnimationFrame(animate);

  const t = Date.now() * 0.001;

  // --------------------
  // Cube
  // --------------------

  if (cube) {

    // 回転
    cube.rotation.x += 0.03;

    cube.rotation.y += 0.05;

    // 左右移動
    cube.position.x =
      -1.5 + Math.sin(t * 2) * 2;

    // 上下移動
    cube.position.y =
      Math.cos(t * 3) * 1.5;

  }

  // --------------------
  // Sphere
  // --------------------

  // 回転
  sphere.rotation.y += 0.05;

  // 左右移動
  sphere.position.x =
    1.5 + Math.cos(t * 3) * 2;

  // 上下移動
  sphere.position.y =
    Math.sin(t * 4) * 1.5;

  // --------------------
  // Light
  // --------------------

  light.position.x =
    Math.sin(t * 2) * 8;

  light.position.z =
    Math.cos(t * 2) * 8;

  light.position.y = 4;

  // --------------------
// カメラ回転
// --------------------

// カメラを大きく回す
camera.position.x =
  Math.sin(t) * 10;

camera.position.z =
  Math.cos(t) * 10;

// 上下も動かす
camera.position.y =
  Math.sin(t * 2) * 3;

// 中央を見る
camera.lookAt(0, 0, 0);
  // 原点を見る
  camera.lookAt(0, 0, 0);

  // 描画
  renderer.render(scene, camera);

}

console.log("動いてる！");

// --------------------
// リサイズ
// --------------------

window.addEventListener(
  "resize",
  () => {

    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

  }
);

animate();