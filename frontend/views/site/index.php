<?php
/* @var $this yii\web\View */
$this->title = 'Easy Buy';
$this->registerCssFile('@web/css/index.css', ['depends' => \frontend\assets\AppAsset::className()]);
$this->registerJsFile('@web/js/switchable.js', ['depends' => \frontend\assets\AppAsset::className()]);
?>

<div class="index-banner">
    <div class="index-slide" id="index-slide">
        <a id="btnLeft" href="javascript:void(0);" title = '上一张'></a>
        <a id="btnRight" href="javascript:void(0);" title = '下一张'></a>
        <ul>
            <li><a href=""><img src="/images/banner11.jpg" alt="" /></a></li>
            <li><a href=""><img src="/images/banner12.jpg" alt="" /></a></li>
            <li><a href=""><img src="/images/banner13.jpg" alt="" /></a></li>
            <li><a href=""><img src="/images/banner14.jpg" alt="" /></a></li>
            <li><a href=""><img src="/images/banner15.jpg" alt="" /></a></li>
            <li><a href=""><img src="/images/banner16.jpg" alt="" /></a></li>
            <li><a href=""><img src="/images/banner17.jpg" alt="" /></a></li>
            <li><a href=""><img src="/images/banner18.jpg" alt="" /></a></li>
            <li><a href=""><img src="/images/banner20.gif" alt="" /></a></li>
        </ul>
        <div id="ico" class="ico">
            <a class="active" href="javascript:void(0);"></a>
            <a href="javascript:void(0);"></a>
            <a href="javascript:void(0);"></a>
            <a href="javascript:void(0);"></a>
            <a href="javascript:void(0);"></a>
            <a href="javascript:void(0);"></a>
            <a href="javascript:void(0);"></a>
            <a href="javascript:void(0);"></a>
            <a href="javascript:void(0);"></a>
        </div>
        <!-- <ul>
            <li data-img="/images/banner11.jpg">
                <a href="#" title=""></a>
            </li>
            <li data-img="/images/banner12.jpg">
                <a href="#" title=""></a>
            </li>
            <li data-img="/images/banner13.jpg">
                <a href="#" title=""></a>
            </li>
            <li data-img="/images/banner14.jpg">
                <a href="#" title=""></a>
            </li>
            <li data-img="/images/banner15.jpg">
                <a href="#" title=""></a>
            </li>
            <li data-img="/images/banner16.jpg">
                <a href="#" title=""></a>
            </li>
            <li data-img="/images/banner17.jpg">
                <a href="#" title=""></a>
            </li>
            <li data-img="/images/banner18.jpg">
                <a href="#" title=""></a>
            </li>
            <li data-img="/images/banner20.gif">
                <a href="#" title=""></a>
            </li>
        </ul> -->

        <!-- <div class="trigger-box">&nbsp;</div> -->
    </div>
</div>

<!-- 类目推荐 -->
<div class="series_list">
    <div class="series_box cle">
        <div class="series_info">
            <div class="series_name name_product">
                <h2>手机</h2>
            </div>
            <ul class="brand">
                <li> <a href="<?= Yii::$app->urlManager->createUrl(['product/view', 'id' => 3]) ?>" target="_blank" title="iphone"> <img src="/upload/201502/small-iphone61.jpg"></a> </li>
                <li> <a href="<?= Yii::$app->urlManager->createUrl(['product/view', 'id' => 1]) ?>" target="_blank" title="macbook"> <img src="/upload/201502/small-macbook.jpg"></a> </li>
                <li> <a href="<?= Yii::$app->urlManager->createUrl(['product/view', 'id' => 5]) ?>" target="_blank" title="sumsung"> <img src="/upload/201502/small-sumsung.jpg"></a> </li>
            </ul>
            <div class="brand_cata">
                <a target="_blank" href="<?= Yii::$app->urlManager->createUrl(['product/search', 'keyword' => 'iPhone']) ?>">苹果</a>
                <a target="_blank" href="<?= Yii::$app->urlManager->createUrl(['product/search', 'keyword' => '三星']) ?>">三星</a>
                <a target="_blank" href="<?= Yii::$app->urlManager->createUrl(['product/search', 'keyword' => '华为']) ?>">华为</a>
                <a target="_blank" href="<?= Yii::$app->urlManager->createUrl(['product/search', 'keyword' => '小米']) ?>">小米</a>
            </div>
        </div>
        <div class="series_pic"> <a <a href="<?= Yii::$app->urlManager->createUrl(['product/view', 'id' => 2]) ?>" target="_blank"> <img src="/upload/201502/small-iphone4s.jpg"></a> </div>
        <div class="pro_list">
            <ul class="cle">
                <?php foreach ($products as $item) { ?>
                    <li>
                        <a href="<?= Yii::$app->urlManager->createUrl(['product/view', 'id' => $item->id]) ?>" target="_blank">
                            <p class="pic"> <img src="<?= $item->thumb ?>"></p>
                            <h3><?= $item->name ?></h3>
                            <p class="price">￥<?= $item->price ?></p>
                        </a>
                    </li>
                <?php } ?>
            </ul>
        </div>
    </div>

</div>

<div id="slide">

</div>


<?php
$js = <<<JS
if ($("#index-slide").find("li").length == 1) {
    $("#index-slide").find(".trigger-box").hide();
}
a(0);
$('#index-slide').switchable({
    triggers: $('#index-slide').find(".trigger-box"),
    panels: "li",
    effect: "fade",
    interval: 5,
    autoplay: true,
    beforeSwitch: function(f, d) {
        a(d);
    }
});
function a(e) {
    var f = $('#index-slide').find("li").eq(e),
            d = f.data("img");
    if (d != "none" && d != undefined) {
        f.css("background-image", "url(" + d + ")").data("img", "none");
    }
}
JS;

//$this->registerJs($js);
?>


