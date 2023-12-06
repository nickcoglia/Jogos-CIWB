// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener('DOMContentLoaded', () => {
    // Elementos e variáveis do jogo
    const gameContainer = document.querySelector('.container-game');
    const allMoleItems = document.querySelectorAll('.item');
    let startGame, startTime, countDown = 20, score = 0;

    // Elementos do jogo para exibir tempo, pontuação e botão de play
    const timeCount = document.getElementById('time-count');
    const scoreCount = document.getElementById('score-count');
    const playButton = document.getElementById('playButton');

    // Evento de clique nos gatinhos
    gameContainer.addEventListener('click', function (e) {
        // Verifica se o alvo clicado é um o gatinho
        if (e.target.classList.contains('mole-clicked')) {
            // Atualiza a pontuação ao clicar em um "gatinho"
            score++;
            scoreCount.innerHTML = score;

            // Exibe um texto de "whack!" ao acertar o "gatinho"
            const bushElem = e.target.parentElement.previousElementSibling;
            let textEl = document.createElement('span');
            textEl.setAttribute('class', 'whack-text');
            textEl.innerHTML = "whack!";
            bushElem.appendChild(textEl);

            // Remove o texto "whack!" após 300ms
            setTimeout(() => {
                textEl.remove();
            }, 300);
        }
    });

    // Função para iniciar o jogo
    const startGameFunction = () => {
        playButton.style.display = 'none'; // Esconde o botão de play
        countSection.style.display = 'block'; // Exibe a seção de contagem regressiva

        try {
            // Contagem regressiva do tempo do jogo
            startTime = setInterval(() => {
                timeCount.innerHTML = countDown;
                countDown--;
                // Finaliza o jogo quando o tempo se esgota
                if (countDown < 0) {
                    clearInterval(startGame);
                    clearInterval(startTime);
                    timeCount.innerHTML = "0";
                    showGameOverText();
                }
            }, 1000);

            // Mostra os "gatinho" em intervalos regulares
            startGame = setInterval(() => {
                showMole();
            }, 600);
        } catch (error) {
            console.error('Ocorreu um erro no jogo:', error);
        }
    }

    // Função para reinicializar o jogo
    const initializeGame = () => {
        try {
            // Reinicia variáveis para um novo jogo
            countDown = 20;
            score = 0;
            scoreCount.innerHTML = score; // Atualiza a exibição da pontuação
            startGameFunction(); // Inicia o jogo
        } catch (error) {
            console.error('Ocorreu um erro durante a inicialização do jogo:', error);
        }
    }

    // Evento de clique no botão de play
    playButton.addEventListener('click', startGameFunction);

    // Função para exibir um gatinho
    function showMole() {
        if (countDown <= 0) {
            clearInterval(startGame);
            clearInterval(startTime);
            timeCount.innerHTML = "0";
            showGameOverText();
        }
        // Seleciona aleatoriamente um gatinho para aparecer
        let moleToAppear = allMoleItems[getRandomValue()].querySelector('.mole');
        moleToAppear.classList.add('mole-appear'); // Exibe o "mole"
        hideMole(moleToAppear); // Esconde o "mole" após um tempo
    }

    // Função para obter um valor aleatório
    function getRandomValue() {
        let rand = Math.random() * allMoleItems.length;
        return Math.floor(rand);
    }

    // Função para esconder o "mole" após um tempo
    function hideMole(moleItem) {
        setTimeout(() => {
            moleItem.classList.remove('mole-appear');
        }, 999);
    }

    // Função para exibir o texto de fim de jogo
    function showGameOverText() {
        countSection.style.display = 'none'; // Esconde a seção de contagem regressiva

        // Cria um contêiner para mostrar o fim do jogo
        let gameOverContainer = document.createElement('div');
        gameOverContainer.setAttribute('class', 'game-over-container');

        // Texto de fim de jogo
        let gameOverText = document.createElement('div');
        gameOverText.innerHTML = "O tempo acabou! Sua pontuação foi " + score;

        // Botão para jogar novamente
        let playAgainButton = document.createElement('button');
        playAgainButton.setAttribute('class', 'botao2');
        playAgainButton.innerHTML = "Jogar Novamente";
        playAgainButton.addEventListener('click', () => {
            location.reload(); // Recarrega a página para jogar novamente
        });

        // Adiciona elementos ao contêiner do fim do jogo
        gameOverContainer.appendChild(gameOverText);
        gameOverContainer.appendChild(playAgainButton);

        // Adiciona o contêiner do fim do jogo ao contêiner do jogo
        gameContainer.appendChild(gameOverContainer);
    }

    // Função para resetar o jogo
    function resetGame() {
        clearInterval(startGame);
        clearInterval(startTime);

        // Limpa o contêiner do jogo removendo os elementos
        gameContainer.innerHTML = '';

        // Reinicia o jogo
        initializeGame();
    }
});
