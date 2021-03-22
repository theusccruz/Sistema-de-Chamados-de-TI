const modalChat = document.getElementById('modal-Chat');
const conversas = document.getElementById('conversas');
const gridChat = document.querySelector('.gridChat');

const numCht = document.getElementById('numCht');

const messageText = document.getElementById('messageText');
const messageFile = document.getElementById('messageFile');
const nameFile = document.getElementById('nameFile');
const btnSubmitMessage = document.getElementById('btnSubmitMessage');
const containerChat = document.querySelector('.divMessageContainer');

const formMessage = document.getElementById('formMessage');
const divMessageContainer = document.querySelector('.divMessageContainer');

const campoId = document.getElementById('campoMessageId');
const criptId = document.getElementById('campoCriptId');
const btnAtualiza = document.getElementById("atualizaChat");

function contentFile(file) {

    if (file.value != null || file.value != "") {
        let split = file.value.split("\\");
        name_format = split[2];

        if (name_format.length > 10) {
            nameFile.innerHTML = name_format.substr(0, 6) + "..."
        } else {
            nameFile.innerHTML = name_format;
        }
    } else {
    }
}

async function conversasFunction(id) {

    let dadosChat = await requestFetchWithGet('../model/selChat.php?id=' + id);
    let users = await requestFetchWithGet('../model/selUsuariosGrid.php');
    let userSession = await requestFetchWithGet('../model/userSession.php');
    let chamado = await requestFetchWithGet('../model/selChamadoEdit.php?id=' + id);

    let pClassStyle;
    let divClassStyle;

    const chat = dadosChat.map(retornoChat => {

        users.forEach(retornoUsuario => {

            if (retornoUsuario.id == retornoChat.autor_id) {

                retornoChat.autor_id = retornoUsuario.nome;

            }

        })

        return retornoChat
    })

    chat.forEach(mensagem => {
        //console.log(mensagem);

        mensagem.hora = formatarHora(mensagem.hora);
        mensagem.data = formatarData(mensagem.data);

        if (userSession.IDUSUARIO == mensagem.numautor) {
            divClassStyle = 'divMyMessage';
            pClassStyle = 'myMessage';

        } else {
            if ((userSession.SETOR_ID == 3 && mensagem.tipo_usuario == "Tecnico") &&
                userSession.IDUSUARIO != chamado.id_solicitante) { // setor 3 é o setor de TI
                divClassStyle = 'divMyMessage';
                pClassStyle = 'myMessage';
            } else {
                divClassStyle = 'divYouMessage';
                pClassStyle = 'youMessage';
            }
        }

        let file;

        if (mensagem.arq == null) {
            file = "";
        } else {
            file = "<tr><td><div class='" + divClassStyle + "'><p class='" + pClassStyle + "'>" +
                "<label style= 'font-size: small'>" + mensagem.autor_id + "<br></label>" + mensagem.nome_ARQ +
                "<br><a href='../model/baixarAnexoMSG.php?id=" + mensagem.arq + "'>" +
                "Baixar anexo <img src='../assets/img/downAnxMsg.png'>" +
                "</a><br><label style= 'font-size: small'>" + mensagem.hora + " " + mensagem.data + "<label></p></div></td></tr>";
        }

        let message;

        if (mensagem.conteudo == "Anexo") {
            message = "";
        } else {
            message = "<tr><td><div class='" + divClassStyle + "'><p class='" + pClassStyle + "'>" +
                "<label style= 'font-size: small'>" + mensagem.autor_id + "<br></label>" +
                mensagem.conteudo + "<br><label style= 'font-size: small'>" + mensagem.hora + " " + mensagem.data +
                "</label></p></div></td></tr>";
        }
        conversas.insertAdjacentHTML("beforeend", message + file);
        gridChat.scrollTop = gridChat.scrollHeight;

    })
}

async function chat(objeto) {
    const id = objeto.id;

    if (modalChat) {
        
        let dadosChat = await requestFetchWithGet('../model/selChat.php?id=' + id);
        let users = await requestFetchWithGet('../model/selUsuariosGrid.php');
        let userSession = await requestFetchWithGet('../model/userSession.php');
        let chamado = await requestFetchWithGet('../model/selChamadoEdit.php?id=' + id);
        if (chamado.id_status == 7) {
            formMessage.innerHTML = '';          
        }        

        modalChat.classList.add('mostrar');
        btnAtualiza.setAttribute('onclick', 'atualizaChat(' + id + ')');
        modalChat.addEventListener('click', (e) => {

            if (e.target.id == 'modal-Chat' || e.target.className == 'fecharChat') {
                modalChat.classList.remove('mostrar');
                conversas.innerHTML = "";
                numCht.innerHTML = "";
                messageText.value = "";
                messageFile.value = null;
                nameFile.innerHTML = "";
                btnAtualiza.removeAttribute('onclick');

            }

        });
        messageText.focus();

        nameFile.innerHTML = "max: 25MB";        
        numCht.innerHTML = chamado.id;
        criptId.value = chamado[0];
        campoId.value = chamado.id;

        let pClassStyle;
        let divClassStyle;

        const chat = dadosChat.map(retornoChat => {

            users.forEach(retornoUsuario => {

                if (retornoUsuario.id == retornoChat.autor_id) {

                    retornoChat.autor_id = retornoUsuario.nome;

                }

            })

            return retornoChat
        })

        chat.forEach(mensagem => {
            //console.log(mensagem);

            mensagem.hora = formatarHora(mensagem.hora);
            mensagem.data = formatarData(mensagem.data);

            if (userSession.IDUSUARIO == mensagem.numautor) {
                divClassStyle = 'divMyMessage';
                pClassStyle = 'myMessage';

            } else {
                if ((userSession.SETOR_ID == 3 && mensagem.tipo_usuario == "Tecnico") &&
                    userSession.IDUSUARIO != chamado.id_solicitante) { // setor 3 é o setor de TI
                    divClassStyle = 'divMyMessage';
                    pClassStyle = 'myMessage';
                } else {
                    divClassStyle = 'divYouMessage';
                    pClassStyle = 'youMessage';
                }
            }

            let file;

            if (mensagem.arq == null) {
                file = "";
            } else {
                file = "<tr><td><div class='" + divClassStyle + "'><p class='" + pClassStyle + "'>" +
                    "<label style= 'font-size: small'>" + mensagem.autor_id + "<br></label>" + mensagem.nome_ARQ +
                    "<br><a href='../model/baixarAnexoMSG.php?id=" + mensagem.arq + "'>" +
                    "Baixar anexo <img src='../assets/img/downAnxMsg.png'>" +
                    "</a><br><label style= 'font-size: small'>" + mensagem.hora + " " + mensagem.data + "<label></p></div></td></tr>";
            }

            let message;

            if (mensagem.conteudo == "Anexo") {
                message = "";
            } else {
                message = "<tr><td><div class='" + divClassStyle + "'><p class='" + pClassStyle + "'>" +
                    "<label style= 'font-size: small'>" + mensagem.autor_id + "<br></label>" +
                    mensagem.conteudo + "<br><label style= 'font-size: small'>" + mensagem.hora + " " + mensagem.data +
                    "</label></p></div></td></tr>";
            }

            conversas.insertAdjacentHTML("beforeend", message + file);

            gridChat.scrollTop = gridChat.scrollHeight;

        })
    }
}

function atualizaChat(id) {
    conversas.innerHTML = "";
    conversasFunction(id);
}

messageText.addEventListener("keypress", function (event) {

    if (event.shiftKey && event.code === 'Enter') {


    } else if (event.code === 'Enter' || event.code === 'NumpadEnter') {

        event.preventDefault();

        btnSubmitMessage.click();

    }

});

async function requestMessage(url, config) {

    let resposta = await requestFetchWithPost(url, config);

    if (resposta != "erro") {
        if (resposta == "Dados Invalidos" || resposta == "Limite excedido") {
            window.alert("Informe os dados corretamente");

        } else {
            conversasFunction(resposta);
        }
    } else {

    }
}

formMessage.addEventListener("submit", e => {
    e.preventDefault();
    const dadosMessage = new FormData(formMessage);

    let url = '../model/insertMessage.php';
    let config = {
        method: "POST",
        body: dadosMessage
    }

    if (dadosMessage.get('msg').length > 9990 || dadosMessage.get('arquivo').size > 26214500) {
        window.alert("Limite de caracteres excedido!!!");

    } else {
        requestMessage(url, config);

        messageText.value = "";
        conversas.innerHTML = "";
        messageFile.value = null;
        nameFile.innerHTML = "max: 25MB";
    }
})