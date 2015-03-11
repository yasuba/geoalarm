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
    "click #addLocation": function(event) {
      // event.preventDefault();
      // console.log('yo');
      bootbox
        .dialog({
          title: "New location",
          message: $('#locationForm'),
          show: false
        })
        .on('shown.bs.modal', function(){
          $('#locationForm')
          .show()
        })
        .on('hide.bs.modal', function(){
          $('#locationForm').hide().appendTo('body');
        })
        .modal('show');
    }
  });

}