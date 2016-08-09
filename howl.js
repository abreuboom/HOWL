Feed = new Mongo.Collection("post");


if(Meteor.isClient) {
    Session.set("inputOn", false);
    
    Session.set("filterOn", false);
    
    Session.set("filterButton", false);
    
    Meteor.subscribe("userData");
  
    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
  });
    
    Template.filter.events({ 
        'click #mbtn':function(){
            Session.set("filter","Math");
            Session.set("filterOn",false);
            Session.set("filterButton", true);
        },
        'click #sbtn':function(){
            Session.set("filter","Science");
            Session.set("filterOn",false);
            Session.set("filterButton", true);
        },
        'click #hbtn':function(){
            Session.set("filter","History");
            Session.set("filterOn",false);
            Session.set("filterButton", true);
        },
        'click #ebtn':function(){
            Session.set("filter","English");
            Session.set("filterOn",false);
            Session.set("filterButton", true);
        },
        'click #lbtn':function(){
            Session.set("filter","Language");
            Session.set("filterOn",false);
            Session.set("filterButton", true);
        },
        'click #dbtn':function(){
            Session.set("filter","Developer");
            Session.set("filterOn",false);
            Session.set("filterButton", true);
        }
    });
    
    Template.feed.helpers({
       'post': function(){
           if(Session.get("filterButton")==false){
               return Feed.find({},{sort:{time:"asc"}});
            }
           else{
               return Feed.find({subject:Session.get("filter")},{sort:{time:"asc"}});
            
            }
       },
        'Color': function(){
            if(this.subject=="Math"){
                return "info";
            }
            else if(this.subject=="Science"){
                return "success";
            }
            else if(this.subject=="History"){
                return "danger";
            }
            else if(this.subject=="English"){
                return "default";
            }
            else if(this.subject=="Language"){
                return "warning";
            }
            else if(this.subject=="DEVELOPER"){
                return "primary";
            }
        }
    });

    Template.button.events({
        'click #HOWL_img': function(){
            Session.set("inputOn", true);
        },
        'click #searchButton':function(){
            Session.set("filterOn", true)   
        },
        'click #HOWL_NAV':function(){
            Session.set("filterButton", false);
        }
    });
    
    Template.body.helpers({
        'checkInput':function() {
            return Session.get("inputOn");
        },
        'checkFilter':function() {
            return Session.get("filterOn");
        }
    });
    
    Template.input.events({
        'click #Send':function(){
            if($("#info").val()==""){
                alert("Tell us what you need help with so that others can help you!");
            }
            else if($("#subSelect").val()==""){
                alert("Tell us what subject your issue is in so we can connect you with someone who can help!");
            }
            else{
                var d = new Date();
                Feed.insert({ "moreInfo" : $("#info").val(), "subject" : $("#subSelect").val(), "time" : d.getTime()});
                Session.set("inputOn", false);
                Session.set("filterOn", false);
            }
        },
        'click #remove':function(){
            Session.set("inputOn",false);
    }
    });
    
    Template.filter.events({ 
        'click #removeFilter':function(){
            Session.set("filterOn",false);
    }
    });
}

if(Meteor.isServer) {
    
}