const { updateById, deleteById } = require("../../models/fotografo");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = require('express').Router();


router.put('/', async (req, res) => {
    try {
        const fotografo = await updateById(req.body)
        res.json(fotografo)
    } catch (err) {
        res.json({ error: '422' })
    }
})

router.delete('/:idFotografo', async (req, res) => {
    try {
        const result = await deleteById(req.params.idFotografo)
        res.json(result)
    } catch (err) {
        res.json({ error: 'error 422' })
    }
})

module.exports = router;