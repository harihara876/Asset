import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import config_controller_routing from './controllers/configController';
import awsS3Controller from './controllers/awsS3Controller';
import uploadImages from './controllers/uploadImagesController';

const app = express();
const PORT = 4020;

app.use(cors({origin: '*'})); // * means allowing cross origin request from any source
app.use(bodyParser.json());

// TEST ROUTE
app.get("", async (req, res) => {
    res.send("Welcome to Vridhee Common API...");
});

app.use("/api/v1", config_controller_routing);
app.use("/api/v1", awsS3Controller);
app.use("/api/v1", uploadImages);

// APPLICATION RUNNING PORT
app.listen(PORT, () => {
    console.log("Listening port on " + PORT)
});
