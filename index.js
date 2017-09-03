require('dotenv').config()
const request = require('request')
const dashButton = require('node-dash-button')
const moment = require('moment')

const startDashButton = process.env.START_DASH_MAC_ADDRESS
const stopDashButton  = process.env.STOP_DASH_MAC_ADDRESS
const token           = process.env.KOT_TOKEN
const userKey         = process.env.USER_KEY

const buttonsMacAddress = [startDashButton, stopDashButton]

const dash = dashButton(buttonsMacAddress, '', 5000, 'all')

const START = 1
const STOP = 2

dash.on("detected", (dashId) => {
  if (dashId === startDashButton) {
    emboss(START)
  } else if (dashId === stopDashButton) {
    emboss(STOP)
  }
});

function emboss (code) {
  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  }

  const url = `https://api.kingtime.jp/v1.0/daily-workings/timerecord/${userKey}`

  const data = {
    "time": moment().format(),
    "code": code,
  }

  const options = {
    url: url,
    method: 'POST',
    headers: headers,
    form: data
  }

  request(options, function (error, response, body) {
    console.log(body)
  })
}
