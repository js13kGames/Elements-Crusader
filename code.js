
	// TO DO:

	// strzelanie u kosmitów
	// rysowanie bossa
	// koniec po zabiciu bosa wyswietlanie score i restart

	// efekty graficzne
	// napisać muzykę
	// obsługa telefonów
	// best score
	// im dłużej tym trudniej


// Start game
document.getElementById('p').addEventListener("click", start);
// Press button
window.addEventListener('keydown',(function(i){if(i.keyCode==37)go='l';if(i.keyCode==39)go='r';i.preventDefault();}));
// Release button
window.addEventListener('keyup',(function(i){if(i.keyCode==37||i.keyCode==39)go='';if(i.keyCode==32){entities[entities.length]={type:'bullet1',x:entities[0].x,y:340,color:entities[0].color};playSound([0,,0.241,0.032,0.1773,0.7634,0.0847,-0.3813,,,,,,0.2293,0.0405,,0.0862,-0.0484,1,,,0.2982,,0.5]);}}));

var score, go, entities, end=1;
var colors = ['#080','#00c','#333','#800'];
var canvas = document.getElementById('p');
var context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;
context.webkitImageSmoothingEnabled = false;
context.mozImageSmoothingEnabled = false;
context.fillStyle = '#fff';
context.strokeStyle = '#fff';
context.textAlign = 'center';
context.font = '30px Arial';

context.fillText("Elements .-. Crusader", 320, 140);
context.fillText("S74r7!", 320, 170);
context.font = '20px Arial';
context.fillText("use arrows and spacebar", 320, 210);
context.font = '30px Arial';

function start(){
	if(end==1){
		score = 0;
		end = 0;
		go = '';
		entities = [{type:'player',x:320,y:340,color:'#fff'}];
		window.requestAnimationFrame(tick);
	}
}

function ending(win){
	end = 1;
	context.clearRect(0, 0, canvas.width, canvas.height);
	if(win == '1') context.fillText("You win!", 320, 140);
	else context.fillText("You lose!", 320, 140);
	context.fillText("Score: "+score, 320, 170);
	context.fillText("Click to reS74r7!", 320, 200);
}

function tick(){
	if(end==0) {
		if(go == 'l' && entities[0].x>60) entities[0].x-=3;
		else if(go == 'r' && entities[0].x<580) entities[0].x+=3;
		// clean up canvas
		context.clearRect(0, 0, canvas.width, canvas.height);
		// drawing background
		context.beginPath();
		context.moveTo(0, 360);
		context.lineTo(140, 0);
		context.moveTo(640, 360);
		context.lineTo(500, 0);
		context.fill();
		context.stroke();
		context.closePath();
		context.fillText(score, 320, 30);
		// spawn
		if(Math.floor(Math.random()*500)>498) entities[entities.length]={type:'bonus',x:Math.random()*1000%340+150,y:1,color:colors[Math.floor(Math.random()*4)]};
		if(Math.floor(Math.random()*500)>495) entities[entities.length]={type:'enemy'+Math.floor(Math.random()*3),x:Math.random()*1000%300+180,y:1};
		if(score==500) boss();
		// colisions
		var i = entities.length-1, j;
		do {
			j = 0;
			while (j < i) {
				if(!collide(entities[j],entities[i])) collide(entities[i],entities[j]);
				j++;
			}
		} while (i--);
		// draw
		i = -1;
		while(entities[++i]) draw(entities[i]);
		// animate
		window.requestAnimationFrame(tick);
	} else if(end==1) ending(0);
	else ending(1);
}

function collide(first,second){
	// player and enemy
	if(first.type=='player' && (second.type=='enemy0' || second.type=='enemy1' || second.type=='enemy2') && second.y>320 && second.x+40>first.x && second.x-40<first.x){
		end = 1;
		playSound([3,0.12,0.69,0.6924,0.24,0.1823,,0.2196,,,,,,,,,,,1,,,,,0.5]);
		return 1;
	} else 
	// player and bullet2
	if(first.type=='player' && second.type=='bullet2' && second.y>340 && second.x+40>first.x && second.x-40<first.x){
		end = 1;
		playSound([3,0.12,0.69,0.6924,0.24,0.1823,,0.2196,,,,,,,,,,,1,,,,,0.5]);
		return 1;
	} else
	// player and bonus
	if(first.type=='player' && second.type=='bonus' && second.y>340 && second.x+40>first.x && second.x-40<first.x){
		first.color = second.color;
		second.y=0;
		score++;
		playSound([0,,0.0791,0.479,0.4523,0.8186,,,,,,0.3,0.689,,,,,,1,,,,,0.5]);
		return 1;
	} else
	// enemy and bullet1
	if(first.type=='bullet1' && (second.type=='enemy0' || second.type=='enemy1' || second.type=='enemy2') && second.x+20>first.x && second.x-20<first.x && second.y+20>first.y && second.y-20<first.y){
		second.y=0;
		first.y=0;
		score++;
		playSound([3,0.12,0.69,0.6924,0.24,0.1823,,0.2196,,,,,,,,,,,1,,,,,0.5]);
		return 1;
	}
	return 0;
}

function draw(object){
	if(object.y>0 && object.y<350){
		if(object.type=='player'){
			context.fillStyle = object.color;
			context.strokeStyle = object.color;
			context.beginPath();
			context.arc(object.x-30, object.y, 10, 0, Math.PI * 2);
			context.arc(object.x+30, object.y, 10, 0, Math.PI * 2);
			context.moveTo(object.x-30, object.y+10);
			context.lineTo(object.x+30, object.y+10);
			context.stroke();
			context.fill();
			context.closePath();
			context.fillStyle = '#fff';
			context.strokeStyle = '#fff';
		}
		if(object.type=='bullet1'){
			context.fillStyle = object.color;
			context.beginPath();
			context.arc(object.x, object.y, 3+(object.y/100), 0, Math.PI * 2);
			context.arc(object.x, object.y+2, 3+(object.y/100), 0, Math.PI * 2);
			context.fill();
			context.closePath();
			context.fillStyle = '#fff';
			object.y-=5;
			object.x-=(object.x-320)/100;
		}
		if(object.type=='bullet2'){
			context.beginPath();
			context.arc(object.x, object.y, 5+(object.y/100), 0, Math.PI * 2);
			context.fill();
			context.closePath();
			object.y+=5;
			object.x+=(object.x-320)/100;
		}
		if(object.type=='enemy0'){
			context.beginPath();
			context.moveTo(object.x-20, object.y-20);
			context.arc(object.x, object.y, 5, 1, 2);
			context.moveTo(object.x+20, object.y+20);
			context.arc(object.x, object.y, 5, 1, 2, 1);
			context.fill();
			context.closePath();
			object.y++;
			object.x+=(object.x-320)/500;
		}
		if(object.type=='enemy1'){
			context.beginPath();
			context.moveTo(object.x+20, object.y-20);
			context.arc(object.x, object.y, 5, 1, 2);
			context.moveTo(object.x-20, object.y+20);
			context.arc(object.x, object.y, 5, 1, 2, 1);
			context.fill();
			context.closePath();
			object.y++;
			object.x+=(object.x-320)/500;
		}
		if(object.type=='enemy2'){
			context.beginPath();
			context.moveTo(object.x-30-(object.y/100), object.y);
			context.bezierCurveTo(object.x, object.y+20, object.x, object.y+20, object.x+30-(object.y/100), object.y);
			context.stroke();
			context.closePath();
			object.y+=2;
			object.x+=(object.x-320)/250;
		}
		if(object.type=='bonus'){
			context.fillStyle = object.color;
			context.beginPath();
			context.arc(object.x, object.y, 5+(object.y/100), 0, Math.PI * 2);
			context.fill();
			context.closePath();
			context.fillStyle = '#fff';
			object.y+=2;
			object.x+=(object.x-320)/250;
		}
	// Deleting of old entities
	} else entities.splice(entities.indexOf(object), 1);
}

function boss(){

}

var url = window.URL || window.webkitURL;

function playSound(params) {
	var soundURL = jsfxr(params);
	var player = new Audio();
	player.addEventListener('error', function(e) {}, false);
	player.src = soundURL;
	player.play();
	player.addEventListener('ended', function(e) {
		url.revokeObjectURL(soundURL);
	}, false);
}