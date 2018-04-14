<?php
/**
 *                             _ooOoo_
 *                            o8888888o
 *                            88" . "88
 *                            (| -_- |)
 *                            O\  =  /O
 *                         ____/`---'\____
 *                       .'  \\|     |//  `.
 *                      /  \\|||  :  |||//  \
 *                     /  _||||| -:- |||||-  \
 *                     |   | \\\  -  /// |   |
 *                     | \_|  ''\---/''  |   |
 *                     \  .-\__  `-`  ___/-. /
 *                   ___`. .'  /--.--\  `. . __
 *                ."" '<  `.___\_<|>_/___.'  >'"".
 *               | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *               \  \ `-.   \_ __\ /__ _/   .-` /  /
 *          ======`-.____`-.___\_____/___.-`____.-'======
 *                             `=---='
 *          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *                     佛祖保佑        永无BUG
 *            佛曰:
 *                   写字楼里写字间，写字间里程序员；
 *                   程序人员写程序，又拿程序换酒钱。
 *                   酒醒只在网上坐，酒醉还来网下眠；
 *                   酒醉酒醒日复日，网上网下年复年。
 *                   但愿老死电脑间，不愿鞠躬老板前；
 *                   奔驰宝马贵者趣，公交自行程序员。
 *                   别人笑我忒疯癫，我笑自己命太贱；
 *                   不见满街漂亮妹，哪个归得程序员？
 *
 *            Created by PhpStorm.
 *            User: ouyangjiang
 *            Date: 2018/4/14
 *            Time: 20:12
 */




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


<div class="product-index">

    <?php // echo $this->render('_search', ['model' => $searchModel]);?>

<p>
    <?= Html::a(Yii::t('app', 'Create ') . Yii::t('app', 'Product'), ['create'], ['class' => 'btn btn-success']) ?>
    <?= Html::a(Yii::t('app', 'Batch ') . Yii::t('app', 'Delete'), '#', ['class' => 'btn btn-danger', 'id' => 'batchDelete']) ?>
</p>

<?= GridView::widget([
    'dataProvider' => $dataProvider,
    'filterModel'  => $searchModel,
    'columns'      => [
        ['class' => 'yii\grid\CheckboxColumn'],

        'id',
        [
            'attribute' => 'category_id',
            'value'     => function ($model) {
                return $model->category->name;
            },
            'filter' => Html::activeDropDownList(
                $searchModel,
                'category_id',
                ArrayHelper::map(Category::get(0, Category::find()->asArray()->all()), 'id', 'label'),
                ['class' => 'form-control', 'prompt' => Yii::t('app', 'Please Filter')]
            ),
        ],
        'name',
        'sku',
        'stock',
        // 'weight',
        'market_price',
        'price',
        // 'brief',
        // 'content:ntext',
        // 'thumb',
        // 'image',
        // 'origin',
        // 'keywords',
        // 'description:ntext',
        [
            'attribute' => 'type',
            'format'    => 'html',
            'value'     => function ($model) {
                return \common\models\ProductType::labels($model->type);
            },
            /*'filter' => Html::activeDropDownList(
                $searchModel,
                'type',
                YesNo::labels(),
                ['class' => 'form-control', 'prompt' => Yii::t('app', 'Please Filter')]
            )*/
        ],
        [
            'attribute' => 'brand_id',
            'value'     => function ($model) {
                return $model->brand ? $model->brand->name : '-';
            },
            'filter' => Html::activeDropDownList(
                $searchModel,
                'type',
                ArrayHelper::map(\common\models\Brand::find()->all(), 'id', 'name'),
                ['class' => 'form-control', 'prompt' => Yii::t('app', 'Please Filter')]
            )
        ],
        [
            'attribute' => 'status',
            'format'    => 'html',
            'value'     => function ($model) {
                if ($model->status === Status::STATUS_ACTIVE) {
                    $class = 'label-success';
                } elseif ($model->status === Status::STATUS_INACTIVE) {
                    $class = 'label-warning';
                } else {
                    $class = 'label-danger';
                }

                return '<span class="label ' . $class . '">' . Status::labels($model->status) . '</span>';
            },
            'filter' => Html::activeDropDownList(
                $searchModel,
                'status',
                Status::labels(),
                ['class' => 'form-control', 'prompt' => Yii::t('app', 'PROMPT_STATUS')]
            )
        ],

        'created_at:date',
        // 'updated_at',
        // 'created_by',
        // 'updated_by',

        ['class' => 'yii\grid\ActionColumn'],
    ],
]); ?>

</div>