<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model common\models\OrderSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="order-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
        'options' => ['class' => 'form-inline'],
    ]); ?>

    <?= $form->field($model, 'id')->label(false) ?>

    <?= $form->field($model, 'user_id')->label(false) ?>

    <?= $form->field($model, 'sn')->label(false) ?>

    <?= $form->field($model, 'consignee')->label(false) ?>

    <?= $form->field($model, 'country')->label(false) ?>

    <?php // echo $form->field($model, 'province') ?>

    <?php // echo $form->field($model, 'city') ?>

    <?php // echo $form->field($model, 'district') ?>

    <?php // echo $form->field($model, 'address') ?>

    <?php // echo $form->field($model, 'zipcode') ?>

    <?php // echo $form->field($model, 'phone') ?>

    <?php // echo $form->field($model, 'mobile') ?>

    <?php // echo $form->field($model, 'email') ?>

    <?php // echo $form->field($model, 'remark') ?>

    <?php // echo $form->field($model, 'payment_method') ?>

    <?php // echo $form->field($model, 'payment_status') ?>

    <?php // echo $form->field($model, 'payment_id') ?>

    <?php // echo $form->field($model, 'payment_name') ?>

    <?php // echo $form->field($model, 'payment_fee') ?>

    <?php // echo $form->field($model, 'shipment_status') ?>

    <?php // echo $form->field($model, 'shipment_id') ?>

    <?php // echo $form->field($model, 'shipment_name') ?>

    <?php // echo $form->field($model, 'shipment_fee') ?>

    <?php // echo $form->field($model, 'amount') ?>

    <?php // echo $form->field($model, 'tax') ?>

    <?php // echo $form->field($model, 'invoice') ?>

    <?php // echo $form->field($model, 'status') ?>

    <?php // echo $form->field($model, 'paid_at') ?>

    <?php // echo $form->field($model, 'shipped_at') ?>

    <?php // echo $form->field($model, 'created_at') ?>

    <?php // echo $form->field($model, 'updated_at') ?>

    <?php // echo $form->field($model, 'created_by') ?>

    <?php // echo $form->field($model, 'updated_by') ?>

    <div class="form-group">
        <?= $form->field($model, 'country')->textInput(
            [
                'class'       => 'form-control search-input-item',
                'placeholder' => Yii::t('app', 'Search for Product Name'),
                'type'        => 'search'
            ]
        )->label(false) ?>


        <?= Html::submitButton(Yii::t('app', 'Search'), ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton(Yii::t('app', 'Reset'), ['class' => 'btn btn-default']) ?>

    </div>

    <?php ActiveForm::end(); ?>

</div>


_search.php