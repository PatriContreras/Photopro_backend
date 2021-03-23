const { getAll, create } = require('../../models/cliente');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs')

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
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        const result = await create(req.body);
        res.json(result)

    } catch {
        res.json({ error: 'error 422' })
    }
})


module.exports = router;