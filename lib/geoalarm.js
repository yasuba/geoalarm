Locations = new Mongo.Collection("locations");

if (Meteor.isClient) {

  // Meteor.subscribe("locations");

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
          Session.set('position', position.coords.latitude+','+position.coords.longitude);
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

  Template.saveLocation.helpers({
    locationPos: function() {
      return Session.get("position");
    }
  });

  Template.saveLocation.events({
    "submit #locationForm": function(event) {
      event.preventDefault();
      var location = event.target.locationname.value;
      var position = event.target.position.value;
      Meteor.call("addPlace", location, position);
      event.target.locationname.value = "";
      return false;
    }
  });

  Template.setAlarm.rendered = function(){
    var map;
    function initialize() {
      var mapOptions = {
        zoom: 8,
        center: {lat: -34.397, lng: 150.644}
      };
      map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);

      var marker = new google.maps.Marker({
        // The below line is equivalent to writing:
        // position: new google.maps.LatLng(-34.397, 150.644)
        position: {lat: -34.397, lng: 150.644},
        map: map
      });
    }
  };

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

}