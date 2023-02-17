const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://paulmessiant:epsi2023@cluster0.d7h8lhq.mongodb.net/test',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));