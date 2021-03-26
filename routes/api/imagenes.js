const { createImage } = require('../../models/imagenes');
const multer = require('multer');
const { checkToken } = require('./middleware');
const upload = multer({ dest: 'public/images' });
const fs = require('fs')

const router = require('express').Router();




router.post('/imagen', checkToken, upload.single('imagen'), async (req, res) => {
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
        const newProducto = await Producto.createImage(req.body);
        res.json(newProducto);
    } catch (err) {
        res.json(err);
    }

});
/* router.get('/', async (req, res) => {
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
 */



module.exports = router;