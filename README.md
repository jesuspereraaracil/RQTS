# RQTS
Rx Queue in TypeScript

## Usage

```typescript
import { emit, receive } from '@jpereraaracil/rqts';

receive('MY_TOPIC', { data: 1 })

emit('MY_TOPIC', (event) => console.log(event));
```
