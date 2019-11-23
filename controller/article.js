var db = require("../models")

module.exports={
    create:function(title){
        db.Summary.create(title).then((dbsummary)=>{
            return(dbsummary)
        })
    },
    findAll:function(){
      return db.Summary.find({}, function(error, found) {
        console.log(found +'<========')
        // Throw any errors to the console
        if (error) {
          console.log(error);
        }
        // If there are no errors, send the data to the browser as json
        else {
          return found
        }
      });
    }
}