Locations = new Mongo.Collection("locations");

if (Meteor.isClient) {

  Meteor.subscribe("locations");

  Template.body.rendered = function() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude,
                                           position.coords.longitude);
          var mapOptions = {
            center: new google.maps.LatLng(51.512268, -0.125828),
            zoom: 17
          };
          var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

          var marker = new google.maps.Marker({
            map: map,
            position: pos,
          });

          map.setCenter(pos);
        });

      } else {
        alert("This browser does not support geolocation");
      }
  }

  Template.home.helpers({
    locations: function(){
      return Locations.find({});
    }
  });

  Template.saveLocation.events({
    "submit #locationForm": function(event) {
      event.preventDefault();
      var location = event.target.locationname.value;
      Meteor.call("addPlace", location)
      event.target.locationname.value = "";
      return false;
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

}