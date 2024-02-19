const palpite = document.querySelector('.abilitado')
const letra = document.querySelectorAll('.letra')
let fileira = document.querySelector('.coluna.l1')

const palavra = ['canoa','balao','arpeu']
const alfabeto = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

let nodes = palpite.children
//console.log(nodes);

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

checarResposta()

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
    for(let i = 0; i < nodes.length; i++){
    nodes[i].removeAttribute('disabled')
}
}

//Confirmar palpite
function checarResposta() {
    addEventListener('keypress', (e) => {
        let tentativa = []

        if(e.keyCode === 13){
            for(let i = 0; i < nodes.length; i++){
                if(nodes[i].value == ""){
                    alert('complete a palavra primeiro')
                    break
                } 
            }  
        }

        for(let t = 0; t < nodes.length; t++){
            tentativa.push(nodes[t].value)
        }

        if(tentativa.join("") == resposta.toUpperCase()){
            alert('Parabéns, você acertou!')
            //reiniciar jogo
        } else {
            //proxima tentativa
        }
           
    })
}


//Proxima letra - tecla de espaço
// function proximaLetra() {
//     letra.forEach(addEventListener('keypress', (e) => { 
//         let selecao = document.querySelector('selecionado')
//         if(e.keyCode === 32) {
          
//         }
//     }))
// }
