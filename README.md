# get-web-content

express + puppeteer 根据网址获取网站 title、icon 等数据

- ✖️ [Render](https://dashboard.render.com/)
- ✖️ [Vercel](https://vercel.com/)

> 注意：
> 本地测试可以，但部署到 Render、Vercel 后报错 Could not find Chrome

```txt
Could not find Chrome (ver. 117.0.5938.88). This can occur if either
  1. you did not perform an installation before running the script (e.g. `npm install`) or 
  2. your cache path is incorrectly configured (which is: /opt/render/.cache/puppeteer).
  For (2), check out our guide on configuring puppeteer at https://pptr.dev/guides/configuration.
```

---

```bash
# npm
npm install && node index.js
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
