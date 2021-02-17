export function getClue(){
    return fetch('https://jservice.xyz/api/random-clue').then(response => {
        if(response.ok) {
            return response.json()
        } else {
            throw new Error(`An error occurred: ${response.status}`)
        }
    }).then(clue => clue);
}


export function deleteClue(clue){
    return fetch(`https://jservice.xyz/api/clues/${clue}`,{method:'DELETE'}).then(response => {
        if(response.ok) {
            return response.json()
        } else {
            throw new Error(`An error occurred: ${response.status}`)
        }
    }).then(clue => clue);
}
