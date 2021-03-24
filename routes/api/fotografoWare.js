const { updateById, deleteById } = require("../../models/fotografo");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { checkToken } = require("./middleware");

const router = require('express').Router();


router.put('/', checkToken, async (req, res) => {
    try {

        req.body.password = bcrypt.hashSync(req.body.password, 10);
        req.body.id = req.fotografoId;

        const fotografo = await updateById(req.body)

        res.json(fotografo)
        console.log('estas aqui', req.body);
    } catch (err) {
        res.json({ error: 'error update 422' })
    }
})


router.delete('/', checkToken, async (req, res) => {
    try {

        const result = await deleteById(req.fotografoId)

        res.json(result)



    } catch (err) {
        res.json({ error: 'error 422' })
    }
})

module.exports = router;

