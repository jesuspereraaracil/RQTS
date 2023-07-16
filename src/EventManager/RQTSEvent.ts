import {v4 as uuidv4} from 'uuid';

export type Topic = string;

export type Data = object & { id: string }

export type RQTSEvent = {
    topic: Topic;
    data?: Data;
};

export const createRQTSEvent = <T extends object>(topic: Topic, data?: T): RQTSEvent => {
    return {
        topic,
        data: data
            ? 'id' in data
                ? data as Data
                : {...data, id: uuidv4()}
            : data,
    };
}
