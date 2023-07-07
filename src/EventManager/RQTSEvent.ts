export type Topic = string;

export interface Data {
	id: string;
	[key: string]: unknown;
}

export type RQTSEvent = {
	topic: Topic;
	data?: Data;
};

