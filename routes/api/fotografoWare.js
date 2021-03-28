const { updateById, deleteById, image, getAllimages } = require("../../models/fotografo");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { checkToken } = require("./middleware");
const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'public/images' });
const fs = require('fs')



router.get('/imagenes', checkToken, async (req, res) => {
    try {
        const imagenes = await getAllimages();
        res.json(imagenes)
    } catch (error) {
        res.json({ error: 'error 422 imagenes' })
    }
})

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


router.post('/upload', checkToken, upload.single('imagen'), async (req, res) => {
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
        const newImagen = await image(newName);
        console.log(req.body);
        res.json(newImagen);
    } catch (err) {
        res.json(err);
    }

});
module.exports = router;

