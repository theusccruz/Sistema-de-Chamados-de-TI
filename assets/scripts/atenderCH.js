const modalAtender = document.getElementById('modal-atender');
const contentAtender = document.querySelector('.contentAtender');
const formAtender = document.getElementById('formAtender');

const catAt = document.querySelector("#catAt");
const prioAt = document.querySelector("#prioAt");
const statAt = document.querySelector("#statAt");

const msgAtender = document.querySelector("#msgAtender");
const btnAt = document.querySelector('#btnAt');

function atender(objeto) {

    const idAtender = objeto.value;

    if (modalAtender) {

        modalAtender.classList.add('mostrar');

        modalAtender.addEventListener('click', (e) => {

            if (e.target.id == 'modal-atender' || e.target.className == 'fechar') {

                modalAtender.classList.remove('mostrar');

            }

        });

        contentAtender.innerHTML = "";
        formAtender.removeAttribute("hidden");
        msgAtender.setAttribute("hidden", "true");

        fetch('../model/selChamadoEdit.php?id=' + idAtender, {

                method: 'GET'

            })
            .then(responseAteF => {
                responseAteF.json()

                .then(dadosChamado => {
                    //console.log(statusEdicao);


                        contentAtender.insertAdjacentHTML("afterbegin", "Chamado: <input type='text' class='dadosCH' name='id' value='" + dadosChamado.ID +
                            "' size='10' readonly='true'>" + "<input type='text' name='cript' value='" 
                            + dadosChamado[0] + "' hidden>" + "Assunto: <input type='text' class='dadosCH' name='' value='" + dadosChamado.ASSUNTO +
                            "' size='26' readonly='true'><br><br>");

                        statAt.value = dadosChamado.STATUS;


                        for (var i = 0; i < catAt.length; i++) {

                            if (catAt[i].value == dadosChamado.IDCAT) {

                                catAt.value = dadosChamado.IDCAT;

                            }

                        }

                        for (var i = 0; i < prioAt.length; i++) {

                            if (prioAt[i].value == dadosChamado.IDPRIORI) {

                                prioAt.value = dadosChamado.IDPRIORI;

                            }


                        }                    

                })
            })
    }


}

formAtender.addEventListener("submit", event => {

    event.preventDefault();

    const DadosAt = new FormData(formAtender);

    DadosAt.append('cat', catAt.value);
    DadosAt.append('prioridade', prioAt.value);

    fetch('../model/editChamado.php', {

            method: 'POST',
            body: DadosAt

        })
        .then(responseAte => {
            responseAte.json()

            .then(result => {

                //console.log(result);

                if (result == "Dados Inválidos") {

                    msgAtender.innerHTML = "Dados Inválidos! Selecione as informações corretamente.";
                    msgAtender.classList.remove("msgAviso");
                    msgAtender.classList.add("msgAlerta");
                    msgAtender.removeAttribute("hidden");

                    formAtender.setAttribute("hidden", "true");


                } else if (result == "Dados não alterados") {

                    msgAtender.innerHTML = "Atendimento iniciado. Dados do chamado não foram alterados.";
                    msgAtender.classList.add("msgAviso");
                    msgAtender.classList.remove("msgAlerta");
                    msgAtender.removeAttribute("hidden");

                    formAtender.setAttribute("hidden", "true");

                    dadosGridTI.innerHTML = "";
                    getAllChamados();


                } else {

                    msgAtender.innerHTML = "Atendimento iniciado. Dados do chamado foram alterados com sucesso!";
                    msgAtender.classList.add("msgAviso");
                    msgAtender.classList.remove("msgAlerta");
                    msgAtender.removeAttribute("hidden");
                    formAtender.setAttribute("hidden", "true");

                    dadosGridTI.innerHTML = "";
                    getAllChamados();

                }


            })
        })

})