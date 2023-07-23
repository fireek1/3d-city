const scene = document.querySelector('.scene')
const walls = document.querySelectorAll('.tower-wall, .tower2-wall, .tower5-wall')
const openMenu = document.querySelector('.open')
const menu = document.querySelector('.menu')
const lvl = document.querySelector('.lvl')
const scale = document.querySelector('.scale')
const rotateSpeedInput = document.querySelector('.rotate-speed')
const autoRotateCheckbox = document.querySelector('.rotate-checkbox')
const ui = document.querySelector('.ui')
const cameraBtn = document.querySelector('button.opt-title')
const qualityInput = document.querySelector('.quality-input')
const lineLights = document.querySelectorAll('.line-light')
const frontRightWalls = document.querySelectorAll('.right, .front')
const leftWalls = document.querySelectorAll('.left')
const backWalls = document.querySelectorAll('.back')
const floor = document.querySelector('.floor')
const car = document.querySelector('.car')

const towerLights = 72
const tower2Lights = 35
const tower5Lights = 297

let scaleCount = 0

let isOpen = true
let rotateSpeed = 0
let isLeftClick = false
let freeCameraMode = false
let isMoving = false
let currentKey = null

let prevMouseX = 0
let prevMouseY = 0

let rotateY = 0
let rotateX = 0

const speed = 10

let translateX = window.innerWidth / 2
let translateZ = 0
let translateY = 600

let originX = 0
let originY = -200
let originZ = 0

let dx = 0
let dy = 0
let dz = 0

let quality = 2

let isWindowOf = true

for (let i = 0; i < 30; i++) {
    const tempCar = car.cloneNode(true)
}

for (let i = 0; i < walls.length; i++) {
    const tempWallLights = document.createElement('div')
    tempWallLights.classList.add('lights')
    const ground = document.createElement('div')
    ground.classList.add('ground')
    if (walls[i].className.split(' ').includes('tower-wall') || walls[i].className.split(' ').includes('tower5-left') || walls[i].className.split(' ').includes('tower5-right')) {
        for (let k = 0; k < towerLights; k++) {
            const winLight = document.createElement('div')
            winLight.classList.add('window')
            if (Math.random() > 0.5) {
                winLight.classList.add('window-off')
            }
            tempWallLights.appendChild(winLight)
        }
        walls[i].appendChild(tempWallLights)
        walls[i].appendChild(ground)
    } else if (walls[i].className.split(' ').includes('tower2-wall')) {
        for (let k = 0; k < tower2Lights; k++) {
            const winLight = document.createElement('div')
            winLight.classList.add('window')
            if (Math.random() > 0.5) {
                winLight.classList.add('window-off')
            }
            tempWallLights.appendChild(winLight)
        }
        walls[i].appendChild(tempWallLights)
    } else if (walls[i].className.split(' ').includes('tower5-front') || walls[i].className.split(' ').includes('tower5-back')) {
        for (let k = 0; k < tower5Lights; k++) {
            const winLight = document.createElement('div')
            winLight.classList.add('window')
            if (Math.random() > 0.5) {
                winLight.classList.add('window-off')
            }
            tempWallLights.appendChild(winLight)
        }
        walls[i].appendChild(tempWallLights)
    }
}

const lights = document.querySelectorAll('.window')

setInterval(() => {
    if (isWindowOf) {
        for (let i = 0; i < lights.length; i++) {
            if (Math.random() > 0.995) lights[i].classList.toggle('window-off')
        }
    }
}, 100)


openMenu.onclick = () => {
    if (isOpen) {
        menu.style.left = "-500px"
        openMenu.style.transform = "translate(-1000px)"
        openMenu.style.rotate = "0deg"
        isOpen = false
    } else {
        menu.style.left = "0px"
        openMenu.style.transform = "translate(0px)"
        openMenu.style.rotate = "180deg"
        isOpen = true
    }

}

scale.oninput = () => scaleCount = scale.value
rotateSpeedInput.oninput = () => rotateSpeed = +rotateSpeedInput.value
autoRotateCheckbox.onchange = () => {
    if (autoRotateCheckbox.checked && !freeCameraMode) {
        rotateSpeedInput.removeAttribute('disabled')
    } else {
        rotateSpeedInput.setAttribute('disabled', 'true')
        rotateSpeedInput.value = 0
        rotateSpeed = 0
    }
}

lvl.onmousedown = (e) => {
    if (e.which === 1) {
        isLeftClick = true
        lvl.style.cursor = 'grabbing'
    }

}

window.onmouseup = (e) => {
    if (e.which === 1) {
        isLeftClick = false
        lvl.style.cursor = 'grab'
    }
}

window.onmousemove = (e) => {
    const currentMouseX = e.clientX
    const currentMouseY = e.clientY
    const deltaX = currentMouseX - prevMouseX
    const deltaY = currentMouseY - prevMouseY
    prevMouseX = currentMouseX
    prevMouseY = currentMouseY
    if (isLeftClick) {
        rotateX -= deltaY * 0.2
        rotateY += deltaX * 0.2

        if (rotateX > 80) {
            rotateX = 80;
        } else if (rotateX < -80) {
            rotateX = -80;
        }
    }
}

function transformScene() {
    if (freeCameraMode) {
        scene.style.transform = `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateY(${rotateY}deg) rotateX(${rotateX * Math.cos(rotateY * Math.PI / 180)}deg) rotateZ(${rotateX * Math.sin(rotateY * Math.PI / 180)}deg)`
        scene.style.transformOrigin = `${originX}px ${originY}px ${originZ}px`
    } else {
        rotateY += rotateSpeed
        scene.style.transform = `translate3d(${window.innerWidth / 2}px, 600px, ${scaleCount}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(0deg)`
        scene.style.transformOrigin = `0px 50% 0px`
    }
}

cameraBtn.onclick = () => {
    if (freeCameraMode) {
        cameraBtn.style.boxShadow = 'none'
        freeCameraMode = false
        translateX = window.innerWidth / 2
        translateZ = 0
        translateY = 600
        originX = 0
        originY = -200
        originZ = 0
        qualityInput.removeAttribute('disabled')
        scale.removeAttribute('disabled')
    } else {
        cameraBtn.style.boxShadow = '0 0 20px #5927ee'
        freeCameraMode = true
        qualityInput.setAttribute('disabled', 'true')
        scale.setAttribute('disabled', 'true')
    }
}

document.onkeydown = (e) => {
    if (e.code === 'KeyW' || e.code === 'KeyA' || e.code === 'KeyS' || e.code === 'KeyD' && freeCameraMode) {
        isMoving = true
        currentKey = e.code
    }
}
document.onkeyup = (e) => {
    if (e.code === 'KeyW' || e.code === 'KeyA' || e.code === 'KeyS' || e.code === 'KeyD') {
        isMoving = false
        currentKey = null
    }
}

qualityInput.onchange = () => {
    if (+qualityInput.value === 1) {
        normalLights()
        potatoWalls()
        removeReflection()
    } else if (+qualityInput.value === 2) {
        normalLights()
        normalWalls()
        removeReflection()
    } else if (+qualityInput.value === 0) {
        potatoWalls()
        potatoLights()
        removeReflection()
    } else if (+qualityInput.value === 3) {
        normalLights()
        potatoWalls()
        setReflections()
        normalWalls()
    }
}

function normalLights() {
    isWindowOf = true
    for (let i = 0; i < lineLights.length; i++) {
        lineLights[i].style.boxShadow = '0px 0px 30px rgb(245, 173, 252)'
    }
}

function potatoLights() {
    isWindowOf = false
    for (let i = 0; i < lights.length; i++) {
        lights[i].classList.add('window-off')
    }
    for (let i = 0; i < lineLights.length; i++) {
        lineLights[i].style.boxShadow = 'none'
    }
}

function normalWalls() {
    for(let i = 0; i < frontRightWalls.length; i++) {
        frontRightWalls[i].style.background = 'linear-gradient(to bottom, #451bc2, #28116e)'
        frontRightWalls[i].style.backgroundColor = 'none'
    }
    for(let i = 0; i < leftWalls.length; i++) {
        leftWalls[i].style.background = 'linear-gradient(to bottom, #2b117a, #1c0a52)'
        leftWalls[i].style.backgroundColor = 'none'
    }
    for(let i = 0; i < backWalls.length; i++) {
        backWalls[i].style.background = 'linear-gradient(to bottom, #351594, #1d0b53)'
        backWalls[i].style.backgroundColor = 'none'
    }
}

function potatoWalls() {
    for(let i = 0; i < frontRightWalls.length; i++) {
        frontRightWalls[i].style.background = 'none'
        frontRightWalls[i].style.backgroundColor = '#451bc2'
    }
    for(let i = 0; i < leftWalls.length; i++) {
        leftWalls[i].style.background = 'none'
        leftWalls[i].style.backgroundColor = '#2b117a'
    }
    for(let i = 0; i < backWalls.length; i++) {
        backWalls[i].style.background = 'none'
        backWalls[i].style.backgroundColor = '#351594'
    }
}

function setReflections() {
    const tempReflect = scene.cloneNode(true)
    const reflect = document.createElement('div')
    reflect.classList.add('reflect', 'd3')
    tempReflect.style.transform = `translate3d(0px, ${-translateZ + 2000}px, 0px) scaleY(-1)`
    reflect.appendChild(tempReflect)  
    scene.appendChild(reflect)
    document.querySelector('.reflect > .scene > .floor').classList.remove('floor')
    floor.style.opacity = '0.8'
}

function removeReflection() {
    if (document.querySelectorAll('.scene').length > 1) {
        scene.removeChild(scene.lastChild)
    }
    floor.style.opacity = '1'
}

function moveChatacter() {
    if (isMoving && currentKey !== null) {
        if (currentKey === "KeyW") {
            dx = -Math.sin(rotateY * Math.PI / 180)
            dy = Math.cos(rotateY * Math.PI / 180)
            translateX += dx * speed
            translateY += Math.sin(rotateX * Math.PI / 180) * speed
            translateZ += dy * speed
        } else if (currentKey === "KeyA") {
            dx = Math.sin(rotateY * Math.PI / 180 + Math.PI / 2)
            dy = -Math.cos(rotateY * Math.PI / 180 + Math.PI / 2)
            translateX += dx * speed
            translateZ += dy * speed
        } else if (currentKey === "KeyS") {
            dx = Math.sin(rotateY * Math.PI / 180)
            dy = -Math.cos(rotateY * Math.PI / 180)
            translateX += dx * speed
            translateY -= Math.sin(rotateX * Math.PI / 180) * speed
            translateZ += dy * speed
        } else if (currentKey === "KeyD") {
            dx = -Math.sin(rotateY * Math.PI / 180 + Math.PI / 2)
            dy = Math.cos(rotateY * Math.PI / 180 + Math.PI / 2)
            translateX += dx * speed
            translateZ += dy * speed
        }
        originX = -translateX + window.innerWidth / 2
        originY = -translateY + window.innerHeight / 2
        originZ = -translateZ + 500
    }
}


function Frame() {
    transformScene()
    moveChatacter()

    // removeReflection()
    // setReflections()
    requestAnimationFrame(Frame)
}

Frame()