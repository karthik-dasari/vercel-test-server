const router = require('express').Router();
const Driver = require('../Models/DriverSchema');
const Hospital = require('../Models/HospitalSchema');
const Request = require('../Models/RequestSchema');

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    if (lat2 === null || lon2 === null) {
        return -1;
    }
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
}
// query params: lat, lon

router.get('/', async (req, res) => {
    const ilat = req.query.lat, ilon = req.query.lon;
    console.log(`coord ${ilat}, ${ilon}`);
    console.log(`body  ${req.query}`);
    try {
        const hospitals = await Hospital.find();
        console.log("gyfeui");
        // sort hospitals based on distance between coordinates
        let distanceArray = [];
        hospitals.map((hospital) => {
            console.log(hospital.lat);
            distanceArray.push({
                hospital: hospital._id,
                name: hospital.name,
                distance: Math.round(getDistanceFromLatLonInKm(ilat, ilon, hospital.lat, hospital.lon))
            });
        });
        distanceArray.sort((a, b) => {
            return a.distance - b.distance
        });

        console.log(distanceArray);
        res.json(distanceArray);
    } catch (err) {
        res.json({ message: err });
    }
});

router.put('/update-request', async (req, res) => {
    const ambNumber = req.query.ambNumber;
    const stat = req.query.stat;
    // console.log(ambNumber);
    try {
        const request = await Request.find().where('ambNumber').equals(ambNumber);
        request[0].status[0] = stat;
        // console.log(request[0].status);
        console.log(request);
        const savedRequest = await request[0].save();
        res.json(savedRequest);
    } catch (err) {
        res.json({ message: err });
    }
})
// router.post('/', async (req, res) => {
//     const ilat = req.body.lat, ilon = req.body.lon;
//     console.log(`coord ${ilat}, ${ilon}`);
//     console.log(`body  ${req.body}`);
//     try {
//         const hospitals = await Hospital.find();
//         // sort hospitals based on distance between coordinates
//         let distanceArray = [];
//         hospitals.map((hospital) => {
//             console.log(hospital.lat);
//             distanceArray.push({
//                 name: hospital.name,
//                 distance: getDistanceFromLatLonInKm(ilat, ilon, hospital.lat, hospital.lon)
//             });
//         });
//         distanceArray.sort((a, b) => {
//             return a.distance - b.distance
//         });

//         console.log(distanceArray);
//         res.json(distanceArray);
//     } catch (err) {
//         res.json({ message: err });
//     }
// });

// router.get('/hospitals', async (req, res) => {
//     try {
//         const hospitals = await Hospital.find();
//         res.json(hospitals);
//     } catch (err) {
//         res.json({ message: err });
//     }
// });

router.get('/requests', async (req, res) => {
    try {
        const requests = await Request.find();
        res.json(requests);
    } catch (err) {
        res.json({ message: err });
    }
})

// router.post('/send-reply', async(req, res) => {

// })

router.post('/signup', async (req, res) => {
    const hospitalData = {
        name: req.body.name,
        lat: req.body.lat,
        lon: req.body.lon,
        address: req.body.address,
    };
    try {
        await Hospital.create(hospitalData);
        res.send({ status: 'ok' });
    }
    catch (e) {
        res.send({ status: 'error', error: e });
    }
})

module.exports = router;