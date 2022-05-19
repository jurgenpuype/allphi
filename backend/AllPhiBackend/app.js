//imports
import express from 'express';
import bodyparser from 'body-parser';

//routes
import bestuurderRoutes from './routes/bestuurder.js';
import homeRoutes from './routes/home.js';

//constants
const PORT = 5000;

//app
const app = express();
app.use(bodyparser.json());

app.use('/bestuurder', bestuurderRoutes);
app.use('/', homeRoutes);

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));