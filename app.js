//imports
const express = require('express');
const bodyparser = require('body-parser');

//routes
const voertuigtypeRoutes = require('./routes/voertuigtype.js');
const voertuigRoutes = require('./routes/voertuig.js');
const tankkaartbrandstofRoutes = require('./routes/tankkaartbrandstof.js');
const tankkaartRoutes = require('./routes/tankkaart.js');
const rijbewijstyperijbewijsRoutes = require('./routes/rijbewijstyperijbewijs.js');
const rijbewijstypeRoutes = require('./routes/rijbewijstype.js');
const rijbewijsRoutes = require('./routes/rijbewijs.js');
const brandstofvoertuigRoutes = require('./routes/brandstofvoertuig.js');
const brandstoftankkaartRoutes = require('./routes/brandstoftankkaart.js');
const bestuurderRoutes = require('./routes/bestuurder.js');
const homeRoutes = require('./routes/home.js');

//constants
const PORT = process.env.PORT;

//app
const app = express();
const cors = require('cors');
app.use(cors({
    origin: '*'
}));
app.use(bodyparser.json());

app.use('/voertuigtype', voertuigtypeRoutes);
app.use('/voertuig', voertuigRoutes);
app.use('/tankkaartbrandstof', tankkaartbrandstofRoutes);
app.use('/tankkaart', tankkaartRoutes);
app.use('/rijbewijstyperijbewijs', rijbewijstyperijbewijsRoutes);
app.use('/rijbewijstype', rijbewijstypeRoutes);
app.use('/rijbewijs', rijbewijsRoutes);
app.use('/brandstofvoertuig', brandstofvoertuigRoutes);
app.use('/brandstoftankkaart', brandstoftankkaartRoutes);
app.use('/bestuurder', bestuurderRoutes);
app.use('/', homeRoutes);

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));