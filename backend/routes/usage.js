const Device = require("../model/device");
const Usage = require("../model/usage");
const User = require("../model/user");
const router = express.Router();
const { checkForAuthenticationHeader } = require("../middlewares/auth"); 

router.get('/:deviceId/all', checkForAuthenticationHeader(),async (req, res) => {
    try {
        // Fetch all devices from the database
        const deviceId = req.params.deviceId;
        const devices = await Usage.find({deviceId : deviceId});
        
        // Send the devices as a response
        res.status(200).json({
            success: true,
            data: devices,
        });
    } catch (error) {
        console.error('Error fetching devices:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error fetching devices',
            error: error.message,
        });
    }
});