"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RQTSTubeManager = void 0;
var uuid_1 = require("uuid");
var rxjs_1 = require("rxjs");
var RQTSTubeManager = /** @class */ (function () {
    function RQTSTubeManager() {
        this.tube = new rxjs_1.ReplaySubject(5, 5000);
        this.subscriptions = new Map();
    }
    RQTSTubeManager.prototype.publish = function (event) {
        this.tube.next(event);
    };
    RQTSTubeManager.prototype.subscribeAll = function (next) {
        var subscriptionId = (0, uuid_1.v4)();
        var subscription = this.tube.subscribe({ next: next });
        this.subscriptions.set(subscriptionId, subscription);
        return subscriptionId;
    };
    RQTSTubeManager.prototype.subscribeTo = function (topic, next) {
        var subscriptionId = (0, uuid_1.v4)();
        var subscription = this.tube.pipe((0, rxjs_1.filter)(function (ev) { return ev.topic === topic; })).subscribe({ next: next });
        this.subscriptions.set(subscriptionId, subscription);
        return subscriptionId;
    };
    RQTSTubeManager.prototype.unsubscribe = function (subscriptionId) {
        var subscription = this.subscriptions.get(subscriptionId);
        subscription === null || subscription === void 0 ? void 0 : subscription.unsubscribe();
        this.subscriptions.delete(subscriptionId);
    };
    return RQTSTubeManager;
}());
exports.RQTSTubeManager = RQTSTubeManager;
