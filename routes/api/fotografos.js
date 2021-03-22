
const { create, getAll, getById, updateById, deleteById, getByEmail } = require('../../models/fotografo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

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

router.post('/login_fotografo', async (req, res) => {
    const fotografo = await getByEmail(req.body.email)
    if (fotografo) {

        const iguales = bcrypt.compareSync(req.body.password, fotografo.password);

        if (iguales) {
            res.json({
                success: 'Login correcto',
                token: createToken(fotografo)

            })
        } else {
            res.json({ error: 'Error en email y/o contraseña(contraseña)' });
        }

    } else {
        res.json({ error: 'Error en email y/o contraeña(email)' })
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

function createToken(pFotografo) {
    const data = {
        fotografoId: pFotografo.id,


    }
    return jwt.sign(data, 'llave de acceso');
}

module.exports = router;