const dados = document.querySelector(".dados");
const userOptions = document.getElementById("userOptions");

async function getAllChamados() {  

    let users = await requestFetchWithGet('../model/selUsuariosGrid.php');
    let chamados = await requestFetchWithGet('../model/selChamadosUser.php');
    let chamadosOrdenados = await requestFetchWithGet('../model/chamadosOrdenados.php');

    const chamadosFormat = chamados.map(retornoChamado => {

        users.forEach(retornoUsuario => {

            if (retornoUsuario.id == retornoChamado.id_tecnico) {

                retornoChamado.id_tecnico = retornoUsuario.nome;

            }
        })

        return retornoChamado
    });
    dados.innerHTML = "";
    chamadosFormat.forEach(resultado => {
        //console.log(resultado)
        resultado.data_abertura = formatarData(resultado.data_abertura);
        resultado.hora_abertura = formatarHora(resultado.hora_abertura);

        let posicao = "";
        chamadosOrdenados.forEach(colocacao => {

            if (colocacao.id === resultado.id) {
                posicao = colocacao.ordem;
            }

        })

        let ordem = "<a id='" + resultado.id + "' onclick='ordem(this)' class='colocacao'>" + posicao + "</a>"

        if (resultado.id_tecnico === null) {

            resultado.id_tecnico = ""
        }

        let btnVer = "<button class='ver' onclick='detalhes(this);' value='" + resultado.id +
            "' style='cursor: pointer;'>Ver</button>";

        let acao;
        if (resultado.id_status == 5) {
            
            acao = "<td><button onclick='fechar(this);' value='" + resultado.id + "' style='cursor: pointer; margin-bottom: 10%;'>Resolvido</button><br>" +
                "<button onclick='devolver(this)' value='" + resultado.id + "' style='cursor: pointer;'>Não Resolvido</button></td>"

        } else {

            acao = "<td></td>"

        }

        switch (resultado.id_status) {
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