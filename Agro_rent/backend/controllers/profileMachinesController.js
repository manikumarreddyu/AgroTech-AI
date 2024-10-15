const Machine = require("../models/machine");


exports.getProfileMachines = async (req, res) => {
    const ownerId = req.params.userId;

    try {
        const machines = await Machine.find({ ownerId }); // Adjust your query as necessary
        res.json(machines);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching machines', error });
    }
};
