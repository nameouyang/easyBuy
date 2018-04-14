<?php

use yii\helpers\Html;
use yii\grid\GridView;
use backend\models\User;
use yii\helpers\ArrayHelper;
use yii\helpers\Url;
use yii\widgets\Breadcrumbs;
use yii\widgets\Pjax;

/* @var $this yii\web\View */
/* @var $searchModel backend\models\UserSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = Yii::t('app', 'Users');
$this->params['breadcrumbs'][] = $this->title;
?>

<div class="product-index padding">
    <?=     Breadcrumbs::widget([
        'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
    ])
    ?>
    <div class="box">
        <div class="box-header">
            <h2><?= Html::encode($this->title) ?></h2>
            <small><?= Html::encode($this->title) ?></small>
        </div>
        <div class="row p-a">

            <div style="float:left;" class="m-l-md">
                <?= Html::a(Yii::t('app', 'Create ') . Yii::t('app', 'User'), ['create'], [
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
                    <?php echo $this->render('_search', ['model' => $searchModel, 'arrayStatus' => $arrayStatus]);?>
                </div>
            </div>
        </div>

        <div class="table-responsive">
            <?php Pjax::begin([
                'id' => 'gridview-pjax',
            ]); ?>
            <?= GridView::widget([
                'dataProvider' => $dataProvider,
                'tableOptions' => [
                    'class' => 'table table-bordered table-striped table-hover m-a-0 water-mark',
                    'style' => 'min-width:53rem',
                ],
                'pager' => [
                    'options'          => ['class' => 'pagination pagination-sm m-a-0'],
                    'firstPageLabel'   => Yii::t('app', 'First Page'),
                    'lastPageLabel'    => Yii::t('app', 'Last Page'),
                    'prevPageLabel'    => Yii::t('app', 'Previous'),
                    'nextPageLabel'    => Yii::t('app', 'Next'),
                    'registerLinkTags' => 1,
                ],
                'layout'  => '<div class="box-divider m-a-0"></div><div>{items}</div><div class="dker p-a"><div class="row"><div class="col-md-5"><small class="text-muted inline m-t-sm m-b-sm">{summary}</small></div><div class="col-md-7 text-right text-center-xs">{pager}</div></div>',
                'columns' => [
                    //['class' => 'yii\grid\CheckboxColumn'],
//                    ['class' => 'yii\grid\SerialColumn'],

                    [
                        'attribute'     => 'id',
                        'headerOptions' => ['class'=>'col-th-5 text-left']
                    ],
                    [
                        'attribute'      => 'username',
                        'headerOptions'  => ['class' => 'col-th-13 text-left'],
                    ],
                    [
                        'attribute'     => 'email',
                        'headerOptions' => ['class'=>'col-th-9 text-left']
                    ],
                    [
                        'attribute' => 'auth_role',
                        'headerOptions' => ['class' => 'text-left'],
                        'value' => function ($model) {
                            return $model->authRole ? $model->authRole->name : '-';
                        },
                    ],
                    [
                        'attribute' => 'status',
                        'headerOptions' => ['class' => 'text-center'],
                        'contentOptions' => ['class' => 'text-center'],
                        'format' => 'html',
                        'value' => function ($model) {
                            if ($model->status === $model::STATUS_ACTIVE) {
                                $class = 'label-success';
                            } elseif ($model->status === $model::STATUS_INACTIVE) {
                                $class = 'label-warning';
                            } else {
                                $class = 'label-danger';
                            }

                            return '<span class="label ' . $class . '">' . $model->statusLabel . '</span>';
                        },
                    ],

                    /*[
                        'attribute' => 'status',
                        'headerOptions'  => ['class' => 'col-th-9 text-center'],
                        'contentOptions' => ['class' => 'text-center'],
                        'content' => function($model) {
                            if ($model->status == Order::STATUS_CANCEL) {
                                return '<span class="label rounded warn">' .Order::getStatusLabels($model->status) . '</span>';
                            } else if ($model->status == Order::STATUS_DELETED) {
                                return '<span class="label rounded danger">' . Order::getStatusLabels($model->status) .'</span>';
                            } else if ($model->status == Order::PAYMENT_STATUS_COD) {
                                return '<span class="label rounded primary">' . Order::getStatusLabels($model->status) .'</span>';
                            } else if ($model->status == Order::PAYMENT_STATUS_UNPAID) {
                                return '<span class="label rounded warning">' . Order::getStatusLabels($model->status) .'</span>';
                            } else if ($model->status == Order::PAYMENT_STATUS_PAYING) {
                                return '<span class="label rounded accent">' . Order::getStatusLabels($model->status).'</span>';
                            } elseif ($model->status == Order::PAYMENT_STATUS_PAID) {
                                return '<span class="label rounded light-blue-500">' . Order::getStatusLabels($model->status).'</span>';
                            } elseif ($model->status == Order::SHIPMENT_STATUS_UNSHIPPED) {
                                return '<span class="label rounded error">' . Order::getStatusLabels($model->status).'</span>';
                            } elseif ($model->status == Order::SHIPMENT_STATUS_PREPARING) {
                                return '<span class="label rounded primary">' . Order::getStatusLabels($model->status).'</span>';
                            } elseif ($model->status == Order::SHIPMENT_STATUS_SHIPPED) {
                                return '<span class="label rounded green-700">' . Order::getStatusLabels($model->status).'</span>';
                            } elseif ($model->status == Order::SHIPMENT_STATUS_RECEIVED) {
                                return '<span class="label rounded success">' . Order::getStatusLabels($model->status).'</span>';
                            }
                        },

                    ],*/

                    [
                        'attribute'      => 'created_at',
                        'contentOptions' => ['class' => 'text-center'],
                        'headerOptions'  => ['class' => 'col-th-13'],
                        'content'        => function ($model) {
                            return date('Y-m-d H:i:s', $model->created_at);
                        }
                    ],
                    [
                        'class'          => 'yii\grid\ActionColumn',
                        'header'         => '操作',
                        'contentOptions' => ['class' => 'text-center'],
                        'headerOptions'  => ['class' => 'col-th-9'],
                        'template'       => ' {update} {view} {delete}',
                        'buttons'        => [
                            'delete' => function ($url, $model) {
                                return (Html::a('<span class="glyphicon glyphicon-trash m-l-sm "></span>', $url, ['class' => 'ajaxDelete', 'title' => Yii::t('app', 'Delete')]));
                            },
                            'update' => function ($url, $model) {
                                return (
                                Html::a('<span class="glyphicon glyphicon-pencil m-r-sm"></span>',
                                    $url, [
                                        'ui-target' => '#animate',
                                        'title'     => Yii::t('app', 'Update'),
                                        'data-url'  => $url
                                    ])
                                );
                            },

                        ],

                    ],

                    [
                        'content' => function ($model, $key, $index, $column) {
                            return '&nbsp;';
                        }
                    ],
                ],

            ]); ?>
            <?php Pjax::end(); ?>
        </div>
    </div>
</div>

<div id="m-a-a-a" class="modal bs-example-modal-lg fade " data-backdrop="static" style="" keyboard="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            </div>
            <div class="text-center" style="height:500px">
                <img src="/images/loading.gif" style="margin-top: 200px">
            </div>
        </div>
    </div>
</div>

