const Express = require('express')
const app = Express()

let data = 'https://api.nanopool.org/v1/eth/workers/0x20aa46b632b7ca6f0c7dbd91e0bc7b1c7215a0ef'
JSON.parse(data)
console.log(data)
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    let data = 'https://api.nanopool.org/v1/eth/workers/0x20aa46b632b7ca6f0c7dbd91e0bc7b1c7215a0ef'
    res.render('index', {data} )
})

app.listen(process.env.PORT, () => {
    console.log('success')
})