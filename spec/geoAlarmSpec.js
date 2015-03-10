describe("GeoAlarm", function() {
  var alarm;

  beforeEach(function() {
    alarm = new GeoAlarm();
  });

  it("should know its location", function() {
    alarm.getLocation();
    expect(alarm.location).toEqual("here");
  });

});
