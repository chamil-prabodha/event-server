import express from 'express';
import { v4 as uuid} from 'uuid';
import { EventService } from '../services/index.js';

const router = express.Router();
const eventService = EventService.getInstance();

router.get('/events', (req, res) => {
    const id = uuid();
    console.log(`new request received for events. client id ${id}`);

    
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
    };
    res.writeHead(200, headers);

    const listener = {id, action: (data) => res.write(`data: ${data}\n\n`)};
    eventService.addListener(listener);

    req.on('close', () => {
        console.log('closed', id);
        eventService.removeListener(listener);
    });
});

export default router;
