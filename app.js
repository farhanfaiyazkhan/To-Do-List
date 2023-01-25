const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+ "/date.js");

const app = express();

const newItems = [];

const workItems = [];

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(req, res){

    let day = date.getDate();

    res.render("lists", {listTitle: day, newListItems : newItems});
});

app.post("/", function(req, res){
    let item = req.body.toDoItem;

    if(req.body.list === "work"){
        workItems.push(item);
        res.redirect("/work");
    } else {
        newItems.push(item);
        res.redirect("/");
    }
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});

app.get("/work", function(req, res){
    res.render("lists", {listTitle: "Work List", newListItems: workItems});
});