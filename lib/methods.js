Meteor.methods({
  addPlace: function(location, position) {
    if(! Meteor.userId()) {
      throw new Meteor.Error("not authorised");
    }
    Locations.insert({
      location: location,
      position: position,
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deletePlace: function(locationId) {
    Locations.remove(locationId);
  }
});