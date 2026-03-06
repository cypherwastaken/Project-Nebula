const FS = {

read(path){

let fs = JSON.parse(localStorage.getItem("nebulaFS") || "{}")
return fs[path]

},

write(path,data){

let fs = JSON.parse(localStorage.getItem("nebulaFS") || "{}")
fs[path] = data

localStorage.setItem("nebulaFS",JSON.stringify(fs))

},

delete(path){

let fs = JSON.parse(localStorage.getItem("nebulaFS") || "{}")
delete fs[path]

localStorage.setItem("nebulaFS",JSON.stringify(fs))

},

list(){

return JSON.parse(localStorage.getItem("nebulaFS") || "{}")

}

}

window.NebulaFS = FS
