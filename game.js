import {getClue as getClueFromPromise} from './promise-version.js'

window.addEventListener('DOMContentLoaded', event => {
    document
        .getElementById('use-promise')
        .addEventListener('click', event => {
            getClueFromPromise().then(clue => {
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
                        .getElementByIdZ('invalid-count').innerHTML = 'invalid'
                } else {
                    document
                        .getElementByIdZ('invalid-count').innerHTML = 'valid'
                }
            }).catch(error => console.log(error))
        })
})
