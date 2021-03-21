const { getAll, getById, deleteById, create } = require('../../models/imagenes');

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const imagenes = await getAll();
        res.json(imagenes)
    } catch (error) {
        res.json({ error: 'error 422' })
    }
})

router.get('/:idImagen', async (req, res) => {
    try {
        const imagen = await getById(req.params.idImagen)
        res.json(imagen)
    } catch (err) {
        res.json({ error: ' error 422' })
    }
})
router.delete('/:idImagen', async (req, res) => {
    try {
        const result = await deleteById(req.params.idimagen)
        res.json(result)
    } catch (err) {
        res.json({ error: 'error 422' })
    }
})
router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const result = await create(req.body); //aqui que hay que requerir el bodY?
        res.json(result)

    } catch {
        res.json({ error: 'error 422' })
    }
})


module.exports = router;