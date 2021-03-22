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

                                        if (retornoUsuario.id == dadosChamado.id_solicitante) {

                                            dadosChamado.id_solicitante = retornoUsuario.nome;
                                            dadosChamado.id_departamento = retornoUsuario.setor;
                                        }

                                        if (retornoUsuario.id == dadosChamado.id_tecnico) {

                                            dadosChamado.id_tecnico = retornoUsuario.nome;
                                        }

                                    })


                                    contentFinal.insertAdjacentHTML("afterbegin", "Chamado: <input type='text' class='dadosCH' name='id' value='" + dadosChamado.id +
                                        "' size='10' readonly='true'>" + "<input type='text' name='cript' value='" +
                                        dadosChamado[0] + "' hidden>" + "<br><br>");
                                    assunto.innerHTML = dadosChamado.assunto;
                                    solicitante.innerHTML = dadosChamado.id_solicitante;
                                    setor.innerHTML = dadosChamado.id_departamento;
                                    ti.innerHTML = dadosChamado.id_tecnico;


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