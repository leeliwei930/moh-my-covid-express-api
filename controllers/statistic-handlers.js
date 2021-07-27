const provider = require("../providers/epidemic-provider");

module.exports = {
    async localStats(req, res) {
        try {
            let params = {};
            if (req.query.start_date) {
                params.start_date = req.query.start_date;
            }
            if (req.query.end_date) {
                params.end_date = req.query.end_date;
            }
            let data = await provider.getEarlierLocalCasesStatistic(params);
            return res.status(200).json(data);
        } catch {
            return res.status(500).json(error);
        }
    },
    async latestLocalStats(req, res) {
        try {
            let data = await provider.getLatestLocalCasesStatistic();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async testsStats(req, res) {
        try {
            let params = {};
            if (req.query.start_date) {
                params.start_date = req.query.start_date;
            }
            if (req.query.end_date) {
                params.end_date = req.query.end_date;
            }
            let data = await provider.getLocalTestsStatistic(params);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async latestTestsStats(req, res) {
        try {
            let data = await provider.getLatestLocalTestsStatistic();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async latestStateStats(req, res) {
        try {
            let data = await provider.getLatestStateStatistic({
                state: req.params.state
            });
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async stateStats(req, res) {
        try {
            let params = {};
            if (req.query.start_date) {
                params.start_date = req.query.start_date;
            }

            if (req.query.end_date) {
                params.end_date = req.query.end_date;
            }
            let data = await provider.getEarlierStateStatistic({
                state: req.params.state,
                ...params
            });
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async stateHospitalStats(req, res) {
        try {
            let params = {};
            if (req.query.start_date) {
                params.start_date = req.query.start_date;
            }

            if (req.query.end_date) {
                params.end_date = req.query.end_date;
            }
            let data = await provider.getStateHospitalStatistic({
                state: req.params.state,
                ...params
            });
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async latestStateHospitalStats(req, res) {
        try {
            let data = await provider.getLatestStateHospitalStatistic({
                state: req.params.state
            });
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    async stateICUStats(req, res) {
        try {
            let params = {};
            if (req.query.start_date) {
                params.start_date = req.query.start_date;
            }

            if (req.query.end_date) {
                params.end_date = req.query.end_date;
            }
            let data = await provider.getEarlierStateICUStatistic({
                state: req.params.state,
                ...params
            });
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async latestStateICUStats(req, res) {
        try {
            let data = await provider.getLatestStateICUStatistic({
                state: req.params.state
            });
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async stateQuarantineStats(req, res) {
        try {
            let params = {};
            if (req.query.start_date) {
                params.start_date = req.query.start_date;
            }

            if (req.query.end_date) {
                params.end_date = req.query.end_date;
            }
            let data = await provider.getEarlierStateQuarantineStatistic({
                state: req.params.state,
                ...params
            });
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async latestStateQuarantineStats(req, res) {
        try {
            let data = await provider.getLatestStateQuarantineStatistic({
                state: req.params.state
            });
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async localClustersStats(req, res) {
        try {
            let data = await provider.getClusterStatistic();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
};
