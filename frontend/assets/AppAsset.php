<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace frontend\assets;

use yii\web\AssetBundle;

/**
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class AppAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/global.css',
        //'css/bootstrap/dist/css/bootstrap.min.css',
        /*'backend/web/css/animate.css/animate.min.css',
        'backend/web/css/glyphicons/glyphicons.css',
        'backend/web/css/font-awesome/css/font-awesome.min.css',
        'backend/web/css/material-design-icons/material-design-icons.css',
        'backend/web/css/flag-icon/css/flag-icon.min.css',
        'backend/web/libs/js/toastr/toastr.min.css',   // toastr
        'backend/web/libs/jquery/select2/dist/css/select2.min.css',
        'backend/web/libs/jquery/select2-bootstrap-theme/dist/select2-bootstrap.min.css',
        'backend/web/libs/jquery/select2-bootstrap-theme/dist/select2-bootstrap.4.css',
        'backend/web/css/app.css',
        'backend/web/css/font.css',*/
    ];
    public $js = [
        'js/jquery.js',
/*
        'backend/web/libs/jquery/tether/dist/js/tether.min.js',
        'backend/web/libs/js/toastr/toastr.min.js',  // toastr
        'backend/web/libs/jquery/screenfull/dist/screenfull.min.js',
        'backend/web/libs/jquery/underscore/underscore-min.js',
        'backend/web/libs/jquery/jQuery-Storage-API/jquery.storageapi.min.js',
        'backend/web/libs/jquery/PACE/pace.min.js',
        'backend/web/libs/jquery/select2/dist/js/select2.min.js',
        'backend/web/libs/jquery/select2/dist/js/i18n/zh-CN.js',
        'backend/web/js/config.lazyload.js',
        'backend/web/js/palette.js',
        'backend/web/js/ui-load.js',
        'backend/web/js/ui-jp.js',
        'backend/web/js/ui-include.js',
        'backend/web/js/ui-device.js',
        'backend/web/js/ui-form.js',
        'backend/web/js/ui-nav.js',
        'backend/web/js/ui-screenfull.js',
        'backend/web/js/ui-scroll-to.js',
        'backend/web/js/ui-toggle-class.js',
        'backend/web/js/utils.js',  // toastr
        'backend/web/js/widget/ajax-search.js',  // toastr

        'backend/web/js/app.js',
        'backend/web/libs/freezeheader/js/jquery.freezeheader.js',
        'backend/web/js/ajax.js',*/

        //'js/global.js',
    ];
    public $depends = [
        //'yii\web\YiiAsset',
        //'yii\bootstrap\BootstrapAsset',
    ];
}
