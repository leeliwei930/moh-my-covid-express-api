const danfo = require("danfojs-node");

const {
    localCheckInCSV,
    localCheckInTimelineHistoryCSV,
    stateCheckInCSV,
    contactTracingCSV
} = require("../datasets_manifest");
module.exports = {
    getEarlierLocalCheckInStats({ start_date, end_date }) {
        return new Promise(async (resolve, reject) => {
            try {
                let datasets = await danfo.read_csv(localCheckInCSV);
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
                datasets.rename({
                    mapper: {
                        unique_ind: "total_unique_account_checkin",
                        unique_loc: "total_unique_checkin_location"
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
    getLatestLocalCheckInStats() {
        return new Promise(async (resolve, reject) => {
            try {
                let datasets = await danfo.read_csv(localCheckInCSV);
                datasets.rename({
                    mapper: {
                        unique_ind: "total_unique_account_checkin",
                        unique_loc: "total_unique_checkin_location"
                    },
                    inplace: true
                });
                datasets = datasets.sort_index({
                    ascending: false
                });

                datasets = datasets.head(1);

                let latestStatistic = await datasets.to_json();
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
    getEarlierLocalCheckInTimelineStats({ start_date, end_date }) {
        return new Promise(async (resolve, reject) => {
            try {
                let datasets = await danfo.read_csv(
                    localCheckInTimelineHistoryCSV
                );
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
    getLatestLocalCheckInTimelineStats() {
        return new Promise(async (resolve, reject) => {
            try {
                let datasets = await danfo.read_csv(
                    localCheckInTimelineHistoryCSV
                );

                datasets = datasets.sort_index({
                    ascending: false
                });

                datasets = datasets.head(1);
                let latestStatistic = await datasets.to_json();
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
    getEarlierStateCheckInStats({ state, start_date, end_date }) {
        return new Promise(async (resolve, reject) => {
            try {
                let datasets = await danfo.read_csv(stateCheckInCSV);
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
                let json = await datasets.to_json();
                let data = JSON.parse(json);
                resolve({
                    status: "success",
                    data
                });
            } catch (error) {
                reject({
                    status: "error",
                    message: error.message
                });
            }
        });
    },
    getLatestStateCheckInStats({ state }) {
        return new Promise(async (resolve, reject) => {
            try {
                let datasets = await danfo.read_csv(stateCheckInCSV);

                datasets = datasets.sort_index({
                    ascending: false
                });
                let latestStateDataFrame = datasets.query({
                    column: "state",
                    is: "==",
                    to: state
                });
                latestStateDataFrame = latestStateDataFrame.head(1);
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
    getLatestContactTracingStats() {
        return new Promise(async (resolve, reject) => {
            try {
                let datasets = await danfo.read_csv(contactTracingCSV);

                datasets = datasets.sort_index({
                    ascending: false
                });
                let statistic = datasets.head(1);
                statistic = await statistic.to_json();
                statistic = JSON.parse(statistic);
                resolve({
                    status: "success",
                    data: statistic[0]
                });
            } catch (error) {
                reject({
                    status: "error",
                    message: error.message
                });
            }
        });
    },
    getContactTracingStats({ start_date, end_date }) {
        return new Promise(async (resolve, reject) => {
            try {
                let datasets = await danfo.read_csv(contactTracingCSV);

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

                let contactTracingStats = await datasets.to_json();
                contactTracingStats = JSON.parse(contactTracingStats);
                resolve({
                    status: "success",
                    data: contactTracingStats
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
