import {Readable} from 'node:stream'

class OneToHundredStream extends Readable{
    index = 1
        _read() {
            const i = this.index++
    
    
            setTimeout(() => {
                if (i > 10) {
                    this.push(null)
                } else {
                    //Em Streams no node, nós nunca trabalhamos de forma primitiva, ou seja, com numeros e caracteres, precisamos trabalhar com buffer
                    const buf = Buffer.from(String(i))
    
                    this.push(buf)
                }
            }, 1000)
        }
}


// para enviar uma informação para o back, deve ser sempre como post ou put
fetch('http://localhost:3334',{
    method: 'POST',
    body: new OneToHundredStream(),
    duplex:"half",
}).then(response =>{
    return response.text()
}).then(data=> {
    console.log(data)
})




