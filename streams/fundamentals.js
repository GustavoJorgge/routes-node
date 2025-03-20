// // Netflix & Spotify

// // Importação de clientes via CSV (Excel)
// //1gb - muitas linhas

// // Readable Streams / Writable Streams


// // // Streams -> 
// // process.stdin //tudo que estou recebendo como entrada eu estou enviando como saida
// // .pipe(process.stdout)

// import { Readable } from 'node:stream'

// class OneToHundredStream extends Readable {

//     index = 1
//     _read() {
//         const i = this.index++


//         setTimeout(() => {
//             if (i > 100) {
//                 this.push(null)
//             } else {
//                 //Em Streams no node, nós nunca trabalhamos de forma primitiva, ou seja, com numeros e caracteres, precisamos trabalhar com buffer
//                 const buf = Buffer.from(String(i))

//                 this.push(buf)
//             }
//         }, 1000)
//     }
// }

// new OneToHundredStream().pipe(process.stdout)

import {Readable,Writable, Transform} from 'node:stream'

class OneToHundredStream extends Readable{
    index = 1
        _read() {
            const i = this.index++
    
    
            setTimeout(() => {
                if (i > 100) {
                    this.push(null)
                } else {
                    //Em Streams no node, nós nunca trabalhamos de forma primitiva, ou seja, com numeros e caracteres, precisamos trabalhar com buffer
                    const buf = Buffer.from(String(i))
    
                    this.push(buf)
                }
            }, 1000)
        }
}

class MultiplyByTenStream extends Writable{
    _write(chunk, encoding, callback){
        console.log(Number(chunk.toString())*10)
        callback()
    }
}

class inverteNumeroStream extends Transform{
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
    }
}
new OneToHundredStream()
.pipe(new inverteNumeroStream)
.pipe(new MultiplyByTenStream)