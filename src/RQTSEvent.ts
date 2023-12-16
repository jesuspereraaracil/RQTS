export type Topic = string

export interface RQTSEvent<T> {
  topic: Topic
  data?: T
}

export const createRQTSEvent = <T>(topic: Topic, data?: T): RQTSEvent<T> => ({
  topic, data
})
