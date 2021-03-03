//----KONFIGURACIJA----//
const app = require('./app');  // Express aplikacija
const http = require('http');

const PORT = 3001;
const server = http.createServer(app);

//----SERVER----//
server.listen(PORT, () => {
  console.log(`Server je pokrenut na portu ${PORT}`);
});