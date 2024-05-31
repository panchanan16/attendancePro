const fs = require('fs');

const sessionControl = {
    getSession: (req, res) => {
        const data = fs.readFileSync('./currentSession.json', { encoding: 'utf8' })
        const sendData = JSON.parse(data)
        res.send({ sendData });
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
        const index = writeData.currentSession.find((el) => el.id === 2)
        if (index) {
            const indexNum = writeData.currentSession.indexOf(index)
            const item = writeData.currentSession[indexNum];
            item.session = ["2nd", "4th", "6th"]
            writeData.currentSession.splice(indexNum, 1)
            writeData.currentSession.push(item)
            fs.writeFileSync('./currentSession.json', JSON.stringify(writeData))
            res.status(200).send({ msg: "done✅" });
        }
    }
}

module.exports = sessionControl;