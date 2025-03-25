// /users/:id
export function buildRoutePath(path){
    const routeParametersRegex = /:([a-zA-Z]+)/g
    // Quando utilizamos $1, nós pegamos o retorno na posição 1 (id) e colocamos como nome do grupo
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')
    
    console.log(pathWithParams)

    //const test = /\/users\/([a-z-0-9-_]+)/
    const pathRegex = new RegExp(`^${pathWithParams}`)
    console.log(Array.from(path.matchAll(routeParametersRegex)))

    return pathRegex
}