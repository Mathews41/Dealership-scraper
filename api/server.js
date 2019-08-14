import express from 'express'
import fs from 'fs'
import { scrape } from './controllers/scrapeController'

let app = express();

app.get('/', function(req, res){
    res.send('Hello')
})

app.get('/scrape', scrape)

app.listen(3000, 
    () => console.log('Example app listening on port 3000!'))
