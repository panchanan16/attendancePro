const fs = require('fs');

const sessionControl = {
    getSession: (req, res) => {
        const data = fs.readFileSync('./currentSession.json', { encoding: 'utf8' })
        const sendData = JSON.parse(data)
        res.send({ sendData });
    },

    addSession : (req, res) => {
        const data = fs.readFileSync('./currentSession.json', { encoding: 'utf8' })
        const writeData = JSON.parse(data)
        const index = writeData.currentSession.find((el) => el.department === req.body.department)
        if (index) {
          return res.status(200).send({msg: 'Department Already exist'})
        }
        writeData.currentSession.push({ id: writeData.currentSession.length + 1, department: req.body.department, session: req.body.session.split('_')})
        fs.writeFileSync('./currentSession.json', JSON.stringify(writeData))
        res.status(200).send({ msg: "done✅" });
    },

    getSessionByName : (req, res) => {
        const data = fs.readFileSync('./currentSession.json', { encoding: 'utf8' })
        const writeData = JSON.parse(data)
        const index = writeData.currentSession.find((el) => el.department === req.query.name)
        if (index) {
            return res.status(200).send({ data: index})
        }
        return res.status(500).send({ msg: "No data found!" })
    },

    updateSession: (req, res) => {
        const data = fs.readFileSync('./currentSession.json', { encoding: 'utf8' })
        const writeData = JSON.parse(data)
        const index = writeData.currentSession.find((el) => el.id == req.body.id)
        if (index) {
            const indexNum = writeData.currentSession.indexOf(index)
            const item = writeData.currentSession[indexNum];
            item.department = req.body.department
            item.session = req.body.session.split('_')
            writeData.currentSession.splice(indexNum, 1)
            writeData.currentSession.push(item)
            fs.writeFileSync('./currentSession.json', JSON.stringify(writeData))
            res.status(200).send({ msg: "done✅" });
        }
        res.status(500).send({msg : "Something went wrong!"})
    },

    deleteSession: (req, res) => {
        const data = fs.readFileSync('./currentSession.json', { encoding: 'utf8' })
        const writeData = JSON.parse(data)
        const index = writeData.currentSession.find((el) => el.id == req.query.id)
        if (index) {
            const indexNum = writeData.currentSession.indexOf(index)
            writeData.currentSession.splice(indexNum, 1)
            fs.writeFileSync('./currentSession.json', JSON.stringify(writeData))
            return res.status(200).send({ msg: "done✅" });
        }
        return res.status(500).send({msg: "Something went wrong!"})
    }
}

module.exports = sessionControl;