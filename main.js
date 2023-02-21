const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;

const height = canvas.height = window.innerHeight;

/*O script obtém uma referência ao elemento <canvas> e depois chama o metódo getContext() para nos dar um contexto
para começarmos a escrever

As varíaveis width e height definem a altura e largura do nosso elemento canvas através de canvas.width e canvas.height*/

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

/* Aqui usamos dois numéros como argumento e é retornado um número aleatório no intervalo entre os dois */

function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    console.log("A bola foi criada");
}

/*As coordenadas x e y definem onde a bola vai começar na tela. o velX e velY determinam a velocidade horizontal e
vertical da bola, que serão adicionadas a x e y. A color determina a cor da bola e o size é o seu tamanho. Eu escrevi o
console.log apenas para verificar se estava tudo certo com o console JS do meu navegador, mas ele não é necessário */

Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
};

/*Aqui chamamos uma função para que a bola seja desenhada na tela, o beginPath() é usado para declarar que queremos
desenhar na tela, o fillStyle é para nós definirmos a cor da bola e o metódo arc serve para traçar uma forma de arco, o
fill basicamente serve para dizer que terminamos de desenhar */

/*A partir daqui, você pode salvar e carregar o arquivo HTML no navegador, abrir o console JavaScript através do
inspecionar elemento e digitar: let testBall = new Ball(50, 100, 4, 4, 'blue', 10); e depois:
testBall.x
testBall.size
testBall.color
testBall.draw()

Se tudo der certo você deve ver uma bola azul na página!
 */

Ball.prototype.update = function () {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);

    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;

}

/* Agora temos que atualizar os dados da bola, através do Balls.prototype.update, as quatro primeiras funções verificam
se a bola atingiu a borda da tela, caso tenha, invertemos a polaridade da velocidade relevante para que a bola viaje na
direção oposta */

let balls = [];

while (balls.length < 25) {
    let size = random(10, 20);
    let ball = new Ball(

        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
        size
    );

    balls.push(ball);
}

/* Para animar a bola, nós vamos armazenar as bolas neste código */

function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
    }

    requestAnimationFrame(loop);

    /*A função loop:
    -Define a cor da tela como preto semitransparente e desenha um retângulo através do fillStyle
    -Percorre todas as bolas no array Balls e executa a função draw() e update() de cada bola e depois faz as atualizações
    necessárias para a posição e velocidade do próximo quadro
    -Executa a função requestAnimationFrame() um numéro de vezes por segundo para criar uma animação suave */
}

loop();

/*E por último, este código inicia a animação :)*/
