import {getClue as getClueFromPromise} from './promise-version.js'
import {getClue as getClueFromAsyncFunction} from './async-await-version.js'
import {getClue as getClueFromCallback} from './callback-version.js'

let score = 0

window.addEventListener('DOMContentLoaded', event => {
    
    document
        .getElementById('use-promise')
        .addEventListener('click', event => {
            getClueFromPromise().then(clue => {
                setClueElements(clue)
            }).catch(error => console.log(error))
        })

    document
        .getElementById('use-async-await')
        .addEventListener("click", async (event) => {
            try {
                let clue = await getClueFromAsyncFunction()
                setClueElements(clue)
            } catch (e) {

            }
        })
    document
        .getElementById('use-callback')
        .addEventListener('click', event => {
            getClueFromCallback((status, clue) => {
                if(status === null){
                    setClueElements(clue)
                } else {
                    console.error(status)
                }
            })
        })

    document
        .getElementById("check-response")
        .addEventListener('click', event => {
            let playerAnswer = document.getElementById("player-response").value
            let answer = document.getElementById("answer")
            if(playerAnswer.trim() === answer.innerHTML.trim()) {
                score += Number.parseInt(document.getElementById("value").innerHTML)
                document.getElementById("score").innerHTML = `${score}`
                answer.classList.remove("is-hidden")
                event.target.classList.add("is-hidden")
            }
        })
})



function setClueElements(clue) {
    console.log(clue.answer)
    document
        .getElementById('question').innerHTML = clue.question
    document
        .getElementById('answer').innerHTML = clue.answer
    document
        .getElementById('value').innerHTML = clue.value
    document
        .getElementById('category-title').innerHTML = clue.category.title
    if(clue.invalid_count > 0){
        document
            .getElementById('invalid-count').innerHTML = 'invalid'
    } else {
        document
            .getElementById('invalid-count').innerHTML = 'valid'
    }
    document.getElementById("check-response").classList.remove("is-hidden")
    document.getElementById("player-response").value = ""
    document.getElementById("answer").classList.add("is-hidden")
}
