// Array de tipos de doces
var candies = ["cat1", "cat2", "cat3", "cat4", "cat5", "cat6"];
// Tabuleiro do jogo
var board = [];
// Número de linhas e colunas no tabuleiro
var rows = 9;
var columns = 9;
// Pontuação do jogador
var score = 0;
// Duração total do jogo em segundos
var gameDuration = 60;
// Identificador para o intervalo de tempo do jogo
var timerInterval;

// Variáveis para as peças durante a jogabilidade
var currTile;
var otherTile;

// Elementos HTML
var playButton = document.getElementById("playButton");
var scoreDisplay = document.getElementById("scoreDisplay");
var timeDisplay = document.getElementById("gameDuration");
var boardDiv = document.getElementById("board");

// Função para escolher aleatoriamente um tipo de doce
function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)]; // Retorna um tipo de doce aleatório
}

// Função para iniciar o jogo
function startGame() {
    playButton.style.display = "none"; // Esconde o botão "Jogar"
    scoreDisplay.style.display = "block"; // Mostra a pontuação
    boardDiv.style.display = "block"; // Mostra o tabuleiro

    clearBoard(); // Limpa o tabuleiro

    // Gera e exibe as peças no tabuleiro
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomCandy() + ".png";

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

    updateScoreAndTimeDisplay(); // Atualiza a exibição de pontuação e tempo
    timerInterval = setInterval(function () {
        gameDuration--;
        updateScoreAndTimeDisplay();
        if (gameDuration <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);

    console.log(board);
}

// Função para atualizar a exibição de pontuação e tempo
function updateScoreAndTimeDisplay() {
    scoreDisplay.innerHTML = "Tempo: " + gameDuration + "    Score: " + score;
}

// Função chamada quando o tempo do jogo se esgota
function endGame() {
    alert("Tempo esgotado! Jogo encerrado. Pontuação final: " + score);
}

// Função para limpar o tabuleiro
function clearBoard() {
    var boardContainer = document.getElementById("board");
    while (boardContainer.firstChild) {
        boardContainer.removeChild(boardContainer.firstChild);
    }
    board = [];
}

// Função chamada quando a página é carregada
window.onload = function () {
    playButton.addEventListener("click", function () {
        playButton.style.display = "none";
        startGame();
    });

    // Executa as funções a cada 1/10 de segundo
    window.setInterval(function () {
        crushCandy();
        slideCandy();
        generateCandy();
    }, 100);
}

// Função chamada quando o arrasto de uma peça começa
function dragStart() {
    currTile = this; // A peça atual é a peça clicada para arrastar
}

// Função chamada quando uma peça está sendo arrastada sobre outra
function dragOver(e) {
    e.preventDefault();
}

// Função chamada quando uma peça é arrastada para dentro de outra
function dragEnter(e) {
    e.preventDefault();
}

// Função chamada quando uma peça sai de outra
function dragLeave() {
    // Não faz nada neste exemplo
}

// Função chamada quando uma peça é solta sobre outra
function dragDrop() {
    otherTile = this; // A peça de destino é a peça sobre a qual a peça atual foi solta
}

// Função chamada quando o arrasto de uma peça termina
function dragEnd() {
    // Se uma das peças envolvidas contém "blank", não faz nada
    if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return;
    }

    let currCoords = currTile.id.split("-"); // Coordenadas da peça atual
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    // Verifica se o movimento é adjacente
    let moveLeft = c2 == c - 1 && r == r2;
    let moveRight = c2 == c + 1 && r == r2;
    let moveUp = r2 == r - 1 && c == c2;
    let moveDown = r2 == r + 1 && c == c2;
    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    // Se o movimento for adjacente, troca as peças
    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        // Verifica se a troca é válida
        let validMove = checkValid();
        if (!validMove) {
            // Se não for válida, desfaz a troca
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;
        }
    }
}

// Função para esmagar grupos de três peças
function crushCandy() {
    crushThree();
    document.getElementById("score").innerText = score;
}


// Função para esmagar grupos de três peças em linhas e colunas
function crushThree() {
    // Verifica as linhas
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let cat1 = board[r][c];
            let cat2 = board[r][c + 1];
            let cat3 = board[r][c + 2];
            if (cat1.src == cat2.src && cat2.src == cat3.src && !cat1.src.includes("blank")) {
                // Troca as peças por novas imagens e aumenta a pontuação
                cat1.src = "./images/" + randomCandy() + ".png";
                cat2.src = "./images/" + randomCandy() + ".png";
                cat3.src = "./images/" + randomCandy() + ".png";
                score += 30;
            }
        }
    }

    // Verifica as colunas
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let cat1 = board[r][c];
            let cat2 = board[r + 1][c];
            let cat3 = board[r + 2][c];
            if (cat1.src == cat2.src && cat2.src == cat3.src && !cat1.src.includes("blank")) {
                // Troca as peças por novas imagens e aumenta a pontuação
                cat1.src = "./images/" + randomCandy() + ".png";
                cat2.src = "./images/" + randomCandy() + ".png";
                cat3.src = "./images/" + randomCandy() + ".png";
                score += 30;
            }
        }
    }
}

// Função para verificar se existem movimentos válidos no tabuleiro
function checkValid() {
    // Verifica as linhas
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let cat1 = board[r][c];
            let cat2 = board[r][c + 1];
            let cat3 = board[r][c + 2];
            if (cat1.src == cat2.src && cat2.src == cat3.src && !cat1.src.includes("blank")) {
                // Se encontrar um grupo de três peças, retorna verdadeiro (movimento válido)
                return true;
            }
        }
    }

    // Verifica as colunas
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let cat1 = board[r][c];
            let cat2 = board[r + 1][c];
            let cat3 = board[r + 2][c];
            if (cat1.src == cat2.src && cat2.src == cat3.src && !cat1.src.includes("blank")) {
                // Se encontrar um grupo de três peças, retorna verdadeiro (movimento válido)
                return true;
            }
        }
    }

    // Se não encontrar movimentos válidos, retorna falso
    return false;
}

// Função para deslizar as peças no tabuleiro
function slideCandy() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = rows - 1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                // Desliza as peças para baixo
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }

        // Preenche as células vazias com peças novas na parte superior
        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "./images/" + randomCandy() + ".png";
        }
    }
}

// Função para gerar novas peças na parte superior do tabuleiro
function generateCandy() {
    for (let c = 0; c < columns; c++) {
        if (board[0][c].src.includes("blank")) {
            // Se a célula superior estiver vazia, gera uma nova peça
            board[0][c].src = "./images/" + randomCandy() + ".png";
        }
    }
}


function endGame() {
    clearInterval(timerInterval);
    showGameOverText();
}

function showGameOverText() {
    scoreDisplay.style.display = "none";
    boardDiv.style.display = "none";
    let gameOverContainer = document.getElementById('gameOverContainer');
    let gameOverText = document.getElementById('gameOverText');
    gameOverText.innerText = "O tempo acabou! Seu score foi de " + score;
    gameOverContainer.style.display = "block";
}

function playAgain() {
    location.reload();
}
