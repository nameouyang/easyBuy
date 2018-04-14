<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model common\models\OrderLog */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="order-log-form">

    <?php $form = ActiveForm::begin(); ?>

    <!--<div class="form-group row" style="width: 100%; background-color: #eee; padding-top: 10px;">
        <div class="col-md-3" >
            <h5>基本信息</h5>
        </div>
    </div>
    <div class="form-group row">
        <label class="col-md-2 form-control-label text-right"><?/*= Yii::t('app', 'Promotion schedule') */?></label>
        <div class="col-md-3">
            <?php /*echo Html::textInput(
                'full-price',
                '',
                [
                    'required' => true,
                    'class' => 'form-control full-price-input',
                    'placeholder' => '请输入金额',
                    'type' => 'number',
                ]
            ) */?>
        </div>
    </div>

    <div class="form-group row">
        <label class="col-md-2 form-control-label text-right">订单号</label>
        <div class="col-md-3">
            <?php /*echo $form->field($model, 'order_id')->textInput([
                    'value' => 'asda',
            ])->label(false) */?>
        </div>
    </div>-->

    <?= $form->field($model, 'order_id')->textInput() ?>

    <?= $form->field($model, 'status')->textInput() ?>

    <?= $form->field($model, 'remark')->textInput(['maxlength' => 255]) ?>

    <?php // echo$form->field($model, 'created_at')->textInput() ?>

    <?php // echo $form->field($model, 'updated_at')->textInput() ?>

    <?php // echo $form->field($model, 'created_by')->textInput() ?>

    <?php // echo $form->field($model, 'updated_by')->textInput() ?>

    <div class="form-group">
        <?= Html::submitButton($model->isNewRecord ? Yii::t('app', 'Create') : Yii::t('app', 'Update'), ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
