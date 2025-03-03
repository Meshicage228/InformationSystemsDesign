const Letter = require('../models/Letters');

exports.deleteLetter = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedLetter = await Letter.findByIdAndDelete(id);
        if (!deletedLetter) {
            return res.status(404).send('Письмо не найдено');
        }
        res.status(200).send('Письмо успешно удалено');
    } catch (error) {
        res.status(500).send(error);
    }
};