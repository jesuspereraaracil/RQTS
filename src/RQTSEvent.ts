export type Topic = string

export type RQTSData<T> = T | Record<string, T>
export interface RQTSEvent<T> {
  topic: Topic
  data: RQTSData<T>
}

export const createRQTSEvent = <T>(topic: Topic, data: RQTSData<T>): RQTSEvent<T> => ({
  topic, data
})
