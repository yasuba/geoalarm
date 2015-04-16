Meteor.publish("locations", function(){
  return Locations.find();
})

Meteor.publish("circles", function(){
  return Circles.find();
})

Meteor.publish("chat", function(){
  return Chat.find();
})

Meteor.publish("messages", function(){
  return Messages.find();
})

Meteor.publish("userStatus", function() {
  return Meteor.users.find({});
});