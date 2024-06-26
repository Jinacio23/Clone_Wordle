const letra = document.querySelectorAll('.letra')
let fileira = document.querySelector('.coluna.l1')
let nodes = fileira.children
const teclas = document.querySelectorAll('.btns')

const palavra = ['canoa', 'balao', 'arpeu', 'sagaz', 'amago', 'negro', 'termo', 'exito', 'mexer', 'nobre', 'senso', 'afeto', 'algoz', 'etica', 'plena', 'fazer', 'tenue', 'mutua', 'assim', 'vigor', 'sutil', 'aquém', 'porém', 'secao', 'fosse', 'poder', 'sanar', 'sobre', 'audaz', 'ideia', 'cerne', 'inato', 'moral', 'desde', 'muito', 'justo', 'honra', 'torpe', 'sonho', 'razao', 'futil', 'etnia', 'icone', 'amigo', 'anexo', 'egide', 'tange', 'lapso', 'haver', 'expor', 'dengo', 'tempo', 'entao']
const alfabeto = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

let arrVerde = []//letra certa
let arrAmarela = []//letra errada
let arrCinza = []//letra inexistente

let linha = 1

//Resposta final
function SelecionarPalavra() {
    let x = Math.floor(Math.random() * palavra.length)
    return palavra[x]
}
let resposta = SelecionarPalavra()

//letra focada
function focar(b) {
    // letra.forEach((box) => {
    //     box.classList.remove('selecionado') 
    // })
    b.classList.add('selecionado')
}

tentativaAtual()

checarPalavra()

//Controle de teclas (De A - Z)
letra.forEach(addEventListener('keypress', (e) => {
    if (alfabeto.includes(e.key)) {
        e.target.value = e.key.toUpperCase()
    } else {
        e.returnValue = false
    }

    if (e.target.nextElementSibling !== null) {//avança uma letra     
        e.target.classList.remove('selecionado')
        e.target.nextElementSibling.classList.add('selecionado')
        e.target.nextElementSibling.focus()
    } else {
        e.target.classList.remove('selecionado')
    }

    if (e.target.value == "" && e.target.previousElementSibling !== null) {//recua uma letra
        e.target.classList.remove('selecionado')
        e.target.previousElementSibling.classList.add('selecionado')
        e.target.previousElementSibling.focus()
    } else {
        e.target.classList.remove('selecionado')
    }

    if (e.target.value == "" && e.target.nextElementSibling !== null) {
        e.target.nextElementSibling.classList.remove('selecionado')
    }

}));

//Tentativa atual
function tentativaAtual() {
    if (nodes[0].hasAttribute('disabled')) {
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].removeAttribute('disabled')
        }
    } else {
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].setAttribute('disabled', 'true')
        }
    }
}

//Confirmar palpite
function checarPalavra() {
    addEventListener('keypress', (e) => {
        let count = 0

        //caso falte completar a palavra
        if (e.keyCode === 13) {
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].value == "") {
                    //alert('complete a palavra primeiro')

                    Toastify({
                        text: "Complete a palavra primeiro",
                        duration: 3000,
                        newWindow: true,
                        close: false,
                        gravity: "top", // `top` or `bottom`
                        position: "center", // `left`, `center` or `right`
                        style: {
                            background: "#B69E3B",
                            borderRadius: "16px",
                            boxShadow: "none",
                            fontFamily: "sans-serif",
                            color: "#7B6D15",
                            fontWeight: 600
                        },
                        offset: {
                            x: 0,
                            y: 68
                        }
                    }).showToast();

                    

                    break
                } else {
                    count++
                    if (count == 5) {
                        checarResposta()
                    }
                }
            }
        }
    })
}

function checarResposta() {
    let tentativa = []

    for (let t = 0; t < nodes.length; t++) {
        tentativa.push(nodes[t].value)
    }

    //caso resposta correta senão...
    if (tentativa.join("") == resposta.toUpperCase()) {
        adicionarCores(tentativa)
        //alert('Parabéns, você acertou!')

        Toastify({
            text: "Parabéns, você acertou!",
            duration: 3000,
            newWindow: true,
            close: false,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
                background: "#538D4E",
                borderRadius: "16px",
                boxShadow: "none",
                fontFamily: "sans-serif",
                color: "#2B5028",
                fontWeight: 600
            },
            offset: {
                x: 0,
                y: 68
            }
        }).showToast();

        resetGame()
    } else {//proxima tentativa
        tentativaAtual()
        adicionarCores(tentativa)
        //passa para próxima linha
        linha++
        if (linha < 7) {//Máximo de tentativas permitidas 6, senão game over
            //Atualiza e remove disabled da linha de tentativa atual
            fileira = document.querySelector(`.coluna.l${linha}`)
            nodes = fileira.children
            tentativaAtual()
        } else {
            //alert('Você perdeu')
            arrVerde = []
            arrAmarela = [] //reset de arrays
            arrCinza = []

            Toastify({
                text: "Então né...Você perdeu!",
                duration: 3000,
                newWindow: true,
                close: false,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                style: {
                    background: "#BA4747",
                    borderRadius: "16px",
                    boxShadow: "none",
                    fontFamily: "sans-serif",
                    color: "#5F0F1D",
                    fontWeight: 600
                },
                offset: {
                    x: 0,
                    y: 68
                }
            }).showToast();

            resetGame()
        }
    }
}

//Dicas/cores do jogo
function adicionarCores(palpValue) {

    let trueValue = resposta.toUpperCase()
    let trueArr = trueValue.split('')

    for (let i = 0; i < nodes.length; i++) {

        if (palpValue[i] == trueArr[i]) { //bgVerde - letra no local certo
            if(!arrVerde.includes(palpValue[i])){
                arrVerde.push(palpValue[i])
            }
            nodes[i].style.backgroundColor = '#538B4E'

        } else if (trueValue.includes(palpValue[i])) {//bgAmarelo - letra existente, porém no lugar errado
            if(!arrAmarela.includes(palpValue[i])){
                arrAmarela.push(palpValue[i])
            }
            nodes[i].style.backgroundColor = '#B69E3B'

        } else {//bgCinza - letra inexistente na palavra
            if(!arrCinza.includes(palpValue[i])){
                arrCinza.push(palpValue[i])
            }
            nodes[i].style.backgroundColor = '#585858'

        }

    }
    tecladoCores(arrVerde,arrAmarela,arrCinza)
}

//Cores do teclado
function tecladoCores (Ve,Am,Ci) {
    teclas.forEach(tecla => {
        if(Ve.includes(tecla.innerHTML)){//arrVerde
            tecla.style.backgroundColor = '#538B4E'

        } else if (Am.includes(tecla.innerHTML)){//arrAmarela
            tecla.style.backgroundColor = '#B69E3B'

        } else if (Ci.includes(tecla.innerHTML)){//arrCinza
            tecla.style.backgroundColor = '#585858'

        }
    })
}

//Novo jogo/reset
function resetGame(){
    Toastify({
        text: "Jogar de novamente",
        duration: 9999,
        newWindow: false,
        destination: "../index.html",
        close: false,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        style: {
            background: "#F9FF00",
            borderRadius: "16px",
            boxShadow: "none",
            fontFamily: "sans-serif",
            color: "#000",
            fontWeight: 600,
        },
        offset: {
            x: 0,
            y: 68
        }
    }).showToast();
}