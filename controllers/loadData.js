//----KONFIGURACIJA----//
const loadDataRouter = require('express').Router(); // Express router
const dataLoader = require('../utils/dataLoader');  // Middleware
const path = require('path');                       // Za slaganje putanje do "baze"

// Putanja do JSON "baze podataka"
const dataPath = path.join(__dirname, '..', 'data', 'candidate_list.json');

//----METODE----//

// Generira lažne podatke
loadDataRouter.post('/', async (req, res) => {
    // dohvati lokaciju, radijus, količinu podataka za generiranje
    const location = [req.body.lat, req.body.lng];
    const radius = req.body.radius;
    const quantity = req.body.quantity;

    // generiraj podatke i spremi u json datoteku
    let data = await dataLoader.loadBasicFakeData(quantity, location, radius);
    await dataLoader.dataToJson(data, dataPath);

    // Kad je generirano pošalji obavijest
    res.status(200).send({ success: "sucessfully generated data" });
});

module.exports = loadDataRouter;