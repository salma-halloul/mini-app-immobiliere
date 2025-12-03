import express, { Request, Response } from 'express';
import cors from 'cors';
import itemRoutes from './routes/item.routes';

const app = express();
const port = 3000;

// Activer CORS pour toutes les origines
app.use(cors());

// Middleware pour parser le JSON
app.use(express.json());

// Utiliser les routes des items
app.use('/api', itemRoutes);


// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
