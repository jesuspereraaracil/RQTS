import { type RQTSEvent, type Topic } from './RQTSEvent'
import { v4 as uuidv4 } from 'uuid'
import { filter, ReplaySubject, type Subject, type Subscription } from 'rxjs'

export class RQTSTubeManager {
  private readonly tube: Subject<RQTSEvent<any>>
  private readonly subscriptions: Map<string, Subscription>

  constructor () {
    this.tube = new ReplaySubject<RQTSEvent<any>>(5, 5000)
    this.subscriptions = new Map<string, Subscription>()
  }

  public publish<T>(event: RQTSEvent<T>): void {
    this.tube.next(event)
  }

  public subscribeAll<T>(next: (event: RQTSEvent<T>) => void): string {
    const subscriptionId = uuidv4()
    const subscription = this.tube.subscribe({ next })
    this.subscriptions.set(subscriptionId, subscription)
    return subscriptionId
  }

  public subscribeTo<T>(topic: Topic, next: (event: RQTSEvent<T>) => void): string {
    const subscriptionId = uuidv4()
    const subscription = this.tube.pipe(filter(ev => ev.topic === topic)).subscribe({ next })
    this.subscriptions.set(subscriptionId, subscription)
    return subscriptionId
  }

  public unsubscribe (subscriptionId: string): boolean {
    const subscription = this.subscriptions.get(subscriptionId)
    subscription?.unsubscribe()
    return this.subscriptions.delete(subscriptionId)
  }
}
