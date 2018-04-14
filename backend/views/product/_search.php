<?php

use common\models\Category;
use common\models\ProductType;
use common\models\Status;
use yii\helpers\ArrayHelper;
use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model common\models\ProductSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="product-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'options' => ['class' => 'form-inline'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'category_id')->dropDownList(
        ArrayHelper::map(Category::get(0, Category::find()->asArray()->all()), 'id', 'label'),
        [
            'prompt' => Yii::t('app', 'Search for category'),
            'class'       => 'form-control search-input-item',
            'type' => 'search'
        ]
    )->label(false) ?>

    <?= $form->field($model, 'name')->textInput(
        [
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for goods name'),
            'type' => 'search'
        ]
    )->label(false) ?>

    <?= $form->field($model, 'sku')->textInput(
        [
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for sku'),
            'type' => 'search'
        ]
    )->label(false) ?>

    <?= $form->field($model, 'stock')->textInput(
        [
            'class'       => 'form-control search-input-item',
            'placeholder' => Yii::t('app', 'Search for stock'),
            'type' => 'search'
        ]
    )->label(false) ?>

    <?= $form->field($model, 'type')->dropDownList(
        ProductType::TYPE,
            [
            'prompt' => Yii::t('app', 'Search for type'),
            'class'       => 'form-control search-input-item',
            'type' => 'search'
        ]
    )->label(false) ?>

    <?= $form->field($model, 'brand_id')->dropDownList(
        ArrayHelper::map(\common\models\Brand::find()->all(), 'id', 'name'),
        [
            'prompt' => Yii::t('app', 'Search for brand'),
            'class'       => 'form-control search-input-item',
            'type' => 'search'
        ]
    )->label(false) ?>



    <?php // echo $form->field($model, 'weight') ?>

    <?php // echo $form->field($model, 'market_price') ?>

    <?php // echo $form->field($model, 'price') ?>

    <?php // echo $form->field($model, 'brief') ?>

    <?php // echo $form->field($model, 'content') ?>

    <?php // echo $form->field($model, 'thumb') ?>

    <?php // echo $form->field($model, 'image') ?>

    <?php // echo $form->field($model, 'origin') ?>

    <?php // echo $form->field($model, 'keywords') ?>

    <?php // echo $form->field($model, 'description') ?>

    <?php // echo $form->field($model, 'type') ?>

    <?php // echo $form->field($model, 'status') ?>

    <?php // echo $form->field($model, 'created_at') ?>

    <?php // echo $form->field($model, 'updated_at') ?>

    <?php // echo $form->field($model, 'created_by') ?>

    <?php // echo $form->field($model, 'updated_by') ?>

    <div class="input-group" style="padding-bottom: 10px;">
        <?= $form->field($model, 'status')->dropDownList(
            Status::labels(),
            [
                'prompt' => Yii::t('app', 'Search for status'),
                'class'       => 'form-control search-input-item',
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
