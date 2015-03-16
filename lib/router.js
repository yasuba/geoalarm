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
      return Locations.findOne({location: this.params.location});
    },
    action: function(){
      if(this.ready()){
        this.render();
      }
    }
  });
});
