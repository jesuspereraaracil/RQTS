# RQTS
Rx Queue in TypeScript

## Usage

```typescript
import { RQTSTubeManager } from '@jpereraaracil/rqts';

const TUBE_NAME = 'logger';
const EVENT_INFO = 'info';
const EVENT_ERROR = 'error';

// Create a tube for logging events
const logger = RQTSTubeManager.getInstance().getTube(TUBE_NAME);

// Create an event and publish it to the logger tube
const event = createRQTSEvent(EVENT_INFO, { message: 'Log pushed to the logging tube' });
logger.publish(event);

// Subscribe to all topics
logger.subscribeAll((event) => console.log('Event received:', event));

// Only subscribe to some topics
logger.subscribeTo(EVENT_ERROR, (event) => console.log('ERROR:', event));
``
