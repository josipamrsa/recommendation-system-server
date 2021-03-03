//----KONFIGURACIJA----//
const app = require('./app');  // Express aplikacija
const http = require('http');

const PORT = 3001;
const server = http.createServer(app);

//----SERVER----//
server.listen(process.env.PORT || PORT, () => {
  console.log(`Server je pokrenut na portu ${PORT}`);
});