const modalNvChamado = document.getElementById('modal-NvChamado');
const contentNvChamado = document.getElementById('contentNvChamado');

const descricao = document.querySelector("#descricao");
const categoria = document.querySelector("#categoria");
const mensagem = document.querySelector("#mensagem");
const anexoLabel = document.getElementById('anexoLabel');
const formulario = document.querySelector("#formulario");
const telaNvChamado = document.querySelector("#telaNvChamado");
const msgSubmit = document.querySelector("#msgSubmit");

function novoChamado() {
    if (modalNvChamado) {

        modalNvChamado.classList.add('mostrar');

        modalNvChamado.addEventListener('click', (e) => {

            if (e.target.className == 'fecharNvChamado') {
                modalNvChamado.classList.remove('mostrar');
                telaNvChamado.classList.remove('modalTamanhoMaior');
                telaNvChamado.classList.add('modalTamanhoInicial');
                descricao.value = "";
                categoria.value = "";
                mensagem.value = "";
                anexoLabel.innerHTML = "";
                anexoLabel.innerHTML = '';
            }
        });
        formulario.removeAttribute("hidden");
        msgSubmit.setAttribute("hidden", "true");
        descricao.focus();
    }
}

async function nvChamadoRequest(url, config) {

    let resposta = await requestFetchWithPost(url, config);

    if (resposta != "erro") {
        if (resposta == "Dados Invalidos" || resposta == "Limite excedido") {
            window.alert("Informe os dados corretamente");

        } else {
            msgSubmit.innerHTML = "Chamado aberto com sucesso!";
            telaNvChamado.classList.remove('modalTamanhoMaior');
            telaNvChamado.classList.add('modalTamanhoInicial');
            getAllChamados();
        }
    } else {}
}

formulario.addEventListener("submit", function (event) {

    event.preventDefault();
    const data = new FormData(formulario);
    data.append('cat', categoria.value);

    let url = '../model/regisChamado.php';
    let config = {
        method: "POST",
        body: data
    }
    if ((data.get('msg').length > 9990 || data.get('desc').length > 48) || 
    (data.get('arquivo[]') != null && data.get('arquivo[]').size > 26214500)) {
        window.alert("Limite excedido!!!");

    } else {
        nvChamadoRequest(url, config);
        
        formulario.setAttribute("hidden", "true");
        msgSubmit.innerHTML = "Carregando...";
        msgSubmit.removeAttribute("hidden");
        descricao.value = "";
        categoria.value = "";
        mensagem.value = "";
        anexoLabel.innerHTML = "";   
    }
});

function addAnexo() {
    let titleDesc = document.createElement('p');
    titleDesc.setAttribute('class', 'titleAnx');
    titleDesc.innerHTML = "Descrição do arquivo: ";

    let campo = document.createElement('input');
    campo.setAttribute('type', 'text');
    campo.setAttribute('maxlength', '48');
    campo.setAttribute('name', 'descArquivo[]');

    let file = document.createElement('input');
    file.setAttribute('type', 'file');
    file.setAttribute('name', 'arquivo[]');
    file.setAttribute('class', 'file');
    file.setAttribute('onInput', 'addNextAnexo(this)');

    let img = document.createElement('img');
    img.setAttribute('src', '../assets/img/remove.png');
    img.setAttribute('class', 'imgAnx');
    img.setAttribute('onclick', 'removeAnexo(this);');

    let br = document.createElement('br');

    let labelInput = document.createElement('label');
    labelInput.setAttribute('id', 'file');

    labelInput.appendChild(titleDesc);
    labelInput.appendChild(campo);
    labelInput.appendChild(file);
    labelInput.appendChild(img);
    labelInput.appendChild(br);

    telaNvChamado.classList.remove('modalTamanhoInicial');
    telaNvChamado.classList.add('modalTamanhoMaior');
    anexoLabel.appendChild(labelInput);
}

function removeAnexo(elemento) {
    anexoLabel.removeChild(elemento.parentNode);

    if (anexoLabel.innerHTML == "") {
        telaNvChamado.classList.remove('modalTamanhoMaior');
        telaNvChamado.classList.add('modalTamanhoInicial');
    }
}

function addNextAnexo(object) {

    if (object.value !== null) {
        addAnexo();
    }

}