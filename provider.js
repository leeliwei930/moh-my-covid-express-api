const danfo = require("danfojs-node");
const { response } = require("express");

const localCasesCSV =
    "https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/epidemic/cases_malaysia.csv";

const stateCasesCSV =
    "https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/epidemic/cases_state.csv";

const localDeathCSV =
    "https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/epidemic/deaths_malaysia.csv";
const stateDeathCSV =
    "https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/epidemic/deaths_state.csv";

const clustersCSV =
    "https://github.com/MoH-Malaysia/covid19-public/blob/main/epidemic/clusters.csv";

const testsCSV =
    "https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/epidemic/tests_malaysia.csv";
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
                    data: latestStatistic
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
