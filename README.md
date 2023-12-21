# utils

## 1 复制文本到剪切板-copyToClipboard

```js
export const copyToClipboard = (text) => navigator.clipboard.writeText(text);
```

## 2 获取某个日期位于当年的第几天-getDayOfYear

``` js
export const getDayOfYear = (date) => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
```

## 3 将rgb颜色灰度化(基于光感加权平均)-rgbToGray

``` js
export const rgbToGray = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
```

## 4 解析URL中参数-parseQuery

``` js
export const parseQuery = (url) => {
  q = {};
  url.replace(/([^?&=]+)=([^&]*)/g, (_, k, v) => (q[k] = v));
  return q;
};
```

## 5 对象属性转url参数-formatOptions

``` js
export const formatOptions = (options) => {
  var urlOptions = "";
  for (var i in options) {
    urlOptions += i + "=" + options[i] + "&";
  }
  urlOptions = urlOptions.slice(0, urlOptions.length - 1);
  return urlOptions;
};
```

## 6 筛选对象属性-pick

``` js
export const pick = (obj, ...props) => Object.fromEntries(Object.entries(obj).filter(([k]) => props.includes(k)));
```

## 7 随机HEX颜色-randomColor

``` js
export const randomColor = () =>
  "#" +
  Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, "0");
```

## 8 生成随机字符串-randomString

``` js
export const randomString = () => Math.random().toString(36).slice(2);
```

## 9 去掉字符串中的元素标记-removeTag

``` js
export const removeTag = (fragment) =>
  new DOMParser().parseFromString(fragment, "text/html").body.textContent || "";
```

## 10 防抖-debounce

``` js
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
```

## 11 节流-throttle

``` js
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
```

## 12 比较数据是否一致-equals

``` js
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
```

## 13 保留两位小数-toFixed

``` js
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
```

