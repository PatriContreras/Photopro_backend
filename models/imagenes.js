
const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM imagenes', (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)
        });
    })
}
const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM imagenes where id = ?', [id], (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
    })
}

const getById = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM imagenes WHERE id=?', [pId], (err, result) => {
            if (err) {
                return reject(err)
            }
            if (result.length === 0) return resolve(null)
            resolve(result[0])

        })
    })


}

const create = (url) => {

    return new Promise((resolve, reject) => {
        db.query('INSERT INTO imagenes (url) values ?', [url], (err, result) => {
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
    getAll, getById, deleteById, create
}