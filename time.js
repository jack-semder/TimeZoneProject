// Function to update the time, date, and day in the specified time zone
function updateTimeDateAndDay(timeElement, dateElement, dayElement, timeZone) {
  const now = new Date();
  // testing one hour ahead
  // now.setHours(now.getHours() + 1);
  
  const timeOptions = {
    timeZone: timeZone,
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  const dayOptions = {
    timeZone: timeZone,
    weekday: 'long',
  };
  
  const dateOptions = {
    timeZone: timeZone,
    month: 'long',
    day: 'numeric',
  };

  timeElement.textContent = now.toLocaleString('en-US', timeOptions);
  dateElement.textContent = now.toLocaleString('en-US', dateOptions);
  dayElement.textContent = now.toLocaleString('en-US', dayOptions);
}

// Function to create and return a new timezone box
function createTimeZoneBox({ label, timeZone, image }, index) {
  const timeZoneElement = document.createElement('div');
  timeZoneElement.className = 'timeZoneBox';

  const heading = document.createElement('h2');
  heading.textContent = label;
  timeZoneElement.appendChild(heading);

  const date = document.createElement('p');
  const day = document.createElement('p');
  const time = document.createElement('p');
  timeZoneElement.append(date, day, time);

  const imageElement = document.createElement('img');
  imageElement.src = image;
  imageElement.className = 'timeZoneImage';
  timeZoneElement.appendChild(imageElement);

  timeZoneElement.classList.add(index % 2 === 0 ? 'even' : 'odd');

  updateTimeDateAndDay(time, date, day, timeZone);

  return timeZoneElement;
}

// Array of time zones
const timeZones = [
  { label: 'Calabasas', timeZone: 'America/Los_Angeles', image: 'pngwing.com.png' },
  { label: 'Tempe', timeZone: 'America/Phoenix', image: 'pngwing.com.png' },
  { label: 'New York', timeZone: 'America/New_York', image: 'pngwing.com.png' },
  { label: 'Islamabad', timeZone: 'Asia/Karachi', image: 'pngwing.com(1).png' },
  { label: 'India', timeZone: 'Asia/Kolkata', image: 'pngwing.com(3).png' },
  { label: 'London', timeZone: 'Europe/London', image: 'pngwing.com(2).png' },
  { label: 'Chicago', timeZone: 'America/Chicago', image: 'pngwing.com.png' },
  { label: 'Toronto', timeZone: 'America/Toronto', image: 'pngwing.com(4).png' },
  { label: 'Hawaii', timeZone: 'Pacific/Honolulu', image: 'pngwing.com.png' }
];

const timeZonesContainer = document.getElementById('timeZones');

// Create elements for each time zone
timeZones.forEach((timeZone, index) => {
  const timeZoneBox = createTimeZoneBox(timeZone, index);
  timeZonesContainer.appendChild(timeZoneBox);
});

function updateAllTimeZones() {
  const timeZoneBoxes = document.querySelectorAll('.timeZoneBox');
  
  timeZoneBoxes.forEach(box => {
    const label = box.querySelector('h2').textContent;
    const { timeZone } = timeZones.find(tz => tz.label === label);
    const dateElement = box.querySelector('p');
    const dayElement = box.querySelectorAll('p')[1];
    const timeZoneElement = box.querySelectorAll('p')[2];

    updateTimeDateAndDay(timeZoneElement, dateElement, dayElement, timeZone);
  });
}

// Schedule periodic updates every second
setInterval(updateAllTimeZones, 1000);
