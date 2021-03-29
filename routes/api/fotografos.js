
const { create, getAll, getById, getByEmail, getByCategory } = require('../../models/fotografo');
const { checkToken } = require('./middleware')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const multer = require('multer');
const upload = multer({ dest: 'public/images' })

const router = require('express').Router();

router.post('/', async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const result = await create(req.body);
        res.json(result)

    } catch (error) {
        console.log(error);
        res.json({ error: 'error 422' })
    }
})

router.post('/login_fotografo', async (req, res) => {
    const fotografo = await getByEmail(req.body.email)
    console.log('fotografo:', fotografo);
    if (fotografo) {

        const iguales = bcrypt.compareSync(req.body.password, fotografo.password);

        console.log('iguales', iguales);
        if (iguales) {
            res.json({
                success: 'Login correcto',
                token: createToken(fotografo),
                id: fotografo.id
            })

        } else {
            res.json({ error: 'Error en email y/o contraseña(contraseña)' });
        }

    } else {
        res.json({ error: 'Error en email y/o contraeña(email)' })
    }


})

router.post('/filter', async (req, res) => {
    try {

        const fotografos = await getByCategory(req.body)
        res.json(fotografos)

    } catch (error) {
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

router.get('/perfil', checkToken, async (req, res) => {
    try {
        const fotografo = await getById(req.fotografoId)
        res.json(fotografo)
    } catch (err) {
        res.json({ error: '422' })
    }
})

router.get('/vista_perfil', async (req, res) => {
    try {
        const fotografo = await getById(req.fotografoId)
        res.json(fotografo)
    } catch (err) {
        res.json({ error: '422' })
    }
})



function createToken(fotografo) {
    const data = {
        fotografoId: fotografo.id,
        caduca: dayjs().add(30, 'minutes').unix()
    }
    const token = jwt.sign(data, 'llave de acceso');
    console.log(token);
    return token;
}

module.exports = router;