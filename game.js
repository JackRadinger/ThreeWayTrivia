import {getClue as getClueFromPromise} from './promise-version.js'
import {getClue as getClueFromAsyncFunction} from './async-await-version.js'
import {getClue as getClueFromCallback} from './callback-version.js'

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
})



function setClueElements(clue) {
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
}
