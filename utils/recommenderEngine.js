//----KONFIGURACIJA----//
const natural = require('natural');         // Paket za rad sa NLP
const Vector = require('vector-object');    // Paket za rad s vektorima

//----METODE----//

// Vektorizacija korisničkog zahtjeva
const vectorizeQuery = (userQuery) => {
    var TfIdf = natural.TfIdf;
    var tfidf = new TfIdf();

    // dodaj dokument i izračunaj frekvenciju svih pojmova (TF/IDF)
    tfidf.addDocument(userQuery);
    const termsList = tfidf.listTerms(0);

    // napravi rječnik sa svakim pojmom i frekvencijom pojavljivanja
    let termFreq = {}
    termsList.map((item) => {
        termFreq[item.term] = item.tfidf;
    });

    return termFreq;
}

// Vektorizacija recenzija za potencijalne kandidate
const vectorizeUserReviews = (userReviews) => {
    var TfIdf = natural.TfIdf;
    var tfidf = new TfIdf();

    userReviews.forEach(review => {
        tfidf.addDocument(review.query);
    });

    const vectorizedDocs = [];

    // za svaku recenziju
    for (let i = 0; i < userReviews.length; i++) {
        // izlistaj pojavljivanje svakog pojma unutar prethodnog zahtjeva
        const termList = tfidf.listTerms(i);

        let termFreq = {}

        // napravi rječnik sa pojmom i pripadajućom frekvencijom
        termList.map((item) => {
            termFreq[item.term] = item.tfidf;
        });

        // vektoriziraj rječnik i dodaj s ostalim podacima u vektorizirani dokument
        vectorizedDocs.push({
            id: i,
            rating: userReviews[i].rating,
            vector: new Vector(termFreq).vector
        });
    };

    // vrati vektorizirani dokument za recenziju od svakog kandidata
    return vectorizedDocs;
};

// Usporedba korisničkog zahtjeva sa vektoriziranim recenzijama
const compareReviews = (data, query) => {
    let candidates = [];

    // za svakog izračunaj sličnost sa zahtjevom i vrati s podacima
    data.forEach((rev) => {
        let candidateScore = calculateCosineSimilarity(query, rev.similarity);
        let candidate = {
            id: rev.id,
            name: rev.name,
            location: rev.location,
            score: candidateScore,
            distance: rev.distance
        }
        candidates.push(candidate);
    });

    // sortiraj prema sličnosti
    candidates.sort((a, b) => {
        // najsličniji po rezultatu
        if (a.score < b.score) return 1;
        if (a.score > b.score) return -1;

        // najmanja udaljenost
        if (a.distance > b.distance) return 1;
        if (a.distance < b.distance) return -1;

        return 0;
    });

    // vrati potencijalne kandidate
    return candidates;
}

// Računanje sličnosti preko cosine similarity
const calculateCosineSimilarity = (query, reviews) => {
    const queryVector = new Vector(query); // vektoriziraj zahtjev korisnika
    const reviewLength = reviews.length;
    let finalScore = 0;

    // za svaku recenziju kandidata izračunaj sličnost i dodaj cjelokupnom scoreu
    // sličnost pritom podijeli s kvalitetom (ocjenom) te recenzije
    reviews.forEach((review) => {
        const reviewVector = new Vector(review.vector);
        finalScore += (queryVector.getCosineSimilarity(reviewVector) / review.rating);
    });

    // vrati konačni score podijeljen s brojem recenzija (može i bez toga?)
    return finalScore / reviewLength;
};

module.exports = {
    vectorizeUserReviews,
    compareReviews,
    calculateCosineSimilarity,
    vectorizeQuery
};