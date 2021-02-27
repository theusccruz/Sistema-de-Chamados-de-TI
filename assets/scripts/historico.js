const dadosHistory = document.querySelector('.dadosHistory');

async function getAllHistory() {
    let users = await requestFetchWithGet('../model/selUsuariosGrid.php');
    let chamados = await requestFetchWithGet('../model/selChamadosTIHistory.php');
    let userSession = await requestFetchWithGet('../model/userSession.php');
    let chamadosUser = await requestFetchWithGet('../model/selChamadosUserHistory.php');

    let chamadosTI = chamados.map(retornoChamado => {
        users.forEach(retornoUsuario => {

            if (retornoUsuario.ID == retornoChamado.ID_SOLICITANTE) {
                retornoChamado.ID_SOLICITANTE = retornoUsuario.NOME;
                retornoChamado.ID_DEPARTAMENTO = retornoUsuario.SETOR;
            }
            if (retornoUsuario.ID == retornoChamado.ID_TECNICO) {
                retornoChamado.ID_TECNICO = retornoUsuario.NOME;
            }
        })

        return retornoChamado
    })

    let chamadosSolicitante = chamadosUser.map(retornoChamado => {
        users.forEach(retornoUsuario => {

            if (retornoUsuario.ID == retornoChamado.ID_SOLICITANTE) {
                retornoChamado.ID_SOLICITANTE = retornoUsuario.NOME;
                retornoChamado.ID_DEPARTAMENTO = retornoUsuario.SETOR;
            }
            if (retornoUsuario.ID == retornoChamado.ID_TECNICO) {
                retornoChamado.ID_TECNICO = retornoUsuario.NOME;
            }
        })

        return retornoChamado
    })

    if (userSession.SETOR_ID == 3) {
        chamadosTI.forEach(resultado => {
            resultado.DATA_ABERTURA = formatarData(resultado.DATA_ABERTURA);
            resultado.HORA_ABERTURA = formatarHora(resultado.HORA_ABERTURA);
            resultado.DATA_FECHAMENTO = formatarData(resultado.DATA_FECHAMENTO);
            resultado.HORA_FECHAMENTO = formatarHora(resultado.HORA_FECHAMENTO);
    
            let btnVer = "<td><button class='ver' onclick='detalhes(this);' value='" + resultado.ID + "' style='cursor: pointer;'>Ver</button></td>";
            dadosHistory.insertAdjacentHTML("beforeend", gridHistory(resultado, btnVer, "fechado", userSession.SETOR_ID));
        });        
    } else {
        chamadosSolicitante.forEach(resultado => {
            resultado.DATA_ABERTURA = formatarData(resultado.DATA_ABERTURA);
            resultado.HORA_ABERTURA = formatarHora(resultado.HORA_ABERTURA);
            resultado.DATA_FECHAMENTO = formatarData(resultado.DATA_FECHAMENTO);
            resultado.HORA_FECHAMENTO = formatarHora(resultado.HORA_FECHAMENTO);
    
            let btnVer = "<td><button class='ver' onclick='detalhes(this);' value='" + resultado.ID + "' style='cursor: pointer;'>Ver</button></td>";
            dadosHistory.insertAdjacentHTML("beforeend", gridHistory(resultado, btnVer, "fechado", userSession.SETOR_ID));
        });             
    }
}

getAllHistory();