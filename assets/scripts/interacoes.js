const modalIntera = document.getElementById('modal-intera');
const interacoes = document.getElementById('interacoes');
const contentIntera = document.getElementById('contentIntera');

const numInt = document.getElementById('numInt');
const solicInt = document.getElementById('solicInt');
const catInt = document.getElementById('catInt');
const stsInt = document.getElementById('stsInt');
const tecInt = document.getElementById('tecInt');
const iconAnexo = document.getElementById('iconAnexo');

function detalhes(objeto) {

    const idIntera = objeto.value;

    if (modalIntera) {

        modalIntera.classList.add('mostrar');

        modalIntera.addEventListener('click', (e) => {

            if (e.target.id == 'modal-intera' || e.target.className == 'fecharIntera') {
                modalIntera.classList.remove('mostrar');
                interacoes.innerHTML= "";
                numInt.innerHTML = "";
                solicInt.innerHTML = "";
                catInt.innerHTML = "";
                stsInt.innerHTML = "";
                tecInt.innerHTML = "";
                iconAnexo.innerHTML = "";

            }

        });

        fetch('../model/selUsuariosGrid.php', {

            method: 'GET'

        })
        .then(response => {
            response.json()

            .then(dadosUsuario => {
                //console.log(dadosUsuario);

                fetch('../model/selChamadoEdit.php?id=' + idIntera, {

                    method: 'GET',
        
                })
                .then(response2 => {
                    response2.json()
        
                    .then(dadosChamado => {        
                        //console.log(dadosChamado);

                            dadosUsuario.forEach(retornoUsuario => {

                                if (retornoUsuario.id == dadosChamado.id_solicitante) {

                                    dadosChamado.id_solicitante = retornoUsuario.nome;
                                    dadosChamado.id_departamento = retornoUsuario.setor;
                                }

                                if (retornoUsuario.id == dadosChamado.id_tecnico) {

                                    dadosChamado.id_tecnico = retornoUsuario.nome;
                                }

                            })
                            
                            numInt.innerHTML = dadosChamado.id;
                            solicInt.innerHTML = dadosChamado.id_solicitante;
                            catInt.innerHTML = dadosChamado.categoria;
                            stsInt.innerHTML = dadosChamado.status;
                            tecInt.innerHTML = dadosChamado.id_tecnico;

                            if (dadosChamado.anx != null) {
                                iconAnexo.innerHTML =  "<a class='anx' onclick='anexos(this)' id='" + dadosChamado.id + "'><img src='../assets/img/anx.png'></a>";
                            } else {

                            }

                            

                    })
        
                });               

            })
        })

        fetch('../model/selUsuariosGrid.php', {

            method: 'GET',

        })
        .then(response => {
            response.json() 

            .then(dadosUsuario => {
                //console.log(dadosUsuario);

                fetch('../model/selInteracoes.php?id=' + idIntera, {

                    method:'GET',
        
                })
                .then(response2 => {
                    response2.json()
        
                    .then(dadosIntera => {        
                        //console.log(dadosIntera);                        

                        const interacao = dadosIntera.map(retornoIntera => {

                            dadosUsuario.forEach(retornoUsuario => {

                                if (retornoUsuario.id == retornoIntera.autor_id) {
                                    
                                    retornoIntera.autor_id = retornoUsuario.nome;

                                }
                            })

                            return retornoIntera
                        })

                        //console.log(interacao)

                        interacao.forEach(dados => {
                            dados.data = formatarData(dados.data);
                            dados.hora = formatarHora(dados.hora);

                            if (dados.mensagem === null) {

                                dados.mensagem = "";
                            }

                            if (dados.mensagem.length > 95) {
                                
                                var mensagemInt = dados.mensagem.substr(0, 70) + "...<a href='#' class='vmais' name='" + dados.numautor 
                                + "' onclick='mais(this)' id='" + dados.id
                                + "'>Ver mais</a>";

                                //console.log(mensagemInt);

                            } else {

                                var mensagemInt = dados.mensagem;
                            }

                            interacoes.insertAdjacentHTML("beforeend", "<tr><td>" + dados.data + 
                            "<br>" + dados.hora + "</td>" +
                            "<td>" + dados.autor_id + "</td>" +
                            "<td>" + dados.evento + "</td>" +
                            "<td>" + mensagemInt + "</td></tr>");

                            //console.log(dados.mensagem.length);                        
                            
                            

                        })

                    })
                })

            })
        })
    }

}

const modalMais = document.getElementById('modal-mais');
const maisMensagem = document.getElementById('maisMensagem');

const maisChamado = document.getElementById('maisChamado');
const maisAutor = document.getElementById('maisAutor');

function mais(objet) {

    const idMais = objet.id;

    const autorMais = objet.name;

    if (modalMais) {

        modalMais.classList.add('mostrar');

        modalMais.addEventListener('click', (e) => {

            if (e.target.id == 'modal-mais' || e.target.className == 'fecharMais') {
                modalMais.classList.remove('mostrar');
                maisMensagem.innerHTML= "";
                maisChamado.innerHTML = "";
                maisAutor.innerHTML = "";


            }

        });

        fetch('../model/selUsuariosGrid.php', {

            method: 'GET',

        })
        .then(response => {
            response.json() 

            .then(dadosUsuario => {
                //console.log(dadosUsuario);

                fetch('../model/selInteracoesMSG.php?id=' + idMais + '&autor=' + autorMais, {

                    method:'GET',
        
                })
                .then(response2 => {
                    response2.json()
        
                    .then(dadosMais => {        
                        //console.log(dadosMais);                        

                            dadosUsuario.forEach(retornoUsuario => {

                                if (retornoUsuario.id == dadosMais.autor_id) {
                                    
                                    dadosMais.autor_id = retornoUsuario.nome;

                                }
                            });
                            
                            maisChamado.innerHTML = dadosMais.chamados_id;
                            maisAutor.innerHTML = dadosMais.autor_id;
                            maisMensagem.innerHTML = dadosMais.mensagem;  

                    })
                })

            })
        })

    }    

}