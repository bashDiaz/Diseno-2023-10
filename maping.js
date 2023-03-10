let mymap = L.map('map').setView([77, -77], 50);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(mymap);
let marker = L.marker([77, -77]).addTo(mymap);