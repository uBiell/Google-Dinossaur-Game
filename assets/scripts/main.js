const dino = document.querySelector('.dino')
const background = document.querySelector('.background')

let isJumping = false
let isGameOver = false;
let position = 0;

function getKey(event){
    if(event.keyCode === 32){
        if(!isJumping){
            dinoJump()
        }
    }
}

function dinoJump(){
    isJumping = true

    let upInterval = setInterval(() => {
        position += 20

        if(position >= 150){
            clearInterval(upInterval)
            
            let downInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downInterval)
                    isJumping = false
                }else{
                    position -= 20
                    dino.style.bottom = position + 'px'
                }
            }, 35)    
        }else{
            position += 20
            dino.style.bottom = position + 'px'
        }
    }, 35)
}

function createCactus (){
    const cactus = document.createElement('div')
    let cactusPosition = 1000
    let randomNumber = Math.random() * 6000


    // if (isGameOver) return

    cactus.classList.add('cactus')
    cactus.style.left = 1000 + 'px'
    background.appendChild(cactus)

    let leftInterval = setInterval (() => {
        cactusPosition -= 10
        cactus.style.left = cactusPosition + 'px'

        
        if(cactusPosition < -60 ){
            //saiu da tela
            clearInterval(leftInterval)
            background.removeChild(cactus)
        }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
            //game over
            clearInterval(leftInterval)
            // isGameOver = true
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>'
        }else{
            cactusPosition -= 10
            cactus.style.left = cactusPosition + 'px'
        }
    }, 35)

    setTimeout(createCactus, randomNumber)
}

createCactus()

document.addEventListener('keyup', dinoJump)