const Letter = require('../models/Letters');

exports.getLetters = async (req, res) => {
    const { date } = req.query;

    try {
        const startDate = new Date(date);
        startDate.setUTCHours(0, 0, 0, 0);

        const endDate = new Date(date);
        endDate.setUTCHours(23, 59, 59, 999);

        const letters = await Letter.find({
            date: { 
                $gte: startDate,
                $lte: endDate 
            }
        });

        res.status(200).json(letters);
    } catch (error) {
        res.status(500).send(error);
    }
};