import { Database} from "./database.js"
import {randomUUID} from 'node:crypto'
import { buildRoutePath } from "./utils/build-route-path.js"

const database = new Database()

export const routes = [{
    method: 'GET',
    path:  buildRoutePath('/users'),
    handler:(request,response)=>{

        const {search} = request.query
        const users = database.select('users', search ?{
            name: search,
            email: search,
        }: null)

        console.log(request.query)

        return response.end(JSON.stringify(users))
    }
},
{
    method: 'POST',
    path:  buildRoutePath('/users'),
    handler:(request,response)=>{
        const { name, email } = request.body

        const user = {
            id: randomUUID(),
            name,
            email,
        }

        database.insert('users',user)

        return response
            .writeHead('201') //Sempre que criarmos algo, retornamos 201 para o front-end
            .end('Cadastra usuario')
    } 
},
{
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (request, response) => {

      const { id } = request.params

      database.delete('users', id)

      return response.writeHead(204).end()
    }
},
{
    method: 'PUT',
    path:  buildRoutePath('/users/:id'),
    handler:(request,response) => {

        const {id} = request.params;
        const {name, email} = request.body;

        console.log("Body recebido:", name, email)
        
        database.update('users', id,{ name, email })

        console.log(request.params)
        return response.writeHead(204).end()
    }
}

]