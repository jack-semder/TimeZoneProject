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
  { label: 'Hawaii', timeZone: 'Pacific/Honolulu', image: 'pngwing.com.png' },
];

const timeZonesContainer = document.getElementById('timeZones');

// Update the time, date, and day function
function updateTimeDateAndDay(timeElement, dateElement, dayElement, timeZone) {
  const now = new Date();
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
    year: 'numeric',
  };

  timeElement.textContent = now.toLocaleString('en-US', timeOptions);
  dateElement.textContent = now.toLocaleString('en-US', dateOptions);
  dayElement.textContent = now.toLocaleString('en-US', dayOptions);

  return now.toLocaleString('en-US', { timeZone, hour: 'numeric', hour12: false });
}

// Create timezone box function
function createTimeZoneBox({ label, timeZone, image }, index) {
  const timeZoneElement = document.createElement('div');
  timeZoneElement.className = 'timeZoneBox';
  const heading = document.createElement('h2');
  heading.textContent = label;
  timeZoneElement.appendChild(heading);
  const day = document.createElement('p');
  const date = document.createElement('p');
  const time = document.createElement('p');
  timeZoneElement.append(day, date, time);
  const imageElement = document.createElement('img');
  imageElement.src = image;
  imageElement.className = 'timeZoneImage';
  timeZoneElement.appendChild(imageElement);
  timeZoneElement.classList.add(index % 2 === 0 ? 'even' : 'odd');

  const currentTime = updateTimeDateAndDay(time, date, day, timeZone);
  if (currentTime >= 7 && currentTime < 16) {
    timeZoneElement.style.backgroundColor = "#fff3ed";
    timeZoneElement.style.color = "black";
  } else {
    timeZoneElement.style.backgroundColor = "#2B3A55";
    timeZoneElement.style.color = "white";
  }
  return timeZoneElement;
}

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
    const dayElement = box.querySelectorAll('p')[1];
    const dateElement = box.querySelector('p');
    const timeZoneElement = box.querySelectorAll('p')[2];

    updateTimeDateAndDay(timeZoneElement, dayElement, dateElement, timeZone);
  });
}

// Schedule periodic updates every second
setInterval(updateAllTimeZones, 1000);
