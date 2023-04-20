// oi abigos
axios.defaults.headers.common['Authorization'] = 'aSaefb8T8sX6LpwwvW21qigP';

PuxarQuizz();

function PuxarQuizz() {
    let promise = axios.get(
      "https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes"
    );
    promise.then(ExibirQuizz);
}

function ExibirQuizz(resposta) {
    let x = resposta.data;
    let QuizzesPublicos = document.querySelectorAll(".todosQuizzes.containerQuizzes");
    QuizzesPublicos.innerHTML = "";
    for (let index = 0; index < x.length; index++) {
        QuizzesPublicos.innerHTML += `
        <div class="caixaQuizz" onclick="selecionarQuizz(${x[index].id})">
            <img class="thumbnailQuizz" src="${x[index].image}">
            <span class="tituloQuizz">${x[index].title}</span>
            <div class="gradientOverlay"></div>
        </div>
        `;
    }
}

function CriarQuizz(){
    
    const tela1 = document.querySelector('.tela1');
    tela1.classList.add('escondido');

    const tela2 = document.querySelector('.tela2');
    tela2.classList.add('escondido');

    const tela3 = document.querySelector('.tela3');
    tela3.classList.remove('escondido');

    let informacaoDoQuizz = [];

}

function CriarPerguntas(){

    const pag3_1 = document.querySelector('.pag3_1');
    pag3_1.classList.add('escondido');

    const pag3_2 = document.querySelector('.pag3_2');
    pag3_2.classList.remove('escondido');
    
}

function CriarNives(){
    
    const pag3_2 = document.querySelector('.pag3_2');
    pag3_2.classList.add('escondido');
    
    const pag3_3 = document.querySelector('.pag3_3');
    pag3_3.classList.remove('escondido');
    
}