<?php
/* @var $this yii\web\View */
use \backend\assets\AppAsset;

AppAsset::register($this);
$this->registerJsFile('@web/js/page/site/index.js', ['depends' => AppAsset::className()]);

$this->title = '<h2>欢迎进入 easy buy 后台管理</h2>';
?>

<style>
    td,th {
        text-align: center;
    }

    .color1 {
        background: #45B6AF;
    }
    .color2 {
        background: #0baee4;
    }
    .color3 {
        background: #5bc0de;
    }
    .color4 {
        background: #009661;
    }
    .color5 {
        background: #CD5555;
    }
    .color6 {
        background: #FFB6C1;
    }

</style>
<div class="site-index" style="margin:50px 50px 0 50px">
    <h4><?= Yii::t('app', 'Order Stat') ?></h4>
    <table class="table table-striped table-bordered table-hover">
        <thead>
        <tr>
            <th>&nbsp;</th>
            <th><?= Yii::t('app', 'Today') ?></th>
            <th><?= Yii::t('app', 'Yesterday') ?></th>
            <th><?= Yii::t('app', 'Last Week') ?></th>
            <th><?= Yii::t('app', 'This Week') ?></th>
            <th><?= Yii::t('app', 'Last Month') ?></th>
            <th><?= Yii::t('app', 'This Month') ?></th>
        </tr>
        </thead>
        <tbody>
            <tr data-key="1">
                <td ><?= Yii::t('app', 'Count') ?></td>
                <td><span class="label rounded color1" id = "todayCountDD"><?= $dataOrder['todayCount'] ?></span></td>
                <td><span class="label rounded color2" id = "yesterdayCountDD"><?= $dataOrder['yesterdayCount'] ?></span></td>
                <td><span class="label rounded color3" id = "lastWeekCountDD"><?= $dataOrder['lastWeekCount'] ?></span></td>
                <td><span class="label rounded color4" id = "thisWeekCountDD"><?= $dataOrder['thisWeekCount'] ?></span></td>
                <td><span class="label rounded color5" id = "lastMonthCountDD"><?= $dataOrder['lastMonthCount'] ?></span></td>
                <td><span class="label rounded color6" id = "thisMonthCountDD"><?= $dataOrder['thisMonthCount'] ?></span></td>
            </tr>
            <tr data-key="1">
                <td><?= Yii::t('app', 'Amount') ?></td>
                <td><span class="label rounded color1" id = "todayAmount"><?= $dataOrder['todayAmount'] ?></span></td>
                <td><span class="label rounded color2" id = "yesterdayAmount"><?= $dataOrder['yesterdayAmount'] ?></span></td>
                <td><span class="label rounded color3" id = "lastWeekAmount"><?= $dataOrder['lastWeekAmount'] ?></span></td>
                <td><span class="label rounded color4" id = "thisWeekAmount"><?= $dataOrder['thisWeekAmount'] ?></span></td>
                <td><span class="label rounded color5" id = "lastMonthAmount"><?= $dataOrder['lastMonthAmount'] ?></span></td>
                <td><span class="label rounded color6" id = "thisMonthAmount"><?= $dataOrder['thisMonthAmount'] ?></span></td>
            </tr>
        </tbody>
    </table>
</div>

<div height="400" width="600" style="margin:50px; float: left">
    <canvas id="barChart"> 你的浏览器不支持HTML5 canvas </canvas>
    <h5 style="text-align: center">订单数统计</h5>
</div>

<div height="400" width="600" style="margin:50px; float: right">
    <canvas id="barChartAll"> 你的浏览器不支持HTML5 canvas </canvas>
    <h5 style="text-align: center;">销售额统计</h5>
</div>
<div style="clear: both;">

</div>
<div class="site-index" style="margin:50px 50px 0 50px">
    <h4><?= Yii::t('app', 'User Stat') ?></h4>
    <table class="table table-bordered table-striped table-hover">
        <thead>
        <tr>
            <th>&nbsp;</th>
            <th><?= Yii::t('app', 'Today') ?></th>
            <th><?= Yii::t('app', 'Yesterday') ?></th>
            <th><?= Yii::t('app', 'Last Week') ?></th>
            <th><?= Yii::t('app', 'This Week') ?></th>
            <th><?= Yii::t('app', 'Last Month') ?></th>
            <th><?= Yii::t('app', 'This Month') ?></th>
            <th>其他</th>
        </tr>
        </thead>
        <tbody>
            <tr data-key="1">
                <td><?= Yii::t('app', 'Count') ?></td>
                <td><span class="label rounded color1" id = "todayCount"><?= $dataUser['todayCount'] ?></span></td>
                <td><span class="label rounded color2" id = "yesterdayCount"><?= $dataUser['yesterdayCount'] ?></span></td>
                <td><span class="label rounded color3" id = "lastWeekCount"><?= $dataUser['lastWeekCount'] ?></span></td>
                <td><span class="label rounded color4" id = "thisWeekCount"><?= $dataUser['thisWeekCount'] ?></span></td>
                <td><span class="label rounded color5" id = "lastMonthCount"><?= $dataUser['lastMonthCount'] ?></span></td>
                <td><span class="label rounded color6" id = "thisMonthCount"><?= $dataUser['thisMonthCount'] ?></span></td>
                <td><span class="label rounded color1" id = "otherCount"><?= $dataUser['otherCount'] ?></span></td>
            </tr>
        </tbody>
    </table>
</div>


<div height="400" width="600" style="margin:50px; text-align: center">
    <canvas id="chart"> 你的浏览器不支持HTML5 canvas </canvas>
    <h5 style="text-align: center;">用户注册统计</h5>
</div>

<div id="chartK" height="500" width="1200" style="margin:30px;"></div>

