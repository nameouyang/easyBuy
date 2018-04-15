<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;
use yii\widgets\Breadcrumbs;

/* @var $this yii\web\View */
/* @var $model common\models\Product */
/* @var $form yii\widgets\ActiveForm */

$this->title = Yii::t('app', 'Import') . Yii::t('app', 'Product');
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Products'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>

    <div class="modal-header m-b-md">
        <?= Breadcrumbs::widget([
            'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
        ])
        ?>
        <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>-->
        <h3 class="modal-title"><?= Html::encode($this->title) ?></h3>
    </div>

<div class="product-form">

    <?php $form = ActiveForm::begin([
        'options' => ['class' => 'form-horizontal', 'enctype'=>'multipart/form-data'],
    ]); ?>

    <div class="form-group">
        <?= Html::label(Yii::t('app', 'Import File CSV'), 'importFile', ['class' => 'col-lg-1 control-label']) ?>
        <?= Html::fileInput('importFile', '', []) ?>
    </div>

    <div class="form-group">
        <label class="col-lg-1 control-label" for="">&nbsp;</label>
        <?= Html::submitButton(Yii::t('app', 'Submit'), ['class' => 'btn btn-primary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>

<?php $this->registerJs('
function removeImage() {
    alert("ok");
}
') ?>