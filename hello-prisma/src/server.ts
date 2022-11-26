import express from 'express'
import routes from './routes'

require('dotenv').config()


const app = express();
const port = process.env.PORT_SERVER || 3333

app.use(express.json())
app.use(routes)

try {
    app.listen(3333, () => {
        console.log('Server is running in ' + port)
    })
} catch (err) {
    console.log(err)
}

