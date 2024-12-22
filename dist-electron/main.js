var vs = Object.defineProperty;
var xs = (a, e, n) => e in a ? vs(a, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : a[e] = n;
var ra = (a, e, n) => xs(a, typeof e != "symbol" ? e + "" : e, n);
import { BrowserWindow as Ti, app as xa } from "electron";
import ie from "node:path";
import ce from "path";
import hs from "tty";
import Jn from "util";
import $e from "fs";
import mr from "net";
import vr from "events";
import Xe from "stream";
import xr from "zlib";
import we from "buffer";
import gs from "string_decoder";
import hr from "querystring";
import gr from "url";
import Ia from "http";
import br from "crypto";
const Ve = class Ve {
  /** Initialize the LoadingProvider */
  static init() {
  }
  /** Set the loading value */
  static set value(e) {
    Ve._value = e;
  }
  /** Get the loading value */
  static get loading() {
    return {
      value: Ve._value
      // status: 'success' | ...,
    };
  }
};
/** The loading value */
ra(Ve, "_value", !1);
let ka = Ve;
const H = class H {
  static init() {
    H._props.APP_ROOT = ie.join(ie.dirname("./"), "../.."), H._props.VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL || "", H._props.MAIN_DIST = ie.join(H._props.APP_ROOT, "dist-electron"), H._props.RENDERER_DIST = ie.join(H._props.APP_ROOT, "dist"), H._props.VITE_PUBLIC = H._props.VITE_DEV_SERVER_URL ? ie.join(H._props.APP_ROOT, "public") : H._props.RENDERER_DIST;
  }
  static get $props() {
    return { ...H._props };
  }
};
ra(H, "_props", {
  APP_ROOT: "",
  VITE_DEV_SERVER_URL: "",
  MAIN_DIST: "",
  RENDERER_DIST: "",
  VITE_PUBLIC: ""
});
let te = H;
te.init();
const G = class G {
  /** Get the BrowserWindow instance */
  static get win() {
    return G._win;
  }
  /** Initialize the WindowProvider */
  static init() {
  }
  /** Create a new window */
  static async createWindow() {
    G._win = new Ti({
      icon: ie.join(te.$props.VITE_PUBLIC, "electron-vite.svg"),
      width: 800,
      height: 600,
      minWidth: 800,
      minHeight: 600,
      webPreferences: {
        preload: ie.join(te.$props.APP_ROOT, "el/preload.mjs")
      }
    }), G._win.webContents.openDevTools(), G._win.webContents.on("did-finish-load", () => {
      var e;
      (e = G._win) == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
    }), te.$props.VITE_DEV_SERVER_URL ? await G._win.loadURL(te.$props.VITE_DEV_SERVER_URL) : await G._win.loadFile(ie.join(te.$props.RENDERER_DIST, "index.html"));
  }
  /**
   * Quit when all windows are closed, except on macOS.
   * There, it's common for applications and their menu bar
   * to stay active until the user quits explicitly with Cmd + Q.
   */
  static onWindowAllClosed() {
    process.platform !== "darwin" && (xa.quit(), G._win = null);
  }
  /** Activate the window */
  static onActivate() {
    Ti.getAllWindows().length === 0 && G.createWindow();
  }
  /** When the app is ready */
  static onReady() {
    G.createWindow();
  }
  /** Send a message to the main process */
  static sendMainProcessMessage(e, ...n) {
    var i;
    (i = G._win) == null || i.webContents.send(e, ...n);
  }
};
/** The BrowserWindow instance */
ra(G, "_win");
let oe = G;
class bs {
  /** Log a message */
  static log(...e) {
    console.log(...e), oe.sendMainProcessMessage("main-process-log", ...e);
  }
  /** Log a warning */
  static warn(...e) {
    console.warn(e), oe.sendMainProcessMessage("main-process-warn", ...e);
  }
  /** Log an error */
  static error(...e) {
    console.error(e), oe.sendMainProcessMessage("main-process-error", ...e);
  }
}
class Ci {
  /** Launch the server */
  static launch() {
  }
  /** Wait for the server to be ready */
  static async waitForReady() {
  }
}
class ys {
  /** Initialize the WindowProvider */
  static launch() {
    xa.on("window-all-closed", oe.onWindowAllClosed), xa.on("activate", oe.onActivate), xa.whenReady().then(oe.onReady);
  }
}
var Ea = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function yr(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var Bn = { exports: {} }, Dn = { exports: {} };
/*!
 * depd
 * Copyright(c) 2014-2018 Douglas Christopher Wilson
 * MIT Licensed
 */
var ws = ce.relative, ne = As, ks = process.cwd();
function wr(a, e) {
  for (var n = a.split(/[ ,]+/), i = String(e).toLowerCase(), t = 0; t < n.length; t++) {
    var r = n[t];
    if (r && (r === "*" || r.toLowerCase() === i))
      return !0;
  }
  return !1;
}
function Es(a, e, n) {
  var i = Object.getOwnPropertyDescriptor(a, e), t = i.value;
  return i.get = function() {
    return t;
  }, i.writable && (i.set = function(o) {
    return t = o;
  }), delete i.value, delete i.writable, Object.defineProperty(a, e, i), i;
}
function Ss(a) {
  for (var e = "", n = 0; n < a; n++)
    e += ", arg" + n;
  return e.substr(2);
}
function js(a) {
  var e = this.name + ": " + this.namespace;
  this.message && (e += " deprecated " + this.message);
  for (var n = 0; n < a.length; n++)
    e += `
    at ` + a[n].toString();
  return e;
}
function As(a) {
  if (!a)
    throw new TypeError("argument namespace is required");
  var e = qa(), n = ke(e[1]), i = n[0];
  function t(r) {
    Sa.call(t, r);
  }
  return t._file = i, t._ignored = Ts(a), t._namespace = a, t._traced = Cs(a), t._warned = /* @__PURE__ */ Object.create(null), t.function = Rs, t.property = Is, t;
}
function _s(a, e) {
  var n = typeof a.listenerCount != "function" ? a.listeners(e).length : a.listenerCount(e);
  return n > 0;
}
function Ts(a) {
  if (process.noDeprecation)
    return !0;
  var e = process.env.NO_DEPRECATION || "";
  return wr(e, a);
}
function Cs(a) {
  if (process.traceDeprecation)
    return !0;
  var e = process.env.TRACE_DEPRECATION || "";
  return wr(e, a);
}
function Sa(a, e) {
  var n = _s(process, "deprecation");
  if (!(!n && this._ignored)) {
    var i, t, r, o, s = 0, c = !1, u = qa(), p = this._file;
    for (e ? (o = e, r = ke(u[1]), r.name = o.name, p = r[0]) : (s = 2, o = ke(u[s]), r = o); s < u.length; s++)
      if (i = ke(u[s]), t = i[0], t === p)
        c = !0;
      else if (t === this._file)
        p = this._file;
      else if (c)
        break;
    var f = i ? o.join(":") + "__" + i.join(":") : void 0;
    if (!(f !== void 0 && f in this._warned)) {
      this._warned[f] = !0;
      var l = a;
      if (l || (l = r === o || !r.name ? Oi(o) : Oi(r)), n) {
        var x = kr(this._namespace, l, u.slice(s));
        process.emit("deprecation", x);
        return;
      }
      var v = process.stderr.isTTY ? Ps : Os, d = v.call(this, l, i, u.slice(s));
      process.stderr.write(d + `
`, "utf8");
    }
  }
}
function ke(a) {
  var e = a.getFileName() || "<anonymous>", n = a.getLineNumber(), i = a.getColumnNumber();
  a.isEval() && (e = a.getEvalOrigin() + ", " + e);
  var t = [e, n, i];
  return t.callSite = a, t.name = a.getFunctionName(), t;
}
function Oi(a) {
  var e = a.callSite, n = a.name;
  n || (n = "<anonymous@" + Kn(a) + ">");
  var i = e.getThis(), t = i && e.getTypeName();
  return t === "Object" && (t = void 0), t === "Function" && (t = i.name || t), t && e.getMethodName() ? t + "." + n : n;
}
function Os(a, e, n) {
  var i = (/* @__PURE__ */ new Date()).toUTCString(), t = i + " " + this._namespace + " deprecated " + a;
  if (this._traced) {
    for (var r = 0; r < n.length; r++)
      t += `
    at ` + n[r].toString();
    return t;
  }
  return e && (t += " at " + Kn(e)), t;
}
function Ps(a, e, n) {
  var i = "\x1B[36;1m" + this._namespace + "\x1B[22;39m \x1B[33;1mdeprecated\x1B[22;39m \x1B[0m" + a + "\x1B[39m";
  if (this._traced) {
    for (var t = 0; t < n.length; t++)
      i += `
    \x1B[36mat ` + n[t].toString() + "\x1B[39m";
    return i;
  }
  return e && (i += " \x1B[36m" + Kn(e) + "\x1B[39m"), i;
}
function Kn(a) {
  return ws(ks, a[0]) + ":" + a[1] + ":" + a[2];
}
function qa() {
  var a = Error.stackTraceLimit, e = {}, n = Error.prepareStackTrace;
  Error.prepareStackTrace = $s, Error.stackTraceLimit = Math.max(10, a), Error.captureStackTrace(e);
  var i = e.stack.slice(1);
  return Error.prepareStackTrace = n, Error.stackTraceLimit = a, i;
}
function $s(a, e) {
  return e;
}
function Rs(a, e) {
  if (typeof a != "function")
    throw new TypeError("argument fn must be a function");
  var n = Ss(a.length), i = qa(), t = ke(i[1]);
  t.name = a.name;
  var r = new Function(
    "fn",
    "log",
    "deprecate",
    "message",
    "site",
    `"use strict"
return function (` + n + `) {log.call(deprecate, message, site)
return fn.apply(this, arguments)
}`
  )(a, Sa, this, e, t);
  return r;
}
function Is(a, e, n) {
  if (!a || typeof a != "object" && typeof a != "function")
    throw new TypeError("argument obj must be object");
  var i = Object.getOwnPropertyDescriptor(a, e);
  if (!i)
    throw new TypeError("must call property on owner object");
  if (!i.configurable)
    throw new TypeError("property must be configurable");
  var t = this, r = qa(), o = ke(r[1]);
  o.name = e, "value" in i && (i = Es(a, e));
  var s = i.get, c = i.set;
  typeof s == "function" && (i.get = function() {
    return Sa.call(t, n, o), s.apply(this, arguments);
  }), typeof c == "function" && (i.set = function() {
    return Sa.call(t, n, o), c.apply(this, arguments);
  }), Object.defineProperty(a, e, i);
}
function kr(a, e, n) {
  var i = new Error(), t;
  return Object.defineProperty(i, "constructor", {
    value: kr
  }), Object.defineProperty(i, "message", {
    configurable: !0,
    enumerable: !1,
    value: e,
    writable: !0
  }), Object.defineProperty(i, "name", {
    enumerable: !1,
    configurable: !0,
    value: "DeprecationError",
    writable: !0
  }), Object.defineProperty(i, "namespace", {
    configurable: !0,
    enumerable: !1,
    value: a,
    writable: !0
  }), Object.defineProperty(i, "stack", {
    configurable: !0,
    enumerable: !1,
    get: function() {
      return t !== void 0 ? t : t = js.call(this, n);
    },
    set: function(o) {
      t = o;
    }
  }), i;
}
var Ne = { exports: {} };
/*!
 * bytes
 * Copyright(c) 2012-2014 TJ Holowaychuk
 * Copyright(c) 2015 Jed Watson
 * MIT Licensed
 */
var Pi;
function Qe() {
  if (Pi) return Ne.exports;
  Pi = 1, Ne.exports = t, Ne.exports.format = r, Ne.exports.parse = o;
  var a = /\B(?=(\d{3})+(?!\d))/g, e = /(?:\.0*|(\.[^0]+)0+)$/, n = {
    b: 1,
    kb: 1024,
    mb: 1 << 20,
    gb: 1 << 30,
    tb: Math.pow(1024, 4),
    pb: Math.pow(1024, 5)
  }, i = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;
  function t(s, c) {
    return typeof s == "string" ? o(s) : typeof s == "number" ? r(s, c) : null;
  }
  function r(s, c) {
    if (!Number.isFinite(s))
      return null;
    var u = Math.abs(s), p = c && c.thousandsSeparator || "", f = c && c.unitSeparator || "", l = c && c.decimalPlaces !== void 0 ? c.decimalPlaces : 2, x = !!(c && c.fixedDecimals), v = c && c.unit || "";
    (!v || !n[v.toLowerCase()]) && (u >= n.pb ? v = "PB" : u >= n.tb ? v = "TB" : u >= n.gb ? v = "GB" : u >= n.mb ? v = "MB" : u >= n.kb ? v = "KB" : v = "B");
    var d = s / n[v.toLowerCase()], m = d.toFixed(l);
    return x || (m = m.replace(e, "$1")), p && (m = m.split(".").map(function(h, g) {
      return g === 0 ? h.replace(a, p) : h;
    }).join(".")), m + f + v;
  }
  function o(s) {
    if (typeof s == "number" && !isNaN(s))
      return s;
    if (typeof s != "string")
      return null;
    var c = i.exec(s), u, p = "b";
    return c ? (u = parseFloat(c[1]), p = c[4].toLowerCase()) : (u = parseInt(s, 10), p = "b"), isNaN(u) ? null : Math.floor(n[p] * u);
  }
  return Ne.exports;
}
var Re = {};
/*!
 * content-type
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var $i = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g, qs = /^[\u000b\u0020-\u007e\u0080-\u00ff]+$/, Er = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/, Fs = /\\([\u000b\u0020-\u00ff])/g, zs = /([\\"])/g, Sr = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
Re.format = Bs;
Re.parse = Ds;
function Bs(a) {
  if (!a || typeof a != "object")
    throw new TypeError("argument obj is required");
  var e = a.parameters, n = a.type;
  if (!n || !Sr.test(n))
    throw new TypeError("invalid type");
  var i = n;
  if (e && typeof e == "object")
    for (var t, r = Object.keys(e).sort(), o = 0; o < r.length; o++) {
      if (t = r[o], !Er.test(t))
        throw new TypeError("invalid parameter name");
      i += "; " + t + "=" + Ls(e[t]);
    }
  return i;
}
function Ds(a) {
  if (!a)
    throw new TypeError("argument string is required");
  var e = typeof a == "object" ? Ns(a) : a;
  if (typeof e != "string")
    throw new TypeError("argument string is required to be a string");
  var n = e.indexOf(";"), i = n !== -1 ? e.slice(0, n).trim() : e.trim();
  if (!Sr.test(i))
    throw new TypeError("invalid media type");
  var t = new Ms(i.toLowerCase());
  if (n !== -1) {
    var r, o, s;
    for ($i.lastIndex = n; o = $i.exec(e); ) {
      if (o.index !== n)
        throw new TypeError("invalid parameter format");
      n += o[0].length, r = o[1].toLowerCase(), s = o[2], s.charCodeAt(0) === 34 && (s = s.slice(1, -1), s.indexOf("\\") !== -1 && (s = s.replace(Fs, "$1"))), t.parameters[r] = s;
    }
    if (n !== e.length)
      throw new TypeError("invalid parameter format");
  }
  return t;
}
function Ns(a) {
  var e;
  if (typeof a.getHeader == "function" ? e = a.getHeader("content-type") : typeof a.headers == "object" && (e = a.headers && a.headers["content-type"]), typeof e != "string")
    throw new TypeError("content-type header is missing from object");
  return e;
}
function Ls(a) {
  var e = String(a);
  if (Er.test(e))
    return e;
  if (e.length > 0 && !qs.test(e))
    throw new TypeError("invalid parameter value");
  return '"' + e.replace(zs, "\\$1") + '"';
}
function Ms(a) {
  this.parameters = /* @__PURE__ */ Object.create(null), this.type = a;
}
var jr = { exports: {} }, Fa = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? Us : Hs);
function Us(a, e) {
  return a.__proto__ = e, a;
}
function Hs(a, e) {
  for (var n in e)
    Object.prototype.hasOwnProperty.call(a, n) || (a[n] = e[n]);
  return a;
}
const Gs = {
  100: "Continue",
  101: "Switching Protocols",
  102: "Processing",
  103: "Early Hints",
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  207: "Multi-Status",
  208: "Already Reported",
  226: "IM Used",
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  307: "Temporary Redirect",
  308: "Permanent Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  418: "I'm a Teapot",
  421: "Misdirected Request",
  422: "Unprocessable Entity",
  423: "Locked",
  424: "Failed Dependency",
  425: "Too Early",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  451: "Unavailable For Legal Reasons",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  509: "Bandwidth Limit Exceeded",
  510: "Not Extended",
  511: "Network Authentication Required"
};
/*!
 * statuses
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */
var Yn = Gs, za = X;
X.message = Yn;
X.code = Ws(Yn);
X.codes = Vs(Yn);
X.redirect = {
  300: !0,
  301: !0,
  302: !0,
  303: !0,
  305: !0,
  307: !0,
  308: !0
};
X.empty = {
  204: !0,
  205: !0,
  304: !0
};
X.retry = {
  502: !0,
  503: !0,
  504: !0
};
function Ws(a) {
  var e = {};
  return Object.keys(a).forEach(function(i) {
    var t = a[i], r = Number(i);
    e[t.toLowerCase()] = r;
  }), e;
}
function Vs(a) {
  return Object.keys(a).map(function(n) {
    return Number(n);
  });
}
function Xs(a) {
  var e = a.toLowerCase();
  if (!Object.prototype.hasOwnProperty.call(X.code, e))
    throw new Error('invalid status message: "' + a + '"');
  return X.code[e];
}
function Ri(a) {
  if (!Object.prototype.hasOwnProperty.call(X.message, a))
    throw new Error("invalid status code: " + a);
  return X.message[a];
}
function X(a) {
  if (typeof a == "number")
    return Ri(a);
  if (typeof a != "string")
    throw new TypeError("code must be a number or string");
  var e = parseInt(a, 10);
  return isNaN(e) ? Xs(a) : Ri(e);
}
var Nn = { exports: {} }, oa = { exports: {} }, Ii;
function Zs() {
  return Ii || (Ii = 1, typeof Object.create == "function" ? oa.exports = function(e, n) {
    n && (e.super_ = n, e.prototype = Object.create(n.prototype, {
      constructor: {
        value: e,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }));
  } : oa.exports = function(e, n) {
    if (n) {
      e.super_ = n;
      var i = function() {
      };
      i.prototype = n.prototype, e.prototype = new i(), e.prototype.constructor = e;
    }
  }), oa.exports;
}
try {
  var qi = require("util");
  if (typeof qi.inherits != "function") throw "";
  Nn.exports = qi.inherits;
} catch {
  Nn.exports = Zs();
}
var Qs = Nn.exports;
/*!
 * toidentifier
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */
var Js = Ks;
function Ks(a) {
  return a.split(" ").map(function(e) {
    return e.slice(0, 1).toUpperCase() + e.slice(1);
  }).join("").replace(/[^ _0-9a-z]/gi, "");
}
/*!
 * http-errors
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */
(function(a) {
  var e = ne("http-errors"), n = Fa, i = za, t = Qs, r = Js;
  a.exports = s, a.exports.HttpError = c(), a.exports.isHttpError = p(a.exports.HttpError), x(a.exports, i.codes, a.exports.HttpError);
  function o(d) {
    return +(String(d).charAt(0) + "00");
  }
  function s() {
    for (var d, m, h = 500, g = {}, b = 0; b < arguments.length; b++) {
      var y = arguments[b], w = typeof y;
      if (w === "object" && y instanceof Error)
        d = y, h = d.status || d.statusCode || h;
      else if (w === "number" && b === 0)
        h = y;
      else if (w === "string")
        m = y;
      else if (w === "object")
        g = y;
      else
        throw new TypeError("argument #" + (b + 1) + " unsupported type " + w);
    }
    typeof h == "number" && (h < 400 || h >= 600) && e("non-error status code; use only 4xx or 5xx status codes"), (typeof h != "number" || !i.message[h] && (h < 400 || h >= 600)) && (h = 500);
    var k = s[h] || s[o(h)];
    d || (d = k ? new k(m) : new Error(m || i.message[h]), Error.captureStackTrace(d, s)), (!k || !(d instanceof k) || d.status !== h) && (d.expose = h < 500, d.status = d.statusCode = h);
    for (var A in g)
      A !== "status" && A !== "statusCode" && (d[A] = g[A]);
    return d;
  }
  function c() {
    function d() {
      throw new TypeError("cannot construct abstract class");
    }
    return t(d, Error), d;
  }
  function u(d, m, h) {
    var g = v(m);
    function b(y) {
      var w = y ?? i.message[h], k = new Error(w);
      return Error.captureStackTrace(k, b), n(k, b.prototype), Object.defineProperty(k, "message", {
        enumerable: !0,
        configurable: !0,
        value: w,
        writable: !0
      }), Object.defineProperty(k, "name", {
        enumerable: !1,
        configurable: !0,
        value: g,
        writable: !0
      }), k;
    }
    return t(b, d), l(b, g), b.prototype.status = h, b.prototype.statusCode = h, b.prototype.expose = !0, b;
  }
  function p(d) {
    return function(h) {
      return !h || typeof h != "object" ? !1 : h instanceof d ? !0 : h instanceof Error && typeof h.expose == "boolean" && typeof h.statusCode == "number" && h.status === h.statusCode;
    };
  }
  function f(d, m, h) {
    var g = v(m);
    function b(y) {
      var w = y ?? i.message[h], k = new Error(w);
      return Error.captureStackTrace(k, b), n(k, b.prototype), Object.defineProperty(k, "message", {
        enumerable: !0,
        configurable: !0,
        value: w,
        writable: !0
      }), Object.defineProperty(k, "name", {
        enumerable: !1,
        configurable: !0,
        value: g,
        writable: !0
      }), k;
    }
    return t(b, d), l(b, g), b.prototype.status = h, b.prototype.statusCode = h, b.prototype.expose = !1, b;
  }
  function l(d, m) {
    var h = Object.getOwnPropertyDescriptor(d, "name");
    h && h.configurable && (h.value = m, Object.defineProperty(d, "name", h));
  }
  function x(d, m, h) {
    m.forEach(function(b) {
      var y, w = r(i.message[b]);
      switch (o(b)) {
        case 400:
          y = u(h, w, b);
          break;
        case 500:
          y = f(h, w, b);
          break;
      }
      y && (d[b] = y, d[w] = y);
    });
  }
  function v(d) {
    return d.substr(-5) !== "Error" ? d + "Error" : d;
  }
})(jr);
var Ie = jr.exports, Ln = { exports: {} }, sa = { exports: {} }, ca = { exports: {} }, Ka, Fi;
function Ys() {
  if (Fi) return Ka;
  Fi = 1;
  var a = 1e3, e = a * 60, n = e * 60, i = n * 24, t = i * 365.25;
  Ka = function(u, p) {
    p = p || {};
    var f = typeof u;
    if (f === "string" && u.length > 0)
      return r(u);
    if (f === "number" && isNaN(u) === !1)
      return p.long ? s(u) : o(u);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(u)
    );
  };
  function r(u) {
    if (u = String(u), !(u.length > 100)) {
      var p = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
        u
      );
      if (p) {
        var f = parseFloat(p[1]), l = (p[2] || "ms").toLowerCase();
        switch (l) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return f * t;
          case "days":
          case "day":
          case "d":
            return f * i;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return f * n;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return f * e;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return f * a;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return f;
          default:
            return;
        }
      }
    }
  }
  function o(u) {
    return u >= i ? Math.round(u / i) + "d" : u >= n ? Math.round(u / n) + "h" : u >= e ? Math.round(u / e) + "m" : u >= a ? Math.round(u / a) + "s" : u + "ms";
  }
  function s(u) {
    return c(u, i, "day") || c(u, n, "hour") || c(u, e, "minute") || c(u, a, "second") || u + " ms";
  }
  function c(u, p, f) {
    if (!(u < p))
      return u < p * 1.5 ? Math.floor(u / p) + " " + f : Math.ceil(u / p) + " " + f + "s";
  }
  return Ka;
}
var zi;
function Ar() {
  return zi || (zi = 1, function(a, e) {
    e = a.exports = t.debug = t.default = t, e.coerce = c, e.disable = o, e.enable = r, e.enabled = s, e.humanize = Ys(), e.names = [], e.skips = [], e.formatters = {};
    var n;
    function i(u) {
      var p = 0, f;
      for (f in u)
        p = (p << 5) - p + u.charCodeAt(f), p |= 0;
      return e.colors[Math.abs(p) % e.colors.length];
    }
    function t(u) {
      function p() {
        if (p.enabled) {
          var f = p, l = +/* @__PURE__ */ new Date(), x = l - (n || l);
          f.diff = x, f.prev = n, f.curr = l, n = l;
          for (var v = new Array(arguments.length), d = 0; d < v.length; d++)
            v[d] = arguments[d];
          v[0] = e.coerce(v[0]), typeof v[0] != "string" && v.unshift("%O");
          var m = 0;
          v[0] = v[0].replace(/%([a-zA-Z%])/g, function(g, b) {
            if (g === "%%") return g;
            m++;
            var y = e.formatters[b];
            if (typeof y == "function") {
              var w = v[m];
              g = y.call(f, w), v.splice(m, 1), m--;
            }
            return g;
          }), e.formatArgs.call(f, v);
          var h = p.log || e.log || console.log.bind(console);
          h.apply(f, v);
        }
      }
      return p.namespace = u, p.enabled = e.enabled(u), p.useColors = e.useColors(), p.color = i(u), typeof e.init == "function" && e.init(p), p;
    }
    function r(u) {
      e.save(u), e.names = [], e.skips = [];
      for (var p = (typeof u == "string" ? u : "").split(/[\s,]+/), f = p.length, l = 0; l < f; l++)
        p[l] && (u = p[l].replace(/\*/g, ".*?"), u[0] === "-" ? e.skips.push(new RegExp("^" + u.substr(1) + "$")) : e.names.push(new RegExp("^" + u + "$")));
    }
    function o() {
      e.enable("");
    }
    function s(u) {
      var p, f;
      for (p = 0, f = e.skips.length; p < f; p++)
        if (e.skips[p].test(u))
          return !1;
      for (p = 0, f = e.names.length; p < f; p++)
        if (e.names[p].test(u))
          return !0;
      return !1;
    }
    function c(u) {
      return u instanceof Error ? u.stack || u.message : u;
    }
  }(ca, ca.exports)), ca.exports;
}
var Bi;
function ec() {
  return Bi || (Bi = 1, function(a, e) {
    e = a.exports = Ar(), e.log = t, e.formatArgs = i, e.save = r, e.load = o, e.useColors = n, e.storage = typeof chrome < "u" && typeof chrome.storage < "u" ? chrome.storage.local : s(), e.colors = [
      "lightseagreen",
      "forestgreen",
      "goldenrod",
      "dodgerblue",
      "darkorchid",
      "crimson"
    ];
    function n() {
      return typeof window < "u" && window.process && window.process.type === "renderer" ? !0 : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    e.formatters.j = function(c) {
      try {
        return JSON.stringify(c);
      } catch (u) {
        return "[UnexpectedJSONParseError]: " + u.message;
      }
    };
    function i(c) {
      var u = this.useColors;
      if (c[0] = (u ? "%c" : "") + this.namespace + (u ? " %c" : " ") + c[0] + (u ? "%c " : " ") + "+" + e.humanize(this.diff), !!u) {
        var p = "color: " + this.color;
        c.splice(1, 0, p, "color: inherit");
        var f = 0, l = 0;
        c[0].replace(/%[a-zA-Z%]/g, function(x) {
          x !== "%%" && (f++, x === "%c" && (l = f));
        }), c.splice(l, 0, p);
      }
    }
    function t() {
      return typeof console == "object" && console.log && Function.prototype.apply.call(console.log, console, arguments);
    }
    function r(c) {
      try {
        c == null ? e.storage.removeItem("debug") : e.storage.debug = c;
      } catch {
      }
    }
    function o() {
      var c;
      try {
        c = e.storage.debug;
      } catch {
      }
      return !c && typeof process < "u" && "env" in process && (c = process.env.DEBUG), c;
    }
    e.enable(o());
    function s() {
      try {
        return window.localStorage;
      } catch {
      }
    }
  }(sa, sa.exports)), sa.exports;
}
var pa = { exports: {} }, Di;
function ac() {
  return Di || (Di = 1, function(a, e) {
    var n = hs, i = Jn;
    e = a.exports = Ar(), e.init = l, e.log = c, e.formatArgs = s, e.save = u, e.load = p, e.useColors = o, e.colors = [6, 2, 3, 4, 5, 1], e.inspectOpts = Object.keys(process.env).filter(function(x) {
      return /^debug_/i.test(x);
    }).reduce(function(x, v) {
      var d = v.substring(6).toLowerCase().replace(/_([a-z])/g, function(h, g) {
        return g.toUpperCase();
      }), m = process.env[v];
      return /^(yes|on|true|enabled)$/i.test(m) ? m = !0 : /^(no|off|false|disabled)$/i.test(m) ? m = !1 : m === "null" ? m = null : m = Number(m), x[d] = m, x;
    }, {});
    var t = parseInt(process.env.DEBUG_FD, 10) || 2;
    t !== 1 && t !== 2 && i.deprecate(function() {
    }, "except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)")();
    var r = t === 1 ? process.stdout : t === 2 ? process.stderr : f(t);
    function o() {
      return "colors" in e.inspectOpts ? !!e.inspectOpts.colors : n.isatty(t);
    }
    e.formatters.o = function(x) {
      return this.inspectOpts.colors = this.useColors, i.inspect(x, this.inspectOpts).split(`
`).map(function(v) {
        return v.trim();
      }).join(" ");
    }, e.formatters.O = function(x) {
      return this.inspectOpts.colors = this.useColors, i.inspect(x, this.inspectOpts);
    };
    function s(x) {
      var v = this.namespace, d = this.useColors;
      if (d) {
        var m = this.color, h = "  \x1B[3" + m + ";1m" + v + " \x1B[0m";
        x[0] = h + x[0].split(`
`).join(`
` + h), x.push("\x1B[3" + m + "m+" + e.humanize(this.diff) + "\x1B[0m");
      } else
        x[0] = (/* @__PURE__ */ new Date()).toUTCString() + " " + v + " " + x[0];
    }
    function c() {
      return r.write(i.format.apply(i, arguments) + `
`);
    }
    function u(x) {
      x == null ? delete process.env.DEBUG : process.env.DEBUG = x;
    }
    function p() {
      return process.env.DEBUG;
    }
    function f(x) {
      var v, d = process.binding("tty_wrap");
      switch (d.guessHandleType(x)) {
        case "TTY":
          v = new n.WriteStream(x), v._type = "tty", v._handle && v._handle.unref && v._handle.unref();
          break;
        case "FILE":
          var m = $e;
          v = new m.SyncWriteStream(x, { autoClose: !1 }), v._type = "fs";
          break;
        case "PIPE":
        case "TCP":
          var h = mr;
          v = new h.Socket({
            fd: x,
            readable: !1,
            writable: !0
          }), v.readable = !1, v.read = null, v._type = "pipe", v._handle && v._handle.unref && v._handle.unref();
          break;
        default:
          throw new Error("Implement me. Unknown stream file type!");
      }
      return v.fd = x, v._isStdio = !0, v;
    }
    function l(x) {
      x.inspectOpts = {};
      for (var v = Object.keys(e.inspectOpts), d = 0; d < v.length; d++)
        x.inspectOpts[v[d]] = e.inspectOpts[v[d]];
    }
    e.enable(p());
  }(pa, pa.exports)), pa.exports;
}
typeof process < "u" && process.type === "renderer" ? Ln.exports = ec() : Ln.exports = ac();
var Z = Ln.exports;
/*!
 * destroy
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */
var nc = vr.EventEmitter, ic = $e.ReadStream, _r = Xe, le = xr, Tr = tc;
function tc(a, e) {
  return lc(a) ? rc(a) : uc(a) ? sc(a) : cc(a) && a.destroy(), pc(a) && e && (a.removeAllListeners("error"), a.addListener("error", dc)), a;
}
function rc(a) {
  a.destroy(), typeof a.close == "function" && a.on("open", mc);
}
function oc(a) {
  if (a._hadError === !0) {
    var e = a._binding === null ? "_binding" : "_handle";
    a[e] = {
      close: function() {
        this[e] = null;
      }
    };
  }
  a.close();
}
function sc(a) {
  typeof a.destroy == "function" ? a._binding ? (a.destroy(), a._processing ? (a._needDrain = !0, a.once("drain", fc)) : a._binding.clear()) : a._destroy && a._destroy !== _r.Transform.prototype._destroy ? a.destroy() : a._destroy && typeof a.close == "function" ? (a.destroyed = !0, a.close()) : a.destroy() : typeof a.close == "function" && oc(a);
}
function cc(a) {
  return a instanceof _r && typeof a.destroy == "function";
}
function pc(a) {
  return a instanceof nc;
}
function lc(a) {
  return a instanceof ic;
}
function uc(a) {
  return a instanceof le.Gzip || a instanceof le.Gunzip || a instanceof le.Deflate || a instanceof le.DeflateRaw || a instanceof le.Inflate || a instanceof le.InflateRaw || a instanceof le.Unzip;
}
function dc() {
}
function fc() {
  this._binding.clear();
}
function mc() {
  typeof this.fd == "number" && this.close();
}
var Ya = { exports: {} }, en, Ni;
function qe() {
  if (Ni) return en;
  Ni = 1;
  var a = we, e = a.Buffer, n = {}, i;
  for (i in a)
    a.hasOwnProperty(i) && (i === "SlowBuffer" || i === "Buffer" || (n[i] = a[i]));
  var t = n.Buffer = {};
  for (i in e)
    e.hasOwnProperty(i) && (i === "allocUnsafe" || i === "allocUnsafeSlow" || (t[i] = e[i]));
  if (n.Buffer.prototype = e.prototype, (!t.from || t.from === Uint8Array.from) && (t.from = function(r, o, s) {
    if (typeof r == "number")
      throw new TypeError('The "value" argument must not be of type number. Received type ' + typeof r);
    if (r && typeof r.length > "u")
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof r);
    return e(r, o, s);
  }), t.alloc || (t.alloc = function(r, o, s) {
    if (typeof r != "number")
      throw new TypeError('The "size" argument must be of type number. Received type ' + typeof r);
    if (r < 0 || r >= 2 * (1 << 30))
      throw new RangeError('The value "' + r + '" is invalid for option "size"');
    var c = e(r);
    return !o || o.length === 0 ? c.fill(0) : typeof s == "string" ? c.fill(o, s) : c.fill(o), c;
  }), !n.kStringMaxLength)
    try {
      n.kStringMaxLength = process.binding("buffer").kStringMaxLength;
    } catch {
    }
  return n.constants || (n.constants = {
    MAX_LENGTH: n.kMaxLength
  }, n.kStringMaxLength && (n.constants.MAX_STRING_LENGTH = n.kStringMaxLength)), en = n, en;
}
var la = {}, Li;
function vc() {
  if (Li) return la;
  Li = 1;
  var a = "\uFEFF";
  la.PrependBOM = e;
  function e(i, t) {
    this.encoder = i, this.addBOM = !0;
  }
  e.prototype.write = function(i) {
    return this.addBOM && (i = a + i, this.addBOM = !1), this.encoder.write(i);
  }, e.prototype.end = function() {
    return this.encoder.end();
  }, la.StripBOM = n;
  function n(i, t) {
    this.decoder = i, this.pass = !1, this.options = t || {};
  }
  return n.prototype.write = function(i) {
    var t = this.decoder.write(i);
    return this.pass || !t || (t[0] === a && (t = t.slice(1), typeof this.options.stripBOM == "function" && this.options.stripBOM()), this.pass = !0), t;
  }, n.prototype.end = function() {
    return this.decoder.end();
  }, la;
}
var an = {}, nn, Mi;
function xc() {
  if (Mi) return nn;
  Mi = 1;
  var a = qe().Buffer;
  nn = {
    // Encodings
    utf8: { type: "_internal", bomAware: !0 },
    cesu8: { type: "_internal", bomAware: !0 },
    unicode11utf8: "utf8",
    ucs2: { type: "_internal", bomAware: !0 },
    utf16le: "ucs2",
    binary: { type: "_internal" },
    base64: { type: "_internal" },
    hex: { type: "_internal" },
    // Codec.
    _internal: e
  };
  function e(c, u) {
    this.enc = c.encodingName, this.bomAware = c.bomAware, this.enc === "base64" ? this.encoder = r : this.enc === "cesu8" && (this.enc = "utf8", this.encoder = o, a.from("eda0bdedb2a9", "hex").toString() !== "💩" && (this.decoder = s, this.defaultCharUnicode = u.defaultCharUnicode));
  }
  e.prototype.encoder = t, e.prototype.decoder = i;
  var n = gs.StringDecoder;
  n.prototype.end || (n.prototype.end = function() {
  });
  function i(c, u) {
    n.call(this, u.enc);
  }
  i.prototype = n.prototype;
  function t(c, u) {
    this.enc = u.enc;
  }
  t.prototype.write = function(c) {
    return a.from(c, this.enc);
  }, t.prototype.end = function() {
  };
  function r(c, u) {
    this.prevStr = "";
  }
  r.prototype.write = function(c) {
    c = this.prevStr + c;
    var u = c.length - c.length % 4;
    return this.prevStr = c.slice(u), c = c.slice(0, u), a.from(c, "base64");
  }, r.prototype.end = function() {
    return a.from(this.prevStr, "base64");
  };
  function o(c, u) {
  }
  o.prototype.write = function(c) {
    for (var u = a.alloc(c.length * 3), p = 0, f = 0; f < c.length; f++) {
      var l = c.charCodeAt(f);
      l < 128 ? u[p++] = l : l < 2048 ? (u[p++] = 192 + (l >>> 6), u[p++] = 128 + (l & 63)) : (u[p++] = 224 + (l >>> 12), u[p++] = 128 + (l >>> 6 & 63), u[p++] = 128 + (l & 63));
    }
    return u.slice(0, p);
  }, o.prototype.end = function() {
  };
  function s(c, u) {
    this.acc = 0, this.contBytes = 0, this.accBytes = 0, this.defaultCharUnicode = u.defaultCharUnicode;
  }
  return s.prototype.write = function(c) {
    for (var u = this.acc, p = this.contBytes, f = this.accBytes, l = "", x = 0; x < c.length; x++) {
      var v = c[x];
      (v & 192) !== 128 ? (p > 0 && (l += this.defaultCharUnicode, p = 0), v < 128 ? l += String.fromCharCode(v) : v < 224 ? (u = v & 31, p = 1, f = 1) : v < 240 ? (u = v & 15, p = 2, f = 1) : l += this.defaultCharUnicode) : p > 0 ? (u = u << 6 | v & 63, p--, f++, p === 0 && (f === 2 && u < 128 && u > 0 ? l += this.defaultCharUnicode : f === 3 && u < 2048 ? l += this.defaultCharUnicode : l += String.fromCharCode(u))) : l += this.defaultCharUnicode;
    }
    return this.acc = u, this.contBytes = p, this.accBytes = f, l;
  }, s.prototype.end = function() {
    var c = 0;
    return this.contBytes > 0 && (c += this.defaultCharUnicode), c;
  }, nn;
}
var ua = {}, Ui;
function hc() {
  if (Ui) return ua;
  Ui = 1;
  var a = qe().Buffer;
  ua.utf16be = e;
  function e() {
  }
  e.prototype.encoder = n, e.prototype.decoder = i, e.prototype.bomAware = !0;
  function n() {
  }
  n.prototype.write = function(c) {
    for (var u = a.from(c, "ucs2"), p = 0; p < u.length; p += 2) {
      var f = u[p];
      u[p] = u[p + 1], u[p + 1] = f;
    }
    return u;
  }, n.prototype.end = function() {
  };
  function i() {
    this.overflowByte = -1;
  }
  i.prototype.write = function(c) {
    if (c.length == 0)
      return "";
    var u = a.alloc(c.length + 1), p = 0, f = 0;
    for (this.overflowByte !== -1 && (u[0] = c[0], u[1] = this.overflowByte, p = 1, f = 2); p < c.length - 1; p += 2, f += 2)
      u[f] = c[p + 1], u[f + 1] = c[p];
    return this.overflowByte = p == c.length - 1 ? c[c.length - 1] : -1, u.slice(0, f).toString("ucs2");
  }, i.prototype.end = function() {
  }, ua.utf16 = t;
  function t(c, u) {
    this.iconv = u;
  }
  t.prototype.encoder = r, t.prototype.decoder = o;
  function r(c, u) {
    c = c || {}, c.addBOM === void 0 && (c.addBOM = !0), this.encoder = u.iconv.getEncoder("utf-16le", c);
  }
  r.prototype.write = function(c) {
    return this.encoder.write(c);
  }, r.prototype.end = function() {
    return this.encoder.end();
  };
  function o(c, u) {
    this.decoder = null, this.initialBytes = [], this.initialBytesLen = 0, this.options = c || {}, this.iconv = u.iconv;
  }
  o.prototype.write = function(c) {
    if (!this.decoder) {
      if (this.initialBytes.push(c), this.initialBytesLen += c.length, this.initialBytesLen < 16)
        return "";
      var c = a.concat(this.initialBytes), u = s(c, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(u, this.options), this.initialBytes.length = this.initialBytesLen = 0;
    }
    return this.decoder.write(c);
  }, o.prototype.end = function() {
    if (!this.decoder) {
      var c = a.concat(this.initialBytes), u = s(c, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(u, this.options);
      var p = this.decoder.write(c), f = this.decoder.end();
      return f ? p + f : p;
    }
    return this.decoder.end();
  };
  function s(c, u) {
    var p = u || "utf-16le";
    if (c.length >= 2)
      if (c[0] == 254 && c[1] == 255)
        p = "utf-16be";
      else if (c[0] == 255 && c[1] == 254)
        p = "utf-16le";
      else {
        for (var f = 0, l = 0, x = Math.min(c.length - c.length % 2, 64), v = 0; v < x; v += 2)
          c[v] === 0 && c[v + 1] !== 0 && l++, c[v] !== 0 && c[v + 1] === 0 && f++;
        l > f ? p = "utf-16be" : l < f && (p = "utf-16le");
      }
    return p;
  }
  return ua;
}
var Le = {}, Hi;
function gc() {
  if (Hi) return Le;
  Hi = 1;
  var a = qe().Buffer;
  Le.utf7 = e, Le.unicode11utf7 = "utf7";
  function e(d, m) {
    this.iconv = m;
  }
  e.prototype.encoder = i, e.prototype.decoder = t, e.prototype.bomAware = !0;
  var n = /[^A-Za-z0-9'\(\),-\.\/:\? \n\r\t]+/g;
  function i(d, m) {
    this.iconv = m.iconv;
  }
  i.prototype.write = function(d) {
    return a.from(d.replace(n, (function(m) {
      return "+" + (m === "+" ? "" : this.iconv.encode(m, "utf16-be").toString("base64").replace(/=+$/, "")) + "-";
    }).bind(this)));
  }, i.prototype.end = function() {
  };
  function t(d, m) {
    this.iconv = m.iconv, this.inBase64 = !1, this.base64Accum = "";
  }
  for (var r = /[A-Za-z0-9\/+]/, o = [], s = 0; s < 256; s++)
    o[s] = r.test(String.fromCharCode(s));
  var c = 43, u = 45, p = 38;
  t.prototype.write = function(d) {
    for (var m = "", h = 0, g = this.inBase64, b = this.base64Accum, y = 0; y < d.length; y++)
      if (!g)
        d[y] == c && (m += this.iconv.decode(d.slice(h, y), "ascii"), h = y + 1, g = !0);
      else if (!o[d[y]]) {
        if (y == h && d[y] == u)
          m += "+";
        else {
          var w = b + d.slice(h, y).toString();
          m += this.iconv.decode(a.from(w, "base64"), "utf16-be");
        }
        d[y] != u && y--, h = y + 1, g = !1, b = "";
      }
    if (!g)
      m += this.iconv.decode(d.slice(h), "ascii");
    else {
      var w = b + d.slice(h).toString(), k = w.length - w.length % 8;
      b = w.slice(k), w = w.slice(0, k), m += this.iconv.decode(a.from(w, "base64"), "utf16-be");
    }
    return this.inBase64 = g, this.base64Accum = b, m;
  }, t.prototype.end = function() {
    var d = "";
    return this.inBase64 && this.base64Accum.length > 0 && (d = this.iconv.decode(a.from(this.base64Accum, "base64"), "utf16-be")), this.inBase64 = !1, this.base64Accum = "", d;
  }, Le.utf7imap = f;
  function f(d, m) {
    this.iconv = m;
  }
  f.prototype.encoder = l, f.prototype.decoder = x, f.prototype.bomAware = !0;
  function l(d, m) {
    this.iconv = m.iconv, this.inBase64 = !1, this.base64Accum = a.alloc(6), this.base64AccumIdx = 0;
  }
  l.prototype.write = function(d) {
    for (var m = this.inBase64, h = this.base64Accum, g = this.base64AccumIdx, b = a.alloc(d.length * 5 + 10), y = 0, w = 0; w < d.length; w++) {
      var k = d.charCodeAt(w);
      32 <= k && k <= 126 ? (m && (g > 0 && (y += b.write(h.slice(0, g).toString("base64").replace(/\//g, ",").replace(/=+$/, ""), y), g = 0), b[y++] = u, m = !1), m || (b[y++] = k, k === p && (b[y++] = u))) : (m || (b[y++] = p, m = !0), m && (h[g++] = k >> 8, h[g++] = k & 255, g == h.length && (y += b.write(h.toString("base64").replace(/\//g, ","), y), g = 0)));
    }
    return this.inBase64 = m, this.base64AccumIdx = g, b.slice(0, y);
  }, l.prototype.end = function() {
    var d = a.alloc(10), m = 0;
    return this.inBase64 && (this.base64AccumIdx > 0 && (m += d.write(this.base64Accum.slice(0, this.base64AccumIdx).toString("base64").replace(/\//g, ",").replace(/=+$/, ""), m), this.base64AccumIdx = 0), d[m++] = u, this.inBase64 = !1), d.slice(0, m);
  };
  function x(d, m) {
    this.iconv = m.iconv, this.inBase64 = !1, this.base64Accum = "";
  }
  var v = o.slice();
  return v[44] = !0, x.prototype.write = function(d) {
    for (var m = "", h = 0, g = this.inBase64, b = this.base64Accum, y = 0; y < d.length; y++)
      if (!g)
        d[y] == p && (m += this.iconv.decode(d.slice(h, y), "ascii"), h = y + 1, g = !0);
      else if (!v[d[y]]) {
        if (y == h && d[y] == u)
          m += "&";
        else {
          var w = b + d.slice(h, y).toString().replace(/,/g, "/");
          m += this.iconv.decode(a.from(w, "base64"), "utf16-be");
        }
        d[y] != u && y--, h = y + 1, g = !1, b = "";
      }
    if (!g)
      m += this.iconv.decode(d.slice(h), "ascii");
    else {
      var w = b + d.slice(h).toString().replace(/,/g, "/"), k = w.length - w.length % 8;
      b = w.slice(k), w = w.slice(0, k), m += this.iconv.decode(a.from(w, "base64"), "utf16-be");
    }
    return this.inBase64 = g, this.base64Accum = b, m;
  }, x.prototype.end = function() {
    var d = "";
    return this.inBase64 && this.base64Accum.length > 0 && (d = this.iconv.decode(a.from(this.base64Accum, "base64"), "utf16-be")), this.inBase64 = !1, this.base64Accum = "", d;
  }, Le;
}
var tn = {}, Gi;
function bc() {
  if (Gi) return tn;
  Gi = 1;
  var a = qe().Buffer;
  tn._sbcs = e;
  function e(t, r) {
    if (!t)
      throw new Error("SBCS codec is called without the data.");
    if (!t.chars || t.chars.length !== 128 && t.chars.length !== 256)
      throw new Error("Encoding '" + t.type + "' has incorrect 'chars' (must be of len 128 or 256)");
    if (t.chars.length === 128) {
      for (var o = "", s = 0; s < 128; s++)
        o += String.fromCharCode(s);
      t.chars = o + t.chars;
    }
    this.decodeBuf = a.from(t.chars, "ucs2");
    for (var c = a.alloc(65536, r.defaultCharSingleByte.charCodeAt(0)), s = 0; s < t.chars.length; s++)
      c[t.chars.charCodeAt(s)] = s;
    this.encodeBuf = c;
  }
  e.prototype.encoder = n, e.prototype.decoder = i;
  function n(t, r) {
    this.encodeBuf = r.encodeBuf;
  }
  n.prototype.write = function(t) {
    for (var r = a.alloc(t.length), o = 0; o < t.length; o++)
      r[o] = this.encodeBuf[t.charCodeAt(o)];
    return r;
  }, n.prototype.end = function() {
  };
  function i(t, r) {
    this.decodeBuf = r.decodeBuf;
  }
  return i.prototype.write = function(t) {
    for (var r = this.decodeBuf, o = a.alloc(t.length * 2), s = 0, c = 0, u = 0; u < t.length; u++)
      s = t[u] * 2, c = u * 2, o[c] = r[s], o[c + 1] = r[s + 1];
    return o.toString("ucs2");
  }, i.prototype.end = function() {
  }, tn;
}
var rn, Wi;
function yc() {
  return Wi || (Wi = 1, rn = {
    // Not supported by iconv, not sure why.
    10029: "maccenteuro",
    maccenteuro: {
      type: "_sbcs",
      chars: "ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅņŃ¬√ńŇ∆«»… ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ"
    },
    808: "cp808",
    ibm808: "cp808",
    cp808: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№€■ "
    },
    mik: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя└┴┬├─┼╣║╚╔╩╦╠═╬┐░▒▓│┤№§╗╝┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    // Aliases of generated encodings.
    ascii8bit: "ascii",
    usascii: "ascii",
    ansix34: "ascii",
    ansix341968: "ascii",
    ansix341986: "ascii",
    csascii: "ascii",
    cp367: "ascii",
    ibm367: "ascii",
    isoir6: "ascii",
    iso646us: "ascii",
    iso646irv: "ascii",
    us: "ascii",
    latin1: "iso88591",
    latin2: "iso88592",
    latin3: "iso88593",
    latin4: "iso88594",
    latin5: "iso88599",
    latin6: "iso885910",
    latin7: "iso885913",
    latin8: "iso885914",
    latin9: "iso885915",
    latin10: "iso885916",
    csisolatin1: "iso88591",
    csisolatin2: "iso88592",
    csisolatin3: "iso88593",
    csisolatin4: "iso88594",
    csisolatincyrillic: "iso88595",
    csisolatinarabic: "iso88596",
    csisolatingreek: "iso88597",
    csisolatinhebrew: "iso88598",
    csisolatin5: "iso88599",
    csisolatin6: "iso885910",
    l1: "iso88591",
    l2: "iso88592",
    l3: "iso88593",
    l4: "iso88594",
    l5: "iso88599",
    l6: "iso885910",
    l7: "iso885913",
    l8: "iso885914",
    l9: "iso885915",
    l10: "iso885916",
    isoir14: "iso646jp",
    isoir57: "iso646cn",
    isoir100: "iso88591",
    isoir101: "iso88592",
    isoir109: "iso88593",
    isoir110: "iso88594",
    isoir144: "iso88595",
    isoir127: "iso88596",
    isoir126: "iso88597",
    isoir138: "iso88598",
    isoir148: "iso88599",
    isoir157: "iso885910",
    isoir166: "tis620",
    isoir179: "iso885913",
    isoir199: "iso885914",
    isoir203: "iso885915",
    isoir226: "iso885916",
    cp819: "iso88591",
    ibm819: "iso88591",
    cyrillic: "iso88595",
    arabic: "iso88596",
    arabic8: "iso88596",
    ecma114: "iso88596",
    asmo708: "iso88596",
    greek: "iso88597",
    greek8: "iso88597",
    ecma118: "iso88597",
    elot928: "iso88597",
    hebrew: "iso88598",
    hebrew8: "iso88598",
    turkish: "iso88599",
    turkish8: "iso88599",
    thai: "iso885911",
    thai8: "iso885911",
    celtic: "iso885914",
    celtic8: "iso885914",
    isoceltic: "iso885914",
    tis6200: "tis620",
    tis62025291: "tis620",
    tis62025330: "tis620",
    1e4: "macroman",
    10006: "macgreek",
    10007: "maccyrillic",
    10079: "maciceland",
    10081: "macturkish",
    cspc8codepage437: "cp437",
    cspc775baltic: "cp775",
    cspc850multilingual: "cp850",
    cspcp852: "cp852",
    cspc862latinhebrew: "cp862",
    cpgr: "cp869",
    msee: "cp1250",
    mscyrl: "cp1251",
    msansi: "cp1252",
    msgreek: "cp1253",
    msturk: "cp1254",
    mshebr: "cp1255",
    msarab: "cp1256",
    winbaltrim: "cp1257",
    cp20866: "koi8r",
    20866: "koi8r",
    ibm878: "koi8r",
    cskoi8r: "koi8r",
    cp21866: "koi8u",
    21866: "koi8u",
    ibm1168: "koi8u",
    strk10482002: "rk1048",
    tcvn5712: "tcvn",
    tcvn57121: "tcvn",
    gb198880: "iso646cn",
    cn: "iso646cn",
    csiso14jisc6220ro: "iso646jp",
    jisc62201969ro: "iso646jp",
    jp: "iso646jp",
    cshproman8: "hproman8",
    r8: "hproman8",
    roman8: "hproman8",
    xroman8: "hproman8",
    ibm1051: "hproman8",
    mac: "macintosh",
    csmacintosh: "macintosh"
  }), rn;
}
var on, Vi;
function wc() {
  return Vi || (Vi = 1, on = {
    437: "cp437",
    737: "cp737",
    775: "cp775",
    850: "cp850",
    852: "cp852",
    855: "cp855",
    856: "cp856",
    857: "cp857",
    858: "cp858",
    860: "cp860",
    861: "cp861",
    862: "cp862",
    863: "cp863",
    864: "cp864",
    865: "cp865",
    866: "cp866",
    869: "cp869",
    874: "windows874",
    922: "cp922",
    1046: "cp1046",
    1124: "cp1124",
    1125: "cp1125",
    1129: "cp1129",
    1133: "cp1133",
    1161: "cp1161",
    1162: "cp1162",
    1163: "cp1163",
    1250: "windows1250",
    1251: "windows1251",
    1252: "windows1252",
    1253: "windows1253",
    1254: "windows1254",
    1255: "windows1255",
    1256: "windows1256",
    1257: "windows1257",
    1258: "windows1258",
    28591: "iso88591",
    28592: "iso88592",
    28593: "iso88593",
    28594: "iso88594",
    28595: "iso88595",
    28596: "iso88596",
    28597: "iso88597",
    28598: "iso88598",
    28599: "iso88599",
    28600: "iso885910",
    28601: "iso885911",
    28603: "iso885913",
    28604: "iso885914",
    28605: "iso885915",
    28606: "iso885916",
    windows874: {
      type: "_sbcs",
      chars: "€����…�����������‘’“”•–—�������� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
    },
    win874: "windows874",
    cp874: "windows874",
    windows1250: {
      type: "_sbcs",
      chars: "€�‚�„…†‡�‰Š‹ŚŤŽŹ�‘’“”•–—�™š›śťžź ˇ˘Ł¤Ą¦§¨©Ş«¬­®Ż°±˛ł´µ¶·¸ąş»Ľ˝ľżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙"
    },
    win1250: "windows1250",
    cp1250: "windows1250",
    windows1251: {
      type: "_sbcs",
      chars: "ЂЃ‚ѓ„…†‡€‰Љ‹ЊЌЋЏђ‘’“”•–—�™љ›њќћџ ЎўЈ¤Ґ¦§Ё©Є«¬­®Ї°±Ііґµ¶·ё№є»јЅѕїАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
    },
    win1251: "windows1251",
    cp1251: "windows1251",
    windows1252: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡ˆ‰Š‹Œ�Ž��‘’“”•–—˜™š›œ�žŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    win1252: "windows1252",
    cp1252: "windows1252",
    windows1253: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡�‰�‹�����‘’“”•–—�™�›���� ΅Ά£¤¥¦§¨©�«¬­®―°±²³΄µ¶·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�"
    },
    win1253: "windows1253",
    cp1253: "windows1253",
    windows1254: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡ˆ‰Š‹Œ����‘’“”•–—˜™š›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ"
    },
    win1254: "windows1254",
    cp1254: "windows1254",
    windows1255: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡ˆ‰�‹�����‘’“”•–—˜™�›���� ¡¢£₪¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾¿ְֱֲֳִֵֶַָֹֺֻּֽ־ֿ׀ׁׂ׃װױײ׳״�������אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�"
    },
    win1255: "windows1255",
    cp1255: "windows1255",
    windows1256: {
      type: "_sbcs",
      chars: "€پ‚ƒ„…†‡ˆ‰ٹ‹Œچژڈگ‘’“”•–—ک™ڑ›œ‌‍ں ،¢£¤¥¦§¨©ھ«¬­®¯°±²³´µ¶·¸¹؛»¼½¾؟ہءآأؤإئابةتثجحخدذرزسشصض×طظعغـفقكàلâمنهوçèéêëىيîïًٌٍَôُِ÷ّùْûü‎‏ے"
    },
    win1256: "windows1256",
    cp1256: "windows1256",
    windows1257: {
      type: "_sbcs",
      chars: "€�‚�„…†‡�‰�‹�¨ˇ¸�‘’“”•–—�™�›�¯˛� �¢£¤�¦§Ø©Ŗ«¬­®Æ°±²³´µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž˙"
    },
    win1257: "windows1257",
    cp1257: "windows1257",
    windows1258: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡ˆ‰�‹Œ����‘’“”•–—˜™�›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
    },
    win1258: "windows1258",
    cp1258: "windows1258",
    iso88591: {
      type: "_sbcs",
      chars: " ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    cp28591: "iso88591",
    iso88592: {
      type: "_sbcs",
      chars: " Ą˘Ł¤ĽŚ§¨ŠŞŤŹ­ŽŻ°ą˛ł´ľśˇ¸šşťź˝žżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙"
    },
    cp28592: "iso88592",
    iso88593: {
      type: "_sbcs",
      chars: " Ħ˘£¤�Ĥ§¨İŞĞĴ­�Ż°ħ²³´µĥ·¸ışğĵ½�żÀÁÂ�ÄĊĈÇÈÉÊËÌÍÎÏ�ÑÒÓÔĠÖ×ĜÙÚÛÜŬŜßàáâ�äċĉçèéêëìíîï�ñòóôġö÷ĝùúûüŭŝ˙"
    },
    cp28593: "iso88593",
    iso88594: {
      type: "_sbcs",
      chars: " ĄĸŖ¤ĨĻ§¨ŠĒĢŦ­Ž¯°ą˛ŗ´ĩļˇ¸šēģŧŊžŋĀÁÂÃÄÅÆĮČÉĘËĖÍÎĪĐŅŌĶÔÕÖ×ØŲÚÛÜŨŪßāáâãäåæįčéęëėíîīđņōķôõö÷øųúûüũū˙"
    },
    cp28594: "iso88594",
    iso88595: {
      type: "_sbcs",
      chars: " ЁЂЃЄЅІЇЈЉЊЋЌ­ЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя№ёђѓєѕіїјљњћќ§ўџ"
    },
    cp28595: "iso88595",
    iso88596: {
      type: "_sbcs",
      chars: " ���¤�������،­�������������؛���؟�ءآأؤإئابةتثجحخدذرزسشصضطظعغ�����ـفقكلمنهوىيًٌٍَُِّْ�������������"
    },
    cp28596: "iso88596",
    iso88597: {
      type: "_sbcs",
      chars: " ‘’£€₯¦§¨©ͺ«¬­�―°±²³΄΅Ά·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�"
    },
    cp28597: "iso88597",
    iso88598: {
      type: "_sbcs",
      chars: " �¢£¤¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾��������������������������������‗אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�"
    },
    cp28598: "iso88598",
    iso88599: {
      type: "_sbcs",
      chars: " ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ"
    },
    cp28599: "iso88599",
    iso885910: {
      type: "_sbcs",
      chars: " ĄĒĢĪĨĶ§ĻĐŠŦŽ­ŪŊ°ąēģīĩķ·ļđšŧž―ūŋĀÁÂÃÄÅÆĮČÉĘËĖÍÎÏÐŅŌÓÔÕÖŨØŲÚÛÜÝÞßāáâãäåæįčéęëėíîïðņōóôõöũøųúûüýþĸ"
    },
    cp28600: "iso885910",
    iso885911: {
      type: "_sbcs",
      chars: " กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
    },
    cp28601: "iso885911",
    iso885913: {
      type: "_sbcs",
      chars: " ”¢£¤„¦§Ø©Ŗ«¬­®Æ°±²³“µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž’"
    },
    cp28603: "iso885913",
    iso885914: {
      type: "_sbcs",
      chars: " Ḃḃ£ĊċḊ§Ẁ©ẂḋỲ­®ŸḞḟĠġṀṁ¶ṖẁṗẃṠỳẄẅṡÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŴÑÒÓÔÕÖṪØÙÚÛÜÝŶßàáâãäåæçèéêëìíîïŵñòóôõöṫøùúûüýŷÿ"
    },
    cp28604: "iso885914",
    iso885915: {
      type: "_sbcs",
      chars: " ¡¢£€¥Š§š©ª«¬­®¯°±²³Žµ¶·ž¹º»ŒœŸ¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    cp28605: "iso885915",
    iso885916: {
      type: "_sbcs",
      chars: " ĄąŁ€„Š§š©Ș«Ź­źŻ°±ČłŽ”¶·žčș»ŒœŸżÀÁÂĂÄĆÆÇÈÉÊËÌÍÎÏĐŃÒÓÔŐÖŚŰÙÚÛÜĘȚßàáâăäćæçèéêëìíîïđńòóôőöśűùúûüęțÿ"
    },
    cp28606: "iso885916",
    cp437: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm437: "cp437",
    csibm437: "cp437",
    cp737: {
      type: "_sbcs",
      chars: "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρσςτυφχψ░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ωάέήϊίόύϋώΆΈΉΊΌΎΏ±≥≤ΪΫ÷≈°∙·√ⁿ²■ "
    },
    ibm737: "cp737",
    csibm737: "cp737",
    cp775: {
      type: "_sbcs",
      chars: "ĆüéāäģåćłēŖŗīŹÄÅÉæÆōöĢ¢ŚśÖÜø£Ø×¤ĀĪóŻżź”¦©®¬½¼Ł«»░▒▓│┤ĄČĘĖ╣║╗╝ĮŠ┐└┴┬├─┼ŲŪ╚╔╩╦╠═╬Žąčęėįšųūž┘┌█▄▌▐▀ÓßŌŃõÕµńĶķĻļņĒŅ’­±“¾¶§÷„°∙·¹³²■ "
    },
    ibm775: "cp775",
    csibm775: "cp775",
    cp850: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈıÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ "
    },
    ibm850: "cp850",
    csibm850: "cp850",
    cp852: {
      type: "_sbcs",
      chars: "ÇüéâäůćçłëŐőîŹÄĆÉĹĺôöĽľŚśÖÜŤťŁ×čáíóúĄąŽžĘę¬źČş«»░▒▓│┤ÁÂĚŞ╣║╗╝Żż┐└┴┬├─┼Ăă╚╔╩╦╠═╬¤đĐĎËďŇÍÎě┘┌█▄ŢŮ▀ÓßÔŃńňŠšŔÚŕŰýÝţ´­˝˛ˇ˘§÷¸°¨˙űŘř■ "
    },
    ibm852: "cp852",
    csibm852: "cp852",
    cp855: {
      type: "_sbcs",
      chars: "ђЂѓЃёЁєЄѕЅіІїЇјЈљЉњЊћЋќЌўЎџЏюЮъЪаАбБцЦдДеЕфФгГ«»░▒▓│┤хХиИ╣║╗╝йЙ┐└┴┬├─┼кК╚╔╩╦╠═╬¤лЛмМнНоОп┘┌█▄Пя▀ЯрРсСтТуУжЖвВьЬ№­ыЫзЗшШэЭщЩчЧ§■ "
    },
    ibm855: "cp855",
    csibm855: "cp855",
    cp856: {
      type: "_sbcs",
      chars: "אבגדהוזחטיךכלםמןנסעףפץצקרשת�£�×����������®¬½¼�«»░▒▓│┤���©╣║╗╝¢¥┐└┴┬├─┼��╚╔╩╦╠═╬¤���������┘┌█▄¦�▀������µ�������¯´­±‗¾¶§÷¸°¨·¹³²■ "
    },
    ibm856: "cp856",
    csibm856: "cp856",
    cp857: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîıÄÅÉæÆôöòûùİÖÜø£ØŞşáíóúñÑĞğ¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ºªÊËÈ�ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµ�×ÚÛÙìÿ¯´­±�¾¶§÷¸°¨·¹³²■ "
    },
    ibm857: "cp857",
    csibm857: "cp857",
    cp858: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈ€ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ "
    },
    ibm858: "cp858",
    csibm858: "cp858",
    cp860: {
      type: "_sbcs",
      chars: "ÇüéâãàÁçêÊèÍÔìÃÂÉÀÈôõòÚùÌÕÜ¢£Ù₧ÓáíóúñÑªº¿Ò¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm860: "cp860",
    csibm860: "cp860",
    cp861: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèÐðÞÄÅÉæÆôöþûÝýÖÜø£Ø₧ƒáíóúÁÍÓÚ¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm861: "cp861",
    csibm861: "cp861",
    cp862: {
      type: "_sbcs",
      chars: "אבגדהוזחטיךכלםמןנסעףפץצקרשת¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm862: "cp862",
    csibm862: "cp862",
    cp863: {
      type: "_sbcs",
      chars: "ÇüéâÂà¶çêëèïî‗À§ÉÈÊôËÏûù¤ÔÜ¢£ÙÛƒ¦´óú¨¸³¯Î⌐¬½¼¾«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm863: "cp863",
    csibm863: "cp863",
    cp864: {
      type: "_sbcs",
      chars: `\0\x07\b	
\v\f\r\x1B !"#$٪&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~°·∙√▒─│┼┤┬├┴┐┌└┘β∞φ±½¼≈«»ﻷﻸ��ﻻﻼ� ­ﺂ£¤ﺄ��ﺎﺏﺕﺙ،ﺝﺡﺥ٠١٢٣٤٥٦٧٨٩ﻑ؛ﺱﺵﺹ؟¢ﺀﺁﺃﺅﻊﺋﺍﺑﺓﺗﺛﺟﺣﺧﺩﺫﺭﺯﺳﺷﺻﺿﻁﻅﻋﻏ¦¬÷×ﻉـﻓﻗﻛﻟﻣﻧﻫﻭﻯﻳﺽﻌﻎﻍﻡﹽّﻥﻩﻬﻰﻲﻐﻕﻵﻶﻝﻙﻱ■�`
    },
    ibm864: "cp864",
    csibm864: "cp864",
    cp865: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø₧ƒáíóúñÑªº¿⌐¬½¼¡«¤░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm865: "cp865",
    csibm865: "cp865",
    cp866: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№¤■ "
    },
    ibm866: "cp866",
    csibm866: "cp866",
    cp869: {
      type: "_sbcs",
      chars: "������Ά�·¬¦‘’Έ―ΉΊΪΌ��ΎΫ©Ώ²³ά£έήίϊΐόύΑΒΓΔΕΖΗ½ΘΙ«»░▒▓│┤ΚΛΜΝ╣║╗╝ΞΟ┐└┴┬├─┼ΠΡ╚╔╩╦╠═╬ΣΤΥΦΧΨΩαβγ┘┌█▄δε▀ζηθικλμνξοπρσςτ΄­±υφχ§ψ΅°¨ωϋΰώ■ "
    },
    ibm869: "cp869",
    csibm869: "cp869",
    cp922: {
      type: "_sbcs",
      chars: " ¡¢£¤¥¦§¨©ª«¬­®‾°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŠÑÒÓÔÕÖ×ØÙÚÛÜÝŽßàáâãäåæçèéêëìíîïšñòóôõö÷øùúûüýžÿ"
    },
    ibm922: "cp922",
    csibm922: "cp922",
    cp1046: {
      type: "_sbcs",
      chars: "ﺈ×÷ﹱ■│─┐┌└┘ﹹﹻﹽﹿﹷﺊﻰﻳﻲﻎﻏﻐﻶﻸﻺﻼ ¤ﺋﺑﺗﺛﺟﺣ،­ﺧﺳ٠١٢٣٤٥٦٧٨٩ﺷ؛ﺻﺿﻊ؟ﻋءآأؤإئابةتثجحخدذرزسشصضطﻇعغﻌﺂﺄﺎﻓـفقكلمنهوىيًٌٍَُِّْﻗﻛﻟﻵﻷﻹﻻﻣﻧﻬﻩ�"
    },
    ibm1046: "cp1046",
    csibm1046: "cp1046",
    cp1124: {
      type: "_sbcs",
      chars: " ЁЂҐЄЅІЇЈЉЊЋЌ­ЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя№ёђґєѕіїјљњћќ§ўџ"
    },
    ibm1124: "cp1124",
    csibm1124: "cp1124",
    cp1125: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёҐґЄєІіЇї·√№¤■ "
    },
    ibm1125: "cp1125",
    csibm1125: "cp1125",
    cp1129: {
      type: "_sbcs",
      chars: " ¡¢£¤¥¦§œ©ª«¬­®¯°±²³Ÿµ¶·Œ¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
    },
    ibm1129: "cp1129",
    csibm1129: "cp1129",
    cp1133: {
      type: "_sbcs",
      chars: " ກຂຄງຈສຊຍດຕຖທນບປຜຝພຟມຢຣລວຫອຮ���ຯະາຳິີຶືຸູຼັົຽ���ເແໂໃໄ່້໊໋໌ໍໆ�ໜໝ₭����������������໐໑໒໓໔໕໖໗໘໙��¢¬¦�"
    },
    ibm1133: "cp1133",
    csibm1133: "cp1133",
    cp1161: {
      type: "_sbcs",
      chars: "��������������������������������่กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู้๊๋€฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛¢¬¦ "
    },
    ibm1161: "cp1161",
    csibm1161: "cp1161",
    cp1162: {
      type: "_sbcs",
      chars: "€…‘’“”•–— กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
    },
    ibm1162: "cp1162",
    csibm1162: "cp1162",
    cp1163: {
      type: "_sbcs",
      chars: " ¡¢£€¥¦§œ©ª«¬­®¯°±²³Ÿµ¶·Œ¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
    },
    ibm1163: "cp1163",
    csibm1163: "cp1163",
    maccroatian: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø¿¡¬√ƒ≈Ć«Č… ÀÃÕŒœĐ—“”‘’÷◊�©⁄¤‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ"
    },
    maccyrillic: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°¢£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµ∂ЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤"
    },
    macgreek: {
      type: "_sbcs",
      chars: "Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦­ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩάΝ¬ΟΡ≈Τ«»… ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ�"
    },
    maciceland: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
    },
    macroman: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
    },
    macromania: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂŞ∞±≤≥¥µ∂∑∏π∫ªºΩăş¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›Ţţ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
    },
    macthai: {
      type: "_sbcs",
      chars: "«»…“”�•‘’� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู\uFEFF​–—฿เแโใไๅๆ็่้๊๋์ํ™๏๐๑๒๓๔๕๖๗๘๙®©����"
    },
    macturkish: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙ�ˆ˜¯˘˙˚¸˝˛ˇ"
    },
    macukraine: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤"
    },
    koi8r: {
      type: "_sbcs",
      chars: "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ё╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡Ё╢╣╤╥╦╧╨╩╪╫╬©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
    },
    koi8u: {
      type: "_sbcs",
      chars: "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ёє╔ії╗╘╙╚╛ґ╝╞╟╠╡ЁЄ╣ІЇ╦╧╨╩╪Ґ╬©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
    },
    koi8ru: {
      type: "_sbcs",
      chars: "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ёє╔ії╗╘╙╚╛ґў╞╟╠╡ЁЄ╣ІЇ╦╧╨╩╪ҐЎ©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
    },
    koi8t: {
      type: "_sbcs",
      chars: "қғ‚Ғ„…†‡�‰ҳ‹ҲҷҶ�Қ‘’“”•–—�™�›�����ӯӮё¤ӣ¦§���«¬­®�°±²Ё�Ӣ¶·�№�»���©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
    },
    armscii8: {
      type: "_sbcs",
      chars: " �և։)(»«—.՝,-֊…՜՛՞ԱաԲբԳգԴդԵեԶզԷէԸըԹթԺժԻիԼլԽխԾծԿկՀհՁձՂղՃճՄմՅյՆնՇշՈոՉչՊպՋջՌռՍսՎվՏտՐրՑցՒւՓփՔքՕօՖֆ՚�"
    },
    rk1048: {
      type: "_sbcs",
      chars: "ЂЃ‚ѓ„…†‡€‰Љ‹ЊҚҺЏђ‘’“”•–—�™љ›њқһџ ҰұӘ¤Ө¦§Ё©Ғ«¬­®Ү°±Ііөµ¶·ё№ғ»әҢңүАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
    },
    tcvn: {
      type: "_sbcs",
      chars: `\0ÚỤỪỬỮ\x07\b	
\v\f\rỨỰỲỶỸÝỴ\x1B !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~ÀẢÃÁẠẶẬÈẺẼÉẸỆÌỈĨÍỊÒỎÕÓỌỘỜỞỠỚỢÙỦŨ ĂÂÊÔƠƯĐăâêôơưđẶ̀̀̉̃́àảãáạẲằẳẵắẴẮẦẨẪẤỀặầẩẫấậèỂẻẽéẹềểễếệìỉỄẾỒĩíịòỔỏõóọồổỗốộờởỡớợùỖủũúụừửữứựỳỷỹýỵỐ`
    },
    georgianacademy: {
      type: "_sbcs",
      chars: "‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰჱჲჳჴჵჶçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    georgianps: {
      type: "_sbcs",
      chars: "‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿აბგდევზჱთიკლმნჲოპჟრსტჳუფქღყშჩცძწჭხჴჯჰჵæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    pt154: {
      type: "_sbcs",
      chars: "ҖҒӮғ„…ҶҮҲүҠӢҢҚҺҸҗ‘’“”•–—ҳҷҡӣңқһҹ ЎўЈӨҘҰ§Ё©Ә«¬ӯ®Ҝ°ұІіҙө¶·ё№ә»јҪҫҝАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
    },
    viscii: {
      type: "_sbcs",
      chars: `\0ẲẴẪ\x07\b	
\v\f\rỶỸ\x1BỴ !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~ẠẮẰẶẤẦẨẬẼẸẾỀỂỄỆỐỒỔỖỘỢỚỜỞỊỎỌỈỦŨỤỲÕắằặấầẩậẽẹếềểễệốồổỗỠƠộờởịỰỨỪỬơớƯÀÁÂÃẢĂẳẵÈÉÊẺÌÍĨỳĐứÒÓÔạỷừửÙÚỹỵÝỡưàáâãảăữẫèéêẻìíĩỉđựòóôõỏọụùúũủýợỮ`
    },
    iso646cn: {
      type: "_sbcs",
      chars: `\0\x07\b	
\v\f\r\x1B !"#¥%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}‾��������������������������������������������������������������������������������������������������������������������������������`
    },
    iso646jp: {
      type: "_sbcs",
      chars: `\0\x07\b	
\v\f\r\x1B !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[¥]^_\`abcdefghijklmnopqrstuvwxyz{|}‾��������������������������������������������������������������������������������������������������������������������������������`
    },
    hproman8: {
      type: "_sbcs",
      chars: " ÀÂÈÊËÎÏ´ˋˆ¨˜ÙÛ₤¯Ýý°ÇçÑñ¡¿¤£¥§ƒ¢âêôûáéóúàèòùäëöüÅîØÆåíøæÄìÖÜÉïßÔÁÃãÐðÍÌÓÒÕõŠšÚŸÿÞþ·µ¶¾—¼½ªº«■»±�"
    },
    macintosh: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
    },
    ascii: {
      type: "_sbcs",
      chars: "��������������������������������������������������������������������������������������������������������������������������������"
    },
    tis620: {
      type: "_sbcs",
      chars: "���������������������������������กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
    }
  }), on;
}
var sn = {}, Xi;
function kc() {
  if (Xi) return sn;
  Xi = 1;
  var a = qe().Buffer;
  sn._dbcs = c;
  for (var e = -1, n = -2, i = -10, t = -1e3, r = new Array(256), o = -1, s = 0; s < 256; s++)
    r[s] = e;
  function c(l, x) {
    if (this.encodingName = l.encodingName, !l)
      throw new Error("DBCS codec is called without the data.");
    if (!l.table)
      throw new Error("Encoding '" + this.encodingName + "' has no data.");
    var v = l.table();
    this.decodeTables = [], this.decodeTables[0] = r.slice(0), this.decodeTableSeq = [];
    for (var d = 0; d < v.length; d++)
      this._addDecodeChunk(v[d]);
    this.defaultCharUnicode = x.defaultCharUnicode, this.encodeTable = [], this.encodeTableSeq = [];
    var m = {};
    if (l.encodeSkipVals)
      for (var d = 0; d < l.encodeSkipVals.length; d++) {
        var h = l.encodeSkipVals[d];
        if (typeof h == "number")
          m[h] = !0;
        else
          for (var g = h.from; g <= h.to; g++)
            m[g] = !0;
      }
    if (this._fillEncodeTable(0, 0, m), l.encodeAdd)
      for (var b in l.encodeAdd)
        Object.prototype.hasOwnProperty.call(l.encodeAdd, b) && this._setEncodeChar(b.charCodeAt(0), l.encodeAdd[b]);
    if (this.defCharSB = this.encodeTable[0][x.defaultCharSingleByte.charCodeAt(0)], this.defCharSB === e && (this.defCharSB = this.encodeTable[0]["?"]), this.defCharSB === e && (this.defCharSB = 63), typeof l.gb18030 == "function") {
      this.gb18030 = l.gb18030();
      for (var y = this.decodeTables.length, w = this.decodeTables[y] = r.slice(0), k = this.decodeTables.length, A = this.decodeTables[k] = r.slice(0), d = 129; d <= 254; d++)
        for (var _ = t - this.decodeTables[0][d], E = this.decodeTables[_], g = 48; g <= 57; g++)
          E[g] = t - y;
      for (var d = 129; d <= 254; d++)
        w[d] = t - k;
      for (var d = 48; d <= 57; d++)
        A[d] = n;
    }
  }
  c.prototype.encoder = u, c.prototype.decoder = p, c.prototype._getDecodeTrieNode = function(l) {
    for (var x = []; l > 0; l >>= 8)
      x.push(l & 255);
    x.length == 0 && x.push(0);
    for (var v = this.decodeTables[0], d = x.length - 1; d > 0; d--) {
      var m = v[x[d]];
      if (m == e)
        v[x[d]] = t - this.decodeTables.length, this.decodeTables.push(v = r.slice(0));
      else if (m <= t)
        v = this.decodeTables[t - m];
      else
        throw new Error("Overwrite byte in " + this.encodingName + ", addr: " + l.toString(16));
    }
    return v;
  }, c.prototype._addDecodeChunk = function(l) {
    var x = parseInt(l[0], 16), v = this._getDecodeTrieNode(x);
    x = x & 255;
    for (var d = 1; d < l.length; d++) {
      var m = l[d];
      if (typeof m == "string")
        for (var h = 0; h < m.length; ) {
          var g = m.charCodeAt(h++);
          if (55296 <= g && g < 56320) {
            var b = m.charCodeAt(h++);
            if (56320 <= b && b < 57344)
              v[x++] = 65536 + (g - 55296) * 1024 + (b - 56320);
            else
              throw new Error("Incorrect surrogate pair in " + this.encodingName + " at chunk " + l[0]);
          } else if (4080 < g && g <= 4095) {
            for (var y = 4095 - g + 2, w = [], k = 0; k < y; k++)
              w.push(m.charCodeAt(h++));
            v[x++] = i - this.decodeTableSeq.length, this.decodeTableSeq.push(w);
          } else
            v[x++] = g;
        }
      else if (typeof m == "number")
        for (var A = v[x - 1] + 1, h = 0; h < m; h++)
          v[x++] = A++;
      else
        throw new Error("Incorrect type '" + typeof m + "' given in " + this.encodingName + " at chunk " + l[0]);
    }
    if (x > 255)
      throw new Error("Incorrect chunk in " + this.encodingName + " at addr " + l[0] + ": too long" + x);
  }, c.prototype._getEncodeBucket = function(l) {
    var x = l >> 8;
    return this.encodeTable[x] === void 0 && (this.encodeTable[x] = r.slice(0)), this.encodeTable[x];
  }, c.prototype._setEncodeChar = function(l, x) {
    var v = this._getEncodeBucket(l), d = l & 255;
    v[d] <= i ? this.encodeTableSeq[i - v[d]][o] = x : v[d] == e && (v[d] = x);
  }, c.prototype._setEncodeSequence = function(l, x) {
    var v = l[0], d = this._getEncodeBucket(v), m = v & 255, h;
    d[m] <= i ? h = this.encodeTableSeq[i - d[m]] : (h = {}, d[m] !== e && (h[o] = d[m]), d[m] = i - this.encodeTableSeq.length, this.encodeTableSeq.push(h));
    for (var g = 1; g < l.length - 1; g++) {
      var b = h[v];
      typeof b == "object" ? h = b : (h = h[v] = {}, b !== void 0 && (h[o] = b));
    }
    v = l[l.length - 1], h[v] = x;
  }, c.prototype._fillEncodeTable = function(l, x, v) {
    for (var d = this.decodeTables[l], m = 0; m < 256; m++) {
      var h = d[m], g = x + m;
      v[g] || (h >= 0 ? this._setEncodeChar(h, g) : h <= t ? this._fillEncodeTable(t - h, g << 8, v) : h <= i && this._setEncodeSequence(this.decodeTableSeq[i - h], g));
    }
  };
  function u(l, x) {
    this.leadSurrogate = -1, this.seqObj = void 0, this.encodeTable = x.encodeTable, this.encodeTableSeq = x.encodeTableSeq, this.defaultCharSingleByte = x.defCharSB, this.gb18030 = x.gb18030;
  }
  u.prototype.write = function(l) {
    for (var x = a.alloc(l.length * (this.gb18030 ? 4 : 3)), v = this.leadSurrogate, d = this.seqObj, m = -1, h = 0, g = 0; ; ) {
      if (m === -1) {
        if (h == l.length) break;
        var b = l.charCodeAt(h++);
      } else {
        var b = m;
        m = -1;
      }
      if (55296 <= b && b < 57344)
        if (b < 56320)
          if (v === -1) {
            v = b;
            continue;
          } else
            v = b, b = e;
        else
          v !== -1 ? (b = 65536 + (v - 55296) * 1024 + (b - 56320), v = -1) : b = e;
      else v !== -1 && (m = b, b = e, v = -1);
      var y = e;
      if (d !== void 0 && b != e) {
        var w = d[b];
        if (typeof w == "object") {
          d = w;
          continue;
        } else typeof w == "number" ? y = w : w == null && (w = d[o], w !== void 0 && (y = w, m = b));
        d = void 0;
      } else if (b >= 0) {
        var k = this.encodeTable[b >> 8];
        if (k !== void 0 && (y = k[b & 255]), y <= i) {
          d = this.encodeTableSeq[i - y];
          continue;
        }
        if (y == e && this.gb18030) {
          var A = f(this.gb18030.uChars, b);
          if (A != -1) {
            var y = this.gb18030.gbChars[A] + (b - this.gb18030.uChars[A]);
            x[g++] = 129 + Math.floor(y / 12600), y = y % 12600, x[g++] = 48 + Math.floor(y / 1260), y = y % 1260, x[g++] = 129 + Math.floor(y / 10), y = y % 10, x[g++] = 48 + y;
            continue;
          }
        }
      }
      y === e && (y = this.defaultCharSingleByte), y < 256 ? x[g++] = y : y < 65536 ? (x[g++] = y >> 8, x[g++] = y & 255) : (x[g++] = y >> 16, x[g++] = y >> 8 & 255, x[g++] = y & 255);
    }
    return this.seqObj = d, this.leadSurrogate = v, x.slice(0, g);
  }, u.prototype.end = function() {
    if (!(this.leadSurrogate === -1 && this.seqObj === void 0)) {
      var l = a.alloc(10), x = 0;
      if (this.seqObj) {
        var v = this.seqObj[o];
        v !== void 0 && (v < 256 ? l[x++] = v : (l[x++] = v >> 8, l[x++] = v & 255)), this.seqObj = void 0;
      }
      return this.leadSurrogate !== -1 && (l[x++] = this.defaultCharSingleByte, this.leadSurrogate = -1), l.slice(0, x);
    }
  }, u.prototype.findIdx = f;
  function p(l, x) {
    this.nodeIdx = 0, this.prevBuf = a.alloc(0), this.decodeTables = x.decodeTables, this.decodeTableSeq = x.decodeTableSeq, this.defaultCharUnicode = x.defaultCharUnicode, this.gb18030 = x.gb18030;
  }
  p.prototype.write = function(l) {
    var x = a.alloc(l.length * 2), v = this.nodeIdx, d = this.prevBuf, m = this.prevBuf.length, h = -this.prevBuf.length, g;
    m > 0 && (d = a.concat([d, l.slice(0, 10)]));
    for (var b = 0, y = 0; b < l.length; b++) {
      var w = b >= 0 ? l[b] : d[b + m], g = this.decodeTables[v][w];
      if (!(g >= 0)) if (g === e)
        b = h, g = this.defaultCharUnicode.charCodeAt(0);
      else if (g === n) {
        var k = h >= 0 ? l.slice(h, b + 1) : d.slice(h + m, b + 1 + m), A = (k[0] - 129) * 12600 + (k[1] - 48) * 1260 + (k[2] - 129) * 10 + (k[3] - 48), _ = f(this.gb18030.gbChars, A);
        g = this.gb18030.uChars[_] + A - this.gb18030.gbChars[_];
      } else if (g <= t) {
        v = t - g;
        continue;
      } else if (g <= i) {
        for (var E = this.decodeTableSeq[i - g], S = 0; S < E.length - 1; S++)
          g = E[S], x[y++] = g & 255, x[y++] = g >> 8;
        g = E[E.length - 1];
      } else
        throw new Error("iconv-lite internal error: invalid decoding table value " + g + " at " + v + "/" + w);
      if (g > 65535) {
        g -= 65536;
        var j = 55296 + Math.floor(g / 1024);
        x[y++] = j & 255, x[y++] = j >> 8, g = 56320 + g % 1024;
      }
      x[y++] = g & 255, x[y++] = g >> 8, v = 0, h = b + 1;
    }
    return this.nodeIdx = v, this.prevBuf = h >= 0 ? l.slice(h) : d.slice(h + m), x.slice(0, y).toString("ucs2");
  }, p.prototype.end = function() {
    for (var l = ""; this.prevBuf.length > 0; ) {
      l += this.defaultCharUnicode;
      var x = this.prevBuf.slice(1);
      this.prevBuf = a.alloc(0), this.nodeIdx = 0, x.length > 0 && (l += this.write(x));
    }
    return this.nodeIdx = 0, l;
  };
  function f(l, x) {
    if (l[0] > x)
      return -1;
    for (var v = 0, d = l.length; v < d - 1; ) {
      var m = v + Math.floor((d - v + 1) / 2);
      l[m] <= x ? v = m : d = m;
    }
    return v;
  }
  return sn;
}
const Ec = [
  [
    "0",
    "\0",
    128
  ],
  [
    "a1",
    "｡",
    62
  ],
  [
    "8140",
    "　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈",
    9,
    "＋－±×"
  ],
  [
    "8180",
    "÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇◆□■△▲▽▼※〒→←↑↓〓"
  ],
  [
    "81b8",
    "∈∋⊆⊇⊂⊃∪∩"
  ],
  [
    "81c8",
    "∧∨￢⇒⇔∀∃"
  ],
  [
    "81da",
    "∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬"
  ],
  [
    "81f0",
    "Å‰♯♭♪†‡¶"
  ],
  [
    "81fc",
    "◯"
  ],
  [
    "824f",
    "０",
    9
  ],
  [
    "8260",
    "Ａ",
    25
  ],
  [
    "8281",
    "ａ",
    25
  ],
  [
    "829f",
    "ぁ",
    82
  ],
  [
    "8340",
    "ァ",
    62
  ],
  [
    "8380",
    "ム",
    22
  ],
  [
    "839f",
    "Α",
    16,
    "Σ",
    6
  ],
  [
    "83bf",
    "α",
    16,
    "σ",
    6
  ],
  [
    "8440",
    "А",
    5,
    "ЁЖ",
    25
  ],
  [
    "8470",
    "а",
    5,
    "ёж",
    7
  ],
  [
    "8480",
    "о",
    17
  ],
  [
    "849f",
    "─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂"
  ],
  [
    "8740",
    "①",
    19,
    "Ⅰ",
    9
  ],
  [
    "875f",
    "㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡"
  ],
  [
    "877e",
    "㍻"
  ],
  [
    "8780",
    "〝〟№㏍℡㊤",
    4,
    "㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪"
  ],
  [
    "889f",
    "亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭"
  ],
  [
    "8940",
    "院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円"
  ],
  [
    "8980",
    "園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改"
  ],
  [
    "8a40",
    "魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫"
  ],
  [
    "8a80",
    "橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄"
  ],
  [
    "8b40",
    "機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救"
  ],
  [
    "8b80",
    "朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈"
  ],
  [
    "8c40",
    "掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨"
  ],
  [
    "8c80",
    "劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向"
  ],
  [
    "8d40",
    "后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降"
  ],
  [
    "8d80",
    "項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷"
  ],
  [
    "8e40",
    "察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止"
  ],
  [
    "8e80",
    "死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周"
  ],
  [
    "8f40",
    "宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳"
  ],
  [
    "8f80",
    "準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾"
  ],
  [
    "9040",
    "拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨"
  ],
  [
    "9080",
    "逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線"
  ],
  [
    "9140",
    "繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻"
  ],
  [
    "9180",
    "操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只"
  ],
  [
    "9240",
    "叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄"
  ],
  [
    "9280",
    "逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓"
  ],
  [
    "9340",
    "邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬"
  ],
  [
    "9380",
    "凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入"
  ],
  [
    "9440",
    "如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅"
  ],
  [
    "9480",
    "楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美"
  ],
  [
    "9540",
    "鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷"
  ],
  [
    "9580",
    "斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋"
  ],
  [
    "9640",
    "法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆"
  ],
  [
    "9680",
    "摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒"
  ],
  [
    "9740",
    "諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲"
  ],
  [
    "9780",
    "沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯"
  ],
  [
    "9840",
    "蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕"
  ],
  [
    "989f",
    "弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲"
  ],
  [
    "9940",
    "僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭"
  ],
  [
    "9980",
    "凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨"
  ],
  [
    "9a40",
    "咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸"
  ],
  [
    "9a80",
    "噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩"
  ],
  [
    "9b40",
    "奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀"
  ],
  [
    "9b80",
    "它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏"
  ],
  [
    "9c40",
    "廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠"
  ],
  [
    "9c80",
    "怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛"
  ],
  [
    "9d40",
    "戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫"
  ],
  [
    "9d80",
    "捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼"
  ],
  [
    "9e40",
    "曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎"
  ],
  [
    "9e80",
    "梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣"
  ],
  [
    "9f40",
    "檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯"
  ],
  [
    "9f80",
    "麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌"
  ],
  [
    "e040",
    "漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝"
  ],
  [
    "e080",
    "烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱"
  ],
  [
    "e140",
    "瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿"
  ],
  [
    "e180",
    "痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬"
  ],
  [
    "e240",
    "磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰"
  ],
  [
    "e280",
    "窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆"
  ],
  [
    "e340",
    "紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷"
  ],
  [
    "e380",
    "縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋"
  ],
  [
    "e440",
    "隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤"
  ],
  [
    "e480",
    "艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈"
  ],
  [
    "e540",
    "蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬"
  ],
  [
    "e580",
    "蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞"
  ],
  [
    "e640",
    "襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧"
  ],
  [
    "e680",
    "諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊"
  ],
  [
    "e740",
    "蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜"
  ],
  [
    "e780",
    "轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮"
  ],
  [
    "e840",
    "錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙"
  ],
  [
    "e880",
    "閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰"
  ],
  [
    "e940",
    "顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃"
  ],
  [
    "e980",
    "騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈"
  ],
  [
    "ea40",
    "鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯"
  ],
  [
    "ea80",
    "黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠堯槇遙瑤凜熙"
  ],
  [
    "ed40",
    "纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏"
  ],
  [
    "ed80",
    "塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱"
  ],
  [
    "ee40",
    "犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙"
  ],
  [
    "ee80",
    "蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
  ],
  [
    "eeef",
    "ⅰ",
    9,
    "￢￤＇＂"
  ],
  [
    "f040",
    "",
    62
  ],
  [
    "f080",
    "",
    124
  ],
  [
    "f140",
    "",
    62
  ],
  [
    "f180",
    "",
    124
  ],
  [
    "f240",
    "",
    62
  ],
  [
    "f280",
    "",
    124
  ],
  [
    "f340",
    "",
    62
  ],
  [
    "f380",
    "",
    124
  ],
  [
    "f440",
    "",
    62
  ],
  [
    "f480",
    "",
    124
  ],
  [
    "f540",
    "",
    62
  ],
  [
    "f580",
    "",
    124
  ],
  [
    "f640",
    "",
    62
  ],
  [
    "f680",
    "",
    124
  ],
  [
    "f740",
    "",
    62
  ],
  [
    "f780",
    "",
    124
  ],
  [
    "f840",
    "",
    62
  ],
  [
    "f880",
    "",
    124
  ],
  [
    "f940",
    ""
  ],
  [
    "fa40",
    "ⅰ",
    9,
    "Ⅰ",
    9,
    "￢￤＇＂㈱№℡∵纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊"
  ],
  [
    "fa80",
    "兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯"
  ],
  [
    "fb40",
    "涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神"
  ],
  [
    "fb80",
    "祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙"
  ],
  [
    "fc40",
    "髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
  ]
], Sc = [
  [
    "0",
    "\0",
    127
  ],
  [
    "8ea1",
    "｡",
    62
  ],
  [
    "a1a1",
    "　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈",
    9,
    "＋－±×÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇"
  ],
  [
    "a2a1",
    "◆□■△▲▽▼※〒→←↑↓〓"
  ],
  [
    "a2ba",
    "∈∋⊆⊇⊂⊃∪∩"
  ],
  [
    "a2ca",
    "∧∨￢⇒⇔∀∃"
  ],
  [
    "a2dc",
    "∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬"
  ],
  [
    "a2f2",
    "Å‰♯♭♪†‡¶"
  ],
  [
    "a2fe",
    "◯"
  ],
  [
    "a3b0",
    "０",
    9
  ],
  [
    "a3c1",
    "Ａ",
    25
  ],
  [
    "a3e1",
    "ａ",
    25
  ],
  [
    "a4a1",
    "ぁ",
    82
  ],
  [
    "a5a1",
    "ァ",
    85
  ],
  [
    "a6a1",
    "Α",
    16,
    "Σ",
    6
  ],
  [
    "a6c1",
    "α",
    16,
    "σ",
    6
  ],
  [
    "a7a1",
    "А",
    5,
    "ЁЖ",
    25
  ],
  [
    "a7d1",
    "а",
    5,
    "ёж",
    25
  ],
  [
    "a8a1",
    "─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂"
  ],
  [
    "ada1",
    "①",
    19,
    "Ⅰ",
    9
  ],
  [
    "adc0",
    "㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡"
  ],
  [
    "addf",
    "㍻〝〟№㏍℡㊤",
    4,
    "㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪"
  ],
  [
    "b0a1",
    "亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭"
  ],
  [
    "b1a1",
    "院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応"
  ],
  [
    "b2a1",
    "押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改"
  ],
  [
    "b3a1",
    "魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱"
  ],
  [
    "b4a1",
    "粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄"
  ],
  [
    "b5a1",
    "機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京"
  ],
  [
    "b6a1",
    "供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈"
  ],
  [
    "b7a1",
    "掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲"
  ],
  [
    "b8a1",
    "検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向"
  ],
  [
    "b9a1",
    "后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込"
  ],
  [
    "baa1",
    "此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷"
  ],
  [
    "bba1",
    "察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時"
  ],
  [
    "bca1",
    "次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周"
  ],
  [
    "bda1",
    "宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償"
  ],
  [
    "bea1",
    "勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾"
  ],
  [
    "bfa1",
    "拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾"
  ],
  [
    "c0a1",
    "澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線"
  ],
  [
    "c1a1",
    "繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎"
  ],
  [
    "c2a1",
    "臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只"
  ],
  [
    "c3a1",
    "叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵"
  ],
  [
    "c4a1",
    "帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓"
  ],
  [
    "c5a1",
    "邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到"
  ],
  [
    "c6a1",
    "董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入"
  ],
  [
    "c7a1",
    "如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦"
  ],
  [
    "c8a1",
    "函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美"
  ],
  [
    "c9a1",
    "鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服"
  ],
  [
    "caa1",
    "福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋"
  ],
  [
    "cba1",
    "法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満"
  ],
  [
    "cca1",
    "漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒"
  ],
  [
    "cda1",
    "諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃"
  ],
  [
    "cea1",
    "痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯"
  ],
  [
    "cfa1",
    "蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕"
  ],
  [
    "d0a1",
    "弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲"
  ],
  [
    "d1a1",
    "僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨"
  ],
  [
    "d2a1",
    "辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨"
  ],
  [
    "d3a1",
    "咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉"
  ],
  [
    "d4a1",
    "圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩"
  ],
  [
    "d5a1",
    "奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓"
  ],
  [
    "d6a1",
    "屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏"
  ],
  [
    "d7a1",
    "廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚"
  ],
  [
    "d8a1",
    "悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛"
  ],
  [
    "d9a1",
    "戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼"
  ],
  [
    "daa1",
    "據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼"
  ],
  [
    "dba1",
    "曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍"
  ],
  [
    "dca1",
    "棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣"
  ],
  [
    "dda1",
    "檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾"
  ],
  [
    "dea1",
    "沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌"
  ],
  [
    "dfa1",
    "漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼"
  ],
  [
    "e0a1",
    "燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱"
  ],
  [
    "e1a1",
    "瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰"
  ],
  [
    "e2a1",
    "癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬"
  ],
  [
    "e3a1",
    "磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐"
  ],
  [
    "e4a1",
    "筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆"
  ],
  [
    "e5a1",
    "紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺"
  ],
  [
    "e6a1",
    "罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋"
  ],
  [
    "e7a1",
    "隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙"
  ],
  [
    "e8a1",
    "茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈"
  ],
  [
    "e9a1",
    "蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙"
  ],
  [
    "eaa1",
    "蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞"
  ],
  [
    "eba1",
    "襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫"
  ],
  [
    "eca1",
    "譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊"
  ],
  [
    "eda1",
    "蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸"
  ],
  [
    "eea1",
    "遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮"
  ],
  [
    "efa1",
    "錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞"
  ],
  [
    "f0a1",
    "陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰"
  ],
  [
    "f1a1",
    "顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷"
  ],
  [
    "f2a1",
    "髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈"
  ],
  [
    "f3a1",
    "鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠"
  ],
  [
    "f4a1",
    "堯槇遙瑤凜熙"
  ],
  [
    "f9a1",
    "纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德"
  ],
  [
    "faa1",
    "忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱"
  ],
  [
    "fba1",
    "犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚"
  ],
  [
    "fca1",
    "釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
  ],
  [
    "fcf1",
    "ⅰ",
    9,
    "￢￤＇＂"
  ],
  [
    "8fa2af",
    "˘ˇ¸˙˝¯˛˚～΄΅"
  ],
  [
    "8fa2c2",
    "¡¦¿"
  ],
  [
    "8fa2eb",
    "ºª©®™¤№"
  ],
  [
    "8fa6e1",
    "ΆΈΉΊΪ"
  ],
  [
    "8fa6e7",
    "Ό"
  ],
  [
    "8fa6e9",
    "ΎΫ"
  ],
  [
    "8fa6ec",
    "Ώ"
  ],
  [
    "8fa6f1",
    "άέήίϊΐόςύϋΰώ"
  ],
  [
    "8fa7c2",
    "Ђ",
    10,
    "ЎЏ"
  ],
  [
    "8fa7f2",
    "ђ",
    10,
    "ўџ"
  ],
  [
    "8fa9a1",
    "ÆĐ"
  ],
  [
    "8fa9a4",
    "Ħ"
  ],
  [
    "8fa9a6",
    "Ĳ"
  ],
  [
    "8fa9a8",
    "ŁĿ"
  ],
  [
    "8fa9ab",
    "ŊØŒ"
  ],
  [
    "8fa9af",
    "ŦÞ"
  ],
  [
    "8fa9c1",
    "æđðħıĳĸłŀŉŋøœßŧþ"
  ],
  [
    "8faaa1",
    "ÁÀÄÂĂǍĀĄÅÃĆĈČÇĊĎÉÈËÊĚĖĒĘ"
  ],
  [
    "8faaba",
    "ĜĞĢĠĤÍÌÏÎǏİĪĮĨĴĶĹĽĻŃŇŅÑÓÒÖÔǑŐŌÕŔŘŖŚŜŠŞŤŢÚÙÜÛŬǓŰŪŲŮŨǗǛǙǕŴÝŸŶŹŽŻ"
  ],
  [
    "8faba1",
    "áàäâăǎāąåãćĉčçċďéèëêěėēęǵĝğ"
  ],
  [
    "8fabbd",
    "ġĥíìïîǐ"
  ],
  [
    "8fabc5",
    "īįĩĵķĺľļńňņñóòöôǒőōõŕřŗśŝšşťţúùüûŭǔűūųůũǘǜǚǖŵýÿŷźžż"
  ],
  [
    "8fb0a1",
    "丂丄丅丌丒丟丣两丨丫丮丯丰丵乀乁乄乇乑乚乜乣乨乩乴乵乹乿亍亖亗亝亯亹仃仐仚仛仠仡仢仨仯仱仳仵份仾仿伀伂伃伈伋伌伒伕伖众伙伮伱你伳伵伷伹伻伾佀佂佈佉佋佌佒佔佖佘佟佣佪佬佮佱佷佸佹佺佽佾侁侂侄"
  ],
  [
    "8fb1a1",
    "侅侉侊侌侎侐侒侓侔侗侙侚侞侟侲侷侹侻侼侽侾俀俁俅俆俈俉俋俌俍俏俒俜俠俢俰俲俼俽俿倀倁倄倇倊倌倎倐倓倗倘倛倜倝倞倢倧倮倰倲倳倵偀偁偂偅偆偊偌偎偑偒偓偗偙偟偠偢偣偦偧偪偭偰偱倻傁傃傄傆傊傎傏傐"
  ],
  [
    "8fb2a1",
    "傒傓傔傖傛傜傞",
    4,
    "傪傯傰傹傺傽僀僃僄僇僌僎僐僓僔僘僜僝僟僢僤僦僨僩僯僱僶僺僾儃儆儇儈儋儌儍儎僲儐儗儙儛儜儝儞儣儧儨儬儭儯儱儳儴儵儸儹兂兊兏兓兕兗兘兟兤兦兾冃冄冋冎冘冝冡冣冭冸冺冼冾冿凂"
  ],
  [
    "8fb3a1",
    "凈减凑凒凓凕凘凞凢凥凮凲凳凴凷刁刂刅划刓刕刖刘刢刨刱刲刵刼剅剉剕剗剘剚剜剟剠剡剦剮剷剸剹劀劂劅劊劌劓劕劖劗劘劚劜劤劥劦劧劯劰劶劷劸劺劻劽勀勄勆勈勌勏勑勔勖勛勜勡勥勨勩勪勬勰勱勴勶勷匀匃匊匋"
  ],
  [
    "8fb4a1",
    "匌匑匓匘匛匜匞匟匥匧匨匩匫匬匭匰匲匵匼匽匾卂卌卋卙卛卡卣卥卬卭卲卹卾厃厇厈厎厓厔厙厝厡厤厪厫厯厲厴厵厷厸厺厽叀叅叏叒叓叕叚叝叞叠另叧叵吂吓吚吡吧吨吪启吱吴吵呃呄呇呍呏呞呢呤呦呧呩呫呭呮呴呿"
  ],
  [
    "8fb5a1",
    "咁咃咅咈咉咍咑咕咖咜咟咡咦咧咩咪咭咮咱咷咹咺咻咿哆哊响哎哠哪哬哯哶哼哾哿唀唁唅唈唉唌唍唎唕唪唫唲唵唶唻唼唽啁啇啉啊啍啐啑啘啚啛啞啠啡啤啦啿喁喂喆喈喎喏喑喒喓喔喗喣喤喭喲喿嗁嗃嗆嗉嗋嗌嗎嗑嗒"
  ],
  [
    "8fb6a1",
    "嗓嗗嗘嗛嗞嗢嗩嗶嗿嘅嘈嘊嘍",
    5,
    "嘙嘬嘰嘳嘵嘷嘹嘻嘼嘽嘿噀噁噃噄噆噉噋噍噏噔噞噠噡噢噣噦噩噭噯噱噲噵嚄嚅嚈嚋嚌嚕嚙嚚嚝嚞嚟嚦嚧嚨嚩嚫嚬嚭嚱嚳嚷嚾囅囉囊囋囏囐囌囍囙囜囝囟囡囤",
    4,
    "囱囫园"
  ],
  [
    "8fb7a1",
    "囶囷圁圂圇圊圌圑圕圚圛圝圠圢圣圤圥圩圪圬圮圯圳圴圽圾圿坅坆坌坍坒坢坥坧坨坫坭",
    4,
    "坳坴坵坷坹坺坻坼坾垁垃垌垔垗垙垚垜垝垞垟垡垕垧垨垩垬垸垽埇埈埌埏埕埝埞埤埦埧埩埭埰埵埶埸埽埾埿堃堄堈堉埡"
  ],
  [
    "8fb8a1",
    "堌堍堛堞堟堠堦堧堭堲堹堿塉塌塍塏塐塕塟塡塤塧塨塸塼塿墀墁墇墈墉墊墌墍墏墐墔墖墝墠墡墢墦墩墱墲壄墼壂壈壍壎壐壒壔壖壚壝壡壢壩壳夅夆夋夌夒夓夔虁夝夡夣夤夨夯夰夳夵夶夿奃奆奒奓奙奛奝奞奟奡奣奫奭"
  ],
  [
    "8fb9a1",
    "奯奲奵奶她奻奼妋妌妎妒妕妗妟妤妧妭妮妯妰妳妷妺妼姁姃姄姈姊姍姒姝姞姟姣姤姧姮姯姱姲姴姷娀娄娌娍娎娒娓娞娣娤娧娨娪娭娰婄婅婇婈婌婐婕婞婣婥婧婭婷婺婻婾媋媐媓媖媙媜媞媟媠媢媧媬媱媲媳媵媸媺媻媿"
  ],
  [
    "8fbaa1",
    "嫄嫆嫈嫏嫚嫜嫠嫥嫪嫮嫵嫶嫽嬀嬁嬈嬗嬴嬙嬛嬝嬡嬥嬭嬸孁孋孌孒孖孞孨孮孯孼孽孾孿宁宄宆宊宎宐宑宓宔宖宨宩宬宭宯宱宲宷宺宼寀寁寍寏寖",
    4,
    "寠寯寱寴寽尌尗尞尟尣尦尩尫尬尮尰尲尵尶屙屚屜屢屣屧屨屩"
  ],
  [
    "8fbba1",
    "屭屰屴屵屺屻屼屽岇岈岊岏岒岝岟岠岢岣岦岪岲岴岵岺峉峋峒峝峗峮峱峲峴崁崆崍崒崫崣崤崦崧崱崴崹崽崿嵂嵃嵆嵈嵕嵑嵙嵊嵟嵠嵡嵢嵤嵪嵭嵰嵹嵺嵾嵿嶁嶃嶈嶊嶒嶓嶔嶕嶙嶛嶟嶠嶧嶫嶰嶴嶸嶹巃巇巋巐巎巘巙巠巤"
  ],
  [
    "8fbca1",
    "巩巸巹帀帇帍帒帔帕帘帟帠帮帨帲帵帾幋幐幉幑幖幘幛幜幞幨幪",
    4,
    "幰庀庋庎庢庤庥庨庪庬庱庳庽庾庿廆廌廋廎廑廒廔廕廜廞廥廫异弆弇弈弎弙弜弝弡弢弣弤弨弫弬弮弰弴弶弻弽弿彀彄彅彇彍彐彔彘彛彠彣彤彧"
  ],
  [
    "8fbda1",
    "彯彲彴彵彸彺彽彾徉徍徏徖徜徝徢徧徫徤徬徯徰徱徸忄忇忈忉忋忐",
    4,
    "忞忡忢忨忩忪忬忭忮忯忲忳忶忺忼怇怊怍怓怔怗怘怚怟怤怭怳怵恀恇恈恉恌恑恔恖恗恝恡恧恱恾恿悂悆悈悊悎悑悓悕悘悝悞悢悤悥您悰悱悷"
  ],
  [
    "8fbea1",
    "悻悾惂惄惈惉惊惋惎惏惔惕惙惛惝惞惢惥惲惵惸惼惽愂愇愊愌愐",
    4,
    "愖愗愙愜愞愢愪愫愰愱愵愶愷愹慁慅慆慉慞慠慬慲慸慻慼慿憀憁憃憄憋憍憒憓憗憘憜憝憟憠憥憨憪憭憸憹憼懀懁懂懎懏懕懜懝懞懟懡懢懧懩懥"
  ],
  [
    "8fbfa1",
    "懬懭懯戁戃戄戇戓戕戜戠戢戣戧戩戫戹戽扂扃扄扆扌扐扑扒扔扖扚扜扤扭扯扳扺扽抍抎抏抐抦抨抳抶抷抺抾抿拄拎拕拖拚拪拲拴拼拽挃挄挊挋挍挐挓挖挘挩挪挭挵挶挹挼捁捂捃捄捆捊捋捎捒捓捔捘捛捥捦捬捭捱捴捵"
  ],
  [
    "8fc0a1",
    "捸捼捽捿掂掄掇掊掐掔掕掙掚掞掤掦掭掮掯掽揁揅揈揎揑揓揔揕揜揠揥揪揬揲揳揵揸揹搉搊搐搒搔搘搞搠搢搤搥搩搪搯搰搵搽搿摋摏摑摒摓摔摚摛摜摝摟摠摡摣摭摳摴摻摽撅撇撏撐撑撘撙撛撝撟撡撣撦撨撬撳撽撾撿"
  ],
  [
    "8fc1a1",
    "擄擉擊擋擌擎擐擑擕擗擤擥擩擪擭擰擵擷擻擿攁攄攈攉攊攏攓攔攖攙攛攞攟攢攦攩攮攱攺攼攽敃敇敉敐敒敔敟敠敧敫敺敽斁斅斊斒斕斘斝斠斣斦斮斲斳斴斿旂旈旉旎旐旔旖旘旟旰旲旴旵旹旾旿昀昄昈昉昍昑昒昕昖昝"
  ],
  [
    "8fc2a1",
    "昞昡昢昣昤昦昩昪昫昬昮昰昱昳昹昷晀晅晆晊晌晑晎晗晘晙晛晜晠晡曻晪晫晬晾晳晵晿晷晸晹晻暀晼暋暌暍暐暒暙暚暛暜暟暠暤暭暱暲暵暻暿曀曂曃曈曌曎曏曔曛曟曨曫曬曮曺朅朇朎朓朙朜朠朢朳朾杅杇杈杌杔杕杝"
  ],
  [
    "8fc3a1",
    "杦杬杮杴杶杻极构枎枏枑枓枖枘枙枛枰枱枲枵枻枼枽柹柀柂柃柅柈柉柒柗柙柜柡柦柰柲柶柷桒栔栙栝栟栨栧栬栭栯栰栱栳栻栿桄桅桊桌桕桗桘桛桫桮",
    4,
    "桵桹桺桻桼梂梄梆梈梖梘梚梜梡梣梥梩梪梮梲梻棅棈棌棏"
  ],
  [
    "8fc4a1",
    "棐棑棓棖棙棜棝棥棨棪棫棬棭棰棱棵棶棻棼棽椆椉椊椐椑椓椖椗椱椳椵椸椻楂楅楉楎楗楛楣楤楥楦楨楩楬楰楱楲楺楻楿榀榍榒榖榘榡榥榦榨榫榭榯榷榸榺榼槅槈槑槖槗槢槥槮槯槱槳槵槾樀樁樃樏樑樕樚樝樠樤樨樰樲"
  ],
  [
    "8fc5a1",
    "樴樷樻樾樿橅橆橉橊橎橐橑橒橕橖橛橤橧橪橱橳橾檁檃檆檇檉檋檑檛檝檞檟檥檫檯檰檱檴檽檾檿櫆櫉櫈櫌櫐櫔櫕櫖櫜櫝櫤櫧櫬櫰櫱櫲櫼櫽欂欃欆欇欉欏欐欑欗欛欞欤欨欫欬欯欵欶欻欿歆歊歍歒歖歘歝歠歧歫歮歰歵歽"
  ],
  [
    "8fc6a1",
    "歾殂殅殗殛殟殠殢殣殨殩殬殭殮殰殸殹殽殾毃毄毉毌毖毚毡毣毦毧毮毱毷毹毿氂氄氅氉氍氎氐氒氙氟氦氧氨氬氮氳氵氶氺氻氿汊汋汍汏汒汔汙汛汜汫汭汯汴汶汸汹汻沅沆沇沉沔沕沗沘沜沟沰沲沴泂泆泍泏泐泑泒泔泖"
  ],
  [
    "8fc7a1",
    "泚泜泠泧泩泫泬泮泲泴洄洇洊洎洏洑洓洚洦洧洨汧洮洯洱洹洼洿浗浞浟浡浥浧浯浰浼涂涇涑涒涔涖涗涘涪涬涴涷涹涽涿淄淈淊淎淏淖淛淝淟淠淢淥淩淯淰淴淶淼渀渄渞渢渧渲渶渹渻渼湄湅湈湉湋湏湑湒湓湔湗湜湝湞"
  ],
  [
    "8fc8a1",
    "湢湣湨湳湻湽溍溓溙溠溧溭溮溱溳溻溿滀滁滃滇滈滊滍滎滏滫滭滮滹滻滽漄漈漊漌漍漖漘漚漛漦漩漪漯漰漳漶漻漼漭潏潑潒潓潗潙潚潝潞潡潢潨潬潽潾澃澇澈澋澌澍澐澒澓澔澖澚澟澠澥澦澧澨澮澯澰澵澶澼濅濇濈濊"
  ],
  [
    "8fc9a1",
    "濚濞濨濩濰濵濹濼濽瀀瀅瀆瀇瀍瀗瀠瀣瀯瀴瀷瀹瀼灃灄灈灉灊灋灔灕灝灞灎灤灥灬灮灵灶灾炁炅炆炔",
    4,
    "炛炤炫炰炱炴炷烊烑烓烔烕烖烘烜烤烺焃",
    4,
    "焋焌焏焞焠焫焭焯焰焱焸煁煅煆煇煊煋煐煒煗煚煜煞煠"
  ],
  [
    "8fcaa1",
    "煨煹熀熅熇熌熒熚熛熠熢熯熰熲熳熺熿燀燁燄燋燌燓燖燙燚燜燸燾爀爇爈爉爓爗爚爝爟爤爫爯爴爸爹牁牂牃牅牎牏牐牓牕牖牚牜牞牠牣牨牫牮牯牱牷牸牻牼牿犄犉犍犎犓犛犨犭犮犱犴犾狁狇狉狌狕狖狘狟狥狳狴狺狻"
  ],
  [
    "8fcba1",
    "狾猂猄猅猇猋猍猒猓猘猙猞猢猤猧猨猬猱猲猵猺猻猽獃獍獐獒獖獘獝獞獟獠獦獧獩獫獬獮獯獱獷獹獼玀玁玃玅玆玎玐玓玕玗玘玜玞玟玠玢玥玦玪玫玭玵玷玹玼玽玿珅珆珉珋珌珏珒珓珖珙珝珡珣珦珧珩珴珵珷珹珺珻珽"
  ],
  [
    "8fcca1",
    "珿琀琁琄琇琊琑琚琛琤琦琨",
    9,
    "琹瑀瑃瑄瑆瑇瑋瑍瑑瑒瑗瑝瑢瑦瑧瑨瑫瑭瑮瑱瑲璀璁璅璆璇璉璏璐璑璒璘璙璚璜璟璠璡璣璦璨璩璪璫璮璯璱璲璵璹璻璿瓈瓉瓌瓐瓓瓘瓚瓛瓞瓟瓤瓨瓪瓫瓯瓴瓺瓻瓼瓿甆"
  ],
  [
    "8fcda1",
    "甒甖甗甠甡甤甧甩甪甯甶甹甽甾甿畀畃畇畈畎畐畒畗畞畟畡畯畱畹",
    5,
    "疁疅疐疒疓疕疙疜疢疤疴疺疿痀痁痄痆痌痎痏痗痜痟痠痡痤痧痬痮痯痱痹瘀瘂瘃瘄瘇瘈瘊瘌瘏瘒瘓瘕瘖瘙瘛瘜瘝瘞瘣瘥瘦瘩瘭瘲瘳瘵瘸瘹"
  ],
  [
    "8fcea1",
    "瘺瘼癊癀癁癃癄癅癉癋癕癙癟癤癥癭癮癯癱癴皁皅皌皍皕皛皜皝皟皠皢",
    6,
    "皪皭皽盁盅盉盋盌盎盔盙盠盦盨盬盰盱盶盹盼眀眆眊眎眒眔眕眗眙眚眜眢眨眭眮眯眴眵眶眹眽眾睂睅睆睊睍睎睏睒睖睗睜睞睟睠睢"
  ],
  [
    "8fcfa1",
    "睤睧睪睬睰睲睳睴睺睽瞀瞄瞌瞍瞔瞕瞖瞚瞟瞢瞧瞪瞮瞯瞱瞵瞾矃矉矑矒矕矙矞矟矠矤矦矪矬矰矱矴矸矻砅砆砉砍砎砑砝砡砢砣砭砮砰砵砷硃硄硇硈硌硎硒硜硞硠硡硣硤硨硪确硺硾碊碏碔碘碡碝碞碟碤碨碬碭碰碱碲碳"
  ],
  [
    "8fd0a1",
    "碻碽碿磇磈磉磌磎磒磓磕磖磤磛磟磠磡磦磪磲磳礀磶磷磺磻磿礆礌礐礚礜礞礟礠礥礧礩礭礱礴礵礻礽礿祄祅祆祊祋祏祑祔祘祛祜祧祩祫祲祹祻祼祾禋禌禑禓禔禕禖禘禛禜禡禨禩禫禯禱禴禸离秂秄秇秈秊秏秔秖秚秝秞"
  ],
  [
    "8fd1a1",
    "秠秢秥秪秫秭秱秸秼稂稃稇稉稊稌稑稕稛稞稡稧稫稭稯稰稴稵稸稹稺穄穅穇穈穌穕穖穙穜穝穟穠穥穧穪穭穵穸穾窀窂窅窆窊窋窐窑窔窞窠窣窬窳窵窹窻窼竆竉竌竎竑竛竨竩竫竬竱竴竻竽竾笇笔笟笣笧笩笪笫笭笮笯笰"
  ],
  [
    "8fd2a1",
    "笱笴笽笿筀筁筇筎筕筠筤筦筩筪筭筯筲筳筷箄箉箎箐箑箖箛箞箠箥箬箯箰箲箵箶箺箻箼箽篂篅篈篊篔篖篗篙篚篛篨篪篲篴篵篸篹篺篼篾簁簂簃簄簆簉簋簌簎簏簙簛簠簥簦簨簬簱簳簴簶簹簺籆籊籕籑籒籓籙",
    5
  ],
  [
    "8fd3a1",
    "籡籣籧籩籭籮籰籲籹籼籽粆粇粏粔粞粠粦粰粶粷粺粻粼粿糄糇糈糉糍糏糓糔糕糗糙糚糝糦糩糫糵紃紇紈紉紏紑紒紓紖紝紞紣紦紪紭紱紼紽紾絀絁絇絈絍絑絓絗絙絚絜絝絥絧絪絰絸絺絻絿綁綂綃綅綆綈綋綌綍綑綖綗綝"
  ],
  [
    "8fd4a1",
    "綞綦綧綪綳綶綷綹緂",
    4,
    "緌緍緎緗緙縀緢緥緦緪緫緭緱緵緶緹緺縈縐縑縕縗縜縝縠縧縨縬縭縯縳縶縿繄繅繇繎繐繒繘繟繡繢繥繫繮繯繳繸繾纁纆纇纊纍纑纕纘纚纝纞缼缻缽缾缿罃罄罇罏罒罓罛罜罝罡罣罤罥罦罭"
  ],
  [
    "8fd5a1",
    "罱罽罾罿羀羋羍羏羐羑羖羗羜羡羢羦羪羭羴羼羿翀翃翈翎翏翛翟翣翥翨翬翮翯翲翺翽翾翿耇耈耊耍耎耏耑耓耔耖耝耞耟耠耤耦耬耮耰耴耵耷耹耺耼耾聀聄聠聤聦聭聱聵肁肈肎肜肞肦肧肫肸肹胈胍胏胒胔胕胗胘胠胭胮"
  ],
  [
    "8fd6a1",
    "胰胲胳胶胹胺胾脃脋脖脗脘脜脞脠脤脧脬脰脵脺脼腅腇腊腌腒腗腠腡腧腨腩腭腯腷膁膐膄膅膆膋膎膖膘膛膞膢膮膲膴膻臋臃臅臊臎臏臕臗臛臝臞臡臤臫臬臰臱臲臵臶臸臹臽臿舀舃舏舓舔舙舚舝舡舢舨舲舴舺艃艄艅艆"
  ],
  [
    "8fd7a1",
    "艋艎艏艑艖艜艠艣艧艭艴艻艽艿芀芁芃芄芇芉芊芎芑芔芖芘芚芛芠芡芣芤芧芨芩芪芮芰芲芴芷芺芼芾芿苆苐苕苚苠苢苤苨苪苭苯苶苷苽苾茀茁茇茈茊茋荔茛茝茞茟茡茢茬茭茮茰茳茷茺茼茽荂荃荄荇荍荎荑荕荖荗荰荸"
  ],
  [
    "8fd8a1",
    "荽荿莀莂莄莆莍莒莔莕莘莙莛莜莝莦莧莩莬莾莿菀菇菉菏菐菑菔菝荓菨菪菶菸菹菼萁萆萊萏萑萕萙莭萯萹葅葇葈葊葍葏葑葒葖葘葙葚葜葠葤葥葧葪葰葳葴葶葸葼葽蒁蒅蒒蒓蒕蒞蒦蒨蒩蒪蒯蒱蒴蒺蒽蒾蓀蓂蓇蓈蓌蓏蓓"
  ],
  [
    "8fd9a1",
    "蓜蓧蓪蓯蓰蓱蓲蓷蔲蓺蓻蓽蔂蔃蔇蔌蔎蔐蔜蔞蔢蔣蔤蔥蔧蔪蔫蔯蔳蔴蔶蔿蕆蕏",
    4,
    "蕖蕙蕜",
    6,
    "蕤蕫蕯蕹蕺蕻蕽蕿薁薅薆薉薋薌薏薓薘薝薟薠薢薥薧薴薶薷薸薼薽薾薿藂藇藊藋藎薭藘藚藟藠藦藨藭藳藶藼"
  ],
  [
    "8fdaa1",
    "藿蘀蘄蘅蘍蘎蘐蘑蘒蘘蘙蘛蘞蘡蘧蘩蘶蘸蘺蘼蘽虀虂虆虒虓虖虗虘虙虝虠",
    4,
    "虩虬虯虵虶虷虺蚍蚑蚖蚘蚚蚜蚡蚦蚧蚨蚭蚱蚳蚴蚵蚷蚸蚹蚿蛀蛁蛃蛅蛑蛒蛕蛗蛚蛜蛠蛣蛥蛧蚈蛺蛼蛽蜄蜅蜇蜋蜎蜏蜐蜓蜔蜙蜞蜟蜡蜣"
  ],
  [
    "8fdba1",
    "蜨蜮蜯蜱蜲蜹蜺蜼蜽蜾蝀蝃蝅蝍蝘蝝蝡蝤蝥蝯蝱蝲蝻螃",
    6,
    "螋螌螐螓螕螗螘螙螞螠螣螧螬螭螮螱螵螾螿蟁蟈蟉蟊蟎蟕蟖蟙蟚蟜蟟蟢蟣蟤蟪蟫蟭蟱蟳蟸蟺蟿蠁蠃蠆蠉蠊蠋蠐蠙蠒蠓蠔蠘蠚蠛蠜蠞蠟蠨蠭蠮蠰蠲蠵"
  ],
  [
    "8fdca1",
    "蠺蠼衁衃衅衈衉衊衋衎衑衕衖衘衚衜衟衠衤衩衱衹衻袀袘袚袛袜袟袠袨袪袺袽袾裀裊",
    4,
    "裑裒裓裛裞裧裯裰裱裵裷褁褆褍褎褏褕褖褘褙褚褜褠褦褧褨褰褱褲褵褹褺褾襀襂襅襆襉襏襒襗襚襛襜襡襢襣襫襮襰襳襵襺"
  ],
  [
    "8fdda1",
    "襻襼襽覉覍覐覔覕覛覜覟覠覥覰覴覵覶覷覼觔",
    4,
    "觥觩觫觭觱觳觶觹觽觿訄訅訇訏訑訒訔訕訞訠訢訤訦訫訬訯訵訷訽訾詀詃詅詇詉詍詎詓詖詗詘詜詝詡詥詧詵詶詷詹詺詻詾詿誀誃誆誋誏誐誒誖誗誙誟誧誩誮誯誳"
  ],
  [
    "8fdea1",
    "誶誷誻誾諃諆諈諉諊諑諓諔諕諗諝諟諬諰諴諵諶諼諿謅謆謋謑謜謞謟謊謭謰謷謼譂",
    4,
    "譈譒譓譔譙譍譞譣譭譶譸譹譼譾讁讄讅讋讍讏讔讕讜讞讟谸谹谽谾豅豇豉豋豏豑豓豔豗豘豛豝豙豣豤豦豨豩豭豳豵豶豻豾貆"
  ],
  [
    "8fdfa1",
    "貇貋貐貒貓貙貛貜貤貹貺賅賆賉賋賏賖賕賙賝賡賨賬賯賰賲賵賷賸賾賿贁贃贉贒贗贛赥赩赬赮赿趂趄趈趍趐趑趕趞趟趠趦趫趬趯趲趵趷趹趻跀跅跆跇跈跊跎跑跔跕跗跙跤跥跧跬跰趼跱跲跴跽踁踄踅踆踋踑踔踖踠踡踢"
  ],
  [
    "8fe0a1",
    "踣踦踧踱踳踶踷踸踹踽蹀蹁蹋蹍蹎蹏蹔蹛蹜蹝蹞蹡蹢蹩蹬蹭蹯蹰蹱蹹蹺蹻躂躃躉躐躒躕躚躛躝躞躢躧躩躭躮躳躵躺躻軀軁軃軄軇軏軑軔軜軨軮軰軱軷軹軺軭輀輂輇輈輏輐輖輗輘輞輠輡輣輥輧輨輬輭輮輴輵輶輷輺轀轁"
  ],
  [
    "8fe1a1",
    "轃轇轏轑",
    4,
    "轘轝轞轥辝辠辡辤辥辦辵辶辸达迀迁迆迊迋迍运迒迓迕迠迣迤迨迮迱迵迶迻迾适逄逈逌逘逛逨逩逯逪逬逭逳逴逷逿遃遄遌遛遝遢遦遧遬遰遴遹邅邈邋邌邎邐邕邗邘邙邛邠邡邢邥邰邲邳邴邶邽郌邾郃"
  ],
  [
    "8fe2a1",
    "郄郅郇郈郕郗郘郙郜郝郟郥郒郶郫郯郰郴郾郿鄀鄄鄅鄆鄈鄍鄐鄔鄖鄗鄘鄚鄜鄞鄠鄥鄢鄣鄧鄩鄮鄯鄱鄴鄶鄷鄹鄺鄼鄽酃酇酈酏酓酗酙酚酛酡酤酧酭酴酹酺酻醁醃醅醆醊醎醑醓醔醕醘醞醡醦醨醬醭醮醰醱醲醳醶醻醼醽醿"
  ],
  [
    "8fe3a1",
    "釂釃釅釓釔釗釙釚釞釤釥釩釪釬",
    5,
    "釷釹釻釽鈀鈁鈄鈅鈆鈇鈉鈊鈌鈐鈒鈓鈖鈘鈜鈝鈣鈤鈥鈦鈨鈮鈯鈰鈳鈵鈶鈸鈹鈺鈼鈾鉀鉂鉃鉆鉇鉊鉍鉎鉏鉑鉘鉙鉜鉝鉠鉡鉥鉧鉨鉩鉮鉯鉰鉵",
    4,
    "鉻鉼鉽鉿銈銉銊銍銎銒銗"
  ],
  [
    "8fe4a1",
    "銙銟銠銤銥銧銨銫銯銲銶銸銺銻銼銽銿",
    4,
    "鋅鋆鋇鋈鋋鋌鋍鋎鋐鋓鋕鋗鋘鋙鋜鋝鋟鋠鋡鋣鋥鋧鋨鋬鋮鋰鋹鋻鋿錀錂錈錍錑錔錕錜錝錞錟錡錤錥錧錩錪錳錴錶錷鍇鍈鍉鍐鍑鍒鍕鍗鍘鍚鍞鍤鍥鍧鍩鍪鍭鍯鍰鍱鍳鍴鍶"
  ],
  [
    "8fe5a1",
    "鍺鍽鍿鎀鎁鎂鎈鎊鎋鎍鎏鎒鎕鎘鎛鎞鎡鎣鎤鎦鎨鎫鎴鎵鎶鎺鎩鏁鏄鏅鏆鏇鏉",
    4,
    "鏓鏙鏜鏞鏟鏢鏦鏧鏹鏷鏸鏺鏻鏽鐁鐂鐄鐈鐉鐍鐎鐏鐕鐖鐗鐟鐮鐯鐱鐲鐳鐴鐻鐿鐽鑃鑅鑈鑊鑌鑕鑙鑜鑟鑡鑣鑨鑫鑭鑮鑯鑱鑲钄钃镸镹"
  ],
  [
    "8fe6a1",
    "镾閄閈閌閍閎閝閞閟閡閦閩閫閬閴閶閺閽閿闆闈闉闋闐闑闒闓闙闚闝闞闟闠闤闦阝阞阢阤阥阦阬阱阳阷阸阹阺阼阽陁陒陔陖陗陘陡陮陴陻陼陾陿隁隂隃隄隉隑隖隚隝隟隤隥隦隩隮隯隳隺雊雒嶲雘雚雝雞雟雩雯雱雺霂"
  ],
  [
    "8fe7a1",
    "霃霅霉霚霛霝霡霢霣霨霱霳靁靃靊靎靏靕靗靘靚靛靣靧靪靮靳靶靷靸靻靽靿鞀鞉鞕鞖鞗鞙鞚鞞鞟鞢鞬鞮鞱鞲鞵鞶鞸鞹鞺鞼鞾鞿韁韄韅韇韉韊韌韍韎韐韑韔韗韘韙韝韞韠韛韡韤韯韱韴韷韸韺頇頊頙頍頎頔頖頜頞頠頣頦"
  ],
  [
    "8fe8a1",
    "頫頮頯頰頲頳頵頥頾顄顇顊顑顒顓顖顗顙顚顢顣顥顦顪顬颫颭颮颰颴颷颸颺颻颿飂飅飈飌飡飣飥飦飧飪飳飶餂餇餈餑餕餖餗餚餛餜餟餢餦餧餫餱",
    4,
    "餹餺餻餼饀饁饆饇饈饍饎饔饘饙饛饜饞饟饠馛馝馟馦馰馱馲馵"
  ],
  [
    "8fe9a1",
    "馹馺馽馿駃駉駓駔駙駚駜駞駧駪駫駬駰駴駵駹駽駾騂騃騄騋騌騐騑騖騞騠騢騣騤騧騭騮騳騵騶騸驇驁驄驊驋驌驎驑驔驖驝骪骬骮骯骲骴骵骶骹骻骾骿髁髃髆髈髎髐髒髕髖髗髛髜髠髤髥髧髩髬髲髳髵髹髺髽髿",
    4
  ],
  [
    "8feaa1",
    "鬄鬅鬈鬉鬋鬌鬍鬎鬐鬒鬖鬙鬛鬜鬠鬦鬫鬭鬳鬴鬵鬷鬹鬺鬽魈魋魌魕魖魗魛魞魡魣魥魦魨魪",
    4,
    "魳魵魷魸魹魿鮀鮄鮅鮆鮇鮉鮊鮋鮍鮏鮐鮔鮚鮝鮞鮦鮧鮩鮬鮰鮱鮲鮷鮸鮻鮼鮾鮿鯁鯇鯈鯎鯐鯗鯘鯝鯟鯥鯧鯪鯫鯯鯳鯷鯸"
  ],
  [
    "8feba1",
    "鯹鯺鯽鯿鰀鰂鰋鰏鰑鰖鰘鰙鰚鰜鰞鰢鰣鰦",
    4,
    "鰱鰵鰶鰷鰽鱁鱃鱄鱅鱉鱊鱎鱏鱐鱓鱔鱖鱘鱛鱝鱞鱟鱣鱩鱪鱜鱫鱨鱮鱰鱲鱵鱷鱻鳦鳲鳷鳹鴋鴂鴑鴗鴘鴜鴝鴞鴯鴰鴲鴳鴴鴺鴼鵅鴽鵂鵃鵇鵊鵓鵔鵟鵣鵢鵥鵩鵪鵫鵰鵶鵷鵻"
  ],
  [
    "8feca1",
    "鵼鵾鶃鶄鶆鶊鶍鶎鶒鶓鶕鶖鶗鶘鶡鶪鶬鶮鶱鶵鶹鶼鶿鷃鷇鷉鷊鷔鷕鷖鷗鷚鷞鷟鷠鷥鷧鷩鷫鷮鷰鷳鷴鷾鸊鸂鸇鸎鸐鸑鸒鸕鸖鸙鸜鸝鹺鹻鹼麀麂麃麄麅麇麎麏麖麘麛麞麤麨麬麮麯麰麳麴麵黆黈黋黕黟黤黧黬黭黮黰黱黲黵"
  ],
  [
    "8feda1",
    "黸黿鼂鼃鼉鼏鼐鼑鼒鼔鼖鼗鼙鼚鼛鼟鼢鼦鼪鼫鼯鼱鼲鼴鼷鼹鼺鼼鼽鼿齁齃",
    4,
    "齓齕齖齗齘齚齝齞齨齩齭",
    4,
    "齳齵齺齽龏龐龑龒龔龖龗龞龡龢龣龥"
  ]
], cn = [
  [
    "0",
    "\0",
    127,
    "€"
  ],
  [
    "8140",
    "丂丄丅丆丏丒丗丟丠両丣並丩丮丯丱丳丵丷丼乀乁乂乄乆乊乑乕乗乚乛乢乣乤乥乧乨乪",
    5,
    "乲乴",
    9,
    "乿",
    6,
    "亇亊"
  ],
  [
    "8180",
    "亐亖亗亙亜亝亞亣亪亯亰亱亴亶亷亸亹亼亽亾仈仌仏仐仒仚仛仜仠仢仦仧仩仭仮仯仱仴仸仹仺仼仾伀伂",
    6,
    "伋伌伒",
    4,
    "伜伝伡伣伨伩伬伭伮伱伳伵伷伹伻伾",
    4,
    "佄佅佇",
    5,
    "佒佔佖佡佢佦佨佪佫佭佮佱佲併佷佸佹佺佽侀侁侂侅來侇侊侌侎侐侒侓侕侖侘侙侚侜侞侟価侢"
  ],
  [
    "8240",
    "侤侫侭侰",
    4,
    "侶",
    8,
    "俀俁係俆俇俈俉俋俌俍俒",
    4,
    "俙俛俠俢俤俥俧俫俬俰俲俴俵俶俷俹俻俼俽俿",
    11
  ],
  [
    "8280",
    "個倎倐們倓倕倖倗倛倝倞倠倢倣値倧倫倯",
    10,
    "倻倽倿偀偁偂偄偅偆偉偊偋偍偐",
    4,
    "偖偗偘偙偛偝",
    7,
    "偦",
    5,
    "偭",
    8,
    "偸偹偺偼偽傁傂傃傄傆傇傉傊傋傌傎",
    20,
    "傤傦傪傫傭",
    4,
    "傳",
    6,
    "傼"
  ],
  [
    "8340",
    "傽",
    17,
    "僐",
    5,
    "僗僘僙僛",
    10,
    "僨僩僪僫僯僰僱僲僴僶",
    4,
    "僼",
    9,
    "儈"
  ],
  [
    "8380",
    "儉儊儌",
    5,
    "儓",
    13,
    "儢",
    28,
    "兂兇兊兌兎兏児兒兓兗兘兙兛兝",
    4,
    "兣兤兦內兩兪兯兲兺兾兿冃冄円冇冊冋冎冏冐冑冓冔冘冚冝冞冟冡冣冦",
    4,
    "冭冮冴冸冹冺冾冿凁凂凃凅凈凊凍凎凐凒",
    5
  ],
  [
    "8440",
    "凘凙凚凜凞凟凢凣凥",
    5,
    "凬凮凱凲凴凷凾刄刅刉刋刌刏刐刓刔刕刜刞刟刡刢刣別刦刧刪刬刯刱刲刴刵刼刾剄",
    5,
    "剋剎剏剒剓剕剗剘"
  ],
  [
    "8480",
    "剙剚剛剝剟剠剢剣剤剦剨剫剬剭剮剰剱剳",
    9,
    "剾劀劃",
    4,
    "劉",
    6,
    "劑劒劔",
    6,
    "劜劤劥劦劧劮劯劰労",
    9,
    "勀勁勂勄勅勆勈勊勌勍勎勏勑勓勔動勗務",
    5,
    "勠勡勢勣勥",
    10,
    "勱",
    7,
    "勻勼勽匁匂匃匄匇匉匊匋匌匎"
  ],
  [
    "8540",
    "匑匒匓匔匘匛匜匞匟匢匤匥匧匨匩匫匬匭匯",
    9,
    "匼匽區卂卄卆卋卌卍卐協単卙卛卝卥卨卪卬卭卲卶卹卻卼卽卾厀厁厃厇厈厊厎厏"
  ],
  [
    "8580",
    "厐",
    4,
    "厖厗厙厛厜厞厠厡厤厧厪厫厬厭厯",
    6,
    "厷厸厹厺厼厽厾叀參",
    4,
    "収叏叐叒叓叕叚叜叝叞叡叢叧叴叺叾叿吀吂吅吇吋吔吘吙吚吜吢吤吥吪吰吳吶吷吺吽吿呁呂呄呅呇呉呌呍呎呏呑呚呝",
    4,
    "呣呥呧呩",
    7,
    "呴呹呺呾呿咁咃咅咇咈咉咊咍咑咓咗咘咜咞咟咠咡"
  ],
  [
    "8640",
    "咢咥咮咰咲咵咶咷咹咺咼咾哃哅哊哋哖哘哛哠",
    4,
    "哫哬哯哰哱哴",
    5,
    "哻哾唀唂唃唄唅唈唊",
    4,
    "唒唓唕",
    5,
    "唜唝唞唟唡唥唦"
  ],
  [
    "8680",
    "唨唩唫唭唲唴唵唶唸唹唺唻唽啀啂啅啇啈啋",
    4,
    "啑啒啓啔啗",
    4,
    "啝啞啟啠啢啣啨啩啫啯",
    5,
    "啹啺啽啿喅喆喌喍喎喐喒喓喕喖喗喚喛喞喠",
    6,
    "喨",
    8,
    "喲喴営喸喺喼喿",
    4,
    "嗆嗇嗈嗊嗋嗎嗏嗐嗕嗗",
    4,
    "嗞嗠嗢嗧嗩嗭嗮嗰嗱嗴嗶嗸",
    4,
    "嗿嘂嘃嘄嘅"
  ],
  [
    "8740",
    "嘆嘇嘊嘋嘍嘐",
    7,
    "嘙嘚嘜嘝嘠嘡嘢嘥嘦嘨嘩嘪嘫嘮嘯嘰嘳嘵嘷嘸嘺嘼嘽嘾噀",
    11,
    "噏",
    4,
    "噕噖噚噛噝",
    4
  ],
  [
    "8780",
    "噣噥噦噧噭噮噯噰噲噳噴噵噷噸噹噺噽",
    7,
    "嚇",
    6,
    "嚐嚑嚒嚔",
    14,
    "嚤",
    10,
    "嚰",
    6,
    "嚸嚹嚺嚻嚽",
    12,
    "囋",
    8,
    "囕囖囘囙囜団囥",
    5,
    "囬囮囯囲図囶囷囸囻囼圀圁圂圅圇國",
    6
  ],
  [
    "8840",
    "園",
    9,
    "圝圞圠圡圢圤圥圦圧圫圱圲圴",
    4,
    "圼圽圿坁坃坄坅坆坈坉坋坒",
    4,
    "坘坙坢坣坥坧坬坮坰坱坲坴坵坸坹坺坽坾坿垀"
  ],
  [
    "8880",
    "垁垇垈垉垊垍",
    4,
    "垔",
    6,
    "垜垝垞垟垥垨垪垬垯垰垱垳垵垶垷垹",
    8,
    "埄",
    6,
    "埌埍埐埑埓埖埗埛埜埞埡埢埣埥",
    7,
    "埮埰埱埲埳埵埶執埻埼埾埿堁堃堄堅堈堉堊堌堎堏堐堒堓堔堖堗堘堚堛堜堝堟堢堣堥",
    4,
    "堫",
    4,
    "報堲堳場堶",
    7
  ],
  [
    "8940",
    "堾",
    5,
    "塅",
    6,
    "塎塏塐塒塓塕塖塗塙",
    4,
    "塟",
    5,
    "塦",
    4,
    "塭",
    16,
    "塿墂墄墆墇墈墊墋墌"
  ],
  [
    "8980",
    "墍",
    4,
    "墔",
    4,
    "墛墜墝墠",
    7,
    "墪",
    17,
    "墽墾墿壀壂壃壄壆",
    10,
    "壒壓壔壖",
    13,
    "壥",
    5,
    "壭壯壱売壴壵壷壸壺",
    7,
    "夃夅夆夈",
    4,
    "夎夐夑夒夓夗夘夛夝夞夠夡夢夣夦夨夬夰夲夳夵夶夻"
  ],
  [
    "8a40",
    "夽夾夿奀奃奅奆奊奌奍奐奒奓奙奛",
    4,
    "奡奣奤奦",
    12,
    "奵奷奺奻奼奾奿妀妅妉妋妌妎妏妐妑妔妕妘妚妛妜妝妟妠妡妢妦"
  ],
  [
    "8a80",
    "妧妬妭妰妱妳",
    5,
    "妺妼妽妿",
    6,
    "姇姈姉姌姍姎姏姕姖姙姛姞",
    4,
    "姤姦姧姩姪姫姭",
    11,
    "姺姼姽姾娀娂娊娋娍娎娏娐娒娔娕娖娗娙娚娛娝娞娡娢娤娦娧娨娪",
    6,
    "娳娵娷",
    4,
    "娽娾娿婁",
    4,
    "婇婈婋",
    9,
    "婖婗婘婙婛",
    5
  ],
  [
    "8b40",
    "婡婣婤婥婦婨婩婫",
    8,
    "婸婹婻婼婽婾媀",
    17,
    "媓",
    6,
    "媜",
    13,
    "媫媬"
  ],
  [
    "8b80",
    "媭",
    4,
    "媴媶媷媹",
    4,
    "媿嫀嫃",
    5,
    "嫊嫋嫍",
    4,
    "嫓嫕嫗嫙嫚嫛嫝嫞嫟嫢嫤嫥嫧嫨嫪嫬",
    4,
    "嫲",
    22,
    "嬊",
    11,
    "嬘",
    25,
    "嬳嬵嬶嬸",
    7,
    "孁",
    6
  ],
  [
    "8c40",
    "孈",
    7,
    "孒孖孞孠孡孧孨孫孭孮孯孲孴孶孷學孹孻孼孾孿宂宆宊宍宎宐宑宒宔宖実宧宨宩宬宭宮宯宱宲宷宺宻宼寀寁寃寈寉寊寋寍寎寏"
  ],
  [
    "8c80",
    "寑寔",
    8,
    "寠寢寣實寧審",
    4,
    "寯寱",
    6,
    "寽対尀専尃尅將專尋尌對導尐尒尓尗尙尛尞尟尠尡尣尦尨尩尪尫尭尮尯尰尲尳尵尶尷屃屄屆屇屌屍屒屓屔屖屗屘屚屛屜屝屟屢層屧",
    6,
    "屰屲",
    6,
    "屻屼屽屾岀岃",
    4,
    "岉岊岋岎岏岒岓岕岝",
    4,
    "岤",
    4
  ],
  [
    "8d40",
    "岪岮岯岰岲岴岶岹岺岻岼岾峀峂峃峅",
    5,
    "峌",
    5,
    "峓",
    5,
    "峚",
    6,
    "峢峣峧峩峫峬峮峯峱",
    9,
    "峼",
    4
  ],
  [
    "8d80",
    "崁崄崅崈",
    5,
    "崏",
    4,
    "崕崗崘崙崚崜崝崟",
    4,
    "崥崨崪崫崬崯",
    4,
    "崵",
    7,
    "崿",
    7,
    "嵈嵉嵍",
    10,
    "嵙嵚嵜嵞",
    10,
    "嵪嵭嵮嵰嵱嵲嵳嵵",
    12,
    "嶃",
    21,
    "嶚嶛嶜嶞嶟嶠"
  ],
  [
    "8e40",
    "嶡",
    21,
    "嶸",
    12,
    "巆",
    6,
    "巎",
    12,
    "巜巟巠巣巤巪巬巭"
  ],
  [
    "8e80",
    "巰巵巶巸",
    4,
    "巿帀帄帇帉帊帋帍帎帒帓帗帞",
    7,
    "帨",
    4,
    "帯帰帲",
    4,
    "帹帺帾帿幀幁幃幆",
    5,
    "幍",
    6,
    "幖",
    4,
    "幜幝幟幠幣",
    14,
    "幵幷幹幾庁庂広庅庈庉庌庍庎庒庘庛庝庡庢庣庤庨",
    4,
    "庮",
    4,
    "庴庺庻庼庽庿",
    6
  ],
  [
    "8f40",
    "廆廇廈廋",
    5,
    "廔廕廗廘廙廚廜",
    11,
    "廩廫",
    8,
    "廵廸廹廻廼廽弅弆弇弉弌弍弎弐弒弔弖弙弚弜弝弞弡弢弣弤"
  ],
  [
    "8f80",
    "弨弫弬弮弰弲",
    6,
    "弻弽弾弿彁",
    14,
    "彑彔彙彚彛彜彞彟彠彣彥彧彨彫彮彯彲彴彵彶彸彺彽彾彿徃徆徍徎徏徑従徔徖徚徛徝從徟徠徢",
    5,
    "復徫徬徯",
    5,
    "徶徸徹徺徻徾",
    4,
    "忇忈忊忋忎忓忔忕忚忛応忞忟忢忣忥忦忨忩忬忯忰忲忳忴忶忷忹忺忼怇"
  ],
  [
    "9040",
    "怈怉怋怌怐怑怓怗怘怚怞怟怢怣怤怬怭怮怰",
    4,
    "怶",
    4,
    "怽怾恀恄",
    6,
    "恌恎恏恑恓恔恖恗恘恛恜恞恟恠恡恥恦恮恱恲恴恵恷恾悀"
  ],
  [
    "9080",
    "悁悂悅悆悇悈悊悋悎悏悐悑悓悕悗悘悙悜悞悡悢悤悥悧悩悪悮悰悳悵悶悷悹悺悽",
    7,
    "惇惈惉惌",
    4,
    "惒惓惔惖惗惙惛惞惡",
    4,
    "惪惱惲惵惷惸惻",
    4,
    "愂愃愄愅愇愊愋愌愐",
    4,
    "愖愗愘愙愛愜愝愞愡愢愥愨愩愪愬",
    18,
    "慀",
    6
  ],
  [
    "9140",
    "慇慉態慍慏慐慒慓慔慖",
    6,
    "慞慟慠慡慣慤慥慦慩",
    6,
    "慱慲慳慴慶慸",
    18,
    "憌憍憏",
    4,
    "憕"
  ],
  [
    "9180",
    "憖",
    6,
    "憞",
    8,
    "憪憫憭",
    9,
    "憸",
    5,
    "憿懀懁懃",
    4,
    "應懌",
    4,
    "懓懕",
    16,
    "懧",
    13,
    "懶",
    8,
    "戀",
    5,
    "戇戉戓戔戙戜戝戞戠戣戦戧戨戩戫戭戯戰戱戲戵戶戸",
    4,
    "扂扄扅扆扊"
  ],
  [
    "9240",
    "扏扐払扖扗扙扚扜",
    6,
    "扤扥扨扱扲扴扵扷扸扺扻扽抁抂抃抅抆抇抈抋",
    5,
    "抔抙抜抝択抣抦抧抩抪抭抮抯抰抲抳抴抶抷抸抺抾拀拁"
  ],
  [
    "9280",
    "拃拋拏拑拕拝拞拠拡拤拪拫拰拲拵拸拹拺拻挀挃挄挅挆挊挋挌挍挏挐挒挓挔挕挗挘挙挜挦挧挩挬挭挮挰挱挳",
    5,
    "挻挼挾挿捀捁捄捇捈捊捑捒捓捔捖",
    7,
    "捠捤捥捦捨捪捫捬捯捰捲捳捴捵捸捹捼捽捾捿掁掃掄掅掆掋掍掑掓掔掕掗掙",
    6,
    "採掤掦掫掯掱掲掵掶掹掻掽掿揀"
  ],
  [
    "9340",
    "揁揂揃揅揇揈揊揋揌揑揓揔揕揗",
    6,
    "揟揢揤",
    4,
    "揫揬揮揯揰揱揳揵揷揹揺揻揼揾搃搄搆",
    4,
    "損搎搑搒搕",
    5,
    "搝搟搢搣搤"
  ],
  [
    "9380",
    "搥搧搨搩搫搮",
    5,
    "搵",
    4,
    "搻搼搾摀摂摃摉摋",
    6,
    "摓摕摖摗摙",
    4,
    "摟",
    7,
    "摨摪摫摬摮",
    9,
    "摻",
    6,
    "撃撆撈",
    8,
    "撓撔撗撘撚撛撜撝撟",
    4,
    "撥撦撧撨撪撫撯撱撲撳撴撶撹撻撽撾撿擁擃擄擆",
    6,
    "擏擑擓擔擕擖擙據"
  ],
  [
    "9440",
    "擛擜擝擟擠擡擣擥擧",
    24,
    "攁",
    7,
    "攊",
    7,
    "攓",
    4,
    "攙",
    8
  ],
  [
    "9480",
    "攢攣攤攦",
    4,
    "攬攭攰攱攲攳攷攺攼攽敀",
    4,
    "敆敇敊敋敍敎敐敒敓敔敗敘敚敜敟敠敡敤敥敧敨敩敪敭敮敯敱敳敵敶數",
    14,
    "斈斉斊斍斎斏斒斔斕斖斘斚斝斞斠斢斣斦斨斪斬斮斱",
    7,
    "斺斻斾斿旀旂旇旈旉旊旍旐旑旓旔旕旘",
    7,
    "旡旣旤旪旫"
  ],
  [
    "9540",
    "旲旳旴旵旸旹旻",
    4,
    "昁昄昅昇昈昉昋昍昐昑昒昖昗昘昚昛昜昞昡昢昣昤昦昩昪昫昬昮昰昲昳昷",
    4,
    "昽昿晀時晄",
    6,
    "晍晎晐晑晘"
  ],
  [
    "9580",
    "晙晛晜晝晞晠晢晣晥晧晩",
    4,
    "晱晲晳晵晸晹晻晼晽晿暀暁暃暅暆暈暉暊暋暍暎暏暐暒暓暔暕暘",
    4,
    "暞",
    8,
    "暩",
    4,
    "暯",
    4,
    "暵暶暷暸暺暻暼暽暿",
    25,
    "曚曞",
    7,
    "曧曨曪",
    5,
    "曱曵曶書曺曻曽朁朂會"
  ],
  [
    "9640",
    "朄朅朆朇朌朎朏朑朒朓朖朘朙朚朜朞朠",
    5,
    "朧朩朮朰朲朳朶朷朸朹朻朼朾朿杁杄杅杇杊杋杍杒杔杕杗",
    4,
    "杝杢杣杤杦杧杫杬杮東杴杶"
  ],
  [
    "9680",
    "杸杹杺杻杽枀枂枃枅枆枈枊枌枍枎枏枑枒枓枔枖枙枛枟枠枡枤枦枩枬枮枱枲枴枹",
    7,
    "柂柅",
    9,
    "柕柖柗柛柟柡柣柤柦柧柨柪柫柭柮柲柵",
    7,
    "柾栁栂栃栄栆栍栐栒栔栕栘",
    4,
    "栞栟栠栢",
    6,
    "栫",
    6,
    "栴栵栶栺栻栿桇桋桍桏桒桖",
    5
  ],
  [
    "9740",
    "桜桝桞桟桪桬",
    7,
    "桵桸",
    8,
    "梂梄梇",
    7,
    "梐梑梒梔梕梖梘",
    9,
    "梣梤梥梩梪梫梬梮梱梲梴梶梷梸"
  ],
  [
    "9780",
    "梹",
    6,
    "棁棃",
    5,
    "棊棌棎棏棐棑棓棔棖棗棙棛",
    4,
    "棡棢棤",
    9,
    "棯棲棳棴棶棷棸棻棽棾棿椀椂椃椄椆",
    4,
    "椌椏椑椓",
    11,
    "椡椢椣椥",
    7,
    "椮椯椱椲椳椵椶椷椸椺椻椼椾楀楁楃",
    16,
    "楕楖楘楙楛楜楟"
  ],
  [
    "9840",
    "楡楢楤楥楧楨楩楪楬業楯楰楲",
    4,
    "楺楻楽楾楿榁榃榅榊榋榌榎",
    5,
    "榖榗榙榚榝",
    9,
    "榩榪榬榮榯榰榲榳榵榶榸榹榺榼榽"
  ],
  [
    "9880",
    "榾榿槀槂",
    7,
    "構槍槏槑槒槓槕",
    5,
    "槜槝槞槡",
    11,
    "槮槯槰槱槳",
    9,
    "槾樀",
    9,
    "樋",
    11,
    "標",
    5,
    "樠樢",
    5,
    "権樫樬樭樮樰樲樳樴樶",
    6,
    "樿",
    4,
    "橅橆橈",
    7,
    "橑",
    6,
    "橚"
  ],
  [
    "9940",
    "橜",
    4,
    "橢橣橤橦",
    10,
    "橲",
    6,
    "橺橻橽橾橿檁檂檃檅",
    8,
    "檏檒",
    4,
    "檘",
    7,
    "檡",
    5
  ],
  [
    "9980",
    "檧檨檪檭",
    114,
    "欥欦欨",
    6
  ],
  [
    "9a40",
    "欯欰欱欳欴欵欶欸欻欼欽欿歀歁歂歄歅歈歊歋歍",
    11,
    "歚",
    7,
    "歨歩歫",
    13,
    "歺歽歾歿殀殅殈"
  ],
  [
    "9a80",
    "殌殎殏殐殑殔殕殗殘殙殜",
    4,
    "殢",
    7,
    "殫",
    7,
    "殶殸",
    6,
    "毀毃毄毆",
    4,
    "毌毎毐毑毘毚毜",
    4,
    "毢",
    7,
    "毬毭毮毰毱毲毴毶毷毸毺毻毼毾",
    6,
    "氈",
    4,
    "氎氒気氜氝氞氠氣氥氫氬氭氱氳氶氷氹氺氻氼氾氿汃汄汅汈汋",
    4,
    "汑汒汓汖汘"
  ],
  [
    "9b40",
    "汙汚汢汣汥汦汧汫",
    4,
    "汱汳汵汷汸決汻汼汿沀沄沇沊沋沍沎沑沒沕沖沗沘沚沜沝沞沠沢沨沬沯沰沴沵沶沷沺泀況泂泃泆泇泈泋泍泎泏泑泒泘"
  ],
  [
    "9b80",
    "泙泚泜泝泟泤泦泧泩泬泭泲泴泹泿洀洂洃洅洆洈洉洊洍洏洐洑洓洔洕洖洘洜洝洟",
    5,
    "洦洨洩洬洭洯洰洴洶洷洸洺洿浀浂浄浉浌浐浕浖浗浘浛浝浟浡浢浤浥浧浨浫浬浭浰浱浲浳浵浶浹浺浻浽",
    4,
    "涃涄涆涇涊涋涍涏涐涒涖",
    4,
    "涜涢涥涬涭涰涱涳涴涶涷涹",
    5,
    "淁淂淃淈淉淊"
  ],
  [
    "9c40",
    "淍淎淏淐淒淓淔淕淗淚淛淜淟淢淣淥淧淨淩淪淭淯淰淲淴淵淶淸淺淽",
    7,
    "渆渇済渉渋渏渒渓渕渘渙減渜渞渟渢渦渧渨渪測渮渰渱渳渵"
  ],
  [
    "9c80",
    "渶渷渹渻",
    7,
    "湅",
    7,
    "湏湐湑湒湕湗湙湚湜湝湞湠",
    10,
    "湬湭湯",
    14,
    "満溁溂溄溇溈溊",
    4,
    "溑",
    6,
    "溙溚溛溝溞溠溡溣溤溦溨溩溫溬溭溮溰溳溵溸溹溼溾溿滀滃滄滅滆滈滉滊滌滍滎滐滒滖滘滙滛滜滝滣滧滪",
    5
  ],
  [
    "9d40",
    "滰滱滲滳滵滶滷滸滺",
    7,
    "漃漄漅漇漈漊",
    4,
    "漐漑漒漖",
    9,
    "漡漢漣漥漦漧漨漬漮漰漲漴漵漷",
    6,
    "漿潀潁潂"
  ],
  [
    "9d80",
    "潃潄潅潈潉潊潌潎",
    9,
    "潙潚潛潝潟潠潡潣潤潥潧",
    5,
    "潯潰潱潳潵潶潷潹潻潽",
    6,
    "澅澆澇澊澋澏",
    12,
    "澝澞澟澠澢",
    4,
    "澨",
    10,
    "澴澵澷澸澺",
    5,
    "濁濃",
    5,
    "濊",
    6,
    "濓",
    10,
    "濟濢濣濤濥"
  ],
  [
    "9e40",
    "濦",
    7,
    "濰",
    32,
    "瀒",
    7,
    "瀜",
    6,
    "瀤",
    6
  ],
  [
    "9e80",
    "瀫",
    9,
    "瀶瀷瀸瀺",
    17,
    "灍灎灐",
    13,
    "灟",
    11,
    "灮灱灲灳灴灷灹灺灻災炁炂炃炄炆炇炈炋炌炍炏炐炑炓炗炘炚炛炞",
    12,
    "炰炲炴炵炶為炾炿烄烅烆烇烉烋",
    12,
    "烚"
  ],
  [
    "9f40",
    "烜烝烞烠烡烢烣烥烪烮烰",
    6,
    "烸烺烻烼烾",
    10,
    "焋",
    4,
    "焑焒焔焗焛",
    10,
    "焧",
    7,
    "焲焳焴"
  ],
  [
    "9f80",
    "焵焷",
    13,
    "煆煇煈煉煋煍煏",
    12,
    "煝煟",
    4,
    "煥煩",
    4,
    "煯煰煱煴煵煶煷煹煻煼煾",
    5,
    "熅",
    4,
    "熋熌熍熎熐熑熒熓熕熖熗熚",
    4,
    "熡",
    6,
    "熩熪熫熭",
    5,
    "熴熶熷熸熺",
    8,
    "燄",
    9,
    "燏",
    4
  ],
  [
    "a040",
    "燖",
    9,
    "燡燢燣燤燦燨",
    5,
    "燯",
    9,
    "燺",
    11,
    "爇",
    19
  ],
  [
    "a080",
    "爛爜爞",
    9,
    "爩爫爭爮爯爲爳爴爺爼爾牀",
    6,
    "牉牊牋牎牏牐牑牓牔牕牗牘牚牜牞牠牣牤牥牨牪牫牬牭牰牱牳牴牶牷牸牻牼牽犂犃犅",
    4,
    "犌犎犐犑犓",
    11,
    "犠",
    11,
    "犮犱犲犳犵犺",
    6,
    "狅狆狇狉狊狋狌狏狑狓狔狕狖狘狚狛"
  ],
  [
    "a1a1",
    "　、。·ˉˇ¨〃々—～‖…‘’“”〔〕〈",
    7,
    "〖〗【】±×÷∶∧∨∑∏∪∩∈∷√⊥∥∠⌒⊙∫∮≡≌≈∽∝≠≮≯≤≥∞∵∴♂♀°′″℃＄¤￠￡‰§№☆★○●◎◇◆□■△▲※→←↑↓〓"
  ],
  [
    "a2a1",
    "ⅰ",
    9
  ],
  [
    "a2b1",
    "⒈",
    19,
    "⑴",
    19,
    "①",
    9
  ],
  [
    "a2e5",
    "㈠",
    9
  ],
  [
    "a2f1",
    "Ⅰ",
    11
  ],
  [
    "a3a1",
    "！＂＃￥％",
    88,
    "￣"
  ],
  [
    "a4a1",
    "ぁ",
    82
  ],
  [
    "a5a1",
    "ァ",
    85
  ],
  [
    "a6a1",
    "Α",
    16,
    "Σ",
    6
  ],
  [
    "a6c1",
    "α",
    16,
    "σ",
    6
  ],
  [
    "a6e0",
    "︵︶︹︺︿﹀︽︾﹁﹂﹃﹄"
  ],
  [
    "a6ee",
    "︻︼︷︸︱"
  ],
  [
    "a6f4",
    "︳︴"
  ],
  [
    "a7a1",
    "А",
    5,
    "ЁЖ",
    25
  ],
  [
    "a7d1",
    "а",
    5,
    "ёж",
    25
  ],
  [
    "a840",
    "ˊˋ˙–―‥‵℅℉↖↗↘↙∕∟∣≒≦≧⊿═",
    35,
    "▁",
    6
  ],
  [
    "a880",
    "█",
    7,
    "▓▔▕▼▽◢◣◤◥☉⊕〒〝〞"
  ],
  [
    "a8a1",
    "āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüêɑ"
  ],
  [
    "a8bd",
    "ńň"
  ],
  [
    "a8c0",
    "ɡ"
  ],
  [
    "a8c5",
    "ㄅ",
    36
  ],
  [
    "a940",
    "〡",
    8,
    "㊣㎎㎏㎜㎝㎞㎡㏄㏎㏑㏒㏕︰￢￤"
  ],
  [
    "a959",
    "℡㈱"
  ],
  [
    "a95c",
    "‐"
  ],
  [
    "a960",
    "ー゛゜ヽヾ〆ゝゞ﹉",
    9,
    "﹔﹕﹖﹗﹙",
    8
  ],
  [
    "a980",
    "﹢",
    4,
    "﹨﹩﹪﹫"
  ],
  [
    "a996",
    "〇"
  ],
  [
    "a9a4",
    "─",
    75
  ],
  [
    "aa40",
    "狜狝狟狢",
    5,
    "狪狫狵狶狹狽狾狿猀猂猄",
    5,
    "猋猌猍猏猐猑猒猔猘猙猚猟猠猣猤猦猧猨猭猯猰猲猳猵猶猺猻猼猽獀",
    8
  ],
  [
    "aa80",
    "獉獊獋獌獎獏獑獓獔獕獖獘",
    7,
    "獡",
    10,
    "獮獰獱"
  ],
  [
    "ab40",
    "獲",
    11,
    "獿",
    4,
    "玅玆玈玊玌玍玏玐玒玓玔玕玗玘玙玚玜玝玞玠玡玣",
    5,
    "玪玬玭玱玴玵玶玸玹玼玽玾玿珁珃",
    4
  ],
  [
    "ab80",
    "珋珌珎珒",
    6,
    "珚珛珜珝珟珡珢珣珤珦珨珪珫珬珮珯珰珱珳",
    4
  ],
  [
    "ac40",
    "珸",
    10,
    "琄琇琈琋琌琍琎琑",
    8,
    "琜",
    5,
    "琣琤琧琩琫琭琯琱琲琷",
    4,
    "琽琾琿瑀瑂",
    11
  ],
  [
    "ac80",
    "瑎",
    6,
    "瑖瑘瑝瑠",
    12,
    "瑮瑯瑱",
    4,
    "瑸瑹瑺"
  ],
  [
    "ad40",
    "瑻瑼瑽瑿璂璄璅璆璈璉璊璌璍璏璑",
    10,
    "璝璟",
    7,
    "璪",
    15,
    "璻",
    12
  ],
  [
    "ad80",
    "瓈",
    9,
    "瓓",
    8,
    "瓝瓟瓡瓥瓧",
    6,
    "瓰瓱瓲"
  ],
  [
    "ae40",
    "瓳瓵瓸",
    6,
    "甀甁甂甃甅",
    7,
    "甎甐甒甔甕甖甗甛甝甞甠",
    4,
    "甦甧甪甮甴甶甹甼甽甿畁畂畃畄畆畇畉畊畍畐畑畒畓畕畖畗畘"
  ],
  [
    "ae80",
    "畝",
    7,
    "畧畨畩畫",
    6,
    "畳畵當畷畺",
    4,
    "疀疁疂疄疅疇"
  ],
  [
    "af40",
    "疈疉疊疌疍疎疐疓疕疘疛疜疞疢疦",
    4,
    "疭疶疷疺疻疿痀痁痆痋痌痎痏痐痑痓痗痙痚痜痝痟痠痡痥痩痬痭痮痯痲痳痵痶痷痸痺痻痽痾瘂瘄瘆瘇"
  ],
  [
    "af80",
    "瘈瘉瘋瘍瘎瘏瘑瘒瘓瘔瘖瘚瘜瘝瘞瘡瘣瘧瘨瘬瘮瘯瘱瘲瘶瘷瘹瘺瘻瘽癁療癄"
  ],
  [
    "b040",
    "癅",
    6,
    "癎",
    5,
    "癕癗",
    4,
    "癝癟癠癡癢癤",
    6,
    "癬癭癮癰",
    7,
    "癹発發癿皀皁皃皅皉皊皌皍皏皐皒皔皕皗皘皚皛"
  ],
  [
    "b080",
    "皜",
    7,
    "皥",
    8,
    "皯皰皳皵",
    9,
    "盀盁盃啊阿埃挨哎唉哀皑癌蔼矮艾碍爱隘鞍氨安俺按暗岸胺案肮昂盎凹敖熬翱袄傲奥懊澳芭捌扒叭吧笆八疤巴拔跋靶把耙坝霸罢爸白柏百摆佰败拜稗斑班搬扳般颁板版扮拌伴瓣半办绊邦帮梆榜膀绑棒磅蚌镑傍谤苞胞包褒剥"
  ],
  [
    "b140",
    "盄盇盉盋盌盓盕盙盚盜盝盞盠",
    4,
    "盦",
    7,
    "盰盳盵盶盷盺盻盽盿眀眂眃眅眆眊県眎",
    10,
    "眛眜眝眞眡眣眤眥眧眪眫"
  ],
  [
    "b180",
    "眬眮眰",
    4,
    "眹眻眽眾眿睂睄睅睆睈",
    7,
    "睒",
    7,
    "睜薄雹保堡饱宝抱报暴豹鲍爆杯碑悲卑北辈背贝钡倍狈备惫焙被奔苯本笨崩绷甭泵蹦迸逼鼻比鄙笔彼碧蓖蔽毕毙毖币庇痹闭敝弊必辟壁臂避陛鞭边编贬扁便变卞辨辩辫遍标彪膘表鳖憋别瘪彬斌濒滨宾摈兵冰柄丙秉饼炳"
  ],
  [
    "b240",
    "睝睞睟睠睤睧睩睪睭",
    11,
    "睺睻睼瞁瞂瞃瞆",
    5,
    "瞏瞐瞓",
    11,
    "瞡瞣瞤瞦瞨瞫瞭瞮瞯瞱瞲瞴瞶",
    4
  ],
  [
    "b280",
    "瞼瞾矀",
    12,
    "矎",
    8,
    "矘矙矚矝",
    4,
    "矤病并玻菠播拨钵波博勃搏铂箔伯帛舶脖膊渤泊驳捕卜哺补埠不布步簿部怖擦猜裁材才财睬踩采彩菜蔡餐参蚕残惭惨灿苍舱仓沧藏操糙槽曹草厕策侧册测层蹭插叉茬茶查碴搽察岔差诧拆柴豺搀掺蝉馋谗缠铲产阐颤昌猖"
  ],
  [
    "b340",
    "矦矨矪矯矰矱矲矴矵矷矹矺矻矼砃",
    5,
    "砊砋砎砏砐砓砕砙砛砞砠砡砢砤砨砪砫砮砯砱砲砳砵砶砽砿硁硂硃硄硆硈硉硊硋硍硏硑硓硔硘硙硚"
  ],
  [
    "b380",
    "硛硜硞",
    11,
    "硯",
    7,
    "硸硹硺硻硽",
    6,
    "场尝常长偿肠厂敞畅唱倡超抄钞朝嘲潮巢吵炒车扯撤掣彻澈郴臣辰尘晨忱沉陈趁衬撑称城橙成呈乘程惩澄诚承逞骋秤吃痴持匙池迟弛驰耻齿侈尺赤翅斥炽充冲虫崇宠抽酬畴踌稠愁筹仇绸瞅丑臭初出橱厨躇锄雏滁除楚"
  ],
  [
    "b440",
    "碄碅碆碈碊碋碏碐碒碔碕碖碙碝碞碠碢碤碦碨",
    7,
    "碵碶碷碸確碻碼碽碿磀磂磃磄磆磇磈磌磍磎磏磑磒磓磖磗磘磚",
    9
  ],
  [
    "b480",
    "磤磥磦磧磩磪磫磭",
    4,
    "磳磵磶磸磹磻",
    5,
    "礂礃礄礆",
    6,
    "础储矗搐触处揣川穿椽传船喘串疮窗幢床闯创吹炊捶锤垂春椿醇唇淳纯蠢戳绰疵茨磁雌辞慈瓷词此刺赐次聪葱囱匆从丛凑粗醋簇促蹿篡窜摧崔催脆瘁粹淬翠村存寸磋撮搓措挫错搭达答瘩打大呆歹傣戴带殆代贷袋待逮"
  ],
  [
    "b540",
    "礍",
    5,
    "礔",
    9,
    "礟",
    4,
    "礥",
    14,
    "礵",
    4,
    "礽礿祂祃祄祅祇祊",
    8,
    "祔祕祘祙祡祣"
  ],
  [
    "b580",
    "祤祦祩祪祫祬祮祰",
    6,
    "祹祻",
    4,
    "禂禃禆禇禈禉禋禌禍禎禐禑禒怠耽担丹单郸掸胆旦氮但惮淡诞弹蛋当挡党荡档刀捣蹈倒岛祷导到稻悼道盗德得的蹬灯登等瞪凳邓堤低滴迪敌笛狄涤翟嫡抵底地蒂第帝弟递缔颠掂滇碘点典靛垫电佃甸店惦奠淀殿碉叼雕凋刁掉吊钓调跌爹碟蝶迭谍叠"
  ],
  [
    "b640",
    "禓",
    6,
    "禛",
    11,
    "禨",
    10,
    "禴",
    4,
    "禼禿秂秄秅秇秈秊秌秎秏秐秓秔秖秗秙",
    5,
    "秠秡秢秥秨秪"
  ],
  [
    "b680",
    "秬秮秱",
    6,
    "秹秺秼秾秿稁稄稅稇稈稉稊稌稏",
    4,
    "稕稖稘稙稛稜丁盯叮钉顶鼎锭定订丢东冬董懂动栋侗恫冻洞兜抖斗陡豆逗痘都督毒犊独读堵睹赌杜镀肚度渡妒端短锻段断缎堆兑队对墩吨蹲敦顿囤钝盾遁掇哆多夺垛躲朵跺舵剁惰堕蛾峨鹅俄额讹娥恶厄扼遏鄂饿恩而儿耳尔饵洱二"
  ],
  [
    "b740",
    "稝稟稡稢稤",
    14,
    "稴稵稶稸稺稾穀",
    5,
    "穇",
    9,
    "穒",
    4,
    "穘",
    16
  ],
  [
    "b780",
    "穩",
    6,
    "穱穲穳穵穻穼穽穾窂窅窇窉窊窋窌窎窏窐窓窔窙窚窛窞窡窢贰发罚筏伐乏阀法珐藩帆番翻樊矾钒繁凡烦反返范贩犯饭泛坊芳方肪房防妨仿访纺放菲非啡飞肥匪诽吠肺废沸费芬酚吩氛分纷坟焚汾粉奋份忿愤粪丰封枫蜂峰锋风疯烽逢冯缝讽奉凤佛否夫敷肤孵扶拂辐幅氟符伏俘服"
  ],
  [
    "b840",
    "窣窤窧窩窪窫窮",
    4,
    "窴",
    10,
    "竀",
    10,
    "竌",
    9,
    "竗竘竚竛竜竝竡竢竤竧",
    5,
    "竮竰竱竲竳"
  ],
  [
    "b880",
    "竴",
    4,
    "竻竼竾笀笁笂笅笇笉笌笍笎笐笒笓笖笗笘笚笜笝笟笡笢笣笧笩笭浮涪福袱弗甫抚辅俯釜斧脯腑府腐赴副覆赋复傅付阜父腹负富讣附妇缚咐噶嘎该改概钙盖溉干甘杆柑竿肝赶感秆敢赣冈刚钢缸肛纲岗港杠篙皋高膏羔糕搞镐稿告哥歌搁戈鸽胳疙割革葛格蛤阁隔铬个各给根跟耕更庚羹"
  ],
  [
    "b940",
    "笯笰笲笴笵笶笷笹笻笽笿",
    5,
    "筆筈筊筍筎筓筕筗筙筜筞筟筡筣",
    10,
    "筯筰筳筴筶筸筺筼筽筿箁箂箃箄箆",
    6,
    "箎箏"
  ],
  [
    "b980",
    "箑箒箓箖箘箙箚箛箞箟箠箣箤箥箮箯箰箲箳箵箶箷箹",
    7,
    "篂篃範埂耿梗工攻功恭龚供躬公宫弓巩汞拱贡共钩勾沟苟狗垢构购够辜菇咕箍估沽孤姑鼓古蛊骨谷股故顾固雇刮瓜剐寡挂褂乖拐怪棺关官冠观管馆罐惯灌贯光广逛瑰规圭硅归龟闺轨鬼诡癸桂柜跪贵刽辊滚棍锅郭国果裹过哈"
  ],
  [
    "ba40",
    "篅篈築篊篋篍篎篏篐篒篔",
    4,
    "篛篜篞篟篠篢篣篤篧篨篩篫篬篭篯篰篲",
    4,
    "篸篹篺篻篽篿",
    7,
    "簈簉簊簍簎簐",
    5,
    "簗簘簙"
  ],
  [
    "ba80",
    "簚",
    4,
    "簠",
    5,
    "簨簩簫",
    12,
    "簹",
    5,
    "籂骸孩海氦亥害骇酣憨邯韩含涵寒函喊罕翰撼捍旱憾悍焊汗汉夯杭航壕嚎豪毫郝好耗号浩呵喝荷菏核禾和何合盒貉阂河涸赫褐鹤贺嘿黑痕很狠恨哼亨横衡恒轰哄烘虹鸿洪宏弘红喉侯猴吼厚候后呼乎忽瑚壶葫胡蝴狐糊湖"
  ],
  [
    "bb40",
    "籃",
    9,
    "籎",
    36,
    "籵",
    5,
    "籾",
    9
  ],
  [
    "bb80",
    "粈粊",
    6,
    "粓粔粖粙粚粛粠粡粣粦粧粨粩粫粬粭粯粰粴",
    4,
    "粺粻弧虎唬护互沪户花哗华猾滑画划化话槐徊怀淮坏欢环桓还缓换患唤痪豢焕涣宦幻荒慌黄磺蝗簧皇凰惶煌晃幌恍谎灰挥辉徽恢蛔回毁悔慧卉惠晦贿秽会烩汇讳诲绘荤昏婚魂浑混豁活伙火获或惑霍货祸击圾基机畸稽积箕"
  ],
  [
    "bc40",
    "粿糀糂糃糄糆糉糋糎",
    6,
    "糘糚糛糝糞糡",
    6,
    "糩",
    5,
    "糰",
    7,
    "糹糺糼",
    13,
    "紋",
    5
  ],
  [
    "bc80",
    "紑",
    14,
    "紡紣紤紥紦紨紩紪紬紭紮細",
    6,
    "肌饥迹激讥鸡姬绩缉吉极棘辑籍集及急疾汲即嫉级挤几脊己蓟技冀季伎祭剂悸济寄寂计记既忌际妓继纪嘉枷夹佳家加荚颊贾甲钾假稼价架驾嫁歼监坚尖笺间煎兼肩艰奸缄茧检柬碱硷拣捡简俭剪减荐槛鉴践贱见键箭件"
  ],
  [
    "bd40",
    "紷",
    54,
    "絯",
    7
  ],
  [
    "bd80",
    "絸",
    32,
    "健舰剑饯渐溅涧建僵姜将浆江疆蒋桨奖讲匠酱降蕉椒礁焦胶交郊浇骄娇嚼搅铰矫侥脚狡角饺缴绞剿教酵轿较叫窖揭接皆秸街阶截劫节桔杰捷睫竭洁结解姐戒藉芥界借介疥诫届巾筋斤金今津襟紧锦仅谨进靳晋禁近烬浸"
  ],
  [
    "be40",
    "継",
    12,
    "綧",
    6,
    "綯",
    42
  ],
  [
    "be80",
    "線",
    32,
    "尽劲荆兢茎睛晶鲸京惊精粳经井警景颈静境敬镜径痉靖竟竞净炯窘揪究纠玖韭久灸九酒厩救旧臼舅咎就疚鞠拘狙疽居驹菊局咀矩举沮聚拒据巨具距踞锯俱句惧炬剧捐鹃娟倦眷卷绢撅攫抉掘倔爵觉决诀绝均菌钧军君峻"
  ],
  [
    "bf40",
    "緻",
    62
  ],
  [
    "bf80",
    "縺縼",
    4,
    "繂",
    4,
    "繈",
    21,
    "俊竣浚郡骏喀咖卡咯开揩楷凯慨刊堪勘坎砍看康慷糠扛抗亢炕考拷烤靠坷苛柯棵磕颗科壳咳可渴克刻客课肯啃垦恳坑吭空恐孔控抠口扣寇枯哭窟苦酷库裤夸垮挎跨胯块筷侩快宽款匡筐狂框矿眶旷况亏盔岿窥葵奎魁傀"
  ],
  [
    "c040",
    "繞",
    35,
    "纃",
    23,
    "纜纝纞"
  ],
  [
    "c080",
    "纮纴纻纼绖绤绬绹缊缐缞缷缹缻",
    6,
    "罃罆",
    9,
    "罒罓馈愧溃坤昆捆困括扩廓阔垃拉喇蜡腊辣啦莱来赖蓝婪栏拦篮阑兰澜谰揽览懒缆烂滥琅榔狼廊郎朗浪捞劳牢老佬姥酪烙涝勒乐雷镭蕾磊累儡垒擂肋类泪棱楞冷厘梨犁黎篱狸离漓理李里鲤礼莉荔吏栗丽厉励砾历利傈例俐"
  ],
  [
    "c140",
    "罖罙罛罜罝罞罠罣",
    4,
    "罫罬罭罯罰罳罵罶罷罸罺罻罼罽罿羀羂",
    7,
    "羋羍羏",
    4,
    "羕",
    4,
    "羛羜羠羢羣羥羦羨",
    6,
    "羱"
  ],
  [
    "c180",
    "羳",
    4,
    "羺羻羾翀翂翃翄翆翇翈翉翋翍翏",
    4,
    "翖翗翙",
    5,
    "翢翣痢立粒沥隶力璃哩俩联莲连镰廉怜涟帘敛脸链恋炼练粮凉梁粱良两辆量晾亮谅撩聊僚疗燎寥辽潦了撂镣廖料列裂烈劣猎琳林磷霖临邻鳞淋凛赁吝拎玲菱零龄铃伶羚凌灵陵岭领另令溜琉榴硫馏留刘瘤流柳六龙聋咙笼窿"
  ],
  [
    "c240",
    "翤翧翨翪翫翬翭翯翲翴",
    6,
    "翽翾翿耂耇耈耉耊耎耏耑耓耚耛耝耞耟耡耣耤耫",
    5,
    "耲耴耹耺耼耾聀聁聄聅聇聈聉聎聏聐聑聓聕聖聗"
  ],
  [
    "c280",
    "聙聛",
    13,
    "聫",
    5,
    "聲",
    11,
    "隆垄拢陇楼娄搂篓漏陋芦卢颅庐炉掳卤虏鲁麓碌露路赂鹿潞禄录陆戮驴吕铝侣旅履屡缕虑氯律率滤绿峦挛孪滦卵乱掠略抡轮伦仑沦纶论萝螺罗逻锣箩骡裸落洛骆络妈麻玛码蚂马骂嘛吗埋买麦卖迈脉瞒馒蛮满蔓曼慢漫"
  ],
  [
    "c340",
    "聾肁肂肅肈肊肍",
    5,
    "肔肕肗肙肞肣肦肧肨肬肰肳肵肶肸肹肻胅胇",
    4,
    "胏",
    6,
    "胘胟胠胢胣胦胮胵胷胹胻胾胿脀脁脃脄脅脇脈脋"
  ],
  [
    "c380",
    "脌脕脗脙脛脜脝脟",
    12,
    "脭脮脰脳脴脵脷脹",
    4,
    "脿谩芒茫盲氓忙莽猫茅锚毛矛铆卯茂冒帽貌贸么玫枚梅酶霉煤没眉媒镁每美昧寐妹媚门闷们萌蒙檬盟锰猛梦孟眯醚靡糜迷谜弥米秘觅泌蜜密幂棉眠绵冕免勉娩缅面苗描瞄藐秒渺庙妙蔑灭民抿皿敏悯闽明螟鸣铭名命谬摸"
  ],
  [
    "c440",
    "腀",
    5,
    "腇腉腍腎腏腒腖腗腘腛",
    4,
    "腡腢腣腤腦腨腪腫腬腯腲腳腵腶腷腸膁膃",
    4,
    "膉膋膌膍膎膐膒",
    5,
    "膙膚膞",
    4,
    "膤膥"
  ],
  [
    "c480",
    "膧膩膫",
    7,
    "膴",
    5,
    "膼膽膾膿臄臅臇臈臉臋臍",
    6,
    "摹蘑模膜磨摩魔抹末莫墨默沫漠寞陌谋牟某拇牡亩姆母墓暮幕募慕木目睦牧穆拿哪呐钠那娜纳氖乃奶耐奈南男难囊挠脑恼闹淖呢馁内嫩能妮霓倪泥尼拟你匿腻逆溺蔫拈年碾撵捻念娘酿鸟尿捏聂孽啮镊镍涅您柠狞凝宁"
  ],
  [
    "c540",
    "臔",
    14,
    "臤臥臦臨臩臫臮",
    4,
    "臵",
    5,
    "臽臿舃與",
    4,
    "舎舏舑舓舕",
    5,
    "舝舠舤舥舦舧舩舮舲舺舼舽舿"
  ],
  [
    "c580",
    "艀艁艂艃艅艆艈艊艌艍艎艐",
    7,
    "艙艛艜艝艞艠",
    7,
    "艩拧泞牛扭钮纽脓浓农弄奴努怒女暖虐疟挪懦糯诺哦欧鸥殴藕呕偶沤啪趴爬帕怕琶拍排牌徘湃派攀潘盘磐盼畔判叛乓庞旁耪胖抛咆刨炮袍跑泡呸胚培裴赔陪配佩沛喷盆砰抨烹澎彭蓬棚硼篷膨朋鹏捧碰坯砒霹批披劈琵毗"
  ],
  [
    "c640",
    "艪艫艬艭艱艵艶艷艸艻艼芀芁芃芅芆芇芉芌芐芓芔芕芖芚芛芞芠芢芣芧芲芵芶芺芻芼芿苀苂苃苅苆苉苐苖苙苚苝苢苧苨苩苪苬苭苮苰苲苳苵苶苸"
  ],
  [
    "c680",
    "苺苼",
    4,
    "茊茋茍茐茒茓茖茘茙茝",
    9,
    "茩茪茮茰茲茷茻茽啤脾疲皮匹痞僻屁譬篇偏片骗飘漂瓢票撇瞥拼频贫品聘乒坪苹萍平凭瓶评屏坡泼颇婆破魄迫粕剖扑铺仆莆葡菩蒲埔朴圃普浦谱曝瀑期欺栖戚妻七凄漆柒沏其棋奇歧畦崎脐齐旗祈祁骑起岂乞企启契砌器气迄弃汽泣讫掐"
  ],
  [
    "c740",
    "茾茿荁荂荄荅荈荊",
    4,
    "荓荕",
    4,
    "荝荢荰",
    6,
    "荹荺荾",
    6,
    "莇莈莊莋莌莍莏莐莑莔莕莖莗莙莚莝莟莡",
    6,
    "莬莭莮"
  ],
  [
    "c780",
    "莯莵莻莾莿菂菃菄菆菈菉菋菍菎菐菑菒菓菕菗菙菚菛菞菢菣菤菦菧菨菫菬菭恰洽牵扦钎铅千迁签仟谦乾黔钱钳前潜遣浅谴堑嵌欠歉枪呛腔羌墙蔷强抢橇锹敲悄桥瞧乔侨巧鞘撬翘峭俏窍切茄且怯窃钦侵亲秦琴勤芹擒禽寝沁青轻氢倾卿清擎晴氰情顷请庆琼穷秋丘邱球求囚酋泅趋区蛆曲躯屈驱渠"
  ],
  [
    "c840",
    "菮華菳",
    4,
    "菺菻菼菾菿萀萂萅萇萈萉萊萐萒",
    5,
    "萙萚萛萞",
    5,
    "萩",
    7,
    "萲",
    5,
    "萹萺萻萾",
    7,
    "葇葈葉"
  ],
  [
    "c880",
    "葊",
    6,
    "葒",
    4,
    "葘葝葞葟葠葢葤",
    4,
    "葪葮葯葰葲葴葷葹葻葼取娶龋趣去圈颧权醛泉全痊拳犬券劝缺炔瘸却鹊榷确雀裙群然燃冉染瓤壤攘嚷让饶扰绕惹热壬仁人忍韧任认刃妊纫扔仍日戎茸蓉荣融熔溶容绒冗揉柔肉茹蠕儒孺如辱乳汝入褥软阮蕊瑞锐闰润若弱撒洒萨腮鳃塞赛三叁"
  ],
  [
    "c940",
    "葽",
    4,
    "蒃蒄蒅蒆蒊蒍蒏",
    7,
    "蒘蒚蒛蒝蒞蒟蒠蒢",
    12,
    "蒰蒱蒳蒵蒶蒷蒻蒼蒾蓀蓂蓃蓅蓆蓇蓈蓋蓌蓎蓏蓒蓔蓕蓗"
  ],
  [
    "c980",
    "蓘",
    4,
    "蓞蓡蓢蓤蓧",
    4,
    "蓭蓮蓯蓱",
    10,
    "蓽蓾蔀蔁蔂伞散桑嗓丧搔骚扫嫂瑟色涩森僧莎砂杀刹沙纱傻啥煞筛晒珊苫杉山删煽衫闪陕擅赡膳善汕扇缮墒伤商赏晌上尚裳梢捎稍烧芍勺韶少哨邵绍奢赊蛇舌舍赦摄射慑涉社设砷申呻伸身深娠绅神沈审婶甚肾慎渗声生甥牲升绳"
  ],
  [
    "ca40",
    "蔃",
    8,
    "蔍蔎蔏蔐蔒蔔蔕蔖蔘蔙蔛蔜蔝蔞蔠蔢",
    8,
    "蔭",
    9,
    "蔾",
    4,
    "蕄蕅蕆蕇蕋",
    10
  ],
  [
    "ca80",
    "蕗蕘蕚蕛蕜蕝蕟",
    4,
    "蕥蕦蕧蕩",
    8,
    "蕳蕵蕶蕷蕸蕼蕽蕿薀薁省盛剩胜圣师失狮施湿诗尸虱十石拾时什食蚀实识史矢使屎驶始式示士世柿事拭誓逝势是嗜噬适仕侍释饰氏市恃室视试收手首守寿授售受瘦兽蔬枢梳殊抒输叔舒淑疏书赎孰熟薯暑曙署蜀黍鼠属术述树束戍竖墅庶数漱"
  ],
  [
    "cb40",
    "薂薃薆薈",
    6,
    "薐",
    10,
    "薝",
    6,
    "薥薦薧薩薫薬薭薱",
    5,
    "薸薺",
    6,
    "藂",
    6,
    "藊",
    4,
    "藑藒"
  ],
  [
    "cb80",
    "藔藖",
    5,
    "藝",
    6,
    "藥藦藧藨藪",
    14,
    "恕刷耍摔衰甩帅栓拴霜双爽谁水睡税吮瞬顺舜说硕朔烁斯撕嘶思私司丝死肆寺嗣四伺似饲巳松耸怂颂送宋讼诵搜艘擞嗽苏酥俗素速粟僳塑溯宿诉肃酸蒜算虽隋随绥髓碎岁穗遂隧祟孙损笋蓑梭唆缩琐索锁所塌他它她塔"
  ],
  [
    "cc40",
    "藹藺藼藽藾蘀",
    4,
    "蘆",
    10,
    "蘒蘓蘔蘕蘗",
    15,
    "蘨蘪",
    13,
    "蘹蘺蘻蘽蘾蘿虀"
  ],
  [
    "cc80",
    "虁",
    11,
    "虒虓處",
    4,
    "虛虜虝號虠虡虣",
    7,
    "獭挞蹋踏胎苔抬台泰酞太态汰坍摊贪瘫滩坛檀痰潭谭谈坦毯袒碳探叹炭汤塘搪堂棠膛唐糖倘躺淌趟烫掏涛滔绦萄桃逃淘陶讨套特藤腾疼誊梯剔踢锑提题蹄啼体替嚏惕涕剃屉天添填田甜恬舔腆挑条迢眺跳贴铁帖厅听烃"
  ],
  [
    "cd40",
    "虭虯虰虲",
    6,
    "蚃",
    6,
    "蚎",
    4,
    "蚔蚖",
    5,
    "蚞",
    4,
    "蚥蚦蚫蚭蚮蚲蚳蚷蚸蚹蚻",
    4,
    "蛁蛂蛃蛅蛈蛌蛍蛒蛓蛕蛖蛗蛚蛜"
  ],
  [
    "cd80",
    "蛝蛠蛡蛢蛣蛥蛦蛧蛨蛪蛫蛬蛯蛵蛶蛷蛺蛻蛼蛽蛿蜁蜄蜅蜆蜋蜌蜎蜏蜐蜑蜔蜖汀廷停亭庭挺艇通桐酮瞳同铜彤童桶捅筒统痛偷投头透凸秃突图徒途涂屠土吐兔湍团推颓腿蜕褪退吞屯臀拖托脱鸵陀驮驼椭妥拓唾挖哇蛙洼娃瓦袜歪外豌弯湾玩顽丸烷完碗挽晚皖惋宛婉万腕汪王亡枉网往旺望忘妄威"
  ],
  [
    "ce40",
    "蜙蜛蜝蜟蜠蜤蜦蜧蜨蜪蜫蜬蜭蜯蜰蜲蜳蜵蜶蜸蜹蜺蜼蜽蝀",
    6,
    "蝊蝋蝍蝏蝐蝑蝒蝔蝕蝖蝘蝚",
    5,
    "蝡蝢蝦",
    7,
    "蝯蝱蝲蝳蝵"
  ],
  [
    "ce80",
    "蝷蝸蝹蝺蝿螀螁螄螆螇螉螊螌螎",
    4,
    "螔螕螖螘",
    6,
    "螠",
    4,
    "巍微危韦违桅围唯惟为潍维苇萎委伟伪尾纬未蔚味畏胃喂魏位渭谓尉慰卫瘟温蚊文闻纹吻稳紊问嗡翁瓮挝蜗涡窝我斡卧握沃巫呜钨乌污诬屋无芜梧吾吴毋武五捂午舞伍侮坞戊雾晤物勿务悟误昔熙析西硒矽晰嘻吸锡牺"
  ],
  [
    "cf40",
    "螥螦螧螩螪螮螰螱螲螴螶螷螸螹螻螼螾螿蟁",
    4,
    "蟇蟈蟉蟌",
    4,
    "蟔",
    6,
    "蟜蟝蟞蟟蟡蟢蟣蟤蟦蟧蟨蟩蟫蟬蟭蟯",
    9
  ],
  [
    "cf80",
    "蟺蟻蟼蟽蟿蠀蠁蠂蠄",
    5,
    "蠋",
    7,
    "蠔蠗蠘蠙蠚蠜",
    4,
    "蠣稀息希悉膝夕惜熄烯溪汐犀檄袭席习媳喜铣洗系隙戏细瞎虾匣霞辖暇峡侠狭下厦夏吓掀锨先仙鲜纤咸贤衔舷闲涎弦嫌显险现献县腺馅羡宪陷限线相厢镶香箱襄湘乡翔祥详想响享项巷橡像向象萧硝霄削哮嚣销消宵淆晓"
  ],
  [
    "d040",
    "蠤",
    13,
    "蠳",
    5,
    "蠺蠻蠽蠾蠿衁衂衃衆",
    5,
    "衎",
    5,
    "衕衖衘衚",
    6,
    "衦衧衪衭衯衱衳衴衵衶衸衹衺"
  ],
  [
    "d080",
    "衻衼袀袃袆袇袉袊袌袎袏袐袑袓袔袕袗",
    4,
    "袝",
    4,
    "袣袥",
    5,
    "小孝校肖啸笑效楔些歇蝎鞋协挟携邪斜胁谐写械卸蟹懈泄泻谢屑薪芯锌欣辛新忻心信衅星腥猩惺兴刑型形邢行醒幸杏性姓兄凶胸匈汹雄熊休修羞朽嗅锈秀袖绣墟戌需虚嘘须徐许蓄酗叙旭序畜恤絮婿绪续轩喧宣悬旋玄"
  ],
  [
    "d140",
    "袬袮袯袰袲",
    4,
    "袸袹袺袻袽袾袿裀裃裄裇裈裊裋裌裍裏裐裑裓裖裗裚",
    4,
    "裠裡裦裧裩",
    6,
    "裲裵裶裷裺裻製裿褀褁褃",
    5
  ],
  [
    "d180",
    "褉褋",
    4,
    "褑褔",
    4,
    "褜",
    4,
    "褢褣褤褦褧褨褩褬褭褮褯褱褲褳褵褷选癣眩绚靴薛学穴雪血勋熏循旬询寻驯巡殉汛训讯逊迅压押鸦鸭呀丫芽牙蚜崖衙涯雅哑亚讶焉咽阉烟淹盐严研蜒岩延言颜阎炎沿奄掩眼衍演艳堰燕厌砚雁唁彦焰宴谚验殃央鸯秧杨扬佯疡羊洋阳氧仰痒养样漾邀腰妖瑶"
  ],
  [
    "d240",
    "褸",
    8,
    "襂襃襅",
    24,
    "襠",
    5,
    "襧",
    19,
    "襼"
  ],
  [
    "d280",
    "襽襾覀覂覄覅覇",
    26,
    "摇尧遥窑谣姚咬舀药要耀椰噎耶爷野冶也页掖业叶曳腋夜液一壹医揖铱依伊衣颐夷遗移仪胰疑沂宜姨彝椅蚁倚已乙矣以艺抑易邑屹亿役臆逸肄疫亦裔意毅忆义益溢诣议谊译异翼翌绎茵荫因殷音阴姻吟银淫寅饮尹引隐"
  ],
  [
    "d340",
    "覢",
    30,
    "觃觍觓觔觕觗觘觙觛觝觟觠觡觢觤觧觨觩觪觬觭觮觰觱觲觴",
    6
  ],
  [
    "d380",
    "觻",
    4,
    "訁",
    5,
    "計",
    21,
    "印英樱婴鹰应缨莹萤营荧蝇迎赢盈影颖硬映哟拥佣臃痈庸雍踊蛹咏泳涌永恿勇用幽优悠忧尤由邮铀犹油游酉有友右佑釉诱又幼迂淤于盂榆虞愚舆余俞逾鱼愉渝渔隅予娱雨与屿禹宇语羽玉域芋郁吁遇喻峪御愈欲狱育誉"
  ],
  [
    "d440",
    "訞",
    31,
    "訿",
    8,
    "詉",
    21
  ],
  [
    "d480",
    "詟",
    25,
    "詺",
    6,
    "浴寓裕预豫驭鸳渊冤元垣袁原援辕园员圆猿源缘远苑愿怨院曰约越跃钥岳粤月悦阅耘云郧匀陨允运蕴酝晕韵孕匝砸杂栽哉灾宰载再在咱攒暂赞赃脏葬遭糟凿藻枣早澡蚤躁噪造皂灶燥责择则泽贼怎增憎曾赠扎喳渣札轧"
  ],
  [
    "d540",
    "誁",
    7,
    "誋",
    7,
    "誔",
    46
  ],
  [
    "d580",
    "諃",
    32,
    "铡闸眨栅榨咋乍炸诈摘斋宅窄债寨瞻毡詹粘沾盏斩辗崭展蘸栈占战站湛绽樟章彰漳张掌涨杖丈帐账仗胀瘴障招昭找沼赵照罩兆肇召遮折哲蛰辙者锗蔗这浙珍斟真甄砧臻贞针侦枕疹诊震振镇阵蒸挣睁征狰争怔整拯正政"
  ],
  [
    "d640",
    "諤",
    34,
    "謈",
    27
  ],
  [
    "d680",
    "謤謥謧",
    30,
    "帧症郑证芝枝支吱蜘知肢脂汁之织职直植殖执值侄址指止趾只旨纸志挚掷至致置帜峙制智秩稚质炙痔滞治窒中盅忠钟衷终种肿重仲众舟周州洲诌粥轴肘帚咒皱宙昼骤珠株蛛朱猪诸诛逐竹烛煮拄瞩嘱主著柱助蛀贮铸筑"
  ],
  [
    "d740",
    "譆",
    31,
    "譧",
    4,
    "譭",
    25
  ],
  [
    "d780",
    "讇",
    24,
    "讬讱讻诇诐诪谉谞住注祝驻抓爪拽专砖转撰赚篆桩庄装妆撞壮状椎锥追赘坠缀谆准捉拙卓桌琢茁酌啄着灼浊兹咨资姿滋淄孜紫仔籽滓子自渍字鬃棕踪宗综总纵邹走奏揍租足卒族祖诅阻组钻纂嘴醉最罪尊遵昨左佐柞做作坐座"
  ],
  [
    "d840",
    "谸",
    8,
    "豂豃豄豅豈豊豋豍",
    7,
    "豖豗豘豙豛",
    5,
    "豣",
    6,
    "豬",
    6,
    "豴豵豶豷豻",
    6,
    "貃貄貆貇"
  ],
  [
    "d880",
    "貈貋貍",
    6,
    "貕貖貗貙",
    20,
    "亍丌兀丐廿卅丕亘丞鬲孬噩丨禺丿匕乇夭爻卮氐囟胤馗毓睾鼗丶亟鼐乜乩亓芈孛啬嘏仄厍厝厣厥厮靥赝匚叵匦匮匾赜卦卣刂刈刎刭刳刿剀剌剞剡剜蒯剽劂劁劐劓冂罔亻仃仉仂仨仡仫仞伛仳伢佤仵伥伧伉伫佞佧攸佚佝"
  ],
  [
    "d940",
    "貮",
    62
  ],
  [
    "d980",
    "賭",
    32,
    "佟佗伲伽佶佴侑侉侃侏佾佻侪佼侬侔俦俨俪俅俚俣俜俑俟俸倩偌俳倬倏倮倭俾倜倌倥倨偾偃偕偈偎偬偻傥傧傩傺僖儆僭僬僦僮儇儋仝氽佘佥俎龠汆籴兮巽黉馘冁夔勹匍訇匐凫夙兕亠兖亳衮袤亵脔裒禀嬴蠃羸冫冱冽冼"
  ],
  [
    "da40",
    "贎",
    14,
    "贠赑赒赗赟赥赨赩赪赬赮赯赱赲赸",
    8,
    "趂趃趆趇趈趉趌",
    4,
    "趒趓趕",
    9,
    "趠趡"
  ],
  [
    "da80",
    "趢趤",
    12,
    "趲趶趷趹趻趽跀跁跂跅跇跈跉跊跍跐跒跓跔凇冖冢冥讠讦讧讪讴讵讷诂诃诋诏诎诒诓诔诖诘诙诜诟诠诤诨诩诮诰诳诶诹诼诿谀谂谄谇谌谏谑谒谔谕谖谙谛谘谝谟谠谡谥谧谪谫谮谯谲谳谵谶卩卺阝阢阡阱阪阽阼陂陉陔陟陧陬陲陴隈隍隗隰邗邛邝邙邬邡邴邳邶邺"
  ],
  [
    "db40",
    "跕跘跙跜跠跡跢跥跦跧跩跭跮跰跱跲跴跶跼跾",
    6,
    "踆踇踈踋踍踎踐踑踒踓踕",
    7,
    "踠踡踤",
    4,
    "踫踭踰踲踳踴踶踷踸踻踼踾"
  ],
  [
    "db80",
    "踿蹃蹅蹆蹌",
    4,
    "蹓",
    5,
    "蹚",
    11,
    "蹧蹨蹪蹫蹮蹱邸邰郏郅邾郐郄郇郓郦郢郜郗郛郫郯郾鄄鄢鄞鄣鄱鄯鄹酃酆刍奂劢劬劭劾哿勐勖勰叟燮矍廴凵凼鬯厶弁畚巯坌垩垡塾墼壅壑圩圬圪圳圹圮圯坜圻坂坩垅坫垆坼坻坨坭坶坳垭垤垌垲埏垧垴垓垠埕埘埚埙埒垸埴埯埸埤埝"
  ],
  [
    "dc40",
    "蹳蹵蹷",
    4,
    "蹽蹾躀躂躃躄躆躈",
    6,
    "躑躒躓躕",
    6,
    "躝躟",
    11,
    "躭躮躰躱躳",
    6,
    "躻",
    7
  ],
  [
    "dc80",
    "軃",
    10,
    "軏",
    21,
    "堋堍埽埭堀堞堙塄堠塥塬墁墉墚墀馨鼙懿艹艽艿芏芊芨芄芎芑芗芙芫芸芾芰苈苊苣芘芷芮苋苌苁芩芴芡芪芟苄苎芤苡茉苷苤茏茇苜苴苒苘茌苻苓茑茚茆茔茕苠苕茜荑荛荜茈莒茼茴茱莛荞茯荏荇荃荟荀茗荠茭茺茳荦荥"
  ],
  [
    "dd40",
    "軥",
    62
  ],
  [
    "dd80",
    "輤",
    32,
    "荨茛荩荬荪荭荮莰荸莳莴莠莪莓莜莅荼莶莩荽莸荻莘莞莨莺莼菁萁菥菘堇萘萋菝菽菖萜萸萑萆菔菟萏萃菸菹菪菅菀萦菰菡葜葑葚葙葳蒇蒈葺蒉葸萼葆葩葶蒌蒎萱葭蓁蓍蓐蓦蒽蓓蓊蒿蒺蓠蒡蒹蒴蒗蓥蓣蔌甍蔸蓰蔹蔟蔺"
  ],
  [
    "de40",
    "轅",
    32,
    "轪辀辌辒辝辠辡辢辤辥辦辧辪辬辭辮辯農辳辴辵辷辸辺辻込辿迀迃迆"
  ],
  [
    "de80",
    "迉",
    4,
    "迏迒迖迗迚迠迡迣迧迬迯迱迲迴迵迶迺迻迼迾迿逇逈逌逎逓逕逘蕖蔻蓿蓼蕙蕈蕨蕤蕞蕺瞢蕃蕲蕻薤薨薇薏蕹薮薜薅薹薷薰藓藁藜藿蘧蘅蘩蘖蘼廾弈夼奁耷奕奚奘匏尢尥尬尴扌扪抟抻拊拚拗拮挢拶挹捋捃掭揶捱捺掎掴捭掬掊捩掮掼揲揸揠揿揄揞揎摒揆掾摅摁搋搛搠搌搦搡摞撄摭撖"
  ],
  [
    "df40",
    "這逜連逤逥逧",
    5,
    "逰",
    4,
    "逷逹逺逽逿遀遃遅遆遈",
    4,
    "過達違遖遙遚遜",
    5,
    "遤遦遧適遪遫遬遯",
    4,
    "遶",
    6,
    "遾邁"
  ],
  [
    "df80",
    "還邅邆邇邉邊邌",
    4,
    "邒邔邖邘邚邜邞邟邠邤邥邧邨邩邫邭邲邷邼邽邿郀摺撷撸撙撺擀擐擗擤擢攉攥攮弋忒甙弑卟叱叽叩叨叻吒吖吆呋呒呓呔呖呃吡呗呙吣吲咂咔呷呱呤咚咛咄呶呦咝哐咭哂咴哒咧咦哓哔呲咣哕咻咿哌哙哚哜咩咪咤哝哏哞唛哧唠哽唔哳唢唣唏唑唧唪啧喏喵啉啭啁啕唿啐唼"
  ],
  [
    "e040",
    "郂郃郆郈郉郋郌郍郒郔郕郖郘郙郚郞郟郠郣郤郥郩郪郬郮郰郱郲郳郵郶郷郹郺郻郼郿鄀鄁鄃鄅",
    19,
    "鄚鄛鄜"
  ],
  [
    "e080",
    "鄝鄟鄠鄡鄤",
    10,
    "鄰鄲",
    6,
    "鄺",
    8,
    "酄唷啖啵啶啷唳唰啜喋嗒喃喱喹喈喁喟啾嗖喑啻嗟喽喾喔喙嗪嗷嗉嘟嗑嗫嗬嗔嗦嗝嗄嗯嗥嗲嗳嗌嗍嗨嗵嗤辔嘞嘈嘌嘁嘤嘣嗾嘀嘧嘭噘嘹噗嘬噍噢噙噜噌噔嚆噤噱噫噻噼嚅嚓嚯囔囗囝囡囵囫囹囿圄圊圉圜帏帙帔帑帱帻帼"
  ],
  [
    "e140",
    "酅酇酈酑酓酔酕酖酘酙酛酜酟酠酦酧酨酫酭酳酺酻酼醀",
    4,
    "醆醈醊醎醏醓",
    6,
    "醜",
    5,
    "醤",
    5,
    "醫醬醰醱醲醳醶醷醸醹醻"
  ],
  [
    "e180",
    "醼",
    10,
    "釈釋釐釒",
    9,
    "針",
    8,
    "帷幄幔幛幞幡岌屺岍岐岖岈岘岙岑岚岜岵岢岽岬岫岱岣峁岷峄峒峤峋峥崂崃崧崦崮崤崞崆崛嵘崾崴崽嵬嵛嵯嵝嵫嵋嵊嵩嵴嶂嶙嶝豳嶷巅彳彷徂徇徉後徕徙徜徨徭徵徼衢彡犭犰犴犷犸狃狁狎狍狒狨狯狩狲狴狷猁狳猃狺"
  ],
  [
    "e240",
    "釦",
    62
  ],
  [
    "e280",
    "鈥",
    32,
    "狻猗猓猡猊猞猝猕猢猹猥猬猸猱獐獍獗獠獬獯獾舛夥飧夤夂饣饧",
    5,
    "饴饷饽馀馄馇馊馍馐馑馓馔馕庀庑庋庖庥庠庹庵庾庳赓廒廑廛廨廪膺忄忉忖忏怃忮怄忡忤忾怅怆忪忭忸怙怵怦怛怏怍怩怫怊怿怡恸恹恻恺恂"
  ],
  [
    "e340",
    "鉆",
    45,
    "鉵",
    16
  ],
  [
    "e380",
    "銆",
    7,
    "銏",
    24,
    "恪恽悖悚悭悝悃悒悌悛惬悻悱惝惘惆惚悴愠愦愕愣惴愀愎愫慊慵憬憔憧憷懔懵忝隳闩闫闱闳闵闶闼闾阃阄阆阈阊阋阌阍阏阒阕阖阗阙阚丬爿戕氵汔汜汊沣沅沐沔沌汨汩汴汶沆沩泐泔沭泷泸泱泗沲泠泖泺泫泮沱泓泯泾"
  ],
  [
    "e440",
    "銨",
    5,
    "銯",
    24,
    "鋉",
    31
  ],
  [
    "e480",
    "鋩",
    32,
    "洹洧洌浃浈洇洄洙洎洫浍洮洵洚浏浒浔洳涑浯涞涠浞涓涔浜浠浼浣渚淇淅淞渎涿淠渑淦淝淙渖涫渌涮渫湮湎湫溲湟溆湓湔渲渥湄滟溱溘滠漭滢溥溧溽溻溷滗溴滏溏滂溟潢潆潇漤漕滹漯漶潋潴漪漉漩澉澍澌潸潲潼潺濑"
  ],
  [
    "e540",
    "錊",
    51,
    "錿",
    10
  ],
  [
    "e580",
    "鍊",
    31,
    "鍫濉澧澹澶濂濡濮濞濠濯瀚瀣瀛瀹瀵灏灞宀宄宕宓宥宸甯骞搴寤寮褰寰蹇謇辶迓迕迥迮迤迩迦迳迨逅逄逋逦逑逍逖逡逵逶逭逯遄遑遒遐遨遘遢遛暹遴遽邂邈邃邋彐彗彖彘尻咫屐屙孱屣屦羼弪弩弭艴弼鬻屮妁妃妍妩妪妣"
  ],
  [
    "e640",
    "鍬",
    34,
    "鎐",
    27
  ],
  [
    "e680",
    "鎬",
    29,
    "鏋鏌鏍妗姊妫妞妤姒妲妯姗妾娅娆姝娈姣姘姹娌娉娲娴娑娣娓婀婧婊婕娼婢婵胬媪媛婷婺媾嫫媲嫒嫔媸嫠嫣嫱嫖嫦嫘嫜嬉嬗嬖嬲嬷孀尕尜孚孥孳孑孓孢驵驷驸驺驿驽骀骁骅骈骊骐骒骓骖骘骛骜骝骟骠骢骣骥骧纟纡纣纥纨纩"
  ],
  [
    "e740",
    "鏎",
    7,
    "鏗",
    54
  ],
  [
    "e780",
    "鐎",
    32,
    "纭纰纾绀绁绂绉绋绌绐绔绗绛绠绡绨绫绮绯绱绲缍绶绺绻绾缁缂缃缇缈缋缌缏缑缒缗缙缜缛缟缡",
    6,
    "缪缫缬缭缯",
    4,
    "缵幺畿巛甾邕玎玑玮玢玟珏珂珑玷玳珀珉珈珥珙顼琊珩珧珞玺珲琏琪瑛琦琥琨琰琮琬"
  ],
  [
    "e840",
    "鐯",
    14,
    "鐿",
    43,
    "鑬鑭鑮鑯"
  ],
  [
    "e880",
    "鑰",
    20,
    "钑钖钘铇铏铓铔铚铦铻锜锠琛琚瑁瑜瑗瑕瑙瑷瑭瑾璜璎璀璁璇璋璞璨璩璐璧瓒璺韪韫韬杌杓杞杈杩枥枇杪杳枘枧杵枨枞枭枋杷杼柰栉柘栊柩枰栌柙枵柚枳柝栀柃枸柢栎柁柽栲栳桠桡桎桢桄桤梃栝桕桦桁桧桀栾桊桉栩梵梏桴桷梓桫棂楮棼椟椠棹"
  ],
  [
    "e940",
    "锧锳锽镃镈镋镕镚镠镮镴镵長",
    7,
    "門",
    42
  ],
  [
    "e980",
    "閫",
    32,
    "椤棰椋椁楗棣椐楱椹楠楂楝榄楫榀榘楸椴槌榇榈槎榉楦楣楹榛榧榻榫榭槔榱槁槊槟榕槠榍槿樯槭樗樘橥槲橄樾檠橐橛樵檎橹樽樨橘橼檑檐檩檗檫猷獒殁殂殇殄殒殓殍殚殛殡殪轫轭轱轲轳轵轶轸轷轹轺轼轾辁辂辄辇辋"
  ],
  [
    "ea40",
    "闌",
    27,
    "闬闿阇阓阘阛阞阠阣",
    6,
    "阫阬阭阯阰阷阸阹阺阾陁陃陊陎陏陑陒陓陖陗"
  ],
  [
    "ea80",
    "陘陙陚陜陝陞陠陣陥陦陫陭",
    4,
    "陳陸",
    12,
    "隇隉隊辍辎辏辘辚軎戋戗戛戟戢戡戥戤戬臧瓯瓴瓿甏甑甓攴旮旯旰昊昙杲昃昕昀炅曷昝昴昱昶昵耆晟晔晁晏晖晡晗晷暄暌暧暝暾曛曜曦曩贲贳贶贻贽赀赅赆赈赉赇赍赕赙觇觊觋觌觎觏觐觑牮犟牝牦牯牾牿犄犋犍犏犒挈挲掰"
  ],
  [
    "eb40",
    "隌階隑隒隓隕隖隚際隝",
    9,
    "隨",
    7,
    "隱隲隴隵隷隸隺隻隿雂雃雈雊雋雐雑雓雔雖",
    9,
    "雡",
    6,
    "雫"
  ],
  [
    "eb80",
    "雬雭雮雰雱雲雴雵雸雺電雼雽雿霂霃霅霊霋霌霐霑霒霔霕霗",
    4,
    "霝霟霠搿擘耄毪毳毽毵毹氅氇氆氍氕氘氙氚氡氩氤氪氲攵敕敫牍牒牖爰虢刖肟肜肓肼朊肽肱肫肭肴肷胧胨胩胪胛胂胄胙胍胗朐胝胫胱胴胭脍脎胲胼朕脒豚脶脞脬脘脲腈腌腓腴腙腚腱腠腩腼腽腭腧塍媵膈膂膑滕膣膪臌朦臊膻"
  ],
  [
    "ec40",
    "霡",
    8,
    "霫霬霮霯霱霳",
    4,
    "霺霻霼霽霿",
    18,
    "靔靕靗靘靚靜靝靟靣靤靦靧靨靪",
    7
  ],
  [
    "ec80",
    "靲靵靷",
    4,
    "靽",
    7,
    "鞆",
    4,
    "鞌鞎鞏鞐鞓鞕鞖鞗鞙",
    4,
    "臁膦欤欷欹歃歆歙飑飒飓飕飙飚殳彀毂觳斐齑斓於旆旄旃旌旎旒旖炀炜炖炝炻烀炷炫炱烨烊焐焓焖焯焱煳煜煨煅煲煊煸煺熘熳熵熨熠燠燔燧燹爝爨灬焘煦熹戾戽扃扈扉礻祀祆祉祛祜祓祚祢祗祠祯祧祺禅禊禚禧禳忑忐"
  ],
  [
    "ed40",
    "鞞鞟鞡鞢鞤",
    6,
    "鞬鞮鞰鞱鞳鞵",
    46
  ],
  [
    "ed80",
    "韤韥韨韮",
    4,
    "韴韷",
    23,
    "怼恝恚恧恁恙恣悫愆愍慝憩憝懋懑戆肀聿沓泶淼矶矸砀砉砗砘砑斫砭砜砝砹砺砻砟砼砥砬砣砩硎硭硖硗砦硐硇硌硪碛碓碚碇碜碡碣碲碹碥磔磙磉磬磲礅磴礓礤礞礴龛黹黻黼盱眄眍盹眇眈眚眢眙眭眦眵眸睐睑睇睃睚睨"
  ],
  [
    "ee40",
    "頏",
    62
  ],
  [
    "ee80",
    "顎",
    32,
    "睢睥睿瞍睽瞀瞌瞑瞟瞠瞰瞵瞽町畀畎畋畈畛畲畹疃罘罡罟詈罨罴罱罹羁罾盍盥蠲钅钆钇钋钊钌钍钏钐钔钗钕钚钛钜钣钤钫钪钭钬钯钰钲钴钶",
    4,
    "钼钽钿铄铈",
    6,
    "铐铑铒铕铖铗铙铘铛铞铟铠铢铤铥铧铨铪"
  ],
  [
    "ef40",
    "顯",
    5,
    "颋颎颒颕颙颣風",
    37,
    "飏飐飔飖飗飛飜飝飠",
    4
  ],
  [
    "ef80",
    "飥飦飩",
    30,
    "铩铫铮铯铳铴铵铷铹铼铽铿锃锂锆锇锉锊锍锎锏锒",
    4,
    "锘锛锝锞锟锢锪锫锩锬锱锲锴锶锷锸锼锾锿镂锵镄镅镆镉镌镎镏镒镓镔镖镗镘镙镛镞镟镝镡镢镤",
    8,
    "镯镱镲镳锺矧矬雉秕秭秣秫稆嵇稃稂稞稔"
  ],
  [
    "f040",
    "餈",
    4,
    "餎餏餑",
    28,
    "餯",
    26
  ],
  [
    "f080",
    "饊",
    9,
    "饖",
    12,
    "饤饦饳饸饹饻饾馂馃馉稹稷穑黏馥穰皈皎皓皙皤瓞瓠甬鸠鸢鸨",
    4,
    "鸲鸱鸶鸸鸷鸹鸺鸾鹁鹂鹄鹆鹇鹈鹉鹋鹌鹎鹑鹕鹗鹚鹛鹜鹞鹣鹦",
    6,
    "鹱鹭鹳疒疔疖疠疝疬疣疳疴疸痄疱疰痃痂痖痍痣痨痦痤痫痧瘃痱痼痿瘐瘀瘅瘌瘗瘊瘥瘘瘕瘙"
  ],
  [
    "f140",
    "馌馎馚",
    10,
    "馦馧馩",
    47
  ],
  [
    "f180",
    "駙",
    32,
    "瘛瘼瘢瘠癀瘭瘰瘿瘵癃瘾瘳癍癞癔癜癖癫癯翊竦穸穹窀窆窈窕窦窠窬窨窭窳衤衩衲衽衿袂袢裆袷袼裉裢裎裣裥裱褚裼裨裾裰褡褙褓褛褊褴褫褶襁襦襻疋胥皲皴矜耒耔耖耜耠耢耥耦耧耩耨耱耋耵聃聆聍聒聩聱覃顸颀颃"
  ],
  [
    "f240",
    "駺",
    62
  ],
  [
    "f280",
    "騹",
    32,
    "颉颌颍颏颔颚颛颞颟颡颢颥颦虍虔虬虮虿虺虼虻蚨蚍蚋蚬蚝蚧蚣蚪蚓蚩蚶蛄蚵蛎蚰蚺蚱蚯蛉蛏蚴蛩蛱蛲蛭蛳蛐蜓蛞蛴蛟蛘蛑蜃蜇蛸蜈蜊蜍蜉蜣蜻蜞蜥蜮蜚蜾蝈蜴蜱蜩蜷蜿螂蜢蝽蝾蝻蝠蝰蝌蝮螋蝓蝣蝼蝤蝙蝥螓螯螨蟒"
  ],
  [
    "f340",
    "驚",
    17,
    "驲骃骉骍骎骔骕骙骦骩",
    6,
    "骲骳骴骵骹骻骽骾骿髃髄髆",
    4,
    "髍髎髏髐髒體髕髖髗髙髚髛髜"
  ],
  [
    "f380",
    "髝髞髠髢髣髤髥髧髨髩髪髬髮髰",
    8,
    "髺髼",
    6,
    "鬄鬅鬆蟆螈螅螭螗螃螫蟥螬螵螳蟋蟓螽蟑蟀蟊蟛蟪蟠蟮蠖蠓蟾蠊蠛蠡蠹蠼缶罂罄罅舐竺竽笈笃笄笕笊笫笏筇笸笪笙笮笱笠笥笤笳笾笞筘筚筅筵筌筝筠筮筻筢筲筱箐箦箧箸箬箝箨箅箪箜箢箫箴篑篁篌篝篚篥篦篪簌篾篼簏簖簋"
  ],
  [
    "f440",
    "鬇鬉",
    5,
    "鬐鬑鬒鬔",
    10,
    "鬠鬡鬢鬤",
    10,
    "鬰鬱鬳",
    7,
    "鬽鬾鬿魀魆魊魋魌魎魐魒魓魕",
    5
  ],
  [
    "f480",
    "魛",
    32,
    "簟簪簦簸籁籀臾舁舂舄臬衄舡舢舣舭舯舨舫舸舻舳舴舾艄艉艋艏艚艟艨衾袅袈裘裟襞羝羟羧羯羰羲籼敉粑粝粜粞粢粲粼粽糁糇糌糍糈糅糗糨艮暨羿翎翕翥翡翦翩翮翳糸絷綦綮繇纛麸麴赳趄趔趑趱赧赭豇豉酊酐酎酏酤"
  ],
  [
    "f540",
    "魼",
    62
  ],
  [
    "f580",
    "鮻",
    32,
    "酢酡酰酩酯酽酾酲酴酹醌醅醐醍醑醢醣醪醭醮醯醵醴醺豕鹾趸跫踅蹙蹩趵趿趼趺跄跖跗跚跞跎跏跛跆跬跷跸跣跹跻跤踉跽踔踝踟踬踮踣踯踺蹀踹踵踽踱蹉蹁蹂蹑蹒蹊蹰蹶蹼蹯蹴躅躏躔躐躜躞豸貂貊貅貘貔斛觖觞觚觜"
  ],
  [
    "f640",
    "鯜",
    62
  ],
  [
    "f680",
    "鰛",
    32,
    "觥觫觯訾謦靓雩雳雯霆霁霈霏霎霪霭霰霾龀龃龅",
    5,
    "龌黾鼋鼍隹隼隽雎雒瞿雠銎銮鋈錾鍪鏊鎏鐾鑫鱿鲂鲅鲆鲇鲈稣鲋鲎鲐鲑鲒鲔鲕鲚鲛鲞",
    5,
    "鲥",
    4,
    "鲫鲭鲮鲰",
    7,
    "鲺鲻鲼鲽鳄鳅鳆鳇鳊鳋"
  ],
  [
    "f740",
    "鰼",
    62
  ],
  [
    "f780",
    "鱻鱽鱾鲀鲃鲄鲉鲊鲌鲏鲓鲖鲗鲘鲙鲝鲪鲬鲯鲹鲾",
    4,
    "鳈鳉鳑鳒鳚鳛鳠鳡鳌",
    4,
    "鳓鳔鳕鳗鳘鳙鳜鳝鳟鳢靼鞅鞑鞒鞔鞯鞫鞣鞲鞴骱骰骷鹘骶骺骼髁髀髅髂髋髌髑魅魃魇魉魈魍魑飨餍餮饕饔髟髡髦髯髫髻髭髹鬈鬏鬓鬟鬣麽麾縻麂麇麈麋麒鏖麝麟黛黜黝黠黟黢黩黧黥黪黯鼢鼬鼯鼹鼷鼽鼾齄"
  ],
  [
    "f840",
    "鳣",
    62
  ],
  [
    "f880",
    "鴢",
    32
  ],
  [
    "f940",
    "鵃",
    62
  ],
  [
    "f980",
    "鶂",
    32
  ],
  [
    "fa40",
    "鶣",
    62
  ],
  [
    "fa80",
    "鷢",
    32
  ],
  [
    "fb40",
    "鸃",
    27,
    "鸤鸧鸮鸰鸴鸻鸼鹀鹍鹐鹒鹓鹔鹖鹙鹝鹟鹠鹡鹢鹥鹮鹯鹲鹴",
    9,
    "麀"
  ],
  [
    "fb80",
    "麁麃麄麅麆麉麊麌",
    5,
    "麔",
    8,
    "麞麠",
    5,
    "麧麨麩麪"
  ],
  [
    "fc40",
    "麫",
    8,
    "麵麶麷麹麺麼麿",
    4,
    "黅黆黇黈黊黋黌黐黒黓黕黖黗黙黚點黡黣黤黦黨黫黬黭黮黰",
    8,
    "黺黽黿",
    6
  ],
  [
    "fc80",
    "鼆",
    4,
    "鼌鼏鼑鼒鼔鼕鼖鼘鼚",
    5,
    "鼡鼣",
    8,
    "鼭鼮鼰鼱"
  ],
  [
    "fd40",
    "鼲",
    4,
    "鼸鼺鼼鼿",
    4,
    "齅",
    10,
    "齒",
    38
  ],
  [
    "fd80",
    "齹",
    5,
    "龁龂龍",
    11,
    "龜龝龞龡",
    4,
    "郎凉秊裏隣"
  ],
  [
    "fe40",
    "兀嗀﨎﨏﨑﨓﨔礼﨟蘒﨡﨣﨤﨧﨨﨩"
  ]
], Zi = [
  [
    "a140",
    "",
    62
  ],
  [
    "a180",
    "",
    32
  ],
  [
    "a240",
    "",
    62
  ],
  [
    "a280",
    "",
    32
  ],
  [
    "a2ab",
    "",
    5
  ],
  [
    "a2e3",
    "€"
  ],
  [
    "a2ef",
    ""
  ],
  [
    "a2fd",
    ""
  ],
  [
    "a340",
    "",
    62
  ],
  [
    "a380",
    "",
    31,
    "　"
  ],
  [
    "a440",
    "",
    62
  ],
  [
    "a480",
    "",
    32
  ],
  [
    "a4f4",
    "",
    10
  ],
  [
    "a540",
    "",
    62
  ],
  [
    "a580",
    "",
    32
  ],
  [
    "a5f7",
    "",
    7
  ],
  [
    "a640",
    "",
    62
  ],
  [
    "a680",
    "",
    32
  ],
  [
    "a6b9",
    "",
    7
  ],
  [
    "a6d9",
    "",
    6
  ],
  [
    "a6ec",
    ""
  ],
  [
    "a6f3",
    ""
  ],
  [
    "a6f6",
    "",
    8
  ],
  [
    "a740",
    "",
    62
  ],
  [
    "a780",
    "",
    32
  ],
  [
    "a7c2",
    "",
    14
  ],
  [
    "a7f2",
    "",
    12
  ],
  [
    "a896",
    "",
    10
  ],
  [
    "a8bc",
    ""
  ],
  [
    "a8bf",
    "ǹ"
  ],
  [
    "a8c1",
    ""
  ],
  [
    "a8ea",
    "",
    20
  ],
  [
    "a958",
    ""
  ],
  [
    "a95b",
    ""
  ],
  [
    "a95d",
    ""
  ],
  [
    "a989",
    "〾⿰",
    11
  ],
  [
    "a997",
    "",
    12
  ],
  [
    "a9f0",
    "",
    14
  ],
  [
    "aaa1",
    "",
    93
  ],
  [
    "aba1",
    "",
    93
  ],
  [
    "aca1",
    "",
    93
  ],
  [
    "ada1",
    "",
    93
  ],
  [
    "aea1",
    "",
    93
  ],
  [
    "afa1",
    "",
    93
  ],
  [
    "d7fa",
    "",
    4
  ],
  [
    "f8a1",
    "",
    93
  ],
  [
    "f9a1",
    "",
    93
  ],
  [
    "faa1",
    "",
    93
  ],
  [
    "fba1",
    "",
    93
  ],
  [
    "fca1",
    "",
    93
  ],
  [
    "fda1",
    "",
    93
  ],
  [
    "fe50",
    "⺁⺄㑳㑇⺈⺋㖞㘚㘎⺌⺗㥮㤘㧏㧟㩳㧐㭎㱮㳠⺧⺪䁖䅟⺮䌷⺳⺶⺷䎱䎬⺻䏝䓖䙡䙌"
  ],
  [
    "fe80",
    "䜣䜩䝼䞍⻊䥇䥺䥽䦂䦃䦅䦆䦟䦛䦷䦶䲣䲟䲠䲡䱷䲢䴓",
    6,
    "䶮",
    93
  ]
], jc = [
  128,
  165,
  169,
  178,
  184,
  216,
  226,
  235,
  238,
  244,
  248,
  251,
  253,
  258,
  276,
  284,
  300,
  325,
  329,
  334,
  364,
  463,
  465,
  467,
  469,
  471,
  473,
  475,
  477,
  506,
  594,
  610,
  712,
  716,
  730,
  930,
  938,
  962,
  970,
  1026,
  1104,
  1106,
  8209,
  8215,
  8218,
  8222,
  8231,
  8241,
  8244,
  8246,
  8252,
  8365,
  8452,
  8454,
  8458,
  8471,
  8482,
  8556,
  8570,
  8596,
  8602,
  8713,
  8720,
  8722,
  8726,
  8731,
  8737,
  8740,
  8742,
  8748,
  8751,
  8760,
  8766,
  8777,
  8781,
  8787,
  8802,
  8808,
  8816,
  8854,
  8858,
  8870,
  8896,
  8979,
  9322,
  9372,
  9548,
  9588,
  9616,
  9622,
  9634,
  9652,
  9662,
  9672,
  9676,
  9680,
  9702,
  9735,
  9738,
  9793,
  9795,
  11906,
  11909,
  11913,
  11917,
  11928,
  11944,
  11947,
  11951,
  11956,
  11960,
  11964,
  11979,
  12284,
  12292,
  12312,
  12319,
  12330,
  12351,
  12436,
  12447,
  12535,
  12543,
  12586,
  12842,
  12850,
  12964,
  13200,
  13215,
  13218,
  13253,
  13263,
  13267,
  13270,
  13384,
  13428,
  13727,
  13839,
  13851,
  14617,
  14703,
  14801,
  14816,
  14964,
  15183,
  15471,
  15585,
  16471,
  16736,
  17208,
  17325,
  17330,
  17374,
  17623,
  17997,
  18018,
  18212,
  18218,
  18301,
  18318,
  18760,
  18811,
  18814,
  18820,
  18823,
  18844,
  18848,
  18872,
  19576,
  19620,
  19738,
  19887,
  40870,
  59244,
  59336,
  59367,
  59413,
  59417,
  59423,
  59431,
  59437,
  59443,
  59452,
  59460,
  59478,
  59493,
  63789,
  63866,
  63894,
  63976,
  63986,
  64016,
  64018,
  64021,
  64025,
  64034,
  64037,
  64042,
  65074,
  65093,
  65107,
  65112,
  65127,
  65132,
  65375,
  65510,
  65536
], Ac = [
  0,
  36,
  38,
  45,
  50,
  81,
  89,
  95,
  96,
  100,
  103,
  104,
  105,
  109,
  126,
  133,
  148,
  172,
  175,
  179,
  208,
  306,
  307,
  308,
  309,
  310,
  311,
  312,
  313,
  341,
  428,
  443,
  544,
  545,
  558,
  741,
  742,
  749,
  750,
  805,
  819,
  820,
  7922,
  7924,
  7925,
  7927,
  7934,
  7943,
  7944,
  7945,
  7950,
  8062,
  8148,
  8149,
  8152,
  8164,
  8174,
  8236,
  8240,
  8262,
  8264,
  8374,
  8380,
  8381,
  8384,
  8388,
  8390,
  8392,
  8393,
  8394,
  8396,
  8401,
  8406,
  8416,
  8419,
  8424,
  8437,
  8439,
  8445,
  8482,
  8485,
  8496,
  8521,
  8603,
  8936,
  8946,
  9046,
  9050,
  9063,
  9066,
  9076,
  9092,
  9100,
  9108,
  9111,
  9113,
  9131,
  9162,
  9164,
  9218,
  9219,
  11329,
  11331,
  11334,
  11336,
  11346,
  11361,
  11363,
  11366,
  11370,
  11372,
  11375,
  11389,
  11682,
  11686,
  11687,
  11692,
  11694,
  11714,
  11716,
  11723,
  11725,
  11730,
  11736,
  11982,
  11989,
  12102,
  12336,
  12348,
  12350,
  12384,
  12393,
  12395,
  12397,
  12510,
  12553,
  12851,
  12962,
  12973,
  13738,
  13823,
  13919,
  13933,
  14080,
  14298,
  14585,
  14698,
  15583,
  15847,
  16318,
  16434,
  16438,
  16481,
  16729,
  17102,
  17122,
  17315,
  17320,
  17402,
  17418,
  17859,
  17909,
  17911,
  17915,
  17916,
  17936,
  17939,
  17961,
  18664,
  18703,
  18814,
  18962,
  19043,
  33469,
  33470,
  33471,
  33484,
  33485,
  33490,
  33497,
  33501,
  33505,
  33513,
  33520,
  33536,
  33550,
  37845,
  37921,
  37948,
  38029,
  38038,
  38064,
  38065,
  38066,
  38069,
  38075,
  38076,
  38078,
  39108,
  39109,
  39113,
  39114,
  39115,
  39116,
  39265,
  39394,
  189e3
], _c = {
  uChars: jc,
  gbChars: Ac
}, Tc = [
  [
    "0",
    "\0",
    127
  ],
  [
    "8141",
    "갂갃갅갆갋",
    4,
    "갘갞갟갡갢갣갥",
    6,
    "갮갲갳갴"
  ],
  [
    "8161",
    "갵갶갷갺갻갽갾갿걁",
    9,
    "걌걎",
    5,
    "걕"
  ],
  [
    "8181",
    "걖걗걙걚걛걝",
    18,
    "걲걳걵걶걹걻",
    4,
    "겂겇겈겍겎겏겑겒겓겕",
    6,
    "겞겢",
    5,
    "겫겭겮겱",
    6,
    "겺겾겿곀곂곃곅곆곇곉곊곋곍",
    7,
    "곖곘",
    7,
    "곢곣곥곦곩곫곭곮곲곴곷",
    4,
    "곾곿괁괂괃괅괇",
    4,
    "괎괐괒괓"
  ],
  [
    "8241",
    "괔괕괖괗괙괚괛괝괞괟괡",
    7,
    "괪괫괮",
    5
  ],
  [
    "8261",
    "괶괷괹괺괻괽",
    6,
    "굆굈굊",
    5,
    "굑굒굓굕굖굗"
  ],
  [
    "8281",
    "굙",
    7,
    "굢굤",
    7,
    "굮굯굱굲굷굸굹굺굾궀궃",
    4,
    "궊궋궍궎궏궑",
    10,
    "궞",
    5,
    "궥",
    17,
    "궸",
    7,
    "귂귃귅귆귇귉",
    6,
    "귒귔",
    7,
    "귝귞귟귡귢귣귥",
    18
  ],
  [
    "8341",
    "귺귻귽귾긂",
    5,
    "긊긌긎",
    5,
    "긕",
    7
  ],
  [
    "8361",
    "긝",
    18,
    "긲긳긵긶긹긻긼"
  ],
  [
    "8381",
    "긽긾긿깂깄깇깈깉깋깏깑깒깓깕깗",
    4,
    "깞깢깣깤깦깧깪깫깭깮깯깱",
    6,
    "깺깾",
    5,
    "꺆",
    5,
    "꺍",
    46,
    "꺿껁껂껃껅",
    6,
    "껎껒",
    5,
    "껚껛껝",
    8
  ],
  [
    "8441",
    "껦껧껩껪껬껮",
    5,
    "껵껶껷껹껺껻껽",
    8
  ],
  [
    "8461",
    "꼆꼉꼊꼋꼌꼎꼏꼑",
    18
  ],
  [
    "8481",
    "꼤",
    7,
    "꼮꼯꼱꼳꼵",
    6,
    "꼾꽀꽄꽅꽆꽇꽊",
    5,
    "꽑",
    10,
    "꽞",
    5,
    "꽦",
    18,
    "꽺",
    5,
    "꾁꾂꾃꾅꾆꾇꾉",
    6,
    "꾒꾓꾔꾖",
    5,
    "꾝",
    26,
    "꾺꾻꾽꾾"
  ],
  [
    "8541",
    "꾿꿁",
    5,
    "꿊꿌꿏",
    4,
    "꿕",
    6,
    "꿝",
    4
  ],
  [
    "8561",
    "꿢",
    5,
    "꿪",
    5,
    "꿲꿳꿵꿶꿷꿹",
    6,
    "뀂뀃"
  ],
  [
    "8581",
    "뀅",
    6,
    "뀍뀎뀏뀑뀒뀓뀕",
    6,
    "뀞",
    9,
    "뀩",
    26,
    "끆끇끉끋끍끏끐끑끒끖끘끚끛끜끞",
    29,
    "끾끿낁낂낃낅",
    6,
    "낎낐낒",
    5,
    "낛낝낞낣낤"
  ],
  [
    "8641",
    "낥낦낧낪낰낲낶낷낹낺낻낽",
    6,
    "냆냊",
    5,
    "냒"
  ],
  [
    "8661",
    "냓냕냖냗냙",
    6,
    "냡냢냣냤냦",
    10
  ],
  [
    "8681",
    "냱",
    22,
    "넊넍넎넏넑넔넕넖넗넚넞",
    4,
    "넦넧넩넪넫넭",
    6,
    "넶넺",
    5,
    "녂녃녅녆녇녉",
    6,
    "녒녓녖녗녙녚녛녝녞녟녡",
    22,
    "녺녻녽녾녿놁놃",
    4,
    "놊놌놎놏놐놑놕놖놗놙놚놛놝"
  ],
  [
    "8741",
    "놞",
    9,
    "놩",
    15
  ],
  [
    "8761",
    "놹",
    18,
    "뇍뇎뇏뇑뇒뇓뇕"
  ],
  [
    "8781",
    "뇖",
    5,
    "뇞뇠",
    7,
    "뇪뇫뇭뇮뇯뇱",
    7,
    "뇺뇼뇾",
    5,
    "눆눇눉눊눍",
    6,
    "눖눘눚",
    5,
    "눡",
    18,
    "눵",
    6,
    "눽",
    26,
    "뉙뉚뉛뉝뉞뉟뉡",
    6,
    "뉪",
    4
  ],
  [
    "8841",
    "뉯",
    4,
    "뉶",
    5,
    "뉽",
    6,
    "늆늇늈늊",
    4
  ],
  [
    "8861",
    "늏늒늓늕늖늗늛",
    4,
    "늢늤늧늨늩늫늭늮늯늱늲늳늵늶늷"
  ],
  [
    "8881",
    "늸",
    15,
    "닊닋닍닎닏닑닓",
    4,
    "닚닜닞닟닠닡닣닧닩닪닰닱닲닶닼닽닾댂댃댅댆댇댉",
    6,
    "댒댖",
    5,
    "댝",
    54,
    "덗덙덚덝덠덡덢덣"
  ],
  [
    "8941",
    "덦덨덪덬덭덯덲덳덵덶덷덹",
    6,
    "뎂뎆",
    5,
    "뎍"
  ],
  [
    "8961",
    "뎎뎏뎑뎒뎓뎕",
    10,
    "뎢",
    5,
    "뎩뎪뎫뎭"
  ],
  [
    "8981",
    "뎮",
    21,
    "돆돇돉돊돍돏돑돒돓돖돘돚돜돞돟돡돢돣돥돦돧돩",
    18,
    "돽",
    18,
    "됑",
    6,
    "됙됚됛됝됞됟됡",
    6,
    "됪됬",
    7,
    "됵",
    15
  ],
  [
    "8a41",
    "둅",
    10,
    "둒둓둕둖둗둙",
    6,
    "둢둤둦"
  ],
  [
    "8a61",
    "둧",
    4,
    "둭",
    18,
    "뒁뒂"
  ],
  [
    "8a81",
    "뒃",
    4,
    "뒉",
    19,
    "뒞",
    5,
    "뒥뒦뒧뒩뒪뒫뒭",
    7,
    "뒶뒸뒺",
    5,
    "듁듂듃듅듆듇듉",
    6,
    "듑듒듓듔듖",
    5,
    "듞듟듡듢듥듧",
    4,
    "듮듰듲",
    5,
    "듹",
    26,
    "딖딗딙딚딝"
  ],
  [
    "8b41",
    "딞",
    5,
    "딦딫",
    4,
    "딲딳딵딶딷딹",
    6,
    "땂땆"
  ],
  [
    "8b61",
    "땇땈땉땊땎땏땑땒땓땕",
    6,
    "땞땢",
    8
  ],
  [
    "8b81",
    "땫",
    52,
    "떢떣떥떦떧떩떬떭떮떯떲떶",
    4,
    "떾떿뗁뗂뗃뗅",
    6,
    "뗎뗒",
    5,
    "뗙",
    18,
    "뗭",
    18
  ],
  [
    "8c41",
    "똀",
    15,
    "똒똓똕똖똗똙",
    4
  ],
  [
    "8c61",
    "똞",
    6,
    "똦",
    5,
    "똭",
    6,
    "똵",
    5
  ],
  [
    "8c81",
    "똻",
    12,
    "뙉",
    26,
    "뙥뙦뙧뙩",
    50,
    "뚞뚟뚡뚢뚣뚥",
    5,
    "뚭뚮뚯뚰뚲",
    16
  ],
  [
    "8d41",
    "뛃",
    16,
    "뛕",
    8
  ],
  [
    "8d61",
    "뛞",
    17,
    "뛱뛲뛳뛵뛶뛷뛹뛺"
  ],
  [
    "8d81",
    "뛻",
    4,
    "뜂뜃뜄뜆",
    33,
    "뜪뜫뜭뜮뜱",
    6,
    "뜺뜼",
    7,
    "띅띆띇띉띊띋띍",
    6,
    "띖",
    9,
    "띡띢띣띥띦띧띩",
    6,
    "띲띴띶",
    5,
    "띾띿랁랂랃랅",
    6,
    "랎랓랔랕랚랛랝랞"
  ],
  [
    "8e41",
    "랟랡",
    6,
    "랪랮",
    5,
    "랶랷랹",
    8
  ],
  [
    "8e61",
    "럂",
    4,
    "럈럊",
    19
  ],
  [
    "8e81",
    "럞",
    13,
    "럮럯럱럲럳럵",
    6,
    "럾렂",
    4,
    "렊렋렍렎렏렑",
    6,
    "렚렜렞",
    5,
    "렦렧렩렪렫렭",
    6,
    "렶렺",
    5,
    "롁롂롃롅",
    11,
    "롒롔",
    7,
    "롞롟롡롢롣롥",
    6,
    "롮롰롲",
    5,
    "롹롺롻롽",
    7
  ],
  [
    "8f41",
    "뢅",
    7,
    "뢎",
    17
  ],
  [
    "8f61",
    "뢠",
    7,
    "뢩",
    6,
    "뢱뢲뢳뢵뢶뢷뢹",
    4
  ],
  [
    "8f81",
    "뢾뢿룂룄룆",
    5,
    "룍룎룏룑룒룓룕",
    7,
    "룞룠룢",
    5,
    "룪룫룭룮룯룱",
    6,
    "룺룼룾",
    5,
    "뤅",
    18,
    "뤙",
    6,
    "뤡",
    26,
    "뤾뤿륁륂륃륅",
    6,
    "륍륎륐륒",
    5
  ],
  [
    "9041",
    "륚륛륝륞륟륡",
    6,
    "륪륬륮",
    5,
    "륶륷륹륺륻륽"
  ],
  [
    "9061",
    "륾",
    5,
    "릆릈릋릌릏",
    15
  ],
  [
    "9081",
    "릟",
    12,
    "릮릯릱릲릳릵",
    6,
    "릾맀맂",
    5,
    "맊맋맍맓",
    4,
    "맚맜맟맠맢맦맧맩맪맫맭",
    6,
    "맶맻",
    4,
    "먂",
    5,
    "먉",
    11,
    "먖",
    33,
    "먺먻먽먾먿멁멃멄멅멆"
  ],
  [
    "9141",
    "멇멊멌멏멐멑멒멖멗멙멚멛멝",
    6,
    "멦멪",
    5
  ],
  [
    "9161",
    "멲멳멵멶멷멹",
    9,
    "몆몈몉몊몋몍",
    5
  ],
  [
    "9181",
    "몓",
    20,
    "몪몭몮몯몱몳",
    4,
    "몺몼몾",
    5,
    "뫅뫆뫇뫉",
    14,
    "뫚",
    33,
    "뫽뫾뫿묁묂묃묅",
    7,
    "묎묐묒",
    5,
    "묙묚묛묝묞묟묡",
    6
  ],
  [
    "9241",
    "묨묪묬",
    7,
    "묷묹묺묿",
    4,
    "뭆뭈뭊뭋뭌뭎뭑뭒"
  ],
  [
    "9261",
    "뭓뭕뭖뭗뭙",
    7,
    "뭢뭤",
    7,
    "뭭",
    4
  ],
  [
    "9281",
    "뭲",
    21,
    "뮉뮊뮋뮍뮎뮏뮑",
    18,
    "뮥뮦뮧뮩뮪뮫뮭",
    6,
    "뮵뮶뮸",
    7,
    "믁믂믃믅믆믇믉",
    6,
    "믑믒믔",
    35,
    "믺믻믽믾밁"
  ],
  [
    "9341",
    "밃",
    4,
    "밊밎밐밒밓밙밚밠밡밢밣밦밨밪밫밬밮밯밲밳밵"
  ],
  [
    "9361",
    "밶밷밹",
    6,
    "뱂뱆뱇뱈뱊뱋뱎뱏뱑",
    8
  ],
  [
    "9381",
    "뱚뱛뱜뱞",
    37,
    "벆벇벉벊벍벏",
    4,
    "벖벘벛",
    4,
    "벢벣벥벦벩",
    6,
    "벲벶",
    5,
    "벾벿볁볂볃볅",
    7,
    "볎볒볓볔볖볗볙볚볛볝",
    22,
    "볷볹볺볻볽"
  ],
  [
    "9441",
    "볾",
    5,
    "봆봈봊",
    5,
    "봑봒봓봕",
    8
  ],
  [
    "9461",
    "봞",
    5,
    "봥",
    6,
    "봭",
    12
  ],
  [
    "9481",
    "봺",
    5,
    "뵁",
    6,
    "뵊뵋뵍뵎뵏뵑",
    6,
    "뵚",
    9,
    "뵥뵦뵧뵩",
    22,
    "붂붃붅붆붋",
    4,
    "붒붔붖붗붘붛붝",
    6,
    "붥",
    10,
    "붱",
    6,
    "붹",
    24
  ],
  [
    "9541",
    "뷒뷓뷖뷗뷙뷚뷛뷝",
    11,
    "뷪",
    5,
    "뷱"
  ],
  [
    "9561",
    "뷲뷳뷵뷶뷷뷹",
    6,
    "븁븂븄븆",
    5,
    "븎븏븑븒븓"
  ],
  [
    "9581",
    "븕",
    6,
    "븞븠",
    35,
    "빆빇빉빊빋빍빏",
    4,
    "빖빘빜빝빞빟빢빣빥빦빧빩빫",
    4,
    "빲빶",
    4,
    "빾빿뺁뺂뺃뺅",
    6,
    "뺎뺒",
    5,
    "뺚",
    13,
    "뺩",
    14
  ],
  [
    "9641",
    "뺸",
    23,
    "뻒뻓"
  ],
  [
    "9661",
    "뻕뻖뻙",
    6,
    "뻡뻢뻦",
    5,
    "뻭",
    8
  ],
  [
    "9681",
    "뻶",
    10,
    "뼂",
    5,
    "뼊",
    13,
    "뼚뼞",
    33,
    "뽂뽃뽅뽆뽇뽉",
    6,
    "뽒뽓뽔뽖",
    44
  ],
  [
    "9741",
    "뾃",
    16,
    "뾕",
    8
  ],
  [
    "9761",
    "뾞",
    17,
    "뾱",
    7
  ],
  [
    "9781",
    "뾹",
    11,
    "뿆",
    5,
    "뿎뿏뿑뿒뿓뿕",
    6,
    "뿝뿞뿠뿢",
    89,
    "쀽쀾쀿"
  ],
  [
    "9841",
    "쁀",
    16,
    "쁒",
    5,
    "쁙쁚쁛"
  ],
  [
    "9861",
    "쁝쁞쁟쁡",
    6,
    "쁪",
    15
  ],
  [
    "9881",
    "쁺",
    21,
    "삒삓삕삖삗삙",
    6,
    "삢삤삦",
    5,
    "삮삱삲삷",
    4,
    "삾샂샃샄샆샇샊샋샍샎샏샑",
    6,
    "샚샞",
    5,
    "샦샧샩샪샫샭",
    6,
    "샶샸샺",
    5,
    "섁섂섃섅섆섇섉",
    6,
    "섑섒섓섔섖",
    5,
    "섡섢섥섨섩섪섫섮"
  ],
  [
    "9941",
    "섲섳섴섵섷섺섻섽섾섿셁",
    6,
    "셊셎",
    5,
    "셖셗"
  ],
  [
    "9961",
    "셙셚셛셝",
    6,
    "셦셪",
    5,
    "셱셲셳셵셶셷셹셺셻"
  ],
  [
    "9981",
    "셼",
    8,
    "솆",
    5,
    "솏솑솒솓솕솗",
    4,
    "솞솠솢솣솤솦솧솪솫솭솮솯솱",
    11,
    "솾",
    5,
    "쇅쇆쇇쇉쇊쇋쇍",
    6,
    "쇕쇖쇙",
    6,
    "쇡쇢쇣쇥쇦쇧쇩",
    6,
    "쇲쇴",
    7,
    "쇾쇿숁숂숃숅",
    6,
    "숎숐숒",
    5,
    "숚숛숝숞숡숢숣"
  ],
  [
    "9a41",
    "숤숥숦숧숪숬숮숰숳숵",
    16
  ],
  [
    "9a61",
    "쉆쉇쉉",
    6,
    "쉒쉓쉕쉖쉗쉙",
    6,
    "쉡쉢쉣쉤쉦"
  ],
  [
    "9a81",
    "쉧",
    4,
    "쉮쉯쉱쉲쉳쉵",
    6,
    "쉾슀슂",
    5,
    "슊",
    5,
    "슑",
    6,
    "슙슚슜슞",
    5,
    "슦슧슩슪슫슮",
    5,
    "슶슸슺",
    33,
    "싞싟싡싢싥",
    5,
    "싮싰싲싳싴싵싷싺싽싾싿쌁",
    6,
    "쌊쌋쌎쌏"
  ],
  [
    "9b41",
    "쌐쌑쌒쌖쌗쌙쌚쌛쌝",
    6,
    "쌦쌧쌪",
    8
  ],
  [
    "9b61",
    "쌳",
    17,
    "썆",
    7
  ],
  [
    "9b81",
    "썎",
    25,
    "썪썫썭썮썯썱썳",
    4,
    "썺썻썾",
    5,
    "쎅쎆쎇쎉쎊쎋쎍",
    50,
    "쏁",
    22,
    "쏚"
  ],
  [
    "9c41",
    "쏛쏝쏞쏡쏣",
    4,
    "쏪쏫쏬쏮",
    5,
    "쏶쏷쏹",
    5
  ],
  [
    "9c61",
    "쏿",
    8,
    "쐉",
    6,
    "쐑",
    9
  ],
  [
    "9c81",
    "쐛",
    8,
    "쐥",
    6,
    "쐭쐮쐯쐱쐲쐳쐵",
    6,
    "쐾",
    9,
    "쑉",
    26,
    "쑦쑧쑩쑪쑫쑭",
    6,
    "쑶쑷쑸쑺",
    5,
    "쒁",
    18,
    "쒕",
    6,
    "쒝",
    12
  ],
  [
    "9d41",
    "쒪",
    13,
    "쒹쒺쒻쒽",
    8
  ],
  [
    "9d61",
    "쓆",
    25
  ],
  [
    "9d81",
    "쓠",
    8,
    "쓪",
    5,
    "쓲쓳쓵쓶쓷쓹쓻쓼쓽쓾씂",
    9,
    "씍씎씏씑씒씓씕",
    6,
    "씝",
    10,
    "씪씫씭씮씯씱",
    6,
    "씺씼씾",
    5,
    "앆앇앋앏앐앑앒앖앚앛앜앟앢앣앥앦앧앩",
    6,
    "앲앶",
    5,
    "앾앿얁얂얃얅얆얈얉얊얋얎얐얒얓얔"
  ],
  [
    "9e41",
    "얖얙얚얛얝얞얟얡",
    7,
    "얪",
    9,
    "얶"
  ],
  [
    "9e61",
    "얷얺얿",
    4,
    "엋엍엏엒엓엕엖엗엙",
    6,
    "엢엤엦엧"
  ],
  [
    "9e81",
    "엨엩엪엫엯엱엲엳엵엸엹엺엻옂옃옄옉옊옋옍옎옏옑",
    6,
    "옚옝",
    6,
    "옦옧옩옪옫옯옱옲옶옸옺옼옽옾옿왂왃왅왆왇왉",
    6,
    "왒왖",
    5,
    "왞왟왡",
    10,
    "왭왮왰왲",
    5,
    "왺왻왽왾왿욁",
    6,
    "욊욌욎",
    5,
    "욖욗욙욚욛욝",
    6,
    "욦"
  ],
  [
    "9f41",
    "욨욪",
    5,
    "욲욳욵욶욷욻",
    4,
    "웂웄웆",
    5,
    "웎"
  ],
  [
    "9f61",
    "웏웑웒웓웕",
    6,
    "웞웟웢",
    5,
    "웪웫웭웮웯웱웲"
  ],
  [
    "9f81",
    "웳",
    4,
    "웺웻웼웾",
    5,
    "윆윇윉윊윋윍",
    6,
    "윖윘윚",
    5,
    "윢윣윥윦윧윩",
    6,
    "윲윴윶윸윹윺윻윾윿읁읂읃읅",
    4,
    "읋읎읐읙읚읛읝읞읟읡",
    6,
    "읩읪읬",
    7,
    "읶읷읹읺읻읿잀잁잂잆잋잌잍잏잒잓잕잙잛",
    4,
    "잢잧",
    4,
    "잮잯잱잲잳잵잶잷"
  ],
  [
    "a041",
    "잸잹잺잻잾쟂",
    5,
    "쟊쟋쟍쟏쟑",
    6,
    "쟙쟚쟛쟜"
  ],
  [
    "a061",
    "쟞",
    5,
    "쟥쟦쟧쟩쟪쟫쟭",
    13
  ],
  [
    "a081",
    "쟻",
    4,
    "젂젃젅젆젇젉젋",
    4,
    "젒젔젗",
    4,
    "젞젟젡젢젣젥",
    6,
    "젮젰젲",
    5,
    "젹젺젻젽젾젿졁",
    6,
    "졊졋졎",
    5,
    "졕",
    26,
    "졲졳졵졶졷졹졻",
    4,
    "좂좄좈좉좊좎",
    5,
    "좕",
    7,
    "좞좠좢좣좤"
  ],
  [
    "a141",
    "좥좦좧좩",
    18,
    "좾좿죀죁"
  ],
  [
    "a161",
    "죂죃죅죆죇죉죊죋죍",
    6,
    "죖죘죚",
    5,
    "죢죣죥"
  ],
  [
    "a181",
    "죦",
    14,
    "죶",
    5,
    "죾죿줁줂줃줇",
    4,
    "줎　、。·‥…¨〃­―∥＼∼‘’“”〔〕〈",
    9,
    "±×÷≠≤≥∞∴°′″℃Å￠￡￥♂♀∠⊥⌒∂∇≡≒§※☆★○●◎◇◆□■△▲▽▼→←↑↓↔〓≪≫√∽∝∵∫∬∈∋⊆⊇⊂⊃∪∩∧∨￢"
  ],
  [
    "a241",
    "줐줒",
    5,
    "줙",
    18
  ],
  [
    "a261",
    "줭",
    6,
    "줵",
    18
  ],
  [
    "a281",
    "쥈",
    7,
    "쥒쥓쥕쥖쥗쥙",
    6,
    "쥢쥤",
    7,
    "쥭쥮쥯⇒⇔∀∃´～ˇ˘˝˚˙¸˛¡¿ː∮∑∏¤℉‰◁◀▷▶♤♠♡♥♧♣⊙◈▣◐◑▒▤▥▨▧▦▩♨☏☎☜☞¶†‡↕↗↙↖↘♭♩♪♬㉿㈜№㏇™㏂㏘℡€®"
  ],
  [
    "a341",
    "쥱쥲쥳쥵",
    6,
    "쥽",
    10,
    "즊즋즍즎즏"
  ],
  [
    "a361",
    "즑",
    6,
    "즚즜즞",
    16
  ],
  [
    "a381",
    "즯",
    16,
    "짂짃짅짆짉짋",
    4,
    "짒짔짗짘짛！",
    58,
    "￦］",
    32,
    "￣"
  ],
  [
    "a441",
    "짞짟짡짣짥짦짨짩짪짫짮짲",
    5,
    "짺짻짽짾짿쨁쨂쨃쨄"
  ],
  [
    "a461",
    "쨅쨆쨇쨊쨎",
    5,
    "쨕쨖쨗쨙",
    12
  ],
  [
    "a481",
    "쨦쨧쨨쨪",
    28,
    "ㄱ",
    93
  ],
  [
    "a541",
    "쩇",
    4,
    "쩎쩏쩑쩒쩓쩕",
    6,
    "쩞쩢",
    5,
    "쩩쩪"
  ],
  [
    "a561",
    "쩫",
    17,
    "쩾",
    5,
    "쪅쪆"
  ],
  [
    "a581",
    "쪇",
    16,
    "쪙",
    14,
    "ⅰ",
    9
  ],
  [
    "a5b0",
    "Ⅰ",
    9
  ],
  [
    "a5c1",
    "Α",
    16,
    "Σ",
    6
  ],
  [
    "a5e1",
    "α",
    16,
    "σ",
    6
  ],
  [
    "a641",
    "쪨",
    19,
    "쪾쪿쫁쫂쫃쫅"
  ],
  [
    "a661",
    "쫆",
    5,
    "쫎쫐쫒쫔쫕쫖쫗쫚",
    5,
    "쫡",
    6
  ],
  [
    "a681",
    "쫨쫩쫪쫫쫭",
    6,
    "쫵",
    18,
    "쬉쬊─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂┒┑┚┙┖┕┎┍┞┟┡┢┦┧┩┪┭┮┱┲┵┶┹┺┽┾╀╁╃",
    7
  ],
  [
    "a741",
    "쬋",
    4,
    "쬑쬒쬓쬕쬖쬗쬙",
    6,
    "쬢",
    7
  ],
  [
    "a761",
    "쬪",
    22,
    "쭂쭃쭄"
  ],
  [
    "a781",
    "쭅쭆쭇쭊쭋쭍쭎쭏쭑",
    6,
    "쭚쭛쭜쭞",
    5,
    "쭥",
    7,
    "㎕㎖㎗ℓ㎘㏄㎣㎤㎥㎦㎙",
    9,
    "㏊㎍㎎㎏㏏㎈㎉㏈㎧㎨㎰",
    9,
    "㎀",
    4,
    "㎺",
    5,
    "㎐",
    4,
    "Ω㏀㏁㎊㎋㎌㏖㏅㎭㎮㎯㏛㎩㎪㎫㎬㏝㏐㏓㏃㏉㏜㏆"
  ],
  [
    "a841",
    "쭭",
    10,
    "쭺",
    14
  ],
  [
    "a861",
    "쮉",
    18,
    "쮝",
    6
  ],
  [
    "a881",
    "쮤",
    19,
    "쮹",
    11,
    "ÆÐªĦ"
  ],
  [
    "a8a6",
    "Ĳ"
  ],
  [
    "a8a8",
    "ĿŁØŒºÞŦŊ"
  ],
  [
    "a8b1",
    "㉠",
    27,
    "ⓐ",
    25,
    "①",
    14,
    "½⅓⅔¼¾⅛⅜⅝⅞"
  ],
  [
    "a941",
    "쯅",
    14,
    "쯕",
    10
  ],
  [
    "a961",
    "쯠쯡쯢쯣쯥쯦쯨쯪",
    18
  ],
  [
    "a981",
    "쯽",
    14,
    "찎찏찑찒찓찕",
    6,
    "찞찟찠찣찤æđðħıĳĸŀłøœßþŧŋŉ㈀",
    27,
    "⒜",
    25,
    "⑴",
    14,
    "¹²³⁴ⁿ₁₂₃₄"
  ],
  [
    "aa41",
    "찥찦찪찫찭찯찱",
    6,
    "찺찿",
    4,
    "챆챇챉챊챋챍챎"
  ],
  [
    "aa61",
    "챏",
    4,
    "챖챚",
    5,
    "챡챢챣챥챧챩",
    6,
    "챱챲"
  ],
  [
    "aa81",
    "챳챴챶",
    29,
    "ぁ",
    82
  ],
  [
    "ab41",
    "첔첕첖첗첚첛첝첞첟첡",
    6,
    "첪첮",
    5,
    "첶첷첹"
  ],
  [
    "ab61",
    "첺첻첽",
    6,
    "쳆쳈쳊",
    5,
    "쳑쳒쳓쳕",
    5
  ],
  [
    "ab81",
    "쳛",
    8,
    "쳥",
    6,
    "쳭쳮쳯쳱",
    12,
    "ァ",
    85
  ],
  [
    "ac41",
    "쳾쳿촀촂",
    5,
    "촊촋촍촎촏촑",
    6,
    "촚촜촞촟촠"
  ],
  [
    "ac61",
    "촡촢촣촥촦촧촩촪촫촭",
    11,
    "촺",
    4
  ],
  [
    "ac81",
    "촿",
    28,
    "쵝쵞쵟А",
    5,
    "ЁЖ",
    25
  ],
  [
    "acd1",
    "а",
    5,
    "ёж",
    25
  ],
  [
    "ad41",
    "쵡쵢쵣쵥",
    6,
    "쵮쵰쵲",
    5,
    "쵹",
    7
  ],
  [
    "ad61",
    "춁",
    6,
    "춉",
    10,
    "춖춗춙춚춛춝춞춟"
  ],
  [
    "ad81",
    "춠춡춢춣춦춨춪",
    5,
    "춱",
    18,
    "췅"
  ],
  [
    "ae41",
    "췆",
    5,
    "췍췎췏췑",
    16
  ],
  [
    "ae61",
    "췢",
    5,
    "췩췪췫췭췮췯췱",
    6,
    "췺췼췾",
    4
  ],
  [
    "ae81",
    "츃츅츆츇츉츊츋츍",
    6,
    "츕츖츗츘츚",
    5,
    "츢츣츥츦츧츩츪츫"
  ],
  [
    "af41",
    "츬츭츮츯츲츴츶",
    19
  ],
  [
    "af61",
    "칊",
    13,
    "칚칛칝칞칢",
    5,
    "칪칬"
  ],
  [
    "af81",
    "칮",
    5,
    "칶칷칹칺칻칽",
    6,
    "캆캈캊",
    5,
    "캒캓캕캖캗캙"
  ],
  [
    "b041",
    "캚",
    5,
    "캢캦",
    5,
    "캮",
    12
  ],
  [
    "b061",
    "캻",
    5,
    "컂",
    19
  ],
  [
    "b081",
    "컖",
    13,
    "컦컧컩컪컭",
    6,
    "컶컺",
    5,
    "가각간갇갈갉갊감",
    7,
    "같",
    4,
    "갠갤갬갭갯갰갱갸갹갼걀걋걍걔걘걜거걱건걷걸걺검겁것겄겅겆겉겊겋게겐겔겜겝겟겠겡겨격겪견겯결겸겹겻겼경곁계곈곌곕곗고곡곤곧골곪곬곯곰곱곳공곶과곽관괄괆"
  ],
  [
    "b141",
    "켂켃켅켆켇켉",
    6,
    "켒켔켖",
    5,
    "켝켞켟켡켢켣"
  ],
  [
    "b161",
    "켥",
    6,
    "켮켲",
    5,
    "켹",
    11
  ],
  [
    "b181",
    "콅",
    14,
    "콖콗콙콚콛콝",
    6,
    "콦콨콪콫콬괌괍괏광괘괜괠괩괬괭괴괵괸괼굄굅굇굉교굔굘굡굣구국군굳굴굵굶굻굼굽굿궁궂궈궉권궐궜궝궤궷귀귁귄귈귐귑귓규균귤그극근귿글긁금급긋긍긔기긱긴긷길긺김깁깃깅깆깊까깍깎깐깔깖깜깝깟깠깡깥깨깩깬깰깸"
  ],
  [
    "b241",
    "콭콮콯콲콳콵콶콷콹",
    6,
    "쾁쾂쾃쾄쾆",
    5,
    "쾍"
  ],
  [
    "b261",
    "쾎",
    18,
    "쾢",
    5,
    "쾩"
  ],
  [
    "b281",
    "쾪",
    5,
    "쾱",
    18,
    "쿅",
    6,
    "깹깻깼깽꺄꺅꺌꺼꺽꺾껀껄껌껍껏껐껑께껙껜껨껫껭껴껸껼꼇꼈꼍꼐꼬꼭꼰꼲꼴꼼꼽꼿꽁꽂꽃꽈꽉꽐꽜꽝꽤꽥꽹꾀꾄꾈꾐꾑꾕꾜꾸꾹꾼꿀꿇꿈꿉꿋꿍꿎꿔꿜꿨꿩꿰꿱꿴꿸뀀뀁뀄뀌뀐뀔뀜뀝뀨끄끅끈끊끌끎끓끔끕끗끙"
  ],
  [
    "b341",
    "쿌",
    19,
    "쿢쿣쿥쿦쿧쿩"
  ],
  [
    "b361",
    "쿪",
    5,
    "쿲쿴쿶",
    5,
    "쿽쿾쿿퀁퀂퀃퀅",
    5
  ],
  [
    "b381",
    "퀋",
    5,
    "퀒",
    5,
    "퀙",
    19,
    "끝끼끽낀낄낌낍낏낑나낙낚난낟날낡낢남납낫",
    4,
    "낱낳내낵낸낼냄냅냇냈냉냐냑냔냘냠냥너넉넋넌널넒넓넘넙넛넜넝넣네넥넨넬넴넵넷넸넹녀녁년녈념녑녔녕녘녜녠노녹논놀놂놈놉놋농높놓놔놘놜놨뇌뇐뇔뇜뇝"
  ],
  [
    "b441",
    "퀮",
    5,
    "퀶퀷퀹퀺퀻퀽",
    6,
    "큆큈큊",
    5
  ],
  [
    "b461",
    "큑큒큓큕큖큗큙",
    6,
    "큡",
    10,
    "큮큯"
  ],
  [
    "b481",
    "큱큲큳큵",
    6,
    "큾큿킀킂",
    18,
    "뇟뇨뇩뇬뇰뇹뇻뇽누눅눈눋눌눔눕눗눙눠눴눼뉘뉜뉠뉨뉩뉴뉵뉼늄늅늉느늑는늘늙늚늠늡늣능늦늪늬늰늴니닉닌닐닒님닙닛닝닢다닥닦단닫",
    4,
    "닳담답닷",
    4,
    "닿대댁댄댈댐댑댓댔댕댜더덕덖던덛덜덞덟덤덥"
  ],
  [
    "b541",
    "킕",
    14,
    "킦킧킩킪킫킭",
    5
  ],
  [
    "b561",
    "킳킶킸킺",
    5,
    "탂탃탅탆탇탊",
    5,
    "탒탖",
    4
  ],
  [
    "b581",
    "탛탞탟탡탢탣탥",
    6,
    "탮탲",
    5,
    "탹",
    11,
    "덧덩덫덮데덱덴델뎀뎁뎃뎄뎅뎌뎐뎔뎠뎡뎨뎬도독돈돋돌돎돐돔돕돗동돛돝돠돤돨돼됐되된될됨됩됫됴두둑둔둘둠둡둣둥둬뒀뒈뒝뒤뒨뒬뒵뒷뒹듀듄듈듐듕드득든듣들듦듬듭듯등듸디딕딘딛딜딤딥딧딨딩딪따딱딴딸"
  ],
  [
    "b641",
    "턅",
    7,
    "턎",
    17
  ],
  [
    "b661",
    "턠",
    15,
    "턲턳턵턶턷턹턻턼턽턾"
  ],
  [
    "b681",
    "턿텂텆",
    5,
    "텎텏텑텒텓텕",
    6,
    "텞텠텢",
    5,
    "텩텪텫텭땀땁땃땄땅땋때땍땐땔땜땝땟땠땡떠떡떤떨떪떫떰떱떳떴떵떻떼떽뗀뗄뗌뗍뗏뗐뗑뗘뗬또똑똔똘똥똬똴뙈뙤뙨뚜뚝뚠뚤뚫뚬뚱뛔뛰뛴뛸뜀뜁뜅뜨뜩뜬뜯뜰뜸뜹뜻띄띈띌띔띕띠띤띨띰띱띳띵라락란랄람랍랏랐랑랒랖랗"
  ],
  [
    "b741",
    "텮",
    13,
    "텽",
    6,
    "톅톆톇톉톊"
  ],
  [
    "b761",
    "톋",
    20,
    "톢톣톥톦톧"
  ],
  [
    "b781",
    "톩",
    6,
    "톲톴톶톷톸톹톻톽톾톿퇁",
    14,
    "래랙랜랠램랩랫랬랭랴략랸럇량러럭런럴럼럽럿렀렁렇레렉렌렐렘렙렛렝려력련렬렴렵렷렸령례롄롑롓로록론롤롬롭롯롱롸롼뢍뢨뢰뢴뢸룀룁룃룅료룐룔룝룟룡루룩룬룰룸룹룻룽뤄뤘뤠뤼뤽륀륄륌륏륑류륙륜률륨륩"
  ],
  [
    "b841",
    "퇐",
    7,
    "퇙",
    17
  ],
  [
    "b861",
    "퇫",
    8,
    "퇵퇶퇷퇹",
    13
  ],
  [
    "b881",
    "툈툊",
    5,
    "툑",
    24,
    "륫륭르륵른를름릅릇릉릊릍릎리릭린릴림립릿링마막만많",
    4,
    "맘맙맛망맞맡맣매맥맨맬맴맵맷맸맹맺먀먁먈먕머먹먼멀멂멈멉멋멍멎멓메멕멘멜멤멥멧멨멩며멱면멸몃몄명몇몌모목몫몬몰몲몸몹못몽뫄뫈뫘뫙뫼"
  ],
  [
    "b941",
    "툪툫툮툯툱툲툳툵",
    6,
    "툾퉀퉂",
    5,
    "퉉퉊퉋퉌"
  ],
  [
    "b961",
    "퉍",
    14,
    "퉝",
    6,
    "퉥퉦퉧퉨"
  ],
  [
    "b981",
    "퉩",
    22,
    "튂튃튅튆튇튉튊튋튌묀묄묍묏묑묘묜묠묩묫무묵묶문묻물묽묾뭄뭅뭇뭉뭍뭏뭐뭔뭘뭡뭣뭬뮈뮌뮐뮤뮨뮬뮴뮷므믄믈믐믓미믹민믿밀밂밈밉밋밌밍및밑바",
    4,
    "받",
    4,
    "밤밥밧방밭배백밴밸뱀뱁뱃뱄뱅뱉뱌뱍뱐뱝버벅번벋벌벎범법벗"
  ],
  [
    "ba41",
    "튍튎튏튒튓튔튖",
    5,
    "튝튞튟튡튢튣튥",
    6,
    "튭"
  ],
  [
    "ba61",
    "튮튯튰튲",
    5,
    "튺튻튽튾틁틃",
    4,
    "틊틌",
    5
  ],
  [
    "ba81",
    "틒틓틕틖틗틙틚틛틝",
    6,
    "틦",
    9,
    "틲틳틵틶틷틹틺벙벚베벡벤벧벨벰벱벳벴벵벼벽변별볍볏볐병볕볘볜보복볶본볼봄봅봇봉봐봔봤봬뵀뵈뵉뵌뵐뵘뵙뵤뵨부북분붇불붉붊붐붑붓붕붙붚붜붤붰붸뷔뷕뷘뷜뷩뷰뷴뷸븀븃븅브븍븐블븜븝븟비빅빈빌빎빔빕빗빙빚빛빠빡빤"
  ],
  [
    "bb41",
    "틻",
    4,
    "팂팄팆",
    5,
    "팏팑팒팓팕팗",
    4,
    "팞팢팣"
  ],
  [
    "bb61",
    "팤팦팧팪팫팭팮팯팱",
    6,
    "팺팾",
    5,
    "퍆퍇퍈퍉"
  ],
  [
    "bb81",
    "퍊",
    31,
    "빨빪빰빱빳빴빵빻빼빽뺀뺄뺌뺍뺏뺐뺑뺘뺙뺨뻐뻑뻔뻗뻘뻠뻣뻤뻥뻬뼁뼈뼉뼘뼙뼛뼜뼝뽀뽁뽄뽈뽐뽑뽕뾔뾰뿅뿌뿍뿐뿔뿜뿟뿡쀼쁑쁘쁜쁠쁨쁩삐삑삔삘삠삡삣삥사삭삯산삳살삵삶삼삽삿샀상샅새색샌샐샘샙샛샜생샤"
  ],
  [
    "bc41",
    "퍪",
    17,
    "퍾퍿펁펂펃펅펆펇"
  ],
  [
    "bc61",
    "펈펉펊펋펎펒",
    5,
    "펚펛펝펞펟펡",
    6,
    "펪펬펮"
  ],
  [
    "bc81",
    "펯",
    4,
    "펵펶펷펹펺펻펽",
    6,
    "폆폇폊",
    5,
    "폑",
    5,
    "샥샨샬샴샵샷샹섀섄섈섐섕서",
    4,
    "섣설섦섧섬섭섯섰성섶세섹센셀셈셉셋셌셍셔셕션셜셤셥셧셨셩셰셴셸솅소속솎손솔솖솜솝솟송솥솨솩솬솰솽쇄쇈쇌쇔쇗쇘쇠쇤쇨쇰쇱쇳쇼쇽숀숄숌숍숏숑수숙순숟술숨숩숫숭"
  ],
  [
    "bd41",
    "폗폙",
    7,
    "폢폤",
    7,
    "폮폯폱폲폳폵폶폷"
  ],
  [
    "bd61",
    "폸폹폺폻폾퐀퐂",
    5,
    "퐉",
    13
  ],
  [
    "bd81",
    "퐗",
    5,
    "퐞",
    25,
    "숯숱숲숴쉈쉐쉑쉔쉘쉠쉥쉬쉭쉰쉴쉼쉽쉿슁슈슉슐슘슛슝스슥슨슬슭슴습슷승시식신싣실싫심십싯싱싶싸싹싻싼쌀쌈쌉쌌쌍쌓쌔쌕쌘쌜쌤쌥쌨쌩썅써썩썬썰썲썸썹썼썽쎄쎈쎌쏀쏘쏙쏜쏟쏠쏢쏨쏩쏭쏴쏵쏸쐈쐐쐤쐬쐰"
  ],
  [
    "be41",
    "퐸",
    7,
    "푁푂푃푅",
    14
  ],
  [
    "be61",
    "푔",
    7,
    "푝푞푟푡푢푣푥",
    7,
    "푮푰푱푲"
  ],
  [
    "be81",
    "푳",
    4,
    "푺푻푽푾풁풃",
    4,
    "풊풌풎",
    5,
    "풕",
    8,
    "쐴쐼쐽쑈쑤쑥쑨쑬쑴쑵쑹쒀쒔쒜쒸쒼쓩쓰쓱쓴쓸쓺쓿씀씁씌씐씔씜씨씩씬씰씸씹씻씽아악안앉않알앍앎앓암압앗았앙앝앞애액앤앨앰앱앳앴앵야약얀얄얇얌얍얏양얕얗얘얜얠얩어억언얹얻얼얽얾엄",
    6,
    "엌엎"
  ],
  [
    "bf41",
    "풞",
    10,
    "풪",
    14
  ],
  [
    "bf61",
    "풹",
    18,
    "퓍퓎퓏퓑퓒퓓퓕"
  ],
  [
    "bf81",
    "퓖",
    5,
    "퓝퓞퓠",
    7,
    "퓩퓪퓫퓭퓮퓯퓱",
    6,
    "퓹퓺퓼에엑엔엘엠엡엣엥여역엮연열엶엷염",
    5,
    "옅옆옇예옌옐옘옙옛옜오옥온올옭옮옰옳옴옵옷옹옻와왁완왈왐왑왓왔왕왜왝왠왬왯왱외왹왼욀욈욉욋욍요욕욘욜욤욥욧용우욱운울욹욺움웁웃웅워웍원월웜웝웠웡웨"
  ],
  [
    "c041",
    "퓾",
    5,
    "픅픆픇픉픊픋픍",
    6,
    "픖픘",
    5
  ],
  [
    "c061",
    "픞",
    25
  ],
  [
    "c081",
    "픸픹픺픻픾픿핁핂핃핅",
    6,
    "핎핐핒",
    5,
    "핚핛핝핞핟핡핢핣웩웬웰웸웹웽위윅윈윌윔윕윗윙유육윤율윰윱윳융윷으윽은을읊음읍읏응",
    7,
    "읜읠읨읫이익인일읽읾잃임입잇있잉잊잎자작잔잖잗잘잚잠잡잣잤장잦재잭잰잴잼잽잿쟀쟁쟈쟉쟌쟎쟐쟘쟝쟤쟨쟬저적전절젊"
  ],
  [
    "c141",
    "핤핦핧핪핬핮",
    5,
    "핶핷핹핺핻핽",
    6,
    "햆햊햋"
  ],
  [
    "c161",
    "햌햍햎햏햑",
    19,
    "햦햧"
  ],
  [
    "c181",
    "햨",
    31,
    "점접젓정젖제젝젠젤젬젭젯젱져젼졀졈졉졌졍졔조족존졸졺좀좁좃종좆좇좋좌좍좔좝좟좡좨좼좽죄죈죌죔죕죗죙죠죡죤죵주죽준줄줅줆줌줍줏중줘줬줴쥐쥑쥔쥘쥠쥡쥣쥬쥰쥴쥼즈즉즌즐즘즙즛증지직진짇질짊짐집짓"
  ],
  [
    "c241",
    "헊헋헍헎헏헑헓",
    4,
    "헚헜헞",
    5,
    "헦헧헩헪헫헭헮"
  ],
  [
    "c261",
    "헯",
    4,
    "헶헸헺",
    5,
    "혂혃혅혆혇혉",
    6,
    "혒"
  ],
  [
    "c281",
    "혖",
    5,
    "혝혞혟혡혢혣혥",
    7,
    "혮",
    9,
    "혺혻징짖짙짚짜짝짠짢짤짧짬짭짯짰짱째짹짼쨀쨈쨉쨋쨌쨍쨔쨘쨩쩌쩍쩐쩔쩜쩝쩟쩠쩡쩨쩽쪄쪘쪼쪽쫀쫄쫌쫍쫏쫑쫓쫘쫙쫠쫬쫴쬈쬐쬔쬘쬠쬡쭁쭈쭉쭌쭐쭘쭙쭝쭤쭸쭹쮜쮸쯔쯤쯧쯩찌찍찐찔찜찝찡찢찧차착찬찮찰참찹찻"
  ],
  [
    "c341",
    "혽혾혿홁홂홃홄홆홇홊홌홎홏홐홒홓홖홗홙홚홛홝",
    4
  ],
  [
    "c361",
    "홢",
    4,
    "홨홪",
    5,
    "홲홳홵",
    11
  ],
  [
    "c381",
    "횁횂횄횆",
    5,
    "횎횏횑횒횓횕",
    7,
    "횞횠횢",
    5,
    "횩횪찼창찾채책챈챌챔챕챗챘챙챠챤챦챨챰챵처척천철첨첩첫첬청체첵첸첼쳄쳅쳇쳉쳐쳔쳤쳬쳰촁초촉촌촐촘촙촛총촤촨촬촹최쵠쵤쵬쵭쵯쵱쵸춈추축춘출춤춥춧충춰췄췌췐취췬췰췸췹췻췽츄츈츌츔츙츠측츤츨츰츱츳층"
  ],
  [
    "c441",
    "횫횭횮횯횱",
    7,
    "횺횼",
    7,
    "훆훇훉훊훋"
  ],
  [
    "c461",
    "훍훎훏훐훒훓훕훖훘훚",
    5,
    "훡훢훣훥훦훧훩",
    4
  ],
  [
    "c481",
    "훮훯훱훲훳훴훶",
    5,
    "훾훿휁휂휃휅",
    11,
    "휒휓휔치칙친칟칠칡침칩칫칭카칵칸칼캄캅캇캉캐캑캔캘캠캡캣캤캥캬캭컁커컥컨컫컬컴컵컷컸컹케켁켄켈켐켑켓켕켜켠켤켬켭켯켰켱켸코콕콘콜콤콥콧콩콰콱콴콸쾀쾅쾌쾡쾨쾰쿄쿠쿡쿤쿨쿰쿱쿳쿵쿼퀀퀄퀑퀘퀭퀴퀵퀸퀼"
  ],
  [
    "c541",
    "휕휖휗휚휛휝휞휟휡",
    6,
    "휪휬휮",
    5,
    "휶휷휹"
  ],
  [
    "c561",
    "휺휻휽",
    6,
    "흅흆흈흊",
    5,
    "흒흓흕흚",
    4
  ],
  [
    "c581",
    "흟흢흤흦흧흨흪흫흭흮흯흱흲흳흵",
    6,
    "흾흿힀힂",
    5,
    "힊힋큄큅큇큉큐큔큘큠크큭큰클큼큽킁키킥킨킬킴킵킷킹타탁탄탈탉탐탑탓탔탕태택탠탤탬탭탯탰탱탸턍터턱턴털턺텀텁텃텄텅테텍텐텔템텝텟텡텨텬텼톄톈토톡톤톨톰톱톳통톺톼퇀퇘퇴퇸툇툉툐투툭툰툴툼툽툿퉁퉈퉜"
  ],
  [
    "c641",
    "힍힎힏힑",
    6,
    "힚힜힞",
    5
  ],
  [
    "c6a1",
    "퉤튀튁튄튈튐튑튕튜튠튤튬튱트특튼튿틀틂틈틉틋틔틘틜틤틥티틱틴틸팀팁팃팅파팍팎판팔팖팜팝팟팠팡팥패팩팬팰팸팹팻팼팽퍄퍅퍼퍽펀펄펌펍펏펐펑페펙펜펠펨펩펫펭펴편펼폄폅폈평폐폘폡폣포폭폰폴폼폽폿퐁"
  ],
  [
    "c7a1",
    "퐈퐝푀푄표푠푤푭푯푸푹푼푿풀풂품풉풋풍풔풩퓌퓐퓔퓜퓟퓨퓬퓰퓸퓻퓽프픈플픔픕픗피픽핀필핌핍핏핑하학한할핥함합핫항해핵핸핼햄햅햇했행햐향허헉헌헐헒험헙헛헝헤헥헨헬헴헵헷헹혀혁현혈혐협혓혔형혜혠"
  ],
  [
    "c8a1",
    "혤혭호혹혼홀홅홈홉홋홍홑화확환활홧황홰홱홴횃횅회획횐횔횝횟횡효횬횰횹횻후훅훈훌훑훔훗훙훠훤훨훰훵훼훽휀휄휑휘휙휜휠휨휩휫휭휴휵휸휼흄흇흉흐흑흔흖흗흘흙흠흡흣흥흩희흰흴흼흽힁히힉힌힐힘힙힛힝"
  ],
  [
    "caa1",
    "伽佳假價加可呵哥嘉嫁家暇架枷柯歌珂痂稼苛茄街袈訶賈跏軻迦駕刻却各恪慤殼珏脚覺角閣侃刊墾奸姦干幹懇揀杆柬桿澗癎看磵稈竿簡肝艮艱諫間乫喝曷渴碣竭葛褐蝎鞨勘坎堪嵌感憾戡敢柑橄減甘疳監瞰紺邯鑑鑒龕"
  ],
  [
    "cba1",
    "匣岬甲胛鉀閘剛堈姜岡崗康强彊慷江畺疆糠絳綱羌腔舡薑襁講鋼降鱇介价個凱塏愷愾慨改槪漑疥皆盖箇芥蓋豈鎧開喀客坑更粳羹醵倨去居巨拒据據擧渠炬祛距踞車遽鉅鋸乾件健巾建愆楗腱虔蹇鍵騫乞傑杰桀儉劍劒檢"
  ],
  [
    "cca1",
    "瞼鈐黔劫怯迲偈憩揭擊格檄激膈覡隔堅牽犬甄絹繭肩見譴遣鵑抉決潔結缺訣兼慊箝謙鉗鎌京俓倞傾儆勁勍卿坰境庚徑慶憬擎敬景暻更梗涇炅烱璟璥瓊痙硬磬竟競絅經耕耿脛莖警輕逕鏡頃頸驚鯨係啓堺契季屆悸戒桂械"
  ],
  [
    "cda1",
    "棨溪界癸磎稽系繫繼計誡谿階鷄古叩告呱固姑孤尻庫拷攷故敲暠枯槁沽痼皐睾稿羔考股膏苦苽菰藁蠱袴誥賈辜錮雇顧高鼓哭斛曲梏穀谷鵠困坤崑昆梱棍滾琨袞鯤汨滑骨供公共功孔工恐恭拱控攻珙空蚣貢鞏串寡戈果瓜"
  ],
  [
    "cea1",
    "科菓誇課跨過鍋顆廓槨藿郭串冠官寬慣棺款灌琯瓘管罐菅觀貫關館刮恝括适侊光匡壙廣曠洸炚狂珖筐胱鑛卦掛罫乖傀塊壞怪愧拐槐魁宏紘肱轟交僑咬喬嬌嶠巧攪敎校橋狡皎矯絞翹膠蕎蛟較轎郊餃驕鮫丘久九仇俱具勾"
  ],
  [
    "cfa1",
    "區口句咎嘔坵垢寇嶇廐懼拘救枸柩構歐毆毬求溝灸狗玖球瞿矩究絿耉臼舅舊苟衢謳購軀逑邱鉤銶駒驅鳩鷗龜國局菊鞠鞫麴君窘群裙軍郡堀屈掘窟宮弓穹窮芎躬倦券勸卷圈拳捲權淃眷厥獗蕨蹶闕机櫃潰詭軌饋句晷歸貴"
  ],
  [
    "d0a1",
    "鬼龜叫圭奎揆槻珪硅窺竅糾葵規赳逵閨勻均畇筠菌鈞龜橘克剋劇戟棘極隙僅劤勤懃斤根槿瑾筋芹菫覲謹近饉契今妗擒昑檎琴禁禽芩衾衿襟金錦伋及急扱汲級給亘兢矜肯企伎其冀嗜器圻基埼夔奇妓寄岐崎己幾忌技旗旣"
  ],
  [
    "d1a1",
    "朞期杞棋棄機欺氣汽沂淇玘琦琪璂璣畸畿碁磯祁祇祈祺箕紀綺羈耆耭肌記譏豈起錡錤飢饑騎騏驥麒緊佶吉拮桔金喫儺喇奈娜懦懶拏拿癩",
    5,
    "那樂",
    4,
    "諾酪駱亂卵暖欄煖爛蘭難鸞捏捺南嵐枏楠湳濫男藍襤拉"
  ],
  [
    "d2a1",
    "納臘蠟衲囊娘廊",
    4,
    "乃來內奈柰耐冷女年撚秊念恬拈捻寧寗努勞奴弩怒擄櫓爐瑙盧",
    5,
    "駑魯",
    10,
    "濃籠聾膿農惱牢磊腦賂雷尿壘",
    7,
    "嫩訥杻紐勒",
    5,
    "能菱陵尼泥匿溺多茶"
  ],
  [
    "d3a1",
    "丹亶但單團壇彖斷旦檀段湍短端簞緞蛋袒鄲鍛撻澾獺疸達啖坍憺擔曇淡湛潭澹痰聃膽蕁覃談譚錟沓畓答踏遝唐堂塘幢戇撞棠當糖螳黨代垈坮大對岱帶待戴擡玳臺袋貸隊黛宅德悳倒刀到圖堵塗導屠島嶋度徒悼挑掉搗桃"
  ],
  [
    "d4a1",
    "棹櫂淘渡滔濤燾盜睹禱稻萄覩賭跳蹈逃途道都鍍陶韜毒瀆牘犢獨督禿篤纛讀墩惇敦旽暾沌焞燉豚頓乭突仝冬凍動同憧東桐棟洞潼疼瞳童胴董銅兜斗杜枓痘竇荳讀豆逗頭屯臀芚遁遯鈍得嶝橙燈登等藤謄鄧騰喇懶拏癩羅"
  ],
  [
    "d5a1",
    "蘿螺裸邏樂洛烙珞絡落諾酪駱丹亂卵欄欒瀾爛蘭鸞剌辣嵐擥攬欖濫籃纜藍襤覽拉臘蠟廊朗浪狼琅瑯螂郞來崍徠萊冷掠略亮倆兩凉梁樑粮粱糧良諒輛量侶儷勵呂廬慮戾旅櫚濾礪藜蠣閭驢驪麗黎力曆歷瀝礫轢靂憐戀攣漣"
  ],
  [
    "d6a1",
    "煉璉練聯蓮輦連鍊冽列劣洌烈裂廉斂殮濂簾獵令伶囹寧岺嶺怜玲笭羚翎聆逞鈴零靈領齡例澧禮醴隷勞怒撈擄櫓潞瀘爐盧老蘆虜路輅露魯鷺鹵碌祿綠菉錄鹿麓論壟弄朧瀧瓏籠聾儡瀨牢磊賂賚賴雷了僚寮廖料燎療瞭聊蓼"
  ],
  [
    "d7a1",
    "遼鬧龍壘婁屢樓淚漏瘻累縷蔞褸鏤陋劉旒柳榴流溜瀏琉瑠留瘤硫謬類六戮陸侖倫崙淪綸輪律慄栗率隆勒肋凜凌楞稜綾菱陵俚利厘吏唎履悧李梨浬犁狸理璃異痢籬罹羸莉裏裡里釐離鯉吝潾燐璘藺躪隣鱗麟林淋琳臨霖砬"
  ],
  [
    "d8a1",
    "立笠粒摩瑪痲碼磨馬魔麻寞幕漠膜莫邈万卍娩巒彎慢挽晩曼滿漫灣瞞萬蔓蠻輓饅鰻唜抹末沫茉襪靺亡妄忘忙望網罔芒茫莽輞邙埋妹媒寐昧枚梅每煤罵買賣邁魅脈貊陌驀麥孟氓猛盲盟萌冪覓免冕勉棉沔眄眠綿緬面麵滅"
  ],
  [
    "d9a1",
    "蔑冥名命明暝椧溟皿瞑茗蓂螟酩銘鳴袂侮冒募姆帽慕摸摹暮某模母毛牟牡瑁眸矛耗芼茅謀謨貌木沐牧目睦穆鶩歿沒夢朦蒙卯墓妙廟描昴杳渺猫竗苗錨務巫憮懋戊拇撫无楙武毋無珷畝繆舞茂蕪誣貿霧鵡墨默們刎吻問文"
  ],
  [
    "daa1",
    "汶紊紋聞蚊門雯勿沕物味媚尾嵋彌微未梶楣渼湄眉米美薇謎迷靡黴岷悶愍憫敏旻旼民泯玟珉緡閔密蜜謐剝博拍搏撲朴樸泊珀璞箔粕縛膊舶薄迫雹駁伴半反叛拌搬攀斑槃泮潘班畔瘢盤盼磐磻礬絆般蟠返頒飯勃拔撥渤潑"
  ],
  [
    "dba1",
    "發跋醱鉢髮魃倣傍坊妨尨幇彷房放方旁昉枋榜滂磅紡肪膀舫芳蒡蚌訪謗邦防龐倍俳北培徘拜排杯湃焙盃背胚裴裵褙賠輩配陪伯佰帛柏栢白百魄幡樊煩燔番磻繁蕃藩飜伐筏罰閥凡帆梵氾汎泛犯範范法琺僻劈壁擘檗璧癖"
  ],
  [
    "dca1",
    "碧蘗闢霹便卞弁變辨辯邊別瞥鱉鼈丙倂兵屛幷昞昺柄棅炳甁病秉竝輧餠騈保堡報寶普步洑湺潽珤甫菩補褓譜輔伏僕匐卜宓復服福腹茯蔔複覆輹輻馥鰒本乶俸奉封峯峰捧棒烽熢琫縫蓬蜂逢鋒鳳不付俯傅剖副否咐埠夫婦"
  ],
  [
    "dda1",
    "孚孵富府復扶敷斧浮溥父符簿缶腐腑膚艀芙莩訃負賦賻赴趺部釜阜附駙鳧北分吩噴墳奔奮忿憤扮昐汾焚盆粉糞紛芬賁雰不佛弗彿拂崩朋棚硼繃鵬丕備匕匪卑妃婢庇悲憊扉批斐枇榧比毖毗毘沸泌琵痺砒碑秕秘粃緋翡肥"
  ],
  [
    "dea1",
    "脾臂菲蜚裨誹譬費鄙非飛鼻嚬嬪彬斌檳殯浜濱瀕牝玭貧賓頻憑氷聘騁乍事些仕伺似使俟僿史司唆嗣四士奢娑寫寺射巳師徙思捨斜斯柶査梭死沙泗渣瀉獅砂社祀祠私篩紗絲肆舍莎蓑蛇裟詐詞謝賜赦辭邪飼駟麝削數朔索"
  ],
  [
    "dfa1",
    "傘刪山散汕珊産疝算蒜酸霰乷撒殺煞薩三參杉森渗芟蔘衫揷澁鈒颯上傷像償商喪嘗孀尙峠常床庠廂想桑橡湘爽牀狀相祥箱翔裳觴詳象賞霜塞璽賽嗇塞穡索色牲生甥省笙墅壻嶼序庶徐恕抒捿敍暑曙書栖棲犀瑞筮絮緖署"
  ],
  [
    "e0a1",
    "胥舒薯西誓逝鋤黍鼠夕奭席惜昔晳析汐淅潟石碩蓆釋錫仙僊先善嬋宣扇敾旋渲煽琁瑄璇璿癬禪線繕羨腺膳船蘚蟬詵跣選銑鐥饍鮮卨屑楔泄洩渫舌薛褻設說雪齧剡暹殲纖蟾贍閃陝攝涉燮葉城姓宬性惺成星晟猩珹盛省筬"
  ],
  [
    "e1a1",
    "聖聲腥誠醒世勢歲洗稅笹細說貰召嘯塑宵小少巢所掃搔昭梳沼消溯瀟炤燒甦疏疎瘙笑篠簫素紹蔬蕭蘇訴逍遡邵銷韶騷俗屬束涑粟續謖贖速孫巽損蓀遜飡率宋悚松淞訟誦送頌刷殺灑碎鎖衰釗修受嗽囚垂壽嫂守岫峀帥愁"
  ],
  [
    "e2a1",
    "戍手授搜收數樹殊水洙漱燧狩獸琇璲瘦睡秀穗竪粹綏綬繡羞脩茱蒐蓚藪袖誰讐輸遂邃酬銖銹隋隧隨雖需須首髓鬚叔塾夙孰宿淑潚熟琡璹肅菽巡徇循恂旬栒楯橓殉洵淳珣盾瞬筍純脣舜荀蓴蕣詢諄醇錞順馴戌術述鉥崇崧"
  ],
  [
    "e3a1",
    "嵩瑟膝蝨濕拾習褶襲丞乘僧勝升承昇繩蠅陞侍匙嘶始媤尸屎屍市弑恃施是時枾柴猜矢示翅蒔蓍視試詩諡豕豺埴寔式息拭植殖湜熄篒蝕識軾食飾伸侁信呻娠宸愼新晨燼申神紳腎臣莘薪藎蜃訊身辛辰迅失室實悉審尋心沁"
  ],
  [
    "e4a1",
    "沈深瀋甚芯諶什十拾雙氏亞俄兒啞娥峨我牙芽莪蛾衙訝阿雅餓鴉鵝堊岳嶽幄惡愕握樂渥鄂鍔顎鰐齷安岸按晏案眼雁鞍顔鮟斡謁軋閼唵岩巖庵暗癌菴闇壓押狎鴨仰央怏昻殃秧鴦厓哀埃崖愛曖涯碍艾隘靄厄扼掖液縊腋額"
  ],
  [
    "e5a1",
    "櫻罌鶯鸚也倻冶夜惹揶椰爺耶若野弱掠略約若葯蒻藥躍亮佯兩凉壤孃恙揚攘敭暘梁楊樣洋瀁煬痒瘍禳穰糧羊良襄諒讓釀陽量養圄御於漁瘀禦語馭魚齬億憶抑檍臆偃堰彦焉言諺孼蘖俺儼嚴奄掩淹嶪業円予余勵呂女如廬"
  ],
  [
    "e6a1",
    "旅歟汝濾璵礖礪與艅茹輿轝閭餘驪麗黎亦力域役易曆歷疫繹譯轢逆驛嚥堧姸娟宴年延憐戀捐挻撚椽沇沿涎涓淵演漣烟然煙煉燃燕璉硏硯秊筵緣練縯聯衍軟輦蓮連鉛鍊鳶列劣咽悅涅烈熱裂說閱厭廉念捻染殮炎焰琰艶苒"
  ],
  [
    "e7a1",
    "簾閻髥鹽曄獵燁葉令囹塋寧嶺嶸影怜映暎楹榮永泳渶潁濚瀛瀯煐營獰玲瑛瑩瓔盈穎纓羚聆英詠迎鈴鍈零霙靈領乂倪例刈叡曳汭濊猊睿穢芮藝蘂禮裔詣譽豫醴銳隸霓預五伍俉傲午吾吳嗚塢墺奧娛寤悟惡懊敖旿晤梧汚澳"
  ],
  [
    "e8a1",
    "烏熬獒筽蜈誤鰲鼇屋沃獄玉鈺溫瑥瘟穩縕蘊兀壅擁瓮甕癰翁邕雍饔渦瓦窩窪臥蛙蝸訛婉完宛梡椀浣玩琓琬碗緩翫脘腕莞豌阮頑曰往旺枉汪王倭娃歪矮外嵬巍猥畏了僚僥凹堯夭妖姚寥寮尿嶢拗搖撓擾料曜樂橈燎燿瑤療"
  ],
  [
    "e9a1",
    "窈窯繇繞耀腰蓼蟯要謠遙遼邀饒慾欲浴縟褥辱俑傭冗勇埇墉容庸慂榕涌湧溶熔瑢用甬聳茸蓉踊鎔鏞龍于佑偶優又友右宇寓尤愚憂旴牛玗瑀盂祐禑禹紆羽芋藕虞迂遇郵釪隅雨雩勖彧旭昱栯煜稶郁頊云暈橒殞澐熉耘芸蕓"
  ],
  [
    "eaa1",
    "運隕雲韻蔚鬱亐熊雄元原員圓園垣媛嫄寃怨愿援沅洹湲源爰猿瑗苑袁轅遠阮院願鴛月越鉞位偉僞危圍委威尉慰暐渭爲瑋緯胃萎葦蔿蝟衛褘謂違韋魏乳侑儒兪劉唯喩孺宥幼幽庾悠惟愈愉揄攸有杻柔柚柳楡楢油洧流游溜"
  ],
  [
    "eba1",
    "濡猶猷琉瑜由留癒硫紐維臾萸裕誘諛諭踰蹂遊逾遺酉釉鍮類六堉戮毓肉育陸倫允奫尹崙淪潤玧胤贇輪鈗閏律慄栗率聿戎瀜絨融隆垠恩慇殷誾銀隱乙吟淫蔭陰音飮揖泣邑凝應膺鷹依倚儀宜意懿擬椅毅疑矣義艤薏蟻衣誼"
  ],
  [
    "eca1",
    "議醫二以伊利吏夷姨履已弛彛怡易李梨泥爾珥理異痍痢移罹而耳肄苡荑裏裡貽貳邇里離飴餌匿溺瀷益翊翌翼謚人仁刃印吝咽因姻寅引忍湮燐璘絪茵藺蚓認隣靭靷鱗麟一佚佾壹日溢逸鎰馹任壬妊姙恁林淋稔臨荏賃入卄"
  ],
  [
    "eda1",
    "立笠粒仍剩孕芿仔刺咨姉姿子字孜恣慈滋炙煮玆瓷疵磁紫者自茨蔗藉諮資雌作勺嚼斫昨灼炸爵綽芍酌雀鵲孱棧殘潺盞岑暫潛箴簪蠶雜丈仗匠場墻壯奬將帳庄張掌暲杖樟檣欌漿牆狀獐璋章粧腸臟臧莊葬蔣薔藏裝贓醬長"
  ],
  [
    "eea1",
    "障再哉在宰才材栽梓渽滓災縡裁財載齋齎爭箏諍錚佇低儲咀姐底抵杵楮樗沮渚狙猪疽箸紵苧菹著藷詛貯躇這邸雎齟勣吊嫡寂摘敵滴狄炙的積笛籍績翟荻謫賊赤跡蹟迪迹適鏑佃佺傳全典前剪塡塼奠專展廛悛戰栓殿氈澱"
  ],
  [
    "efa1",
    "煎琠田甸畑癲筌箋箭篆纏詮輾轉鈿銓錢鐫電顚顫餞切截折浙癤竊節絶占岾店漸点粘霑鮎點接摺蝶丁井亭停偵呈姃定幀庭廷征情挺政整旌晶晸柾楨檉正汀淀淨渟湞瀞炡玎珽町睛碇禎程穽精綎艇訂諪貞鄭酊釘鉦鋌錠霆靖"
  ],
  [
    "f0a1",
    "靜頂鼎制劑啼堤帝弟悌提梯濟祭第臍薺製諸蹄醍除際霽題齊俎兆凋助嘲弔彫措操早晁曺曹朝條棗槽漕潮照燥爪璪眺祖祚租稠窕粗糟組繰肇藻蚤詔調趙躁造遭釣阻雕鳥族簇足鏃存尊卒拙猝倧宗從悰慫棕淙琮種終綜縱腫"
  ],
  [
    "f1a1",
    "踪踵鍾鐘佐坐左座挫罪主住侏做姝胄呪周嗾奏宙州廚晝朱柱株注洲湊澍炷珠疇籌紂紬綢舟蛛註誅走躊輳週酎酒鑄駐竹粥俊儁准埈寯峻晙樽浚準濬焌畯竣蠢逡遵雋駿茁中仲衆重卽櫛楫汁葺增憎曾拯烝甑症繒蒸證贈之只"
  ],
  [
    "f2a1",
    "咫地址志持指摯支旨智枝枳止池沚漬知砥祉祗紙肢脂至芝芷蜘誌識贄趾遲直稙稷織職唇嗔塵振搢晉晋桭榛殄津溱珍瑨璡畛疹盡眞瞋秦縉縝臻蔯袗診賑軫辰進鎭陣陳震侄叱姪嫉帙桎瓆疾秩窒膣蛭質跌迭斟朕什執潗緝輯"
  ],
  [
    "f3a1",
    "鏶集徵懲澄且侘借叉嗟嵯差次此磋箚茶蹉車遮捉搾着窄錯鑿齪撰澯燦璨瓚竄簒纂粲纘讚贊鑽餐饌刹察擦札紮僭參塹慘慙懺斬站讒讖倉倡創唱娼廠彰愴敞昌昶暢槍滄漲猖瘡窓脹艙菖蒼債埰寀寨彩採砦綵菜蔡采釵冊柵策"
  ],
  [
    "f4a1",
    "責凄妻悽處倜刺剔尺慽戚拓擲斥滌瘠脊蹠陟隻仟千喘天川擅泉淺玔穿舛薦賤踐遷釧闡阡韆凸哲喆徹撤澈綴輟轍鐵僉尖沾添甛瞻簽籤詹諂堞妾帖捷牒疊睫諜貼輒廳晴淸聽菁請靑鯖切剃替涕滯締諦逮遞體初剿哨憔抄招梢"
  ],
  [
    "f5a1",
    "椒楚樵炒焦硝礁礎秒稍肖艸苕草蕉貂超酢醋醮促囑燭矗蜀觸寸忖村邨叢塚寵悤憁摠總聰蔥銃撮催崔最墜抽推椎楸樞湫皺秋芻萩諏趨追鄒酋醜錐錘鎚雛騶鰍丑畜祝竺筑築縮蓄蹙蹴軸逐春椿瑃出朮黜充忠沖蟲衝衷悴膵萃"
  ],
  [
    "f6a1",
    "贅取吹嘴娶就炊翠聚脆臭趣醉驟鷲側仄厠惻測層侈値嗤峙幟恥梔治淄熾痔痴癡稚穉緇緻置致蚩輜雉馳齒則勅飭親七柒漆侵寢枕沈浸琛砧針鍼蟄秤稱快他咤唾墮妥惰打拖朶楕舵陀馱駝倬卓啄坼度托拓擢晫柝濁濯琢琸託"
  ],
  [
    "f7a1",
    "鐸呑嘆坦彈憚歎灘炭綻誕奪脫探眈耽貪塔搭榻宕帑湯糖蕩兌台太怠態殆汰泰笞胎苔跆邰颱宅擇澤撑攄兎吐土討慟桶洞痛筒統通堆槌腿褪退頹偸套妬投透鬪慝特闖坡婆巴把播擺杷波派爬琶破罷芭跛頗判坂板版瓣販辦鈑"
  ],
  [
    "f8a1",
    "阪八叭捌佩唄悖敗沛浿牌狽稗覇貝彭澎烹膨愎便偏扁片篇編翩遍鞭騙貶坪平枰萍評吠嬖幣廢弊斃肺蔽閉陛佈包匍匏咆哺圃布怖抛抱捕暴泡浦疱砲胞脯苞葡蒲袍褒逋鋪飽鮑幅暴曝瀑爆輻俵剽彪慓杓標漂瓢票表豹飇飄驃"
  ],
  [
    "f9a1",
    "品稟楓諷豊風馮彼披疲皮被避陂匹弼必泌珌畢疋筆苾馝乏逼下何厦夏廈昰河瑕荷蝦賀遐霞鰕壑學虐謔鶴寒恨悍旱汗漢澣瀚罕翰閑閒限韓割轄函含咸啣喊檻涵緘艦銜陷鹹合哈盒蛤閤闔陜亢伉姮嫦巷恒抗杭桁沆港缸肛航"
  ],
  [
    "faa1",
    "行降項亥偕咳垓奚孩害懈楷海瀣蟹解該諧邂駭骸劾核倖幸杏荇行享向嚮珦鄕響餉饗香噓墟虛許憲櫶獻軒歇險驗奕爀赫革俔峴弦懸晛泫炫玄玹現眩睍絃絢縣舷衒見賢鉉顯孑穴血頁嫌俠協夾峽挾浹狹脅脇莢鋏頰亨兄刑型"
  ],
  [
    "fba1",
    "形泂滎瀅灐炯熒珩瑩荊螢衡逈邢鎣馨兮彗惠慧暳蕙蹊醯鞋乎互呼壕壺好岵弧戶扈昊晧毫浩淏湖滸澔濠濩灝狐琥瑚瓠皓祜糊縞胡芦葫蒿虎號蝴護豪鎬頀顥惑或酷婚昏混渾琿魂忽惚笏哄弘汞泓洪烘紅虹訌鴻化和嬅樺火畵"
  ],
  [
    "fca1",
    "禍禾花華話譁貨靴廓擴攫確碻穫丸喚奐宦幻患換歡晥桓渙煥環紈還驩鰥活滑猾豁闊凰幌徨恍惶愰慌晃晄榥況湟滉潢煌璜皇篁簧荒蝗遑隍黃匯回廻徊恢悔懷晦會檜淮澮灰獪繪膾茴蛔誨賄劃獲宖橫鐄哮嚆孝效斅曉梟涍淆"
  ],
  [
    "fda1",
    "爻肴酵驍侯候厚后吼喉嗅帿後朽煦珝逅勛勳塤壎焄熏燻薰訓暈薨喧暄煊萱卉喙毁彙徽揮暉煇諱輝麾休携烋畦虧恤譎鷸兇凶匈洶胸黑昕欣炘痕吃屹紇訖欠欽歆吸恰洽翕興僖凞喜噫囍姬嬉希憙憘戱晞曦熙熹熺犧禧稀羲詰"
  ]
], Qi = [
  [
    "0",
    "\0",
    127
  ],
  [
    "a140",
    "　，、。．‧；：？！︰…‥﹐﹑﹒·﹔﹕﹖﹗｜–︱—︳╴︴﹏（）︵︶｛｝︷︸〔〕︹︺【】︻︼《》︽︾〈〉︿﹀「」﹁﹂『』﹃﹄﹙﹚"
  ],
  [
    "a1a1",
    "﹛﹜﹝﹞‘’“”〝〞‵′＃＆＊※§〃○●△▲◎☆★◇◆□■▽▼㊣℅¯￣＿ˍ﹉﹊﹍﹎﹋﹌﹟﹠﹡＋－×÷±√＜＞＝≦≧≠∞≒≡﹢",
    4,
    "～∩∪⊥∠∟⊿㏒㏑∫∮∵∴♀♂⊕⊙↑↓←→↖↗↙↘∥∣／"
  ],
  [
    "a240",
    "＼∕﹨＄￥〒￠￡％＠℃℉﹩﹪﹫㏕㎜㎝㎞㏎㎡㎎㎏㏄°兙兛兞兝兡兣嗧瓩糎▁",
    7,
    "▏▎▍▌▋▊▉┼┴┬┤├▔─│▕┌┐└┘╭"
  ],
  [
    "a2a1",
    "╮╰╯═╞╪╡◢◣◥◤╱╲╳０",
    9,
    "Ⅰ",
    9,
    "〡",
    8,
    "十卄卅Ａ",
    25,
    "ａ",
    21
  ],
  [
    "a340",
    "ｗｘｙｚΑ",
    16,
    "Σ",
    6,
    "α",
    16,
    "σ",
    6,
    "ㄅ",
    10
  ],
  [
    "a3a1",
    "ㄐ",
    25,
    "˙ˉˊˇˋ"
  ],
  [
    "a3e1",
    "€"
  ],
  [
    "a440",
    "一乙丁七乃九了二人儿入八几刀刁力匕十卜又三下丈上丫丸凡久么也乞于亡兀刃勺千叉口土士夕大女子孑孓寸小尢尸山川工己已巳巾干廾弋弓才"
  ],
  [
    "a4a1",
    "丑丐不中丰丹之尹予云井互五亢仁什仃仆仇仍今介仄元允內六兮公冗凶分切刈勻勾勿化匹午升卅卞厄友及反壬天夫太夭孔少尤尺屯巴幻廿弔引心戈戶手扎支文斗斤方日曰月木欠止歹毋比毛氏水火爪父爻片牙牛犬王丙"
  ],
  [
    "a540",
    "世丕且丘主乍乏乎以付仔仕他仗代令仙仞充兄冉冊冬凹出凸刊加功包匆北匝仟半卉卡占卯卮去可古右召叮叩叨叼司叵叫另只史叱台句叭叻四囚外"
  ],
  [
    "a5a1",
    "央失奴奶孕它尼巨巧左市布平幼弁弘弗必戊打扔扒扑斥旦朮本未末札正母民氐永汁汀氾犯玄玉瓜瓦甘生用甩田由甲申疋白皮皿目矛矢石示禾穴立丞丟乒乓乩亙交亦亥仿伉伙伊伕伍伐休伏仲件任仰仳份企伋光兇兆先全"
  ],
  [
    "a640",
    "共再冰列刑划刎刖劣匈匡匠印危吉吏同吊吐吁吋各向名合吃后吆吒因回囝圳地在圭圬圯圩夙多夷夸妄奸妃好她如妁字存宇守宅安寺尖屹州帆并年"
  ],
  [
    "a6a1",
    "式弛忙忖戎戌戍成扣扛托收早旨旬旭曲曳有朽朴朱朵次此死氖汝汗汙江池汐汕污汛汍汎灰牟牝百竹米糸缶羊羽老考而耒耳聿肉肋肌臣自至臼舌舛舟艮色艾虫血行衣西阡串亨位住佇佗佞伴佛何估佐佑伽伺伸佃佔似但佣"
  ],
  [
    "a740",
    "作你伯低伶余佝佈佚兌克免兵冶冷別判利刪刨劫助努劬匣即卵吝吭吞吾否呎吧呆呃吳呈呂君吩告吹吻吸吮吵吶吠吼呀吱含吟听囪困囤囫坊坑址坍"
  ],
  [
    "a7a1",
    "均坎圾坐坏圻壯夾妝妒妨妞妣妙妖妍妤妓妊妥孝孜孚孛完宋宏尬局屁尿尾岐岑岔岌巫希序庇床廷弄弟彤形彷役忘忌志忍忱快忸忪戒我抄抗抖技扶抉扭把扼找批扳抒扯折扮投抓抑抆改攻攸旱更束李杏材村杜杖杞杉杆杠"
  ],
  [
    "a840",
    "杓杗步每求汞沙沁沈沉沅沛汪決沐汰沌汨沖沒汽沃汲汾汴沆汶沍沔沘沂灶灼災灸牢牡牠狄狂玖甬甫男甸皂盯矣私秀禿究系罕肖肓肝肘肛肚育良芒"
  ],
  [
    "a8a1",
    "芋芍見角言谷豆豕貝赤走足身車辛辰迂迆迅迄巡邑邢邪邦那酉釆里防阮阱阪阬並乖乳事些亞享京佯依侍佳使佬供例來侃佰併侈佩佻侖佾侏侑佺兔兒兕兩具其典冽函刻券刷刺到刮制剁劾劻卒協卓卑卦卷卸卹取叔受味呵"
  ],
  [
    "a940",
    "咖呸咕咀呻呷咄咒咆呼咐呱呶和咚呢周咋命咎固垃坷坪坩坡坦坤坼夜奉奇奈奄奔妾妻委妹妮姑姆姐姍始姓姊妯妳姒姅孟孤季宗定官宜宙宛尚屈居"
  ],
  [
    "a9a1",
    "屆岷岡岸岩岫岱岳帘帚帖帕帛帑幸庚店府底庖延弦弧弩往征彿彼忝忠忽念忿怏怔怯怵怖怪怕怡性怩怫怛或戕房戾所承拉拌拄抿拂抹拒招披拓拔拋拈抨抽押拐拙拇拍抵拚抱拘拖拗拆抬拎放斧於旺昔易昌昆昂明昀昏昕昊"
  ],
  [
    "aa40",
    "昇服朋杭枋枕東果杳杷枇枝林杯杰板枉松析杵枚枓杼杪杲欣武歧歿氓氛泣注泳沱泌泥河沽沾沼波沫法泓沸泄油況沮泗泅泱沿治泡泛泊沬泯泜泖泠"
  ],
  [
    "aaa1",
    "炕炎炒炊炙爬爭爸版牧物狀狎狙狗狐玩玨玟玫玥甽疝疙疚的盂盲直知矽社祀祁秉秈空穹竺糾罔羌羋者肺肥肢肱股肫肩肴肪肯臥臾舍芳芝芙芭芽芟芹花芬芥芯芸芣芰芾芷虎虱初表軋迎返近邵邸邱邶采金長門阜陀阿阻附"
  ],
  [
    "ab40",
    "陂隹雨青非亟亭亮信侵侯便俠俑俏保促侶俘俟俊俗侮俐俄係俚俎俞侷兗冒冑冠剎剃削前剌剋則勇勉勃勁匍南卻厚叛咬哀咨哎哉咸咦咳哇哂咽咪品"
  ],
  [
    "aba1",
    "哄哈咯咫咱咻咩咧咿囿垂型垠垣垢城垮垓奕契奏奎奐姜姘姿姣姨娃姥姪姚姦威姻孩宣宦室客宥封屎屏屍屋峙峒巷帝帥帟幽庠度建弈弭彥很待徊律徇後徉怒思怠急怎怨恍恰恨恢恆恃恬恫恪恤扁拜挖按拼拭持拮拽指拱拷"
  ],
  [
    "ac40",
    "拯括拾拴挑挂政故斫施既春昭映昧是星昨昱昤曷柿染柱柔某柬架枯柵柩柯柄柑枴柚查枸柏柞柳枰柙柢柝柒歪殃殆段毒毗氟泉洋洲洪流津洌洱洞洗"
  ],
  [
    "aca1",
    "活洽派洶洛泵洹洧洸洩洮洵洎洫炫為炳炬炯炭炸炮炤爰牲牯牴狩狠狡玷珊玻玲珍珀玳甚甭畏界畎畋疫疤疥疢疣癸皆皇皈盈盆盃盅省盹相眉看盾盼眇矜砂研砌砍祆祉祈祇禹禺科秒秋穿突竿竽籽紂紅紀紉紇約紆缸美羿耄"
  ],
  [
    "ad40",
    "耐耍耑耶胖胥胚胃胄背胡胛胎胞胤胝致舢苧范茅苣苛苦茄若茂茉苒苗英茁苜苔苑苞苓苟苯茆虐虹虻虺衍衫要觔計訂訃貞負赴赳趴軍軌述迦迢迪迥"
  ],
  [
    "ada1",
    "迭迫迤迨郊郎郁郃酋酊重閂限陋陌降面革韋韭音頁風飛食首香乘亳倌倍倣俯倦倥俸倩倖倆值借倚倒們俺倀倔倨俱倡個候倘俳修倭倪俾倫倉兼冤冥冢凍凌准凋剖剜剔剛剝匪卿原厝叟哨唐唁唷哼哥哲唆哺唔哩哭員唉哮哪"
  ],
  [
    "ae40",
    "哦唧唇哽唏圃圄埂埔埋埃堉夏套奘奚娑娘娜娟娛娓姬娠娣娩娥娌娉孫屘宰害家宴宮宵容宸射屑展屐峭峽峻峪峨峰島崁峴差席師庫庭座弱徒徑徐恙"
  ],
  [
    "aea1",
    "恣恥恐恕恭恩息悄悟悚悍悔悌悅悖扇拳挈拿捎挾振捕捂捆捏捉挺捐挽挪挫挨捍捌效敉料旁旅時晉晏晃晒晌晅晁書朔朕朗校核案框桓根桂桔栩梳栗桌桑栽柴桐桀格桃株桅栓栘桁殊殉殷氣氧氨氦氤泰浪涕消涇浦浸海浙涓"
  ],
  [
    "af40",
    "浬涉浮浚浴浩涌涊浹涅浥涔烊烘烤烙烈烏爹特狼狹狽狸狷玆班琉珮珠珪珞畔畝畜畚留疾病症疲疳疽疼疹痂疸皋皰益盍盎眩真眠眨矩砰砧砸砝破砷"
  ],
  [
    "afa1",
    "砥砭砠砟砲祕祐祠祟祖神祝祗祚秤秣秧租秦秩秘窄窈站笆笑粉紡紗紋紊素索純紐紕級紜納紙紛缺罟羔翅翁耆耘耕耙耗耽耿胱脂胰脅胭胴脆胸胳脈能脊胼胯臭臬舀舐航舫舨般芻茫荒荔荊茸荐草茵茴荏茲茹茶茗荀茱茨荃"
  ],
  [
    "b040",
    "虔蚊蚪蚓蚤蚩蚌蚣蚜衰衷袁袂衽衹記訐討訌訕訊託訓訖訏訑豈豺豹財貢起躬軒軔軏辱送逆迷退迺迴逃追逅迸邕郡郝郢酒配酌釘針釗釜釙閃院陣陡"
  ],
  [
    "b0a1",
    "陛陝除陘陞隻飢馬骨高鬥鬲鬼乾偺偽停假偃偌做偉健偶偎偕偵側偷偏倏偯偭兜冕凰剪副勒務勘動匐匏匙匿區匾參曼商啪啦啄啞啡啃啊唱啖問啕唯啤唸售啜唬啣唳啁啗圈國圉域堅堊堆埠埤基堂堵執培夠奢娶婁婉婦婪婀"
  ],
  [
    "b140",
    "娼婢婚婆婊孰寇寅寄寂宿密尉專將屠屜屝崇崆崎崛崖崢崑崩崔崙崤崧崗巢常帶帳帷康庸庶庵庾張強彗彬彩彫得徙從徘御徠徜恿患悉悠您惋悴惦悽"
  ],
  [
    "b1a1",
    "情悻悵惜悼惘惕惆惟悸惚惇戚戛扈掠控捲掖探接捷捧掘措捱掩掉掃掛捫推掄授掙採掬排掏掀捻捩捨捺敝敖救教敗啟敏敘敕敔斜斛斬族旋旌旎晝晚晤晨晦晞曹勗望梁梯梢梓梵桿桶梱梧梗械梃棄梭梆梅梔條梨梟梡梂欲殺"
  ],
  [
    "b240",
    "毫毬氫涎涼淳淙液淡淌淤添淺清淇淋涯淑涮淞淹涸混淵淅淒渚涵淚淫淘淪深淮淨淆淄涪淬涿淦烹焉焊烽烯爽牽犁猜猛猖猓猙率琅琊球理現琍瓠瓶"
  ],
  [
    "b2a1",
    "瓷甜產略畦畢異疏痔痕疵痊痍皎盔盒盛眷眾眼眶眸眺硫硃硎祥票祭移窒窕笠笨笛第符笙笞笮粒粗粕絆絃統紮紹紼絀細紳組累終紲紱缽羞羚翌翎習耜聊聆脯脖脣脫脩脰脤舂舵舷舶船莎莞莘荸莢莖莽莫莒莊莓莉莠荷荻荼"
  ],
  [
    "b340",
    "莆莧處彪蛇蛀蚶蛄蚵蛆蛋蚱蚯蛉術袞袈被袒袖袍袋覓規訪訝訣訥許設訟訛訢豉豚販責貫貨貪貧赧赦趾趺軛軟這逍通逗連速逝逐逕逞造透逢逖逛途"
  ],
  [
    "b3a1",
    "部郭都酗野釵釦釣釧釭釩閉陪陵陳陸陰陴陶陷陬雀雪雩章竟頂頃魚鳥鹵鹿麥麻傢傍傅備傑傀傖傘傚最凱割剴創剩勞勝勛博厥啻喀喧啼喊喝喘喂喜喪喔喇喋喃喳單喟唾喲喚喻喬喱啾喉喫喙圍堯堪場堤堰報堡堝堠壹壺奠"
  ],
  [
    "b440",
    "婷媚婿媒媛媧孳孱寒富寓寐尊尋就嵌嵐崴嵇巽幅帽幀幃幾廊廁廂廄弼彭復循徨惑惡悲悶惠愜愣惺愕惰惻惴慨惱愎惶愉愀愒戟扉掣掌描揀揩揉揆揍"
  ],
  [
    "b4a1",
    "插揣提握揖揭揮捶援揪換摒揚揹敞敦敢散斑斐斯普晰晴晶景暑智晾晷曾替期朝棺棕棠棘棗椅棟棵森棧棹棒棲棣棋棍植椒椎棉棚楮棻款欺欽殘殖殼毯氮氯氬港游湔渡渲湧湊渠渥渣減湛湘渤湖湮渭渦湯渴湍渺測湃渝渾滋"
  ],
  [
    "b540",
    "溉渙湎湣湄湲湩湟焙焚焦焰無然煮焜牌犄犀猶猥猴猩琺琪琳琢琥琵琶琴琯琛琦琨甥甦畫番痢痛痣痙痘痞痠登發皖皓皴盜睏短硝硬硯稍稈程稅稀窘"
  ],
  [
    "b5a1",
    "窗窖童竣等策筆筐筒答筍筋筏筑粟粥絞結絨絕紫絮絲絡給絢絰絳善翔翕耋聒肅腕腔腋腑腎脹腆脾腌腓腴舒舜菩萃菸萍菠菅萋菁華菱菴著萊菰萌菌菽菲菊萸萎萄菜萇菔菟虛蛟蛙蛭蛔蛛蛤蛐蛞街裁裂袱覃視註詠評詞証詁"
  ],
  [
    "b640",
    "詔詛詐詆訴診訶詖象貂貯貼貳貽賁費賀貴買貶貿貸越超趁跎距跋跚跑跌跛跆軻軸軼辜逮逵週逸進逶鄂郵鄉郾酣酥量鈔鈕鈣鈉鈞鈍鈐鈇鈑閔閏開閑"
  ],
  [
    "b6a1",
    "間閒閎隊階隋陽隅隆隍陲隄雁雅雄集雇雯雲韌項順須飧飪飯飩飲飭馮馭黃黍黑亂傭債傲傳僅傾催傷傻傯僇剿剷剽募勦勤勢勣匯嗟嗨嗓嗦嗎嗜嗇嗑嗣嗤嗯嗚嗡嗅嗆嗥嗉園圓塞塑塘塗塚塔填塌塭塊塢塒塋奧嫁嫉嫌媾媽媼"
  ],
  [
    "b740",
    "媳嫂媲嵩嵯幌幹廉廈弒彙徬微愚意慈感想愛惹愁愈慎慌慄慍愾愴愧愍愆愷戡戢搓搾搞搪搭搽搬搏搜搔損搶搖搗搆敬斟新暗暉暇暈暖暄暘暍會榔業"
  ],
  [
    "b7a1",
    "楚楷楠楔極椰概楊楨楫楞楓楹榆楝楣楛歇歲毀殿毓毽溢溯滓溶滂源溝滇滅溥溘溼溺溫滑準溜滄滔溪溧溴煎煙煩煤煉照煜煬煦煌煥煞煆煨煖爺牒猷獅猿猾瑯瑚瑕瑟瑞瑁琿瑙瑛瑜當畸瘀痰瘁痲痱痺痿痴痳盞盟睛睫睦睞督"
  ],
  [
    "b840",
    "睹睪睬睜睥睨睢矮碎碰碗碘碌碉硼碑碓硿祺祿禁萬禽稜稚稠稔稟稞窟窠筷節筠筮筧粱粳粵經絹綑綁綏絛置罩罪署義羨群聖聘肆肄腱腰腸腥腮腳腫"
  ],
  [
    "b8a1",
    "腹腺腦舅艇蒂葷落萱葵葦葫葉葬葛萼萵葡董葩葭葆虞虜號蛹蜓蜈蜇蜀蛾蛻蜂蜃蜆蜊衙裟裔裙補裘裝裡裊裕裒覜解詫該詳試詩詰誇詼詣誠話誅詭詢詮詬詹詻訾詨豢貊貉賊資賈賄貲賃賂賅跡跟跨路跳跺跪跤跦躲較載軾輊"
  ],
  [
    "b940",
    "辟農運遊道遂達逼違遐遇遏過遍遑逾遁鄒鄗酬酪酩釉鈷鉗鈸鈽鉀鈾鉛鉋鉤鉑鈴鉉鉍鉅鈹鈿鉚閘隘隔隕雍雋雉雊雷電雹零靖靴靶預頑頓頊頒頌飼飴"
  ],
  [
    "b9a1",
    "飽飾馳馱馴髡鳩麂鼎鼓鼠僧僮僥僖僭僚僕像僑僱僎僩兢凳劃劂匱厭嗾嘀嘛嘗嗽嘔嘆嘉嘍嘎嗷嘖嘟嘈嘐嗶團圖塵塾境墓墊塹墅塽壽夥夢夤奪奩嫡嫦嫩嫗嫖嫘嫣孵寞寧寡寥實寨寢寤察對屢嶄嶇幛幣幕幗幔廓廖弊彆彰徹慇"
  ],
  [
    "ba40",
    "愿態慷慢慣慟慚慘慵截撇摘摔撤摸摟摺摑摧搴摭摻敲斡旗旖暢暨暝榜榨榕槁榮槓構榛榷榻榫榴槐槍榭槌榦槃榣歉歌氳漳演滾漓滴漩漾漠漬漏漂漢"
  ],
  [
    "baa1",
    "滿滯漆漱漸漲漣漕漫漯澈漪滬漁滲滌滷熔熙煽熊熄熒爾犒犖獄獐瑤瑣瑪瑰瑭甄疑瘧瘍瘋瘉瘓盡監瞄睽睿睡磁碟碧碳碩碣禎福禍種稱窪窩竭端管箕箋筵算箝箔箏箸箇箄粹粽精綻綰綜綽綾綠緊綴網綱綺綢綿綵綸維緒緇綬"
  ],
  [
    "bb40",
    "罰翠翡翟聞聚肇腐膀膏膈膊腿膂臧臺與舔舞艋蓉蒿蓆蓄蒙蒞蒲蒜蓋蒸蓀蓓蒐蒼蓑蓊蜿蜜蜻蜢蜥蜴蜘蝕蜷蜩裳褂裴裹裸製裨褚裯誦誌語誣認誡誓誤"
  ],
  [
    "bba1",
    "說誥誨誘誑誚誧豪貍貌賓賑賒赫趙趕跼輔輒輕輓辣遠遘遜遣遙遞遢遝遛鄙鄘鄞酵酸酷酴鉸銀銅銘銖鉻銓銜銨鉼銑閡閨閩閣閥閤隙障際雌雒需靼鞅韶頗領颯颱餃餅餌餉駁骯骰髦魁魂鳴鳶鳳麼鼻齊億儀僻僵價儂儈儉儅凜"
  ],
  [
    "bc40",
    "劇劈劉劍劊勰厲嘮嘻嘹嘲嘿嘴嘩噓噎噗噴嘶嘯嘰墀墟增墳墜墮墩墦奭嬉嫻嬋嫵嬌嬈寮寬審寫層履嶝嶔幢幟幡廢廚廟廝廣廠彈影德徵慶慧慮慝慕憂"
  ],
  [
    "bca1",
    "慼慰慫慾憧憐憫憎憬憚憤憔憮戮摩摯摹撞撲撈撐撰撥撓撕撩撒撮播撫撚撬撙撢撳敵敷數暮暫暴暱樣樟槨樁樞標槽模樓樊槳樂樅槭樑歐歎殤毅毆漿潼澄潑潦潔澆潭潛潸潮澎潺潰潤澗潘滕潯潠潟熟熬熱熨牖犛獎獗瑩璋璃"
  ],
  [
    "bd40",
    "瑾璀畿瘠瘩瘟瘤瘦瘡瘢皚皺盤瞎瞇瞌瞑瞋磋磅確磊碾磕碼磐稿稼穀稽稷稻窯窮箭箱範箴篆篇篁箠篌糊締練緯緻緘緬緝編緣線緞緩綞緙緲緹罵罷羯"
  ],
  [
    "bda1",
    "翩耦膛膜膝膠膚膘蔗蔽蔚蓮蔬蔭蔓蔑蔣蔡蔔蓬蔥蓿蔆螂蝴蝶蝠蝦蝸蝨蝙蝗蝌蝓衛衝褐複褒褓褕褊誼諒談諄誕請諸課諉諂調誰論諍誶誹諛豌豎豬賠賞賦賤賬賭賢賣賜質賡赭趟趣踫踐踝踢踏踩踟踡踞躺輝輛輟輩輦輪輜輞"
  ],
  [
    "be40",
    "輥適遮遨遭遷鄰鄭鄧鄱醇醉醋醃鋅銻銷鋪銬鋤鋁銳銼鋒鋇鋰銲閭閱霄霆震霉靠鞍鞋鞏頡頫頜颳養餓餒餘駝駐駟駛駑駕駒駙骷髮髯鬧魅魄魷魯鴆鴉"
  ],
  [
    "bea1",
    "鴃麩麾黎墨齒儒儘儔儐儕冀冪凝劑劓勳噙噫噹噩噤噸噪器噥噱噯噬噢噶壁墾壇壅奮嬝嬴學寰導彊憲憑憩憊懍憶憾懊懈戰擅擁擋撻撼據擄擇擂操撿擒擔撾整曆曉暹曄曇暸樽樸樺橙橫橘樹橄橢橡橋橇樵機橈歙歷氅濂澱澡"
  ],
  [
    "bf40",
    "濃澤濁澧澳激澹澶澦澠澴熾燉燐燒燈燕熹燎燙燜燃燄獨璜璣璘璟璞瓢甌甍瘴瘸瘺盧盥瞠瞞瞟瞥磨磚磬磧禦積穎穆穌穋窺篙簑築篤篛篡篩篦糕糖縊"
  ],
  [
    "bfa1",
    "縑縈縛縣縞縝縉縐罹羲翰翱翮耨膳膩膨臻興艘艙蕊蕙蕈蕨蕩蕃蕉蕭蕪蕞螃螟螞螢融衡褪褲褥褫褡親覦諦諺諫諱謀諜諧諮諾謁謂諷諭諳諶諼豫豭貓賴蹄踱踴蹂踹踵輻輯輸輳辨辦遵遴選遲遼遺鄴醒錠錶鋸錳錯錢鋼錫錄錚"
  ],
  [
    "c040",
    "錐錦錡錕錮錙閻隧隨險雕霎霑霖霍霓霏靛靜靦鞘頰頸頻頷頭頹頤餐館餞餛餡餚駭駢駱骸骼髻髭鬨鮑鴕鴣鴦鴨鴒鴛默黔龍龜優償儡儲勵嚎嚀嚐嚅嚇"
  ],
  [
    "c0a1",
    "嚏壕壓壑壎嬰嬪嬤孺尷屨嶼嶺嶽嶸幫彌徽應懂懇懦懋戲戴擎擊擘擠擰擦擬擱擢擭斂斃曙曖檀檔檄檢檜櫛檣橾檗檐檠歜殮毚氈濘濱濟濠濛濤濫濯澀濬濡濩濕濮濰燧營燮燦燥燭燬燴燠爵牆獰獲璩環璦璨癆療癌盪瞳瞪瞰瞬"
  ],
  [
    "c140",
    "瞧瞭矯磷磺磴磯礁禧禪穗窿簇簍篾篷簌篠糠糜糞糢糟糙糝縮績繆縷縲繃縫總縱繅繁縴縹繈縵縿縯罄翳翼聱聲聰聯聳臆臃膺臂臀膿膽臉膾臨舉艱薪"
  ],
  [
    "c1a1",
    "薄蕾薜薑薔薯薛薇薨薊虧蟀蟑螳蟒蟆螫螻螺蟈蟋褻褶襄褸褽覬謎謗謙講謊謠謝謄謐豁谿豳賺賽購賸賻趨蹉蹋蹈蹊轄輾轂轅輿避遽還邁邂邀鄹醣醞醜鍍鎂錨鍵鍊鍥鍋錘鍾鍬鍛鍰鍚鍔闊闋闌闈闆隱隸雖霜霞鞠韓顆颶餵騁"
  ],
  [
    "c240",
    "駿鮮鮫鮪鮭鴻鴿麋黏點黜黝黛鼾齋叢嚕嚮壙壘嬸彝懣戳擴擲擾攆擺擻擷斷曜朦檳檬櫃檻檸櫂檮檯歟歸殯瀉瀋濾瀆濺瀑瀏燻燼燾燸獷獵璧璿甕癖癘"
  ],
  [
    "c2a1",
    "癒瞽瞿瞻瞼礎禮穡穢穠竄竅簫簧簪簞簣簡糧織繕繞繚繡繒繙罈翹翻職聶臍臏舊藏薩藍藐藉薰薺薹薦蟯蟬蟲蟠覆覲觴謨謹謬謫豐贅蹙蹣蹦蹤蹟蹕軀轉轍邇邃邈醫醬釐鎔鎊鎖鎢鎳鎮鎬鎰鎘鎚鎗闔闖闐闕離雜雙雛雞霤鞣鞦"
  ],
  [
    "c340",
    "鞭韹額顏題顎顓颺餾餿餽餮馥騎髁鬃鬆魏魎魍鯊鯉鯽鯈鯀鵑鵝鵠黠鼕鼬儳嚥壞壟壢寵龐廬懲懷懶懵攀攏曠曝櫥櫝櫚櫓瀛瀟瀨瀚瀝瀕瀘爆爍牘犢獸"
  ],
  [
    "c3a1",
    "獺璽瓊瓣疇疆癟癡矇礙禱穫穩簾簿簸簽簷籀繫繭繹繩繪羅繳羶羹羸臘藩藝藪藕藤藥藷蟻蠅蠍蟹蟾襠襟襖襞譁譜識證譚譎譏譆譙贈贊蹼蹲躇蹶蹬蹺蹴轔轎辭邊邋醱醮鏡鏑鏟鏃鏈鏜鏝鏖鏢鏍鏘鏤鏗鏨關隴難霪霧靡韜韻類"
  ],
  [
    "c440",
    "願顛颼饅饉騖騙鬍鯨鯧鯖鯛鶉鵡鵲鵪鵬麒麗麓麴勸嚨嚷嚶嚴嚼壤孀孃孽寶巉懸懺攘攔攙曦朧櫬瀾瀰瀲爐獻瓏癢癥礦礪礬礫竇競籌籃籍糯糰辮繽繼"
  ],
  [
    "c4a1",
    "纂罌耀臚艦藻藹蘑藺蘆蘋蘇蘊蠔蠕襤覺觸議譬警譯譟譫贏贍躉躁躅躂醴釋鐘鐃鏽闡霰飄饒饑馨騫騰騷騵鰓鰍鹹麵黨鼯齟齣齡儷儸囁囀囂夔屬巍懼懾攝攜斕曩櫻欄櫺殲灌爛犧瓖瓔癩矓籐纏續羼蘗蘭蘚蠣蠢蠡蠟襪襬覽譴"
  ],
  [
    "c540",
    "護譽贓躊躍躋轟辯醺鐮鐳鐵鐺鐸鐲鐫闢霸霹露響顧顥饗驅驃驀騾髏魔魑鰭鰥鶯鶴鷂鶸麝黯鼙齜齦齧儼儻囈囊囉孿巔巒彎懿攤權歡灑灘玀瓤疊癮癬"
  ],
  [
    "c5a1",
    "禳籠籟聾聽臟襲襯觼讀贖贗躑躓轡酈鑄鑑鑒霽霾韃韁顫饕驕驍髒鬚鱉鰱鰾鰻鷓鷗鼴齬齪龔囌巖戀攣攫攪曬欐瓚竊籤籣籥纓纖纔臢蘸蘿蠱變邐邏鑣鑠鑤靨顯饜驚驛驗髓體髑鱔鱗鱖鷥麟黴囑壩攬灞癱癲矗罐羈蠶蠹衢讓讒"
  ],
  [
    "c640",
    "讖艷贛釀鑪靂靈靄韆顰驟鬢魘鱟鷹鷺鹼鹽鼇齷齲廳欖灣籬籮蠻觀躡釁鑲鑰顱饞髖鬣黌灤矚讚鑷韉驢驥纜讜躪釅鑽鑾鑼鱷鱸黷豔鑿鸚爨驪鬱鸛鸞籲"
  ],
  [
    "c940",
    "乂乜凵匚厂万丌乇亍囗兀屮彳丏冇与丮亓仂仉仈冘勼卬厹圠夃夬尐巿旡殳毌气爿丱丼仨仜仩仡仝仚刌匜卌圢圣夗夯宁宄尒尻屴屳帄庀庂忉戉扐氕"
  ],
  [
    "c9a1",
    "氶汃氿氻犮犰玊禸肊阞伎优伬仵伔仱伀价伈伝伂伅伢伓伄仴伒冱刓刉刐劦匢匟卍厊吇囡囟圮圪圴夼妀奼妅奻奾奷奿孖尕尥屼屺屻屾巟幵庄异弚彴忕忔忏扜扞扤扡扦扢扙扠扚扥旯旮朾朹朸朻机朿朼朳氘汆汒汜汏汊汔汋"
  ],
  [
    "ca40",
    "汌灱牞犴犵玎甪癿穵网艸艼芀艽艿虍襾邙邗邘邛邔阢阤阠阣佖伻佢佉体佤伾佧佒佟佁佘伭伳伿佡冏冹刜刞刡劭劮匉卣卲厎厏吰吷吪呔呅吙吜吥吘"
  ],
  [
    "caa1",
    "吽呏呁吨吤呇囮囧囥坁坅坌坉坋坒夆奀妦妘妠妗妎妢妐妏妧妡宎宒尨尪岍岏岈岋岉岒岊岆岓岕巠帊帎庋庉庌庈庍弅弝彸彶忒忑忐忭忨忮忳忡忤忣忺忯忷忻怀忴戺抃抌抎抏抔抇扱扻扺扰抁抈扷扽扲扴攷旰旴旳旲旵杅杇"
  ],
  [
    "cb40",
    "杙杕杌杈杝杍杚杋毐氙氚汸汧汫沄沋沏汱汯汩沚汭沇沕沜汦汳汥汻沎灴灺牣犿犽狃狆狁犺狅玕玗玓玔玒町甹疔疕皁礽耴肕肙肐肒肜芐芏芅芎芑芓"
  ],
  [
    "cba1",
    "芊芃芄豸迉辿邟邡邥邞邧邠阰阨阯阭丳侘佼侅佽侀侇佶佴侉侄佷佌侗佪侚佹侁佸侐侜侔侞侒侂侕佫佮冞冼冾刵刲刳剆刱劼匊匋匼厒厔咇呿咁咑咂咈呫呺呾呥呬呴呦咍呯呡呠咘呣呧呤囷囹坯坲坭坫坱坰坶垀坵坻坳坴坢"
  ],
  [
    "cc40",
    "坨坽夌奅妵妺姏姎妲姌姁妶妼姃姖妱妽姀姈妴姇孢孥宓宕屄屇岮岤岠岵岯岨岬岟岣岭岢岪岧岝岥岶岰岦帗帔帙弨弢弣弤彔徂彾彽忞忥怭怦怙怲怋"
  ],
  [
    "cca1",
    "怴怊怗怳怚怞怬怢怍怐怮怓怑怌怉怜戔戽抭抴拑抾抪抶拊抮抳抯抻抩抰抸攽斨斻昉旼昄昒昈旻昃昋昍昅旽昑昐曶朊枅杬枎枒杶杻枘枆构杴枍枌杺枟枑枙枃杽极杸杹枔欥殀歾毞氝沓泬泫泮泙沶泔沭泧沷泐泂沺泃泆泭泲"
  ],
  [
    "cd40",
    "泒泝沴沊沝沀泞泀洰泍泇沰泹泏泩泑炔炘炅炓炆炄炑炖炂炚炃牪狖狋狘狉狜狒狔狚狌狑玤玡玭玦玢玠玬玝瓝瓨甿畀甾疌疘皯盳盱盰盵矸矼矹矻矺"
  ],
  [
    "cda1",
    "矷祂礿秅穸穻竻籵糽耵肏肮肣肸肵肭舠芠苀芫芚芘芛芵芧芮芼芞芺芴芨芡芩苂芤苃芶芢虰虯虭虮豖迒迋迓迍迖迕迗邲邴邯邳邰阹阽阼阺陃俍俅俓侲俉俋俁俔俜俙侻侳俛俇俖侺俀侹俬剄剉勀勂匽卼厗厖厙厘咺咡咭咥哏"
  ],
  [
    "ce40",
    "哃茍咷咮哖咶哅哆咠呰咼咢咾呲哞咰垵垞垟垤垌垗垝垛垔垘垏垙垥垚垕壴复奓姡姞姮娀姱姝姺姽姼姶姤姲姷姛姩姳姵姠姾姴姭宨屌峐峘峌峗峋峛"
  ],
  [
    "cea1",
    "峞峚峉峇峊峖峓峔峏峈峆峎峟峸巹帡帢帣帠帤庰庤庢庛庣庥弇弮彖徆怷怹恔恲恞恅恓恇恉恛恌恀恂恟怤恄恘恦恮扂扃拏挍挋拵挎挃拫拹挏挌拸拶挀挓挔拺挕拻拰敁敃斪斿昶昡昲昵昜昦昢昳昫昺昝昴昹昮朏朐柁柲柈枺"
  ],
  [
    "cf40",
    "柜枻柸柘柀枷柅柫柤柟枵柍枳柷柶柮柣柂枹柎柧柰枲柼柆柭柌枮柦柛柺柉柊柃柪柋欨殂殄殶毖毘毠氠氡洨洴洭洟洼洿洒洊泚洳洄洙洺洚洑洀洝浂"
  ],
  [
    "cfa1",
    "洁洘洷洃洏浀洇洠洬洈洢洉洐炷炟炾炱炰炡炴炵炩牁牉牊牬牰牳牮狊狤狨狫狟狪狦狣玅珌珂珈珅玹玶玵玴珫玿珇玾珃珆玸珋瓬瓮甮畇畈疧疪癹盄眈眃眄眅眊盷盻盺矧矨砆砑砒砅砐砏砎砉砃砓祊祌祋祅祄秕种秏秖秎窀"
  ],
  [
    "d040",
    "穾竑笀笁籺籸籹籿粀粁紃紈紁罘羑羍羾耇耎耏耔耷胘胇胠胑胈胂胐胅胣胙胜胊胕胉胏胗胦胍臿舡芔苙苾苹茇苨茀苕茺苫苖苴苬苡苲苵茌苻苶苰苪"
  ],
  [
    "d0a1",
    "苤苠苺苳苭虷虴虼虳衁衎衧衪衩觓訄訇赲迣迡迮迠郱邽邿郕郅邾郇郋郈釔釓陔陏陑陓陊陎倞倅倇倓倢倰倛俵俴倳倷倬俶俷倗倜倠倧倵倯倱倎党冔冓凊凄凅凈凎剡剚剒剞剟剕剢勍匎厞唦哢唗唒哧哳哤唚哿唄唈哫唑唅哱"
  ],
  [
    "d140",
    "唊哻哷哸哠唎唃唋圁圂埌堲埕埒垺埆垽垼垸垶垿埇埐垹埁夎奊娙娖娭娮娕娏娗娊娞娳孬宧宭宬尃屖屔峬峿峮峱峷崀峹帩帨庨庮庪庬弳弰彧恝恚恧"
  ],
  [
    "d1a1",
    "恁悢悈悀悒悁悝悃悕悛悗悇悜悎戙扆拲挐捖挬捄捅挶捃揤挹捋捊挼挩捁挴捘捔捙挭捇挳捚捑挸捗捀捈敊敆旆旃旄旂晊晟晇晑朒朓栟栚桉栲栳栻桋桏栖栱栜栵栫栭栯桎桄栴栝栒栔栦栨栮桍栺栥栠欬欯欭欱欴歭肂殈毦毤"
  ],
  [
    "d240",
    "毨毣毢毧氥浺浣浤浶洍浡涒浘浢浭浯涑涍淯浿涆浞浧浠涗浰浼浟涂涘洯浨涋浾涀涄洖涃浻浽浵涐烜烓烑烝烋缹烢烗烒烞烠烔烍烅烆烇烚烎烡牂牸"
  ],
  [
    "d2a1",
    "牷牶猀狺狴狾狶狳狻猁珓珙珥珖玼珧珣珩珜珒珛珔珝珚珗珘珨瓞瓟瓴瓵甡畛畟疰痁疻痄痀疿疶疺皊盉眝眛眐眓眒眣眑眕眙眚眢眧砣砬砢砵砯砨砮砫砡砩砳砪砱祔祛祏祜祓祒祑秫秬秠秮秭秪秜秞秝窆窉窅窋窌窊窇竘笐"
  ],
  [
    "d340",
    "笄笓笅笏笈笊笎笉笒粄粑粊粌粈粍粅紞紝紑紎紘紖紓紟紒紏紌罜罡罞罠罝罛羖羒翃翂翀耖耾耹胺胲胹胵脁胻脀舁舯舥茳茭荄茙荑茥荖茿荁茦茜茢"
  ],
  [
    "d3a1",
    "荂荎茛茪茈茼荍茖茤茠茷茯茩荇荅荌荓茞茬荋茧荈虓虒蚢蚨蚖蚍蚑蚞蚇蚗蚆蚋蚚蚅蚥蚙蚡蚧蚕蚘蚎蚝蚐蚔衃衄衭衵衶衲袀衱衿衯袃衾衴衼訒豇豗豻貤貣赶赸趵趷趶軑軓迾迵适迿迻逄迼迶郖郠郙郚郣郟郥郘郛郗郜郤酐"
  ],
  [
    "d440",
    "酎酏釕釢釚陜陟隼飣髟鬯乿偰偪偡偞偠偓偋偝偲偈偍偁偛偊偢倕偅偟偩偫偣偤偆偀偮偳偗偑凐剫剭剬剮勖勓匭厜啵啶唼啍啐唴唪啑啢唶唵唰啒啅"
  ],
  [
    "d4a1",
    "唌唲啥啎唹啈唭唻啀啋圊圇埻堔埢埶埜埴堀埭埽堈埸堋埳埏堇埮埣埲埥埬埡堎埼堐埧堁堌埱埩埰堍堄奜婠婘婕婧婞娸娵婭婐婟婥婬婓婤婗婃婝婒婄婛婈媎娾婍娹婌婰婩婇婑婖婂婜孲孮寁寀屙崞崋崝崚崠崌崨崍崦崥崏"
  ],
  [
    "d540",
    "崰崒崣崟崮帾帴庱庴庹庲庳弶弸徛徖徟悊悐悆悾悰悺惓惔惏惤惙惝惈悱惛悷惊悿惃惍惀挲捥掊掂捽掽掞掭掝掗掫掎捯掇掐据掯捵掜捭掮捼掤挻掟"
  ],
  [
    "d5a1",
    "捸掅掁掑掍捰敓旍晥晡晛晙晜晢朘桹梇梐梜桭桮梮梫楖桯梣梬梩桵桴梲梏桷梒桼桫桲梪梀桱桾梛梖梋梠梉梤桸桻梑梌梊桽欶欳欷欸殑殏殍殎殌氪淀涫涴涳湴涬淩淢涷淶淔渀淈淠淟淖涾淥淜淝淛淴淊涽淭淰涺淕淂淏淉"
  ],
  [
    "d640",
    "淐淲淓淽淗淍淣涻烺焍烷焗烴焌烰焄烳焐烼烿焆焓焀烸烶焋焂焎牾牻牼牿猝猗猇猑猘猊猈狿猏猞玈珶珸珵琄琁珽琇琀珺珼珿琌琋珴琈畤畣痎痒痏"
  ],
  [
    "d6a1",
    "痋痌痑痐皏皉盓眹眯眭眱眲眴眳眽眥眻眵硈硒硉硍硊硌砦硅硐祤祧祩祪祣祫祡离秺秸秶秷窏窔窐笵筇笴笥笰笢笤笳笘笪笝笱笫笭笯笲笸笚笣粔粘粖粣紵紽紸紶紺絅紬紩絁絇紾紿絊紻紨罣羕羜羝羛翊翋翍翐翑翇翏翉耟"
  ],
  [
    "d740",
    "耞耛聇聃聈脘脥脙脛脭脟脬脞脡脕脧脝脢舑舸舳舺舴舲艴莐莣莨莍荺荳莤荴莏莁莕莙荵莔莩荽莃莌莝莛莪莋荾莥莯莈莗莰荿莦莇莮荶莚虙虖蚿蚷"
  ],
  [
    "d7a1",
    "蛂蛁蛅蚺蚰蛈蚹蚳蚸蛌蚴蚻蚼蛃蚽蚾衒袉袕袨袢袪袚袑袡袟袘袧袙袛袗袤袬袌袓袎覂觖觙觕訰訧訬訞谹谻豜豝豽貥赽赻赹趼跂趹趿跁軘軞軝軜軗軠軡逤逋逑逜逌逡郯郪郰郴郲郳郔郫郬郩酖酘酚酓酕釬釴釱釳釸釤釹釪"
  ],
  [
    "d840",
    "釫釷釨釮镺閆閈陼陭陫陱陯隿靪頄飥馗傛傕傔傞傋傣傃傌傎傝偨傜傒傂傇兟凔匒匑厤厧喑喨喥喭啷噅喢喓喈喏喵喁喣喒喤啽喌喦啿喕喡喎圌堩堷"
  ],
  [
    "d8a1",
    "堙堞堧堣堨埵塈堥堜堛堳堿堶堮堹堸堭堬堻奡媯媔媟婺媢媞婸媦婼媥媬媕媮娷媄媊媗媃媋媩婻婽媌媜媏媓媝寪寍寋寔寑寊寎尌尰崷嵃嵫嵁嵋崿崵嵑嵎嵕崳崺嵒崽崱嵙嵂崹嵉崸崼崲崶嵀嵅幄幁彘徦徥徫惉悹惌惢惎惄愔"
  ],
  [
    "d940",
    "惲愊愖愅惵愓惸惼惾惁愃愘愝愐惿愄愋扊掔掱掰揎揥揨揯揃撝揳揊揠揶揕揲揵摡揟掾揝揜揄揘揓揂揇揌揋揈揰揗揙攲敧敪敤敜敨敥斌斝斞斮旐旒"
  ],
  [
    "d9a1",
    "晼晬晻暀晱晹晪晲朁椌棓椄棜椪棬棪棱椏棖棷棫棤棶椓椐棳棡椇棌椈楰梴椑棯棆椔棸棐棽棼棨椋椊椗棎棈棝棞棦棴棑椆棔棩椕椥棇欹欻欿欼殔殗殙殕殽毰毲毳氰淼湆湇渟湉溈渼渽湅湢渫渿湁湝湳渜渳湋湀湑渻渃渮湞"
  ],
  [
    "da40",
    "湨湜湡渱渨湠湱湫渹渢渰湓湥渧湸湤湷湕湹湒湦渵渶湚焠焞焯烻焮焱焣焥焢焲焟焨焺焛牋牚犈犉犆犅犋猒猋猰猢猱猳猧猲猭猦猣猵猌琮琬琰琫琖"
  ],
  [
    "daa1",
    "琚琡琭琱琤琣琝琩琠琲瓻甯畯畬痧痚痡痦痝痟痤痗皕皒盚睆睇睄睍睅睊睎睋睌矞矬硠硤硥硜硭硱硪确硰硩硨硞硢祴祳祲祰稂稊稃稌稄窙竦竤筊笻筄筈筌筎筀筘筅粢粞粨粡絘絯絣絓絖絧絪絏絭絜絫絒絔絩絑絟絎缾缿罥"
  ],
  [
    "db40",
    "罦羢羠羡翗聑聏聐胾胔腃腊腒腏腇脽腍脺臦臮臷臸臹舄舼舽舿艵茻菏菹萣菀菨萒菧菤菼菶萐菆菈菫菣莿萁菝菥菘菿菡菋菎菖菵菉萉萏菞萑萆菂菳"
  ],
  [
    "dba1",
    "菕菺菇菑菪萓菃菬菮菄菻菗菢萛菛菾蛘蛢蛦蛓蛣蛚蛪蛝蛫蛜蛬蛩蛗蛨蛑衈衖衕袺裗袹袸裀袾袶袼袷袽袲褁裉覕覘覗觝觚觛詎詍訹詙詀詗詘詄詅詒詈詑詊詌詏豟貁貀貺貾貰貹貵趄趀趉跘跓跍跇跖跜跏跕跙跈跗跅軯軷軺"
  ],
  [
    "dc40",
    "軹軦軮軥軵軧軨軶軫軱軬軴軩逭逴逯鄆鄬鄄郿郼鄈郹郻鄁鄀鄇鄅鄃酡酤酟酢酠鈁鈊鈥鈃鈚鈦鈏鈌鈀鈒釿釽鈆鈄鈧鈂鈜鈤鈙鈗鈅鈖镻閍閌閐隇陾隈"
  ],
  [
    "dca1",
    "隉隃隀雂雈雃雱雰靬靰靮頇颩飫鳦黹亃亄亶傽傿僆傮僄僊傴僈僂傰僁傺傱僋僉傶傸凗剺剸剻剼嗃嗛嗌嗐嗋嗊嗝嗀嗔嗄嗩喿嗒喍嗏嗕嗢嗖嗈嗲嗍嗙嗂圔塓塨塤塏塍塉塯塕塎塝塙塥塛堽塣塱壼嫇嫄嫋媺媸媱媵媰媿嫈媻嫆"
  ],
  [
    "dd40",
    "媷嫀嫊媴媶嫍媹媐寖寘寙尟尳嵱嵣嵊嵥嵲嵬嵞嵨嵧嵢巰幏幎幊幍幋廅廌廆廋廇彀徯徭惷慉慊愫慅愶愲愮慆愯慏愩慀戠酨戣戥戤揅揱揫搐搒搉搠搤"
  ],
  [
    "dda1",
    "搳摃搟搕搘搹搷搢搣搌搦搰搨摁搵搯搊搚摀搥搧搋揧搛搮搡搎敯斒旓暆暌暕暐暋暊暙暔晸朠楦楟椸楎楢楱椿楅楪椹楂楗楙楺楈楉椵楬椳椽楥棰楸椴楩楀楯楄楶楘楁楴楌椻楋椷楜楏楑椲楒椯楻椼歆歅歃歂歈歁殛嗀毻毼"
  ],
  [
    "de40",
    "毹毷毸溛滖滈溏滀溟溓溔溠溱溹滆滒溽滁溞滉溷溰滍溦滏溲溾滃滜滘溙溒溎溍溤溡溿溳滐滊溗溮溣煇煔煒煣煠煁煝煢煲煸煪煡煂煘煃煋煰煟煐煓"
  ],
  [
    "dea1",
    "煄煍煚牏犍犌犑犐犎猼獂猻猺獀獊獉瑄瑊瑋瑒瑑瑗瑀瑏瑐瑎瑂瑆瑍瑔瓡瓿瓾瓽甝畹畷榃痯瘏瘃痷痾痼痹痸瘐痻痶痭痵痽皙皵盝睕睟睠睒睖睚睩睧睔睙睭矠碇碚碔碏碄碕碅碆碡碃硹碙碀碖硻祼禂祽祹稑稘稙稒稗稕稢稓"
  ],
  [
    "df40",
    "稛稐窣窢窞竫筦筤筭筴筩筲筥筳筱筰筡筸筶筣粲粴粯綈綆綀綍絿綅絺綎絻綃絼綌綔綄絽綒罭罫罧罨罬羦羥羧翛翜耡腤腠腷腜腩腛腢腲朡腞腶腧腯"
  ],
  [
    "dfa1",
    "腄腡舝艉艄艀艂艅蓱萿葖葶葹蒏蒍葥葑葀蒆葧萰葍葽葚葙葴葳葝蔇葞萷萺萴葺葃葸萲葅萩菙葋萯葂萭葟葰萹葎葌葒葯蓅蒎萻葇萶萳葨葾葄萫葠葔葮葐蜋蜄蛷蜌蛺蛖蛵蝍蛸蜎蜉蜁蛶蜍蜅裖裋裍裎裞裛裚裌裐覅覛觟觥觤"
  ],
  [
    "e040",
    "觡觠觢觜触詶誆詿詡訿詷誂誄詵誃誁詴詺谼豋豊豥豤豦貆貄貅賌赨赩趑趌趎趏趍趓趔趐趒跰跠跬跱跮跐跩跣跢跧跲跫跴輆軿輁輀輅輇輈輂輋遒逿"
  ],
  [
    "e0a1",
    "遄遉逽鄐鄍鄏鄑鄖鄔鄋鄎酮酯鉈鉒鈰鈺鉦鈳鉥鉞銃鈮鉊鉆鉭鉬鉏鉠鉧鉯鈶鉡鉰鈱鉔鉣鉐鉲鉎鉓鉌鉖鈲閟閜閞閛隒隓隑隗雎雺雽雸雵靳靷靸靲頏頍頎颬飶飹馯馲馰馵骭骫魛鳪鳭鳧麀黽僦僔僗僨僳僛僪僝僤僓僬僰僯僣僠"
  ],
  [
    "e140",
    "凘劀劁勩勫匰厬嘧嘕嘌嘒嗼嘏嘜嘁嘓嘂嗺嘝嘄嗿嗹墉塼墐墘墆墁塿塴墋塺墇墑墎塶墂墈塻墔墏壾奫嫜嫮嫥嫕嫪嫚嫭嫫嫳嫢嫠嫛嫬嫞嫝嫙嫨嫟孷寠"
  ],
  [
    "e1a1",
    "寣屣嶂嶀嵽嶆嵺嶁嵷嶊嶉嶈嵾嵼嶍嵹嵿幘幙幓廘廑廗廎廜廕廙廒廔彄彃彯徶愬愨慁慞慱慳慒慓慲慬憀慴慔慺慛慥愻慪慡慖戩戧戫搫摍摛摝摴摶摲摳摽摵摦撦摎撂摞摜摋摓摠摐摿搿摬摫摙摥摷敳斠暡暠暟朅朄朢榱榶槉"
  ],
  [
    "e240",
    "榠槎榖榰榬榼榑榙榎榧榍榩榾榯榿槄榽榤槔榹槊榚槏榳榓榪榡榞槙榗榐槂榵榥槆歊歍歋殞殟殠毃毄毾滎滵滱漃漥滸漷滻漮漉潎漙漚漧漘漻漒滭漊"
  ],
  [
    "e2a1",
    "漶潳滹滮漭潀漰漼漵滫漇漎潃漅滽滶漹漜滼漺漟漍漞漈漡熇熐熉熀熅熂熏煻熆熁熗牄牓犗犕犓獃獍獑獌瑢瑳瑱瑵瑲瑧瑮甀甂甃畽疐瘖瘈瘌瘕瘑瘊瘔皸瞁睼瞅瞂睮瞀睯睾瞃碲碪碴碭碨硾碫碞碥碠碬碢碤禘禊禋禖禕禔禓"
  ],
  [
    "e340",
    "禗禈禒禐稫穊稰稯稨稦窨窫窬竮箈箜箊箑箐箖箍箌箛箎箅箘劄箙箤箂粻粿粼粺綧綷緂綣綪緁緀緅綝緎緄緆緋緌綯綹綖綼綟綦綮綩綡緉罳翢翣翥翞"
  ],
  [
    "e3a1",
    "耤聝聜膉膆膃膇膍膌膋舕蒗蒤蒡蒟蒺蓎蓂蒬蒮蒫蒹蒴蓁蓍蒪蒚蒱蓐蒝蒧蒻蒢蒔蓇蓌蒛蒩蒯蒨蓖蒘蒶蓏蒠蓗蓔蓒蓛蒰蒑虡蜳蜣蜨蝫蝀蜮蜞蜡蜙蜛蝃蜬蝁蜾蝆蜠蜲蜪蜭蜼蜒蜺蜱蜵蝂蜦蜧蜸蜤蜚蜰蜑裷裧裱裲裺裾裮裼裶裻"
  ],
  [
    "e440",
    "裰裬裫覝覡覟覞觩觫觨誫誙誋誒誏誖谽豨豩賕賏賗趖踉踂跿踍跽踊踃踇踆踅跾踀踄輐輑輎輍鄣鄜鄠鄢鄟鄝鄚鄤鄡鄛酺酲酹酳銥銤鉶銛鉺銠銔銪銍"
  ],
  [
    "e4a1",
    "銦銚銫鉹銗鉿銣鋮銎銂銕銢鉽銈銡銊銆銌銙銧鉾銇銩銝銋鈭隞隡雿靘靽靺靾鞃鞀鞂靻鞄鞁靿韎韍頖颭颮餂餀餇馝馜駃馹馻馺駂馽駇骱髣髧鬾鬿魠魡魟鳱鳲鳵麧僿儃儰僸儆儇僶僾儋儌僽儊劋劌勱勯噈噂噌嘵噁噊噉噆噘"
  ],
  [
    "e540",
    "噚噀嘳嘽嘬嘾嘸嘪嘺圚墫墝墱墠墣墯墬墥墡壿嫿嫴嫽嫷嫶嬃嫸嬂嫹嬁嬇嬅嬏屧嶙嶗嶟嶒嶢嶓嶕嶠嶜嶡嶚嶞幩幝幠幜緳廛廞廡彉徲憋憃慹憱憰憢憉"
  ],
  [
    "e5a1",
    "憛憓憯憭憟憒憪憡憍慦憳戭摮摰撖撠撅撗撜撏撋撊撌撣撟摨撱撘敶敺敹敻斲斳暵暰暩暲暷暪暯樀樆樗槥槸樕槱槤樠槿槬槢樛樝槾樧槲槮樔槷槧橀樈槦槻樍槼槫樉樄樘樥樏槶樦樇槴樖歑殥殣殢殦氁氀毿氂潁漦潾澇濆澒"
  ],
  [
    "e640",
    "澍澉澌潢潏澅潚澖潶潬澂潕潲潒潐潗澔澓潝漀潡潫潽潧澐潓澋潩潿澕潣潷潪潻熲熯熛熰熠熚熩熵熝熥熞熤熡熪熜熧熳犘犚獘獒獞獟獠獝獛獡獚獙"
  ],
  [
    "e6a1",
    "獢璇璉璊璆璁瑽璅璈瑼瑹甈甇畾瘥瘞瘙瘝瘜瘣瘚瘨瘛皜皝皞皛瞍瞏瞉瞈磍碻磏磌磑磎磔磈磃磄磉禚禡禠禜禢禛歶稹窲窴窳箷篋箾箬篎箯箹篊箵糅糈糌糋緷緛緪緧緗緡縃緺緦緶緱緰緮緟罶羬羰羭翭翫翪翬翦翨聤聧膣膟"
  ],
  [
    "e740",
    "膞膕膢膙膗舖艏艓艒艐艎艑蔤蔻蔏蔀蔩蔎蔉蔍蔟蔊蔧蔜蓻蔫蓺蔈蔌蓴蔪蓲蔕蓷蓫蓳蓼蔒蓪蓩蔖蓾蔨蔝蔮蔂蓽蔞蓶蔱蔦蓧蓨蓰蓯蓹蔘蔠蔰蔋蔙蔯虢"
  ],
  [
    "e7a1",
    "蝖蝣蝤蝷蟡蝳蝘蝔蝛蝒蝡蝚蝑蝞蝭蝪蝐蝎蝟蝝蝯蝬蝺蝮蝜蝥蝏蝻蝵蝢蝧蝩衚褅褌褔褋褗褘褙褆褖褑褎褉覢覤覣觭觰觬諏諆誸諓諑諔諕誻諗誾諀諅諘諃誺誽諙谾豍貏賥賟賙賨賚賝賧趠趜趡趛踠踣踥踤踮踕踛踖踑踙踦踧"
  ],
  [
    "e840",
    "踔踒踘踓踜踗踚輬輤輘輚輠輣輖輗遳遰遯遧遫鄯鄫鄩鄪鄲鄦鄮醅醆醊醁醂醄醀鋐鋃鋄鋀鋙銶鋏鋱鋟鋘鋩鋗鋝鋌鋯鋂鋨鋊鋈鋎鋦鋍鋕鋉鋠鋞鋧鋑鋓"
  ],
  [
    "e8a1",
    "銵鋡鋆銴镼閬閫閮閰隤隢雓霅霈霂靚鞊鞎鞈韐韏頞頝頦頩頨頠頛頧颲餈飺餑餔餖餗餕駜駍駏駓駔駎駉駖駘駋駗駌骳髬髫髳髲髱魆魃魧魴魱魦魶魵魰魨魤魬鳼鳺鳽鳿鳷鴇鴀鳹鳻鴈鴅鴄麃黓鼏鼐儜儓儗儚儑凞匴叡噰噠噮"
  ],
  [
    "e940",
    "噳噦噣噭噲噞噷圜圛壈墽壉墿墺壂墼壆嬗嬙嬛嬡嬔嬓嬐嬖嬨嬚嬠嬞寯嶬嶱嶩嶧嶵嶰嶮嶪嶨嶲嶭嶯嶴幧幨幦幯廩廧廦廨廥彋徼憝憨憖懅憴懆懁懌憺"
  ],
  [
    "e9a1",
    "憿憸憌擗擖擐擏擉撽撉擃擛擳擙攳敿敼斢曈暾曀曊曋曏暽暻暺曌朣樴橦橉橧樲橨樾橝橭橶橛橑樨橚樻樿橁橪橤橐橏橔橯橩橠樼橞橖橕橍橎橆歕歔歖殧殪殫毈毇氄氃氆澭濋澣濇澼濎濈潞濄澽澞濊澨瀄澥澮澺澬澪濏澿澸"
  ],
  [
    "ea40",
    "澢濉澫濍澯澲澰燅燂熿熸燖燀燁燋燔燊燇燏熽燘熼燆燚燛犝犞獩獦獧獬獥獫獪瑿璚璠璔璒璕璡甋疀瘯瘭瘱瘽瘳瘼瘵瘲瘰皻盦瞚瞝瞡瞜瞛瞢瞣瞕瞙"
  ],
  [
    "eaa1",
    "瞗磝磩磥磪磞磣磛磡磢磭磟磠禤穄穈穇窶窸窵窱窷篞篣篧篝篕篥篚篨篹篔篪篢篜篫篘篟糒糔糗糐糑縒縡縗縌縟縠縓縎縜縕縚縢縋縏縖縍縔縥縤罃罻罼罺羱翯耪耩聬膱膦膮膹膵膫膰膬膴膲膷膧臲艕艖艗蕖蕅蕫蕍蕓蕡蕘"
  ],
  [
    "eb40",
    "蕀蕆蕤蕁蕢蕄蕑蕇蕣蔾蕛蕱蕎蕮蕵蕕蕧蕠薌蕦蕝蕔蕥蕬虣虥虤螛螏螗螓螒螈螁螖螘蝹螇螣螅螐螑螝螄螔螜螚螉褞褦褰褭褮褧褱褢褩褣褯褬褟觱諠"
  ],
  [
    "eba1",
    "諢諲諴諵諝謔諤諟諰諈諞諡諨諿諯諻貑貒貐賵賮賱賰賳赬赮趥趧踳踾踸蹀蹅踶踼踽蹁踰踿躽輶輮輵輲輹輷輴遶遹遻邆郺鄳鄵鄶醓醐醑醍醏錧錞錈錟錆錏鍺錸錼錛錣錒錁鍆錭錎錍鋋錝鋺錥錓鋹鋷錴錂錤鋿錩錹錵錪錔錌"
  ],
  [
    "ec40",
    "錋鋾錉錀鋻錖閼闍閾閹閺閶閿閵閽隩雔霋霒霐鞙鞗鞔韰韸頵頯頲餤餟餧餩馞駮駬駥駤駰駣駪駩駧骹骿骴骻髶髺髹髷鬳鮀鮅鮇魼魾魻鮂鮓鮒鮐魺鮕"
  ],
  [
    "eca1",
    "魽鮈鴥鴗鴠鴞鴔鴩鴝鴘鴢鴐鴙鴟麈麆麇麮麭黕黖黺鼒鼽儦儥儢儤儠儩勴嚓嚌嚍嚆嚄嚃噾嚂噿嚁壖壔壏壒嬭嬥嬲嬣嬬嬧嬦嬯嬮孻寱寲嶷幬幪徾徻懃憵憼懧懠懥懤懨懞擯擩擣擫擤擨斁斀斶旚曒檍檖檁檥檉檟檛檡檞檇檓檎"
  ],
  [
    "ed40",
    "檕檃檨檤檑橿檦檚檅檌檒歛殭氉濌澩濴濔濣濜濭濧濦濞濲濝濢濨燡燱燨燲燤燰燢獳獮獯璗璲璫璐璪璭璱璥璯甐甑甒甏疄癃癈癉癇皤盩瞵瞫瞲瞷瞶"
  ],
  [
    "eda1",
    "瞴瞱瞨矰磳磽礂磻磼磲礅磹磾礄禫禨穜穛穖穘穔穚窾竀竁簅簏篲簀篿篻簎篴簋篳簂簉簃簁篸篽簆篰篱簐簊糨縭縼繂縳顈縸縪繉繀繇縩繌縰縻縶繄縺罅罿罾罽翴翲耬膻臄臌臊臅臇膼臩艛艚艜薃薀薏薧薕薠薋薣蕻薤薚薞"
  ],
  [
    "ee40",
    "蕷蕼薉薡蕺蕸蕗薎薖薆薍薙薝薁薢薂薈薅蕹蕶薘薐薟虨螾螪螭蟅螰螬螹螵螼螮蟉蟃蟂蟌螷螯蟄蟊螴螶螿螸螽蟞螲褵褳褼褾襁襒褷襂覭覯覮觲觳謞"
  ],
  [
    "eea1",
    "謘謖謑謅謋謢謏謒謕謇謍謈謆謜謓謚豏豰豲豱豯貕貔賹赯蹎蹍蹓蹐蹌蹇轃轀邅遾鄸醚醢醛醙醟醡醝醠鎡鎃鎯鍤鍖鍇鍼鍘鍜鍶鍉鍐鍑鍠鍭鎏鍌鍪鍹鍗鍕鍒鍏鍱鍷鍻鍡鍞鍣鍧鎀鍎鍙闇闀闉闃闅閷隮隰隬霠霟霘霝霙鞚鞡鞜"
  ],
  [
    "ef40",
    "鞞鞝韕韔韱顁顄顊顉顅顃餥餫餬餪餳餲餯餭餱餰馘馣馡騂駺駴駷駹駸駶駻駽駾駼騃骾髾髽鬁髼魈鮚鮨鮞鮛鮦鮡鮥鮤鮆鮢鮠鮯鴳鵁鵧鴶鴮鴯鴱鴸鴰"
  ],
  [
    "efa1",
    "鵅鵂鵃鴾鴷鵀鴽翵鴭麊麉麍麰黈黚黻黿鼤鼣鼢齔龠儱儭儮嚘嚜嚗嚚嚝嚙奰嬼屩屪巀幭幮懘懟懭懮懱懪懰懫懖懩擿攄擽擸攁攃擼斔旛曚曛曘櫅檹檽櫡櫆檺檶檷櫇檴檭歞毉氋瀇瀌瀍瀁瀅瀔瀎濿瀀濻瀦濼濷瀊爁燿燹爃燽獶"
  ],
  [
    "f040",
    "璸瓀璵瓁璾璶璻瓂甔甓癜癤癙癐癓癗癚皦皽盬矂瞺磿礌礓礔礉礐礒礑禭禬穟簜簩簙簠簟簭簝簦簨簢簥簰繜繐繖繣繘繢繟繑繠繗繓羵羳翷翸聵臑臒"
  ],
  [
    "f0a1",
    "臐艟艞薴藆藀藃藂薳薵薽藇藄薿藋藎藈藅薱薶藒蘤薸薷薾虩蟧蟦蟢蟛蟫蟪蟥蟟蟳蟤蟔蟜蟓蟭蟘蟣螤蟗蟙蠁蟴蟨蟝襓襋襏襌襆襐襑襉謪謧謣謳謰謵譇謯謼謾謱謥謷謦謶謮謤謻謽謺豂豵貙貘貗賾贄贂贀蹜蹢蹠蹗蹖蹞蹥蹧"
  ],
  [
    "f140",
    "蹛蹚蹡蹝蹩蹔轆轇轈轋鄨鄺鄻鄾醨醥醧醯醪鎵鎌鎒鎷鎛鎝鎉鎧鎎鎪鎞鎦鎕鎈鎙鎟鎍鎱鎑鎲鎤鎨鎴鎣鎥闒闓闑隳雗雚巂雟雘雝霣霢霥鞬鞮鞨鞫鞤鞪"
  ],
  [
    "f1a1",
    "鞢鞥韗韙韖韘韺顐顑顒颸饁餼餺騏騋騉騍騄騑騊騅騇騆髀髜鬈鬄鬅鬩鬵魊魌魋鯇鯆鯃鮿鯁鮵鮸鯓鮶鯄鮹鮽鵜鵓鵏鵊鵛鵋鵙鵖鵌鵗鵒鵔鵟鵘鵚麎麌黟鼁鼀鼖鼥鼫鼪鼩鼨齌齕儴儵劖勷厴嚫嚭嚦嚧嚪嚬壚壝壛夒嬽嬾嬿巃幰"
  ],
  [
    "f240",
    "徿懻攇攐攍攉攌攎斄旞旝曞櫧櫠櫌櫑櫙櫋櫟櫜櫐櫫櫏櫍櫞歠殰氌瀙瀧瀠瀖瀫瀡瀢瀣瀩瀗瀤瀜瀪爌爊爇爂爅犥犦犤犣犡瓋瓅璷瓃甖癠矉矊矄矱礝礛"
  ],
  [
    "f2a1",
    "礡礜礗礞禰穧穨簳簼簹簬簻糬糪繶繵繸繰繷繯繺繲繴繨罋罊羃羆羷翽翾聸臗臕艤艡艣藫藱藭藙藡藨藚藗藬藲藸藘藟藣藜藑藰藦藯藞藢蠀蟺蠃蟶蟷蠉蠌蠋蠆蟼蠈蟿蠊蠂襢襚襛襗襡襜襘襝襙覈覷覶觶譐譈譊譀譓譖譔譋譕"
  ],
  [
    "f340",
    "譑譂譒譗豃豷豶貚贆贇贉趬趪趭趫蹭蹸蹳蹪蹯蹻軂轒轑轏轐轓辴酀鄿醰醭鏞鏇鏏鏂鏚鏐鏹鏬鏌鏙鎩鏦鏊鏔鏮鏣鏕鏄鏎鏀鏒鏧镽闚闛雡霩霫霬霨霦"
  ],
  [
    "f3a1",
    "鞳鞷鞶韝韞韟顜顙顝顗颿颽颻颾饈饇饃馦馧騚騕騥騝騤騛騢騠騧騣騞騜騔髂鬋鬊鬎鬌鬷鯪鯫鯠鯞鯤鯦鯢鯰鯔鯗鯬鯜鯙鯥鯕鯡鯚鵷鶁鶊鶄鶈鵱鶀鵸鶆鶋鶌鵽鵫鵴鵵鵰鵩鶅鵳鵻鶂鵯鵹鵿鶇鵨麔麑黀黼鼭齀齁齍齖齗齘匷嚲"
  ],
  [
    "f440",
    "嚵嚳壣孅巆巇廮廯忀忁懹攗攖攕攓旟曨曣曤櫳櫰櫪櫨櫹櫱櫮櫯瀼瀵瀯瀷瀴瀱灂瀸瀿瀺瀹灀瀻瀳灁爓爔犨獽獼璺皫皪皾盭矌矎矏矍矲礥礣礧礨礤礩"
  ],
  [
    "f4a1",
    "禲穮穬穭竷籉籈籊籇籅糮繻繾纁纀羺翿聹臛臙舋艨艩蘢藿蘁藾蘛蘀藶蘄蘉蘅蘌藽蠙蠐蠑蠗蠓蠖襣襦覹觷譠譪譝譨譣譥譧譭趮躆躈躄轙轖轗轕轘轚邍酃酁醷醵醲醳鐋鐓鏻鐠鐏鐔鏾鐕鐐鐨鐙鐍鏵鐀鏷鐇鐎鐖鐒鏺鐉鏸鐊鏿"
  ],
  [
    "f540",
    "鏼鐌鏶鐑鐆闞闠闟霮霯鞹鞻韽韾顠顢顣顟飁飂饐饎饙饌饋饓騲騴騱騬騪騶騩騮騸騭髇髊髆鬐鬒鬑鰋鰈鯷鰅鰒鯸鱀鰇鰎鰆鰗鰔鰉鶟鶙鶤鶝鶒鶘鶐鶛"
  ],
  [
    "f5a1",
    "鶠鶔鶜鶪鶗鶡鶚鶢鶨鶞鶣鶿鶩鶖鶦鶧麙麛麚黥黤黧黦鼰鼮齛齠齞齝齙龑儺儹劘劗囃嚽嚾孈孇巋巏廱懽攛欂櫼欃櫸欀灃灄灊灈灉灅灆爝爚爙獾甗癪矐礭礱礯籔籓糲纊纇纈纋纆纍罍羻耰臝蘘蘪蘦蘟蘣蘜蘙蘧蘮蘡蘠蘩蘞蘥"
  ],
  [
    "f640",
    "蠩蠝蠛蠠蠤蠜蠫衊襭襩襮襫觺譹譸譅譺譻贐贔趯躎躌轞轛轝酆酄酅醹鐿鐻鐶鐩鐽鐼鐰鐹鐪鐷鐬鑀鐱闥闤闣霵霺鞿韡顤飉飆飀饘饖騹騽驆驄驂驁騺"
  ],
  [
    "f6a1",
    "騿髍鬕鬗鬘鬖鬺魒鰫鰝鰜鰬鰣鰨鰩鰤鰡鶷鶶鶼鷁鷇鷊鷏鶾鷅鷃鶻鶵鷎鶹鶺鶬鷈鶱鶭鷌鶳鷍鶲鹺麜黫黮黭鼛鼘鼚鼱齎齥齤龒亹囆囅囋奱孋孌巕巑廲攡攠攦攢欋欈欉氍灕灖灗灒爞爟犩獿瓘瓕瓙瓗癭皭礵禴穰穱籗籜籙籛籚"
  ],
  [
    "f740",
    "糴糱纑罏羇臞艫蘴蘵蘳蘬蘲蘶蠬蠨蠦蠪蠥襱覿覾觻譾讄讂讆讅譿贕躕躔躚躒躐躖躗轠轢酇鑌鑐鑊鑋鑏鑇鑅鑈鑉鑆霿韣顪顩飋饔饛驎驓驔驌驏驈驊"
  ],
  [
    "f7a1",
    "驉驒驐髐鬙鬫鬻魖魕鱆鱈鰿鱄鰹鰳鱁鰼鰷鰴鰲鰽鰶鷛鷒鷞鷚鷋鷐鷜鷑鷟鷩鷙鷘鷖鷵鷕鷝麶黰鼵鼳鼲齂齫龕龢儽劙壨壧奲孍巘蠯彏戁戃戄攩攥斖曫欑欒欏毊灛灚爢玂玁玃癰矔籧籦纕艬蘺虀蘹蘼蘱蘻蘾蠰蠲蠮蠳襶襴襳觾"
  ],
  [
    "f840",
    "讌讎讋讈豅贙躘轤轣醼鑢鑕鑝鑗鑞韄韅頀驖驙鬞鬟鬠鱒鱘鱐鱊鱍鱋鱕鱙鱌鱎鷻鷷鷯鷣鷫鷸鷤鷶鷡鷮鷦鷲鷰鷢鷬鷴鷳鷨鷭黂黐黲黳鼆鼜鼸鼷鼶齃齏"
  ],
  [
    "f8a1",
    "齱齰齮齯囓囍孎屭攭曭曮欓灟灡灝灠爣瓛瓥矕礸禷禶籪纗羉艭虃蠸蠷蠵衋讔讕躞躟躠躝醾醽釂鑫鑨鑩雥靆靃靇韇韥驞髕魙鱣鱧鱦鱢鱞鱠鸂鷾鸇鸃鸆鸅鸀鸁鸉鷿鷽鸄麠鼞齆齴齵齶囔攮斸欘欙欗欚灢爦犪矘矙礹籩籫糶纚"
  ],
  [
    "f940",
    "纘纛纙臠臡虆虇虈襹襺襼襻觿讘讙躥躤躣鑮鑭鑯鑱鑳靉顲饟鱨鱮鱭鸋鸍鸐鸏鸒鸑麡黵鼉齇齸齻齺齹圞灦籯蠼趲躦釃鑴鑸鑶鑵驠鱴鱳鱱鱵鸔鸓黶鼊"
  ],
  [
    "f9a1",
    "龤灨灥糷虪蠾蠽蠿讞貜躩軉靋顳顴飌饡馫驤驦驧鬤鸕鸗齈戇欞爧虌躨钂钀钁驩驨鬮鸙爩虋讟钃鱹麷癵驫鱺鸝灩灪麤齾齉龘碁銹裏墻恒粧嫺╔╦╗╠╬╣╚╩╝╒╤╕╞╪╡╘╧╛╓╥╖╟╫╢╙╨╜║═╭╮╰╯▓"
  ]
], Cc = [
  [
    "8740",
    "䏰䰲䘃䖦䕸𧉧䵷䖳𧲱䳢𧳅㮕䜶䝄䱇䱀𤊿𣘗𧍒𦺋𧃒䱗𪍑䝏䗚䲅𧱬䴇䪤䚡𦬣爥𥩔𡩣𣸆𣽡晍囻"
  ],
  [
    "8767",
    "綕夝𨮹㷴霴𧯯寛𡵞媤㘥𩺰嫑宷峼杮薓𩥅瑡璝㡵𡵓𣚞𦀡㻬"
  ],
  [
    "87a1",
    "𥣞㫵竼龗𤅡𨤍𣇪𠪊𣉞䌊蒄龖鐯䤰蘓墖靊鈘秐稲晠権袝瑌篅枂稬剏遆㓦珄𥶹瓆鿇垳䤯呌䄱𣚎堘穲𧭥讏䚮𦺈䆁𥶙箮𢒼鿈𢓁𢓉𢓌鿉蔄𣖻䂴鿊䓡𪷿拁灮鿋"
  ],
  [
    "8840",
    "㇀",
    4,
    "𠄌㇅𠃑𠃍㇆㇇𠃋𡿨㇈𠃊㇉㇊㇋㇌𠄎㇍㇎ĀÁǍÀĒÉĚÈŌÓǑÒ࿿Ê̄Ế࿿Ê̌ỀÊāáǎàɑēéěèīíǐìōóǒòūúǔùǖǘǚ"
  ],
  [
    "88a1",
    "ǜü࿿ê̄ế࿿ê̌ềêɡ⏚⏛"
  ],
  [
    "8940",
    "𪎩𡅅"
  ],
  [
    "8943",
    "攊"
  ],
  [
    "8946",
    "丽滝鵎釟"
  ],
  [
    "894c",
    "𧜵撑会伨侨兖兴农凤务动医华发变团声处备夲头学实実岚庆总斉柾栄桥济炼电纤纬纺织经统缆缷艺苏药视设询车轧轮"
  ],
  [
    "89a1",
    "琑糼緍楆竉刧"
  ],
  [
    "89ab",
    "醌碸酞肼"
  ],
  [
    "89b0",
    "贋胶𠧧"
  ],
  [
    "89b5",
    "肟黇䳍鷉鸌䰾𩷶𧀎鸊𪄳㗁"
  ],
  [
    "89c1",
    "溚舾甙"
  ],
  [
    "89c5",
    "䤑马骏龙禇𨑬𡷊𠗐𢫦两亁亀亇亿仫伷㑌侽㹈倃傈㑽㒓㒥円夅凛凼刅争剹劐匧㗇厩㕑厰㕓参吣㕭㕲㚁咓咣咴咹哐哯唘唣唨㖘唿㖥㖿嗗㗅"
  ],
  [
    "8a40",
    "𧶄唥"
  ],
  [
    "8a43",
    "𠱂𠴕𥄫喐𢳆㧬𠍁蹆𤶸𩓥䁓𨂾睺𢰸㨴䟕𨅝𦧲𤷪擝𠵼𠾴𠳕𡃴撍蹾𠺖𠰋𠽤𢲩𨉖𤓓"
  ],
  [
    "8a64",
    "𠵆𩩍𨃩䟴𤺧𢳂骲㩧𩗴㿭㔆𥋇𩟔𧣈𢵄鵮頕"
  ],
  [
    "8a76",
    "䏙𦂥撴哣𢵌𢯊𡁷㧻𡁯"
  ],
  [
    "8aa1",
    "𦛚𦜖𧦠擪𥁒𠱃蹨𢆡𨭌𠜱"
  ],
  [
    "8aac",
    "䠋𠆩㿺塳𢶍"
  ],
  [
    "8ab2",
    "𤗈𠓼𦂗𠽌𠶖啹䂻䎺"
  ],
  [
    "8abb",
    "䪴𢩦𡂝膪飵𠶜捹㧾𢝵跀嚡摼㹃"
  ],
  [
    "8ac9",
    "𪘁𠸉𢫏𢳉"
  ],
  [
    "8ace",
    "𡃈𣧂㦒㨆𨊛㕸𥹉𢃇噒𠼱𢲲𩜠㒼氽𤸻"
  ],
  [
    "8adf",
    "𧕴𢺋𢈈𪙛𨳍𠹺𠰴𦠜羓𡃏𢠃𢤹㗻𥇣𠺌𠾍𠺪㾓𠼰𠵇𡅏𠹌"
  ],
  [
    "8af6",
    "𠺫𠮩𠵈𡃀𡄽㿹𢚖搲𠾭"
  ],
  [
    "8b40",
    "𣏴𧘹𢯎𠵾𠵿𢱑𢱕㨘𠺘𡃇𠼮𪘲𦭐𨳒𨶙𨳊閪哌苄喹"
  ],
  [
    "8b55",
    "𩻃鰦骶𧝞𢷮煀腭胬尜𦕲脴㞗卟𨂽醶𠻺𠸏𠹷𠻻㗝𤷫㘉𠳖嚯𢞵𡃉𠸐𠹸𡁸𡅈𨈇𡑕𠹹𤹐𢶤婔𡀝𡀞𡃵𡃶垜𠸑"
  ],
  [
    "8ba1",
    "𧚔𨋍𠾵𠹻𥅾㜃𠾶𡆀𥋘𪊽𤧚𡠺𤅷𨉼墙剨㘚𥜽箲孨䠀䬬鼧䧧鰟鮍𥭴𣄽嗻㗲嚉丨夂𡯁屮靑𠂆乛亻㔾尣彑忄㣺扌攵歺氵氺灬爫丬犭𤣩罒礻糹罓𦉪㓁"
  ],
  [
    "8bde",
    "𦍋耂肀𦘒𦥑卝衤见𧢲讠贝钅镸长门𨸏韦页风飞饣𩠐鱼鸟黄歯龜丷𠂇阝户钢"
  ],
  [
    "8c40",
    "倻淾𩱳龦㷉袏𤅎灷峵䬠𥇍㕙𥴰愢𨨲辧釶熑朙玺𣊁𪄇㲋𡦀䬐磤琂冮𨜏䀉橣𪊺䈣蘏𠩯稪𩥇𨫪靕灍匤𢁾鏴盙𨧣龧矝亣俰傼丯众龨吴綋墒壐𡶶庒庙忂𢜒斋"
  ],
  [
    "8ca1",
    "𣏹椙橃𣱣泿"
  ],
  [
    "8ca7",
    "爀𤔅玌㻛𤨓嬕璹讃𥲤𥚕窓篬糃繬苸薗龩袐龪躹龫迏蕟駠鈡龬𨶹𡐿䁱䊢娚"
  ],
  [
    "8cc9",
    "顨杫䉶圽"
  ],
  [
    "8cce",
    "藖𤥻芿𧄍䲁𦵴嵻𦬕𦾾龭龮宖龯曧繛湗秊㶈䓃𣉖𢞖䎚䔶"
  ],
  [
    "8ce6",
    "峕𣬚諹屸㴒𣕑嵸龲煗䕘𤃬𡸣䱷㥸㑊𠆤𦱁諌侴𠈹妿腬顖𩣺弻"
  ],
  [
    "8d40",
    "𠮟"
  ],
  [
    "8d42",
    "𢇁𨥭䄂䚻𩁹㼇龳𪆵䃸㟖䛷𦱆䅼𨚲𧏿䕭㣔𥒚䕡䔛䶉䱻䵶䗪㿈𤬏㙡䓞䒽䇭崾嵈嵖㷼㠏嶤嶹㠠㠸幂庽弥徃㤈㤔㤿㥍惗愽峥㦉憷憹懏㦸戬抐拥挘㧸嚱"
  ],
  [
    "8da1",
    "㨃揢揻搇摚㩋擀崕嘡龟㪗斆㪽旿晓㫲暒㬢朖㭂枤栀㭘桊梄㭲㭱㭻椉楃牜楤榟榅㮼槖㯝橥橴橱檂㯬檙㯲檫檵櫔櫶殁毁毪汵沪㳋洂洆洦涁㳯涤涱渕渘温溆𨧀溻滢滚齿滨滩漤漴㵆𣽁澁澾㵪㵵熷岙㶊瀬㶑灐灔灯灿炉𠌥䏁㗱𠻘"
  ],
  [
    "8e40",
    "𣻗垾𦻓焾𥟠㙎榢𨯩孴穉𥣡𩓙穥穽𥦬窻窰竂竃燑𦒍䇊竚竝竪䇯咲𥰁笋筕笩𥌎𥳾箢筯莜𥮴𦱿篐萡箒箸𥴠㶭𥱥蒒篺簆簵𥳁籄粃𤢂粦晽𤕸糉糇糦籴糳糵糎"
  ],
  [
    "8ea1",
    "繧䔝𦹄絝𦻖璍綉綫焵綳緒𤁗𦀩緤㴓緵𡟹緥𨍭縝𦄡𦅚繮纒䌫鑬縧罀罁罇礶𦋐駡羗𦍑羣𡙡𠁨䕜𣝦䔃𨌺翺𦒉者耈耝耨耯𪂇𦳃耻耼聡𢜔䦉𦘦𣷣𦛨朥肧𨩈脇脚墰𢛶汿𦒘𤾸擧𡒊舘𡡞橓𤩥𤪕䑺舩𠬍𦩒𣵾俹𡓽蓢荢𦬊𤦧𣔰𡝳𣷸芪椛芳䇛"
  ],
  [
    "8f40",
    "蕋苐茚𠸖𡞴㛁𣅽𣕚艻苢茘𣺋𦶣𦬅𦮗𣗎㶿茝嗬莅䔋𦶥莬菁菓㑾𦻔橗蕚㒖𦹂𢻯葘𥯤葱㷓䓤檧葊𣲵祘蒨𦮖𦹷𦹃蓞萏莑䒠蒓蓤𥲑䉀𥳀䕃蔴嫲𦺙䔧蕳䔖枿蘖"
  ],
  [
    "8fa1",
    "𨘥𨘻藁𧂈蘂𡖂𧃍䕫䕪蘨㙈𡢢号𧎚虾蝱𪃸蟮𢰧螱蟚蠏噡虬桖䘏衅衆𧗠𣶹𧗤衞袜䙛袴袵揁装睷𧜏覇覊覦覩覧覼𨨥觧𧤤𧪽誜瞓釾誐𧩙竩𧬺𣾏䜓𧬸煼謌謟𥐰𥕥謿譌譍誩𤩺讐讛誯𡛟䘕衏貛𧵔𧶏貫㜥𧵓賖𧶘𧶽贒贃𡤐賛灜贑𤳉㻐起"
  ],
  [
    "9040",
    "趩𨀂𡀔𤦊㭼𨆼𧄌竧躭躶軃鋔輙輭𨍥𨐒辥錃𪊟𠩐辳䤪𨧞𨔽𣶻廸𣉢迹𪀔𨚼𨔁𢌥㦀𦻗逷𨔼𧪾遡𨕬𨘋邨𨜓郄𨛦邮都酧㫰醩釄粬𨤳𡺉鈎沟鉁鉢𥖹銹𨫆𣲛𨬌𥗛"
  ],
  [
    "90a1",
    "𠴱錬鍫𨫡𨯫炏嫃𨫢𨫥䥥鉄𨯬𨰹𨯿鍳鑛躼閅閦鐦閠濶䊹𢙺𨛘𡉼𣸮䧟氜陻隖䅬隣𦻕懚隶磵𨫠隽双䦡𦲸𠉴𦐐𩂯𩃥𤫑𡤕𣌊霱虂霶䨏䔽䖅𤫩灵孁霛靜𩇕靗孊𩇫靟鐥僐𣂷𣂼鞉鞟鞱鞾韀韒韠𥑬韮琜𩐳響韵𩐝𧥺䫑頴頳顋顦㬎𧅵㵑𠘰𤅜"
  ],
  [
    "9140",
    "𥜆飊颷飈飇䫿𦴧𡛓喰飡飦飬鍸餹𤨩䭲𩡗𩤅駵騌騻騐驘𥜥㛄𩂱𩯕髠髢𩬅髴䰎鬔鬭𨘀倴鬴𦦨㣃𣁽魐魀𩴾婅𡡣鮎𤉋鰂鯿鰌𩹨鷔𩾷𪆒𪆫𪃡𪄣𪇟鵾鶃𪄴鸎梈"
  ],
  [
    "91a1",
    "鷄𢅛𪆓𪈠𡤻𪈳鴹𪂹𪊴麐麕麞麢䴴麪麯𤍤黁㭠㧥㴝伲㞾𨰫鼂鼈䮖鐤𦶢鼗鼖鼹嚟嚊齅馸𩂋韲葿齢齩竜龎爖䮾𤥵𤦻煷𤧸𤍈𤩑玞𨯚𡣺禟𨥾𨸶鍩鏳𨩄鋬鎁鏋𨥬𤒹爗㻫睲穃烐𤑳𤏸煾𡟯炣𡢾𣖙㻇𡢅𥐯𡟸㜢𡛻𡠹㛡𡝴𡣑𥽋㜣𡛀坛𤨥𡏾𡊨"
  ],
  [
    "9240",
    "𡏆𡒶蔃𣚦蔃葕𤦔𧅥𣸱𥕜𣻻𧁒䓴𣛮𩦝𦼦柹㜳㰕㷧塬𡤢栐䁗𣜿𤃡𤂋𤄏𦰡哋嚞𦚱嚒𠿟𠮨𠸍鏆𨬓鎜仸儫㠙𤐶亼𠑥𠍿佋侊𥙑婨𠆫𠏋㦙𠌊𠐔㐵伩𠋀𨺳𠉵諚𠈌亘"
  ],
  [
    "92a1",
    "働儍侢伃𤨎𣺊佂倮偬傁俌俥偘僼兙兛兝兞湶𣖕𣸹𣺿浲𡢄𣺉冨凃𠗠䓝𠒣𠒒𠒑赺𨪜𠜎剙劤𠡳勡鍮䙺熌𤎌𠰠𤦬𡃤槑𠸝瑹㻞璙琔瑖玘䮎𤪼𤂍叐㖄爏𤃉喴𠍅响𠯆圝鉝雴鍦埝垍坿㘾壋媙𨩆𡛺𡝯𡜐娬妸銏婾嫏娒𥥆𡧳𡡡𤊕㛵洅瑃娡𥺃"
  ],
  [
    "9340",
    "媁𨯗𠐓鏠璌𡌃焅䥲鐈𨧻鎽㞠尞岞幞幈𡦖𡥼𣫮廍孏𡤃𡤄㜁𡢠㛝𡛾㛓脪𨩇𡶺𣑲𨦨弌弎𡤧𡞫婫𡜻孄蘔𧗽衠恾𢡠𢘫忛㺸𢖯𢖾𩂈𦽳懀𠀾𠁆𢘛憙憘恵𢲛𢴇𤛔𩅍"
  ],
  [
    "93a1",
    "摱𤙥𢭪㨩𢬢𣑐𩣪𢹸挷𪑛撶挱揑𤧣𢵧护𢲡搻敫楲㯴𣂎𣊭𤦉𣊫唍𣋠𡣙𩐿曎𣊉𣆳㫠䆐𥖄𨬢𥖏𡛼𥕛𥐥磮𣄃𡠪𣈴㑤𣈏𣆂𤋉暎𦴤晫䮓昰𧡰𡷫晣𣋒𣋡昞𥡲㣑𣠺𣞼㮙𣞢𣏾瓐㮖枏𤘪梶栞㯄檾㡣𣟕𤒇樳橒櫉欅𡤒攑梘橌㯗橺歗𣿀𣲚鎠鋲𨯪𨫋"
  ],
  [
    "9440",
    "銉𨀞𨧜鑧涥漋𤧬浧𣽿㶏渄𤀼娽渊塇洤硂焻𤌚𤉶烱牐犇犔𤞏𤜥兹𤪤𠗫瑺𣻸𣙟𤩊𤤗𥿡㼆㺱𤫟𨰣𣼵悧㻳瓌琼鎇琷䒟𦷪䕑疃㽣𤳙𤴆㽘畕癳𪗆㬙瑨𨫌𤦫𤦎㫻"
  ],
  [
    "94a1",
    "㷍𤩎㻿𤧅𤣳釺圲鍂𨫣𡡤僟𥈡𥇧睸𣈲眎眏睻𤚗𣞁㩞𤣰琸璛㺿𤪺𤫇䃈𤪖𦆮錇𥖁砞碍碈磒珐祙𧝁𥛣䄎禛蒖禥樭𣻺稺秴䅮𡛦䄲鈵秱𠵌𤦌𠊙𣶺𡝮㖗啫㕰㚪𠇔𠰍竢婙𢛵𥪯𥪜娍𠉛磰娪𥯆竾䇹籝籭䈑𥮳𥺼𥺦糍𤧹𡞰粎籼粮檲緜縇緓罎𦉡"
  ],
  [
    "9540",
    "𦅜𧭈綗𥺂䉪𦭵𠤖柖𠁎𣗏埄𦐒𦏸𤥢翝笧𠠬𥫩𥵃笌𥸎駦虅驣樜𣐿㧢𤧷𦖭騟𦖠蒀𧄧𦳑䓪脷䐂胆脉腂𦞴飃𦩂艢艥𦩑葓𦶧蘐𧈛媆䅿𡡀嬫𡢡嫤𡣘蚠蜨𣶏蠭𧐢娂"
  ],
  [
    "95a1",
    "衮佅袇袿裦襥襍𥚃襔𧞅𧞄𨯵𨯙𨮜𨧹㺭蒣䛵䛏㟲訽訜𩑈彍鈫𤊄旔焩烄𡡅鵭貟賩𧷜妚矃姰䍮㛔踪躧𤰉輰轊䋴汘澻𢌡䢛潹溋𡟚鯩㚵𤤯邻邗啱䤆醻鐄𨩋䁢𨫼鐧𨰝𨰻蓥訫閙閧閗閖𨴴瑅㻂𤣿𤩂𤏪㻧𣈥随𨻧𨹦𨹥㻌𤧭𤩸𣿮琒瑫㻼靁𩂰"
  ],
  [
    "9640",
    "桇䨝𩂓𥟟靝鍨𨦉𨰦𨬯𦎾銺嬑譩䤼珹𤈛鞛靱餸𠼦巁𨯅𤪲頟𩓚鋶𩗗釥䓀𨭐𤩧𨭤飜𨩅㼀鈪䤥萔餻饍𧬆㷽馛䭯馪驜𨭥𥣈檏騡嫾騯𩣱䮐𩥈馼䮽䮗鍽塲𡌂堢𤦸"
  ],
  [
    "96a1",
    "𡓨硄𢜟𣶸棅㵽鑘㤧慐𢞁𢥫愇鱏鱓鱻鰵鰐魿鯏𩸭鮟𪇵𪃾鴡䲮𤄄鸘䲰鴌𪆴𪃭𪃳𩤯鶥蒽𦸒𦿟𦮂藼䔳𦶤𦺄𦷰萠藮𦸀𣟗𦁤秢𣖜𣙀䤭𤧞㵢鏛銾鍈𠊿碹鉷鑍俤㑀遤𥕝砽硔碶硋𡝗𣇉𤥁㚚佲濚濙瀞瀞吔𤆵垻壳垊鴖埗焴㒯𤆬燫𦱀𤾗嬨𡞵𨩉"
  ],
  [
    "9740",
    "愌嫎娋䊼𤒈㜬䭻𨧼鎻鎸𡣖𠼝葲𦳀𡐓𤋺𢰦𤏁妔𣶷𦝁綨𦅛𦂤𤦹𤦋𨧺鋥珢㻩璴𨭣𡢟㻡𤪳櫘珳珻㻖𤨾𤪔𡟙𤩦𠎧𡐤𤧥瑈𤤖炥𤥶銄珦鍟𠓾錱𨫎𨨖鎆𨯧𥗕䤵𨪂煫"
  ],
  [
    "97a1",
    "𤥃𠳿嚤𠘚𠯫𠲸唂秄𡟺緾𡛂𤩐𡡒䔮鐁㜊𨫀𤦭妰𡢿𡢃𧒄媡㛢𣵛㚰鉟婹𨪁𡡢鍴㳍𠪴䪖㦊僴㵩㵌𡎜煵䋻𨈘渏𩃤䓫浗𧹏灧沯㳖𣿭𣸭渂漌㵯𠏵畑㚼㓈䚀㻚䡱姄鉮䤾轁𨰜𦯀堒埈㛖𡑒烾𤍢𤩱𢿣𡊰𢎽梹楧𡎘𣓥𧯴𣛟𨪃𣟖𣏺𤲟樚𣚭𦲷萾䓟䓎"
  ],
  [
    "9840",
    "𦴦𦵑𦲂𦿞漗𧄉茽𡜺菭𦲀𧁓𡟛妉媂𡞳婡婱𡤅𤇼㜭姯𡜼㛇熎鎐暚𤊥婮娫𤊓樫𣻹𧜶𤑛𤋊焝𤉙𨧡侰𦴨峂𤓎𧹍𤎽樌𤉖𡌄炦焳𤏩㶥泟勇𤩏繥姫崯㷳彜𤩝𡟟綤萦"
  ],
  [
    "98a1",
    "咅𣫺𣌀𠈔坾𠣕𠘙㿥𡾞𪊶瀃𩅛嵰玏糓𨩙𩐠俈翧狍猐𧫴猸猹𥛶獁獈㺩𧬘遬燵𤣲珡臶㻊県㻑沢国琙琞琟㻢㻰㻴㻺瓓㼎㽓畂畭畲疍㽼痈痜㿀癍㿗癴㿜発𤽜熈嘣覀塩䀝睃䀹条䁅㗛瞘䁪䁯属瞾矋売砘点砜䂨砹硇硑硦葈𥔵礳栃礲䄃"
  ],
  [
    "9940",
    "䄉禑禙辻稆込䅧窑䆲窼艹䇄竏竛䇏両筢筬筻簒簛䉠䉺类粜䊌粸䊔糭输烀𠳏総緔緐緽羮羴犟䎗耠耥笹耮耱联㷌垴炠肷胩䏭脌猪脎脒畠脔䐁㬹腖腙腚"
  ],
  [
    "99a1",
    "䐓堺腼膄䐥膓䐭膥埯臁臤艔䒏芦艶苊苘苿䒰荗险榊萅烵葤惣蒈䔄蒾蓡蓸蔐蔸蕒䔻蕯蕰藠䕷虲蚒蚲蛯际螋䘆䘗袮裿褤襇覑𧥧訩訸誔誴豑賔賲贜䞘塟跃䟭仮踺嗘坔蹱嗵躰䠷軎転軤軭軲辷迁迊迌逳駄䢭飠鈓䤞鈨鉘鉫銱銮銿"
  ],
  [
    "9a40",
    "鋣鋫鋳鋴鋽鍃鎄鎭䥅䥑麿鐗匁鐝鐭鐾䥪鑔鑹锭関䦧间阳䧥枠䨤靀䨵鞲韂噔䫤惨颹䬙飱塄餎餙冴餜餷饂饝饢䭰駅䮝騼鬏窃魩鮁鯝鯱鯴䱭鰠㝯𡯂鵉鰺"
  ],
  [
    "9aa1",
    "黾噐鶓鶽鷀鷼银辶鹻麬麱麽黆铜黢黱黸竈齄𠂔𠊷𠎠椚铃妬𠓗塀铁㞹𠗕𠘕𠙶𡚺块煳𠫂𠫍𠮿呪吆𠯋咞𠯻𠰻𠱓𠱥𠱼惧𠲍噺𠲵𠳝𠳭𠵯𠶲𠷈楕鰯螥𠸄𠸎𠻗𠾐𠼭𠹳尠𠾼帋𡁜𡁏𡁶朞𡁻𡂈𡂖㙇𡂿𡃓𡄯𡄻卤蒭𡋣𡍵𡌶讁𡕷𡘙𡟃𡟇乸炻𡠭𡥪"
  ],
  [
    "9b40",
    "𡨭𡩅𡰪𡱰𡲬𡻈拃𡻕𡼕熘桕𢁅槩㛈𢉼𢏗𢏺𢜪𢡱𢥏苽𢥧𢦓𢫕覥𢫨辠𢬎鞸𢬿顇骽𢱌"
  ],
  [
    "9b62",
    "𢲈𢲷𥯨𢴈𢴒𢶷𢶕𢹂𢽴𢿌𣀳𣁦𣌟𣏞徱晈暿𧩹𣕧𣗳爁𤦺矗𣘚𣜖纇𠍆墵朎"
  ],
  [
    "9ba1",
    "椘𣪧𧙗𥿢𣸑𣺹𧗾𢂚䣐䪸𤄙𨪚𤋮𤌍𤀻𤌴𤎖𤩅𠗊凒𠘑妟𡺨㮾𣳿𤐄𤓖垈𤙴㦛𤜯𨗨𩧉㝢𢇃譞𨭎駖𤠒𤣻𤨕爉𤫀𠱸奥𤺥𤾆𠝹軚𥀬劏圿煱𥊙𥐙𣽊𤪧喼𥑆𥑮𦭒釔㑳𥔿𧘲𥕞䜘𥕢𥕦𥟇𤤿𥡝偦㓻𣏌惞𥤃䝼𨥈𥪮𥮉𥰆𡶐垡煑澶𦄂𧰒遖𦆲𤾚譢𦐂𦑊"
  ],
  [
    "9c40",
    "嵛𦯷輶𦒄𡤜諪𤧶𦒈𣿯𦔒䯀𦖿𦚵𢜛鑥𥟡憕娧晉侻嚹𤔡𦛼乪𤤴陖涏𦲽㘘襷𦞙𦡮𦐑𦡞營𦣇筂𩃀𠨑𦤦鄄𦤹穅鷰𦧺騦𦨭㙟𦑩𠀡禃𦨴𦭛崬𣔙菏𦮝䛐𦲤画补𦶮墶"
  ],
  [
    "9ca1",
    "㜜𢖍𧁋𧇍㱔𧊀𧊅銁𢅺𧊋錰𧋦𤧐氹钟𧑐𠻸蠧裵𢤦𨑳𡞱溸𤨪𡠠㦤㚹尐秣䔿暶𩲭𩢤襃𧟌𧡘囖䃟𡘊㦡𣜯𨃨𡏅熭荦𧧝𩆨婧䲷𧂯𨦫𧧽𧨊𧬋𧵦𤅺筃祾𨀉澵𪋟樃𨌘厢𦸇鎿栶靝𨅯𨀣𦦵𡏭𣈯𨁈嶅𨰰𨂃圕頣𨥉嶫𤦈斾槕叒𤪥𣾁㰑朶𨂐𨃴𨄮𡾡𨅏"
  ],
  [
    "9d40",
    "𨆉𨆯𨈚𨌆𨌯𨎊㗊𨑨𨚪䣺揦𨥖砈鉕𨦸䏲𨧧䏟𨧨𨭆𨯔姸𨰉輋𨿅𩃬筑𩄐𩄼㷷𩅞𤫊运犏嚋𩓧𩗩𩖰𩖸𩜲𩣑𩥉𩥪𩧃𩨨𩬎𩵚𩶛纟𩻸𩼣䲤镇𪊓熢𪋿䶑递𪗋䶜𠲜达嗁"
  ],
  [
    "9da1",
    "辺𢒰边𤪓䔉繿潖檱仪㓤𨬬𧢝㜺躀𡟵𨀤𨭬𨮙𧨾𦚯㷫𧙕𣲷𥘵𥥖亚𥺁𦉘嚿𠹭踎孭𣺈𤲞揞拐𡟶𡡻攰嘭𥱊吚𥌑㷆𩶘䱽嘢嘞罉𥻘奵𣵀蝰东𠿪𠵉𣚺脗鵞贘瘻鱅癎瞹鍅吲腈苷嘥脲萘肽嗪祢噃吖𠺝㗎嘅嗱曱𨋢㘭甴嗰喺咗啲𠱁𠲖廐𥅈𠹶𢱢"
  ],
  [
    "9e40",
    "𠺢麫絚嗞𡁵抝靭咔賍燶酶揼掹揾啩𢭃鱲𢺳冚㓟𠶧冧呍唞唓癦踭𦢊疱肶蠄螆裇膶萜𡃁䓬猄𤜆宐茋𦢓噻𢛴𧴯𤆣𧵳𦻐𧊶酰𡇙鈈𣳼𪚩𠺬𠻹牦𡲢䝎𤿂𧿹𠿫䃺"
  ],
  [
    "9ea1",
    "鱝攟𢶠䣳𤟠𩵼𠿬𠸊恢𧖣𠿭"
  ],
  [
    "9ead",
    "𦁈𡆇熣纎鵐业丄㕷嬍沲卧㚬㧜卽㚥𤘘墚𤭮舭呋垪𥪕𠥹"
  ],
  [
    "9ec5",
    "㩒𢑥獴𩺬䴉鯭𣳾𩼰䱛𤾩𩖞𩿞葜𣶶𧊲𦞳𣜠挮紥𣻷𣸬㨪逈勌㹴㙺䗩𠒎癀嫰𠺶硺𧼮墧䂿噼鮋嵴癔𪐴麅䳡痹㟻愙𣃚𤏲"
  ],
  [
    "9ef5",
    "噝𡊩垧𤥣𩸆刴𧂮㖭汊鵼"
  ],
  [
    "9f40",
    "籖鬹埞𡝬屓擓𩓐𦌵𧅤蚭𠴨𦴢𤫢𠵱"
  ],
  [
    "9f4f",
    "凾𡼏嶎霃𡷑麁遌笟鬂峑箣扨挵髿篏鬪籾鬮籂粆鰕篼鬉鼗鰛𤤾齚啳寃俽麘俲剠㸆勑坧偖妷帒韈鶫轜呩鞴饀鞺匬愰"
  ],
  [
    "9fa1",
    "椬叚鰊鴂䰻陁榀傦畆𡝭駚剳"
  ],
  [
    "9fae",
    "酙隁酜"
  ],
  [
    "9fb2",
    "酑𨺗捿𦴣櫊嘑醎畺抅𠏼獏籰𥰡𣳽"
  ],
  [
    "9fc1",
    "𤤙盖鮝个𠳔莾衂"
  ],
  [
    "9fc9",
    "届槀僭坺刟巵从氱𠇲伹咜哚劚趂㗾弌㗳"
  ],
  [
    "9fdb",
    "歒酼龥鮗頮颴骺麨麄煺笔"
  ],
  [
    "9fe7",
    "毺蠘罸"
  ],
  [
    "9feb",
    "嘠𪙊蹷齓"
  ],
  [
    "9ff0",
    "跔蹏鸜踁抂𨍽踨蹵竓𤩷稾磘泪詧瘇"
  ],
  [
    "a040",
    "𨩚鼦泎蟖痃𪊲硓咢贌狢獱謭猂瓱賫𤪻蘯徺袠䒷"
  ],
  [
    "a055",
    "𡠻𦸅"
  ],
  [
    "a058",
    "詾𢔛"
  ],
  [
    "a05b",
    "惽癧髗鵄鍮鮏蟵"
  ],
  [
    "a063",
    "蠏賷猬霡鮰㗖犲䰇籑饊𦅙慙䰄麖慽"
  ],
  [
    "a073",
    "坟慯抦戹拎㩜懢厪𣏵捤栂㗒"
  ],
  [
    "a0a1",
    "嵗𨯂迚𨸹"
  ],
  [
    "a0a6",
    "僙𡵆礆匲阸𠼻䁥"
  ],
  [
    "a0ae",
    "矾"
  ],
  [
    "a0b0",
    "糂𥼚糚稭聦聣絍甅瓲覔舚朌聢𧒆聛瓰脃眤覉𦟌畓𦻑螩蟎臈螌詉貭譃眫瓸蓚㘵榲趦"
  ],
  [
    "a0d4",
    "覩瑨涹蟁𤀑瓧㷛煶悤憜㳑煢恷"
  ],
  [
    "a0e2",
    "罱𨬭牐惩䭾删㰘𣳇𥻗𧙖𥔱𡥄𡋾𩤃𦷜𧂭峁𦆭𨨏𣙷𠃮𦡆𤼎䕢嬟𦍌齐麦𦉫"
  ],
  [
    "a3c0",
    "␀",
    31,
    "␡"
  ],
  [
    "c6a1",
    "①",
    9,
    "⑴",
    9,
    "ⅰ",
    9,
    "丶丿亅亠冂冖冫勹匸卩厶夊宀巛⼳广廴彐彡攴无疒癶辵隶¨ˆヽヾゝゞ〃仝々〆〇ー［］✽ぁ",
    23
  ],
  [
    "c740",
    "す",
    58,
    "ァアィイ"
  ],
  [
    "c7a1",
    "ゥ",
    81,
    "А",
    5,
    "ЁЖ",
    4
  ],
  [
    "c840",
    "Л",
    26,
    "ёж",
    25,
    "⇧↸↹㇏𠃌乚𠂊刂䒑"
  ],
  [
    "c8a1",
    "龰冈龱𧘇"
  ],
  [
    "c8cd",
    "￢￤＇＂㈱№℡゛゜⺀⺄⺆⺇⺈⺊⺌⺍⺕⺜⺝⺥⺧⺪⺬⺮⺶⺼⺾⻆⻊⻌⻍⻏⻖⻗⻞⻣"
  ],
  [
    "c8f5",
    "ʃɐɛɔɵœøŋʊɪ"
  ],
  [
    "f9fe",
    "￭"
  ],
  [
    "fa40",
    "𠕇鋛𠗟𣿅蕌䊵珯况㙉𤥂𨧤鍄𡧛苮𣳈砼杄拟𤤳𨦪𠊠𦮳𡌅侫𢓭倈𦴩𧪄𣘀𤪱𢔓倩𠍾徤𠎀𠍇滛𠐟偽儁㑺儎顬㝃萖𤦤𠒇兠𣎴兪𠯿𢃼𠋥𢔰𠖎𣈳𡦃宂蝽𠖳𣲙冲冸"
  ],
  [
    "faa1",
    "鴴凉减凑㳜凓𤪦决凢卂凭菍椾𣜭彻刋刦刼劵剗劔効勅簕蕂勠蘍𦬓包𨫞啉滙𣾀𠥔𣿬匳卄𠯢泋𡜦栛珕恊㺪㣌𡛨燝䒢卭却𨚫卾卿𡖖𡘓矦厓𨪛厠厫厮玧𥝲㽙玜叁叅汉义埾叙㪫𠮏叠𣿫𢶣叶𠱷吓灹唫晗浛呭𦭓𠵴啝咏咤䞦𡜍𠻝㶴𠵍"
  ],
  [
    "fb40",
    "𨦼𢚘啇䳭启琗喆喩嘅𡣗𤀺䕒𤐵暳𡂴嘷曍𣊊暤暭噍噏磱囱鞇叾圀囯园𨭦㘣𡉏坆𤆥汮炋坂㚱𦱾埦𡐖堃𡑔𤍣堦𤯵塜墪㕡壠壜𡈼壻寿坃𪅐𤉸鏓㖡够梦㛃湙"
  ],
  [
    "fba1",
    "𡘾娤啓𡚒蔅姉𠵎𦲁𦴪𡟜姙𡟻𡞲𦶦浱𡠨𡛕姹𦹅媫婣㛦𤦩婷㜈媖瑥嫓𦾡𢕔㶅𡤑㜲𡚸広勐孶斈孼𧨎䀄䡝𠈄寕慠𡨴𥧌𠖥寳宝䴐尅𡭄尓珎尔𡲥𦬨屉䣝岅峩峯嶋𡷹𡸷崐崘嵆𡺤岺巗苼㠭𤤁𢁉𢅳芇㠶㯂帮檊幵幺𤒼𠳓厦亷廐厨𡝱帉廴𨒂"
  ],
  [
    "fc40",
    "廹廻㢠廼栾鐛弍𠇁弢㫞䢮𡌺强𦢈𢏐彘𢑱彣鞽𦹮彲鍀𨨶徧嶶㵟𥉐𡽪𧃸𢙨釖𠊞𨨩怱暅𡡷㥣㷇㘹垐𢞴祱㹀悞悤悳𤦂𤦏𧩓璤僡媠慤萤慂慈𦻒憁凴𠙖憇宪𣾷"
  ],
  [
    "fca1",
    "𢡟懓𨮝𩥝懐㤲𢦀𢣁怣慜攞掋𠄘担𡝰拕𢸍捬𤧟㨗搸揸𡎎𡟼撐澊𢸶頔𤂌𥜝擡擥鑻㩦携㩗敍漖𤨨𤨣斅敭敟𣁾斵𤥀䬷旑䃘𡠩无旣忟𣐀昘𣇷𣇸晄𣆤𣆥晋𠹵晧𥇦晳晴𡸽𣈱𨗴𣇈𥌓矅𢣷馤朂𤎜𤨡㬫槺𣟂杞杧杢𤇍𩃭柗䓩栢湐鈼栁𣏦𦶠桝"
  ],
  [
    "fd40",
    "𣑯槡樋𨫟楳棃𣗍椁椀㴲㨁𣘼㮀枬楡𨩊䋼椶榘㮡𠏉荣傐槹𣙙𢄪橅𣜃檝㯳枱櫈𩆜㰍欝𠤣惞欵歴𢟍溵𣫛𠎵𡥘㝀吡𣭚毡𣻼毜氷𢒋𤣱𦭑汚舦汹𣶼䓅𣶽𤆤𤤌𤤀"
  ],
  [
    "fda1",
    "𣳉㛥㳫𠴲鮃𣇹𢒑羏样𦴥𦶡𦷫涖浜湼漄𤥿𤂅𦹲蔳𦽴凇沜渝萮𨬡港𣸯瑓𣾂秌湏媑𣁋濸㜍澝𣸰滺𡒗𤀽䕕鏰潄潜㵎潴𩅰㴻澟𤅄濓𤂑𤅕𤀹𣿰𣾴𤄿凟𤅖𤅗𤅀𦇝灋灾炧炁烌烕烖烟䄄㷨熴熖𤉷焫煅媈煊煮岜𤍥煏鍢𤋁焬𤑚𤨧𤨢熺𨯨炽爎"
  ],
  [
    "fe40",
    "鑂爕夑鑃爤鍁𥘅爮牀𤥴梽牕牗㹕𣁄栍漽犂猪猫𤠣𨠫䣭𨠄猨献珏玪𠰺𦨮珉瑉𤇢𡛧𤨤昣㛅𤦷𤦍𤧻珷琕椃𤨦琹𠗃㻗瑜𢢭瑠𨺲瑇珤瑶莹瑬㜰瑴鏱樬璂䥓𤪌"
  ],
  [
    "fea1",
    "𤅟𤩹𨮏孆𨰃𡢞瓈𡦈甎瓩甞𨻙𡩋寗𨺬鎅畍畊畧畮𤾂㼄𤴓疎瑝疞疴瘂瘬癑癏癯癶𦏵皐臯㟸𦤑𦤎皡皥皷盌𦾟葢𥂝𥅽𡸜眞眦着撯𥈠睘𣊬瞯𨥤𨥨𡛁矴砉𡍶𤨒棊碯磇磓隥礮𥗠磗礴碱𧘌辸袄𨬫𦂃𢘜禆褀椂禀𥡗禝𧬹礼禩渪𧄦㺨秆𩄍秔"
  ]
];
var pn, Ji;
function Oc() {
  return Ji || (Ji = 1, pn = {
    // == Japanese/ShiftJIS ====================================================
    // All japanese encodings are based on JIS X set of standards:
    // JIS X 0201 - Single-byte encoding of ASCII + ¥ + Kana chars at 0xA1-0xDF.
    // JIS X 0208 - Main set of 6879 characters, placed in 94x94 plane, to be encoded by 2 bytes. 
    //              Has several variations in 1978, 1983, 1990 and 1997.
    // JIS X 0212 - Supplementary plane of 6067 chars in 94x94 plane. 1990. Effectively dead.
    // JIS X 0213 - Extension and modern replacement of 0208 and 0212. Total chars: 11233.
    //              2 planes, first is superset of 0208, second - revised 0212.
    //              Introduced in 2000, revised 2004. Some characters are in Unicode Plane 2 (0x2xxxx)
    // Byte encodings are:
    //  * Shift_JIS: Compatible with 0201, uses not defined chars in top half as lead bytes for double-byte
    //               encoding of 0208. Lead byte ranges: 0x81-0x9F, 0xE0-0xEF; Trail byte ranges: 0x40-0x7E, 0x80-0x9E, 0x9F-0xFC.
    //               Windows CP932 is a superset of Shift_JIS. Some companies added more chars, notably KDDI.
    //  * EUC-JP:    Up to 3 bytes per character. Used mostly on *nixes.
    //               0x00-0x7F       - lower part of 0201
    //               0x8E, 0xA1-0xDF - upper part of 0201
    //               (0xA1-0xFE)x2   - 0208 plane (94x94).
    //               0x8F, (0xA1-0xFE)x2 - 0212 plane (94x94).
    //  * JIS X 208: 7-bit, direct encoding of 0208. Byte ranges: 0x21-0x7E (94 values). Uncommon.
    //               Used as-is in ISO2022 family.
    //  * ISO2022-JP: Stateful encoding, with escape sequences to switch between ASCII, 
    //                0201-1976 Roman, 0208-1978, 0208-1983.
    //  * ISO2022-JP-1: Adds esc seq for 0212-1990.
    //  * ISO2022-JP-2: Adds esc seq for GB2313-1980, KSX1001-1992, ISO8859-1, ISO8859-7.
    //  * ISO2022-JP-3: Adds esc seq for 0201-1976 Kana set, 0213-2000 Planes 1, 2.
    //  * ISO2022-JP-2004: Adds 0213-2004 Plane 1.
    //
    // After JIS X 0213 appeared, Shift_JIS-2004, EUC-JISX0213 and ISO2022-JP-2004 followed, with just changing the planes.
    //
    // Overall, it seems that it's a mess :( http://www8.plala.or.jp/tkubota1/unicode-symbols-map2.html
    shiftjis: {
      type: "_dbcs",
      table: function() {
        return Ec;
      },
      encodeAdd: { "¥": 92, "‾": 126 },
      encodeSkipVals: [{ from: 60736, to: 63808 }]
    },
    csshiftjis: "shiftjis",
    mskanji: "shiftjis",
    sjis: "shiftjis",
    windows31j: "shiftjis",
    ms31j: "shiftjis",
    xsjis: "shiftjis",
    windows932: "shiftjis",
    ms932: "shiftjis",
    932: "shiftjis",
    cp932: "shiftjis",
    eucjp: {
      type: "_dbcs",
      table: function() {
        return Sc;
      },
      encodeAdd: { "¥": 92, "‾": 126 }
    },
    // TODO: KDDI extension to Shift_JIS
    // TODO: IBM CCSID 942 = CP932, but F0-F9 custom chars and other char changes.
    // TODO: IBM CCSID 943 = Shift_JIS = CP932 with original Shift_JIS lower 128 chars.
    // == Chinese/GBK ==========================================================
    // http://en.wikipedia.org/wiki/GBK
    // We mostly implement W3C recommendation: https://www.w3.org/TR/encoding/#gbk-encoder
    // Oldest GB2312 (1981, ~7600 chars) is a subset of CP936
    gb2312: "cp936",
    gb231280: "cp936",
    gb23121980: "cp936",
    csgb2312: "cp936",
    csiso58gb231280: "cp936",
    euccn: "cp936",
    // Microsoft's CP936 is a subset and approximation of GBK.
    windows936: "cp936",
    ms936: "cp936",
    936: "cp936",
    cp936: {
      type: "_dbcs",
      table: function() {
        return cn;
      }
    },
    // GBK (~22000 chars) is an extension of CP936 that added user-mapped chars and some other.
    gbk: {
      type: "_dbcs",
      table: function() {
        return cn.concat(Zi);
      }
    },
    xgbk: "gbk",
    isoir58: "gbk",
    // GB18030 is an algorithmic extension of GBK.
    // Main source: https://www.w3.org/TR/encoding/#gbk-encoder
    // http://icu-project.org/docs/papers/gb18030.html
    // http://source.icu-project.org/repos/icu/data/trunk/charset/data/xml/gb-18030-2000.xml
    // http://www.khngai.com/chinese/charmap/tblgbk.php?page=0
    gb18030: {
      type: "_dbcs",
      table: function() {
        return cn.concat(Zi);
      },
      gb18030: function() {
        return _c;
      },
      encodeSkipVals: [128],
      encodeAdd: { "€": 41699 }
    },
    chinese: "gb18030",
    // == Korean ===============================================================
    // EUC-KR, KS_C_5601 and KS X 1001 are exactly the same.
    windows949: "cp949",
    ms949: "cp949",
    949: "cp949",
    cp949: {
      type: "_dbcs",
      table: function() {
        return Tc;
      }
    },
    cseuckr: "cp949",
    csksc56011987: "cp949",
    euckr: "cp949",
    isoir149: "cp949",
    korean: "cp949",
    ksc56011987: "cp949",
    ksc56011989: "cp949",
    ksc5601: "cp949",
    // == Big5/Taiwan/Hong Kong ================================================
    // There are lots of tables for Big5 and cp950. Please see the following links for history:
    // http://moztw.org/docs/big5/  http://www.haible.de/bruno/charsets/conversion-tables/Big5.html
    // Variations, in roughly number of defined chars:
    //  * Windows CP 950: Microsoft variant of Big5. Canonical: http://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WINDOWS/CP950.TXT
    //  * Windows CP 951: Microsoft variant of Big5-HKSCS-2001. Seems to be never public. http://me.abelcheung.org/articles/research/what-is-cp951/
    //  * Big5-2003 (Taiwan standard) almost superset of cp950.
    //  * Unicode-at-on (UAO) / Mozilla 1.8. Falling out of use on the Web. Not supported by other browsers.
    //  * Big5-HKSCS (-2001, -2004, -2008). Hong Kong standard. 
    //    many unicode code points moved from PUA to Supplementary plane (U+2XXXX) over the years.
    //    Plus, it has 4 combining sequences.
    //    Seems that Mozilla refused to support it for 10 yrs. https://bugzilla.mozilla.org/show_bug.cgi?id=162431 https://bugzilla.mozilla.org/show_bug.cgi?id=310299
    //    because big5-hkscs is the only encoding to include astral characters in non-algorithmic way.
    //    Implementations are not consistent within browsers; sometimes labeled as just big5.
    //    MS Internet Explorer switches from big5 to big5-hkscs when a patch applied.
    //    Great discussion & recap of what's going on https://bugzilla.mozilla.org/show_bug.cgi?id=912470#c31
    //    In the encoder, it might make sense to support encoding old PUA mappings to Big5 bytes seq-s.
    //    Official spec: http://www.ogcio.gov.hk/en/business/tech_promotion/ccli/terms/doc/2003cmp_2008.txt
    //                   http://www.ogcio.gov.hk/tc/business/tech_promotion/ccli/terms/doc/hkscs-2008-big5-iso.txt
    // 
    // Current understanding of how to deal with Big5(-HKSCS) is in the Encoding Standard, http://encoding.spec.whatwg.org/#big5-encoder
    // Unicode mapping (http://www.unicode.org/Public/MAPPINGS/OBSOLETE/EASTASIA/OTHER/BIG5.TXT) is said to be wrong.
    windows950: "cp950",
    ms950: "cp950",
    950: "cp950",
    cp950: {
      type: "_dbcs",
      table: function() {
        return Qi;
      }
    },
    // Big5 has many variations and is an extension of cp950. We use Encoding Standard's as a consensus.
    big5: "big5hkscs",
    big5hkscs: {
      type: "_dbcs",
      table: function() {
        return Qi.concat(Cc);
      },
      encodeSkipVals: [41676]
    },
    cnbig5: "big5hkscs",
    csbig5: "big5hkscs",
    xxbig5: "big5hkscs"
  }), pn;
}
var Ki;
function Pc() {
  return Ki || (Ki = 1, function(a) {
    for (var e = [
      xc(),
      hc(),
      gc(),
      bc(),
      yc(),
      wc(),
      kc(),
      Oc()
    ], n = 0; n < e.length; n++) {
      var i = e[n];
      for (var t in i)
        Object.prototype.hasOwnProperty.call(i, t) && (a[t] = i[t]);
    }
  }(an)), an;
}
var ln, Yi;
function $c() {
  if (Yi) return ln;
  Yi = 1;
  var a = we.Buffer, e = Xe.Transform;
  ln = function(t) {
    t.encodeStream = function(o, s) {
      return new n(t.getEncoder(o, s), s);
    }, t.decodeStream = function(o, s) {
      return new i(t.getDecoder(o, s), s);
    }, t.supportsStreams = !0, t.IconvLiteEncoderStream = n, t.IconvLiteDecoderStream = i, t._collect = i.prototype.collect;
  };
  function n(t, r) {
    this.conv = t, r = r || {}, r.decodeStrings = !1, e.call(this, r);
  }
  n.prototype = Object.create(e.prototype, {
    constructor: { value: n }
  }), n.prototype._transform = function(t, r, o) {
    if (typeof t != "string")
      return o(new Error("Iconv encoding stream needs strings as its input."));
    try {
      var s = this.conv.write(t);
      s && s.length && this.push(s), o();
    } catch (c) {
      o(c);
    }
  }, n.prototype._flush = function(t) {
    try {
      var r = this.conv.end();
      r && r.length && this.push(r), t();
    } catch (o) {
      t(o);
    }
  }, n.prototype.collect = function(t) {
    var r = [];
    return this.on("error", t), this.on("data", function(o) {
      r.push(o);
    }), this.on("end", function() {
      t(null, a.concat(r));
    }), this;
  };
  function i(t, r) {
    this.conv = t, r = r || {}, r.encoding = this.encoding = "utf8", e.call(this, r);
  }
  return i.prototype = Object.create(e.prototype, {
    constructor: { value: i }
  }), i.prototype._transform = function(t, r, o) {
    if (!a.isBuffer(t))
      return o(new Error("Iconv decoding stream needs buffers as its input."));
    try {
      var s = this.conv.write(t);
      s && s.length && this.push(s, this.encoding), o();
    } catch (c) {
      o(c);
    }
  }, i.prototype._flush = function(t) {
    try {
      var r = this.conv.end();
      r && r.length && this.push(r, this.encoding), t();
    } catch (o) {
      t(o);
    }
  }, i.prototype.collect = function(t) {
    var r = "";
    return this.on("error", t), this.on("data", function(o) {
      r += o;
    }), this.on("end", function() {
      t(null, r);
    }), this;
  }, ln;
}
var un, et;
function Rc() {
  if (et) return un;
  et = 1;
  var a = we.Buffer;
  return un = function(e) {
    var n = void 0;
    e.supportsNodeEncodingsExtension = !(a.from || new a(0) instanceof Uint8Array), e.extendNodeEncodings = function() {
      if (!n) {
        if (n = {}, !e.supportsNodeEncodingsExtension) {
          console.error("ACTION NEEDED: require('iconv-lite').extendNodeEncodings() is not supported in your version of Node"), console.error("See more info at https://github.com/ashtuchkin/iconv-lite/wiki/Node-v4-compatibility");
          return;
        }
        var t = {
          hex: !0,
          utf8: !0,
          "utf-8": !0,
          ascii: !0,
          binary: !0,
          base64: !0,
          ucs2: !0,
          "ucs-2": !0,
          utf16le: !0,
          "utf-16le": !0
        };
        a.isNativeEncoding = function(s) {
          return s && t[s.toLowerCase()];
        };
        var r = we.SlowBuffer;
        if (n.SlowBufferToString = r.prototype.toString, r.prototype.toString = function(s, c, u) {
          return s = String(s || "utf8").toLowerCase(), a.isNativeEncoding(s) ? n.SlowBufferToString.call(this, s, c, u) : (typeof c > "u" && (c = 0), typeof u > "u" && (u = this.length), e.decode(this.slice(c, u), s));
        }, n.SlowBufferWrite = r.prototype.write, r.prototype.write = function(s, c, u, p) {
          if (isFinite(c))
            isFinite(u) || (p = u, u = void 0);
          else {
            var f = p;
            p = c, c = u, u = f;
          }
          c = +c || 0;
          var l = this.length - c;
          if (u ? (u = +u, u > l && (u = l)) : u = l, p = String(p || "utf8").toLowerCase(), a.isNativeEncoding(p))
            return n.SlowBufferWrite.call(this, s, c, u, p);
          if (s.length > 0 && (u < 0 || c < 0))
            throw new RangeError("attempt to write beyond buffer bounds");
          var x = e.encode(s, p);
          return x.length < u && (u = x.length), x.copy(this, c, 0, u), u;
        }, n.BufferIsEncoding = a.isEncoding, a.isEncoding = function(s) {
          return a.isNativeEncoding(s) || e.encodingExists(s);
        }, n.BufferByteLength = a.byteLength, a.byteLength = r.byteLength = function(s, c) {
          return c = String(c || "utf8").toLowerCase(), a.isNativeEncoding(c) ? n.BufferByteLength.call(this, s, c) : e.encode(s, c).length;
        }, n.BufferToString = a.prototype.toString, a.prototype.toString = function(s, c, u) {
          return s = String(s || "utf8").toLowerCase(), a.isNativeEncoding(s) ? n.BufferToString.call(this, s, c, u) : (typeof c > "u" && (c = 0), typeof u > "u" && (u = this.length), e.decode(this.slice(c, u), s));
        }, n.BufferWrite = a.prototype.write, a.prototype.write = function(s, c, u, p) {
          var f = c, l = u, x = p;
          if (isFinite(c))
            isFinite(u) || (p = u, u = void 0);
          else {
            var v = p;
            p = c, c = u, u = v;
          }
          if (p = String(p || "utf8").toLowerCase(), a.isNativeEncoding(p))
            return n.BufferWrite.call(this, s, f, l, x);
          c = +c || 0;
          var d = this.length - c;
          if (u ? (u = +u, u > d && (u = d)) : u = d, s.length > 0 && (u < 0 || c < 0))
            throw new RangeError("attempt to write beyond buffer bounds");
          var m = e.encode(s, p);
          return m.length < u && (u = m.length), m.copy(this, c, 0, u), u;
        }, e.supportsStreams) {
          var o = Xe.Readable;
          n.ReadableSetEncoding = o.prototype.setEncoding, o.prototype.setEncoding = function(c, u) {
            this._readableState.decoder = e.getDecoder(c, u), this._readableState.encoding = c;
          }, o.prototype.collect = e._collect;
        }
      }
    }, e.undoExtendNodeEncodings = function() {
      if (e.supportsNodeEncodingsExtension) {
        if (!n)
          throw new Error("require('iconv-lite').undoExtendNodeEncodings(): Nothing to undo; extendNodeEncodings() is not called.");
        delete a.isNativeEncoding;
        var t = we.SlowBuffer;
        if (t.prototype.toString = n.SlowBufferToString, t.prototype.write = n.SlowBufferWrite, a.isEncoding = n.BufferIsEncoding, a.byteLength = n.BufferByteLength, a.prototype.toString = n.BufferToString, a.prototype.write = n.BufferWrite, e.supportsStreams) {
          var r = Xe.Readable;
          r.prototype.setEncoding = n.ReadableSetEncoding, delete r.prototype.collect;
        }
        n = void 0;
      }
    };
  }, un;
}
var at;
function Cr() {
  return at || (at = 1, function(a) {
    var e = qe().Buffer, n = vc(), i = a.exports;
    i.encodings = null, i.defaultCharUnicode = "�", i.defaultCharSingleByte = "?", i.encode = function(s, c, u) {
      s = "" + (s || "");
      var p = i.getEncoder(c, u), f = p.write(s), l = p.end();
      return l && l.length > 0 ? e.concat([f, l]) : f;
    }, i.decode = function(s, c, u) {
      typeof s == "string" && (i.skipDecodeWarning || (console.error("Iconv-lite warning: decode()-ing strings is deprecated. Refer to https://github.com/ashtuchkin/iconv-lite/wiki/Use-Buffers-when-decoding"), i.skipDecodeWarning = !0), s = e.from("" + (s || ""), "binary"));
      var p = i.getDecoder(c, u), f = p.write(s), l = p.end();
      return l ? f + l : f;
    }, i.encodingExists = function(s) {
      try {
        return i.getCodec(s), !0;
      } catch {
        return !1;
      }
    }, i.toEncoding = i.encode, i.fromEncoding = i.decode, i._codecDataCache = {}, i.getCodec = function(s) {
      i.encodings || (i.encodings = Pc());
      for (var c = i._canonicalizeEncoding(s), u = {}; ; ) {
        var p = i._codecDataCache[c];
        if (p)
          return p;
        var f = i.encodings[c];
        switch (typeof f) {
          case "string":
            c = f;
            break;
          case "object":
            for (var l in f)
              u[l] = f[l];
            u.encodingName || (u.encodingName = c), c = f.type;
            break;
          case "function":
            return u.encodingName || (u.encodingName = c), p = new f(u, i), i._codecDataCache[u.encodingName] = p, p;
          default:
            throw new Error("Encoding not recognized: '" + s + "' (searched as: '" + c + "')");
        }
      }
    }, i._canonicalizeEncoding = function(o) {
      return ("" + o).toLowerCase().replace(/:\d{4}$|[^0-9a-z]/g, "");
    }, i.getEncoder = function(s, c) {
      var u = i.getCodec(s), p = new u.encoder(c, u);
      return u.bomAware && c && c.addBOM && (p = new n.PrependBOM(p, c)), p;
    }, i.getDecoder = function(s, c) {
      var u = i.getCodec(s), p = new u.decoder(c, u);
      return u.bomAware && !(c && c.stripBOM === !1) && (p = new n.StripBOM(p, c)), p;
    };
    var t = typeof process < "u" && process.versions && process.versions.node;
    if (t) {
      var r = t.split(".").map(Number);
      (r[0] > 0 || r[1] >= 10) && $c()(i), Rc()(i);
    }
  }(Ya)), Ya.exports;
}
/*!
 * unpipe
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var ei = qc;
function Ic(a) {
  for (var e = a.listeners("data"), n = 0; n < e.length; n++)
    if (e[n].name === "ondata")
      return !0;
  return !1;
}
function qc(a) {
  if (!a)
    throw new TypeError("argument stream is required");
  if (typeof a.unpipe == "function") {
    a.unpipe();
    return;
  }
  if (Ic(a))
    for (var e, n = a.listeners("close"), i = 0; i < n.length; i++)
      e = n[i], !(e.name !== "cleanup" && e.name !== "onclose") && e.call(a);
}
/*!
 * raw-body
 * Copyright(c) 2013-2014 Jonathan Ong
 * Copyright(c) 2014-2022 Douglas Christopher Wilson
 * MIT Licensed
 */
var dn, nt;
function Fc() {
  if (nt) return dn;
  nt = 1;
  var a = p(), e = Qe(), n = Ie, i = Cr(), t = ei;
  dn = s;
  var r = /^Encoding not recognized: /;
  function o(l) {
    if (!l) return null;
    try {
      return i.getDecoder(l);
    } catch (x) {
      throw r.test(x.message) ? n(415, "specified encoding unsupported", {
        encoding: l,
        type: "encoding.unsupported"
      }) : x;
    }
  }
  function s(l, x, v) {
    var d = v, m = x || {};
    if (l === void 0)
      throw new TypeError("argument stream is required");
    if (typeof l != "object" || l === null || typeof l.on != "function")
      throw new TypeError("argument stream must be a stream");
    if ((x === !0 || typeof x == "string") && (m = {
      encoding: x
    }), typeof x == "function" && (d = x, m = {}), d !== void 0 && typeof d != "function")
      throw new TypeError("argument callback must be a function");
    if (!d && !Ea.Promise)
      throw new TypeError("argument callback is required");
    var h = m.encoding !== !0 ? m.encoding : "utf-8", g = e.parse(m.limit), b = m.length != null && !isNaN(m.length) ? parseInt(m.length, 10) : null;
    return d ? u(l, h, b, g, f(d)) : new Promise(function(w, k) {
      u(l, h, b, g, function(_, E) {
        if (_) return k(_);
        w(E);
      });
    });
  }
  function c(l) {
    t(l), typeof l.pause == "function" && l.pause();
  }
  function u(l, x, v, d, m) {
    var h = !1, g = !0;
    if (d !== null && v !== null && v > d)
      return A(n(413, "request entity too large", {
        expected: v,
        length: v,
        limit: d,
        type: "entity.too.large"
      }));
    var b = l._readableState;
    if (l._decoder || b && (b.encoding || b.decoder))
      return A(n(500, "stream encoding should not be set", {
        type: "stream.encoding.set"
      }));
    if (typeof l.readable < "u" && !l.readable)
      return A(n(500, "stream is not readable", {
        type: "stream.not.readable"
      }));
    var y = 0, w;
    try {
      w = o(x);
    } catch (T) {
      return A(T);
    }
    var k = w ? "" : [];
    l.on("aborted", _), l.on("close", j), l.on("data", E), l.on("end", S), l.on("error", S), g = !1;
    function A() {
      for (var T = new Array(arguments.length), C = 0; C < T.length; C++)
        T[C] = arguments[C];
      h = !0, g ? process.nextTick(B) : B();
      function B() {
        j(), T[0] && c(l), m.apply(null, T);
      }
    }
    function _() {
      h || A(n(400, "request aborted", {
        code: "ECONNABORTED",
        expected: v,
        length: v,
        received: y,
        type: "request.aborted"
      }));
    }
    function E(T) {
      h || (y += T.length, d !== null && y > d ? A(n(413, "request entity too large", {
        limit: d,
        received: y,
        type: "entity.too.large"
      })) : w ? k += w.write(T) : k.push(T));
    }
    function S(T) {
      if (!h) {
        if (T) return A(T);
        if (v !== null && y !== v)
          A(n(400, "request size did not match content length", {
            expected: v,
            length: v,
            received: y,
            type: "request.size.invalid"
          }));
        else {
          var C = w ? k + (w.end() || "") : Buffer.concat(k);
          A(null, C);
        }
      }
    }
    function j() {
      k = null, l.removeListener("aborted", _), l.removeListener("data", E), l.removeListener("end", S), l.removeListener("error", S), l.removeListener("close", j);
    }
  }
  function p() {
    try {
      return require("async_hooks");
    } catch {
      return {};
    }
  }
  function f(l) {
    var x;
    return a.AsyncResource && (x = new a.AsyncResource(l.name || "bound-anonymous-fn")), !x || !x.runInAsyncScope ? l : x.runInAsyncScope.bind(x, l, null);
  }
  return dn;
}
var ai = { exports: {} };
/*!
 * ee-first
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 */
var zc = Bc;
function Bc(a, e) {
  if (!Array.isArray(a))
    throw new TypeError("arg must be an array of [ee, events...] arrays");
  for (var n = [], i = 0; i < a.length; i++) {
    var t = a[i];
    if (!Array.isArray(t) || t.length < 2)
      throw new TypeError("each array member must be [ee, events...]");
    for (var r = t[0], o = 1; o < t.length; o++) {
      var s = t[o], c = Dc(s, u);
      r.on(s, c), n.push({
        ee: r,
        event: s,
        fn: c
      });
    }
  }
  function u() {
    p(), e.apply(null, arguments);
  }
  function p() {
    for (var l, x = 0; x < n.length; x++)
      l = n[x], l.ee.removeListener(l.event, l.fn);
  }
  function f(l) {
    e = l;
  }
  return f.cancel = p, f;
}
function Dc(a, e) {
  return function(i) {
    for (var t = new Array(arguments.length), r = this, o = a === "error" ? i : null, s = 0; s < t.length; s++)
      t[s] = arguments[s];
    e(o, r, a, t);
  };
}
/*!
 * on-finished
 * Copyright(c) 2013 Jonathan Ong
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */
ai.exports = Lc;
ai.exports.isFinished = Or;
var it = Wc(), tt = zc, Nc = typeof setImmediate == "function" ? setImmediate : function(a) {
  process.nextTick(a.bind.apply(a, arguments));
};
function Lc(a, e) {
  return Or(a) !== !1 ? (Nc(e, null, a), a) : (Uc(a, Vc(e)), a);
}
function Or(a) {
  var e = a.socket;
  if (typeof a.finished == "boolean")
    return !!(a.finished || e && !e.writable);
  if (typeof a.complete == "boolean")
    return !!(a.upgrade || !e || !e.readable || a.complete && !a.readable);
}
function Mc(a, e) {
  var n, i, t = !1;
  function r(s) {
    n.cancel(), i.cancel(), t = !0, e(s);
  }
  n = i = tt([[a, "end", "finish"]], r);
  function o(s) {
    a.removeListener("socket", o), !t && n === i && (i = tt([[s, "error", "close"]], r));
  }
  if (a.socket) {
    o(a.socket);
    return;
  }
  a.on("socket", o), a.socket === void 0 && Gc(a, o);
}
function Uc(a, e) {
  var n = a.__onFinished;
  (!n || !n.queue) && (n = a.__onFinished = Hc(a), Mc(a, n)), n.queue.push(e);
}
function Hc(a) {
  function e(n) {
    if (a.__onFinished === e && (a.__onFinished = null), !!e.queue) {
      var i = e.queue;
      e.queue = null;
      for (var t = 0; t < i.length; t++)
        i[t](n, a);
    }
  }
  return e.queue = [], e;
}
function Gc(a, e) {
  var n = a.assignSocket;
  typeof n == "function" && (a.assignSocket = function(t) {
    n.call(this, t), e(t);
  });
}
function Wc() {
  try {
    return require("async_hooks");
  } catch {
    return {};
  }
}
function Vc(a) {
  var e;
  return it.AsyncResource && (e = new it.AsyncResource(a.name || "bound-anonymous-fn")), !e || !e.runInAsyncScope ? a : e.runInAsyncScope.bind(e, a, null);
}
var Ba = ai.exports;
/*!
 * body-parser
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var fn, rt;
function Da() {
  if (rt) return fn;
  rt = 1;
  var a = Ie, e = Tr, n = Fc(), i = Cr(), t = Ba, r = ei, o = xr;
  fn = s;
  function s(p, f, l, x, v, d) {
    var m, h = d, g;
    p._body = !0;
    var b = h.encoding !== null ? h.encoding : null, y = h.verify;
    try {
      g = c(p, v, h.inflate), m = g.length, g.length = void 0;
    } catch (w) {
      return l(w);
    }
    if (h.length = m, h.encoding = y ? null : b, h.encoding === null && b !== null && !i.encodingExists(b))
      return l(a(415, 'unsupported charset "' + b.toUpperCase() + '"', {
        charset: b.toLowerCase(),
        type: "charset.unsupported"
      }));
    v("read body"), n(g, h, function(w, k) {
      if (w) {
        var A;
        w.type === "encoding.unsupported" ? A = a(415, 'unsupported charset "' + b.toUpperCase() + '"', {
          charset: b.toLowerCase(),
          type: "charset.unsupported"
        }) : A = a(400, w), g !== p && (r(p), e(g, !0)), u(p, function() {
          l(a(400, A));
        });
        return;
      }
      if (y)
        try {
          v("verify body"), y(p, f, k, b);
        } catch (E) {
          l(a(403, E, {
            body: k,
            type: E.type || "entity.verify.failed"
          }));
          return;
        }
      var _ = k;
      try {
        v("parse body"), _ = typeof k != "string" && b !== null ? i.decode(k, b) : k, p.body = x(_);
      } catch (E) {
        l(a(400, E, {
          body: _,
          type: E.type || "entity.parse.failed"
        }));
        return;
      }
      l();
    });
  }
  function c(p, f, l) {
    var x = (p.headers["content-encoding"] || "identity").toLowerCase(), v = p.headers["content-length"], d;
    if (f('content-encoding "%s"', x), l === !1 && x !== "identity")
      throw a(415, "content encoding unsupported", {
        encoding: x,
        type: "encoding.unsupported"
      });
    switch (x) {
      case "deflate":
        d = o.createInflate(), f("inflate body"), p.pipe(d);
        break;
      case "gzip":
        d = o.createGunzip(), f("gunzip body"), p.pipe(d);
        break;
      case "identity":
        d = p, d.length = v;
        break;
      default:
        throw a(415, 'unsupported content encoding "' + x + '"', {
          encoding: x,
          type: "encoding.unsupported"
        });
    }
    return d;
  }
  function u(p, f) {
    t.isFinished(p) ? f(null) : (t(p, f), p.resume());
  }
  return fn;
}
var Fe = { exports: {} }, ni = {};
/*!
 * media-typer
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */
var ot = /; *([!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) *= *("(?:[ !\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u0020-\u007e])*"|[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) */g, Xc = /^[\u0020-\u007e\u0080-\u00ff]+$/, Pr = /^[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+$/, Zc = /\\([\u0000-\u007f])/g, Qc = /([\\"])/g, Jc = /^[A-Za-z0-9][A-Za-z0-9!#$&^_.-]{0,126}$/, st = /^[A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126}$/, Kc = /^ *([A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126})\/([A-Za-z0-9][A-Za-z0-9!#$&^_.+-]{0,126}) *$/;
ni.format = Yc;
ni.parse = ep;
function Yc(a) {
  if (!a || typeof a != "object")
    throw new TypeError("argument obj is required");
  var e = a.parameters, n = a.subtype, i = a.suffix, t = a.type;
  if (!t || !st.test(t))
    throw new TypeError("invalid type");
  if (!n || !Jc.test(n))
    throw new TypeError("invalid subtype");
  var r = t + "/" + n;
  if (i) {
    if (!st.test(i))
      throw new TypeError("invalid suffix");
    r += "+" + i;
  }
  if (e && typeof e == "object")
    for (var o, s = Object.keys(e).sort(), c = 0; c < s.length; c++) {
      if (o = s[c], !Pr.test(o))
        throw new TypeError("invalid parameter name");
      r += "; " + o + "=" + np(e[o]);
    }
  return r;
}
function ep(a) {
  if (!a)
    throw new TypeError("argument string is required");
  if (typeof a == "object" && (a = ap(a)), typeof a != "string")
    throw new TypeError("argument string is required to be a string");
  var e = a.indexOf(";"), n = e !== -1 ? a.substr(0, e) : a, i, t, r = ip(n), o = {}, s;
  for (ot.lastIndex = e; t = ot.exec(a); ) {
    if (t.index !== e)
      throw new TypeError("invalid parameter format");
    e += t[0].length, i = t[1].toLowerCase(), s = t[2], s[0] === '"' && (s = s.substr(1, s.length - 2).replace(Zc, "$1")), o[i] = s;
  }
  if (e !== -1 && e !== a.length)
    throw new TypeError("invalid parameter format");
  return r.parameters = o, r;
}
function ap(a) {
  if (typeof a.getHeader == "function")
    return a.getHeader("content-type");
  if (typeof a.headers == "object")
    return a.headers && a.headers["content-type"];
}
function np(a) {
  var e = String(a);
  if (Pr.test(e))
    return e;
  if (e.length > 0 && !Xc.test(e))
    throw new TypeError("invalid parameter value");
  return '"' + e.replace(Qc, "\\$1") + '"';
}
function ip(a) {
  var e = Kc.exec(a.toLowerCase());
  if (!e)
    throw new TypeError("invalid media type");
  var n = e[1], i = e[2], t, r = i.lastIndexOf("+");
  r !== -1 && (t = i.substr(r + 1), i = i.substr(0, r));
  var o = {
    type: n,
    subtype: i,
    suffix: t
  };
  return o;
}
var ii = {};
const tp = {
  "application/1d-interleaved-parityfec": {
    source: "iana"
  },
  "application/3gpdash-qoe-report+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/3gpp-ims+xml": {
    source: "iana",
    compressible: !0
  },
  "application/3gpphal+json": {
    source: "iana",
    compressible: !0
  },
  "application/3gpphalforms+json": {
    source: "iana",
    compressible: !0
  },
  "application/a2l": {
    source: "iana"
  },
  "application/ace+cbor": {
    source: "iana"
  },
  "application/activemessage": {
    source: "iana"
  },
  "application/activity+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-costmap+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-costmapfilter+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-directory+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointcost+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointcostparams+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointprop+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointpropparams+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-error+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-networkmap+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-networkmapfilter+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-updatestreamcontrol+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-updatestreamparams+json": {
    source: "iana",
    compressible: !0
  },
  "application/aml": {
    source: "iana"
  },
  "application/andrew-inset": {
    source: "iana",
    extensions: [
      "ez"
    ]
  },
  "application/applefile": {
    source: "iana"
  },
  "application/applixware": {
    source: "apache",
    extensions: [
      "aw"
    ]
  },
  "application/at+jwt": {
    source: "iana"
  },
  "application/atf": {
    source: "iana"
  },
  "application/atfx": {
    source: "iana"
  },
  "application/atom+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atom"
    ]
  },
  "application/atomcat+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atomcat"
    ]
  },
  "application/atomdeleted+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atomdeleted"
    ]
  },
  "application/atomicmail": {
    source: "iana"
  },
  "application/atomsvc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atomsvc"
    ]
  },
  "application/atsc-dwd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dwd"
    ]
  },
  "application/atsc-dynamic-event-message": {
    source: "iana"
  },
  "application/atsc-held+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "held"
    ]
  },
  "application/atsc-rdt+json": {
    source: "iana",
    compressible: !0
  },
  "application/atsc-rsat+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rsat"
    ]
  },
  "application/atxml": {
    source: "iana"
  },
  "application/auth-policy+xml": {
    source: "iana",
    compressible: !0
  },
  "application/bacnet-xdd+zip": {
    source: "iana",
    compressible: !1
  },
  "application/batch-smtp": {
    source: "iana"
  },
  "application/bdoc": {
    compressible: !1,
    extensions: [
      "bdoc"
    ]
  },
  "application/beep+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/calendar+json": {
    source: "iana",
    compressible: !0
  },
  "application/calendar+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xcs"
    ]
  },
  "application/call-completion": {
    source: "iana"
  },
  "application/cals-1840": {
    source: "iana"
  },
  "application/captive+json": {
    source: "iana",
    compressible: !0
  },
  "application/cbor": {
    source: "iana"
  },
  "application/cbor-seq": {
    source: "iana"
  },
  "application/cccex": {
    source: "iana"
  },
  "application/ccmp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ccxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ccxml"
    ]
  },
  "application/cdfx+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "cdfx"
    ]
  },
  "application/cdmi-capability": {
    source: "iana",
    extensions: [
      "cdmia"
    ]
  },
  "application/cdmi-container": {
    source: "iana",
    extensions: [
      "cdmic"
    ]
  },
  "application/cdmi-domain": {
    source: "iana",
    extensions: [
      "cdmid"
    ]
  },
  "application/cdmi-object": {
    source: "iana",
    extensions: [
      "cdmio"
    ]
  },
  "application/cdmi-queue": {
    source: "iana",
    extensions: [
      "cdmiq"
    ]
  },
  "application/cdni": {
    source: "iana"
  },
  "application/cea": {
    source: "iana"
  },
  "application/cea-2018+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cellml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cfw": {
    source: "iana"
  },
  "application/city+json": {
    source: "iana",
    compressible: !0
  },
  "application/clr": {
    source: "iana"
  },
  "application/clue+xml": {
    source: "iana",
    compressible: !0
  },
  "application/clue_info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cms": {
    source: "iana"
  },
  "application/cnrp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/coap-group+json": {
    source: "iana",
    compressible: !0
  },
  "application/coap-payload": {
    source: "iana"
  },
  "application/commonground": {
    source: "iana"
  },
  "application/conference-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cose": {
    source: "iana"
  },
  "application/cose-key": {
    source: "iana"
  },
  "application/cose-key-set": {
    source: "iana"
  },
  "application/cpl+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "cpl"
    ]
  },
  "application/csrattrs": {
    source: "iana"
  },
  "application/csta+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cstadata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/csvm+json": {
    source: "iana",
    compressible: !0
  },
  "application/cu-seeme": {
    source: "apache",
    extensions: [
      "cu"
    ]
  },
  "application/cwt": {
    source: "iana"
  },
  "application/cybercash": {
    source: "iana"
  },
  "application/dart": {
    compressible: !0
  },
  "application/dash+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpd"
    ]
  },
  "application/dash-patch+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpp"
    ]
  },
  "application/dashdelta": {
    source: "iana"
  },
  "application/davmount+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "davmount"
    ]
  },
  "application/dca-rft": {
    source: "iana"
  },
  "application/dcd": {
    source: "iana"
  },
  "application/dec-dx": {
    source: "iana"
  },
  "application/dialog-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/dicom": {
    source: "iana"
  },
  "application/dicom+json": {
    source: "iana",
    compressible: !0
  },
  "application/dicom+xml": {
    source: "iana",
    compressible: !0
  },
  "application/dii": {
    source: "iana"
  },
  "application/dit": {
    source: "iana"
  },
  "application/dns": {
    source: "iana"
  },
  "application/dns+json": {
    source: "iana",
    compressible: !0
  },
  "application/dns-message": {
    source: "iana"
  },
  "application/docbook+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "dbk"
    ]
  },
  "application/dots+cbor": {
    source: "iana"
  },
  "application/dskpp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/dssc+der": {
    source: "iana",
    extensions: [
      "dssc"
    ]
  },
  "application/dssc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xdssc"
    ]
  },
  "application/dvcs": {
    source: "iana"
  },
  "application/ecmascript": {
    source: "iana",
    compressible: !0,
    extensions: [
      "es",
      "ecma"
    ]
  },
  "application/edi-consent": {
    source: "iana"
  },
  "application/edi-x12": {
    source: "iana",
    compressible: !1
  },
  "application/edifact": {
    source: "iana",
    compressible: !1
  },
  "application/efi": {
    source: "iana"
  },
  "application/elm+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/elm+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.cap+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/emergencycalldata.comment+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.control+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.deviceinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.ecall.msd": {
    source: "iana"
  },
  "application/emergencycalldata.providerinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.serviceinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.subscriberinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.veds+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emma+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "emma"
    ]
  },
  "application/emotionml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "emotionml"
    ]
  },
  "application/encaprtp": {
    source: "iana"
  },
  "application/epp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/epub+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "epub"
    ]
  },
  "application/eshop": {
    source: "iana"
  },
  "application/exi": {
    source: "iana",
    extensions: [
      "exi"
    ]
  },
  "application/expect-ct-report+json": {
    source: "iana",
    compressible: !0
  },
  "application/express": {
    source: "iana",
    extensions: [
      "exp"
    ]
  },
  "application/fastinfoset": {
    source: "iana"
  },
  "application/fastsoap": {
    source: "iana"
  },
  "application/fdt+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "fdt"
    ]
  },
  "application/fhir+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/fhir+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/fido.trusted-apps+json": {
    compressible: !0
  },
  "application/fits": {
    source: "iana"
  },
  "application/flexfec": {
    source: "iana"
  },
  "application/font-sfnt": {
    source: "iana"
  },
  "application/font-tdpfr": {
    source: "iana",
    extensions: [
      "pfr"
    ]
  },
  "application/font-woff": {
    source: "iana",
    compressible: !1
  },
  "application/framework-attributes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/geo+json": {
    source: "iana",
    compressible: !0,
    extensions: [
      "geojson"
    ]
  },
  "application/geo+json-seq": {
    source: "iana"
  },
  "application/geopackage+sqlite3": {
    source: "iana"
  },
  "application/geoxacml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/gltf-buffer": {
    source: "iana"
  },
  "application/gml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "gml"
    ]
  },
  "application/gpx+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "gpx"
    ]
  },
  "application/gxf": {
    source: "apache",
    extensions: [
      "gxf"
    ]
  },
  "application/gzip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "gz"
    ]
  },
  "application/h224": {
    source: "iana"
  },
  "application/held+xml": {
    source: "iana",
    compressible: !0
  },
  "application/hjson": {
    extensions: [
      "hjson"
    ]
  },
  "application/http": {
    source: "iana"
  },
  "application/hyperstudio": {
    source: "iana",
    extensions: [
      "stk"
    ]
  },
  "application/ibe-key-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ibe-pkg-reply+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ibe-pp-data": {
    source: "iana"
  },
  "application/iges": {
    source: "iana"
  },
  "application/im-iscomposing+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/index": {
    source: "iana"
  },
  "application/index.cmd": {
    source: "iana"
  },
  "application/index.obj": {
    source: "iana"
  },
  "application/index.response": {
    source: "iana"
  },
  "application/index.vnd": {
    source: "iana"
  },
  "application/inkml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ink",
      "inkml"
    ]
  },
  "application/iotp": {
    source: "iana"
  },
  "application/ipfix": {
    source: "iana",
    extensions: [
      "ipfix"
    ]
  },
  "application/ipp": {
    source: "iana"
  },
  "application/isup": {
    source: "iana"
  },
  "application/its+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "its"
    ]
  },
  "application/java-archive": {
    source: "apache",
    compressible: !1,
    extensions: [
      "jar",
      "war",
      "ear"
    ]
  },
  "application/java-serialized-object": {
    source: "apache",
    compressible: !1,
    extensions: [
      "ser"
    ]
  },
  "application/java-vm": {
    source: "apache",
    compressible: !1,
    extensions: [
      "class"
    ]
  },
  "application/javascript": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "js",
      "mjs"
    ]
  },
  "application/jf2feed+json": {
    source: "iana",
    compressible: !0
  },
  "application/jose": {
    source: "iana"
  },
  "application/jose+json": {
    source: "iana",
    compressible: !0
  },
  "application/jrd+json": {
    source: "iana",
    compressible: !0
  },
  "application/jscalendar+json": {
    source: "iana",
    compressible: !0
  },
  "application/json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "json",
      "map"
    ]
  },
  "application/json-patch+json": {
    source: "iana",
    compressible: !0
  },
  "application/json-seq": {
    source: "iana"
  },
  "application/json5": {
    extensions: [
      "json5"
    ]
  },
  "application/jsonml+json": {
    source: "apache",
    compressible: !0,
    extensions: [
      "jsonml"
    ]
  },
  "application/jwk+json": {
    source: "iana",
    compressible: !0
  },
  "application/jwk-set+json": {
    source: "iana",
    compressible: !0
  },
  "application/jwt": {
    source: "iana"
  },
  "application/kpml-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/kpml-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ld+json": {
    source: "iana",
    compressible: !0,
    extensions: [
      "jsonld"
    ]
  },
  "application/lgr+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lgr"
    ]
  },
  "application/link-format": {
    source: "iana"
  },
  "application/load-control+xml": {
    source: "iana",
    compressible: !0
  },
  "application/lost+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lostxml"
    ]
  },
  "application/lostsync+xml": {
    source: "iana",
    compressible: !0
  },
  "application/lpf+zip": {
    source: "iana",
    compressible: !1
  },
  "application/lxf": {
    source: "iana"
  },
  "application/mac-binhex40": {
    source: "iana",
    extensions: [
      "hqx"
    ]
  },
  "application/mac-compactpro": {
    source: "apache",
    extensions: [
      "cpt"
    ]
  },
  "application/macwriteii": {
    source: "iana"
  },
  "application/mads+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mads"
    ]
  },
  "application/manifest+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "webmanifest"
    ]
  },
  "application/marc": {
    source: "iana",
    extensions: [
      "mrc"
    ]
  },
  "application/marcxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mrcx"
    ]
  },
  "application/mathematica": {
    source: "iana",
    extensions: [
      "ma",
      "nb",
      "mb"
    ]
  },
  "application/mathml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mathml"
    ]
  },
  "application/mathml-content+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mathml-presentation+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-associated-procedure-description+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-deregister+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-envelope+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-msk+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-msk-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-protection-description+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-reception-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-register+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-register-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-schedule+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-user-service-description+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbox": {
    source: "iana",
    extensions: [
      "mbox"
    ]
  },
  "application/media-policy-dataset+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpf"
    ]
  },
  "application/media_control+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mediaservercontrol+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mscml"
    ]
  },
  "application/merge-patch+json": {
    source: "iana",
    compressible: !0
  },
  "application/metalink+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "metalink"
    ]
  },
  "application/metalink4+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "meta4"
    ]
  },
  "application/mets+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mets"
    ]
  },
  "application/mf4": {
    source: "iana"
  },
  "application/mikey": {
    source: "iana"
  },
  "application/mipc": {
    source: "iana"
  },
  "application/missing-blocks+cbor-seq": {
    source: "iana"
  },
  "application/mmt-aei+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "maei"
    ]
  },
  "application/mmt-usd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "musd"
    ]
  },
  "application/mods+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mods"
    ]
  },
  "application/moss-keys": {
    source: "iana"
  },
  "application/moss-signature": {
    source: "iana"
  },
  "application/mosskey-data": {
    source: "iana"
  },
  "application/mosskey-request": {
    source: "iana"
  },
  "application/mp21": {
    source: "iana",
    extensions: [
      "m21",
      "mp21"
    ]
  },
  "application/mp4": {
    source: "iana",
    extensions: [
      "mp4s",
      "m4p"
    ]
  },
  "application/mpeg4-generic": {
    source: "iana"
  },
  "application/mpeg4-iod": {
    source: "iana"
  },
  "application/mpeg4-iod-xmt": {
    source: "iana"
  },
  "application/mrb-consumer+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mrb-publish+xml": {
    source: "iana",
    compressible: !0
  },
  "application/msc-ivr+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/msc-mixer+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/msword": {
    source: "iana",
    compressible: !1,
    extensions: [
      "doc",
      "dot"
    ]
  },
  "application/mud+json": {
    source: "iana",
    compressible: !0
  },
  "application/multipart-core": {
    source: "iana"
  },
  "application/mxf": {
    source: "iana",
    extensions: [
      "mxf"
    ]
  },
  "application/n-quads": {
    source: "iana",
    extensions: [
      "nq"
    ]
  },
  "application/n-triples": {
    source: "iana",
    extensions: [
      "nt"
    ]
  },
  "application/nasdata": {
    source: "iana"
  },
  "application/news-checkgroups": {
    source: "iana",
    charset: "US-ASCII"
  },
  "application/news-groupinfo": {
    source: "iana",
    charset: "US-ASCII"
  },
  "application/news-transmission": {
    source: "iana"
  },
  "application/nlsml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/node": {
    source: "iana",
    extensions: [
      "cjs"
    ]
  },
  "application/nss": {
    source: "iana"
  },
  "application/oauth-authz-req+jwt": {
    source: "iana"
  },
  "application/oblivious-dns-message": {
    source: "iana"
  },
  "application/ocsp-request": {
    source: "iana"
  },
  "application/ocsp-response": {
    source: "iana"
  },
  "application/octet-stream": {
    source: "iana",
    compressible: !1,
    extensions: [
      "bin",
      "dms",
      "lrf",
      "mar",
      "so",
      "dist",
      "distz",
      "pkg",
      "bpk",
      "dump",
      "elc",
      "deploy",
      "exe",
      "dll",
      "deb",
      "dmg",
      "iso",
      "img",
      "msi",
      "msp",
      "msm",
      "buffer"
    ]
  },
  "application/oda": {
    source: "iana",
    extensions: [
      "oda"
    ]
  },
  "application/odm+xml": {
    source: "iana",
    compressible: !0
  },
  "application/odx": {
    source: "iana"
  },
  "application/oebps-package+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "opf"
    ]
  },
  "application/ogg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ogx"
    ]
  },
  "application/omdoc+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "omdoc"
    ]
  },
  "application/onenote": {
    source: "apache",
    extensions: [
      "onetoc",
      "onetoc2",
      "onetmp",
      "onepkg"
    ]
  },
  "application/opc-nodeset+xml": {
    source: "iana",
    compressible: !0
  },
  "application/oscore": {
    source: "iana"
  },
  "application/oxps": {
    source: "iana",
    extensions: [
      "oxps"
    ]
  },
  "application/p21": {
    source: "iana"
  },
  "application/p21+zip": {
    source: "iana",
    compressible: !1
  },
  "application/p2p-overlay+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "relo"
    ]
  },
  "application/parityfec": {
    source: "iana"
  },
  "application/passport": {
    source: "iana"
  },
  "application/patch-ops-error+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xer"
    ]
  },
  "application/pdf": {
    source: "iana",
    compressible: !1,
    extensions: [
      "pdf"
    ]
  },
  "application/pdx": {
    source: "iana"
  },
  "application/pem-certificate-chain": {
    source: "iana"
  },
  "application/pgp-encrypted": {
    source: "iana",
    compressible: !1,
    extensions: [
      "pgp"
    ]
  },
  "application/pgp-keys": {
    source: "iana",
    extensions: [
      "asc"
    ]
  },
  "application/pgp-signature": {
    source: "iana",
    extensions: [
      "asc",
      "sig"
    ]
  },
  "application/pics-rules": {
    source: "apache",
    extensions: [
      "prf"
    ]
  },
  "application/pidf+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/pidf-diff+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/pkcs10": {
    source: "iana",
    extensions: [
      "p10"
    ]
  },
  "application/pkcs12": {
    source: "iana"
  },
  "application/pkcs7-mime": {
    source: "iana",
    extensions: [
      "p7m",
      "p7c"
    ]
  },
  "application/pkcs7-signature": {
    source: "iana",
    extensions: [
      "p7s"
    ]
  },
  "application/pkcs8": {
    source: "iana",
    extensions: [
      "p8"
    ]
  },
  "application/pkcs8-encrypted": {
    source: "iana"
  },
  "application/pkix-attr-cert": {
    source: "iana",
    extensions: [
      "ac"
    ]
  },
  "application/pkix-cert": {
    source: "iana",
    extensions: [
      "cer"
    ]
  },
  "application/pkix-crl": {
    source: "iana",
    extensions: [
      "crl"
    ]
  },
  "application/pkix-pkipath": {
    source: "iana",
    extensions: [
      "pkipath"
    ]
  },
  "application/pkixcmp": {
    source: "iana",
    extensions: [
      "pki"
    ]
  },
  "application/pls+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "pls"
    ]
  },
  "application/poc-settings+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/postscript": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ai",
      "eps",
      "ps"
    ]
  },
  "application/ppsp-tracker+json": {
    source: "iana",
    compressible: !0
  },
  "application/problem+json": {
    source: "iana",
    compressible: !0
  },
  "application/problem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/provenance+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "provx"
    ]
  },
  "application/prs.alvestrand.titrax-sheet": {
    source: "iana"
  },
  "application/prs.cww": {
    source: "iana",
    extensions: [
      "cww"
    ]
  },
  "application/prs.cyn": {
    source: "iana",
    charset: "7-BIT"
  },
  "application/prs.hpub+zip": {
    source: "iana",
    compressible: !1
  },
  "application/prs.nprend": {
    source: "iana"
  },
  "application/prs.plucker": {
    source: "iana"
  },
  "application/prs.rdf-xml-crypt": {
    source: "iana"
  },
  "application/prs.xsf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/pskc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "pskcxml"
    ]
  },
  "application/pvd+json": {
    source: "iana",
    compressible: !0
  },
  "application/qsig": {
    source: "iana"
  },
  "application/raml+yaml": {
    compressible: !0,
    extensions: [
      "raml"
    ]
  },
  "application/raptorfec": {
    source: "iana"
  },
  "application/rdap+json": {
    source: "iana",
    compressible: !0
  },
  "application/rdf+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rdf",
      "owl"
    ]
  },
  "application/reginfo+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rif"
    ]
  },
  "application/relax-ng-compact-syntax": {
    source: "iana",
    extensions: [
      "rnc"
    ]
  },
  "application/remote-printing": {
    source: "iana"
  },
  "application/reputon+json": {
    source: "iana",
    compressible: !0
  },
  "application/resource-lists+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rl"
    ]
  },
  "application/resource-lists-diff+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rld"
    ]
  },
  "application/rfc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/riscos": {
    source: "iana"
  },
  "application/rlmi+xml": {
    source: "iana",
    compressible: !0
  },
  "application/rls-services+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rs"
    ]
  },
  "application/route-apd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rapd"
    ]
  },
  "application/route-s-tsid+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sls"
    ]
  },
  "application/route-usd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rusd"
    ]
  },
  "application/rpki-ghostbusters": {
    source: "iana",
    extensions: [
      "gbr"
    ]
  },
  "application/rpki-manifest": {
    source: "iana",
    extensions: [
      "mft"
    ]
  },
  "application/rpki-publication": {
    source: "iana"
  },
  "application/rpki-roa": {
    source: "iana",
    extensions: [
      "roa"
    ]
  },
  "application/rpki-updown": {
    source: "iana"
  },
  "application/rsd+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "rsd"
    ]
  },
  "application/rss+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "rss"
    ]
  },
  "application/rtf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rtf"
    ]
  },
  "application/rtploopback": {
    source: "iana"
  },
  "application/rtx": {
    source: "iana"
  },
  "application/samlassertion+xml": {
    source: "iana",
    compressible: !0
  },
  "application/samlmetadata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sarif+json": {
    source: "iana",
    compressible: !0
  },
  "application/sarif-external-properties+json": {
    source: "iana",
    compressible: !0
  },
  "application/sbe": {
    source: "iana"
  },
  "application/sbml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sbml"
    ]
  },
  "application/scaip+xml": {
    source: "iana",
    compressible: !0
  },
  "application/scim+json": {
    source: "iana",
    compressible: !0
  },
  "application/scvp-cv-request": {
    source: "iana",
    extensions: [
      "scq"
    ]
  },
  "application/scvp-cv-response": {
    source: "iana",
    extensions: [
      "scs"
    ]
  },
  "application/scvp-vp-request": {
    source: "iana",
    extensions: [
      "spq"
    ]
  },
  "application/scvp-vp-response": {
    source: "iana",
    extensions: [
      "spp"
    ]
  },
  "application/sdp": {
    source: "iana",
    extensions: [
      "sdp"
    ]
  },
  "application/secevent+jwt": {
    source: "iana"
  },
  "application/senml+cbor": {
    source: "iana"
  },
  "application/senml+json": {
    source: "iana",
    compressible: !0
  },
  "application/senml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "senmlx"
    ]
  },
  "application/senml-etch+cbor": {
    source: "iana"
  },
  "application/senml-etch+json": {
    source: "iana",
    compressible: !0
  },
  "application/senml-exi": {
    source: "iana"
  },
  "application/sensml+cbor": {
    source: "iana"
  },
  "application/sensml+json": {
    source: "iana",
    compressible: !0
  },
  "application/sensml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sensmlx"
    ]
  },
  "application/sensml-exi": {
    source: "iana"
  },
  "application/sep+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sep-exi": {
    source: "iana"
  },
  "application/session-info": {
    source: "iana"
  },
  "application/set-payment": {
    source: "iana"
  },
  "application/set-payment-initiation": {
    source: "iana",
    extensions: [
      "setpay"
    ]
  },
  "application/set-registration": {
    source: "iana"
  },
  "application/set-registration-initiation": {
    source: "iana",
    extensions: [
      "setreg"
    ]
  },
  "application/sgml": {
    source: "iana"
  },
  "application/sgml-open-catalog": {
    source: "iana"
  },
  "application/shf+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "shf"
    ]
  },
  "application/sieve": {
    source: "iana",
    extensions: [
      "siv",
      "sieve"
    ]
  },
  "application/simple-filter+xml": {
    source: "iana",
    compressible: !0
  },
  "application/simple-message-summary": {
    source: "iana"
  },
  "application/simplesymbolcontainer": {
    source: "iana"
  },
  "application/sipc": {
    source: "iana"
  },
  "application/slate": {
    source: "iana"
  },
  "application/smil": {
    source: "iana"
  },
  "application/smil+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "smi",
      "smil"
    ]
  },
  "application/smpte336m": {
    source: "iana"
  },
  "application/soap+fastinfoset": {
    source: "iana"
  },
  "application/soap+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sparql-query": {
    source: "iana",
    extensions: [
      "rq"
    ]
  },
  "application/sparql-results+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "srx"
    ]
  },
  "application/spdx+json": {
    source: "iana",
    compressible: !0
  },
  "application/spirits-event+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sql": {
    source: "iana"
  },
  "application/srgs": {
    source: "iana",
    extensions: [
      "gram"
    ]
  },
  "application/srgs+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "grxml"
    ]
  },
  "application/sru+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sru"
    ]
  },
  "application/ssdl+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "ssdl"
    ]
  },
  "application/ssml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ssml"
    ]
  },
  "application/stix+json": {
    source: "iana",
    compressible: !0
  },
  "application/swid+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "swidtag"
    ]
  },
  "application/tamp-apex-update": {
    source: "iana"
  },
  "application/tamp-apex-update-confirm": {
    source: "iana"
  },
  "application/tamp-community-update": {
    source: "iana"
  },
  "application/tamp-community-update-confirm": {
    source: "iana"
  },
  "application/tamp-error": {
    source: "iana"
  },
  "application/tamp-sequence-adjust": {
    source: "iana"
  },
  "application/tamp-sequence-adjust-confirm": {
    source: "iana"
  },
  "application/tamp-status-query": {
    source: "iana"
  },
  "application/tamp-status-response": {
    source: "iana"
  },
  "application/tamp-update": {
    source: "iana"
  },
  "application/tamp-update-confirm": {
    source: "iana"
  },
  "application/tar": {
    compressible: !0
  },
  "application/taxii+json": {
    source: "iana",
    compressible: !0
  },
  "application/td+json": {
    source: "iana",
    compressible: !0
  },
  "application/tei+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "tei",
      "teicorpus"
    ]
  },
  "application/tetra_isi": {
    source: "iana"
  },
  "application/thraud+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "tfi"
    ]
  },
  "application/timestamp-query": {
    source: "iana"
  },
  "application/timestamp-reply": {
    source: "iana"
  },
  "application/timestamped-data": {
    source: "iana",
    extensions: [
      "tsd"
    ]
  },
  "application/tlsrpt+gzip": {
    source: "iana"
  },
  "application/tlsrpt+json": {
    source: "iana",
    compressible: !0
  },
  "application/tnauthlist": {
    source: "iana"
  },
  "application/token-introspection+jwt": {
    source: "iana"
  },
  "application/toml": {
    compressible: !0,
    extensions: [
      "toml"
    ]
  },
  "application/trickle-ice-sdpfrag": {
    source: "iana"
  },
  "application/trig": {
    source: "iana",
    extensions: [
      "trig"
    ]
  },
  "application/ttml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ttml"
    ]
  },
  "application/tve-trigger": {
    source: "iana"
  },
  "application/tzif": {
    source: "iana"
  },
  "application/tzif-leap": {
    source: "iana"
  },
  "application/ubjson": {
    compressible: !1,
    extensions: [
      "ubj"
    ]
  },
  "application/ulpfec": {
    source: "iana"
  },
  "application/urc-grpsheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/urc-ressheet+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rsheet"
    ]
  },
  "application/urc-targetdesc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "td"
    ]
  },
  "application/urc-uisocketdesc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vcard+json": {
    source: "iana",
    compressible: !0
  },
  "application/vcard+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vemmi": {
    source: "iana"
  },
  "application/vividence.scriptfile": {
    source: "apache"
  },
  "application/vnd.1000minds.decision-model+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "1km"
    ]
  },
  "application/vnd.3gpp-prose+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp-prose-pc3ch+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp-v2x-local-service-information": {
    source: "iana"
  },
  "application/vnd.3gpp.5gnas": {
    source: "iana"
  },
  "application/vnd.3gpp.access-transfer-events+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.bsf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.gmop+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.gtpc": {
    source: "iana"
  },
  "application/vnd.3gpp.interworking-data": {
    source: "iana"
  },
  "application/vnd.3gpp.lpp": {
    source: "iana"
  },
  "application/vnd.3gpp.mc-signalling-ear": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-affiliation-command+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-payload": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-service-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-signalling": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-ue-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-user-profile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-affiliation-command+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-floor-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-location-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-service-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-signed+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-ue-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-ue-init-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-user-profile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-location-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-service-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-transmission-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-ue-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-user-profile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mid-call+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.ngap": {
    source: "iana"
  },
  "application/vnd.3gpp.pfcp": {
    source: "iana"
  },
  "application/vnd.3gpp.pic-bw-large": {
    source: "iana",
    extensions: [
      "plb"
    ]
  },
  "application/vnd.3gpp.pic-bw-small": {
    source: "iana",
    extensions: [
      "psb"
    ]
  },
  "application/vnd.3gpp.pic-bw-var": {
    source: "iana",
    extensions: [
      "pvb"
    ]
  },
  "application/vnd.3gpp.s1ap": {
    source: "iana"
  },
  "application/vnd.3gpp.sms": {
    source: "iana"
  },
  "application/vnd.3gpp.sms+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.srvcc-ext+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.srvcc-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.state-and-event-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.ussd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp2.bcmcsinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp2.sms": {
    source: "iana"
  },
  "application/vnd.3gpp2.tcap": {
    source: "iana",
    extensions: [
      "tcap"
    ]
  },
  "application/vnd.3lightssoftware.imagescal": {
    source: "iana"
  },
  "application/vnd.3m.post-it-notes": {
    source: "iana",
    extensions: [
      "pwn"
    ]
  },
  "application/vnd.accpac.simply.aso": {
    source: "iana",
    extensions: [
      "aso"
    ]
  },
  "application/vnd.accpac.simply.imp": {
    source: "iana",
    extensions: [
      "imp"
    ]
  },
  "application/vnd.acucobol": {
    source: "iana",
    extensions: [
      "acu"
    ]
  },
  "application/vnd.acucorp": {
    source: "iana",
    extensions: [
      "atc",
      "acutc"
    ]
  },
  "application/vnd.adobe.air-application-installer-package+zip": {
    source: "apache",
    compressible: !1,
    extensions: [
      "air"
    ]
  },
  "application/vnd.adobe.flash.movie": {
    source: "iana"
  },
  "application/vnd.adobe.formscentral.fcdt": {
    source: "iana",
    extensions: [
      "fcdt"
    ]
  },
  "application/vnd.adobe.fxp": {
    source: "iana",
    extensions: [
      "fxp",
      "fxpl"
    ]
  },
  "application/vnd.adobe.partial-upload": {
    source: "iana"
  },
  "application/vnd.adobe.xdp+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xdp"
    ]
  },
  "application/vnd.adobe.xfdf": {
    source: "iana",
    extensions: [
      "xfdf"
    ]
  },
  "application/vnd.aether.imp": {
    source: "iana"
  },
  "application/vnd.afpc.afplinedata": {
    source: "iana"
  },
  "application/vnd.afpc.afplinedata-pagedef": {
    source: "iana"
  },
  "application/vnd.afpc.cmoca-cmresource": {
    source: "iana"
  },
  "application/vnd.afpc.foca-charset": {
    source: "iana"
  },
  "application/vnd.afpc.foca-codedfont": {
    source: "iana"
  },
  "application/vnd.afpc.foca-codepage": {
    source: "iana"
  },
  "application/vnd.afpc.modca": {
    source: "iana"
  },
  "application/vnd.afpc.modca-cmtable": {
    source: "iana"
  },
  "application/vnd.afpc.modca-formdef": {
    source: "iana"
  },
  "application/vnd.afpc.modca-mediummap": {
    source: "iana"
  },
  "application/vnd.afpc.modca-objectcontainer": {
    source: "iana"
  },
  "application/vnd.afpc.modca-overlay": {
    source: "iana"
  },
  "application/vnd.afpc.modca-pagesegment": {
    source: "iana"
  },
  "application/vnd.age": {
    source: "iana",
    extensions: [
      "age"
    ]
  },
  "application/vnd.ah-barcode": {
    source: "iana"
  },
  "application/vnd.ahead.space": {
    source: "iana",
    extensions: [
      "ahead"
    ]
  },
  "application/vnd.airzip.filesecure.azf": {
    source: "iana",
    extensions: [
      "azf"
    ]
  },
  "application/vnd.airzip.filesecure.azs": {
    source: "iana",
    extensions: [
      "azs"
    ]
  },
  "application/vnd.amadeus+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.amazon.ebook": {
    source: "apache",
    extensions: [
      "azw"
    ]
  },
  "application/vnd.amazon.mobi8-ebook": {
    source: "iana"
  },
  "application/vnd.americandynamics.acc": {
    source: "iana",
    extensions: [
      "acc"
    ]
  },
  "application/vnd.amiga.ami": {
    source: "iana",
    extensions: [
      "ami"
    ]
  },
  "application/vnd.amundsen.maze+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.android.ota": {
    source: "iana"
  },
  "application/vnd.android.package-archive": {
    source: "apache",
    compressible: !1,
    extensions: [
      "apk"
    ]
  },
  "application/vnd.anki": {
    source: "iana"
  },
  "application/vnd.anser-web-certificate-issue-initiation": {
    source: "iana",
    extensions: [
      "cii"
    ]
  },
  "application/vnd.anser-web-funds-transfer-initiation": {
    source: "apache",
    extensions: [
      "fti"
    ]
  },
  "application/vnd.antix.game-component": {
    source: "iana",
    extensions: [
      "atx"
    ]
  },
  "application/vnd.apache.arrow.file": {
    source: "iana"
  },
  "application/vnd.apache.arrow.stream": {
    source: "iana"
  },
  "application/vnd.apache.thrift.binary": {
    source: "iana"
  },
  "application/vnd.apache.thrift.compact": {
    source: "iana"
  },
  "application/vnd.apache.thrift.json": {
    source: "iana"
  },
  "application/vnd.api+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.aplextor.warrp+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.apothekende.reservation+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.apple.installer+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpkg"
    ]
  },
  "application/vnd.apple.keynote": {
    source: "iana",
    extensions: [
      "key"
    ]
  },
  "application/vnd.apple.mpegurl": {
    source: "iana",
    extensions: [
      "m3u8"
    ]
  },
  "application/vnd.apple.numbers": {
    source: "iana",
    extensions: [
      "numbers"
    ]
  },
  "application/vnd.apple.pages": {
    source: "iana",
    extensions: [
      "pages"
    ]
  },
  "application/vnd.apple.pkpass": {
    compressible: !1,
    extensions: [
      "pkpass"
    ]
  },
  "application/vnd.arastra.swi": {
    source: "iana"
  },
  "application/vnd.aristanetworks.swi": {
    source: "iana",
    extensions: [
      "swi"
    ]
  },
  "application/vnd.artisan+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.artsquare": {
    source: "iana"
  },
  "application/vnd.astraea-software.iota": {
    source: "iana",
    extensions: [
      "iota"
    ]
  },
  "application/vnd.audiograph": {
    source: "iana",
    extensions: [
      "aep"
    ]
  },
  "application/vnd.autopackage": {
    source: "iana"
  },
  "application/vnd.avalon+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.avistar+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.balsamiq.bmml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "bmml"
    ]
  },
  "application/vnd.balsamiq.bmpr": {
    source: "iana"
  },
  "application/vnd.banana-accounting": {
    source: "iana"
  },
  "application/vnd.bbf.usp.error": {
    source: "iana"
  },
  "application/vnd.bbf.usp.msg": {
    source: "iana"
  },
  "application/vnd.bbf.usp.msg+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.bekitzur-stech+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.bint.med-content": {
    source: "iana"
  },
  "application/vnd.biopax.rdf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.blink-idb-value-wrapper": {
    source: "iana"
  },
  "application/vnd.blueice.multipass": {
    source: "iana",
    extensions: [
      "mpm"
    ]
  },
  "application/vnd.bluetooth.ep.oob": {
    source: "iana"
  },
  "application/vnd.bluetooth.le.oob": {
    source: "iana"
  },
  "application/vnd.bmi": {
    source: "iana",
    extensions: [
      "bmi"
    ]
  },
  "application/vnd.bpf": {
    source: "iana"
  },
  "application/vnd.bpf3": {
    source: "iana"
  },
  "application/vnd.businessobjects": {
    source: "iana",
    extensions: [
      "rep"
    ]
  },
  "application/vnd.byu.uapi+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cab-jscript": {
    source: "iana"
  },
  "application/vnd.canon-cpdl": {
    source: "iana"
  },
  "application/vnd.canon-lips": {
    source: "iana"
  },
  "application/vnd.capasystems-pg+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cendio.thinlinc.clientconf": {
    source: "iana"
  },
  "application/vnd.century-systems.tcp_stream": {
    source: "iana"
  },
  "application/vnd.chemdraw+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "cdxml"
    ]
  },
  "application/vnd.chess-pgn": {
    source: "iana"
  },
  "application/vnd.chipnuts.karaoke-mmd": {
    source: "iana",
    extensions: [
      "mmd"
    ]
  },
  "application/vnd.ciedi": {
    source: "iana"
  },
  "application/vnd.cinderella": {
    source: "iana",
    extensions: [
      "cdy"
    ]
  },
  "application/vnd.cirpack.isdn-ext": {
    source: "iana"
  },
  "application/vnd.citationstyles.style+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "csl"
    ]
  },
  "application/vnd.claymore": {
    source: "iana",
    extensions: [
      "cla"
    ]
  },
  "application/vnd.cloanto.rp9": {
    source: "iana",
    extensions: [
      "rp9"
    ]
  },
  "application/vnd.clonk.c4group": {
    source: "iana",
    extensions: [
      "c4g",
      "c4d",
      "c4f",
      "c4p",
      "c4u"
    ]
  },
  "application/vnd.cluetrust.cartomobile-config": {
    source: "iana",
    extensions: [
      "c11amc"
    ]
  },
  "application/vnd.cluetrust.cartomobile-config-pkg": {
    source: "iana",
    extensions: [
      "c11amz"
    ]
  },
  "application/vnd.coffeescript": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.document": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.document-template": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.presentation": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.presentation-template": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.spreadsheet": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.spreadsheet-template": {
    source: "iana"
  },
  "application/vnd.collection+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.collection.doc+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.collection.next+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.comicbook+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.comicbook-rar": {
    source: "iana"
  },
  "application/vnd.commerce-battelle": {
    source: "iana"
  },
  "application/vnd.commonspace": {
    source: "iana",
    extensions: [
      "csp"
    ]
  },
  "application/vnd.contact.cmsg": {
    source: "iana",
    extensions: [
      "cdbcmsg"
    ]
  },
  "application/vnd.coreos.ignition+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cosmocaller": {
    source: "iana",
    extensions: [
      "cmc"
    ]
  },
  "application/vnd.crick.clicker": {
    source: "iana",
    extensions: [
      "clkx"
    ]
  },
  "application/vnd.crick.clicker.keyboard": {
    source: "iana",
    extensions: [
      "clkk"
    ]
  },
  "application/vnd.crick.clicker.palette": {
    source: "iana",
    extensions: [
      "clkp"
    ]
  },
  "application/vnd.crick.clicker.template": {
    source: "iana",
    extensions: [
      "clkt"
    ]
  },
  "application/vnd.crick.clicker.wordbank": {
    source: "iana",
    extensions: [
      "clkw"
    ]
  },
  "application/vnd.criticaltools.wbs+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wbs"
    ]
  },
  "application/vnd.cryptii.pipe+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.crypto-shade-file": {
    source: "iana"
  },
  "application/vnd.cryptomator.encrypted": {
    source: "iana"
  },
  "application/vnd.cryptomator.vault": {
    source: "iana"
  },
  "application/vnd.ctc-posml": {
    source: "iana",
    extensions: [
      "pml"
    ]
  },
  "application/vnd.ctct.ws+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cups-pdf": {
    source: "iana"
  },
  "application/vnd.cups-postscript": {
    source: "iana"
  },
  "application/vnd.cups-ppd": {
    source: "iana",
    extensions: [
      "ppd"
    ]
  },
  "application/vnd.cups-raster": {
    source: "iana"
  },
  "application/vnd.cups-raw": {
    source: "iana"
  },
  "application/vnd.curl": {
    source: "iana"
  },
  "application/vnd.curl.car": {
    source: "apache",
    extensions: [
      "car"
    ]
  },
  "application/vnd.curl.pcurl": {
    source: "apache",
    extensions: [
      "pcurl"
    ]
  },
  "application/vnd.cyan.dean.root+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cybank": {
    source: "iana"
  },
  "application/vnd.cyclonedx+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cyclonedx+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.d2l.coursepackage1p0+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.d3m-dataset": {
    source: "iana"
  },
  "application/vnd.d3m-problem": {
    source: "iana"
  },
  "application/vnd.dart": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dart"
    ]
  },
  "application/vnd.data-vision.rdz": {
    source: "iana",
    extensions: [
      "rdz"
    ]
  },
  "application/vnd.datapackage+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dataresource+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dbf": {
    source: "iana",
    extensions: [
      "dbf"
    ]
  },
  "application/vnd.debian.binary-package": {
    source: "iana"
  },
  "application/vnd.dece.data": {
    source: "iana",
    extensions: [
      "uvf",
      "uvvf",
      "uvd",
      "uvvd"
    ]
  },
  "application/vnd.dece.ttml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "uvt",
      "uvvt"
    ]
  },
  "application/vnd.dece.unspecified": {
    source: "iana",
    extensions: [
      "uvx",
      "uvvx"
    ]
  },
  "application/vnd.dece.zip": {
    source: "iana",
    extensions: [
      "uvz",
      "uvvz"
    ]
  },
  "application/vnd.denovo.fcselayout-link": {
    source: "iana",
    extensions: [
      "fe_launch"
    ]
  },
  "application/vnd.desmume.movie": {
    source: "iana"
  },
  "application/vnd.dir-bi.plate-dl-nosuffix": {
    source: "iana"
  },
  "application/vnd.dm.delegation+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dna": {
    source: "iana",
    extensions: [
      "dna"
    ]
  },
  "application/vnd.document+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dolby.mlp": {
    source: "apache",
    extensions: [
      "mlp"
    ]
  },
  "application/vnd.dolby.mobile.1": {
    source: "iana"
  },
  "application/vnd.dolby.mobile.2": {
    source: "iana"
  },
  "application/vnd.doremir.scorecloud-binary-document": {
    source: "iana"
  },
  "application/vnd.dpgraph": {
    source: "iana",
    extensions: [
      "dpg"
    ]
  },
  "application/vnd.dreamfactory": {
    source: "iana",
    extensions: [
      "dfac"
    ]
  },
  "application/vnd.drive+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ds-keypoint": {
    source: "apache",
    extensions: [
      "kpxx"
    ]
  },
  "application/vnd.dtg.local": {
    source: "iana"
  },
  "application/vnd.dtg.local.flash": {
    source: "iana"
  },
  "application/vnd.dtg.local.html": {
    source: "iana"
  },
  "application/vnd.dvb.ait": {
    source: "iana",
    extensions: [
      "ait"
    ]
  },
  "application/vnd.dvb.dvbisl+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.dvbj": {
    source: "iana"
  },
  "application/vnd.dvb.esgcontainer": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcdftnotifaccess": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgaccess": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgaccess2": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgpdd": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcroaming": {
    source: "iana"
  },
  "application/vnd.dvb.iptv.alfec-base": {
    source: "iana"
  },
  "application/vnd.dvb.iptv.alfec-enhancement": {
    source: "iana"
  },
  "application/vnd.dvb.notif-aggregate-root+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-container+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-generic+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-ia-msglist+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-ia-registration-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-ia-registration-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-init+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.pfr": {
    source: "iana"
  },
  "application/vnd.dvb.service": {
    source: "iana",
    extensions: [
      "svc"
    ]
  },
  "application/vnd.dxr": {
    source: "iana"
  },
  "application/vnd.dynageo": {
    source: "iana",
    extensions: [
      "geo"
    ]
  },
  "application/vnd.dzr": {
    source: "iana"
  },
  "application/vnd.easykaraoke.cdgdownload": {
    source: "iana"
  },
  "application/vnd.ecdis-update": {
    source: "iana"
  },
  "application/vnd.ecip.rlp": {
    source: "iana"
  },
  "application/vnd.eclipse.ditto+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ecowin.chart": {
    source: "iana",
    extensions: [
      "mag"
    ]
  },
  "application/vnd.ecowin.filerequest": {
    source: "iana"
  },
  "application/vnd.ecowin.fileupdate": {
    source: "iana"
  },
  "application/vnd.ecowin.series": {
    source: "iana"
  },
  "application/vnd.ecowin.seriesrequest": {
    source: "iana"
  },
  "application/vnd.ecowin.seriesupdate": {
    source: "iana"
  },
  "application/vnd.efi.img": {
    source: "iana"
  },
  "application/vnd.efi.iso": {
    source: "iana"
  },
  "application/vnd.emclient.accessrequest+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.enliven": {
    source: "iana",
    extensions: [
      "nml"
    ]
  },
  "application/vnd.enphase.envoy": {
    source: "iana"
  },
  "application/vnd.eprints.data+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.epson.esf": {
    source: "iana",
    extensions: [
      "esf"
    ]
  },
  "application/vnd.epson.msf": {
    source: "iana",
    extensions: [
      "msf"
    ]
  },
  "application/vnd.epson.quickanime": {
    source: "iana",
    extensions: [
      "qam"
    ]
  },
  "application/vnd.epson.salt": {
    source: "iana",
    extensions: [
      "slt"
    ]
  },
  "application/vnd.epson.ssf": {
    source: "iana",
    extensions: [
      "ssf"
    ]
  },
  "application/vnd.ericsson.quickcall": {
    source: "iana"
  },
  "application/vnd.espass-espass+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.eszigno3+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "es3",
      "et3"
    ]
  },
  "application/vnd.etsi.aoc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.asic-e+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.etsi.asic-s+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.etsi.cug+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvcommand+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvdiscovery+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsad-bc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsad-cod+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsad-npvr+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvservice+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsync+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvueprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.mcid+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.mheg5": {
    source: "iana"
  },
  "application/vnd.etsi.overload-control-policy-dataset+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.pstn+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.sci+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.simservs+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.timestamp-token": {
    source: "iana"
  },
  "application/vnd.etsi.tsl+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.tsl.der": {
    source: "iana"
  },
  "application/vnd.eu.kasparian.car+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.eudora.data": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.profile": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.settings": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.theme": {
    source: "iana"
  },
  "application/vnd.exstream-empower+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.exstream-package": {
    source: "iana"
  },
  "application/vnd.ezpix-album": {
    source: "iana",
    extensions: [
      "ez2"
    ]
  },
  "application/vnd.ezpix-package": {
    source: "iana",
    extensions: [
      "ez3"
    ]
  },
  "application/vnd.f-secure.mobile": {
    source: "iana"
  },
  "application/vnd.familysearch.gedcom+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.fastcopy-disk-image": {
    source: "iana"
  },
  "application/vnd.fdf": {
    source: "iana",
    extensions: [
      "fdf"
    ]
  },
  "application/vnd.fdsn.mseed": {
    source: "iana",
    extensions: [
      "mseed"
    ]
  },
  "application/vnd.fdsn.seed": {
    source: "iana",
    extensions: [
      "seed",
      "dataless"
    ]
  },
  "application/vnd.ffsns": {
    source: "iana"
  },
  "application/vnd.ficlab.flb+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.filmit.zfc": {
    source: "iana"
  },
  "application/vnd.fints": {
    source: "iana"
  },
  "application/vnd.firemonkeys.cloudcell": {
    source: "iana"
  },
  "application/vnd.flographit": {
    source: "iana",
    extensions: [
      "gph"
    ]
  },
  "application/vnd.fluxtime.clip": {
    source: "iana",
    extensions: [
      "ftc"
    ]
  },
  "application/vnd.font-fontforge-sfd": {
    source: "iana"
  },
  "application/vnd.framemaker": {
    source: "iana",
    extensions: [
      "fm",
      "frame",
      "maker",
      "book"
    ]
  },
  "application/vnd.frogans.fnc": {
    source: "iana",
    extensions: [
      "fnc"
    ]
  },
  "application/vnd.frogans.ltf": {
    source: "iana",
    extensions: [
      "ltf"
    ]
  },
  "application/vnd.fsc.weblaunch": {
    source: "iana",
    extensions: [
      "fsc"
    ]
  },
  "application/vnd.fujifilm.fb.docuworks": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.docuworks.binder": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.docuworks.container": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.jfi+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.fujitsu.oasys": {
    source: "iana",
    extensions: [
      "oas"
    ]
  },
  "application/vnd.fujitsu.oasys2": {
    source: "iana",
    extensions: [
      "oa2"
    ]
  },
  "application/vnd.fujitsu.oasys3": {
    source: "iana",
    extensions: [
      "oa3"
    ]
  },
  "application/vnd.fujitsu.oasysgp": {
    source: "iana",
    extensions: [
      "fg5"
    ]
  },
  "application/vnd.fujitsu.oasysprs": {
    source: "iana",
    extensions: [
      "bh2"
    ]
  },
  "application/vnd.fujixerox.art-ex": {
    source: "iana"
  },
  "application/vnd.fujixerox.art4": {
    source: "iana"
  },
  "application/vnd.fujixerox.ddd": {
    source: "iana",
    extensions: [
      "ddd"
    ]
  },
  "application/vnd.fujixerox.docuworks": {
    source: "iana",
    extensions: [
      "xdw"
    ]
  },
  "application/vnd.fujixerox.docuworks.binder": {
    source: "iana",
    extensions: [
      "xbd"
    ]
  },
  "application/vnd.fujixerox.docuworks.container": {
    source: "iana"
  },
  "application/vnd.fujixerox.hbpl": {
    source: "iana"
  },
  "application/vnd.fut-misnet": {
    source: "iana"
  },
  "application/vnd.futoin+cbor": {
    source: "iana"
  },
  "application/vnd.futoin+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.fuzzysheet": {
    source: "iana",
    extensions: [
      "fzs"
    ]
  },
  "application/vnd.genomatix.tuxedo": {
    source: "iana",
    extensions: [
      "txd"
    ]
  },
  "application/vnd.gentics.grd+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.geo+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.geocube+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.geogebra.file": {
    source: "iana",
    extensions: [
      "ggb"
    ]
  },
  "application/vnd.geogebra.slides": {
    source: "iana"
  },
  "application/vnd.geogebra.tool": {
    source: "iana",
    extensions: [
      "ggt"
    ]
  },
  "application/vnd.geometry-explorer": {
    source: "iana",
    extensions: [
      "gex",
      "gre"
    ]
  },
  "application/vnd.geonext": {
    source: "iana",
    extensions: [
      "gxt"
    ]
  },
  "application/vnd.geoplan": {
    source: "iana",
    extensions: [
      "g2w"
    ]
  },
  "application/vnd.geospace": {
    source: "iana",
    extensions: [
      "g3w"
    ]
  },
  "application/vnd.gerber": {
    source: "iana"
  },
  "application/vnd.globalplatform.card-content-mgt": {
    source: "iana"
  },
  "application/vnd.globalplatform.card-content-mgt-response": {
    source: "iana"
  },
  "application/vnd.gmx": {
    source: "iana",
    extensions: [
      "gmx"
    ]
  },
  "application/vnd.google-apps.document": {
    compressible: !1,
    extensions: [
      "gdoc"
    ]
  },
  "application/vnd.google-apps.presentation": {
    compressible: !1,
    extensions: [
      "gslides"
    ]
  },
  "application/vnd.google-apps.spreadsheet": {
    compressible: !1,
    extensions: [
      "gsheet"
    ]
  },
  "application/vnd.google-earth.kml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "kml"
    ]
  },
  "application/vnd.google-earth.kmz": {
    source: "iana",
    compressible: !1,
    extensions: [
      "kmz"
    ]
  },
  "application/vnd.gov.sk.e-form+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.gov.sk.e-form+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.gov.sk.xmldatacontainer+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.grafeq": {
    source: "iana",
    extensions: [
      "gqf",
      "gqs"
    ]
  },
  "application/vnd.gridmp": {
    source: "iana"
  },
  "application/vnd.groove-account": {
    source: "iana",
    extensions: [
      "gac"
    ]
  },
  "application/vnd.groove-help": {
    source: "iana",
    extensions: [
      "ghf"
    ]
  },
  "application/vnd.groove-identity-message": {
    source: "iana",
    extensions: [
      "gim"
    ]
  },
  "application/vnd.groove-injector": {
    source: "iana",
    extensions: [
      "grv"
    ]
  },
  "application/vnd.groove-tool-message": {
    source: "iana",
    extensions: [
      "gtm"
    ]
  },
  "application/vnd.groove-tool-template": {
    source: "iana",
    extensions: [
      "tpl"
    ]
  },
  "application/vnd.groove-vcard": {
    source: "iana",
    extensions: [
      "vcg"
    ]
  },
  "application/vnd.hal+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hal+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "hal"
    ]
  },
  "application/vnd.handheld-entertainment+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "zmm"
    ]
  },
  "application/vnd.hbci": {
    source: "iana",
    extensions: [
      "hbci"
    ]
  },
  "application/vnd.hc+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hcl-bireports": {
    source: "iana"
  },
  "application/vnd.hdt": {
    source: "iana"
  },
  "application/vnd.heroku+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hhe.lesson-player": {
    source: "iana",
    extensions: [
      "les"
    ]
  },
  "application/vnd.hl7cda+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.hl7v2+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.hp-hpgl": {
    source: "iana",
    extensions: [
      "hpgl"
    ]
  },
  "application/vnd.hp-hpid": {
    source: "iana",
    extensions: [
      "hpid"
    ]
  },
  "application/vnd.hp-hps": {
    source: "iana",
    extensions: [
      "hps"
    ]
  },
  "application/vnd.hp-jlyt": {
    source: "iana",
    extensions: [
      "jlt"
    ]
  },
  "application/vnd.hp-pcl": {
    source: "iana",
    extensions: [
      "pcl"
    ]
  },
  "application/vnd.hp-pclxl": {
    source: "iana",
    extensions: [
      "pclxl"
    ]
  },
  "application/vnd.httphone": {
    source: "iana"
  },
  "application/vnd.hydrostatix.sof-data": {
    source: "iana",
    extensions: [
      "sfd-hdstx"
    ]
  },
  "application/vnd.hyper+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hyper-item+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hyperdrive+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hzn-3d-crossword": {
    source: "iana"
  },
  "application/vnd.ibm.afplinedata": {
    source: "iana"
  },
  "application/vnd.ibm.electronic-media": {
    source: "iana"
  },
  "application/vnd.ibm.minipay": {
    source: "iana",
    extensions: [
      "mpy"
    ]
  },
  "application/vnd.ibm.modcap": {
    source: "iana",
    extensions: [
      "afp",
      "listafp",
      "list3820"
    ]
  },
  "application/vnd.ibm.rights-management": {
    source: "iana",
    extensions: [
      "irm"
    ]
  },
  "application/vnd.ibm.secure-container": {
    source: "iana",
    extensions: [
      "sc"
    ]
  },
  "application/vnd.iccprofile": {
    source: "iana",
    extensions: [
      "icc",
      "icm"
    ]
  },
  "application/vnd.ieee.1905": {
    source: "iana"
  },
  "application/vnd.igloader": {
    source: "iana",
    extensions: [
      "igl"
    ]
  },
  "application/vnd.imagemeter.folder+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.imagemeter.image+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.immervision-ivp": {
    source: "iana",
    extensions: [
      "ivp"
    ]
  },
  "application/vnd.immervision-ivu": {
    source: "iana",
    extensions: [
      "ivu"
    ]
  },
  "application/vnd.ims.imsccv1p1": {
    source: "iana"
  },
  "application/vnd.ims.imsccv1p2": {
    source: "iana"
  },
  "application/vnd.ims.imsccv1p3": {
    source: "iana"
  },
  "application/vnd.ims.lis.v2.result+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolproxy+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolproxy.id+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolsettings+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolsettings.simple+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.informedcontrol.rms+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.informix-visionary": {
    source: "iana"
  },
  "application/vnd.infotech.project": {
    source: "iana"
  },
  "application/vnd.infotech.project+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.innopath.wamp.notification": {
    source: "iana"
  },
  "application/vnd.insors.igm": {
    source: "iana",
    extensions: [
      "igm"
    ]
  },
  "application/vnd.intercon.formnet": {
    source: "iana",
    extensions: [
      "xpw",
      "xpx"
    ]
  },
  "application/vnd.intergeo": {
    source: "iana",
    extensions: [
      "i2g"
    ]
  },
  "application/vnd.intertrust.digibox": {
    source: "iana"
  },
  "application/vnd.intertrust.nncp": {
    source: "iana"
  },
  "application/vnd.intu.qbo": {
    source: "iana",
    extensions: [
      "qbo"
    ]
  },
  "application/vnd.intu.qfx": {
    source: "iana",
    extensions: [
      "qfx"
    ]
  },
  "application/vnd.iptc.g2.catalogitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.conceptitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.knowledgeitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.newsitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.newsmessage+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.packageitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.planningitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ipunplugged.rcprofile": {
    source: "iana",
    extensions: [
      "rcprofile"
    ]
  },
  "application/vnd.irepository.package+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "irp"
    ]
  },
  "application/vnd.is-xpr": {
    source: "iana",
    extensions: [
      "xpr"
    ]
  },
  "application/vnd.isac.fcs": {
    source: "iana",
    extensions: [
      "fcs"
    ]
  },
  "application/vnd.iso11783-10+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.jam": {
    source: "iana",
    extensions: [
      "jam"
    ]
  },
  "application/vnd.japannet-directory-service": {
    source: "iana"
  },
  "application/vnd.japannet-jpnstore-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-payment-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-registration": {
    source: "iana"
  },
  "application/vnd.japannet-registration-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-setstore-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-verification": {
    source: "iana"
  },
  "application/vnd.japannet-verification-wakeup": {
    source: "iana"
  },
  "application/vnd.jcp.javame.midlet-rms": {
    source: "iana",
    extensions: [
      "rms"
    ]
  },
  "application/vnd.jisp": {
    source: "iana",
    extensions: [
      "jisp"
    ]
  },
  "application/vnd.joost.joda-archive": {
    source: "iana",
    extensions: [
      "joda"
    ]
  },
  "application/vnd.jsk.isdn-ngn": {
    source: "iana"
  },
  "application/vnd.kahootz": {
    source: "iana",
    extensions: [
      "ktz",
      "ktr"
    ]
  },
  "application/vnd.kde.karbon": {
    source: "iana",
    extensions: [
      "karbon"
    ]
  },
  "application/vnd.kde.kchart": {
    source: "iana",
    extensions: [
      "chrt"
    ]
  },
  "application/vnd.kde.kformula": {
    source: "iana",
    extensions: [
      "kfo"
    ]
  },
  "application/vnd.kde.kivio": {
    source: "iana",
    extensions: [
      "flw"
    ]
  },
  "application/vnd.kde.kontour": {
    source: "iana",
    extensions: [
      "kon"
    ]
  },
  "application/vnd.kde.kpresenter": {
    source: "iana",
    extensions: [
      "kpr",
      "kpt"
    ]
  },
  "application/vnd.kde.kspread": {
    source: "iana",
    extensions: [
      "ksp"
    ]
  },
  "application/vnd.kde.kword": {
    source: "iana",
    extensions: [
      "kwd",
      "kwt"
    ]
  },
  "application/vnd.kenameaapp": {
    source: "iana",
    extensions: [
      "htke"
    ]
  },
  "application/vnd.kidspiration": {
    source: "iana",
    extensions: [
      "kia"
    ]
  },
  "application/vnd.kinar": {
    source: "iana",
    extensions: [
      "kne",
      "knp"
    ]
  },
  "application/vnd.koan": {
    source: "iana",
    extensions: [
      "skp",
      "skd",
      "skt",
      "skm"
    ]
  },
  "application/vnd.kodak-descriptor": {
    source: "iana",
    extensions: [
      "sse"
    ]
  },
  "application/vnd.las": {
    source: "iana"
  },
  "application/vnd.las.las+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.las.las+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lasxml"
    ]
  },
  "application/vnd.laszip": {
    source: "iana"
  },
  "application/vnd.leap+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.liberty-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.llamagraphics.life-balance.desktop": {
    source: "iana",
    extensions: [
      "lbd"
    ]
  },
  "application/vnd.llamagraphics.life-balance.exchange+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lbe"
    ]
  },
  "application/vnd.logipipe.circuit+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.loom": {
    source: "iana"
  },
  "application/vnd.lotus-1-2-3": {
    source: "iana",
    extensions: [
      "123"
    ]
  },
  "application/vnd.lotus-approach": {
    source: "iana",
    extensions: [
      "apr"
    ]
  },
  "application/vnd.lotus-freelance": {
    source: "iana",
    extensions: [
      "pre"
    ]
  },
  "application/vnd.lotus-notes": {
    source: "iana",
    extensions: [
      "nsf"
    ]
  },
  "application/vnd.lotus-organizer": {
    source: "iana",
    extensions: [
      "org"
    ]
  },
  "application/vnd.lotus-screencam": {
    source: "iana",
    extensions: [
      "scm"
    ]
  },
  "application/vnd.lotus-wordpro": {
    source: "iana",
    extensions: [
      "lwp"
    ]
  },
  "application/vnd.macports.portpkg": {
    source: "iana",
    extensions: [
      "portpkg"
    ]
  },
  "application/vnd.mapbox-vector-tile": {
    source: "iana",
    extensions: [
      "mvt"
    ]
  },
  "application/vnd.marlin.drm.actiontoken+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.marlin.drm.conftoken+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.marlin.drm.license+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.marlin.drm.mdcf": {
    source: "iana"
  },
  "application/vnd.mason+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.maxar.archive.3tz+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.maxmind.maxmind-db": {
    source: "iana"
  },
  "application/vnd.mcd": {
    source: "iana",
    extensions: [
      "mcd"
    ]
  },
  "application/vnd.medcalcdata": {
    source: "iana",
    extensions: [
      "mc1"
    ]
  },
  "application/vnd.mediastation.cdkey": {
    source: "iana",
    extensions: [
      "cdkey"
    ]
  },
  "application/vnd.meridian-slingshot": {
    source: "iana"
  },
  "application/vnd.mfer": {
    source: "iana",
    extensions: [
      "mwf"
    ]
  },
  "application/vnd.mfmp": {
    source: "iana",
    extensions: [
      "mfm"
    ]
  },
  "application/vnd.micro+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.micrografx.flo": {
    source: "iana",
    extensions: [
      "flo"
    ]
  },
  "application/vnd.micrografx.igx": {
    source: "iana",
    extensions: [
      "igx"
    ]
  },
  "application/vnd.microsoft.portable-executable": {
    source: "iana"
  },
  "application/vnd.microsoft.windows.thumbnail-cache": {
    source: "iana"
  },
  "application/vnd.miele+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.mif": {
    source: "iana",
    extensions: [
      "mif"
    ]
  },
  "application/vnd.minisoft-hp3000-save": {
    source: "iana"
  },
  "application/vnd.mitsubishi.misty-guard.trustweb": {
    source: "iana"
  },
  "application/vnd.mobius.daf": {
    source: "iana",
    extensions: [
      "daf"
    ]
  },
  "application/vnd.mobius.dis": {
    source: "iana",
    extensions: [
      "dis"
    ]
  },
  "application/vnd.mobius.mbk": {
    source: "iana",
    extensions: [
      "mbk"
    ]
  },
  "application/vnd.mobius.mqy": {
    source: "iana",
    extensions: [
      "mqy"
    ]
  },
  "application/vnd.mobius.msl": {
    source: "iana",
    extensions: [
      "msl"
    ]
  },
  "application/vnd.mobius.plc": {
    source: "iana",
    extensions: [
      "plc"
    ]
  },
  "application/vnd.mobius.txf": {
    source: "iana",
    extensions: [
      "txf"
    ]
  },
  "application/vnd.mophun.application": {
    source: "iana",
    extensions: [
      "mpn"
    ]
  },
  "application/vnd.mophun.certificate": {
    source: "iana",
    extensions: [
      "mpc"
    ]
  },
  "application/vnd.motorola.flexsuite": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.adsi": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.fis": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.gotap": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.kmr": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.ttc": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.wem": {
    source: "iana"
  },
  "application/vnd.motorola.iprm": {
    source: "iana"
  },
  "application/vnd.mozilla.xul+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xul"
    ]
  },
  "application/vnd.ms-3mfdocument": {
    source: "iana"
  },
  "application/vnd.ms-artgalry": {
    source: "iana",
    extensions: [
      "cil"
    ]
  },
  "application/vnd.ms-asf": {
    source: "iana"
  },
  "application/vnd.ms-cab-compressed": {
    source: "iana",
    extensions: [
      "cab"
    ]
  },
  "application/vnd.ms-color.iccprofile": {
    source: "apache"
  },
  "application/vnd.ms-excel": {
    source: "iana",
    compressible: !1,
    extensions: [
      "xls",
      "xlm",
      "xla",
      "xlc",
      "xlt",
      "xlw"
    ]
  },
  "application/vnd.ms-excel.addin.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlam"
    ]
  },
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlsb"
    ]
  },
  "application/vnd.ms-excel.sheet.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlsm"
    ]
  },
  "application/vnd.ms-excel.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "xltm"
    ]
  },
  "application/vnd.ms-fontobject": {
    source: "iana",
    compressible: !0,
    extensions: [
      "eot"
    ]
  },
  "application/vnd.ms-htmlhelp": {
    source: "iana",
    extensions: [
      "chm"
    ]
  },
  "application/vnd.ms-ims": {
    source: "iana",
    extensions: [
      "ims"
    ]
  },
  "application/vnd.ms-lrm": {
    source: "iana",
    extensions: [
      "lrm"
    ]
  },
  "application/vnd.ms-office.activex+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-officetheme": {
    source: "iana",
    extensions: [
      "thmx"
    ]
  },
  "application/vnd.ms-opentype": {
    source: "apache",
    compressible: !0
  },
  "application/vnd.ms-outlook": {
    compressible: !1,
    extensions: [
      "msg"
    ]
  },
  "application/vnd.ms-package.obfuscated-opentype": {
    source: "apache"
  },
  "application/vnd.ms-pki.seccat": {
    source: "apache",
    extensions: [
      "cat"
    ]
  },
  "application/vnd.ms-pki.stl": {
    source: "apache",
    extensions: [
      "stl"
    ]
  },
  "application/vnd.ms-playready.initiator+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-powerpoint": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ppt",
      "pps",
      "pot"
    ]
  },
  "application/vnd.ms-powerpoint.addin.macroenabled.12": {
    source: "iana",
    extensions: [
      "ppam"
    ]
  },
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
    source: "iana",
    extensions: [
      "pptm"
    ]
  },
  "application/vnd.ms-powerpoint.slide.macroenabled.12": {
    source: "iana",
    extensions: [
      "sldm"
    ]
  },
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
    source: "iana",
    extensions: [
      "ppsm"
    ]
  },
  "application/vnd.ms-powerpoint.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "potm"
    ]
  },
  "application/vnd.ms-printdevicecapabilities+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-printing.printticket+xml": {
    source: "apache",
    compressible: !0
  },
  "application/vnd.ms-printschematicket+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-project": {
    source: "iana",
    extensions: [
      "mpp",
      "mpt"
    ]
  },
  "application/vnd.ms-tnef": {
    source: "iana"
  },
  "application/vnd.ms-windows.devicepairing": {
    source: "iana"
  },
  "application/vnd.ms-windows.nwprinting.oob": {
    source: "iana"
  },
  "application/vnd.ms-windows.printerpairing": {
    source: "iana"
  },
  "application/vnd.ms-windows.wsd.oob": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.lic-chlg-req": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.lic-resp": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.meter-chlg-req": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.meter-resp": {
    source: "iana"
  },
  "application/vnd.ms-word.document.macroenabled.12": {
    source: "iana",
    extensions: [
      "docm"
    ]
  },
  "application/vnd.ms-word.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "dotm"
    ]
  },
  "application/vnd.ms-works": {
    source: "iana",
    extensions: [
      "wps",
      "wks",
      "wcm",
      "wdb"
    ]
  },
  "application/vnd.ms-wpl": {
    source: "iana",
    extensions: [
      "wpl"
    ]
  },
  "application/vnd.ms-xpsdocument": {
    source: "iana",
    compressible: !1,
    extensions: [
      "xps"
    ]
  },
  "application/vnd.msa-disk-image": {
    source: "iana"
  },
  "application/vnd.mseq": {
    source: "iana",
    extensions: [
      "mseq"
    ]
  },
  "application/vnd.msign": {
    source: "iana"
  },
  "application/vnd.multiad.creator": {
    source: "iana"
  },
  "application/vnd.multiad.creator.cif": {
    source: "iana"
  },
  "application/vnd.music-niff": {
    source: "iana"
  },
  "application/vnd.musician": {
    source: "iana",
    extensions: [
      "mus"
    ]
  },
  "application/vnd.muvee.style": {
    source: "iana",
    extensions: [
      "msty"
    ]
  },
  "application/vnd.mynfc": {
    source: "iana",
    extensions: [
      "taglet"
    ]
  },
  "application/vnd.nacamar.ybrid+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ncd.control": {
    source: "iana"
  },
  "application/vnd.ncd.reference": {
    source: "iana"
  },
  "application/vnd.nearst.inv+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nebumind.line": {
    source: "iana"
  },
  "application/vnd.nervana": {
    source: "iana"
  },
  "application/vnd.netfpx": {
    source: "iana"
  },
  "application/vnd.neurolanguage.nlu": {
    source: "iana",
    extensions: [
      "nlu"
    ]
  },
  "application/vnd.nimn": {
    source: "iana"
  },
  "application/vnd.nintendo.nitro.rom": {
    source: "iana"
  },
  "application/vnd.nintendo.snes.rom": {
    source: "iana"
  },
  "application/vnd.nitf": {
    source: "iana",
    extensions: [
      "ntf",
      "nitf"
    ]
  },
  "application/vnd.noblenet-directory": {
    source: "iana",
    extensions: [
      "nnd"
    ]
  },
  "application/vnd.noblenet-sealer": {
    source: "iana",
    extensions: [
      "nns"
    ]
  },
  "application/vnd.noblenet-web": {
    source: "iana",
    extensions: [
      "nnw"
    ]
  },
  "application/vnd.nokia.catalogs": {
    source: "iana"
  },
  "application/vnd.nokia.conml+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.conml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.iptv.config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.isds-radio-presets": {
    source: "iana"
  },
  "application/vnd.nokia.landmark+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.landmark+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.landmarkcollection+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.n-gage.ac+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ac"
    ]
  },
  "application/vnd.nokia.n-gage.data": {
    source: "iana",
    extensions: [
      "ngdat"
    ]
  },
  "application/vnd.nokia.n-gage.symbian.install": {
    source: "iana",
    extensions: [
      "n-gage"
    ]
  },
  "application/vnd.nokia.ncd": {
    source: "iana"
  },
  "application/vnd.nokia.pcd+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.pcd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.radio-preset": {
    source: "iana",
    extensions: [
      "rpst"
    ]
  },
  "application/vnd.nokia.radio-presets": {
    source: "iana",
    extensions: [
      "rpss"
    ]
  },
  "application/vnd.novadigm.edm": {
    source: "iana",
    extensions: [
      "edm"
    ]
  },
  "application/vnd.novadigm.edx": {
    source: "iana",
    extensions: [
      "edx"
    ]
  },
  "application/vnd.novadigm.ext": {
    source: "iana",
    extensions: [
      "ext"
    ]
  },
  "application/vnd.ntt-local.content-share": {
    source: "iana"
  },
  "application/vnd.ntt-local.file-transfer": {
    source: "iana"
  },
  "application/vnd.ntt-local.ogw_remote-access": {
    source: "iana"
  },
  "application/vnd.ntt-local.sip-ta_remote": {
    source: "iana"
  },
  "application/vnd.ntt-local.sip-ta_tcp_stream": {
    source: "iana"
  },
  "application/vnd.oasis.opendocument.chart": {
    source: "iana",
    extensions: [
      "odc"
    ]
  },
  "application/vnd.oasis.opendocument.chart-template": {
    source: "iana",
    extensions: [
      "otc"
    ]
  },
  "application/vnd.oasis.opendocument.database": {
    source: "iana",
    extensions: [
      "odb"
    ]
  },
  "application/vnd.oasis.opendocument.formula": {
    source: "iana",
    extensions: [
      "odf"
    ]
  },
  "application/vnd.oasis.opendocument.formula-template": {
    source: "iana",
    extensions: [
      "odft"
    ]
  },
  "application/vnd.oasis.opendocument.graphics": {
    source: "iana",
    compressible: !1,
    extensions: [
      "odg"
    ]
  },
  "application/vnd.oasis.opendocument.graphics-template": {
    source: "iana",
    extensions: [
      "otg"
    ]
  },
  "application/vnd.oasis.opendocument.image": {
    source: "iana",
    extensions: [
      "odi"
    ]
  },
  "application/vnd.oasis.opendocument.image-template": {
    source: "iana",
    extensions: [
      "oti"
    ]
  },
  "application/vnd.oasis.opendocument.presentation": {
    source: "iana",
    compressible: !1,
    extensions: [
      "odp"
    ]
  },
  "application/vnd.oasis.opendocument.presentation-template": {
    source: "iana",
    extensions: [
      "otp"
    ]
  },
  "application/vnd.oasis.opendocument.spreadsheet": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ods"
    ]
  },
  "application/vnd.oasis.opendocument.spreadsheet-template": {
    source: "iana",
    extensions: [
      "ots"
    ]
  },
  "application/vnd.oasis.opendocument.text": {
    source: "iana",
    compressible: !1,
    extensions: [
      "odt"
    ]
  },
  "application/vnd.oasis.opendocument.text-master": {
    source: "iana",
    extensions: [
      "odm"
    ]
  },
  "application/vnd.oasis.opendocument.text-template": {
    source: "iana",
    extensions: [
      "ott"
    ]
  },
  "application/vnd.oasis.opendocument.text-web": {
    source: "iana",
    extensions: [
      "oth"
    ]
  },
  "application/vnd.obn": {
    source: "iana"
  },
  "application/vnd.ocf+cbor": {
    source: "iana"
  },
  "application/vnd.oci.image.manifest.v1+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oftn.l10n+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.contentaccessdownload+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.contentaccessstreaming+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.cspg-hexbinary": {
    source: "iana"
  },
  "application/vnd.oipf.dae.svg+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.dae.xhtml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.mippvcontrolmessage+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.pae.gem": {
    source: "iana"
  },
  "application/vnd.oipf.spdiscovery+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.spdlist+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.ueprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.userprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.olpc-sugar": {
    source: "iana",
    extensions: [
      "xo"
    ]
  },
  "application/vnd.oma-scws-config": {
    source: "iana"
  },
  "application/vnd.oma-scws-http-request": {
    source: "iana"
  },
  "application/vnd.oma-scws-http-response": {
    source: "iana"
  },
  "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.drm-trigger+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.imd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.ltkm": {
    source: "iana"
  },
  "application/vnd.oma.bcast.notification+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.provisioningtrigger": {
    source: "iana"
  },
  "application/vnd.oma.bcast.sgboot": {
    source: "iana"
  },
  "application/vnd.oma.bcast.sgdd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.sgdu": {
    source: "iana"
  },
  "application/vnd.oma.bcast.simple-symbol-container": {
    source: "iana"
  },
  "application/vnd.oma.bcast.smartcard-trigger+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.sprov+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.stkm": {
    source: "iana"
  },
  "application/vnd.oma.cab-address-book+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-feature-handler+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-pcc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-subs-invite+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-user-prefs+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.dcd": {
    source: "iana"
  },
  "application/vnd.oma.dcdc": {
    source: "iana"
  },
  "application/vnd.oma.dd2+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dd2"
    ]
  },
  "application/vnd.oma.drm.risd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.group-usage-list+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.lwm2m+cbor": {
    source: "iana"
  },
  "application/vnd.oma.lwm2m+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.lwm2m+tlv": {
    source: "iana"
  },
  "application/vnd.oma.pal+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.detailed-progress-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.final-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.groups+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.invocation-descriptor+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.optimized-progress-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.push": {
    source: "iana"
  },
  "application/vnd.oma.scidm.messages+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.xcap-directory+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.omads-email+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.omads-file+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.omads-folder+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.omaloc-supl-init": {
    source: "iana"
  },
  "application/vnd.onepager": {
    source: "iana"
  },
  "application/vnd.onepagertamp": {
    source: "iana"
  },
  "application/vnd.onepagertamx": {
    source: "iana"
  },
  "application/vnd.onepagertat": {
    source: "iana"
  },
  "application/vnd.onepagertatp": {
    source: "iana"
  },
  "application/vnd.onepagertatx": {
    source: "iana"
  },
  "application/vnd.openblox.game+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "obgx"
    ]
  },
  "application/vnd.openblox.game-binary": {
    source: "iana"
  },
  "application/vnd.openeye.oeb": {
    source: "iana"
  },
  "application/vnd.openofficeorg.extension": {
    source: "apache",
    extensions: [
      "oxt"
    ]
  },
  "application/vnd.openstreetmap.data+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "osm"
    ]
  },
  "application/vnd.opentimestamps.ots": {
    source: "iana"
  },
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawing+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    source: "iana",
    compressible: !1,
    extensions: [
      "pptx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide": {
    source: "iana",
    extensions: [
      "sldx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
    source: "iana",
    extensions: [
      "ppsx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template": {
    source: "iana",
    extensions: [
      "potx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    source: "iana",
    compressible: !1,
    extensions: [
      "xlsx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
    source: "iana",
    extensions: [
      "xltx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.theme+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.vmldrawing": {
    source: "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    source: "iana",
    compressible: !1,
    extensions: [
      "docx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
    source: "iana",
    extensions: [
      "dotx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-package.core-properties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-package.relationships+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oracle.resource+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.orange.indata": {
    source: "iana"
  },
  "application/vnd.osa.netdeploy": {
    source: "iana"
  },
  "application/vnd.osgeo.mapguide.package": {
    source: "iana",
    extensions: [
      "mgp"
    ]
  },
  "application/vnd.osgi.bundle": {
    source: "iana"
  },
  "application/vnd.osgi.dp": {
    source: "iana",
    extensions: [
      "dp"
    ]
  },
  "application/vnd.osgi.subsystem": {
    source: "iana",
    extensions: [
      "esa"
    ]
  },
  "application/vnd.otps.ct-kip+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oxli.countgraph": {
    source: "iana"
  },
  "application/vnd.pagerduty+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.palm": {
    source: "iana",
    extensions: [
      "pdb",
      "pqa",
      "oprc"
    ]
  },
  "application/vnd.panoply": {
    source: "iana"
  },
  "application/vnd.paos.xml": {
    source: "iana"
  },
  "application/vnd.patentdive": {
    source: "iana"
  },
  "application/vnd.patientecommsdoc": {
    source: "iana"
  },
  "application/vnd.pawaafile": {
    source: "iana",
    extensions: [
      "paw"
    ]
  },
  "application/vnd.pcos": {
    source: "iana"
  },
  "application/vnd.pg.format": {
    source: "iana",
    extensions: [
      "str"
    ]
  },
  "application/vnd.pg.osasli": {
    source: "iana",
    extensions: [
      "ei6"
    ]
  },
  "application/vnd.piaccess.application-licence": {
    source: "iana"
  },
  "application/vnd.picsel": {
    source: "iana",
    extensions: [
      "efif"
    ]
  },
  "application/vnd.pmi.widget": {
    source: "iana",
    extensions: [
      "wg"
    ]
  },
  "application/vnd.poc.group-advertisement+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.pocketlearn": {
    source: "iana",
    extensions: [
      "plf"
    ]
  },
  "application/vnd.powerbuilder6": {
    source: "iana",
    extensions: [
      "pbd"
    ]
  },
  "application/vnd.powerbuilder6-s": {
    source: "iana"
  },
  "application/vnd.powerbuilder7": {
    source: "iana"
  },
  "application/vnd.powerbuilder7-s": {
    source: "iana"
  },
  "application/vnd.powerbuilder75": {
    source: "iana"
  },
  "application/vnd.powerbuilder75-s": {
    source: "iana"
  },
  "application/vnd.preminet": {
    source: "iana"
  },
  "application/vnd.previewsystems.box": {
    source: "iana",
    extensions: [
      "box"
    ]
  },
  "application/vnd.proteus.magazine": {
    source: "iana",
    extensions: [
      "mgz"
    ]
  },
  "application/vnd.psfs": {
    source: "iana"
  },
  "application/vnd.publishare-delta-tree": {
    source: "iana",
    extensions: [
      "qps"
    ]
  },
  "application/vnd.pvi.ptid1": {
    source: "iana",
    extensions: [
      "ptid"
    ]
  },
  "application/vnd.pwg-multiplexed": {
    source: "iana"
  },
  "application/vnd.pwg-xhtml-print+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.qualcomm.brew-app-res": {
    source: "iana"
  },
  "application/vnd.quarantainenet": {
    source: "iana"
  },
  "application/vnd.quark.quarkxpress": {
    source: "iana",
    extensions: [
      "qxd",
      "qxt",
      "qwd",
      "qwt",
      "qxl",
      "qxb"
    ]
  },
  "application/vnd.quobject-quoxdocument": {
    source: "iana"
  },
  "application/vnd.radisys.moml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-conf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-conn+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-dialog+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-stream+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-conf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-base+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-fax-detect+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-group+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-speech+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-transform+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.rainstor.data": {
    source: "iana"
  },
  "application/vnd.rapid": {
    source: "iana"
  },
  "application/vnd.rar": {
    source: "iana",
    extensions: [
      "rar"
    ]
  },
  "application/vnd.realvnc.bed": {
    source: "iana",
    extensions: [
      "bed"
    ]
  },
  "application/vnd.recordare.musicxml": {
    source: "iana",
    extensions: [
      "mxl"
    ]
  },
  "application/vnd.recordare.musicxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "musicxml"
    ]
  },
  "application/vnd.renlearn.rlprint": {
    source: "iana"
  },
  "application/vnd.resilient.logic": {
    source: "iana"
  },
  "application/vnd.restful+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.rig.cryptonote": {
    source: "iana",
    extensions: [
      "cryptonote"
    ]
  },
  "application/vnd.rim.cod": {
    source: "apache",
    extensions: [
      "cod"
    ]
  },
  "application/vnd.rn-realmedia": {
    source: "apache",
    extensions: [
      "rm"
    ]
  },
  "application/vnd.rn-realmedia-vbr": {
    source: "apache",
    extensions: [
      "rmvb"
    ]
  },
  "application/vnd.route66.link66+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "link66"
    ]
  },
  "application/vnd.rs-274x": {
    source: "iana"
  },
  "application/vnd.ruckus.download": {
    source: "iana"
  },
  "application/vnd.s3sms": {
    source: "iana"
  },
  "application/vnd.sailingtracker.track": {
    source: "iana",
    extensions: [
      "st"
    ]
  },
  "application/vnd.sar": {
    source: "iana"
  },
  "application/vnd.sbm.cid": {
    source: "iana"
  },
  "application/vnd.sbm.mid2": {
    source: "iana"
  },
  "application/vnd.scribus": {
    source: "iana"
  },
  "application/vnd.sealed.3df": {
    source: "iana"
  },
  "application/vnd.sealed.csf": {
    source: "iana"
  },
  "application/vnd.sealed.doc": {
    source: "iana"
  },
  "application/vnd.sealed.eml": {
    source: "iana"
  },
  "application/vnd.sealed.mht": {
    source: "iana"
  },
  "application/vnd.sealed.net": {
    source: "iana"
  },
  "application/vnd.sealed.ppt": {
    source: "iana"
  },
  "application/vnd.sealed.tiff": {
    source: "iana"
  },
  "application/vnd.sealed.xls": {
    source: "iana"
  },
  "application/vnd.sealedmedia.softseal.html": {
    source: "iana"
  },
  "application/vnd.sealedmedia.softseal.pdf": {
    source: "iana"
  },
  "application/vnd.seemail": {
    source: "iana",
    extensions: [
      "see"
    ]
  },
  "application/vnd.seis+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.sema": {
    source: "iana",
    extensions: [
      "sema"
    ]
  },
  "application/vnd.semd": {
    source: "iana",
    extensions: [
      "semd"
    ]
  },
  "application/vnd.semf": {
    source: "iana",
    extensions: [
      "semf"
    ]
  },
  "application/vnd.shade-save-file": {
    source: "iana"
  },
  "application/vnd.shana.informed.formdata": {
    source: "iana",
    extensions: [
      "ifm"
    ]
  },
  "application/vnd.shana.informed.formtemplate": {
    source: "iana",
    extensions: [
      "itp"
    ]
  },
  "application/vnd.shana.informed.interchange": {
    source: "iana",
    extensions: [
      "iif"
    ]
  },
  "application/vnd.shana.informed.package": {
    source: "iana",
    extensions: [
      "ipk"
    ]
  },
  "application/vnd.shootproof+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.shopkick+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.shp": {
    source: "iana"
  },
  "application/vnd.shx": {
    source: "iana"
  },
  "application/vnd.sigrok.session": {
    source: "iana"
  },
  "application/vnd.simtech-mindmapper": {
    source: "iana",
    extensions: [
      "twd",
      "twds"
    ]
  },
  "application/vnd.siren+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.smaf": {
    source: "iana",
    extensions: [
      "mmf"
    ]
  },
  "application/vnd.smart.notebook": {
    source: "iana"
  },
  "application/vnd.smart.teacher": {
    source: "iana",
    extensions: [
      "teacher"
    ]
  },
  "application/vnd.snesdev-page-table": {
    source: "iana"
  },
  "application/vnd.software602.filler.form+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "fo"
    ]
  },
  "application/vnd.software602.filler.form-xml-zip": {
    source: "iana"
  },
  "application/vnd.solent.sdkm+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sdkm",
      "sdkd"
    ]
  },
  "application/vnd.spotfire.dxp": {
    source: "iana",
    extensions: [
      "dxp"
    ]
  },
  "application/vnd.spotfire.sfs": {
    source: "iana",
    extensions: [
      "sfs"
    ]
  },
  "application/vnd.sqlite3": {
    source: "iana"
  },
  "application/vnd.sss-cod": {
    source: "iana"
  },
  "application/vnd.sss-dtf": {
    source: "iana"
  },
  "application/vnd.sss-ntf": {
    source: "iana"
  },
  "application/vnd.stardivision.calc": {
    source: "apache",
    extensions: [
      "sdc"
    ]
  },
  "application/vnd.stardivision.draw": {
    source: "apache",
    extensions: [
      "sda"
    ]
  },
  "application/vnd.stardivision.impress": {
    source: "apache",
    extensions: [
      "sdd"
    ]
  },
  "application/vnd.stardivision.math": {
    source: "apache",
    extensions: [
      "smf"
    ]
  },
  "application/vnd.stardivision.writer": {
    source: "apache",
    extensions: [
      "sdw",
      "vor"
    ]
  },
  "application/vnd.stardivision.writer-global": {
    source: "apache",
    extensions: [
      "sgl"
    ]
  },
  "application/vnd.stepmania.package": {
    source: "iana",
    extensions: [
      "smzip"
    ]
  },
  "application/vnd.stepmania.stepchart": {
    source: "iana",
    extensions: [
      "sm"
    ]
  },
  "application/vnd.street-stream": {
    source: "iana"
  },
  "application/vnd.sun.wadl+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wadl"
    ]
  },
  "application/vnd.sun.xml.calc": {
    source: "apache",
    extensions: [
      "sxc"
    ]
  },
  "application/vnd.sun.xml.calc.template": {
    source: "apache",
    extensions: [
      "stc"
    ]
  },
  "application/vnd.sun.xml.draw": {
    source: "apache",
    extensions: [
      "sxd"
    ]
  },
  "application/vnd.sun.xml.draw.template": {
    source: "apache",
    extensions: [
      "std"
    ]
  },
  "application/vnd.sun.xml.impress": {
    source: "apache",
    extensions: [
      "sxi"
    ]
  },
  "application/vnd.sun.xml.impress.template": {
    source: "apache",
    extensions: [
      "sti"
    ]
  },
  "application/vnd.sun.xml.math": {
    source: "apache",
    extensions: [
      "sxm"
    ]
  },
  "application/vnd.sun.xml.writer": {
    source: "apache",
    extensions: [
      "sxw"
    ]
  },
  "application/vnd.sun.xml.writer.global": {
    source: "apache",
    extensions: [
      "sxg"
    ]
  },
  "application/vnd.sun.xml.writer.template": {
    source: "apache",
    extensions: [
      "stw"
    ]
  },
  "application/vnd.sus-calendar": {
    source: "iana",
    extensions: [
      "sus",
      "susp"
    ]
  },
  "application/vnd.svd": {
    source: "iana",
    extensions: [
      "svd"
    ]
  },
  "application/vnd.swiftview-ics": {
    source: "iana"
  },
  "application/vnd.sycle+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.syft+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.symbian.install": {
    source: "apache",
    extensions: [
      "sis",
      "sisx"
    ]
  },
  "application/vnd.syncml+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "xsm"
    ]
  },
  "application/vnd.syncml.dm+wbxml": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "bdm"
    ]
  },
  "application/vnd.syncml.dm+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "xdm"
    ]
  },
  "application/vnd.syncml.dm.notification": {
    source: "iana"
  },
  "application/vnd.syncml.dmddf+wbxml": {
    source: "iana"
  },
  "application/vnd.syncml.dmddf+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "ddf"
    ]
  },
  "application/vnd.syncml.dmtnds+wbxml": {
    source: "iana"
  },
  "application/vnd.syncml.dmtnds+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.syncml.ds.notification": {
    source: "iana"
  },
  "application/vnd.tableschema+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.tao.intent-module-archive": {
    source: "iana",
    extensions: [
      "tao"
    ]
  },
  "application/vnd.tcpdump.pcap": {
    source: "iana",
    extensions: [
      "pcap",
      "cap",
      "dmp"
    ]
  },
  "application/vnd.think-cell.ppttc+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.tmd.mediaflex.api+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.tml": {
    source: "iana"
  },
  "application/vnd.tmobile-livetv": {
    source: "iana",
    extensions: [
      "tmo"
    ]
  },
  "application/vnd.tri.onesource": {
    source: "iana"
  },
  "application/vnd.trid.tpt": {
    source: "iana",
    extensions: [
      "tpt"
    ]
  },
  "application/vnd.triscape.mxs": {
    source: "iana",
    extensions: [
      "mxs"
    ]
  },
  "application/vnd.trueapp": {
    source: "iana",
    extensions: [
      "tra"
    ]
  },
  "application/vnd.truedoc": {
    source: "iana"
  },
  "application/vnd.ubisoft.webplayer": {
    source: "iana"
  },
  "application/vnd.ufdl": {
    source: "iana",
    extensions: [
      "ufd",
      "ufdl"
    ]
  },
  "application/vnd.uiq.theme": {
    source: "iana",
    extensions: [
      "utz"
    ]
  },
  "application/vnd.umajin": {
    source: "iana",
    extensions: [
      "umj"
    ]
  },
  "application/vnd.unity": {
    source: "iana",
    extensions: [
      "unityweb"
    ]
  },
  "application/vnd.uoml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "uoml"
    ]
  },
  "application/vnd.uplanet.alert": {
    source: "iana"
  },
  "application/vnd.uplanet.alert-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.bearer-choice": {
    source: "iana"
  },
  "application/vnd.uplanet.bearer-choice-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.cacheop": {
    source: "iana"
  },
  "application/vnd.uplanet.cacheop-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.channel": {
    source: "iana"
  },
  "application/vnd.uplanet.channel-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.list": {
    source: "iana"
  },
  "application/vnd.uplanet.list-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.listcmd": {
    source: "iana"
  },
  "application/vnd.uplanet.listcmd-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.signal": {
    source: "iana"
  },
  "application/vnd.uri-map": {
    source: "iana"
  },
  "application/vnd.valve.source.material": {
    source: "iana"
  },
  "application/vnd.vcx": {
    source: "iana",
    extensions: [
      "vcx"
    ]
  },
  "application/vnd.vd-study": {
    source: "iana"
  },
  "application/vnd.vectorworks": {
    source: "iana"
  },
  "application/vnd.vel+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.verimatrix.vcas": {
    source: "iana"
  },
  "application/vnd.veritone.aion+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.veryant.thin": {
    source: "iana"
  },
  "application/vnd.ves.encrypted": {
    source: "iana"
  },
  "application/vnd.vidsoft.vidconference": {
    source: "iana"
  },
  "application/vnd.visio": {
    source: "iana",
    extensions: [
      "vsd",
      "vst",
      "vss",
      "vsw"
    ]
  },
  "application/vnd.visionary": {
    source: "iana",
    extensions: [
      "vis"
    ]
  },
  "application/vnd.vividence.scriptfile": {
    source: "iana"
  },
  "application/vnd.vsf": {
    source: "iana",
    extensions: [
      "vsf"
    ]
  },
  "application/vnd.wap.sic": {
    source: "iana"
  },
  "application/vnd.wap.slc": {
    source: "iana"
  },
  "application/vnd.wap.wbxml": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "wbxml"
    ]
  },
  "application/vnd.wap.wmlc": {
    source: "iana",
    extensions: [
      "wmlc"
    ]
  },
  "application/vnd.wap.wmlscriptc": {
    source: "iana",
    extensions: [
      "wmlsc"
    ]
  },
  "application/vnd.webturbo": {
    source: "iana",
    extensions: [
      "wtb"
    ]
  },
  "application/vnd.wfa.dpp": {
    source: "iana"
  },
  "application/vnd.wfa.p2p": {
    source: "iana"
  },
  "application/vnd.wfa.wsc": {
    source: "iana"
  },
  "application/vnd.windows.devicepairing": {
    source: "iana"
  },
  "application/vnd.wmc": {
    source: "iana"
  },
  "application/vnd.wmf.bootstrap": {
    source: "iana"
  },
  "application/vnd.wolfram.mathematica": {
    source: "iana"
  },
  "application/vnd.wolfram.mathematica.package": {
    source: "iana"
  },
  "application/vnd.wolfram.player": {
    source: "iana",
    extensions: [
      "nbp"
    ]
  },
  "application/vnd.wordperfect": {
    source: "iana",
    extensions: [
      "wpd"
    ]
  },
  "application/vnd.wqd": {
    source: "iana",
    extensions: [
      "wqd"
    ]
  },
  "application/vnd.wrq-hp3000-labelled": {
    source: "iana"
  },
  "application/vnd.wt.stf": {
    source: "iana",
    extensions: [
      "stf"
    ]
  },
  "application/vnd.wv.csp+wbxml": {
    source: "iana"
  },
  "application/vnd.wv.csp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.wv.ssp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.xacml+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.xara": {
    source: "iana",
    extensions: [
      "xar"
    ]
  },
  "application/vnd.xfdl": {
    source: "iana",
    extensions: [
      "xfdl"
    ]
  },
  "application/vnd.xfdl.webform": {
    source: "iana"
  },
  "application/vnd.xmi+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.xmpie.cpkg": {
    source: "iana"
  },
  "application/vnd.xmpie.dpkg": {
    source: "iana"
  },
  "application/vnd.xmpie.plan": {
    source: "iana"
  },
  "application/vnd.xmpie.ppkg": {
    source: "iana"
  },
  "application/vnd.xmpie.xlim": {
    source: "iana"
  },
  "application/vnd.yamaha.hv-dic": {
    source: "iana",
    extensions: [
      "hvd"
    ]
  },
  "application/vnd.yamaha.hv-script": {
    source: "iana",
    extensions: [
      "hvs"
    ]
  },
  "application/vnd.yamaha.hv-voice": {
    source: "iana",
    extensions: [
      "hvp"
    ]
  },
  "application/vnd.yamaha.openscoreformat": {
    source: "iana",
    extensions: [
      "osf"
    ]
  },
  "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "osfpvg"
    ]
  },
  "application/vnd.yamaha.remote-setup": {
    source: "iana"
  },
  "application/vnd.yamaha.smaf-audio": {
    source: "iana",
    extensions: [
      "saf"
    ]
  },
  "application/vnd.yamaha.smaf-phrase": {
    source: "iana",
    extensions: [
      "spf"
    ]
  },
  "application/vnd.yamaha.through-ngn": {
    source: "iana"
  },
  "application/vnd.yamaha.tunnel-udpencap": {
    source: "iana"
  },
  "application/vnd.yaoweme": {
    source: "iana"
  },
  "application/vnd.yellowriver-custom-menu": {
    source: "iana",
    extensions: [
      "cmp"
    ]
  },
  "application/vnd.youtube.yt": {
    source: "iana"
  },
  "application/vnd.zul": {
    source: "iana",
    extensions: [
      "zir",
      "zirz"
    ]
  },
  "application/vnd.zzazz.deck+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "zaz"
    ]
  },
  "application/voicexml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "vxml"
    ]
  },
  "application/voucher-cms+json": {
    source: "iana",
    compressible: !0
  },
  "application/vq-rtcpxr": {
    source: "iana"
  },
  "application/wasm": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wasm"
    ]
  },
  "application/watcherinfo+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wif"
    ]
  },
  "application/webpush-options+json": {
    source: "iana",
    compressible: !0
  },
  "application/whoispp-query": {
    source: "iana"
  },
  "application/whoispp-response": {
    source: "iana"
  },
  "application/widget": {
    source: "iana",
    extensions: [
      "wgt"
    ]
  },
  "application/winhlp": {
    source: "apache",
    extensions: [
      "hlp"
    ]
  },
  "application/wita": {
    source: "iana"
  },
  "application/wordperfect5.1": {
    source: "iana"
  },
  "application/wsdl+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wsdl"
    ]
  },
  "application/wspolicy+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wspolicy"
    ]
  },
  "application/x-7z-compressed": {
    source: "apache",
    compressible: !1,
    extensions: [
      "7z"
    ]
  },
  "application/x-abiword": {
    source: "apache",
    extensions: [
      "abw"
    ]
  },
  "application/x-ace-compressed": {
    source: "apache",
    extensions: [
      "ace"
    ]
  },
  "application/x-amf": {
    source: "apache"
  },
  "application/x-apple-diskimage": {
    source: "apache",
    extensions: [
      "dmg"
    ]
  },
  "application/x-arj": {
    compressible: !1,
    extensions: [
      "arj"
    ]
  },
  "application/x-authorware-bin": {
    source: "apache",
    extensions: [
      "aab",
      "x32",
      "u32",
      "vox"
    ]
  },
  "application/x-authorware-map": {
    source: "apache",
    extensions: [
      "aam"
    ]
  },
  "application/x-authorware-seg": {
    source: "apache",
    extensions: [
      "aas"
    ]
  },
  "application/x-bcpio": {
    source: "apache",
    extensions: [
      "bcpio"
    ]
  },
  "application/x-bdoc": {
    compressible: !1,
    extensions: [
      "bdoc"
    ]
  },
  "application/x-bittorrent": {
    source: "apache",
    extensions: [
      "torrent"
    ]
  },
  "application/x-blorb": {
    source: "apache",
    extensions: [
      "blb",
      "blorb"
    ]
  },
  "application/x-bzip": {
    source: "apache",
    compressible: !1,
    extensions: [
      "bz"
    ]
  },
  "application/x-bzip2": {
    source: "apache",
    compressible: !1,
    extensions: [
      "bz2",
      "boz"
    ]
  },
  "application/x-cbr": {
    source: "apache",
    extensions: [
      "cbr",
      "cba",
      "cbt",
      "cbz",
      "cb7"
    ]
  },
  "application/x-cdlink": {
    source: "apache",
    extensions: [
      "vcd"
    ]
  },
  "application/x-cfs-compressed": {
    source: "apache",
    extensions: [
      "cfs"
    ]
  },
  "application/x-chat": {
    source: "apache",
    extensions: [
      "chat"
    ]
  },
  "application/x-chess-pgn": {
    source: "apache",
    extensions: [
      "pgn"
    ]
  },
  "application/x-chrome-extension": {
    extensions: [
      "crx"
    ]
  },
  "application/x-cocoa": {
    source: "nginx",
    extensions: [
      "cco"
    ]
  },
  "application/x-compress": {
    source: "apache"
  },
  "application/x-conference": {
    source: "apache",
    extensions: [
      "nsc"
    ]
  },
  "application/x-cpio": {
    source: "apache",
    extensions: [
      "cpio"
    ]
  },
  "application/x-csh": {
    source: "apache",
    extensions: [
      "csh"
    ]
  },
  "application/x-deb": {
    compressible: !1
  },
  "application/x-debian-package": {
    source: "apache",
    extensions: [
      "deb",
      "udeb"
    ]
  },
  "application/x-dgc-compressed": {
    source: "apache",
    extensions: [
      "dgc"
    ]
  },
  "application/x-director": {
    source: "apache",
    extensions: [
      "dir",
      "dcr",
      "dxr",
      "cst",
      "cct",
      "cxt",
      "w3d",
      "fgd",
      "swa"
    ]
  },
  "application/x-doom": {
    source: "apache",
    extensions: [
      "wad"
    ]
  },
  "application/x-dtbncx+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "ncx"
    ]
  },
  "application/x-dtbook+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "dtb"
    ]
  },
  "application/x-dtbresource+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "res"
    ]
  },
  "application/x-dvi": {
    source: "apache",
    compressible: !1,
    extensions: [
      "dvi"
    ]
  },
  "application/x-envoy": {
    source: "apache",
    extensions: [
      "evy"
    ]
  },
  "application/x-eva": {
    source: "apache",
    extensions: [
      "eva"
    ]
  },
  "application/x-font-bdf": {
    source: "apache",
    extensions: [
      "bdf"
    ]
  },
  "application/x-font-dos": {
    source: "apache"
  },
  "application/x-font-framemaker": {
    source: "apache"
  },
  "application/x-font-ghostscript": {
    source: "apache",
    extensions: [
      "gsf"
    ]
  },
  "application/x-font-libgrx": {
    source: "apache"
  },
  "application/x-font-linux-psf": {
    source: "apache",
    extensions: [
      "psf"
    ]
  },
  "application/x-font-pcf": {
    source: "apache",
    extensions: [
      "pcf"
    ]
  },
  "application/x-font-snf": {
    source: "apache",
    extensions: [
      "snf"
    ]
  },
  "application/x-font-speedo": {
    source: "apache"
  },
  "application/x-font-sunos-news": {
    source: "apache"
  },
  "application/x-font-type1": {
    source: "apache",
    extensions: [
      "pfa",
      "pfb",
      "pfm",
      "afm"
    ]
  },
  "application/x-font-vfont": {
    source: "apache"
  },
  "application/x-freearc": {
    source: "apache",
    extensions: [
      "arc"
    ]
  },
  "application/x-futuresplash": {
    source: "apache",
    extensions: [
      "spl"
    ]
  },
  "application/x-gca-compressed": {
    source: "apache",
    extensions: [
      "gca"
    ]
  },
  "application/x-glulx": {
    source: "apache",
    extensions: [
      "ulx"
    ]
  },
  "application/x-gnumeric": {
    source: "apache",
    extensions: [
      "gnumeric"
    ]
  },
  "application/x-gramps-xml": {
    source: "apache",
    extensions: [
      "gramps"
    ]
  },
  "application/x-gtar": {
    source: "apache",
    extensions: [
      "gtar"
    ]
  },
  "application/x-gzip": {
    source: "apache"
  },
  "application/x-hdf": {
    source: "apache",
    extensions: [
      "hdf"
    ]
  },
  "application/x-httpd-php": {
    compressible: !0,
    extensions: [
      "php"
    ]
  },
  "application/x-install-instructions": {
    source: "apache",
    extensions: [
      "install"
    ]
  },
  "application/x-iso9660-image": {
    source: "apache",
    extensions: [
      "iso"
    ]
  },
  "application/x-iwork-keynote-sffkey": {
    extensions: [
      "key"
    ]
  },
  "application/x-iwork-numbers-sffnumbers": {
    extensions: [
      "numbers"
    ]
  },
  "application/x-iwork-pages-sffpages": {
    extensions: [
      "pages"
    ]
  },
  "application/x-java-archive-diff": {
    source: "nginx",
    extensions: [
      "jardiff"
    ]
  },
  "application/x-java-jnlp-file": {
    source: "apache",
    compressible: !1,
    extensions: [
      "jnlp"
    ]
  },
  "application/x-javascript": {
    compressible: !0
  },
  "application/x-keepass2": {
    extensions: [
      "kdbx"
    ]
  },
  "application/x-latex": {
    source: "apache",
    compressible: !1,
    extensions: [
      "latex"
    ]
  },
  "application/x-lua-bytecode": {
    extensions: [
      "luac"
    ]
  },
  "application/x-lzh-compressed": {
    source: "apache",
    extensions: [
      "lzh",
      "lha"
    ]
  },
  "application/x-makeself": {
    source: "nginx",
    extensions: [
      "run"
    ]
  },
  "application/x-mie": {
    source: "apache",
    extensions: [
      "mie"
    ]
  },
  "application/x-mobipocket-ebook": {
    source: "apache",
    extensions: [
      "prc",
      "mobi"
    ]
  },
  "application/x-mpegurl": {
    compressible: !1
  },
  "application/x-ms-application": {
    source: "apache",
    extensions: [
      "application"
    ]
  },
  "application/x-ms-shortcut": {
    source: "apache",
    extensions: [
      "lnk"
    ]
  },
  "application/x-ms-wmd": {
    source: "apache",
    extensions: [
      "wmd"
    ]
  },
  "application/x-ms-wmz": {
    source: "apache",
    extensions: [
      "wmz"
    ]
  },
  "application/x-ms-xbap": {
    source: "apache",
    extensions: [
      "xbap"
    ]
  },
  "application/x-msaccess": {
    source: "apache",
    extensions: [
      "mdb"
    ]
  },
  "application/x-msbinder": {
    source: "apache",
    extensions: [
      "obd"
    ]
  },
  "application/x-mscardfile": {
    source: "apache",
    extensions: [
      "crd"
    ]
  },
  "application/x-msclip": {
    source: "apache",
    extensions: [
      "clp"
    ]
  },
  "application/x-msdos-program": {
    extensions: [
      "exe"
    ]
  },
  "application/x-msdownload": {
    source: "apache",
    extensions: [
      "exe",
      "dll",
      "com",
      "bat",
      "msi"
    ]
  },
  "application/x-msmediaview": {
    source: "apache",
    extensions: [
      "mvb",
      "m13",
      "m14"
    ]
  },
  "application/x-msmetafile": {
    source: "apache",
    extensions: [
      "wmf",
      "wmz",
      "emf",
      "emz"
    ]
  },
  "application/x-msmoney": {
    source: "apache",
    extensions: [
      "mny"
    ]
  },
  "application/x-mspublisher": {
    source: "apache",
    extensions: [
      "pub"
    ]
  },
  "application/x-msschedule": {
    source: "apache",
    extensions: [
      "scd"
    ]
  },
  "application/x-msterminal": {
    source: "apache",
    extensions: [
      "trm"
    ]
  },
  "application/x-mswrite": {
    source: "apache",
    extensions: [
      "wri"
    ]
  },
  "application/x-netcdf": {
    source: "apache",
    extensions: [
      "nc",
      "cdf"
    ]
  },
  "application/x-ns-proxy-autoconfig": {
    compressible: !0,
    extensions: [
      "pac"
    ]
  },
  "application/x-nzb": {
    source: "apache",
    extensions: [
      "nzb"
    ]
  },
  "application/x-perl": {
    source: "nginx",
    extensions: [
      "pl",
      "pm"
    ]
  },
  "application/x-pilot": {
    source: "nginx",
    extensions: [
      "prc",
      "pdb"
    ]
  },
  "application/x-pkcs12": {
    source: "apache",
    compressible: !1,
    extensions: [
      "p12",
      "pfx"
    ]
  },
  "application/x-pkcs7-certificates": {
    source: "apache",
    extensions: [
      "p7b",
      "spc"
    ]
  },
  "application/x-pkcs7-certreqresp": {
    source: "apache",
    extensions: [
      "p7r"
    ]
  },
  "application/x-pki-message": {
    source: "iana"
  },
  "application/x-rar-compressed": {
    source: "apache",
    compressible: !1,
    extensions: [
      "rar"
    ]
  },
  "application/x-redhat-package-manager": {
    source: "nginx",
    extensions: [
      "rpm"
    ]
  },
  "application/x-research-info-systems": {
    source: "apache",
    extensions: [
      "ris"
    ]
  },
  "application/x-sea": {
    source: "nginx",
    extensions: [
      "sea"
    ]
  },
  "application/x-sh": {
    source: "apache",
    compressible: !0,
    extensions: [
      "sh"
    ]
  },
  "application/x-shar": {
    source: "apache",
    extensions: [
      "shar"
    ]
  },
  "application/x-shockwave-flash": {
    source: "apache",
    compressible: !1,
    extensions: [
      "swf"
    ]
  },
  "application/x-silverlight-app": {
    source: "apache",
    extensions: [
      "xap"
    ]
  },
  "application/x-sql": {
    source: "apache",
    extensions: [
      "sql"
    ]
  },
  "application/x-stuffit": {
    source: "apache",
    compressible: !1,
    extensions: [
      "sit"
    ]
  },
  "application/x-stuffitx": {
    source: "apache",
    extensions: [
      "sitx"
    ]
  },
  "application/x-subrip": {
    source: "apache",
    extensions: [
      "srt"
    ]
  },
  "application/x-sv4cpio": {
    source: "apache",
    extensions: [
      "sv4cpio"
    ]
  },
  "application/x-sv4crc": {
    source: "apache",
    extensions: [
      "sv4crc"
    ]
  },
  "application/x-t3vm-image": {
    source: "apache",
    extensions: [
      "t3"
    ]
  },
  "application/x-tads": {
    source: "apache",
    extensions: [
      "gam"
    ]
  },
  "application/x-tar": {
    source: "apache",
    compressible: !0,
    extensions: [
      "tar"
    ]
  },
  "application/x-tcl": {
    source: "apache",
    extensions: [
      "tcl",
      "tk"
    ]
  },
  "application/x-tex": {
    source: "apache",
    extensions: [
      "tex"
    ]
  },
  "application/x-tex-tfm": {
    source: "apache",
    extensions: [
      "tfm"
    ]
  },
  "application/x-texinfo": {
    source: "apache",
    extensions: [
      "texinfo",
      "texi"
    ]
  },
  "application/x-tgif": {
    source: "apache",
    extensions: [
      "obj"
    ]
  },
  "application/x-ustar": {
    source: "apache",
    extensions: [
      "ustar"
    ]
  },
  "application/x-virtualbox-hdd": {
    compressible: !0,
    extensions: [
      "hdd"
    ]
  },
  "application/x-virtualbox-ova": {
    compressible: !0,
    extensions: [
      "ova"
    ]
  },
  "application/x-virtualbox-ovf": {
    compressible: !0,
    extensions: [
      "ovf"
    ]
  },
  "application/x-virtualbox-vbox": {
    compressible: !0,
    extensions: [
      "vbox"
    ]
  },
  "application/x-virtualbox-vbox-extpack": {
    compressible: !1,
    extensions: [
      "vbox-extpack"
    ]
  },
  "application/x-virtualbox-vdi": {
    compressible: !0,
    extensions: [
      "vdi"
    ]
  },
  "application/x-virtualbox-vhd": {
    compressible: !0,
    extensions: [
      "vhd"
    ]
  },
  "application/x-virtualbox-vmdk": {
    compressible: !0,
    extensions: [
      "vmdk"
    ]
  },
  "application/x-wais-source": {
    source: "apache",
    extensions: [
      "src"
    ]
  },
  "application/x-web-app-manifest+json": {
    compressible: !0,
    extensions: [
      "webapp"
    ]
  },
  "application/x-www-form-urlencoded": {
    source: "iana",
    compressible: !0
  },
  "application/x-x509-ca-cert": {
    source: "iana",
    extensions: [
      "der",
      "crt",
      "pem"
    ]
  },
  "application/x-x509-ca-ra-cert": {
    source: "iana"
  },
  "application/x-x509-next-ca-cert": {
    source: "iana"
  },
  "application/x-xfig": {
    source: "apache",
    extensions: [
      "fig"
    ]
  },
  "application/x-xliff+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xlf"
    ]
  },
  "application/x-xpinstall": {
    source: "apache",
    compressible: !1,
    extensions: [
      "xpi"
    ]
  },
  "application/x-xz": {
    source: "apache",
    extensions: [
      "xz"
    ]
  },
  "application/x-zmachine": {
    source: "apache",
    extensions: [
      "z1",
      "z2",
      "z3",
      "z4",
      "z5",
      "z6",
      "z7",
      "z8"
    ]
  },
  "application/x400-bp": {
    source: "iana"
  },
  "application/xacml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xaml+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xaml"
    ]
  },
  "application/xcap-att+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xav"
    ]
  },
  "application/xcap-caps+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xca"
    ]
  },
  "application/xcap-diff+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xdf"
    ]
  },
  "application/xcap-el+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xel"
    ]
  },
  "application/xcap-error+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xcap-ns+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xns"
    ]
  },
  "application/xcon-conference-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xcon-conference-info-diff+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xenc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xenc"
    ]
  },
  "application/xhtml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xhtml",
      "xht"
    ]
  },
  "application/xhtml-voice+xml": {
    source: "apache",
    compressible: !0
  },
  "application/xliff+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xlf"
    ]
  },
  "application/xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xml",
      "xsl",
      "xsd",
      "rng"
    ]
  },
  "application/xml-dtd": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dtd"
    ]
  },
  "application/xml-external-parsed-entity": {
    source: "iana"
  },
  "application/xml-patch+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xmpp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xop+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xop"
    ]
  },
  "application/xproc+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xpl"
    ]
  },
  "application/xslt+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xsl",
      "xslt"
    ]
  },
  "application/xspf+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xspf"
    ]
  },
  "application/xv+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mxml",
      "xhvml",
      "xvml",
      "xvm"
    ]
  },
  "application/yang": {
    source: "iana",
    extensions: [
      "yang"
    ]
  },
  "application/yang-data+json": {
    source: "iana",
    compressible: !0
  },
  "application/yang-data+xml": {
    source: "iana",
    compressible: !0
  },
  "application/yang-patch+json": {
    source: "iana",
    compressible: !0
  },
  "application/yang-patch+xml": {
    source: "iana",
    compressible: !0
  },
  "application/yin+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "yin"
    ]
  },
  "application/zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "zip"
    ]
  },
  "application/zlib": {
    source: "iana"
  },
  "application/zstd": {
    source: "iana"
  },
  "audio/1d-interleaved-parityfec": {
    source: "iana"
  },
  "audio/32kadpcm": {
    source: "iana"
  },
  "audio/3gpp": {
    source: "iana",
    compressible: !1,
    extensions: [
      "3gpp"
    ]
  },
  "audio/3gpp2": {
    source: "iana"
  },
  "audio/aac": {
    source: "iana"
  },
  "audio/ac3": {
    source: "iana"
  },
  "audio/adpcm": {
    source: "apache",
    extensions: [
      "adp"
    ]
  },
  "audio/amr": {
    source: "iana",
    extensions: [
      "amr"
    ]
  },
  "audio/amr-wb": {
    source: "iana"
  },
  "audio/amr-wb+": {
    source: "iana"
  },
  "audio/aptx": {
    source: "iana"
  },
  "audio/asc": {
    source: "iana"
  },
  "audio/atrac-advanced-lossless": {
    source: "iana"
  },
  "audio/atrac-x": {
    source: "iana"
  },
  "audio/atrac3": {
    source: "iana"
  },
  "audio/basic": {
    source: "iana",
    compressible: !1,
    extensions: [
      "au",
      "snd"
    ]
  },
  "audio/bv16": {
    source: "iana"
  },
  "audio/bv32": {
    source: "iana"
  },
  "audio/clearmode": {
    source: "iana"
  },
  "audio/cn": {
    source: "iana"
  },
  "audio/dat12": {
    source: "iana"
  },
  "audio/dls": {
    source: "iana"
  },
  "audio/dsr-es201108": {
    source: "iana"
  },
  "audio/dsr-es202050": {
    source: "iana"
  },
  "audio/dsr-es202211": {
    source: "iana"
  },
  "audio/dsr-es202212": {
    source: "iana"
  },
  "audio/dv": {
    source: "iana"
  },
  "audio/dvi4": {
    source: "iana"
  },
  "audio/eac3": {
    source: "iana"
  },
  "audio/encaprtp": {
    source: "iana"
  },
  "audio/evrc": {
    source: "iana"
  },
  "audio/evrc-qcp": {
    source: "iana"
  },
  "audio/evrc0": {
    source: "iana"
  },
  "audio/evrc1": {
    source: "iana"
  },
  "audio/evrcb": {
    source: "iana"
  },
  "audio/evrcb0": {
    source: "iana"
  },
  "audio/evrcb1": {
    source: "iana"
  },
  "audio/evrcnw": {
    source: "iana"
  },
  "audio/evrcnw0": {
    source: "iana"
  },
  "audio/evrcnw1": {
    source: "iana"
  },
  "audio/evrcwb": {
    source: "iana"
  },
  "audio/evrcwb0": {
    source: "iana"
  },
  "audio/evrcwb1": {
    source: "iana"
  },
  "audio/evs": {
    source: "iana"
  },
  "audio/flexfec": {
    source: "iana"
  },
  "audio/fwdred": {
    source: "iana"
  },
  "audio/g711-0": {
    source: "iana"
  },
  "audio/g719": {
    source: "iana"
  },
  "audio/g722": {
    source: "iana"
  },
  "audio/g7221": {
    source: "iana"
  },
  "audio/g723": {
    source: "iana"
  },
  "audio/g726-16": {
    source: "iana"
  },
  "audio/g726-24": {
    source: "iana"
  },
  "audio/g726-32": {
    source: "iana"
  },
  "audio/g726-40": {
    source: "iana"
  },
  "audio/g728": {
    source: "iana"
  },
  "audio/g729": {
    source: "iana"
  },
  "audio/g7291": {
    source: "iana"
  },
  "audio/g729d": {
    source: "iana"
  },
  "audio/g729e": {
    source: "iana"
  },
  "audio/gsm": {
    source: "iana"
  },
  "audio/gsm-efr": {
    source: "iana"
  },
  "audio/gsm-hr-08": {
    source: "iana"
  },
  "audio/ilbc": {
    source: "iana"
  },
  "audio/ip-mr_v2.5": {
    source: "iana"
  },
  "audio/isac": {
    source: "apache"
  },
  "audio/l16": {
    source: "iana"
  },
  "audio/l20": {
    source: "iana"
  },
  "audio/l24": {
    source: "iana",
    compressible: !1
  },
  "audio/l8": {
    source: "iana"
  },
  "audio/lpc": {
    source: "iana"
  },
  "audio/melp": {
    source: "iana"
  },
  "audio/melp1200": {
    source: "iana"
  },
  "audio/melp2400": {
    source: "iana"
  },
  "audio/melp600": {
    source: "iana"
  },
  "audio/mhas": {
    source: "iana"
  },
  "audio/midi": {
    source: "apache",
    extensions: [
      "mid",
      "midi",
      "kar",
      "rmi"
    ]
  },
  "audio/mobile-xmf": {
    source: "iana",
    extensions: [
      "mxmf"
    ]
  },
  "audio/mp3": {
    compressible: !1,
    extensions: [
      "mp3"
    ]
  },
  "audio/mp4": {
    source: "iana",
    compressible: !1,
    extensions: [
      "m4a",
      "mp4a"
    ]
  },
  "audio/mp4a-latm": {
    source: "iana"
  },
  "audio/mpa": {
    source: "iana"
  },
  "audio/mpa-robust": {
    source: "iana"
  },
  "audio/mpeg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "mpga",
      "mp2",
      "mp2a",
      "mp3",
      "m2a",
      "m3a"
    ]
  },
  "audio/mpeg4-generic": {
    source: "iana"
  },
  "audio/musepack": {
    source: "apache"
  },
  "audio/ogg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "oga",
      "ogg",
      "spx",
      "opus"
    ]
  },
  "audio/opus": {
    source: "iana"
  },
  "audio/parityfec": {
    source: "iana"
  },
  "audio/pcma": {
    source: "iana"
  },
  "audio/pcma-wb": {
    source: "iana"
  },
  "audio/pcmu": {
    source: "iana"
  },
  "audio/pcmu-wb": {
    source: "iana"
  },
  "audio/prs.sid": {
    source: "iana"
  },
  "audio/qcelp": {
    source: "iana"
  },
  "audio/raptorfec": {
    source: "iana"
  },
  "audio/red": {
    source: "iana"
  },
  "audio/rtp-enc-aescm128": {
    source: "iana"
  },
  "audio/rtp-midi": {
    source: "iana"
  },
  "audio/rtploopback": {
    source: "iana"
  },
  "audio/rtx": {
    source: "iana"
  },
  "audio/s3m": {
    source: "apache",
    extensions: [
      "s3m"
    ]
  },
  "audio/scip": {
    source: "iana"
  },
  "audio/silk": {
    source: "apache",
    extensions: [
      "sil"
    ]
  },
  "audio/smv": {
    source: "iana"
  },
  "audio/smv-qcp": {
    source: "iana"
  },
  "audio/smv0": {
    source: "iana"
  },
  "audio/sofa": {
    source: "iana"
  },
  "audio/sp-midi": {
    source: "iana"
  },
  "audio/speex": {
    source: "iana"
  },
  "audio/t140c": {
    source: "iana"
  },
  "audio/t38": {
    source: "iana"
  },
  "audio/telephone-event": {
    source: "iana"
  },
  "audio/tetra_acelp": {
    source: "iana"
  },
  "audio/tetra_acelp_bb": {
    source: "iana"
  },
  "audio/tone": {
    source: "iana"
  },
  "audio/tsvcis": {
    source: "iana"
  },
  "audio/uemclip": {
    source: "iana"
  },
  "audio/ulpfec": {
    source: "iana"
  },
  "audio/usac": {
    source: "iana"
  },
  "audio/vdvi": {
    source: "iana"
  },
  "audio/vmr-wb": {
    source: "iana"
  },
  "audio/vnd.3gpp.iufp": {
    source: "iana"
  },
  "audio/vnd.4sb": {
    source: "iana"
  },
  "audio/vnd.audiokoz": {
    source: "iana"
  },
  "audio/vnd.celp": {
    source: "iana"
  },
  "audio/vnd.cisco.nse": {
    source: "iana"
  },
  "audio/vnd.cmles.radio-events": {
    source: "iana"
  },
  "audio/vnd.cns.anp1": {
    source: "iana"
  },
  "audio/vnd.cns.inf1": {
    source: "iana"
  },
  "audio/vnd.dece.audio": {
    source: "iana",
    extensions: [
      "uva",
      "uvva"
    ]
  },
  "audio/vnd.digital-winds": {
    source: "iana",
    extensions: [
      "eol"
    ]
  },
  "audio/vnd.dlna.adts": {
    source: "iana"
  },
  "audio/vnd.dolby.heaac.1": {
    source: "iana"
  },
  "audio/vnd.dolby.heaac.2": {
    source: "iana"
  },
  "audio/vnd.dolby.mlp": {
    source: "iana"
  },
  "audio/vnd.dolby.mps": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2x": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2z": {
    source: "iana"
  },
  "audio/vnd.dolby.pulse.1": {
    source: "iana"
  },
  "audio/vnd.dra": {
    source: "iana",
    extensions: [
      "dra"
    ]
  },
  "audio/vnd.dts": {
    source: "iana",
    extensions: [
      "dts"
    ]
  },
  "audio/vnd.dts.hd": {
    source: "iana",
    extensions: [
      "dtshd"
    ]
  },
  "audio/vnd.dts.uhd": {
    source: "iana"
  },
  "audio/vnd.dvb.file": {
    source: "iana"
  },
  "audio/vnd.everad.plj": {
    source: "iana"
  },
  "audio/vnd.hns.audio": {
    source: "iana"
  },
  "audio/vnd.lucent.voice": {
    source: "iana",
    extensions: [
      "lvp"
    ]
  },
  "audio/vnd.ms-playready.media.pya": {
    source: "iana",
    extensions: [
      "pya"
    ]
  },
  "audio/vnd.nokia.mobile-xmf": {
    source: "iana"
  },
  "audio/vnd.nortel.vbk": {
    source: "iana"
  },
  "audio/vnd.nuera.ecelp4800": {
    source: "iana",
    extensions: [
      "ecelp4800"
    ]
  },
  "audio/vnd.nuera.ecelp7470": {
    source: "iana",
    extensions: [
      "ecelp7470"
    ]
  },
  "audio/vnd.nuera.ecelp9600": {
    source: "iana",
    extensions: [
      "ecelp9600"
    ]
  },
  "audio/vnd.octel.sbc": {
    source: "iana"
  },
  "audio/vnd.presonus.multitrack": {
    source: "iana"
  },
  "audio/vnd.qcelp": {
    source: "iana"
  },
  "audio/vnd.rhetorex.32kadpcm": {
    source: "iana"
  },
  "audio/vnd.rip": {
    source: "iana",
    extensions: [
      "rip"
    ]
  },
  "audio/vnd.rn-realaudio": {
    compressible: !1
  },
  "audio/vnd.sealedmedia.softseal.mpeg": {
    source: "iana"
  },
  "audio/vnd.vmx.cvsd": {
    source: "iana"
  },
  "audio/vnd.wave": {
    compressible: !1
  },
  "audio/vorbis": {
    source: "iana",
    compressible: !1
  },
  "audio/vorbis-config": {
    source: "iana"
  },
  "audio/wav": {
    compressible: !1,
    extensions: [
      "wav"
    ]
  },
  "audio/wave": {
    compressible: !1,
    extensions: [
      "wav"
    ]
  },
  "audio/webm": {
    source: "apache",
    compressible: !1,
    extensions: [
      "weba"
    ]
  },
  "audio/x-aac": {
    source: "apache",
    compressible: !1,
    extensions: [
      "aac"
    ]
  },
  "audio/x-aiff": {
    source: "apache",
    extensions: [
      "aif",
      "aiff",
      "aifc"
    ]
  },
  "audio/x-caf": {
    source: "apache",
    compressible: !1,
    extensions: [
      "caf"
    ]
  },
  "audio/x-flac": {
    source: "apache",
    extensions: [
      "flac"
    ]
  },
  "audio/x-m4a": {
    source: "nginx",
    extensions: [
      "m4a"
    ]
  },
  "audio/x-matroska": {
    source: "apache",
    extensions: [
      "mka"
    ]
  },
  "audio/x-mpegurl": {
    source: "apache",
    extensions: [
      "m3u"
    ]
  },
  "audio/x-ms-wax": {
    source: "apache",
    extensions: [
      "wax"
    ]
  },
  "audio/x-ms-wma": {
    source: "apache",
    extensions: [
      "wma"
    ]
  },
  "audio/x-pn-realaudio": {
    source: "apache",
    extensions: [
      "ram",
      "ra"
    ]
  },
  "audio/x-pn-realaudio-plugin": {
    source: "apache",
    extensions: [
      "rmp"
    ]
  },
  "audio/x-realaudio": {
    source: "nginx",
    extensions: [
      "ra"
    ]
  },
  "audio/x-tta": {
    source: "apache"
  },
  "audio/x-wav": {
    source: "apache",
    extensions: [
      "wav"
    ]
  },
  "audio/xm": {
    source: "apache",
    extensions: [
      "xm"
    ]
  },
  "chemical/x-cdx": {
    source: "apache",
    extensions: [
      "cdx"
    ]
  },
  "chemical/x-cif": {
    source: "apache",
    extensions: [
      "cif"
    ]
  },
  "chemical/x-cmdf": {
    source: "apache",
    extensions: [
      "cmdf"
    ]
  },
  "chemical/x-cml": {
    source: "apache",
    extensions: [
      "cml"
    ]
  },
  "chemical/x-csml": {
    source: "apache",
    extensions: [
      "csml"
    ]
  },
  "chemical/x-pdb": {
    source: "apache"
  },
  "chemical/x-xyz": {
    source: "apache",
    extensions: [
      "xyz"
    ]
  },
  "font/collection": {
    source: "iana",
    extensions: [
      "ttc"
    ]
  },
  "font/otf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "otf"
    ]
  },
  "font/sfnt": {
    source: "iana"
  },
  "font/ttf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ttf"
    ]
  },
  "font/woff": {
    source: "iana",
    extensions: [
      "woff"
    ]
  },
  "font/woff2": {
    source: "iana",
    extensions: [
      "woff2"
    ]
  },
  "image/aces": {
    source: "iana",
    extensions: [
      "exr"
    ]
  },
  "image/apng": {
    compressible: !1,
    extensions: [
      "apng"
    ]
  },
  "image/avci": {
    source: "iana",
    extensions: [
      "avci"
    ]
  },
  "image/avcs": {
    source: "iana",
    extensions: [
      "avcs"
    ]
  },
  "image/avif": {
    source: "iana",
    compressible: !1,
    extensions: [
      "avif"
    ]
  },
  "image/bmp": {
    source: "iana",
    compressible: !0,
    extensions: [
      "bmp"
    ]
  },
  "image/cgm": {
    source: "iana",
    extensions: [
      "cgm"
    ]
  },
  "image/dicom-rle": {
    source: "iana",
    extensions: [
      "drle"
    ]
  },
  "image/emf": {
    source: "iana",
    extensions: [
      "emf"
    ]
  },
  "image/fits": {
    source: "iana",
    extensions: [
      "fits"
    ]
  },
  "image/g3fax": {
    source: "iana",
    extensions: [
      "g3"
    ]
  },
  "image/gif": {
    source: "iana",
    compressible: !1,
    extensions: [
      "gif"
    ]
  },
  "image/heic": {
    source: "iana",
    extensions: [
      "heic"
    ]
  },
  "image/heic-sequence": {
    source: "iana",
    extensions: [
      "heics"
    ]
  },
  "image/heif": {
    source: "iana",
    extensions: [
      "heif"
    ]
  },
  "image/heif-sequence": {
    source: "iana",
    extensions: [
      "heifs"
    ]
  },
  "image/hej2k": {
    source: "iana",
    extensions: [
      "hej2"
    ]
  },
  "image/hsj2": {
    source: "iana",
    extensions: [
      "hsj2"
    ]
  },
  "image/ief": {
    source: "iana",
    extensions: [
      "ief"
    ]
  },
  "image/jls": {
    source: "iana",
    extensions: [
      "jls"
    ]
  },
  "image/jp2": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jp2",
      "jpg2"
    ]
  },
  "image/jpeg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jpeg",
      "jpg",
      "jpe"
    ]
  },
  "image/jph": {
    source: "iana",
    extensions: [
      "jph"
    ]
  },
  "image/jphc": {
    source: "iana",
    extensions: [
      "jhc"
    ]
  },
  "image/jpm": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jpm"
    ]
  },
  "image/jpx": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jpx",
      "jpf"
    ]
  },
  "image/jxr": {
    source: "iana",
    extensions: [
      "jxr"
    ]
  },
  "image/jxra": {
    source: "iana",
    extensions: [
      "jxra"
    ]
  },
  "image/jxrs": {
    source: "iana",
    extensions: [
      "jxrs"
    ]
  },
  "image/jxs": {
    source: "iana",
    extensions: [
      "jxs"
    ]
  },
  "image/jxsc": {
    source: "iana",
    extensions: [
      "jxsc"
    ]
  },
  "image/jxsi": {
    source: "iana",
    extensions: [
      "jxsi"
    ]
  },
  "image/jxss": {
    source: "iana",
    extensions: [
      "jxss"
    ]
  },
  "image/ktx": {
    source: "iana",
    extensions: [
      "ktx"
    ]
  },
  "image/ktx2": {
    source: "iana",
    extensions: [
      "ktx2"
    ]
  },
  "image/naplps": {
    source: "iana"
  },
  "image/pjpeg": {
    compressible: !1
  },
  "image/png": {
    source: "iana",
    compressible: !1,
    extensions: [
      "png"
    ]
  },
  "image/prs.btif": {
    source: "iana",
    extensions: [
      "btif"
    ]
  },
  "image/prs.pti": {
    source: "iana",
    extensions: [
      "pti"
    ]
  },
  "image/pwg-raster": {
    source: "iana"
  },
  "image/sgi": {
    source: "apache",
    extensions: [
      "sgi"
    ]
  },
  "image/svg+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "svg",
      "svgz"
    ]
  },
  "image/t38": {
    source: "iana",
    extensions: [
      "t38"
    ]
  },
  "image/tiff": {
    source: "iana",
    compressible: !1,
    extensions: [
      "tif",
      "tiff"
    ]
  },
  "image/tiff-fx": {
    source: "iana",
    extensions: [
      "tfx"
    ]
  },
  "image/vnd.adobe.photoshop": {
    source: "iana",
    compressible: !0,
    extensions: [
      "psd"
    ]
  },
  "image/vnd.airzip.accelerator.azv": {
    source: "iana",
    extensions: [
      "azv"
    ]
  },
  "image/vnd.cns.inf2": {
    source: "iana"
  },
  "image/vnd.dece.graphic": {
    source: "iana",
    extensions: [
      "uvi",
      "uvvi",
      "uvg",
      "uvvg"
    ]
  },
  "image/vnd.djvu": {
    source: "iana",
    extensions: [
      "djvu",
      "djv"
    ]
  },
  "image/vnd.dvb.subtitle": {
    source: "iana",
    extensions: [
      "sub"
    ]
  },
  "image/vnd.dwg": {
    source: "iana",
    extensions: [
      "dwg"
    ]
  },
  "image/vnd.dxf": {
    source: "iana",
    extensions: [
      "dxf"
    ]
  },
  "image/vnd.fastbidsheet": {
    source: "iana",
    extensions: [
      "fbs"
    ]
  },
  "image/vnd.fpx": {
    source: "iana",
    extensions: [
      "fpx"
    ]
  },
  "image/vnd.fst": {
    source: "iana",
    extensions: [
      "fst"
    ]
  },
  "image/vnd.fujixerox.edmics-mmr": {
    source: "iana",
    extensions: [
      "mmr"
    ]
  },
  "image/vnd.fujixerox.edmics-rlc": {
    source: "iana",
    extensions: [
      "rlc"
    ]
  },
  "image/vnd.globalgraphics.pgb": {
    source: "iana"
  },
  "image/vnd.microsoft.icon": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ico"
    ]
  },
  "image/vnd.mix": {
    source: "iana"
  },
  "image/vnd.mozilla.apng": {
    source: "iana"
  },
  "image/vnd.ms-dds": {
    compressible: !0,
    extensions: [
      "dds"
    ]
  },
  "image/vnd.ms-modi": {
    source: "iana",
    extensions: [
      "mdi"
    ]
  },
  "image/vnd.ms-photo": {
    source: "apache",
    extensions: [
      "wdp"
    ]
  },
  "image/vnd.net-fpx": {
    source: "iana",
    extensions: [
      "npx"
    ]
  },
  "image/vnd.pco.b16": {
    source: "iana",
    extensions: [
      "b16"
    ]
  },
  "image/vnd.radiance": {
    source: "iana"
  },
  "image/vnd.sealed.png": {
    source: "iana"
  },
  "image/vnd.sealedmedia.softseal.gif": {
    source: "iana"
  },
  "image/vnd.sealedmedia.softseal.jpg": {
    source: "iana"
  },
  "image/vnd.svf": {
    source: "iana"
  },
  "image/vnd.tencent.tap": {
    source: "iana",
    extensions: [
      "tap"
    ]
  },
  "image/vnd.valve.source.texture": {
    source: "iana",
    extensions: [
      "vtf"
    ]
  },
  "image/vnd.wap.wbmp": {
    source: "iana",
    extensions: [
      "wbmp"
    ]
  },
  "image/vnd.xiff": {
    source: "iana",
    extensions: [
      "xif"
    ]
  },
  "image/vnd.zbrush.pcx": {
    source: "iana",
    extensions: [
      "pcx"
    ]
  },
  "image/webp": {
    source: "apache",
    extensions: [
      "webp"
    ]
  },
  "image/wmf": {
    source: "iana",
    extensions: [
      "wmf"
    ]
  },
  "image/x-3ds": {
    source: "apache",
    extensions: [
      "3ds"
    ]
  },
  "image/x-cmu-raster": {
    source: "apache",
    extensions: [
      "ras"
    ]
  },
  "image/x-cmx": {
    source: "apache",
    extensions: [
      "cmx"
    ]
  },
  "image/x-freehand": {
    source: "apache",
    extensions: [
      "fh",
      "fhc",
      "fh4",
      "fh5",
      "fh7"
    ]
  },
  "image/x-icon": {
    source: "apache",
    compressible: !0,
    extensions: [
      "ico"
    ]
  },
  "image/x-jng": {
    source: "nginx",
    extensions: [
      "jng"
    ]
  },
  "image/x-mrsid-image": {
    source: "apache",
    extensions: [
      "sid"
    ]
  },
  "image/x-ms-bmp": {
    source: "nginx",
    compressible: !0,
    extensions: [
      "bmp"
    ]
  },
  "image/x-pcx": {
    source: "apache",
    extensions: [
      "pcx"
    ]
  },
  "image/x-pict": {
    source: "apache",
    extensions: [
      "pic",
      "pct"
    ]
  },
  "image/x-portable-anymap": {
    source: "apache",
    extensions: [
      "pnm"
    ]
  },
  "image/x-portable-bitmap": {
    source: "apache",
    extensions: [
      "pbm"
    ]
  },
  "image/x-portable-graymap": {
    source: "apache",
    extensions: [
      "pgm"
    ]
  },
  "image/x-portable-pixmap": {
    source: "apache",
    extensions: [
      "ppm"
    ]
  },
  "image/x-rgb": {
    source: "apache",
    extensions: [
      "rgb"
    ]
  },
  "image/x-tga": {
    source: "apache",
    extensions: [
      "tga"
    ]
  },
  "image/x-xbitmap": {
    source: "apache",
    extensions: [
      "xbm"
    ]
  },
  "image/x-xcf": {
    compressible: !1
  },
  "image/x-xpixmap": {
    source: "apache",
    extensions: [
      "xpm"
    ]
  },
  "image/x-xwindowdump": {
    source: "apache",
    extensions: [
      "xwd"
    ]
  },
  "message/cpim": {
    source: "iana"
  },
  "message/delivery-status": {
    source: "iana"
  },
  "message/disposition-notification": {
    source: "iana",
    extensions: [
      "disposition-notification"
    ]
  },
  "message/external-body": {
    source: "iana"
  },
  "message/feedback-report": {
    source: "iana"
  },
  "message/global": {
    source: "iana",
    extensions: [
      "u8msg"
    ]
  },
  "message/global-delivery-status": {
    source: "iana",
    extensions: [
      "u8dsn"
    ]
  },
  "message/global-disposition-notification": {
    source: "iana",
    extensions: [
      "u8mdn"
    ]
  },
  "message/global-headers": {
    source: "iana",
    extensions: [
      "u8hdr"
    ]
  },
  "message/http": {
    source: "iana",
    compressible: !1
  },
  "message/imdn+xml": {
    source: "iana",
    compressible: !0
  },
  "message/news": {
    source: "iana"
  },
  "message/partial": {
    source: "iana",
    compressible: !1
  },
  "message/rfc822": {
    source: "iana",
    compressible: !0,
    extensions: [
      "eml",
      "mime"
    ]
  },
  "message/s-http": {
    source: "iana"
  },
  "message/sip": {
    source: "iana"
  },
  "message/sipfrag": {
    source: "iana"
  },
  "message/tracking-status": {
    source: "iana"
  },
  "message/vnd.si.simp": {
    source: "iana"
  },
  "message/vnd.wfa.wsc": {
    source: "iana",
    extensions: [
      "wsc"
    ]
  },
  "model/3mf": {
    source: "iana",
    extensions: [
      "3mf"
    ]
  },
  "model/e57": {
    source: "iana"
  },
  "model/gltf+json": {
    source: "iana",
    compressible: !0,
    extensions: [
      "gltf"
    ]
  },
  "model/gltf-binary": {
    source: "iana",
    compressible: !0,
    extensions: [
      "glb"
    ]
  },
  "model/iges": {
    source: "iana",
    compressible: !1,
    extensions: [
      "igs",
      "iges"
    ]
  },
  "model/mesh": {
    source: "iana",
    compressible: !1,
    extensions: [
      "msh",
      "mesh",
      "silo"
    ]
  },
  "model/mtl": {
    source: "iana",
    extensions: [
      "mtl"
    ]
  },
  "model/obj": {
    source: "iana",
    extensions: [
      "obj"
    ]
  },
  "model/step": {
    source: "iana"
  },
  "model/step+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "stpx"
    ]
  },
  "model/step+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "stpz"
    ]
  },
  "model/step-xml+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "stpxz"
    ]
  },
  "model/stl": {
    source: "iana",
    extensions: [
      "stl"
    ]
  },
  "model/vnd.collada+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dae"
    ]
  },
  "model/vnd.dwf": {
    source: "iana",
    extensions: [
      "dwf"
    ]
  },
  "model/vnd.flatland.3dml": {
    source: "iana"
  },
  "model/vnd.gdl": {
    source: "iana",
    extensions: [
      "gdl"
    ]
  },
  "model/vnd.gs-gdl": {
    source: "apache"
  },
  "model/vnd.gs.gdl": {
    source: "iana"
  },
  "model/vnd.gtw": {
    source: "iana",
    extensions: [
      "gtw"
    ]
  },
  "model/vnd.moml+xml": {
    source: "iana",
    compressible: !0
  },
  "model/vnd.mts": {
    source: "iana",
    extensions: [
      "mts"
    ]
  },
  "model/vnd.opengex": {
    source: "iana",
    extensions: [
      "ogex"
    ]
  },
  "model/vnd.parasolid.transmit.binary": {
    source: "iana",
    extensions: [
      "x_b"
    ]
  },
  "model/vnd.parasolid.transmit.text": {
    source: "iana",
    extensions: [
      "x_t"
    ]
  },
  "model/vnd.pytha.pyox": {
    source: "iana"
  },
  "model/vnd.rosette.annotated-data-model": {
    source: "iana"
  },
  "model/vnd.sap.vds": {
    source: "iana",
    extensions: [
      "vds"
    ]
  },
  "model/vnd.usdz+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "usdz"
    ]
  },
  "model/vnd.valve.source.compiled-map": {
    source: "iana",
    extensions: [
      "bsp"
    ]
  },
  "model/vnd.vtu": {
    source: "iana",
    extensions: [
      "vtu"
    ]
  },
  "model/vrml": {
    source: "iana",
    compressible: !1,
    extensions: [
      "wrl",
      "vrml"
    ]
  },
  "model/x3d+binary": {
    source: "apache",
    compressible: !1,
    extensions: [
      "x3db",
      "x3dbz"
    ]
  },
  "model/x3d+fastinfoset": {
    source: "iana",
    extensions: [
      "x3db"
    ]
  },
  "model/x3d+vrml": {
    source: "apache",
    compressible: !1,
    extensions: [
      "x3dv",
      "x3dvz"
    ]
  },
  "model/x3d+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "x3d",
      "x3dz"
    ]
  },
  "model/x3d-vrml": {
    source: "iana",
    extensions: [
      "x3dv"
    ]
  },
  "multipart/alternative": {
    source: "iana",
    compressible: !1
  },
  "multipart/appledouble": {
    source: "iana"
  },
  "multipart/byteranges": {
    source: "iana"
  },
  "multipart/digest": {
    source: "iana"
  },
  "multipart/encrypted": {
    source: "iana",
    compressible: !1
  },
  "multipart/form-data": {
    source: "iana",
    compressible: !1
  },
  "multipart/header-set": {
    source: "iana"
  },
  "multipart/mixed": {
    source: "iana"
  },
  "multipart/multilingual": {
    source: "iana"
  },
  "multipart/parallel": {
    source: "iana"
  },
  "multipart/related": {
    source: "iana",
    compressible: !1
  },
  "multipart/report": {
    source: "iana"
  },
  "multipart/signed": {
    source: "iana",
    compressible: !1
  },
  "multipart/vnd.bint.med-plus": {
    source: "iana"
  },
  "multipart/voice-message": {
    source: "iana"
  },
  "multipart/x-mixed-replace": {
    source: "iana"
  },
  "text/1d-interleaved-parityfec": {
    source: "iana"
  },
  "text/cache-manifest": {
    source: "iana",
    compressible: !0,
    extensions: [
      "appcache",
      "manifest"
    ]
  },
  "text/calendar": {
    source: "iana",
    extensions: [
      "ics",
      "ifb"
    ]
  },
  "text/calender": {
    compressible: !0
  },
  "text/cmd": {
    compressible: !0
  },
  "text/coffeescript": {
    extensions: [
      "coffee",
      "litcoffee"
    ]
  },
  "text/cql": {
    source: "iana"
  },
  "text/cql-expression": {
    source: "iana"
  },
  "text/cql-identifier": {
    source: "iana"
  },
  "text/css": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "css"
    ]
  },
  "text/csv": {
    source: "iana",
    compressible: !0,
    extensions: [
      "csv"
    ]
  },
  "text/csv-schema": {
    source: "iana"
  },
  "text/directory": {
    source: "iana"
  },
  "text/dns": {
    source: "iana"
  },
  "text/ecmascript": {
    source: "iana"
  },
  "text/encaprtp": {
    source: "iana"
  },
  "text/enriched": {
    source: "iana"
  },
  "text/fhirpath": {
    source: "iana"
  },
  "text/flexfec": {
    source: "iana"
  },
  "text/fwdred": {
    source: "iana"
  },
  "text/gff3": {
    source: "iana"
  },
  "text/grammar-ref-list": {
    source: "iana"
  },
  "text/html": {
    source: "iana",
    compressible: !0,
    extensions: [
      "html",
      "htm",
      "shtml"
    ]
  },
  "text/jade": {
    extensions: [
      "jade"
    ]
  },
  "text/javascript": {
    source: "iana",
    compressible: !0
  },
  "text/jcr-cnd": {
    source: "iana"
  },
  "text/jsx": {
    compressible: !0,
    extensions: [
      "jsx"
    ]
  },
  "text/less": {
    compressible: !0,
    extensions: [
      "less"
    ]
  },
  "text/markdown": {
    source: "iana",
    compressible: !0,
    extensions: [
      "markdown",
      "md"
    ]
  },
  "text/mathml": {
    source: "nginx",
    extensions: [
      "mml"
    ]
  },
  "text/mdx": {
    compressible: !0,
    extensions: [
      "mdx"
    ]
  },
  "text/mizar": {
    source: "iana"
  },
  "text/n3": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "n3"
    ]
  },
  "text/parameters": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/parityfec": {
    source: "iana"
  },
  "text/plain": {
    source: "iana",
    compressible: !0,
    extensions: [
      "txt",
      "text",
      "conf",
      "def",
      "list",
      "log",
      "in",
      "ini"
    ]
  },
  "text/provenance-notation": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/prs.fallenstein.rst": {
    source: "iana"
  },
  "text/prs.lines.tag": {
    source: "iana",
    extensions: [
      "dsc"
    ]
  },
  "text/prs.prop.logic": {
    source: "iana"
  },
  "text/raptorfec": {
    source: "iana"
  },
  "text/red": {
    source: "iana"
  },
  "text/rfc822-headers": {
    source: "iana"
  },
  "text/richtext": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rtx"
    ]
  },
  "text/rtf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rtf"
    ]
  },
  "text/rtp-enc-aescm128": {
    source: "iana"
  },
  "text/rtploopback": {
    source: "iana"
  },
  "text/rtx": {
    source: "iana"
  },
  "text/sgml": {
    source: "iana",
    extensions: [
      "sgml",
      "sgm"
    ]
  },
  "text/shaclc": {
    source: "iana"
  },
  "text/shex": {
    source: "iana",
    extensions: [
      "shex"
    ]
  },
  "text/slim": {
    extensions: [
      "slim",
      "slm"
    ]
  },
  "text/spdx": {
    source: "iana",
    extensions: [
      "spdx"
    ]
  },
  "text/strings": {
    source: "iana"
  },
  "text/stylus": {
    extensions: [
      "stylus",
      "styl"
    ]
  },
  "text/t140": {
    source: "iana"
  },
  "text/tab-separated-values": {
    source: "iana",
    compressible: !0,
    extensions: [
      "tsv"
    ]
  },
  "text/troff": {
    source: "iana",
    extensions: [
      "t",
      "tr",
      "roff",
      "man",
      "me",
      "ms"
    ]
  },
  "text/turtle": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "ttl"
    ]
  },
  "text/ulpfec": {
    source: "iana"
  },
  "text/uri-list": {
    source: "iana",
    compressible: !0,
    extensions: [
      "uri",
      "uris",
      "urls"
    ]
  },
  "text/vcard": {
    source: "iana",
    compressible: !0,
    extensions: [
      "vcard"
    ]
  },
  "text/vnd.a": {
    source: "iana"
  },
  "text/vnd.abc": {
    source: "iana"
  },
  "text/vnd.ascii-art": {
    source: "iana"
  },
  "text/vnd.curl": {
    source: "iana",
    extensions: [
      "curl"
    ]
  },
  "text/vnd.curl.dcurl": {
    source: "apache",
    extensions: [
      "dcurl"
    ]
  },
  "text/vnd.curl.mcurl": {
    source: "apache",
    extensions: [
      "mcurl"
    ]
  },
  "text/vnd.curl.scurl": {
    source: "apache",
    extensions: [
      "scurl"
    ]
  },
  "text/vnd.debian.copyright": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.dmclientscript": {
    source: "iana"
  },
  "text/vnd.dvb.subtitle": {
    source: "iana",
    extensions: [
      "sub"
    ]
  },
  "text/vnd.esmertec.theme-descriptor": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.familysearch.gedcom": {
    source: "iana",
    extensions: [
      "ged"
    ]
  },
  "text/vnd.ficlab.flt": {
    source: "iana"
  },
  "text/vnd.fly": {
    source: "iana",
    extensions: [
      "fly"
    ]
  },
  "text/vnd.fmi.flexstor": {
    source: "iana",
    extensions: [
      "flx"
    ]
  },
  "text/vnd.gml": {
    source: "iana"
  },
  "text/vnd.graphviz": {
    source: "iana",
    extensions: [
      "gv"
    ]
  },
  "text/vnd.hans": {
    source: "iana"
  },
  "text/vnd.hgl": {
    source: "iana"
  },
  "text/vnd.in3d.3dml": {
    source: "iana",
    extensions: [
      "3dml"
    ]
  },
  "text/vnd.in3d.spot": {
    source: "iana",
    extensions: [
      "spot"
    ]
  },
  "text/vnd.iptc.newsml": {
    source: "iana"
  },
  "text/vnd.iptc.nitf": {
    source: "iana"
  },
  "text/vnd.latex-z": {
    source: "iana"
  },
  "text/vnd.motorola.reflex": {
    source: "iana"
  },
  "text/vnd.ms-mediapackage": {
    source: "iana"
  },
  "text/vnd.net2phone.commcenter.command": {
    source: "iana"
  },
  "text/vnd.radisys.msml-basic-layout": {
    source: "iana"
  },
  "text/vnd.senx.warpscript": {
    source: "iana"
  },
  "text/vnd.si.uricatalogue": {
    source: "iana"
  },
  "text/vnd.sosi": {
    source: "iana"
  },
  "text/vnd.sun.j2me.app-descriptor": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "jad"
    ]
  },
  "text/vnd.trolltech.linguist": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.wap.si": {
    source: "iana"
  },
  "text/vnd.wap.sl": {
    source: "iana"
  },
  "text/vnd.wap.wml": {
    source: "iana",
    extensions: [
      "wml"
    ]
  },
  "text/vnd.wap.wmlscript": {
    source: "iana",
    extensions: [
      "wmls"
    ]
  },
  "text/vtt": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "vtt"
    ]
  },
  "text/x-asm": {
    source: "apache",
    extensions: [
      "s",
      "asm"
    ]
  },
  "text/x-c": {
    source: "apache",
    extensions: [
      "c",
      "cc",
      "cxx",
      "cpp",
      "h",
      "hh",
      "dic"
    ]
  },
  "text/x-component": {
    source: "nginx",
    extensions: [
      "htc"
    ]
  },
  "text/x-fortran": {
    source: "apache",
    extensions: [
      "f",
      "for",
      "f77",
      "f90"
    ]
  },
  "text/x-gwt-rpc": {
    compressible: !0
  },
  "text/x-handlebars-template": {
    extensions: [
      "hbs"
    ]
  },
  "text/x-java-source": {
    source: "apache",
    extensions: [
      "java"
    ]
  },
  "text/x-jquery-tmpl": {
    compressible: !0
  },
  "text/x-lua": {
    extensions: [
      "lua"
    ]
  },
  "text/x-markdown": {
    compressible: !0,
    extensions: [
      "mkd"
    ]
  },
  "text/x-nfo": {
    source: "apache",
    extensions: [
      "nfo"
    ]
  },
  "text/x-opml": {
    source: "apache",
    extensions: [
      "opml"
    ]
  },
  "text/x-org": {
    compressible: !0,
    extensions: [
      "org"
    ]
  },
  "text/x-pascal": {
    source: "apache",
    extensions: [
      "p",
      "pas"
    ]
  },
  "text/x-processing": {
    compressible: !0,
    extensions: [
      "pde"
    ]
  },
  "text/x-sass": {
    extensions: [
      "sass"
    ]
  },
  "text/x-scss": {
    extensions: [
      "scss"
    ]
  },
  "text/x-setext": {
    source: "apache",
    extensions: [
      "etx"
    ]
  },
  "text/x-sfv": {
    source: "apache",
    extensions: [
      "sfv"
    ]
  },
  "text/x-suse-ymp": {
    compressible: !0,
    extensions: [
      "ymp"
    ]
  },
  "text/x-uuencode": {
    source: "apache",
    extensions: [
      "uu"
    ]
  },
  "text/x-vcalendar": {
    source: "apache",
    extensions: [
      "vcs"
    ]
  },
  "text/x-vcard": {
    source: "apache",
    extensions: [
      "vcf"
    ]
  },
  "text/xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xml"
    ]
  },
  "text/xml-external-parsed-entity": {
    source: "iana"
  },
  "text/yaml": {
    compressible: !0,
    extensions: [
      "yaml",
      "yml"
    ]
  },
  "video/1d-interleaved-parityfec": {
    source: "iana"
  },
  "video/3gpp": {
    source: "iana",
    extensions: [
      "3gp",
      "3gpp"
    ]
  },
  "video/3gpp-tt": {
    source: "iana"
  },
  "video/3gpp2": {
    source: "iana",
    extensions: [
      "3g2"
    ]
  },
  "video/av1": {
    source: "iana"
  },
  "video/bmpeg": {
    source: "iana"
  },
  "video/bt656": {
    source: "iana"
  },
  "video/celb": {
    source: "iana"
  },
  "video/dv": {
    source: "iana"
  },
  "video/encaprtp": {
    source: "iana"
  },
  "video/ffv1": {
    source: "iana"
  },
  "video/flexfec": {
    source: "iana"
  },
  "video/h261": {
    source: "iana",
    extensions: [
      "h261"
    ]
  },
  "video/h263": {
    source: "iana",
    extensions: [
      "h263"
    ]
  },
  "video/h263-1998": {
    source: "iana"
  },
  "video/h263-2000": {
    source: "iana"
  },
  "video/h264": {
    source: "iana",
    extensions: [
      "h264"
    ]
  },
  "video/h264-rcdo": {
    source: "iana"
  },
  "video/h264-svc": {
    source: "iana"
  },
  "video/h265": {
    source: "iana"
  },
  "video/iso.segment": {
    source: "iana",
    extensions: [
      "m4s"
    ]
  },
  "video/jpeg": {
    source: "iana",
    extensions: [
      "jpgv"
    ]
  },
  "video/jpeg2000": {
    source: "iana"
  },
  "video/jpm": {
    source: "apache",
    extensions: [
      "jpm",
      "jpgm"
    ]
  },
  "video/jxsv": {
    source: "iana"
  },
  "video/mj2": {
    source: "iana",
    extensions: [
      "mj2",
      "mjp2"
    ]
  },
  "video/mp1s": {
    source: "iana"
  },
  "video/mp2p": {
    source: "iana"
  },
  "video/mp2t": {
    source: "iana",
    extensions: [
      "ts"
    ]
  },
  "video/mp4": {
    source: "iana",
    compressible: !1,
    extensions: [
      "mp4",
      "mp4v",
      "mpg4"
    ]
  },
  "video/mp4v-es": {
    source: "iana"
  },
  "video/mpeg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "mpeg",
      "mpg",
      "mpe",
      "m1v",
      "m2v"
    ]
  },
  "video/mpeg4-generic": {
    source: "iana"
  },
  "video/mpv": {
    source: "iana"
  },
  "video/nv": {
    source: "iana"
  },
  "video/ogg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ogv"
    ]
  },
  "video/parityfec": {
    source: "iana"
  },
  "video/pointer": {
    source: "iana"
  },
  "video/quicktime": {
    source: "iana",
    compressible: !1,
    extensions: [
      "qt",
      "mov"
    ]
  },
  "video/raptorfec": {
    source: "iana"
  },
  "video/raw": {
    source: "iana"
  },
  "video/rtp-enc-aescm128": {
    source: "iana"
  },
  "video/rtploopback": {
    source: "iana"
  },
  "video/rtx": {
    source: "iana"
  },
  "video/scip": {
    source: "iana"
  },
  "video/smpte291": {
    source: "iana"
  },
  "video/smpte292m": {
    source: "iana"
  },
  "video/ulpfec": {
    source: "iana"
  },
  "video/vc1": {
    source: "iana"
  },
  "video/vc2": {
    source: "iana"
  },
  "video/vnd.cctv": {
    source: "iana"
  },
  "video/vnd.dece.hd": {
    source: "iana",
    extensions: [
      "uvh",
      "uvvh"
    ]
  },
  "video/vnd.dece.mobile": {
    source: "iana",
    extensions: [
      "uvm",
      "uvvm"
    ]
  },
  "video/vnd.dece.mp4": {
    source: "iana"
  },
  "video/vnd.dece.pd": {
    source: "iana",
    extensions: [
      "uvp",
      "uvvp"
    ]
  },
  "video/vnd.dece.sd": {
    source: "iana",
    extensions: [
      "uvs",
      "uvvs"
    ]
  },
  "video/vnd.dece.video": {
    source: "iana",
    extensions: [
      "uvv",
      "uvvv"
    ]
  },
  "video/vnd.directv.mpeg": {
    source: "iana"
  },
  "video/vnd.directv.mpeg-tts": {
    source: "iana"
  },
  "video/vnd.dlna.mpeg-tts": {
    source: "iana"
  },
  "video/vnd.dvb.file": {
    source: "iana",
    extensions: [
      "dvb"
    ]
  },
  "video/vnd.fvt": {
    source: "iana",
    extensions: [
      "fvt"
    ]
  },
  "video/vnd.hns.video": {
    source: "iana"
  },
  "video/vnd.iptvforum.1dparityfec-1010": {
    source: "iana"
  },
  "video/vnd.iptvforum.1dparityfec-2005": {
    source: "iana"
  },
  "video/vnd.iptvforum.2dparityfec-1010": {
    source: "iana"
  },
  "video/vnd.iptvforum.2dparityfec-2005": {
    source: "iana"
  },
  "video/vnd.iptvforum.ttsavc": {
    source: "iana"
  },
  "video/vnd.iptvforum.ttsmpeg2": {
    source: "iana"
  },
  "video/vnd.motorola.video": {
    source: "iana"
  },
  "video/vnd.motorola.videop": {
    source: "iana"
  },
  "video/vnd.mpegurl": {
    source: "iana",
    extensions: [
      "mxu",
      "m4u"
    ]
  },
  "video/vnd.ms-playready.media.pyv": {
    source: "iana",
    extensions: [
      "pyv"
    ]
  },
  "video/vnd.nokia.interleaved-multimedia": {
    source: "iana"
  },
  "video/vnd.nokia.mp4vr": {
    source: "iana"
  },
  "video/vnd.nokia.videovoip": {
    source: "iana"
  },
  "video/vnd.objectvideo": {
    source: "iana"
  },
  "video/vnd.radgamettools.bink": {
    source: "iana"
  },
  "video/vnd.radgamettools.smacker": {
    source: "iana"
  },
  "video/vnd.sealed.mpeg1": {
    source: "iana"
  },
  "video/vnd.sealed.mpeg4": {
    source: "iana"
  },
  "video/vnd.sealed.swf": {
    source: "iana"
  },
  "video/vnd.sealedmedia.softseal.mov": {
    source: "iana"
  },
  "video/vnd.uvvu.mp4": {
    source: "iana",
    extensions: [
      "uvu",
      "uvvu"
    ]
  },
  "video/vnd.vivo": {
    source: "iana",
    extensions: [
      "viv"
    ]
  },
  "video/vnd.youtube.yt": {
    source: "iana"
  },
  "video/vp8": {
    source: "iana"
  },
  "video/vp9": {
    source: "iana"
  },
  "video/webm": {
    source: "apache",
    compressible: !1,
    extensions: [
      "webm"
    ]
  },
  "video/x-f4v": {
    source: "apache",
    extensions: [
      "f4v"
    ]
  },
  "video/x-fli": {
    source: "apache",
    extensions: [
      "fli"
    ]
  },
  "video/x-flv": {
    source: "apache",
    compressible: !1,
    extensions: [
      "flv"
    ]
  },
  "video/x-m4v": {
    source: "apache",
    extensions: [
      "m4v"
    ]
  },
  "video/x-matroska": {
    source: "apache",
    compressible: !1,
    extensions: [
      "mkv",
      "mk3d",
      "mks"
    ]
  },
  "video/x-mng": {
    source: "apache",
    extensions: [
      "mng"
    ]
  },
  "video/x-ms-asf": {
    source: "apache",
    extensions: [
      "asf",
      "asx"
    ]
  },
  "video/x-ms-vob": {
    source: "apache",
    extensions: [
      "vob"
    ]
  },
  "video/x-ms-wm": {
    source: "apache",
    extensions: [
      "wm"
    ]
  },
  "video/x-ms-wmv": {
    source: "apache",
    compressible: !1,
    extensions: [
      "wmv"
    ]
  },
  "video/x-ms-wmx": {
    source: "apache",
    extensions: [
      "wmx"
    ]
  },
  "video/x-ms-wvx": {
    source: "apache",
    extensions: [
      "wvx"
    ]
  },
  "video/x-msvideo": {
    source: "apache",
    extensions: [
      "avi"
    ]
  },
  "video/x-sgi-movie": {
    source: "apache",
    extensions: [
      "movie"
    ]
  },
  "video/x-smv": {
    source: "apache",
    extensions: [
      "smv"
    ]
  },
  "x-conference/x-cooltalk": {
    source: "apache",
    extensions: [
      "ice"
    ]
  },
  "x-shader/x-fragment": {
    compressible: !0
  },
  "x-shader/x-vertex": {
    compressible: !0
  }
};
/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */
var rp = tp;
/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
(function(a) {
  var e = rp, n = ce.extname, i = /^\s*([^;\s]*)(?:;|\s|$)/, t = /^text\//i;
  a.charset = r, a.charsets = { lookup: r }, a.contentType = o, a.extension = s, a.extensions = /* @__PURE__ */ Object.create(null), a.lookup = c, a.types = /* @__PURE__ */ Object.create(null), u(a.extensions, a.types);
  function r(p) {
    if (!p || typeof p != "string")
      return !1;
    var f = i.exec(p), l = f && e[f[1].toLowerCase()];
    return l && l.charset ? l.charset : f && t.test(f[1]) ? "UTF-8" : !1;
  }
  function o(p) {
    if (!p || typeof p != "string")
      return !1;
    var f = p.indexOf("/") === -1 ? a.lookup(p) : p;
    if (!f)
      return !1;
    if (f.indexOf("charset") === -1) {
      var l = a.charset(f);
      l && (f += "; charset=" + l.toLowerCase());
    }
    return f;
  }
  function s(p) {
    if (!p || typeof p != "string")
      return !1;
    var f = i.exec(p), l = f && a.extensions[f[1].toLowerCase()];
    return !l || !l.length ? !1 : l[0];
  }
  function c(p) {
    if (!p || typeof p != "string")
      return !1;
    var f = n("x." + p).toLowerCase().substr(1);
    return f && a.types[f] || !1;
  }
  function u(p, f) {
    var l = ["nginx", "apache", void 0, "iana"];
    Object.keys(e).forEach(function(v) {
      var d = e[v], m = d.extensions;
      if (!(!m || !m.length)) {
        p[v] = m;
        for (var h = 0; h < m.length; h++) {
          var g = m[h];
          if (f[g]) {
            var b = l.indexOf(e[f[g]].source), y = l.indexOf(d.source);
            if (f[g] !== "application/octet-stream" && (b > y || b === y && f[g].substr(0, 12) === "application/"))
              continue;
          }
          f[g] = v;
        }
      }
    });
  }
})(ii);
/*!
 * type-is
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var ct = ni, op = ii;
Fe.exports = sp;
Fe.exports.is = $r;
Fe.exports.hasBody = Rr;
Fe.exports.normalize = Ir;
Fe.exports.match = qr;
function $r(a, e) {
  var n, i = e, t = pp(a);
  if (!t)
    return !1;
  if (i && !Array.isArray(i))
    for (i = new Array(arguments.length - 1), n = 0; n < i.length; n++)
      i[n] = arguments[n + 1];
  if (!i || !i.length)
    return t;
  var r;
  for (n = 0; n < i.length; n++)
    if (qr(Ir(r = i[n]), t))
      return r[0] === "+" || r.indexOf("*") !== -1 ? t : r;
  return !1;
}
function Rr(a) {
  return a.headers["transfer-encoding"] !== void 0 || !isNaN(a.headers["content-length"]);
}
function sp(a, e) {
  var n = e;
  if (!Rr(a))
    return null;
  if (arguments.length > 2) {
    n = new Array(arguments.length - 1);
    for (var i = 0; i < n.length; i++)
      n[i] = arguments[i + 1];
  }
  var t = a.headers["content-type"];
  return $r(t, n);
}
function Ir(a) {
  if (typeof a != "string")
    return !1;
  switch (a) {
    case "urlencoded":
      return "application/x-www-form-urlencoded";
    case "multipart":
      return "multipart/*";
  }
  return a[0] === "+" ? "*/*" + a : a.indexOf("/") === -1 ? op.lookup(a) : a;
}
function qr(a, e) {
  if (a === !1)
    return !1;
  var n = e.split("/"), i = a.split("/");
  return n.length !== 2 || i.length !== 2 || i[0] !== "*" && i[0] !== n[0] ? !1 : i[1].substr(0, 2) === "*+" ? i[1].length <= n[1].length + 1 && i[1].substr(1) === n[1].substr(1 - i[1].length) : !(i[1] !== "*" && i[1] !== n[1]);
}
function cp(a) {
  var e = ct.parse(a);
  return e.parameters = void 0, ct.format(e);
}
function pp(a) {
  if (!a)
    return null;
  try {
    return cp(a);
  } catch {
    return null;
  }
}
var Je = Fe.exports;
/*!
 * body-parser
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var mn, pt;
function lp() {
  if (pt) return mn;
  pt = 1;
  var a = Qe(), e = Re, n = Ie, i = Z("body-parser:json"), t = Da(), r = Je;
  mn = u;
  var o = /^[\x20\x09\x0a\x0d]*([^\x20\x09\x0a\x0d])/, s = "#", c = /#+/g;
  function u(d) {
    var m = d || {}, h = typeof m.limit != "number" ? a.parse(m.limit || "100kb") : m.limit, g = m.inflate !== !1, b = m.reviver, y = m.strict !== !1, w = m.type || "application/json", k = m.verify || !1;
    if (k !== !1 && typeof k != "function")
      throw new TypeError("option verify must be function");
    var A = typeof w != "function" ? v(w) : w;
    function _(E) {
      if (E.length === 0)
        return {};
      if (y) {
        var S = f(E);
        if (S !== "{" && S !== "[")
          throw i("strict violation"), p(E, S);
      }
      try {
        return i("parse json"), JSON.parse(E, b);
      } catch (j) {
        throw x(j, {
          message: j.message,
          stack: j.stack
        });
      }
    }
    return function(S, j, T) {
      if (S._body) {
        i("body already parsed"), T();
        return;
      }
      if (S.body = S.body || {}, !r.hasBody(S)) {
        i("skip empty body"), T();
        return;
      }
      if (i("content-type %j", S.headers["content-type"]), !A(S)) {
        i("skip parsing"), T();
        return;
      }
      var C = l(S) || "utf-8";
      if (C.slice(0, 4) !== "utf-") {
        i("invalid charset"), T(n(415, 'unsupported charset "' + C.toUpperCase() + '"', {
          charset: C,
          type: "charset.unsupported"
        }));
        return;
      }
      t(S, j, T, _, i, {
        encoding: C,
        inflate: g,
        limit: h,
        verify: k
      });
    };
  }
  function p(d, m) {
    var h = d.indexOf(m), g = "";
    if (h !== -1) {
      g = d.substring(0, h) + s;
      for (var b = h + 1; b < d.length; b++)
        g += s;
    }
    try {
      throw JSON.parse(g), new SyntaxError("strict violation");
    } catch (y) {
      return x(y, {
        message: y.message.replace(c, function(w) {
          return d.substring(h, h + w.length);
        }),
        stack: y.stack
      });
    }
  }
  function f(d) {
    var m = o.exec(d);
    return m ? m[1] : void 0;
  }
  function l(d) {
    try {
      return (e.parse(d).parameters.charset || "").toLowerCase();
    } catch {
      return;
    }
  }
  function x(d, m) {
    for (var h = Object.getOwnPropertyNames(d), g = 0; g < h.length; g++) {
      var b = h[g];
      b !== "stack" && b !== "message" && delete d[b];
    }
    return d.stack = m.stack.replace(d.message, m.message), d.message = m.message, d;
  }
  function v(d) {
    return function(h) {
      return !!r(h, d);
    };
  }
  return mn;
}
/*!
 * body-parser
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var vn, lt;
function up() {
  if (lt) return vn;
  lt = 1;
  var a = Qe(), e = Z("body-parser:raw"), n = Da(), i = Je;
  vn = t;
  function t(o) {
    var s = o || {}, c = s.inflate !== !1, u = typeof s.limit != "number" ? a.parse(s.limit || "100kb") : s.limit, p = s.type || "application/octet-stream", f = s.verify || !1;
    if (f !== !1 && typeof f != "function")
      throw new TypeError("option verify must be function");
    var l = typeof p != "function" ? r(p) : p;
    function x(v) {
      return v;
    }
    return function(d, m, h) {
      if (d._body) {
        e("body already parsed"), h();
        return;
      }
      if (d.body = d.body || {}, !i.hasBody(d)) {
        e("skip empty body"), h();
        return;
      }
      if (e("content-type %j", d.headers["content-type"]), !l(d)) {
        e("skip parsing"), h();
        return;
      }
      n(d, m, h, x, e, {
        encoding: null,
        inflate: c,
        limit: u,
        verify: f
      });
    };
  }
  function r(o) {
    return function(c) {
      return !!i(c, o);
    };
  }
  return vn;
}
/*!
 * body-parser
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var xn, ut;
function dp() {
  if (ut) return xn;
  ut = 1;
  var a = Qe(), e = Re, n = Z("body-parser:text"), i = Da(), t = Je;
  xn = r;
  function r(c) {
    var u = c || {}, p = u.defaultCharset || "utf-8", f = u.inflate !== !1, l = typeof u.limit != "number" ? a.parse(u.limit || "100kb") : u.limit, x = u.type || "text/plain", v = u.verify || !1;
    if (v !== !1 && typeof v != "function")
      throw new TypeError("option verify must be function");
    var d = typeof x != "function" ? s(x) : x;
    function m(h) {
      return h;
    }
    return function(g, b, y) {
      if (g._body) {
        n("body already parsed"), y();
        return;
      }
      if (g.body = g.body || {}, !t.hasBody(g)) {
        n("skip empty body"), y();
        return;
      }
      if (n("content-type %j", g.headers["content-type"]), !d(g)) {
        n("skip parsing"), y();
        return;
      }
      var w = o(g) || p;
      i(g, b, y, m, n, {
        encoding: w,
        inflate: f,
        limit: l,
        verify: v
      });
    };
  }
  function o(c) {
    try {
      return (e.parse(c).parameters.charset || "").toLowerCase();
    } catch {
      return;
    }
  }
  function s(c) {
    return function(p) {
      return !!t(p, c);
    };
  }
  return xn;
}
var ze = TypeError, fp = Jn.inspect, ti = typeof Map == "function" && Map.prototype, hn = Object.getOwnPropertyDescriptor && ti ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, ja = ti && hn && typeof hn.get == "function" ? hn.get : null, dt = ti && Map.prototype.forEach, ri = typeof Set == "function" && Set.prototype, gn = Object.getOwnPropertyDescriptor && ri ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, Aa = ri && gn && typeof gn.get == "function" ? gn.get : null, ft = ri && Set.prototype.forEach, mp = typeof WeakMap == "function" && WeakMap.prototype, He = mp ? WeakMap.prototype.has : null, vp = typeof WeakSet == "function" && WeakSet.prototype, Ge = vp ? WeakSet.prototype.has : null, xp = typeof WeakRef == "function" && WeakRef.prototype, mt = xp ? WeakRef.prototype.deref : null, hp = Boolean.prototype.valueOf, gp = Object.prototype.toString, bp = Function.prototype.toString, yp = String.prototype.match, oi = String.prototype.slice, re = String.prototype.replace, wp = String.prototype.toUpperCase, vt = String.prototype.toLowerCase, Fr = RegExp.prototype.test, xt = Array.prototype.concat, Y = Array.prototype.join, kp = Array.prototype.slice, ht = Math.floor, Mn = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, bn = Object.getOwnPropertySymbols, Un = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, Se = typeof Symbol == "function" && typeof Symbol.iterator == "object", M = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === Se || !0) ? Symbol.toStringTag : null, zr = Object.prototype.propertyIsEnumerable, gt = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(a) {
  return a.__proto__;
} : null);
function bt(a, e) {
  if (a === 1 / 0 || a === -1 / 0 || a !== a || a && a > -1e3 && a < 1e3 || Fr.call(/e/, e))
    return e;
  var n = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof a == "number") {
    var i = a < 0 ? -ht(-a) : ht(a);
    if (i !== a) {
      var t = String(i), r = oi.call(e, t.length + 1);
      return re.call(t, n, "$&_") + "." + re.call(re.call(r, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return re.call(e, n, "$&_");
}
var Hn = fp, yt = Hn.custom, wt = Nr(yt) ? yt : null, Br = {
  __proto__: null,
  double: '"',
  single: "'"
}, Ep = {
  __proto__: null,
  double: /(["\\])/g,
  single: /(['\\])/g
}, Na = function a(e, n, i, t) {
  var r = n || {};
  if (ae(r, "quoteStyle") && !ae(Br, r.quoteStyle))
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  if (ae(r, "maxStringLength") && (typeof r.maxStringLength == "number" ? r.maxStringLength < 0 && r.maxStringLength !== 1 / 0 : r.maxStringLength !== null))
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  var o = ae(r, "customInspect") ? r.customInspect : !0;
  if (typeof o != "boolean" && o !== "symbol")
    throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
  if (ae(r, "indent") && r.indent !== null && r.indent !== "	" && !(parseInt(r.indent, 10) === r.indent && r.indent > 0))
    throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
  if (ae(r, "numericSeparator") && typeof r.numericSeparator != "boolean")
    throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
  var s = r.numericSeparator;
  if (typeof e > "u")
    return "undefined";
  if (e === null)
    return "null";
  if (typeof e == "boolean")
    return e ? "true" : "false";
  if (typeof e == "string")
    return Mr(e, r);
  if (typeof e == "number") {
    if (e === 0)
      return 1 / 0 / e > 0 ? "0" : "-0";
    var c = String(e);
    return s ? bt(e, c) : c;
  }
  if (typeof e == "bigint") {
    var u = String(e) + "n";
    return s ? bt(e, u) : u;
  }
  var p = typeof r.depth > "u" ? 5 : r.depth;
  if (typeof i > "u" && (i = 0), i >= p && p > 0 && typeof e == "object")
    return Gn(e) ? "[Array]" : "[Object]";
  var f = Lp(r, i);
  if (typeof t > "u")
    t = [];
  else if (Lr(t, e) >= 0)
    return "[Circular]";
  function l(C, B, F) {
    if (B && (t = kp.call(t), t.push(B)), F) {
      var U = {
        depth: r.depth
      };
      return ae(r, "quoteStyle") && (U.quoteStyle = r.quoteStyle), a(C, U, i + 1, t);
    }
    return a(C, r, i + 1, t);
  }
  if (typeof e == "function" && !kt(e)) {
    var x = $p(e), v = da(e, l);
    return "[Function" + (x ? ": " + x : " (anonymous)") + "]" + (v.length > 0 ? " { " + Y.call(v, ", ") + " }" : "");
  }
  if (Nr(e)) {
    var d = Se ? re.call(String(e), /^(Symbol\(.*\))_[^)]*$/, "$1") : Un.call(e);
    return typeof e == "object" && !Se ? Me(d) : d;
  }
  if (Bp(e)) {
    for (var m = "<" + vt.call(String(e.nodeName)), h = e.attributes || [], g = 0; g < h.length; g++)
      m += " " + h[g].name + "=" + Dr(Sp(h[g].value), "double", r);
    return m += ">", e.childNodes && e.childNodes.length && (m += "..."), m += "</" + vt.call(String(e.nodeName)) + ">", m;
  }
  if (Gn(e)) {
    if (e.length === 0)
      return "[]";
    var b = da(e, l);
    return f && !Np(b) ? "[" + Wn(b, f) + "]" : "[ " + Y.call(b, ", ") + " ]";
  }
  if (Ap(e)) {
    var y = da(e, l);
    return !("cause" in Error.prototype) && "cause" in e && !zr.call(e, "cause") ? "{ [" + String(e) + "] " + Y.call(xt.call("[cause]: " + l(e.cause), y), ", ") + " }" : y.length === 0 ? "[" + String(e) + "]" : "{ [" + String(e) + "] " + Y.call(y, ", ") + " }";
  }
  if (typeof e == "object" && o) {
    if (wt && typeof e[wt] == "function" && Hn)
      return Hn(e, { depth: p - i });
    if (o !== "symbol" && typeof e.inspect == "function")
      return e.inspect();
  }
  if (Rp(e)) {
    var w = [];
    return dt && dt.call(e, function(C, B) {
      w.push(l(B, e, !0) + " => " + l(C, e));
    }), Et("Map", ja.call(e), w, f);
  }
  if (Fp(e)) {
    var k = [];
    return ft && ft.call(e, function(C) {
      k.push(l(C, e));
    }), Et("Set", Aa.call(e), k, f);
  }
  if (Ip(e))
    return yn("WeakMap");
  if (zp(e))
    return yn("WeakSet");
  if (qp(e))
    return yn("WeakRef");
  if (Tp(e))
    return Me(l(Number(e)));
  if (Op(e))
    return Me(l(Mn.call(e)));
  if (Cp(e))
    return Me(hp.call(e));
  if (_p(e))
    return Me(l(String(e)));
  if (typeof window < "u" && e === window)
    return "{ [object Window] }";
  if (typeof globalThis < "u" && e === globalThis || typeof Ea < "u" && e === Ea)
    return "{ [object globalThis] }";
  if (!jp(e) && !kt(e)) {
    var A = da(e, l), _ = gt ? gt(e) === Object.prototype : e instanceof Object || e.constructor === Object, E = e instanceof Object ? "" : "null prototype", S = !_ && M && Object(e) === e && M in e ? oi.call(pe(e), 8, -1) : E ? "Object" : "", j = _ || typeof e.constructor != "function" ? "" : e.constructor.name ? e.constructor.name + " " : "", T = j + (S || E ? "[" + Y.call(xt.call([], S || [], E || []), ": ") + "] " : "");
    return A.length === 0 ? T + "{}" : f ? T + "{" + Wn(A, f) + "}" : T + "{ " + Y.call(A, ", ") + " }";
  }
  return String(e);
};
function Dr(a, e, n) {
  var i = n.quoteStyle || e, t = Br[i];
  return t + a + t;
}
function Sp(a) {
  return re.call(String(a), /"/g, "&quot;");
}
function Gn(a) {
  return pe(a) === "[object Array]" && (!M || !(typeof a == "object" && M in a));
}
function jp(a) {
  return pe(a) === "[object Date]" && (!M || !(typeof a == "object" && M in a));
}
function kt(a) {
  return pe(a) === "[object RegExp]" && (!M || !(typeof a == "object" && M in a));
}
function Ap(a) {
  return pe(a) === "[object Error]" && (!M || !(typeof a == "object" && M in a));
}
function _p(a) {
  return pe(a) === "[object String]" && (!M || !(typeof a == "object" && M in a));
}
function Tp(a) {
  return pe(a) === "[object Number]" && (!M || !(typeof a == "object" && M in a));
}
function Cp(a) {
  return pe(a) === "[object Boolean]" && (!M || !(typeof a == "object" && M in a));
}
function Nr(a) {
  if (Se)
    return a && typeof a == "object" && a instanceof Symbol;
  if (typeof a == "symbol")
    return !0;
  if (!a || typeof a != "object" || !Un)
    return !1;
  try {
    return Un.call(a), !0;
  } catch {
  }
  return !1;
}
function Op(a) {
  if (!a || typeof a != "object" || !Mn)
    return !1;
  try {
    return Mn.call(a), !0;
  } catch {
  }
  return !1;
}
var Pp = Object.prototype.hasOwnProperty || function(a) {
  return a in this;
};
function ae(a, e) {
  return Pp.call(a, e);
}
function pe(a) {
  return gp.call(a);
}
function $p(a) {
  if (a.name)
    return a.name;
  var e = yp.call(bp.call(a), /^function\s*([\w$]+)/);
  return e ? e[1] : null;
}
function Lr(a, e) {
  if (a.indexOf)
    return a.indexOf(e);
  for (var n = 0, i = a.length; n < i; n++)
    if (a[n] === e)
      return n;
  return -1;
}
function Rp(a) {
  if (!ja || !a || typeof a != "object")
    return !1;
  try {
    ja.call(a);
    try {
      Aa.call(a);
    } catch {
      return !0;
    }
    return a instanceof Map;
  } catch {
  }
  return !1;
}
function Ip(a) {
  if (!He || !a || typeof a != "object")
    return !1;
  try {
    He.call(a, He);
    try {
      Ge.call(a, Ge);
    } catch {
      return !0;
    }
    return a instanceof WeakMap;
  } catch {
  }
  return !1;
}
function qp(a) {
  if (!mt || !a || typeof a != "object")
    return !1;
  try {
    return mt.call(a), !0;
  } catch {
  }
  return !1;
}
function Fp(a) {
  if (!Aa || !a || typeof a != "object")
    return !1;
  try {
    Aa.call(a);
    try {
      ja.call(a);
    } catch {
      return !0;
    }
    return a instanceof Set;
  } catch {
  }
  return !1;
}
function zp(a) {
  if (!Ge || !a || typeof a != "object")
    return !1;
  try {
    Ge.call(a, Ge);
    try {
      He.call(a, He);
    } catch {
      return !0;
    }
    return a instanceof WeakSet;
  } catch {
  }
  return !1;
}
function Bp(a) {
  return !a || typeof a != "object" ? !1 : typeof HTMLElement < "u" && a instanceof HTMLElement ? !0 : typeof a.nodeName == "string" && typeof a.getAttribute == "function";
}
function Mr(a, e) {
  if (a.length > e.maxStringLength) {
    var n = a.length - e.maxStringLength, i = "... " + n + " more character" + (n > 1 ? "s" : "");
    return Mr(oi.call(a, 0, e.maxStringLength), e) + i;
  }
  var t = Ep[e.quoteStyle || "single"];
  t.lastIndex = 0;
  var r = re.call(re.call(a, t, "\\$1"), /[\x00-\x1f]/g, Dp);
  return Dr(r, "single", e);
}
function Dp(a) {
  var e = a.charCodeAt(0), n = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[e];
  return n ? "\\" + n : "\\x" + (e < 16 ? "0" : "") + wp.call(e.toString(16));
}
function Me(a) {
  return "Object(" + a + ")";
}
function yn(a) {
  return a + " { ? }";
}
function Et(a, e, n, i) {
  var t = i ? Wn(n, i) : Y.call(n, ", ");
  return a + " (" + e + ") {" + t + "}";
}
function Np(a) {
  for (var e = 0; e < a.length; e++)
    if (Lr(a[e], `
`) >= 0)
      return !1;
  return !0;
}
function Lp(a, e) {
  var n;
  if (a.indent === "	")
    n = "	";
  else if (typeof a.indent == "number" && a.indent > 0)
    n = Y.call(Array(a.indent + 1), " ");
  else
    return null;
  return {
    base: n,
    prev: Y.call(Array(e + 1), n)
  };
}
function Wn(a, e) {
  if (a.length === 0)
    return "";
  var n = `
` + e.prev + e.base;
  return n + Y.call(a, "," + n) + `
` + e.prev;
}
function da(a, e) {
  var n = Gn(a), i = [];
  if (n) {
    i.length = a.length;
    for (var t = 0; t < a.length; t++)
      i[t] = ae(a, t) ? e(a[t], a) : "";
  }
  var r = typeof bn == "function" ? bn(a) : [], o;
  if (Se) {
    o = {};
    for (var s = 0; s < r.length; s++)
      o["$" + r[s]] = r[s];
  }
  for (var c in a)
    ae(a, c) && (n && String(Number(c)) === c && c < a.length || Se && o["$" + c] instanceof Symbol || (Fr.call(/[^\w$]/, c) ? i.push(e(c, a) + ": " + e(a[c], a)) : i.push(c + ": " + e(a[c], a))));
  if (typeof bn == "function")
    for (var u = 0; u < r.length; u++)
      zr.call(a, r[u]) && i.push("[" + e(r[u]) + "]: " + e(a[r[u]], a));
  return i;
}
var Mp = Na, Up = ze, La = function(a, e, n) {
  for (var i = a, t; (t = i.next) != null; i = t)
    if (t.key === e)
      return i.next = t.next, n || (t.next = /** @type {NonNullable<typeof list.next>} */
      a.next, a.next = t), t;
}, Hp = function(a, e) {
  if (a) {
    var n = La(a, e);
    return n && n.value;
  }
}, Gp = function(a, e, n) {
  var i = La(a, e);
  i ? i.value = n : a.next = /** @type {import('./list.d.ts').ListNode<typeof value, typeof key>} */
  {
    // eslint-disable-line no-param-reassign, no-extra-parens
    key: e,
    next: a.next,
    value: n
  };
}, Wp = function(a, e) {
  return a ? !!La(a, e) : !1;
}, Vp = function(a, e) {
  if (a)
    return La(a, e, !0);
}, Xp = function() {
  var e, n = {
    assert: function(i) {
      if (!n.has(i))
        throw new Up("Side channel does not contain " + Mp(i));
    },
    delete: function(i) {
      var t = e && e.next, r = Vp(e, i);
      return r && t && t === r && (e = void 0), !!r;
    },
    get: function(i) {
      return Hp(e, i);
    },
    has: function(i) {
      return Wp(e, i);
    },
    set: function(i, t) {
      e || (e = {
        next: void 0
      }), Gp(
        /** @type {NonNullable<typeof $o>} */
        e,
        i,
        t
      );
    }
  };
  return n;
}, Zp = Object, Qp = Error, Jp = EvalError, Kp = RangeError, Yp = ReferenceError, el = SyntaxError, al = URIError, nl = Math.abs, il = Math.floor, tl = Math.max, rl = Math.min, ol = Math.pow, sl = Object.getOwnPropertyDescriptor, ha = sl;
if (ha)
  try {
    ha([], "length");
  } catch {
    ha = null;
  }
var Ur = ha, ga = Object.defineProperty || !1;
if (ga)
  try {
    ga({}, "a", { value: 1 });
  } catch {
    ga = !1;
  }
var cl = ga, wn, St;
function pl() {
  return St || (St = 1, wn = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var e = {}, n = Symbol("test"), i = Object(n);
    if (typeof n == "string" || Object.prototype.toString.call(n) !== "[object Symbol]" || Object.prototype.toString.call(i) !== "[object Symbol]")
      return !1;
    var t = 42;
    e[n] = t;
    for (var r in e)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
      return !1;
    var o = Object.getOwnPropertySymbols(e);
    if (o.length !== 1 || o[0] !== n || !Object.prototype.propertyIsEnumerable.call(e, n))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var s = (
        /** @type {PropertyDescriptor} */
        Object.getOwnPropertyDescriptor(e, n)
      );
      if (s.value !== t || s.enumerable !== !0)
        return !1;
    }
    return !0;
  }), wn;
}
var kn, jt;
function ll() {
  if (jt) return kn;
  jt = 1;
  var a = typeof Symbol < "u" && Symbol, e = pl();
  return kn = function() {
    return typeof a != "function" || typeof Symbol != "function" || typeof a("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : e();
  }, kn;
}
var ul = "Function.prototype.bind called on incompatible ", dl = Object.prototype.toString, fl = Math.max, ml = "[object Function]", At = function(e, n) {
  for (var i = [], t = 0; t < e.length; t += 1)
    i[t] = e[t];
  for (var r = 0; r < n.length; r += 1)
    i[r + e.length] = n[r];
  return i;
}, vl = function(e, n) {
  for (var i = [], t = n, r = 0; t < e.length; t += 1, r += 1)
    i[r] = e[t];
  return i;
}, xl = function(a, e) {
  for (var n = "", i = 0; i < a.length; i += 1)
    n += a[i], i + 1 < a.length && (n += e);
  return n;
}, hl = function(e) {
  var n = this;
  if (typeof n != "function" || dl.apply(n) !== ml)
    throw new TypeError(ul + n);
  for (var i = vl(arguments, 1), t, r = function() {
    if (this instanceof t) {
      var p = n.apply(
        this,
        At(i, arguments)
      );
      return Object(p) === p ? p : this;
    }
    return n.apply(
      e,
      At(i, arguments)
    );
  }, o = fl(0, n.length - i.length), s = [], c = 0; c < o; c++)
    s[c] = "$" + c;
  if (t = Function("binder", "return function (" + xl(s, ",") + "){ return binder.apply(this,arguments); }")(r), n.prototype) {
    var u = function() {
    };
    u.prototype = n.prototype, t.prototype = new u(), u.prototype = null;
  }
  return t;
}, gl = hl, Ma = Function.prototype.bind || gl, si = Function.prototype.call, En, _t;
function Hr() {
  return _t || (_t = 1, En = Function.prototype.apply), En;
}
var bl = typeof Reflect < "u" && Reflect && Reflect.apply, yl = Ma, wl = Hr(), kl = si, El = bl, Sl = El || yl.call(kl, wl), jl = Ma, Al = ze, _l = si, Tl = Sl, Gr = function(e) {
  if (e.length < 1 || typeof e[0] != "function")
    throw new Al("a function is required");
  return Tl(jl, _l, e);
}, Sn, Tt;
function Cl() {
  if (Tt) return Sn;
  Tt = 1;
  var a = Gr, e = Ur, n;
  try {
    n = /** @type {{ __proto__?: typeof Array.prototype }} */
    [].__proto__ === Array.prototype;
  } catch (o) {
    if (!o || typeof o != "object" || !("code" in o) || o.code !== "ERR_PROTO_ACCESS")
      throw o;
  }
  var i = !!n && e && e(
    Object.prototype,
    /** @type {keyof typeof Object.prototype} */
    "__proto__"
  ), t = Object, r = t.getPrototypeOf;
  return Sn = i && typeof i.get == "function" ? a([i.get]) : typeof r == "function" ? (
    /** @type {import('./get')} */
    function(s) {
      return r(s == null ? s : t(s));
    }
  ) : !1, Sn;
}
var jn, Ct;
function Ol() {
  if (Ct) return jn;
  Ct = 1;
  var a = Function.prototype.call, e = Object.prototype.hasOwnProperty, n = Ma;
  return jn = n.call(a, e), jn;
}
var O, Wr = Zp, Pl = Qp, $l = Jp, Rl = Kp, Il = Yp, je = el, Ee = ze, ql = al, Fl = nl, zl = il, Bl = tl, Dl = rl, Nl = ol, Vr = Function, An = function(a) {
  try {
    return Vr('"use strict"; return (' + a + ").constructor;")();
  } catch {
  }
}, Ze = Ur, Ll = cl, _n = function() {
  throw new Ee();
}, Ml = Ze ? function() {
  try {
    return arguments.callee, _n;
  } catch {
    try {
      return Ze(arguments, "callee").get;
    } catch {
      return _n;
    }
  }
}() : _n, ge = ll()(), Ul = Cl(), L = typeof Reflect == "function" && Reflect.getPrototypeOf || Wr.getPrototypeOf || Ul, Xr = Hr(), Ke = si, ye = {}, Hl = typeof Uint8Array > "u" || !L ? O : L(Uint8Array), de = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? O : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? O : ArrayBuffer,
  "%ArrayIteratorPrototype%": ge && L ? L([][Symbol.iterator]()) : O,
  "%AsyncFromSyncIteratorPrototype%": O,
  "%AsyncFunction%": ye,
  "%AsyncGenerator%": ye,
  "%AsyncGeneratorFunction%": ye,
  "%AsyncIteratorPrototype%": ye,
  "%Atomics%": typeof Atomics > "u" ? O : Atomics,
  "%BigInt%": typeof BigInt > "u" ? O : BigInt,
  "%BigInt64Array%": typeof BigInt64Array > "u" ? O : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array > "u" ? O : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView > "u" ? O : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": Pl,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": $l,
  "%Float32Array%": typeof Float32Array > "u" ? O : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? O : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? O : FinalizationRegistry,
  "%Function%": Vr,
  "%GeneratorFunction%": ye,
  "%Int8Array%": typeof Int8Array > "u" ? O : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? O : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? O : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": ge && L ? L(L([][Symbol.iterator]())) : O,
  "%JSON%": typeof JSON == "object" ? JSON : O,
  "%Map%": typeof Map > "u" ? O : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !ge || !L ? O : L((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Wr,
  "%Object.getOwnPropertyDescriptor%": Ze,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? O : Promise,
  "%Proxy%": typeof Proxy > "u" ? O : Proxy,
  "%RangeError%": Rl,
  "%ReferenceError%": Il,
  "%Reflect%": typeof Reflect > "u" ? O : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? O : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !ge || !L ? O : L((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? O : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": ge && L ? L(""[Symbol.iterator]()) : O,
  "%Symbol%": ge ? Symbol : O,
  "%SyntaxError%": je,
  "%ThrowTypeError%": Ml,
  "%TypedArray%": Hl,
  "%TypeError%": Ee,
  "%Uint8Array%": typeof Uint8Array > "u" ? O : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? O : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? O : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? O : Uint32Array,
  "%URIError%": ql,
  "%WeakMap%": typeof WeakMap > "u" ? O : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? O : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? O : WeakSet,
  "%Function.prototype.call%": Ke,
  "%Function.prototype.apply%": Xr,
  "%Object.defineProperty%": Ll,
  "%Math.abs%": Fl,
  "%Math.floor%": zl,
  "%Math.max%": Bl,
  "%Math.min%": Dl,
  "%Math.pow%": Nl
};
if (L)
  try {
    null.error;
  } catch (a) {
    var Gl = L(L(a));
    de["%Error.prototype%"] = Gl;
  }
var Wl = function a(e) {
  var n;
  if (e === "%AsyncFunction%")
    n = An("async function () {}");
  else if (e === "%GeneratorFunction%")
    n = An("function* () {}");
  else if (e === "%AsyncGeneratorFunction%")
    n = An("async function* () {}");
  else if (e === "%AsyncGenerator%") {
    var i = a("%AsyncGeneratorFunction%");
    i && (n = i.prototype);
  } else if (e === "%AsyncIteratorPrototype%") {
    var t = a("%AsyncGenerator%");
    t && L && (n = L(t.prototype));
  }
  return de[e] = n, n;
}, Ot = {
  __proto__: null,
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
}, Ye = Ma, _a = Ol(), Vl = Ye.call(Ke, Array.prototype.concat), Xl = Ye.call(Xr, Array.prototype.splice), Pt = Ye.call(Ke, String.prototype.replace), Ta = Ye.call(Ke, String.prototype.slice), Zl = Ye.call(Ke, RegExp.prototype.exec), Ql = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, Jl = /\\(\\)?/g, Kl = function(e) {
  var n = Ta(e, 0, 1), i = Ta(e, -1);
  if (n === "%" && i !== "%")
    throw new je("invalid intrinsic syntax, expected closing `%`");
  if (i === "%" && n !== "%")
    throw new je("invalid intrinsic syntax, expected opening `%`");
  var t = [];
  return Pt(e, Ql, function(r, o, s, c) {
    t[t.length] = s ? Pt(c, Jl, "$1") : o || r;
  }), t;
}, Yl = function(e, n) {
  var i = e, t;
  if (_a(Ot, i) && (t = Ot[i], i = "%" + t[0] + "%"), _a(de, i)) {
    var r = de[i];
    if (r === ye && (r = Wl(i)), typeof r > "u" && !n)
      throw new Ee("intrinsic " + e + " exists, but is not available. Please file an issue!");
    return {
      alias: t,
      name: i,
      value: r
    };
  }
  throw new je("intrinsic " + e + " does not exist!");
}, ci = function(e, n) {
  if (typeof e != "string" || e.length === 0)
    throw new Ee("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof n != "boolean")
    throw new Ee('"allowMissing" argument must be a boolean');
  if (Zl(/^%?[^%]*%?$/, e) === null)
    throw new je("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var i = Kl(e), t = i.length > 0 ? i[0] : "", r = Yl("%" + t + "%", n), o = r.name, s = r.value, c = !1, u = r.alias;
  u && (t = u[0], Xl(i, Vl([0, 1], u)));
  for (var p = 1, f = !0; p < i.length; p += 1) {
    var l = i[p], x = Ta(l, 0, 1), v = Ta(l, -1);
    if ((x === '"' || x === "'" || x === "`" || v === '"' || v === "'" || v === "`") && x !== v)
      throw new je("property names with quotes must have matching quotes");
    if ((l === "constructor" || !f) && (c = !0), t += "." + l, o = "%" + t + "%", _a(de, o))
      s = de[o];
    else if (s != null) {
      if (!(l in s)) {
        if (!n)
          throw new Ee("base intrinsic for " + e + " exists, but the property is not available.");
        return;
      }
      if (Ze && p + 1 >= i.length) {
        var d = Ze(s, l);
        f = !!d, f && "get" in d && !("originalValue" in d.get) ? s = d.get : s = s[l];
      } else
        f = _a(s, l), s = s[l];
      f && !c && (de[o] = s);
    }
  }
  return s;
}, Zr = ci, Qr = Gr, eu = Qr([Zr("%String.prototype.indexOf%")]), Jr = function(e, n) {
  var i = (
    /** @type {Parameters<typeof callBindBasic>[0][0]} */
    Zr(e, !!n)
  );
  return typeof i == "function" && eu(e, ".prototype.") > -1 ? Qr([i]) : i;
}, au = ci, ea = Jr, nu = Na, iu = ze, $t = au("%Map%", !0), tu = ea("Map.prototype.get", !0), ru = ea("Map.prototype.set", !0), ou = ea("Map.prototype.has", !0), su = ea("Map.prototype.delete", !0), cu = ea("Map.prototype.size", !0), Kr = !!$t && /** @type {Exclude<import('.'), false>} */
function() {
  var e, n = {
    assert: function(i) {
      if (!n.has(i))
        throw new iu("Side channel does not contain " + nu(i));
    },
    delete: function(i) {
      if (e) {
        var t = su(e, i);
        return cu(e) === 0 && (e = void 0), t;
      }
      return !1;
    },
    get: function(i) {
      if (e)
        return tu(e, i);
    },
    has: function(i) {
      return e ? ou(e, i) : !1;
    },
    set: function(i, t) {
      e || (e = new $t()), ru(e, i, t);
    }
  };
  return n;
}, pu = ci, Ua = Jr, lu = Na, fa = Kr, uu = ze, be = pu("%WeakMap%", !0), du = Ua("WeakMap.prototype.get", !0), fu = Ua("WeakMap.prototype.set", !0), mu = Ua("WeakMap.prototype.has", !0), vu = Ua("WeakMap.prototype.delete", !0), xu = be ? (
  /** @type {Exclude<import('.'), false>} */
  function() {
    var e, n, i = {
      assert: function(t) {
        if (!i.has(t))
          throw new uu("Side channel does not contain " + lu(t));
      },
      delete: function(t) {
        if (be && t && (typeof t == "object" || typeof t == "function")) {
          if (e)
            return vu(e, t);
        } else if (fa && n)
          return n.delete(t);
        return !1;
      },
      get: function(t) {
        return be && t && (typeof t == "object" || typeof t == "function") && e ? du(e, t) : n && n.get(t);
      },
      has: function(t) {
        return be && t && (typeof t == "object" || typeof t == "function") && e ? mu(e, t) : !!n && n.has(t);
      },
      set: function(t, r) {
        be && t && (typeof t == "object" || typeof t == "function") ? (e || (e = new be()), fu(e, t, r)) : fa && (n || (n = fa()), n.set(t, r));
      }
    };
    return i;
  }
) : fa, hu = ze, gu = Na, bu = Xp, yu = Kr, wu = xu, ku = wu || yu || bu, Eu = function() {
  var e, n = {
    assert: function(i) {
      if (!n.has(i))
        throw new hu("Side channel does not contain " + gu(i));
    },
    delete: function(i) {
      return !!e && e.delete(i);
    },
    get: function(i) {
      return e && e.get(i);
    },
    has: function(i) {
      return !!e && e.has(i);
    },
    set: function(i, t) {
      e || (e = ku()), e.set(i, t);
    }
  };
  return n;
}, Su = String.prototype.replace, ju = /%20/g, Tn = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, pi = {
  default: Tn.RFC3986,
  formatters: {
    RFC1738: function(a) {
      return Su.call(a, ju, "+");
    },
    RFC3986: function(a) {
      return String(a);
    }
  },
  RFC1738: Tn.RFC1738,
  RFC3986: Tn.RFC3986
}, Au = pi, Cn = Object.prototype.hasOwnProperty, ue = Array.isArray, J = function() {
  for (var a = [], e = 0; e < 256; ++e)
    a.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
  return a;
}(), _u = function(e) {
  for (; e.length > 1; ) {
    var n = e.pop(), i = n.obj[n.prop];
    if (ue(i)) {
      for (var t = [], r = 0; r < i.length; ++r)
        typeof i[r] < "u" && t.push(i[r]);
      n.obj[n.prop] = t;
    }
  }
}, Yr = function(e, n) {
  for (var i = n && n.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, t = 0; t < e.length; ++t)
    typeof e[t] < "u" && (i[t] = e[t]);
  return i;
}, Tu = function a(e, n, i) {
  if (!n)
    return e;
  if (typeof n != "object") {
    if (ue(e))
      e.push(n);
    else if (e && typeof e == "object")
      (i && (i.plainObjects || i.allowPrototypes) || !Cn.call(Object.prototype, n)) && (e[n] = !0);
    else
      return [e, n];
    return e;
  }
  if (!e || typeof e != "object")
    return [e].concat(n);
  var t = e;
  return ue(e) && !ue(n) && (t = Yr(e, i)), ue(e) && ue(n) ? (n.forEach(function(r, o) {
    if (Cn.call(e, o)) {
      var s = e[o];
      s && typeof s == "object" && r && typeof r == "object" ? e[o] = a(s, r, i) : e.push(r);
    } else
      e[o] = r;
  }), e) : Object.keys(n).reduce(function(r, o) {
    var s = n[o];
    return Cn.call(r, o) ? r[o] = a(r[o], s, i) : r[o] = s, r;
  }, t);
}, Cu = function(e, n) {
  return Object.keys(n).reduce(function(i, t) {
    return i[t] = n[t], i;
  }, e);
}, Ou = function(a, e, n) {
  var i = a.replace(/\+/g, " ");
  if (n === "iso-8859-1")
    return i.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(i);
  } catch {
    return i;
  }
}, On = 1024, Pu = function(e, n, i, t, r) {
  if (e.length === 0)
    return e;
  var o = e;
  if (typeof e == "symbol" ? o = Symbol.prototype.toString.call(e) : typeof e != "string" && (o = String(e)), i === "iso-8859-1")
    return escape(o).replace(/%u[0-9a-f]{4}/gi, function(x) {
      return "%26%23" + parseInt(x.slice(2), 16) + "%3B";
    });
  for (var s = "", c = 0; c < o.length; c += On) {
    for (var u = o.length >= On ? o.slice(c, c + On) : o, p = [], f = 0; f < u.length; ++f) {
      var l = u.charCodeAt(f);
      if (l === 45 || l === 46 || l === 95 || l === 126 || l >= 48 && l <= 57 || l >= 65 && l <= 90 || l >= 97 && l <= 122 || r === Au.RFC1738 && (l === 40 || l === 41)) {
        p[p.length] = u.charAt(f);
        continue;
      }
      if (l < 128) {
        p[p.length] = J[l];
        continue;
      }
      if (l < 2048) {
        p[p.length] = J[192 | l >> 6] + J[128 | l & 63];
        continue;
      }
      if (l < 55296 || l >= 57344) {
        p[p.length] = J[224 | l >> 12] + J[128 | l >> 6 & 63] + J[128 | l & 63];
        continue;
      }
      f += 1, l = 65536 + ((l & 1023) << 10 | u.charCodeAt(f) & 1023), p[p.length] = J[240 | l >> 18] + J[128 | l >> 12 & 63] + J[128 | l >> 6 & 63] + J[128 | l & 63];
    }
    s += p.join("");
  }
  return s;
}, $u = function(e) {
  for (var n = [{ obj: { o: e }, prop: "o" }], i = [], t = 0; t < n.length; ++t)
    for (var r = n[t], o = r.obj[r.prop], s = Object.keys(o), c = 0; c < s.length; ++c) {
      var u = s[c], p = o[u];
      typeof p == "object" && p !== null && i.indexOf(p) === -1 && (n.push({ obj: o, prop: u }), i.push(p));
    }
  return _u(n), e;
}, Ru = function(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}, Iu = function(e) {
  return !e || typeof e != "object" ? !1 : !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e));
}, qu = function(e, n) {
  return [].concat(e, n);
}, Fu = function(e, n) {
  if (ue(e)) {
    for (var i = [], t = 0; t < e.length; t += 1)
      i.push(n(e[t]));
    return i;
  }
  return n(e);
}, eo = {
  arrayToObject: Yr,
  assign: Cu,
  combine: qu,
  compact: $u,
  decode: Ou,
  encode: Pu,
  isBuffer: Iu,
  isRegExp: Ru,
  maybeMap: Fu,
  merge: Tu
}, ao = Eu, ba = eo, We = pi, zu = Object.prototype.hasOwnProperty, no = {
  brackets: function(e) {
    return e + "[]";
  },
  comma: "comma",
  indices: function(e, n) {
    return e + "[" + n + "]";
  },
  repeat: function(e) {
    return e;
  }
}, K = Array.isArray, Bu = Array.prototype.push, io = function(a, e) {
  Bu.apply(a, K(e) ? e : [e]);
}, Du = Date.prototype.toISOString, Rt = We.default, N = {
  addQueryPrefix: !1,
  allowDots: !1,
  allowEmptyArrays: !1,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encodeDotInKeys: !1,
  encoder: ba.encode,
  encodeValuesOnly: !1,
  format: Rt,
  formatter: We.formatters[Rt],
  // deprecated
  indices: !1,
  serializeDate: function(e) {
    return Du.call(e);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, Nu = function(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean" || typeof e == "symbol" || typeof e == "bigint";
}, Pn = {}, Lu = function a(e, n, i, t, r, o, s, c, u, p, f, l, x, v, d, m, h, g) {
  for (var b = e, y = g, w = 0, k = !1; (y = y.get(Pn)) !== void 0 && !k; ) {
    var A = y.get(e);
    if (w += 1, typeof A < "u") {
      if (A === w)
        throw new RangeError("Cyclic object value");
      k = !0;
    }
    typeof y.get(Pn) > "u" && (w = 0);
  }
  if (typeof p == "function" ? b = p(n, b) : b instanceof Date ? b = x(b) : i === "comma" && K(b) && (b = ba.maybeMap(b, function(ee) {
    return ee instanceof Date ? x(ee) : ee;
  })), b === null) {
    if (o)
      return u && !m ? u(n, N.encoder, h, "key", v) : n;
    b = "";
  }
  if (Nu(b) || ba.isBuffer(b)) {
    if (u) {
      var _ = m ? n : u(n, N.encoder, h, "key", v);
      return [d(_) + "=" + d(u(b, N.encoder, h, "value", v))];
    }
    return [d(n) + "=" + d(String(b))];
  }
  var E = [];
  if (typeof b > "u")
    return E;
  var S;
  if (i === "comma" && K(b))
    m && u && (b = ba.maybeMap(b, u)), S = [{ value: b.length > 0 ? b.join(",") || null : void 0 }];
  else if (K(p))
    S = p;
  else {
    var j = Object.keys(b);
    S = f ? j.sort(f) : j;
  }
  var T = c ? n.replace(/\./g, "%2E") : n, C = t && K(b) && b.length === 1 ? T + "[]" : T;
  if (r && K(b) && b.length === 0)
    return C + "[]";
  for (var B = 0; B < S.length; ++B) {
    var F = S[B], U = typeof F == "object" && typeof F.value < "u" ? F.value : b[F];
    if (!(s && U === null)) {
      var D = l && c ? F.replace(/\./g, "%2E") : F, xe = K(b) ? typeof i == "function" ? i(C, D) : C : C + (l ? "." + D : "[" + D + "]");
      g.set(e, w);
      var he = ao();
      he.set(Pn, g), io(E, a(
        U,
        xe,
        i,
        t,
        r,
        o,
        s,
        c,
        i === "comma" && m && K(b) ? null : u,
        p,
        f,
        l,
        x,
        v,
        d,
        m,
        h,
        he
      ));
    }
  }
  return E;
}, Mu = function(e) {
  if (!e)
    return N;
  if (typeof e.allowEmptyArrays < "u" && typeof e.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof e.encodeDotInKeys < "u" && typeof e.encodeDotInKeys != "boolean")
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  if (e.encoder !== null && typeof e.encoder < "u" && typeof e.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  var n = e.charset || N.charset;
  if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var i = We.default;
  if (typeof e.format < "u") {
    if (!zu.call(We.formatters, e.format))
      throw new TypeError("Unknown format option provided.");
    i = e.format;
  }
  var t = We.formatters[i], r = N.filter;
  (typeof e.filter == "function" || K(e.filter)) && (r = e.filter);
  var o;
  if (e.arrayFormat in no ? o = e.arrayFormat : "indices" in e ? o = e.indices ? "indices" : "repeat" : o = N.arrayFormat, "commaRoundTrip" in e && typeof e.commaRoundTrip != "boolean")
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  var s = typeof e.allowDots > "u" ? e.encodeDotInKeys === !0 ? !0 : N.allowDots : !!e.allowDots;
  return {
    addQueryPrefix: typeof e.addQueryPrefix == "boolean" ? e.addQueryPrefix : N.addQueryPrefix,
    allowDots: s,
    allowEmptyArrays: typeof e.allowEmptyArrays == "boolean" ? !!e.allowEmptyArrays : N.allowEmptyArrays,
    arrayFormat: o,
    charset: n,
    charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : N.charsetSentinel,
    commaRoundTrip: e.commaRoundTrip,
    delimiter: typeof e.delimiter > "u" ? N.delimiter : e.delimiter,
    encode: typeof e.encode == "boolean" ? e.encode : N.encode,
    encodeDotInKeys: typeof e.encodeDotInKeys == "boolean" ? e.encodeDotInKeys : N.encodeDotInKeys,
    encoder: typeof e.encoder == "function" ? e.encoder : N.encoder,
    encodeValuesOnly: typeof e.encodeValuesOnly == "boolean" ? e.encodeValuesOnly : N.encodeValuesOnly,
    filter: r,
    format: i,
    formatter: t,
    serializeDate: typeof e.serializeDate == "function" ? e.serializeDate : N.serializeDate,
    skipNulls: typeof e.skipNulls == "boolean" ? e.skipNulls : N.skipNulls,
    sort: typeof e.sort == "function" ? e.sort : null,
    strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : N.strictNullHandling
  };
}, Uu = function(a, e) {
  var n = a, i = Mu(e), t, r;
  typeof i.filter == "function" ? (r = i.filter, n = r("", n)) : K(i.filter) && (r = i.filter, t = r);
  var o = [];
  if (typeof n != "object" || n === null)
    return "";
  var s = no[i.arrayFormat], c = s === "comma" && i.commaRoundTrip;
  t || (t = Object.keys(n)), i.sort && t.sort(i.sort);
  for (var u = ao(), p = 0; p < t.length; ++p) {
    var f = t[p];
    i.skipNulls && n[f] === null || io(o, Lu(
      n[f],
      f,
      s,
      c,
      i.allowEmptyArrays,
      i.strictNullHandling,
      i.skipNulls,
      i.encodeDotInKeys,
      i.encode ? i.encoder : null,
      i.filter,
      i.sort,
      i.allowDots,
      i.serializeDate,
      i.format,
      i.formatter,
      i.encodeValuesOnly,
      i.charset,
      u
    ));
  }
  var l = o.join(i.delimiter), x = i.addQueryPrefix === !0 ? "?" : "";
  return i.charsetSentinel && (i.charset === "iso-8859-1" ? x += "utf8=%26%2310003%3B&" : x += "utf8=%E2%9C%93&"), l.length > 0 ? x + l : "";
}, Ae = eo, Vn = Object.prototype.hasOwnProperty, Hu = Array.isArray, z = {
  allowDots: !1,
  allowEmptyArrays: !1,
  allowPrototypes: !1,
  allowSparse: !1,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: !1,
  comma: !1,
  decodeDotInKeys: !1,
  decoder: Ae.decode,
  delimiter: "&",
  depth: 5,
  duplicates: "combine",
  ignoreQueryPrefix: !1,
  interpretNumericEntities: !1,
  parameterLimit: 1e3,
  parseArrays: !0,
  plainObjects: !1,
  strictDepth: !1,
  strictNullHandling: !1
}, Gu = function(a) {
  return a.replace(/&#(\d+);/g, function(e, n) {
    return String.fromCharCode(parseInt(n, 10));
  });
}, to = function(a, e) {
  return a && typeof a == "string" && e.comma && a.indexOf(",") > -1 ? a.split(",") : a;
}, Wu = "utf8=%26%2310003%3B", Vu = "utf8=%E2%9C%93", Xu = function(e, n) {
  var i = { __proto__: null }, t = n.ignoreQueryPrefix ? e.replace(/^\?/, "") : e;
  t = t.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  var r = n.parameterLimit === 1 / 0 ? void 0 : n.parameterLimit, o = t.split(n.delimiter, r), s = -1, c, u = n.charset;
  if (n.charsetSentinel)
    for (c = 0; c < o.length; ++c)
      o[c].indexOf("utf8=") === 0 && (o[c] === Vu ? u = "utf-8" : o[c] === Wu && (u = "iso-8859-1"), s = c, c = o.length);
  for (c = 0; c < o.length; ++c)
    if (c !== s) {
      var p = o[c], f = p.indexOf("]="), l = f === -1 ? p.indexOf("=") : f + 1, x, v;
      l === -1 ? (x = n.decoder(p, z.decoder, u, "key"), v = n.strictNullHandling ? null : "") : (x = n.decoder(p.slice(0, l), z.decoder, u, "key"), v = Ae.maybeMap(
        to(p.slice(l + 1), n),
        function(m) {
          return n.decoder(m, z.decoder, u, "value");
        }
      )), v && n.interpretNumericEntities && u === "iso-8859-1" && (v = Gu(v)), p.indexOf("[]=") > -1 && (v = Hu(v) ? [v] : v);
      var d = Vn.call(i, x);
      d && n.duplicates === "combine" ? i[x] = Ae.combine(i[x], v) : (!d || n.duplicates === "last") && (i[x] = v);
    }
  return i;
}, Zu = function(a, e, n, i) {
  for (var t = i ? e : to(e, n), r = a.length - 1; r >= 0; --r) {
    var o, s = a[r];
    if (s === "[]" && n.parseArrays)
      o = n.allowEmptyArrays && (t === "" || n.strictNullHandling && t === null) ? [] : [].concat(t);
    else {
      o = n.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var c = s.charAt(0) === "[" && s.charAt(s.length - 1) === "]" ? s.slice(1, -1) : s, u = n.decodeDotInKeys ? c.replace(/%2E/g, ".") : c, p = parseInt(u, 10);
      !n.parseArrays && u === "" ? o = { 0: t } : !isNaN(p) && s !== u && String(p) === u && p >= 0 && n.parseArrays && p <= n.arrayLimit ? (o = [], o[p] = t) : u !== "__proto__" && (o[u] = t);
    }
    t = o;
  }
  return t;
}, Qu = function(e, n, i, t) {
  if (e) {
    var r = i.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e, o = /(\[[^[\]]*])/, s = /(\[[^[\]]*])/g, c = i.depth > 0 && o.exec(r), u = c ? r.slice(0, c.index) : r, p = [];
    if (u) {
      if (!i.plainObjects && Vn.call(Object.prototype, u) && !i.allowPrototypes)
        return;
      p.push(u);
    }
    for (var f = 0; i.depth > 0 && (c = s.exec(r)) !== null && f < i.depth; ) {
      if (f += 1, !i.plainObjects && Vn.call(Object.prototype, c[1].slice(1, -1)) && !i.allowPrototypes)
        return;
      p.push(c[1]);
    }
    if (c) {
      if (i.strictDepth === !0)
        throw new RangeError("Input depth exceeded depth option of " + i.depth + " and strictDepth is true");
      p.push("[" + r.slice(c.index) + "]");
    }
    return Zu(p, n, i, t);
  }
}, Ju = function(e) {
  if (!e)
    return z;
  if (typeof e.allowEmptyArrays < "u" && typeof e.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof e.decodeDotInKeys < "u" && typeof e.decodeDotInKeys != "boolean")
    throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
  if (e.decoder !== null && typeof e.decoder < "u" && typeof e.decoder != "function")
    throw new TypeError("Decoder has to be a function.");
  if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var n = typeof e.charset > "u" ? z.charset : e.charset, i = typeof e.duplicates > "u" ? z.duplicates : e.duplicates;
  if (i !== "combine" && i !== "first" && i !== "last")
    throw new TypeError("The duplicates option must be either combine, first, or last");
  var t = typeof e.allowDots > "u" ? e.decodeDotInKeys === !0 ? !0 : z.allowDots : !!e.allowDots;
  return {
    allowDots: t,
    allowEmptyArrays: typeof e.allowEmptyArrays == "boolean" ? !!e.allowEmptyArrays : z.allowEmptyArrays,
    allowPrototypes: typeof e.allowPrototypes == "boolean" ? e.allowPrototypes : z.allowPrototypes,
    allowSparse: typeof e.allowSparse == "boolean" ? e.allowSparse : z.allowSparse,
    arrayLimit: typeof e.arrayLimit == "number" ? e.arrayLimit : z.arrayLimit,
    charset: n,
    charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : z.charsetSentinel,
    comma: typeof e.comma == "boolean" ? e.comma : z.comma,
    decodeDotInKeys: typeof e.decodeDotInKeys == "boolean" ? e.decodeDotInKeys : z.decodeDotInKeys,
    decoder: typeof e.decoder == "function" ? e.decoder : z.decoder,
    delimiter: typeof e.delimiter == "string" || Ae.isRegExp(e.delimiter) ? e.delimiter : z.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof e.depth == "number" || e.depth === !1 ? +e.depth : z.depth,
    duplicates: i,
    ignoreQueryPrefix: e.ignoreQueryPrefix === !0,
    interpretNumericEntities: typeof e.interpretNumericEntities == "boolean" ? e.interpretNumericEntities : z.interpretNumericEntities,
    parameterLimit: typeof e.parameterLimit == "number" ? e.parameterLimit : z.parameterLimit,
    parseArrays: e.parseArrays !== !1,
    plainObjects: typeof e.plainObjects == "boolean" ? e.plainObjects : z.plainObjects,
    strictDepth: typeof e.strictDepth == "boolean" ? !!e.strictDepth : z.strictDepth,
    strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : z.strictNullHandling
  };
}, Ku = function(a, e) {
  var n = Ju(e);
  if (a === "" || a === null || typeof a > "u")
    return n.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var i = typeof a == "string" ? Xu(a, n) : a, t = n.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, r = Object.keys(i), o = 0; o < r.length; ++o) {
    var s = r[o], c = Qu(s, i[s], n, typeof a == "string");
    t = Ae.merge(t, c, n);
  }
  return n.allowSparse === !0 ? t : Ae.compact(t);
}, Yu = Uu, ed = Ku, ad = pi, li = {
  formats: ad,
  parse: ed,
  stringify: Yu
};
/*!
 * body-parser
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var $n, It;
function nd() {
  if (It) return $n;
  It = 1;
  var a = Qe(), e = Re, n = Ie, i = Z("body-parser:urlencoded"), t = ne("body-parser"), r = Da(), o = Je;
  $n = c;
  var s = /* @__PURE__ */ Object.create(null);
  function c(d) {
    var m = d || {};
    m.extended === void 0 && t("undefined extended: provide extended option");
    var h = m.extended !== !1, g = m.inflate !== !1, b = typeof m.limit != "number" ? a.parse(m.limit || "100kb") : m.limit, y = m.type || "application/x-www-form-urlencoded", w = m.verify || !1, k = typeof m.depth != "number" ? Number(m.depth || 32) : m.depth;
    if (w !== !1 && typeof w != "function")
      throw new TypeError("option verify must be function");
    var A = h ? u(m) : x(m), _ = typeof y != "function" ? v(y) : y;
    function E(S) {
      return S.length ? A(S) : {};
    }
    return function(j, T, C) {
      if (j._body) {
        i("body already parsed"), C();
        return;
      }
      if (j.body = j.body || {}, !o.hasBody(j)) {
        i("skip empty body"), C();
        return;
      }
      if (i("content-type %j", j.headers["content-type"]), !_(j)) {
        i("skip parsing"), C();
        return;
      }
      var B = p(j) || "utf-8";
      if (B !== "utf-8") {
        i("invalid charset"), C(n(415, 'unsupported charset "' + B.toUpperCase() + '"', {
          charset: B,
          type: "charset.unsupported"
        }));
        return;
      }
      r(j, T, C, E, i, {
        debug: i,
        encoding: B,
        inflate: g,
        limit: b,
        verify: w,
        depth: k
      });
    };
  }
  function u(d) {
    var m = d.parameterLimit !== void 0 ? d.parameterLimit : 1e3, h = typeof d.depth != "number" ? Number(d.depth || 32) : d.depth, g = l("qs");
    if (isNaN(m) || m < 1)
      throw new TypeError("option parameterLimit must be a positive number");
    if (isNaN(h) || h < 0)
      throw new TypeError("option depth must be a zero or a positive number");
    return isFinite(m) && (m = m | 0), function(y) {
      var w = f(y, m);
      if (w === void 0)
        throw i("too many parameters"), n(413, "too many parameters", {
          type: "parameters.too.many"
        });
      var k = Math.max(100, w);
      i("parse extended urlencoding");
      try {
        return g(y, {
          allowPrototypes: !0,
          arrayLimit: k,
          depth: h,
          strictDepth: !0,
          parameterLimit: m
        });
      } catch (A) {
        throw A instanceof RangeError ? n(400, "The input exceeded the depth", {
          type: "querystring.parse.rangeError"
        }) : A;
      }
    };
  }
  function p(d) {
    try {
      return (e.parse(d).parameters.charset || "").toLowerCase();
    } catch {
      return;
    }
  }
  function f(d, m) {
    for (var h = 0, g = 0; (g = d.indexOf("&", g)) !== -1; )
      if (h++, g++, h === m)
        return;
    return h;
  }
  function l(d) {
    var m = s[d];
    if (m !== void 0)
      return m.parse;
    switch (d) {
      case "qs":
        m = li;
        break;
      case "querystring":
        m = hr;
        break;
    }
    return s[d] = m, m.parse;
  }
  function x(d) {
    var m = d.parameterLimit !== void 0 ? d.parameterLimit : 1e3, h = l("querystring");
    if (isNaN(m) || m < 1)
      throw new TypeError("option parameterLimit must be a positive number");
    return isFinite(m) && (m = m | 0), function(b) {
      var y = f(b, m);
      if (y === void 0)
        throw i("too many parameters"), n(413, "too many parameters", {
          type: "parameters.too.many"
        });
      return i("parse urlencoding"), h(b, void 0, void 0, { maxKeys: m });
    };
  }
  function v(d) {
    return function(h) {
      return !!o(h, d);
    };
  }
  return $n;
}
/*!
 * body-parser
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
(function(a, e) {
  var n = ne("body-parser"), i = /* @__PURE__ */ Object.create(null);
  e = a.exports = n.function(
    t,
    "bodyParser: use individual json/urlencoded middlewares"
  ), Object.defineProperty(e, "json", {
    configurable: !0,
    enumerable: !0,
    get: r("json")
  }), Object.defineProperty(e, "raw", {
    configurable: !0,
    enumerable: !0,
    get: r("raw")
  }), Object.defineProperty(e, "text", {
    configurable: !0,
    enumerable: !0,
    get: r("text")
  }), Object.defineProperty(e, "urlencoded", {
    configurable: !0,
    enumerable: !0,
    get: r("urlencoded")
  });
  function t(s) {
    var c = Object.create(s || null, {
      type: {
        configurable: !0,
        enumerable: !0,
        value: void 0,
        writable: !0
      }
    }), u = e.urlencoded(c), p = e.json(c);
    return function(l, x, v) {
      p(l, x, function(d) {
        if (d) return v(d);
        u(l, x, v);
      });
    };
  }
  function r(s) {
    return function() {
      return o(s);
    };
  }
  function o(s) {
    var c = i[s];
    if (c !== void 0)
      return c;
    switch (s) {
      case "json":
        c = lp();
        break;
      case "raw":
        c = up();
        break;
      case "text":
        c = dp();
        break;
      case "urlencoded":
        c = nd();
        break;
    }
    return i[s] = c;
  }
})(Dn, Dn.exports);
var id = Dn.exports;
/*!
 * merge-descriptors
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var td = od, rd = Object.prototype.hasOwnProperty;
function od(a, e, n) {
  if (!a)
    throw new TypeError("argument dest is required");
  if (!e)
    throw new TypeError("argument src is required");
  return n === void 0 && (n = !0), Object.getOwnPropertyNames(e).forEach(function(t) {
    if (!(!n && rd.call(a, t))) {
      var r = Object.getOwnPropertyDescriptor(e, t);
      Object.defineProperty(a, t, r);
    }
  }), a;
}
var ro = { exports: {} };
/*!
 * encodeurl
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */
var ui = ld, sd = /(?:[^\x21\x23-\x3B\x3D\x3F-\x5F\x61-\x7A\x7C\x7E]|%(?:[^0-9A-Fa-f]|[0-9A-Fa-f][^0-9A-Fa-f]|$))+/g, cd = /(^|[^\uD800-\uDBFF])[\uDC00-\uDFFF]|[\uD800-\uDBFF]([^\uDC00-\uDFFF]|$)/g, pd = "$1�$2";
function ld(a) {
  return String(a).replace(cd, pd).replace(sd, encodeURI);
}
/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */
var ud = /["'&<>]/, Ha = dd;
function dd(a) {
  var e = "" + a, n = ud.exec(e);
  if (!n)
    return e;
  var i, t = "", r = 0, o = 0;
  for (r = n.index; r < e.length; r++) {
    switch (e.charCodeAt(r)) {
      case 34:
        i = "&quot;";
        break;
      case 38:
        i = "&amp;";
        break;
      case 39:
        i = "&#39;";
        break;
      case 60:
        i = "&lt;";
        break;
      case 62:
        i = "&gt;";
        break;
      default:
        continue;
    }
    o !== r && (t += e.substring(o, r)), o = r + 1, t += i;
  }
  return o !== r ? t + e.substring(o, r) : t;
}
var di = { exports: {} };
/*!
 * parseurl
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */
var oo = gr, qt = oo.parse, Ca = oo.Url;
di.exports = so;
di.exports.original = fd;
function so(a) {
  var e = a.url;
  if (e !== void 0) {
    var n = a._parsedUrl;
    return po(e, n) ? n : (n = co(e), n._raw = e, a._parsedUrl = n);
  }
}
function fd(a) {
  var e = a.originalUrl;
  if (typeof e != "string")
    return so(a);
  var n = a._parsedOriginalUrl;
  return po(e, n) ? n : (n = co(e), n._raw = e, a._parsedOriginalUrl = n);
}
function co(a) {
  if (typeof a != "string" || a.charCodeAt(0) !== 47)
    return qt(a);
  for (var e = a, n = null, i = null, t = 1; t < a.length; t++)
    switch (a.charCodeAt(t)) {
      case 63:
        i === null && (e = a.substring(0, t), n = a.substring(t + 1), i = a.substring(t));
        break;
      case 9:
      case 10:
      case 12:
      case 13:
      case 32:
      case 35:
      case 160:
      case 65279:
        return qt(a);
    }
  var r = Ca !== void 0 ? new Ca() : {};
  return r.path = a, r.href = a, r.pathname = e, i !== null && (r.query = n, r.search = i), r;
}
function po(a, e) {
  return typeof e == "object" && e !== null && (Ca === void 0 || e instanceof Ca) && e._raw === a;
}
var aa = di.exports;
/*!
 * finalhandler
 * Copyright(c) 2014-2022 Douglas Christopher Wilson
 * MIT Licensed
 */
var Rn = Z("finalhandler"), md = ui, vd = Ha, lo = Ba, xd = aa, uo = za, hd = ei, gd = /\x20{2}/g, bd = /\n/g, yd = typeof setImmediate == "function" ? setImmediate : function(a) {
  process.nextTick(a.bind.apply(a, arguments));
}, wd = lo.isFinished;
function kd(a) {
  var e = vd(a).replace(bd, "<br>").replace(gd, " &nbsp;");
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>` + e + `</pre>
</body>
</html>
`;
}
var Ed = Sd;
function Sd(a, e, n) {
  var i = n || {}, t = i.env || process.env.NODE_ENV || "development", r = i.onerror;
  return function(o) {
    var s, c, u;
    if (!o && Ft(e)) {
      Rn("cannot 404 after headers sent");
      return;
    }
    if (o ? (u = _d(o), u === void 0 ? u = Cd(e) : s = jd(o), c = Ad(o, u, t)) : (u = 404, c = "Cannot " + a.method + " " + md(Td(a))), Rn("default %s", u), o && r && yd(r, o, a, e), Ft(e)) {
      Rn("cannot %d after headers sent", u), a.socket && a.socket.destroy();
      return;
    }
    Od(a, e, u, s, c);
  };
}
function jd(a) {
  if (!(!a.headers || typeof a.headers != "object")) {
    for (var e = /* @__PURE__ */ Object.create(null), n = Object.keys(a.headers), i = 0; i < n.length; i++) {
      var t = n[i];
      e[t] = a.headers[t];
    }
    return e;
  }
}
function Ad(a, e, n) {
  var i;
  return n !== "production" && (i = a.stack, !i && typeof a.toString == "function" && (i = a.toString())), i || uo.message[e];
}
function _d(a) {
  if (typeof a.status == "number" && a.status >= 400 && a.status < 600)
    return a.status;
  if (typeof a.statusCode == "number" && a.statusCode >= 400 && a.statusCode < 600)
    return a.statusCode;
}
function Td(a) {
  try {
    return xd.original(a).pathname;
  } catch {
    return "resource";
  }
}
function Cd(a) {
  var e = a.statusCode;
  return (typeof e != "number" || e < 400 || e > 599) && (e = 500), e;
}
function Ft(a) {
  return typeof a.headersSent != "boolean" ? !!a._header : a.headersSent;
}
function Od(a, e, n, i, t) {
  function r() {
    var o = kd(t);
    if (e.statusCode = n, a.httpVersionMajor < 2 && (e.statusMessage = uo.message[n]), e.removeHeader("Content-Encoding"), e.removeHeader("Content-Language"), e.removeHeader("Content-Range"), Pd(e, i), e.setHeader("Content-Security-Policy", "default-src 'none'"), e.setHeader("X-Content-Type-Options", "nosniff"), e.setHeader("Content-Type", "text/html; charset=utf-8"), e.setHeader("Content-Length", Buffer.byteLength(o, "utf8")), a.method === "HEAD") {
      e.end();
      return;
    }
    e.end(o, "utf8");
  }
  if (wd(a)) {
    r();
    return;
  }
  hd(a), lo(a, r), a.resume();
}
function Pd(a, e) {
  if (e)
    for (var n = Object.keys(e), i = 0; i < n.length; i++) {
      var t = n[i];
      a.setHeader(t, e[t]);
    }
}
var fo = { exports: {} }, Ga = $d;
function mo(a, e, n) {
  for (var i = 0; i < a.length; i++) {
    var t = a[i];
    n > 0 && Array.isArray(t) ? mo(t, e, n - 1) : e.push(t);
  }
  return e;
}
function vo(a, e) {
  for (var n = 0; n < a.length; n++) {
    var i = a[n];
    Array.isArray(i) ? vo(i, e) : e.push(i);
  }
  return e;
}
function $d(a, e) {
  return e == null ? vo(a, []) : mo(a, [], e);
}
var Rd = xo, zt = /\\.|\((?:\?<(.*?)>)?(?!\?)/g;
function xo(a, e, n) {
  n = n || {}, e = e || [];
  var i = n.strict, t = n.end !== !1, r = n.sensitive ? "" : "i", o = n.lookahead !== !1, s = 0, c = e.length, u = 0, p = 0, f = 0, l = "", x;
  if (a instanceof RegExp) {
    for (; x = zt.exec(a.source); )
      x[0][0] !== "\\" && e.push({
        name: x[1] || p++,
        optional: !1,
        offset: x.index
      });
    return a;
  }
  if (Array.isArray(a))
    return a = a.map(function(v) {
      return xo(v, e, n).source;
    }), new RegExp(a.join("|"), r);
  if (typeof a != "string")
    throw new TypeError("path must be a string, array of strings, or regular expression");
  for (a = a.replace(
    /\\.|(\/)?(\.)?:(\w+)(\(.*?\))?(\*)?(\?)?|[.*]|\/\(/g,
    function(v, d, m, h, g, b, y, w) {
      if (v[0] === "\\")
        return l += v, f += 2, v;
      if (v === ".")
        return l += "\\.", s += 1, f += 1, "\\.";
      if (d || m ? l = "" : l += a.slice(f, w), f = w + v.length, v === "*")
        return s += 3, "(.*)";
      if (v === "/(")
        return l += "/", s += 2, "/(?:";
      d = d || "", m = m ? "\\." : "", y = y || "", g = g ? g.replace(/\\.|\*/, function(A) {
        return A === "*" ? "(.*)" : A;
      }) : l ? "((?:(?!/|" + l + ").)+?)" : "([^/" + m + "]+?)", e.push({
        name: h,
        optional: !!y,
        offset: w + s
      });
      var k = "(?:" + m + d + g + (b ? "((?:[/" + m + "].+?)?)" : "") + ")" + y;
      return s += k.length - v.length, k;
    }
  ); x = zt.exec(a); )
    x[0][0] !== "\\" && ((c + u === e.length || e[c + u].offset > x.index) && e.splice(c + u, 0, {
      name: p++,
      // Unnamed matching groups must be consistently linear.
      optional: !1,
      offset: x.index
    }), u++);
  return a += i ? "" : a[a.length - 1] === "/" ? "?" : "/?", t ? a += "$" : a[a.length - 1] !== "/" && (a += o ? "(?=/|$)" : "(?:/|$)"), new RegExp("^" + a, r);
}
/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var Id = Rd, qd = Z("express:router:layer"), Fd = Object.prototype.hasOwnProperty, ho = _e;
function _e(a, e, n) {
  if (!(this instanceof _e))
    return new _e(a, e, n);
  qd("new %o", a);
  var i = e || {};
  this.handle = n, this.name = n.name || "<anonymous>", this.params = void 0, this.path = void 0, this.regexp = Id(a, this.keys = [], i), this.regexp.fast_star = a === "*", this.regexp.fast_slash = a === "/" && i.end === !1;
}
_e.prototype.handle_error = function(e, n, i, t) {
  var r = this.handle;
  if (r.length !== 4)
    return t(e);
  try {
    r(e, n, i, t);
  } catch (o) {
    t(o);
  }
};
_e.prototype.handle_request = function(e, n, i) {
  var t = this.handle;
  if (t.length > 3)
    return i();
  try {
    t(e, n, i);
  } catch (r) {
    i(r);
  }
};
_e.prototype.match = function(e) {
  var n;
  if (e != null) {
    if (this.regexp.fast_slash)
      return this.params = {}, this.path = "", !0;
    if (this.regexp.fast_star)
      return this.params = { 0: Bt(e) }, this.path = e, !0;
    n = this.regexp.exec(e);
  }
  if (!n)
    return this.params = void 0, this.path = void 0, !1;
  this.params = {}, this.path = n[0];
  for (var i = this.keys, t = this.params, r = 1; r < n.length; r++) {
    var o = i[r - 1], s = o.name, c = Bt(n[r]);
    (c !== void 0 || !Fd.call(t, s)) && (t[s] = c);
  }
  return !0;
};
function Bt(a) {
  if (typeof a != "string" || a.length === 0)
    return a;
  try {
    return decodeURIComponent(a);
  } catch (e) {
    throw e instanceof URIError && (e.message = "Failed to decode param '" + a + "'", e.status = e.statusCode = 400), e;
  }
}
/*!
 * methods
 * Copyright(c) 2013-2014 TJ Holowaychuk
 * Copyright(c) 2015-2016 Douglas Christopher Wilson
 * MIT Licensed
 */
var Dt = Ia, fi = zd() || Bd();
function zd() {
  return Dt.METHODS && Dt.METHODS.map(function(e) {
    return e.toLowerCase();
  });
}
function Bd() {
  return [
    "get",
    "post",
    "put",
    "head",
    "delete",
    "options",
    "trace",
    "copy",
    "lock",
    "mkcol",
    "move",
    "purge",
    "propfind",
    "proppatch",
    "unlock",
    "report",
    "mkactivity",
    "checkout",
    "merge",
    "m-search",
    "notify",
    "subscribe",
    "unsubscribe",
    "patch",
    "search",
    "connect"
  ];
}
/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var go = Z("express:router:route"), bo = Ga, yo = ho, Dd = fi, wo = Array.prototype.slice, ko = Object.prototype.toString, Eo = Be;
function Be(a) {
  this.path = a, this.stack = [], go("new %o", a), this.methods = {};
}
Be.prototype._handles_method = function(e) {
  if (this.methods._all)
    return !0;
  var n = typeof e == "string" ? e.toLowerCase() : e;
  return n === "head" && !this.methods.head && (n = "get"), !!this.methods[n];
};
Be.prototype._options = function() {
  var e = Object.keys(this.methods);
  this.methods.get && !this.methods.head && e.push("head");
  for (var n = 0; n < e.length; n++)
    e[n] = e[n].toUpperCase();
  return e;
};
Be.prototype.dispatch = function(e, n, i) {
  var t = 0, r = this.stack, o = 0;
  if (r.length === 0)
    return i();
  var s = typeof e.method == "string" ? e.method.toLowerCase() : e.method;
  s === "head" && !this.methods.head && (s = "get"), e.route = this, c();
  function c(u) {
    if (u && u === "route")
      return i();
    if (u && u === "router")
      return i(u);
    if (++o > 100)
      return setImmediate(c, u);
    var p = r[t++];
    if (!p)
      return i(u);
    p.method && p.method !== s ? c(u) : u ? p.handle_error(u, e, n, c) : p.handle_request(e, n, c), o = 0;
  }
};
Be.prototype.all = function() {
  for (var e = bo(wo.call(arguments)), n = 0; n < e.length; n++) {
    var i = e[n];
    if (typeof i != "function") {
      var t = ko.call(i), r = "Route.all() requires a callback function but got a " + t;
      throw new TypeError(r);
    }
    var o = yo("/", {}, i);
    o.method = void 0, this.methods._all = !0, this.stack.push(o);
  }
  return this;
};
Dd.forEach(function(a) {
  Be.prototype[a] = function() {
    for (var e = bo(wo.call(arguments)), n = 0; n < e.length; n++) {
      var i = e[n];
      if (typeof i != "function") {
        var t = ko.call(i), r = "Route." + a + "() requires a callback function but got a " + t;
        throw new Error(r);
      }
      go("%s %o", a, this.path);
      var o = yo("/", {}, i);
      o.method = a, this.methods[a] = !0, this.stack.push(o);
    }
    return this;
  };
});
var So = { exports: {} };
(function(a, e) {
  a.exports = function(n, i) {
    if (n && i)
      for (var t in i)
        n[t] = i[t];
    return n;
  };
})(So);
var Wa = So.exports;
/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var Nd = Eo, jo = ho, Ld = fi, In = Wa, ya = Z("express:router"), Nt = ne("express"), Md = Ga, Ud = aa, Hd = Fa, Gd = /^\[object (\S+)\]$/, Ao = Array.prototype.slice, Wd = Object.prototype.toString, me = fo.exports = function(a) {
  var e = a || {};
  function n(i, t, r) {
    n.handle(i, t, r);
  }
  return Hd(n, me), n.params = {}, n._params = [], n.caseSensitive = e.caseSensitive, n.mergeParams = e.mergeParams, n.strict = e.strict, n.stack = [], n;
};
me.param = function(e, n) {
  if (typeof e == "function") {
    Nt("router.param(fn): Refactor to use path params"), this._params.push(e);
    return;
  }
  var i = this._params, t = i.length, r;
  e[0] === ":" && (Nt("router.param(" + JSON.stringify(e) + ", fn): Use router.param(" + JSON.stringify(e.slice(1)) + ", fn) instead"), e = e.slice(1));
  for (var o = 0; o < t; ++o)
    (r = i[o](e, n)) && (n = r);
  if (typeof n != "function")
    throw new Error("invalid param() call for " + e + ", got " + n);
  return (this.params[e] = this.params[e] || []).push(n), this;
};
me.handle = function(e, n, i) {
  var t = this;
  ya("dispatching %s %s", e.method, e.url);
  var r = 0, o = Zd(e.url) || "", s = "", c = !1, u = 0, p = {}, f = [], l = t.stack, x = e.params, v = e.baseUrl || "", d = Yd(i, e, "baseUrl", "next", "params");
  e.next = m, e.method === "OPTIONS" && (d = af(d, function(g, b) {
    if (b || f.length === 0) return g(b);
    ef(n, f, g);
  })), e.baseUrl = v, e.originalUrl = e.originalUrl || e.url, m();
  function m(g) {
    var b = g === "route" ? null : g;
    if (c && (e.url = e.url.slice(1), c = !1), s.length !== 0 && (e.baseUrl = v, e.url = o + s + e.url.slice(o.length), s = ""), b === "router") {
      setImmediate(d, null);
      return;
    }
    if (r >= l.length) {
      setImmediate(d, b);
      return;
    }
    if (++u > 100)
      return setImmediate(m, g);
    var y = Xd(e);
    if (y == null)
      return d(b);
    for (var w, k, A; k !== !0 && r < l.length; )
      if (w = l[r++], k = Jd(w, y), A = w.route, typeof k != "boolean" && (b = b || k), k === !0 && A) {
        if (b) {
          k = !1;
          continue;
        }
        var _ = e.method, E = A._handles_method(_);
        !E && _ === "OPTIONS" && Vd(f, A._options()), !E && _ !== "HEAD" && (k = !1);
      }
    if (k !== !0)
      return d(b);
    A && (e.route = A), e.params = t.mergeParams ? Kd(w.params, x) : w.params;
    var S = w.path;
    t.process_params(w, p, e, n, function(j) {
      j ? m(b || j) : A ? w.handle_request(e, n, m) : h(w, b, S, y), u = 0;
    });
  }
  function h(g, b, y, w) {
    if (y.length !== 0) {
      if (y !== w.slice(0, y.length)) {
        m(b);
        return;
      }
      var k = w[y.length];
      if (k && k !== "/" && k !== ".") return m(b);
      ya("trim prefix (%s) from url %s", y, e.url), s = y, e.url = o + e.url.slice(o.length + s.length), !o && e.url[0] !== "/" && (e.url = "/" + e.url, c = !0), e.baseUrl = v + (s[s.length - 1] === "/" ? s.substring(0, s.length - 1) : s);
    }
    ya("%s %s : %s", g.name, y, e.originalUrl), b ? g.handle_error(b, e, n, m) : g.handle_request(e, n, m);
  }
};
me.process_params = function(e, n, i, t, r) {
  var o = this.params, s = e.keys;
  if (!s || s.length === 0)
    return r();
  var c = 0, u, p = 0, f, l, x, v;
  function d(h) {
    if (h)
      return r(h);
    if (c >= s.length)
      return r();
    if (p = 0, f = s[c++], u = f.name, l = i.params[u], x = o[u], v = n[u], l === void 0 || !x)
      return d();
    if (v && (v.match === l || v.error && v.error !== "route"))
      return i.params[u] = v.value, d(v.error);
    n[u] = v = {
      error: null,
      match: l,
      value: l
    }, m();
  }
  function m(h) {
    var g = x[p++];
    if (v.value = i.params[f.name], h) {
      v.error = h, d(h);
      return;
    }
    if (!g) return d();
    try {
      g(i, t, m, l, f.name);
    } catch (b) {
      m(b);
    }
  }
  d();
};
me.use = function(e) {
  var n = 0, i = "/";
  if (typeof e != "function") {
    for (var t = e; Array.isArray(t) && t.length !== 0; )
      t = t[0];
    typeof t != "function" && (n = 1, i = e);
  }
  var r = Md(Ao.call(arguments, n));
  if (r.length === 0)
    throw new TypeError("Router.use() requires a middleware function");
  for (var o = 0; o < r.length; o++) {
    var e = r[o];
    if (typeof e != "function")
      throw new TypeError("Router.use() requires a middleware function but got a " + Qd(e));
    ya("use %o %s", i, e.name || "<anonymous>");
    var s = new jo(i, {
      sensitive: this.caseSensitive,
      strict: !1,
      end: !1
    }, e);
    s.route = void 0, this.stack.push(s);
  }
  return this;
};
me.route = function(e) {
  var n = new Nd(e), i = new jo(e, {
    sensitive: this.caseSensitive,
    strict: this.strict,
    end: !0
  }, n.dispatch.bind(n));
  return i.route = n, this.stack.push(i), n;
};
Ld.concat("all").forEach(function(a) {
  me[a] = function(e) {
    var n = this.route(e);
    return n[a].apply(n, Ao.call(arguments, 1)), this;
  };
});
function Vd(a, e) {
  for (var n = 0; n < e.length; n++) {
    var i = e[n];
    a.indexOf(i) === -1 && a.push(i);
  }
}
function Xd(a) {
  try {
    return Ud(a).pathname;
  } catch {
    return;
  }
}
function Zd(a) {
  if (!(typeof a != "string" || a.length === 0 || a[0] === "/")) {
    var e = a.indexOf("?"), n = e !== -1 ? e : a.length, i = a.slice(0, n).indexOf("://");
    return i !== -1 ? a.substring(0, a.indexOf("/", 3 + i)) : void 0;
  }
}
function Qd(a) {
  var e = typeof a;
  return e !== "object" ? e : Wd.call(a).replace(Gd, "$1");
}
function Jd(a, e) {
  try {
    return a.match(e);
  } catch (n) {
    return n;
  }
}
function Kd(a, e) {
  if (typeof e != "object" || !e)
    return a;
  var n = In({}, e);
  if (!(0 in a) || !(0 in e))
    return In(n, a);
  for (var i = 0, t = 0; i in a; )
    i++;
  for (; t in e; )
    t++;
  for (i--; i >= 0; i--)
    a[i + t] = a[i], i < t && delete a[i];
  return In(n, a);
}
function Yd(a, e) {
  for (var n = new Array(arguments.length - 2), i = new Array(arguments.length - 2), t = 0; t < n.length; t++)
    n[t] = arguments[t + 2], i[t] = e[n[t]];
  return function() {
    for (var r = 0; r < n.length; r++)
      e[n[r]] = i[r];
    return a.apply(this, arguments);
  };
}
function ef(a, e, n) {
  try {
    var i = e.join(",");
    a.set("Allow", i), a.send(i);
  } catch (t) {
    n(t);
  }
}
function af(a, e) {
  return function() {
    var i = new Array(arguments.length + 1);
    i[0] = a;
    for (var t = 0, r = arguments.length; t < r; t++)
      i[t + 1] = arguments[t];
    e.apply(this, i);
  };
}
var _o = fo.exports, To = {};
/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var Lt = Fa;
To.init = function(a) {
  return function(n, i, t) {
    a.enabled("x-powered-by") && i.setHeader("X-Powered-By", "Express"), n.res = i, i.req = n, n.next = t, Lt(n, a.request), Lt(i, a.response), i.locals = i.locals || /* @__PURE__ */ Object.create(null), t();
  };
};
/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var qn, Mt;
function Co() {
  if (Mt) return qn;
  Mt = 1;
  var a = Wa, e = aa, n = li;
  return qn = function(t) {
    var r = a({}, t), o = n.parse;
    return typeof t == "function" && (o = t, r = void 0), r !== void 0 && r.allowPrototypes === void 0 && (r.allowPrototypes = !0), function(c, u, p) {
      if (!c.query) {
        var f = e(c).query;
        c.query = o(f, r);
      }
      p();
    };
  }, qn;
}
function nf(a) {
  throw new Error('Could not dynamically require "' + a + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var Va = Z("express:view"), na = ce, tf = $e, rf = na.dirname, Oo = na.basename, of = na.extname, Ut = na.join, sf = na.resolve, cf = Xa;
function Xa(a, e) {
  var n = e || {};
  if (this.defaultEngine = n.defaultEngine, this.ext = of(a), this.name = a, this.root = n.root, !this.ext && !this.defaultEngine)
    throw new Error("No default engine was specified and no extension was provided.");
  var i = a;
  if (this.ext || (this.ext = this.defaultEngine[0] !== "." ? "." + this.defaultEngine : this.defaultEngine, i += this.ext), !n.engines[this.ext]) {
    var t = this.ext.slice(1);
    Va('require "%s"', t);
    var r = nf(t).__express;
    if (typeof r != "function")
      throw new Error('Module "' + t + '" does not provide a view engine.');
    n.engines[this.ext] = r;
  }
  this.engine = n.engines[this.ext], this.path = this.lookup(i);
}
Xa.prototype.lookup = function(e) {
  var n, i = [].concat(this.root);
  Va('lookup "%s"', e);
  for (var t = 0; t < i.length && !n; t++) {
    var r = i[t], o = sf(r, e), s = rf(o), c = Oo(o);
    n = this.resolve(s, c);
  }
  return n;
};
Xa.prototype.render = function(e, n) {
  Va('render "%s"', this.path), this.engine(this.path, e, n);
};
Xa.prototype.resolve = function(e, n) {
  var i = this.ext, t = Ut(e, n), r = Ht(t);
  if (r && r.isFile() || (t = Ut(e, Oo(n, i), "index" + i), r = Ht(t), r && r.isFile()))
    return t;
};
function Ht(a) {
  Va('stat "%s"', a);
  try {
    return tf.statSync(a);
  } catch {
    return;
  }
}
var se = {}, Xn = { exports: {} };
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
(function(a, e) {
  var n = we, i = n.Buffer;
  function t(o, s) {
    for (var c in o)
      s[c] = o[c];
  }
  i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? a.exports = n : (t(n, e), e.Buffer = r);
  function r(o, s, c) {
    return i(o, s, c);
  }
  r.prototype = Object.create(i.prototype), t(i, r), r.from = function(o, s, c) {
    if (typeof o == "number")
      throw new TypeError("Argument must not be a number");
    return i(o, s, c);
  }, r.alloc = function(o, s, c) {
    if (typeof o != "number")
      throw new TypeError("Argument must be a number");
    var u = i(o);
    return s !== void 0 ? typeof c == "string" ? u.fill(s, c) : u.fill(s) : u.fill(0), u;
  }, r.allocUnsafe = function(o) {
    if (typeof o != "number")
      throw new TypeError("Argument must be a number");
    return i(o);
  }, r.allocUnsafeSlow = function(o) {
    if (typeof o != "number")
      throw new TypeError("Argument must be a number");
    return n.SlowBuffer(o);
  };
})(Xn, Xn.exports);
var mi = Xn.exports, vi = { exports: {} };
/*!
 * content-disposition
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */
vi.exports = bf;
vi.exports.parse = Ef;
var Gt = ce.basename, pf = mi.Buffer, lf = /[\x00-\x20"'()*,/:;<=>?@[\\\]{}\x7f]/g, uf = /%[0-9A-Fa-f]{2}/, df = /%([0-9A-Fa-f]{2})/g, Po = /[^\x20-\x7e\xa0-\xff]/g, ff = /\\([\u0000-\u007f])/g, mf = /([\\"])/g, Wt = /;[\x09\x20]*([!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*=[\x09\x20]*("(?:[\x20!\x23-\x5b\x5d-\x7e\x80-\xff]|\\[\x20-\x7e])*"|[!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*/g, vf = /^[\x20-\x7e\x80-\xff]+$/, xf = /^[!#$%&'*+.0-9A-Z^_`a-z|~-]+$/, hf = /^([A-Za-z0-9!#$%&+\-^_`{}~]+)'(?:[A-Za-z]{2,3}(?:-[A-Za-z]{3}){0,3}|[A-Za-z]{4,8}|)'((?:%[0-9A-Fa-f]{2}|[A-Za-z0-9!#$&+.^_`|~-])+)$/, gf = /^([!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*(?:$|;)/;
function bf(a, e) {
  var n = e || {}, i = n.type || "attachment", t = yf(a, n.fallback);
  return wf(new Ro(i, t));
}
function yf(a, e) {
  if (a !== void 0) {
    var n = {};
    if (typeof a != "string")
      throw new TypeError("filename must be a string");
    if (e === void 0 && (e = !0), typeof e != "string" && typeof e != "boolean")
      throw new TypeError("fallback must be a string or boolean");
    if (typeof e == "string" && Po.test(e))
      throw new TypeError("fallback must be ISO-8859-1 string");
    var i = Gt(a), t = vf.test(i), r = typeof e != "string" ? e && $o(i) : Gt(e), o = typeof r == "string" && r !== i;
    return (o || !t || uf.test(i)) && (n["filename*"] = i), (t || o) && (n.filename = o ? r : i), n;
  }
}
function wf(a) {
  var e = a.parameters, n = a.type;
  if (!n || typeof n != "string" || !xf.test(n))
    throw new TypeError("invalid type");
  var i = String(n).toLowerCase();
  if (e && typeof e == "object")
    for (var t, r = Object.keys(e).sort(), o = 0; o < r.length; o++) {
      t = r[o];
      var s = t.substr(-1) === "*" ? _f(e[t]) : Af(e[t]);
      i += "; " + t + "=" + s;
    }
  return i;
}
function kf(a) {
  var e = hf.exec(a);
  if (!e)
    throw new TypeError("invalid extended field value");
  var n = e[1].toLowerCase(), i = e[2], t, r = i.replace(df, Sf);
  switch (n) {
    case "iso-8859-1":
      t = $o(r);
      break;
    case "utf-8":
      t = pf.from(r, "binary").toString("utf8");
      break;
    default:
      throw new TypeError("unsupported charset in extended field");
  }
  return t;
}
function $o(a) {
  return String(a).replace(Po, "?");
}
function Ef(a) {
  if (!a || typeof a != "string")
    throw new TypeError("argument string is required");
  var e = gf.exec(a);
  if (!e)
    throw new TypeError("invalid type format");
  var n = e[0].length, i = e[1].toLowerCase(), t, r = [], o = {}, s;
  for (n = Wt.lastIndex = e[0].substr(-1) === ";" ? n - 1 : n; e = Wt.exec(a); ) {
    if (e.index !== n)
      throw new TypeError("invalid parameter format");
    if (n += e[0].length, t = e[1].toLowerCase(), s = e[2], r.indexOf(t) !== -1)
      throw new TypeError("invalid duplicate parameter");
    if (r.push(t), t.indexOf("*") + 1 === t.length) {
      t = t.slice(0, -1), s = kf(s), o[t] = s;
      continue;
    }
    typeof o[t] != "string" && (s[0] === '"' && (s = s.substr(1, s.length - 2).replace(ff, "$1")), o[t] = s);
  }
  if (n !== -1 && n !== a.length)
    throw new TypeError("invalid parameter format");
  return new Ro(i, o);
}
function Sf(a, e) {
  return String.fromCharCode(parseInt(e, 16));
}
function jf(a) {
  return "%" + String(a).charCodeAt(0).toString(16).toUpperCase();
}
function Af(a) {
  var e = String(a);
  return '"' + e.replace(mf, "\\$1") + '"';
}
function _f(a) {
  var e = String(a), n = encodeURIComponent(e).replace(lf, jf);
  return "UTF-8''" + n;
}
function Ro(a, e) {
  this.type = a, this.parameters = e;
}
var Io = vi.exports, xi = { exports: {} };
/*!
 * encodeurl
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */
var Tf = $f, Cf = /(?:[^\x21\x25\x26-\x3B\x3D\x3F-\x5B\x5D\x5F\x61-\x7A\x7E]|%(?:[^0-9A-Fa-f]|[0-9A-Fa-f][^0-9A-Fa-f]|$))+/g, Of = /(^|[^\uD800-\uDBFF])[\uDC00-\uDFFF]|[\uD800-\uDBFF]([^\uDC00-\uDFFF]|$)/g, Pf = "$1�$2";
function $f(a) {
  return String(a).replace(Of, Pf).replace(Cf, encodeURI);
}
/*!
 * etag
 * Copyright(c) 2014-2016 Douglas Christopher Wilson
 * MIT Licensed
 */
var qo = qf, Rf = br, Vt = $e.Stats, Xt = Object.prototype.toString;
function If(a) {
  if (a.length === 0)
    return '"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"';
  var e = Rf.createHash("sha1").update(a, "utf8").digest("base64").substring(0, 27), n = typeof a == "string" ? Buffer.byteLength(a, "utf8") : a.length;
  return '"' + n.toString(16) + "-" + e + '"';
}
function qf(a, e) {
  if (a == null)
    throw new TypeError("argument entity is required");
  var n = Ff(a), i = e && typeof e.weak == "boolean" ? e.weak : n;
  if (!n && typeof a != "string" && !Buffer.isBuffer(a))
    throw new TypeError("argument entity must be string, Buffer, or fs.Stats");
  var t = n ? zf(a) : If(a);
  return i ? "W/" + t : t;
}
function Ff(a) {
  return typeof Vt == "function" && a instanceof Vt ? !0 : a && typeof a == "object" && "ctime" in a && Xt.call(a.ctime) === "[object Date]" && "mtime" in a && Xt.call(a.mtime) === "[object Date]" && "ino" in a && typeof a.ino == "number" && "size" in a && typeof a.size == "number";
}
function zf(a) {
  var e = a.mtime.getTime().toString(16), n = a.size.toString(16);
  return '"' + n + "-" + e + '"';
}
/*!
 * fresh
 * Copyright(c) 2012 TJ Holowaychuk
 * Copyright(c) 2016-2017 Douglas Christopher Wilson
 * MIT Licensed
 */
var Bf = /(?:^|,)\s*?no-cache\s*?(?:,|$)/, Fo = Df;
function Df(a, e) {
  var n = a["if-modified-since"], i = a["if-none-match"];
  if (!n && !i)
    return !1;
  var t = a["cache-control"];
  if (t && Bf.test(t))
    return !1;
  if (i && i !== "*") {
    var r = e.etag;
    if (!r)
      return !1;
    for (var o = !0, s = Nf(i), c = 0; c < s.length; c++) {
      var u = s[c];
      if (u === r || u === "W/" + r || "W/" + u === r) {
        o = !1;
        break;
      }
    }
    if (o)
      return !1;
  }
  if (n) {
    var p = e["last-modified"], f = !p || !(Zt(p) <= Zt(n));
    if (f)
      return !1;
  }
  return !0;
}
function Zt(a) {
  var e = a && Date.parse(a);
  return typeof e == "number" ? e : NaN;
}
function Nf(a) {
  for (var e = 0, n = [], i = 0, t = 0, r = a.length; t < r; t++)
    switch (a.charCodeAt(t)) {
      case 32:
        i === e && (i = e = t + 1);
        break;
      case 44:
        n.push(a.substring(i, e)), i = e = t + 1;
        break;
      default:
        e = t + 1;
        break;
    }
  return n.push(a.substring(i, e)), n;
}
const Lf = {
  "application/andrew-inset": [
    "ez"
  ],
  "application/applixware": [
    "aw"
  ],
  "application/atom+xml": [
    "atom"
  ],
  "application/atomcat+xml": [
    "atomcat"
  ],
  "application/atomsvc+xml": [
    "atomsvc"
  ],
  "application/bdoc": [
    "bdoc"
  ],
  "application/ccxml+xml": [
    "ccxml"
  ],
  "application/cdmi-capability": [
    "cdmia"
  ],
  "application/cdmi-container": [
    "cdmic"
  ],
  "application/cdmi-domain": [
    "cdmid"
  ],
  "application/cdmi-object": [
    "cdmio"
  ],
  "application/cdmi-queue": [
    "cdmiq"
  ],
  "application/cu-seeme": [
    "cu"
  ],
  "application/dash+xml": [
    "mpd"
  ],
  "application/davmount+xml": [
    "davmount"
  ],
  "application/docbook+xml": [
    "dbk"
  ],
  "application/dssc+der": [
    "dssc"
  ],
  "application/dssc+xml": [
    "xdssc"
  ],
  "application/ecmascript": [
    "ecma"
  ],
  "application/emma+xml": [
    "emma"
  ],
  "application/epub+zip": [
    "epub"
  ],
  "application/exi": [
    "exi"
  ],
  "application/font-tdpfr": [
    "pfr"
  ],
  "application/font-woff": [],
  "application/font-woff2": [],
  "application/geo+json": [
    "geojson"
  ],
  "application/gml+xml": [
    "gml"
  ],
  "application/gpx+xml": [
    "gpx"
  ],
  "application/gxf": [
    "gxf"
  ],
  "application/gzip": [
    "gz"
  ],
  "application/hyperstudio": [
    "stk"
  ],
  "application/inkml+xml": [
    "ink",
    "inkml"
  ],
  "application/ipfix": [
    "ipfix"
  ],
  "application/java-archive": [
    "jar",
    "war",
    "ear"
  ],
  "application/java-serialized-object": [
    "ser"
  ],
  "application/java-vm": [
    "class"
  ],
  "application/javascript": [
    "js",
    "mjs"
  ],
  "application/json": [
    "json",
    "map"
  ],
  "application/json5": [
    "json5"
  ],
  "application/jsonml+json": [
    "jsonml"
  ],
  "application/ld+json": [
    "jsonld"
  ],
  "application/lost+xml": [
    "lostxml"
  ],
  "application/mac-binhex40": [
    "hqx"
  ],
  "application/mac-compactpro": [
    "cpt"
  ],
  "application/mads+xml": [
    "mads"
  ],
  "application/manifest+json": [
    "webmanifest"
  ],
  "application/marc": [
    "mrc"
  ],
  "application/marcxml+xml": [
    "mrcx"
  ],
  "application/mathematica": [
    "ma",
    "nb",
    "mb"
  ],
  "application/mathml+xml": [
    "mathml"
  ],
  "application/mbox": [
    "mbox"
  ],
  "application/mediaservercontrol+xml": [
    "mscml"
  ],
  "application/metalink+xml": [
    "metalink"
  ],
  "application/metalink4+xml": [
    "meta4"
  ],
  "application/mets+xml": [
    "mets"
  ],
  "application/mods+xml": [
    "mods"
  ],
  "application/mp21": [
    "m21",
    "mp21"
  ],
  "application/mp4": [
    "mp4s",
    "m4p"
  ],
  "application/msword": [
    "doc",
    "dot"
  ],
  "application/mxf": [
    "mxf"
  ],
  "application/octet-stream": [
    "bin",
    "dms",
    "lrf",
    "mar",
    "so",
    "dist",
    "distz",
    "pkg",
    "bpk",
    "dump",
    "elc",
    "deploy",
    "exe",
    "dll",
    "deb",
    "dmg",
    "iso",
    "img",
    "msi",
    "msp",
    "msm",
    "buffer"
  ],
  "application/oda": [
    "oda"
  ],
  "application/oebps-package+xml": [
    "opf"
  ],
  "application/ogg": [
    "ogx"
  ],
  "application/omdoc+xml": [
    "omdoc"
  ],
  "application/onenote": [
    "onetoc",
    "onetoc2",
    "onetmp",
    "onepkg"
  ],
  "application/oxps": [
    "oxps"
  ],
  "application/patch-ops-error+xml": [
    "xer"
  ],
  "application/pdf": [
    "pdf"
  ],
  "application/pgp-encrypted": [
    "pgp"
  ],
  "application/pgp-signature": [
    "asc",
    "sig"
  ],
  "application/pics-rules": [
    "prf"
  ],
  "application/pkcs10": [
    "p10"
  ],
  "application/pkcs7-mime": [
    "p7m",
    "p7c"
  ],
  "application/pkcs7-signature": [
    "p7s"
  ],
  "application/pkcs8": [
    "p8"
  ],
  "application/pkix-attr-cert": [
    "ac"
  ],
  "application/pkix-cert": [
    "cer"
  ],
  "application/pkix-crl": [
    "crl"
  ],
  "application/pkix-pkipath": [
    "pkipath"
  ],
  "application/pkixcmp": [
    "pki"
  ],
  "application/pls+xml": [
    "pls"
  ],
  "application/postscript": [
    "ai",
    "eps",
    "ps"
  ],
  "application/prs.cww": [
    "cww"
  ],
  "application/pskc+xml": [
    "pskcxml"
  ],
  "application/raml+yaml": [
    "raml"
  ],
  "application/rdf+xml": [
    "rdf"
  ],
  "application/reginfo+xml": [
    "rif"
  ],
  "application/relax-ng-compact-syntax": [
    "rnc"
  ],
  "application/resource-lists+xml": [
    "rl"
  ],
  "application/resource-lists-diff+xml": [
    "rld"
  ],
  "application/rls-services+xml": [
    "rs"
  ],
  "application/rpki-ghostbusters": [
    "gbr"
  ],
  "application/rpki-manifest": [
    "mft"
  ],
  "application/rpki-roa": [
    "roa"
  ],
  "application/rsd+xml": [
    "rsd"
  ],
  "application/rss+xml": [
    "rss"
  ],
  "application/rtf": [
    "rtf"
  ],
  "application/sbml+xml": [
    "sbml"
  ],
  "application/scvp-cv-request": [
    "scq"
  ],
  "application/scvp-cv-response": [
    "scs"
  ],
  "application/scvp-vp-request": [
    "spq"
  ],
  "application/scvp-vp-response": [
    "spp"
  ],
  "application/sdp": [
    "sdp"
  ],
  "application/set-payment-initiation": [
    "setpay"
  ],
  "application/set-registration-initiation": [
    "setreg"
  ],
  "application/shf+xml": [
    "shf"
  ],
  "application/smil+xml": [
    "smi",
    "smil"
  ],
  "application/sparql-query": [
    "rq"
  ],
  "application/sparql-results+xml": [
    "srx"
  ],
  "application/srgs": [
    "gram"
  ],
  "application/srgs+xml": [
    "grxml"
  ],
  "application/sru+xml": [
    "sru"
  ],
  "application/ssdl+xml": [
    "ssdl"
  ],
  "application/ssml+xml": [
    "ssml"
  ],
  "application/tei+xml": [
    "tei",
    "teicorpus"
  ],
  "application/thraud+xml": [
    "tfi"
  ],
  "application/timestamped-data": [
    "tsd"
  ],
  "application/vnd.3gpp.pic-bw-large": [
    "plb"
  ],
  "application/vnd.3gpp.pic-bw-small": [
    "psb"
  ],
  "application/vnd.3gpp.pic-bw-var": [
    "pvb"
  ],
  "application/vnd.3gpp2.tcap": [
    "tcap"
  ],
  "application/vnd.3m.post-it-notes": [
    "pwn"
  ],
  "application/vnd.accpac.simply.aso": [
    "aso"
  ],
  "application/vnd.accpac.simply.imp": [
    "imp"
  ],
  "application/vnd.acucobol": [
    "acu"
  ],
  "application/vnd.acucorp": [
    "atc",
    "acutc"
  ],
  "application/vnd.adobe.air-application-installer-package+zip": [
    "air"
  ],
  "application/vnd.adobe.formscentral.fcdt": [
    "fcdt"
  ],
  "application/vnd.adobe.fxp": [
    "fxp",
    "fxpl"
  ],
  "application/vnd.adobe.xdp+xml": [
    "xdp"
  ],
  "application/vnd.adobe.xfdf": [
    "xfdf"
  ],
  "application/vnd.ahead.space": [
    "ahead"
  ],
  "application/vnd.airzip.filesecure.azf": [
    "azf"
  ],
  "application/vnd.airzip.filesecure.azs": [
    "azs"
  ],
  "application/vnd.amazon.ebook": [
    "azw"
  ],
  "application/vnd.americandynamics.acc": [
    "acc"
  ],
  "application/vnd.amiga.ami": [
    "ami"
  ],
  "application/vnd.android.package-archive": [
    "apk"
  ],
  "application/vnd.anser-web-certificate-issue-initiation": [
    "cii"
  ],
  "application/vnd.anser-web-funds-transfer-initiation": [
    "fti"
  ],
  "application/vnd.antix.game-component": [
    "atx"
  ],
  "application/vnd.apple.installer+xml": [
    "mpkg"
  ],
  "application/vnd.apple.mpegurl": [
    "m3u8"
  ],
  "application/vnd.apple.pkpass": [
    "pkpass"
  ],
  "application/vnd.aristanetworks.swi": [
    "swi"
  ],
  "application/vnd.astraea-software.iota": [
    "iota"
  ],
  "application/vnd.audiograph": [
    "aep"
  ],
  "application/vnd.blueice.multipass": [
    "mpm"
  ],
  "application/vnd.bmi": [
    "bmi"
  ],
  "application/vnd.businessobjects": [
    "rep"
  ],
  "application/vnd.chemdraw+xml": [
    "cdxml"
  ],
  "application/vnd.chipnuts.karaoke-mmd": [
    "mmd"
  ],
  "application/vnd.cinderella": [
    "cdy"
  ],
  "application/vnd.claymore": [
    "cla"
  ],
  "application/vnd.cloanto.rp9": [
    "rp9"
  ],
  "application/vnd.clonk.c4group": [
    "c4g",
    "c4d",
    "c4f",
    "c4p",
    "c4u"
  ],
  "application/vnd.cluetrust.cartomobile-config": [
    "c11amc"
  ],
  "application/vnd.cluetrust.cartomobile-config-pkg": [
    "c11amz"
  ],
  "application/vnd.commonspace": [
    "csp"
  ],
  "application/vnd.contact.cmsg": [
    "cdbcmsg"
  ],
  "application/vnd.cosmocaller": [
    "cmc"
  ],
  "application/vnd.crick.clicker": [
    "clkx"
  ],
  "application/vnd.crick.clicker.keyboard": [
    "clkk"
  ],
  "application/vnd.crick.clicker.palette": [
    "clkp"
  ],
  "application/vnd.crick.clicker.template": [
    "clkt"
  ],
  "application/vnd.crick.clicker.wordbank": [
    "clkw"
  ],
  "application/vnd.criticaltools.wbs+xml": [
    "wbs"
  ],
  "application/vnd.ctc-posml": [
    "pml"
  ],
  "application/vnd.cups-ppd": [
    "ppd"
  ],
  "application/vnd.curl.car": [
    "car"
  ],
  "application/vnd.curl.pcurl": [
    "pcurl"
  ],
  "application/vnd.dart": [
    "dart"
  ],
  "application/vnd.data-vision.rdz": [
    "rdz"
  ],
  "application/vnd.dece.data": [
    "uvf",
    "uvvf",
    "uvd",
    "uvvd"
  ],
  "application/vnd.dece.ttml+xml": [
    "uvt",
    "uvvt"
  ],
  "application/vnd.dece.unspecified": [
    "uvx",
    "uvvx"
  ],
  "application/vnd.dece.zip": [
    "uvz",
    "uvvz"
  ],
  "application/vnd.denovo.fcselayout-link": [
    "fe_launch"
  ],
  "application/vnd.dna": [
    "dna"
  ],
  "application/vnd.dolby.mlp": [
    "mlp"
  ],
  "application/vnd.dpgraph": [
    "dpg"
  ],
  "application/vnd.dreamfactory": [
    "dfac"
  ],
  "application/vnd.ds-keypoint": [
    "kpxx"
  ],
  "application/vnd.dvb.ait": [
    "ait"
  ],
  "application/vnd.dvb.service": [
    "svc"
  ],
  "application/vnd.dynageo": [
    "geo"
  ],
  "application/vnd.ecowin.chart": [
    "mag"
  ],
  "application/vnd.enliven": [
    "nml"
  ],
  "application/vnd.epson.esf": [
    "esf"
  ],
  "application/vnd.epson.msf": [
    "msf"
  ],
  "application/vnd.epson.quickanime": [
    "qam"
  ],
  "application/vnd.epson.salt": [
    "slt"
  ],
  "application/vnd.epson.ssf": [
    "ssf"
  ],
  "application/vnd.eszigno3+xml": [
    "es3",
    "et3"
  ],
  "application/vnd.ezpix-album": [
    "ez2"
  ],
  "application/vnd.ezpix-package": [
    "ez3"
  ],
  "application/vnd.fdf": [
    "fdf"
  ],
  "application/vnd.fdsn.mseed": [
    "mseed"
  ],
  "application/vnd.fdsn.seed": [
    "seed",
    "dataless"
  ],
  "application/vnd.flographit": [
    "gph"
  ],
  "application/vnd.fluxtime.clip": [
    "ftc"
  ],
  "application/vnd.framemaker": [
    "fm",
    "frame",
    "maker",
    "book"
  ],
  "application/vnd.frogans.fnc": [
    "fnc"
  ],
  "application/vnd.frogans.ltf": [
    "ltf"
  ],
  "application/vnd.fsc.weblaunch": [
    "fsc"
  ],
  "application/vnd.fujitsu.oasys": [
    "oas"
  ],
  "application/vnd.fujitsu.oasys2": [
    "oa2"
  ],
  "application/vnd.fujitsu.oasys3": [
    "oa3"
  ],
  "application/vnd.fujitsu.oasysgp": [
    "fg5"
  ],
  "application/vnd.fujitsu.oasysprs": [
    "bh2"
  ],
  "application/vnd.fujixerox.ddd": [
    "ddd"
  ],
  "application/vnd.fujixerox.docuworks": [
    "xdw"
  ],
  "application/vnd.fujixerox.docuworks.binder": [
    "xbd"
  ],
  "application/vnd.fuzzysheet": [
    "fzs"
  ],
  "application/vnd.genomatix.tuxedo": [
    "txd"
  ],
  "application/vnd.geogebra.file": [
    "ggb"
  ],
  "application/vnd.geogebra.tool": [
    "ggt"
  ],
  "application/vnd.geometry-explorer": [
    "gex",
    "gre"
  ],
  "application/vnd.geonext": [
    "gxt"
  ],
  "application/vnd.geoplan": [
    "g2w"
  ],
  "application/vnd.geospace": [
    "g3w"
  ],
  "application/vnd.gmx": [
    "gmx"
  ],
  "application/vnd.google-apps.document": [
    "gdoc"
  ],
  "application/vnd.google-apps.presentation": [
    "gslides"
  ],
  "application/vnd.google-apps.spreadsheet": [
    "gsheet"
  ],
  "application/vnd.google-earth.kml+xml": [
    "kml"
  ],
  "application/vnd.google-earth.kmz": [
    "kmz"
  ],
  "application/vnd.grafeq": [
    "gqf",
    "gqs"
  ],
  "application/vnd.groove-account": [
    "gac"
  ],
  "application/vnd.groove-help": [
    "ghf"
  ],
  "application/vnd.groove-identity-message": [
    "gim"
  ],
  "application/vnd.groove-injector": [
    "grv"
  ],
  "application/vnd.groove-tool-message": [
    "gtm"
  ],
  "application/vnd.groove-tool-template": [
    "tpl"
  ],
  "application/vnd.groove-vcard": [
    "vcg"
  ],
  "application/vnd.hal+xml": [
    "hal"
  ],
  "application/vnd.handheld-entertainment+xml": [
    "zmm"
  ],
  "application/vnd.hbci": [
    "hbci"
  ],
  "application/vnd.hhe.lesson-player": [
    "les"
  ],
  "application/vnd.hp-hpgl": [
    "hpgl"
  ],
  "application/vnd.hp-hpid": [
    "hpid"
  ],
  "application/vnd.hp-hps": [
    "hps"
  ],
  "application/vnd.hp-jlyt": [
    "jlt"
  ],
  "application/vnd.hp-pcl": [
    "pcl"
  ],
  "application/vnd.hp-pclxl": [
    "pclxl"
  ],
  "application/vnd.hydrostatix.sof-data": [
    "sfd-hdstx"
  ],
  "application/vnd.ibm.minipay": [
    "mpy"
  ],
  "application/vnd.ibm.modcap": [
    "afp",
    "listafp",
    "list3820"
  ],
  "application/vnd.ibm.rights-management": [
    "irm"
  ],
  "application/vnd.ibm.secure-container": [
    "sc"
  ],
  "application/vnd.iccprofile": [
    "icc",
    "icm"
  ],
  "application/vnd.igloader": [
    "igl"
  ],
  "application/vnd.immervision-ivp": [
    "ivp"
  ],
  "application/vnd.immervision-ivu": [
    "ivu"
  ],
  "application/vnd.insors.igm": [
    "igm"
  ],
  "application/vnd.intercon.formnet": [
    "xpw",
    "xpx"
  ],
  "application/vnd.intergeo": [
    "i2g"
  ],
  "application/vnd.intu.qbo": [
    "qbo"
  ],
  "application/vnd.intu.qfx": [
    "qfx"
  ],
  "application/vnd.ipunplugged.rcprofile": [
    "rcprofile"
  ],
  "application/vnd.irepository.package+xml": [
    "irp"
  ],
  "application/vnd.is-xpr": [
    "xpr"
  ],
  "application/vnd.isac.fcs": [
    "fcs"
  ],
  "application/vnd.jam": [
    "jam"
  ],
  "application/vnd.jcp.javame.midlet-rms": [
    "rms"
  ],
  "application/vnd.jisp": [
    "jisp"
  ],
  "application/vnd.joost.joda-archive": [
    "joda"
  ],
  "application/vnd.kahootz": [
    "ktz",
    "ktr"
  ],
  "application/vnd.kde.karbon": [
    "karbon"
  ],
  "application/vnd.kde.kchart": [
    "chrt"
  ],
  "application/vnd.kde.kformula": [
    "kfo"
  ],
  "application/vnd.kde.kivio": [
    "flw"
  ],
  "application/vnd.kde.kontour": [
    "kon"
  ],
  "application/vnd.kde.kpresenter": [
    "kpr",
    "kpt"
  ],
  "application/vnd.kde.kspread": [
    "ksp"
  ],
  "application/vnd.kde.kword": [
    "kwd",
    "kwt"
  ],
  "application/vnd.kenameaapp": [
    "htke"
  ],
  "application/vnd.kidspiration": [
    "kia"
  ],
  "application/vnd.kinar": [
    "kne",
    "knp"
  ],
  "application/vnd.koan": [
    "skp",
    "skd",
    "skt",
    "skm"
  ],
  "application/vnd.kodak-descriptor": [
    "sse"
  ],
  "application/vnd.las.las+xml": [
    "lasxml"
  ],
  "application/vnd.llamagraphics.life-balance.desktop": [
    "lbd"
  ],
  "application/vnd.llamagraphics.life-balance.exchange+xml": [
    "lbe"
  ],
  "application/vnd.lotus-1-2-3": [
    "123"
  ],
  "application/vnd.lotus-approach": [
    "apr"
  ],
  "application/vnd.lotus-freelance": [
    "pre"
  ],
  "application/vnd.lotus-notes": [
    "nsf"
  ],
  "application/vnd.lotus-organizer": [
    "org"
  ],
  "application/vnd.lotus-screencam": [
    "scm"
  ],
  "application/vnd.lotus-wordpro": [
    "lwp"
  ],
  "application/vnd.macports.portpkg": [
    "portpkg"
  ],
  "application/vnd.mcd": [
    "mcd"
  ],
  "application/vnd.medcalcdata": [
    "mc1"
  ],
  "application/vnd.mediastation.cdkey": [
    "cdkey"
  ],
  "application/vnd.mfer": [
    "mwf"
  ],
  "application/vnd.mfmp": [
    "mfm"
  ],
  "application/vnd.micrografx.flo": [
    "flo"
  ],
  "application/vnd.micrografx.igx": [
    "igx"
  ],
  "application/vnd.mif": [
    "mif"
  ],
  "application/vnd.mobius.daf": [
    "daf"
  ],
  "application/vnd.mobius.dis": [
    "dis"
  ],
  "application/vnd.mobius.mbk": [
    "mbk"
  ],
  "application/vnd.mobius.mqy": [
    "mqy"
  ],
  "application/vnd.mobius.msl": [
    "msl"
  ],
  "application/vnd.mobius.plc": [
    "plc"
  ],
  "application/vnd.mobius.txf": [
    "txf"
  ],
  "application/vnd.mophun.application": [
    "mpn"
  ],
  "application/vnd.mophun.certificate": [
    "mpc"
  ],
  "application/vnd.mozilla.xul+xml": [
    "xul"
  ],
  "application/vnd.ms-artgalry": [
    "cil"
  ],
  "application/vnd.ms-cab-compressed": [
    "cab"
  ],
  "application/vnd.ms-excel": [
    "xls",
    "xlm",
    "xla",
    "xlc",
    "xlt",
    "xlw"
  ],
  "application/vnd.ms-excel.addin.macroenabled.12": [
    "xlam"
  ],
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": [
    "xlsb"
  ],
  "application/vnd.ms-excel.sheet.macroenabled.12": [
    "xlsm"
  ],
  "application/vnd.ms-excel.template.macroenabled.12": [
    "xltm"
  ],
  "application/vnd.ms-fontobject": [
    "eot"
  ],
  "application/vnd.ms-htmlhelp": [
    "chm"
  ],
  "application/vnd.ms-ims": [
    "ims"
  ],
  "application/vnd.ms-lrm": [
    "lrm"
  ],
  "application/vnd.ms-officetheme": [
    "thmx"
  ],
  "application/vnd.ms-outlook": [
    "msg"
  ],
  "application/vnd.ms-pki.seccat": [
    "cat"
  ],
  "application/vnd.ms-pki.stl": [
    "stl"
  ],
  "application/vnd.ms-powerpoint": [
    "ppt",
    "pps",
    "pot"
  ],
  "application/vnd.ms-powerpoint.addin.macroenabled.12": [
    "ppam"
  ],
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": [
    "pptm"
  ],
  "application/vnd.ms-powerpoint.slide.macroenabled.12": [
    "sldm"
  ],
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": [
    "ppsm"
  ],
  "application/vnd.ms-powerpoint.template.macroenabled.12": [
    "potm"
  ],
  "application/vnd.ms-project": [
    "mpp",
    "mpt"
  ],
  "application/vnd.ms-word.document.macroenabled.12": [
    "docm"
  ],
  "application/vnd.ms-word.template.macroenabled.12": [
    "dotm"
  ],
  "application/vnd.ms-works": [
    "wps",
    "wks",
    "wcm",
    "wdb"
  ],
  "application/vnd.ms-wpl": [
    "wpl"
  ],
  "application/vnd.ms-xpsdocument": [
    "xps"
  ],
  "application/vnd.mseq": [
    "mseq"
  ],
  "application/vnd.musician": [
    "mus"
  ],
  "application/vnd.muvee.style": [
    "msty"
  ],
  "application/vnd.mynfc": [
    "taglet"
  ],
  "application/vnd.neurolanguage.nlu": [
    "nlu"
  ],
  "application/vnd.nitf": [
    "ntf",
    "nitf"
  ],
  "application/vnd.noblenet-directory": [
    "nnd"
  ],
  "application/vnd.noblenet-sealer": [
    "nns"
  ],
  "application/vnd.noblenet-web": [
    "nnw"
  ],
  "application/vnd.nokia.n-gage.data": [
    "ngdat"
  ],
  "application/vnd.nokia.n-gage.symbian.install": [
    "n-gage"
  ],
  "application/vnd.nokia.radio-preset": [
    "rpst"
  ],
  "application/vnd.nokia.radio-presets": [
    "rpss"
  ],
  "application/vnd.novadigm.edm": [
    "edm"
  ],
  "application/vnd.novadigm.edx": [
    "edx"
  ],
  "application/vnd.novadigm.ext": [
    "ext"
  ],
  "application/vnd.oasis.opendocument.chart": [
    "odc"
  ],
  "application/vnd.oasis.opendocument.chart-template": [
    "otc"
  ],
  "application/vnd.oasis.opendocument.database": [
    "odb"
  ],
  "application/vnd.oasis.opendocument.formula": [
    "odf"
  ],
  "application/vnd.oasis.opendocument.formula-template": [
    "odft"
  ],
  "application/vnd.oasis.opendocument.graphics": [
    "odg"
  ],
  "application/vnd.oasis.opendocument.graphics-template": [
    "otg"
  ],
  "application/vnd.oasis.opendocument.image": [
    "odi"
  ],
  "application/vnd.oasis.opendocument.image-template": [
    "oti"
  ],
  "application/vnd.oasis.opendocument.presentation": [
    "odp"
  ],
  "application/vnd.oasis.opendocument.presentation-template": [
    "otp"
  ],
  "application/vnd.oasis.opendocument.spreadsheet": [
    "ods"
  ],
  "application/vnd.oasis.opendocument.spreadsheet-template": [
    "ots"
  ],
  "application/vnd.oasis.opendocument.text": [
    "odt"
  ],
  "application/vnd.oasis.opendocument.text-master": [
    "odm"
  ],
  "application/vnd.oasis.opendocument.text-template": [
    "ott"
  ],
  "application/vnd.oasis.opendocument.text-web": [
    "oth"
  ],
  "application/vnd.olpc-sugar": [
    "xo"
  ],
  "application/vnd.oma.dd2+xml": [
    "dd2"
  ],
  "application/vnd.openofficeorg.extension": [
    "oxt"
  ],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [
    "pptx"
  ],
  "application/vnd.openxmlformats-officedocument.presentationml.slide": [
    "sldx"
  ],
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": [
    "ppsx"
  ],
  "application/vnd.openxmlformats-officedocument.presentationml.template": [
    "potx"
  ],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
    "xlsx"
  ],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": [
    "xltx"
  ],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    "docx"
  ],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": [
    "dotx"
  ],
  "application/vnd.osgeo.mapguide.package": [
    "mgp"
  ],
  "application/vnd.osgi.dp": [
    "dp"
  ],
  "application/vnd.osgi.subsystem": [
    "esa"
  ],
  "application/vnd.palm": [
    "pdb",
    "pqa",
    "oprc"
  ],
  "application/vnd.pawaafile": [
    "paw"
  ],
  "application/vnd.pg.format": [
    "str"
  ],
  "application/vnd.pg.osasli": [
    "ei6"
  ],
  "application/vnd.picsel": [
    "efif"
  ],
  "application/vnd.pmi.widget": [
    "wg"
  ],
  "application/vnd.pocketlearn": [
    "plf"
  ],
  "application/vnd.powerbuilder6": [
    "pbd"
  ],
  "application/vnd.previewsystems.box": [
    "box"
  ],
  "application/vnd.proteus.magazine": [
    "mgz"
  ],
  "application/vnd.publishare-delta-tree": [
    "qps"
  ],
  "application/vnd.pvi.ptid1": [
    "ptid"
  ],
  "application/vnd.quark.quarkxpress": [
    "qxd",
    "qxt",
    "qwd",
    "qwt",
    "qxl",
    "qxb"
  ],
  "application/vnd.realvnc.bed": [
    "bed"
  ],
  "application/vnd.recordare.musicxml": [
    "mxl"
  ],
  "application/vnd.recordare.musicxml+xml": [
    "musicxml"
  ],
  "application/vnd.rig.cryptonote": [
    "cryptonote"
  ],
  "application/vnd.rim.cod": [
    "cod"
  ],
  "application/vnd.rn-realmedia": [
    "rm"
  ],
  "application/vnd.rn-realmedia-vbr": [
    "rmvb"
  ],
  "application/vnd.route66.link66+xml": [
    "link66"
  ],
  "application/vnd.sailingtracker.track": [
    "st"
  ],
  "application/vnd.seemail": [
    "see"
  ],
  "application/vnd.sema": [
    "sema"
  ],
  "application/vnd.semd": [
    "semd"
  ],
  "application/vnd.semf": [
    "semf"
  ],
  "application/vnd.shana.informed.formdata": [
    "ifm"
  ],
  "application/vnd.shana.informed.formtemplate": [
    "itp"
  ],
  "application/vnd.shana.informed.interchange": [
    "iif"
  ],
  "application/vnd.shana.informed.package": [
    "ipk"
  ],
  "application/vnd.simtech-mindmapper": [
    "twd",
    "twds"
  ],
  "application/vnd.smaf": [
    "mmf"
  ],
  "application/vnd.smart.teacher": [
    "teacher"
  ],
  "application/vnd.solent.sdkm+xml": [
    "sdkm",
    "sdkd"
  ],
  "application/vnd.spotfire.dxp": [
    "dxp"
  ],
  "application/vnd.spotfire.sfs": [
    "sfs"
  ],
  "application/vnd.stardivision.calc": [
    "sdc"
  ],
  "application/vnd.stardivision.draw": [
    "sda"
  ],
  "application/vnd.stardivision.impress": [
    "sdd"
  ],
  "application/vnd.stardivision.math": [
    "smf"
  ],
  "application/vnd.stardivision.writer": [
    "sdw",
    "vor"
  ],
  "application/vnd.stardivision.writer-global": [
    "sgl"
  ],
  "application/vnd.stepmania.package": [
    "smzip"
  ],
  "application/vnd.stepmania.stepchart": [
    "sm"
  ],
  "application/vnd.sun.wadl+xml": [
    "wadl"
  ],
  "application/vnd.sun.xml.calc": [
    "sxc"
  ],
  "application/vnd.sun.xml.calc.template": [
    "stc"
  ],
  "application/vnd.sun.xml.draw": [
    "sxd"
  ],
  "application/vnd.sun.xml.draw.template": [
    "std"
  ],
  "application/vnd.sun.xml.impress": [
    "sxi"
  ],
  "application/vnd.sun.xml.impress.template": [
    "sti"
  ],
  "application/vnd.sun.xml.math": [
    "sxm"
  ],
  "application/vnd.sun.xml.writer": [
    "sxw"
  ],
  "application/vnd.sun.xml.writer.global": [
    "sxg"
  ],
  "application/vnd.sun.xml.writer.template": [
    "stw"
  ],
  "application/vnd.sus-calendar": [
    "sus",
    "susp"
  ],
  "application/vnd.svd": [
    "svd"
  ],
  "application/vnd.symbian.install": [
    "sis",
    "sisx"
  ],
  "application/vnd.syncml+xml": [
    "xsm"
  ],
  "application/vnd.syncml.dm+wbxml": [
    "bdm"
  ],
  "application/vnd.syncml.dm+xml": [
    "xdm"
  ],
  "application/vnd.tao.intent-module-archive": [
    "tao"
  ],
  "application/vnd.tcpdump.pcap": [
    "pcap",
    "cap",
    "dmp"
  ],
  "application/vnd.tmobile-livetv": [
    "tmo"
  ],
  "application/vnd.trid.tpt": [
    "tpt"
  ],
  "application/vnd.triscape.mxs": [
    "mxs"
  ],
  "application/vnd.trueapp": [
    "tra"
  ],
  "application/vnd.ufdl": [
    "ufd",
    "ufdl"
  ],
  "application/vnd.uiq.theme": [
    "utz"
  ],
  "application/vnd.umajin": [
    "umj"
  ],
  "application/vnd.unity": [
    "unityweb"
  ],
  "application/vnd.uoml+xml": [
    "uoml"
  ],
  "application/vnd.vcx": [
    "vcx"
  ],
  "application/vnd.visio": [
    "vsd",
    "vst",
    "vss",
    "vsw"
  ],
  "application/vnd.visionary": [
    "vis"
  ],
  "application/vnd.vsf": [
    "vsf"
  ],
  "application/vnd.wap.wbxml": [
    "wbxml"
  ],
  "application/vnd.wap.wmlc": [
    "wmlc"
  ],
  "application/vnd.wap.wmlscriptc": [
    "wmlsc"
  ],
  "application/vnd.webturbo": [
    "wtb"
  ],
  "application/vnd.wolfram.player": [
    "nbp"
  ],
  "application/vnd.wordperfect": [
    "wpd"
  ],
  "application/vnd.wqd": [
    "wqd"
  ],
  "application/vnd.wt.stf": [
    "stf"
  ],
  "application/vnd.xara": [
    "xar"
  ],
  "application/vnd.xfdl": [
    "xfdl"
  ],
  "application/vnd.yamaha.hv-dic": [
    "hvd"
  ],
  "application/vnd.yamaha.hv-script": [
    "hvs"
  ],
  "application/vnd.yamaha.hv-voice": [
    "hvp"
  ],
  "application/vnd.yamaha.openscoreformat": [
    "osf"
  ],
  "application/vnd.yamaha.openscoreformat.osfpvg+xml": [
    "osfpvg"
  ],
  "application/vnd.yamaha.smaf-audio": [
    "saf"
  ],
  "application/vnd.yamaha.smaf-phrase": [
    "spf"
  ],
  "application/vnd.yellowriver-custom-menu": [
    "cmp"
  ],
  "application/vnd.zul": [
    "zir",
    "zirz"
  ],
  "application/vnd.zzazz.deck+xml": [
    "zaz"
  ],
  "application/voicexml+xml": [
    "vxml"
  ],
  "application/wasm": [
    "wasm"
  ],
  "application/widget": [
    "wgt"
  ],
  "application/winhlp": [
    "hlp"
  ],
  "application/wsdl+xml": [
    "wsdl"
  ],
  "application/wspolicy+xml": [
    "wspolicy"
  ],
  "application/x-7z-compressed": [
    "7z"
  ],
  "application/x-abiword": [
    "abw"
  ],
  "application/x-ace-compressed": [
    "ace"
  ],
  "application/x-apple-diskimage": [],
  "application/x-arj": [
    "arj"
  ],
  "application/x-authorware-bin": [
    "aab",
    "x32",
    "u32",
    "vox"
  ],
  "application/x-authorware-map": [
    "aam"
  ],
  "application/x-authorware-seg": [
    "aas"
  ],
  "application/x-bcpio": [
    "bcpio"
  ],
  "application/x-bdoc": [],
  "application/x-bittorrent": [
    "torrent"
  ],
  "application/x-blorb": [
    "blb",
    "blorb"
  ],
  "application/x-bzip": [
    "bz"
  ],
  "application/x-bzip2": [
    "bz2",
    "boz"
  ],
  "application/x-cbr": [
    "cbr",
    "cba",
    "cbt",
    "cbz",
    "cb7"
  ],
  "application/x-cdlink": [
    "vcd"
  ],
  "application/x-cfs-compressed": [
    "cfs"
  ],
  "application/x-chat": [
    "chat"
  ],
  "application/x-chess-pgn": [
    "pgn"
  ],
  "application/x-chrome-extension": [
    "crx"
  ],
  "application/x-cocoa": [
    "cco"
  ],
  "application/x-conference": [
    "nsc"
  ],
  "application/x-cpio": [
    "cpio"
  ],
  "application/x-csh": [
    "csh"
  ],
  "application/x-debian-package": [
    "udeb"
  ],
  "application/x-dgc-compressed": [
    "dgc"
  ],
  "application/x-director": [
    "dir",
    "dcr",
    "dxr",
    "cst",
    "cct",
    "cxt",
    "w3d",
    "fgd",
    "swa"
  ],
  "application/x-doom": [
    "wad"
  ],
  "application/x-dtbncx+xml": [
    "ncx"
  ],
  "application/x-dtbook+xml": [
    "dtb"
  ],
  "application/x-dtbresource+xml": [
    "res"
  ],
  "application/x-dvi": [
    "dvi"
  ],
  "application/x-envoy": [
    "evy"
  ],
  "application/x-eva": [
    "eva"
  ],
  "application/x-font-bdf": [
    "bdf"
  ],
  "application/x-font-ghostscript": [
    "gsf"
  ],
  "application/x-font-linux-psf": [
    "psf"
  ],
  "application/x-font-pcf": [
    "pcf"
  ],
  "application/x-font-snf": [
    "snf"
  ],
  "application/x-font-type1": [
    "pfa",
    "pfb",
    "pfm",
    "afm"
  ],
  "application/x-freearc": [
    "arc"
  ],
  "application/x-futuresplash": [
    "spl"
  ],
  "application/x-gca-compressed": [
    "gca"
  ],
  "application/x-glulx": [
    "ulx"
  ],
  "application/x-gnumeric": [
    "gnumeric"
  ],
  "application/x-gramps-xml": [
    "gramps"
  ],
  "application/x-gtar": [
    "gtar"
  ],
  "application/x-hdf": [
    "hdf"
  ],
  "application/x-httpd-php": [
    "php"
  ],
  "application/x-install-instructions": [
    "install"
  ],
  "application/x-iso9660-image": [],
  "application/x-java-archive-diff": [
    "jardiff"
  ],
  "application/x-java-jnlp-file": [
    "jnlp"
  ],
  "application/x-latex": [
    "latex"
  ],
  "application/x-lua-bytecode": [
    "luac"
  ],
  "application/x-lzh-compressed": [
    "lzh",
    "lha"
  ],
  "application/x-makeself": [
    "run"
  ],
  "application/x-mie": [
    "mie"
  ],
  "application/x-mobipocket-ebook": [
    "prc",
    "mobi"
  ],
  "application/x-ms-application": [
    "application"
  ],
  "application/x-ms-shortcut": [
    "lnk"
  ],
  "application/x-ms-wmd": [
    "wmd"
  ],
  "application/x-ms-wmz": [
    "wmz"
  ],
  "application/x-ms-xbap": [
    "xbap"
  ],
  "application/x-msaccess": [
    "mdb"
  ],
  "application/x-msbinder": [
    "obd"
  ],
  "application/x-mscardfile": [
    "crd"
  ],
  "application/x-msclip": [
    "clp"
  ],
  "application/x-msdos-program": [],
  "application/x-msdownload": [
    "com",
    "bat"
  ],
  "application/x-msmediaview": [
    "mvb",
    "m13",
    "m14"
  ],
  "application/x-msmetafile": [
    "wmf",
    "emf",
    "emz"
  ],
  "application/x-msmoney": [
    "mny"
  ],
  "application/x-mspublisher": [
    "pub"
  ],
  "application/x-msschedule": [
    "scd"
  ],
  "application/x-msterminal": [
    "trm"
  ],
  "application/x-mswrite": [
    "wri"
  ],
  "application/x-netcdf": [
    "nc",
    "cdf"
  ],
  "application/x-ns-proxy-autoconfig": [
    "pac"
  ],
  "application/x-nzb": [
    "nzb"
  ],
  "application/x-perl": [
    "pl",
    "pm"
  ],
  "application/x-pilot": [],
  "application/x-pkcs12": [
    "p12",
    "pfx"
  ],
  "application/x-pkcs7-certificates": [
    "p7b",
    "spc"
  ],
  "application/x-pkcs7-certreqresp": [
    "p7r"
  ],
  "application/x-rar-compressed": [
    "rar"
  ],
  "application/x-redhat-package-manager": [
    "rpm"
  ],
  "application/x-research-info-systems": [
    "ris"
  ],
  "application/x-sea": [
    "sea"
  ],
  "application/x-sh": [
    "sh"
  ],
  "application/x-shar": [
    "shar"
  ],
  "application/x-shockwave-flash": [
    "swf"
  ],
  "application/x-silverlight-app": [
    "xap"
  ],
  "application/x-sql": [
    "sql"
  ],
  "application/x-stuffit": [
    "sit"
  ],
  "application/x-stuffitx": [
    "sitx"
  ],
  "application/x-subrip": [
    "srt"
  ],
  "application/x-sv4cpio": [
    "sv4cpio"
  ],
  "application/x-sv4crc": [
    "sv4crc"
  ],
  "application/x-t3vm-image": [
    "t3"
  ],
  "application/x-tads": [
    "gam"
  ],
  "application/x-tar": [
    "tar"
  ],
  "application/x-tcl": [
    "tcl",
    "tk"
  ],
  "application/x-tex": [
    "tex"
  ],
  "application/x-tex-tfm": [
    "tfm"
  ],
  "application/x-texinfo": [
    "texinfo",
    "texi"
  ],
  "application/x-tgif": [
    "obj"
  ],
  "application/x-ustar": [
    "ustar"
  ],
  "application/x-virtualbox-hdd": [
    "hdd"
  ],
  "application/x-virtualbox-ova": [
    "ova"
  ],
  "application/x-virtualbox-ovf": [
    "ovf"
  ],
  "application/x-virtualbox-vbox": [
    "vbox"
  ],
  "application/x-virtualbox-vbox-extpack": [
    "vbox-extpack"
  ],
  "application/x-virtualbox-vdi": [
    "vdi"
  ],
  "application/x-virtualbox-vhd": [
    "vhd"
  ],
  "application/x-virtualbox-vmdk": [
    "vmdk"
  ],
  "application/x-wais-source": [
    "src"
  ],
  "application/x-web-app-manifest+json": [
    "webapp"
  ],
  "application/x-x509-ca-cert": [
    "der",
    "crt",
    "pem"
  ],
  "application/x-xfig": [
    "fig"
  ],
  "application/x-xliff+xml": [
    "xlf"
  ],
  "application/x-xpinstall": [
    "xpi"
  ],
  "application/x-xz": [
    "xz"
  ],
  "application/x-zmachine": [
    "z1",
    "z2",
    "z3",
    "z4",
    "z5",
    "z6",
    "z7",
    "z8"
  ],
  "application/xaml+xml": [
    "xaml"
  ],
  "application/xcap-diff+xml": [
    "xdf"
  ],
  "application/xenc+xml": [
    "xenc"
  ],
  "application/xhtml+xml": [
    "xhtml",
    "xht"
  ],
  "application/xml": [
    "xml",
    "xsl",
    "xsd",
    "rng"
  ],
  "application/xml-dtd": [
    "dtd"
  ],
  "application/xop+xml": [
    "xop"
  ],
  "application/xproc+xml": [
    "xpl"
  ],
  "application/xslt+xml": [
    "xslt"
  ],
  "application/xspf+xml": [
    "xspf"
  ],
  "application/xv+xml": [
    "mxml",
    "xhvml",
    "xvml",
    "xvm"
  ],
  "application/yang": [
    "yang"
  ],
  "application/yin+xml": [
    "yin"
  ],
  "application/zip": [
    "zip"
  ],
  "audio/3gpp": [],
  "audio/adpcm": [
    "adp"
  ],
  "audio/basic": [
    "au",
    "snd"
  ],
  "audio/midi": [
    "mid",
    "midi",
    "kar",
    "rmi"
  ],
  "audio/mp3": [],
  "audio/mp4": [
    "m4a",
    "mp4a"
  ],
  "audio/mpeg": [
    "mpga",
    "mp2",
    "mp2a",
    "mp3",
    "m2a",
    "m3a"
  ],
  "audio/ogg": [
    "oga",
    "ogg",
    "spx"
  ],
  "audio/s3m": [
    "s3m"
  ],
  "audio/silk": [
    "sil"
  ],
  "audio/vnd.dece.audio": [
    "uva",
    "uvva"
  ],
  "audio/vnd.digital-winds": [
    "eol"
  ],
  "audio/vnd.dra": [
    "dra"
  ],
  "audio/vnd.dts": [
    "dts"
  ],
  "audio/vnd.dts.hd": [
    "dtshd"
  ],
  "audio/vnd.lucent.voice": [
    "lvp"
  ],
  "audio/vnd.ms-playready.media.pya": [
    "pya"
  ],
  "audio/vnd.nuera.ecelp4800": [
    "ecelp4800"
  ],
  "audio/vnd.nuera.ecelp7470": [
    "ecelp7470"
  ],
  "audio/vnd.nuera.ecelp9600": [
    "ecelp9600"
  ],
  "audio/vnd.rip": [
    "rip"
  ],
  "audio/wav": [
    "wav"
  ],
  "audio/wave": [],
  "audio/webm": [
    "weba"
  ],
  "audio/x-aac": [
    "aac"
  ],
  "audio/x-aiff": [
    "aif",
    "aiff",
    "aifc"
  ],
  "audio/x-caf": [
    "caf"
  ],
  "audio/x-flac": [
    "flac"
  ],
  "audio/x-m4a": [],
  "audio/x-matroska": [
    "mka"
  ],
  "audio/x-mpegurl": [
    "m3u"
  ],
  "audio/x-ms-wax": [
    "wax"
  ],
  "audio/x-ms-wma": [
    "wma"
  ],
  "audio/x-pn-realaudio": [
    "ram",
    "ra"
  ],
  "audio/x-pn-realaudio-plugin": [
    "rmp"
  ],
  "audio/x-realaudio": [],
  "audio/x-wav": [],
  "audio/xm": [
    "xm"
  ],
  "chemical/x-cdx": [
    "cdx"
  ],
  "chemical/x-cif": [
    "cif"
  ],
  "chemical/x-cmdf": [
    "cmdf"
  ],
  "chemical/x-cml": [
    "cml"
  ],
  "chemical/x-csml": [
    "csml"
  ],
  "chemical/x-xyz": [
    "xyz"
  ],
  "font/collection": [
    "ttc"
  ],
  "font/otf": [
    "otf"
  ],
  "font/ttf": [
    "ttf"
  ],
  "font/woff": [
    "woff"
  ],
  "font/woff2": [
    "woff2"
  ],
  "image/apng": [
    "apng"
  ],
  "image/bmp": [
    "bmp"
  ],
  "image/cgm": [
    "cgm"
  ],
  "image/g3fax": [
    "g3"
  ],
  "image/gif": [
    "gif"
  ],
  "image/ief": [
    "ief"
  ],
  "image/jp2": [
    "jp2",
    "jpg2"
  ],
  "image/jpeg": [
    "jpeg",
    "jpg",
    "jpe"
  ],
  "image/jpm": [
    "jpm"
  ],
  "image/jpx": [
    "jpx",
    "jpf"
  ],
  "image/ktx": [
    "ktx"
  ],
  "image/png": [
    "png"
  ],
  "image/prs.btif": [
    "btif"
  ],
  "image/sgi": [
    "sgi"
  ],
  "image/svg+xml": [
    "svg",
    "svgz"
  ],
  "image/tiff": [
    "tiff",
    "tif"
  ],
  "image/vnd.adobe.photoshop": [
    "psd"
  ],
  "image/vnd.dece.graphic": [
    "uvi",
    "uvvi",
    "uvg",
    "uvvg"
  ],
  "image/vnd.djvu": [
    "djvu",
    "djv"
  ],
  "image/vnd.dvb.subtitle": [],
  "image/vnd.dwg": [
    "dwg"
  ],
  "image/vnd.dxf": [
    "dxf"
  ],
  "image/vnd.fastbidsheet": [
    "fbs"
  ],
  "image/vnd.fpx": [
    "fpx"
  ],
  "image/vnd.fst": [
    "fst"
  ],
  "image/vnd.fujixerox.edmics-mmr": [
    "mmr"
  ],
  "image/vnd.fujixerox.edmics-rlc": [
    "rlc"
  ],
  "image/vnd.ms-modi": [
    "mdi"
  ],
  "image/vnd.ms-photo": [
    "wdp"
  ],
  "image/vnd.net-fpx": [
    "npx"
  ],
  "image/vnd.wap.wbmp": [
    "wbmp"
  ],
  "image/vnd.xiff": [
    "xif"
  ],
  "image/webp": [
    "webp"
  ],
  "image/x-3ds": [
    "3ds"
  ],
  "image/x-cmu-raster": [
    "ras"
  ],
  "image/x-cmx": [
    "cmx"
  ],
  "image/x-freehand": [
    "fh",
    "fhc",
    "fh4",
    "fh5",
    "fh7"
  ],
  "image/x-icon": [
    "ico"
  ],
  "image/x-jng": [
    "jng"
  ],
  "image/x-mrsid-image": [
    "sid"
  ],
  "image/x-ms-bmp": [],
  "image/x-pcx": [
    "pcx"
  ],
  "image/x-pict": [
    "pic",
    "pct"
  ],
  "image/x-portable-anymap": [
    "pnm"
  ],
  "image/x-portable-bitmap": [
    "pbm"
  ],
  "image/x-portable-graymap": [
    "pgm"
  ],
  "image/x-portable-pixmap": [
    "ppm"
  ],
  "image/x-rgb": [
    "rgb"
  ],
  "image/x-tga": [
    "tga"
  ],
  "image/x-xbitmap": [
    "xbm"
  ],
  "image/x-xpixmap": [
    "xpm"
  ],
  "image/x-xwindowdump": [
    "xwd"
  ],
  "message/rfc822": [
    "eml",
    "mime"
  ],
  "model/gltf+json": [
    "gltf"
  ],
  "model/gltf-binary": [
    "glb"
  ],
  "model/iges": [
    "igs",
    "iges"
  ],
  "model/mesh": [
    "msh",
    "mesh",
    "silo"
  ],
  "model/vnd.collada+xml": [
    "dae"
  ],
  "model/vnd.dwf": [
    "dwf"
  ],
  "model/vnd.gdl": [
    "gdl"
  ],
  "model/vnd.gtw": [
    "gtw"
  ],
  "model/vnd.mts": [
    "mts"
  ],
  "model/vnd.vtu": [
    "vtu"
  ],
  "model/vrml": [
    "wrl",
    "vrml"
  ],
  "model/x3d+binary": [
    "x3db",
    "x3dbz"
  ],
  "model/x3d+vrml": [
    "x3dv",
    "x3dvz"
  ],
  "model/x3d+xml": [
    "x3d",
    "x3dz"
  ],
  "text/cache-manifest": [
    "appcache",
    "manifest"
  ],
  "text/calendar": [
    "ics",
    "ifb"
  ],
  "text/coffeescript": [
    "coffee",
    "litcoffee"
  ],
  "text/css": [
    "css"
  ],
  "text/csv": [
    "csv"
  ],
  "text/hjson": [
    "hjson"
  ],
  "text/html": [
    "html",
    "htm",
    "shtml"
  ],
  "text/jade": [
    "jade"
  ],
  "text/jsx": [
    "jsx"
  ],
  "text/less": [
    "less"
  ],
  "text/markdown": [
    "markdown",
    "md"
  ],
  "text/mathml": [
    "mml"
  ],
  "text/n3": [
    "n3"
  ],
  "text/plain": [
    "txt",
    "text",
    "conf",
    "def",
    "list",
    "log",
    "in",
    "ini"
  ],
  "text/prs.lines.tag": [
    "dsc"
  ],
  "text/richtext": [
    "rtx"
  ],
  "text/rtf": [],
  "text/sgml": [
    "sgml",
    "sgm"
  ],
  "text/slim": [
    "slim",
    "slm"
  ],
  "text/stylus": [
    "stylus",
    "styl"
  ],
  "text/tab-separated-values": [
    "tsv"
  ],
  "text/troff": [
    "t",
    "tr",
    "roff",
    "man",
    "me",
    "ms"
  ],
  "text/turtle": [
    "ttl"
  ],
  "text/uri-list": [
    "uri",
    "uris",
    "urls"
  ],
  "text/vcard": [
    "vcard"
  ],
  "text/vnd.curl": [
    "curl"
  ],
  "text/vnd.curl.dcurl": [
    "dcurl"
  ],
  "text/vnd.curl.mcurl": [
    "mcurl"
  ],
  "text/vnd.curl.scurl": [
    "scurl"
  ],
  "text/vnd.dvb.subtitle": [
    "sub"
  ],
  "text/vnd.fly": [
    "fly"
  ],
  "text/vnd.fmi.flexstor": [
    "flx"
  ],
  "text/vnd.graphviz": [
    "gv"
  ],
  "text/vnd.in3d.3dml": [
    "3dml"
  ],
  "text/vnd.in3d.spot": [
    "spot"
  ],
  "text/vnd.sun.j2me.app-descriptor": [
    "jad"
  ],
  "text/vnd.wap.wml": [
    "wml"
  ],
  "text/vnd.wap.wmlscript": [
    "wmls"
  ],
  "text/vtt": [
    "vtt"
  ],
  "text/x-asm": [
    "s",
    "asm"
  ],
  "text/x-c": [
    "c",
    "cc",
    "cxx",
    "cpp",
    "h",
    "hh",
    "dic"
  ],
  "text/x-component": [
    "htc"
  ],
  "text/x-fortran": [
    "f",
    "for",
    "f77",
    "f90"
  ],
  "text/x-handlebars-template": [
    "hbs"
  ],
  "text/x-java-source": [
    "java"
  ],
  "text/x-lua": [
    "lua"
  ],
  "text/x-markdown": [
    "mkd"
  ],
  "text/x-nfo": [
    "nfo"
  ],
  "text/x-opml": [
    "opml"
  ],
  "text/x-org": [],
  "text/x-pascal": [
    "p",
    "pas"
  ],
  "text/x-processing": [
    "pde"
  ],
  "text/x-sass": [
    "sass"
  ],
  "text/x-scss": [
    "scss"
  ],
  "text/x-setext": [
    "etx"
  ],
  "text/x-sfv": [
    "sfv"
  ],
  "text/x-suse-ymp": [
    "ymp"
  ],
  "text/x-uuencode": [
    "uu"
  ],
  "text/x-vcalendar": [
    "vcs"
  ],
  "text/x-vcard": [
    "vcf"
  ],
  "text/xml": [],
  "text/yaml": [
    "yaml",
    "yml"
  ],
  "video/3gpp": [
    "3gp",
    "3gpp"
  ],
  "video/3gpp2": [
    "3g2"
  ],
  "video/h261": [
    "h261"
  ],
  "video/h263": [
    "h263"
  ],
  "video/h264": [
    "h264"
  ],
  "video/jpeg": [
    "jpgv"
  ],
  "video/jpm": [
    "jpgm"
  ],
  "video/mj2": [
    "mj2",
    "mjp2"
  ],
  "video/mp2t": [
    "ts"
  ],
  "video/mp4": [
    "mp4",
    "mp4v",
    "mpg4"
  ],
  "video/mpeg": [
    "mpeg",
    "mpg",
    "mpe",
    "m1v",
    "m2v"
  ],
  "video/ogg": [
    "ogv"
  ],
  "video/quicktime": [
    "qt",
    "mov"
  ],
  "video/vnd.dece.hd": [
    "uvh",
    "uvvh"
  ],
  "video/vnd.dece.mobile": [
    "uvm",
    "uvvm"
  ],
  "video/vnd.dece.pd": [
    "uvp",
    "uvvp"
  ],
  "video/vnd.dece.sd": [
    "uvs",
    "uvvs"
  ],
  "video/vnd.dece.video": [
    "uvv",
    "uvvv"
  ],
  "video/vnd.dvb.file": [
    "dvb"
  ],
  "video/vnd.fvt": [
    "fvt"
  ],
  "video/vnd.mpegurl": [
    "mxu",
    "m4u"
  ],
  "video/vnd.ms-playready.media.pyv": [
    "pyv"
  ],
  "video/vnd.uvvu.mp4": [
    "uvu",
    "uvvu"
  ],
  "video/vnd.vivo": [
    "viv"
  ],
  "video/webm": [
    "webm"
  ],
  "video/x-f4v": [
    "f4v"
  ],
  "video/x-fli": [
    "fli"
  ],
  "video/x-flv": [
    "flv"
  ],
  "video/x-m4v": [
    "m4v"
  ],
  "video/x-matroska": [
    "mkv",
    "mk3d",
    "mks"
  ],
  "video/x-mng": [
    "mng"
  ],
  "video/x-ms-asf": [
    "asf",
    "asx"
  ],
  "video/x-ms-vob": [
    "vob"
  ],
  "video/x-ms-wm": [
    "wm"
  ],
  "video/x-ms-wmv": [
    "wmv"
  ],
  "video/x-ms-wmx": [
    "wmx"
  ],
  "video/x-ms-wvx": [
    "wvx"
  ],
  "video/x-msvideo": [
    "avi"
  ],
  "video/x-sgi-movie": [
    "movie"
  ],
  "video/x-smv": [
    "smv"
  ],
  "x-conference/x-cooltalk": [
    "ice"
  ]
};
var Mf = $e;
function De() {
  this.types = /* @__PURE__ */ Object.create(null), this.extensions = /* @__PURE__ */ Object.create(null);
}
De.prototype.define = function(a) {
  for (var e in a) {
    for (var n = a[e], i = 0; i < n.length; i++)
      process.env.DEBUG_MIME && this.types[n[i]] && console.warn((this._loading || "define()").replace(/.*\//, ""), 'changes "' + n[i] + '" extension type from ' + this.types[n[i]] + " to " + e), this.types[n[i]] = e;
    this.extensions[e] || (this.extensions[e] = n[0]);
  }
};
De.prototype.load = function(a) {
  this._loading = a;
  var e = {}, n = Mf.readFileSync(a, "ascii"), i = n.split(/[\r\n]+/);
  i.forEach(function(t) {
    var r = t.replace(/\s*#.*|^\s*|\s*$/g, "").split(/\s+/);
    e[r.shift()] = r;
  }), this.define(e), this._loading = null;
};
De.prototype.lookup = function(a, e) {
  var n = a.replace(/^.*[\.\/\\]/, "").toLowerCase();
  return this.types[n] || e || this.default_type;
};
De.prototype.extension = function(a) {
  var e = a.match(/^\s*([^;\s]*)(?:;|\s|$)/)[1].toLowerCase();
  return this.extensions[e];
};
var Te = new De();
Te.define(Lf);
Te.default_type = Te.lookup("bin");
Te.Mime = De;
Te.charsets = {
  lookup: function(a, e) {
    return /^text\/|^application\/(javascript|json)/.test(a) ? "UTF-8" : e;
  }
};
var Uf = Te, Ce = 1e3, Oe = Ce * 60, Pe = Oe * 60, fe = Pe * 24, Hf = fe * 7, Gf = fe * 365.25, Wf = function(a, e) {
  e = e || {};
  var n = typeof a;
  if (n === "string" && a.length > 0)
    return Vf(a);
  if (n === "number" && isFinite(a))
    return e.long ? Zf(a) : Xf(a);
  throw new Error(
    "val is not a non-empty string or a valid number. val=" + JSON.stringify(a)
  );
};
function Vf(a) {
  if (a = String(a), !(a.length > 100)) {
    var e = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
      a
    );
    if (e) {
      var n = parseFloat(e[1]), i = (e[2] || "ms").toLowerCase();
      switch (i) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * Gf;
        case "weeks":
        case "week":
        case "w":
          return n * Hf;
        case "days":
        case "day":
        case "d":
          return n * fe;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * Pe;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * Oe;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * Ce;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return;
      }
    }
  }
}
function Xf(a) {
  var e = Math.abs(a);
  return e >= fe ? Math.round(a / fe) + "d" : e >= Pe ? Math.round(a / Pe) + "h" : e >= Oe ? Math.round(a / Oe) + "m" : e >= Ce ? Math.round(a / Ce) + "s" : a + "ms";
}
function Zf(a) {
  var e = Math.abs(a);
  return e >= fe ? ma(a, e, fe, "day") : e >= Pe ? ma(a, e, Pe, "hour") : e >= Oe ? ma(a, e, Oe, "minute") : e >= Ce ? ma(a, e, Ce, "second") : a + " ms";
}
function ma(a, e, n, i) {
  var t = e >= n * 1.5;
  return Math.round(a / n) + " " + i + (t ? "s" : "");
}
/*!
 * range-parser
 * Copyright(c) 2012-2014 TJ Holowaychuk
 * Copyright(c) 2015-2016 Douglas Christopher Wilson
 * MIT Licensed
 */
var zo = Qf;
function Qf(a, e, n) {
  if (typeof e != "string")
    throw new TypeError("argument str must be a string");
  var i = e.indexOf("=");
  if (i === -1)
    return -2;
  var t = e.slice(i + 1).split(","), r = [];
  r.type = e.slice(0, i);
  for (var o = 0; o < t.length; o++) {
    var s = t[o].split("-"), c = parseInt(s[0], 10), u = parseInt(s[1], 10);
    isNaN(c) ? (c = a - u, u = a - 1) : isNaN(u) && (u = a - 1), u > a - 1 && (u = a - 1), !(isNaN(c) || isNaN(u) || c > u || c < 0) && r.push({
      start: c,
      end: u
    });
  }
  return r.length < 1 ? -1 : n && n.combine ? Jf(r) : r;
}
function Jf(a) {
  for (var e = a.map(Kf).sort(am), n = 0, i = 1; i < e.length; i++) {
    var t = e[i], r = e[n];
    t.start > r.end + 1 ? e[++n] = t : t.end > r.end && (r.end = t.end, r.index = Math.min(r.index, t.index));
  }
  e.length = n + 1;
  var o = e.sort(em).map(Yf);
  return o.type = a.type, o;
}
function Kf(a, e) {
  return {
    start: a.start,
    end: a.end,
    index: e
  };
}
function Yf(a) {
  return {
    start: a.start,
    end: a.end
  };
}
function em(a, e) {
  return a.index - e.index;
}
function am(a, e) {
  return a.start - e.start;
}
/*!
 * send
 * Copyright(c) 2012 TJ Holowaychuk
 * Copyright(c) 2014-2022 Douglas Christopher Wilson
 * MIT Licensed
 */
var Fn = Ie, q = Z("send"), ve = ne("send"), nm = Tr, im = Tf, Bo = Ha, tm = qo, rm = Fo, Oa = $e, Zn = Uf, Do = Wf, om = Ba, sm = zo, ia = ce, cm = za, No = Xe, pm = Jn, lm = ia.extname, Lo = ia.join, zn = ia.normalize, hi = ia.resolve, wa = ia.sep, um = /^ *bytes=/, Mo = 60 * 60 * 24 * 365 * 1e3, Qt = /(?:^|[\\/])\.\.(?:[\\/]|$)/;
xi.exports = dm;
xi.exports.mime = Zn;
function dm(a, e, n) {
  return new P(a, e, n);
}
function P(a, e, n) {
  No.call(this);
  var i = n || {};
  if (this.options = i, this.path = e, this.req = a, this._acceptRanges = i.acceptRanges !== void 0 ? !!i.acceptRanges : !0, this._cacheControl = i.cacheControl !== void 0 ? !!i.cacheControl : !0, this._etag = i.etag !== void 0 ? !!i.etag : !0, this._dotfiles = i.dotfiles !== void 0 ? i.dotfiles : "ignore", this._dotfiles !== "ignore" && this._dotfiles !== "allow" && this._dotfiles !== "deny")
    throw new TypeError('dotfiles option must be "allow", "deny", or "ignore"');
  this._hidden = !!i.hidden, i.hidden !== void 0 && ve("hidden: use dotfiles: '" + (this._hidden ? "allow" : "ignore") + "' instead"), i.dotfiles === void 0 && (this._dotfiles = void 0), this._extensions = i.extensions !== void 0 ? Qn(i.extensions, "extensions option") : [], this._immutable = i.immutable !== void 0 ? !!i.immutable : !1, this._index = i.index !== void 0 ? Qn(i.index, "index option") : ["index.html"], this._lastModified = i.lastModified !== void 0 ? !!i.lastModified : !0, this._maxage = i.maxAge || i.maxage, this._maxage = typeof this._maxage == "string" ? Do(this._maxage) : Number(this._maxage), this._maxage = isNaN(this._maxage) ? 0 : Math.min(Math.max(0, this._maxage), Mo), this._root = i.root ? hi(i.root) : null, !this._root && i.from && this.from(i.from);
}
pm.inherits(P, No);
P.prototype.etag = ve.function(function(e) {
  return this._etag = !!e, q("etag %s", this._etag), this;
}, "send.etag: pass etag as option");
P.prototype.hidden = ve.function(function(e) {
  return this._hidden = !!e, this._dotfiles = void 0, q("hidden %s", this._hidden), this;
}, "send.hidden: use dotfiles option");
P.prototype.index = ve.function(function(e) {
  var n = e ? Qn(e, "paths argument") : [];
  return q("index %o", e), this._index = n, this;
}, "send.index: pass index as option");
P.prototype.root = function(e) {
  return this._root = hi(String(e)), q("root %s", this._root), this;
};
P.prototype.from = ve.function(
  P.prototype.root,
  "send.from: pass root as option"
);
P.prototype.root = ve.function(
  P.prototype.root,
  "send.root: pass root as option"
);
P.prototype.maxage = ve.function(function(e) {
  return this._maxage = typeof e == "string" ? Do(e) : Number(e), this._maxage = isNaN(this._maxage) ? 0 : Math.min(Math.max(0, this._maxage), Mo), q("max-age %d", this._maxage), this;
}, "send.maxage: pass maxAge as option");
P.prototype.error = function(e, n) {
  if (Ho(this, "error"))
    return this.emit("error", xm(e, n));
  var i = this.res, t = cm.message[e] || String(e), r = Uo("Error", Bo(t));
  fm(i), n && n.headers && wm(i, n.headers), i.statusCode = e, i.setHeader("Content-Type", "text/html; charset=UTF-8"), i.setHeader("Content-Length", Buffer.byteLength(r)), i.setHeader("Content-Security-Policy", "default-src 'none'"), i.setHeader("X-Content-Type-Options", "nosniff"), i.end(r);
};
P.prototype.hasTrailingSlash = function() {
  return this.path[this.path.length - 1] === "/";
};
P.prototype.isConditionalGET = function() {
  return this.req.headers["if-match"] || this.req.headers["if-unmodified-since"] || this.req.headers["if-none-match"] || this.req.headers["if-modified-since"];
};
P.prototype.isPreconditionFailure = function() {
  var e = this.req, n = this.res, i = e.headers["if-match"];
  if (i) {
    var t = n.getHeader("ETag");
    return !t || i !== "*" && ym(i).every(function(s) {
      return s !== t && s !== "W/" + t && "W/" + s !== t;
    });
  }
  var r = Pa(e.headers["if-unmodified-since"]);
  if (!isNaN(r)) {
    var o = Pa(n.getHeader("Last-Modified"));
    return isNaN(o) || o > r;
  }
  return !1;
};
P.prototype.removeContentHeaderFields = function() {
  var e = this.res;
  e.removeHeader("Content-Encoding"), e.removeHeader("Content-Language"), e.removeHeader("Content-Length"), e.removeHeader("Content-Range"), e.removeHeader("Content-Type");
};
P.prototype.notModified = function() {
  var e = this.res;
  q("not modified"), this.removeContentHeaderFields(), e.statusCode = 304, e.end();
};
P.prototype.headersAlreadySent = function() {
  var e = new Error("Can't set headers after they are sent.");
  q("headers already sent"), this.error(500, e);
};
P.prototype.isCachable = function() {
  var e = this.res.statusCode;
  return e >= 200 && e < 300 || e === 304;
};
P.prototype.onStatError = function(e) {
  switch (e.code) {
    case "ENAMETOOLONG":
    case "ENOENT":
    case "ENOTDIR":
      this.error(404, e);
      break;
    default:
      this.error(500, e);
      break;
  }
};
P.prototype.isFresh = function() {
  return rm(this.req.headers, {
    etag: this.res.getHeader("ETag"),
    "last-modified": this.res.getHeader("Last-Modified")
  });
};
P.prototype.isRangeFresh = function() {
  var e = this.req.headers["if-range"];
  if (!e)
    return !0;
  if (e.indexOf('"') !== -1) {
    var n = this.res.getHeader("ETag");
    return !!(n && e.indexOf(n) !== -1);
  }
  var i = this.res.getHeader("Last-Modified");
  return Pa(i) <= Pa(e);
};
P.prototype.redirect = function(e) {
  var n = this.res;
  if (Ho(this, "directory")) {
    this.emit("directory", n, e);
    return;
  }
  if (this.hasTrailingSlash()) {
    this.error(403);
    return;
  }
  var i = im(mm(this.path + "/")), t = Uo("Redirecting", "Redirecting to " + Bo(i));
  n.statusCode = 301, n.setHeader("Content-Type", "text/html; charset=UTF-8"), n.setHeader("Content-Length", Buffer.byteLength(t)), n.setHeader("Content-Security-Policy", "default-src 'none'"), n.setHeader("X-Content-Type-Options", "nosniff"), n.setHeader("Location", i), n.end(t);
};
P.prototype.pipe = function(e) {
  var n = this._root;
  this.res = e;
  var i = hm(this.path);
  if (i === -1)
    return this.error(400), e;
  if (~i.indexOf("\0"))
    return this.error(400), e;
  var t;
  if (n !== null) {
    if (i && (i = zn("." + wa + i)), Qt.test(i))
      return q('malicious path "%s"', i), this.error(403), e;
    t = i.split(wa), i = zn(Lo(n, i));
  } else {
    if (Qt.test(i))
      return q('malicious path "%s"', i), this.error(403), e;
    t = zn(i).split(wa), i = hi(i);
  }
  if (vm(t)) {
    var r = this._dotfiles;
    switch (r === void 0 && (r = t[t.length - 1][0] === "." ? this._hidden ? "allow" : "ignore" : "allow"), q('%s dotfile "%s"', r, i), r) {
      case "allow":
        break;
      case "deny":
        return this.error(403), e;
      case "ignore":
      default:
        return this.error(404), e;
    }
  }
  return this._index.length && this.hasTrailingSlash() ? (this.sendIndex(i), e) : (this.sendFile(i), e);
};
P.prototype.send = function(e, n) {
  var i = n.size, t = this.options, r = {}, o = this.res, s = this.req, c = s.headers.range, u = t.start || 0;
  if (bm(o)) {
    this.headersAlreadySent();
    return;
  }
  if (q('pipe "%s"', e), this.setHeader(e, n), this.type(e), this.isConditionalGET()) {
    if (this.isPreconditionFailure()) {
      this.error(412);
      return;
    }
    if (this.isCachable() && this.isFresh()) {
      this.notModified();
      return;
    }
  }
  if (i = Math.max(0, i - u), t.end !== void 0) {
    var p = t.end - u + 1;
    i > p && (i = p);
  }
  if (this._acceptRanges && um.test(c)) {
    if (c = sm(i, c, {
      combine: !0
    }), this.isRangeFresh() || (q("range stale"), c = -2), c === -1)
      return q("range unsatisfiable"), o.setHeader("Content-Range", Jt("bytes", i)), this.error(416, {
        headers: { "Content-Range": o.getHeader("Content-Range") }
      });
    c !== -2 && c.length === 1 && (q("range %j", c), o.statusCode = 206, o.setHeader("Content-Range", Jt("bytes", i, c[0])), u += c[0].start, i = c[0].end - c[0].start + 1);
  }
  for (var f in t)
    r[f] = t[f];
  if (r.start = u, r.end = Math.max(u, u + i - 1), o.setHeader("Content-Length", i), s.method === "HEAD") {
    o.end();
    return;
  }
  this.stream(e, r);
};
P.prototype.sendFile = function(e) {
  var n = 0, i = this;
  q('stat "%s"', e), Oa.stat(e, function(o, s) {
    if (o && o.code === "ENOENT" && !lm(e) && e[e.length - 1] !== wa)
      return t(o);
    if (o) return i.onStatError(o);
    if (s.isDirectory()) return i.redirect(e);
    i.emit("file", e, s), i.send(e, s);
  });
  function t(r) {
    if (i._extensions.length <= n)
      return r ? i.onStatError(r) : i.error(404);
    var o = e + "." + i._extensions[n++];
    q('stat "%s"', o), Oa.stat(o, function(s, c) {
      if (s) return t(s);
      if (c.isDirectory()) return t();
      i.emit("file", o, c), i.send(o, c);
    });
  }
};
P.prototype.sendIndex = function(e) {
  var n = -1, i = this;
  function t(r) {
    if (++n >= i._index.length)
      return r ? i.onStatError(r) : i.error(404);
    var o = Lo(e, i._index[n]);
    q('stat "%s"', o), Oa.stat(o, function(s, c) {
      if (s) return t(s);
      if (c.isDirectory()) return t();
      i.emit("file", o, c), i.send(o, c);
    });
  }
  t();
};
P.prototype.stream = function(e, n) {
  var i = this, t = this.res, r = Oa.createReadStream(e, n);
  this.emit("stream", r), r.pipe(t);
  function o() {
    nm(r, !0);
  }
  om(t, o), r.on("error", function(c) {
    o(), i.onStatError(c);
  }), r.on("end", function() {
    i.emit("end");
  });
};
P.prototype.type = function(e) {
  var n = this.res;
  if (!n.getHeader("Content-Type")) {
    var i = Zn.lookup(e);
    if (!i) {
      q("no content-type");
      return;
    }
    var t = Zn.charsets.lookup(i);
    q("content-type %s", i), n.setHeader("Content-Type", i + (t ? "; charset=" + t : ""));
  }
};
P.prototype.setHeader = function(e, n) {
  var i = this.res;
  if (this.emit("headers", i, e, n), this._acceptRanges && !i.getHeader("Accept-Ranges") && (q("accept ranges"), i.setHeader("Accept-Ranges", "bytes")), this._cacheControl && !i.getHeader("Cache-Control")) {
    var t = "public, max-age=" + Math.floor(this._maxage / 1e3);
    this._immutable && (t += ", immutable"), q("cache-control %s", t), i.setHeader("Cache-Control", t);
  }
  if (this._lastModified && !i.getHeader("Last-Modified")) {
    var r = n.mtime.toUTCString();
    q("modified %s", r), i.setHeader("Last-Modified", r);
  }
  if (this._etag && !i.getHeader("ETag")) {
    var o = tm(n);
    q("etag %s", o), i.setHeader("ETag", o);
  }
};
function fm(a) {
  for (var e = gm(a), n = 0; n < e.length; n++)
    a.removeHeader(e[n]);
}
function mm(a) {
  for (var e = 0; e < a.length && a[e] === "/"; e++)
    ;
  return e > 1 ? "/" + a.substr(e) : a;
}
function vm(a) {
  for (var e = 0; e < a.length; e++) {
    var n = a[e];
    if (n.length > 1 && n[0] === ".")
      return !0;
  }
  return !1;
}
function Jt(a, e, n) {
  return a + " " + (n ? n.start + "-" + n.end : "*") + "/" + e;
}
function Uo(a, e) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>` + a + `</title>
</head>
<body>
<pre>` + e + `</pre>
</body>
</html>
`;
}
function xm(a, e) {
  return e ? e instanceof Error ? Fn(a, e, { expose: !1 }) : Fn(a, e) : Fn(a);
}
function hm(a) {
  try {
    return decodeURIComponent(a);
  } catch {
    return -1;
  }
}
function gm(a) {
  return typeof a.getHeaderNames != "function" ? Object.keys(a._headers || {}) : a.getHeaderNames();
}
function Ho(a, e) {
  var n = typeof a.listenerCount != "function" ? a.listeners(e).length : a.listenerCount(e);
  return n > 0;
}
function bm(a) {
  return typeof a.headersSent != "boolean" ? !!a._header : a.headersSent;
}
function Qn(a, e) {
  for (var n = [].concat(a || []), i = 0; i < n.length; i++)
    if (typeof n[i] != "string")
      throw new TypeError(e + " must be array of strings or false");
  return n;
}
function Pa(a) {
  var e = a && Date.parse(a);
  return typeof e == "number" ? e : NaN;
}
function ym(a) {
  for (var e = 0, n = [], i = 0, t = 0, r = a.length; t < r; t++)
    switch (a.charCodeAt(t)) {
      case 32:
        i === e && (i = e = t + 1);
        break;
      case 44:
        i !== e && n.push(a.substring(i, e)), i = e = t + 1;
        break;
      default:
        e = t + 1;
        break;
    }
  return i !== e && n.push(a.substring(i, e)), n;
}
function wm(a, e) {
  for (var n = Object.keys(e), i = 0; i < n.length; i++) {
    var t = n[i];
    a.setHeader(t, e[t]);
  }
}
var gi = xi.exports, Za = { exports: {} };
/*!
 * forwarded
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */
var km = Em;
function Em(a) {
  if (!a)
    throw new TypeError("argument req is required");
  var e = jm(a.headers["x-forwarded-for"] || ""), n = Sm(a), i = [n].concat(e);
  return i;
}
function Sm(a) {
  return a.socket ? a.socket.remoteAddress : a.connection.remoteAddress;
}
function jm(a) {
  for (var e = a.length, n = [], i = a.length, t = a.length - 1; t >= 0; t--)
    switch (a.charCodeAt(t)) {
      case 32:
        i === e && (i = e = t);
        break;
      case 44:
        i !== e && n.push(a.substring(i, e)), i = e = t;
        break;
      default:
        i = t;
        break;
    }
  return i !== e && n.push(a.substring(i, e)), n;
}
var bi = { exports: {} };
bi.exports;
(function(a) {
  (function() {
    var e, n, i, t, r, o, s, c, u;
    n = {}, c = this, a !== null && a.exports ? a.exports = n : c.ipaddr = n, s = function(p, f, l, x) {
      var v, d;
      if (p.length !== f.length)
        throw new Error("ipaddr: cannot match CIDR for objects with different lengths");
      for (v = 0; x > 0; ) {
        if (d = l - x, d < 0 && (d = 0), p[v] >> d !== f[v] >> d)
          return !1;
        x -= l, v += 1;
      }
      return !0;
    }, n.subnetMatch = function(p, f, l) {
      var x, v, d, m, h;
      l == null && (l = "unicast");
      for (d in f)
        for (m = f[d], m[0] && !(m[0] instanceof Array) && (m = [m]), x = 0, v = m.length; x < v; x++)
          if (h = m[x], p.kind() === h[0].kind() && p.match.apply(p, h))
            return d;
      return l;
    }, n.IPv4 = function() {
      function p(f) {
        var l, x, v;
        if (f.length !== 4)
          throw new Error("ipaddr: ipv4 octet count should be 4");
        for (l = 0, x = f.length; l < x; l++)
          if (v = f[l], !(0 <= v && v <= 255))
            throw new Error("ipaddr: ipv4 octet should fit in 8 bits");
        this.octets = f;
      }
      return p.prototype.kind = function() {
        return "ipv4";
      }, p.prototype.toString = function() {
        return this.octets.join(".");
      }, p.prototype.toNormalizedString = function() {
        return this.toString();
      }, p.prototype.toByteArray = function() {
        return this.octets.slice(0);
      }, p.prototype.match = function(f, l) {
        var x;
        if (l === void 0 && (x = f, f = x[0], l = x[1]), f.kind() !== "ipv4")
          throw new Error("ipaddr: cannot match ipv4 address with non-ipv4 one");
        return s(this.octets, f.octets, 8, l);
      }, p.prototype.SpecialRanges = {
        unspecified: [[new p([0, 0, 0, 0]), 8]],
        broadcast: [[new p([255, 255, 255, 255]), 32]],
        multicast: [[new p([224, 0, 0, 0]), 4]],
        linkLocal: [[new p([169, 254, 0, 0]), 16]],
        loopback: [[new p([127, 0, 0, 0]), 8]],
        carrierGradeNat: [[new p([100, 64, 0, 0]), 10]],
        private: [[new p([10, 0, 0, 0]), 8], [new p([172, 16, 0, 0]), 12], [new p([192, 168, 0, 0]), 16]],
        reserved: [[new p([192, 0, 0, 0]), 24], [new p([192, 0, 2, 0]), 24], [new p([192, 88, 99, 0]), 24], [new p([198, 51, 100, 0]), 24], [new p([203, 0, 113, 0]), 24], [new p([240, 0, 0, 0]), 4]]
      }, p.prototype.range = function() {
        return n.subnetMatch(this, this.SpecialRanges);
      }, p.prototype.toIPv4MappedAddress = function() {
        return n.IPv6.parse("::ffff:" + this.toString());
      }, p.prototype.prefixLengthFromSubnetMask = function() {
        var f, l, x, v, d, m, h;
        for (h = {
          0: 8,
          128: 7,
          192: 6,
          224: 5,
          240: 4,
          248: 3,
          252: 2,
          254: 1,
          255: 0
        }, f = 0, d = !1, l = x = 3; x >= 0; l = x += -1)
          if (v = this.octets[l], v in h) {
            if (m = h[v], d && m !== 0)
              return null;
            m !== 8 && (d = !0), f += m;
          } else
            return null;
        return 32 - f;
      }, p;
    }(), i = "(0?\\d+|0x[a-f0-9]+)", t = {
      fourOctet: new RegExp("^" + i + "\\." + i + "\\." + i + "\\." + i + "$", "i"),
      longValue: new RegExp("^" + i + "$", "i")
    }, n.IPv4.parser = function(p) {
      var f, l, x, v, d;
      if (l = function(m) {
        return m[0] === "0" && m[1] !== "x" ? parseInt(m, 8) : parseInt(m);
      }, f = p.match(t.fourOctet))
        return function() {
          var m, h, g, b;
          for (g = f.slice(1, 6), b = [], m = 0, h = g.length; m < h; m++)
            x = g[m], b.push(l(x));
          return b;
        }();
      if (f = p.match(t.longValue)) {
        if (d = l(f[1]), d > 4294967295 || d < 0)
          throw new Error("ipaddr: address outside defined range");
        return function() {
          var m, h;
          for (h = [], v = m = 0; m <= 24; v = m += 8)
            h.push(d >> v & 255);
          return h;
        }().reverse();
      } else
        return null;
    }, n.IPv6 = function() {
      function p(f, l) {
        var x, v, d, m, h, g;
        if (f.length === 16)
          for (this.parts = [], x = v = 0; v <= 14; x = v += 2)
            this.parts.push(f[x] << 8 | f[x + 1]);
        else if (f.length === 8)
          this.parts = f;
        else
          throw new Error("ipaddr: ipv6 part count should be 8 or 16");
        for (g = this.parts, d = 0, m = g.length; d < m; d++)
          if (h = g[d], !(0 <= h && h <= 65535))
            throw new Error("ipaddr: ipv6 part should fit in 16 bits");
        l && (this.zoneId = l);
      }
      return p.prototype.kind = function() {
        return "ipv6";
      }, p.prototype.toString = function() {
        return this.toNormalizedString().replace(/((^|:)(0(:|$))+)/, "::");
      }, p.prototype.toRFC5952String = function() {
        var f, l, x, v, d;
        for (v = /((^|:)(0(:|$)){2,})/g, d = this.toNormalizedString(), f = 0, l = -1; x = v.exec(d); )
          x[0].length > l && (f = x.index, l = x[0].length);
        return l < 0 ? d : d.substring(0, f) + "::" + d.substring(f + l);
      }, p.prototype.toByteArray = function() {
        var f, l, x, v, d;
        for (f = [], d = this.parts, l = 0, x = d.length; l < x; l++)
          v = d[l], f.push(v >> 8), f.push(v & 255);
        return f;
      }, p.prototype.toNormalizedString = function() {
        var f, l, x;
        return f = (function() {
          var v, d, m, h;
          for (m = this.parts, h = [], v = 0, d = m.length; v < d; v++)
            l = m[v], h.push(l.toString(16));
          return h;
        }).call(this).join(":"), x = "", this.zoneId && (x = "%" + this.zoneId), f + x;
      }, p.prototype.toFixedLengthString = function() {
        var f, l, x;
        return f = (function() {
          var v, d, m, h;
          for (m = this.parts, h = [], v = 0, d = m.length; v < d; v++)
            l = m[v], h.push(l.toString(16).padStart(4, "0"));
          return h;
        }).call(this).join(":"), x = "", this.zoneId && (x = "%" + this.zoneId), f + x;
      }, p.prototype.match = function(f, l) {
        var x;
        if (l === void 0 && (x = f, f = x[0], l = x[1]), f.kind() !== "ipv6")
          throw new Error("ipaddr: cannot match ipv6 address with non-ipv6 one");
        return s(this.parts, f.parts, 16, l);
      }, p.prototype.SpecialRanges = {
        unspecified: [new p([0, 0, 0, 0, 0, 0, 0, 0]), 128],
        linkLocal: [new p([65152, 0, 0, 0, 0, 0, 0, 0]), 10],
        multicast: [new p([65280, 0, 0, 0, 0, 0, 0, 0]), 8],
        loopback: [new p([0, 0, 0, 0, 0, 0, 0, 1]), 128],
        uniqueLocal: [new p([64512, 0, 0, 0, 0, 0, 0, 0]), 7],
        ipv4Mapped: [new p([0, 0, 0, 0, 0, 65535, 0, 0]), 96],
        rfc6145: [new p([0, 0, 0, 0, 65535, 0, 0, 0]), 96],
        rfc6052: [new p([100, 65435, 0, 0, 0, 0, 0, 0]), 96],
        "6to4": [new p([8194, 0, 0, 0, 0, 0, 0, 0]), 16],
        teredo: [new p([8193, 0, 0, 0, 0, 0, 0, 0]), 32],
        reserved: [[new p([8193, 3512, 0, 0, 0, 0, 0, 0]), 32]]
      }, p.prototype.range = function() {
        return n.subnetMatch(this, this.SpecialRanges);
      }, p.prototype.isIPv4MappedAddress = function() {
        return this.range() === "ipv4Mapped";
      }, p.prototype.toIPv4Address = function() {
        var f, l, x;
        if (!this.isIPv4MappedAddress())
          throw new Error("ipaddr: trying to convert a generic ipv6 address to ipv4");
        return x = this.parts.slice(-2), f = x[0], l = x[1], new n.IPv4([f >> 8, f & 255, l >> 8, l & 255]);
      }, p.prototype.prefixLengthFromSubnetMask = function() {
        var f, l, x, v, d, m, h;
        for (h = {
          0: 16,
          32768: 15,
          49152: 14,
          57344: 13,
          61440: 12,
          63488: 11,
          64512: 10,
          65024: 9,
          65280: 8,
          65408: 7,
          65472: 6,
          65504: 5,
          65520: 4,
          65528: 3,
          65532: 2,
          65534: 1,
          65535: 0
        }, f = 0, d = !1, l = x = 7; x >= 0; l = x += -1)
          if (v = this.parts[l], v in h) {
            if (m = h[v], d && m !== 0)
              return null;
            m !== 16 && (d = !0), f += m;
          } else
            return null;
        return 128 - f;
      }, p;
    }(), r = "(?:[0-9a-f]+::?)+", u = "%[0-9a-z]{1,}", o = {
      zoneIndex: new RegExp(u, "i"),
      native: new RegExp("^(::)?(" + r + ")?([0-9a-f]+)?(::)?(" + u + ")?$", "i"),
      transitional: new RegExp("^((?:" + r + ")|(?:::)(?:" + r + ")?)" + (i + "\\." + i + "\\." + i + "\\." + i) + ("(" + u + ")?$"), "i")
    }, e = function(p, f) {
      var l, x, v, d, m, h;
      if (p.indexOf("::") !== p.lastIndexOf("::"))
        return null;
      for (h = (p.match(o.zoneIndex) || [])[0], h && (h = h.substring(1), p = p.replace(/%.+$/, "")), l = 0, x = -1; (x = p.indexOf(":", x + 1)) >= 0; )
        l++;
      if (p.substr(0, 2) === "::" && l--, p.substr(-2, 2) === "::" && l--, l > f)
        return null;
      for (m = f - l, d = ":"; m--; )
        d += "0:";
      return p = p.replace("::", d), p[0] === ":" && (p = p.slice(1)), p[p.length - 1] === ":" && (p = p.slice(0, -1)), f = function() {
        var g, b, y, w;
        for (y = p.split(":"), w = [], g = 0, b = y.length; g < b; g++)
          v = y[g], w.push(parseInt(v, 16));
        return w;
      }(), {
        parts: f,
        zoneId: h
      };
    }, n.IPv6.parser = function(p) {
      var f, l, x, v, d, m, h;
      if (o.native.test(p))
        return e(p, 8);
      if ((v = p.match(o.transitional)) && (h = v[6] || "", f = e(v[1].slice(0, -1) + h, 6), f.parts)) {
        for (m = [parseInt(v[2]), parseInt(v[3]), parseInt(v[4]), parseInt(v[5])], l = 0, x = m.length; l < x; l++)
          if (d = m[l], !(0 <= d && d <= 255))
            return null;
        return f.parts.push(m[0] << 8 | m[1]), f.parts.push(m[2] << 8 | m[3]), {
          parts: f.parts,
          zoneId: f.zoneId
        };
      }
      return null;
    }, n.IPv4.isIPv4 = n.IPv6.isIPv6 = function(p) {
      return this.parser(p) !== null;
    }, n.IPv4.isValid = function(p) {
      try {
        return new this(this.parser(p)), !0;
      } catch {
        return !1;
      }
    }, n.IPv4.isValidFourPartDecimal = function(p) {
      return !!(n.IPv4.isValid(p) && p.match(/^(0|[1-9]\d*)(\.(0|[1-9]\d*)){3}$/));
    }, n.IPv6.isValid = function(p) {
      var f;
      if (typeof p == "string" && p.indexOf(":") === -1)
        return !1;
      try {
        return f = this.parser(p), new this(f.parts, f.zoneId), !0;
      } catch {
        return !1;
      }
    }, n.IPv4.parse = function(p) {
      var f;
      if (f = this.parser(p), f === null)
        throw new Error("ipaddr: string is not formatted like ip address");
      return new this(f);
    }, n.IPv6.parse = function(p) {
      var f;
      if (f = this.parser(p), f.parts === null)
        throw new Error("ipaddr: string is not formatted like ip address");
      return new this(f.parts, f.zoneId);
    }, n.IPv4.parseCIDR = function(p) {
      var f, l, x;
      if ((l = p.match(/^(.+)\/(\d+)$/)) && (f = parseInt(l[2]), f >= 0 && f <= 32))
        return x = [this.parse(l[1]), f], Object.defineProperty(x, "toString", {
          value: function() {
            return this.join("/");
          }
        }), x;
      throw new Error("ipaddr: string is not formatted like an IPv4 CIDR range");
    }, n.IPv4.subnetMaskFromPrefixLength = function(p) {
      var f, l, x;
      if (p = parseInt(p), p < 0 || p > 32)
        throw new Error("ipaddr: invalid IPv4 prefix length");
      for (x = [0, 0, 0, 0], l = 0, f = Math.floor(p / 8); l < f; )
        x[l] = 255, l++;
      return f < 4 && (x[f] = Math.pow(2, p % 8) - 1 << 8 - p % 8), new this(x);
    }, n.IPv4.broadcastAddressFromCIDR = function(p) {
      var f, l, x, v, d;
      try {
        for (f = this.parseCIDR(p), x = f[0].toByteArray(), d = this.subnetMaskFromPrefixLength(f[1]).toByteArray(), v = [], l = 0; l < 4; )
          v.push(parseInt(x[l], 10) | parseInt(d[l], 10) ^ 255), l++;
        return new this(v);
      } catch {
        throw new Error("ipaddr: the address does not have IPv4 CIDR format");
      }
    }, n.IPv4.networkAddressFromCIDR = function(p) {
      var f, l, x, v, d;
      try {
        for (f = this.parseCIDR(p), x = f[0].toByteArray(), d = this.subnetMaskFromPrefixLength(f[1]).toByteArray(), v = [], l = 0; l < 4; )
          v.push(parseInt(x[l], 10) & parseInt(d[l], 10)), l++;
        return new this(v);
      } catch {
        throw new Error("ipaddr: the address does not have IPv4 CIDR format");
      }
    }, n.IPv6.parseCIDR = function(p) {
      var f, l, x;
      if ((l = p.match(/^(.+)\/(\d+)$/)) && (f = parseInt(l[2]), f >= 0 && f <= 128))
        return x = [this.parse(l[1]), f], Object.defineProperty(x, "toString", {
          value: function() {
            return this.join("/");
          }
        }), x;
      throw new Error("ipaddr: string is not formatted like an IPv6 CIDR range");
    }, n.isValid = function(p) {
      return n.IPv6.isValid(p) || n.IPv4.isValid(p);
    }, n.parse = function(p) {
      if (n.IPv6.isValid(p))
        return n.IPv6.parse(p);
      if (n.IPv4.isValid(p))
        return n.IPv4.parse(p);
      throw new Error("ipaddr: the address has neither IPv6 nor IPv4 format");
    }, n.parseCIDR = function(p) {
      try {
        return n.IPv6.parseCIDR(p);
      } catch {
        try {
          return n.IPv4.parseCIDR(p);
        } catch {
          throw new Error("ipaddr: the address has neither IPv6 nor IPv4 CIDR format");
        }
      }
    }, n.fromByteArray = function(p) {
      var f;
      if (f = p.length, f === 4)
        return new n.IPv4(p);
      if (f === 16)
        return new n.IPv6(p);
      throw new Error("ipaddr: the binary input is neither an IPv6 nor IPv4 address");
    }, n.process = function(p) {
      var f;
      return f = this.parse(p), f.kind() === "ipv6" && f.isIPv4MappedAddress() ? f.toIPv4Address() : f;
    };
  }).call(Ea);
})(bi);
var Am = bi.exports;
/*!
 * proxy-addr
 * Copyright(c) 2014-2016 Douglas Christopher Wilson
 * MIT Licensed
 */
Za.exports = Rm;
Za.exports.all = Wo;
Za.exports.compile = Vo;
var _m = km, Go = Am, Tm = /^[0-9]+$/, $a = Go.isValid, Qa = Go.parse, Kt = {
  linklocal: ["169.254.0.0/16", "fe80::/10"],
  loopback: ["127.0.0.1/8", "::1/128"],
  uniquelocal: ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16", "fc00::/7"]
};
function Wo(a, e) {
  var n = _m(a);
  if (!e)
    return n;
  typeof e != "function" && (e = Vo(e));
  for (var i = 0; i < n.length - 1; i++)
    e(n[i], i) || (n.length = i + 1);
  return n;
}
function Vo(a) {
  if (!a)
    throw new TypeError("argument is required");
  var e;
  if (typeof a == "string")
    e = [a];
  else if (Array.isArray(a))
    e = a.slice();
  else
    throw new TypeError("unsupported trust argument");
  for (var n = 0; n < e.length; n++)
    a = e[n], Object.prototype.hasOwnProperty.call(Kt, a) && (a = Kt[a], e.splice.apply(e, [n, 1].concat(a)), n += a.length - 1);
  return Om(Cm(e));
}
function Cm(a) {
  for (var e = new Array(a.length), n = 0; n < a.length; n++)
    e[n] = Pm(a[n]);
  return e;
}
function Om(a) {
  var e = a.length;
  return e === 0 ? Im : e === 1 ? Fm(a[0]) : qm(a);
}
function Pm(a) {
  var e = a.lastIndexOf("/"), n = e !== -1 ? a.substring(0, e) : a;
  if (!$a(n))
    throw new TypeError("invalid IP address: " + n);
  var i = Qa(n);
  e === -1 && i.kind() === "ipv6" && i.isIPv4MappedAddress() && (i = i.toIPv4Address());
  var t = i.kind() === "ipv6" ? 128 : 32, r = e !== -1 ? a.substring(e + 1, a.length) : null;
  if (r === null ? r = t : Tm.test(r) ? r = parseInt(r, 10) : i.kind() === "ipv4" && $a(r) ? r = $m(r) : r = null, r <= 0 || r > t)
    throw new TypeError("invalid range on address: " + a);
  return [i, r];
}
function $m(a) {
  var e = Qa(a), n = e.kind();
  return n === "ipv4" ? e.prefixLengthFromSubnetMask() : null;
}
function Rm(a, e) {
  if (!a)
    throw new TypeError("req argument is required");
  if (!e)
    throw new TypeError("trust argument is required");
  var n = Wo(a, e), i = n[n.length - 1];
  return i;
}
function Im() {
  return !1;
}
function qm(a) {
  return function(n) {
    if (!$a(n)) return !1;
    for (var i = Qa(n), t, r = i.kind(), o = 0; o < a.length; o++) {
      var s = a[o], c = s[0], u = c.kind(), p = s[1], f = i;
      if (r !== u) {
        if (u === "ipv4" && !i.isIPv4MappedAddress())
          continue;
        t || (t = u === "ipv4" ? i.toIPv4Address() : i.toIPv4MappedAddress()), f = t;
      }
      if (f.match(c, p))
        return !0;
    }
    return !1;
  };
}
function Fm(a) {
  var e = a[0], n = e.kind(), i = n === "ipv4", t = a[1];
  return function(o) {
    if (!$a(o)) return !1;
    var s = Qa(o), c = s.kind();
    if (c !== n) {
      if (i && !s.isIPv4MappedAddress())
        return !1;
      s = i ? s.toIPv4Address() : s.toIPv4MappedAddress();
    }
    return s.match(e, t);
  };
}
var Xo = Za.exports;
/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
(function(a) {
  var e = mi.Buffer, n = Io, i = Re, t = ne("express"), r = Ga, o = gi.mime, s = qo, c = Xo, u = li, p = hr;
  a.etag = l({ weak: !1 }), a.wetag = l({ weak: !0 }), a.isAbsolute = function(d) {
    if (d[0] === "/" || d[1] === ":" && (d[2] === "\\" || d[2] === "/") || d.substring(0, 2) === "\\\\") return !0;
  }, a.flatten = t.function(
    r,
    "utils.flatten: use array-flatten npm module instead"
  ), a.normalizeType = function(d) {
    return ~d.indexOf("/") ? f(d) : { value: o.lookup(d), params: {} };
  }, a.normalizeTypes = function(d) {
    for (var m = [], h = 0; h < d.length; ++h)
      m.push(a.normalizeType(d[h]));
    return m;
  }, a.contentDisposition = t.function(
    n,
    "utils.contentDisposition: use content-disposition npm module instead"
  );
  function f(d) {
    for (var m = d.split(/ *; */), h = { value: m[0], quality: 1, params: {} }, g = 1; g < m.length; ++g) {
      var b = m[g].split(/ *= */);
      b[0] === "q" ? h.quality = parseFloat(b[1]) : h.params[b[0]] = b[1];
    }
    return h;
  }
  a.compileETag = function(d) {
    var m;
    if (typeof d == "function")
      return d;
    switch (d) {
      case !0:
      case "weak":
        m = a.wetag;
        break;
      case !1:
        break;
      case "strong":
        m = a.etag;
        break;
      default:
        throw new TypeError("unknown value for etag function: " + d);
    }
    return m;
  }, a.compileQueryParser = function(m) {
    var h;
    if (typeof m == "function")
      return m;
    switch (m) {
      case !0:
      case "simple":
        h = p.parse;
        break;
      case !1:
        h = v;
        break;
      case "extended":
        h = x;
        break;
      default:
        throw new TypeError("unknown value for query parser function: " + m);
    }
    return h;
  }, a.compileTrust = function(d) {
    return typeof d == "function" ? d : d === !0 ? function() {
      return !0;
    } : typeof d == "number" ? function(m, h) {
      return h < d;
    } : (typeof d == "string" && (d = d.split(",").map(function(m) {
      return m.trim();
    })), c.compile(d || []));
  }, a.setCharset = function(m, h) {
    if (!m || !h)
      return m;
    var g = i.parse(m);
    return g.parameters.charset = h, i.format(g);
  };
  function l(d) {
    return function(h, g) {
      var b = e.isBuffer(h) ? h : e.from(h, g);
      return s(b, d);
    };
  }
  function x(d) {
    return u.parse(d, {
      allowPrototypes: !0
    });
  }
  function v() {
    return {};
  }
})(se);
(function(a, e) {
  /*!
   * express
   * Copyright(c) 2009-2013 TJ Holowaychuk
   * Copyright(c) 2013 Roman Shtylman
   * Copyright(c) 2014-2015 Douglas Christopher Wilson
   * MIT Licensed
   */
  var n = Ed, i = _o, t = fi, r = To, o = Co(), s = Z("express:application"), c = cf, u = Ia, p = se.compileETag, f = se.compileQueryParser, l = se.compileTrust, x = ne("express"), v = Ga, d = Wa, m = ce.resolve, h = Fa, g = Object.prototype.hasOwnProperty, b = Array.prototype.slice, y = a.exports = {}, w = "@@symbol:trust_proxy_default";
  y.init = function() {
    this.cache = {}, this.engines = {}, this.settings = {}, this.defaultConfiguration();
  }, y.defaultConfiguration = function() {
    var E = process.env.NODE_ENV || "development";
    this.enable("x-powered-by"), this.set("etag", "weak"), this.set("env", E), this.set("query parser", "extended"), this.set("subdomain offset", 2), this.set("trust proxy", !1), Object.defineProperty(this.settings, w, {
      configurable: !0,
      value: !0
    }), s("booting in %s mode", E), this.on("mount", function(j) {
      this.settings[w] === !0 && typeof j.settings["trust proxy fn"] == "function" && (delete this.settings["trust proxy"], delete this.settings["trust proxy fn"]), h(this.request, j.request), h(this.response, j.response), h(this.engines, j.engines), h(this.settings, j.settings);
    }), this.locals = /* @__PURE__ */ Object.create(null), this.mountpath = "/", this.locals.settings = this.settings, this.set("view", c), this.set("views", m("views")), this.set("jsonp callback name", "callback"), E === "production" && this.enable("view cache"), Object.defineProperty(this, "router", {
      get: function() {
        throw new Error(`'app.router' is deprecated!
Please see the 3.x to 4.x migration guide for details on how to update your app.`);
      }
    });
  }, y.lazyrouter = function() {
    this._router || (this._router = new i({
      caseSensitive: this.enabled("case sensitive routing"),
      strict: this.enabled("strict routing")
    }), this._router.use(o(this.get("query parser fn"))), this._router.use(r.init(this)));
  }, y.handle = function(E, S, j) {
    var T = this._router, C = j || n(E, S, {
      env: this.get("env"),
      onerror: k.bind(this)
    });
    if (!T) {
      s("no routes defined on app"), C();
      return;
    }
    T.handle(E, S, C);
  }, y.use = function(E) {
    var S = 0, j = "/";
    if (typeof E != "function") {
      for (var T = E; Array.isArray(T) && T.length !== 0; )
        T = T[0];
      typeof T != "function" && (S = 1, j = E);
    }
    var C = v(b.call(arguments, S));
    if (C.length === 0)
      throw new TypeError("app.use() requires a middleware function");
    this.lazyrouter();
    var B = this._router;
    return C.forEach(function(F) {
      if (!F || !F.handle || !F.set)
        return B.use(j, F);
      s(".use app under %s", j), F.mountpath = j, F.parent = this, B.use(j, function(D, xe, he) {
        var ee = D.app;
        F.handle(D, xe, function(ms) {
          h(D, ee.request), h(xe, ee.response), he(ms);
        });
      }), F.emit("mount", this);
    }, this), this;
  }, y.route = function(E) {
    return this.lazyrouter(), this._router.route(E);
  }, y.engine = function(E, S) {
    if (typeof S != "function")
      throw new Error("callback function required");
    var j = E[0] !== "." ? "." + E : E;
    return this.engines[j] = S, this;
  }, y.param = function(E, S) {
    if (this.lazyrouter(), Array.isArray(E)) {
      for (var j = 0; j < E.length; j++)
        this.param(E[j], S);
      return this;
    }
    return this._router.param(E, S), this;
  }, y.set = function(E, S) {
    if (arguments.length === 1) {
      for (var j = this.settings; j && j !== Object.prototype; ) {
        if (g.call(j, E))
          return j[E];
        j = Object.getPrototypeOf(j);
      }
      return;
    }
    switch (s('set "%s" to %o', E, S), this.settings[E] = S, E) {
      case "etag":
        this.set("etag fn", p(S));
        break;
      case "query parser":
        this.set("query parser fn", f(S));
        break;
      case "trust proxy":
        this.set("trust proxy fn", l(S)), Object.defineProperty(this.settings, w, {
          configurable: !0,
          value: !1
        });
        break;
    }
    return this;
  }, y.path = function() {
    return this.parent ? this.parent.path() + this.mountpath : "";
  }, y.enabled = function(E) {
    return !!this.set(E);
  }, y.disabled = function(E) {
    return !this.set(E);
  }, y.enable = function(E) {
    return this.set(E, !0);
  }, y.disable = function(E) {
    return this.set(E, !1);
  }, t.forEach(function(_) {
    y[_] = function(E) {
      if (_ === "get" && arguments.length === 1)
        return this.set(E);
      this.lazyrouter();
      var S = this._router.route(E);
      return S[_].apply(S, b.call(arguments, 1)), this;
    };
  }), y.all = function(E) {
    this.lazyrouter();
    for (var S = this._router.route(E), j = b.call(arguments, 1), T = 0; T < t.length; T++)
      S[t[T]].apply(S, j);
    return this;
  }, y.del = x.function(y.delete, "app.del: Use app.delete instead"), y.render = function(E, S, j) {
    var T = this.cache, C = j, B = this.engines, F = S, U = {}, D;
    if (typeof S == "function" && (C = S, F = {}), d(U, this.locals), F._locals && d(U, F._locals), d(U, F), U.cache == null && (U.cache = this.enabled("view cache")), U.cache && (D = T[E]), !D) {
      var xe = this.get("view");
      if (D = new xe(E, {
        defaultEngine: this.get("view engine"),
        root: this.get("views"),
        engines: B
      }), !D.path) {
        var he = Array.isArray(D.root) && D.root.length > 1 ? 'directories "' + D.root.slice(0, -1).join('", "') + '" or "' + D.root[D.root.length - 1] + '"' : 'directory "' + D.root + '"', ee = new Error('Failed to lookup view "' + E + '" in views ' + he);
        return ee.view = D, C(ee);
      }
      U.cache && (T[E] = D);
    }
    A(D, U, C);
  }, y.listen = function() {
    var E = u.createServer(this);
    return E.listen.apply(E, arguments);
  };
  function k(_) {
    this.get("env") !== "test" && console.error(_.stack || _.toString());
  }
  function A(_, E, S) {
    try {
      _.render(E, S);
    } catch (j) {
      S(j);
    }
  }
})(ro);
var zm = ro.exports, yi = { exports: {} }, wi = { exports: {} };
wi.exports = Zo;
wi.exports.preferredCharsets = Zo;
var Bm = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function Dm(a) {
  for (var e = a.split(","), n = 0, i = 0; n < e.length; n++) {
    var t = Nm(e[n].trim(), n);
    t && (e[i++] = t);
  }
  return e.length = i, e;
}
function Nm(a, e) {
  var n = Bm.exec(a);
  if (!n) return null;
  var i = n[1], t = 1;
  if (n[2])
    for (var r = n[2].split(";"), o = 0; o < r.length; o++) {
      var s = r[o].trim().split("=");
      if (s[0] === "q") {
        t = parseFloat(s[1]);
        break;
      }
    }
  return {
    charset: i,
    q: t,
    i: e
  };
}
function Lm(a, e, n) {
  for (var i = { o: -1, q: 0, s: 0 }, t = 0; t < e.length; t++) {
    var r = Mm(a, e[t], n);
    r && (i.s - r.s || i.q - r.q || i.o - r.o) < 0 && (i = r);
  }
  return i;
}
function Mm(a, e, n) {
  var i = 0;
  if (e.charset.toLowerCase() === a.toLowerCase())
    i |= 1;
  else if (e.charset !== "*")
    return null;
  return {
    i: n,
    o: e.i,
    q: e.q,
    s: i
  };
}
function Zo(a, e) {
  var n = Dm(a === void 0 ? "*" : a || "");
  if (!e)
    return n.filter(er).sort(Yt).map(Um);
  var i = e.map(function(r, o) {
    return Lm(r, n, o);
  });
  return i.filter(er).sort(Yt).map(function(r) {
    return e[i.indexOf(r)];
  });
}
function Yt(a, e) {
  return e.q - a.q || e.s - a.s || a.o - e.o || a.i - e.i || 0;
}
function Um(a) {
  return a.charset;
}
function er(a) {
  return a.q > 0;
}
var Hm = wi.exports, ki = { exports: {} };
ki.exports = Jo;
ki.exports.preferredEncodings = Jo;
var Gm = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function Wm(a) {
  for (var e = a.split(","), n = !1, i = 1, t = 0, r = 0; t < e.length; t++) {
    var o = Vm(e[t].trim(), t);
    o && (e[r++] = o, n = n || Qo("identity", o), i = Math.min(i, o.q || 1));
  }
  return n || (e[r++] = {
    encoding: "identity",
    q: i,
    i: t
  }), e.length = r, e;
}
function Vm(a, e) {
  var n = Gm.exec(a);
  if (!n) return null;
  var i = n[1], t = 1;
  if (n[2])
    for (var r = n[2].split(";"), o = 0; o < r.length; o++) {
      var s = r[o].trim().split("=");
      if (s[0] === "q") {
        t = parseFloat(s[1]);
        break;
      }
    }
  return {
    encoding: i,
    q: t,
    i: e
  };
}
function Xm(a, e, n) {
  for (var i = { o: -1, q: 0, s: 0 }, t = 0; t < e.length; t++) {
    var r = Qo(a, e[t], n);
    r && (i.s - r.s || i.q - r.q || i.o - r.o) < 0 && (i = r);
  }
  return i;
}
function Qo(a, e, n) {
  var i = 0;
  if (e.encoding.toLowerCase() === a.toLowerCase())
    i |= 1;
  else if (e.encoding !== "*")
    return null;
  return {
    i: n,
    o: e.i,
    q: e.q,
    s: i
  };
}
function Jo(a, e) {
  var n = Wm(a || "");
  if (!e)
    return n.filter(nr).sort(ar).map(Zm);
  var i = e.map(function(r, o) {
    return Xm(r, n, o);
  });
  return i.filter(nr).sort(ar).map(function(r) {
    return e[i.indexOf(r)];
  });
}
function ar(a, e) {
  return e.q - a.q || e.s - a.s || a.o - e.o || a.i - e.i || 0;
}
function Zm(a) {
  return a.encoding;
}
function nr(a) {
  return a.q > 0;
}
var Qm = ki.exports, Ei = { exports: {} };
Ei.exports = Yo;
Ei.exports.preferredLanguages = Yo;
var Jm = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
function Km(a) {
  for (var e = a.split(","), n = 0, i = 0; n < e.length; n++) {
    var t = Ko(e[n].trim(), n);
    t && (e[i++] = t);
  }
  return e.length = i, e;
}
function Ko(a, e) {
  var n = Jm.exec(a);
  if (!n) return null;
  var i = n[1], t = n[2], r = i;
  t && (r += "-" + t);
  var o = 1;
  if (n[3])
    for (var s = n[3].split(";"), c = 0; c < s.length; c++) {
      var u = s[c].split("=");
      u[0] === "q" && (o = parseFloat(u[1]));
    }
  return {
    prefix: i,
    suffix: t,
    q: o,
    i: e,
    full: r
  };
}
function Ym(a, e, n) {
  for (var i = { o: -1, q: 0, s: 0 }, t = 0; t < e.length; t++) {
    var r = ev(a, e[t], n);
    r && (i.s - r.s || i.q - r.q || i.o - r.o) < 0 && (i = r);
  }
  return i;
}
function ev(a, e, n) {
  var i = Ko(a);
  if (!i) return null;
  var t = 0;
  if (e.full.toLowerCase() === i.full.toLowerCase())
    t |= 4;
  else if (e.prefix.toLowerCase() === i.full.toLowerCase())
    t |= 2;
  else if (e.full.toLowerCase() === i.prefix.toLowerCase())
    t |= 1;
  else if (e.full !== "*")
    return null;
  return {
    i: n,
    o: e.i,
    q: e.q,
    s: t
  };
}
function Yo(a, e) {
  var n = Km(a === void 0 ? "*" : a || "");
  if (!e)
    return n.filter(tr).sort(ir).map(av);
  var i = e.map(function(r, o) {
    return Ym(r, n, o);
  });
  return i.filter(tr).sort(ir).map(function(r) {
    return e[i.indexOf(r)];
  });
}
function ir(a, e) {
  return e.q - a.q || e.s - a.s || a.o - e.o || a.i - e.i || 0;
}
function av(a) {
  return a.full;
}
function tr(a) {
  return a.q > 0;
}
var nv = Ei.exports, Si = { exports: {} };
Si.exports = as;
Si.exports.preferredMediaTypes = as;
var iv = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
function tv(a) {
  for (var e = pv(a), n = 0, i = 0; n < e.length; n++) {
    var t = es(e[n].trim(), n);
    t && (e[i++] = t);
  }
  return e.length = i, e;
}
function es(a, e) {
  var n = iv.exec(a);
  if (!n) return null;
  var i = /* @__PURE__ */ Object.create(null), t = 1, r = n[2], o = n[1];
  if (n[3])
    for (var s = lv(n[3]).map(cv), c = 0; c < s.length; c++) {
      var u = s[c], p = u[0].toLowerCase(), f = u[1], l = f && f[0] === '"' && f[f.length - 1] === '"' ? f.substr(1, f.length - 2) : f;
      if (p === "q") {
        t = parseFloat(l);
        break;
      }
      i[p] = l;
    }
  return {
    type: o,
    subtype: r,
    params: i,
    q: t,
    i: e
  };
}
function rv(a, e, n) {
  for (var i = { o: -1, q: 0, s: 0 }, t = 0; t < e.length; t++) {
    var r = ov(a, e[t], n);
    r && (i.s - r.s || i.q - r.q || i.o - r.o) < 0 && (i = r);
  }
  return i;
}
function ov(a, e, n) {
  var i = es(a), t = 0;
  if (!i)
    return null;
  if (e.type.toLowerCase() == i.type.toLowerCase())
    t |= 4;
  else if (e.type != "*")
    return null;
  if (e.subtype.toLowerCase() == i.subtype.toLowerCase())
    t |= 2;
  else if (e.subtype != "*")
    return null;
  var r = Object.keys(e.params);
  if (r.length > 0)
    if (r.every(function(o) {
      return e.params[o] == "*" || (e.params[o] || "").toLowerCase() == (i.params[o] || "").toLowerCase();
    }))
      t |= 1;
    else
      return null;
  return {
    i: n,
    o: e.i,
    q: e.q,
    s: t
  };
}
function as(a, e) {
  var n = tv(a === void 0 ? "*/*" : a || "");
  if (!e)
    return n.filter(or).sort(rr).map(sv);
  var i = e.map(function(r, o) {
    return rv(r, n, o);
  });
  return i.filter(or).sort(rr).map(function(r) {
    return e[i.indexOf(r)];
  });
}
function rr(a, e) {
  return e.q - a.q || e.s - a.s || a.o - e.o || a.i - e.i || 0;
}
function sv(a) {
  return a.type + "/" + a.subtype;
}
function or(a) {
  return a.q > 0;
}
function ns(a) {
  for (var e = 0, n = 0; (n = a.indexOf('"', n)) !== -1; )
    e++, n++;
  return e;
}
function cv(a) {
  var e = a.indexOf("="), n, i;
  return e === -1 ? n = a : (n = a.substr(0, e), i = a.substr(e + 1)), [n, i];
}
function pv(a) {
  for (var e = a.split(","), n = 1, i = 0; n < e.length; n++)
    ns(e[i]) % 2 == 0 ? e[++i] = e[n] : e[i] += "," + e[n];
  return e.length = i + 1, e;
}
function lv(a) {
  for (var e = a.split(";"), n = 1, i = 0; n < e.length; n++)
    ns(e[i]) % 2 == 0 ? e[++i] = e[n] : e[i] += ";" + e[n];
  e.length = i + 1;
  for (var n = 0; n < e.length; n++)
    e[n] = e[n].trim();
  return e;
}
var uv = Si.exports;
/*!
 * negotiator
 * Copyright(c) 2012 Federico Romero
 * Copyright(c) 2012-2014 Isaac Z. Schlueter
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var dv = Hm, fv = Qm, mv = nv, vv = uv;
yi.exports = $;
yi.exports.Negotiator = $;
function $(a) {
  if (!(this instanceof $))
    return new $(a);
  this.request = a;
}
$.prototype.charset = function(e) {
  var n = this.charsets(e);
  return n && n[0];
};
$.prototype.charsets = function(e) {
  return dv(this.request.headers["accept-charset"], e);
};
$.prototype.encoding = function(e) {
  var n = this.encodings(e);
  return n && n[0];
};
$.prototype.encodings = function(e) {
  return fv(this.request.headers["accept-encoding"], e);
};
$.prototype.language = function(e) {
  var n = this.languages(e);
  return n && n[0];
};
$.prototype.languages = function(e) {
  return mv(this.request.headers["accept-language"], e);
};
$.prototype.mediaType = function(e) {
  var n = this.mediaTypes(e);
  return n && n[0];
};
$.prototype.mediaTypes = function(e) {
  return vv(this.request.headers.accept, e);
};
$.prototype.preferredCharset = $.prototype.charset;
$.prototype.preferredCharsets = $.prototype.charsets;
$.prototype.preferredEncoding = $.prototype.encoding;
$.prototype.preferredEncodings = $.prototype.encodings;
$.prototype.preferredLanguage = $.prototype.language;
$.prototype.preferredLanguages = $.prototype.languages;
$.prototype.preferredMediaType = $.prototype.mediaType;
$.prototype.preferredMediaTypes = $.prototype.mediaTypes;
var xv = yi.exports;
/*!
 * accepts
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var hv = xv, gv = ii, bv = V;
function V(a) {
  if (!(this instanceof V))
    return new V(a);
  this.headers = a.headers, this.negotiator = new hv(a);
}
V.prototype.type = V.prototype.types = function(a) {
  var e = a;
  if (e && !Array.isArray(e)) {
    e = new Array(arguments.length);
    for (var n = 0; n < e.length; n++)
      e[n] = arguments[n];
  }
  if (!e || e.length === 0)
    return this.negotiator.mediaTypes();
  if (!this.headers.accept)
    return e[0];
  var i = e.map(yv), t = this.negotiator.mediaTypes(i.filter(wv)), r = t[0];
  return r ? e[i.indexOf(r)] : !1;
};
V.prototype.encoding = V.prototype.encodings = function(a) {
  var e = a;
  if (e && !Array.isArray(e)) {
    e = new Array(arguments.length);
    for (var n = 0; n < e.length; n++)
      e[n] = arguments[n];
  }
  return !e || e.length === 0 ? this.negotiator.encodings() : this.negotiator.encodings(e)[0] || !1;
};
V.prototype.charset = V.prototype.charsets = function(a) {
  var e = a;
  if (e && !Array.isArray(e)) {
    e = new Array(arguments.length);
    for (var n = 0; n < e.length; n++)
      e[n] = arguments[n];
  }
  return !e || e.length === 0 ? this.negotiator.charsets() : this.negotiator.charsets(e)[0] || !1;
};
V.prototype.lang = V.prototype.langs = V.prototype.language = V.prototype.languages = function(a) {
  var e = a;
  if (e && !Array.isArray(e)) {
    e = new Array(arguments.length);
    for (var n = 0; n < e.length; n++)
      e[n] = arguments[n];
  }
  return !e || e.length === 0 ? this.negotiator.languages() : this.negotiator.languages(e)[0] || !1;
};
function yv(a) {
  return a.indexOf("/") === -1 ? gv.lookup(a) : a;
}
function wv(a) {
  return typeof a == "string";
}
/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var Ja = bv, ta = ne("express"), kv = mr.isIP, Ev = Je, Sv = Ia, jv = Fo, Av = zo, _v = aa, is = Xo, R = Object.create(Sv.IncomingMessage.prototype), Tv = R;
R.get = R.header = function(e) {
  if (!e)
    throw new TypeError("name argument is required to req.get");
  if (typeof e != "string")
    throw new TypeError("name must be a string to req.get");
  var n = e.toLowerCase();
  switch (n) {
    case "referer":
    case "referrer":
      return this.headers.referrer || this.headers.referer;
    default:
      return this.headers[n];
  }
};
R.accepts = function() {
  var a = Ja(this);
  return a.types.apply(a, arguments);
};
R.acceptsEncodings = function() {
  var a = Ja(this);
  return a.encodings.apply(a, arguments);
};
R.acceptsEncoding = ta.function(
  R.acceptsEncodings,
  "req.acceptsEncoding: Use acceptsEncodings instead"
);
R.acceptsCharsets = function() {
  var a = Ja(this);
  return a.charsets.apply(a, arguments);
};
R.acceptsCharset = ta.function(
  R.acceptsCharsets,
  "req.acceptsCharset: Use acceptsCharsets instead"
);
R.acceptsLanguages = function() {
  var a = Ja(this);
  return a.languages.apply(a, arguments);
};
R.acceptsLanguage = ta.function(
  R.acceptsLanguages,
  "req.acceptsLanguage: Use acceptsLanguages instead"
);
R.range = function(e, n) {
  var i = this.get("Range");
  if (i)
    return Av(e, i, n);
};
R.param = function(e, n) {
  var i = this.params || {}, t = this.body || {}, r = this.query || {}, o = arguments.length === 1 ? "name" : "name, default";
  return ta("req.param(" + o + "): Use req.params, req.body, or req.query instead"), i[e] != null && i.hasOwnProperty(e) ? i[e] : t[e] != null ? t[e] : r[e] != null ? r[e] : n;
};
R.is = function(e) {
  var n = e;
  if (!Array.isArray(e)) {
    n = new Array(arguments.length);
    for (var i = 0; i < n.length; i++)
      n[i] = arguments[i];
  }
  return Ev(this, n);
};
Q(R, "protocol", function() {
  var e = this.connection.encrypted ? "https" : "http", n = this.app.get("trust proxy fn");
  if (!n(this.connection.remoteAddress, 0))
    return e;
  var i = this.get("X-Forwarded-Proto") || e, t = i.indexOf(",");
  return t !== -1 ? i.substring(0, t).trim() : i.trim();
});
Q(R, "secure", function() {
  return this.protocol === "https";
});
Q(R, "ip", function() {
  var e = this.app.get("trust proxy fn");
  return is(this, e);
});
Q(R, "ips", function() {
  var e = this.app.get("trust proxy fn"), n = is.all(this, e);
  return n.reverse().pop(), n;
});
Q(R, "subdomains", function() {
  var e = this.hostname;
  if (!e) return [];
  var n = this.app.get("subdomain offset"), i = kv(e) ? [e] : e.split(".").reverse();
  return i.slice(n);
});
Q(R, "path", function() {
  return _v(this).pathname;
});
Q(R, "hostname", function() {
  var e = this.app.get("trust proxy fn"), n = this.get("X-Forwarded-Host");
  if (!n || !e(this.connection.remoteAddress, 0) ? n = this.get("Host") : n.indexOf(",") !== -1 && (n = n.substring(0, n.indexOf(",")).trimRight()), !!n) {
    var i = n[0] === "[" ? n.indexOf("]") + 1 : 0, t = n.indexOf(":", i);
    return t !== -1 ? n.substring(0, t) : n;
  }
});
Q(R, "host", ta.function(function() {
  return this.hostname;
}, "req.host: Use req.hostname instead"));
Q(R, "fresh", function() {
  var a = this.method, e = this.res, n = e.statusCode;
  return a !== "GET" && a !== "HEAD" ? !1 : n >= 200 && n < 300 || n === 304 ? jv(this.headers, {
    etag: e.get("ETag"),
    "last-modified": e.get("Last-Modified")
  }) : !1;
});
Q(R, "stale", function() {
  return !this.fresh;
});
Q(R, "xhr", function() {
  var e = this.get("X-Requested-With") || "";
  return e.toLowerCase() === "xmlhttprequest";
});
function Q(a, e, n) {
  Object.defineProperty(a, e, {
    configurable: !0,
    enumerable: !0,
    get: n
  });
}
var ts = {};
(function(a) {
  var e = br;
  a.sign = function(i, t) {
    if (typeof i != "string") throw new TypeError("Cookie value must be provided as a string.");
    if (typeof t != "string") throw new TypeError("Secret string must be provided.");
    return i + "." + e.createHmac("sha256", t).update(i).digest("base64").replace(/\=+$/, "");
  }, a.unsign = function(i, t) {
    if (typeof i != "string") throw new TypeError("Signed cookie string must be provided.");
    if (typeof t != "string") throw new TypeError("Secret string must be provided.");
    var r = i.slice(0, i.lastIndexOf(".")), o = a.sign(r, t);
    return n(o) == n(i) ? r : !1;
  };
  function n(i) {
    return e.createHash("sha1").update(i).digest("hex");
  }
})(ts);
var ji = {};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
ji.parse = Iv;
ji.serialize = qv;
var Cv = Object.prototype.toString, Ov = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/, Pv = /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/, $v = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, Rv = /^[\u0020-\u003A\u003D-\u007E]*$/;
function Iv(a, e) {
  if (typeof a != "string")
    throw new TypeError("argument str must be a string");
  var n = {}, i = a.length;
  if (i < 2) return n;
  var t = e && e.decode || Fv, r = 0, o = 0, s = 0;
  do {
    if (o = a.indexOf("=", r), o === -1) break;
    if (s = a.indexOf(";", r), s === -1)
      s = i;
    else if (o > s) {
      r = a.lastIndexOf(";", o - 1) + 1;
      continue;
    }
    var c = sr(a, r, o), u = cr(a, o, c), p = a.slice(c, u);
    if (!n.hasOwnProperty(p)) {
      var f = sr(a, o + 1, s), l = cr(a, s, f);
      a.charCodeAt(f) === 34 && a.charCodeAt(l - 1) === 34 && (f++, l--);
      var x = a.slice(f, l);
      n[p] = Bv(x, t);
    }
    r = s + 1;
  } while (r < i);
  return n;
}
function sr(a, e, n) {
  do {
    var i = a.charCodeAt(e);
    if (i !== 32 && i !== 9) return e;
  } while (++e < n);
  return n;
}
function cr(a, e, n) {
  for (; e > n; ) {
    var i = a.charCodeAt(--e);
    if (i !== 32 && i !== 9) return e + 1;
  }
  return n;
}
function qv(a, e, n) {
  var i = n && n.encode || encodeURIComponent;
  if (typeof i != "function")
    throw new TypeError("option encode is invalid");
  if (!Ov.test(a))
    throw new TypeError("argument name is invalid");
  var t = i(e);
  if (!Pv.test(t))
    throw new TypeError("argument val is invalid");
  var r = a + "=" + t;
  if (!n) return r;
  if (n.maxAge != null) {
    var o = Math.floor(n.maxAge);
    if (!isFinite(o))
      throw new TypeError("option maxAge is invalid");
    r += "; Max-Age=" + o;
  }
  if (n.domain) {
    if (!$v.test(n.domain))
      throw new TypeError("option domain is invalid");
    r += "; Domain=" + n.domain;
  }
  if (n.path) {
    if (!Rv.test(n.path))
      throw new TypeError("option path is invalid");
    r += "; Path=" + n.path;
  }
  if (n.expires) {
    var s = n.expires;
    if (!zv(s) || isNaN(s.valueOf()))
      throw new TypeError("option expires is invalid");
    r += "; Expires=" + s.toUTCString();
  }
  if (n.httpOnly && (r += "; HttpOnly"), n.secure && (r += "; Secure"), n.partitioned && (r += "; Partitioned"), n.priority) {
    var c = typeof n.priority == "string" ? n.priority.toLowerCase() : n.priority;
    switch (c) {
      case "low":
        r += "; Priority=Low";
        break;
      case "medium":
        r += "; Priority=Medium";
        break;
      case "high":
        r += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (n.sameSite) {
    var u = typeof n.sameSite == "string" ? n.sameSite.toLowerCase() : n.sameSite;
    switch (u) {
      case !0:
        r += "; SameSite=Strict";
        break;
      case "lax":
        r += "; SameSite=Lax";
        break;
      case "strict":
        r += "; SameSite=Strict";
        break;
      case "none":
        r += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return r;
}
function Fv(a) {
  return a.indexOf("%") !== -1 ? decodeURIComponent(a) : a;
}
function zv(a) {
  return Cv.call(a) === "[object Date]";
}
function Bv(a, e) {
  try {
    return e(a);
  } catch {
    return a;
  }
}
var Ai = { exports: {} };
/*!
 * vary
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */
Ai.exports = Nv;
Ai.exports.append = rs;
var Dv = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
function rs(a, e) {
  if (typeof a != "string")
    throw new TypeError("header argument is required");
  if (!e)
    throw new TypeError("field argument is required");
  for (var n = Array.isArray(e) ? e : pr(String(e)), i = 0; i < n.length; i++)
    if (!Dv.test(n[i]))
      throw new TypeError("field argument contains an invalid header name");
  if (a === "*")
    return a;
  var t = a, r = pr(a.toLowerCase());
  if (n.indexOf("*") !== -1 || r.indexOf("*") !== -1)
    return "*";
  for (var o = 0; o < n.length; o++) {
    var s = n[o].toLowerCase();
    r.indexOf(s) === -1 && (r.push(s), t = t ? t + ", " + n[o] : n[o]);
  }
  return t;
}
function pr(a) {
  for (var e = 0, n = [], i = 0, t = 0, r = a.length; t < r; t++)
    switch (a.charCodeAt(t)) {
      case 32:
        i === e && (i = e = t + 1);
        break;
      case 44:
        n.push(a.substring(i, e)), i = e = t + 1;
        break;
      default:
        e = t + 1;
        break;
    }
  return n.push(a.substring(i, e)), n;
}
function Nv(a, e) {
  if (!a || !a.getHeader || !a.setHeader)
    throw new TypeError("res argument is required");
  var n = a.getHeader("Vary") || "", i = Array.isArray(n) ? n.join(", ") : String(n);
  (n = rs(i, e)) && a.setHeader("Vary", n);
}
var os = Ai.exports;
/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var Ue = mi.Buffer, ss = Io, Lv = Ie, W = ne("express"), Mv = ui, Uv = Ha, Hv = Ia, Gv = se.isAbsolute, Wv = Ba, cs = ce, Ra = za, ps = Wa, Vv = ts.sign, Xv = se.normalizeType, Zv = se.normalizeTypes, Qv = se.setCharset, Jv = ji, _i = gi, Kv = cs.extname, ls = _i.mime, Yv = cs.resolve, ex = os, I = Object.create(Hv.ServerResponse.prototype), ax = I, nx = /;\s*charset\s*=/;
I.status = function(e) {
  return (typeof e == "string" || Math.floor(e) !== e) && e > 99 && e < 1e3 && W("res.status(" + JSON.stringify(e) + "): use res.status(" + Math.floor(e) + ") instead"), this.statusCode = e, this;
};
I.links = function(a) {
  var e = this.get("Link") || "";
  return e && (e += ", "), this.set("Link", e + Object.keys(a).map(function(n) {
    return "<" + a[n] + '>; rel="' + n + '"';
  }).join(", "));
};
I.send = function(e) {
  var n = e, i, t = this.req, r, o = this.app;
  switch (arguments.length === 2 && (typeof arguments[0] != "number" && typeof arguments[1] == "number" ? (W("res.send(body, status): Use res.status(status).send(body) instead"), this.statusCode = arguments[1]) : (W("res.send(status, body): Use res.status(status).send(body) instead"), this.statusCode = arguments[0], n = arguments[1])), typeof n == "number" && arguments.length === 1 && (this.get("Content-Type") || this.type("txt"), W("res.send(status): Use res.sendStatus(status) instead"), this.statusCode = n, n = Ra.message[n]), typeof n) {
    case "string":
      this.get("Content-Type") || this.type("html");
      break;
    case "boolean":
    case "number":
    case "object":
      if (n === null)
        n = "";
      else if (Ue.isBuffer(n))
        this.get("Content-Type") || this.type("bin");
      else
        return this.json(n);
      break;
  }
  typeof n == "string" && (i = "utf8", r = this.get("Content-Type"), typeof r == "string" && this.set("Content-Type", Qv(r, "utf-8")));
  var s = o.get("etag fn"), c = !this.get("ETag") && typeof s == "function", u;
  n !== void 0 && (Ue.isBuffer(n) ? u = n.length : !c && n.length < 1e3 ? u = Ue.byteLength(n, i) : (n = Ue.from(n, i), i = void 0, u = n.length), this.set("Content-Length", u));
  var p;
  return c && u !== void 0 && (p = s(n, i)) && this.set("ETag", p), t.fresh && (this.statusCode = 304), (this.statusCode === 204 || this.statusCode === 304) && (this.removeHeader("Content-Type"), this.removeHeader("Content-Length"), this.removeHeader("Transfer-Encoding"), n = ""), this.statusCode === 205 && (this.set("Content-Length", "0"), this.removeHeader("Transfer-Encoding"), n = ""), t.method === "HEAD" ? this.end() : this.end(n, i), this;
};
I.json = function(e) {
  var n = e;
  arguments.length === 2 && (typeof arguments[1] == "number" ? (W("res.json(obj, status): Use res.status(status).json(obj) instead"), this.statusCode = arguments[1]) : (W("res.json(status, obj): Use res.status(status).json(obj) instead"), this.statusCode = arguments[0], n = arguments[1]));
  var i = this.app, t = i.get("json escape"), r = i.get("json replacer"), o = i.get("json spaces"), s = ds(n, r, o, t);
  return this.get("Content-Type") || this.set("Content-Type", "application/json"), this.send(s);
};
I.jsonp = function(e) {
  var n = e;
  arguments.length === 2 && (typeof arguments[1] == "number" ? (W("res.jsonp(obj, status): Use res.status(status).jsonp(obj) instead"), this.statusCode = arguments[1]) : (W("res.jsonp(status, obj): Use res.status(status).jsonp(obj) instead"), this.statusCode = arguments[0], n = arguments[1]));
  var i = this.app, t = i.get("json escape"), r = i.get("json replacer"), o = i.get("json spaces"), s = ds(n, r, o, t), c = this.req.query[i.get("jsonp callback name")];
  return this.get("Content-Type") || (this.set("X-Content-Type-Options", "nosniff"), this.set("Content-Type", "application/json")), Array.isArray(c) && (c = c[0]), typeof c == "string" && c.length !== 0 && (this.set("X-Content-Type-Options", "nosniff"), this.set("Content-Type", "text/javascript"), c = c.replace(/[^\[\]\w$.]/g, ""), s === void 0 ? s = "" : typeof s == "string" && (s = s.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029")), s = "/**/ typeof " + c + " === 'function' && " + c + "(" + s + ");"), this.send(s);
};
I.sendStatus = function(e) {
  var n = Ra.message[e] || String(e);
  return this.statusCode = e, this.type("txt"), this.send(n);
};
I.sendFile = function(e, n, i) {
  var t = i, r = this.req, o = this, s = r.next, c = n || {};
  if (!e)
    throw new TypeError("path argument is required to res.sendFile");
  if (typeof e != "string")
    throw new TypeError("path must be a string to res.sendFile");
  if (typeof n == "function" && (t = n, c = {}), !c.root && !Gv(e))
    throw new TypeError("path must be absolute or specify root to res.sendFile");
  var u = encodeURI(e), p = _i(r, u, c);
  us(o, p, c, function(f) {
    if (t) return t(f);
    if (f && f.code === "EISDIR") return s();
    f && f.code !== "ECONNABORTED" && f.syscall !== "write" && s(f);
  });
};
I.sendfile = function(a, e, n) {
  var i = n, t = this.req, r = this, o = t.next, s = e || {};
  typeof e == "function" && (i = e, s = {});
  var c = _i(t, a, s);
  us(r, c, s, function(u) {
    if (i) return i(u);
    if (u && u.code === "EISDIR") return o();
    u && u.code !== "ECONNABORTED" && u.syscall !== "write" && o(u);
  });
};
I.sendfile = W.function(
  I.sendfile,
  "res.sendfile: Use res.sendFile instead"
);
I.download = function(e, n, i, t) {
  var r = t, o = n, s = i || null;
  typeof n == "function" ? (r = n, o = null, s = null) : typeof i == "function" && (r = i, s = null), typeof n == "object" && (typeof i == "function" || i === void 0) && (o = null, s = n);
  var c = {
    "Content-Disposition": ss(o || e)
  };
  if (s && s.headers)
    for (var u = Object.keys(s.headers), p = 0; p < u.length; p++) {
      var f = u[p];
      f.toLowerCase() !== "content-disposition" && (c[f] = s.headers[f]);
    }
  s = Object.create(s), s.headers = c;
  var l = s.root ? e : Yv(e);
  return this.sendFile(l, s, r);
};
I.contentType = I.type = function(e) {
  var n = e.indexOf("/") === -1 ? ls.lookup(e) : e;
  return this.set("Content-Type", n);
};
I.format = function(a) {
  var e = this.req, n = e.next, i = Object.keys(a).filter(function(r) {
    return r !== "default";
  }), t = i.length > 0 ? e.accepts(i) : !1;
  return this.vary("Accept"), t ? (this.set("Content-Type", Xv(t).value), a[t](e, this, n)) : a.default ? a.default(e, this, n) : n(Lv(406, {
    types: Zv(i).map(function(r) {
      return r.value;
    })
  })), this;
};
I.attachment = function(e) {
  return e && this.type(Kv(e)), this.set("Content-Disposition", ss(e)), this;
};
I.append = function(e, n) {
  var i = this.get(e), t = n;
  return i && (t = Array.isArray(i) ? i.concat(n) : Array.isArray(n) ? [i].concat(n) : [i, n]), this.set(e, t);
};
I.set = I.header = function(e, n) {
  if (arguments.length === 2) {
    var i = Array.isArray(n) ? n.map(String) : String(n);
    if (e.toLowerCase() === "content-type") {
      if (Array.isArray(i))
        throw new TypeError("Content-Type cannot be set to an Array");
      if (!nx.test(i)) {
        var t = ls.charsets.lookup(i.split(";")[0]);
        t && (i += "; charset=" + t.toLowerCase());
      }
    }
    this.setHeader(e, i);
  } else
    for (var r in e)
      this.set(r, e[r]);
  return this;
};
I.get = function(a) {
  return this.getHeader(a);
};
I.clearCookie = function(e, n) {
  n && (n.maxAge && W('res.clearCookie: Passing "options.maxAge" is deprecated. In v5.0.0 of Express, this option will be ignored, as res.clearCookie will automatically set cookies to expire immediately. Please update your code to omit this option.'), n.expires && W('res.clearCookie: Passing "options.expires" is deprecated. In v5.0.0 of Express, this option will be ignored, as res.clearCookie will automatically set cookies to expire immediately. Please update your code to omit this option.'));
  var i = ps({ expires: /* @__PURE__ */ new Date(1), path: "/" }, n);
  return this.cookie(e, "", i);
};
I.cookie = function(a, e, n) {
  var i = ps({}, n), t = this.req.secret, r = i.signed;
  if (r && !t)
    throw new Error('cookieParser("secret") required for signed cookies');
  var o = typeof e == "object" ? "j:" + JSON.stringify(e) : String(e);
  if (r && (o = "s:" + Vv(o, t)), i.maxAge != null) {
    var s = i.maxAge - 0;
    isNaN(s) || (i.expires = new Date(Date.now() + s), i.maxAge = Math.floor(s / 1e3));
  }
  return i.path == null && (i.path = "/"), this.append("Set-Cookie", Jv.serialize(a, String(o), i)), this;
};
I.location = function(e) {
  var n;
  return e === "back" ? (W('res.location("back"): use res.location(req.get("Referrer") || "/") and refer to https://dub.sh/security-redirect for best practices'), n = this.req.get("Referrer") || "/") : n = String(e), this.set("Location", Mv(n));
};
I.redirect = function(e) {
  var n = e, i, t = 302;
  arguments.length === 2 && (typeof arguments[0] == "number" ? (t = arguments[0], n = arguments[1]) : (W("res.redirect(url, status): Use res.redirect(status, url) instead"), t = arguments[1])), n = this.location(n).get("Location"), this.format({
    text: function() {
      i = Ra.message[t] + ". Redirecting to " + n;
    },
    html: function() {
      var r = Uv(n);
      i = "<p>" + Ra.message[t] + ". Redirecting to " + r + "</p>";
    },
    default: function() {
      i = "";
    }
  }), this.statusCode = t, this.set("Content-Length", Ue.byteLength(i)), this.req.method === "HEAD" ? this.end() : this.end(i);
};
I.vary = function(a) {
  return !a || Array.isArray(a) && !a.length ? (W("res.vary(): Provide a field name"), this) : (ex(this, a), this);
};
I.render = function(e, n, i) {
  var t = this.req.app, r = i, o = n || {}, s = this.req, c = this;
  typeof n == "function" && (r = n, o = {}), o._locals = c.locals, r = r || function(u, p) {
    if (u) return s.next(u);
    c.send(p);
  }, t.render(e, o, r);
};
function us(a, e, n, i) {
  var t = !1, r;
  function o() {
    if (!t) {
      t = !0;
      var x = new Error("Request aborted");
      x.code = "ECONNABORTED", i(x);
    }
  }
  function s() {
    if (!t) {
      t = !0;
      var x = new Error("EISDIR, read");
      x.code = "EISDIR", i(x);
    }
  }
  function c(x) {
    t || (t = !0, i(x));
  }
  function u() {
    t || (t = !0, i());
  }
  function p() {
    r = !1;
  }
  function f(x) {
    if (x && x.code === "ECONNRESET") return o();
    if (x) return c(x);
    t || setImmediate(function() {
      if (r !== !1 && !t) {
        o();
        return;
      }
      t || (t = !0, i());
    });
  }
  function l() {
    r = !0;
  }
  e.on("directory", s), e.on("end", u), e.on("error", c), e.on("file", p), e.on("stream", l), Wv(a, f), n.headers && e.on("headers", function(v) {
    for (var d = n.headers, m = Object.keys(d), h = 0; h < m.length; h++) {
      var g = m[h];
      v.setHeader(g, d[g]);
    }
  }), e.pipe(a);
}
function ds(a, e, n, i) {
  var t = e || n ? JSON.stringify(a, e, n) : JSON.stringify(a);
  return i && typeof t == "string" && (t = t.replace(/[<>&]/g, function(r) {
    switch (r.charCodeAt(0)) {
      case 60:
        return "\\u003c";
      case 62:
        return "\\u003e";
      case 38:
        return "\\u0026";
      default:
        return r;
    }
  })), t;
}
var va = { exports: {} };
/*!
 * serve-static
 * Copyright(c) 2010 Sencha Inc.
 * Copyright(c) 2011 TJ Holowaychuk
 * Copyright(c) 2014-2016 Douglas Christopher Wilson
 * MIT Licensed
 */
var lr;
function ix() {
  if (lr) return va.exports;
  lr = 1;
  var a = ui, e = Ha, n = aa, i = ce.resolve, t = gi, r = gr;
  va.exports = o, va.exports.mime = t.mime;
  function o(f, l) {
    if (!f)
      throw new TypeError("root path required");
    if (typeof f != "string")
      throw new TypeError("root path must be a string");
    var x = Object.create(l || null), v = x.fallthrough !== !1, d = x.redirect !== !1, m = x.setHeaders;
    if (m && typeof m != "function")
      throw new TypeError("option setHeaders must be function");
    x.maxage = x.maxage || x.maxAge || 0, x.root = i(f);
    var h = d ? p() : u();
    return function(b, y, w) {
      if (b.method !== "GET" && b.method !== "HEAD") {
        if (v)
          return w();
        y.statusCode = 405, y.setHeader("Allow", "GET, HEAD"), y.setHeader("Content-Length", "0"), y.end();
        return;
      }
      var k = !v, A = n.original(b), _ = n(b).pathname;
      _ === "/" && A.pathname.substr(-1) !== "/" && (_ = "");
      var E = t(b, _, x);
      E.on("directory", h), m && E.on("headers", m), v && E.on("file", function() {
        k = !0;
      }), E.on("error", function(j) {
        if (k || !(j.statusCode < 500)) {
          w(j);
          return;
        }
        w();
      }), E.pipe(y);
    };
  }
  function s(f) {
    for (var l = 0; l < f.length && f.charCodeAt(l) === 47; l++)
      ;
    return l > 1 ? "/" + f.substr(l) : f;
  }
  function c(f, l) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>` + f + `</title>
</head>
<body>
<pre>` + l + `</pre>
</body>
</html>
`;
  }
  function u() {
    return function() {
      this.error(404);
    };
  }
  function p() {
    return function(l) {
      if (this.hasTrailingSlash()) {
        this.error(404);
        return;
      }
      var x = n.original(this.req);
      x.path = null, x.pathname = s(x.pathname + "/");
      var v = a(r.format(x)), d = c("Redirecting", "Redirecting to " + e(v));
      l.statusCode = 301, l.setHeader("Content-Type", "text/html; charset=UTF-8"), l.setHeader("Content-Length", Buffer.byteLength(d)), l.setHeader("Content-Security-Policy", "default-src 'none'"), l.setHeader("X-Content-Type-Options", "nosniff"), l.setHeader("Location", v), l.end(d);
    };
  }
  return va.exports;
}
/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
(function(a, e) {
  var n = id, i = vr.EventEmitter, t = td, r = zm, o = Eo, s = _o, c = Tv, u = ax;
  e = a.exports = p;
  function p() {
    var l = function(x, v, d) {
      l.handle(x, v, d);
    };
    return t(l, i.prototype, !1), t(l, r, !1), l.request = Object.create(c, {
      app: { configurable: !0, enumerable: !0, writable: !0, value: l }
    }), l.response = Object.create(u, {
      app: { configurable: !0, enumerable: !0, writable: !0, value: l }
    }), l.init(), l;
  }
  e.application = r, e.request = c, e.response = u, e.Route = o, e.Router = s, e.json = n.json, e.query = Co(), e.raw = n.raw, e.static = ix(), e.text = n.text, e.urlencoded = n.urlencoded;
  var f = [
    "bodyParser",
    "compress",
    "cookieSession",
    "session",
    "logger",
    "cookieParser",
    "favicon",
    "responseTime",
    "errorHandler",
    "timeout",
    "methodOverride",
    "vhost",
    "csrf",
    "directory",
    "limit",
    "multipart",
    "staticCache"
  ];
  f.forEach(function(l) {
    Object.defineProperty(e, l, {
      get: function() {
        throw new Error("Most middleware (like " + l + ") is no longer bundled with Express and must be installed separately. Please see https://github.com/senchalabs/connect#middleware.");
      },
      configurable: !0
    });
  });
})(Bn, Bn.exports);
var tx = Bn.exports;
/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var rx = tx;
const ur = /* @__PURE__ */ yr(rx);
var fs = { exports: {} };
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var dr = Object.getOwnPropertySymbols, ox = Object.prototype.hasOwnProperty, sx = Object.prototype.propertyIsEnumerable;
function cx(a) {
  if (a == null)
    throw new TypeError("Object.assign cannot be called with null or undefined");
  return Object(a);
}
function px() {
  try {
    if (!Object.assign)
      return !1;
    var a = new String("abc");
    if (a[5] = "de", Object.getOwnPropertyNames(a)[0] === "5")
      return !1;
    for (var e = {}, n = 0; n < 10; n++)
      e["_" + String.fromCharCode(n)] = n;
    var i = Object.getOwnPropertyNames(e).map(function(r) {
      return e[r];
    });
    if (i.join("") !== "0123456789")
      return !1;
    var t = {};
    return "abcdefghijklmnopqrst".split("").forEach(function(r) {
      t[r] = r;
    }), Object.keys(Object.assign({}, t)).join("") === "abcdefghijklmnopqrst";
  } catch {
    return !1;
  }
}
var lx = px() ? Object.assign : function(a, e) {
  for (var n, i = cx(a), t, r = 1; r < arguments.length; r++) {
    n = Object(arguments[r]);
    for (var o in n)
      ox.call(n, o) && (i[o] = n[o]);
    if (dr) {
      t = dr(n);
      for (var s = 0; s < t.length; s++)
        sx.call(n, t[s]) && (i[t[s]] = n[t[s]]);
    }
  }
  return i;
};
(function() {
  var a = lx, e = os, n = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: !1,
    optionsSuccessStatus: 204
  };
  function i(v) {
    return typeof v == "string" || v instanceof String;
  }
  function t(v, d) {
    if (Array.isArray(d)) {
      for (var m = 0; m < d.length; ++m)
        if (t(v, d[m]))
          return !0;
      return !1;
    } else return i(d) ? v === d : d instanceof RegExp ? d.test(v) : !!d;
  }
  function r(v, d) {
    var m = d.headers.origin, h = [], g;
    return !v.origin || v.origin === "*" ? h.push([{
      key: "Access-Control-Allow-Origin",
      value: "*"
    }]) : i(v.origin) ? (h.push([{
      key: "Access-Control-Allow-Origin",
      value: v.origin
    }]), h.push([{
      key: "Vary",
      value: "Origin"
    }])) : (g = t(m, v.origin), h.push([{
      key: "Access-Control-Allow-Origin",
      value: g ? m : !1
    }]), h.push([{
      key: "Vary",
      value: "Origin"
    }])), h;
  }
  function o(v) {
    var d = v.methods;
    return d.join && (d = v.methods.join(",")), {
      key: "Access-Control-Allow-Methods",
      value: d
    };
  }
  function s(v) {
    return v.credentials === !0 ? {
      key: "Access-Control-Allow-Credentials",
      value: "true"
    } : null;
  }
  function c(v, d) {
    var m = v.allowedHeaders || v.headers, h = [];
    return m ? m.join && (m = m.join(",")) : (m = d.headers["access-control-request-headers"], h.push([{
      key: "Vary",
      value: "Access-Control-Request-Headers"
    }])), m && m.length && h.push([{
      key: "Access-Control-Allow-Headers",
      value: m
    }]), h;
  }
  function u(v) {
    var d = v.exposedHeaders;
    if (d)
      d.join && (d = d.join(","));
    else return null;
    return d && d.length ? {
      key: "Access-Control-Expose-Headers",
      value: d
    } : null;
  }
  function p(v) {
    var d = (typeof v.maxAge == "number" || v.maxAge) && v.maxAge.toString();
    return d && d.length ? {
      key: "Access-Control-Max-Age",
      value: d
    } : null;
  }
  function f(v, d) {
    for (var m = 0, h = v.length; m < h; m++) {
      var g = v[m];
      g && (Array.isArray(g) ? f(g, d) : g.key === "Vary" && g.value ? e(d, g.value) : g.value && d.setHeader(g.key, g.value));
    }
  }
  function l(v, d, m, h) {
    var g = [], b = d.method && d.method.toUpperCase && d.method.toUpperCase();
    b === "OPTIONS" ? (g.push(r(v, d)), g.push(s(v)), g.push(o(v)), g.push(c(v, d)), g.push(p(v)), g.push(u(v)), f(g, m), v.preflightContinue ? h() : (m.statusCode = v.optionsSuccessStatus, m.setHeader("Content-Length", "0"), m.end())) : (g.push(r(v, d)), g.push(s(v)), g.push(u(v)), f(g, m), h());
  }
  function x(v) {
    var d = null;
    return typeof v == "function" ? d = v : d = function(m, h) {
      h(null, v);
    }, function(h, g, b) {
      d(h, function(y, w) {
        if (y)
          b(y);
        else {
          var k = a({}, n, w), A = null;
          k.origin && typeof k.origin == "function" ? A = k.origin : k.origin && (A = function(_, E) {
            E(null, k.origin);
          }), A ? A(h.headers.origin, function(_, E) {
            _ || !E ? b(_) : (k.origin = E, l(k, h, g, b));
          }) : b();
        }
      });
    };
  }
  fs.exports = x;
})();
var ux = fs.exports;
const dx = /* @__PURE__ */ yr(ux), fx = async () => {
  const a = ur(), e = process.env.SERVER_DEFAULT_PORT || 3e3;
  a.use(dx()), a.use(ur.json()), a.get("/", (n, i) => {
    i.send("Hello, Express with TypeScript!");
  }), a.listen(e, () => {
    console.log(`Server is running at http://localhost:${e}`);
  });
};
class fr {
  /** Launch the server */
  static launch() {
    fx();
  }
  /** Wait for the server to be ready */
  static async waitForReady() {
  }
}
const mx = async () => {
  try {
    ka.value = !0, ys.launch(), fr.launch(), Ci.launch(), Promise.all([
      fr.waitForReady(),
      Ci.waitForReady()
    ]).then(() => {
      ka.value = !1;
    });
  } catch (a) {
    bs.error(a);
  }
};
mx();
