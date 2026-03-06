const taskbar = document.getElementById("taskbar-apps")
const windows = document.getElementById("windows")

var z = 1

init()

async function init(){

registerServiceWorker()

let registry = await fetch("apps/_registry.json").then(r=>r.json())

for(let app of registry.apps){

registerApp(app)

}

}

async function registerApp(app){

let manifest = await fetch(`apps/${app}.app/manifest.json`)
.then(r=>r.json())

let btn = document.createElement("div")
btn.className="taskbar-item"
btn.title = manifest.name

let img = document.createElement("img")
img.src = `apps/${app}.app/${manifest.icon}`

btn.appendChild(img)

btn.onclick = () => launchApp(app,manifest)

taskbar.appendChild(btn)

}

function launchApp(app,manifest){

let win = createWindow(manifest.name)

let iframe = document.createElement("iframe")
iframe.src = `apps/${app}.app/index.html`

win.appendChild(iframe)

}

function createWindow(titleText){

let win = document.createElement("div")
win.className="window"

win.style.width="600px"
win.style.height="400px"
win.style.left="200px"
win.style.top="120px"

focusWindow(win)

let titlebar=document.createElement("div")
titlebar.className="titlebar"

titlebar.innerHTML=`
<span>${titleText}</span>
<div class="window-controls">
<span data-act="min">_</span>
<span data-act="max">□</span>
<span data-act="close">✕</span>
</div>
`

win.appendChild(titlebar)

windows.appendChild(win)

setupControls(win,titlebar)
makeDraggable(win,titlebar)

return win

}

function focusWindow(win){

z++
win.style.zIndex=z

}

function setupControls(win,title){

title.querySelectorAll("span").forEach(btn=>{

btn.onclick=(e)=>{

let act=e.target.dataset.act

if(act==="close") win.remove()

if(act==="min") win.style.display="none"

if(act==="max"){

win.style.left="0"
win.style.top="0"
win.style.width="100%"
win.style.height="calc(100% - 40px)"

}

}

})

}

function makeDraggable(win,bar){

let drag=false
let ox=0
let oy=0

bar.onmousedown=e=>{
drag=true
ox=e.clientX-win.offsetLeft
oy=e.clientY-win.offsetTop
}

document.onmouseup=()=>drag=false

document.onmousemove=e=>{
if(!drag) return

win.style.left=e.clientX-ox+"px"
win.style.top=e.clientY-oy+"px"

}

}

function registerServiceWorker(){

if("serviceWorker" in navigator){

navigator.serviceWorker.register("sw.js")

}

}
