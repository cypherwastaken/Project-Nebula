const apps = [
"notes",
"calculator"
]

const taskbar = document.getElementById("taskbar-apps")
const windows = document.getElementById("windows")

apps.forEach(loadApp)

async function loadApp(app){

let manifest = await fetch(`apps/${app}.app/manifest.json`)
.then(r=>r.json())

let btn = document.createElement("div")
btn.className="taskbar-item"
btn.title=manifest.name

let img=document.createElement("img")
img.src=`apps/${app}.app/${manifest.icon}`

btn.appendChild(img)

btn.onclick=()=>launchApp(app,manifest)

taskbar.appendChild(btn)

}

async function launchApp(app,manifest){

let win=document.createElement("div")
win.className="window"
win.style.width="400px"
win.style.height="300px"
win.style.left="200px"
win.style.top="150px"

let title=document.createElement("div")
title.className="titlebar"
title.textContent=manifest.name

let iframe=document.createElement("iframe")
iframe.src=`apps/${app}.app/index.html`

win.appendChild(title)
win.appendChild(iframe)

windows.appendChild(win)

makeDraggable(win,title)

}

function makeDraggable(win,bar){

let offsetX=0
let offsetY=0
let drag=false

bar.onmousedown=e=>{
drag=true
offsetX=e.clientX-win.offsetLeft
offsetY=e.clientY-win.offsetTop
}

document.onmouseup=()=>drag=false

document.onmousemove=e=>{
if(!drag)return

win.style.left=e.clientX-offsetX+"px"
win.style.top=e.clientY-offsetY+"px"
}

}
