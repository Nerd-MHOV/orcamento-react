import express from 'express'

const app = express()
const port = process.env.PORT || 3333;

import db from './models'

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log('Server is running in port' + port)
    })
})

