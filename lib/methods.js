Meteor.methods({
  addPlace: function(location) {
    if(! Meteor.userId()) {
      throw new Meteor.Error("not authorised");
    }
    Locations.insert({
      location: location,
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deletePlace: function(locationId) {
    Locations.remove(locationId);
  }
});