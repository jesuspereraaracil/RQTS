"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RQTSManager = void 0;
var RQTSTubeManager_1 = require("./RQTSTubeManager");
var RQTSManager = /** @class */ (function () {
    function RQTSManager() {
        this.tubes = new Map();
    }
    RQTSManager.getInstance = function () {
        if (RQTSManager.instance === undefined) {
            RQTSManager.instance = new RQTSManager();
        }
        return RQTSManager.instance;
    };
    RQTSManager.prototype.getTube = function (tubeName) {
        var tube = this.tubes.get(tubeName);
        if (tube == null) {
            tube = new RQTSTubeManager_1.RQTSTubeManager();
            this.tubes.set(tubeName, tube);
        }
        return tube;
    };
    RQTSManager.getTubeByName = function (tubeName) {
        return RQTSManager.getInstance().getTube(tubeName);
    };
    RQTSManager.prototype.deleteTube = function (tubeName) {
        this.tubes.delete(tubeName);
    };
    return RQTSManager;
}());
exports.RQTSManager = RQTSManager;
