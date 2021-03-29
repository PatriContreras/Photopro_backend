

const create = ({ nombre, apellidos, email, direccion, password, bodas, eventosnocturnos, producto, publicidad, paisaje, retrato, modelos, artistica, documental, deportes }) => {
    console.log(password);
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO fotografos (nombre, apellidos, direccion, email, password, bodas, eventosnocturnos, producto, publicidad, paisaje, retrato, modelos, artistica, documental, deportes) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, apellidos, direccion, email, password, bodas, eventosnocturnos, producto, publicidad, paisaje, retrato, modelos, artistica, documental, deportes], (err, result) => {
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

const updatePasswordFotografo = ({ password, id }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE fotografos SET password = ? WHERE id = ?', [password, id], (err, result) => {
            if (err) return reject(err)
            resolve(result)
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

const getByCategory = ({ bodas, eventosnocturnos, producto, publicidad, paisaje, retrato, modelos, artistica, documental, deportes }) => {
    return new Promise((resolve, reject) => {
        const ors = [];
        if (bodas) ors.push('bodas = true')
        if (eventosnocturnos) ors.push('eventosnocturnos= true')
        if (producto) ors.push('producto= true')
        if (publicidad) ors.push('publicidad = true')
        if (paisaje) ors.push('paisaje = true')
        if (retrato) ors.push('retrato = true')
        if (modelos) ors.push('modelos = true')
        if (artistica) ors.push('artistica = true')
        if (documental) ors.push('documental = true')
        if (deportes) ors.push('deportes = true')

        let q = `SELECT * FROM fotografos where 1=1 and (${ors.join(' or ')})`;



        console.log(q);



        db.query(q,
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
    })
}

const image = (url, fk_fotografo) => {

    return new Promise((resolve, reject) => {
        db.query('INSERT INTO imagenes (url, fk_fotografo) values (?,?)', [url, fk_fotografo], (err, result) => {
            if (err) {
                console.log(err);
                return reject(err)
            } else {
                resolve(result)
            }
        })
    })
}


const getAllimages = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM imagenes', (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)
        })
    })

}

const getAllimagesByfotografo = (fk_fotografo) => {

    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM imagenes where fk_fotografo= ?', [fk_fotografo], (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)

        })
    })
}



module.exports = {
    create, getAll, updateById, deleteById, getById, getByEmail, getByCategory, image, getAllimages, updatePasswordFotografo, getAllimagesByfotografo

}
