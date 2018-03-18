$(function($) {
    //需要播放对应音频的，可自行添加对应的类
    $(document).on('click','.system-sound-email',function () {
        document.getElementById('system-sound-email').play();
    })
    $(document).on('click','.system-sound-submit',function () {
        document.getElementById('system-sound-submit').play();
    })
    $(document).on('click','.system-sound-cancel',function () {
        document.getElementById('system-sound-cancel').play();
    })
    $(document).on('click','.system-sound-delete',function () {
        document.getElementById('system-sound-delete').play();
    })
    $(document).on('click','.system-sound-click',function () {
        document.getElementById('system-sound-click').play();
    })
    $(document).on('click','.system-sound-error',function () {
        document.getElementById('system-sound-error').play();
    })
});
