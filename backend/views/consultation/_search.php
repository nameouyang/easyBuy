<?php

use common\models\Status;
use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model common\models\ConsultationSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="consultation-search">

    <?php $form = ActiveForm::begin([
        'action'  => ['index'],
        'method'  => 'get',
        'options' => ['class' => 'form-inline'],
    ]); ?>

    <?= $form->field($model, 'user_id')->textInput(
        [
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for user id'),
            'type'        => 'search'
        ]
    )->label(false) ?>

    <?= $form->field($model, 'status')->dropDownList(
        Status::labels(),
        [
            'class'       => 'form-control search-input-item',
            'prompt'      => Yii::t('app', 'Search for status'),
            'type'        => 'search'
        ]
    )->label(false) ?>

    <?= $form->field($model, 'question')->textInput(
        [
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for question'),
            'type'        => 'search'
        ]
    )->label(false) ?>

    <?= $form->field($model, 'answer')->textInput(
        [
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for answer'),
            'type'        => 'search'
        ]
    )->label(false) ?>

    <?php  // echo $form->field($model, 'product_id')?>

    <?php  //  $form->field($model, 'type')?>

    <?php // echo $form->field($model, 'question')?>

    <?php // echo $form->field($model, 'answer')?>

    <?php // echo $form->field($model, 'status')?>

    <?php // echo $form->field($model, 'created_at')?>

    <?php // echo $form->field($model, 'updated_at')?>

    <?php // echo $form->field($model, 'created_by')?>

    <?php // echo $form->field($model, 'updated_by')?>

    <div class="input-group" style="padding-bottom: 10px;">
        <?= $form->field($model, 'username')->textInput(
            [
                'class'       => 'form-control search-input-item',
                'placeholder' => Yii::t('app', 'Search for username'),
                'type'        => 'search'
            ]
        )->label(false) ?>
        <span class="input-group-btn">
            <?= Html::submitButton('<i class="fa fa-search"></i>', ['class' => 'btn white']) ?>
            <?php //Html::submitButton(Yii::t('app', 'Search'), ['class' => 'btn btn-primary'])?>
            <?php //Html::resetButton(Yii::t('app', 'Reset'), ['class' => 'btn btn-default'])?>
        </span>
    </div>

    <?php ActiveForm::end(); ?>

</div>
