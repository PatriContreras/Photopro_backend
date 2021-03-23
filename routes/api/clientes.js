const { getAll, create } = require('../../models/cliente');

const router = require('express').Router();


router.get('/', async (req, res) => {
    try {
        const clientes = await getAll();
        res.json(clientes)
    } catch (error) {
        res.json({ error: 'error 422' })
    }
})


router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const result = await create(req.body);
        res.json(result)

    } catch {
        res.json({ error: 'error 422' })
    }
})


module.exports = router;