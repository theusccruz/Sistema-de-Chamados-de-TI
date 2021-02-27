function formatarData(data) {

    let split = data.split('-');
    data_formatada = split[2] + "/" + split[1] + "/" + split[0];
    return data_formatada;

}

function formatarHora(hora) {

    let split = hora.split(':');
    hora_format = split[0] + ":" + split[1];
    return hora_format;

}
async function fetchWithTimeout(url, options, config) {

    const {
        timeout = 8000
    } = options;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
        ...config,
        timeout: options,
        signal: controller.signal
    });
    clearTimeout(timer);

    return response;
}

async function requestFetchWithGet(url) {

    try {
        let dados = await fetchWithTimeout(url, {
            timeout: 5000
        })
        dados = await dados.json();
        return dados

    } catch (error) {
        alert("Erro ao carregar as informações");
    }
}
async function requestFetchWithPost(url, config) {

    try {
        let dados = await fetchWithTimeout(url, {
            timeout: 5000
        }, config)
        dados = await dados.json();
        return dados

    } catch (error) {
        alert("Erro ao carregar as informações");

        return "erro";
    }
}

function gridUser(resultado, botao, color, acao, posicao) {

    const grid = "<tr><td id='numero'>" + resultado.ID +
        '</td><td>' + resultado.DATA_ABERTURA +
        '<br>' + resultado.HORA_ABERTURA +
        '</td><td>' + resultado.ASSUNTO +
        '</td><td>' + resultado.CATEGORIA +
        "</td><td class='space'><p class='" + color + "'>" + resultado.STATUS +
        '</p></td><td>' + resultado.ID_TECNICO +
        '</td><td>' + botao +

        '</td><td>' + "<a href='#' id='" + resultado.ID + "' onclick='chat(this);' name='" +
        resultado.ID + "'><img class='imgChatUser' src='../assets/img/chat.png'></a>" +

        acao + "<td>" + posicao + "</td></tr>"

    return grid
}

function gridTI(dados, prioriClass, btnAcoes, btnVer, classStatus) {

    const grid = "<tr class='" + prioriClass + "'><td id='numero'>" + dados.ID +
        '</td><td>' + dados.DATA_ABERTURA +
        '<br>' + dados.HORA_ABERTURA +
        '</td><td>' + dados.ASSUNTO +
        '</td><td>' + dados.ID_DEPARTAMENTO +
        '</td><td>' + dados.ID_SOLICITANTE +
        '</td><td>' + dados.CATEGORIA +
        "<td>" + dados.PRIORIDADE + "</td>" +
        "</td><td class='space'><p class='" + classStatus + "'>" + dados.STATUS +
        "</p></td>" + '<td>' + dados.ID_TECNICO + "</td>" +

        "<td>" + "<a href='#' id='" + dados.ID + "' onclick='chat(this);' name='" + dados.ID +
        "'><img class='imgChat' src='../assets/img/chat.png'></a>" + "</td>" +

        btnVer + "<td>" + btnAcoes + "</td>" + "</tr>";

    return grid
}

function gridHistory(dados, btnVer, classStatus, setor) {
    if (setor != 3) {
        const grid = "<tr><td id='numero'>" + dados.ID +
            '</td><td>' + dados.DATA_ABERTURA +
            '<br>' + dados.HORA_ABERTURA +
            '</td><td>' + dados.DATA_FECHAMENTO +
            '<br>' + dados.HORA_FECHAMENTO +
            '</td><td>' + dados.ASSUNTO +
            '</td><td>' + dados.ID_DEPARTAMENTO +
            '</td><td>' + dados.ID_SOLICITANTE +
            '</td><td>' + dados.CATEGORIA +
            "<td>" + dados.PRIORIDADE + "</td>" +
            "</td><td class='space'><p class='" + classStatus + "'>" + dados.STATUS +
            "</p></td>" + '<td>' + dados.ID_TECNICO + "</td>" + btnVer +

            "<td>" + "<a href='#' id='" + dados.ID + "' onclick='chat(this);' name='" + dados.ID +
            "'><img class='imgChatUser' src='../assets/img/chat.png'></a>" + "</td></tr>";
        return grid
    } else {
        const grid = "<tr><td id='numero'>" + dados.ID +
            '</td><td>' + dados.DATA_ABERTURA +
            '<br>' + dados.HORA_ABERTURA +
            '</td><td>' + dados.DATA_FECHAMENTO +
            '<br>' + dados.HORA_FECHAMENTO +
            '</td><td>' + dados.ASSUNTO +
            '</td><td>' + dados.ID_DEPARTAMENTO +
            '</td><td>' + dados.ID_SOLICITANTE +
            '</td><td>' + dados.CATEGORIA +
            "<td>" + dados.PRIORIDADE + "</td>" +
            "</td><td class='space'><p class='" + classStatus + "'>" + dados.STATUS +
            "</p></td>" + '<td>' + dados.ID_TECNICO + "</td>" +
            "<td>" + dados.AVALIACAO + "</td>" + btnVer +

            "<td>" + "<a href='#' id='" + dados.ID + "' onclick='chat(this);' name='" + dados.ID +
            "'><img class='imgChat' src='../assets/img/chat.png'></a>" + "</td></tr>";
        return grid
    }
}