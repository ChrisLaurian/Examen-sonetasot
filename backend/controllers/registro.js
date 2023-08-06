'use strict'

var controller = {

    test: (req, res) => {
        return res.status(200).send({
            message: 'Prueba exitosa'
        });
    }
}

module.exports = controller;