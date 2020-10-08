const games = require('../model/games.json')

const NewGames = games.map(game => {
    const newGame = {
        id: game.id,
        nome: game.name,
        genero: game.genre,
        plataformas: game.platforms,
        capa: game.cover
    }
    return newGame
})

const GetAll = (request, response) => {
    response.status(200).send(NewGames)
}

const newGamesForID = games.map( game => {
    const newGameID = {
        id: game.id,
        nome: game.name,
        genero: game.genre,
        plataformas: game.platforms,
        data_lancamento: game.first_release_date,
        slug: game.slug,
        resumo: game.summary,
        empresa: game.company,
        capa: game.cover
    }
    return newGameID
})

const getById = (request, response) => {
    const id = request.params.id
    const findID = newGamesForID.find(game => game.id == id)
    if (findID) {
        response.status(200).send(findID)
    } else {
        response.status(404).send({ message: "jogo não encontrado!" })
    }
} 

module.exports = {
    GetAll,
    getById
} 