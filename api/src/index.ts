import express from 'express';
import { addAuthRouter } from './auth/authRouter';
import { getSeasonDocument } from './services/storageService';

const app = express();
const port = 3001;

app.get('/schedule', async (req, res) => {
    const doc = await getSeasonDocument();
    res.json(doc);
});

addAuthRouter(app);

app.listen(port, () => {
    console.log(`Example app listening http://localhost:${port}`);
});
