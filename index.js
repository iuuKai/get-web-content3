/*
 * @Author: iuukai
 * @Date: 2023-09-11 16:50:33
 * @LastEditors: iuukai
 * @LastEditTime: 2023-09-11 17:55:31
 * @FilePath: \node\cheerio\index.js
 * @Description:
 * @QQ/微信: 790331286
 */
var express = require('express')
const axios = require('axios')
var cheerio = require('cheerio')

var app = express()

app.get('/', async (req, res, next) => {
	// const url = 'https://cnodejs.org/'
	// const url = 'https://www.baidu.com/'
	const url = 'https://www.bidianer.com/'

	try {
		const { data } = await axios.get(url, {
			withCredentials: true,
			headers: {
				'User-Agent': req.headers['user-agent']
			}
		})
		// console.log('%c [ data ]-54', 'font-size:13px; background:pink; color:#bf2c9f;', data)
		const $ = cheerio.load(data)
		const title = $('title').text() || ''
		const icon = $('link[rel~="icon"]').attr('href') || ''
		const description = $('meta[name="description"]').attr('content') || ''
		res.send({ code: 200, url, title, icon, description })
	} catch (error) {
		res.send({
			code: 500,
			msg: error.message
		})
	}
})

const port = 5555
const host = process.env.HOST || ''
app.listen(port, function () {
	console.log(`app is listening at port ${port}`)
	console.log(`server running @ http://${host ? host : 'localhost'}:${port}`)
})
