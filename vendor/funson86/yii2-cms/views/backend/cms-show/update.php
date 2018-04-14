<?php

use yii\helpers\Html;
use funson86\cms\Module;
use yii\widgets\Breadcrumbs;

/* @var $this yii\web\View */
/* @var $model app\models\CmsShow */

$this->title = Module::t('cms', 'Update ') . Module::t('cms', 'Cms Show') . ' ' . $model->title;
$this->params['breadcrumbs'][] = ['label' => Module::t('cms', 'Cms Shows'), 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->title, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = Module::t('cms', 'Update');
?>

<div class="modal-header m-b-md">
    <?= Breadcrumbs::widget([
        'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
    ])
    ?>
    <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>-->
    <h3 class="modal-title"><?= Html::encode($this->title) ?></h3>
</div>

<div class="cms-show-update">

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
