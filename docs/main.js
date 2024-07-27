/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var cannon_es__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cannon-es */ "./node_modules/cannon-es/dist/cannon-es.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");



class ThreeJSContainer {
    scene;
    light;
    world;
    dice1;
    dice1Body;
    dice2;
    dice2Body;
    dice3;
    dice3Body;
    tray; // 受け皿
    isDiceStopped = false; // サイコロが止まったかどうかのフラグ
    constructor() { }
    createRendererDOM = (width, height, cameraPos) => {
        const renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_1__.Color(0x495ed));
        renderer.shadowMap.enabled = true;
        const camera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera(50, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);
        camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0));
        const orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(camera, renderer.domElement);
        this.createScene();
        const render = () => {
            orbitControls.update();
            this.updatePhysics();
            renderer.render(this.scene, camera);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    };
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();
        this.world = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.World({
            gravity: new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Vec3(0, -9.82, 0),
        });
        this.world.defaultContactMaterial.friction = 0.01;
        this.world.defaultContactMaterial.restitution = 0.8;
        const loader = new three__WEBPACK_IMPORTED_MODULE_1__.TextureLoader();
        const diceMaterials = [
            new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({ map: loader.load('textures/dice1.png') }),
            new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({ map: loader.load('textures/dice2.png') }),
            new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({ map: loader.load('textures/dice3.png') }),
            new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({ map: loader.load('textures/dice4.png') }),
            new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({ map: loader.load('textures/dice5.png') }),
            new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({ map: loader.load('textures/dice6.png') }),
        ];
        const geometry = new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(1, 1, 1);
        // Dice 1
        this.dice1 = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, diceMaterials);
        this.dice1.position.set(5, 5, 5);
        this.scene.add(this.dice1);
        const diceShape1 = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Box(new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Vec3(0.5, 0.5, 0.5));
        this.dice1Body = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Body({ mass: 1 });
        this.dice1Body.addShape(diceShape1);
        this.dice1Body.position.set(5, 5, 5);
        this.dice1Body.velocity.set(-3, 0, -3);
        this.dice1Body.quaternion.set(Math.random(), Math.random(), Math.random(), Math.random());
        this.dice1Body.quaternion.normalize();
        this.world.addBody(this.dice1Body);
        // Dice 2
        this.dice2 = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, diceMaterials);
        this.dice2.position.set(5, 5, 0);
        this.scene.add(this.dice2);
        const diceShape2 = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Box(new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Vec3(0.5, 0.5, 0.5));
        this.dice2Body = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Body({ mass: 1 });
        this.dice2Body.addShape(diceShape2);
        this.dice2Body.position.set(5, 5, 0);
        this.dice2Body.velocity.set(-3, 0, 0);
        this.dice2Body.quaternion.set(Math.random(), Math.random(), Math.random(), Math.random());
        this.dice2Body.quaternion.normalize();
        this.world.addBody(this.dice2Body);
        // Dice 3
        this.dice3 = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, diceMaterials);
        this.dice3.position.set(0, 5, 5);
        this.scene.add(this.dice3);
        const diceShape3 = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Box(new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Vec3(0.5, 0.5, 0.5));
        this.dice3Body = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Body({ mass: 1 });
        this.dice3Body.addShape(diceShape3);
        this.dice3Body.position.set(0, 5, 5);
        this.dice3Body.velocity.set(0, 0, -3);
        this.dice3Body.quaternion.set(Math.random(), Math.random(), Math.random(), Math.random());
        this.dice3Body.quaternion.normalize();
        this.world.addBody(this.dice3Body);
        // Tray creation
        this.createTray();
        // Plane
        const planeGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.PlaneGeometry(25, 25);
        const phongMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhongMaterial();
        const planeMesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(planeGeometry, phongMaterial);
        planeMesh.material.side = three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide;
        planeMesh.rotateX(-Math.PI / 2);
        this.scene.add(planeMesh);
        const planeShape = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Plane();
        const planeBody = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Body({ mass: 0 });
        planeBody.addShape(planeShape);
        planeBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
        this.world.addBody(planeBody);
        // Grid Helper
        const gridHelper = new three__WEBPACK_IMPORTED_MODULE_1__.GridHelper(10);
        this.scene.add(gridHelper);
        // Axes Helper
        const axesHelper = new three__WEBPACK_IMPORTED_MODULE_1__.AxesHelper(5);
        this.scene.add(axesHelper);
        // Light
        this.light = new three__WEBPACK_IMPORTED_MODULE_1__.DirectionalLight(0xffffff);
        this.light.position.set(10, 10, 10);
        this.scene.add(this.light);
    };
    createTray = () => {
        // テクスチャをロード
        const textureLoader = new three__WEBPACK_IMPORTED_MODULE_1__.TextureLoader();
        const trayTexture = textureLoader.load('textures/trayTexture.jpg'); // 適切なテクスチャファイルを指定
        // 受け皿の底の色とテクスチャ
        const trayBaseMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshStandardMaterial({
            map: trayTexture,
            color: 0x888888 // テクスチャがロードできなかった場合のバックアップカラー
        });
        // 壁の色
        const trayWallColor = new three__WEBPACK_IMPORTED_MODULE_1__.Color(0x444444);
        const trayWallMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshStandardMaterial({ color: trayWallColor });
        const trayGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(10, 0.5, 10);
        const wallGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(10, 2, 0.5);
        // 底の部分
        const trayBase = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(trayGeometry, trayBaseMaterial);
        trayBase.position.set(0, 0, 0);
        this.scene.add(trayBase);
        const trayBaseShape = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Box(new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Vec3(5, 0.25, 5));
        const trayBaseBody = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Body({ mass: 0 });
        trayBaseBody.addShape(trayBaseShape);
        trayBaseBody.position.set(0, 0, 0);
        this.world.addBody(trayBaseBody);
        // 壁の部分
        const wallPositions = [
            { x: 0, y: 1, z: -5 },
            { x: 0, y: 1, z: 5 },
            { x: 5, y: 1, z: 0 },
            { x: -5, y: 1, z: 0 }, // 左
        ];
        wallPositions.forEach(pos => {
            const wall = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(wallGeometry, trayWallMaterial);
            wall.position.set(pos.x, pos.y, pos.z);
            wall.rotation.y = pos.x === 0 ? 0 : Math.PI / 2;
            this.scene.add(wall);
            const wallShape = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Box(new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Vec3(5, 1, 0.25));
            const wallBody = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Body({ mass: 0 });
            wallBody.addShape(wallShape);
            wallBody.position.set(pos.x, pos.y, pos.z);
            wallBody.quaternion.setFromEuler(0, pos.x === 0 ? 0 : Math.PI / 2, 0);
            this.world.addBody(wallBody);
        });
    };
    getDiceFace(dice, diceBody) {
        // サイコロの面がどれが上に向いているかを判断する
        const upVector = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 1, 0);
        const diceUp = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 1, 0).clone().applyQuaternion(dice.quaternion);
        // サイコロの面の法線ベクトルを定義
        const faces = [
            new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 1, 0),
            new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, -1, 0),
            new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(1, 0, 0),
            new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-1, 0, 0),
            new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 1),
            new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, -1) // 2
        ];
        // 各面の法線ベクトルとサイコロの上向きベクトルの内積を計算し、最も近い面を判定
        let maxDot = -Infinity;
        let faceIndex = 0;
        faces.forEach((face, index) => {
            const dot = Math.abs(diceUp.dot(face));
            if (dot > maxDot) {
                maxDot = dot;
                faceIndex = index;
            }
        });
        // 面の番号を返す (1-6)
        return faceIndex + 1;
    }
    checkDiceValues = () => {
        const dice1Value = this.getDiceFace(this.dice1, this.dice1Body);
        const dice2Value = this.getDiceFace(this.dice2, this.dice2Body);
        const dice3Value = this.getDiceFace(this.dice3, this.dice3Body);
        const totalValue = dice1Value + dice2Value + dice3Value;
        console.log(`Dice 1: ${dice1Value}, Dice 2: ${dice2Value}, Dice 3: ${dice3Value}`);
        console.log(`Total Value: ${totalValue}`);
    };
    checkIfDiceStopped = (body) => {
        const velocityThreshold = 0.1;
        return body.velocity.length() < velocityThreshold;
    };
    updatePhysics = () => {
        this.world.step(1 / 60);
        this.dice1.position.copy(this.dice1Body.position);
        this.dice1.quaternion.copy(this.dice1Body.quaternion);
        this.dice2.position.copy(this.dice2Body.position);
        this.dice2.quaternion.copy(this.dice2Body.quaternion);
        this.dice3.position.copy(this.dice3Body.position);
        this.dice3.quaternion.copy(this.dice3Body.quaternion);
        // サイコロが全て止まっているかを確認
        if (this.checkIfDiceStopped(this.dice1Body) &&
            this.checkIfDiceStopped(this.dice2Body) &&
            this.checkIfDiceStopped(this.dice3Body)) {
            if (!this.isDiceStopped) {
                this.isDiceStopped = true;
                this.checkDiceValues();
            }
        }
        else {
            this.isDiceStopped = false;
        }
    };
}
window.addEventListener("DOMContentLoaded", init);
function init() {
    const container = new ThreeJSContainer();
    const viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(10, 10, 10));
    document.body.appendChild(viewport);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_cannon-es_dist_cannon-es_js-node_modules_three_examples_jsm_controls_Orb-e58bd2"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgQ0FOTk9OIGZyb20gXCJjYW5ub24tZXNcIjtcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gXCJ0aHJlZS9leGFtcGxlcy9qc20vY29udHJvbHMvT3JiaXRDb250cm9sc1wiO1xuXG5jbGFzcyBUaHJlZUpTQ29udGFpbmVyIHtcbiAgICBwcml2YXRlIHNjZW5lOiBUSFJFRS5TY2VuZTtcbiAgICBwcml2YXRlIGxpZ2h0OiBUSFJFRS5MaWdodDtcbiAgICBwcml2YXRlIHdvcmxkOiBDQU5OT04uV29ybGQ7XG4gICAgcHJpdmF0ZSBkaWNlMTogVEhSRUUuTWVzaDtcbiAgICBwcml2YXRlIGRpY2UxQm9keTogQ0FOTk9OLkJvZHk7XG4gICAgcHJpdmF0ZSBkaWNlMjogVEhSRUUuTWVzaDtcbiAgICBwcml2YXRlIGRpY2UyQm9keTogQ0FOTk9OLkJvZHk7XG4gICAgcHJpdmF0ZSBkaWNlMzogVEhSRUUuTWVzaDsgXG4gICAgcHJpdmF0ZSBkaWNlM0JvZHk6IENBTk5PTi5Cb2R5O1xuICAgIHByaXZhdGUgdHJheTogVEhSRUUuR3JvdXA7IC8vIOWPl+OBkeeav1xuICAgIHByaXZhdGUgaXNEaWNlU3RvcHBlZDogYm9vbGVhbiA9IGZhbHNlOyAvLyDjgrXjgqTjgrPjg63jgYzmraLjgb7jgaPjgZ/jgYvjganjgYbjgYvjga7jg5Xjg6njgrBcblxuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIHB1YmxpYyBjcmVhdGVSZW5kZXJlckRPTSA9IChcbiAgICAgICAgd2lkdGg6IG51bWJlcixcbiAgICAgICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgICAgIGNhbWVyYVBvczogVEhSRUUuVmVjdG9yM1xuICAgICkgPT4ge1xuICAgICAgICBjb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7XG4gICAgICAgIHJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IobmV3IFRIUkVFLkNvbG9yKDB4NDk1ZWQpKTtcbiAgICAgICAgcmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlO1xuXG4gICAgICAgIGNvbnN0IGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYShcbiAgICAgICAgICAgIDUwLFxuICAgICAgICAgICAgd2lkdGggLyBoZWlnaHQsXG4gICAgICAgICAgICAwLjEsXG4gICAgICAgICAgICAxMDAwXG4gICAgICAgICk7XG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi5jb3B5KGNhbWVyYVBvcyk7XG4gICAgICAgIGNhbWVyYS5sb29rQXQobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCkpO1xuXG4gICAgICAgIGNvbnN0IG9yYml0Q29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlU2NlbmUoKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHJlbmRlcjogRnJhbWVSZXF1ZXN0Q2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQaHlzaWNzKCk7XG4gICAgICAgICAgICByZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgY2FtZXJhKTtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgICAgICB9O1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcblxuICAgICAgICByZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLmNzc0Zsb2F0ID0gXCJsZWZ0XCI7XG4gICAgICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUubWFyZ2luID0gXCIxMHB4XCI7XG4gICAgICAgIHJldHVybiByZW5kZXJlci5kb21FbGVtZW50O1xuICAgIH07XG5cbiAgICBwcml2YXRlIGNyZWF0ZVNjZW5lID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cbiAgICAgICAgdGhpcy53b3JsZCA9IG5ldyBDQU5OT04uV29ybGQoe1xuICAgICAgICAgICAgZ3Jhdml0eTogbmV3IENBTk5PTi5WZWMzKDAsIC05LjgyLCAwKSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy53b3JsZC5kZWZhdWx0Q29udGFjdE1hdGVyaWFsLmZyaWN0aW9uID0gMC4wMTtcbiAgICAgICAgdGhpcy53b3JsZC5kZWZhdWx0Q29udGFjdE1hdGVyaWFsLnJlc3RpdHV0aW9uID0gMC44O1xuXG4gICAgICAgIGNvbnN0IGxvYWRlciA9IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKCk7XG4gICAgICAgIGNvbnN0IGRpY2VNYXRlcmlhbHMgPSBbXG4gICAgICAgICAgICBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBtYXA6IGxvYWRlci5sb2FkKCd0ZXh0dXJlcy9kaWNlMS5wbmcnKSB9KSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IG1hcDogbG9hZGVyLmxvYWQoJ3RleHR1cmVzL2RpY2UyLnBuZycpIH0pLFxuICAgICAgICAgICAgbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgbWFwOiBsb2FkZXIubG9hZCgndGV4dHVyZXMvZGljZTMucG5nJykgfSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBtYXA6IGxvYWRlci5sb2FkKCd0ZXh0dXJlcy9kaWNlNC5wbmcnKSB9KSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IG1hcDogbG9hZGVyLmxvYWQoJ3RleHR1cmVzL2RpY2U1LnBuZycpIH0pLFxuICAgICAgICAgICAgbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgbWFwOiBsb2FkZXIubG9hZCgndGV4dHVyZXMvZGljZTYucG5nJykgfSksXG4gICAgICAgIF07XG5cbiAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoMSwgMSwgMSk7XG5cbiAgICAgICAgLy8gRGljZSAxXG4gICAgICAgIHRoaXMuZGljZTEgPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgZGljZU1hdGVyaWFscyk7XG4gICAgICAgIHRoaXMuZGljZTEucG9zaXRpb24uc2V0KDUsIDUsIDUpOyBcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5kaWNlMSk7XG5cbiAgICAgICAgY29uc3QgZGljZVNoYXBlMSA9IG5ldyBDQU5OT04uQm94KG5ldyBDQU5OT04uVmVjMygwLjUsIDAuNSwgMC41KSk7XG4gICAgICAgIHRoaXMuZGljZTFCb2R5ID0gbmV3IENBTk5PTi5Cb2R5KHsgbWFzczogMSB9KTtcbiAgICAgICAgdGhpcy5kaWNlMUJvZHkuYWRkU2hhcGUoZGljZVNoYXBlMSk7XG4gICAgICAgIHRoaXMuZGljZTFCb2R5LnBvc2l0aW9uLnNldCg1LCA1LCA1KTtcbiAgICAgICAgdGhpcy5kaWNlMUJvZHkudmVsb2NpdHkuc2V0KC0zLCAwLCAtMyk7IFxuICAgICAgICB0aGlzLmRpY2UxQm9keS5xdWF0ZXJuaW9uLnNldChcbiAgICAgICAgICAgIE1hdGgucmFuZG9tKCksXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpLFxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSxcbiAgICAgICAgICAgIE1hdGgucmFuZG9tKClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5kaWNlMUJvZHkucXVhdGVybmlvbi5ub3JtYWxpemUoKTtcbiAgICAgICAgdGhpcy53b3JsZC5hZGRCb2R5KHRoaXMuZGljZTFCb2R5KTtcblxuICAgICAgICAvLyBEaWNlIDJcbiAgICAgICAgdGhpcy5kaWNlMiA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBkaWNlTWF0ZXJpYWxzKTtcbiAgICAgICAgdGhpcy5kaWNlMi5wb3NpdGlvbi5zZXQoNSwgNSwgMCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMuZGljZTIpO1xuXG4gICAgICAgIGNvbnN0IGRpY2VTaGFwZTIgPSBuZXcgQ0FOTk9OLkJveChuZXcgQ0FOTk9OLlZlYzMoMC41LCAwLjUsIDAuNSkpO1xuICAgICAgICB0aGlzLmRpY2UyQm9keSA9IG5ldyBDQU5OT04uQm9keSh7IG1hc3M6IDEgfSk7XG4gICAgICAgIHRoaXMuZGljZTJCb2R5LmFkZFNoYXBlKGRpY2VTaGFwZTIpO1xuICAgICAgICB0aGlzLmRpY2UyQm9keS5wb3NpdGlvbi5zZXQoNSwgNSwgMCk7XG4gICAgICAgIHRoaXMuZGljZTJCb2R5LnZlbG9jaXR5LnNldCgtMywgMCwgMCk7XG4gICAgICAgIHRoaXMuZGljZTJCb2R5LnF1YXRlcm5pb24uc2V0KFxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSxcbiAgICAgICAgICAgIE1hdGgucmFuZG9tKCksXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpLFxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmRpY2UyQm9keS5xdWF0ZXJuaW9uLm5vcm1hbGl6ZSgpO1xuICAgICAgICB0aGlzLndvcmxkLmFkZEJvZHkodGhpcy5kaWNlMkJvZHkpO1xuXG4gICAgICAgIC8vIERpY2UgM1xuICAgICAgICB0aGlzLmRpY2UzID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIGRpY2VNYXRlcmlhbHMpO1xuICAgICAgICB0aGlzLmRpY2UzLnBvc2l0aW9uLnNldCgwLCA1LCA1KTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5kaWNlMyk7XG5cbiAgICAgICAgY29uc3QgZGljZVNoYXBlMyA9IG5ldyBDQU5OT04uQm94KG5ldyBDQU5OT04uVmVjMygwLjUsIDAuNSwgMC41KSk7XG4gICAgICAgIHRoaXMuZGljZTNCb2R5ID0gbmV3IENBTk5PTi5Cb2R5KHsgbWFzczogMSB9KTtcbiAgICAgICAgdGhpcy5kaWNlM0JvZHkuYWRkU2hhcGUoZGljZVNoYXBlMyk7XG4gICAgICAgIHRoaXMuZGljZTNCb2R5LnBvc2l0aW9uLnNldCgwLCA1LCA1KTtcbiAgICAgICAgdGhpcy5kaWNlM0JvZHkudmVsb2NpdHkuc2V0KDAsIDAsIC0zKTtcbiAgICAgICAgdGhpcy5kaWNlM0JvZHkucXVhdGVybmlvbi5zZXQoXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpLFxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSxcbiAgICAgICAgICAgIE1hdGgucmFuZG9tKCksXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZGljZTNCb2R5LnF1YXRlcm5pb24ubm9ybWFsaXplKCk7XG4gICAgICAgIHRoaXMud29ybGQuYWRkQm9keSh0aGlzLmRpY2UzQm9keSk7XG5cbiAgICAgICAgLy8gVHJheSBjcmVhdGlvblxuICAgICAgICB0aGlzLmNyZWF0ZVRyYXkoKTtcblxuICAgICAgICAvLyBQbGFuZVxuICAgICAgICBjb25zdCBwbGFuZUdlb21ldHJ5ID0gbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoMjUsIDI1KTtcbiAgICAgICAgY29uc3QgcGhvbmdNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCgpO1xuICAgICAgICBjb25zdCBwbGFuZU1lc2ggPSBuZXcgVEhSRUUuTWVzaChwbGFuZUdlb21ldHJ5LCBwaG9uZ01hdGVyaWFsKTtcbiAgICAgICAgcGxhbmVNZXNoLm1hdGVyaWFsLnNpZGUgPSBUSFJFRS5Eb3VibGVTaWRlO1xuICAgICAgICBwbGFuZU1lc2gucm90YXRlWCgtTWF0aC5QSSAvIDIpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChwbGFuZU1lc2gpO1xuXG4gICAgICAgIGNvbnN0IHBsYW5lU2hhcGUgPSBuZXcgQ0FOTk9OLlBsYW5lKCk7XG4gICAgICAgIGNvbnN0IHBsYW5lQm9keSA9IG5ldyBDQU5OT04uQm9keSh7IG1hc3M6IDAgfSk7XG4gICAgICAgIHBsYW5lQm9keS5hZGRTaGFwZShwbGFuZVNoYXBlKTtcbiAgICAgICAgcGxhbmVCb2R5LnF1YXRlcm5pb24uc2V0RnJvbUV1bGVyKC1NYXRoLlBJIC8gMiwgMCwgMCk7XG4gICAgICAgIHRoaXMud29ybGQuYWRkQm9keShwbGFuZUJvZHkpO1xuXG4gICAgICAgIC8vIEdyaWQgSGVscGVyXG4gICAgICAgIGNvbnN0IGdyaWRIZWxwZXIgPSBuZXcgVEhSRUUuR3JpZEhlbHBlcigxMCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKGdyaWRIZWxwZXIpO1xuXG4gICAgICAgIC8vIEF4ZXMgSGVscGVyXG4gICAgICAgIGNvbnN0IGF4ZXNIZWxwZXIgPSBuZXcgVEhSRUUuQXhlc0hlbHBlcig1KTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoYXhlc0hlbHBlcik7XG5cbiAgICAgICAgLy8gTGlnaHRcbiAgICAgICAgdGhpcy5saWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZmZmZmKTtcbiAgICAgICAgdGhpcy5saWdodC5wb3NpdGlvbi5zZXQoMTAsIDEwLCAxMCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubGlnaHQpO1xuICAgIH07XG5cbiAgICBwcml2YXRlIGNyZWF0ZVRyYXkgPSAoKSA9PiB7XG4gICAgICAgIC8vIOODhuOCr+OCueODgeODo+OCkuODreODvOODiVxuICAgICAgICBjb25zdCB0ZXh0dXJlTG9hZGVyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKTtcbiAgICAgICAgY29uc3QgdHJheVRleHR1cmUgPSB0ZXh0dXJlTG9hZGVyLmxvYWQoJ3RleHR1cmVzL3RyYXlUZXh0dXJlLmpwZycpOyAvLyDpganliIfjgarjg4bjgq/jgrnjg4Hjg6Pjg5XjgqHjgqTjg6vjgpLmjIflrppcbiAgICBcbiAgICAgICAgLy8g5Y+X44GR55q/44Gu5bqV44Gu6Imy44Go44OG44Kv44K544OB44OjXG4gICAgICAgIGNvbnN0IHRyYXlCYXNlTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgICAgICAgICAgbWFwOiB0cmF5VGV4dHVyZSwgLy8g44OG44Kv44K544OB44Oj44KS6L+95YqgXG4gICAgICAgICAgICBjb2xvcjogMHg4ODg4ODggLy8g44OG44Kv44K544OB44Oj44GM44Ot44O844OJ44Gn44GN44Gq44GL44Gj44Gf5aC05ZCI44Gu44OQ44OD44Kv44Ki44OD44OX44Kr44Op44O8XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICAvLyDlo4Hjga7oibJcbiAgICAgICAgY29uc3QgdHJheVdhbGxDb2xvciA9IG5ldyBUSFJFRS5Db2xvcigweDQ0NDQ0NCk7XG4gICAgICAgIGNvbnN0IHRyYXlXYWxsTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoeyBjb2xvcjogdHJheVdhbGxDb2xvciB9KTtcbiAgICBcbiAgICAgICAgY29uc3QgdHJheUdlb21ldHJ5ID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KDEwLCAwLjUsIDEwKTtcbiAgICAgICAgY29uc3Qgd2FsbEdlb21ldHJ5ID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KDEwLCAyLCAwLjUpO1xuICAgIFxuICAgICAgICAvLyDlupXjga7pg6jliIZcbiAgICAgICAgY29uc3QgdHJheUJhc2UgPSBuZXcgVEhSRUUuTWVzaCh0cmF5R2VvbWV0cnksIHRyYXlCYXNlTWF0ZXJpYWwpO1xuICAgICAgICB0cmF5QmFzZS5wb3NpdGlvbi5zZXQoMCwgMCwgMCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRyYXlCYXNlKTtcbiAgICBcbiAgICAgICAgY29uc3QgdHJheUJhc2VTaGFwZSA9IG5ldyBDQU5OT04uQm94KG5ldyBDQU5OT04uVmVjMyg1LCAwLjI1LCA1KSk7XG4gICAgICAgIGNvbnN0IHRyYXlCYXNlQm9keSA9IG5ldyBDQU5OT04uQm9keSh7IG1hc3M6IDAgfSk7XG4gICAgICAgIHRyYXlCYXNlQm9keS5hZGRTaGFwZSh0cmF5QmFzZVNoYXBlKTtcbiAgICAgICAgdHJheUJhc2VCb2R5LnBvc2l0aW9uLnNldCgwLCAwLCAwKTtcbiAgICAgICAgdGhpcy53b3JsZC5hZGRCb2R5KHRyYXlCYXNlQm9keSk7XG4gICAgXG4gICAgICAgIC8vIOWjgeOBrumDqOWIhlxuICAgICAgICBjb25zdCB3YWxsUG9zaXRpb25zID0gW1xuICAgICAgICAgICAgeyB4OiAwLCB5OiAxLCB6OiAtNSB9LCAvLyDliY1cbiAgICAgICAgICAgIHsgeDogMCwgeTogMSwgejogNSB9LCAgLy8g5b6MXG4gICAgICAgICAgICB7IHg6IDUsIHk6IDEsIHo6IDAgfSwgIC8vIOWPs1xuICAgICAgICAgICAgeyB4OiAtNSwgeTogMSwgejogMCB9LCAvLyDlt6ZcbiAgICAgICAgXTtcbiAgICBcbiAgICAgICAgd2FsbFBvc2l0aW9ucy5mb3JFYWNoKHBvcyA9PiB7XG4gICAgICAgICAgICBjb25zdCB3YWxsID0gbmV3IFRIUkVFLk1lc2god2FsbEdlb21ldHJ5LCB0cmF5V2FsbE1hdGVyaWFsKTtcbiAgICAgICAgICAgIHdhbGwucG9zaXRpb24uc2V0KHBvcy54LCBwb3MueSwgcG9zLnopO1xuICAgICAgICAgICAgd2FsbC5yb3RhdGlvbi55ID0gcG9zLnggPT09IDAgPyAwIDogTWF0aC5QSSAvIDI7XG4gICAgICAgICAgICB0aGlzLnNjZW5lLmFkZCh3YWxsKTtcbiAgICBcbiAgICAgICAgICAgIGNvbnN0IHdhbGxTaGFwZSA9IG5ldyBDQU5OT04uQm94KG5ldyBDQU5OT04uVmVjMyg1LCAxLCAwLjI1KSk7XG4gICAgICAgICAgICBjb25zdCB3YWxsQm9keSA9IG5ldyBDQU5OT04uQm9keSh7IG1hc3M6IDAgfSk7XG4gICAgICAgICAgICB3YWxsQm9keS5hZGRTaGFwZSh3YWxsU2hhcGUpO1xuICAgICAgICAgICAgd2FsbEJvZHkucG9zaXRpb24uc2V0KHBvcy54LCBwb3MueSwgcG9zLnopO1xuICAgICAgICAgICAgd2FsbEJvZHkucXVhdGVybmlvbi5zZXRGcm9tRXVsZXIoMCwgcG9zLnggPT09IDAgPyAwIDogTWF0aC5QSSAvIDIsIDApO1xuICAgICAgICAgICAgdGhpcy53b3JsZC5hZGRCb2R5KHdhbGxCb2R5KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHByaXZhdGUgZ2V0RGljZUZhY2UoZGljZTogVEhSRUUuTWVzaCwgZGljZUJvZHk6IENBTk5PTi5Cb2R5KTogbnVtYmVyIHtcbiAgICAgICAgLy8g44K144Kk44Kz44Ot44Gu6Z2i44GM44Gp44KM44GM5LiK44Gr5ZCR44GE44Gm44GE44KL44GL44KS5Yik5pat44GZ44KLXG4gICAgICAgIGNvbnN0IHVwVmVjdG9yID0gbmV3IFRIUkVFLlZlY3RvcjMoMCwgMSwgMCk7XG4gICAgICAgIGNvbnN0IGRpY2VVcCA9IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDEsIDApLmFwcGx5UXVhdGVybmlvbihkaWNlLnF1YXRlcm5pb24pO1xuXG4gICAgICAgIC8vIOOCteOCpOOCs+ODreOBrumdouOBruazlee3muODmeOCr+ODiOODq+OCkuWumue+qVxuICAgICAgICBjb25zdCBmYWNlcyA9IFtcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDAsIDEsIDApLCAgIC8vIDFcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDAsIC0xLCAwKSwgIC8vIDZcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDEsIDAsIDApLCAgIC8vIDNcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKC0xLCAwLCAwKSwgIC8vIDRcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDEpLCAgIC8vIDVcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIC0xKSAgIC8vIDJcbiAgICAgICAgXTtcblxuICAgICAgICAvLyDlkITpnaLjga7ms5Xnt5rjg5njgq/jg4jjg6vjgajjgrXjgqTjgrPjg63jga7kuIrlkJHjgY3jg5njgq/jg4jjg6vjga7lhoXnqY3jgpLoqIjnrpfjgZfjgIHmnIDjgoLov5HjgYTpnaLjgpLliKTlrppcbiAgICAgICAgbGV0IG1heERvdCA9IC1JbmZpbml0eTtcbiAgICAgICAgbGV0IGZhY2VJbmRleCA9IDA7XG4gICAgICAgIGZhY2VzLmZvckVhY2goKGZhY2UsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkb3QgPSBNYXRoLmFicyhkaWNlVXAuZG90KGZhY2UpKTtcbiAgICAgICAgICAgIGlmIChkb3QgPiBtYXhEb3QpIHtcbiAgICAgICAgICAgICAgICBtYXhEb3QgPSBkb3Q7XG4gICAgICAgICAgICAgICAgZmFjZUluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIOmdouOBrueVquWPt+OCkui/lOOBmSAoMS02KVxuICAgICAgICByZXR1cm4gZmFjZUluZGV4ICsgMTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrRGljZVZhbHVlcyA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZGljZTFWYWx1ZSA9IHRoaXMuZ2V0RGljZUZhY2UodGhpcy5kaWNlMSwgdGhpcy5kaWNlMUJvZHkpO1xuICAgICAgICBjb25zdCBkaWNlMlZhbHVlID0gdGhpcy5nZXREaWNlRmFjZSh0aGlzLmRpY2UyLCB0aGlzLmRpY2UyQm9keSk7XG4gICAgICAgIGNvbnN0IGRpY2UzVmFsdWUgPSB0aGlzLmdldERpY2VGYWNlKHRoaXMuZGljZTMsIHRoaXMuZGljZTNCb2R5KTtcblxuICAgICAgICBjb25zdCB0b3RhbFZhbHVlID0gZGljZTFWYWx1ZSArIGRpY2UyVmFsdWUgKyBkaWNlM1ZhbHVlO1xuICAgICAgICBjb25zb2xlLmxvZyhgRGljZSAxOiAke2RpY2UxVmFsdWV9LCBEaWNlIDI6ICR7ZGljZTJWYWx1ZX0sIERpY2UgMzogJHtkaWNlM1ZhbHVlfWApO1xuICAgICAgICBjb25zb2xlLmxvZyhgVG90YWwgVmFsdWU6ICR7dG90YWxWYWx1ZX1gKTtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBjaGVja0lmRGljZVN0b3BwZWQgPSAoYm9keTogQ0FOTk9OLkJvZHkpOiBib29sZWFuID0+IHtcbiAgICAgICAgY29uc3QgdmVsb2NpdHlUaHJlc2hvbGQgPSAwLjE7XG4gICAgICAgIHJldHVybiBib2R5LnZlbG9jaXR5Lmxlbmd0aCgpIDwgdmVsb2NpdHlUaHJlc2hvbGQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVQaHlzaWNzID0gKCkgPT4ge1xuICAgICAgICB0aGlzLndvcmxkLnN0ZXAoMSAvIDYwKTtcbiAgICAgICAgdGhpcy5kaWNlMS5wb3NpdGlvbi5jb3B5KHRoaXMuZGljZTFCb2R5LnBvc2l0aW9uIGFzIHVua25vd24gYXMgVEhSRUUuVmVjdG9yMyk7XG4gICAgICAgIHRoaXMuZGljZTEucXVhdGVybmlvbi5jb3B5KHRoaXMuZGljZTFCb2R5LnF1YXRlcm5pb24gYXMgdW5rbm93biBhcyBUSFJFRS5RdWF0ZXJuaW9uKTtcbiAgICAgICAgdGhpcy5kaWNlMi5wb3NpdGlvbi5jb3B5KHRoaXMuZGljZTJCb2R5LnBvc2l0aW9uIGFzIHVua25vd24gYXMgVEhSRUUuVmVjdG9yMyk7XG4gICAgICAgIHRoaXMuZGljZTIucXVhdGVybmlvbi5jb3B5KHRoaXMuZGljZTJCb2R5LnF1YXRlcm5pb24gYXMgdW5rbm93biBhcyBUSFJFRS5RdWF0ZXJuaW9uKTtcbiAgICAgICAgdGhpcy5kaWNlMy5wb3NpdGlvbi5jb3B5KHRoaXMuZGljZTNCb2R5LnBvc2l0aW9uIGFzIHVua25vd24gYXMgVEhSRUUuVmVjdG9yMyk7XG4gICAgICAgIHRoaXMuZGljZTMucXVhdGVybmlvbi5jb3B5KHRoaXMuZGljZTNCb2R5LnF1YXRlcm5pb24gYXMgdW5rbm93biBhcyBUSFJFRS5RdWF0ZXJuaW9uKTtcblxuICAgICAgICAvLyDjgrXjgqTjgrPjg63jgYzlhajjgabmraLjgb7jgaPjgabjgYTjgovjgYvjgpLnorroqo1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5jaGVja0lmRGljZVN0b3BwZWQodGhpcy5kaWNlMUJvZHkpICYmXG4gICAgICAgICAgICB0aGlzLmNoZWNrSWZEaWNlU3RvcHBlZCh0aGlzLmRpY2UyQm9keSkgJiZcbiAgICAgICAgICAgIHRoaXMuY2hlY2tJZkRpY2VTdG9wcGVkKHRoaXMuZGljZTNCb2R5KVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0RpY2VTdG9wcGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0RpY2VTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrRGljZVZhbHVlcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc0RpY2VTdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaW5pdCk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gbmV3IFRocmVlSlNDb250YWluZXIoKTtcbiAgICBjb25zdCB2aWV3cG9ydCA9IGNvbnRhaW5lci5jcmVhdGVSZW5kZXJlckRPTShcbiAgICAgICAgNjQwLFxuICAgICAgICA0ODAsXG4gICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDEwLCAxMCwgMTApXG4gICAgKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZpZXdwb3J0KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfY2Fubm9uLWVzX2Rpc3RfY2Fubm9uLWVzX2pzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHJvbHNfT3JiLWU1OGJkMlwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==