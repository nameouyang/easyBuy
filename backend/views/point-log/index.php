<?php

use yii\helpers\Html;
use yii\grid\GridView;
use yii\helpers\ArrayHelper;
use common\models\PointLog;
use yii\helpers\Url;
use yii\widgets\Breadcrumbs;
use yii\widgets\Pjax;

/* @var $this yii\web\View */
/* @var $searchModel common\models\PointLogSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = Yii::t('app', 'Point Logs');
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
                <?= Html::a(Yii::t('app', 'Create ') . Yii::t('app', 'Point Log'), ['create'], [
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
                        'class' => 'yii\grid\SerialColumn',
                        'header'=>'序号',
                    ],

                    [
                        'attribute' => 'user_id',
                        'contentOptions' => ['class' => 'text-center'],
                    ],

                    [
                        'attribute' => 'user_id',
                        'header'    => Yii::t('app', 'User Name'),
                        'contentOptions' => ['class' => 'text-center'],
                        'value'=>function ($model) {
                            return $model->user ? $model->user->username : '-';
                        },
                    ],
                    [
                        'attribute' => 'type',
                        'contentOptions' => ['class' => 'text-center'],
                        'format' => 'html',
                        'value' => function ($model) {
                            if ($model->type === PointLog::POINT_TYPE_BOUGHT) {
                                $class = 'label-success';
                            } elseif ($model->type === PointLog::POINT_TYPE_COMMENT) {
                                $class = 'label-warning';
                            } else {
                                $class = 'label-danger';
                            }

                            return '<span class="label ' . $class . '">' . PointLog::getTypeLabels($model->type) . '</span>';
                        },
                    ],
                    [
                        'attribute' => 'point',
                        'headerOptions'  => ['class' => 'text-left'],
                    ],
                    [
                        'attribute'      => 'remark',
                        'headerOptions'  => ['class' => 'col-th-15 text-left'],
                        'contentOptions' => function ($model) {
                            return ['class'   => 'name-15 text-left',
                                'data-toggle' => 'tooltip',
                                'title'       => Html::encode($model->remark),
                                'style'       => 'max-width: 15rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;'
                            ];
                        },

                    ],
                    [
                        'attribute' => 'balance',
                        'headerOptions'  => ['class' => 'text-left'],
                    ],

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

