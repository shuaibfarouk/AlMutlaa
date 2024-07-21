let map;

async function initMap() {
    await google.maps.importLibrary("maps");

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 29.478324, lng: 47.607149},
        zoom: 13,
        mapId: '7241fd4fdf5c0624'
    });

    // Load the GeoJSON file
    map.data.loadGeoJson('https://shuaibfarouk.github.io/AlMutlaa/entities.geojson', null, function(features) {
        console.log('GeoJSON loaded, features:', features);
        if (features.length === 0) {
            console.error('No features loaded from GeoJSON');
        }
    });

    // Style the GeoJSON data
    map.data.setStyle(function(feature) {
        return {
            fillColor: 'green',
            fillOpacity: 0.8,
            strokeColor: 'black',
            strokeWeight: 1,
            clickable: true
        };
    });

    // Add click event to show info window
    const infoWindow = new google.maps.InfoWindow();

    map.data.addListener('click', event => {
        const feature = event.feature;
        console.log('Clicked feature:', feature);
        const content = `
            <div>
                <strong>Building ID:</strong> ${feature.getProperty('building_id') || 'N/A'}
                <br>
                <strong>Area:</strong> ${feature.getProperty('area') || 'N/A'} sq m
                <br>
                <strong>Type:</strong> ${feature.getProperty('type') || feature.getProperty('Layer') || 'N/A'}
                <br>
                <strong>Handle:</strong> ${feature.getProperty('EntityHandle') || 'N/A'}
            </div>
        `;
        infoWindow.setContent(content);
        infoWindow.setPosition(event.latLng);
        infoWindow.open(map);
    });

    // Add hover effect
    map.data.addListener('mouseover', function(event) {
        map.data.overrideStyle(event.feature, {fillColor: 'yellow', fillOpacity: 0.8});
    });

    map.data.addListener('mouseout', function(event) {
        map.data.revertStyle();
    });
}

// Call initMap when the page loads
google.maps.event.addDomListener(window, 'load', initMap);
