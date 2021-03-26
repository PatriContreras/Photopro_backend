
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

router.post('/imagen', upload.single('imagen'), async (req, res) => {
    // Antes de guardar el producto en la base de datos, modificamos la imagen para situarla donde nos interesa
    const extension = '.' + req.file.mimetype.split('/')[1];
    // Obtengo el nombre de la nueva imagen
    const newName = req.file.filename + extension;
    // Obtengo la ruta donde estará, adjuntándole la extensión
    const newPath = req.file.path + extension;
    // Muevo la imagen para que resiba la extensión
    fs.renameSync(req.file.path, newPath);

    // Modifico el BODY para poder incluir el nombre de la imagen en la BD
    req.body.imagen = newName;

    try {
        const newProducto = await Producto.create(req.body);
        res.json(newProducto);
    } catch (err) {
        res.json(err);
    }

});

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
}) // OK




function createToken(fotografo) {
    const data = {
        fotografoId: fotografo.id,
        caduca: dayjs().add(30, 'minutes').unix()
    }
    return jwt.sign(data, 'llave de acceso');
}

module.exports = router;