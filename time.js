// Array of time zones
const timeZones = [
  { label: 'Calabasas', timeZone: 'America/Los_Angeles', image: 'pngwing.com.png', id: 'Calabasas' },
  { label: 'Tempe', timeZone: 'America/Phoenix', image: 'pngwing.com.png', id: 'Tempe' },
  { label: 'New York', timeZone: 'America/New_York', image: 'pngwing.com.png', id: 'New York' },
  { label: 'Islamabad', timeZone: 'Asia/Karachi', image: 'pngwing.com(1).png', id: 'Islamabad' },
  { label: 'London', timeZone: 'Europe/London', image: 'pngwing.com(2).png', id: 'London' },
  { label: 'New Delhi', timeZone: 'Asia/Kolkata', image: 'pngwing.com(3).png', id: 'New Delhi' },
  { label: 'Auckland', timeZone: 'Pacific/Auckland', image: 'pngwing.com (1).png', id: 'Auckland' },
  { label: 'Berlin', timeZone: 'Europe/Berlin', image: 'pngwing.com(5).png', id: 'Berlin' },
  { label: 'Paris', timeZone: 'Europe/Paris', image: 'pngwing.com(6).png', id: 'Paris' },
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
function createTimeZoneBox({ label, timeZone, image, id }, index) {
  const timeZoneElement = document.createElement('div');
  timeZoneElement.className = 'timeZoneBox';
  timeZoneElement.id = id;
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

   

    if (hour >= 7 && hour < 17) {
      box.style.backgroundColor = "#fff3ed";
      box.style.color = "black";
    } else {
      box.style.backgroundColor = "#2B3A55";
      box.style.color = "white";
    }
  });
}

const locations = [
  { label: "Auckland", lat: -36.8509, lon: 174.7645 }, 
  { label: "Calabasas", lat: 34.1367, lon: -118.6615 },
  { label: "Tempe", lat: 33.4255, lon: -111.9400 }, 
  { label: "New York", lat: 40.7128, lon: -74.0060 }, 
  { label: "Islamabad", lat: 33.6844, lon: 73.0479 }, 
  { label: "New Delhi", lat: 28.6139, lon: 77.2090 }, 
  { label: "London", lat: 51.5072, lon: -0.1276 }, 
  { label: "Paris", lat: 48.8566, lon: 2.3522 }, 
  { label: "Berlin", lat: 52.5200, lon: 13.4050 }
  // ALL LOCATIONS NOW CORRECT
];

function updateWeatherImage() {
  timeZones.forEach(timeZone => {
    const { label, image } = timeZone;
    const location = locations.find(location => location.label === label);
    if (location) {
      const { lat, lon } = location;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          const weatherIconCode = data.weather[0].icon;
<<<<<<< Updated upstream
          const temperature = data.main.temp;
=======
          const temperature = data.main.temp.toFixed(1);
>>>>>>> Stashed changes
          const weatherIconUrl = `http://openweathermap.org/img/w/${weatherIconCode}.png`;

          const timeZoneBox = document.getElementById(label);
          if (timeZoneBox) {
            const existingImageElement = timeZoneBox.querySelector('.timeZoneTimeImage');
            if (existingImageElement) {
              existingImageElement.src = weatherIconUrl;
            } else {
              const imageElement = document.createElement('img');
              imageElement.src = weatherIconUrl;
              imageElement.className = 'timeZoneTimeImage';
              timeZoneBox.appendChild(imageElement);
            }

            const temperatureElement = timeZoneBox.querySelector('.temperature');
            if (temperatureElement) {
              temperatureElement.textContent = `${temperature}°F`;
            } else {
              const temperatureElement = document.createElement('p');
              temperatureElement.textContent = `${temperature}°F`;
              temperatureElement.className = 'temperature';
              timeZoneBox.appendChild(temperatureElement);
            }
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  });
}

const urlTesting = `https://api.openweathermap.org/data/2.5/weather?lat=34.1637&lon=-118.660835&appid=${API_KEY}`;
fetch(urlTesting)
.then(response => response.json())
.then(data => {
  console.log(data);
})

// setInterval(updateWeatherImage, 1000); // Call every second
setInterval(updateWeatherImage, 10000);
// setInterval(updateWeatherImage, 5 * 60 * 1000); // Call every 5 minutes
// Schedule periodic updates every second
setInterval(updateAllTimeZones, 1000);
//setInterval(updateWeather, 1000 * 60 * 60) this updates ever hour