const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

const checkToken = (req, res, next) => {


    if (!req.headers['authorization']) {
        return res.json({ error: 'debes incluir la cabecera Authorization' })
    }

    //comprobar si el token es valido

    const token = req.headers['authorization'];
    let data;
    try {
        data = jwt.verify(token, 'llave de acceso')
    } catch (error) {


        return res.json({ error: 'maaal' })

    }

    if (dayjs().unix() > data.caduca) {
        return res.json({ error: 'token caducado' })
    }


    // comprobar si el token está caducado


    // si ninguno de estos filtro me echa para atrás paso a next

    //incluir en la peticion el id de usuario que esta realizando dicha peticion 
    req.fotografoId = data.fotografoId;

    next(); // cuando acaba y se cumplotodo aquello y llama a la siguiente funcion


}
const checkTokenCliente = (req, res, next) => {


    if (!req.headers['authorization']) {
        return res.json({ error: 'debes incluir la cabecera Authorization' })
    }

    //comprobar si el token es valido

    const token = req.headers['authorization'];
    let data;
    try {
        data = jwt.verify(token, 'llave de acceso')
    } catch (error) {


        return res.json({ error: 'maaal' })

    }

    if (dayjs().unix() > data.caduca) {
        return res.json({ error: 'token caducado' })
    }


    // comprobar si el token está caducado


    // si ninguno de estos filtro me echa para atrás paso a next

    //incluir en la peticion el id de usuario que esta realizando dicha peticion 
    req.clienteId = data.clienteId;

    next(); // cuando acaba y se cumplotodo aquello y llama a la siguiente funcion


}

module.exports = {
    checkToken, checkTokenCliente
}