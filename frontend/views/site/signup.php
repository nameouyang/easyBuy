<?php

use frontend\assets\AppAsset;
use frontend\assets\ToolAsset;
use yii\helpers\Html;
use yii\bootstrap\ActiveForm;
use yii\helpers\Url;

/* @var $this yii\web\View */
/* @var $form yii\bootstrap\ActiveForm */
/* @var $model \frontend\models\SignupForm */

AppAsset::register($this);
ToolAsset::register($this);
$this->registerJsFile('@web/js/page/singup/singup.js', ['depends' => \frontend\assets\AppAsset::className()]);


$this->title = Yii::t('app', 'Signup');
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-signup">
    <h1><?= Html::encode($this->title) ?></h1>

    <p><?= Yii::t('app', 'Please fill out the following fields to signup:') ?></p>

    <div class="row">
        <div class="col-lg-5">
            <?php $form = ActiveForm::begin(['id' => 'form-signup']); ?>

                <?= $form->field($model, 'username') ?>
                <?= $form->field($model, 'email') ?>
                <?= $form->field($model, 'password')->passwordInput() ?>

            <?=Html::label('验证码')?>
            <div style="clear: both;"></div>
                <div style="float: left; padding-right: 13%; width: 50%;">
                    <?= Html::input('text', 'code', '', [
                        //'style'=>'float:left;',
                        'class'=>'form-control',
                        'id'=>'code',
                    ])?>
                </div>
                <div>
                    <?= Html::a('发送邮件获取验证码', 'javascript:', [
                        'class' => 'btn btn-primary',
                        'id'   => 'send_email',
                        'data-url' => Url::to([''])
                    ])  ?>
                </div>

                <div style="clear: both; padding-bottom: 5%"></div>

                <div class="form-group">
                    <?= Html::button(Yii::t('app', 'Signup'), [
                            'class' => 'btn btn-primary',
                        'name' => 'signup-button',
                        'id' => 'submit_btn',
                        ]) ?>
                </div>
            <?php ActiveForm::end(); ?>
        </div>
    </div>
</div>
