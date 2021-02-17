export async function getClue() {
    const response = await fetch("https://jservice.xyz/api/random-clue")
    if(response.ok) {
        return await response.json()
    } else {
        throw new Error(`An error occurred: ${response.status}`)
    }
}

export async function deleteClue(clue){
    const response = await fetch(`https://jservice.xyz/api/clues/${clue}`,{method:'DELETE'})
    if(response.ok) {
        return await response.json()
    } else {
        throw new Error(`An error occurred: ${response.status}`)
    }
}
