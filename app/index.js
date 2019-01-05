const { app, BrowserWindow, globalShortcut } = require('electron')


// const menu = new Menu()

// menu.append(new MenuItem({

//     label: 'New Window',
//     accelerator: process.platform === 'darwin' ? 'Cmd+N' : 'Ctrl+N',
//     click: () => createWindow() 

// }))

const windows = []

const createWindow = () => {
    
    if(windows.length < 1) {

        let win = new BrowserWindow({ 
            webPreferences: {
                nodeIntegration: true
            },
            titleBarStyle: 'hidden',
            backgroundColor: '#333333',
            show: false,
            width: 1024, 
            height:600
        })
        win.loadURL('https://messages.android.com/')
        // win.loadFile('app/view/index.html')

        win.webContents.once('dom-ready', () => {
            
            const jsImportToHTML = require('fs').readFileSync(__dirname + '/include.js','utf8');
            win.webContents.executeJavaScript(jsImportToHTML)

        });
        
        win.once('ready-to-show', () => {
            win.show()
        })
    
        win.on('closed', () => {
            windows.pop()
            delete win
        })

        
    
        windows.push(win)

    } 
}




app.on('ready', () => {

    globalShortcut.register('Cmd+N', () => createWindow())

    createWindow()

})

app.on('activate', () => {

    createWindow()

})

app.on('window-all-closed', () => {

    if (process.platform !== 'darwin') {
      app.quit()
    }

})