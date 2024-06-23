const createSubjModel = require('../../models/main/subjModel');

const subjControll = {
    addSubj : async function(req, res) {
        const getSubQuery = await createSubjModel.find({
            name: req.body.department, 'subjects.sem' : req.body.sem
        })

        if (getSubQuery.length > 0) {
            const createSubj = await createSubjModel.updateOne(
                {name: req.body.department},
                {$addToSet: {'subjects.$[el].sub': req.body.subject}},
                {arrayFilters: [{'el.sem' : req.body.sem}]}
            )
            return res.status(200).send(createSubj)
        } else {
            const createSubj = await createSubjModel.updateOne(
                {name: req.body.department},
                {$push: {subjects : {sem: req.body.sem, sub: req.body.subject}}},
                {upsert: true}
            )
            return res.status(200).send(createSubj)
        }
    },

    getSubj : async function(req, res) {
        const query = await createSubjModel.find(
            {name: req.query.dep, 'subjects.sem' : req.query.sem},
            {subjects: {$elemMatch: { sem: req.query.sem }}, name: 1}
        )
        if(query.length > 0) {
            console.log(query);
            return res.status(200).send(query[0].subjects[0].sub)
        }
        return res.status(500).send({msg: "No data can be found!"})
    },

    getSubjByDep : async function(req, res) {
        const query = await createSubjModel.find(
            {name: req.query.dep},
        )
        if(query.length > 0) {
            return res.status(200).send(query[0].subjects)
        }
        return res.status(500).send({msg: "No data can be found!"})
    },

    deleteSubj : async function(req, res) {
        const query = await createSubjModel.deleteOne({name: req.query.dep, 'subjects.sub' : req.query.sub})
    }
}

module.exports = subjControll;