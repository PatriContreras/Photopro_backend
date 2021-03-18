
const { create, getAll, getById, updateById, deleteById } = require('../../models/fotografo');

const router = require('express').Router();

router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const result = await create(req.body);
        res.json(result)

    } catch {
        res.json({ error: 'error 422' })
    }
})

router.get('/', async (req, res) => {
    try {
        const fotografos = await getAll();
        res.json(fotografos)
    } catch (error) {
        res.json({ error: 'error 422' })
    }
})

router.get('/:idFotografo', async (req, res) => {
    try {
        const fotografo = await getById(req.params.idFotografo)
        res.json(fotografo)
    } catch (err) {
        res.json({ error: '422' })
    }
})

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