# get-web-content

express + puppeteer 根据网址获取网站 title、icon 等数据

```bash
# npm
npm install

# node
node index.js
```

```js
axios({
    url: 'http://localhost:5555/',
    method: 'post',
    data: {
        url: 'https://www.baidu.com/'
    }
}).then(res => console.log(res.data))
```
