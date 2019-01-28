{1, 2, 3) for /
{4} for /repos/skyljack+infoskyljackcom
{5,6} for /repos/tag/clients

convert nested objects to array of objects
const clientArray =[];
    const keyArray = [];
    for (var key in clients) {
       console.log(clients[key]);
       console.log(key);
       keyArray.push(key);
       clientArray.push(clients[key]);
    }
    console.log(keyArray.length);



function someFunction(addresses) {
    var currAddress, coords = [];
    for (var i = 0; i < addresses.length; i++) {
        currAddress = addresses[i];
        var geocoder = new google.maps.Geocoder();
        if (geocoder) {
            geocoder.geocode({'address':currAddress}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    coords.push(results[0].geometry.location);

                    // Check if all calls have been processed
                    if (coords.length == addresses.length) {
                        someOtherFunction(coords);
                    }
                }
                ...
            });
        }
    }
}

function someOtherFunction(coords) {
    // Geocoding has been done for all addresses
    ...
}







