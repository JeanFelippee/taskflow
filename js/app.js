//variaveis globais
const inputTarefa = document.querySelector('#novaTarefa');
const btAdcionar = document.querySelector('.btAdicionar');
const tarefas = document.querySelector('.tarefas');
const dadosDasTarefas = [];
let numero = 0;
let numeroArray = 0;


//botão de evento
btAdcionar.addEventListener('click', criarNovaTarefa);
inputTarefa.addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        criarNovaTarefa();
    }
});

semTarefaCadastrada();

//função que atualiza a tela
function criarNovaTarefa() {
    const texto = inputTarefa.value.trim();


    if (!validarTarefa(texto)) {
        return;
    }

    criandoElemento(texto);
    salvandoDados(texto);
    limpandoCampo();

}

// função de validação de campo
function validarTarefa(texto) {
    return texto !== ''
}

//função que cria o elemento
function criandoElemento(texto) {
    const tarefa = document.createElement('li');
    tarefa.classList.add('tarefa');
    tarefa.setAttribute('data-key', `${numero}`);

    const inputCheckBox = document.createElement('input');
    inputCheckBox.type = 'checkbox';
    inputCheckBox.value = 'check';

    const textTarefa = document.createElement('span');
    textTarefa.textContent = texto;

    const btExcluir = document.createElement('button');
    btExcluir.classList.add('btExcluir');

    const img = document.createElement('img');
    img.src = "assets/delete.png"
    btExcluir.append(img);

    tarefa.append(inputCheckBox, textTarefa, btExcluir);
    tarefas.append(tarefa);

    numero++;
    clickCheck(inputCheckBox, tarefa);
    excluirTarefa(btExcluir, tarefa)

};

//função que limpa os campos
function limpandoCampo() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

//função pra verificação da tarefa
function clickCheck(inputCheckBox, tarefa) {
    inputCheckBox.addEventListener('click', () => {
        if (inputCheckBox.checked) {
            tarefa.querySelector('span').style.textDecoration = 'line-through'
            tarefa.style.opacity = 0.5;
        } else {
            tarefa.querySelector('span').style = '';
            tarefa.style.opacity = 1;
        }
    });
};

// função de excluir tarefa
function excluirTarefa(button, tarefa) {
    button.addEventListener('click', (event) => {
        tarefa.remove();
        let li = event.target.closest('li');
        let key = Number(li.getAttribute('data-key'));
        excluindoDados(key);
    });

};

//função que salva os dados das mensagem em um array
function salvandoDados(tarefa) {
    dadosDasTarefas.push({ id: numeroArray, texto: tarefa });
    console.log(dadosDasTarefas);
    numeroArray++
    semTarefaCadastrada();

};

//função que exclui do array e mostra a mensagem se nada tiver na tela
function excluindoDados(key) {
    let dadosArray = dadosDasTarefas.filter(item => item.id !== key);
    dadosDasTarefas.length = 0;
    dadosDasTarefas.push(...dadosArray);
    console.log(dadosDasTarefas);
    semTarefaCadastrada();


};

//função que mostra um texto na tela se não tiver nenhuma tarefa cadastrada.
function semTarefaCadastrada() {
    let dados = dadosDasTarefas.length
    if (dados === 0) {
        let msg = document.createElement('li');
        msg.classList.add('msg');
        msg.textContent = 'Nenhuma tarefa cadastrada';
        numero = 0;
        numeroArray = 0;
        tarefas.append(msg);
    } else if (tarefas.querySelector('.msg') !== null) {
        tarefas.querySelector('.msg').remove();
    };
};