import express from 'express';
import { Worker } from 'worker_threads';
import { EventRoute as eventRoute } from './routes/index.js';
import { EventService } from './services/index.js';

const app = express();
const port = process.env.PORT || 8000;
// const worker = new Worker('./src/services/EventWorker.js');
const eventService = EventService.getInstance();

// worker.on('error', (err) => console.error(err));
// worker.postMessage({});

app.use('/api', eventRoute);
app.listen(port, () => console.log(`SSE server started on port: ${port}`));
