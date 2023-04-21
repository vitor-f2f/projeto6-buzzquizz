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

    //gera as perguntas em ordem aleatoria escondendo a primeira tela e mostrando a segunda
    
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
let perguntas = [];
let nivel = [];
let numeroptg;
let numeronivel;

function CriarQuizz(){
    
    const tela1 = document.querySelector('.tela1');
    tela1.classList.add('escondido');

    const tela2 = document.querySelector('.tela2');
    tela2.classList.add('escondido');

    const tela3_1 = document.querySelector('.pag3_1');
    tela3_1.classList.remove('escondido');

    const tela3_2 = document.querySelector('.pag3_2');
    tela3_2.classList.add('escondido');

    const tela3_3 = document.querySelector('.pag3_3');
    tela3_3.classList.add('escondido');

    const tela3_4 = document.querySelector('.pag3_4');
    tela3_4.classList.add('escondido');

    const tela3 = document.querySelector('.tela3');
    tela3.classList.remove('escondido');
    
}

function AbrirPerguntas(i){
    const pergunta = document.querySelectorAll('.pergunta');
  
    pergunta[i].classList.toggle('escondido');
}
function AbrirNivel(i){
    const Nivel = document.querySelectorAll('.nivel');
  
    Nivel[i].classList.toggle('escondido');
}


function CriarPerguntas(){

    const NomeQuizz = document.querySelector('.NomeQuizz').value;
    const ImgQuizz = document.querySelector('.ImgQuizz').value;
    const QtdPerguntasQuizz = document.querySelector('.QtdPerguntasQuizz').value;
    const QtdNivelQuizz = document.querySelector('.QtdNivelQuizz').value;

    numeroptg = QtdPerguntasQuizz;
    numeronivel = QtdNivelQuizz;

    if(NomeQuizz.length >= 20 && NomeQuizz.length <=65 && QtdPerguntasQuizz >=3 && QtdNivelQuizz>=2){

        informacaoDoQuizz = [{nome: NomeQuizz , imagem: ImgQuizz, perguntas:QtdPerguntasQuizz, nivel:QtdNivelQuizz}];

        const pag3_1 = document.querySelector('.pag3_1');
        const pag3_2 = document.querySelector('.pag3_2');
        const pag3_3 = document.querySelector('.pag3_3');
        const pag3_4 = document.querySelector('.pag3_4');

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
                                        <input type="text" class="input pergunta${i}" minlength="20" placeholder="Texto da pergunta">
                                        <input type="text" value="#FFFFFF" class="input cor${i}" placeholder="Cor de fundo da pergunta">
                                    </div>
                                    <div class="inputs">
                                        <h1 class="titulo">Resposta correta</h1>
                                        <input type="text" class="input respostaCorreta${i}" minlength="1" placeholder="Resposta correta">
                                        <input type="url" class="input URLrespostaCorreta${i}" placeholder="URL da imagem">
                                    </div>
                                    <div class="inputs">
                                        <h1 class="titulo">Respostas incorretas</h1>
                                        <input type="text" class="input respostaIncorreta${i}_1" placeholder="Resposta incorreta 1">
                                        <input type="url" class="input URLrespostaIncorreta${i}_1" placeholder="URL da imagem 1">
                                    </div>
                                    <div class="inputs">
                                        <input type="text" class="input respostaIncorreta${i}_2" placeholder="Resposta incorreta 2">
                                        <input type="url" class="input URLrespostaIncorreta${i}_2" placeholder="URL da imagem 2">
                                    </div>
                                    <div class="inputs">
                                        <input type="text" class="input respostaIncorreta${i}_3" placeholder="Resposta incorreta 3">
                                        <input type="url" class="input URLrespostaIncorreta${i}_3" placeholder="URL da imagem 3">
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
                                        <input type="text" class="input pergunta${i}" minlength="20" placeholder="Texto da pergunta">
                                        <input type="text" value="#FFFFFF" class="input cor${i}" placeholder="Cor de fundo da pergunta">
                                    </div>
                                    <div class="inputs">
                                        <h1 class="titulo">Resposta correta</h1>
                                        <input type="text" class="input respostaCorreta${i}" minlength="1" placeholder="Resposta correta">
                                        <input type="url" class="input URLrespostaCorreta${i}" placeholder="URL da imagem">
                                    </div>
                                    <div class="inputs">
                                        <h1 class="titulo">Respostas incorretas</h1>
                                        <input type="text" class="input respostaIncorreta${i}_1" placeholder="Resposta incorreta 1">
                                        <input type="url" class="input URLrespostaIncorreta${i}_1" placeholder="URL da imagem 1">
                                    </div>
                                    <div class="inputs">
                                        <input type="text" class="input respostaIncorreta${i}_2" placeholder="Resposta incorreta 2">
                                        <input type="url" class="input URLrespostaIncorreta${i}_2" placeholder="URL da imagem 2">
                                    </div>
                                    <div class="inputs">
                                        <input type="text" class="input respostaIncorreta${i}_3" placeholder="Resposta incorreta 3">
                                        <input type="url" class="input URLrespostaIncorreta${i}_3" placeholder="URL da imagem 3">
                                    </div>
                                </div>
                                `;
           }
        }
        for(let i = 0; i < QtdNivelQuizz; i++){
            if(i===0){
            pag3_3.innerHTML +=
                               `
                                <div class="aba" onclick="AbrirNivel(${i})">
                                    <h1 class="titulo">Nivel ${i+1}</h1>
                                    <ion-icon name="create-outline"></ion-icon>
                                </div>
                                <div class="inputs nivel">                                   
                                    <input type="text" class="input tituloNivel${i}" minlength="10" placeholder="Título do nível">
                                    <input type="number" class="input porcentagemNivel${i}" min="0" max="100" placeholder="% de acerto mínima">
                                    <input type="url" class="input imagemNivel${i}" placeholder="URL da imagem do nível">
                                    <input type="text" class="input descricaoNivel${i}" minlength="30" placeholder="Descrição do nível">
                                </div>
                                `;
            }
            else{
                pag3_3.innerHTML +=
                               `
                                <div class="aba" onclick="AbrirNivel(${i})">
                                    <h1 class="titulo">Nivel ${i+1}</h1>
                                    <ion-icon name="create-outline"></ion-icon>
                                </div>
                                <div class="inputs nivel escondido">                                   
                                    <input type="text" class="input tituloNivel${i}" minlength="10" placeholder="Título do nível">
                                    <input type="number" class="input porcentagemNivel${i}" min="0" max="100" placeholder="% de acerto mínima">
                                    <input type="url" class="input imagemNivel${i}" placeholder="URL da imagem do nível">
                                    <input type="text" class="input descricaoNivel${i}" minlength="30" placeholder="Descrição do nível">
                                </div>
                                `;
            }
        }
        pag3_2.innerHTML += 
                        `<div class="BotaoVermelho Tela3_ParaNives" onclick="CriarNives()">Prosseguir pra criar níveis</div>`;
        pag3_3.innerHTML +=
                        ` <div class="BotaoVermelho Tela3_FinalizarQuizz" onclick="AddQuizz()">Finalizar Quizz</div>`;
        pag3_4.innerHTML += `
                        <div class="caixaQuizz centralizar">
                            <img class="thumbnailQuizz" src="${informacaoDoQuizz[0]['imagem']}">
                            <span class="tituloQuizz">${informacaoDoQuizz[0]['nome']}</span>
                            <div class="gradientOverlay"></div>
                        </div>
                        <div class="BotaoVermelho Tela3_AcessarQuizz" onclick="jogarQuizz()">Acessar Quizz</div>
                        <div class="Texto_Cinza Tela3_VoltarHome" onclick="voltarHome()">Voltar pra home</div>
                        `;
        pag3_1.classList.add('escondido');
        pag3_2.classList.remove('escondido');

    }
    else{
        alert('Confira as informações');
    }
}

function CriarNives(){
        
    let pergunta = document.querySelector(`.pergunta0`).value;
    let cor = document.querySelector(`.cor0`).value;
    let respostaCorreta = document.querySelector(`.respostaCorreta0`).value;
    let URLrespostaCorreta = document.querySelector(`.URLrespostaCorreta0`).value;
    let respostaIncorreta_1 = document.querySelector(`.respostaIncorreta0_1`).value
    let URLrespostaIncorreta_1 = document.querySelector(`.URLrespostaIncorreta0_1`).value;
    let respostaIncorreta_2 = document.querySelector(`.respostaIncorreta0_2`).value;
    let URLrespostaIncorreta_2 = document.querySelector(`.URLrespostaIncorreta0_2`);
    let respostaIncorreta_3 = document.querySelector(`.respostaIncorreta0_3`).value;
    let URLrespostaIncorreta_3 = document.querySelector(`.URLrespostaIncorreta0_3`).value;
    
        if(pergunta.length >= 20 && cor[0]=='#' && respostaCorreta !='' && respostaIncorreta_1 != ''){
            for(let c =0; c < numeroptg; c++){
                pergunta = document.querySelector(`.pergunta${c}`).value;
                cor = document.querySelector(`.cor${c}`).value;
                respostaCorreta = document.querySelector(`.respostaCorreta${c}`).value;
                URLrespostaCorreta = document.querySelector(`.URLrespostaCorreta${c}`).value;
                respostaIncorreta_1 = document.querySelector(`.respostaIncorreta${c}_1`).value
                URLrespostaIncorreta_1 = document.querySelector(`.URLrespostaIncorreta${c}_1`).value;
                respostaIncorreta_2 = document.querySelector(`.respostaIncorreta${c}_2`).value;
                URLrespostaIncorreta_2 = document.querySelector(`.URLrespostaIncorreta${c}_2`).value;
                respostaIncorreta_3 = document.querySelector(`.respostaIncorreta${c}_3`).value;
                URLrespostaIncorreta_3 = document.querySelector(`.URLrespostaIncorreta${c}_3`).value;
                
                let x = [{  
                    pergunta: pergunta, 
                    cor: cor, 
                    respostaCorreta: respostaCorreta, 
                    URLrespostaCorreta: URLrespostaCorreta, 
                    respostaIncorreta_1: respostaIncorreta_1, 
                    URLrespostaIncorreta_1: URLrespostaIncorreta_1,
                    respostaIncorreta_2: respostaIncorreta_2, 
                    URLrespostaIncorreta_2: URLrespostaIncorreta_2, 
                    respostaIncorreta_3: respostaIncorreta_3, 
                    URLrespostaIncorreta_3: URLrespostaIncorreta_3
                }];
                perguntas.push(x);
                
            }
            console.log(perguntas);
            const pag3_2 = document.querySelector('.pag3_2');
                pag3_2.classList.add('escondido');
                
                const pag3_3 = document.querySelector('.pag3_3');
                pag3_3.classList.remove('escondido');
        }
        else{
            alert('Confira os dados');
            console.log(perguntas);
        }
    
}

function AddQuizz(){
    for(let c = 0; c < numeronivel; c++){
        let tituloNivel = document.querySelector(`.tituloNivel${c}`).value;
        let porcentagemNivel = document.querySelector(`.porcentagemNivel${c}`).value;
        let imagemNivel = document.querySelector(`.imagemNivel${c}`).value;
        let descricaoNivel = document.querySelector(`.descricaoNivel${c}`).value;
        
        if(tituloNivel.length >= 10 && descricaoNivel.length >= 30){
            let x =[{
                    tituloNivel: tituloNivel,
                    porcentagemNivel: porcentagemNivel,
                    imagemNivel: imagemNivel,
                    descricaoNivel:descricaoNivel
                    }]
            nivel.push(x);
        }
        else{
            alert('Confia os dados');
            return;
        }
    }

        const pag3_3 = document.querySelector('.pag3_3');
        pag3_3.classList.add('escondido');

        const pag3_4 = document.querySelector('.pag3_4');
        pag3_4.classList.remove('escondido');

}

function voltarHome(){
    const tela1 = document.querySelector('.tela1');
    tela1.classList.remove('escondido');

    const tela2 = document.querySelector('.tela2');
    tela2.classList.add('escondido');

    const tela3 = document.querySelector('.tela3');
    tela3.classList.add('escondido');
}

function jogarQuizz(){
    //?Função que faz o quizz rodar com o novo quizz como argumento
}

//!-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=Começar quiz=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
