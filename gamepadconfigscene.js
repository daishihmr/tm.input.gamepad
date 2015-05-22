/*
 * gamepadconfigscene.js
 */

tm.input = tm.input || {};


(function() {

    tm.define("tm.input.GamepadConfigScene", {
        superClass: "tm.game.ManagerScene",
        init: function(param) {
            tm.input.Gamepad.BUTTON_CODE = {};
            param = {}.$extend(DEFAULT_PARAM, param);

            var scenes = [];
            if (param.cursorKey) {
                scenes.push({
                    className: "tm.input.gamepad.CursorKeyConfigScene",
                    arguments: param
                });
            }
            if (param.stick1) {
                scenes.push({
                    className: "tm.input.gamepad.StickConfigScene",
                    arguments: [param, 0]
                });
            }
            if (param.stick2) {
                scenes.push({
                    className: "tm.input.gamepad.StickConfigScene",
                    arguments: [param, 1]
                });
            }
            scenes.push({
                className: "tm.input.gamepad.ButtonConfigScene",
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

    tm.define("tm.input.gamepad.CursorKeyConfigScene", {
        superClass: "tm.app.Scene",
        init: function(param) {
            this.superInit();

            // カーソルキー上を押して
            // 下を
            // 左を
            // 右を
        }
    });

    tm.define("tm.input.gamepad.StickConfigScene", {
        superClass: "tm.app.Scene",
        init: function(param, stickIndex) {
            this.superInit();

            // スティックでマーカーを追う
        }
    });

    tm.define("tm.input.gamepad.ButtonConfigScene", {
        superClass: "tm.app.Scene",
        init: function(param) {
            this.superInit();

            // param.buttonNamesの内容を設定
        }
    });

    var DEFAULT_PARAM = {
        cursorKey: true,
        stick1: true,
        stick2: false,
        buttonNames: ["A", "B", "start"]
    };

})();
