import { createRQTSEvent, type RQTSEvent, type Topic } from './RQTSEvent'
import { RQTSTubeManager } from './RQTSTubeManager'

export const emit = <T>(topic: Topic, data: T): void => {
  const event = createRQTSEvent(topic, data)
  RQTSTubeManager.getInstance().publish(event)
}

export const receive = <T>(topic: Topic, handler: (data: T) => Promise<void>): string => {
  const onEvent = (event: RQTSEvent<T>): void => {
    void handler(event.data)
  }
  return RQTSTubeManager.getInstance().subscribeTo<T>(topic, onEvent)
}

export const receiveFirst = <T>(topic: Topic, handler: (data: T) => Promise<void>): string => {
  const onEvent = (event: RQTSEvent<T>): void => {
    void handler(event.data)
  }
  return RQTSTubeManager.getInstance().subscribeFirst<T>(topic, onEvent)
}

export const receiveAll = <T>(handler: (data: T) => Promise<void>): string => {
  const onEvent = (event: RQTSEvent<T>): void => {
    void handler(event.data)
  }
  return RQTSTubeManager.getInstance().subscribeAll<T>(onEvent)
}

export const unsubscribe = (subscription: string): void => {
  RQTSTubeManager.getInstance().unsubscribe(subscription)
}
