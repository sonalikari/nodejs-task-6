const AccessToken = require('../models/access_token');
const User = require('../models/User'); 

exports.validateAccessToken = async (req, res, next) => {
    try {
        const accessToken = req.headers['access_token'];
        if (!accessToken) {
            return res.status(400).json({ error: 'Access token is required' });
        }
        const token = await AccessToken.findOne({ where: { access_token: accessToken }, include: [User] });

        if (!token || token.expiry < Date.now() || !token.User) {
            return res.status(400).json({ error: 'Invalid access token or token expired' });
        }
        req.user = token.User; 
        next();
    } catch (error) {
        console.error('Error validating access token:', error);
        res.status(500).json({ error: 'Error validating access token' });
    }
};
