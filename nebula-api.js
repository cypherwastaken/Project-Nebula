const nebula = {}

window.nebula = nebula

nebula.createApp = function(config){

let win = createNebulaWindow(config.title || "App")

if(config.html){

let container = document.createElement("div")
container.style.height="calc(100% - 32px)"
container.style.overflow="auto"

container.innerHTML = config.html

win.appendChild(container)

}

if(config.url){

let iframe = document.createElement("iframe")
iframe.src = config.url

win.appendChild(iframe)

}

return win

}

let z = 100

function createNebulaWindow(title){

let win = document.createElement("div")
win.className="window"

win.style.width="500px"
win.style.height="350px"
win.style.left="200px"
win.style.top="120px"

let titlebar=document.createElement("div")
titlebar.className="titlebar"

titlebar.innerHTML=`
<span>${title}</span>

<div class="window-controls">

<span data-act="min">_</span>
<span data-act="max">□</span>
<span data-act="close">✕</span>

</div>
`

win.appendChild(titlebar)

document.getElementById("windows").appendChild(win)

focusWindow(win)

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

nebula.fs = {

read:path=>NebulaFS.read(path),

write:(path,data)=>NebulaFS.write(path,data),

delete:path=>NebulaFS.delete(path),

list:()=>NebulaFS.list()

}

nebula.notify = function(text){

alert(text)

}
