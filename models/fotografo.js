const create = ({ nombre, apellidos, email, direccion, password }) => {
    console.log(password);
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

const updateById = ({ id, nombre, apellidos, direccion, email, password }) => {
    return new Promise((resolve, reject) => {
        db.query('update fotografos set nombre = ?, apellidos = ?, direccion = ?, email = ?, password = ? where id = ?', [nombre, apellidos, direccion, email, password, id], (err, result) => {
            if (err) return reject(err)
            resolve(result);
        })
    })
}

const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM fotografos WHERE id = ?', [id], (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
    })
}
//hola


const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM fotografos', (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)
        });
    })
}


const getById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM fotografos WHERE id=?', [id], (err, result) => {
            if (err) {
                return reject(err)
            }
            if (result.length === 0) return resolve(null)
            resolve(result[0])

        })
    })


}

const getByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM fotografos where email = ?',
            [email],
            (err, result) => {
                if (err) return reject(err);
                if (result.length === 0) return resolve(null)
                resolve(result[0]);
            })
    })

}


module.exports = {
    create, getAll, updateById, deleteById, getById, getByEmail
}
