var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");
//=========================
//COMMENTS ROUTE
//========================= .
router.get("/campgrounds/:id/comments/new",middleware. isLoggedIn, function(req, res){
   Campground.findById(req.params.id, function(err, campground){
       if(err){console.log(err)}else{res.render("comment_new",{campground: campground});}
   });
});
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req, res){
   Campground.findById(req.params.id, function(err, campground){
       if(err){console.log(err);res.redirect("/campgrounds")}else{
           Comment.create(req.body.comments, function(err, comment){
               if(err){req.flash("error","something went wrong");console.log(err);}else{
                   comment.author.id = req.user.id;
                   comment.author.username = req.user.username;
                   comment.save();
                   campground.comments.push(comment);
                   campground.save();
                   req.flash("success","successfully added comments");
                   res.redirect("/campgrounds/"+campground._id);
               }
           });
       }
   }) ;
});
router.get("/campgrounds/:id/comments/:commentsid/edit",middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.commentsid, function(err, foundComment){
        if(err){
            res.redirect("back")
        }else{
            res.render("comment/edit",{campground_id: req.params.id, comment:foundComment })
        }
    })
})
router.put("/campgrounds/:id/comments/:commentsid",middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.commentsid, req.body.comments, function(err, updatedComment){
       if(err){
            res.redirect("/campgrounds");
       }else{
           res.redirect("/campgrounds/"+req.params.id);
       }
    });
});
//coment destroy route
router.delete("/campgrounds/:id/comments/:commentsid",middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.commentsid, function(err){
        if(err){res.redirect("back")}else{req.flash("success","comment deleted");res.redirect("/campgrounds/"+req.params.id)}
    })
})
module.exports = router;