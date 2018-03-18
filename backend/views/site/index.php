<?php
/* @var $this yii\web\View */

$this->title = 'Welcome To easy buy';
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
<div class="site-index">
    <p><?= Yii::t('app', 'Order Stat') ?></p>
    <table class="table table-striped table-bordered">
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
                <td><span class="label rounded color1" ><?= $dataOrder['todayCount'] ?></span></td>
                <td><span class="label rounded color2" ><?= $dataOrder['yesterdayCount'] ?></span></td>
                <td><span class="label rounded color3" ><?= $dataOrder['lastWeekCount'] ?></span></td>
                <td><span class="label rounded color4" ><?= $dataOrder['thisWeekCount'] ?></span></td>
                <td><span class="label rounded color5" ><?= $dataOrder['lastMonthCount'] ?></span></td>
                <td><span class="label rounded color6" ><?= $dataOrder['thisMonthCount'] ?></span></td>
            </tr>
            <tr data-key="1">
                <td><?= Yii::t('app', 'Amount') ?></td>
                <td><span class="label rounded color1" ><?= $dataOrder['todayAmount'] ?></span></td>
                <td><span class="label rounded color2" ><?= $dataOrder['yesterdayAmount'] ?></span></td>
                <td><span class="label rounded color3" ><?= $dataOrder['lastWeekAmount'] ?></span></td>
                <td><span class="label rounded color4" ><?= $dataOrder['thisWeekAmount'] ?></span></td>
                <td><span class="label rounded color5" ><?= $dataOrder['lastMonthAmount'] ?></span></td>
                <td><span class="label rounded color6" ><?= $dataOrder['thisMonthAmount'] ?></span></td>
            </tr>
        </tbody>
    </table>
</div>
<div class="site-index">
    <p><?= Yii::t('app', 'User Stat') ?></p>
    <table class="table table-striped table-bordered">
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
                <td><?= Yii::t('app', 'Count') ?></td>
                <td><span class="label rounded color1" ><?= $dataUser['todayCount'] ?></span></td>
                <td><span class="label rounded color2" ><?= $dataUser['yesterdayCount'] ?></span></td>
                <td><span class="label rounded color3" ><?= $dataUser['lastWeekCount'] ?></span></td>
                <td><span class="label rounded color4" ><?= $dataUser['thisWeekCount'] ?></span></td>
                <td><span class="label rounded color5" ><?= $dataUser['lastMonthCount'] ?></span></td>
                <td><span class="label rounded color6" ><?= $dataUser['thisMonthCount'] ?></span></td>
            </tr>
        </tbody>
    </table>
</div>
