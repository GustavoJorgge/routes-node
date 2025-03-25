// serach=gustavo&page=2 -> ['search=gustavo', 'page=2']

// Ficara desta forma
// ['search', 'gustavo']
// ['page','2']

export function extractQueryParams(query){
    return query.substr(1).split('&').reduce((queryParams, param) =>{
        const [key, value] = param.split('=')

        queryParams[key] = value
        
        return queryParams;
    },{})
    //substract ignora o primeiro caracter (?)
    //split('&') ele transforma em Array removendo o &
    //reduce é um metodo do JS que percorre um array e transforma em outra coisa. O segundo parametro informa qual estrutura de dados vamos utilizar
     
}