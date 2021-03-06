const Database = require("../db/config")

module.exports = {
    async create(req, res){
        const db = await Database()
        const password = req.body.password
        let roomId

        let isRoom = true
        while(isRoom){
            // Gera o número da sala
            for(var i=0; i<6;i++){
                i == 0 ? roomId = Math.floor(Math.random()*10).toString() :
                roomId += Math.floor(Math.random()*10).toString()
            }

            // verificar se o número já existe
            const roomsExistIds = await db.all(`SELECT id FROM rooms`)
            

            isRoom = roomsExistIds.some(roomsExistId => roomsExistId === roomId)

            // Insere a sala no banco de dados
            if(! isRoom)
            {
                await db.run(`INSERT INTO rooms (
                    id,
                    password
                )VALUES (
                    ${parseInt(roomId)},
                    ${password}
                )`)
            }

        }

        await db.close()

        res.redirect(`/room/${roomId}`)
    },
    async open(req, res){
        const db = await Database()
        const roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)
        let isNoQuestions

        if(questions.length == 0)
        {
            if(questionsRead.length == 0)
            {
                isNoQuestions= true
            }
        }
        
        res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions})
    },
    async enter(req, res){
        const roomId = req.body.roomId
        const db = await Database()
        const roomsExists = await db.all(`SELECT ${roomId} FROM rooms`)

        if(roomsExists){
            res.redirect(`/room/${roomId}`)
        }
        else{
            alert("Sala não existe")
        }
    }
}