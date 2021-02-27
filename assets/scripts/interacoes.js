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

                                if (retornoUsuario.ID == dadosChamado.ID_SOLICITANTE) {

                                    dadosChamado.ID_SOLICITANTE = retornoUsuario.NOME;
                                    dadosChamado.ID_DEPARTAMENTO = retornoUsuario.SETOR;
                                }

                                if (retornoUsuario.ID == dadosChamado.ID_TECNICO) {

                                    dadosChamado.ID_TECNICO = retornoUsuario.NOME;
                                }

                            })
                            
                            numInt.innerHTML = dadosChamado.ID;
                            solicInt.innerHTML = dadosChamado.ID_SOLICITANTE;
                            catInt.innerHTML = dadosChamado.CATEGORIA;
                            stsInt.innerHTML = dadosChamado.STATUS;
                            tecInt.innerHTML = dadosChamado.ID_TECNICO;

                            if (dadosChamado.ANX != null) {
                                iconAnexo.innerHTML =  "<a class='anx' onclick='anexos(this)' id='" + dadosChamado.ID + "'><img src='../assets/img/anx.png'></a>";
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

                                if (retornoUsuario.ID == retornoIntera.AUTOR_ID) {
                                    
                                    retornoIntera.AUTOR_ID = retornoUsuario.NOME;

                                }
                            })

                            return retornoIntera
                        })

                        //console.log(interacao)

                        interacao.forEach(dados => {
                            dados.DATA = formatarData(dados.DATA);
                            dados.HORA = formatarHora(dados.HORA);

                            if (dados.MENSAGEM === null) {

                                dados.MENSAGEM = "";
                            }

                            if (dados.MENSAGEM.length > 95) {
                                
                                var mensagemInt = dados.MENSAGEM.substr(0, 70) + "...<a href='#' class='vmais' name='" + dados.NUMAUTOR 
                                + "' onclick='mais(this)' id='" + dados.ID
                                + "'>Ver mais</a>";

                                //console.log(mensagemInt);

                            } else {

                                var mensagemInt = dados.MENSAGEM;
                            }

                            interacoes.insertAdjacentHTML("beforeend", "<tr><td>" + dados.DATA + 
                            "<br>" + dados.HORA + "</td>" +
                            "<td>" + dados.AUTOR_ID + "</td>" +
                            "<td>" + dados.EVENTO + "</td>" +
                            "<td>" + mensagemInt + "</td></tr>");

                            //console.log(dados.MENSAGEM.length);                        
                            
                            

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

                                if (retornoUsuario.ID == dadosMais.AUTOR_ID) {
                                    
                                    dadosMais.AUTOR_ID = retornoUsuario.NOME;

                                }
                            });
                            
                            maisChamado.innerHTML = dadosMais.CHAMADOS_ID;
                            maisAutor.innerHTML = dadosMais.AUTOR_ID;
                            maisMensagem.innerHTML = dadosMais.MENSAGEM;  

                    })
                })

            })
        })

    }    

}