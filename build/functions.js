"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receive = exports.emit = void 0;
var RQTSEvent_1 = require("./RQTSEvent");
var lib_1 = require("../lib");
var DEFAULT_TUBE = 'DEFAULT_TUBE';
var emit = function (topic, data) {
    var event = (0, RQTSEvent_1.createRQTSEvent)(topic, data);
    lib_1.RQTSManager.getTubeByName(DEFAULT_TUBE).publish(event);
};
exports.emit = emit;
var receive = function (topic, handler) {
    var onEvent = function (event) {
        handler(event.data);
    };
    lib_1.RQTSManager.getTubeByName(DEFAULT_TUBE).subscribeTo(topic, onEvent);
};
exports.receive = receive;
