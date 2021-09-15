import { parentPort, isMainThread } from 'worker_threads';
import { EventService } from './index.js';



if (!isMainThread) {
    parentPort.on('message', () => {
        eventStream();
    });
}

const eventStream = () => {
    const event = Date.now();
    EventService.getInstance().emitEvent('asd');
    console.log(EventService.getInstance().text);
    setTimeout(() => eventStream(), 1000);
};
