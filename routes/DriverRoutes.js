const router = require('express').Router();
const Driver = require('../Models/DriverSchema');



router.get('/', async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.json(drivers);
    } catch (err) {
        res.json({ message: err });
    }
    // res.send('Driver Route /');
});

router.post('/send-request', async (req, res) => {
    const requestData = {
        ambNumber: req.body.ambNumber,
        hospitalID: req.body.hospitalID,
        description:   req.body.description
    };
    try {
        const request = await Request.create(requestData);

        
        res.status(200).send({ status: 'ok' });
        // res.status(2).json({ 'status': 'ok' });
    }
    catch (e) {
        res.send({ status: 'error', error: e });
    }
})

router.post('/signup', async (req, res) => {
    const driverData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        username: req.body.username,
        ambNumber: req.body.ambNumber
    };
    try {
        // await driverData.save();
        await Driver.create(driverData);
        res.send({ status: 'ok' });
    }
    catch (e) {
        res.send({ status: 'error', error: e });
    }
})
module.exports = router;