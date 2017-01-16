(function() {
	
	function getRandom(min, max) {
	return Math.floor(Math.random()*(max-min+1)+min);
	}

	function Car(x, y, color) {
		this.x = x;
		this.y = y;
		this.position = 0;
		this.element;
		this.init = function() {
			this.element = document.createElement('div');
			this.element.setAttribute('class', 'car');
			this.element.style.background=color;
			this.element.style.top = this.y + 'px';
			this.element.style.left = this.x + 'px';
			document.getElementById('border').appendChild(this.element);
		}

		this.redraw = function() {
			this.element.style.top = this.y + 'px';
			this.element.style.left = this.x + 'px';
		}
	}



	function carAnimation(){
		this.opp = new Car(0,getRandom(-300, -200), 'green');
		this.opp.init();
		this.opp1 = new Car(105, getRandom(50,60), 'red');
		this.opp1.init();
		this.opp2 = new Car(210, getRandom(-50, 0), 'yellow');
		this.opp2.init();
		this.oppCars = [this.opp, this.opp1, this.opp2];
		this.score = 0;
		this.SPEED = 15;
		this.GAME_FLAG = 1;
		var car = new Car(105, 300, 'white');
		car.init();
		this.isCollision = 0;
		that = this;
		// for (var i=0; i < 3; i++){
		// 	if (i == 0){
		// 		this.ranX = 0;
		// 	}
		// 	if (i == 1){
		// 		this.ranX = 105;
		// 	}
		// 	if (i == 3){
		// 		this.ranX = 205;
		// 	}

		// 	this.getRanY = getRandom(-3, 0);
		// 	this.ranY = 200 * this.getRanY;
		// 	var oppCar = new Car(this.ranX, this.ranY);
		// 	oppCar.init();
		// 	this.oppCars.push(oppCar);
		// }

		this.checkCollision = function(car){
			var opp;
			var collision = 0;
			for (var i = 0; i < 3; i++){
				opp = that.oppCars[i]; 
				if (car.x < opp.x + 90 && car.x + 90 > opp.x && car.y < opp.y + 100 && 100 + car.y > opp.y){
					collision = 1;
					break;
				}
			}
			return collision;
		}

		this.myKeyPress = function(e){
			var keynum;

			if(window.event) { // IE                    
				keynum = e.keyCode;
			} else if(e.which){ // Netscape/Firefox/Opera                   
				keynum = e.which;
			}

			var pressedKey = String.fromCharCode(keynum);
			// alert(String.fromCharCode(keynum));
			if (e.keyCode == 37){
				if (car.position == 0){
					car.position = -1;
					car.x = 0;
				} else if (car.position == 1){
					car.position = 0;
					car.x = 105;
				}	
			}
			if (e.keyCode == 39){
				if (car.position == 0){
					car.position = 1;
					car.x = 210;
				} else if (car.position == -1){
					car.position = 0;
					car.x = 105;
				}
			}

			if (e.keyCode == 27){
				that.score = 0;
				for (var i = 0; i < 3; i++){
					that.oppCars[i].y = -200;
				}
				car.x =105;
			}


			car.redraw();
		}

		this.moveCar = function (){
			opp.y += 3;
			opp.redraw();

			opp1.y += 3;
			opp1.redraw();

			opp2.y += 3;
			opp2.redraw();

			if (opp.y > 410){
				opp.y = getRandom(-100, -50);
			}	

			if (opp1.y > 410){
				opp1.y = opp.y  + getRandom(-700, -690);
			}

			if (opp2.y > 410){
				opp2.y =  getRandom(-800, -790);
			}		

			if (Math.abs(opp.y - opp1.y) < 120){
				opp.y = opp1.y - 250;
			}

			if (Math.abs(opp1.y - opp2.y) < 120){
				opp2.y = opp1.y - 250;
			}

			if (that.checkCollision(car) == 1){
				that.GAME_FLAG = 0;
				alert("GAME OVER!!! YOUR SCORE: " + Math.floor(this.score));
			}
			// for (var i = 0; i < 3; i++){
			// 	carI = that.oppCars[i];
			// 	carI.y += 5;
			// 	carI.redraw();
			// 	if (carI.y > 450){
			// 		carI.y = getRandom(-400, -100);
			// 	}
			// 	console.log("x: " + carI.x + " y: " + carI.y);
			// }
			document.addEventListener("keypress", myKeyPress, false);
			this.score += 0.01;

			document.getElementById('score').innerHTML = 'Your Score: ' + Math.floor(this.score);
			if (Math.floor(this.score) > 2){
				this.SPEED -= 1;
			}
		}
		setInterval(this.moveCar, this.SPEED);
		// setTimeout(this.moveCar, 50);
		
	}
	
	carAnimation();
	
})();
