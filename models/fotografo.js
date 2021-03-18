const create = ({ nombre, apellidos, email, direccion, password }) => {

    return new Promise((resolve, reject) => {
        db.query('INSERT INTO fotografos (nombre, apellidos, direccion, email, password) values (?, ?, ?, ?, ?)', [nombre, apellidos, direccion, email, password], (err, result) => {
            if (err) {
                console.log(err);
                return reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

module.exports = {
    create
}