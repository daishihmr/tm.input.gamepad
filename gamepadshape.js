(function() {

    tm.define("tm.input.GamepadShape", {
        superClass: "tm.display.Shape",
        init: function(param) {
            this.isActive = {
                "a": false,
                "b": false,
                "x": false,
                "y": false,
                "r1": false,
                "r2": false,
                "r3": false,
                "l1": false,
                "l2": false,
                "l3": false,
                "start": false,
                "select": false,
                "special": false,
                "up": false,
                "down": false,
                "left": false,
                "right": false,
                "leftStick": false,
                "rightStick": false,
            };
            this.leftStickOffset = tm.geom.Vector2(0, 0);
            this.rightStickOffset = tm.geom.Vector2(0, 0);
            this.superInit({}.$extend(DEFAULT_PARAM, param));
        },
        _render: function() {
            this._renderCrossButton();
            this._renderButtons();
            this._renderSpecialButtons();
            this.renderLeftStick();
            this.renderRightStick();
            this.renderL2();
            this.renderL1();
            this.renderR2();
            this.renderR1();
        },
        _renderCrossButton: function() {
            var c = this.canvas;
            c.strokeStyle = this.strokeStyle;
            c.fillStyle = this.fillStyle;
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

            this.renderCrossUpButton();
            this.renderCrossLeftButton();
            this.renderCrossRightButton();
            this.renderCrossDownButton();
        },
        renderCrossUpButton: function() {
            var c = this.canvas;
            if (this.isActive["up"]) {
                c.strokeStyle = this.activeStrokeStyle;
                c.fillStyle = this.activeFillStyle;
            } else {
                c.strokeStyle = this.strokeStyle;
                c.fillStyle = this.fillStyle;
            }
            c.lineJoin = "round";
            var size = this.width * 0.2;
            var cx = this.width * 0.5;
            var cy = this.height * 0.5;
            var bw = size * 0.3;
            var bh = size * 0.9;
            var s = size * 0.02;
            var ox = size * -1.2;
            var oy = 0;
            var tcx = cx + ox;
            var tcy = cy - bh * 0.34 + oy;
            var ts = size * 0.1;

            c.beginPath().triangle(tcx, tcy - ts, tcx - ts, tcy, tcx + ts, tcy).fill().stroke();
        },
        renderCrossLeftButton: function() {
            var c = this.canvas;
            if (this.isActive["left"]) {
                c.strokeStyle = this.activeStrokeStyle;
                c.fillStyle = this.activeFillStyle;
            } else {
                c.strokeStyle = this.strokeStyle;
                c.fillStyle = this.fillStyle;
            }
            c.lineJoin = "round";
            var size = this.width * 0.2;
            var cx = this.width * 0.5;
            var cy = this.height * 0.5;
            var bw = size * 0.3;
            var bh = size * 0.9;
            var s = size * 0.02;
            var ox = size * -1.2;
            var oy = 0;
            var tcx = cx - bh * 0.34 + ox;
            var tcy = cy + oy;
            var ts = size * 0.1;

            c.beginPath().triangle(tcx - ts, tcy, tcx, tcy - ts, tcx, tcy + ts).fill().stroke();
        },
        renderCrossRightButton: function() {
            var c = this.canvas;
            if (this.isActive["right"]) {
                c.strokeStyle = this.activeStrokeStyle;
                c.fillStyle = this.activeFillStyle;
            } else {
                c.strokeStyle = this.strokeStyle;
                c.fillStyle = this.fillStyle;
            }
            c.lineJoin = "round";
            var size = this.width * 0.2;
            var cx = this.width * 0.5;
            var cy = this.height * 0.5;
            var bw = size * 0.3;
            var bh = size * 0.9;
            var s = size * 0.02;
            var ox = size * -1.2;
            var oy = 0;
            var tcx = cx + bh * 0.34 + ox;
            var tcy = cy + oy;
            var ts = size * 0.1;

            c.beginPath().triangle(tcx + ts, tcy, tcx, tcy - ts, tcx, tcy + ts).fill().stroke();
        },
        renderCrossDownButton: function() {
            var c = this.canvas;
            if (this.isActive["down"]) {
                c.strokeStyle = this.activeStrokeStyle;
                c.fillStyle = this.activeFillStyle;
            } else {
                c.strokeStyle = this.strokeStyle;
                c.fillStyle = this.fillStyle;
            }
            c.lineJoin = "round";
            var size = this.width * 0.2;
            var cx = this.width * 0.5;
            var cy = this.height * 0.5;
            var bw = size * 0.3;
            var bh = size * 0.9;
            var s = size * 0.02;
            var ox = size * -1.2;
            var oy = 0;
            var tcx = cx + ox;
            var tcy = cy + bh * 0.34 + oy;
            var ts = size * 0.1;

            c.beginPath().triangle(tcx, tcy + ts, tcx - ts, tcy, tcx + ts, tcy).fill().stroke();
        },
        _renderButtons: function() {
            var c = this.canvas;
            c.strokeStyle = this.strokeStyle;
            c.fillStyle = this.fillStyle;
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

            this.renderAButton();
            this.renderBButton();
            this.renderXButton();
            this.renderYButton();
        },
        renderYButton: function() {
            var c = this.canvas;
            if (this.isActive["y"]) {
                c.strokeStyle = this.activeStrokeStyle;
                c.fillStyle = this.activeFillStyle;
            } else {
                c.strokeStyle = this.strokeStyle;
                c.fillStyle = this.fillStyle;
            }
            c.lineJoin = "round";
            var size = this.width * 0.2;
            var cx = this.width * 0.5;
            var cy = this.height * 0.5;
            var bw = size * 0.3;
            var bh = size * 0.9;
            var s = size * 0.02;
            var ox = size * 1.2;
            var oy = 0;

            c.beginPath().circle(cx + ox, cy - bh * 0.34 + oy, bw * 0.4).fill().stroke();
        },
        renderXButton: function() {
            var c = this.canvas;
            if (this.isActive["x"]) {
                c.strokeStyle = this.activeStrokeStyle;
                c.fillStyle = this.activeFillStyle;
            } else {
                c.strokeStyle = this.strokeStyle;
                c.fillStyle = this.fillStyle;
            }
            c.lineJoin = "round";
            var size = this.width * 0.2;
            var cx = this.width * 0.5;
            var cy = this.height * 0.5;
            var bw = size * 0.3;
            var bh = size * 0.9;
            var s = size * 0.02;
            var ox = size * 1.2;
            var oy = 0;

            c.beginPath().circle(cx - bh * 0.34 + ox, cy + oy, bw * 0.4).fill().stroke();
        },
        renderBButton: function() {
            var c = this.canvas;
            if (this.isActive["b"]) {
                c.strokeStyle = this.activeStrokeStyle;
                c.fillStyle = this.activeFillStyle;
            } else {
                c.strokeStyle = this.strokeStyle;
                c.fillStyle = this.fillStyle;
            }
            c.lineJoin = "round";
            var size = this.width * 0.2;
            var cx = this.width * 0.5;
            var cy = this.height * 0.5;
            var bw = size * 0.3;
            var bh = size * 0.9;
            var s = size * 0.02;
            var ox = size * 1.2;
            var oy = 0;

            c.beginPath().circle(cx + bh * 0.34 + ox, cy + oy, bw * 0.4).fill().stroke();
        },
        renderAButton: function() {
            var c = this.canvas;
            if (this.isActive["a"]) {
                c.strokeStyle = this.activeStrokeStyle;
                c.fillStyle = this.activeFillStyle;
            } else {
                c.strokeStyle = this.strokeStyle;
                c.fillStyle = this.fillStyle;
            }
            c.lineJoin = "round";
            var size = this.width * 0.2;
            var cx = this.width * 0.5;
            var cy = this.height * 0.5;
            var bw = size * 0.3;
            var bh = size * 0.9;
            var s = size * 0.02;
            var ox = size * 1.2;
            var oy = 0;

            c.beginPath().circle(cx + ox, cy + bh * 0.34 + oy, bw * 0.4).fill().stroke();
        },
        _renderSpecialButtons: function() {
            this.renderSelectButton();
            this.renderStartButton();
            this.renderSpecialButton();
        },
        renderSelectButton: function() {
            var c = this.canvas;
            if (this.isActive["select"]) {
                c.strokeStyle = this.activeStrokeStyle;
                c.fillStyle = this.activeFillStyle;
            } else {
                c.strokeStyle = this.strokeStyle;
                c.fillStyle = this.fillStyle;
            }
            c.lineJoin = "round";
            var size = this.width * 0.2;
            var cx = this.width * 0.5;
            var cy = this.height * 0.5;
            c.beginPath().roundRect(cx - size * (0.30 + 0.15), cy, size * 0.3, size * 0.15, 1).fill().stroke();
        },
        renderStartButton: function() {
            var c = this.canvas;
            if (this.isActive["start"]) {
                c.strokeStyle = this.activeStrokeStyle;
                c.fillStyle = this.activeFillStyle;
            } else {
                c.strokeStyle = this.strokeStyle;
                c.fillStyle = this.fillStyle;
            }
            c.lineJoin = "round";
            var size = this.width * 0.2;
            var cx = this.width * 0.5;
            var cy = this.height * 0.5;
            c.beginPath().roundRect(cx + size * (0.30 - 0.15), cy, size * 0.3, size * 0.15, 1).fill().stroke();
        },
        renderSpecialButton: function() {
            var c = this.canvas;
            if (this.isActive["special"]) {
                c.strokeStyle = this.activeStrokeStyle;
                c.fillStyle = this.activeFillStyle;
            } else {
                c.strokeStyle = this.strokeStyle;
                c.fillStyle = this.fillStyle;
            }
            c.lineJoin = "round";
            var size = this.width * 0.2;
            var cx = this.width * 0.5;
            var cy = this.height * 0.5;
            c.beginPath().circle(cx, cy - size * 0.4, size * 0.2).fill().stroke();
        },
        renderLeftStick: function() {
            var c = this.canvas;
            if (this.isActive["leftStick"] || this.isActive["l3"]) {
                c.strokeStyle = this.activeStrokeStyle;
                c.fillStyle = this.activeFillStyle;
            } else {
                c.strokeStyle = this.strokeStyle;
                c.fillStyle = this.fillStyle;
            }
            c.lineJoin = "round";
            var size = this.width * 0.15;
            var cx = this.width * 0.5;
            var cy = this.height * 0.5;
            var bw = size * 0.3;
            var bh = size * 0.9;
            var s = size * 0.02;
            var ox = size * -0.6;
            var oy = size * 1.0;
            
            var offset = this.leftStickOffset.mul(size * 0.1);

            c.strokeCircle(cx + ox, cy + oy, size * 0.5);
            c.strokeCircle(cx + ox + offset.x, cy + oy + offset.y, size * 0.4);
            c.fillCircle(cx + ox + offset.x, cy + oy + offset.y, size * 0.4);
        },
        renderRightStick: function() {
            var c = this.canvas;
            if (this.isActive["rightStick"] || this.isActive["r3"]) {
                c.strokeStyle = this.activeStrokeStyle;
                c.fillStyle = this.activeFillStyle;
            } else {
                c.strokeStyle = this.strokeStyle;
                c.fillStyle = this.fillStyle;
            }
            c.lineJoin = "round";
            var size = this.width * 0.15;
            var cx = this.width * 0.5;
            var cy = this.height * 0.5;
            var bw = size * 0.3;
            var bh = size * 0.9;
            var s = size * 0.02;
            var ox = size * 0.6;
            var oy = size * 1.0;
            
            var offset = this.rightStickOffset.mul(size * 0.1);

            c.strokeCircle(cx + ox, cy + oy, size * 0.5);
            c.strokeCircle(cx + ox + offset.x, cy + oy + offset.y, size * 0.4);
            c.fillCircle(cx + ox + offset.x, cy + oy + offset.y, size * 0.4);
        },
        renderL1: function() {
            var c = this.canvas;
            if (this.isActive["l1"]) {
                c.strokeStyle = this.activeStrokeStyle;
                c.fillStyle = this.activeFillStyle;
            } else {
                c.strokeStyle = this.strokeStyle;
                c.fillStyle = this.fillStyle;
            }
            c.lineJoin = "round";
            var cx = this.width * 0.5;
            var cy = this.height * 0.5;
            var size = this.width * 0.2;
            var ox = size * 1.2;

            c.beginPath().arc(cx - ox, cy, size, Math.PI * 1.3, Math.PI * 1.7, false).closePath().fill().stroke();
        },
        renderL2: function() {
            var c = this.canvas;
            if (this.isActive["l2"]) {
                c.strokeStyle = this.activeStrokeStyle;
                c.fillStyle = this.activeFillStyle;
            } else {
                c.strokeStyle = this.strokeStyle;
                c.fillStyle = this.fillStyle;
            }
            c.lineJoin = "round";
            var cx = this.width * 0.5;
            var cy = this.height * 0.5;
            var size = this.width * 0.2;
            var ox = size * 1.2;

            c.beginPath().arc(cx - ox, cy - size * 0.12, size, Math.PI * 1.3, Math.PI * 1.7, false).closePath().fill().stroke();
        },
        renderR1: function() {
            var c = this.canvas;
            if (this.isActive["r1"]) {
                c.strokeStyle = this.activeStrokeStyle;
                c.fillStyle = this.activeFillStyle;
            } else {
                c.strokeStyle = this.strokeStyle;
                c.fillStyle = this.fillStyle;
            }
            c.lineJoin = "round";
            var cx = this.width * 0.5;
            var cy = this.height * 0.5;
            var size = this.width * 0.2;
            var ox = size * 1.2;

            c.beginPath().arc(cx + ox, cy, size, Math.PI * 1.3, Math.PI * 1.7, false).closePath().fill().stroke();
        },
        renderR2: function() {
            var c = this.canvas;
            if (this.isActive["r2"]) {
                c.strokeStyle = this.activeStrokeStyle;
                c.fillStyle = this.activeFillStyle;
            } else {
                c.strokeStyle = this.strokeStyle;
                c.fillStyle = this.fillStyle;
            }
            c.lineJoin = "round";
            var cx = this.width * 0.5;
            var cy = this.height * 0.5;
            var size = this.width * 0.2;
            var ox = size * 1.2;

            c.beginPath().arc(cx + ox, cy - size * 0.12, size, Math.PI * 1.3, Math.PI * 1.7, false).closePath().fill().stroke();
        },
    });

    var DEFAULT_PARAM = {
        width: 640,
        height: 960,
        strokeStyle: "white",
        fillStyle: "gray",
        activeStrokeStyle: "white",
        activeFillStyle: "lightblue",
    };

})();
