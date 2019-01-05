const spacer = document.createElement('div')

spacer.setAttribute(
    'style', 
    `
        height: 22px;
        width: 100%;
        -webkit-app-region: drag;
        position: absolute;
        z-index: 200000;
    `
)

document.body.prepend(spacer)

spacer.addEventListener('dblclick',()=>{
    const win = require('electron').remote.getCurrentWindow();
    win.isMaximized() ? win.unmaximize() : win.maximize()
})