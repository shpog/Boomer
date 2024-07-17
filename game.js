// let collision = [
// 	[-1800,2000, -200, 200, 0],
// 	[-2000,-1800, -200, 200, 200]
// ]



/*

default map chunk size is 15x15

*/


let levelData = [1]




let collision = []

for(let i = 0; i < levelData.length; i++){
	switch(levelData[i]){

		default:
			// for(let j = i*15; j < (i+1)*15; j++){
			// 	Spawn(
			// 		Wall(Vector3(0,100,-200*j), Vector2(200,200), Vector3(90,0,0), e=>{e.texture = 'url("./bricks.png")'}),
			// 		Wall(Vector3(0,-100,-200*j), Vector2(200,200), Vector3(90,0,0), e=>{e.texture = 'url("./bricks.png")'}),
			// 		Wall(Vector3(100,0,-200*j), Vector2(200,200), Vector3(90,90,0), e=>{e.texture = 'url("./bricks.png")'}),
			// 		Wall(Vector3(-100,0,-200*j), Vector2(200,200), Vector3(90,90,0), e=>{e.texture = 'url("./bricks.png")'}),
			// 	)
			// }
			for(let j = i*15; j < (i+1)*15; j++){
				Spawn(
					Wall(Vector3(0,100,-200*j), Vector2(100,200), Vector3(90,0,0), e=>{e.texture = 'url("./bricks.png")'}),
					Wall(Vector3(-75,75,-200*j), Vector2(100,200), Vector3(90,45,0), e=>{e.texture = 'url("./bricks.png")'}),
					Wall(Vector3(0,-100,-200*j), Vector2(100,200), Vector3(90,0,0), e=>{e.texture = 'url("./bricks.png")'}),
					Wall(Vector3(75,75,-200*j), Vector2(100,200), Vector3(90,-45,0), e=>{e.texture = 'url("./bricks.png")'}),
					Wall(Vector3(100,0,-200*j), Vector2(100,200), Vector3(90,90,0), e=>{e.texture = 'url("./bricks.png")'}),
					Wall(Vector3(75,-75,-200*j), Vector2(100,200), Vector3(90,45,0), e=>{e.texture = 'url("./bricks.png")'}),
					Wall(Vector3(-100,0,-200*j), Vector2(100,200), Vector3(90,90,0), e=>{e.texture = 'url("./bricks.png")'}),
					Wall(Vector3(-75,-75,-200*j), Vector2(100,200), Vector3(90,-45,0), e=>{e.texture = 'url("./bricks.png")'}),
				)
			}
			collision.push([200*i*15, 200*(i+1)*15, -100, 100, 0])
	}
}

// Create Map

// let a = Actor(Vector3(0,0,-200),Vector2(200,200))
// a.texture = 'url("./scribe.png")'
// Spawn(a)

// // let w = Wall(Vector3(0,100,-200),Vector2(200,200),Vector3(90,0,0))
// // w.texture = 'url("./bricks.png")'

// for(let i = -10; i < 10; i++){
// 		let a = Wall(Vector3(100,100,200*i),Vector2(200,200),Vector3(90,0,0))
// 		a.texture = 'url("./bricks.png")'
// 		let b = Wall(Vector3(-100,100,200*i),Vector2(200,200),Vector3(90,0,0))
// 		b.texture = 'url("./bricks.png")'

// 		let c = Wall(Vector3(-200,0,200*i),Vector2(200,200),Vector3(90,90,0))
// 		c.texture = 'url("./bricks.png")'

// 		let d = Wall(Vector3(100,-100,200*i),Vector2(200,200),Vector3(90,0,0))
// 		d.texture = 'url("./bricks.png")'
// 		let e = Wall(Vector3(-100,-100,200*i),Vector2(200,200),Vector3(90,0,0))
// 		e.texture = 'url("./bricks.png")'

// 		let f = Wall(Vector3(200,0,200*i),Vector2(200,200),Vector3(90,-90,0))
// 		f.texture = 'url("./bricks.png")'


// 		Spawn(a,b,c,d,e,f)
// }





function getCollision(z, collision){
	for(let i of collision){
		if(z >= i[0] && z <= i[1]) return [i[2]+5,i[3]-5, i[4]]
	}
	return [-2000,2000, 0]
}






let forwardAxis = 0
let backAxis = 0
let rightAxis = 0
let leftAxis = 0

let jumpspeed = 0

let groundPosition = getCollision(Camera.position.z, collision)[2]
let maxJumpHeight = groundPosition+75

window.onkeypress = e => {
	if(e.key == " " && Camera.position.y <= groundPosition+0.1) {
		jumpspeed = 300
	}
}

window.onkeydown = e => {
	if(e.key == "w") forwardAxis = 1
	if(e.key == "s") backAxis = 1
	if(e.key == "a") leftAxis = 1
	if(e.key == "d") rightAxis = 1
	
}

window.onkeyup = e => {
	if(e.key == "w") forwardAxis = 0
	if(e.key == "s") backAxis = 0
	if(e.key == "a") leftAxis = 0
	if(e.key == "d") rightAxis = 0
}

// document.onclick = e => {
// 	document.body.requestPointerLock()
// }


let movementSpeed = Vector2(0,0)
let maxMovementSpeed = Vector2(-10,10)

function resize(){
	document.querySelector('#lightoverlay').style.height = (window.innerHeight + 750) + 'px'
	document.querySelector('#lightoverlay').style.width = (window.innerHeight + 750) + 'px'


	document.querySelector('#gun #right').style.height = (window.innerHeight*0.75) + 'px'
	document.querySelector('#gun #right').style.width = (window.innerHeight*0.75) + 'px'
	document.querySelector('#gun #right').style.right = (window.innerWidth*0.09) + 'px'

	document.querySelector('#gun #left').style.height = (window.innerHeight*0.75) + 'px'
	document.querySelector('#gun #left').style.width = (window.innerHeight*0.75) + 'px'
	document.querySelector('#gun #left').style.left = (window.innerWidth*0.09) + 'px'

}
resize()
window.onresize = resize


function update(deltaTime){

	

	// movement speed
	movementSpeed.y = Clamp(movementSpeed.y + (forwardAxis-backAxis)*deltaTime/5, maxMovementSpeed.x, maxMovementSpeed.y)
	movementSpeed.x = Clamp(movementSpeed.x + (leftAxis-rightAxis)*deltaTime/5, maxMovementSpeed.x, maxMovementSpeed.y)

	if((forwardAxis-backAxis) == 0) movementSpeed.y = Clamp(movementSpeed.y/2, maxMovementSpeed.x, maxMovementSpeed.y)
	if((leftAxis-rightAxis) == 0) movementSpeed.x = Clamp(movementSpeed.x/2, maxMovementSpeed.x, maxMovementSpeed.y)

	// Camera.position.z = Camera.position.z + movementSpeed.y

	Camera.position.z = Clamp(Camera.position.z + movementSpeed.y, 0, (levelData.length)*15*200-200)

	Camera.position.x = Clamp(Camera.position.x + movementSpeed.x, ...getCollision(Camera.position.z, collision))

	// groundPosition = getCollision(Camera.position.z, collision)[2]

	if(groundPosition < getCollision(Camera.position.z, collision)[2]) groundPosition = Clamp(groundPosition + deltaTime, groundPosition, getCollision(Camera.position.z, collision)[2])
	else if(groundPosition > getCollision(Camera.position.z, collision)[2]) groundPosition = Clamp(groundPosition - deltaTime, getCollision(Camera.position.z, collision)[2],  groundPosition)





	maxJumpHeight = groundPosition+50

	Camera.position.y = Clamp(Camera.position.y + jumpspeed*deltaTime/1000, groundPosition, maxJumpHeight)

	jumpspeed = Clamp(jumpspeed - deltaTime, -1000, 1000)

	if(Math.abs(movementSpeed.x)+Math.abs(movementSpeed.y)>0.1 && Camera.position.y < groundPosition+0.1) document.querySelector('#gun').classList = 'run'
	else if(Camera.position.y > groundPosition+0.1) document.querySelector('#gun').classList = 'jump'
	else document.querySelector('#gun').classList = 'idle'


	if(Camera.position.y > groundPosition+0.1) maxMovementSpeed = Vector2(-15,15)
	else maxMovementSpeed = Vector2(-10,10)




	// camera tilt when strafing
	if(leftAxis > 0 && rightAxis == 0) Camera.rotation.z = Clamp(Camera.rotation.z - deltaTime/50, -4, 4)
	else if(rightAxis > 0 && leftAxis == 0) Camera.rotation.z = Clamp(Camera.rotation.z + deltaTime/50, -4, 4)
	else Camera.rotation.z= Clamp(Camera.rotation.z/1.1, -4, 4)

	// Camera.rotation.x = -90


	
}









// engine code v2
function _update(time){
	// get deltatime
	deltaTime = time - prevtime
	fps = 1000/deltaTime
	update(deltaTime)
	//	next iteration setup
	prevtime = time;
	for(let i of Actors){

		i.style.width = i.scale.x + 'px'
		i.style.height = i.scale.y + 'px'
		i.style.top = (window.innerHeight/2-i.scale.y/2) + 'px'
		i.style.left = (window.innerWidth/2-i.scale.x/2) + 'px'
		i.style.transform = `translateX(${i.position.x+Camera.position.x}px) translateY(${i.position.y+Camera.position.y}px) translateZ(${i.position.z+Camera.position.z}px) rotateX(${i.rotation.x}deg) rotateY(${i.rotation.y}deg) rotateZ(${i.rotation.z}deg)`
		i.style.background = i.texture
		i.style.backgroundSize = '100% 100%';


		let percentage =  Clamp((-i.position.z-Camera.position.z)/10,0,100)/100
		let percentage1 =  Clamp((-i.position.z-Camera.position.z+100)/10,0,100)/100
		let percentage2 =  Clamp((-i.position.z-Camera.position.z-100)/10,0,100)/100

		if(i.children[0]){
			i.children[0].style.background = `linear-gradient(rgba(0,0,0,${percentage1}), rgba(0,0,0,${percentage2}))`
		}
		else{
			i.style.filter = `brightness(${100-percentage*100}%)`
		}


		// i.style.filter = `brightness(${100-percentage*100}%)`

		// i.style.filter = 'brightness('+Clamp((175 - Clamp((-i.position.z-Camera.position.z)/2,0,100)), 0 , 100)+'%)'/
	}
	document.querySelector('#scene').style.transform = `translateZ(500px) rotateX(${Camera.rotation.x}deg) rotateZ(${Camera.rotation.z}deg)`

	window.requestAnimationFrame(_update)
}

window.requestAnimationFrame(_update)