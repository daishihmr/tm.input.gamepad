/*
 * gamepadconfigscene.js
 */

tm.game = tm.game || {};


(function() {

    tm.define("tm.game.GamepadConfigScene", {
        superClass: "tm.game.ManagerScene",
        init: function(param) {
            param = {}.$extend(DEFAULT_PARAM, param);

            var scenes = [];
            if (param.cursorKey) {
                scenes.push({
                    className: "tm.game.gamepad.CursorKeyConfigScene",
                    arguments: param
                });
            }
            if (param.stick1) {
                scenes.push({
                    className: "tm.game.gamepad.StickConfigScene",
                    arguments: [param, 0]
                });
            }
            if (param.stick2) {
                scenes.push({
                    className: "tm.game.gamepad.StickConfigScene",
                    arguments: [param, 1]
                });
            }
            scenes.push({
                className: "tm.game.gamepad.ButtonConfigScene",
                arguments: param
            });

            this.superInit({
                scenes: scenes
            });
        },
        onfinish: function() {
            this.app.popScene();
        }
    });

    tm.define("tm.game.gamepad._CommonScene", {
        superClass: "tm.app.Scene",
        init: function(param) {
            this.superInit();
            this.fromJSON({
                children: {
                    bg: {
                        type: "tm.display.RectangleShape",
                        init: {
                            width: param.width,
                            height: param.height,
                            fillStyle: "rgba(0, 0, 0, 0.9)",
                            strokeStyle: "transparent",
                        },
                        originX: 0,
                        originY: 0,
                    },
                    titleLabel: {
                        type: "tm.display.Label",
                        init: ["", param.fontSize],
                        x: param.width * 0.5,
                        y: param.fontSize * 2.0,
                    },
                    subtitleLabel: {
                        type: "tm.display.Label",
                        init: ["", param.fontSize * 0.8],
                        x: param.width * 0.5,
                        y: param.fontSize * 3.0,
                    },
                },
            });
        },
    });

    tm.define("tm.game.gamepad.CursorKeyConfigScene", {
        superClass: "tm.game.gamepad._CommonScene",
        init: function(param) {
            this.superInit(param);
            this.on("enter", function() {
                console.log("CursorKeyConfigScene")
            });

            CrossButtonShape({
                    width: param.width * 0.9,
                    height: param.height * 0.9,
                    fillStyle: "rgba(100, 100, 100, 0.5)",
                    strokeStyle: "rgba(200, 200, 200, 1.0)",
                    lineWidth: 2,
                })
                .setPosition(param.width * 0.5, param.height * 0.5)
                .addChildTo(this);

            this.startFlow();
        },

        startFlow: function() {
            var tasks = [];
            var next = function() {
                var task = tasks.shift();
                if (task) {
                    task.call(this);
                }
            }.bind(this);

            tasks.push(function() {
                this.titleLabel.text = "カーソルボタンの上を押して下さい";
                this.subtitleLabel.text = "press ↑ button";
            });

            tasks.push(function() {
                this.titleLabel.text = "カーソルボタンの下を押して下さい";
                this.subtitleLabel.text = "press ↓ button";
            });

            tasks.push(function() {
                this.titleLabel.text = "カーソルボタンの左を押して下さい";
                this.subtitleLabel.text = "press ← button";
            });

            tasks.push(function() {
                this.titleLabel.text = "カーソルボタンの右を押して下さい";
                this.subtitleLabel.text = "press → button";
            });

            next();
        },
    });

    tm.define("tm.game.gamepad.StickConfigScene", {
        superClass: "tm.game.gamepad._CommonScene",
        init: function(param, stickIndex) {
            this.superInit(param);
            this.on("enter", function() {
                console.log("StickConfigScene")
            });

            // スティックでマーカーを追う
        }
    });

    tm.define("tm.game.gamepad.ButtonConfigScene", {
        superClass: "tm.game.gamepad._CommonScene",
        init: function(param) {
            this.superInit(param);
            this.on("enter", function() {
                console.log("ButtonConfigScene")
            });

            // param.buttonNamesの内容を設定
        }
    });

    var DEFAULT_PARAM = {
        width: 640,
        height: 960,
        fontSize: 20,
        cursorKey: true,
        stick1: true,
        stick2: false,
        buttonNames: ["A", "B", "start"]
    };

    var CrossButtonShape = tm.createClass({
        superClass: tm.display.Shape,
        init: function(param) {
            this.superInit(param);
            this.render();
        },
        _render: function() {
            this._renderCrossButton();
            this._renderButtons();
            this._renderLeftStick();
            this._renderRightStick();
        },
        _renderCrossButton: function() {
            var c = this.canvas;
            c.lineJoin = "round";
            var size = this.width * 0.2;
            var cx = this.width * 0.5;
            var cy = this.height * 0.5;
            var bw = size * 0.3;
            var bh = size * 0.9;
            var s = size * 0.02;
            var ox = size * -1.2;
            var oy = 0;

            c.strokeCircle(cx + ox, cy + oy, size * 0.6);

            c.lines(
                cx - bw * 0.5 + 0 + ox, cy - bh * 0.5 + s + oy,
                cx - bw * 0.5 + s + ox, cy - bh * 0.5 + 0 + oy,

                cx + bw * 0.5 - s + ox, cy - bh * 0.5 + 0 + oy,
                cx + bw * 0.5 + 0 + ox, cy - bh * 0.5 + s + oy,

                cx + bw * 0.5 + 0 + ox, cy - bw * 0.5 - s + oy,
                cx + bw * 0.5 + s + ox, cy - bw * 0.5 + 0 + oy,

                cx + bh * 0.5 - s + ox, cy - bw * 0.5 + 0 + oy,
                cx + bh * 0.5 + 0 + ox, cy - bw * 0.5 + s + oy,

                cx + bh * 0.5 + 0 + ox, cy + bw * 0.5 - s + oy,
                cx + bh * 0.5 - s + ox, cy + bw * 0.5 + 0 + oy,

                cx + bw * 0.5 + s + ox, cy + bw * 0.5 + 0 + oy,
                cx + bw * 0.5 + 0 + ox, cy + bw * 0.5 + s + oy,

                cx + bw * 0.5 + 0 + ox, cy + bh * 0.5 - s + oy,
                cx + bw * 0.5 - s + ox, cy + bh * 0.5 + 0 + oy,

                cx - bw * 0.5 + s + ox, cy + bh * 0.5 + 0 + oy,
                cx - bw * 0.5 + 0 + ox, cy + bh * 0.5 - s + oy,

                cx - bw * 0.5 + 0 + ox, cy + bw * 0.5 + s + oy,
                cx - bw * 0.5 - s + ox, cy + bw * 0.5 + 0 + oy,

                cx - bh * 0.5 + s + ox, cy + bw * 0.5 + 0 + oy,
                cx - bh * 0.5 + 0 + ox, cy + bw * 0.5 - s + oy,

                cx - bh * 0.5 + 0 + ox, cy - bw * 0.5 + s + oy,
                cx - bh * 0.5 + s + ox, cy - bw * 0.5 + 0 + oy,

                cx - bw * 0.5 - s + ox, cy - bw * 0.5 + 0 + oy,
                cx - bw * 0.5 + 0 + ox, cy - bw * 0.5 - s + oy,

                cx - bw * 0.5 + 0 + ox, cy - bh * 0.5 + s + oy

            ).closePath().stroke();

            var tcx = cx + ox;
            var tcy = cy - bh * 0.34 + oy;
            var ts = size * 0.1;
            c.beginPath().triangle(tcx, tcy - ts, tcx - ts, tcy, tcx + ts, tcy).fill().stroke();

            tcx = cx - bh * 0.34 + ox;
            tcy = cy + oy;
            ts = size * 0.1;
            c.beginPath().triangle(tcx - ts, tcy, tcx, tcy - ts, tcx, tcy + ts).fill().stroke();

            tcx = cx + bh * 0.34 + ox;
            tcy = cy + oy;
            ts = size * 0.1;
            c.beginPath().triangle(tcx + ts, tcy, tcx, tcy - ts, tcx, tcy + ts).fill().stroke();

            tcx = cx + ox;
            tcy = cy + bh * 0.34 + oy;
            ts = size * 0.1;
            c.beginPath().triangle(tcx, tcy + ts, tcx - ts, tcy, tcx + ts, tcy).fill().stroke();
        },
        _renderButtons: function() {
            var c = this.canvas;
            c.lineJoin = "round";
            var size = this.width * 0.2;
            var cx = this.width * 0.5;
            var cy = this.height * 0.5;
            var bw = size * 0.3;
            var bh = size * 0.9;
            var s = size * 0.02;
            var ox = size * 1.2;
            var oy = 0;

            c.strokeCircle(cx + ox, cy + oy, size * 0.6);

            c.lines(
                cx - bw * 0.5 + 0 + ox, cy - bh * 0.5 + s + oy,
                cx - bw * 0.5 + s + ox, cy - bh * 0.5 + 0 + oy,

                cx + bw * 0.5 - s + ox, cy - bh * 0.5 + 0 + oy,
                cx + bw * 0.5 + 0 + ox, cy - bh * 0.5 + s + oy,

                cx + bw * 0.5 + 0 + ox, cy - bw * 0.5 - s + oy,
                cx + bw * 0.5 + s + ox, cy - bw * 0.5 + 0 + oy,

                cx + bh * 0.5 - s + ox, cy - bw * 0.5 + 0 + oy,
                cx + bh * 0.5 + 0 + ox, cy - bw * 0.5 + s + oy,

                cx + bh * 0.5 + 0 + ox, cy + bw * 0.5 - s + oy,
                cx + bh * 0.5 - s + ox, cy + bw * 0.5 + 0 + oy,

                cx + bw * 0.5 + s + ox, cy + bw * 0.5 + 0 + oy,
                cx + bw * 0.5 + 0 + ox, cy + bw * 0.5 + s + oy,

                cx + bw * 0.5 + 0 + ox, cy + bh * 0.5 - s + oy,
                cx + bw * 0.5 - s + ox, cy + bh * 0.5 + 0 + oy,

                cx - bw * 0.5 + s + ox, cy + bh * 0.5 + 0 + oy,
                cx - bw * 0.5 + 0 + ox, cy + bh * 0.5 - s + oy,

                cx - bw * 0.5 + 0 + ox, cy + bw * 0.5 + s + oy,
                cx - bw * 0.5 - s + ox, cy + bw * 0.5 + 0 + oy,

                cx - bh * 0.5 + s + ox, cy + bw * 0.5 + 0 + oy,
                cx - bh * 0.5 + 0 + ox, cy + bw * 0.5 - s + oy,

                cx - bh * 0.5 + 0 + ox, cy - bw * 0.5 + s + oy,
                cx - bh * 0.5 + s + ox, cy - bw * 0.5 + 0 + oy,

                cx - bw * 0.5 - s + ox, cy - bw * 0.5 + 0 + oy,
                cx - bw * 0.5 + 0 + ox, cy - bw * 0.5 - s + oy,

                cx - bw * 0.5 + 0 + ox, cy - bh * 0.5 + s + oy

            ).closePath().stroke();

            c.beginPath().circle(cx + ox, cy - bh * 0.34 + oy, bw * 0.4).fill().stroke();
            c.beginPath().circle(cx - bh * 0.34 + ox, cy + oy, bw * 0.4).fill().stroke();
            c.beginPath().circle(cx + bh * 0.34 + ox, cy + oy, bw * 0.4).fill().stroke();
            c.beginPath().circle(cx + ox, cy + bh * 0.34 + oy, bw * 0.4).fill().stroke();

            c.beginPath().roundRect(cx - size * (0.30 + 0.15), cy, size * 0.3, size * 0.15, 1).fill().stroke();
            c.beginPath().roundRect(cx + size * (0.30 - 0.15), cy, size * 0.3, size * 0.15, 1).fill().stroke();

            c.beginPath().circle(cx, cy - size * 0.4, size * 0.2).fill().stroke();
            
            c.beginPath().arc(cx - ox, cy, size, Math.PI * 1.3, Math.PI * 1.7, false).closePath().fill().stroke();
            c.beginPath().arc(cx - ox, cy - size * 0.2, size, Math.PI * 1.3, Math.PI * 1.7, false).closePath().fill().stroke();

            c.beginPath().arc(cx + ox, cy, size, Math.PI * 1.3, Math.PI * 1.7, false).closePath().fill().stroke();
            c.beginPath().arc(cx + ox, cy - size * 0.2, size, Math.PI * 1.3, Math.PI * 1.7, false).closePath().fill().stroke();
        },
        _renderLeftStick: function() {
            var c = this.canvas;
            c.lineJoin = "round";
            var size = this.width * 0.15;
            var cx = this.width * 0.5;
            var cy = this.height * 0.5;
            var bw = size * 0.3;
            var bh = size * 0.9;
            var s = size * 0.02;
            var ox = size * -0.6;
            var oy = size * 1.0;

            c.strokeCircle(cx + ox, cy + oy, size * 0.5);
            c.strokeCircle(cx + ox, cy + oy, size * 0.4);
            c.fillCircle(cx + ox, cy + oy, size * 0.4);
        },
        _renderRightStick: function() {
            var c = this.canvas;
            c.lineJoin = "round";
            var size = this.width * 0.15;
            var cx = this.width * 0.5;
            var cy = this.height * 0.5;
            var bw = size * 0.3;
            var bh = size * 0.9;
            var s = size * 0.02;
            var ox = size * 0.6;
            var oy = size * 1.0;

            c.strokeCircle(cx + ox, cy + oy, size * 0.5);
            c.strokeCircle(cx + ox, cy + oy, size * 0.4);
            c.fillCircle(cx + ox, cy + oy, size * 0.4);
        },
    });

})();
