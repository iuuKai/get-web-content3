/*
 * @Author: iuukai
 * @Date: 2023-09-11 16:50:33
 * @LastEditors: iuukai
 * @LastEditTime: 2023-09-11 22:09:07
 * @FilePath: \node\cheerio\index.js
 * @Description:
 * @QQ/微信: 790331286
 */
const express = require('express')
const puppeteer = require('puppeteer')

const app = express()
const port = Number(process.env.PORT || '5555')
const host = process.env.HOST || ''

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
	res.set({
		'Access-Control-Allow-Credentials': true,
		'Access-Control-Allow-Origin': req.headers.origin || '*',
		'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
		'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
		'Content-Type': 'application/json; charset=utf-8'
	})
	req.method === 'OPTIONS' ? res.status(204).end() : next()
})

app.post('/', async (req, res, next) => {
	const { url } = Object.assign({}, req.query, req.body, req.files)

	try {
		const browser = await puppeteer.launch({ headless: 'new' })
		const page = await browser.newPage()
		// 导航到目标网页
		await page.goto(url, { waitUntil: 'networkidle2' })

		const result = await page.evaluate(url => {
			const $titleEl = document.querySelector('title')
			const $iconEl = document.querySelector('link[rel~="icon"]')
			const $descriptionEl = document.querySelector('meta[name="description"]')
			const title = $titleEl ? $titleEl.textContent : ''
			const icon = $iconEl ? $iconEl.getAttribute('href') : ''
			const description = $descriptionEl ? $descriptionEl.getAttribute('content') : ''
			return {
				url,
				title,
				icon,
				description
			}
		}, url)

		res.send({ code: 200, ...result })
		await browser.close()
	} catch (error) {
		res.send({
			code: 500,
			msg: error.message
		})
	}
})

app.listen(port, function () {
	console.log(`server running @ http://${host ? host : 'localhost'}:${port}`)
})
