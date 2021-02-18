export function getClue(callback) {
    let request = new XMLHttpRequest()
    request.addEventListener("readystatechange", event => {
        if(request.readyState === XMLHttpRequest.DONE) {
            if(request.status >= 200 && request.status <= 299){
                let clue = JSON.parse(request.responseText)
                console.log(clue);
                callback(null, clue);
            } else {
                callback(request.status)
                return
            }
        } else {
            return
        }
    })
    request.open('GET', 'https://jservice.xyz/api/random-clue')
    request.send();
}

export function deleteClue(callback, clue) {
    let request = new XMLHttpRequest()
    request.addEventListener("readystatechange", event => {
        if(request.readyState === XMLHttpRequest.DONE) {
            if(request.status >= 200 && request.status <= 299){
                let clue = JSON.parse(request.responseText)
                callback(null, clue);
            } else {
                callback(request.status)
                return
            }
        } else {
            return
        }
    })
    request.open('DELETE', `https://jservice.xyz/api/clues/${clue}`)
    request.send();
}