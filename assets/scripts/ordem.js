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

                                                if (retornoUsuario.id == retornoDados.id_tecnico) {

                                                    retornoDados.id_tecnico = retornoUsuario.nome;

                                                }

                                                if (retornoUsuario.id == retornoDados.id_solicitante) {

                                                    retornoDados.id_solicitante = retornoUsuario.nome;
                                                    retornoDados.id_departamento = retornoUsuario.setor;
                                                }
                                            })

                                            return retornoDados
                                        })

                                        chamado.forEach(resultado => {
                                            //console.log(resultado);

                                            resultado.data_abertura = formatarData(resultado.data_abertura);
                                            resultado.hora_abertura = formatarHora(resultado.hora_abertura);

                                            if (resultado.status == "Concluído" || resultado.status == "Devolvido") {

                                                resultado.status = "Em atendimento";

                                            } else {

                                            }
                                            let classe;
                                            if (resultado.id == idOrdem) {
                                                classe = "meuChamado";

                                            } else if (resultado.status == "Em atendimento") {
                                                classe = "emAtd";

                                            }

                                            dadosOrdem.insertAdjacentHTML('beforeend', "<tr class='" + classe + "'>" + "<td>" + resultado.ordem + "</td>" +
                                                "<td>" + resultado.id + "</td>" + "<td>" + resultado.hora_abertura + "<br>" + resultado.data_abertura + "</td>" +
                                                "<td>" + resultado.status + "</td>" + "<td>" + resultado.id_solicitante +
                                                "<td>" + resultado.id_departamento + "</td></tr>");



                                        });


                                    })
                            })
                    })
            })

    }
}