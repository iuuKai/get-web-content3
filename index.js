/*
 * @Author: iuukai
 * @Date: 2023-09-11 16:50:33
 * @LastEditors: iuukai
 * @LastEditTime: 2023-09-21 11:32:19
 * @FilePath: \node\puppeteer\index.js
 * @Description:
 * @QQ/微信: 790331286
 */
const express = require('express')
const puppeteer = require('puppeteer-core')
const chromium = require('chrome-aws-lambda')

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
	let browser
	try {
		const options = {
					args: chrome.args,
					executablePath: await chrome.executablePath,
					headless: chrome.headless
			  }
		// 本地
			// {
			// 		args: [],
			// 		executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
			//   }
		browser = await puppeteer.launch(options)
		const page = await browser.newPage()
		// 导航到目标网页
		await page.goto(url)

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
	} catch (error) {
		res.send({
			code: 500,
			msg: error.message
		})
	} finally {
		if (browser) await browser.close()
	}
})

app.listen(port, function () {
	console.log(`server running @ http://${host ? host : 'localhost'}:${port}`)
})
