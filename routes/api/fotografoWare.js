const { updateById, deleteById } = require("../../models/fotografo");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = require('express').Router();


router.put('/', async (req, res) => {
    try {
        console.log('antes de hasync', req.fotografoId);
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        req.body.id = req.fotografoId;
        const fotografo = await updateById(req.body)
        res.json(fotografo)
    } catch (err) {
        res.json({ error: 'error update 422' })
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