import events from 'events';

class EventService {
    constructor() {
        this.eventEmitter = new events.EventEmitter();
        this.listeners = {};
        this.eventStreamStarted = false;
    }

    addListener = (listener) => {
        if (!this.eventStreamStarted) {
            console.log('asdad');
            this.eventStreamStarted = true;
            this.eventStream();
        }
        this.eventEmitter.addListener('data', listener.action);
        this.listeners = {
            ...this.listeners,
            [listener.id]: listener.action,
        };
    };

    removeListener = (listener) => {
        this.eventEmitter.removeListener('data', listener.action);
        delete this.listeners[listener.id];
        if (Object.keys(this.listeners).length === 0) {
            this.eventStreamStarted = false;
        }
    };

    emitEvent = (event) => {
        this.eventEmitter.emit('data', event);
    }

    getListeners = () => this.eventEmitter.listeners('data');

    eventStream = () => {
        if (this.eventStreamStarted) {
            const event = Date.now();
            this.emitEvent(event);
            console.log('stream running', event);
            setTimeout(() => this.eventStream(), 1000);
        }
    };
}

class EventServiceSingleton {
    constructor() {
        throw new Error('illegal use of singleton class. use getInstance.');
    }

    static getInstance() {
        if (!EventServiceSingleton.instance) {
            EventServiceSingleton.instance = new EventService();
        }
        return EventServiceSingleton.instance;
    }
}

export default EventServiceSingleton;
