Meteor.methods({
  addPlace: function(location, lat, lng) {
    if(! Meteor.userId()) {
      throw new Meteor.Error("not authorised");
    }
    Locations.insert({
      location: location,
      lat: lat,
      lng: lng,
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deletePlace: function(locationId) {
    Locations.remove(locationId);
  }
});