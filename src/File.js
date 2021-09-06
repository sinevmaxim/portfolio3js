// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import * as THREE from "three";

// export default class File {
//     constructor() {
//         this.loaders = {};
//         this.items = {};
//         this.manager = new THREE.LoadingManager();

//         this.load();
//     }

//     load() {
//         this.toLoad = {
//             carChassis: "/models/car/chassis.glb",
//             carWheel: "/models/car/wheel.glb",
//         };

//         this.loaders.gltfLoader = new GLTFLoader(this.manager);

//         Object.entries(this.toLoad).forEach(([name, url]) => {
//             this.loaders.gltfLoader.load(url, (gltf) => {
//                 this.items[name] = gltf.scene.children[0];
//             });
//         });
//     }
// }
