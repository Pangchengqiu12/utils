/**
 * 复制文本到剪切板
 * @param {string} text
 * @example
 * copyToClipboard('hello')
 */
export const copyToClipboard = (text) => navigator.clipboard.writeText(text);

/**
 * 获取某个日期位于当年的第几天
 * @param {Date} date
 * @returns {number}
 * @example
 * getDayOfYear(new Date(2022,10,22)) // 331
 */
export const getDayOfYear = (date) =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

/**
 * 将rgb颜色灰度化(基于光感加权平均)
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {number}
 * @example
 * rgbToGray(50, 100, 150) // 92.98
 */
export const rgbToGray = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

/**
 * 解析URL中参数
 * @param {string} url
 * @returns {object}
 * @example
 * parseQuery('?a=1&b=2') // {a: 1, b: 2}
 */
export const parseQuery = (url) => {
  q = {};
  url.replace(/([^?&=]+)=([^&]*)/g, (_, k, v) => (q[k] = v));
  return q;
};
/**
 * 对象属性转url参数
 * @param {object} options 传入一个对象
 * @returns {string} 返回一个string类型
 */
export const formatOptions = (options) => {
  var urlOptions = "";
  for (var i in options) {
    urlOptions += i + "=" + options[i] + "&";
  }
  urlOptions = urlOptions.slice(0, urlOptions.length - 1);
  return urlOptions;
};

/**
 * 筛选对象属性
 * @param {object} obj
 * @param {string[]} props
 * @returns {object}
 * @example
 * pick({a: 1, b: 2, c: 3}, 'a', 'c') // {a: 1, c: 3}
 */
export const pick = (obj, ...props) =>
  Object.fromEntries(Object.entries(obj).filter(([k]) => props.includes(k)));

/**
 * 随机HEX颜色
 * @returns {string}
 * @example
 * randomColor() // '#ffffff'
 */
export const randomColor = () =>
  "#" +
  Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, "0");

/**
 * 生成随机字符串
 * @returns {string}
 * @example
 * randomString() // '9b9b9b'
 */
export const randomString = () => Math.random().toString(36).slice(2);

/**
 * 去掉字符串中的元素标记
 * @param {string} fragment
 * @returns {string}
 * @example
 * removeTag('<p>hello</p>') // 'hello'
 */
export const removeTag = (fragment) =>
  new DOMParser().parseFromString(fragment, "text/html").body.textContent || "";

/**
 * 防抖
 *@param {Function} callback 传入的执行函数
 *@param {Number} delay 延迟的时间单位毫秒，默认500
 *@return {Function}
 *@example
 * cont addDebounce= debounce(callback, delay = 500)
 */
export function debounce(callback, delay = 500) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}

/**
 * 节流
 * @param {function} fn 要执行的函数
 * @param {number} gapTime 间隔时间 默认：0
 * @returns
 */
export function throttle(fn, gapTime) {
  let _lastTime = null;
  gapTime = gapTime || 0;

  return function (...args) {
    _nowTime = +new Date();
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, args);
      _lastTime = _nowTime;
    }
  };
}

/**
 * 比较数据是否一致
 * @param {*} a
 * @param {*} b
 * @returns {boolean} 一致返回true 反之false
 */
export function equals(a, b) {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date)
    return a.getTime() === b.getTime();
  if (!a || !b || (typeof a !== "object" && typeof b !== "object"))
    return a === b;
  if (a.prototype !== b.prototype) return false;
  let keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every((k) => equals(a[k], b[k]));
}

/**
 * 保留两位小数
 * @param {number} num 传入的数值
 * @param {number} fixed 需要保留的小数位数:默认是保留两位
 * @return {string}
 */
export function toFixed(num, fixed = 2) {
  let numSplit = num.toString().split(".");
  if (numSplit.length == 1 || !numSplit[1][fixed] || numSplit[1][fixed] <= 4) {
    return num.toFixed(fixed);
  }
  numSplit[1] = (+numSplit[1].substring(0, fixed) + 1 + "").padStart(fixed, 0);
  if (numSplit[1].length > fixed) {
    numSplit[0] = +numSplit[0] + 1;
    numSplit[1] = numSplit[1].substring(1, fixed + 1);
  }
  return numSplit.join(".");
}
