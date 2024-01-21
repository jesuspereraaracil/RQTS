# RQTS
Rx Queue in TypeScript

## Usage

```typescript
import { emit, receive } from '@jpereraaracil/rqts';

const TOPIC = 'MY_TOPIC'

receive(TOPIC, (event) => console.log(event) )

emit(TOPIC, { data: 1 });
```
