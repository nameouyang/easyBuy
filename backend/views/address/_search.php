<?php

use common\models\YesNo;
use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model common\models\AddressSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="address-search">

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

    <?= $form->field($model, 'name')->textInput(
        [
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for address name'),
            'type' => 'search'
        ]
    )->label(false) ?>

    <?= $form->field($model, 'consignee')->textInput(
        [
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for consignee'),
            'type' => 'search'
        ]
    )->label(false) ?>

    <?= $form->field($model, 'default')->dropDownList(
        YesNo::labels(),
        [
            'prompt' => Yii::t('app', 'Search for default address'),
            'class'       => 'form-control search-input-item',
            'type' => 'search'
        ]
    )->label(false) ?>



    <?php //echo $form->field($model, 'country') ?>

    <?php // echo $form->field($model, 'province') ?>

    <?php // echo $form->field($model, 'city') ?>

    <?php // echo $form->field($model, 'district') ?>

    <?php // echo $form->field($model, 'address') ?>

    <?php // echo $form->field($model, 'zipcode') ?>

    <?php // echo $form->field($model, 'phone') ?>

    <?php // echo $form->field($model, 'mobile') ?>

    <?php // echo $form->field($model, 'email') ?>

    <?php // echo $form->field($model, 'default') ?>

    <?php // echo $form->field($model, 'created_at') ?>

    <?php // echo $form->field($model, 'updated_at') ?>

    <?php // echo $form->field($model, 'created_by') ?>

    <?php // echo $form->field($model, 'updated_by') ?>

    <div class="input-group" style="padding-bottom: 10px;">
        <?= $form->field($model, 'address')->textInput(
            [
                'class'       => 'form-control search-input-item',
                'placeholder' => Yii::t('app', 'Search for address'),
                'type' => 'search'
            ]
        )->label(false) ?>
        <span class="input-group-btn">
            <?= Html::submitButton('<i class="fa fa-search"></i>', ['class' => 'btn white']) ?>
            <?php // echo Html::submitButton(Yii::t('app', 'Search'), ['class' => 'btn btn-primary']) ?>
            <?php //echo Html::resetButton(Yii::t('app', 'Reset'), ['class' => 'btn btn-default']) ?>
        </span>
    </div>

    <?php ActiveForm::end(); ?>

</div>
