
const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const path = require('path');
const router = express.Router();

router.get('/index.html',function(req,res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
  //__dirname : It will resolve to your project folder.
});

//add the router
app.use('/', router);


//to serve static files
app.use(express.static('public'))



app.get('/checkI', (req, res) => res.send(req.params))

app.post('/', function (req, res) {
  res.send('Got a POST request')
})

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})  

app.listen(port, () => console.log(`Example app listening on port ${port}!`))