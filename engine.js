let Actors = []

function Vector2(x,y){
    return {
        x:x?x:0,
        y:y?y:0
    }
}

function Vector3(x,y,z){
    return {
        x:x?x:0,
        y:y?y:0,
        z:z?z:0
    }
}

function Wall(position, scale, rotation){
    let e = document.createElement('div')
    e.classList = "wall"
    e.position = position?position:Vector3()
    e.rotation = rotation?rotation:Vector3()
    e.scale = scale?scale:Vector2()
    e.texture = 'red'

    let gradient = document.createElement('div')
    gradient.classList = 'gradient'
    e.append(gradient)

    
    return e
}

function Actor(position, scale){
    let e = document.createElement('div')
    e.classList = "actor"
    e.position = position?position:Vector3()
    e.rotation = Vector3()
    e.scale = scale?scale:Vector2()
    e.texture = 'red'
    
    return e
}



function Spawn(...args){
    for(let i of args){
        document.querySelector('#scene').append(i)
        Actors.push(i)
    }
}

let Camera = {
    rotation: Vector3(),
    position: Vector3()
}

let prevtime = 0
let deltaTime = 0
let fps = 60


function Clamp(x, min, max){
    if(x < min) return min
    else if(x > max) return max
    else return x
}