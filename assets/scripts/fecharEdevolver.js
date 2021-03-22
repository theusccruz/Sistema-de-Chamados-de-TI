const modalFechar = document.getElementById('modal-fechar');
const contentFechar = document.querySelector('.contentFechar');
const formFechar = document.getElementById('formFechar');

const assuntoUser = document.querySelector("#assuntoUser");
const solicitanteUser = document.querySelector("#solicitanteUser");
const setorUser = document.querySelector("#setorUser");
const tiUser = document.querySelector("#tiUser");

const msgFechar = document.querySelector("#msgFechar");
const observacao = document.querySelector("#observacao");
const nota = document.querySelector("#nota");
const textNota = document.querySelector("#textNota");
const alerta = document.querySelector(".alerta");

const dadosUser = document.querySelector('.dados');

function eventsCampos() {
    if (nota.value < 5) {
        alerta.innerHTML = "Para nota menor que 5 a observação é obrigatória."
        observacao.setAttribute('required', true);
        observacao.focus();
    } else {
        alerta.innerHTML = "";
        observacao.removeAttribute('required');
    }
}

function fechar(objeto) {

    const idFinal = objeto.value;

    if (modalFechar) {

        modalFechar.classList.add('mostrar');

        modalFechar.addEventListener('click', (e) => {

            if (e.target.id == 'modal-fechar' || e.target.className == 'fecharResolv') {
                modalFechar.classList.remove('mostrar');
                observacao.value = "";
                nota.value = "";
                

            }
        });

        contentFechar.innerHTML = "";
        formFechar.removeAttribute("hidden");
        msgFechar.setAttribute("hidden", "true");
        nota.value = 0;
        textNota.innerHTML = nota.value;
        observacao.removeAttribute('required');
        alerta.innerHTML = ""

        fetch('../model/selUsuariosGrid.php', {

                method: 'GET'
            })
            .then(response => {
                response.json()

                    .then(dadosUsuario => {

                        fetch('../model/selChamadoEdit.php?id=' + idFinal, {

                            method: 'GET'

                        }).then(response2 => {
                            response2.json()

                                .then(dadosChamado => {

                                    dadosUsuario.forEach(retornoUsuario => {

                                        if (retornoUsuario.id == dadosChamado.id_solicitante) {

                                            dadosChamado.id_solicitante = retornoUsuario.nome;
                                            dadosChamado.id_departamento = retornoUsuario.setor;
                                        }

                                        if (retornoUsuario.id == dadosChamado.id_tecnico) {

                                            dadosChamado.id_tecnico = retornoUsuario.nome;
                                        }

                                    })


                                    contentFechar.insertAdjacentHTML("afterbegin", "Chamado: <input type='text' class='dadosCH' name='id' value='" + dadosChamado.id +
                                        "' size='10' readonly='true'>" + "<input type='text' name='cript' value='" +
                                        dadosChamado[0] + "' hidden>" + "<br><br>");

                                    assuntoUser.innerHTML = dadosChamado.assunto;
                                    solicitanteUser.innerHTML = dadosChamado.id_solicitante;
                                    setorUser.innerHTML = dadosChamado.id_departamento;
                                    tiUser.innerHTML = dadosChamado.id_tecnico;



                                })

                        })
                    })
            })

    }

}

async function requestFecharCH(url, config) {

    let resposta = await requestFetchWithPost(url, config);

    if (resposta != "erro") {
        if (resposta == "Dados Invalidos" || resposta == "Limite excedido") {
            msgFechar.innerHTML = "Dados Inválidos!";
            msgFechar.classList.remove("msgFechar");
            msgFechar.classList.add("msgAlertaFinal");
            msgFechar.removeAttribute("hidden");

            formFechar.setAttribute("hidden", "true");
        } else {
            msgFechar.innerHTML = "Chamado Fechado.";
            getAllChamados();
        }
    } else {

    }
}

nota.addEventListener('input', e => {
    textNota.innerHTML = nota.value;
});
nota.addEventListener('change', e => {
    eventsCampos();
})

formFechar.addEventListener("submit", event => {
    event.preventDefault();
    const dadosFinal = new FormData(formFechar);

    let url = '../model/fechaChamado.php';
    let config = {
        method: "POST",
        body: dadosFinal
    }

    if (dadosFinal.get('nota') < 5 && dadosFinal.get('msg') === "") {
        eventsCampos();
    } else {
        if ((dadosFinal.get('nota') > 10 || dadosFinal.get('nota') < 0) || dadosFinal.get('msg').length > 9990) {
            window.alert("Limite de caracteres excedido!!!");

        } else {
            requestFecharCH(url, config);

            msgFechar.innerHTML = "Carregando...";
            msgFechar.removeAttribute("hidden");
            formFechar.setAttribute("hidden", "true");
        }
    }
})


const modalDevolver = document.getElementById('modal-devolver');
const contentDevolver = document.querySelector('.contentDevolver');
const formDevolver = document.getElementById('formDevolver');

const motivo = document.querySelector('#motivo');

const msgDev = document.querySelector('#msgDev');


function devolver(objeto) {

    const idDevolver = objeto.value;

    if (modalDevolver) {

        modalDevolver.classList.add('mostrar');

        modalDevolver.addEventListener('click', (e) => {

            if (e.target.id == 'modal-devolver' || e.target.className == 'fecharDev') {
                modalDevolver.classList.remove('mostrar');
                motivo.value = "";
            }

        });

        contentDevolver.innerHTML = "";
        formDevolver.removeAttribute("hidden");
        msgDev.setAttribute("hidden", "true");
        motivo.focus();

        fetch('../model/selChamadoEdit.php?id=' + idDevolver, {

            method: 'GET'

        }).then(response => {
            response.json()

                .then(dadosChamado => {

                    contentDevolver.insertAdjacentHTML("afterbegin", "Chamado: <input type='text' class='dadosCH' name='id' value='" + dadosChamado.id +
                        "' size='10' readonly='true'>" + "<input type='text' name='cript' value='" +
                        dadosChamado[0] + "' hidden>" + "<br><br>");

                })
        })


    }


}

async function requestDevolverCH(url, config) {

    let resposta = await requestFetchWithPost(url, config);

    if (resposta != "erro") {
        if (resposta == "Dados Invalidos" || resposta == "Limite excedido") {
            msgDev.innerHTML = "Dados Inválidos!";
            msgDev.classList.remove("msgDev");
            msgDev.classList.add("msgAlertaDev");
            msgDev.removeAttribute("hidden");

            formDevolver.setAttribute("hidden", "true");
        } else {
            msgDev.innerHTML = "Chamado devolvido para o fluxo de atendimento.";
            getAllChamados();
        }
    } else {

    }
}

formDevolver.addEventListener("submit", event => {
    event.preventDefault();
    const dadosDev = new FormData(formDevolver);

    let url = '../model/devolverChamado.php';
    let config = {
        method: "POST",
        body: dadosDev
    }

    if (dadosDev.get('motivo').length > 9990) {
        window.alert("Limite de caracteres excedido!!!");

    } else {
        requestDevolverCH(url, config);
        msgDev.innerHTML = 'Carregando...';
        msgDev.classList.add("msgDev");
        msgDev.classList.remove("msgAlertaDev");
        msgDev.removeAttribute("hidden");
        formDevolver.setAttribute("hidden", "true");
    }
})