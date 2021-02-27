const dados = document.querySelector(".dados");
const userOptions = document.getElementById("userOptions");

async function getAllChamados() {  

    let users = await requestFetchWithGet('../model/selUsuariosGrid.php');
    let chamados = await requestFetchWithGet('../model/selChamadosUser.php');
    let chamadosOrdenados = await requestFetchWithGet('../model/chamadosOrdenados.php');

    const chamadosFormat = chamados.map(retornoChamado => {

        users.forEach(retornoUsuario => {

            if (retornoUsuario.ID == retornoChamado.ID_TECNICO) {

                retornoChamado.ID_TECNICO = retornoUsuario.NOME;

            }
        })

        return retornoChamado
    });
    dados.innerHTML = "";
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
            
            acao = "<td><button onclick='fechar(this);' value='" + resultado.ID + "' style='cursor: pointer; margin-bottom: 10%;'>Resolvido</button><br>" +
                "<button onclick='devolver(this)' value='" + resultado.ID + "' style='cursor: pointer;'>Não Resolvido</button></td>"

        } else {

            acao = "<td></td>"

        }

        switch (resultado.ID_STATUS) {
            case 5:
                dados.insertAdjacentHTML("afterbegin", gridUser(resultado, btnVer, "concluido", acao, ""));
                break;

            case 3:
                dados.insertAdjacentHTML("afterbegin", gridUser(resultado, btnVer, "atribuido", acao, ordem));
                break;

            case 4:
                dados.insertAdjacentHTML("afterbegin", gridUser(resultado, btnVer, "atendimento", acao, ""));
                break;

            case 6:
                dados.insertAdjacentHTML("afterbegin", gridUser(resultado, btnVer, "devolvido", acao, ""));
                break;

            default:
                dados.insertAdjacentHTML("afterbegin", gridUser(resultado, btnVer, "", acao, ordem));
                break;
        }

    })

}

getAllChamados();