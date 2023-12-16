import {createRQTSEvent, RQTSEvent, type Topic} from './RQTSEvent'
import { RQTSManager } from '../lib'

const DEFAULT_TUBE = 'DEFAULT_TUBE'

export const emit = <T>(topic: Topic, data?: T): void => {
  const event = createRQTSEvent(topic, data)
  RQTSManager.getTubeByName(DEFAULT_TUBE).publish(event)
}

export const receive = <T>(topic: Topic, handler: (data: T | undefined) => void): void => {
  const onEvent = (event: RQTSEvent<T>): void => {
    handler(event.data)
  }
  RQTSManager.getTubeByName(DEFAULT_TUBE).subscribeTo<T>(topic, onEvent)
}
