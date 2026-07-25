//variaveis globais
const inputTarefa = document.querySelector('#novaTarefa');
const btAdcionar = document.querySelector('.btAdicionar');
const tarefas = document.querySelector('.tarefas');
const dadosDasTarefas = [];
let numeroArray = 0;


//botão de evento
btAdcionar.addEventListener('click', criarNovaTarefa);
inputTarefa.addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        criarNovaTarefa();
    };
});
//Função para restaurar os dados quando aba for aberta novamente!
restarandoLocalStorage();

//função que atualiza a tela
function criarNovaTarefa() {
    const texto = inputTarefa.value.trim();


    if (!validarTarefa(texto)) {
        return;
    }

    //salvo o dado
    salvandoDados(texto);
    limpandoCampo();

};

// função de validação de campo
function validarTarefa(texto) {
    return texto !== ''
};

//função que cria o elemento
function criandoElemento(dadosArray) {
    for (let i in dadosArray) {
        const tarefa = document.createElement('li');
        tarefa.classList.add('tarefa');
        tarefa.setAttribute('data-key', `${dadosArray[i].id}`);

        const inputCheckBox = document.createElement('input');
        inputCheckBox.type = 'checkbox';
        inputCheckBox.value = 'check';

        const textTarefa = document.createElement('span');
        textTarefa.textContent = dadosArray[i].texto;

        const btExcluir = document.createElement('button');
        btExcluir.classList.add('btExcluir');

        const img = document.createElement('img');
        img.src = "assets/delete.png"
        btExcluir.append(img);

        tarefa.append(inputCheckBox, textTarefa, btExcluir);
        tarefas.append(tarefa);

        if (dadosArray[i].check) {
            tarefa.querySelector('span').style.textDecoration = 'line-through';
            tarefa.style.opacity = 0.5;
            inputCheckBox.checked = true;
        }

        clickCheck(inputCheckBox, tarefa);
        excluirTarefa(btExcluir, tarefa)
    };

};

//função que limpa os campos
function limpandoCampo() {
    inputTarefa.value = '';
    inputTarefa.focus();
};

//função que verifica se a tarefa já foi concluida
//Nessa função salvamos também o historico do check
function clickCheck(inputCheckBox, tarefa) {
    let li = '';
    let keyCheck = 0;
    let dadosCheck = '';
    inputCheckBox.addEventListener('click', (event) => {
        if (inputCheckBox.checked) {

            tarefa.querySelector('span').style.textDecoration = 'line-through';
            tarefa.style.opacity = 0.5;

            li = event.target.closest('li');
            keyCheck = Number(li.getAttribute('data-key'));

            dadosCheck = dadosDasTarefas.map(checkItem => {
                if (checkItem.id == keyCheck) {
                    checkItem.check = true;
                };
                return checkItem;
            });
        } else {
            tarefa.querySelector('span').style = '';
            tarefa.style.opacity = 1;

            li = event.target.closest('li');
            keyCheck = Number(li.getAttribute('data-key'));

            dadosCheck = dadosDasTarefas.map(checkItem => {
                if (checkItem.id == keyCheck && checkItem.check == true) {
                    checkItem.check = false
                }
                return checkItem
            });
        };

        dadosDasTarefas.length = 0
        dadosDasTarefas.push(...dadosCheck);
        localStorage.clear();
        localStorage.setItem('tarefaUser', JSON.stringify(dadosDasTarefas));
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
    dadosDasTarefas.push(
        { id: numeroArray, texto: tarefa, check: false }
    );
    localStorage.setItem('tarefaUser', JSON.stringify(dadosDasTarefas));

    let ultimoArray = dadosDasTarefas.at(-1);
    criandoElemento([ultimoArray]);

    numeroArray++
    semTarefaCadastrada();

};

//função que exclui do array e mostra a mensagem se nada tiver na tela
function excluindoDados(key) {
    let dadosArray = dadosDasTarefas.filter(item => item.id !== key);
    dadosDasTarefas.length = 0;
    dadosDasTarefas.push(...dadosArray);

    let dadosStorange = JSON.parse(localStorage.getItem('tarefaUser'));
    let storageAtualizado = dadosStorange.filter(item => item.id !== key);
    localStorage.setItem('tarefaUser', JSON.stringify(storageAtualizado));

    if (dadosDasTarefas.length > 0) {
        numeroArray = dadosDasTarefas.at(-1).id + 1;
    }
    semTarefaCadastrada();
};

//função que mostra um texto na tela se não tiver nenhuma tarefa cadastrada.
function semTarefaCadastrada() {
    let dados = dadosDasTarefas.length
    if (dados === 0) {
        let msg = document.createElement('li');
        msg.classList.add('msg');
        msg.textContent = 'Nenhuma tarefa cadastrada';
        numeroArray = 0;
        localStorage.clear();
        tarefas.append(msg);
    } else if (tarefas.querySelector('.msg') !== null) {
        tarefas.querySelector('.msg').remove();
    };
};

function restarandoLocalStorage() {
    const tarefasSalvas = JSON.parse(localStorage.getItem('tarefaUser')) || [];
    dadosDasTarefas.push(...tarefasSalvas);

    //verificação para atualiza o numero do array e tarefa
    if (dadosDasTarefas.length > 0) {
        numeroArray = dadosDasTarefas.at(-1).id + 1;
    };

    criandoElemento(dadosDasTarefas);
    semTarefaCadastrada();
};