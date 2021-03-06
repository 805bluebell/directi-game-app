
const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const path = require('path');
const router = express.Router();

//var fs = require('fs')




router.get('/index.html',function(req,res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
  //__dirname : It will resolve to your project folder.
});

//add the router
app.use('/', router);


//to serve static files
app.use(express.static('public'))



app.get('/insertI', function (req, res) { 

var writeBuff = [];
/*

    
    //Writing user data in JSON file
    fs.readFile('./users.json', 'utf-8', function(err, data) {
	if (err) throw err

	var arrayOfObjects = JSON.parse(data)
	arrayOfObjects.users.push({
		name: req.param('name'),
		score: req.param('score')
	})

	console.log(arrayOfObjects)
    
    writeBuff = (arrayOfObjects);

	fs.writeFile('./users.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
		if (err) throw err
		console.log('Done!')
	})
})
*/

        //Connecting to postgres on heroku
        const { Client } = require('pg');
        const client = new Client({
          connectionString: process.env.DATABASE_URL,
          ssl: true,
        });
        client.connect();
        //postgres connected
        
        var a = req.param('email');
        var b = req.param('name');
        var c = (req.query.score);
        
        
        
        client.query("INSERT INTO public.topscore(email,name,score) VALUES ($1, $2, $3);", [a,b,c], (err, response) => {
        if (err) throw err;
          
          //client.end();
          //res.status(200).send();
          
          
            
            //res.end();
        });
        
        var text1 = "";
        var text2 = "";
        var text3 = "[";
        var flag = true;

        //res.writeHead(200, {'Content-Type': 'text/plain'});
        
        client.query('select tb1.* from (select name,max(score) from public.topscore group by email,name) as tb1 order by max desc;', (err, response2) => {
        if (err) throw err;
          for (let row of response2.rows) {
            console.log(JSON.stringify(row));
            if(flag==true){
                text3 = text3.concat("",JSON.stringify(row));
            }
            else {
                text3 = text3.concat(",",JSON.stringify(row));
            }
            console.log(text3);
            flag = false;
            //writeBuff.push((row));
            //res.write(JSON.stringify(row) + "\n");
          }
          
          client.end();
          
          //res.status(200).send(JSON.stringify(response2));
          
            text3 = text3.concat("","]");
            res.send(text3);
            //res.end();
        });
        
        
        
        
  
    //res.send("How shall I send data to client?");
    //res.send(JSON.stringify(arrayOfObjects));
    
})

app.post('/checkI', function (req, res) {
  res.send('Got a POST request')
})

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})  

app.listen(port, () => console.log(`Example app listening on port ${port}!`))