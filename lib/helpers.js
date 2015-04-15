Locations = new Mongo.Collection("locations");
Messages = new Mongo.Collection("messages");

if (Meteor.isClient) {

  Meteor.subscribe("locations");
  Meteor.subscribe("messages");
  Meteor.subscribe("userStatus");

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
    "click #hoursUp": function(event){
      event.preventDefault();
      var hours = parseInt($('#hours').val());
      if(hours < 23) {
        increaseTime('#hours', hours);
      }
    },
    "click #hoursDown": function(event){
      event.preventDefault();
      var hours = parseInt($('#hours').val());
      if(hours > 0) {
        decreaseTime('#hours', hours);
      }
    },
    "click #minutesUp": function(event){
      event.preventDefault();
      var minutes = parseInt($('#minutes').val());
      if(minutes < 59) {
        increaseTime('#minutes', minutes);
      }
    },
    "click #minutesDown": function(event){
      event.preventDefault();
      var minutes = parseInt($('#minutes').val());
      if(minutes > 0) {
        decreaseTime('#minutes', minutes);
      }
    },
    "submit #setNewAlarm": function(event){
      event.preventDefault();
      var location = this.location,
          hours = event.target.hours.value,
          minutes = event.target.minutes.value,
          days = [];
          _.each(event.target.days, function(day){
            if(_.contains(day.className, "v")){
              days.push(day.value);
            }
          });
      Meteor.call('addAlarm', location, hours, minutes, days);
      Router.go('/');
      // $('#submit').text('Saved');
      // setTimeout(function(){$('#submit').text('Set alarm')}, 2000);
    }
  });

  function increaseTime(time, unit) {
    $(time).val(unit += 1);
  }

  function decreaseTime(time, unit) {
    $(time).val(unit -= 1);
  }

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

  // Template.chart.rendered = function(){
  //   var svg = d3.select("svg");
  //   var circle = svg.selectAll("circle")
  //       .data([32, 87, 152, 293]);

  //   circle.enter().append("circle")
  //       .attr("cy", 60)
  //       .attr("cx", function(d,i){ return i * 100 + 30; })
  //       .attr("r", function(d){return Math.sqrt(d); })
  //       .transition()
  //           .delay(1000)
  //           .styleTween("fill", function(){ return d3.interpolate("brown", "steelblue"); });
  // };

  Template.chat.helpers({
    messages: function(){
      return Messages.find({});
    },
    usersOnline: function(){
      return Meteor.users.find({ "status.online": true }).fetch();
    }
  });

  Template.chat.events({
    "submit #chatBox": function(event){
      event.preventDefault();
      var message = event.target.message.value;
      var name = event.target.name.value;
      Meteor.call('addMessage', message, name);
      $('#chat-message').val('');
    },
    "click .privateMessage": function(event){
      event.preventDefault();
      var messageTo = event.target.name;
      Router.go('/message/' + messageTo);
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

}
