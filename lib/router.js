Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function(){
  this.route('home', {
    path: '/'
  });
});

Router.map(function(){
  this.route('setAlarm', {
    path: '/:location',
    data: function(){
      var selectedPlace = this.params.location;
      return Locations.findOne({location: selectedPlace});
    }
  });
});
