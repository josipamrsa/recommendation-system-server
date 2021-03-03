//----KONFIGURACIJA----//
const geolib = require('geolib');

//----METODE----//

// Određivanje jesu li koordinate kandidata unutar zadanog radijusa
const determineInRadius = (firstLoc, secondLoc, radius) => {
    // koordinate korisnika i kandidata
    var [firstLat, firstLong] = firstLoc;
    var [secondLat, secondLong] = secondLoc;

    const points = [
        {
            latitude: parseFloat(firstLat),
            longitude: parseFloat(firstLong)
        },
        {
            latitude: parseFloat(secondLat),
            longitude: parseFloat(secondLong)
        }
    ];

    // izračunaj distancu između točaka, pretvori iz metara u kilometre
    // te ukoliko je unutar radijusa vrati true (ili false ako nije)
    return geolib.getDistance(points[0], points[1]) / 1000 <= radius;
};

module.exports = {
    determineInRadius
};