(function () {
    var a = 0,
        b = $("#floatNav"),
        c = $("#floatposition").offset().top,
        w = b.outerWidth(),
        e;
    $(window).scroll(function(){
        f(0);
    });

    function f(g){
        if (g != a) {
            return;
        }
        e = $(window).scrollTop();
        if (e >= c){
            if ('undefined' == typeof(document.body.style.maxHeight)) {
                b.css({
                    position: "relative",
                    top: $(window).scrollTop() - $("#floatposition").offset().top
                });
            } else {
                if (b.css("position") != "fixed") {
                    b.css({
                        "position": "fixed",
                        "top": 0,
                        "left": "50%",
                        "margin-left": -w/2
                    });
                }
            }
        } else {
            b.css({
                position: "static",
                "margin-left": "auto"
            });
        }
        b.show();
    }
})();