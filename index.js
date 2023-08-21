import express from "express";

// use the SQL methods in the API routes below
import {joinQueue, leaveQueue, joinTaxiQueue, taxiDepart, queueLength, taxiQueueLength} from './taxi.sql.js';
 
const app = express();

app.use(express.static('public'))

// add middleware to make post routes work
app.use(express.json());

const PORT = process.env.PORT || 4015;

// passenger joins the queue
app.post('/api/passenger/join', async (req, res) => {
    const pass= await joinQueue();

    res.json({
        pass: pass,
        message : 'Passenger joined queue'
    })
})

// passenger leaves the queue
app.post('/api/passenger/leave', async (req, res) => {
    const passLeave = await leaveQueue()
    res.json({
        passLeave: passLeave,
        message : 'Passenger left queue'
    })
});

app.post('/api/taxi/join', async (req, res) => {
   const taxi = await joinTaxiQueue();

    res.json({
        taxi: taxi,
        message : 'Taxi joined queue'
    })
});

// Note there needs to be at least 12 people in the queue for the taxi to depart
app.post('/api/taxi/depart', async (req, res) => {

   const departed = await taxiDepart();

    res.json({
        departed: departed,
        message : 'taxi departed from queue'
    })
});


// return the number of people in the queue
app.get('/api/passenger/queue', async (req, res) => {
    const passTotal = await queueLength();

    res.json({
        queueCount : `${passTotal}`
    })
});

// return the number of taxis in the queue
app.get('/api/taxi/queue', async (req, res) => {
    await taxiQueueLength()
    res.json({
        queueCount : `${taxiTotal}`
    })
});

app.listen(PORT, () => console.log(`Taxi App started on port: ${PORT}`))