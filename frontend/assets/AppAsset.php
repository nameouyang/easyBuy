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

        'libs/jquery/tether/dist/js/tether.min.js',
        //'libs/jquery/bootstrap/dist/js/bootstrap.js',
        //'libs/jquery/bootstrap/dist/js/bootstrap.js',
        // core -->
        'libs/js/toastr/toastr.min.js',  // toastr
        'libs/jquery/screenfull/dist/screenfull.min.js',
        'libs/jquery/underscore/underscore-min.js',
        'libs/jquery/jQuery-Storage-API/jquery.storageapi.min.js',
        'libs/jquery/PACE/pace.min.js',
        'libs/jquery/select2/dist/js/select2.min.js',
        'libs/jquery/select2/dist/js/i18n/zh-CN.js',

        'js/utils.js',  // toastr

        /*'js/config.lazyload.js',
        'js/palette.js',
        'js/ui-load.js',
        'js/ui-jp.js',
        'js/ui-include.js',
        'js/ui-device.js',
        'js/ui-form.js',
        'js/ui-nav.js',
        'js/ui-screenfull.js',
        'js/ui-scroll-to.js',
        'js/ui-toggle-class.js',
        'js/utils.js',  // toastr
        'js/widget/ajax-search.js',  // toastr


        'libs/freezeheader/js/jquery.freezeheader.js',
        'js/ajax.js',
        'js/voice.js',*/

        //'js/global.js',
    ];
    public $depends = [
        //'yii\web\YiiAsset',
        //'yii\bootstrap\BootstrapAsset',
    ];
}
