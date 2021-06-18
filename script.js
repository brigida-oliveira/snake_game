let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let score = 0;
let estadoAtual;
let estados = {
    jogar: 0,
    jogando: 1,
    perdeu: 2
};
let snake = [];
snake[0] = {
    x: 8*box,
    y: 8*box
};
let direction = "right";
let comida = {
    x: Math.floor(Math.random()*15 + 1)*box,
    y: Math.floor(Math.random()*15 + 1)*box
}

function criarScore () {
    context.fillStyle = "#2B4162";
    context.font = "15px 'Press Start 2P' ";
    context.fillText("Score: " + score, canvas.width-140, 20); 
   }

function criarBG(){
    context.fillStyle = "#D0CEBA";
    context.fillRect(0,0,16*box,16*box);
}

function criarCobrinha(){
    for(i=0; i<snake.length; i++){
        context.fillStyle = "#417B5A";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function criarComida() {
    context.fillStyle = "#880D1E";
    context.fillRect(comida.x, comida.y, box, box);
}

document.addEventListener("keydown", update);

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo(){

    // if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    // if(snake[0].x < 0 && direction == "left") snake[0].x = 16*box;
    // if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    // if(snake[0].y < 0 && direction == "up") snake[0].y = 16*box;

    if(snake[0].x > 15*box && direction == "right" || snake[0].x < 0 && direction == "left" || snake[0].y > 15*box && direction == "down" || snake[0].y < 0 && direction == "up") {
        clearInterval(jogo);
        alert('Fim de jogo! \n Tente outra vez.');
        location.reload();
    } 

    for(i =1; i <snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Fim de jogo! \n Tente outra vez.');
            location.reload();
        } 
    }

    criarBG();
    criarCobrinha();
    criarComida();
    criarScore();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != comida.x || snakeY != comida.y){
        snake.pop();
    }else{
        comida.x = Math.floor(Math.random()*15 + 1)*box;
        comida.y = Math.floor(Math.random()*15 + 1)*box;
        score++;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);
