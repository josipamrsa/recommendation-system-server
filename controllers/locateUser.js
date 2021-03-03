//----KONFIGURACIJA----//
const locateRouter = require('express').Router(); // Express router
const path = require('path');                     // Za rad s putanjama
const fs = require('fs');                         // Za rad s datotecnim sustavom
const locator = require('../utils/locator');      // Middleware

// Putanja do JSON "baze podataka"
const dataPath = path.join(__dirname, '..', 'data', 'candidate_list.json');
// Lista svih kandidata iz "baze podataka" (svojstvo)
let candidateList = [];

//----METODE----//

// Dohvaća sve osobe iz baze i provjerava njihovu lokaciju
locateRouter.post('/', async (req, res) => {
    const loc = req.body;

    // učitaj JSON datoteku ako postoji
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            res.status(404).send({ error: "No file found - please generate data before fetching recommendations!" })
        }

        // parsiraj JSON podatke
        candidateList = JSON.parse(data);
        // pomoćna za spremanje kandidata unutar zadanog radijusa
        let candidates = [];

        // za svakog od kandidata provjeri upadanje u specificirani radijus
        candidateList.forEach(ca => {
            let dist = locator.determineInRadius(ca.location, [loc.latitude, loc.longitude], loc.radius);
            if (dist) {
                candidates.push(
                    {
                        ...ca,
                        dist: locator
                            .calculateInRadius(ca.location, [loc.latitude, loc.longitude], loc.radius)
                    });
            };
        });

        // vrati listu potencijalnih kandidata
        res.json(candidates);
    });
});

// Sprema korisnički upit kao recenziju kod najpodobnijeg kandidata
locateRouter.put('/', (req, res) => {
    const id = req.body.id;
    const query = req.body.query;
    const rating = Math.floor(Math.random() * 5); // TODO - polovicne ocjene

    // nađi poslanog kandidata unutar liste kandidata
    let optimalCandidate = candidateList.find((ca) => ca.id === id);

    // spremi korisnički upit kao novu recenziju
    // napomena - mijenja originalnu listu kandidata, a ne stvara se nova kopija!
    optimalCandidate.reviews.push({
        id: optimalCandidate.reviews.length + 1,
        query: query,
        rating: rating
    });

    // modificiranu listu spremi u JSON datoteku koja služi kao baza ako postoji
    fs.writeFile(dataPath, JSON.stringify(candidateList), (err, data) => {
        if (err) {
            res.status(404).send({ error: "No file found!" })
        }
    });

    // vrati novu listu kandidata
    res.json(candidateList);
});

module.exports = locateRouter;