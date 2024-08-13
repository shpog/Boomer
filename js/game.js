// let collision = [
// 	[-1800,2000, -200, 200, 0],
// 	[-2000,-1800, -200, 200, 200]
// ]



/*

default map chunk size is 15x15

*/


let levelData = [1]




let collision = []

for (let i = 0; i < levelData.length; i++) {
	switch (levelData[i]) {

		default:
			for (let j = i * 15; j < (i + 1) * 15; j++) {
				Spawn(
					Wall(Vector3(0, 100, -200 * j), Vector2(200, 200), Vector3(90, 0, 0), e => { e.texture = 'url("./assets/bricks.png")'}),
					
					Wall(Vector3(-400, 100, -200 * j), Vector2(200, 200), Vector3(90, 0, 0), e => { e.texture = 'url("./assets/bricks.png")'}),
					Wall(Vector3(400, 100, -200 * j), Vector2(200, 200), Vector3(90, 0, 0), e => { e.texture = 'url("./assets/bricks.png")'}),
					

					Wall(Vector3(0, -300, -200 * j), Vector2(200, 200), Vector3(90, 0, 0), e => { e.texture = 'url("./assets/bricks.png")'; e.dataset.ceiling = true }),
					Wall(Vector3(200, -300, -200 * j), Vector2(200, 200), Vector3(90, 0, 0), e => { e.texture = 'url("./assets/bricks.png")'; e.dataset.ceiling = true }),
					Wall(Vector3(-200, -300, -200 * j), Vector2(200, 200), Vector3(90, 0, 0), e => { e.texture = 'url("./assets/bricks.png")'; e.dataset.ceiling = true }),
					Wall(Vector3(-400, -300, -200 * j), Vector2(200, 200), Vector3(90, 0, 0), e => { e.texture = 'url("./assets/bricks.png")'; e.dataset.ceiling = true }),
					Wall(Vector3(400, -300, -200 * j), Vector2(200, 200), Vector3(90, 0, 0), e => { e.texture = 'url("./assets/bricks.png")'; e.dataset.ceiling = true }),


					Wall(Vector3(500,-100,-200*j), Vector2(400,200), Vector3(90,90,0), e=>{e.texture = 'url("./assets/bricks — kopia.png")'; e.dataset.wall = true}),
					Wall(Vector3(-500,-100,-200*j), Vector2(400,200), Vector3(90,90,0), e=>{e.texture = 'url("./assets/bricks — kopia.png")'; e.dataset.wall = true}),

					Wall(Vector3(300,200,-200*j), Vector2(200,200), Vector3(90,90,0), e=>{e.texture = 'url("./assets/bricks.png")'; e.dataset.wall = true}),
					Wall(Vector3(-300,200,-200*j), Vector2(200,200), Vector3(90,90,0), e=>{e.texture = 'url("./assets/bricks.png")'; e.dataset.wall = true}),

					Wall(Vector3(100,200,-200*j), Vector2(200,200), Vector3(90,90,0), e=>{e.texture = 'url("./assets/bricks.png")'; e.dataset.wall = true}),
					Wall(Vector3(-100,200,-200*j), Vector2(200,200), Vector3(90,90,0), e=>{e.texture = 'url("./assets/bricks.png")'; e.dataset.wall = true}),

					Wall(Vector3(200, 150, -200 * j), Vector2(200, 200), Vector3(90, 0, 0), e => { e.texture = 'url("https://t4.ftcdn.net/jpg/04/61/44/73/360_F_461447340_Nla9iR27ZtPbPR5TVlVExoL88QqZlkvN.jpg")'; e.dataset.emission = 1}),
					Wall(Vector3(-200, 150, -200 * j), Vector2(200, 200), Vector3(90, 0, 0), e => { e.texture = 'url("https://t4.ftcdn.net/jpg/04/61/44/73/360_F_461447340_Nla9iR27ZtPbPR5TVlVExoL88QqZlkvN.jpg")'; e.dataset.emission = 1}),
				)
			}

			collision.push([200 * i * 15, 200 * (i + 1) * 15, -500, 500, 0])
	}
}

// Create Map

Spawn(
	Actor(Vector3(0,0,-2900),Vector2(200,200), e => { e.texture = 'url("./assets/bricks.png")' }),
	Actor(Vector3(200,-100,-2900),Vector2(200,400), e => { e.texture = 'url("./assets/bricks.png")' }),
	Actor(Vector3(-200,-100,-2900),Vector2(200,400), e => { e.texture = 'url("./assets/bricks.png")' }),
	Actor(Vector3(400,-100,-2900),Vector2(200,400), e => { e.texture = 'url("./assets/bricks.png")' }),
	Actor(Vector3(-400,-100,-2900),Vector2(200,400), e => { e.texture = 'url("./assets/bricks.png")' }),
	Actor(Vector3(0,0,-2000),Vector2(1200,450), e => { e.texture = 'url("./assets/fog.png")'; e.dataset.fog = true}),
	Wall(Vector3(499,-150,-2000), Vector2(75,150), Vector3(0,90,0), e=>{e.texture = 'url("https://static.vecteezy.com/system/resources/previews/024/824/975/original/gothic-stained-glass-window-church-medieval-arch-catholic-cathedral-mosaic-frame-old-architecture-design-png.png")'; e.dataset.wall = true; e.dataset.emission = 1})
)

let a = Actor(Vector3(0,0,-2000),Vector2(200,200), e => { e.texture = 'url("./assets/scribe.png")'})

Spawn(a)
a.onclick = e => {LoadLevelURL('index.html')}






function getCollision(z, collision) {
	for (let i of collision) {
		if (z >= i[0] && z <= i[1]) return [i[2] + 5, i[3] - 5, i[4]]
	}
	return [-2000, 2000, 0]
}






let forwardAxis = 0
let backAxis = 0
let rightAxis = 0
let leftAxis = 0

let jumpspeed = 0

let groundPosition = getCollision(Camera.position.z, collision)[2]
let maxJumpHeight = groundPosition + 75

window.onkeypress = e => {
	if (e.key == " " && Camera.position.y <= groundPosition + 0.1) {
		jumpspeed = 350
	}
}

window.onkeydown = e => {
	if (e.key == "w") forwardAxis = 1
	if (e.key == "s") backAxis = 1
	if (e.key == "a") leftAxis = 1
	if (e.key == "d") rightAxis = 1

}

window.onkeyup = e => {
	if (e.key == "w") forwardAxis = 0
	if (e.key == "s") backAxis = 0
	if (e.key == "a") leftAxis = 0
	if (e.key == "d") rightAxis = 0
}



let movementSpeed = Vector2(0, 0)
let maxMovementSpeed = Vector2(-10, 10)

function resize() {
	document.querySelector('#lightoverlay').style.height = (window.innerHeight + 750) + 'px'
	document.querySelector('#lightoverlay').style.width = (window.innerHeight + 750) + 'px'


	document.querySelector('#gun #right').style.height = (window.innerHeight * 0.75) + 'px'
	document.querySelector('#gun #right').style.width = (window.innerHeight * 0.75) + 'px'
	document.querySelector('#gun #right').style.right = (window.innerWidth * 0.09) + 'px'

	document.querySelector('#gun #left').style.height = (window.innerHeight * 0.75) + 'px'
	document.querySelector('#gun #left').style.width = (window.innerHeight * 0.75) + 'px'
	document.querySelector('#gun #left').style.left = (window.innerWidth * 0.09) + 'px'

}
resize()
window.onresize = resize


function update(deltaTime) {

	
	


	// movement speed
	movementSpeed.y = Clamp(movementSpeed.y + (forwardAxis - backAxis) * deltaTime / 5, maxMovementSpeed.x, maxMovementSpeed.y)
	movementSpeed.x = Clamp(movementSpeed.x + (leftAxis - rightAxis) * deltaTime / 5, maxMovementSpeed.x, maxMovementSpeed.y)

	if ((forwardAxis - backAxis) == 0) movementSpeed.y = Clamp(movementSpeed.y / 2, maxMovementSpeed.x, maxMovementSpeed.y)
	if ((leftAxis - rightAxis) == 0) movementSpeed.x = Clamp(movementSpeed.x / 2, maxMovementSpeed.x, maxMovementSpeed.y)

	// Camera.position.z = Camera.position.z + movementSpeed.y

	Camera.position.z = Clamp(Camera.position.z + movementSpeed.y, 0, (levelData.length) * 15 * 200 - 200)

	Camera.position.x = Clamp(Camera.position.x + movementSpeed.x, ...getCollision(Camera.position.z, collision))

	// groundPosition = getCollision(Camera.position.z, collision)[2]

	if (groundPosition < getCollision(Camera.position.z, collision)[2]) groundPosition = Clamp(groundPosition + deltaTime, groundPosition, getCollision(Camera.position.z, collision)[2])
	else if (groundPosition > getCollision(Camera.position.z, collision)[2]) groundPosition = Clamp(groundPosition - deltaTime, getCollision(Camera.position.z, collision)[2], groundPosition)





	maxJumpHeight = groundPosition + 75

	Camera.position.y = Clamp(Camera.position.y + jumpspeed * deltaTime / 1000, groundPosition, maxJumpHeight)

	jumpspeed = Clamp(jumpspeed - deltaTime, -1000, 1000)

	if (Math.abs(movementSpeed.x) + Math.abs(movementSpeed.y) > 0.1 && Camera.position.y < groundPosition + 0.1) document.querySelector('#gun').classList = 'run'
	else if (Camera.position.y > groundPosition + 0.1) document.querySelector('#gun').classList = 'jump'
	else document.querySelector('#gun').classList = 'idle'


	if (Camera.position.y > groundPosition + 0.1) maxMovementSpeed = Vector2(-25, 25)
	else maxMovementSpeed = Vector2(-25, 25)




	// camera tilt when strafing
	if (leftAxis > 0 && rightAxis == 0) Camera.rotation.z = Clamp(Camera.rotation.z - deltaTime / 50, -4, 4)
	else if (rightAxis > 0 && leftAxis == 0) Camera.rotation.z = Clamp(Camera.rotation.z + deltaTime / 50, -4, 4)
	else Camera.rotation.z = Clamp(Camera.rotation.z / 1.1, -4, 4)

	Camera.rotation.x = 0



}