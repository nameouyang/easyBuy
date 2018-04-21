<?php

use common\models\Category;
use common\models\Order;
use common\models\ProductType;
use common\models\Status;
use common\models\YesNo;
use yii\grid\GridView;
use yii\helpers\ArrayHelper;
use yii\helpers\Html;
use yii\helpers\Url;
use yii\widgets\Breadcrumbs;
use yii\widgets\Pjax;

/* @var $this yii\web\View */
/* @var $searchModel common\models\ProductSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title                   = Yii::t('app', 'Products');
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
                    <?= Html::a(Yii::t('app', 'Create ') . Yii::t('app', 'Product'), ['create'], [
                        'class' => 'btn btn-success',
                        //'data-toggle' => 'modal',
                        //'data-target' => '#m-a-a-a',
                        //'ui-toggle-class' => 'roll',
                        //'ui-target' => '#animate',
                        'data-url' => Url::to(['create'])
                    ]) ?>

                    <?= Html::a(Yii::t('app', 'Batch ') . Yii::t('app', 'Delete'), '#', [
                        'class'    => 'btn btn-danger',
                        'id'       => 'batchDelete',
                        'data-url' => Url::to(['#'])
                    ]) ?>

                </div>

                <div class="text-right" style="padding-right:5px">
                    <div id="DataTables_Table_2_filter" class="dataTables_filter">
                        <?php echo $this->render('_search', ['model' => $searchModel]);?>
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
                        'style' => 'min-width:122rem',
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
                        [
                            'headerOptions' => ['class' => 'col-th-5'],
                            'class' => 'yii\grid\CheckboxColumn'
                        ],

                        [
                            'attribute'     => 'id',
                            'headerOptions' => ['class'=>'col-th-5 text-left']
                        ],
                        [
                            'attribute'     => 'category_id',
                            'headerOptions' => ['class' => 'col-th-9 text-left'],
                            'value'         => function ($model) {
                                return $model->category->name;
                            },
                        ],
                        [
                            'attribute'      => 'name',
                            'headerOptions'  => ['class' => 'col-th-13 text-left'],
                            'contentOptions' => function ($model) {
                                return ['class'   => 'name-15 text-left',
                                    'data-toggle' => 'tooltip',
                                    'title'       => Html::encode($model->name),
                                    'style'       => 'max-width: 15rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;'
                                ];
                            },
                        ],
                        [
                            'attribute'     => 'sku',
                            'headerOptions' => ['class'=>'col-th-9 text-left']
                        ],
                        [
                            'attribute'     => 'stock',
                            'headerOptions' => ['class'=>'col-th-7 text-left']
                        ],
                        // 'weight',
                        [
                            'attribute'     => 'market_price',
                            'headerOptions' => ['class'=>'col-th-9 text-left']
                        ],
                        [
                            'attribute'      => 'price',
                            'headerOptions'  => ['class'=>'col-th-9 text-left'],
                            'contentOptions' => ['class'=>'col-th-9 text-left'],
                        ],
                        [
                            'attribute'      => 'type',
                            'headerOptions'  => ['class' => 'col-th-11'],
                            'contentOptions' => function ($model) {
                                return ['class'   => 'name-11 text-left',
                                    'data-toggle' => 'tooltip',
                                    'title'       => Html::encode(ProductType::labels($model->type)),
                                    'style'       => 'max-width: 15rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;'
                                ];
                            },
                            'content' => function ($model) {
                                return ProductType::labels($model->type);
                            },
                        ],
                        [
                            'attribute' => 'brand_id',
                            'headerOptions' => ['class' => 'col-th-7'],
                            'value'     => function ($model) {
                                return $model->brand ? $model->brand->name : '-';
                            },
                        ],
                        [
                            'attribute'     => 'status',
                            'headerOptions' => ['class' => 'col-th-5'],
                            'format'        => 'html',
                            'value'         => function ($model) {
                                if ($model->status === Status::STATUS_ACTIVE) {
                                    $class = 'label-success';
                                } elseif ($model->status === Status::STATUS_INACTIVE) {
                                    $class = 'label-warning';
                                } else {
                                    $class = 'label-danger';
                                }
                                return '<span class="label ' . $class . '">' . Status::labels($model->status) . '</span>';
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
                            'attribute'     => 'created_by',
                            'headerOptions' => ['class' => 'col-th-9 text-left'],
                            'content'       => function ($model) {
                                return $model->createdBy ? $model->createdBy->username : '-';
                            },
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


<?php
/*$urlBatchDelete = \yii\helpers\Url::to(['/product/batch-delete']);
$js = <<<JS
jQuery(document).ready(function() {
    $("#batchDelete").click(function() {
        var keys = $("#w0").yiiGridView("getSelectedRows");
        $.ajax({
            type: "POST",
            url: "{$urlBatchDelete}",
            dataType: "json",
            data: {ids: keys}
        });
    });
});
JS;
$this->registerJs($js, \yii\web\View::POS_END);*/
