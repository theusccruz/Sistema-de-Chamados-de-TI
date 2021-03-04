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

    const grid = "<tr><td id='numero'>" + resultado.id +
        '</td><td>' + resultado.data_abertura +
        '<br>' + resultado.hora_abertura +
        '</td><td>' + resultado.assunto +
        '</td><td>' + resultado.categoria +
        "</td><td class='space'><p class='" + color + "'>" + resultado.status +
        '</p></td><td>' + resultado.id_tecnico +
        '</td><td>' + botao +

        '</td><td>' + "<a href='#' id='" + resultado.id + "' onclick='chat(this);' name='" +
        resultado.id + "'><img class='imgChatUser' src='../assets/img/chat.png'></a>" +

        acao + "<td>" + posicao + "</td></tr>"

    return grid
}

function gridTI(dados, prioriClass, btnAcoes, btnVer, classStatus) {

    const grid = "<tr class='" + prioriClass + "'><td id='numero'>" + dados.id +
        '</td><td>' + dados.data_abertura +
        '<br>' + dados.hora_abertura +
        '</td><td>' + dados.assunto +
        '</td><td>' + dados.id_departamento +
        '</td><td>' + dados.id_solicitante +
        '</td><td>' + dados.categoria +
        "<td>" + dados.prioridade + "</td>" +
        "</td><td class='space'><p class='" + classStatus + "'>" + dados.status +
        "</p></td>" + '<td>' + dados.id_tecnico + "</td>" +

        "<td>" + "<a href='#' id='" + dados.id + "' onclick='chat(this);' name='" + dados.id +
        "'><img class='imgChat' src='../assets/img/chat.png'></a>" + "</td>" +

        btnVer + "<td>" + btnAcoes + "</td>" + "</tr>";

    return grid
}

function gridHistory(dados, btnVer, classStatus, setor) {
    if (setor != 3) {
        const grid = "<tr><td id='numero'>" + dados.id +
            '</td><td>' + dados.data_abertura +
            '<br>' + dados.hora_abertura +
            '</td><td>' + dados.data_fechamento +
            '<br>' + dados.hora_fechamento +
            '</td><td>' + dados.assunto +
            '</td><td>' + dados.id_departamento +
            '</td><td>' + dados.id_departamento +
            '</td><td>' + dados.categoria +
            "<td>" + dados.prioridade + "</td>" +
            "</td><td class='space'><p class='" + classStatus + "'>" + dados.status +
            "</p></td>" + '<td>' + dados.id_tecnico + "</td>" + btnVer +

            "<td>" + "<a href='#' id='" + dados.id + "' onclick='chat(this);' name='" + dados.id +
            "'><img class='imgChatUser' src='../assets/img/chat.png'></a>" + "</td></tr>";
        return grid
    } else {
        const grid = "<tr><td id='numero'>" + dados.id +
            '</td><td>' + dados.data_abertura +
            '<br>' + dados.hora_abertura +
            '</td><td>' + dados.data_fechamento +
            '<br>' + dados.hora_fechamento +
            '</td><td>' + dados.assunto +
            '</td><td>' + dados.id_departamento +
            '</td><td>' + dados.id_departamento +
            '</td><td>' + dados.categoria +
            "<td>" + dados.prioridade + "</td>" +
            "</td><td class='space'><p class='" + classStatus + "'>" + dados.status +
            "</p></td>" + '<td>' + dados.id_tecnico + "</td>" +
            "<td>" + dados.avaliacao + "</td>" + btnVer +

            "<td>" + "<a href='#' id='" + dados.id + "' onclick='chat(this);' name='" + dados.id +
            "'><img class='imgChat' src='../assets/img/chat.png'></a>" + "</td></tr>";
        return grid
    }
}