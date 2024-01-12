import { type RQTSEvent, type Topic } from './RQTSEvent'
import { v4 } from 'uuid'
import { filter, first, Subject, type Subscription } from 'rxjs'

export class RQTSTubeManager {
  private readonly tube: Subject<RQTSEvent<any>>
  private readonly subscriptions: Map<string, Subscription>

  constructor () {
    this.tube = new Subject<RQTSEvent<any>>()
    this.subscriptions = new Map<string, Subscription>()
  }

  public publish<T>(event: RQTSEvent<T>): void {
    this.tube.next(event)
  }

  public subscribeAll<T>(next: (event: RQTSEvent<T>) => void): string {
    const subscriptionId = v4()
    const subscription = this.tube.subscribe({ next })
    this.subscriptions.set(subscriptionId, subscription)
    return subscriptionId
  }

  public subscribeTo<T>(topic: Topic, next: (event: RQTSEvent<T>) => void): string {
    const subscriptionId = v4()
    const subscription = this.tube.pipe(filter(ev => ev.topic === topic)).subscribe({ next })
    this.subscriptions.set(subscriptionId, subscription)
    return subscriptionId
  }

  public subscribeFirst<T>(topic: Topic, next: (event: RQTSEvent<T>) => void): string {
    const subscriptionId = v4()
    const subscription = this.tube.pipe(
      filter(ev => ev.topic === topic),
      first())
      .subscribe({
        next: (evt: RQTSEvent<T>) => {
          next(evt)
          this.unsubscribe(subscriptionId)
        }
      })
    this.subscriptions.set(subscriptionId, subscription)
    return subscriptionId
  }

  public unsubscribe (subscriptionId: string): boolean {
    const subscription = this.subscriptions.get(subscriptionId)
    subscription?.unsubscribe()
    return this.subscriptions.delete(subscriptionId)
  }
}
