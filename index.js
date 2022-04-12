// Requiring modules
const express = require('express');
const app = express();
const ejs = require('ejs');
var fs = require('fs');
var tasks = require('./task')
const { json } = require('express/lib/response');
const Task = require('./task');
const port = 8000;
const urlencodedParser = express.urlencoded({extended: false});
const date = new Date();


if (fs.existsSync('data.json'))
{  

    const jsonStr = fs.readFileSync('data.json').toString();
    if (jsonStr.length != 0)
    {
        data = JSON.parse(jsonStr);
        data.forEach(element => {
            if (!element.iscomplete)
            {
                var _date = Date.parse(element.deadline);
                if (_date < date.getTime())
                {
                    element.iscomplete = true;
                    element.status = "Решена";
                    var rewrite = true;
                }
            }
            if (rewrite)
            fs.writeFileSync('data.json',JSON.stringify(data));       
             new Task(element.taskname, element.status, element.deadline, element.attached, element.iscomplete);
        
        });
    }
}           

app.use(express.static(__dirname));
// Render index.ejs file
app.get('/', function (req, res) {
   
    // Render page using renderFile method
    const date = new Date();
    ejs.renderFile('views/index.ejs', {tasks : Task.get(), date}, 
        {}, function (err, template) {
        if (err) {
            throw err;
        } else {
            res.end(template);
        }
    });
});

app.post('/', urlencodedParser, function (req, res) {

    new Task(req.body.Taskname, "Открыта", req.body.Date, req.body.File, false);
    var task = Task.get();
    var jsonArray = JSON.stringify(task);
    fs.writeFileSync('data.json',jsonArray);
    // Render page using renderFile method
    ejs.renderFile('views/index.ejs', {tasks : Task.get()}, 
        {}, function (err, template) {
        if (err) {
            throw err;
        } else {
            res.end(template);
        }
    });
});
   
// Server setup
app.listen(port, function (error) {
    if (error)
        throw error;
    else
        console.log("Server is running");
});