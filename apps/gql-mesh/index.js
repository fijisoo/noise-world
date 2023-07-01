const express = require('express')
import { createBuiltMeshHTTPHandler } from './.mesh'

const app = express()
const PORT = 4000

app.listen(PORT, () => {
    console.log(`API listening on PORT ${PORT} `)
})

app.use('/graphql', createBuiltMeshHTTPHandler())

module.exports = app