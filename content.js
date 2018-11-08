$(function() {
    window.onmouseover = function (e) {
        var target = e.target;
        if (target.tagName == "BODY" || target.tagName == "HTML" || target.classList.contains("ccs-tooltip")) {
            return;
        }
        var colorData = {
            "color": "",
            "background-color": "",
            "border-color": ""
        }
        var computedStyle = window.getComputedStyle(target, null);
        for (var prop in colorData) {
            if (target.style.hasOwnProperty(prop)) {
                colorData[prop] = changeTohex(computedStyle[prop]);
                if (target.style[prop]) {
                    colorData[prop] = changeTohex(target.style[prop]);
                }
            }
        }
        $(target).attr('title', '');
        $(target).tooltip({
            tooltipClass: "ccs-tooltip",
            content: function() {
                return `
                    <div class="ccs-tooltip-content" style="color: ${colorData["color"]}; background-color: ${colorData["background-color"]}; border-color: ${colorData["border-color"]};">
                        color: ${colorData["color"]}<br>
                        background-color: ${colorData["background-color"]}<br>
                        border-color: ${colorData["border-color"]}
                    </div>
                `
            }
        }).tooltip('open');
    }

    /**
     * RGBをHEXに変換
     * @param {string} color
     * @returns {string}
     */
    function changeTohex(color)
    {
        var rgb = color.match(/(\d{1,3}), (\d{1,3}), (\d{1,3})/);
        if (!rgb) {
            return color;
        }
        rgb = [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])]
        // 16進数に変換
        var hex = "#" + rgb.map(function (value) {
            return ("0" + value.toString(16)).slice(-2);
        }).join("");

        var rgba = color.match(/\d{1,3}, \d{1,3}, \d{1,3}, (\d*?(?:\.?\d+))?\)$/);
        if (!rgba) {
            return hex;
        }
        // rgbaの場合
        var alpha = Math.round(Number(rgba[1]) * 100) / 100
        alpha = Math.round(alpha * 255)
        var alphaHex = (alpha + 0x10000).toString(16).substr(-2).toUpperCase();
        return hex + alphaHex;
    }
})
