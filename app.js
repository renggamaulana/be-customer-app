const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const customerRoutes = require('./routes/customerRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
// routes
app.use('/api/customers', customerRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));