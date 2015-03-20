Locations = new Mongo.Collection("locations");

if (Meteor.isClient) {

  Meteor.subscribe("locations");

  Template.home.rendered = function() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude,
                                           position.coords.longitude);
          var mapOptions = {
            zoom: 17
          };
          var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

          var marker = new google.maps.Marker({
            map: map,
            position: pos,
          });

          map.setCenter(pos);
          Session.set('lat', position.coords.latitude);
          Session.set('lng', position.coords.longitude);
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
    saveLat: function() {
      return Session.get("lat");
    },
    saveLng: function() {
      return Session.get("lng");
    }
  });

  Template.saveLocation.events({
    "submit #locationForm": function(event) {
      event.preventDefault();
      var location = event.target.locationname.value;
      var lat = event.target.lat.value;
      var lng = event.target.lng.value;
      Meteor.call("addPlace", location, lat, lng);
      event.target.locationname.value = "";
      return false;
    }
  });

  Template.setAlarm.helpers({
    fromHelper: function(){
      return this.lat+' ,'+this.lng;
    }
  });

  Template.setAlarm.events({
    "click .hoursUp": function(event){
      event.preventDefault();
      var hours = parseInt($('.hours').text());
      $('.hours').html(hours += 1);
    },
    "click .hoursDown": function(event){
      event.preventDefault();
      var hours = parseInt($('.hours').text());
      $('.hours').html(hours -= 1);
    },
    "click .minutesUp": function(event){
      event.preventDefault();
      var minutes = parseInt($('.minutes').text());
      $('.minutes').html(minutes += 1);
    },
    "click .minutesDown": function(event){
      event.preventDefault();
      var minutes = parseInt($('.minutes').text());
      $('.minutes').html(minutes -= 1);
    },
    "click .day button": function(event){
      event.preventDefault();
    }
  })

  Template.setAlarm.rendered = function(){
    var lat = Number(this.data.lat);
    var lng = Number(this.data.lng);
    var mapOptions = {
        zoom: 17,
        center: {lat: lat, lng: lng}
      };
    this.map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    var marker = new google.maps.Marker({
      map: this.map,
      position: new google.maps.LatLng(lat, lng)
    });
    // var d = new Date();
    // $('.hours').html(d.getHours());
    // $('.minutes').html(d.getMinutes());
  };

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

}