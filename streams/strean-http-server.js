import http from 'node:http'
import { Transform } from 'node:stream';



class inverteNumeroStream extends Transform{
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1

        console.log(transformed)

        callback(null, Buffer.from(String(transformed)))
    }
}









// req => readableStream
// res => WritableStream

const server = http.createServer(async(req,res)=>{

    const buffers = []

    // o await aguarda cada pedaço de stream ser retornado
    for await( const chunk of req){
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()

    console.log(fullStreamContent)

    return res.end(fullStreamContent)
    //return req.pipe(new inverteNumeroStream()).pipe(res)
})

server.listen(3334)
