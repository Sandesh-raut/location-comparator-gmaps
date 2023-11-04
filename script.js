
    let map;
    let markers = []; // Store markers to be able to remove them later if needed.

    function toggleForm() {
        const formSection = document.getElementById('form-section');
        const floatingButton = document.getElementById('floating-button');
        const mapSection = document.getElementById('map');

        if (formSection.style.transform === 'translateX(0%)' || formSection.style.transform === '') {
            formSection.style.transform = 'translateX(-100%)';
            floatingButton.style.display = 'block';
            mapSection.style.width = '100%'; // Take the full width when form is hidden
        } else {
            formSection.style.transform = 'translateX(0%)';
            floatingButton.style.display = 'none';
            mapSection.style.width = '70%'; // Restore to 70% width when form is visible
        }
    }


    let formCount = 1;


    function addLocationForm() {
        if (formCount >= 20) {
            alert("Maximum of 20 location entries allowed.");
            return;
        }
        const locationForms = document.getElementById('locationForms');
        const locationEntry = document.createElement('div');
        locationEntry.classList.add('location-entry');
        locationEntry.innerHTML = `
            <label for="realLat">Real Latitude:</label>
            <input type="text" class="realLat">
            <label for="realLng">Real Longitude:</label>
            <input type="text" class="realLng">
            <label for="realDesc">Real Description:</label>
            <input type="text" class="realDesc">

            <label for="utilLat">Utility Latitude:</label>
            <input type="text" class="utilLat">
            <label for="utilLng">Utility Longitude:</label>
            <input type="text" class="utilLng">
            <label for="utilDesc">Utility Description:</label>
            <input type="text" class="utilDesc">
        `;
        locationForms.appendChild(locationEntry);
        formCount++;


    }

    let locations = [];
    function handleFormSubmission(event) {
        event.preventDefault();

        const forms = document.querySelectorAll('.location-entry');
        locations = [];  // Reset the locations array

        forms.forEach(form => {
            const realLat = parseFloat(form.querySelector('.realLat').value);
            const realLng = parseFloat(form.querySelector('.realLng').value);
            const utilLat = parseFloat(form.querySelector('.utilLat').value);
            const utilLng = parseFloat(form.querySelector('.utilLng').value);

            const locationData = {
                real: realLat && realLng ? {lat: realLat, lng: realLng} : null,
                utility: utilLat && utilLng ? {lat: utilLat, lng: utilLng} : null
            };

            locations.push(locationData);
        });

    }


    function gatherFormData() {
        const realLats = document.querySelectorAll('.realLat');
        const realLngs = document.querySelectorAll('.realLng');
        const realDescs = document.querySelectorAll('.realDesc');
        const utilLats = document.querySelectorAll('.utilLat');
        const utilLngs = document.querySelectorAll('.utilLng');
        const utilDescs = document.querySelectorAll('.utilDesc');

        const locations = [];

        for (let i = 0; i < realLats.length; i++) {
            let realCoordinates = null;
            let utilCoordinates = null;

            if (realLats[i].value && realLngs[i].value) { 
                realCoordinates = [parseFloat(realLats[i].value), parseFloat(realLngs[i].value)];
            }
            
            if (utilLats[i].value && utilLngs[i].value) {
                utilCoordinates = [parseFloat(utilLats[i].value), parseFloat(utilLngs[i].value)];
            }

            if (realCoordinates || utilCoordinates) {
                locations.push({
                    real: realCoordinates,
                    realDescription: realDescs[i].value,
                    utility: utilCoordinates,
                    utilityDescription: utilDescs[i].value
                });
            }
        }
        return locations;
    }


    function showMap() {
            // Clear previous markers
            markers.forEach(marker => marker.setMap(null));
            markers = [];
            
            const locations = gatherFormData();
            if (locations.length === 0) {
                alert("Please enter valid location data before submitting.");
                return;
            }

            initMap(locations);
        }


    function initMap(locations) {
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: locations[0].real[0], lng: locations[0].real[1] },
            zoom: 10,
            mapTypeControl: true,
            mapTypeId: 'terrain', // Set map type to terrain
            scaleControl: true,
            streetViewControl: true,
            zoomControl: true,
            rotateControl: true,
            fullscreenControl: true
        });

        locations.forEach((location, index) => {
            createMarker(new google.maps.LatLng(location.real[0], location.real[1]), index + 1, "blue", "Real", location.realDescription, map);
            createMarker(new google.maps.LatLng(location.utility[0], location.utility[1]), index + 1, "orange", "Utility", location.utilityDescription, map);
        });

    }

    let circle;

    function createMarker(position, label, color, title, description, map) {
        const marker = new google.maps.Marker({
            position: position,
            map: map,
            label: {
                text: "" + label,
                color: "white",
                fontSize: "10px"
            },
            icon: {
                path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW,
                fillColor: color,
                fillOpacity: 1,
                strokeColor: 'white',
                strokeWeight: 1,
                scale: 5,
                labelOrigin: new google.maps.Point(0, -3)
            }
        });

        marker.addListener('click', function() {
            const infowindow = new google.maps.InfoWindow({
                content: "<div><strong>" + title + ":</strong></div><div><strong>Lat:</strong> " + position.lat() + "</div><div><strong>Lng:</strong> " + position.lng() + "</div><div><strong>Description:</strong> " + description + "</div>"
            });
            infowindow.open(map, this);
        });

        // Check if circle exists, if yes remove it
        if (circle) {
            circle.setMap(null);
        }

        // Get the circle radius from the form
        const circleRadius = parseInt(document.getElementById('circleRadius').value, 10) || 100; 


        // Draw a 100-meter circle around the marker point
        new google.maps.Circle({
            center: position,
            radius: circleRadius,  // in meters
            map: map,
            fillColor: color,
            fillOpacity: 0.2,
            strokeWeight: 0
        });

        markers.push(marker);  // Push the marker to the markers array
        return marker;
    }
