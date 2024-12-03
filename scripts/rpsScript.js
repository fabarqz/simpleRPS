


const canvas=document.getElementById('canvas1');
const ctx=canvas.getContext('2d');
const CANVAS_WIDTH=canvas.width=800;
const CANVAS_HEIGHT=canvas.height=500;

let gameStart=0;
let gameSpeed=2;
let gameFrame=0;


const spriteWidth=200;
const spriteHeight=200;

const choiceRock=new Image();
choiceRock.src='img/rock-fist.png';
const choicePaper=new Image();
choicePaper.src='img/paper-wind.png';
const choiceScissors=new Image();
choiceScissors.src='img/scissors-fire.png';

const backgroundLayer1=new Image();
backgroundLayer1.src='img/layer1.png';
const backgroundLayer2=new Image();
backgroundLayer2.src='img/layer2.png';
const backgroundLayer3=new Image();
backgroundLayer3.src='img/layer3.png';
const backgroundLayer4=new Image();
backgroundLayer4.src='img/layer4.png';
const backgroundLayer5=new Image();
backgroundLayer5.src='img/layer5.png';
const backgroundLayer6=new Image();
backgroundLayer6.src='img/layer6.png';
const backgroundLayer7=new Image();
backgroundLayer7.src='img/layer7.png';
const backgroundLayer8=new Image();
backgroundLayer8.src='img/layer8.png';


class Layer{
  constructor(image,speedModifier){
    this.x=0;
    this.y=0;
    this.width=960;
    this.height=480;

    this.image=image;
    this.speedModifier=speedModifier;
    this.speed=gameSpeed*this.speedModifier;

  };
  update(){
    this.speed=gameSpeed*this.speedModifier;
    if(this.x<=-this.width){
      this.x=0
    }
    this.x=this.x-this.speed;

  };
  draw(){
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    ctx.drawImage(this.image,this.x+this.width,this.y,this.width,this.height);
  }
}

const layer1=new Layer(backgroundLayer2,0.2);
const layer2=new Layer(backgroundLayer3,0.4);
const layer3=new Layer(backgroundLayer4,0.6);
const layer4=new Layer(backgroundLayer5,0.8);
const layer5=new Layer(backgroundLayer6,0.2);

const gameObjects=[layer1,layer2,layer3,layer4,layer5];

function createPlayerRectangle(){
  ctx.fillStyle='gray';
  ctx.fillRect(0,300,spriteWidth,spriteHeight);
}

function createEnemyRectangle(){
  ctx.fillStyle='gray';
  ctx.fillRect(600,300,spriteHeight,spriteWidth);
}

function animate(){
 
  if(gameStart!=1){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

    ctx.drawImage(backgroundLayer1,0,0,800,600,0,0,800,500);
  
    gameObjects.forEach(object=>{
      object.update();
      object.draw();
    })
  
    ctx.drawImage(backgroundLayer7,0,0,800,600,0,0,800,500);
    ctx.drawImage(backgroundLayer8,0,0,800,600,0,0,800,500);
    //ctx.fillStyle='gray';
    //ctx.fillRect(0,300,spriteWidth,spriteHeight);
    createPlayerRectangle();
    createEnemyRectangle();
    //ctx.fillRect(600,300,spriteHeight,spriteWidth);
    gameFrame++;
    requestAnimationFrame(animate);
  }else{
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
  }
  
};
animate();

function castRock(){
  ctx.clearRect(0,300,spriteWidth,spriteHeight)
  createPlayerRectangle();
  ctx.drawImage(choiceRock,0,0,spriteHeight,spriteWidth,0,300,spriteWidth,spriteHeight);
  requestAnimationFrame(castRock);  
}

function castPaper(){
  ctx.clearRect(0,300,spriteWidth,spriteHeight)
  createPlayerRectangle();
  ctx.drawImage(choicePaper,0,0,spriteHeight,spriteWidth,0,300,spriteWidth,spriteHeight);
  requestAnimationFrame(castPaper);  
}

function castScissors(){
  ctx.clearRect(0,300,spriteWidth,spriteHeight)
  createPlayerRectangle();
  ctx.drawImage(choiceScissors,0,0,spriteHeight,spriteWidth,0,300,spriteWidth,spriteHeight);
  requestAnimationFrame(castScissors);  
}


function castEnemyRock(){
  ctx.clearRect(600,300,spriteWidth,spriteHeight)
  createEnemyRectangle();
  ctx.drawImage(choiceRock,0,0,spriteHeight,spriteWidth,600,300,spriteWidth,spriteHeight);
  requestAnimationFrame(castEnemyRock);  
}

function castEnemyPaper(){
  ctx.clearRect(600,300,spriteWidth,spriteHeight)
  createEnemyRectangle();
  ctx.drawImage(choicePaper,0,0,spriteHeight,spriteWidth,600,300,spriteWidth,spriteHeight);
  requestAnimationFrame(castEnemyPaper);  
}

function castEnemyScissors(){
  ctx.clearRect(600,300,spriteWidth,spriteHeight)
  createEnemyRectangle();
  ctx.drawImage(choiceScissors,0,0,spriteHeight,spriteWidth,600,300,spriteWidth,spriteHeight);
  requestAnimationFrame(castEnemyScissors);  
}


//Rock Paper Scissors Part


function getRandomIntInclusive(min,max){
  min=Math.ceil(min);
  max=Math.floor(max);

  return Math.floor(Math.random()*(max-min+1)+min);
}

const score={
  wins:0,
  losses:0,
  ties:0,
  reset:false
}

let scoreTemp={};

let computerMove='';
let playerMove='';
let result='';

function pickComputerMove(){
  const randomNumber=getRandomIntInclusive(0,10);

  if(randomNumber>=0 && randomNumber<4){
    computerMove='rock';
  }else if(randomNumber>=4 && randomNumber<7){
    computerMove='paper'
  }else if(randomNumber>=7 && randomNumber<=10){
    computerMove='scissors'
  }

  return computerMove;
}

function decideWinner(playerMove){
  pickComputerMove();
  

  if(playerMove==='rock'){
    if(computerMove=='rock'){
    castEnemyRock();
    result='Tis a Draw'
    }else if(computerMove=='paper'){
    castEnemyPaper();
    result='You Lose'
    }else if(computerMove=='scissors'){
    castEnemyScissors()
    result='You Win'
    }
  }else if(playerMove==='paper'){
    if(computerMove=='rock'){
    castEnemyRock()
    result='You Win'
    }else if(computerMove=='paper'){
    castEnemyPaper()
    result='Tis a Draw'
    }else if(computerMove=='scissors'){
    castEnemyScissors()
      result='You Lose'
    }
  }else if(playerMove==='scissors'){
    if(computerMove=='rock'){
    castEnemyRock()
      result='You Lose'
    }else if(computerMove=='paper'){
      castEnemyPaper()
      result='You Win'
    }else if(computerMove=='scissors'){
    castEnemyScissors()
      result='Tis a Draw'
    }
  }

  if(result==='You Win'){
    score.wins+=1;
  }else if(result==='You Lose'){
    score.losses+=1;
  }else if(result==='Tis a Draw'){
    score.ties+=1;
  }

  console.log(`You picked ${playerMove} while the computer picked ${computerMove}. ${result}.`)
  
  displayResults();
}

document.body.addEventListener('keydown',(event)=>{
  console.log(event);
});

function displayResults(){
  if(score.reset===false){
  document.getElementById("results").innerHTML=`You picked ${playerMove} while the computer picked ${computerMove}. ${result}`;
  document.getElementById("score").innerHTML=`Wins: ${score.wins}, Losses: ${score.losses}, Draws: ${score.ties}`;
  }else if(score.reset===true){
  document.getElementById("results") .innerHTML=`Scores have been reset.`;
  document.getElementById("score").innerHTML=`Wins: ${score.wins}, Losses: ${score.losses}, Draws: ${score.ties}`;
  score.reset=false;
  } 
}

/*Buttons*/

function resetGame(){
  score.wins=0;
  score.losses=0;
  score.ties=0;
  score.reset=true;
  
  playerMove='';
  computerMove='';
  result='';

  ctx.clearRect(0,300,spriteWidth,spriteHeight);
  ctx.clearRect(600,300,spriteWidth,spriteHeight);

  displayResults();

}

document.getElementById("reset").addEventListener("click",resetGame);


/*
function castRock(){
  gameStart=1;
  ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
  ctx.drawImage(backgroundLayer1,0,0,800,600,0,0,800,500);

  gameObjects.forEach(object=>{
    object.update();
    object.draw();
  })
  ctx.drawImage(backgroundLayer7,0,0,800,600,0,0,800,500);
  ctx.drawImage(backgroundLayer8,0,0,800,600,0,0,800,500);
  
  ctx.drawImage(choiceRock,0,0,spriteHeight,spriteWidth,0,320,spriteWidth,spriteHeight);
  requestAnimationFrame(castRock);
}

function castPaper(){
  gameStart=1;
  gameSpeed=gameSpeed;
  ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
  ctx.drawImage(backgroundLayer1,0,0,800,600,0,0,800,500);
  gameObjects.forEach(object=>{
    object.update();
    object.draw();
  })
  ctx.drawImage(backgroundLayer7,0,0,800,600,0,0,800,500);
  ctx.drawImage(backgroundLayer8,0,0,800,600,0,0,800,500);
  

  ctx.drawImage(choicePaper,0,0,spriteHeight,spriteWidth,0,300,spriteWidth,spriteHeight);
  requestAnimationFrame(castPaper);
}
*/
