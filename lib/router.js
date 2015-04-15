Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function(){
  this.route('home', {
    path: '/'
  });
});

Router.map(function(){
  this.route('chart', {
    path: '/chart'
  });
});

Router.map(function(){
  this.route('chat', {
    path: '/chat'
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

Router.map(function(){
  this.route('message', {
    path: '/message/:messageTo'
  })
});

