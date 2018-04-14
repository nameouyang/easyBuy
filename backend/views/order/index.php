


<?php

use backend\assets\AppAsset;
use yii\helpers\Html;
use yii\grid\GridView;
use yii\helpers\ArrayHelper;
use common\models\Order;
use yii\widgets\Breadcrumbs;
use yii\widgets\Pjax;

AppAsset::register($this);


$this->title = Yii::t('app', 'Order Info');
$this->params['breadcrumbs'][] = $this->title;

?>
<div class="pay-type-index padding">
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
            <div class="text-right" style="padding-right:5px">
                <div id="DataTables_Table_2_filter" class="dataTables_filter">
                    <?php echo $this->render('_search', ['model' => $searchModel]); ?>
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
                    'options' => ['class' => 'pagination pagination-sm m-a-0'],
                    'firstPageLabel' => Yii::t('app', 'First Page'),
                    'lastPageLabel' => Yii::t('app', 'Last Page'),
                    'prevPageLabel' => Yii::t('app', 'Previous'),
                    'nextPageLabel' => Yii::t('app', 'Next'),
                    'registerLinkTags' => 1,
                ],
                'layout' => '<div class="box-divider m-a-0"></div><div>{items}</div><div class="dker p-a"><div class="row"><div class="col-md-5"><small class="text-muted inline m-t-sm m-b-sm">{summary}</small></div><div class="col-md-7 text-right text-center-xs">{pager}</div></div>',
                'columns' =>[
                    'id',
                    [
                        'attribute' => 'user_id',
                        'headerOptions' => ['class'=>'col-th-7'],
                    ],
                    [
                        'attribute' => 'user_id',
                        'header'    => Yii::t('app', 'User Name'),
                        'headerOptions' => ['class'=>'col-th-7'],
                        'value'=>function ($model) {
                            return $model->user ? $model->user->username : '-';
                        },
                    ],
                    [
                        'attribute' => 'sn',
                        'label'     => '订单号'
                    ],
                    [
                        'attribute' => 'consignee',
                        'headerOptions'  => ['class' => 'col-th-7'],
                    ],

                    [
                        'attribute'      => 'address',
                        'headerOptions'  => ['class' => 'col-th-15'],
                        'contentOptions' => function ($model) {
                            $name = (isset($model->country0) ? $model->country0->name : '-') .
                                (isset($model->province0) ? $model->province0->name : '-') .
                                (isset($model->city0) ? $model->city0->name : '-') .
                                (isset($model->district0) ? $model->district0->name : '-');
                            return ['class'   => 'name-15 text-left',
                                'data-toggle' => 'tooltip',
                                'title'       => Html::encode($name),
                                'style'       => 'max-width: 15rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;'
                            ];
                        },
                        'content' => function ($model) {
                            return (isset($model->country0) ? $model->country0->name : '-') .
                                (isset($model->province0) ? $model->province0->name : '-') .
                                (isset($model->city0) ? $model->city0->name : '-') .
                                (isset($model->district0) ? $model->district0->name : '-');
                        },
                    ],
                    'mobile',
                    [
                        'attribute' => 'payment_status',
                        'format'    => 'html',
                        'value'     => function ($model) {
                            if ($model->payment_status === Order::PAYMENT_STATUS_PAID) {
                                $class = 'label-success';
                            } elseif ($model->payment_status === Order::PAYMENT_STATUS_COD) {
                                $class = 'label-warning';
                            } elseif ($model->payment_status === Order::PAYMENT_STATUS_UNPAID) {
                                $class = 'label-danger';
                            } else {
                                $class = 'label-info';
                            }

                            return '<span class="label ' . $class . '">' . ($model->payment_status ? Order::getPaymentStatusLabels($model->payment_status) : '-') . '</span>';
                        },
                    ],
                    [
                        'attribute' => 'shipment_status',
                        'format'    => 'html',
                        'value'     => function ($model) {
                            if ($model->shipment_status === Order::SHIPMENT_STATUS_RECEIVED) {
                                $class = 'label-success';
                            } elseif ($model->shipment_status === Order::SHIPMENT_STATUS_SHIPPED) {
                                $class = 'label-warning';
                            } elseif ($model->shipment_status === Order::SHIPMENT_STATUS_PREPARING) {
                                $class = 'label-danger';
                            } else {
                                $class = 'label-info';
                            }

                            return '<span class="label ' . $class . '">' . ($model->shipment_status ? Order::getShipmentStatusLabels($model->shipment_status) : '无') . '</span>';
                        },
                    ],
                    'amount',
                    [
                        'attribute' => 'status',
                        'format'    => 'html',
                        'value'     => function ($model) {
                            if ($model->status === Order::SHIPMENT_STATUS_RECEIVED) {
                                $class = 'label-success';
                            } elseif ($model->status === Order::PAYMENT_STATUS_UNPAID) {
                                $class = 'label-warning';
                            } elseif ($model->status === Order::STATUS_CANCEL || $model->status === Order::STATUS_DELETED) {
                                $class = 'label-danger';
                            } else {
                                $class = 'label-info';
                            }
                            return '<span class="label ' . $class . '">' . Order::getStatusLabels($model->status) . '</span>';
                        },
                    ],
                    [
                        'attribute' => 'created_at',
                        'contentOptions' => ['class' => 'text-center'],
                        'headerOptions' => ['class' => 'col-th-13'],
                        'content'   => function ($model) {
                            return date('Y:m:d H:i:s', $model->created_at);
                        }
                    ],
                    [
                        'class' => 'yii\grid\ActionColumn',
                        'contentOptions' => ['class' => 'text-center'],
                        'headerOptions' => ['class' => 'col-th-9'],
                        'template' => ' {update} {view} {delete}',
                        'buttons' => [
                            'delete' => function ($url, $model) {
                                return (Html::a('<span class="glyphicon glyphicon-trash m-l-sm"></span>',
                                    $url, [
                                        //'class' => 'ajaxDelete',
                                        'title' => Yii::t('app', 'Delete'),
                                        'data-url' => $url
                                    ])
                                );
                            },
                            'update' => function ($url, $model) {
                                return (
                                Html::a('<span class="glyphicon glyphicon-pencil m-r-sm"></span>',
                                    $url, [
                                        'ui-target' => '#animate',
                                        'title' => Yii::t('app', 'Update'),
                                        'data-url' => $url
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

