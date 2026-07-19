//variaveis globais
const inputTarefa = document.querySelector('#novaTarefa');
const btAdcionar = document.querySelector('.btAdicionar');
const tarefas = document.querySelector('.tarefas');


//botão de evento
btAdcionar.addEventListener('click', criarNovaTarefa);

//função que atualiza a tela
function criarNovaTarefa() {
    const texto = inputTarefa.value.trim();

    if (!validarTarefa(texto)) {
        return;
    }

    criandoElemento(texto);
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

    clickCheck(inputCheckBox, tarefa);

};

//função que limpa os campos
function limpandoCampo() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

function clickCheck(inputCheckBox, tarefa) {

}