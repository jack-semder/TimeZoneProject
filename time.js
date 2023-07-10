// Array of time zones
const timeZones = [
  { label: 'Calabasas', timeZone: 'America/Los_Angeles', image: 'pngwing.com.png' },
  { label: 'Tempe', timeZone: 'America/Phoenix', image: 'pngwing.com.png' },
  { label: 'New York', timeZone: 'America/New_York', image: 'pngwing.com.png' },
  { label: 'Islamabad', timeZone: 'Asia/Karachi', image: 'pngwing.com(1).png' },
  { label: 'London', timeZone: 'Europe/London', image: 'pngwing.com(2).png' },
  { label: 'New Delhi', timeZone: 'Asia/Kolkata', image: 'pngwing.com(3).png' },
  { label: 'Auckland', timeZone: 'Pacific/Auckland', image: 'pngwing.com (1).png' },
  { label: 'Berlin', timeZone: 'Europe/Berlin', image: 'pngwing.com(5).png' },
  { label: 'Paris', timeZone: 'Europe/Paris', image: 'pngwing.com(6).png' },
];

const API_KEY = "eacaf21068d283c7ad81441fd65f3124"

const timeZonesContainer = document.getElementById('timeZones');

// Update the time, date, and day function
function updateTimeDateAndDay(timeElement, dateElement, dayElement, timeZone) {
  const now = new Date();
  //Testing with five minutes into future
    //const currentTime = new Date();
    //const now = new Date(currentTime.getTime() + 5 * 60000);
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
    const { timeZone, image } = timeZones.find(tz => tz.label === label);
    const dayElement = box.querySelectorAll('p')[1];
    const dateElement = box.querySelector('p');
    const timeZoneElement = box.querySelectorAll('p')[2];

    const currentTime = updateTimeDateAndDay(timeZoneElement, dateElement, dayElement, timeZone);
    const hour = parseInt(currentTime.split(':')[0]);

    const lat = 37.7749; // Replace with the desired latitude
    const lon = -122.4194; // Replace with the desired longitude
  
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  
    let weatherImage;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Process the returned data
        //weatherImage = data['weather']
        //console.log('Data: ', data['weather'])
        console.log(data['weather'][0]['icon'])
      })
      .catch(error => {
        // Handle any errors
        console.error('Error:', error);
      });

    // Check if the image element already exists
    const existingImageElement = box.querySelector('.timeZoneTimeImage');
    if (existingImageElement) {
      existingImageElement.src = weatherImage;
    } else {
      const imageElement = document.createElement('img');
      imageElement.src = weatherImage;
      imageElement.className = 'timeZoneTimeImage';
      box.appendChild(imageElement);
    }

    if (hour >= 7 && hour < 17) {
      box.style.backgroundColor = "#fff3ed";
      box.style.color = "black";
    } else {
      box.style.backgroundColor = "#2B3A55";
      box.style.color = "white";
    }
  });
}


// Schedule periodic updates every second
setInterval(updateAllTimeZones, 1000);
//setInterval(updateWeather, 1000 * 60 * 60)