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
      username: Meteor.user().profile.name
    });
  },
  deletePlace: function(locationId) {
    Locations.remove(locationId);
  },
  addAlarm: function(location, hours, minutes, days) {
    var place = Locations.findOne();
    if(place) {
      Locations.update({"location": location}, { $set: {"hours": hours, "minutes": minutes, "days": days} });
    }
  },
  addMessage: function(message, name) {
    Messages.insert({
      message: message,
      name: name,
      time: new Date()
    });
  }
});