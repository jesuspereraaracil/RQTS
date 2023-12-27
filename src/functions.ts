import { createRQTSEvent, type RQTSData, type RQTSEvent, type Topic } from './RQTSEvent'
import { RQTSManager } from './RQTSManager'

const DEFAULT_TUBE = 'DEFAULT_TUBE'

export const emit = <T>(topic: Topic, data?: T): void => {
  const event = createRQTSEvent(topic, data)
  RQTSManager.getTubeByName(DEFAULT_TUBE).publish(event)
}

export const receive = <T>(topic: Topic, handler: (data: RQTSData<T> | undefined) => Promise<void>): string => {
  const onEvent = (event: RQTSEvent<T>): void => {
    void handler(event.data)
  }
  return RQTSManager.getTubeByName(DEFAULT_TUBE).subscribeTo<T>(topic, onEvent)
}

export const receiveAll = <T>(handler: (data: RQTSData<T> | undefined) => Promise<void>): string => {
  const onEvent = (event: RQTSEvent<T>): void => {
    void handler(event.data)
  }
  return RQTSManager.getTubeByName(DEFAULT_TUBE).subscribeAll<T>(onEvent)
}

export const unsubscribe = (subscription: string): void => {
  RQTSManager.getTubeByName(DEFAULT_TUBE).unsubscribe(subscription)
}
