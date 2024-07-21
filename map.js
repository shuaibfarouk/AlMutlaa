let map;

async function initMap() {
    await google.maps.importLibrary("maps");

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 29.478324, lng: 47.607149},
        zoom: 13,
        mapId: '7241fd4fdf5c0624'
    });

    // Load GeoJSON file
    map.data.loadGeoJson('https://shuaibfarouk.github.io/AlMutlaa/entities.geojson', null, () => {
        // Style the dataset
        map.data.setStyle(feature => {
            return {
                fillColor: 'green',
                fillOpacity: 1,
                strokeColor: 'black',
                strokeWeight: 1
            };
        });

        // Add click event to show info window
        const infoWindow = new google.maps.InfoWindow();

        map.data.addListener('click', event => {
            const feature = event.feature;
            const content = `<div><strong>Building ID:</strong> ${feature.getProperty('building_id')}</div>`;
            infoWindow.setContent(content);
            infoWindow.setPosition(event.latLng);
            infoWindow.open(map);
        });
    });
}

window.initMap = initMap;
