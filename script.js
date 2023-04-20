// oi abigos
axios.defaults.headers.common['Authorization'] = 'aSaefb8T8sX6LpwwvW21qigP';

PuxarQuizz();

function PuxarQuizz() {
    let promise = axios.get(
      "https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes"
    );
    promise.then(exibirQuizz);

}

function exibirQuizz(resposta) {
    let x = resposta.data;
    console.log(resposta.data);
    let quizzesPublicos = document.querySelector(".listar-quiz");
    quizzesPublicos.innerHTML = "";
    for (let index = 0; index < x.length; index++) {
       

       quizzesPublicos.innerHTML += `
        <div class="caixaQuizz" onclick="selecionarQuizz(${x[index].id})">
            <img class="thumbnailQuizz" src="${x[index].image}"/>
            <span class="tituloQuizz">${x[index].title}</span>
            <div class="gradientOverlay"></div>
        </div>
        `;
       
    }
}

//!-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=CRIAÇÃO DO QUIZZ=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
let informacaoDoQuizz =[];

function CriarQuizz(){
    
    const tela1 = document.querySelector('.tela1');
    tela1.classList.add('escondido');

    const tela2 = document.querySelector('.tela2');
    tela2.classList.add('escondido');

    const tela3 = document.querySelector('.tela3');
    tela3.classList.remove('escondido');
    
}

function CriarPerguntas(){

    const NomeQuizz = document.querySelector('.NomeQuizz').value;
    const ImgQuizz = document.querySelector('.ImgQuizz').value;
    const QtdPerguntasQuizz = document.querySelector('.QtdPerguntasQuizz').value;
    const QtdNivelQuizz = document.querySelector('.QtdNivelQuizz').value;


    informacaoDoQuizz = [{nome: NomeQuizz , imagem: ImgQuizz, perguntas:QtdPerguntasQuizz, nivel:QtdNivelQuizz}];


    const pag3_1 = document.querySelector('.pag3_1');
    pag3_1.classList.add('escondido');

    const pag3_2 = document.querySelector('.pag3_2');
    pag3_2.classList.remove('escondido');

    console.log(informacaoDoQuizz);
}

function CriarNives(){
    
    const pag3_2 = document.querySelector('.pag3_2');
    pag3_2.classList.add('escondido');
    
    const pag3_3 = document.querySelector('.pag3_3');
    pag3_3.classList.remove('escondido');
    
}

function AddQuizz(){

    const pag3_3 = document.querySelector('.pag3_3');
    pag3_3.classList.add('escondido');

    const pag3_4 = document.querySelector('.pag3_4');
    console.log(pag3_4);
    pag3_4.classList.remove('escondido');

    pag3_4.innerHTML += `
                        
                        <div class="caixaQuizz centralizar">
                            <img class="thumbnailQuizz" src="${informacaoDoQuizz[0]['imagem']}">
                            <span class="tituloQuizz">${informacaoDoQuizz[0]['nome']}</span>
                            <div class="gradientOverlay"></div>
                        </div>
                        <div class="BotaoVermelho Tela3_AcessarQuizz">Acessar Quizz</div>
                        <div class="Texto_Cinza Tela3_VoltarHome">Voltar pra home</div>
                        `;
}