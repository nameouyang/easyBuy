<?php

use yii\helpers\Html;
use yii\grid\GridView;
use yii\helpers\ArrayHelper;
use yii\helpers\Url;
use yii\widgets\Breadcrumbs;

/* @var $this yii\web\View */
/* @var $searchModel common\models\CategorySearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = Yii::t('app', 'Categories');
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="category-index padding">

    <?=     Breadcrumbs::widget([
        'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
    ])
    ?>

    <div class="box-header">
        <h2><?= Html::encode($this->title) ?></h2>
        <small><?= Html::encode($this->title) ?></small>
    </div>
    <div class="row p-a">

        <div style="float:left;" class="m-l-md">
            <?= Html::a(Yii::t('app', 'Create ') . Yii::t('app', 'Category'), ['create'], [
                'class' => 'btn btn-success',
                //'data-toggle' => 'modal',
                //'data-target' => '#m-a-a-a',
                //'ui-toggle-class' => 'roll',
                //'ui-target' => '#animate',
                'data-url' => Url::to(['create'])
            ]) ?>

        </div>

        <div class="text-right" style="padding-right:5px">
            <div id="DataTables_Table_2_filter" class="dataTables_filter">
                <?php //echo $this->render('_search', ['model' => $searchModel]); ?>
            </div>
        </div>
    </div>

    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <table class="table table-striped table-bordered table-hover">
        <thead>
        <tr>
            <th>ID</th>
            <th><?= Yii::t('app', 'Title') ?> </th>
            <th><?= Yii::t('app', 'Sort Order') ?></th>
            <th><?= Yii::t('app', 'Is Nav') ?></th>
            <th><?= Yii::t('app', 'Status') ?></th>
            <th><?= Yii::t('app', 'Actions') ?></th>

        </tr>
        </thead>
        <tbody>
        <?php foreach($dataProvider as $item){ ?>
            <tr data-key="1">
                <td><?= $item['id']; ?></td>
                <td><?= $item['label']; ?></td>
                <td><?= $item['sort_order']; ?></td>
                <td><?= \common\models\YesNo::labels()[$item['is_nav']]; ?></td>
                <td><?= \common\models\Status::labels()[$item['status']]; ?></td>
                <td>
                    <!--a href="<?= \Yii::$app->getUrlManager()->createUrl(['category/create','parent_id'=>$item['id']]); ?>" title="<?= Yii::t('cms', 'Add Sub Catalog');?>" data-pjax="0"><span class="glyphicon glyphicon-plus-sign"></span></a-->
                    <a href="<?= \Yii::$app->getUrlManager()->createUrl(['category/view','id'=>$item['id']]); ?>"" title="<?= Yii::t('cms', 'View');?>" data-pjax="0"><span class="glyphicon glyphicon-eye-open"></span></a>
                    <a href="<?= \Yii::$app->getUrlManager()->createUrl(['category/update','id'=>$item['id']]); ?>"" title="<?= Yii::t('cms', 'Update');?>" data-pjax="0"><span class="glyphicon glyphicon-pencil"></span></a>
                    <a href="<?= \Yii::$app->getUrlManager()->createUrl(['category/delete','id'=>$item['id']]); ?>"" title="<?= Yii::t('cms', 'Delete');?>" data-confirm="<?= Yii::t('cms', 'Are you sure you want to delete this item?');?>" data-method="post" data-pjax="0"><span class="glyphicon glyphicon-trash"></span></a>
                </td>
            </tr>
        <?php } ?>
        </tbody>
    </table>

</div>
