export type Topic = string;

export type Data = {
	[key: string]: unknown;
	id: string;
};

export type RQTSEvent = {
	topic: Topic;
	data?: Data;
};

export const createRQTSEvent = (topic: Topic, data?: Data): RQTSEvent => ({
	topic,
	data,
});
