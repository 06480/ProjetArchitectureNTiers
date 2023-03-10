const express = require('express');
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');

const port = process.env.PORT || 3000;

const jwtCheck = auth({
  audience: 'https://127.0.0.1:3000',
  issuerBaseURL: 'https://dev-s15hjodwpfsobczx.eu.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// enforce on all endpoints
app.use(jwtCheck);

app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});

app.listen(port);

console.log('Running on port ', port);
