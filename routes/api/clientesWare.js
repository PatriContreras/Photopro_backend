
const { getById, updateById, deleteById } = require("../../models/cliente");
const { checkTokenCliente } = require("./middleware")
const bcrypt = require('bcrypt');

const router = require('express').Router();

router.get('/perfil', checkTokenCliente, async (req, res) => {
    try {
        const cliente = await getById(req.clienteId)
        res.json(cliente)

    } catch (err) {
        res.json({ error: 'es un error by id' })

    }
})


router.put('/', checkTokenCliente, async (req, res) => {
    try {

        req.body.password = bcrypt.hashSync(req.body.password, 10);
        req.body.id = req.clienteId;
        const cliente = await updateById(req.body);
        res.json(cliente)
    } catch {
        res.json({ error: 'clinentes update error 422' })
    }
});

router.delete('/', checkTokenCliente, async (req, res) => {
    try {
        //console.log('id', req.params.idCliente);
        const result = await deleteById(req.clienteId);
        res.json(result)
    } catch {
        res.json({ error: 'error 422' })

    }

});
module.exports = router;


