// Create a new Date object
const now = new Date();

// Time zone options
const timeZoneOptions = {
  timeZone: undefined,
  hour12: false,
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};

// Get the current time in New York (Eastern Daylight Time - GMT-4:00)
timeZoneOptions.timeZone = 'America/New_York';
const nyTime = now.toLocaleString('en-US', timeZoneOptions);

// Get the current time in Pakistan (Pakistan Standard Time - GMT+5:00)
timeZoneOptions.timeZone = 'Asia/Karachi';
const pakistanTime = now.toLocaleString('en-US', timeZoneOptions);

// Get the current time in India (India Standard Time - GMT+5:30)
timeZoneOptions.timeZone = 'Asia/Kolkata';
const indiaTime = now.toLocaleString('en-US', timeZoneOptions);

// Get the current time in Chicago (Central Daylight Time - GMT-5:00)
timeZoneOptions.timeZone = 'America/Chicago';
const chicagoTime = now.toLocaleString('en-US', timeZoneOptions);

// Get the current time in Chicago (Central Daylight Time - GMT-5:00)
timeZoneOptions.timeZone = 'America/Los_Angeles';
const laTime = now.toLocaleString('en-US', timeZoneOptions);

// Get the current time in Chicago (Central Daylight Time - GMT-5:00)
timeZoneOptions.timeZone = 'America/Phoenix';
const tempeTime = now.toLocaleString('en-US', timeZoneOptions);

// Display the current time in each time zone
console.log('Current time in New York:', nyTime);
console.log('Current time in Pakistan:', pakistanTime);
console.log('Current time in India:', indiaTime);
console.log('Current time in Chicago:', chicagoTime);
console.log('Current time in Calabasas:', laTime);
console.log('Current time in Tempe:', tempeTime);