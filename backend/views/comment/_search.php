<?php

use common\models\Status;
use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model common\models\CommentSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="comment-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
        'options' => ['class' => 'form-inline'],
    ]); ?>

    <?= $form->field($model, 'username')->textInput(
        [
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for username'),
            'type' => 'search'
        ]
    )->label(false) ?>

    <?= $form->field($model, 'status')->dropDownList(
        Status::labels(),
        [
            'class'       => 'form-control search-input-item',
            'prompt' => Yii::t('app', 'Search for status'),
            'type' => 'search'
        ]
    )->label(false) ?>

    <?= $form->field($model, 'star')->textInput(
        [
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for star'),
            'type' => 'search'
        ]
    )->label(false) ?>

    <?= $form->field($model, 'point')->textInput(
        [
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for point'),
            'type' => 'search'
        ]
    )->label(false) ?>

    <?php // echo $form->field($model, 'product_id') ?>

    <?php // echo $form->field($model, 'star') ?>

    <?php // echo $form->field($model, 'content') ?>

    <?php // echo $form->field($model, 'point') ?>

    <?php // echo $form->field($model, 'up') ?>

    <?php // echo $form->field($model, 'status') ?>

    <?php // echo $form->field($model, 'created_at') ?>

    <?php // echo $form->field($model, 'updated_at') ?>

    <?php // echo $form->field($model, 'created_by') ?>

    <?php // echo $form->field($model, 'updated_by') ?>

    <div class="input-group" style="padding-bottom: 10px;">
        <?= $form->field($model, 'order_id')->textInput(
            [
                'class'       => 'form-control search-input-item',
                'placeholder' => Yii::t('app', 'Search for order id'),
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
