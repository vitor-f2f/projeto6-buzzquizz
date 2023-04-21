// oi abigos
axios.defaults.headers.common['Authorization'] = 'aSaefb8T8sX6LpwwvW21qigP';

puxarQuizz();

function puxarQuizz() {
    let promise = axios.get(
      "https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes"
    );
    promise.then(exibirQuizz);

}

function exibirQuizz(resposta) {
    /* chamar essa função quando terminar de criar um quiz novo
    para resetar o html da pagina e checar o local storage */
    let x = resposta.data;
    console.log(resposta.data);
    let quizzesPublicos = document.querySelector(".todosQuizzes .containerQuizzes");
    let quizzesDoUsuario = document.querySelector(".seusQuizzes .containerQuizzes");
    quizzesPublicos.innerHTML = "";
    quizzesDoUsuario.innerHTML = "";
    let arrayIDs = [];
    checkLocalStorage(arrayIDs);
    for (let index = 0; index < x.length; index++) {
        if (arrayIDs.indexOf(x[index].id) !== -1) {
            ondeRenderizar = quizzesDoUsuario;
        } else {
            ondeRenderizar = quizzesPublicos;
        }
        ondeRenderizar.innerHTML += `
        <div class="caixaQuizz" onclick="selecionarQuizz(${x[index].id})">
            <img class="thumbnailQuizz" src="${x[index].image}"/>
            <span class="tituloQuizz">${x[index].title}</span>
            <div class="gradientOverlay"></div>
        </div>
        `;
       
    }

}

function checkLocalStorage(arr) {
    /* checa se existem IDs no localstorage e troca o display
    de quiz do usuario */
    let naoTemQuizz = document.querySelector(".nenhumQuizz");
    let usuarioTemQuizz = document.querySelector(".seusQuizzes");
    let stringIDsUsuario = localStorage.getItem("id");

    if (stringIDsUsuario === null) {
        naoTemQuizz.classList.remove("escondido");
        usuarioTemQuizz.classList.add("escondido");
    } else {
        naoTemQuizz.classList.add("escondido");
        usuarioTemQuizz.classList.remove("escondido");
        arr = JSON.parse(stringIDsUsuario);
    }
    return arr;
}

function selecionarQuizz(quizzid) {
    const promise = axios.get(`https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/${quizzid}`);
    promise.then(irParaQuizz);

    let tela1 = document.querySelector('.tela1')
    tela1.classList.add('escondido');
    let tela2 = document.querySelector('.tela2')
    tela2.classList.remove('escondido');

}


function irParaQuizz(resposta) {
    
    let quizSelecionado = resposta.data;

    let perguntas = document.querySelector('.tela2');
    perguntas.innerHTML = '';
    
    perguntas.innerHTML += `
    <div class="imagem-cabecalho gradiente-opacity">
                <img  src="${quizSelecionado.image}">
                <div class="mascara-cabecalho"></div>
                <span>${quizSelecionado.title}</span>
            </div>
    `;  

    for(let i = 0; i < quizSelecionado.questions.length; i++){
        
        let sortearRespostas = [];
       

        for(let j = 0; j < quizSelecionado.questions[i].answers.length; j++){
            sortearRespostas.push(quizSelecionado.questions[i].answers[j]);
        }

        sortearRespostas.sort(comparador);
        console.log(sortearRespostas);
       

        perguntas.innerHTML += `
            <div class="container-perguntas">
                <div class="titulo-pergunta">${quizSelecionado.questions[i].title}</div>
                <div class="caixa-questoes">
                    <div class="selecionar-questao">
                        <img  src="./img/quizvocesabetudosobrepresentperfect.jpg">
                        <span >${sortearRespostas[0].text}</span>
                    </div><div class="selecionar-questao">
                        <img src="./img/quizvocesabetudosobrepresentperfect.jpg">
                        <span >${sortearRespostas[1].text}</span>
                    </div><div class="selecionar-questao">
                        <img src="./img/quizvocesabetudosobrepresentperfect.jpg">
                        <span >${sortearRespostas[2].text}</span>
                    </div><div class="selecionar-questao">
                        <img src="./img/quizvocesabetudosobrepresentperfect.jpg">
                        <span >${sortearRespostas[3].text}</span>
                    </div>
            </div>
        `;

    }
}
function comparador(){
    return Math.random() - 0.5;
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

function AbrirPerguntas(i){
    const pergunta = document.querySelectorAll('.pergunta');
  
    pergunta[i].classList.toggle('escondido');
}

function CriarPerguntas(){

    const NomeQuizz = document.querySelector('.NomeQuizz').value;
    const ImgQuizz = document.querySelector('.ImgQuizz').value;
    const QtdPerguntasQuizz = document.querySelector('.QtdPerguntasQuizz').value;
    const QtdNivelQuizz = document.querySelector('.QtdNivelQuizz').value;

    if(NomeQuizz.length >= 20 && NomeQuizz.length <=65 && QtdPerguntasQuizz >=3 && QtdNivelQuizz>=2){

        informacaoDoQuizz = [{nome: NomeQuizz , imagem: ImgQuizz, perguntas:QtdPerguntasQuizz, nivel:QtdNivelQuizz}];

        const pag3_1 = document.querySelector('.pag3_1');
        const pag3_2 = document.querySelector('.pag3_2');

        for(let i = 0; i < QtdPerguntasQuizz; i++){
           if(i === 0){
            pag3_2.innerHTML +=
                                ` 
                                <div class="aba" onclick="AbrirPerguntas(${i})">
                                    <h1 class="titulo">Pergunta ${i+1}</h1>
                                    <ion-icon name="create-outline"></ion-icon>
                                </div>
                                <div class="containerInputs pergunta">
                                    <div class="inputs">
                                        <input type="text" class="input" minlength="20" placeholder="Texto da pergunta">
                                        <input type="color" value="#FFFFFF" class="input" placeholder="Cor de fundo da pergunta">
                                    </div>
                                    <div class="inputs">
                                        <h1 class="titulo">Resposta correta</h1>
                                        <input type="text" class="input" minlength="1" placeholder="Resposta correta">
                                        <input type="url" class="input" placeholder="URL da imagem">
                                    </div>
                                    <div class="inputs">
                                        <h1 class="titulo">Respostas incorretas</h1>
                                        <input type="text" class="input" placeholder="Resposta incorreta 1">
                                        <input type="url" class="input" placeholder="URL da imagem 1">
                                    </div>
                                    <div class="inputs">
                                        <input type="text" class="input" placeholder="Resposta incorreta 2">
                                        <input type="url" class="input" placeholder="URL da imagem 2">
                                    </div>
                                    <div class="inputs">
                                        <input type="text" class="input" placeholder="Resposta incorreta 3">
                                        <input type="url" class="input" placeholder="URL da imagem 3">
                                    </div>
                                </div>
                                `;
           }
           else{
            pag3_2.innerHTML +=
                                `
                                <div class="aba" onclick="AbrirPerguntas(${i})">
                                    <h1 class="titulo">Pergunta ${i+1}</h1>
                                    <ion-icon name="create-outline"></ion-icon>
                                </div>
                                <div class="containerInputs pergunta escondido">
                                    <div class="inputs">
                                        <input type="text" class="input" minlength="20" placeholder="Texto da pergunta">
                                        <input type="color" value="#FFFFFF" class="input" placeholder="Cor de fundo da pergunta">
                                    </div>
                                    <div class="inputs">
                                        <h1 class="titulo">Resposta correta</h1>
                                        <input type="text" class="input" minlength="1" placeholder="Resposta correta">
                                        <input type="url" class="input" placeholder="URL da imagem">
                                    </div>
                                    <div class="inputs">
                                        <h1 class="titulo">Respostas incorretas</h1>
                                        <input type="text" class="input" placeholder="Resposta incorreta 1">
                                        <input type="url" class="input" placeholder="URL da imagem 1">
                                    </div>
                                    <div class="inputs">
                                        <input type="text" class="input" placeholder="Resposta incorreta 2">
                                        <input type="url" class="input" placeholder="URL da imagem 2">
                                    </div>
                                    <div class="inputs">
                                        <input type="text" class="input" placeholder="Resposta incorreta 3">
                                        <input type="url" class="input" placeholder="URL da imagem 3">
                                    </div>
                                </div>
                                `;
           }
        }
        pag3_2.innerHTML += 
                        `<div class="BotaoVermelho Tela3_ParaNives" onclick="CriarNives()">Prosseguir pra criar níveis</div>`

        pag3_1.classList.add('escondido');
        pag3_2.classList.remove('escondido');

        console.log(informacaoDoQuizz);

        
    }
    else{
        alert('Confira as informações');
    }
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

//!-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=Começar quiz=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
