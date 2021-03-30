
const { getById, updateById, deleteById, updatePasswordCliente, addFavoritos, getFavoritosByCliente } = require("../../models/cliente");
const { checkTokenCliente } = require("./middleware")
const bcrypt = require('bcrypt');

const router = require('express').Router();

router.get('/perfil', checkTokenCliente, async (req, res) => {
    try {
        const cliente = await getById(req.clienteId)
        res.json(cliente)

    } catch (err) {
        res.json({ error: 'es un error by id' })

    }
})


router.put('/', checkTokenCliente, async (req, res) => {
    try {

        req.body.password = bcrypt.hashSync(req.body.password, 10);
        req.body.id = req.clienteId;
        const cliente = await updateById(req.body);
        res.json(cliente)
    } catch {
        res.json({ error: 'clinentes update error 422' })
    }
});

router.delete('/', checkTokenCliente, async (req, res) => {
    try {
        //console.log('id', req.params.idCliente);
        const result = await deleteById(req.clienteId);
        res.json(result)
    } catch {
        res.json({ error: 'error 422' })

    }

});

router.patch('/', checkTokenCliente, async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        req.body.id = req.clienteId;
        const result = await updatePasswordCliente(req.body)
        res.json(result)
    } catch (err) {
        res.json({ error: 'error en patch cliente' })
    }
});

router.post('/favoritos', checkTokenCliente, async (req, res) => {
    try {
        const result = await addFavoritos(req.body.fk_fotografo, req.clienteId);
        console.log('body favoritos', req.body);
        console.log('fk_fotografo', req.body.fk_fotografo);
        console.log('clienteID', req.clienteId);

        res.json(result)
    } catch {
        res.json({ error: 'error favoritos' })
    }
})

// router.get('/favoritos', checkTokenCliente, async (req, res) => {
//     try {
//         const allFavoritos = await getFavoritosByCliente(req.body.fk_usuario);
//         console.log('Este es el body:', req.body);
//         console.log('Este es el fk:', req.body.fk_usuario);
//         console.log(allFavoritos);
//     } catch (err) {
//         res.json({ error: 'error en get favoritos' })
//     }
// })

router.get('/favoritos', checkTokenCliente, async (req, res) => {
    try {
        const allFavoritos = await getFavoritosByCliente(req.clienteId)
        res.json(allFavoritos)
        console.log('Resultado de AllFavoritos:', allFavoritos);
    } catch (err) {
        res.json({ error: 'Error en get favoritos' })
    }
})

module.exports = router;


