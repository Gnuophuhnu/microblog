if (typeof require !== "undefined") {
  var TimestampFormatter = require("../public/javascripts/TimestampFormatter");
  var chai = require('chai');
}

var expect = chai.expect;

var tf = new TimestampFormatter();

describe('Testing the TimestampFormatter', function() {
  describe('Test relative dates', function() {
    it('identical dates should respond "moments ago"', function(){
      expect(tf.getPrettyDate(new Date())).to.equal("moments ago");
    })
    it('4 seconds ago should respond "moments ago"', function(){
      expect(tf.getPrettyDate(new Date(new Date().getTime() - 4000))).to.equal("moments ago");
    })
    it('5 seconds ago should respond "5 seconds ago"', function(){
      expect(tf.getPrettyDate(new Date(new Date().getTime() - 5000))).to.equal("5 seconds ago");
    })
    it('59 seconds ago should respond "59 seconds ago"', function(){
      expect(tf.getPrettyDate(new Date(new Date().getTime() - 59000))).to.equal("59 seconds ago");
    })
    it('60 seconds ago should respond "a minute ago"', function(){
      expect(tf.getPrettyDate(new Date(new Date().getTime() - 60000))).to.equal("a minute ago");
    })
    it('91 seconds ago should respond "a couple of minutes ago"', function(){
      expect(tf.getPrettyDate(new Date(new Date().getTime() - 91000))).to.equal("a couple of minutes ago");
    })
  })

});