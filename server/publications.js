Meteor.publish("locations", function(){
  return Locations.find();
})

Meteor.publish("circles", function(){
  return Circles.find();
})