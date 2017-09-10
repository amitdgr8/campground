var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    localStrategy= require("passport-local"),
    methodOverride= require("method-override");
var Campground = require("./models/campground");
var seedDB = require("./seeds");
var Comment = require("./models/comment"),
    User = require("./models/user");
    
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

mongoose.connect(process.env.DATABASEURL,{
  useMongoClient: true,
});
// mongoose.connect("mongodb://amit:password@ds133004.mlab.com:33004/yelpcamp",{
//   useMongoClient: true,
// });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

//passport configuration
app.use(require("express-session")({
    secret: "she is the best",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error"); 
    res.locals.success = req.flash("success");
    next();
});
app.use(commentRoutes);
app.use(campgroundRoutes);
app.use(indexRoutes);
app.listen(process.env.PORT,process.env.IP, function(){
    console.log("yelp started");
});