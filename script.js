// Capturando os meus botões de mais e menos
let buttonPlus = document.querySelector('#plus-button');
let buttonMinus = document.querySelector('#minus-button');

// Capturando o botão para começar o jogo
let buttonStartGame = document.querySelector('#start-race-btn');

// Adicionando evento para escutar o clique do mouse nos botões
buttonPlus.addEventListener('click', addPlayer);
buttonMinus.addEventListener('click', removePlayer);
buttonStartGame.addEventListener('click', startGame);

// Criando meu array aonde vou guardar meus jogadores
let playerList = [];

// Criando minha variavel que vai guardar o meu loop
let loop = null;

function addPlayer() {
  // Verificando se tem 5 players no jogo, caso sim, retorne e não faça nada
  // Ou se loop for diferente de null para ver se o jogo ja começou
  if (playerList.length >= 5 || loop !== null) {
    return;
  }

  // Criando a div do meu novo jogador com a classe 'car'
  let newPlayer = document.createElement('div');
  newPlayer.classList = 'car';
  newPlayer.style.marginLeft = '0px';
  
  // Pegando uma cor aleatória e adicionando ao fundo do meu carro
  newPlayerColor = getRandomColor();
  newPlayer.style.backgroundColor = newPlayerColor;
  
  // Adicionando uma margin bottom a div
  newPlayer.style.marginBottom = '10px';
  
  // Adicionando o carro ao final da seção de carros
  let carSection = document.querySelector('.car-section');
  carSection.appendChild(newPlayer);

  // Adicionando o jogador na lista
  playerList.push(newPlayer);

  // Chamando a função 'countingPlayer' com o parametro 'plus'
  countingPlayer('plus');
}

function removePlayer() {
  // Se loop for diferente de null, ou seja, o jogo está rolando, retorne e não remova nenhum jogador
  if (loop !== null) {
    return;
  }

  // Pegando o ultimo player e retirando ele da lista de jogadores
  let lastPlayer = playerList.pop();

  // Se o retorno do ultimo jogador der undefined retornar e não fazer nada
  if (lastPlayer === undefined) {
    return;
  }

  // Remover a div do ultimo jogador do jogo
  lastPlayer.remove();

  // Chamando a função 'countingPlayer' com o parametro 'minus'
  countingPlayer('minus');
}

function countingPlayer (minusOrPlus) {
  // Pegando o texto com a quantidade de players e incrementando 1
  let amountOfPlayers = document.querySelector('#players');

  // Verificando se o parametro veio minus ou plus para adicionar ou remover um numero da contagem de jogadores
  if (minusOrPlus === 'plus') {
    amountOfPlayers.innerText = parseInt(amountOfPlayers.innerText) + 1;
  } else if (minusOrPlus === 'minus') {
    amountOfPlayers.innerText = parseInt(amountOfPlayers.innerText) - 1;
  }
}

function startGame() {
  // Verificando se existem pelo menos dois jogadores no jogo, caso não tenha, retornando um alerta para adicionar novos jogadores
  if (playerList.length < 2) {
    return alert('Você precisa de no minimo dois jogadores para iniciar o jogo!');
  }

  // Colocando o meu jogo pra rodar a cada 120ms
  loop = setInterval(gameLoop, 120);
}

function gameLoop() {
  // Criando variavel para verificar quantos jogadores ganharam o jogo
  let champions = [];

  // For para iterar sobre os jogadores
  for (let i = 0; i < playerList.length; i += 1) {
    // Pegando o jogador que eu vou mexer de dentro do array de jogadores
    let currentPlayer = playerList[i];
    // Passando como parametro para acelerar o meu jogador atual
    accelerateCars(currentPlayer);

    // Se a margem esquerda do meu jogador atual mais o seu tamanho forem maiores que a tela
    if (parseInt(currentPlayer.style.marginLeft) + 210 > window.innerWidth) {
      // Adicionando ao meu array de jogadores qual jogador venceu
      champions.push(i + 1);
    }
  }

  // Se o meu array champions tiver mais de 1 item avisar que o jogo empatou ou caso não esteja vazio avisar qual jogador venceu
  if (champions.length > 1) {
    // Alerta para avisar se mais de um jogador venceu
    alert('Mais de um jogador venceu, o jogo ficou empatado!');
    // Função para resetar a corrida
    resetRace();
  } else if (champions.length > 0) {
    // Alerta avisando qual jogador venceu
    alert('O jogador ' + champions[0] + ' venceu!');
    // Função para resetar a corrida
    resetRace();
  }

}

function resetRace() {
  // For para iterar sobre todos os meus jogadores e definir a marginLeft deles como '0px'
  for (let currentPlayer of playerList) {
    currentPlayer.style.marginLeft = '0px';
  }

  // Função para parar o meu loop do jogo
  clearInterval(loop);

  // Fazendo loop voltar a valer nulo
  loop = null;
}

function getRandomColor() {
  // String com todas as letras possiveis de um hexadecimal
  let letters = '0123456789ABCDEF';

  // Começando a minha variavel color com o #
  let color = '#';

  // Criando um laço de repetição para pegar 6 itens aleatórios do meu array
  for (let i = 0; i < 6; i += 1) {
    // Adicionando itens aleatórios da minha string para a cor
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

function accelerateCars(car) {
  // Pegando apenas os numeros da marginLeft do meu jogador
  let currentCarMarginLeft = parseInt(car.style.marginLeft);

  // Pegando um numero aleatório e adicionando a distancia que ele andou
  currentCarMarginLeft += generateRandomNumber(1, 20);

  // Definindo a marginLeft do carro para ele finalmente andar
  car.style.marginLeft = currentCarMarginLeft + 'px';
}

function generateRandomNumber(min, max) {
  // Função para retornar numeros aleatórios entro o numero max e o min
  return Math.floor(Math.random() * (max - min) + min);
}
