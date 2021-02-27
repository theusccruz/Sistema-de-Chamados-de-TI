const modalFinal = document.getElementById('modal-final');
const contentFinal = document.querySelector('.contentFinal');
const formFinal = document.getElementById('formFinal');

const assunto = document.querySelector("#assunto");
const solicitante = document.querySelector("#solicitante");
const setor = document.querySelector("#setor");
const ti = document.querySelector("#ti");

const msgFinal = document.querySelector("#msgFinal");
const mensagemFinali = document.querySelector("#mensagemFinali");

function finalizar(objeto) {

    const idFinal = objeto.value;

    if (modalFinal) {

        modalFinal.classList.add('mostrar');

        modalFinal.addEventListener('click', (e) => {

            if (e.target.id == 'modal-final' || e.target.className == 'fecharFinali') {
                modalFinal.classList.remove('mostrar');
                mensagemFinali.value = "";


            }

        });

        contentFinal.innerHTML = "";
        formFinal.removeAttribute("hidden");
        msgFinal.setAttribute("hidden", "true");
        mensagemFinali.focus();

        fetch('../model/selUsuariosGrid.php', {

                method: 'GET'

            })
            .then(responseFinF => {
                responseFinF.json()

                    .then(dadosUsuario => {

                        fetch('../model/selChamadoEdit.php?id=' + idFinal, {

                            method: 'GET',

                        }).then(function (response) {
                            response.json()

                                .then(function (dadosChamado) {


                                    dadosUsuario.forEach(retornoUsuario => {

                                        if (retornoUsuario.ID == dadosChamado.ID_SOLICITANTE) {

                                            dadosChamado.ID_SOLICITANTE = retornoUsuario.NOME;
                                            dadosChamado.ID_DEPARTAMENTO = retornoUsuario.SETOR;
                                        }

                                        if (retornoUsuario.ID == dadosChamado.ID_TECNICO) {

                                            dadosChamado.ID_TECNICO = retornoUsuario.NOME;
                                        }

                                    })


                                    contentFinal.insertAdjacentHTML("afterbegin", "Chamado: <input type='text' class='dadosCH' name='id' value='" + dadosChamado.ID +
                                        "' size='10' readonly='true'>" + "<input type='text' name='cript' value='" +
                                        dadosChamado[0] + "' hidden>" + "<br><br>");
                                    assunto.innerHTML = dadosChamado.ASSUNTO;
                                    solicitante.innerHTML = dadosChamado.ID_SOLICITANTE;
                                    setor.innerHTML = dadosChamado.ID_DEPARTAMENTO;
                                    ti.innerHTML = dadosChamado.ID_TECNICO;


                                })

                        })


                    })

            })


    }

}

async function requestFinalizarAtd(url, config) {

    let resposta = await requestFetchWithPost(url, config);

    if (resposta != "erro") {
        if (resposta == "Dados Invalidos" || resposta == "Limite excedido") {
            msgFinal.innerHTML = "Dados Inválidos!";
            msgFinal.classList.remove("msgFinal");
            msgFinal.classList.add("msgAlertaFinal");
            msgFinal.removeAttribute("hidden");

            formFinal.setAttribute("hidden", "true");
        } else {
            msgFinal.innerHTML = "Atendimento concluído, aguarde o retorno do solicitante.";
            
            getAllChamados();
        }
    } else {

    }
}

formFinal.addEventListener("submit", event => {
    event.preventDefault();
    const dadosFinal = new FormData(formFinal);

    let url = '../model/finalChamado.php';
    let config = {
        method: "POST",
        body: dadosFinal
    }

    if (dadosFinal.get('msg').length > 9990) {
        window.alert("Limite de caracteres excedido!!!");

    } else {
        requestFinalizarAtd(url, config);
        
        msgFinal.innerHTML = "Carregando...";
        msgFinal.classList.add("msgFinal");
        msgFinal.classList.remove("msgAlertaFinal");
        msgFinal.removeAttribute("hidden");
        formFinal.setAttribute("hidden", "true");
    }
})