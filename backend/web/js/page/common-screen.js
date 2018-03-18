$(function () {
    $.fn.isOnScreen = function (partial) {
        var t = $(this).first();
        var box = t[0].getBoundingClientRect();
        var win = {
            h: $(window).height(),
            w: $(window).width()
        };
        var topEdgeInRange = box.top >= 0 && box.top <= win.h;
        var bottomEdgeInRange = box.bottom >= 0 && box.bottom <= win.h;

        var leftEdgeInRange = box.left >= 0 && box.left <= win.w;
        var rightEdgeInRange = box.right >= 0 && box.right <= win.w;
        var coverScreenHorizontally = box.left <= 0 && box.right >= win.w;
        var coverScreenVertically = box.top <= 0 && box.bottom >= win.h;

        var topEdgeInScreen = topEdgeInRange && (leftEdgeInRange || rightEdgeInRange || coverScreenHorizontally);
        var bottomEdgeInScreen = bottomEdgeInRange && (leftEdgeInRange || rightEdgeInRange || coverScreenHorizontally);

        var leftEdgeInScreen = leftEdgeInRange && (topEdgeInRange || bottomEdgeInRange || coverScreenVertically);
        var rightEdgeInScreen = rightEdgeInRange && (topEdgeInRange || bottomEdgeInRange || coverScreenVertically);

        var isPartiallyOnScreen = topEdgeInScreen || bottomEdgeInScreen || leftEdgeInScreen || rightEdgeInScreen;
        var isEntirelyOnScreen = topEdgeInScreen && bottomEdgeInScreen && leftEdgeInScreen && rightEdgeInScreen;

        return partial ? isPartiallyOnScreen : isEntirelyOnScreen;

    };

    $.expr.filters.onscreen = function (elem) {
        return $(elem).isOnScreen(true);
    };

    $.expr.filters.entireonscreen = function (elem) {
        return $(elem).isOnScreen(true);
    };
});