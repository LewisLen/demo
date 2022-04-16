/**
 * String.prototype.split(); 
 * split()方法使用指定的分隔字符串将一个String对象分割成子字符串数组
 */

const getUrlParams = url => {
  const res = {}
  if(url.includes('?')){
    const str = url.split("?")[1]; // 取参数
    const arr = str.split("&"); // 借助 & 符号将参数分隔成数组，每个元素都是key=value的形式

    arr.forEach(item => {
      const key = item.split('=')[0];
      const val = item.split('=')[1];
      res[key] = decodeURIComponent(val);
    });
    
    return res;
  }
}

let tempUrl = 'https://www.baidu.com/?name=%E5%8C%B9%E8%AF%BA%E6%9B%B9&age=20';
const user = getParams(tempUrl);
// {name: '匹诺曹',age: 20}

/**
 * 方法二：
 * URLSearchParams 接口定义了一些实用的方法来处理 URL 的查询字符串
 * Object.fromEntries() 方法把键值对列表转换为一个对象。与Object.entries() 相反
 * 
 */

// 创建一个URLSearchParams实例，
// location.search是包含?的函数都取出来了 ?name=%E5%8C%B9%E8%AF%BA%E6%9B%B9&age=20
const urlSearchParams = new URLSearchParams(window.location.search);
// 把键值对列表转换为一个对象
const params = Object.fromEntries(urlSearchParams.entries());
// {name: '匹诺曹',age: 20}