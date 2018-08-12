/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./dev/modular-2.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dev/core.js":
/*!*********************!*\
  !*** ./dev/core.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\n// Creates an error-string with modular-format\nfunction err(i) {\n    var args = Modular.data.errors[i];\n    var type = \"[\" + args[0] + \"]\";\n    args.shift();\n\n    var position = args.length > 1 ? \"\\n@ Modular.\" + args.pop() + \"()\\n\" : \"\";\n    var error = args.map(function (arg) {\n        return \"\\n--> \" + arg + \"\\n\";\n    }).join(\"\");\n\n    return \"\\uD83D\\uDEA8 (Modular-2): \" + type + \"\\n\" + error + position;\n}\n\n// Transforms \"impure\" objects into something modular can work with\nfunction getAttr(attributes) {\n    var obj = {};\n\n    Array.from(attributes).map(function (attribute) {\n        obj[attribute.name] = attribute.value;\n    });\n\n    return obj;\n}\n\n// Transforming given values into DOM-elements\nfunction getHtml(value) {\n    value = value || \"\";\n\n    if (value instanceof Element) return value;else if (value.constructor === Function) return Modular.core.getHtml(value());else if (value.constructor === Array) {\n        if (!value.length) return Modular.core.getHtml(\"\");\n        var el = document.createElement(\"div\");\n        value.map(function (arrEl) {\n            return el.appendChild(Modular.core.getHtml(arrEl));\n        });\n        return el;\n    } else if (value.constructor === String || value.constructor === Number) return document.createTextNode(value);else if (value.constructor === Object) {\n        if (value.__config__ && value.__config__.type !== \"modular-element\") throw Modular.core.err(2);\n        return value.__config__.render();\n    } else throw Modular.core.err(3);\n}\n\n// Transforms different types of style into inline\nfunction getStyle(val) {\n    var style = val;\n    if (typeof style === \"function\") style = style();\n    if ((typeof style === \"undefined\" ? \"undefined\" : _typeof(style)) === \"object\") {\n        var wrapper = document.createElement(\"div\");\n        Object.assign(wrapper.style, style);\n        style = wrapper.getAttribute(\"style\");\n    }\n\n    if (typeof style !== \"string\") throw new Error(Modular.core.err(6));\n    return style;\n}\n\n// Creates DOM-elements\nfunction makeEl(tagName, attributes, content) {\n    var element = document.createElement(tagName);\n\n    if (attributes && attributes.style) attributes.style = Modular.core.getStyle(attributes.style);\n    Object.assign(element, attributes);\n\n    if (content) element.appendChild(content);\n    return element;\n}\n\nexports.err = err;\nexports.getAttr = getAttr;\nexports.getHtml = getHtml;\nexports.getStyle = getStyle;\nexports.makeEl = makeEl;\n\n//# sourceURL=webpack:///./dev/core.js?");

/***/ }),

/***/ "./dev/direct-methods.js":
/*!*******************************!*\
  !*** ./dev/direct-methods.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n// Get the value of a binding\nfunction getBinding(binding) {\n    if (!Modular.data.bindings[binding]) throw Modular.core.err(10);\n    return Modular.data.bindings[binding].value;\n}\n\n// Set the value of a binding\nfunction setBinding(binding, value) {\n    if (!Modular.data.bindings[binding]) throw Modular.core.err(9);\n    Modular.data.bindings[binding].lastValue = Modular.data.bindings[binding].value;\n    Modular.data.bindings[binding].value = value;\n    Modular.data.bindings[binding].elements.map(function (element) {\n        element.element[element.value] = Modular.data.bindings[binding].value;\n    });\n}\n\n// Add a listener to a binding\nfunction listenBinding(binding, func) {\n    if (!Modular.data.bindings[binding]) throw Modular.core.err(11);\n    Modular.data.bindings[binding].listeners.push(func);\n}\n\n// Converts a (html) string into a Modular-element\nfunction scan(val) {\n    if (typeof val !== \"string\") throw new Error(Modular.core.err(4));\n    var wrapper = document.createElement(\"div\");\n    wrapper.innerHTML = val.trim();\n\n    var res = Array.from(wrapper.childNodes).map(function (node) {\n        if (node instanceof Element) {\n            isOnlyText = false;\n            return Modular.el(node.tagName, Modular.core.getAttr(node.attributes), Modular.scan(node.innerHTML));\n        } else return node.textContent;\n    });\n\n    return res;\n}\n\n// The entry-point for rendering stuff\nfunction render(element, _container) {\n    window.dispatchEvent(Modular.data.onRender);\n    if (!element || !_container) throw new Error(Modular.core.err(7));\n    var container = void 0;\n\n    if (typeof _container === \"string\") {\n        container = document.querySelector(_container);\n    } else container = _container;\n\n    if (!(container instanceof Element)) throw Modular.core.err(8);\n    container.innerHTML = \"\";\n    container.appendChild(Modular.core.getHtml(element));\n    window.dispatchEvent(Modular.data.renderedEvent);\n}\n\nexports.getBinding = getBinding;\nexports.setBinding = setBinding;\nexports.listenBinding = listenBinding;\nexports.scan = scan;\nexports.render = render;\n\n//# sourceURL=webpack:///./dev/direct-methods.js?");

/***/ }),

/***/ "./dev/el.js":
/*!*******************!*\
  !*** ./dev/el.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\n// Creates a modular-element\nfunction el() {\n    // Getting data.\n    var args = Array.from(arguments);\n    var tag = args[0].toLowerCase();\n    var attributes = args[1] || {};\n    args.splice(0, 2);\n    if (args.length === 1) args = args[0];\n\n    // Checking if all mandatory tags are availabile\n    if (typeof tag !== \"string\") throw new Error(Modular.core.err(5));\n    if (attributes.__config__ !== undefined) throw Error(Modular.core.err(1));\n\n    // Setting up the configuration\n    attributes.__config__ = {\n        type: \"modular-element\",\n        tag: tag,\n        content: args,\n        bindings: attributes.$bind,\n        element: null\n    };\n\n    // \"renders\" the current modular-element and returns it\n    attributes.__config__.render = function () {\n        // \"Cleaning\" the attributes of configuration-propertys\n        var cleanAttr = {};\n        Object.assign(cleanAttr, attributes || {});\n        delete cleanAttr.__config__;\n        delete cleanAttr.$bind;\n\n        // Creating a DOM-element\n        attributes.__config__.element = Modular.core.makeEl(attributes.__config__.tag, cleanAttr, Modular.core.getHtml(attributes.__config__.content));\n\n        // Only add the binding logic if there was a binding-object passed in\n        if (_typeof(attributes.__config__.bindings) === \"object\") {\n            attributes.__config__.change = function () {\n                // Updating all of the element's bindings\n                Object.entries(attributes.__config__.bindings).map(function (entry) {\n                    var newVal = attributes.__config__.element[entry[0]];\n                    if (newVal == \"true\") newVal = true;else if (newVal == \"false\") newVal = false;\n\n                    Modular.setBinding(entry[1], newVal);\n                    // Checking if there actually were changes\n                    if (Modular.data.bindings[entry[1]].value !== Modular.data.bindings[entry[1]].lastValue || _typeof(Modular.data.bindings[entry[1]].value) === \"object\" || typeof Modular.data.bindings[entry[1]].value === \"array\") {\n                        // Running all listeners\n                        Modular.data.bindings[entry[1]].listeners.map(function (listener) {\n                            listener(Modular.getBinding(entry[1]));\n                        });\n                    }\n                });\n            };\n\n            Object.entries(attributes.__config__.bindings).map(function (entry) {\n                // Creating a binding if the binding-name doesn't exist\n                if (!Modular.data.bindings[entry[1]]) {\n                    Modular.data.bindings[entry[1]] = {\n                        elements: [], // The elements bound to the binding\n                        lastValue: undefined,\n                        value: undefined, // The value of the binding\n                        listeners: [] // The functions that will run be run when the binding changes\n                    };\n                }\n\n                // Adding a reference of the current element to the binding\n                // so that we can update it's propertys when a change occurs.\n                Modular.data.bindings[entry[1]].elements.push({\n                    element: attributes.__config__.element, // The element\n                    value: entry[0] // The attribute that has to change\n                });\n            });\n\n            // Adding all relevant eventlisteners to the before created DOM-element\n            attributes.__config__.element.addEventListener(\"mouseover\", function (e) {\n                return attributes.__config__.change(e);\n            });\n            attributes.__config__.element.addEventListener(\"mouseout\", function (e) {\n                return attributes.__config__.change(e);\n            });\n            attributes.__config__.element.addEventListener(\"click\", function (e) {\n                return attributes.__config__.change(e);\n            });\n            attributes.__config__.element.addEventListener(\"change\", function (e) {\n                return attributes.__config__.change(e);\n            });\n            attributes.__config__.element.addEventListener(\"keyup\", function (e) {\n                return attributes.__config__.change(e);\n            });\n            attributes.__config__.element.addEventListener(\"keydown\", function (e) {\n                return attributes.__config__.change(e);\n            });\n            attributes.__config__.element.addEventListener(\"scroll\", function (e) {\n                return attributes.__config__.change(e);\n            });\n            attributes.__config__.element.addEventListener(\"contextmenu\", function (e) {\n                return attributes.__config__.change(e);\n            });\n            attributes.__config__.change();\n        }\n\n        // Returning the rendered element\n        return attributes.__config__.element;\n    };\n\n    // Returning the modular element\n    return attributes;\n}\n\nexports.default = el;\n\n//# sourceURL=webpack:///./dev/el.js?");

/***/ }),

/***/ "./dev/errors.js":
/*!***********************!*\
  !*** ./dev/errors.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nvar errors = {\n    0: [\"Info\", \"You are using the development build of Modular-2. Make sure to use the production build when deploying this app.\"],\n\n    1: [\"Invalid Attribute\", \"Unable to create Modular element.\", \"Invalid attribute.\", \"The attribute \\\"__config__\\\" is reserved for Modular.\", \"el\"],\n\n    2: [\"Invalid Input\", \"An object, which is not a Modular-element, was passed into Modular.core.getHtml().\", \"( Modular.core.getHtml() was called by Modular.render() )\", \"Modular does not know how how to handle this.\", \"core.getHtml\"],\n\n    3: [\"Invalid Input\", \"A value, which is not a [String], [Number], [Element] (html), [Function], [Object] or [Array], was passed into Modular.core.getHtml().\", \"( Modular.core.getHtml() was called by Modular.render() )\", \"This error might be caused by a invalid child-element in Modular.render() or Modular.el().\", \"Modular does not know how how to handle this.\", \"core.getHtml\"],\n\n    4: [\"Invalid or Missing Input\", \"Unable to scan.\", \"A invalid value was passed into Modular.scan().\", \"Modular.scan() expects a [String].\", \"scan\"],\n\n    5: [\"Missing TagName\", \"Unable to create Modular element.\", \"Missing tag.\", \"( The tag of a Modular-element is the first attribute of Modular.el() )\", \"el\"],\n\n    6: [\"Invalid Style\", \"Unable to convert given value to inline style.\", \"A value passed into Modular.core.getStyle() could not be converted into inline style.\", \"Modular.core.getStyle() expects a [String] (already containing inline style), an [Object] (containing valid style) or a [Funtion] (returning an object that contains valid style)\", \"core.getStyle\", \"el\"],\n\n    7: [\"Invalid Input\", \"Unable to render.\", \"Modular.render() is missing a root-element or a container-element\", \"( A root-element can be: a [Modular-element], [String], [Number], [Element] (html), [Array] (which conatins any of the mentioned) or [Function] (which returns any of the mentioned) )\", \"A container-element has to be an html-element or a valid CSS-selector ( [String] ).\", \"Keep in mind - if the container-element is not a child of the page, you propably won't be able to see much.\", \"render\"],\n\n    8: [\"Invalid Render-Container\", \"Unable to render\", \"Modular.render() recieved an invalid container-element.\", \"A container-element has to be an html-element or a valid CSS-selector ( [String] ).\", \"Keep in mind - if the container-element is not a child of the page, you propably won't be able to see much.\", \"render\"],\n\n    9: [\"Unknown Binding-Name\", \"Unable to set binding.\", \"Modular.setBinding() recieved an unknown binding-name.\", \"Bindings are created during render - maybe you should try setting the binding after Modular.render() is called.\", \"The \\\"mRendered\\\" event might help with timing.\", \"setBinding\"],\n\n    10: [\"Unknown Binding-Name\", \"Could not find binding.\", \"Modular.getBinding() recieved an unknown binding-name.\", \"Bindings are created during render - maybe you should try getting the binding after Modular.render() is called.\", \"The \\\"mRendered\\\" event might help with timing.\", \"getBinding\"],\n\n    11: [\"Unknown Binding-Name\", \"Could not find binding.\", \"Modular.listenBinding() recieved an unknown binding-name.\", \"Bindings are created during render - maybe you should try listening the binding after Modular.render() is called.\", \"The \\\"mRendered\\\" event might help with timing.\", \"listenBinding\"]\n};\n\nexports.default = errors;\n\n//# sourceURL=webpack:///./dev/errors.js?");

/***/ }),

/***/ "./dev/modular-2.js":
/*!**************************!*\
  !*** ./dev/modular-2.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _core = __webpack_require__(/*! ./core.js */ \"./dev/core.js\");\n\nvar _directMethods = __webpack_require__(/*! ./direct-methods */ \"./dev/direct-methods.js\");\n\nvar _errors = __webpack_require__(/*! ./errors */ \"./dev/errors.js\");\n\nvar _errors2 = _interopRequireDefault(_errors);\n\nvar _el = __webpack_require__(/*! ./el */ \"./dev/el.js\");\n\nvar _el2 = _interopRequireDefault(_el);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Modular = {\n    // Events, bindings and error-messages\n    data: {\n        bindings: {},\n        renderedEvent: new Event(\"mRendered\"),\n        onRender: new Event(\"mOnRender\"),\n        errors: _errors2.default\n    },\n\n    // Declaration up here because the core relys on it\n    getBinding: _directMethods.getBinding,\n    setBinding: _directMethods.setBinding,\n    listenBinding: _directMethods.listenBinding,\n\n    // The core\n    core: {\n        err: _core.err,\n        getAttr: _core.getAttr,\n        getHtml: _core.getHtml,\n        getStyle: _core.getStyle,\n        makeEl: _core.makeEl\n    },\n\n    scan: _directMethods.scan,\n    el: _el2.default,\n    render: _directMethods.render\n};\n\n// Making Modular global.\nObject.defineProperty(window, \"Modular\", {\n    value: Modular,\n    writable: false,\n    enumerable: true,\n    configurable: false\n});\n\n// Development-build warning\nconsole.warn(Modular.core.err(0));\n\n//# sourceURL=webpack:///./dev/modular-2.js?");

/***/ })

/******/ });