if (typeof require !== "undefined") {
  var moment = require("moment");
}

var TimestampFormatter = (function() {

  function TimestampFormatter() {
    this.oneDay = 24 * 60 * 60 * 1000;
    this.now = new Date();
    this.midnight = new Date();
    this.midnightYesterday = new Date();
  }

  function midnightOfDate(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
  }

  function pluralize(word, quantity) {
    var quantityString = "";
    switch (quantity) {
      case 1:
        quantityString = (word === "hour" ? "an" : "a");
        break;
      case 2:
        quantityString = "a couple of";
        break;
      default:
        quantityString = quantity;
        break;
    }
    word = quantity > 1 ? (word + "s") : word;
    return [quantityString, word].join(" ");
  }

  TimestampFormatter.prototype.resetDates = function() {
    this.now = new Date();
    this.midnight = midnightOfDate(this.now);
    this.midnightYesterday = new Date(this.midnight.getTime() - this.oneDay);
  }

  TimestampFormatter.prototype.secondsSince = function(date) {
    var ms = this.now.getTime() - date.getTime();
    var s = Math.round(ms / 1000);
    return s;
  }

  TimestampFormatter.prototype.isToday = function(date) {
    return (date.getDate() === this.now.getDate() && (this.secondsSince(date) < 24 * 60 * 60));
  }

  TimestampFormatter.prototype.isYesterday = function(date) {
    if (this.isToday(date)) return false;
    return (date.getTime() - this.midnightYesterday.getTime() >= 0)
  }

  TimestampFormatter.prototype.getPrettyDate = function(date) {
    if (typeof date === "string") {
      date = new Date(date);
    }
    this.resetDates();
    if (this.isToday(date)) {
      var seconds = this.secondsSince(date);
      switch (true) {
        case (seconds < 5): // less than 5 seconds ago
          return "moments ago";
          break;
        case (seconds < 60): // less than a minute ago
          return ([pluralize("second", seconds), "ago"].join(" "));
          break;
        case (seconds < 60 * 60): // less than an hour ago
          var minutes = Math.round(seconds / 60);
          return ([pluralize("minute", minutes), "ago"].join(" "));
          break;
        default: // more than an hour ago, so show
          var hours = Math.round(seconds / 3600);
          return ([pluralize("hour", hours), "ago"].join(" "));
          break;
      }
    // otherwise, is it tomorrow's date? Show "Yesterday at 12:00 PM"
    } else if (this.isYesterday(date)) {
      return "Yesterday at " + moment(date).format("h:mm A");
    // otherwise show the full date and time
    } else {
      return moment(date).format("MMMM Do YYYY, h:mm A");
    }
  }

  return TimestampFormatter;

})();

if (typeof module !== "undefined") {
  module.exports = TimestampFormatter;
}