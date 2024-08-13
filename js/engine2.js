// engine code vol2
function _update(time) {
	// get deltatime
	deltaTime = time - prevtime
	fps = 1000 / deltaTime
	update(deltaTime)
	//	next iteration setup
	prevtime = time;


	let maxLuminosity = 0
	for (let l of Lights) {
		maxLuminosity = Math.max(Clamp(Math.abs(Camera.position.z - l) / 1500, 0, 1), maxLuminosity)
	}
	document.querySelector('#lightoverlay').style.scale = 1 + (1 - maxLuminosity) * 0.5

	for (let i of Actors) {

		i.style.width = i.scale.x + 'px'
		i.style.height = i.scale.y + 'px'
		i.style.top = (window.innerHeight / 2 - i.scale.y / 2) + 'px'
		i.style.left = (window.innerWidth / 2 - i.scale.x / 2) + 'px'
		i.style.transform = `translateX(${i.position.x + Camera.position.x}px) translateY(${i.position.y + Camera.position.y}px) translateZ(${i.position.z + Camera.position.z}px) rotateX(${i.rotation.x}deg) rotateY(${i.rotation.y}deg) rotateZ(${i.rotation.z}deg)`
		i.style.background = i.texture
		i.style.backgroundSize = '100% 100%';


		let _percentage = Clamp((-i.position.z - Camera.position.z) / 10, 0, 100) / 100
		let percentage = Clamp((-i.position.z - Camera.position.z) / 10, 0, 100)
		let percentage1 = Clamp((-i.position.z - Camera.position.z + 100) / 10, 0, 100)
		let percentage2 = Clamp((-i.position.z - Camera.position.z - 100) / 10, 0, 100)

		for (let l of Lights) {
			let x = -i.position.z - l[0]


			if (Math.abs(x + 100) < 800 || Math.abs(x - 100) < 800) {
				let v = (800 - Math.abs(x)) / 9
				let v1 = (800 - Math.abs(x + 100)) / 8
				let v2 = (800 - Math.abs(x - 100)) / 8

				if (i.dataset.ceiling) {
					v1 = v1 / 3
					v2 = v2 / 3
				}

				if (i.dataset.wall) {
					i.dataset.v1 = v1
					i.dataset.v2 = v2
				}
				percentage = Clamp(percentage - v, 0, 100)
				percentage1 = Clamp((percentage1 - v1), 0, 100)
				percentage2 = Clamp((percentage2 - v2), 0, 100)



			}
		}

		percentage = percentage / 100
		percentage1 = percentage1 / 100
		percentage2 = percentage2 / 100


		let emission = (i.dataset.emission) ? (1 - i.dataset.emission) : 1
		let _emission = (i.dataset.emission) ? (i.dataset.emission) : 0

		if (i.children[0].classList == 'gradient') {

			let bg = ''
			if (i.dataset.wall) {
				bg = `linear-gradient(90deg, rgba(0,0,0,${_percentage * 0.6 * emission}), rgba(0,0,0,0)),`
			}

			i.children[0].style.background = bg + `linear-gradient(rgba(0,0,0,${percentage1 * emission}), rgba(0,0,0,${percentage2 * emission}))`

			if(i.dataset.emission){

				i.style.filter = `brightness(${100 + _emission*100}%)`
			}
			else{
				i.style.filter = 'brightness(50%)'}

			

			


		}
		else {
			if(i.dataset.emission){
				i.style.filter = `brightness(${100 - percentage * 100 * emission + _emission*100}%)`
			}
			else{
				i.style.filter = ` brightness(${50 - percentage * 50}%)`
			}

			if (i.dataset.fog) i.style.opacity = Clamp((-i.position.z - Camera.position.z) / 10 - 25, 0, 100) / 100

		}
	}
	document.querySelector('#scene').style.transform = `translateZ(500px) rotateX(${Camera.rotation.x}deg) rotateY(${Camera.rotation.y}deg) rotateZ(${Camera.rotation.z}deg)`

	window.requestAnimationFrame(_update)
}

window.requestAnimationFrame(_update)