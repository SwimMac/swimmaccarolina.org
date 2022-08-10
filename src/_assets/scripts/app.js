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
  dateConvert: function(date) {
    // Convert YYYY/MM/DD to MM/DD/YYYY
    const [year, month, day] = date.split('-');
    return [month, day, year].join('/');
  },
  urlParamClean: function(url) {
    return url.replace(/&amp;/g, '&');
  },
  dayMap: {
    mon: 'Monday',
    tue: 'Tuesday',
    wed: 'Wednesday',
    thu: 'Thursday',
    fri: 'Friday',
    sat: 'Saturday',
    sun: 'Sunday'
  },
  dayDictionary: {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 7
  },
  formatDays: (days) => {
    return Object.keys(days).filter((k) => days[k]).map((k) => {
        return macfunctions.dayMap[k];
    });
  },
  sortDays: (a, b) => {
    let day1 = a.toLowerCase();
    let day2 = b.toLowerCase();
    return macfunctions.dayDictionary[day1] - macfunctions.dayDictionary[day2];
  }

}