<?php

use common\models\Order;
use yii\helpers\Html;
use yii\widgets\ActiveForm;

?>

<div class="goods-search text-right">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'options' => ['class' => 'form-inline'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'user_id')->textInput(
        [
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for user id'),
            'type' => 'search'
        ]
    )->label(false) ?>


    <?= $form->field($model, 'sn')->textInput(
        [
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for order id'),
            'type' => 'search'
        ]
    )->label(false) ?>


    <?= $form->field($model, 'sn')->textInput(
        [
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for sn'),
            'type' => 'search'
        ]
    )->label(false) ?>

    <?= $form->field($model, 'payment_status')->dropDownList(Order::PAYMENT_STATUS,
        [
            'ui-jp' => "select2",
            'ui-options' => "{theme: 'bootstrap'}",
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for payment status'),
            'type' => 'search'
        ]
    )->label(false) ?>

    <?= $form->field($model, 'shipment_status')->dropDownList(Order::SHIPMENT_STATUS,
        [
            'ui-jp' => "select2",
            'ui-options' => "{theme: 'bootstrap'}",
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for shipment status'),
            'type' => 'search'
        ]
    )->label(false) ?>

    <?= $form->field($model, 'status')->dropDownList(Order::STATUS,
        [
            'ui-jp' => "select2",
            'ui-options' => "{theme: 'bootstrap'}",
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for order status'),
            'type' => 'search'
        ]
    )->label(false) ?>

    <div class="input-group" style="padding-bottom: 10px;">
        <?= $form->field($model, 'mobile')->textInput(
            [
                'class'       => 'form-control search-input-item',
                'placeholder' => Yii::t('app', 'Search for tel'),
                'type'        => 'search'
            ]
        )->label(false) ?>
        <span class="input-group-btn">
            <?= Html::submitButton('<i class="fa fa-search"></i>', ['class' => 'btn white']) ?>
        </span>
    </div>

    <?php ActiveForm::end(); ?>

</div>
