export type Topic = string;

export type RQTSEvent = {
	topic: Topic;
	data?: unknown;
};

