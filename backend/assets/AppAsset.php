<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace backend\assets;

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
        'css/site.css',
        //'css/bootstrap/dist/css/bootstrap.min.css',
        'css/animate.css/animate.min.css',
        'css/glyphicons/glyphicons.css',
        'css/font-awesome/css/font-awesome.min.css',
        'css/material-design-icons/material-design-icons.css',
        'css/flag-icon/css/flag-icon.min.css',
        // 'libs/jquery/plugins/integration/bootstrap/3/dataTables.bootstrap.css',
        // 'libs/jquery/select2-bootstrap-theme/dist/select2-bootstrap.4.css',
        //'libs/jquery/select2-bootstrap-theme/dist/select2-bootstrap.min.css',
        'libs/js/toastr/toastr.min.css',   // toastr
        'libs/jquery/select2/dist/css/select2.min.css',
        'libs/jquery/select2-bootstrap-theme/dist/select2-bootstrap.min.css',
        'libs/jquery/select2-bootstrap-theme/dist/select2-bootstrap.4.css',
        'css/app.css',
        'css/font.css',
    ];
    public $js = [
        //'libs/jquery/jquery/dist/jquery.js',

        'libs/jquery/tether/dist/js/tether.min.js',
        //'libs/jquery/bootstrap/dist/js/bootstrap.js',
        'libs/js/toastr/toastr.min.js',  // toastr
        'libs/jquery/screenfull/dist/screenfull.min.js',
        'libs/jquery/underscore/underscore-min.js',
        'libs/jquery/jQuery-Storage-API/jquery.storageapi.min.js',
        'libs/jquery/PACE/pace.min.js',
        'libs/jquery/select2/dist/js/select2.min.js',
        'libs/jquery/select2/dist/js/i18n/zh-CN.js',
        'js/config.lazyload.js',
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

        //'js/app.js',
        // ajax -->
        //'libs/jquery/jquery-pjax/jquery.pjax.js',
        'libs/freezeheader/js/jquery.freezeheader.js',
        'js/ajax.js',
        'js/voice.js',
    ];
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapAsset',
    ];
}
