// export default class Controls {
//     constructor() {
//         this.action = null;
//         this.previousAction = null;
//         const controlsHandler = (event) => {
//             const up = event.type == "keyup";

//             if (!up && event.type !== "keydown") {
//                 return;
//             }

//             // this.car.vehicle.setBrake(0, 0);
//             // this.car.vehicle.setBrake(0, 1);
//             // this.car.vehicle.setBrake(0, 2);
//             // this.car.vehicle.setBrake(0, 3);

//             switch (event.keyCode) {
//                 case 38: // forward
//                     // this.car.vehicle.applyEngineForce(
//                     //     up
//                     //         ? 0
//                     //         : -this.car.options.maxForce *
//                     //               this.car.options.maxForceMultiplier,
//                     //     2
//                     // );
//                     // this.car.vehicle.applyEngineForce(
//                     //     up
//                     //         ? 0
//                     //         : -this.car.options.maxForce *
//                     //               this.car.options.maxForceMultiplier,
//                     //     3
//                     // );
//                     this.previousAction = this.action;
//                     this.action = "forward";
//                     break;

//                 case 40: // backward
//                     // this.car.vehicle.applyEngineForce(
//                     //     up
//                     //         ? 0
//                     //         : this.car.options.maxForce *
//                     //               this.car.options.maxForceMultiplierBack,
//                     //     2
//                     // );
//                     // this.car.vehicle.applyEngineForce(
//                     //     up
//                     //         ? 0
//                     //         : this.car.options.maxForce *
//                     //               this.car.options.maxForceMultiplierBack,
//                     //     3
//                     // );
//                     this.previousAction = this.action;
//                     this.action = "back";
//                     break;

//                 case 66: // b
//                     // this.car.vehicle.setBrake(this.car.options.brakeForce, 0);
//                     // this.car.vehicle.setBrake(this.car.options.brakeForce, 1);
//                     // this.car.vehicle.setBrake(this.car.options.brakeForce, 2);
//                     // this.car.vehicle.setBrake(this.car.options.brakeForce, 3);
//                     this.previousAction = this.action;
//                     this.action = "brake";
//                     break;

//                 case 39: // right
//                     // this.car.vehicle.setSteeringValue(
//                     //     up ? 0 : -this.car.options.maxSteerVal,
//                     //     0
//                     // );
//                     // this.car.vehicle.setSteeringValue(
//                     //     up ? 0 : -this.car.options.maxSteerVal,
//                     //     1
//                     // );
//                     this.previousAction = this.action;
//                     this.action = "right";
//                     break;

//                 case 37: // left
//                     // this.car.vehicle.setSteeringValue(
//                     //     up ? 0 : this.car.options.maxSteerVal,
//                     //     0
//                     // );
//                     // this.car.vehicle.setSteeringValue(
//                     //     up ? 0 : this.car.options.maxSteerVal,
//                     //     1
//                     // );
//                     this.previousAction = this.action;
//                     this.action = "left";
//                     break;

//                 default:
//                     this.previousAction = this.action;
//                     this.action = "idle";
//             }
//         };

//         document.addEventListener("keydown", controlsHandler);
//         document.addEventListener("keyup", controlsHandler);
//     }
// }
