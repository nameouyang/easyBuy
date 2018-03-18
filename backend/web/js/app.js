(function ($) {
    'use strict';

    window.app = {
        name: 'Flatkit',
        version: '1.1.0',
        // for chart colors
        color: {
            'primary': '#0cc2aa',
            'accent': '#a88add',
            'warn': '#fcc100',
            'info': '#6887ff',
            'success': '#6cc788',
            'warning': '#f77a99',
            'danger': '#f44455',
            'white': '#ffffff',
            'light': '#f1f2f3',
            'dark': '#2e3e4e',
            'black': '#2a2b3c'
        },
        setting: {
            theme: {
                primary: 'primary',
                accent: 'accent',
                warn: 'warn'
            },
            color: {
                primary: '#0cc2aa',
                accent: '#a88add',
                warn: '#fcc100'
            },
            folded: false,
            boxed: false,
            container: false,
            themeID: 1,
            bg: ''
        }
    };

    var setting = 'jqStorage-' + app.name + '-Setting',
            storage = $.localStorage;

    if (storage.isEmpty(setting)) {
        storage.set(setting, app.setting);
    } else {
        app.setting = storage.get(setting);
    }
    var v = window.location.search.substring(1).split('&');
    for (var i = 0; i < v.length; i++) {
        var n = v[i].split('=');
        app.setting[n[0]] = (n[1] == "true" || n[1] == "false") ? (n[1] == "true") : n[1];
        storage.set(setting, app.setting);
    }

    // init
    function setTheme() {

        $('body').removeClass($('body').attr('ui-class')).addClass(app.setting.bg).attr('ui-class', app.setting.bg);
        app.setting.folded ? $('#aside').addClass('folded') : $('#aside').removeClass('folded');
        app.setting.boxed ? $('body').addClass('container') : $('body').removeClass('container');

        $('.switcher input[value="' + app.setting.themeID + '"]').prop('checked', true);
        $('.switcher input[value="' + app.setting.bg + '"]').prop('checked', true);

        $('[data-target="folded"] input').prop('checked', app.setting.folded);
        $('#aside-folder').attr('data-status', app.setting.folded ? 0 : 1);
        $('[data-target="boxed"] input').prop('checked', app.setting.boxed);

    }

    // click to switch
    $(document).on('click.setting', '.switcher input', function (e) {
        var $this = $(this), $target;
        $target = $this.parent().attr('data-target') ? $this.parent().attr('data-target') : $this.parent().parent().attr('data-target');
        app.setting[$target] = $this.is(':checkbox') ? $this.prop('checked') : $(this).val();
        ($(this).attr('name') == 'color') && (app.setting.theme = eval('[' + $(this).parent().attr('data-value') + ']')[0]) && setColor();
        storage.set(setting, app.setting);
        setTheme(app.setting);
    });

    $(document).on('click.folded', '#aside-folder', function () {
        var $this = $(this), $target;
        $target = $this.parent().attr('data-target');
        app.setting[$target] = ($(this).attr('data-status') == 1) ? true : false;
        storage.set(setting, app.setting);
        setTheme();
    });

    $(document).on('click', '.country-link', function() {
        var csrfToken = $('meta[name="csrf-token"]').attr("content");
        $.ajax({
            cache: true,
            url: '/country/change-location',
            type: 'post',
            data: {country: $(this).data('country'), _csrf: csrfToken},
        }).done(function(data) {
            console.log(data);
            if(data.code == 200){
                window.location.href = data.data;
            }else{
                if(data.msg){
                    Utils.Toastr.Error('错误', data.msg);
                }

            }
        });
    })

    $(document).on('click', '.language-link', function() {
        var csrfToken = $('meta[name="csrf-token"]').attr("content");
        $.ajax({
            cache: true,
            url: '/country/change-language',
            type: 'post',
            data: {language: $(this).data('language'), _csrf: csrfToken},
        }).done(function(data) {
            console.log(data);
            if(data.code == 200){
                window.location.reload();
            }else{
                if(data.msg){
                    Utils.Toastr.Error('错误', data.msg);
                }

            }
        });
    })

    function setColor() {
        app.setting.color = {
            primary: getColor(app.setting.theme.primary),
            accent: getColor(app.setting.theme.accent),
            warn: getColor(app.setting.theme.warn)
        };
    }
    ;

    function getColor(name) {
        return app.color[name] ? app.color[name] : palette.find(name);
    }
    ;

    function init() {
        $('[ui-jp]').uiJp();
        $('body').uiInclude();
    }

    function initThirdPlugins()
    {
        $('[data-toggle="tooltip"]').tooltip({'delay': 300});
        var funcs = ['initThirdPlugins'];
        for (var i = 0; i < funcs.length; i++) {
            var func = window[funcs[i]];
            if (typeof (func) !== 'undefined')
            {
                func.apply(funcs[i], []);
            }
        }
    }
    $(document).on('pjaxStart', function () {
        $('#aside').modal('hide');
        $('body').removeClass('modal-open').find('.modal-backdrop').remove();
        $('.navbar-toggleable-sm').collapse('hide');
    });

    init();
    setTheme();

    $('[data-toggle="tooltip"]').tooltip({'delay': 300});
    $(document).on("ready pjax:end", function () {
        init();
        setTheme();
        initThirdPlugins();
    })
})(jQuery);
