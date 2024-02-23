const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

//express app
const app = express();

//connect to mongodb
const dbURI = "mongodb+srv://kbarber34:GqfsU5ySDoU3onwL@sdev255.gxv9ds4.mongodb.net/M06Tutorial?retryWrites=true&w=majority&appName=SDEV255"
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");

//middleware and static files
app.use(express.static("public"));
app.use(morgan("dev"));

//mongoose
app.get("/add-blog", (req, res) => {
    const blog = new Blog({
        title: "new blog",
        snippet: "about new blog",
        body: "more about new blog"
    });

    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/all-blogs", (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/single-blog", (req, res) => {
    Blog.findById("65d7f8e6b466102d9be7cc42")
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/", (req, res) => {
    const blogs = [
        {title: "Yoshi finds eggs", snippet: "blah blah blah"},
        {title: "Mario finds stars", snippet: "120 of them"},
        {title: "How to defeat Bowser", snippet: "throw em!"}
    ];
    res.render("index", {title: "Home", blogs});
});

app.get("/about", (req, res) => {
    res.render("about", {title: "About"});
});

app.get("/blogs/create", (req, res) => {
    res.render("create", {title: "Create a new blog"});
});

//404
app.use((req, res) => {
    res.status(404).render("404", {title: "404"});
});