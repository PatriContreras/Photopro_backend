
const { getById, updateById, deleteById } = require("../../models/cliente");
const bcrypt = require('bcrypt');

const router = require('express').Router();

router.get('/:idCliente', async (req, res) => {
    try {
        const clientes = await getById(req.params.idCliente);
        res.json(clientes)
    } catch {
        res.json({ error: 'error 422' })

    }
});


router.put('/', async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        const result = await updateById(req.body);
        res.json(result)
    } catch {
        res.json({ error: 'clinentes update error 422' })
    }
});

router.delete('/:idCliente', async (req, res) => {
    try {
        //console.log('id', req.params.idCliente);
        const result = await deleteById(req.params.idCliente);
        res.json(result)
    } catch {
        res.json({ error: 'error 422' })

    }

});
module.exports = router;


