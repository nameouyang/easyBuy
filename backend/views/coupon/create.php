<?php

use yii\helpers\Html;
use yii\widgets\Breadcrumbs;


/* @var $this yii\web\View */
/* @var $model common\models\Coupon */

$this->title = Yii::t('app', 'Create ') . Yii::t('app', 'Coupon');
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Coupons'), 'url' => ['index']];
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

<div class="coupon-create">

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
