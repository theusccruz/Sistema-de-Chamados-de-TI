const dadosHistory = document.querySelector('.dadosHistory');

async function getAllHistory() {
    let users = await requestFetchWithGet('../model/selUsuariosGrid.php');
    let chamados = await requestFetchWithGet('../model/selChamadosTIHistory.php');
    let userSession = await requestFetchWithGet('../model/userSession.php');
    let chamadosUser = await requestFetchWithGet('../model/selChamadosUserHistory.php');

    let chamadosTI = chamados.map(retornoChamado => {
        users.forEach(retornoUsuario => {

            if (retornoUsuario.id == retornoChamado.id_solicitante) {
                retornoChamado.id_solicitante = retornoUsuario.nome;
                retornoChamado.id_departamento = retornoUsuario.setor;
            }
            if (retornoUsuario.id == retornoChamado.id_tecnico) {
                retornoChamado.id_tecnico = retornoUsuario.nome;
            }
        })

        return retornoChamado
    })

    let chamadosSolicitante = chamadosUser.map(retornoChamado => {
        users.forEach(retornoUsuario => {

            if (retornoUsuario.id == retornoChamado.id_solicitante) {
                retornoChamado.id_solicitante = retornoUsuario.nome;
                retornoChamado.id_departamento = retornoUsuario.setor;
            }
            if (retornoUsuario.id == retornoChamado.id_tecnico) {
                retornoChamado.id_tecnico = retornoUsuario.nome;
            }
        })

        return retornoChamado
    })

    if (userSession.SETOR_ID == 3) {
        chamadosTI.forEach(resultado => {
            resultado.data_abertura = formatarData(resultado.data_abertura);
            resultado.hora_abertura = formatarHora(resultado.hora_abertura);
            resultado.data_fechamento = formatarData(resultado.data_fechamento);
            resultado.hora_fechamento = formatarHora(resultado.hora_fechamento);
    
            let btnVer = "<td><button class='ver' onclick='detalhes(this);' value='" + resultado.id + "' style='cursor: pointer;'>Ver</button></td>";
            dadosHistory.insertAdjacentHTML("beforeend", gridHistory(resultado, btnVer, "fechado", userSession.SETOR_ID));
        });        
    } else {
        chamadosSolicitante.forEach(resultado => {
            resultado.data_abertura = formatarData(resultado.data_abertura);
            resultado.hora_abertura = formatarHora(resultado.hora_abertura);
            resultado.data_fechamento = formatarData(resultado.data_fechamento);
            resultado.hora_fechamento = formatarHora(resultado.hora_fechamento);
    
            let btnVer = "<td><button class='ver' onclick='detalhes(this);' value='" + resultado.id + "' style='cursor: pointer;'>Ver</button></td>";
            dadosHistory.insertAdjacentHTML("beforeend", gridHistory(resultado, btnVer, "fechado", userSession.SETOR_ID));
        });             
    }
}

getAllHistory();