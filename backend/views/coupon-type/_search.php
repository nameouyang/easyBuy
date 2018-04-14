<?php

use common\models\CouponType;
use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model common\models\CouponTypeSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="coupon-type-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
        'options' => ['class' => 'form-inline'],
    ]); ?>

    <?= $form->field($model, 'name')->textInput(
        [
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for coupon name'),
            'type' => 'search'
        ]
    )->label(false) ?>

    <?= $form->field($model, 'money')->textInput(
        [
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for coupon money'),
            'type' => 'search'
        ]
    )->label(false) ?>

    <?= $form->field($model, 'type')->dropDownList(
        CouponType::labels(),
        [
            'class'       => 'form-control search-input-item',
            'prompt' => Yii::t('app', 'Search for coupon type'),
            'type' => 'search'
        ]
    )->label(false) ?>

    <?php // echo  $form->field($model, 'money') ?>

    <?php // echo  $form->field($model, 'min_amount') ?>

    <?php // echo  $form->field($model, 'type') ?>

    <?php // echo $form->field($model, 'started_at') ?>

    <?php // echo $form->field($model, 'ended_at') ?>

    <?php // echo $form->field($model, 'min_goods_amount') ?>

    <?php // echo $form->field($model, 'created_at') ?>

    <?php // echo $form->field($model, 'updated_at') ?>

    <?php // echo $form->field($model, 'created_by') ?>

    <?php // echo $form->field($model, 'updated_by') ?>

    <div class="input-group" style="padding-bottom: 10px;">
        <?= $form->field($model, 'min_amount')->textInput(
            [
                'class'       => 'form-control search-input-item',
                'placeholder' => Yii::t('app', 'Search for coupon min_amount'),
                'type' => 'search'
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
