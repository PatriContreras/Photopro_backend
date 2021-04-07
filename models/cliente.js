const create = ({ nombre, apellidos, email, direccion, password }) => {

    return new Promise((resolve, reject) => {
        db.query('INSERT INTO clientes (nombre, apellidos, direccion, email, password) values (?, ?, ?, ?, ?)', [nombre, apellidos, direccion, email, password], (err, result) => {
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
        db.query('update clientes set nombre = ?, apellidos = ?, direccion = ?, email = ?, password = ? where id = ?', [nombre, apellidos, direccion, email, password, id], (err, result) => {
            if (err) return reject(err)
            resolve(result);
        })
    })
}

const updatePasswordCliente = ({ password, id }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE clientes SET password = ? WHERE id = ?', [password, id], (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
    })
}

const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM clientes where id = ?', [id], (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
    })
}


const getById = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM clientes WHERE id=?', [pId], (err, result) => {
            if (err) {
                return reject(err)
            }
            if (result.length === 0) return resolve(null)
            resolve(result[0])

        })
    })


}

const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM clientes', (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)
        });
    })
}

const getByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM clientes where email = ?',
            [email],
            (err, result) => {
                if (err) return reject(err);
                if (result.length === 0) return resolve(null)
                resolve(result[0]);
            })
    })


}

const addFavoritos = (fk_fotografo, fk_usuario) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO favoritos (fk_fotografo, fk_usuario) values (?,?)', [fk_fotografo, fk_usuario], (err, result) => {
            if (err) {
                console.log(err);
                return reject(err)
            } else {
                resolve(result)
            }

        })
    })
}

// const getFavoritosByCliente = (fk_usuario) => {
//     return new Promise((resolve, reject) => {
//         db.query('SELECT * FROM favoritos WHERE fk_usuario = ?', [fk_usuario], (err, result) => {
//             if (err) {
//                 console.log(err);
//                 return reject(err)
//             } else {
//                 resolve(result)
//             }
//         })
//     })
// }

const getFavoritosByCliente = (fk_usuario) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT f.* FROM fotografos f, favoritos fav WHERE f.id = fav.fk_fotografo AND fav.fk_usuario = ?', [fk_usuario], (err, result) => {
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
    getAll, create, getById, updateById, deleteById, getByEmail, updatePasswordCliente, addFavoritos, getFavoritosByCliente
}