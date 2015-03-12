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
    path: '/set-alarm'
  });
});