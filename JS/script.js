const letra = document.querySelectorAll('.letra')
let fileira = document.querySelector('.coluna.l1')
let nodes = fileira.children

const palavra = ['canoa','balao','arpeu']
const alfabeto = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
let linha = 1

console.log(nodes);

//Resposta final
function SelecionarPalavra() {
    let x = Math.floor(Math.random() * palavra.length)
    return palavra[x]
}
let resposta = SelecionarPalavra()

//letra focada
function focar(b) {
    letra.forEach((box) => {
        box.classList.remove('selecionado')
    })
    b.classList.add('selecionado') 
}

tentativaAtual()

checarPalavra()

//Controle de teclas (De A - Z)
letra.forEach(addEventListener('keypress', (e) => {
    if(alfabeto.includes(e.key)){
        return e.target.value = e.key.toUpperCase()
    } else {
        e.returnValue = false
    }
}));

//Tentativa atual
function tentativaAtual() {
    if(nodes[0].hasAttribute('disabled')){
        for(let i = 0; i < nodes.length; i++){
        nodes[i].removeAttribute('disabled')
        }
    } else {
        for(let i = 0; i < nodes.length; i++){
        nodes[i].setAttribute('disabled','true')
        }
    }
}

//Confirmar palpite
function checarPalavra() {
    addEventListener('keypress', (e) => {
        let count = 0

        //caso falte completar a palavra
        if(e.keyCode === 13){
            for(let i = 0; i < nodes.length; i++){
                if(nodes[i].value == ""){
                    alert('complete a palavra primeiro')
                    break
                } else {
                    count++
                    if(count == 5){
                        checarResposta()
                    }
                }
            }  
        }     
    })
}

function checarResposta() {
    let tentativa = []

    for(let t = 0; t < nodes.length; t++){
        tentativa.push(nodes[t].value)
    }

    //caso resposta correta senão...
    if(tentativa.join("") == resposta.toUpperCase()){
        alert('Parabéns, você acertou!')
        //reiniciar jogo

    } else {//proxima tentativa
        tentativaAtual()
        //passa para próxima linha
        linha++
        if(linha < 7){//Máximo de tentativas permitidas 6, senão game over
            //Atualiza e remove disabled da linha de tentativa atual
            fileira = document.querySelector(`.coluna.l${linha}`)
            nodes = fileira.children
            tentativaAtual()
        } else {
            alert('Você perdeu')
        }
    }  
}

//Dicas/cores do jogo
function adicionarCores() {
//bgVerde - letra no local certo
//bgAmarelo - letra existente, porém no lugar errado
//bgVermelho - letra inexistente na palavra
}