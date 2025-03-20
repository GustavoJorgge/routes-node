export async function json (request,response){
    
    const buffers = []

    for await (const chunk of request){
        buffers.push(chunk)
    }

    try{
        //convertemos em JSON pois a forma nativa é texto, e precisamos de ser em json para puxar os nome
        request.body = JSON.parse(Buffer.concat(buffers).toString())
    }catch{
        request.body = null
    }

    response.setHeader('Content-type', 'application/json') //setando um tipo de cabeçalho
}