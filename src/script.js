import "./style.css";
import * as THREE from "three";
import * as CANNON from "cannon";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Loading Manager
const loadingManager = new THREE.LoadingManager();

// Loaders
const gltfLoader = new GLTFLoader(loadingManager);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 1;
scene.add(camera);

/**
 * Lights
 */

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);

// Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 0);

// Adding to scene
scene.add(ambientLight, directionalLight);

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Objects
 */

// Floor

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        metalness: 0.3,
        roughness: 0.6,
        color: 0x330033,
    })
);

plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

// Car
// gltfLoader.load("/models/car/car.glb", (model) => {
//     const car = model.scene;
//     console.log(car);
//     car.scale.set(0.5, 0.5, 0.5);
//     car.position.y += 0.05;
//     console.log(car.position);
//     scene.add(car);
// });

// gltfLoader.load("/models/car/wheel.glb", (model) => {
//     const car = model.scene;
//     console.log(car);
//     car.scale.set(0.5, 0.5, 0.5);
//     car.position.y += 0.05;
//     car.position.z -= 1.26;
//     car.quaternion = Math.PI;
//     console.log(car.position);
//     scene.add(car);
// });

// Cube

// const cube = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(2, 2, 2),
//     new THREE.MeshBasicMaterial({
//         side: THREE.DoubleSide,
//     })
// );

// scene.add(cube);

/**
 * World
 */

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
let lastElapsedTime = 0;

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const delta = elapsedTime - lastElapsedTime;
    lastElapsedTime = elapsedTime;

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
