// oi abigos
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