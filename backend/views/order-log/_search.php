<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model common\models\OrderLogSearch */
/* @var $form yii\widgets\ActiveForm */
?>


<div class="order-log-search text-right">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'options' => ['class' => 'form-inline'],
        'method' => 'get',
    ]); ?>

    <?php /*$form->field($model, 'id')->textInput(
        [
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for Id'),
            'type' => 'search'
        ]
    )->label(false) */?>

    <?= $form->field($model, 'order_id')->textInput(
        [
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for order id'),
            'type' => 'search'
        ]
    )->label(false) ?>

    <?= $form->field($model, 'status')->dropDownList(
        \common\models\Order::getStatusLabels(),
        [
            'class'       => 'form-control search-input-item select2',
            'prompt' => Yii::t('app', 'Search for status'),
            'type' => 'search',

//            'style'      => 'width:150px',
            'ui-jp'      => 'select2',
            'ui-options' => "{theme: 'bootstrap'}",
        ]
    )->label(false) ?>

    <?php /*= $form->field($model, 'remark')->textInput(
        [
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for sn'),
            'type' => 'search'
        ]
    )->label(false) */?>

    <?php // $form->field($model, 'created_at') ?>

    <?php // echo $form->field($model, 'updated_at') ?>

    <?php // echo $form->field($model, 'created_by') ?>

    <?php // echo $form->field($model, 'updated_by') ?>

    <div class="input-group" style="padding-bottom: 10px;">
        <?= $form->field($model, 'created_at')->textInput(
            [
                'class'       => 'form-control search-input-item',
                'placeholder' => Yii::t('app', 'Search for created_at'),
                'type'        => 'search'
            ]
        )->label(false) ?>
        <span class="input-group-btn">
            <?= Html::submitButton('<i class="fa fa-search"></i>', ['class' => 'btn white']) ?>
            <?php //Html::submitButton(Yii::t('app', 'Search'), ['class' => 'btn btn-primary']) ?>
            <?php //Html::resetButton(Yii::t('app', 'Reset'), ['class' => 'btn btn-default']) ?>
        </span>
    </div>

    <?php ActiveForm::end(); ?>

</div>
