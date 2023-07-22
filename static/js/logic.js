let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
let myMap = L.map('map', {
    center: [34.9727, -105.0324],
    zoom: 5
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

d3.json(url).then((data) => {

for (i = 0; i < data.features.length; i++) {
    long = data.features[i].geometry.coordinates[0]
    latt = data.features[i].geometry.coordinates[1]
    depth = data.features[i].geometry.coordinates[2]
    magnitude = data.features[i].properties.mag


   if (depth <=10 && depth >-10) {
    colors = "green"
   }

   else if (depth >10 && depth <=30){
    colors = "#90EE90"
   }

   else if (depth >30 && depth <=50){
    colors = "yellow"
   }

   else if (depth >50 && depth <=70){
    colors = "#FBBF77"
   }

   else if (depth >70 && depth <=90){
    colors = "orange"
   }

   else {
    colors = "red"
   }
    
    let marker = L.circle([latt, long], {
        radius: magnitude * 10000,
        color: "purple",
        fillColor: colors,
        fillOpacity: 0.60
    }).addTo(myMap)

    marker.bindPopup(
        `magnitude: ${magnitude} <br>
        depth: ${depth}<br>
        location: ${data.features[i].properties.place} <br>`


    )
}

firstpull = data.features[0].geometry.coordinates[0]


console.log(data)
console.log(firstpull)



});
let legend = L.control({position: "bottomright"});
legend.onAdd = function() {
let div = L.DomUtil.create('div', 'legend');
div.innerHTML += '<a style="background: green"></a>-10-10<br>'
div.innerHTML += '<a style="background: #90EE90"></a>10-30<br>'
div.innerHTML += '<a style="background: yellow"></a>30-50<br>'
div.innerHTML += '<a style="background: #FBBF77"></a>50-70<br>'
div.innerHTML += '<a style="background: orange"></a>70-90<br>'
div.innerHTML += '<a style="background: red"></a>90+<br>'
return div

}
legend.addTo(myMap)

