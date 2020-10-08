const musicas = require("../model/musicas.json")

// console.log(musicas)

const novaListaMusicas = musicas.map(musica => {
    const novaMusica = {
        id: musica.id,
        nome: musica.name,
        amostra: musica.preview_url,
        nome_album: musica.album.name,
        imagem: musica.album.url,
        artista: musica.artists.name
    }
    return novaMusica
})


const getMusicas = (request, response) => {
    console.log(request.url)  
    response.status(200).send(novaListaMusicas)
}

const getMusicasbyId = (request, response) => {
    const id = request.params.id
    const musica = novaListaMusicas.find(item => item.id == id)
    if (musica) {
        response.status(200).send(musica)
    } else {
        response.status(404).send("Música não encontrada!")
    }
}

const listaArtistas = musicas.map(item => {
    return  {
        id: item.artists.id,
        nome: item.artists.name
    }
})


const getArtistas = (request, response) => {
    let listaSemRepetir = []

    listaArtistas.forEach(artista => {
        const encontrei = listaSemRepetir.find(item => item.id == artista.id)
        if(!encontrei) {
            listaSemRepetir.push(artista)
        }
    })
    
    response.status(200).send(listaSemRepetir)
}

const listaMusicas = musicas.map(musica => {
    const novaMusica = {
        id: musica.id,
        nome: musica.name,
        amostra: musica.preview_url,
        album_nome: musica.album.name,
        imagem: musica.album.url,
        artista: musica.artists.name,
        duracao: musica.duration_ms
    }
    return novaMusica
})


const getArtistabyId = (request, response) => {
    const id = request.params.id
    const artista = listaArtistas.find(artista => artista.id == id)
    if (artista) {

        const musicas = listaMusicas.filter(item => item.artista == artista.nome)
    
        const novoArtista = {
            id: artista.id,
            nome: artista.nome,
            musicas: musicas
        }
        response.status(200).send(novoArtista)
    } else {
        response.status(404).send("Artista não encontrada!")
    }
}

const ListaAlbuns = musicas.map(musica => {
    const album = {
        id: musica.album.id,
        nome: musica.album.name,
        data_lancamento: musica.album.release_date,
        total_musicas: musica.album.total_tracks,
        imagem: musica.album.url
    }
    return album
})

const getAlbuns = (request, response) => {
    let listaSemRepetir = []

    ListaAlbuns.forEach(album => {
        const encontrei = listaSemRepetir.find(item => item.id == album.id)
        if(!encontrei) {
            listaSemRepetir.push(album)
        }
    })
    response.status(200).send(listaSemRepetir)
}

const getAlbumPorNome = (request, response) => {
    const nome = request.params.nome
    
    const encontrarmusicas = listaMusicas.filter(musica =>  {
        return musica.album_nome.toLowerCase().split(' ').join('-') === nome
    })

    // Não funciona com o if(encontrarmusicas) e if(!encontrarmusicas). Por que?
    if(encontrarmusicas != ''){
        const encontrarAlbum = ListaAlbuns.find( album => album.nome == encontrarmusicas[0].album_nome)

        const novoAlbum = {
            id: encontrarAlbum.id,
            nome: encontrarAlbum.nome,
            data_lancamento: encontrarAlbum.data_lancamento,
            total_musicas: encontrarAlbum.total_musicas,
            imagem: encontrarAlbum.imagem,
            musicas: encontrarmusicas
        }
        if(encontrarAlbum){
            response.status(200).send(novoAlbum) 
        }else{
            response.status(404).send({message: 'Album não encontrado!'}) 
        }
    }
}

module.exports = {
    getMusicas,
    getMusicasbyId,
    getArtistas,
    getArtistabyId, 
    getAlbuns,
    getAlbumPorNome
}