const express = require("express");
const process = require("process");
require("dotenv").config();
const {
    localStats,
    testsStats,
    stateStats,
    latestStateStats,
    stateHospitalStats,
    latestStateHospitalStats,
    latestStateICUStats,
    latestStateQuarantineStats,
    stateQuarantineStats,
    stateICUStats
} = require("./controllers/statistic-handlers");

const {
    localCheckInStats,
    latestLocalCheckInStats,
    localCheckInTimelineStats,
    stateCheckInStats,
    latestStateCheckInStats,
    latestContactTracingStats,
    latestLocalCheckInTimelineStats,
    localContactTracingStats
} = require("./controllers/mysj-handlers");

let server = express();

let router = express.Router();
let mysjRouter = express.Router();
router.get("/local/cases", localStats);
router.get("/local/tests", testsStats);
router.get("/state/:state/cases", stateStats);
router.get("/state/:state/cases/latest", latestStateStats);
router.get("/state/:state/hospital", stateHospitalStats);
router.get("/state/:state/hospital/latest", latestStateHospitalStats);
router.get("/state/:state/icu", stateICUStats);
router.get("/state/:state/icu/latest", latestStateICUStats);
router.get("/state/:state/quarantine", stateQuarantineStats);
router.get("/state/:state/quarantine/latest", latestStateQuarantineStats);

mysjRouter.get("/local/check-in", localCheckInStats);
mysjRouter.get("/local/check-in/latest", latestLocalCheckInStats);
mysjRouter.get("/local/check-in/timeline", localCheckInTimelineStats);
mysjRouter.get(
    "/local/check-in/timeline/latest",
    latestLocalCheckInTimelineStats
);
mysjRouter.get("/state/:state/check-in", stateCheckInStats);
mysjRouter.get("/state/:state/check-in/latest", latestStateCheckInStats);
mysjRouter.get("/local/contact-tracing/latest", latestContactTracingStats);
mysjRouter.get("/local/contact-tracing", localContactTracingStats);
server.use("/api/covid-19-moh/stats", router);
server.use("/api/covid-19-moh/mysj", mysjRouter);

server.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Server listening on port ${process.env.EXPRESS_PORT}`);
    console.log(
        `For docs please navigate to /api/covid-19-moh/stats/docs path`
    );
});
