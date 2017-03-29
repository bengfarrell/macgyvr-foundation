(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.App = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var _responsive = require('../node_modules/macgyvr/src/input/responsive.js');

var _responsive2 = _interopRequireDefault(_responsive);

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
        value: function onCreate(scene) {
            // Controller setup...starts as gaze input, but switches to Daydream on button press
            scene.controller = new _responsive2.default(scene.camera);
            scene.controller.connect();

            // Objects are added here, replace, tweak, add your own
            this.add([new _dome2.default(), new _cube2.default(), new _testscene2.default({ scene: './src/assets/tempscene.json' })]);
        }
    }, {
        key: 'onRender',
        value: function onRender(time) {}
    }]);

    return Main;
}(_baseapplication2.default);

exports.default = Main;

},{"../node_modules/macgyvr/src/baseapplication.js":5,"../node_modules/macgyvr/src/input/responsive.js":10,"./objects/cube.js":2,"./objects/dome.js":3,"./objects/testscene.js":4}],2:[function(require,module,exports){
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

var _animation = require('../../node_modules/macgyvr/src/utils/animation.js');

var _animation2 = _interopRequireDefault(_animation);

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
            var _this2 = this;

            this._pointingAt = false;
            this._material = this.createMaterial();
            this._mesh = new THREE.Mesh(this.createGeometry(), this._material);
            this.scene.controller.addPointable(this._mesh);
            this.scene.controller.addListener('button', function (type, event) {
                return _this2.onClick(type, event);
            });
            this.add(this._mesh, 'cube');
            this.group.position.z = -20;
            this._mesh.position.x = -12;
            this.animation = new _animation2.default(this);
        }

        /**
         * on click
         * @param type
         * @param event
         */

    }, {
        key: 'onClick',
        value: function onClick(type, event) {
            if (this.scene.controller.isPointingAt(this._mesh)) {
                var props = {
                    target: this._mesh,
                    duration: 3000
                };
                this.animation.animatePosition(this._mesh.position, new THREE.Vector3(Math.random() * 15, Math.random() * 15, Math.random() * 15), props);
            }
        }

        /**
         * on render
         * @param time
         */

    }, {
        key: 'onRender',
        value: function onRender(time) {
            this._mesh.rotation.y += .01;
            var pointing = this._scene.controller.isPointingAt(this._mesh);
            if (pointing !== this._pointingAt) {
                if (pointing) {
                    this._mesh.scale.set(1.05, 1.05, 1.05);
                    this._mesh.material.color.set(0xffff00);
                } else {
                    this._mesh.scale.set(1.0, 1.0, 1.0);
                    this._mesh.material.color.set(0xff0000);
                }
                this._pointingAt = pointing;
            }
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
                shading: THREE.FlatShading
            });
        }
    }]);

    return Cube;
}(_basegroup2.default);

exports.default = Cube;

},{"../../node_modules/macgyvr/src/basegroup.js":6,"../../node_modules/macgyvr/src/utils/animation.js":11}],3:[function(require,module,exports){
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
            this._mesh = new THREE.Mesh(this.createGeometry(), this.createMaterial());
            this.add(this._mesh, 'dome');

            this._particle = new THREE.Mesh(this.createParticleGeometry(), this.createParticleMaterial());
            this._particle.scale.x = this._particle.scale.y = 10;
            this.add(this._particle);
        }

        /**
         * on render
         * @param time
         */

    }, {
        key: 'onRender',
        value: function onRender(time) {
            if (this.scene.controller.connected) {
                var collisions = this.scene.controller.pointingAt([this._mesh]).collisions;
                if (collisions.length > 0) {
                    this._particle.position.copy(collisions[0].point);
                }
            }
        }

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
         * create particle geometry
         * @returns {THREE.IcosahedronGeometry}
         */

    }, {
        key: 'createParticleGeometry',
        value: function createParticleGeometry() {
            return new THREE.SphereGeometry(1, 4, 4);
        }

        /**
         * create globe material
         */

    }, {
        key: 'createMaterial',
        value: function createMaterial() {
            return new THREE.MeshPhongMaterial({
                color: 0xc1c489,
                side: THREE.BackSide,
                shininess: 10,
                shading: THREE.FlatShading
            });
        }

        /**
         * create particle material
         * @returns {MeshPhongMaterial|db|Ca|*}
         */

    }, {
        key: 'createParticleMaterial',
        value: function createParticleMaterial() {
            return new THREE.MeshPhongMaterial({
                color: 0xff0000,
                shading: THREE.FlatShading
            });
        }
    }]);

    return Dome;
}(_basegroup2.default);

exports.default = Dome;

},{"../../node_modules/macgyvr/src/basegroup.js":6}],4:[function(require,module,exports){
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

},{"../../node_modules/macgyvr/src/basegroup.js":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseApplication = function () {
    function BaseApplication(ascene) {
        _classCallCheck(this, BaseApplication);

        this._ascene = ascene;
        this._ascene.addBehavior(this);
        this.el = { isPlaying: true };
        this.onCreate(ascene);
    }

    /**
     * a-frame tick
     * @param time
     */


    _createClass(BaseApplication, [{
        key: "tick",
        value: function tick(time) {
            this.onRender(time);
        }

        /**
         * add objects to scene
         * @param grouplist
         */

    }, {
        key: "add",
        value: function add(grouplist) {
            for (var c in grouplist) {
                grouplist[c].create(this._ascene);
                this._ascene.addBehavior(grouplist[c]);
            }
        }
    }, {
        key: "onCreate",
        value: function onCreate(ascene) {}
    }, {
        key: "onRender",
        value: function onRender(time) {}
    }]);

    return BaseApplication;
}();

exports.default = BaseApplication;

},{}],6:[function(require,module,exports){
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
        this._group = new THREE.Group();

        this._config = params;
        this.onInitialize(params);

        this.el = { isPlaying: true };
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
            this._scene = scene;
            scene.object3D.add(this._group);

            if (this._config && this._config.assets) {
                // todo: determine when to use JSON Loader, OBJ loader, or whatever
                var loader = new THREE.JSONLoader();
                loader.load(this._config.assets, function (geometry, materials) {
                    _this.onAssetsLoaded(geometry, materials);
                });
            }

            if (this._config && this._config.geometry) {
                var loader = new THREE.BufferGeometryLoader();
                loader.load(this._config.geometry, function (geometry) {
                    _this.onAssetsLoaded(geometry);
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
         * on a-frame component tick
         * @param time
         */

    }, {
        key: 'tick',
        value: function tick(time) {
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
        key: 'scene',
        get: function get() {
            return this._scene;
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

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseInput = function () {
    function BaseInput() {
        _classCallCheck(this, BaseInput);

        this.connected = false;
        this._callbacks = [];
        this._pointables = [];
        this._lastPointingAtList = [];
        this.el = { isPlaying: true };
    }

    /**
     * add pointable obj
     * @param obj
     */


    _createClass(BaseInput, [{
        key: 'addPointable',
        value: function addPointable(obj) {
            this._pointables.push(obj);
        }

        /**
         * rmeove pointable object
         * @param obj
         */

    }, {
        key: 'removePointable',
        value: function removePointable(obj) {
            for (var c = 0; c < this._pointables.length; c++) {
                if (this._pointables.indexOf(obj) !== -1) {
                    this._pointables.splice(c, 1);
                }
            }
        }

        /**
         * clear all pointables
         */

    }, {
        key: 'clearPointables',
        value: function clearPointables() {
            this._pointables = [];
        }

        /**
         * connect and start listening
         */

    }, {
        key: 'connect',
        value: function connect() {
            this.connected = true;
            this.dispatchEvent('connected');
        }

        /**
         * disconnect
         */

    }, {
        key: 'disconnect',
        value: function disconnect() {
            this.connected = false;
        }

        /**
         * get orientation of device
         */

    }, {
        key: 'addListener',


        /**
         * add listener
         * @param eventtype
         * @param callback
         */
        value: function addListener(eventtype, callback) {
            this._callbacks.push({ type: eventtype, callback: callback });
        }

        /**
         * dispatch event
         * @param type
         * @param params
         */

    }, {
        key: 'dispatchEvent',
        value: function dispatchEvent(type, params) {
            for (var c = 0; c < this._callbacks.length; c++) {
                if (type === this._callbacks[c].type) {
                    this._callbacks[c].callback.apply(this, [type, params]);
                }
            }
        }

        /**
         * clear listeners
         */

    }, {
        key: 'clearListeners',
        value: function clearListeners() {
            this._callbacks = [];
        }

        /**
         * detect against possible objects
         * @param possibleObjects
         */

    }, {
        key: 'pointingAt',
        value: function pointingAt(possibleObjects) {
            return { objects: [], collisions: [] };
        }

        /**
         * check if pointing at a specific mesh
         * @param mesh
         * @returns {boolean}
         */

    }, {
        key: 'isPointingAt',
        value: function isPointingAt(mesh) {
            return this.pointingAt([mesh]).objects.indexOf(mesh) !== -1;
        }
    }, {
        key: 'orientation',
        get: function get() {}
    }]);

    return BaseInput;
}();

exports.default = BaseInput;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _baseinput = require('./baseinput.js');

var _baseinput2 = _interopRequireDefault(_baseinput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Daydream = function (_BaseInput) {
    _inherits(Daydream, _BaseInput);

    function Daydream(camera) {
        _classCallCheck(this, Daydream);

        var _this = _possibleConstructorReturn(this, (Daydream.__proto__ || Object.getPrototypeOf(Daydream)).call(this));

        _this._camera = camera;
        _this._controller = new DaydreamController();
        _this._controller.onStateChange(function (state) {
            return _this.onControllerUpdate(state);
        });
        _this._sensorfusion = new MadgwickAHRS();
        _this._sensorfusion.setQuaternion([0.7071067811865475, 0, 0, 0.7071067811865475]); // Hack-ish: Rotate internal quaternion
        _this._buttons = {
            app: false,
            home: false,
            click: false,
            volumePlus: false,
            volumeMinus: false,
            xTouch: 0,
            yTouch: 0
        };
        return _this;
    }

    /**
     * connect and start listening
     */


    _createClass(Daydream, [{
        key: 'connect',
        value: function connect() {
            this.createButton();
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
                var event = { changed: changed, controllerstate: state };
                if (this._pointables.length > 0) {
                    event.pointingat = this.pointingAt(this._pointables);
                }
                this.dispatchEvent('button', { changed: changed, controllerstate: state });
            }
        }

        /**
         * on click to connect controller
         */

    }, {
        key: 'onConnectController',
        value: function onConnectController() {
            _get(Daydream.prototype.__proto__ || Object.getPrototypeOf(Daydream.prototype), 'connect', this).call(this);
            this._controller.connect();
            this.dispatchEvent('connected');
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
            if (!possibleObjects) {
                possibleObjects = this._pointables;
            }

            var m = new THREE.Matrix4().makeRotationFromQuaternion(this.orientation);
            var direction = new THREE.Vector3(0, 0, -1);
            direction = direction.applyMatrix4(m);

            var raycaster = new THREE.Raycaster();
            raycaster.set(this._camera.position, direction);
            var collisions = raycaster.intersectObjects(possibleObjects);
            var objects = [];
            for (var c = 0; c < collisions.length; c++) {
                if (objects.indexOf(collisions[c].object) == -1) {
                    objects.push(collisions[c].object);
                }
            }
            return { objects: objects, collisions: collisions };
        }
    }, {
        key: 'createButton',
        value: function createButton() {
            var _this2 = this;

            var button = document.createElement('button');
            button.className = 'a-enter-vr-button';
            button.title = 'Connect to Daydream Controller';
            var s = button.style;
            s.left = '30px';
            s.background = 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MCAzMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTAgMzA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDpub25lO3N0cm9rZTojRkZGRkZGO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1taXRlcmxpbWl0OjEwO30KCS5zdDF7ZmlsbDojRkZGRkZGO30KPC9zdHlsZT4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTM4LjMsOC40YzMuNSwwLDYuNSwzLDYuNSw2LjVzLTMsNi43LTYuNyw2LjdsLTI3LjYsMGMtMy43LDAtNi43LTMtNi43LTYuN2MwLTMuNywzLjItNi41LDYuOS02LjVMMzguMyw4LjR6IgoJLz4KPGNpcmNsZSBjbGFzcz0ic3QxIiBjeD0iMjguMSIgY3k9IjE0LjkiIHI9IjIuNyIvPgo8Y2lyY2xlIGNsYXNzPSJzdDEiIGN4PSIyMS43IiBjeT0iMTQuOSIgcj0iMi43Ii8+CjxjaXJjbGUgY2xhc3M9InN0MSIgY3g9IjM4LjMiIGN5PSIxNC45IiByPSI2LjUiLz4KPC9zdmc+Cg==") 50% 50%/70% 70% no-repeat rgba(0,0,0,.35)';

            // Prevent button from being selected and dragged.
            button.draggable = false;
            button.addEventListener('dragstart', function (e) {
                e.preventDefault();
            });

            // Style it on hover.
            button.addEventListener('mouseenter', function (e) {
                s.filter = s.webkitFilter = 'drop-shadow(0 0 5px rgba(255,255,255,1))';
            });
            button.addEventListener('mouseleave', function (e) {
                s.filter = s.webkitFilter = '';
            });

            // assign click event
            button.addEventListener('click', function (e) {
                return _this2.onConnectController(e);
            });

            document.querySelector('.a-enter-vr').appendChild(button);
        }
    }, {
        key: 'orientation',
        get: function get() {
            if (!this.connected) {
                return new THREE.Quaternion();
            }
            var q1 = new THREE.Quaternion().fromArray(this._sensorfusion.getQuaternion());
            var q2 = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
            return q2.multiply(q1);
        }
    }]);

    return Daydream;
}(_baseinput2.default);

exports.default = Daydream;

},{"./baseinput.js":7}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _baseinput = require('./baseinput.js');

var _baseinput2 = _interopRequireDefault(_baseinput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GazeInput = function (_BaseInput) {
    _inherits(GazeInput, _BaseInput);

    function GazeInput(camera) {
        _classCallCheck(this, GazeInput);

        var _this = _possibleConstructorReturn(this, (GazeInput.__proto__ || Object.getPrototypeOf(GazeInput)).call(this));

        _this._camera = camera;
        return _this;
    }

    /**
     * connect and start listening
     */


    _createClass(GazeInput, [{
        key: 'connect',
        value: function connect() {
            var _this2 = this;

            _get(GazeInput.prototype.__proto__ || Object.getPrototypeOf(GazeInput.prototype), 'connect', this).call(this);
            document.body.addEventListener('mousedown', function (e) {
                return _this2.onClick(e);
            });
        }

        /**
         * disconnect
         */

    }, {
        key: 'disconnect',
        value: function disconnect() {
            var _this3 = this;

            _get(GazeInput.prototype.__proto__ || Object.getPrototypeOf(GazeInput.prototype), 'disconnect', this).call(this);
            document.body.removeEventListener('mousedown', function (e) {
                return _this3.onClick(e);
            });
        }

        /**
         * on body click
         */

    }, {
        key: 'onClick',
        value: function onClick(event) {
            var e = {};
            this.dispatchEvent('button', e);
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
            if (!possibleObjects) {
                possibleObjects = this._pointables;
            }
            var raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(new THREE.Vector2(0, 0), this._camera);
            var collisions = raycaster.intersectObjects(possibleObjects);
            var objects = [];
            for (var c = 0; c < collisions.length; c++) {
                if (objects.indexOf(collisions[c].object) == -1) {
                    objects.push(collisions[c].object);
                }
            }
            return { objects: objects, collisions: collisions };
        }
    }, {
        key: 'orientation',
        get: function get() {
            return this._camera.quaternion;
        }
    }]);

    return GazeInput;
}(_baseinput2.default);

exports.default = GazeInput;

},{"./baseinput.js":7}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseinput = require('./baseinput.js');

var _baseinput2 = _interopRequireDefault(_baseinput);

var _gaze = require('./gaze.js');

var _gaze2 = _interopRequireDefault(_gaze);

var _daydream = require('./daydream.js');

var _daydream2 = _interopRequireDefault(_daydream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResponsiveInput = function (_BaseInput) {
    _inherits(ResponsiveInput, _BaseInput);

    function ResponsiveInput(camera) {
        _classCallCheck(this, ResponsiveInput);

        var _this = _possibleConstructorReturn(this, (ResponsiveInput.__proto__ || Object.getPrototypeOf(ResponsiveInput)).call(this));

        _this.connected = false;
        _this._gaze = new _gaze2.default(camera);
        _this._daydream = new _daydream2.default(camera);
        _this._activeInput = _this._gaze;

        _this._gaze.addListener('button', function (eventtype, event) {
            return _this.onGazeInputClick(eventtype, event);
        });
        _this._gaze.addListener('pointingat', function (eventtype, event) {
            return _this.onPointingAt(eventtype, event);
        });
        _this._gaze.connect();

        // connecting to daydream just puts a button in the scene because Bluetooth must be initiated by a user
        _this._daydream.connect();
        _this._daydream.addListener('connected', function () {
            return _this.onDayDreamConnected();
        });
        _this._daydream.addListener('button', function () {
            return _this.onDayDreamButtonClick();
        });
        return _this;
    }

    /**
     * on render
     */


    _createClass(ResponsiveInput, [{
        key: 'onRender',
        value: function onRender() {
            this._activeInput.onRender();
        }

        /**
         * add pointable obj
         * @param obj
         */

    }, {
        key: 'addPointable',
        value: function addPointable(obj) {
            this._gaze.addPointable(obj);
            this._daydream.addPointable(obj);
        }

        /**
         * rmeove pointable object
         * @param obj
         */

    }, {
        key: 'removePointable',
        value: function removePointable(obj) {
            this._gaze.removePointable(obj);
            this._daydream.removePointable(obj);
        }

        /**
         * clear all pointables
         */

    }, {
        key: 'clearPointables',
        value: function clearPointables() {
            this._gaze.clearPointables();
            this._daydream.clearPointables();
        }

        /**
         * connect and start listening
         */

    }, {
        key: 'connect',
        value: function connect() {
            this.connected = true;
            this.dispatchEvent('connected');
        }

        /**
         * on gaze input click
         */

    }, {
        key: 'onGazeInputClick',
        value: function onGazeInputClick(eventtype, event) {
            event.changed = [{ gazeclick: 'click' }];
            event.state = { orientation: this._gaze.orientation };
            this.dispatchEvent('button', event);
        }

        /**
         * on daydream bluetooth connected
         */

    }, {
        key: 'onDayDreamConnected',
        value: function onDayDreamConnected() {
            this._activeInput = this._daydream;
        }

        /**
         * on daydream button click
         */

    }, {
        key: 'onDayDreamButtonClick',
        value: function onDayDreamButtonClick() {
            this.dispatchEvent('button', event);
        }

        /**
         * get orientation of device
         */

    }, {
        key: 'addListener',


        /**
         * add listener
         * @param eventtype
         * @param callback
         */
        value: function addListener(eventtype, callback) {
            this._callbacks.push({ type: eventtype, callback: callback });
        }

        /**
         * detect against possible objects
         * @param possibleObjects
         */

    }, {
        key: 'pointingAt',
        value: function pointingAt(possibleObjects) {
            return this._activeInput.pointingAt(possibleObjects);
        }

        /**
         * check if pointing at a specific mesh
         * @param mesh
         * @returns {boolean}
         */

    }, {
        key: 'isPointingAt',
        value: function isPointingAt(mesh) {
            return this._activeInput.isPointingAt(mesh);
        }
    }, {
        key: 'orientation',
        get: function get() {
            return this._activeInput.orientation;
        }
    }]);

    return ResponsiveInput;
}(_baseinput2.default);

exports.default = ResponsiveInput;

},{"./baseinput.js":7,"./daydream.js":8,"./gaze.js":9}],11:[function(require,module,exports){
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
        _classCallCheck(this, Tween);
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
            var _this = this;

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
                return _this.animateColorStep(step);
            });

            var anim = this.createTween(to, from, options);
            anim.start();
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
            var _this2 = this;

            from = { x: from.x, y: from.y, z: from.z };
            to = { x: to.x, y: to.y, z: to.z };
            from = this.populateStartAnimationObject(from, options);
            from.animation.step.push(function (step) {
                return _this2.animatePositionStep(step);
            });
            var anim = this.createTween(to, from, options);
            anim.start();
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
            if (!options.step) {
                throw new Error('Please define a "step" property on options to specify a callback for each animation update');
            }

            from = this.populateStartAnimationObject(from, to);
            var anim = this.createTween(to, from, options);
            anim.start();
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
            return new TWEEN.Tween(from, options).to(to, options.duration).onUpdate(function (value) {
                for (var d = 0; d < this.animation.step.length; d++) {
                    this.animation.step[d].apply(this, [this]);
                }
            }).onComplete(function () {
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
         */
        /*onRender(time) {
            var running = [];
            for (var c = 0; c < this.animations.length; c++) {
                if (this.animations[c].animation.animating) {
                    running.push(this.animations[c]);
                    console.log(this.animations[c])
                    for (var d = 0; d < this.animations[c].animation.step.length; d++) {
                        this.animations[c].update();
                        //this.animations[c].animation.step[d].apply(this, [this.animations[c]]);
                    }
                }
            }
            this.animations = running;
        }*/

    }]);

    return Tween;
}();

exports.default = Tween;

},{"../utils/color.js":12}],12:[function(require,module,exports){
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

},{}]},{},[1])(1)
});

//# sourceMappingURL=build.js.map
