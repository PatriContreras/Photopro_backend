const { getAll, create, getByEmail } = require('../../models/cliente');
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

router.post('/login_cliente', async (req, res) => {
    const cliente = await getByEmail(req.body.email)
    if (cliente) {
        const iguales = bcrypt.compareSync(req.body.password, cliente.password);
        if (iguales) {
            res.json({
                success: 'Login correcto',
                token: createToken(cliente),
                id: cliente.id

            })
        } else {
            res.json({ error: 'Error en email y/o contraseña (contraseña' });
        }
    } else {
        res.json({ error: 'error contraseña y/o email(email)' })
    }
});

function createToken(cliente) {
    const data = {
        cliente: cliente.id,
        caduca: dayjs().add(30, 'minutes').unix()
    }
    return jwt.sign(data, 'llave de acceso')
}


module.exports = router;