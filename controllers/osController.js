const os = require('os');

<<<<<<< HEAD
module.exports.esmfonction = async (req, res) => {
=======
module.exports.esmfonction = async (req,res) => {
>>>>>>> 0c4e130 (test)
    try {
        //..
        res.status(200).json({});
    } catch (error) {
<<<<<<< HEAD
        res.status(500).json({ message: error.message });
    }
}

module.exports.getOsInformation = async (req, res) => {
    try {
        //..
        const getOsInformation = {
            hostname: os.hostname(),
            type: os.type(),
            platform: os.platform(),
        }
        res.status(200).json({ getOsInformation });
    } catch (error) {
        res.status(500).json({ message: error.message });
=======
        res.status(500).json({message: error.message});
    }
}

module.exports.getOsInformation = async (req,res) => {
    try {
        //..
        const user = req.session.user;
        const getOsInformation = {
            hostname : os.hostname(),
            type : os.type(),
            platform : os.platform(),
        }
        res.status(200).json({getOsInformation});
    } catch (error) {
        res.status(500).json({message: error.message});
>>>>>>> 0c4e130 (test)
    }
}