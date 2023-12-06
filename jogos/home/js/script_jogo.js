class Node {
  constructor(data) {
      this.data = data;
      this.next = null;
  }
}

class LinkedList {
  constructor() {
      this.head = null;
  }

  insert(data) {
      const newNode = new Node(data);
      if (!this.head) {
          this.head = newNode;
      } else {
          let current = this.head;
          while (current.next) {
              current = current.next;
          }
          current.next = newNode;
      }
  }

  remove(data) {
      if (!this.head) {
          return;
      }
      if (this.head.data === data) {
          this.head = this.head.next;
          return;
      }
      let current = this.head;
      let previous = null;
      while (current && current.data !== data) {
          previous = current;
          current = current.next;
      }
      if (current) {
          previous.next = current.next;
      }
  }

  displayAll() {
      let current = this.head;
      while (current) {
          console.log(current.data);
          current = current.next;
      }
  }
}

const img = document.querySelector(".container-imagem");

const divFalas = document.querySelector(".falas");
const elementosDeTexto = divFalas.querySelectorAll("h1");
const listaNomesClicados = new LinkedList();

const cenarios = [
  {
      img: "img/cenario1.png",
      falas: "Qual é sua atividade preferida em grupo?",
      respostabotao1: "show",
      respostabotao2: "vídeogame",
      respostabotao3: "piquenique",
      respostabotao4: "exposição de arte"
  },
  {
      img: "img/cenario1.png",
      falas: "Qual palavra melhor descreve seu estilo de música favorito?",
      respostabotao1: "eletrônica",
      respostabotao2: "classica",
      respostabotao3: "alternativa",
      respostabotao4: "rock"
  },
  {
    img: "img/cenario1.png",
    falas: "O que mais te inspira?",
    respostabotao1: "autenticidade",
    respostabotao2: "tecnologia",
    respostabotao3: "beleza",
    respostabotao4: "sensibilidade"
},
{
    img: "img/cenario1.png",
    falas: "Se você tivesse que escolher uma cor qual seria?",
    respostabotao1: "preto",
    respostabotao2: "azul",
    respostabotao3: "branco",
    respostabotao4: "vermelho"
},
{
    img: "img/cenario1.png",
    falas: "Qual palavra melhor descreve sua atitude em relação a regras?",
    respostabotao1: "desafiador",
    respostabotao2: "flexível",
    respostabotao3: "respeitoso",
    respostabotao4: "criativo"
},
{
    img: "img/cenario1.png",
    falas: "Como você reage a situações estressantes?",
    respostabotao1: "distraído",
    respostabotao2: "calmo",
    respostabotao3: "reflexivo",
    respostabotao4: "ignorante"
},
{
    img: "img/cenario1.png",
    falas: "Você prefere cachorros ou gatos?",
    respostabotao1: "gatos!",
    respostabotao2: "gatos!",
    respostabotao3: "gatos!",
    respostabotao4: "gatos!"
}

  
      ];
      function atualizarTela(indice) {
    const cena = cenarios[indice];
    
    // Atualiza a imagem
    const img = document.querySelector(".container-img img");
    img.src = cena.img;

    // Atualiza o texto da fala
    elementosDeTexto[0].textContent = cena.falas;
    
    // Atualiza os botões com as respostas correspondentes
    const botoes = document.querySelectorAll(".botaoRespostas");
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].textContent = cena[`respostabotao${i + 1}`];
    }
}

    
 // Adiciona um ouvinte de evento de clique para cada botão
const botoes = document.querySelectorAll(".botaoRespostas");
let indiceCenaAtual = 0;


// Função para lidar com o clique em um botão
function handleButtonClick(dataNome) {
    listaNomesClicados.insert(dataNome);
    indiceCenaAtual++;

    if (indiceCenaAtual < cenarios.length) {
        atualizarTela(indiceCenaAtual);
    } else {
        exibirResultadoFinal();
       
    }
}


// Atualiza a tela inicial
atualizarTela(indiceCenaAtual);

// Adiciona o ouvinte de evento de clique a cada botão
botoes.forEach(function (botao) {
    botao.addEventListener("click", function () {
        const cenaAtual = cenarios[indiceCenaAtual];
        const dataNome = botao.getAttribute("data-nome");
        handleButtonClick(dataNome);
        
    });
});

function compararlistas() {
    const listaGatinho1 = new LinkedList(); ///lysandre
    const listaGatinho2 = new LinkedList(); //armin
    const listaGatinho3 = new LinkedList(); //castiel

   
    listaGatinho1.insert("1resposta");
    listaGatinho1.insert("2resposta");
    listaGatinho1.insert("1resposta");
    listaGatinho1.insert("2resposta"); 
    listaGatinho1.insert("1resposta");
    
    listaGatinho2.insert("1resposta");
    listaGatinho2.insert("3resposta");
    listaGatinho2.insert("4resposta");
    listaGatinho2.insert("4resposta");
    listaGatinho2.insert("1resposta");

    listaGatinho3.insert("2resposta");
    listaGatinho3.insert("3resposta");
    listaGatinho3.insert("4resposta");
    listaGatinho3.insert("4resposta");
    listaGatinho3.insert("3resposta");
    // ...

    // Compare o conteúdo de cada listaGatinho com listaNomesClicados e atribua pontuações
    const pontuacaoGatinho1 = calcularPontuacao(listaGatinho1, listaNomesClicados);
    const pontuacaoGatinho2 = calcularPontuacao(listaGatinho2, listaNomesClicados);
    const pontuacaoGatinho3 = calcularPontuacao(listaGatinho3, listaNomesClicados);

    // Determine qual listaGatinho tem a pontuação mais alta
    if (pontuacaoGatinho1 > pontuacaoGatinho2 && pontuacaoGatinho1 > pontuacaoGatinho3) {
        gatinhoFinal = "lysandre";
    } else if (pontuacaoGatinho2 > pontuacaoGatinho1 && pontuacaoGatinho2 > pontuacaoGatinho3) {
        gatinhoFinal = "armin";
    } else {
        gatinhoFinal = "castiel";
    }
}

// Função para calcular a pontuação comparando o conteúdo de duas listas encadeadas
function calcularPontuacao(listaGatinho, listaComparada) {
    let atualGatinho = listaGatinho.head;
    let atualComparada = listaComparada.head;
    let pontuacao = 0;
    

    while (atualGatinho && atualComparada) {
        if (atualGatinho.data === atualComparada.data) {
            pontuacao++;
        }
        atualGatinho = atualGatinho.next;
        atualComparada = atualComparada.next;
    }

    return pontuacao;
}
let gatinhoFinal;



function exibirResultadoFinal() {
    console.log("Fim do jogo!");
    console.log("Itens da lista encadeada:");
    listaNomesClicados.displayAll();

    // Adiciona chamada para compararlistas após o final do jogo
    compararlistas();
    console.log("Gatinho Final:", gatinhoFinal);

    // Oculta os elementos de texto e a caixa de texto
    document.querySelector('.falas').style.display = 'none';
    document.getElementById('caixaDeTexto1').style.display = 'none';
    document.querySelector('.botoes').style.display = 'none';

    // Exibe o resultado final na div do cenário
    const cenaDiv = document.querySelector('.container-img');

    // Div para o nome do gatinho
    const nomeGatinhoResultadoDiv = document.createElement('h2');
    nomeGatinhoResultadoDiv.classList.add('nomeGatinhoh2', 'iniciarAnimacao');
    nomeGatinhoResultadoDiv.textContent = `Gatinho Final: ${gatinhoFinal}`;
     
    // Div para o botão "Ver Gatinho"
    const botaoVerGatinhoDiv = document.createElement('div');
    botaoVerGatinhoDiv.classList.add('botaoVerGatinhoResultado');
    botaoVerGatinhoDiv.innerHTML = `<button onclick="verGatinho(this)" src ="img/caixa.png" id="verGatinhoBtn">ver gatinho</button>`;
    
    // Adiciona as divs à cenaDiv
    cenaDiv.appendChild(nomeGatinhoResultadoDiv);
    cenaDiv.appendChild(botaoVerGatinhoDiv);

    // document.addEventListener('DOMContentLoaded', function () {
    //     const verGatinhoBtn = document.getElementById('verGatinhoBtn');
    //     verGatinhoBtn.addEventListener('click', function () {
    //         verGatinho();
    //         jogarNovamenteBtn();
    //     });
    // });

    // Adiciona a classe que inicia a animação após todos os elementos serem criados
    nomeGatinhoResultadoDiv.classList.add('iniciarAnimacao');
}


function verGatinho(element) {
    // Exibi a imagem do gatinho correspondente ao resultado final
    const gatinhoResultadoDiv = document.createElement('div');
    gatinhoResultadoDiv.classList.add('.imagemGatinhos');

    element.style.display = "none";

    // Use a variável gatinhoFinal para escolher a imagem correta
    const imagemGatinho = `img/${gatinhoFinal}.png`;
    

    gatinhoResultadoDiv.innerHTML = `<img class="gatito" src="${imagemGatinho}" alt="Gatinho Resultado">`;
    document.body.appendChild(gatinhoResultadoDiv);
    

    document.querySelector(".gatinhos").style.display = "block"


};

document.getElementById('jogarNovamenteBtn').addEventListener('click', function() {
    // Recarrega a página para começar o jogo novamente
    location.reload();
});
