//creating my variables
var down;
var up = [];
var myFont;
var dialogueCounter = 0;

var theCanvas;

var hammer;
var hammerDown;
var hammerDownAngle;
var startScreen;
var playScreen;
var deathScreen;
var screenChange = 0;

var moles = [];
var clownDialogue = [];
var special;

var startSound;
var startDialogue;
var endDialogue;

var hit = false;
var bullseye = 0;
var miss = 0;

var startTime;
var time;

var fade = 100;
// var gameTime;

var gameState = "start";

var goldenTonic;
var alcohol = [];
var dodge;
var special = 25;
var specialMole;
var dodge = 25;
var dodgeMole;

var ring;
var hitSound;
var drinkSound;

//preloading all of my sounds and images
function preload()
{
	up[0] = loadImage("images/blue.png");
	up[1] = loadImage("images/red.png");
	up[2] = loadImage("images/purple.png");

	ring = loadImage("images/black_ring.png");

	goldenTonic = loadImage("images/yellow.png");
	alcohol[0] = loadImage("images/bad1.png");
	alcohol[1] = loadImage("images/bad2.png");
	alcohol[2] = loadImage("images/bad3.png");
	down = loadImage("images/down1.png");

	myFont = loadFont("fonts/CarnevaleeFreakshow.ttf");

	hammer = loadImage("images/hammer.png")
	hammerDown = loadImage("images/hammerDown.png");
	startScreen = loadImage("images/startPage.jpg");
	playScreen = loadImage("images/play.jpg");
	deathScreen = loadImage("images/endScreen.png");

	startSound = loadSound("sounds/startMusic.mp3");
	startDialogue = loadSound("sounds/startDialogue.mp3");
	endDialogue = loadSound("sounds/endDialogue.mp3");

	clownDialogue[0] = loadSound("sounds/clown1.mp3");
	clownDialogue[1] = loadSound("sounds/clown2.mp3");
	clownDialogue[2] = loadSound("sounds/clown3.mp3");
	clownDialogue[3] = loadSound("sounds/clown4.mp3");
	hitSound = loadSound("sounds/ding.mp3");
	drinkSound = loadSound("sounds/drinkBad.mp3");

	//setting my canvas up so that it is centered
	theCanvas.parent("#gameContainer");

}

function setup()
{
	theCanvas = createCanvas(700,700);
	//creating my moles 
	moles[0] = new Mole(110,110);
	moles[1] = new Mole(310,110);
	moles[2] = new Mole(510,110);
	moles[3] = new Mole(110,310);
	moles[4] = new Mole(310,310);
	moles[5] = new Mole(510,310);
	moles[6] = new Mole(110,510);
	moles[7] = new Mole(310,510);
	moles[8] = new Mole(510,510);


	//hammerDownAngle = 90;

	theCanvas.parent("#gameContainer");


	//start sound/music
	startSound.loop();
	startDialogue.play();
	

}

function draw()
{

	//going through all of my game states
	if (gameState === "start")
	{
		gameStart();
	}

	if (gameState === "play")
	{
		gamePlay();
	}

	if (gameState === "dead")
	{
		gameOver();
	}

	//drawing my hammer cursor and drawing a down hammer for when the mouse is pressed
	noCursor();
	if (mouseIsPressed)
	{
		image(hammerDown,mouseX,mouseY,100,100);
	}

	else
	{
		image(hammer,mouseX,mouseY,100,100);

	}

}

//start screen
function gameStart()
{
	image(startScreen,0,0,700,700,);
	fill(0);
	rect(0,0,15,699);
	rect(685,0,15,699);
	rect(0,0,699,15);
	rect(0,685,699,699);
	noStroke();
	fill(255,90);
	rect(210,450,300,75);
	fill(0);
	textFont(myFont);
	textSize(40);
	text("CLICK TO PLAY", 250, 500);

	if (mouseIsPressed)
	{
		gameState = "play";
	}		
}

//game screen
function gamePlay()
{
	//making a sliding game screen shift
	gameStart();
	fill(0);
	rect(0,0,screenChange,699);
	screenChange += 10;	

	if (screenChange >= 699)
	{	
		//creating my special and bad moles 
		if (special  < 0) 
		{
			specialMole = int(random(0,9));
			//this is how you refer to a specific item in a class when you are
			//not in the actual class
			moles[specialMole].state = "special";
			moles[specialMole].counter = 0;
			moles[specialMole].timeToWait = random(100,400);

			special = random(100,200);
		}

		special--;

		if (dodge < 0)
		{
			dodgeMole = int(random(0,9));
			moles[dodgeMole].state = "bad";
			moles[dodgeMole].counter = 0;
			moles[dodgeMole].timeToWait = random (100,200);

			dodge = random(100,200)
		}

		dodge --;

		//drawing the play screen
		image(playScreen,0,0,700,700);
		fill(0);
		rect(0,0,15,699);
		rect(685,0,15,699);
		rect(0,0,699,15);
		rect(0,685,699,699);
		stroke(10);
		image(ring,100,100,100,100);
		image(ring,300,100,100,100);
		image(ring,500,100,100,100);
		image(ring,100,300,100,100);
		image(ring,300,300,100,100);
		image(ring,500,300,100,100);
		image(ring,100,500,100,100);
		image(ring,300,500,100,100);
		image(ring,500,500,100,100);
		
		textFont(myFont);
		textSize(40);
		text("Hit: " + bullseye, 70, 45);
		text("Miss: " + miss, 70, 80);
		// gameTime +=1;

		time = int((millis() - startTime)/1000);

		textSize(60);
		text("" + time, 630,70);
		
		for (var i = moles.length - 1; i >= 0; i--) 
		{
			moles[i].update();
			moles[i].display();		
		}
		
		
		// making it so that if time runs out, the end screen appears
		if (time === 30)
		{
			gameState = "dead";
			endDialogue.play();
		}

		
	}	
}

//creating my moles
class Mole
{
	constructor(x,y)
	{
		this.x = x;
		this.y = y;
		this.state = "down";
		this.counter = 0;
		this.timeToWait = random(200,300);
		this.up = random(up);
		this.bad = random(alcohol);
		this.easter = random(1,10);
	}

	display()
	{
			//printing my images for the different states
			if (this.state === "up")
			{
			
				image(this.up, this.x,this.y,80,80);
			}

			if (this.state === "special")
			{
				image(goldenTonic,this.x,this.y,80,80);
			}

			if (this.state === "bad")
			{
				image(this.bad,this.x,this.y,80,80);
			}
			//the mole knows if it has other states
			//counter in game play that counts down and once it does itll pick a random mole and make the state special
			if (this.state === "down")
			{
				image(down,this.x - 10,this.y - 10,100,100);
			}
	
	}

	update()
	{

		this.counter +=1;
		if(this.counter >= this.timeToWait)
		{
			if (this.state === "up" || this.state === "bad" || this.state === "special")
			{
				this.state = "down";
			}
			else
			{
				this.state = "up";
				this.up = random(up);
				this.bad = random(alcohol);
				this.easter = random(1,10);


			}

			this.counter = 0;
			this.timeToWait = random(100,200);
			
		}

		
	}

	checkHit()
	{
		//checking to see if the player has hit the mole or not
		if (dist(mouseX + 50,mouseY + 50,this.x + 50,this.y + 50) <= 50 && this.state === "up")
		{ 
				hitSound.play();
				//random(upSounds).play();
				console.log("Hit Me!!!")
				bullseye += 1;
				this.state = "down";
				this.counter = 0;
				this.timeToWait = random(100,200);
			
		}

		else if (dist(mouseX + 50,mouseY + 50,this.x + 50,this.y + 50) <= 50 && this.state === "bad")
		{
			
				//random(upSounds).play();
				drinkSound.play();
				console.log("Hit Me!!!")
				bullseye -= 5;
				this.state = "down";
				this.counter = 0;
				this.timeToWait = random(100,200);

			
		}

		else if (dist(mouseX + 50,mouseY + 50,this.x + 50,this.y + 50) <= 50 && this.state === "special")
		{
			
				//random(upSounds).play();
				console.log("Hit Me!!!")
				hitSound.play();

				bullseye += 5;
				this.state = "down";
				this.counter = 0;
				this.timeToWait = random(100,200);

			
		}

		else if (dist(mouseX + 50,mouseY + 50,this.x + 50,this.y + 50) <= 50 && this.state === "down")
		{
			//missSound.play();
			clownDialogue[3].play();
			console.log("Too Late");
			miss += 1;

		}
	}


	
}

//game over screen
function gameOver()
{
	image(deathScreen,0,0,700,700);
	startSound.stop();
	startTime = 0;

	fill(0);
	rect(0,0,15,699);
	rect(685,0,15,699);
	rect(0,0,699,15);
	rect(0,685,699,699);
	fill(255,255,255,255,60)
	stroke(10);
	textFont(myFont);
	textSize(60);
	text("GAME OVER \n", 150, 130)
	text("You got " + bullseye + " points and \n        " + miss + " misses \n" + "Click to play again.", 100, 180);
	
	
}


function mousePressed()
{
	//timer 
	if (gameState === "start") {
		startTime = millis();
	}
	if (gameState === "play")
	{
		for (var i = moles.length - 1; i >= 0; i--) 
		{
			//checking to see if the player has hit the moles or not
			moles[i].checkHit();
				
		}		

	}
	//programming the death screen
	if(gameState === "dead")
	{
		startTime = millis();

		gameState = "start";
		startSound.loop();
		bullseye = 0;
		miss = 0;

	}

	

}
