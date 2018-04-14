<?php

use common\components\ArrayHelper;
use common\models\CouponType;
use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model common\models\CouponSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="coupon-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
        'options' => ['class' => 'form-inline'],
    ]); ?>

    <?= $form->field($model, 'id')->textInput(
        [
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for id'),
            'type' => 'search'
        ]
    )->label(false) ?>

    <?= $form->field($model, 'user_id')->textInput(
        [
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for user id'),
            'type' => 'search'
        ]
    )->label(false) ?>

    <?= $form->field($model, 'coupon_type_id')->dropDownList(
        ArrayHelper::map(CouponType::find()->all(), 'id', 'name'),
        [
            'class'       => 'form-control search-input-item',
            'prompt' => Yii::t('app', 'Search for coupon type id'),
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

    <?= $form->field($model, 'order_id')->textInput(
        [
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for order id'),
            'type' => 'search'
        ]
    )->label(false) ?>



    <?php // echo $form->field($model, 'used_at') ?>

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
