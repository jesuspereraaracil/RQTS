export type Topic = string;

export type RQTSEvent<T> = {
	topic: Topic; data?: T;
};

export const createRQTSEvent = <T extends Record<string, unknown>>(topic: Topic, data?: T): RQTSEvent<T> => ({
	topic, data,
});
