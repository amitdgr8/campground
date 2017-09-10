var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
//Index routes============
router.get("/campgrounds", function(req, res){
    // res.render("campgrounds", {campgrounds: campgrounds} );
    Campground.find({},function(err, allcampgrounds){
    if(err){console.log(err);}else{res.render("index",{campgrounds:allcampgrounds})}
});
});
router.post("/campgrounds",middleware.isLoggedIn, function(req, res){
    var name= req.body.place
    var price= req.body.price
    var image= req.body.image
    var desc= req.body.description
    var author= {
        id: req.user._id,
        usernsame: req.user.username
    }
    var newCampground = {name: name, price: price, image: image, description:desc, author: author}
    
//   campgrounds.push(newCampground);
Campground.create(newCampground,function(err, newlycreated){
    if(err){console.log(err)}else{console.log(newlycreated);res.redirect("/campgrounds");}
});
});
router.get("/campgrounds/new",middleware.isLoggedIn, function(req, res) {
    res.render("new");
});
router.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundcampground){
        if(err){console.log(err);}else{console.log(foundcampground);res.render("show",{campground:foundcampground})};
    });
});

//edit campground route
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCamp){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.render("edit", {campground: foundCamp});
        }
    });
 //update campground route   
});
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership , function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updateCamp){
        if(err){res.redirect("/campgrounds")}else{res.redirect("/campgrounds/"+req.params.id)}
    })
})
//destroy campground route
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){res.redirect("/campgrounds")}else{res.redirect("/campgrounds")}
    })
})
module.exports = router;