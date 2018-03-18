/**
 * Created by shizhen on 16-12-15.
 */
/*!
 * bootstrap-fileinput v4.3.5
 * http://plugins.krajee.com/file-input
 *
 * Font Awesome icon theme configuration for bootstrap-fileinput. Requires font awesome assets to be loaded.
 *
 * Author: Kartik Visweswaran
 * Copyright: 2014 - 2016, Kartik Visweswaran, Krajee.com
 *
 * Licensed under the BSD 3-Clause
 * https://github.com/kartik-v/bootstrap-fileinput/blob/master/LICENSE.md
 */
(function ($) {
    "use strict";
    $.fn.fileinputThemes.mi = {
        layoutTemplates: {
            main1: '{preview}\n' +
            '<div class="kv-upload-progress hide"></div>\n' +
            '<div class="input-group {class}">\n' +
            '   {caption}\n' +
            '   <div class="input-group-btn">\n' +
            '       {remove}\n' +
            '       {cancel}\n' +
            '       {upload}\n' +
            '       {browse}\n' +
            '   </div>\n' +
            '</div>',

            preview: '<div class="file-preview {class}">\n' +
            // '    {close}\n' +
            // '    <div class="close fileinput-remove">×</div>\n' +
            '    <div class="{dropClass}">\n' +
            '    <div class="file-preview-thumbnails">\n' +
            '    </div>\n' +
            '    <div class="clearfix"></div>' +
            '    <div class="file-preview-status text-center text-success"></div>\n' +
            '    <div class="kv-fileinput-error"></div>\n' +
            '    </div>\n' +
            '</div>',
            caption: '<div tabindex="-1" class="form-control file-caption {class}">\n' +
            '   <div class="file-caption-name"></div>\n' +
            '</div>',
            // actionDelete:'',
            // actionZoom: '',
            footer: "",

        },
        previewTemplates:{
            generic: '<div class="file-preview-frame" id="{previewId}" data-fileindex="{fileindex}" data-template="{template}">\n' +
            '   {content}\n' +
            '   {footer}\n' +
            '</div>\n',
            image: '<div class="file-preview-frame" id="{previewId}" data-fileindex="{fileindex}" data-template="{template}" style="width:{width};height:{height} ">  \n' +
            '   <div class="kv-file-content">' +
            '       <img src="{data}" class="kv-preview-data file-preview-image" title="{caption}" alt="{caption}" ' +  'style="width:{width};height:{height};max-width: 94px"' + '>\n' +
            '   </div>\n' +
            // '   {footer}\n' +
            '</div>\n',
        },
        previewSettings:{
            image: {width: "auto", height: "74px"},
        }
    };
})(window.jQuery);