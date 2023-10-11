const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash')

const homeStartingContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, cupiditate fugit recusandae nisi praesentium doloremque, voluptatem culpa, rerum sunt pariatur perferendis ea! Excepturi consequatur suscipit quibusdam dolorem nobis nesciunt eaque.";
const aboutContent =
  " fugit autem libero minus corrupti velit sit doloremque distinctio nulla magni quaerat facere adipisci sapiente quis! Molestiae eius nam esse sapiente voluptate, quaerat error dolorem vitae, ad magni, distinctio ex tempore doloribus. Doloremque, nostrum. ";
const contactContent =
  "Tempora illo accusamus ducimus eum dicta asperiores voluptatibus perspiciatis non, veritatis quam aspernatur porro odio fugit expedita ratione voluptas reiciendis ut provident sunt? Rerum repellendus vero sed, at esse id maxime, deserunt ab molestias,";

const blogPosts = [];

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("home", { homeContent: homeStartingContent, post: blogPosts });
});

app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const title = req.body.title;
  const postContent = req.body.postContent;
  const post = {
    title: title,
    postContent: postContent,
  };
  blogPosts.push(post);
  res.redirect("/");
});



app.get("/post/:postName", (req, res) => {
    const postName = _.lowerCase(req.params.postName) 

    blogPosts.forEach( (ma) => {
        const postTitle = _.lowerCase(ma.title) 
        
        if ( postTitle === postName ){
            res.render('post', {title: ma.title, postContent: ma.postContent})
        }
    })
});


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port 3000`);
});
