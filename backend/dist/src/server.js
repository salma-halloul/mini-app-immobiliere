"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importer le module Express
const express_1 = __importDefault(require("express"));
const item_routes_1 = __importDefault(require("./routes/item.routes"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware pour parser le JSON
app.use(express_1.default.json());
// Utiliser les routes des items
app.use('/api', item_routes_1.default);
// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
