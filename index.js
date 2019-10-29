const path = require("path")
const {
  app,
  BrowserWindow,
  dialog,
} = require('electron')
const WebSocket = require("ws")
const notify = require('electron-main-notification')

const ws = new WebSocket('ws://localhost:1040/app')

let win

function main() {
    win = new BrowserWindow({
        width: 960,
        height: 600,
        title:"WebSocket Demo"
    })

    win.loadURL(path.join(__dirname, 'index.html'))
    win.on('closed', () => { win = null })

    ws.on('message', function incoming(body) {
      notify(
        'Got new message！',
        {body},
        () => {
          console.log('The notification got clicked on!')
        }
      )
    });
}

app.on('ready', main)
app.on('window-all-closed', () => {
    app.quit()
    process.exit(1)
})
app.on('quit', function () {
    console.log("Done.")
})