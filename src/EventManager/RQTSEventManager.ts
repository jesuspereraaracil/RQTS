import { filter, ReplaySubject, type Subject, type Subscription } from 'rxjs'
import { type RQTSEvent, type Topic } from './RQTSEvent'
import { v4 as uuidv4 } from 'uuid'

export class RQTSTubeManager {
  private static instance: RQTSTubeManager
  private readonly tubes: Map<string, RQTSEventManager>

  private constructor () {
    this.tubes = new Map<string, RQTSEventManager>()
  }

  public static getInstance (): RQTSTubeManager {
    if (RQTSTubeManager.instance === undefined) {
      RQTSTubeManager.instance = new RQTSTubeManager()
    }

    return RQTSTubeManager.instance
  }

  public getTube (tubeName: string): RQTSEventManager {
    let tube = this.tubes.get(tubeName)
    if (tube == null) {
      tube = new RQTSEventManager()
      this.tubes.set(tubeName, tube)
    }

    return tube
  }

  public deleteTube (tubeName: string): void {
    this.tubes.delete(tubeName)
  }
}

class RQTSEventManager {
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

  public unsubscribe (subscriptionId: string): void {
    const subscription = this.subscriptions.get(subscriptionId)
    subscription?.unsubscribe()
    this.subscriptions.delete(subscriptionId)
  }
}
