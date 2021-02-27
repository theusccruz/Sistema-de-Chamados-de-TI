const modalAtribuir = document.getElementById('modal-atribuir');
const contentAtribuir = document.querySelector(".contentAtribuir");
const formAtribuir = document.querySelector("#formAtribuir");

const catAtr = document.querySelector("#catAtr");
const prioAtr = document.querySelector("#prioAtr");
const statAtr = document.querySelector("#statAtr");
const tecAtr = document.querySelector("#tecAtr");
const msgAviso = document.querySelector("#msgAviso");

async function atribuirChamado(objeto) {

    const idEditar = objeto.value;

    if (modalAtribuir) {

        modalAtribuir.classList.add('mostrar');

        modalAtribuir.addEventListener('click', (e) => {

            if (e.target.id == 'modal-atribuir' || e.target.className == 'fechar') {
                modalAtribuir.classList.remove('mostrar');
                catAtr.value = "";
                prioAtr.value = "";
                tecAtr.value = "";
                tecAtr.innerHTML = "";

            }

        });

        contentAtribuir.innerHTML = "";
        formAtribuir.removeAttribute("hidden");
        msgAviso.setAttribute("hidden", "true");

        let chamados = await requestFetchWithGet('../model/selChamadoEdit.php?id=' + idEditar);
        let tecnicos = await requestFetchWithGet('../model/selUsersTI.php');
        let userSession = await requestFetchWithGet('../model/userSession.php');

        tecnicos.forEach(tecnico => {
            if (tecnico.ID != chamados.ID_SOLICITANTE) {
                let nameTecnico = document.createElement('option');
                nameTecnico.setAttribute('value', tecnico.ID);
                nameTecnico.innerHTML = tecnico.NOME;

                if (userSession.IDUSUARIO == nameTecnico.value) {
                    nameTecnico.setAttribute('selected', 'true')
                }
                tecAtr.appendChild(nameTecnico);

            }
        });

        contentAtribuir.insertAdjacentHTML("afterbegin", "Chamado: <input type='text' class='dadosCH' name='id' value='" +
            chamados.ID + "' size='10' readonly='true'>" + "<input type='text' name='cript' value='" +
            chamados[0] + "' hidden>" +
            "Assunto: <input class='dadosCH' type='text' name='assunto' value='" +
            chamados.ASSUNTO + "' size='26' readonly='true'>" +
            "<br><br>");

        statAtr.value = chamados.STATUS;

        for (var i = 0; i < catAtr.length; i++) {
            if (catAtr[i].value == chamados.IDCAT) {
                catAtr.value = chamados.IDCAT;
            }
        }

        for (var i = 0; i < prioAtr.length; i++) {
            if (prioAtr[i].value == chamados.IDPRIORI) {
                prioAtr.value = chamados.IDPRIORI;
            }
        }

        for (var i = 0; i < tecAtr.length; i++) {
            if (tecAtr[i].value == chamados.ID_TECNICO) {
                tecAtr.value = chamados.ID_TECNICO;
            }
        }

    }
}

async function requestAtribuicao(url, config) {

    let resposta = await requestFetchWithPost(url, config);

    if (resposta != "erro") {
        if (resposta == "Dados Invalidos") {
            msgAviso.innerHTML = "Dados Inválidos!";
            msgAviso.classList.remove("msgAviso");
            msgAviso.classList.add("msgAlerta");
            msgAviso.removeAttribute("hidden");

            formAtribuir.setAttribute("hidden", "true");

        } else if (resposta == "Sem alteracoes") {
            getAllChamados();
            msgAviso.innerHTML = "Sem alterações na atribuição";
            msgAviso.classList.add("msgAviso");
            msgAviso.classList.remove("msgAlerta");
            msgAviso.removeAttribute("hidden");

            formAtribuir.setAttribute("hidden", "true");

        } else {
            getAllChamados();
            msgAviso.innerHTML = "Chamado atribuído!";
            msgAviso.classList.add("msgAviso");
            msgAviso.classList.remove("msgAlerta");
            msgAviso.removeAttribute("hidden");

            formAtribuir.setAttribute("hidden", "true");
        }
    } else {

    }
}

formAtribuir.addEventListener("submit", function (event) {
    event.preventDefault();
    const dadosAtr = new FormData(formAtribuir);
    dadosAtr.append('cat', catAtr.value);
    dadosAtr.append('prioridade', prioAtr.value);
    dadosAtr.append('tecnico', tecAtr.value);

    let url = '../model/atribuirCH.php';
    let config = {
        method: "POST",
        body: dadosAtr
    }
    requestAtribuicao(url, config);
})