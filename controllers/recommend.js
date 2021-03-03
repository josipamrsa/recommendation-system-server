//----KONFIGURACIJA----//
const recommendRouter = require('express').Router();                // Express router
const recommenderEngine = require('../utils/recommenderEngine');    // Engine za generiranje preporuka

//----METODE----//

// Obrada zahtjeva korisnika i dohvat rezultata (kandidata)
recommendRouter.post('/', async (req, res) => {
    const query = recommenderEngine.vectorizeQuery(req.body.zahtjev);
    candidateList = req.body.locirani;
    let reviews = [];

    console.log(candidateList);

    // za svakog potencijalnog kandidata dohvati osnovne podatke 
    // te izračunaj similarity score na temelju prethodnih recenzija
    candidateList.forEach(ca => {
        console.log("kandidat: " + ca.dist);
        reviews.push({
            id: ca.id,
            name: ca.name,
            location: ca.location,
            similarity: recommenderEngine.vectorizeUserReviews(ca.reviews),
            distance: ca.dist
        });
    });

    // usporedi korisnički zahtjev i dobivene recenzije te vrati odgovor
    const candidates = recommenderEngine.compareReviews(reviews, query);
    res.json(candidates);
});

module.exports = recommendRouter;