import express from 'express';
import { getSeasonDocument } from './services/storageService';

const app = express();
const port = 3000;

app.get('/schedule', async (req, res) => {
    const doc = await getSeasonDocument();
    res.json(doc);
});

app.listen(port, () => {
    console.log(`Example app listening http://localhost:${port}`);
});
