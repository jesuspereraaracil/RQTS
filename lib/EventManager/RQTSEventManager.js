"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RQTSEventManager = void 0;
var rxjs_1 = require("rxjs");
var uuid_1 = require("uuid");
var RQTSEventManager = /** @class */ (function () {
    function RQTSEventManager() {
        this.tube = new rxjs_1.ReplaySubject(5, 5000);
        this.subscriptions = new Map();
    }
    RQTSEventManager.getInstance = function () {
        if (!RQTSEventManager.instance) {
            RQTSEventManager.instance = new RQTSEventManager();
        }
        return RQTSEventManager.instance;
    };
    RQTSEventManager.prototype.publish = function (event) {
        this.tube.next(event);
    };
    RQTSEventManager.prototype.subscribeAll = function (next) {
        var subscriptionId = (0, uuid_1.v4)();
        var subscription = this.tube.subscribe({ next: next });
        this.subscriptions.set(subscriptionId, subscription);
        return subscriptionId;
    };
    RQTSEventManager.prototype.subscribeTo = function (topic, next) {
        var subscriptionId = (0, uuid_1.v4)();
        var subscription = this.tube.pipe((0, rxjs_1.filter)(function (ev) { return ev.topic === topic; })).subscribe({ next: next });
        this.subscriptions.set(subscriptionId, subscription);
        return subscriptionId;
    };
    RQTSEventManager.prototype.unsubscribe = function (subscriptionId) {
        var subscription = this.subscriptions.get(subscriptionId);
        subscription === null || subscription === void 0 ? void 0 : subscription.unsubscribe();
        this.subscriptions.delete(subscriptionId);
    };
    return RQTSEventManager;
}());
exports.RQTSEventManager = RQTSEventManager;
