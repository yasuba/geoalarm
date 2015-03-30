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
      var location = event.target.locationname.frequency;
      var lat = event.target.lat.frequency;
      var lng = event.target.lng.frequency;
      Meteor.call("addPlace", location, lat, lng);
      event.target.locationname.frequency = "";
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
    "click .mon": function(event){
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

  Template.chart.rendered = function(){
    Tracker.autorun(function(){

      var margin = {top:20, right:30, bottom:30, left:40},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

      var x = d3.scale.ordinal()
          .rangeRoundBands([0, width], 0.1);

      var y = d3.scale.linear()
          .range([height, 0]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(10, "%");

      var chart = d3.select(".chart")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


      d3.csv("data/letters.csv", type, function(error, data) {
        console.log(data)
        x.domain(data.map(function(d) { return d.letter}));
        y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

        chart.append("g")
            .attr('class', 'x axis')
            .attr("transform", "translate(0," + height +")")
            .call(xAxis);

        chart.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Frequency");

        chart.selectAll(".bar")
            .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.letter); })
            .attr("y", function(d) { return y(d.frequency); })
            .attr("height", function(d) {return height - y(d.frequency); })
            .attr("width", x.rangeBand());
      });

      function type(d) {
        d.frequency = +d.frequency; // coerce to number
        return d;
      }
    });
  };

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

}