
    // Function to update the time in the specified time zone
    function updateTime(timeZoneElement, dayElement, timeZone) {
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
      timeZoneElement.textContent = time;
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
  updateTime(timeElement, dayElement, timeZone);

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
  console.log(dayElement)
});

    function updateAllTimeZones() {
  timeZones.forEach(({ label, timeZone }) => {
    const timeZoneElement = Array.from(document.querySelectorAll('.timeZone h2')).find(h2 => h2.textContent === label).nextElementSibling.nextElementSibling;
    updateTime(timeZoneElement, timeZone);
  });
}


    // Schedule periodic updates every second
    setInterval(updateAllTimeZones, 1000);

 