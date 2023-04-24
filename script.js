// oi abigos
axios.defaults.headers.common['Authorization'] = 'aSaefb8T8sX6LpwwvW21qigP';
let acertos = 0, contador = 0, verificarTamanhoNiveis = 0, percentualAcertos = 0;
let chamarQuizNovamente;
let quizRetornado;
let arrayIDs = [];
let respostaAPI = [];
console.log(arrayIDs);

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
    let listaResp = resposta.data;
    let quizzesPublicos = document.querySelector(".todosQuizzes .containerQuizzes");
    let quizzesDoUsuario = document.querySelector(".seusQuizzes .containerQuizzes");
    quizzesPublicos.innerHTML = "";
    quizzesDoUsuario.innerHTML = "";
    let listaLocal = localStorage.getItem("arrayIDs");
    let countUsuario = 0;
   

    for (let i = 0; i < listaResp.length; i++) {
        if(listaLocal !== null){
            if(listaLocal.includes(listaResp[i].id)){
                countUsuario++;
                quizzesDoUsuario.innerHTML += `
                <div class="caixaQuizz" data-test="my-quiz" onclick="selecionarQuizz(${listaResp[i].id})">
                    <img class="thumbnailQuizz" src="${listaResp[i].image}"/>
                    <p class="tituloQuizz">${listaResp[i].title}</p>
                    <div class="gradientOverlay"></div>
                </div>
                `;
            }
        }else {
            quizzesPublicos.innerHTML += `
            <div class="caixaQuizz" data-test="others-quiz" onclick="selecionarQuizz(${listaResp[i].id})">
                <img class="thumbnailQuizz" src="${listaResp[i].image}"/>
                <p class="tituloQuizz">${listaResp[i].title}</p>
                <div class="gradientOverlay"></div>
            </div>
            `;
        }
      
    }
    let naoTemQuizz = document.querySelector(".nenhumQuizz");
    let usuarioTemQuizz = document.querySelector(".seusQuizzes");
    if (countUsuario > 0) {
        naoTemQuizz.classList.add("escondido");
        usuarioTemQuizz.classList.remove("escondido");
    } else {
        naoTemQuizz.classList.remove("escondido");
        usuarioTemQuizz.classList.add("escondido");
    }
}

function selecionarQuizz(quizzid) {
    const promise = axios.get(`https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/${quizzid}`);
    promise.then(irParaQuizz);

    let tela1 = document.querySelector('.tela1')
    tela1.classList.add('escondido');
    let tela2 = document.querySelector('.tela2')
    tela2.classList.remove('escondido');

    chamarQuizNovamente = quizzid;

}
function reiniciarQuiz(){
    window.scroll(0, 0)
    acertos = 0;
    contador = 0;
    percentualAcertos = 0;
    verificarTamanhoNiveis = 0;
    selecionarQuizz(chamarQuizNovamente);
   

    let selecionado = document.querySelectorAll(`.container-perguntas. .selecionar-questao span`);
    let desabilitarClick = document.querySelectorAll(`.container-perguntas. .selecionar-questao `);
    
      
    for(let i = 0; i < desabilitarClick.length; i++){
        desabilitarClick[i].addAttribute("onclick");
        desabilitarClick[i].classList.remove('esbranquicado');
    }

    for(let i = 0; i < selecionado.length; i++){
        console.log(selecionado[i].dataset.verificar);
        if(selecionado[i].dataset.verificar === 'true'){
            selecionado[i].classList.remove('acertou');
        }else{
            selecionado[i].classList.remove('errou');
        }
    }
}

function rolagem(){
    window.scrollBy(0, 680);
}
function mostrarResultador(){
    let arrayNivel = [];
    percentualAcertos = Math.round((acertos / verificarTamanhoNiveis) * 100);

    let nivel = quizRetornado.levels;
    for(let i = 0; i < nivel.length; i++){
        if(nivel[i].minValue >= percentualAcertos){
            arrayNivel.push(nivel[i]);
        }
        
    }
    
    
    let perguntas = document.querySelector('.tela2');
    
    perguntas.innerHTML += `
    <div class="finalizacao-quiz">
        <div class="pontuacao">
            <span data-test="level-title">${percentualAcertos}% de acerto: ${arrayNivel[0].title}</span>
        </div>
        <div class="cont-descricao">
            <img data-test="level-img" src="${arrayNivel[0].image}">
            <span data-test="level-text">${arrayNivel[0].text}</span>
        </div>
        <button data-test="restart" onclick="reiniciarQuiz()" class="reiniciar">Reiniciar Quizz</button> 
        <span data-test="go-home" onclick="voltarHome()" class="voltar-home">Voltar para home</span> 
    </div>
`;
}

function verificar(resposta, verdadeiroOuFalso){
    let selecionado = document.querySelectorAll(`.container-perguntas.id-${[contador]} .selecionar-questao span`);
    let desabilitarClick = document.querySelectorAll(`.container-perguntas.id-${[contador]} .selecionar-questao `);
    
      
    for(let i = 0; i < desabilitarClick.length; i++){
        desabilitarClick[i].removeAttribute("onclick");
        desabilitarClick[i].classList.add('esbranquicado');
    }

    for(let i = 0; i < selecionado.length; i++){
        console.log(selecionado[i].dataset.verificar);
        if(selecionado[i].dataset.verificar === 'true'){
            selecionado[i].classList.add('acertou');
        }else{
            selecionado[i].classList.add('errou');
        }
    }
    
    //para calcular taxa de acerto depois
    if(verdadeiroOuFalso){
        acertos++;
    }
    
    contador++;

    resposta.classList.remove('esbranquicado');
    
    
    console.log("contador " + contador);
    console.log("Niveis " + verificarTamanhoNiveis);
    console.log("acertos " + acertos);
   if(contador === verificarTamanhoNiveis){
        mostrarResultador();
   }

}

function selecionar(resposta){
    resposta.removeAttribute("onclick");
    resposta.classList.add('selecionado');
    setTimeout(rolagem, 2000);
    
}

function irParaQuizz(resposta) {
    window.scroll(0, 0);
    //gera as perguntas em ordem aleatoria escondendo a primeira tela e mostrando a segunda
    quizRetornado = resposta.data;
    
    let quizSelecionado = resposta.data;
   
    console.log(quizSelecionado);

    let perguntas = document.querySelector('.tela2');
    perguntas.innerHTML = '';
    
    perguntas.innerHTML += `
        <div data-test="banner"  class="imagem-cabecalho gradiente-opacity">
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
    

        perguntas.innerHTML += `
            <div data-test="question" onclick="selecionar(this)" class="container-perguntas  id-${[i]}">
                <div data-test="question-title" class="titulo-pergunta">${quizSelecionado.questions[i].title}</div>
                <div class="caixa-questoes">
                    <div data-test="answer" onclick="verificar(this, ${sortearRespostas[0].isCorrectAnswer})" class="selecionar-questao">
                        <img  src="${sortearRespostas[0].image}">
                        <span data-test="answer-text" data-verificar="${sortearRespostas[0].isCorrectAnswer}">${sortearRespostas[0].text}</span>
                    </div>
                    <div  data-test="answer" onclick="verificar(this, ${sortearRespostas[1].isCorrectAnswer})" class="selecionar-questao">
                        <img  src="${sortearRespostas[1].image}">
                        <span data-test="answer-text" data-verificar="${sortearRespostas[1].isCorrectAnswer}">${sortearRespostas[1].text}</span>
                    </div>
                    <div data-test="answer" onclick="verificar(this, ${sortearRespostas[2].isCorrectAnswer})"  class="selecionar-questao">
                        <img src="${sortearRespostas[2].image}">
                        <span data-test="answer-text" data-verificar="${sortearRespostas[2].isCorrectAnswer}">${sortearRespostas[2].text}</span>
                    </div>
                    <div data-test="answer" onclick="verificar(this, ${sortearRespostas[3].isCorrectAnswer})" class="selecionar-questao">
                        <img src="${sortearRespostas[3].image}">
                        <span data-test="answer-text" data-verificar="${sortearRespostas[3].isCorrectAnswer}">${sortearRespostas[3].text}</span>
                    </div>
            </div>
        `;

    }
   

verificarTamanhoNiveis = quizSelecionado.questions.length;

}

function comparador(){
    return Math.random() - 0.5;
}
//!-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=CRIAÇÃO DO QUIZZ=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
let informacaoDoQuizz =[];
let perguntas = [];
let nivel = [];
let quizes = [];
let quizesStr = "";
let questoes = [];
let numeroptg;
let numeronivel;
let NomeQuizz;
let ImgQuizz;
let QtdPerguntasQuizz;
let QtdNivelQuizz;

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

function imagemValida(imagem) {
    let url;
    try {
        url = new URL(imagem);
    } catch (_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}


function CriarPerguntas(){

    NomeQuizz = document.querySelector('.NomeQuizz').value;
    ImgQuizz = document.querySelector('.ImgQuizz').value;
    QtdPerguntasQuizz = document.querySelector('.QtdPerguntasQuizz').value;
    QtdNivelQuizz = document.querySelector('.QtdNivelQuizz').value;

    numeroptg = QtdPerguntasQuizz;
    numeronivel = QtdNivelQuizz;

    if(NomeQuizz.length >= 20 && NomeQuizz.length <= 65 && QtdPerguntasQuizz >=3 && QtdNivelQuizz>=2 && imagemValida(ImgQuizz)){

        informacaoDoQuizz = {nome: NomeQuizz, 
                             imagem: ImgQuizz, 
                             perguntas:QtdPerguntasQuizz, 
                             nivel:QtdNivelQuizz};

        const pag3_1 = document.querySelector('.pag3_1');
        const pag3_2 = document.querySelector('.pag3_2');
        const pag3_3 = document.querySelector('.pag3_3');
        const pag3_4 = document.querySelector('.pag3_4');

        pag3_2.innerHTML = "";
        pag3_3.innerHTML = "";
        pag3_4.innerHTML = "";

        pag3_2.innerHTML += `<h1 class="titulo margintop">Crie suas perguntas</h1>`;
        pag3_3.innerHTML += `<h1 class="titulo margintop">Agora, decida os níveis! </h1>`;
        pag3_4.innerHTML += `<h1 class="titulo margintop">Seu quizz está pronto!</h1>`

        for(let i = 0; i < QtdPerguntasQuizz; i++){
           if(i === 0){
            pag3_2.innerHTML +=
                                ` 
                                <div data-test="question-ctn">
                                    <div class="aba">
                                        <h1 class="titulo">Pergunta ${i+1}</h1>
                                        <ion-icon data-test="toggle" onclick="AbrirPerguntas(${i})" name="create-outline"></ion-icon>
                                    </div>
                                    <div class="containerInputs pergunta">
                                        <div class="inputs">
                                            <input data-test="question-input" type="text" value="" class="input pergunta${i}" minlength="20" placeholder="Texto da pergunta">
                                            <input data-test="question-color-input" type="text" class="input cor${i}" placeholder="Cor de fundo da pergunta">
                                        </div>
                                        <div class="inputs">
                                            <h1 class="titulo">Resposta correta</h1>
                                            <input data-test="correct-answer-input" type="text" value="" class="input respostaCorreta${i}" minlength="1" placeholder="Resposta correta">
                                            <input data-test="correct-img-input" type="url" value="" class="input URLrespostaCorreta${i}" placeholder="URL da imagem">
                                        </div>
                                        <div class="inputs">
                                            <h1 class="titulo">Respostas incorretas</h1>
                                            <input data-test="wrong-answer-input" type="text" value="" class="input respostaIncorreta${i}_1" placeholder="Resposta incorreta 1">
                                            <input data-test="wrong-img-input" type="url" value="" class="input URLrespostaIncorreta${i}_1" placeholder="URL da imagem 1">
                                        </div>
                                        <div class="inputs">
                                            <input data-test="wrong-answer-input" type="text" value="" class="input respostaIncorreta${i}_2" placeholder="Resposta incorreta 2">
                                            <input data-test="wrong-img-input" type="url" value="" class="input URLrespostaIncorreta${i}_2" placeholder="URL da imagem 2">
                                        </div>
                                        <div class="inputs">
                                            <input data-test="wrong-answer-input" type="text" value="" class="input respostaIncorreta${i}_3" placeholder="Resposta incorreta 3">
                                            <input data-test="wrong-img-input" type="url" value="" class="input URLrespostaIncorreta${i}_3" placeholder="URL da imagem 3">
                                        </div>
                                    </div>
                                </div>
                                `;
           }
           else{
            pag3_2.innerHTML +=
            ` 
            <div data-test="question-ctn">
                <div class="aba">
                    <h1 class="titulo">Pergunta ${i+1}</h1>
                    <ion-icon data-test="toggle" onclick="AbrirPerguntas(${i})" name="create-outline"></ion-icon>
                </div>
                <div class="containerInputs pergunta escondido">
                    <div class="inputs">
                        <input data-test="question-input" type="text" value="" class="input pergunta${i}" minlength="20" placeholder="Texto da pergunta">
                        <input data-test="question-color-input" type="text" class="input cor${i}" placeholder="Cor de fundo da pergunta">
                    </div>
                    <div class="inputs">
                        <h1 class="titulo">Resposta correta</h1>
                        <input data-test="correct-answer-input" type="text" value="" class="input respostaCorreta${i}" minlength="1" placeholder="Resposta correta">
                        <input data-test="correct-img-input" type="url" value="" class="input URLrespostaCorreta${i}" placeholder="URL da imagem">
                    </div>
                    <div class="inputs">
                        <h1 class="titulo">Respostas incorretas</h1>
                        <input data-test="wrong-answer-input" type="text" value="" class="input respostaIncorreta${i}_1" placeholder="Resposta incorreta 1">
                        <input data-test="wrong-img-input" type="url" value="" class="input URLrespostaIncorreta${i}_1" placeholder="URL da imagem 1">
                    </div>
                    <div class="inputs">
                        <input data-test="wrong-answer-input" type="text" value="" class="input respostaIncorreta${i}_2" placeholder="Resposta incorreta 2">
                        <input data-test="wrong-img-input" type="url" value="" class="input URLrespostaIncorreta${i}_2" placeholder="URL da imagem 2">
                    </div>
                    <div class="inputs">
                        <input data-test="wrong-answer-input" type="text" value="" class="input respostaIncorreta${i}_3" placeholder="Resposta incorreta 3">
                        <input data-test="wrong-img-input" type="url" value="" class="input URLrespostaIncorreta${i}_3" placeholder="URL da imagem 3">
                    </div>
                </div>
            </div>
            `;
           }
        }
        for(let i = 0; i < QtdNivelQuizz; i++){
            if(i===0){
            pag3_3.innerHTML +=
            `
            <div data-test="level-ctn">
                <div class="aba">
                    <h1 class="titulo">Nivel ${i+1}</h1>
                    <ion-icon onclick="AbrirNivel(${i})" data-test="toggle" name="create-outline"></ion-icon>
                </div>
                <div class="inputs nivel">                                   
                    <input data-test="level-input" value="" type="text" class="input tituloNivel${i}" minlength="10" placeholder="Título do nível">
                    <input data-test="level-percent-input" value="" type="number" class="input porcentagemNivel${i}" min="0" max="100" placeholder="% de acerto mínima">
                    <input data-test="level-img-input" value="" type="url" class="input imagemNivel${i}" placeholder="URL da imagem do nível">
                    <input data-test="level-description-input" value="" type="text" class="input descricaoNivel${i}" minlength="30" placeholder="Descrição do nível">
                </div>
            </div>
            `;
            }
            else{
                pag3_3.innerHTML +=
                               `
                               <div data-test="level-ctn">
                                    <div class="aba">
                                        <h1 class="titulo">Nivel ${i+1}</h1>
                                        <ion-icon onclick="AbrirNivel(${i})" data-test="toggle" name="create-outline"></ion-icon>
                                    </div>
                                    <div class="inputs nivel escondido">                                   
                                        <input data-test="level-input" value="" type="text" class="input tituloNivel${i}" minlength="10" placeholder="Título do nível">
                                        <input data-test="level-percent-input" value="" type="number" class="input porcentagemNivel${i}" min="0" max="100" placeholder="% de acerto mínima">
                                        <input data-test="level-img-input" value="" type="url" class="input imagemNivel${i}" placeholder="URL da imagem do nível">
                                        <input data-test="level-description-input" value="" type="text" class="input descricaoNivel${i}" minlength="30" placeholder="Descrição do nível">
                                    </div>
                                </div>
                                `;
            }
        }
        pag3_2.innerHTML += 
                        `<div class="BotaoVermelho Tela3_ParaNives" data-test="go-create-levels" onclick="CriarNives()">Prosseguir pra criar níveis</div>`;
        pag3_3.innerHTML +=
                        ` <div class="BotaoVermelho Tela3_FinalizarQuizz" data-test="finish" onclick="AddQuizz()">Finalizar Quizz</div>`;
        pag3_4.innerHTML += `
                        <div data-test="success-banner" class="caixaQuizz centralizar">
                            <img class="thumbnailQuizz" src="${informacaoDoQuizz.imagem}">
                            <span class="tituloQuizz">${informacaoDoQuizz.nome}</span>
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
    const hex =['a','b','c','d','e','f','A','B','C','D','E','F','0','9','8','7','6','5','4','3','2','1'];
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
    
    if(pergunta.length >= 20 && cor[0]=='#' && respostaCorreta !='' && respostaIncorreta_1 != '' && hex.indexOf(cor[1]) > 0 && 
    hex.indexOf(cor[2]) > 0 && hex.indexOf(cor[3]) > 0 && hex.indexOf(cor[4]) > 0 && hex.indexOf(cor[5]) > 0 && hex.indexOf(cor[6]) > 0){
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

                let resposta0 = {
                                text:respostaCorreta,
                                image:URLrespostaCorreta,
                                isCorrectAnswer:true
                                };

                let resposta1 = {
                                text:respostaIncorreta_1,
                                image:URLrespostaIncorreta_1,
                                isCorrectAnswer:false
                                };
                
                let resposta2 = {
                                text:respostaIncorreta_2,
                                image:URLrespostaIncorreta_2,
                                isCorrectAnswer:false
                                };
                let resposta3 = {
                                text:respostaIncorreta_3,
                                image:URLrespostaIncorreta_3,
                                isCorrectAnswer:false
                                };
                let resposta = [];

                resposta.push(resposta0);
                resposta.push(resposta1);

                if(resposta2.text != ""){
                    resposta.push(resposta2);
                }
                if(resposta3.text != ""){
                    resposta.push(resposta3);
                }
                let toSurtando ={
                                title:pergunta,
                                color:cor,
                                answers:resposta
                                };
                questoes.push(toSurtando);
                
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

function addOk(res){
    id = res.data.id;
    if (localStorage.getItem("arrayLocal") !== null) {
        let listaLocalStr = localStorage.getItem("arrayLocal");
        let listaLocalArray = JSON.parse(listaLocalStr);
        listaLocalArray.push(id);
        listaLocalStr = JSON.stringify(listaLocalArray);
        localStorage.removeItem("arrayLocal");
        localStorage.setItem("arrayLocal", listaLocalStr);
    } else {
        let idComoArray = [id];
        idComoArray = JSON.stringify();
        localStorage.setItem("arrayLocal", idComoArray);
    }

    return id;
}

function AddQuizz(){
    let contador = 0;
    let temZero = 0;
    for (let i = 0; i < numeronivel; i++) {
        let tituloNivel = document.querySelector(`.tituloNivel${i}`).value;
        let porcentagemNivel = document.querySelector(`.porcentagemNivel${i}`).value;
        let imagemNivel = document.querySelector(`.imagemNivel${i}`).value;
        let descricaoNivel = document.querySelector(`.descricaoNivel${i}`).value;
        if (porcentagemNivel[i] == 0) {
            temZero = 1;
        }
        if (tituloNivel.length < 10 || !imagemValida(imagemNivel) || descricaoNivel.legnth < 30 || temZero == 0 || porcentagemNivel < 0 || porcentagemNivel > 100) {
            alert('Confira os dados');
            return;
        }
    }
    for(let c = 0; c < numeronivel; c++){
        let tituloNivel = document.querySelector(`.tituloNivel${c}`).value;
        let porcentagemNivel = document.querySelector(`.porcentagemNivel${c}`).value;
        let imagemNivel = document.querySelector(`.imagemNivel${c}`).value;
        let descricaoNivel = document.querySelector(`.descricaoNivel${c}`).value;
        
        if(tituloNivel.length >= 10 && descricaoNivel.length >= 30){
            let x ={
                    title: tituloNivel,
                    image: imagemNivel,
                    text:descricaoNivel,
                    minValue: porcentagemNivel
                    }

            nivel.push(x);
        }
        else{
            alert('Confira os dados');
            return;
        }
        if(porcentagemNivel[c] == 0){
            contador++;
        }
    }

    if(contador === 0){
        alert("Confira os dados");
        return;
    }
    else if(contador > 1){
        alert("Confira os dados");
        return;
    }
    else{
        let z = {
            title:informacaoDoQuizz.nome,
            image:informacaoDoQuizz.imagem,
            questions:questoes,
            levels:nivel
        };

        console.log(z);
        quizes.push(z);
        console.log(quizes);

        let promessa = axios.post('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes',z);
        promessa.then(addOk);
        
        quizesStr = JSON.stringify(quizes);
        localStorage.setItem("id", quizesStr)

        const pag3_3 = document.querySelector('.pag3_3');
        pag3_3.classList.add('escondido');

        const pag3_4 = document.querySelector('.pag3_4');
        pag3_4.classList.remove('escondido');
    }
}

function voltarHome(){
    window.scroll(0, 0);
    window.location.reload();

    puxarQuizz();

    const tela1 = document.querySelector('.tela1');
    tela1.classList.remove('escondido');

    const tela2 = document.querySelector('.tela2');
    tela2.classList.add('escondido');

    const tela3 = document.querySelector('.tela3');
    tela3.classList.add('escondido');
}

function jogarQuizz(){
    //?Função que faz o quizz rodar com o novo quizz como argumento
    const tela3 = document.querySelector('.tela3');
    tela3.classList.add('escondido');
    selecionarQuizz(id);
}

//!-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=Começar quiz=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
