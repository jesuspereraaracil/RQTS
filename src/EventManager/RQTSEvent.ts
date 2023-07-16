export type Topic = string;

export type Data = Record<string, unknown> & { id: string }

export type RQTSEvent = {
    topic: Topic;
    data?: Data;
};

export const createRQTSEvent = <T>(topic: Topic, data?: Data): RQTSEvent => ({
    topic,
    data,
});
