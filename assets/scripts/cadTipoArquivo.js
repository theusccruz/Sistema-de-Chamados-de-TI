const dadosEditTipoArquivo = document.getElementById('dadosEditTipoArquivo');
const formCadTipoArq = document.getElementById('formCadTipoArq');
const descTipoTA = document.getElementById('descTipoTA');
const descExtTA = document.getElementById('descExtTA');

const modalEditTipoArq = document.getElementById('modal-editTipoArquivo');
const descExtEdit = document.getElementById('descExtEdit');
const descTipoEdit = document.getElementById('descTipoEdit');
const formEditTipoArquivo = document.getElementById('formEditTipoArquivo');
const msgTipoArquivo = document.getElementById('msgTipoArquivo');
const contentEditTipoArquivo = document.getElementById('contentEditTipoArquivo');

async function tiposArquivos() {
    tipoArq = await requestFetchWithGet('../model/selTiposArquivo.php');
    dadosEditTipoArquivo.innerHTML = ""

    tipoArq.forEach(resultado => {
        let btnEditar = document.createElement('button');
        let btnExcluir = document.createElement('button');
        let linha = document.createElement('tr');
        let colunId = document.createElement('td');        
        let colunTipo = document.createElement('td');        
        let colunExt = document.createElement('td');
        let colunEditar = document.createElement('td');
        let colunExcluir = document.createElement('td');

        btnEditar.innerHTML = "Editar";
        btnEditar.setAttribute('value', resultado.TIPO);
        btnEditar.setAttribute('name', resultado.EXTENSAO);
        btnEditar.setAttribute('id', resultado.ID);
        btnEditar.setAttribute('class', 'btnAcao');
        btnEditar.setAttribute('onclick', 'editTipoArquivo(this)');

        btnExcluir.innerHTML = "Excluir";
        btnExcluir.setAttribute('value', resultado.TIPO);
        btnExcluir.setAttribute('id', resultado.ID);
        btnExcluir.setAttribute('class', 'btnAcao');
        btnExcluir.setAttribute('onclick', 'deleteTipoArquivo(this)');

        linha.setAttribute('class', 'linhaCateg');

        colunId.innerHTML = resultado.ID;
        colunTipo.innerHTML = resultado.TIPO;
        colunExt.innerHTML = resultado.EXTENSAO;
        colunEditar.appendChild(btnEditar);
        colunExcluir.appendChild(btnExcluir);

        linha.appendChild(colunId);
        linha.appendChild(colunTipo);
        linha.appendChild(colunExt);
        linha.appendChild(colunEditar);
        linha.appendChild(colunExcluir);
        dadosEditTipoArquivo.appendChild(linha);

    });
}

async function tipoArqRequest(url, config) {
    let resposta = await requestFetchWithPost(url, config);

    if (resposta != "erro") {
        if (resposta == "Limite excedido" || resposta == "Dados Invalidos") {
            window.alert("Dados Inválidos");
        } else if (resposta == "sem update") {
            descTipoTA.value = "";
            descExtTA.value = "";
            tiposArquivos();

            msgTipoArquivo.innerHTML = "Sem alterações!";
            msgTipoArquivo.removeAttribute("hidden");
            formEditTipoArquivo.setAttribute("hidden", "true");

        } else {
            descTipoTA.value = "";
            descExtTA.value = "";
            tiposArquivos();

            msgTipoArquivo.innerHTML = "Alteração realizada!";
            msgTipoArquivo.removeAttribute("hidden");
            formEditTipoArquivo.setAttribute("hidden", "true");
        }
    }
}

formCadTipoArq.addEventListener('submit', e => {
    e.preventDefault();
    const dadosTA = new FormData(formCadTipoArq);

    let url = '../model/insertTipoArquivo.php';
    let config = {
        method: "POST",
        body: dadosTA
    }
    if (dadosTA.get('tipo').length > 35 || dadosTA.get('ext').length > 10) {
        window.alert("Limite de caracteres excedido!!!");

    } else {
        tipoArqRequest(url, config);
    }
})

tiposArquivos();

async function editTipoArquivo(object) {

    if (modalEditTipoArq) {
        modalEditTipoArq.classList.add('mostrar');
        modalEditTipoArq.addEventListener('click', (e) => {
            if (e.target.id == 'modal-editTipoArquivo' || e.target.className == 'fecharEditTipoArquivo') {
                modalEditTipoArq.classList.remove('mostrar');
                contentEditTipoArquivo.innerHTML = "";
            }
        });
        formEditTipoArquivo.removeAttribute("hidden");
        msgTipoArquivo.setAttribute("hidden", "true");
        descExtEdit.value = object.name;
        descTipoEdit.value = object.value;
        descTipoEdit.focus();

        tipo = await requestFetchWithGet('../model/selTiposArquivo.php?id=' + object.id);
        contentEditTipoArquivo.insertAdjacentHTML("afterbegin", "<input type='text' name='id' value='" + tipo.ID +
            "' size='10' readonly='true' hidden='true'>" + "<input type='text' name='cript' value='" +
            tipo[0] + "' hidden>");
    }
}

formEditTipoArquivo.addEventListener("submit", e => {
    e.preventDefault();
    const dadosEditTA = new FormData(formEditTipoArquivo);

    let url = '../model/editTipoArquivo.php';
    let config = {
        method: "POST",
        body: dadosEditTA
    }
    if (dadosEditTA.get('tipo').length > 35 || dadosEditTA.get('ext').length > 10) {
        window.alert("Limite de caracteres excedido!!!");

    } else {
        tipoArqRequest(url, config);
    }
})

async function deleteTipoArquivo(object) {
    tipo = await requestFetchWithGet('../model/selTiposArquivo.php?id=' + object.id);

    let excluir = confirm("Deseja deletar esse tipo de arquivo " + tipo.TIPO + "?");
    if (excluir == true) {
        await requestFetchWithGet('../model/deleteTipoArquivo.php?id=' + object.id);
        tiposArquivos();
    } else {
        
    }

}