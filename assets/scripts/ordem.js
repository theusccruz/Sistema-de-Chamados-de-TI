const modalOrdem = document.getElementById('modal-ordem');
const contentOrdem = document.getElementById('contentOrdem');
const dadosOrdem = document.getElementById('dadosOrdem');

function ordem(objeto) {

    const idOrdem = objeto.id;

    if (modalOrdem) {

        modalOrdem.classList.add('mostrar');

        modalOrdem.addEventListener('click', (e) => {

            if (e.target.id == 'modal-ordem' || e.target.className == 'fecharOrdem') {
                modalOrdem.classList.remove('mostrar');
                dadosOrdem.innerHTML = "";

            }

        });

        fetch('../model/selUsuariosGrid.php', {

                method: 'GET'

            })
            .then(response => {
                response.json()

                    .then(dadosUsuario => {

                        //console.log(dadosUsuario);

                        fetch('../model/chamadosOrdenados.php', {
                                method: 'GET',

                            })
                            .then(response3 => {
                                response3.json()

                                    .then(dadosOrdenados => {
                                        //console.log(dadosOrdenados);

                                        const chamado = dadosOrdenados.map(retornoDados => {

                                            dadosUsuario.forEach(retornoUsuario => {

                                                if (retornoUsuario.ID == retornoDados.ID_TECNICO) {

                                                    retornoDados.ID_TECNICO = retornoUsuario.NOME;

                                                }

                                                if (retornoUsuario.ID == retornoDados.ID_SOLICITANTE) {

                                                    retornoDados.ID_SOLICITANTE = retornoUsuario.NOME;
                                                    retornoDados.ID_DEPARTAMENTO = retornoUsuario.SETOR;
                                                }
                                            })

                                            return retornoDados
                                        })

                                        chamado.forEach(resultado => {
                                            //console.log(resultado);

                                            resultado.DATA_ABERTURA = formatarData(resultado.DATA_ABERTURA);
                                            resultado.HORA_ABERTURA = formatarHora(resultado.HORA_ABERTURA);

                                            if (resultado.STATUS == "Concluído" || resultado.STATUS == "Devolvido") {

                                                resultado.STATUS = "Em atendimento";

                                            } else {

                                            }
                                            let classe;
                                            if (resultado.ID == idOrdem) {
                                                classe = "meuChamado";

                                            } else if (resultado.STATUS == "Em atendimento") {
                                                classe = "emAtd";

                                            }

                                            dadosOrdem.insertAdjacentHTML('beforeend', "<tr class='" + classe + "'>" + "<td>" + resultado.ORDEM + "</td>" +
                                                "<td>" + resultado.ID + "</td>" + "<td>" + resultado.HORA_ABERTURA + "<br>" + resultado.DATA_ABERTURA + "</td>" +
                                                "<td>" + resultado.STATUS + "</td>" + "<td>" + resultado.ID_SOLICITANTE +
                                                "<td>" + resultado.ID_DEPARTAMENTO + "</td></tr>");



                                        });


                                    })
                            })
                    })
            })

    }
}