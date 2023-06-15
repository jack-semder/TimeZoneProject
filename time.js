// Function to update the day and time in the specified time zone
function updateTime(dayElement, timeElement, timeZone) {
  const now = new Date();
  const timeZoneOptions = {
    timeZone: timeZone,
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  const day = now.toLocaleString('en-US', { weekday: 'long' });
  const time = now.toLocaleString('en-US', timeZoneOptions);
  dayElement.textContent = day;
  timeElement.textContent = time;
}

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
timeZones.forEach(({ label, timeZone, image }, index) => {
  const timeZoneElement = document.createElement('div');
  timeZoneElement.className = 'timeZone';

  const heading = document.createElement('h2');
  heading.textContent = label;
  timeZoneElement.appendChild(heading);

  const dayElement = document.createElement('p');
  dayElement.className = 'day';
  const timeElement = document.createElement('p');
  timeElement.className = 'time';
  timeZoneElement.appendChild(dayElement);
  timeZoneElement.appendChild(timeElement);
  timeZonesContainer.appendChild(timeZoneElement);

  const imgPath = `${image}`;
  const imageElement = document.createElement('img');
  imageElement.src = imgPath;
  imageElement.className = 'timeZoneImage';
  timeZoneElement.appendChild(imageElement);

  // Add background color based on index
  if (index % 2 === 0) {
    timeZoneElement.classList.add('even');
  } else {
    timeZoneElement.classList.add('odd');
  }

  updateTime(dayElement, timeElement, timeZone);
});

function updateAllTimeZones() {
  const timeZoneElements = Array.from(document.querySelectorAll('.timeZone'));
  timeZoneElements.forEach((timeZoneElement) => {
    const dayElement = timeZoneElement.querySelector('p:first-child');
    const timeElement = timeZoneElement.querySelector('p:last-child');
    const label = timeZoneElement.querySelector('h2').textContent;
    const timeZone = timeZones.find(({ label: timeZoneLabel }) => timeZoneLabel === label).timeZone;
    updateTime(dayElement, timeElement, timeZone);
  });
}

// Schedule periodic updates every second
setInterval(updateAllTimeZones, 1000);
