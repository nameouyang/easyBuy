(function () {
	'use strict';

	var byId = function (id) { return document.getElementById(id); },

		loadScripts = function (desc, callback) {
			var deps = [], key, idx = 0;

			for (key in desc) {
				deps.push(key);
			}

			(function _next() {
				var pid,
					name = deps[idx],
					script = document.createElement('script');

				script.type = 'text/javascript';
				script.src = desc[deps[idx]];

				pid = setInterval(function () {
					if (window[name]) {
						clearTimeout(pid);

						deps[idx++] = window[name];

						if (deps[idx]) {
							_next();
						} else {
							callback.apply(null, deps);
						}
					}
				}, 30);

				document.getElementsByTagName('head')[0].appendChild(script);
			})()
		},

		console = window.console;


	if (!console.log) {
		console.log = function () {
			alert([].join.apply(arguments, ' '));
		};
	}

	// Multi groups
	// Sortable.create(byId('multi'), {
	// 	animation: 150,
	// 	draggable: '.tile',
	// 	handle: '.tile__name'
	// });

	[].forEach.call(byId('multi').getElementsByClassName('tile__list'), function (el){
		Sortable.create(el, {
			group: 'photo',
			animation: 150,
            onUpdate: function (evt/**Event*/){
                var item = evt.item; // the current dragged HTMLElement
            },
            onEnd: function (/**Event*/evt) {
                var itemEl = evt.item;  // dragged HTMLElement
                var id = $('#template_id').val();
                if(evt.oldIndex == evt.newIndex){//没有移动
                	return false;
				}
                $.ajax({
                    type: "POST",
                    url: '/product-template/move-pic?id='+id,
                    data: {"old":evt.oldIndex,"new":evt.newIndex,"name":"banner"},
                    dataType: "json",
                    success: function(data){
                        if(data.code == 0){
                            Utils.Toastr.Success('成功', '移动图片成功');
                        }else{
                            Utils.Toastr.Error('失败', '移动图片失败');
                            setInterval(function () {
                                window.location.reload();
                            },1000);
                        }
                    }
                });
                return false;
            },
		});
	});
    [].forEach.call(byId('multi2').getElementsByClassName('tile__list2'), function (el){
        Sortable.create(el, {
            group: 'photo2',
            animation: 150,
            onUpdate: function (evt/**Event*/){
                var item = evt.item; // the current dragged HTMLElement
            },
            onEnd: function (/**Event*/evt) {
                var itemEl = evt.item;  // dragged HTMLElement
                var id = $('#template_id').val();
                if(evt.oldIndex == evt.newIndex){//没有移动
                    return false;
                }
                $.ajax({
                    type: "POST",
                    url: '/product-template/move-pic?id='+id,
                    data: {"old":evt.oldIndex,"new":evt.newIndex,"name":"poster"},
                    dataType: "json",
                    success: function(data){
                        if(data.code == 0){
                            Utils.Toastr.Success('成功', '移动图片成功');

                        }else{
                            Utils.Toastr.Error('失败', '移动图片失败');
                            setInterval(function () {
                                window.location.reload();
                            },1000);
                        }
                    }
                });
                return false;
            },
        });
    });
})();



// Background
document.addEventListener("DOMContentLoaded", function () {
	function setNoiseBackground(el, width, height, opacity) {
		var canvas = document.createElement("canvas");
		var context = canvas.getContext("2d");

		canvas.width = width;
		canvas.height = height;

		for (var i = 0; i < width; i++) {
			for (var j = 0; j < height; j++) {
				var val = Math.floor(Math.random() * 255);
				context.fillStyle = "rgba(" + val + "," + val + "," + val + "," + opacity + ")";
				context.fillRect(i, j, 1, 1);
			}
		}

		el.style.background = "url(" + canvas.toDataURL("image/png") + ")";
	}

	setNoiseBackground(document.getElementsByTagName('body')[0], 50, 50, 0.02);
}, false);
