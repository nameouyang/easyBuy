<?php

use common\models\PointLog;
use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model common\models\PointLogSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="point-log-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
        'options' => ['class' => 'form-inline'],
    ]); ?>

    <?= $form->field($model, 'user_id')->textInput(
        [
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for user id'),
            'type' => 'search'
        ]
    )->label(false) ?>

    <?= $form->field($model, 'type')->dropDownList(
        PointLog::getTypeLabels(),
        [
            'class'       => 'form-control search-input-item',
            'prompt' => Yii::t('app', 'Search for type'),
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

    <?php //echo $form->field($model, 'remark') ?>

    <?php // echo $form->field($model, 'balance') ?>

    <?php // echo $form->field($model, 'created_at') ?>

    <?php // echo $form->field($model, 'updated_at') ?>

    <?php // echo $form->field($model, 'created_by') ?>

    <?php // echo $form->field($model, 'updated_by') ?>

    <div class="input-group" style="padding-bottom: 10px;">
        <?= $form->field($model, 'balance')->textInput(
            [
                'class'       => 'form-control search-input-item',
                'placeholder' => Yii::t('app', 'Search for balance'),
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
