<?php

use backend\models\User;
use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model backend\models\UserSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="user-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'options' => ['class' => 'form-inline'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'username')->textInput(
        [
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for username'),
            'type' => 'search'
        ]
    )->label(false) ?>



    <?= $form->field($model, 'role')->dropDownList(
        User::getArrayAuthRole(),
        [
            'prompt' => Yii::t('app', 'Search for role'),
            'class'       => 'form-control search-input-item',
            'type' => 'search'
        ]
    )->label(false) ?>

    <?= $form->field($model, 'role')->dropDownList(
        $arrayStatus,
        [
            'prompt' => Yii::t('app', 'Search for status'),
            'class'       => 'form-control search-input-item',
            'type' => 'search'
        ]
    )->label(false) ?>

    <?php // echo $form->field($model, 'auth_key') ?>

    <?php // echo $form->field($model, 'password_hash') ?>

    <?php //echo  $form->field($model, 'password_reset_token') ?>

    <?php // echo $form->field($model, 'email') ?>

    <?php // echo $form->field($model, 'role') ?>

    <?php // echo $form->field($model, 'status') ?>

    <?php // echo $form->field($model, 'created_at') ?>

    <?php // echo $form->field($model, 'updated_at') ?>

    <div class="input-group" style="padding-bottom: 10px;">

        <?= $form->field($model, 'email')->textInput(
            [
                'class'       => 'form-control search-input-item',
                'placeholder' => Yii::t('app', 'Search for email'),
                'type' => 'search'
            ]
        )->label(false) ?>
        <span class="input-group-btn">
            <?= Html::submitButton('<i class="fa fa-search"></i>', ['class' => 'btn white']) ?>
            <?php // Html::resetButton('<i class="glyphicon glyphicon-refresh"></i>', ['class' => 'btn white']) ?>
            <?php //Html::submitButton(Yii::t('app', 'Search'), ['class' => 'btn btn-primary']) ?>
            <?php //Html::resetButton(Yii::t('app', 'Reset'), ['class' => 'btn btn-default']) ?>
        </span>
    </div>

    <?php ActiveForm::end(); ?>

</div>
