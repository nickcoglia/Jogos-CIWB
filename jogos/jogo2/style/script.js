// Objeto que armazena elementos do DOM com classes específicas para manipulação mais fácil
const selectors = {
    boardContainer: document.querySelector(".board-container"),
    board: document.querySelector(".board"),
    moves: document.querySelector(".moves"),
    timer: document.querySelector(".timer"),
    start: document.querySelector("#playButton"),
    win: document.querySelector(".win-message"),
    initialInterface: document.querySelector(".initial-interface"),
    gameInterface: document.querySelector(".game-interface"),
    playAgainButton: document.querySelector("#playAgainButton"),
};

// Objeto para armazenar informações do estado do jogo
const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null,
    timeLimit: 60,
};

// Mostra a mensagem quando o jogador ganha, adiciona um botão para jogar novamente e recarrega a página ao clicar
const showWinMessage = () => {
    console.log("ganhou no showWinMessage");
    selectors.boardContainer.classList.add("flipped");

    selectors.win.innerHTML = "";

    const winMessage = document.createElement("div");
    winMessage.textContent = "Você ganhou!";
    winMessage.classList.add("win-text");

    const playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Jogar Novamente";
    playAgainButton.classList.add("botao2");
    playAgainButton.addEventListener("click", () => {
        location.reload(); // Recarrega a página quando o botão é clicado
    });


    selectors.win.style.display = "block";
    selectors.boardContainer.appendChild(winMessage);
    selectors.boardContainer.appendChild(playAgainButton);
};

const checkWinCondition = () => {
    console.log("chamou checkWinCondition");
    const unmatchedCards = document.querySelectorAll(".card:not(.matched)");

    if (unmatchedCards.length === 0 && state.flippedCards === 0) {
        console.log("chamou endGame no checkWinCondition");
        endGame(true); // Chama a função endGame para indicar que o jogador ganhou
        clearInterval(state.loop); // Para o loop do tempo
        showWinMessage(); // Mostra a mensagem de vitória apenas quando o jogo é ganho
    }
};

// Mostra a mensagem de fim de jogo quando o tempo acaba, exibindo o número de movimentos e o tempo decorrido
const showGameOverText = () => {
    selectors.boardContainer.classList.add("flipped"); // Adiciona a classe para "virar" o tabuleiro

    // Cria a caixa de texto com o score
    const gameOverContainer = document.createElement("div");
    gameOverContainer.setAttribute("class", "game-over-container");

    const gameOverText = document.createElement("div");
    gameOverText.textContent =
        "O tempo acabou! Seu score foi de " +
        state.totalFlips +
        " moves em " +
        state.totalTime +
        " segundos.";

    const playAgainButton = document.createElement("button");
    playAgainButton.setAttribute("class", "botao2");
    playAgainButton.textContent = "Jogar Novamente";
    playAgainButton.addEventListener("click", () => {
        location.reload();
    });
    gameOverContainer.appendChild(gameOverText);
    gameOverContainer.appendChild(playAgainButton);

    selectors.boardContainer.appendChild(gameOverContainer);
};

// Embaralha as cartas
const shuffle = (array) => {
    const clonedArray = [...array];

    for (let index = clonedArray.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        const original = clonedArray[index];

        clonedArray[index] = clonedArray[randomIndex];
        clonedArray[randomIndex] = original;
    }

    return clonedArray;
};

// Seleciona aleatoriamente um número específico de itens de um array
const pickRandom = (array, items) => {
    const clonedArray = [...array];
    const randomPicks = [];

    for (let index = 0; index < items; index++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length);

        randomPicks.push(clonedArray[randomIndex]);
        clonedArray.splice(randomIndex, 1);
    }

    return randomPicks;
};

// Gera o tabuleiro do jogo com cartas contendo emojis, distribuindo-os aleatoriamente no tabuleiro
const generateGame = () => {
    const dimensions = selectors.board.getAttribute("data-dimension");

    if (dimensions % 2 !== 0) {
        throw new Error("The dimension of the board must be an even number.");
    }

    const emojis = ["🐱", "🐈", "😹", "😻", "🙀", "😿", "😽", "😾", "😸", "🐾"];
    const picks = pickRandom(emojis, (dimensions * dimensions) / 2);
    const items = shuffle([...picks, ...picks]);
    const cards = `
          <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
              ${items
            .map(
                (item) => `
                  <div class="card">
                      <div class="card-front"></div>
                      <div class="card-back">${item}</div>
                  </div>
              `
            )
            .join("")}
         </div>
      `;

    const parser = new DOMParser().parseFromString(cards, "text/html");

    selectors.board.replaceWith(parser.querySelector(".board"));
};

// Inicia o jogo, atualizando o estado, o tempo decorrido e os movimentos
const startGame = () => {
    state.gameStarted = true;

    state.loop = setInterval(() => {
        state.totalTime++;

        if (state.totalTime >= state.timeLimit) {
            endGame(false); // Indica que o jogador perdeu
        }

        selectors.moves.innerText = `${state.totalFlips} moves`;
        selectors.timer.innerText = `time: ${state.totalTime} sec`;
    }, 1000);
};

selectors.start.addEventListener("click", () => {
    generateGame();
    selectors.start.style.display = "none";
    selectors.gameInterface.style.display = "block";

    setTimeout(() => {
    }, state.timeLimit * 1000);
});

// Finaliza o jogo, exibindo mensagens de vitória ou derrota com base no parâmetro isWinner
const endGame = (isWinner) => {
    console.log("acabou, win: " + isWinner);
    clearInterval(state.loop);

    if (isWinner) {
        selectors.boardContainer.classList.add("flipped");
        selectors.win.style.display = "block";
        showWinMessage();
    } else {
        showGameOverText();
        selectors.boardContainer.classList.add("flipped");
    }
};

const playAgainButton = document.getElementById("playAgainButton");

// Desvira todas as cartas que não foram combinadas
const flipBackCards = () => {
    document.querySelectorAll(".card:not(.matched)").forEach((card) => {
        card.classList.remove("flipped");
    });

    state.flippedCards = 0;
};

// Lógica para virar uma carta, verificar se há uma combinação, contar os movimentos e verificar as condições de vitória
const flipCard = (card) => {
    state.flippedCards++;
    state.totalFlips++;

    if (!state.gameStarted) {
        console.log("chamou 174");
        startGame();
    }

    if (state.flippedCards <= 2) {
        card.classList.add("flipped");
    }

    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll(".flipped:not(.matched)");

        if (flippedCards[0].innerText === flippedCards[1].innerText) {
            flippedCards[0].classList.add("matched");
            flippedCards[1].classList.add("matched");
        }

        setTimeout(() => {
            flipBackCards();
        }, 1000);
    }
    checkWinCondition();

    // Se não houver mais cartas para virar, a pessoa ganha o jogo
    if (!document.querySelectorAll(".card:not(.flipped)").length) {
        endGame(true);
    }
};

// Anexa os ouvintes de eventos para interagir com o jogo
const attachEventListeners = () => {
    document.addEventListener("click", (event) => {
        const eventTarget = event.target;
        const eventParent = eventTarget.parentElement;

        if (
            eventTarget.className.includes("card") &&
            !eventParent.className.includes("flipped")
        ) {
            flipCard(eventParent);
        } else if (
            eventTarget.nodeName === "BUTTON" &&
            eventTarget.id === "playButton"
        ) {
            startGame();
        }
    });
};

attachEventListeners();
