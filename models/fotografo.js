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

const getByCategory = (bodas, eventosnocturnos, producto, publicidad, paisaje, retrato, modelos, artistica, documental, deportes) => {
    return new Promise((resolve, reject) => {
        let q = 'SELECT * FROM fotografos where 1=1';
        if (bodas) q = q + ' or bodas= true '
        if (eventosnocturnos) q = q + ' or eventosnocturnos= true '
        if (producto) q = q + ' or producto= true '
        if (publicidad) q = q + ' or publicidad= true '
        if (paisaje) q = q + ' or paisaje= true '
        if (retrato) q = q + ' or retrato= true '
        if (modelos) q = q + ' or modelos= true '
        if (artistica) q = q + ' or artistica= true '
        if (documental) q = q + ' or documental= true '
        if (deportes) q = q + ' or deportes= true '



        console.log(q);



        db.query(q,
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
    })
}





module.exports = {
    create, getAll, updateById, deleteById, getById, getByEmail, getByCategory
}
