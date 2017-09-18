const Employer = require('../models').Employer;

module.exports = {
    create(req, res){
        "use strict";
        console.log("job created");
        return Employer
            .create({
                title: req.body.title,
            })
            .then((job) => res.status(201).send(job))
            .catch((error) => res.status(400).send(error))
    },

    list(req, res){
        "use strict";
        console.log("job listed");
    }
};