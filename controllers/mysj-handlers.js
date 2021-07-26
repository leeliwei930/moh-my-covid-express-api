const { response } = require("express");

const provider = require("../providers/mysejahtera-provider");
module.exports = {
    async localCheckInStats(req, res) {
        try {
            let params = {};
            if (req.query.start_date) {
                params.start_date = req.query.start_date;
            }
            if (req.query.end_date) {
                params.end_date = req.query.end_date;
            }
            let data = await provider.getEarlierLocalCheckInStats(params);
            return res.status(200).json(data);
        } catch {
            return res.status(500).json(error);
        }
    },
    async latestLocalCheckInStats(req, res) {
        try {
            let data = await provider.getLatestLocalCheckInStats();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async localCheckInTimelineStats(req, res) {
        try {
            let params = {};
            if (req.query.start_date) {
                params.start_date = req.query.start_date;
            }
            if (req.query.end_date) {
                params.end_date = req.query.end_date;
            }
            let data = await provider.getEarlierLocalCheckInTimelineStats(
                params
            );
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async latestLocalCheckInTimelineStats(req, res) {
        try {
            let data = await provider.getLatestLocalCheckInTimelineStats();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async stateCheckInStats(req, res) {
        try {
            let params = {};
            if (req.query.start_date) {
                params.start_date = req.query.start_date;
            }

            if (req.query.end_date) {
                params.end_date = req.query.end_date;
            }
            let data = await provider.getEarlierStateCheckInStats({
                state: req.params.state,
                ...params
            });
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    async latestStateCheckInStats(req, res) {
        try {
            let data = await provider.getLatestStateCheckInStats({
                state: req.params.state
            });
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async latestContactTracingStats(req, res) {
        try {
            let data = await provider.getLatestContactTracingStats();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async localContactTracingStats(req, res) {
        try {
            let params = {};
            if (req.query.start_date) {
                params.start_date = req.query.start_date;
            }
            if (req.query.end_date) {
                params.end_date = req.query.end_date;
            }
            let data = await provider.getContactTracingStats(params);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
};
