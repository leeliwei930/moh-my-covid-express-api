const provider = require("./provider");

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
            let data = await provider.getLocalStatistic(params);
            return res.status(200).json(data);
        } catch {
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
    async latestStateStats(req, res) {
        try {
            let data = await provider.getLatestStateStatistic({
                state: req.query.state
            });
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
};
