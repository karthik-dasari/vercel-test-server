const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const AmbulanceLocation = require('./Models/AmbulanceLocation');
const Hospital = require('./Models/HospitalSchema');
const PORT = process.env || 5000;

app.use(cors());
app.use(express.json());

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://user:user123@cluster1.gle5k.mongodb.net/smart_siren', () => console.log('connected to DB'));

const driverRoutes = require('./routes/DriverRoutes');
const hospitalRoutes = require('./routes/HospitalRoutes');
app.use('/drivers', driverRoutes);
app.use('/hospitals', hospitalRoutes);

app.get('/', async(req, res) => {
    res.send('hello')
})

const io = require('socket.io')(server, { cors: { origin: "*" } });
io.on('connection', (socket) => {
    console.log('user connected');

    let uniqId = '';
    socket.on('send-id', (data) => {
        sid = data;
    });

    socket.on('send-coords', (data) => {
        const parsedData = JSON.parse(data);
        uniqId = parsedData.id;
        // let galat, galon;

        // know whether to update or create
        // AmbulanceLocation.findOne({ sid: uniqId }, (err, doc) => {
        //     // if (err) {
        //     //     console.log(err);
        //     // }
        //     if (doc == null) {
        //         console.log('doc created' + uniqId);
        //         AmbulanceLocation.create({
        //             sid: uniqId,
        //             lat: parsedData.lat,
        //             lon: parsedData.lon
        //         });
        //         galat = parsedData.lat;
        //         galon = parsedData.lon;
        //         const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
        //             if (lat2 === null || lon2 === null) {
        //                 return -1;
        //             }
        //             var R = 6371;
        //             var dLat = deg2rad(lat2 - lat1);
        //             var dLon = deg2rad(lon2 - lon1);
        //             var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        //             var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        //             var d = R * c;
        //             return d;
        //         }
        //         const deg2rad = (deg) => {
        //             return deg * (Math.PI / 180);
        //         }

        //         Hospital.find({}, (err, docs) => {
        //             if (err) {
        //                 console.log(err);
        //             }
        //             docs.forEach((doc) => {
        //                 let distance = getDistanceFromLatLonInKm(parsedData.lat, parsedData.lon, doc.lat, doc.lon);
        //                 // find minimum distance hospital sid

        //             });
        //         })
        //     } else {
        //         console.log('emitting data to display board');
        //         alat = doc.lat;
        //         alon = doc.lon;
        //         moredata = {
        //             data: data,
        //             hospitalid: doc._id,
        //         }
        //         socket.to(sid).emit('reply', data);
        //     }
        // });
        socket.to(sid).emit('reply', data);
    });

    socket.on('disconnect', () => {
        socket.to(sid).emit('disconnect-client', uniqId);
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
