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

/*Três formas do front enviar os dados
Query Parameters: http://localhost:3333/users?userID=1 -> URL Stateful
    Utilizado para enviar informações que não sao sensiveis, como: Paginação, filtrar, buscar, etc....
Route Parameters: http://localhost:3333/users/1 -> Identificação de recurso
    Serve para identificarmos um recurso 
Request Body: Envio de informações de um formulário
*/



const server = http.createServer(async (request, response) => {
    console.log('Requisição recebida:', request.method, request.url);
    /*
    req envia informações para o servidor
     
    res devolve uma resposta para quem esta chamando o servidor
    */


    const { method, url } = request
    await json(request, response)

    const route = routes.find(route => {
        return route.method == method && route.path.test(url)
    })

    if(route){
        const routeParams = request.url.match(route.path)

        request.params = {...routeParams.group}

        return route.handler(request,response)
    }

    return response.writeHead(404).end('Not foundZ')
})

server.listen(3333)

