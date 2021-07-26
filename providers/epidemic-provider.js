const danfo = require("danfojs-node");

const {
    localCasesCSV,
    stateCasesCSV,
    localDeathCSV,
    stateDeathCSV,
    clustersCSV,
    testsCSV,
    hospitalCSV,
    icuCSV,
    quarantineCSV
} = require("../datasets_manifest");
const state_group_decompose = require("../utils/state_group_decompose");
module.exports = {
    getLocalStatistic({ start_date, end_date }) {
        return new Promise(async (resolve, reject) => {
            try {
                let datasets = await danfo.read_csv(localCasesCSV);
                let deaths = await danfo.read_csv(localDeathCSV);
                datasets = danfo.merge({
                    left: datasets,
                    right: deaths,
                    on: ["date"]
                });
                if (start_date) {
                    datasets = datasets.query({
                        column: "date",
                        is: ">=",
                        to: start_date
                    });
                }

                if (end_date) {
                    datasets = datasets.query({
                        column: "date",
                        is: "<=",
                        to: end_date
                    });
                }
                // fill empty value with 0
                datasets = datasets.fillna({
                    values: [0]
                });
                let json = await datasets.to_json();
                resolve({
                    status: "success",
                    data: JSON.parse(json)
                });
            } catch {
                reject({
                    status: "error",
                    message: error.message
                });
            }
        });
    },
    getLocalTestsStatistic({ start_date, end_date }) {
        return new Promise(async (resolve, reject) => {
            try {
                let datasets = await danfo.read_csv(testsCSV);

                if (start_date) {
                    datasets = datasets.query({
                        column: "date",
                        is: ">=",
                        to: start_date
                    });
                }

                if (end_date) {
                    datasets = datasets.query({
                        column: "date",
                        is: "<=",
                        to: end_date
                    });
                }
                // fill empty value with 0
                datasets = datasets.fillna({
                    values: [0]
                });
                datasets.rename({
                    mapper: {
                        " rtk-ag": "rtk-ag",
                        " pcr": "pcr"
                    },
                    inplace: true
                });
                let json = await datasets.to_json();
                resolve({
                    status: "success",
                    data: JSON.parse(json)
                });
            } catch (error) {
                reject({
                    status: "error",
                    message: error.message
                });
            }
        });
    },
    getLatestStateStatistic({ state }) {
        return new Promise(async (resolve, reject) => {
            try {
                let datasets = await danfo.read_csv(stateCasesCSV);
                let deathsDatasets = await danfo.read_csv(stateDeathCSV);
                datasets = danfo.merge({
                    left: datasets,
                    right: deathsDatasets,
                    on: ["date", "state"]
                });
                let latestStateDataFrame = datasets.sort_index({
                    ascending: false
                });
                if (state === undefined) {
                    latestStateDataFrame = latestStateDataFrame.head(16);
                } else {
                    latestStateDataFrame = latestStateDataFrame.query({
                        column: "state",
                        is: "==",
                        to: state
                    });
                    latestStateDataFrame = latestStateDataFrame.head(1);
                }
                let latestStatistic = await latestStateDataFrame.to_json();
                latestStatistic = JSON.parse(latestStatistic);
                resolve({
                    status: "success",
                    data: latestStatistic[0]
                });
            } catch (error) {
                reject({
                    status: "error",
                    message: error.message
                });
            }
        });
    },
    getEarlierStateStatistic({ state, start_date, end_date }) {
        return new Promise(async (resolve, reject) => {
            try {
                let datasets = await danfo.read_csv(stateCasesCSV);
                let deathsDatasets = await danfo.read_csv(stateDeathCSV);
                datasets = danfo.merge({
                    left: datasets,
                    right: deathsDatasets,
                    on: ["date", "state"]
                });
                datasets = datasets.query({
                    column: "state",
                    is: "==",
                    to: state
                });
                if (start_date) {
                    datasets = datasets.query({
                        column: "date",
                        is: ">=",
                        to: start_date
                    });
                }
                if (end_date) {
                    datasets = datasets.query({
                        column: "date",
                        is: "<=",
                        to: end_date
                    });
                }

                let stateStatistics = await datasets.to_json();
                stateStatistics = JSON.parse(stateStatistics);
                resolve({
                    status: "success",
                    data: stateStatistics
                });
            } catch (error) {
                reject({
                    status: "error",
                    message: error.message
                });
            }
        });
    },
    getStateHospitalStatistic({ state, start_date, end_date }) {
        return new Promise(async (resolve, reject) => {
            try {
                let datasets = await danfo.read_csv(hospitalCSV);

                datasets = datasets.query({
                    column: "state",
                    is: "==",
                    to: state
                });
                if (start_date) {
                    datasets = datasets.query({
                        column: "date",
                        is: ">=",
                        to: start_date
                    });
                }
                if (end_date) {
                    datasets = datasets.query({
                        column: "date",
                        is: "<=",
                        to: end_date
                    });
                }

                let stateStatistics = await datasets.to_json();
                stateStatistics = JSON.parse(stateStatistics);
                resolve({
                    status: "success",
                    data: stateStatistics
                });
            } catch (error) {
                reject({
                    status: "error",
                    message: error.message
                });
            }
        });
    },
    getLatestStateHospitalStatistic({ state }) {
        return new Promise(async (resolve, reject) => {
            try {
                let datasets = await danfo.read_csv(hospitalCSV);

                let latestStateDataFrame = datasets.sort_index({
                    ascending: false
                });
                if (state === undefined) {
                    latestStateDataFrame = latestStateDataFrame.head(16);
                } else {
                    latestStateDataFrame = latestStateDataFrame.query({
                        column: "state",
                        is: "==",
                        to: state
                    });
                    latestStateDataFrame = latestStateDataFrame.head(1);
                }
                let latestStatistic = await latestStateDataFrame.to_json();
                latestStatistic = JSON.parse(latestStatistic);
                resolve({
                    status: "success",
                    data: latestStatistic[0]
                });
            } catch (error) {
                reject({
                    status: "error",
                    message: error.message
                });
            }
        });
    },
    getEarlierStateHospitalStatistic({ state, start_date, end_date }) {
        return new Promise(async (resolve, reject) => {
            try {
                let datasets = await danfo.read_csv(hospitalCSV);

                datasets = datasets.query({
                    column: "state",
                    is: "==",
                    to: state
                });
                if (start_date) {
                    datasets = datasets.query({
                        column: "date",
                        is: ">=",
                        to: start_date
                    });
                }
                if (end_date) {
                    datasets = datasets.query({
                        column: "date",
                        is: "<=",
                        to: end_date
                    });
                }

                let stateStatistics = await datasets.to_json();
                stateStatistics = JSON.parse(stateStatistics);
                resolve({
                    status: "success",
                    data: stateStatistics
                });
            } catch (error) {
                reject({
                    status: "error",
                    message: error.message
                });
            }
        });
    },
    getLatestStateICUStatistic({ state }) {
        return new Promise(async (resolve, reject) => {
            try {
                let datasets = await danfo.read_csv(icuCSV);

                let latestStateDataFrame = datasets.sort_index({
                    ascending: false
                });
                if (state === undefined) {
                    latestStateDataFrame = latestStateDataFrame.head(16);
                } else {
                    latestStateDataFrame = latestStateDataFrame.query({
                        column: "state",
                        is: "==",
                        to: state
                    });
                    latestStateDataFrame = latestStateDataFrame.head(1);
                }
                let latestStatistic = await latestStateDataFrame.to_json();
                latestStatistic = JSON.parse(latestStatistic);
                resolve({
                    status: "success",
                    data: latestStatistic[0]
                });
            } catch (error) {
                reject({
                    status: "error",
                    message: error.message
                });
            }
        });
    },
    getEarlierStateICUStatistic({ state, start_date, end_date }) {
        return new Promise(async (resolve, reject) => {
            try {
                let datasets = await danfo.read_csv(icuCSV);

                datasets = datasets.query({
                    column: "state",
                    is: "==",
                    to: state
                });
                if (start_date) {
                    datasets = datasets.query({
                        column: "date",
                        is: ">=",
                        to: start_date
                    });
                }
                if (end_date) {
                    datasets = datasets.query({
                        column: "date",
                        is: "<=",
                        to: end_date
                    });
                }

                let stateStatistics = await datasets.to_json();
                stateStatistics = JSON.parse(stateStatistics);
                resolve({
                    status: "success",
                    data: stateStatistics
                });
            } catch (error) {
                reject({
                    status: "error",
                    message: error.message
                });
            }
        });
    },
    getLatestStateQuarantineStatistic({ state }) {
        return new Promise(async (resolve, reject) => {
            try {
                let datasets = await danfo.read_csv(quarantineCSV);

                let latestStateDataFrame = datasets.sort_index({
                    ascending: false
                });
                if (state === undefined) {
                    latestStateDataFrame = latestStateDataFrame.head(16);
                } else {
                    latestStateDataFrame = latestStateDataFrame.query({
                        column: "state",
                        is: "==",
                        to: state
                    });
                    latestStateDataFrame = latestStateDataFrame.head(1);
                }
                let latestStatistic = await latestStateDataFrame.to_json();
                latestStatistic = JSON.parse(latestStatistic);
                resolve({
                    status: "success",
                    data: latestStatistic[0]
                });
            } catch (error) {
                reject({
                    status: "error",
                    message: error.message
                });
            }
        });
    },
    getEarlierStateQuarantineStatistic({ state, start_date, end_date }) {
        return new Promise(async (resolve, reject) => {
            try {
                let datasets = await danfo.read_csv(quarantineCSV);

                datasets = datasets.query({
                    column: "state",
                    is: "==",
                    to: state
                });
                if (start_date) {
                    datasets = datasets.query({
                        column: "date",
                        is: ">=",
                        to: start_date
                    });
                }
                if (end_date) {
                    datasets = datasets.query({
                        column: "date",
                        is: "<=",
                        to: end_date
                    });
                }

                let stateStatistics = await datasets.to_json();
                stateStatistics = JSON.parse(stateStatistics);
                resolve({
                    status: "success",
                    data: stateStatistics
                });
            } catch (error) {
                reject({
                    status: "error",
                    message: error.message
                });
            }
        });
    },
    getClusterStatistic() {
        return new Promise(async (resolve, reject) => {
            try {
                let datasets = await danfo.read_csv(clustersCSV);

                let statistics = await datasets.to_json();
                statistics["state"] = state_group_decompose.splitStateGroup(
                    statistics["state"]
                );
                statistics["district"] = state_group_decompose.splitStateGroup(
                    statistics["district"]
                );
                statistics = JSON.parse(statistics);
                resolve({
                    status: "success",
                    data: statistics
                });
            } catch (error) {
                reject({
                    status: "error",
                    message: error.message
                });
            }
        });
    }
};
