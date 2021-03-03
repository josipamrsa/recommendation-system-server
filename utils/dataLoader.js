//----KONFIGURACIJA----//
const fs = require("fs");                               // file-system manager
const faker = require("faker");                         // paket za generiranje lažnih podataka
const reviews = require("../data/reviews_list.json");   // lista lažnih recenzija

//----METODE----//

// Generiranje lažnih podataka za pretragu u sustavu
const loadBasicFakeData = (qty, loc, rad) => {
    let basicData = [];

    for (let i = 0; i < qty; i++) {
        // nasumični podaci
        let randomRad = Math.floor(Math.random() * rad);
        let randomName = faker.name.findName();
        let randomLocation = faker.address.nearbyGPSCoordinate(loc, randomRad);

        // dohvati nasumičan broj recenzija
        let randomReviewNumber = Math.floor(Math.random() * reviews.length) + 1;
        let randomReviews = [];

        for (let j = 0; j < randomReviewNumber; j++) {
            // dohvati nasumičnu recenziju (rješiti problem duplih recenzija)
            let randomReview = Math.floor(Math.random() * reviews.length);
            randomReviews.push({
                id: j + 1,
                query: reviews[randomReview].query,
                rating: reviews[randomReview].rating
            });
        }

        // spremiti dobivene podatke u objekt, 
        // te na kraju u listu objekata
        let candidate = {
            id: i + 1,
            name: randomName,
            location: randomLocation,
            reviews: randomReviews
        }

        basicData.push(candidate);
    }

    return basicData;
}

// Pretvorba dobivenih podataka u JSON
// i spremanje u novu datoteku
const dataToJson = (data, path) => {
    // u specificiranu putanju upisati dobivene podatke
    // ako je došlo do greške, ispiši grešku
    fs.writeFile(path, JSON.stringify(data), (err) => {
        if (err) {
            console.log(err);
        };
    });
};

module.exports = { loadBasicFakeData, dataToJson };