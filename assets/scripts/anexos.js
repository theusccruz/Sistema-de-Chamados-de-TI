const modalAnexo = document.getElementById('modal-anexos');
const anx = document.getElementById('dadosAnexos');
const contentAnexos = document.getElementById('contentAnexos');
const numCH = document.getElementById('numCH');


function anexos(objeto) {

    const idAnexo = objeto.id;

    if (modalAnexo) {

        modalAnexo.classList.add('mostrar');

        modalAnexo.addEventListener('click', (e) => {

            if (e.target.id == 'modal-anexos' || e.target.className == 'fecharAnexos') {
                modalAnexo.classList.remove('mostrar');
                anx.innerHTML = "";


            }

        });

        fetch('../model/selChamadoEdit.php?id=' + idAnexo, {

            method: 'GET'

        })
        .then(response => {
            response.json()

            .then(dadosChamado => {
                //console.log(dadosChamado);

                    numCH.innerHTML = dadosChamado.id;
                    
            })
        })

        fetch('../model/selAnexos.php?id=' + idAnexo, {

            method: 'GET'

        })
        .then(response2 => {            
            response2.json()

            .then(dadosAnexos => {
                //console.log(dadosAnexos);                

                dadosAnexos.forEach(result => {

                    if (result.descr == null) {

                        result.descr = "";
                        
                    } else {
                        
                    }

                    anx.insertAdjacentHTML("beforeend", "<tr><td>" + result.descr +
                     "</td><td>" + result.nome_arq + 
                     "</td><td>" + "<a href = '../model/baixarAnexo.php?id=" + result.id +
                     "'><img class='baixar' src='../assets/img/baixar3.png'></a></td></tr>" )

                    
                    
                });
               
            })
        })


        
        




    }
}