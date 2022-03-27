if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}

macfunctions = {
  // Convert 24hr time to 12hr
  tConvert: function(time) {
     // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? 'am' : 'pm'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(''); // return adjusted time or original string
  },

  // Convert YYYY/MM/DD to MM/DD/YYYY
  dateConvert: function(date) {
    const [year, month, day] = date.split('-');
    return [month, day, year].join('/');
  },

  urlParamClean: function(url) {
    return url.replace(/&amp;/g, '&');
  },

  prettyMeetingDays: function(days) {
    let allDays = [];
    if (days.mon){
      allDays.push('Monday');
    }
    if (days.tue){
      allDays.push('Tuesday');
    }
    if (days.wed){
      allDays.push('Wednesday');
    }
    if (days.thu){
      allDays.push('Thursday');
    }
    if (days.fri){
      allDays.push('Friday');
    }
    if (days.sat){
      allDays.push('Saturday');
    }
    if (days.sun){
      allDays.push('Sunday');
    }

    return allDays.toString();
  }

}