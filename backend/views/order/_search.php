<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

?>

<div class="goods-search text-right">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'options' => ['class' => 'form-inline'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'id')->textInput(
        [
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for Id'),
            'type' => 'search'
        ]
    )->label(false) ?>


    <?= $form->field($model, 'user_id')->textInput(
        [
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for user_id'),
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



    <div class="input-group" style="padding-bottom: 10px;">
        <?= $form->field($model, 'country')->textInput(
            [
                'class'       => 'form-control search-input-item',
                'placeholder' => Yii::t('app', 'Search for country'),
                'type'        => 'search'
            ]
        )->label(false) ?>
        <span class="input-group-btn">
            <?= Html::submitButton('<i class="fa fa-search"></i>', ['class' => 'btn white']) ?>
        </span>
    </div>

    <?php ActiveForm::end(); ?>

</div>
