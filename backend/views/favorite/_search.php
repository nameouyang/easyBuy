<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model common\models\FavoriteSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="favorite-search">

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

    <?php //echo $form->field($model, 'id') ?>

    <?php // echo $form->field($model, 'user_id') ?>

    <?php //echo $form->field($model, 'product_id') ?>

    <?php //echo $form->field($model, 'attention') ?>

    <?php //echo $form->field($model, 'created_at') ?>

    <?php // echo $form->field($model, 'updated_at') ?>

    <div class="input-group" style="padding-bottom: 10px;">

        <span class="input-group-btn">
            <?= Html::submitButton('<i class="fa fa-search"></i>', ['class' => 'btn white']) ?>
            <?php //Html::submitButton(Yii::t('app', 'Search'), ['class' => 'btn btn-primary']) ?>
            <?php //Html::resetButton(Yii::t('app', 'Reset'), ['class' => 'btn btn-default']) ?>
        </span>
    </div>

    <?php ActiveForm::end(); ?>

</div>
