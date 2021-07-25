const express = require("express");
const process = require("process");
require("dotenv").config();
const { localStats, testsStats, latestStateStats } = require("./handlers");
let server = express();

let router = express.Router();
router.get("/local/cases", localStats);
router.get("/local/tests", testsStats);
router.get("/state/cases", latestStateStats);
server.use("/api/covid-19-moh/stats", router);

server.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Server listening on port ${process.env.EXPRESS_PORT}`);
    console.log(
        `For docs please navigate to /api/covid-19-moh/stats/docs path`
    );
});
