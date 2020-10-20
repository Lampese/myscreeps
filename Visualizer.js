"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TEXT_COLOR = '#c9c9c9';
var TEXT_SIZE = .8;
var CHAR_WIDTH = TEXT_SIZE * 0.4;
var CHAR_HEIGHT = TEXT_SIZE * 0.9;
var Visualizer = (function () {
    function Visualizer() {
    }
    Visualizer.textStyle = function (size, style) {
        if (size === void 0) { size = 1; }
        if (style === void 0) { style = {}; }
        return _.defaults(style, {
            color: TEXT_COLOR,
            align: 'left',
            font: size * TEXT_SIZE + " Trebuchet MS",
            opacity: 0.8,
        });
    };
    Visualizer.text = function (text, pos, size, style) {
        if (size === void 0) { size = 1; }
        if (style === void 0) { style = {}; }
        new RoomVisual(pos.roomName).text(text, pos.x, pos.y, this.textStyle(size, style));
    };
    Visualizer.barGraph = function (progress, pos, width, scale) {
        if (width === void 0) { width = 7; }
        if (scale === void 0) { scale = 1; }
        var vis = new RoomVisual(pos.roomName);
        var percent;
        var mode;
        if (typeof progress === 'number') {
            percent = progress;
            mode = 'percent';
        }
        else {
            percent = progress[0] / progress[1];
            mode = 'fraction';
        }
        this.box(vis, pos.x, pos.y - CHAR_HEIGHT * scale, width, 1.1 * scale * CHAR_HEIGHT, { color: TEXT_COLOR });
        vis.rect(pos.x, pos.y - CHAR_HEIGHT * scale, percent * width, 1.1 * scale * CHAR_HEIGHT, {
            fill: TEXT_COLOR,
            opacity: 0.4,
            strokeWidth: 0
        });
        if (mode == 'percent') {
            vis.text(Math.round(100 * percent) + "%", pos.x + width / 2, pos.y - .1 * CHAR_HEIGHT, this.textStyle(1, { align: 'center' }));
        }
        else {
            var _a = progress, num = _a[0], den = _a[1];
            vis.text(num + "/" + den, pos.x + width / 2, pos.y - .1 * CHAR_HEIGHT, this.textStyle(1, { align: 'center' }));
        }
    };
    Visualizer.drawGraphs = function () {
        this.text("CPU", { x: 1, y: 2 });
        this.barGraph((Game.cpu.getUsed() / Game.cpu.limit), { x: 4.5, y: 2 });
        this.text("BKT", { x: 1, y: 3 });
        this.barGraph((Game.cpu.bucket / 10000), { x: 4.5, y: 3 });
        this.text("GCL", { x: 1, y: 4 });
        this.barGraph((Game.gcl.progress / Game.gcl.progressTotal), { x: 4.5, y: 4 });
        this.text("\u7B49\u7EA7:" + Game.gcl.level, { x: 13, y: 4 });
        this.text("GPL", { x: 1, y: 5 });
        this.barGraph((Game.gpl.progress / Game.gpl.progressTotal), { x: 4.5, y: 5 });
        this.text("\u7B49\u7EA7:" + Game.gpl.level, { x: 13, y: 5 });
        var i = 0;
        for (var room in Game.rooms) {
            try {
                if (Game.rooms[room].controller.my) {
                    i++;
                    var rclProgress = Game.rooms[room].controller.progress;
                    var rclProgressTotal = Game.rooms[room].controller.progressTotal;
                    var level = Game.rooms[room].controller.level;
                    if (Game.rooms[room].controller.level != 8) {
                        this.text(Game.rooms[room].name + ":", { x: 1, y: (i + 5) });
                        this.barGraph((rclProgress / rclProgressTotal), { x: 4.5, y: (i + 5) });
                        this.text("\u7B49\u7EA7:" + level, { x: 13, y: (i + 5) });
                        this.text("" + (Game.rooms[room].controller.progressTotal - Game.rooms[room].controller.progress), { x: Game.rooms[room].controller.pos.x + 1, y: Game.rooms[room].controller.pos.y, roomName: room });
                    }
                    else {
                        this.text(Game.rooms[room].name + ":", { x: 1, y: (i + 5) });
                        this.barGraph(1, { x: 4.5, y: (i + 5) });
                        this.text("\u7B49\u7EA7:" + level, { x: 13, y: (i + 5) });
                    }
                }
                else if (Game.rooms[room].controller.reservation.username == 'EricGuo') {
                    i++;
                    var reservationProgress = Game.rooms[room].controller.reservation.ticksToEnd;
                    var reservationTotal = 5000;
                    this.text(Game.rooms[room].name + ":", { x: 1, y: (i + 5) });
                    this.barGraph([reservationProgress, reservationTotal], { x: 4.5, y: (i + 5) });
                }
            }
            catch (error) {
            }
        }
    };
    Visualizer.summary = function () {
        this.text("\u6709\u89C6\u91CE\u623F\u95F4\u6570\u91CF: " + _.keys(Game.rooms).length + " | \u5171\u6709: " + _.keys(Game.creeps).length + "\u4E2ACreep", {
            x: 1,
            y: 1
        }, .93);
    };
    Visualizer.box = function (vis, x, y, w, h, style) {
        return vis.line(x, y, x + w, y, style)
            .line(x + w, y, x + w, y + h, style)
            .line(x + w, y + h, x, y + h, style)
            .line(x, y + h, x, y, style);
    };
    ;
    Visualizer.visuals = function () {
        this.drawGraphs();
        this.summary();
    };
    return Visualizer;
}());
exports.Visualizer = Visualizer;
