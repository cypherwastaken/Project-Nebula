const taskbar = document.getElementById("taskbar-apps")
const windows = document.getElementById("windows")

let z = 1

init()

async function init(){

registerServiceWorker()

let data = await fetch("apps.json").then(r=>r.json())

for(let app of data.apps){

loadApp(app)

}

}

async function loadApp(app){

let manifest = await fetch(`apps/${app}.app/manifest.json`).then(r=>r.json())

let btn=document.createElement("div")
btn.className="taskbar-item"
btn.title=manifest.name

let img=document.createElement("img")
img.src=`apps/${app}.app/${manifest.icon}`

btn.appendChild(img)

btn.onclick=()=>launchApp(app,manifest)

taskbar.appendChild(btn)

}

function launchApp(app,manifest){

let win=document.createElement("div")
win.className="window"

win.style.width="500px"
win.style.height="350px"
win.style.left="200px"
win.style.top="150px"

focusWindow(win)

let title=document.createElement("div")
title.className="titlebar"

title.innerHTML=`
<span>${manifest.name}</span>

<div class="window-controls">

<span data-act="min">_</span>
<span data-act="max">□</span>
<span data-act="close">✕</span>

</div>
`

let iframe=document.createElement("iframe")

// lazy loading
iframe.dataset.src=`apps/${app}.app/index.html`

win.appendChild(title)
win.appendChild(iframe)

windows.appendChild(win)

iframe.src=iframe.dataset.src

makeDraggable(win,title)

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

win.onclick=()=>focusWindow(win)

}

function focusWindow(win){

z++

win.style.zIndex=z

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
