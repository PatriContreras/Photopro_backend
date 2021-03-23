const router = require('express').Router();
const { checkToken } = require('./api/middleware')


const clientesApiRouter = require('./api/clientes');
const clientesWareRouter = require('./api/clientesWare');
const fotografosApiRouter = require('./api/fotografos');
const fotografoWareRouter = require('./api/fotografoWare')


router.use('/clientes', clientesApiRouter);
router.use('/clientes/private', clientesWareRouter);
router.use('/fotografos/private', checkToken, fotografoWareRouter)
router.use('/fotografos', fotografosApiRouter)

module.exports = router;