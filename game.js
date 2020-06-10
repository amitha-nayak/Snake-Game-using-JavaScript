var gameBoard, score, ctx, snake, fruit, score_num, fruit_img;

function Snake()
{
	this.snakeX=0;
	this.snakeY=0;
	this.innercolor="red";
	this.strokecolor="white";
	this.strokewidth=2;
	this.size=18;
	this.length=1;
	this.direction='Right';
	this.speed=200;
	this.snake_can_move_through_walls= true;

// draws one block of the snake-body on the canvas, everytime it is called
	this.draw=function()
	{
		ctx.fillStyle=this.innercolor;
		ctx.fillRect(this.snakeX,this.snakeY,this.size,this.size);
		ctx.strokeStyle=this.strokecolor;
		ctx.lineWidth=this.strokewidth;
		ctx.strokeRect(this.snakeX,this.snakeY,this.size,this.size);
	};

// updates the position of the snake when the user hasn't given a command
	this.update_move=function()
	{
		switch(this.direction)
		{
			case 'Left':
			this.snakeX-=(this.size+this.strokewidth);
			break;
			case 'Up':
			this.snakeY-=(this.size+this.strokewidth);
			break;
			case 'Right':
			this.snakeX+=(this.size+this.strokewidth);
			break;
			case 'Down':
			this.snakeY+=(this.size+this.strokewidth);
			break;
		}
		if(this.snake_can_move_through_walls)
		{
			if(this.snakeX + this.size + this.strokewidth>gameBoard.width)
				this.snakeX=0;
			if(this.snakeX <0)
				this.snakeX=gameBoard.width-this.size-this.strokewidth;
			if(this.snakeY + this.size + this.strokewidth>gameBoard.height)
				this.snakeY=0;
			if(this.snakeY<0)
				this.snakeY=gameBoard.height-this.size-this.strokewidth;
		}
		else
		{
			console.log('End Game');
		}
	};

// update position of the snake when the user has given a command
	this.user_move=function(e)
	{
		let key=e.key.replace('Arrow','');
		switch (key)
		{
			case 'Left':
			this.direction=key;
			break;
			case 'Up':
			this.direction=key;
			break;
			case 'Right':
			this.direction=key;
			break;
			case 'Down':
			this.direction=key;
			break;
			default:
			console.log('GamePaused');
		}
	};
}

function Fruit()
{
	this.size=20;
	this.fruitX;
	this.fruitY;

// randomly picks a location for the fruit to appear at
	this.picklocation=function()
	{
		this.fruitX=Math.floor(Math.random()*Math.floor((gameBoard.width-(snake.size+snake.strokewidth))/(snake.size+snake.strokewidth+1)))*(snake.size+snake.strokewidth);
		this.fruitY=Math.floor(Math.random()*Math.floor((gameBoard.height-(snake.size+snake.strokewidth))/(snake.size+snake.strokewidth+1)))*(snake.size+snake.strokewidth);
	};

// draws the fruit on canvas, as per the location given by picklocation()
	this.appear=function()
	{
		ctx.drawImage(fruit_img,this.fruitX,this.fruitY);
	};

// returns true if the snake eats the fruit
	this.eaten=function()
	{
		console.log(snake.snakeX, snake.snakeY, this.fruitX, this.fruitY);
		if(snake.snakeX==this.fruitX && snake.snakeY==this.fruitY)
		{
			return true;
		}
		else
			return false;
	};
}


function init()
{
	gameBoard=document.querySelector('#gameBoard');
	ctx=gameBoard.getContext('2d');
	score_num=0;
	score=document.getElementById('score');
	snake=new Snake();
	fruit=new Fruit();
	fruit_img=new Image();
	fruit_img.src="apple.png";
	score.innerHTML='SCORE	&emsp;'+score_num;

	fruit.picklocation();

	window.setInterval(function(){
		ctx.clearRect(0,0,gameBoard.width,gameBoard.height);
		snake.update_move();
		fruit.appear();
		if(fruit.eaten()==true)
		{
			score_num++;
			score.innerHTML='SCORE &emsp;'+score_num;
			fruit.picklocation();
		}
		snake.draw();
	},snake.speed);
	window.addEventListener('keydown',function(e){
		snake.user_move(e);
	});
}
