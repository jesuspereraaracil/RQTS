import {filter, ReplaySubject, type Subject, type Subscription} from 'rxjs';
import {type RQTSEvent, type Topic} from './RQTSEvent';
import {v4 as uuidv4} from 'uuid';

export class RQTSEventManager {
	public static getInstance(): RQTSEventManager{
		if (!RQTSEventManager.instance) {
			RQTSEventManager.instance = new RQTSEventManager();
		}

		return RQTSEventManager.instance;
	}

	private static instance: RQTSEventManager;

	private readonly tube: Subject<RQTSEvent>;
	private readonly subscriptions: Map<string, Subscription>;

	private constructor() {
		this.tube = new ReplaySubject<RQTSEvent>(5, 5000);
		this.subscriptions = new Map<string, Subscription>();
	}

	public publish(event: RQTSEvent): void {
		this.tube.next(event);
	}

	public subscribeAll(next: (event: RQTSEvent) => void) {
		const subscriptionId = uuidv4();
		const subscription = this.tube.subscribe({next});
		this.subscriptions.set(subscriptionId, subscription);
		return subscriptionId;
	}

	public subscribeTo(topic: Topic, next: (event: RQTSEvent) => void) {
		const subscriptionId = uuidv4();
		const subscription = this.tube.pipe(
			filter(ev => ev.topic === topic),
		).subscribe({next});
		this.subscriptions.set(subscriptionId, subscription);
		return subscriptionId;
	}

	public unsubscribe(subscriptionId: string) {
		const subscription = this.subscriptions.get(subscriptionId);
		subscription?.unsubscribe();
		this.subscriptions.delete(subscriptionId);
	}
}
