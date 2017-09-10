var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [{
    name: "Driving Campground",
    image: "http://visitindianacountypa.org/wp-content/themes/indianna/images/graphics/wheel%20in%20campground%20(2).jpg",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
},{
    name: "Hilly area Campground",
    image: "https://www.nps.gov/zion/planyourvisit/images/WatchmanCG_Watchman_r.jpg",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
},{
    name: "No Night Campground",
    image: "http://villageofgreenport.org/images/greenport-village-mccann-campgrounds.jpg",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
}]
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
  });
  //add few campgrounds
  data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
          if(err){console.log(err)}else{console.log("campground added");
              Comment.create({text: "nice place, but can't GO ",author: "RADS"},function(err, comment){
                  if(err){console.log(err)}else{
                      campground.comments.push(comment);
                      campground.save();
                      console.log("comment created")
                  }
                   
              })
          }
      });
  });
   //add few comments
}
module.exports = seedDB;