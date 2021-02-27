const dadosCateg = document.getElementById('dadosCategoria');
const formularioCat = document.getElementById('formCadCateg');
const descCat = document.getElementById('descCat');

const modalEditCategoria = document.getElementById('modal-editCategoria');
const descCatEdit = document.getElementById('descCatEdit');
const formEditCategoria = document.getElementById('formEditCategoria');
const msgCateg = document.getElementById('msgCateg');
const contentEditCateg = document.getElementById('contentEditCateg');

async function categorias() {
    categ = await requestFetchWithGet('../model/selCategorias.php');
    dadosCateg.innerHTML = ""

    categ.forEach(resultado => {
        let btnEditar = document.createElement('button');
        let btnExcluir = document.createElement('button');
        let linha = document.createElement('tr');
        let colunDesc = document.createElement('td');
        let colunEditar = document.createElement('td');
        let colunExcluir = document.createElement('td');

        btnEditar.innerHTML = "Editar";
        btnEditar.setAttribute('value', resultado.DESCR);
        btnEditar.setAttribute('id', resultado.ID);
        btnEditar.setAttribute('class', 'btnAcao');
        btnEditar.setAttribute('onclick', 'editCategoria(this)');

        btnExcluir.innerHTML = "Excluir";
        btnExcluir.setAttribute('value', resultado.DESCR);
        btnExcluir.setAttribute('id', resultado.ID);
        btnExcluir.setAttribute('class', 'btnAcao');
        btnExcluir.setAttribute('onclick', 'deleteCategoria(this)');

        linha.setAttribute('class', 'linhaCateg');

        colunDesc.innerHTML = resultado.DESCR;
        colunEditar.appendChild(btnEditar);
        colunExcluir.appendChild(btnExcluir);

        linha.appendChild(colunDesc);
        linha.appendChild(colunEditar);
        linha.appendChild(colunExcluir);
        dadosCateg.appendChild(linha);

    });
}

async function categRequest(url, config) {
    let resposta = await requestFetchWithPost(url, config);

    if (resposta != "erro") {
        if (resposta == "Limite excedido" || resposta == "Dados Invalidos") {
            window.alert("Dados Inválidos");
        } else if (resposta == "sem update") {
            descCat.value = "";
            categorias();

            msgCateg.innerHTML = "Sem alterações!";
            msgCateg.removeAttribute("hidden");
            formEditCategoria.setAttribute("hidden", "true");

        } else {
            descCat.value = "";
            categorias();

            msgCateg.innerHTML = "Alteração realizada!";
            msgCateg.removeAttribute("hidden");
            formEditCategoria.setAttribute("hidden", "true");
        }
    }
}

formularioCat.addEventListener('submit', e => {
    e.preventDefault();
    const dadosCat = new FormData(formularioCat);

    let url = '../model/insertCategoria.php';
    let config = {
        method: "POST",
        body: dadosCat
    }
    if (dadosCat.get('desc').length > 27) {
        window.alert("Limite de caracteres excedido!!!");

    } else {
        categRequest(url, config);
    }
})

categorias();

async function editCategoria(object) {

    if (modalEditCategoria) {
        modalEditCategoria.classList.add('mostrar');
        modalEditCategoria.addEventListener('click', (e) => {
            if (e.target.id == 'modal-editCategoria' || e.target.className == 'fecharEditCategoria') {
                modalEditCategoria.classList.remove('mostrar');
                contentEditCateg.innerHTML = "";
            }
        });
        formEditCategoria.removeAttribute("hidden");
        msgCateg.setAttribute("hidden", "true");
        descCatEdit.value = object.value;
        descCatEdit.focus();

        categ = await requestFetchWithGet('../model/selCategorias.php?id=' + object.id);
        contentEditCateg.insertAdjacentHTML("afterbegin", "<input type='text' name='id' value='" + categ.ID +
            "' size='10' readonly='true' hidden='true'>" + "<input type='text' name='cript' value='" +
            categ[0] + "' hidden>");
    }
}

formEditCategoria.addEventListener("submit", e => {
    e.preventDefault();
    const dadosCat = new FormData(formEditCategoria);

    let url = '../model/editCategoria.php';
    let config = {
        method: "POST",
        body: dadosCat
    }
    if (dadosCat.get('desc').length > 27) {
        window.alert("Limite de caracteres excedido!!!");

    } else {
        categRequest(url, config);
    }
})

async function deleteCategoria(object) {
    categ = await requestFetchWithGet('../model/selCategorias.php?id=' + object.id);

    let excluir = confirm("Deseja deletar a categoria " + categ.DESCR + "?");
    if (excluir == true) {
        await requestFetchWithGet('../model/deleteCategoria.php?id=' + object.id);
        categorias();
    } else {
        
    }

}