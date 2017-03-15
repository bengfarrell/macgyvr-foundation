(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.App = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseApplication = function () {
    function BaseApplication(scene) {
        _classCallCheck(this, BaseApplication);

        scene.registerApplication(this);
    }

    _createClass(BaseApplication, [{
        key: "onCreate",
        value: function onCreate(scene, scenecollection) {}
    }, {
        key: "onPreRender",
        value: function onPreRender(time) {}
    }, {
        key: "onRender",
        value: function onRender(time) {}
    }]);

    return BaseApplication;
}();

exports.default = BaseApplication;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseGroup = function () {
    function BaseGroup(params) {
        _classCallCheck(this, BaseGroup);

        /**
         * parent group of child objects we will create
         * @type {THREE.Object3D}
         * @private
         */
        this._group = new THREE.Object3D();

        /** additional render hooks we can add */
        this._renderHooks = [];

        this._config = params;
        this.onInitialize(params);
    }

    /**
     * get name of group
     */


    _createClass(BaseGroup, [{
        key: 'onCreate',


        /**
         * overridable methods
         * leave empty to be a simple abstraction we don't have to call super on
         * @param scene
         */
        value: function onCreate(scene) {}
    }, {
        key: 'onRender',
        value: function onRender(scene, time) {}
    }, {
        key: 'onInitialize',
        value: function onInitialize(params) {}
    }, {
        key: 'onAssetsLoaded',
        value: function onAssetsLoaded(geometry, material) {}
    }, {
        key: 'onJSONSceneLoadProgress',
        value: function onJSONSceneLoadProgress(progress) {}
    }, {
        key: 'onJSONSceneLoadError',
        value: function onJSONSceneLoadError(err) {}
    }, {
        key: 'onJSONSceneLoaded',
        value: function onJSONSceneLoaded(scene) {
            this.add(scene);
        }
    }, {
        key: 'create',


        /**
         * on create scene (or earliest possible opportunity)
         * @param scene
         */
        value: function create(scene) {
            var _this = this;

            this._group.name = this.name;
            this._sceneCollection = scene;
            scene.scene.add(this._group);

            if (this._config && this._config.assets) {
                // todo: determine when to use JSON Loader, OBJ loader, or whatever
                var loader = new THREE.JSONLoader();
                loader.load(this._config.assets, function (geometry, materials) {
                    _this.onAssetsLoaded(geometry, materials);
                });
            }

            if (this._config && this._config.scene) {
                var loader = new THREE.ObjectLoader();
                loader.load(this._config.scene, function (loaded) {
                    _this.onJSONSceneLoaded(loaded);
                }, function (progress) {
                    _this.onJSONSceneLoadProgress(progress);
                }, function (err) {
                    _this.onJSONSceneLoadError(err);
                });
            }

            this.onCreate();
        }

        /**
         * add object to scene
         * @param object
         * @param name
         */

    }, {
        key: 'add',
        value: function add(object, name) {
            if (!name) {
                name = this.name + '-child';
            }
            object.name = name;
            this._group.add(object);
        }
    }, {
        key: 'addRenderHook',
        value: function addRenderHook(method) {
            this._renderHooks.push(method);
        }

        /**
         * get parent group object
         * @returns {THREE.Object3D}
         */

    }, {
        key: 'preRender',


        /**
         * on prerender scene
         * @param scene
         */
        value: function preRender() {}

        /**
         * on render scene
         * @param time
         */

    }, {
        key: 'render',
        value: function render(time) {
            for (var c = 0; c < this._renderHooks.length; c++) {
                this._renderHooks[c].apply(this, [time]);
            }
            this.onRender(time);
        }
    }, {
        key: 'name',
        get: function get() {
            return this.constructor.name;
        }
    }, {
        key: 'group',
        get: function get() {
            return this._group;
        }

        /**
         * get scene
         * @returns {THREE.Object3D}
         */

    }, {
        key: 'sceneCollection',
        get: function get() {
            return this._sceneCollection;
        }

        /**
         * get children of this group
         * @returns {Array}
         */

    }, {
        key: 'children',
        get: function get() {
            return this._group.children;
        }
    }]);

    return BaseGroup;
}();

exports.default = BaseGroup;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Daydream = function () {
    function Daydream() {
        var _this = this;

        _classCallCheck(this, Daydream);

        this.connected = false;
        this._callbacks = [];
        this._controller = new DaydreamController();
        this._controller.onStateChange(function (state) {
            return _this.onControllerUpdate(state);
        });
        this._sensorfusion = new MadgwickAHRS();
        this._sensorfusion.setQuaternion([0.7071067811865475, 0, 0, 0.7071067811865475]); // Hack-ish: Rotate internal quaternion
        this._buttons = {
            app: false,
            home: false,
            click: false,
            volumePlus: false,
            volumeMinus: false,
            xTouch: 0,
            yTouch: 0
        };
    }

    /**
     * connect and start listening
     */


    _createClass(Daydream, [{
        key: 'start',
        value: function start() {
            this._controller.connect();
            this.connected = true;
        }

        /**
         * on controller update
         * @param state
         */

    }, {
        key: 'onControllerUpdate',
        value: function onControllerUpdate(state) {
            this._sensorfusion.update(state.xGyro, state.yGyro, state.zGyro, state.xAcc, state.yAcc, state.zAcc, state.xOri, state.yOri, state.zOri);

            var changed = [];
            if (state.isClickDown !== this._buttons.click) {
                this._buttons.click = state.isClickDown;
                changed.push({ 'click': state.isClickDown });
            }

            if (state.isAppDown !== this._buttons.app) {
                this._buttons.app = state.isAppDown;
                changed.push({ 'app': state.isAppDown });
            }

            if (state.isHomeDown !== this._buttons.home) {
                this._buttons.home = state.isHomeDown;
                changed.push({ 'home': state.isHomeDown });
            }

            if (state.isVolMinusDown !== this._buttons.volumeMinus) {
                this._buttons.volumeMinus = state.isVolMinusDown;
                changed.push({ 'volumeMinus': state.isVolMinusDown });
            }

            if (state.isVolPlusDown !== this._buttons.volumePlus) {
                this._buttons.volumePlus = state.isVolPlusDown;
                changed.push({ 'volumePlus': state.isVolPlusDown });
            }

            if (state.xTouch !== this._buttons.xTouch && state.yTouch !== this._buttons.yTouch) {
                changed.push({ 'touch': { x: state.xTouch, y: state.yTouch } });
            }

            if (changed.length > 0) {
                for (var c = 0; c < this._callbacks.length; c++) {
                    this._callbacks[c].apply(this, [changed, state]);
                }
            }
        }

        /**
         * get orientation of device
         */

    }, {
        key: 'addListener',


        /**
         * add listener
         * @param callback
         */
        value: function addListener(callback) {
            this._callbacks.push(callback);
        }

        /**
         * detect against possible objects
         * @param possibleObjects
         */

    }, {
        key: 'pointingAt',
        value: function pointingAt(possibleObjects) {
            var raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(new THREE.Vector2(0, 0), this.sceneCollection.camera);
            var collisions = raycaster.intersectObjects(possibleObjects);
            return collisions;
        }
    }, {
        key: 'orientation',
        get: function get() {
            var q = new THREE.Quaternion();
            var sf = this._sensorfusion.getQuaternion();
            sf.y -= Math.PI / 2;
            q = q.fromArray(sf);
            return q;
        }
    }]);

    return Daydream;
}();

exports.default = Daydream;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GazeInput = function () {
    function GazeInput(camera) {
        var _this = this;

        _classCallCheck(this, GazeInput);

        this._camera = camera;
        this.connected = false;
        this._callbacks = [];
        document.body.addEventListener('mousedown', function (e) {
            return _this.onClick(e);
        });
    }

    /**
     * connect and start listening
     */


    _createClass(GazeInput, [{
        key: 'start',
        value: function start() {
            this.connected = true;
        }

        /**
         * add listener
         * @param callback
         */

    }, {
        key: 'addListener',
        value: function addListener(callback) {
            this._callbacks.push(callback);
        }

        /**
         * on body click
         */

    }, {
        key: 'onClick',
        value: function onClick(event) {
            for (var c = 0; c < this._callbacks.length; c++) {
                this._callbacks[c].apply(this);
            }
        }

        /**
         * get orientation of device
         */

    }, {
        key: 'pointingAt',


        /**
         * detect against possible objects
         * @param possibleObjects
         */
        value: function pointingAt(possibleObjects) {
            var raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(new THREE.Vector2(0, 0), this._camera);
            var collisions = raycaster.intersectObjects(possibleObjects);
            return collisions;
        }
    }, {
        key: 'orientation',
        get: function get() {
            return this._camera.quaternion;
        }
    }]);

    return GazeInput;
}();

exports.default = GazeInput;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _color = require('../utils/color.js');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tween = function () {
    function Tween(group) {
        var _this = this;

        _classCallCheck(this, Tween);

        if (!createjs) {
            throw new Error('CreateJS Tween must be included in your build or linked via script to animate');
            return;
        }
        group.addRenderHook(function (scene, time) {
            return _this.onRender(scene, time);
        });
        this.animations = [];
    }

    /**
     * animate THREE.js mesh position property
     * @param {int} from
     * @param {int} to
     * @param options
     */


    _createClass(Tween, [{
        key: 'animateColor',
        value: function animateColor(from, to, options) {
            var _this2 = this;

            if ((typeof from === 'undefined' ? 'undefined' : _typeof(from)) !== 'object') {
                if (typeof from !== 'number' && from.charAt(0) === '#') {
                    from = Number('0x' + from.substr(1, from.length));
                    from = _color2.default.decToRGB(from);
                } else {
                    from = _color2.default.decToRGB(from);
                }
            }

            if ((typeof to === 'undefined' ? 'undefined' : _typeof(to)) !== 'object') {
                if (typeof to !== 'number' && to.charAt(0) === '#') {
                    to = Number('0x' + to.substr(1, to.length));
                    to = _color2.default.decToRGB(to);
                } else {
                    to = _color2.default.decToRGB(to);
                }
            }

            from = this.populateStartAnimationObject(from, options);
            from.animation.step.push(function (step) {
                return _this2.animateColorStep(step);
            });
            this.createTween(to, from, options);
            this.animations.push(from);
        }

        /**
         * animate THREE.js mesh position property
         * @param {Three.js Vector3} from
         * @param {Three.js Vector3} to
         * @param options
         */

    }, {
        key: 'animatePosition',
        value: function animatePosition(from, to, options) {
            var _this3 = this;

            from = { x: from.x, y: from.y, z: from.z };
            to = { x: to.x, y: to.y, z: to.z };
            from = this.populateStartAnimationObject(from, options);
            from.animation.step.push(function (step) {
                return _this3.animatePositionStep(step);
            });
            this.createTween(to, from, options);
            this.animations.push(from);
        }

        /**
         * create and start animation
         * @param from
         * @param to
         * @param options
         */

    }, {
        key: 'animate',
        value: function animate(from, to, options) {
            if (!createjs) {
                throw new Error('CreateJS Tween must be included in your build or linked via script to animate');
                return;
            }

            if (!options.step) {
                throw new Error('Please define a "step" property on options to specify a callback for each animation update');
            }

            from = this.populateStartAnimationObject(from, to);
            this.createTween(to, from, options);
            this.animations.push(from);
        }

        /**
         * populate animation start object
         * @param from
         * @param options
         * @returns {*}
         */

    }, {
        key: 'populateStartAnimationObject',
        value: function populateStartAnimationObject(from, options) {
            from.animation = {};
            from.animation.animating = true;
            from.animation.step = [];
            if (options.step) {
                from.animation.step.push(options.step);
            }
            from.animation.target = options.target;
            from.animation.loop = options.loop;
            from.animation.complete = options.complete;
            return from;
        }

        /**
         * create tween
         * @param to
         * @param from
         * @param options
         * @returns {Tween}
         */

    }, {
        key: 'createTween',
        value: function createTween(to, from, options) {
            createjs.Tween.get(from, options).to(to, options.duration).call(function () {
                if (!this._loop) {
                    this.animation.animating = false;
                }
                if (this.animation.complete) {
                    this.animation.complete.apply(this, [this]);
                }
            });
        }

        /**
         * animate step for Three.JS position
         * @param step
         */

    }, {
        key: 'animatePositionStep',
        value: function animatePositionStep(step) {
            step.animation.target.position.set(step.x, step.y, step.z);
        }

        /**
         * animate step for Three.JS material color
         * @param step
         */

    }, {
        key: 'animateColorStep',
        value: function animateColorStep(step) {
            step.animation.target.material.color.setRGB(step.r / 255, step.g / 255, step.b / 255);
        }

        /**
         * animate render hook
         * @param time
         * @param scene
         */

    }, {
        key: 'onRender',
        value: function onRender(scene, time) {
            var running = [];
            for (var c = 0; c < this.animations.length; c++) {
                if (this.animations[c].animation.animating) {
                    running.push(this.animations[c]);
                    for (var d = 0; d < this.animations[c].animation.step.length; d++) {
                        this.animations[c].animation.step[d].apply(this, [this.animations[c]]);
                    }
                }
            }
            this.animations = running;
        }
    }]);

    return Tween;
}();

exports.default = Tween;

},{"../utils/color.js":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    /**
     * turn decimal color to RGB
     * @param dec
     * @returns {{r: number, g: number, b: number}}
     */
    decToRGB: function decToRGB(dec) {
        var r = dec >> 16 & 0xff;
        var g = dec >> 8 & 0xff;
        var b = dec & 0xff;
        return { r: r, g: g, b: b };
    },
    RGBToDec: function RGBToDec(rgb) {
        return rgb.r << 16 + rgb.g << 16 + rgb.b;
    }
};

},{}],7:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _baseapplication = require('../node_modules/macgyvr/src/baseapplication.js');

var _baseapplication2 = _interopRequireDefault(_baseapplication);

var _cube = require('./objects/cube.js');

var _cube2 = _interopRequireDefault(_cube);

var _dome = require('./objects/dome.js');

var _dome2 = _interopRequireDefault(_dome);

var _testscene = require('./objects/testscene.js');

var _testscene2 = _interopRequireDefault(_testscene);

var _daydream = require('../node_modules/macgyvr/src/plugins/input/daydream.js');

var _daydream2 = _interopRequireDefault(_daydream);

var _gaze = require('../node_modules/macgyvr/src/plugins/input/gaze.js');

var _gaze2 = _interopRequireDefault(_gaze);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Main = function (_BaseApplication) {
    _inherits(Main, _BaseApplication);

    function Main() {
        _classCallCheck(this, Main);

        return _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).apply(this, arguments));
    }

    _createClass(Main, [{
        key: 'onCreate',
        value: function onCreate(scene, scenecollection) {
            this._sceneCollection = scenecollection;

            /**
             * Daydream controller
             */
            /*this._sceneCollection.input = new DaydreamInput();
            document.querySelector('.connect-button').addEventListener('click', e => {
                e.target.remove();
                this._sceneCollection.input.start();
            });*/

            /**
             * Gaze Input
             */
            //this._sceneCollection.input = new GazeInput(scenecollection.camera);
            //this._sceneCollection.input.start();

            scene.addObjects([new _dome2.default(), new _cube2.default(), new _testscene2.default({ scene: './src/assets/tempscene.json' })]);
        }
    }, {
        key: 'onRender',
        value: function onRender(time) {}
    }]);

    return Main;
}(_baseapplication2.default);

exports.default = Main;

},{"../node_modules/macgyvr/src/baseapplication.js":1,"../node_modules/macgyvr/src/plugins/input/daydream.js":3,"../node_modules/macgyvr/src/plugins/input/gaze.js":4,"./objects/cube.js":8,"./objects/dome.js":9,"./objects/testscene.js":10}],8:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _basegroup = require('../../node_modules/macgyvr/src/basegroup.js');

var _basegroup2 = _interopRequireDefault(_basegroup);

var _tween = require('../../node_modules/macgyvr/src/plugins/tween.js');

var _tween2 = _interopRequireDefault(_tween);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Cube = function (_BaseGroup) {
    _inherits(Cube, _BaseGroup);

    function Cube() {
        _classCallCheck(this, Cube);

        return _possibleConstructorReturn(this, (Cube.__proto__ || Object.getPrototypeOf(Cube)).apply(this, arguments));
    }

    _createClass(Cube, [{
        key: 'onCreate',

        /**
         * on create scene (or earliest possible opportunity)
         * @param scene
         */
        value: function onCreate() {
            this._material = this.createMaterial();
            this._mesh = new THREE.Mesh(this.createGeometry(), this._material);
            this.add(this._mesh, 'cube');
            this.group.position.z = -20;
            this.tweener = new _tween2.default(this);
            //this.input = new GazeInput(this.sceneCollection, [this._mesh]);
            //this.input.addListener( (objects) => this.onGazeInput(objects));
            //this.sceneCollection.input.addListener( (changed, state) => this.onInput(changed, state));
        }

        /**
         * on object click event
         * @param collisions
         */

    }, {
        key: 'onInput',
        value: function onInput() {
            var pointingAt = this.sceneCollection.input.pointingAt([this._mesh]);
            if (pointingAt.length > 0 && pointingAt[0].object === this._mesh) {
                var props = {
                    target: this._mesh,
                    duration: 3000
                };
                this.tweener.animateColor(0xff0000, 0x00ff00, props);
                this.tweener.animatePosition(new THREE.Vector3(0, 0, 0), new THREE.Vector3(10, 6, 3), props);
            }
        }

        /**
         * on day dream input
         * @param changed
         * @param state
         */

    }, {
        key: 'onDayDreamInput',
        value: function onDayDreamInput(changed, state) {}

        /**
         * on render
         * @param time
         */

    }, {
        key: 'onRender',
        value: function onRender(time) {
            this.group.rotation.y += .01;
        }

        /**
         * create globe geometry
         * @returns {THREE.IcosahedronGeometry}
         */

    }, {
        key: 'createGeometry',
        value: function createGeometry() {
            return new THREE.CubeGeometry(5, 5, 5, 10, 10);
        }

        /**
         * create globe material
         */

    }, {
        key: 'createMaterial',
        value: function createMaterial() {
            return new THREE.MeshPhongMaterial({
                color: 0xff0000,
                shininess: 10,
                shading: THREE.FlatShading,
                transparent: true,
                opacity: 1
            });
        }
    }]);

    return Cube;
}(_basegroup2.default);

exports.default = Cube;

},{"../../node_modules/macgyvr/src/basegroup.js":2,"../../node_modules/macgyvr/src/plugins/tween.js":5}],9:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _basegroup = require('../../node_modules/macgyvr/src/basegroup.js');

var _basegroup2 = _interopRequireDefault(_basegroup);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Dome = function (_BaseGroup) {
    _inherits(Dome, _BaseGroup);

    function Dome() {
        _classCallCheck(this, Dome);

        return _possibleConstructorReturn(this, (Dome.__proto__ || Object.getPrototypeOf(Dome)).apply(this, arguments));
    }

    _createClass(Dome, [{
        key: 'onCreate',

        /**
         * on create scene (or earliest possible opportunity)
         */
        value: function onCreate() {
            this._material = this.createMaterial();
            this._coloredFace = 0;
            this._mesh = new THREE.Mesh(this.createGeometry(), this._material);

            // hack because for some reason, the set color is different when setting each face than the original material
            for (var c = 0; c < this._mesh.geometry.faces.length; c++) {
                this._mesh.geometry.faces[c].color.set(0xc1c489);
            }
            this.add(this._mesh, 'dome');
        }

        /**
         * on render
         * @param time
         */

    }, {
        key: 'onRender',
        value: function onRender(time) {
            /*if (this.sceneCollection.input.connected) {
                var direction = new THREE.Vector3( 0, 0, -1).applyQuaternion( this.sceneCollection.input.orientation );
                var raycaster = new THREE.Raycaster();
                raycaster.set( this.sceneCollection.camera.position, direction );
                var collisions = raycaster.intersectObjects( [this._mesh] );
                if (collisions.length > 0) {
                    this._mesh.geometry.faces[this._coloredFace].color.set(0xc1c489);
                    this._coloredFace = collisions[0].faceIndex;
                    this._mesh.geometry.faces[this._coloredFace].color.set(0xff9145);
                    this._mesh.geometry.colorsNeedUpdate = true;
                }
            }*/
        }
    }, {
        key: 'onInput',
        value: function onInput() {}

        /**
         * create globe geometry
         * @returns {THREE.IcosahedronGeometry}
         */

    }, {
        key: 'createGeometry',
        value: function createGeometry() {
            return new THREE.IcosahedronGeometry(800, 2);
        }

        /**
         * create globe material
         */

    }, {
        key: 'createMaterial',
        value: function createMaterial() {
            return new THREE.MeshPhongMaterial({
                color: 0xc1c489,
                vertexColors: THREE.FaceColors,
                side: THREE.BackSide,
                shininess: 10,
                shading: THREE.FlatShading
            });
        }
    }]);

    return Dome;
}(_basegroup2.default);

exports.default = Dome;

},{"../../node_modules/macgyvr/src/basegroup.js":2}],10:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;if (getter === undefined) {
      return undefined;
    }return getter.call(receiver);
  }
};

var _basegroup = require('../../node_modules/macgyvr/src/basegroup.js');

var _basegroup2 = _interopRequireDefault(_basegroup);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var TestScene = function (_BaseGroup) {
  _inherits(TestScene, _BaseGroup);

  function TestScene() {
    _classCallCheck(this, TestScene);

    return _possibleConstructorReturn(this, (TestScene.__proto__ || Object.getPrototypeOf(TestScene)).apply(this, arguments));
  }

  _createClass(TestScene, [{
    key: 'onCreate',

    /**
     * on create scene (or earliest possible opportunity)
     */
    value: function onCreate() {}
  }, {
    key: 'onJSONSceneLoaded',
    value: function onJSONSceneLoaded(scene) {
      _get(TestScene.prototype.__proto__ || Object.getPrototypeOf(TestScene.prototype), 'onJSONSceneLoaded', this).call(this, scene);
      this._cube = scene.getObjectByName('Box 1');
      this._sphere = scene.getObjectByName('Sphere 2');
    }
  }, {
    key: 'onRender',

    /**
     * on render
     * @param time
     */
    value: function onRender(time) {}
  }]);

  return TestScene;
}(_basegroup2.default);

exports.default = TestScene;

},{"../../node_modules/macgyvr/src/basegroup.js":2}]},{},[7])(7)
});

//# sourceMappingURL=build.js.map
