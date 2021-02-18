import {getClue as getClueFromPromise, deleteClue as deleteClueFromPromise, postClue as postClueFromPromise} from './promise-version.js'
import {getClue as getClueFromAsyncFunction, deleteClue as deleteClueFromAsyncFunction} from './async-await-version.js'
import {getClue as getClueFromCallback, deleteClue as deleteClueFromCallback} from './callback-version.js'

let score = Number.parseInt(localStorage.getItem('score')) || 0
let clueId = '';


window.addEventListener('DOMContentLoaded', event => {
    setClueElements(JSON.parse(localStorage.getItem('clue')) || null)
    document.getElementById("score").innerHTML = `${score}`


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
                localStorage.setItem('score', score)
            }
        })
    document
        .getElementById('delete-promise')
        .addEventListener('click', event => {
            deleteClueFromPromise(clueId).then(response => {
                console.log(response)
            });
        })
    document
        .getElementById('delete-async')
        .addEventListener('click', async event => {
            try {
                let clue = await deleteClueFromAsyncFunction(clueId)
                console.log(clue);
            } catch (e) {
                console.log(e)
            }
        })

    document
        .getElementById('delete-callback')
        .addEventListener('click', event => {
            deleteClueFromCallback((status, clue) => {
                if(status === null) {
                    console.log(clue)
                } else {
                    console.error(status)
                }
            }, clueId)
        })

    document
        .getElementById('submit-promise')
        .addEventListener("click", event => {
            event.preventDefault()
            let newClue = {
                question: document.getElementById("new-question-text").value,
                answer: document.getElementById("new-question-answer").value,
                value: Number.parseInt(document.getElementById("new-question-value").value),
                categoryId: 1
            }
            postClueFromPromise(newClue).then(response => {
                console.log(response)
            })
        })
})



function setClueElements(clue) {

    if(clue === null) {
        return
    }
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
    localStorage.setItem('clue', JSON.stringify(clue))
    clueId = clue.id;
}
