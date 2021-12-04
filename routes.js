const routes = require('express').Router()

var contatos = []

function gerar_id() {
    return Math.floor(Math.random() * 1000000)
}

routes.post('/inserir', (req, res) => {
    const {nome, numero} = req.body
    contatos.push({id: gerar_id(), nome, numero})
    return res.json(contatos)
})

routes.get('/listar', (req, res) => {
   return  res.json(contatos)
})

routes.put('/atualizar', (req, res) => {
    const {id} = req.query
    const {nome, numero} = req.body

    const contatos_atualizados = []

    contatos.map((contato) => {
        if (contato.id === Number(id)) {
            const contato_atualizado = {
                id: contato.id, 
                nome: nome,
                numero: numero
            }
            contatos_atualizados.push(contato_atualizado)
        } else contatos_atualizados.push(contato)
    })
    
    contatos = contatos_atualizados
    return res.send()
})

routes.delete('/deletar', (req, res) => {
    const {id} = req.query

    const contatos_atualizados = []
   
    contatos.map((contato) => {
        if (contato.id !== Number(id)) {
            contatos_atualizados.push(contato)
        }
    })

    contatos = contatos_atualizados
    
    return res.send()
})

module.exports = routes
