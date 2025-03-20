import http from 'http'
import { json } from './middlewares/json.js';
import { routes } from './route.js';
// UUID => Unique Universal ID
// import fastify from 'fastify'

// - criar usuario
// - Listar usuarios
// - Edicao de usuarios
// - Remocao de usuarios

// - HTTP 
//     - Metodo http
//     - URL

// Cabeçalhos (Requisição, Resposta) => Metadados



const server = http.createServer(async (request, response) => {
    console.log('Requisição recebida:', request.method, request.url);
    /*
    req envia informações para o servidor
     
    res devolve uma resposta para quem esta chamando o servidor
    */


    const { method, url } = request
    await json(request, response)

    const route = routes.find(route => {
        return route.method == method && route.path == url
    })

    if(route){
        return route.handler(request,response)
    }

    return response.writeHead(404).end('Not foundZ')
})

server.listen(3333)

// localhost:3333
