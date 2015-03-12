Locations = new Mongo.Collection("locations");

if (Meteor.isClient) {

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

  Template.body.helpers({
    locations: function(){
      return Locations.find({});
    }
  });

  Template.saveLocation.events({
    "submit #locationForm": function(event) {
      event.preventDefault();
      var location = event.target.locationname.value;
        Locations.insert({
          location: location
        });
      event.target.locationname.value = "";
      return false;
    }
  });

}