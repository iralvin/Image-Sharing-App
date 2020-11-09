const pageNotFound = (req, res) => res.status(404).send({ message: 'Requested resource not found' });

module.exports = pageNotFound;
