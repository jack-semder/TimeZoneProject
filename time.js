
    // Function to update the time in the specified time zone
    function updateTime(timeZoneElement, timeZone) {
      const now = new Date();
      const timeZoneOptions = {
        timeZone: timeZone,
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };
      const time = now.toLocaleString('en-US', timeZoneOptions);
      timeZoneElement.textContent = time;
    }

    // Array of time zones
    const timeZones = [
    { label: 'Calabasas', timeZone: 'America/Los_Angeles' },
    { label: 'Tempe', timeZone: 'America/Phoenix' },
    { label: 'New York', timeZone: 'America/New_York' },
    { label: 'Islamabad', timeZone: 'Asia/Karachi' },
    { label: 'India', timeZone: 'Asia/Kolkata' },
    { label: 'London', timeZone: 'Europe/London' },
    { label: 'Chicago', timeZone: 'America/Chicago' },
    { label: 'Austin', timeZone: 'America/Chicago' },
    { label: 'Pittsburgh', timeZone: 'America/New_York' }
    ];

    const timeZonesContainer = document.getElementById('timeZones');

    // Create elements for each time zone
    timeZones.forEach(({ label, timeZone }, index) => {
      const timeZoneElement = document.createElement('div');
      timeZoneElement.className = 'timeZone';
      const heading = document.createElement('h2');
      heading.textContent = label;
      timeZoneElement.appendChild(heading);
      const time = document.createElement('p');
      timeZoneElement.appendChild(time);
      timeZonesContainer.appendChild(timeZoneElement);
      updateTime(time, timeZone);

      // Add background color based on index
      if (index % 2 === 0) {
        timeZoneElement.classList.add('even');
      } else {
        timeZoneElement.classList.add('odd');
      }
    });

    // Function to update all time zones
    // function updateAllTimeZones() {
    //   timeZones.forEach(({ label, timeZone }) => {
    //     const timeZoneElement = document.querySelector(`.timeZone h2:contains(${label})`).nextElementSibling;
    //     updateTime(timeZoneElement, timeZone);
    //   });
    // }

    function updateAllTimeZones() {
  timeZones.forEach(({ label, timeZone }) => {
    const timeZoneElement = Array.from(document.querySelectorAll('.timeZone h2')).find(h2 => h2.textContent === label).nextElementSibling;
    updateTime(timeZoneElement, timeZone);
  });
}


    // Schedule periodic updates every second
    setInterval(updateAllTimeZones, 1000);
