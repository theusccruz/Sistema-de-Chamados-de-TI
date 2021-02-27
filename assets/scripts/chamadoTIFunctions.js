const dadosGridTI = document.querySelector(".dadosTI");
const dadosGridUser = document.querySelector(".dados");
const userOptions = document.getElementById("userOptions");
const selFilters = document.getElementById("selFilters");
const gridTecnico = document.getElementById('gridTI');
const gridUsuario = document.getElementById('gridUser');

async function getAllChamados() {

    let users = await requestFetchWithGet('../model/selUsuariosGrid.php');
    let chamados = await requestFetchWithGet('../model/selChamadosTI.php');
    let chamadosPartic = await requestFetchWithGet('../model/selChamadosTIPartic.php');
    let chamadosUser = await requestFetchWithGet('../model/selChamadosUser.php');
    let chamadosOrdenados = await requestFetchWithGet('../model/chamadosOrdenados.php');
    let userSession = await requestFetchWithGet('../model/userSession.php');
    let chamadosFormat;

    switch (selFilters.value) {
        case "1":
            dadosGridTI.innerHTML = "";
            dadosGridUser.innerHTML = "";
            gridUsuario.style.display = 'none';
            gridTecnico.style.display = 'block';
            
            chamadoFormat = chamados.map(retornoChamado => {
                users.forEach(retornoUsuario => {

                    if (retornoUsuario.ID == retornoChamado.ID_SOLICITANTE) {
                        retornoChamado.ID_SOLICITANTE = retornoUsuario.NOME;
                        retornoChamado.ID_DEPARTAMENTO = retornoUsuario.SETOR;
                    }
                    if (retornoUsuario.ID == retornoChamado.ID_TECNICO) {
                        retornoChamado.ID_TECNICO = retornoUsuario.NOME;
                    }
                    if (userSession.IDUSUARIO == retornoUsuario.ID) {
                        userSession.IDUSUARIO = retornoUsuario.NOME;
                    }

                })

                return retornoChamado
            })

            chamadoFormat.forEach(resultado => {
                //console.log(resultado);

                resultado.DATA_ABERTURA = formatarData(resultado.DATA_ABERTURA);
                resultado.HORA_ABERTURA = formatarHora(resultado.HORA_ABERTURA);

                if (resultado.PRIORIDADE === null || resultado.ID_TECNICO === null) {
                    resultado.ID_TECNICO = "";
                    resultado.PRIORIDADE = "";
                }

                let btnVer = "<td><button class='ver' onclick='detalhes(this);' value='" + resultado.ID + "' style='cursor: pointer;'>Ver</button></td>";
                let btnAtribuir = "<button id='assumir' onclick='atribuirChamado(this);' value='" + resultado.ID + 
                    "' name='assumir' style='cursor: pointer;'>Atribuir</button>";   

                let btnAtender = "<button id='atender' onclick='atender(this);' value='" + resultado.ID + 
                "' name='atender' style='cursor: pointer; margin-bottom: 10%;'>Atender</button>" + btnAtribuir;
                let btnFinalizar = "<button id='finalizar' onclick='finalizar(this);' value='" + resultado.ID +
                "' name='finalizar' style='cursor: pointer; margin-bottom: 10%;'>Concluir</button>" + btnAtribuir;
                if (resultado.ID_TECNICO != userSession.IDUSUARIO) {
                    btnAtender = btnAtribuir;

                    btnFinalizar = btnAtribuir;
                }

                let prioriClass;
                if (resultado.ID_PRIORIDADE == 6) {
                    prioriClass = "imediata";
                } else {
                    prioriClass = "";
                }

                switch (userOptions.value) {
                    case "1":
                        switch (resultado.ID_STATUS) {
                            case 5:
                                resultado.STATUS = "Aguardando retorno";
                                dadosGridTI.insertAdjacentHTML("beforeend", gridTI(resultado, prioriClass, btnAtribuir, btnVer, "concluido"));
                                break;

                            case 3:
                                dadosGridTI.insertAdjacentHTML("beforeend", gridTI(resultado, prioriClass, btnAtender, btnVer, "atribuido"));
                                break;

                            case 6:
                                dadosGridTI.insertAdjacentHTML("beforeend", gridTI(resultado, prioriClass, btnAtender, btnVer, "devolvido"));
                                break;

                            case 4:
                                dadosGridTI.insertAdjacentHTML("beforeend", gridTI(resultado, prioriClass, btnFinalizar, btnVer, "atendimento"));
                                break;

                            default:
                                dadosGridTI.insertAdjacentHTML("beforeend", gridTI(resultado, prioriClass, btnAtribuir, btnVer, ""));
                                break;
                        }
                        break;

                    case "2":
                        if (resultado.ID_STATUS == 2) {
                            dadosGridTI.insertAdjacentHTML("beforeend", gridTI(resultado, prioriClass, btnAtribuir, btnVer, ""));
                        }
                        break;

                    case "3":
                        if (resultado.ID_STATUS == 3) {
                            dadosGridTI.insertAdjacentHTML("beforeend", gridTI(resultado, prioriClass, btnAtender, btnVer, "atribuido"));
                        }
                        break;

                    case "4":
                        if (resultado.ID_STATUS == 4) {
                            dadosGridTI.insertAdjacentHTML("beforeend", gridTI(resultado, prioriClass, btnFinalizar, btnVer, "atendimento"));
                        }
                        break;

                    case "5":
                        if (resultado.ID_STATUS == 5) {
                            resultado.STATUS = "Aguardando retorno";
                            dadosGridTI.insertAdjacentHTML("beforeend", gridTI(resultado, prioriClass, btnAtribuir, btnVer, "concluido"));
                        }
                        break;

                    case "6":
                        if (resultado.ID_STATUS == 6) {
                            dadosGridTI.insertAdjacentHTML("beforeend", gridTI(resultado, prioriClass, btnAtender, btnVer, "devolvido"));
                        }
                        break;

                    default:
                        break;
                }
            })

            break;

        case "2":
            dadosGridTI.innerHTML = "";
            dadosGridUser.innerHTML = "";
            gridUsuario.style.display = 'none';
            gridTecnico.style.display = 'block';
            
            chamadoFormat = chamadosPartic.map(retornoChamado => {

                users.forEach(retornoUsuario => {

                    if (retornoUsuario.ID == retornoChamado.ID_SOLICITANTE) {

                        retornoChamado.ID_SOLICITANTE = retornoUsuario.NOME;
                        retornoChamado.ID_DEPARTAMENTO = retornoUsuario.SETOR;
                    }

                    if (retornoUsuario.ID == retornoChamado.ID_TECNICO) {

                        retornoChamado.ID_TECNICO = retornoUsuario.NOME;

                    }

                    if (userSession.IDUSUARIO == retornoUsuario.ID) {

                        userSession.IDUSUARIO = retornoUsuario.NOME;

                    }

                })

                return retornoChamado
            })

            chamadoFormat.forEach(resultado => {
                //console.log(resultado);
                resultado.DATA_ABERTURA = formatarData(resultado.DATA_ABERTURA);
                resultado.HORA_ABERTURA = formatarHora(resultado.HORA_ABERTURA);

                let btnVer = "<td><button class='ver' onclick='detalhes(this);' value='" + resultado.ID + "' style='cursor: pointer;'>Ver</button></td>";
                let btnAtribuir = "<button id='assumir' onclick='atribuirChamado(this);' value='" + resultado.ID + 
                    "' name='assumir' style='cursor: pointer;'>Atribuir</button>";
                
                let btnAtender = "<button id='atender' onclick='atender(this);' value='" + resultado.ID + 
                    "' name='atender' style='cursor: pointer; margin-bottom: 10%;'>Atender</button>" + btnAtribuir;
                let btnFinalizar = "<button id='finalizar' onclick='finalizar(this);' value='" + resultado.ID +
                "' name='finalizar' style='cursor: pointer; margin-bottom: 10%;'>Concluir</button>" + btnAtribuir;

                let prioriClass;
                if (resultado.ID_PRIORIDADE == 6) {
                    prioriClass = "imediata";
                } else {
                    prioriClass = "";
                }

                switch (userOptions.value) {
                    case "1":
                        switch (resultado.ID_STATUS) {
                            case 5:
                                resultado.STATUS = "Aguardando retorno";
                                dadosGridTI.insertAdjacentHTML("beforeend", gridTI(resultado, prioriClass, btnAtribuir, btnVer, "concluido"));
                                break;

                            case 3:
                                dadosGridTI.insertAdjacentHTML("beforeend", gridTI(resultado, prioriClass, btnAtender, btnVer, "atribuido"));
                                break;

                            case 6:
                                dadosGridTI.insertAdjacentHTML("beforeend", gridTI(resultado, prioriClass, btnAtender, btnVer, "devolvido"));
                                break;

                            case 4:
                                dadosGridTI.insertAdjacentHTML("beforeend", gridTI(resultado, prioriClass, btnFinalizar, btnVer, "atendimento"));
                                break;

                            default:
                                dadosGridTI.insertAdjacentHTML("beforeend", gridTI(resultado, prioriClass,btnAtribuir, btnVer, ""));
                                break;
                        }
                        break;

                    case "2":
                        break;

                    case "3":
                        if (resultado.ID_STATUS == 3) {

                            dadosGridTI.insertAdjacentHTML("beforeend", gridTI(resultado, prioriClass, btnAtender, btnVer, "atribuido"));
                        }
                        break;

                    case "4":
                        if (resultado.ID_STATUS == 4) {
                            dadosGridTI.insertAdjacentHTML("beforeend", gridTI(resultado, prioriClass, btnFinalizar, btnVer, "atendimento"));
                        }
                        break;

                    case "5":
                        if (resultado.ID_STATUS == 5) {
                            resultado.STATUS = "Aguardando retorno";
                            dadosGridTI.insertAdjacentHTML("beforeend", gridTI(resultado, prioriClass, btnAtribuir, btnVer, "concluido"));
                        }
                        break;

                    case "6":
                        if (resultado.ID_STATUS == 6) {
                            dadosGridTI.insertAdjacentHTML("beforeend", gridTI(resultado, prioriClass, btnAtender, btnVer, "devolvido"));
                        }
                        break;

                    default:
                        break;
                }
            })

            break;

        case "3":
            dadosGridTI.innerHTML = "";
            dadosGridUser.innerHTML = "";
            gridTecnico.style.display = 'none';
            gridUsuario.style.display = 'block';

            chamadosFormat = chamadosUser.map(retornoChamado => {

                users.forEach(retornoUsuario => {

                    if (retornoUsuario.ID == retornoChamado.ID_TECNICO) {

                        retornoChamado.ID_TECNICO = retornoUsuario.NOME;

                    }
                })

                return retornoChamado
            });

            chamadosFormat.forEach(resultado => {
                //console.log(resultado)
                resultado.DATA_ABERTURA = formatarData(resultado.DATA_ABERTURA);
                resultado.HORA_ABERTURA = formatarHora(resultado.HORA_ABERTURA);

                let posicao = "";
                chamadosOrdenados.forEach(colocacao => {

                    if (colocacao.ID === resultado.ID) {
                        posicao = colocacao.ORDEM;
                    }

                })

                let ordem = "<a id='" + resultado.ID + "' onclick='ordem(this)' class='colocacao'>" + posicao + "</a>"

                if (resultado.DATA_FECHAMENTO === null && resultado.HORA_FECHAMENTO === null) {

                    resultado.DATA_FECHAMENTO = ""
                    resultado.HORA_FECHAMENTO = ""
                }

                if (resultado.ID_TECNICO === null) {

                    resultado.ID_TECNICO = ""
                }

                let btnVer = "<button class='ver' onclick='detalhes(this);' value='" + resultado.ID +
                    "' style='cursor: pointer;'>Ver</button>";

                let acao;
                if (resultado.ID_STATUS == 5) {

                    acao = "<td><button onclick='fechar(this);' value='" + resultado.ID + "' style='cursor: pointer; margin-bottom: 5%;'>Resolvido</button><br>" +
                        "<button onclick='devolver(this)' value='" + resultado.ID + "' style='cursor: pointer;'>Não Resolvido</button></td>"

                } else {

                    acao = "<td></td>"

                }
                switch (userOptions.value) {
                    case "1":
                        switch (resultado.ID_STATUS) {
                            case 5:
                                dadosGridUser.insertAdjacentHTML("afterbegin", gridUser(resultado, btnVer, "concluido", acao, ""));
                                break;
        
                            case 3:
                                dadosGridUser.insertAdjacentHTML("afterbegin", gridUser(resultado, btnVer, "atribuido", acao, ordem));
                                break;
        
                            case 4:
                                dadosGridUser.insertAdjacentHTML("afterbegin", gridUser(resultado, btnVer, "atendimento", acao, ""));
                                break;
        
                            case 6:
                                dadosGridUser.insertAdjacentHTML("afterbegin", gridUser(resultado, btnVer, "devolvido", acao, ""));
                                break;
        
                            default:
                                dadosGridUser.insertAdjacentHTML("afterbegin", gridUser(resultado, btnVer, "", acao, ordem));
                                break;
                        }
                        break;
                    case "2":
                        if (resultado.ID_STATUS == 2) {
                            dadosGridUser.insertAdjacentHTML("afterbegin", gridUser(resultado, btnVer, "", acao, ordem));
                        }
                        break;
                    case "3":
                        if (resultado.ID_STATUS == 3) {
                            dadosGridUser.insertAdjacentHTML("afterbegin", gridUser(resultado, btnVer, "atribuido", acao, ordem));
                        }
                        break;
                    case "4":
                        if (resultado.ID_STATUS == 4) {
                            dadosGridUser.insertAdjacentHTML("afterbegin", gridUser(resultado, btnVer, "atendimento", acao, ""));
                        }
                        break;
                    case "5":
                        if (resultado.ID_STATUS == 5) {
                            dadosGridUser.insertAdjacentHTML("afterbegin", gridUser(resultado, btnVer, "concluido", acao, ""));
                        }
                        break;
                    case "6":
                        if (resultado.ID_STATUS == 6) {
                            dadosGridUser.insertAdjacentHTML("afterbegin", gridUser(resultado, btnVer, "devolvido", acao, ""));
                        }
                        break;                
                    default:
                        break;
                }                

            })
            break;

        default:
            break;
    }
}

getAllChamados();
