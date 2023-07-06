import { type RQTSEvent, type Topic } from './RQTSEvent';
export declare class RQTSEventManager {
    static getInstance(): RQTSEventManager;
    private static instance;
    private readonly tube;
    private readonly subscriptions;
    private constructor();
    publish(event: RQTSEvent): void;
    subscribeAll(next: (event: RQTSEvent) => void): string;
    subscribeTo(topic: Topic, next: (event: RQTSEvent) => void): string;
    unsubscribe(subscriptionId: string): void;
}
//# sourceMappingURL=RQTSEventManager.d.ts.map