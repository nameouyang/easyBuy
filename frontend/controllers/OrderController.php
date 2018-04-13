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
 */

namespace frontend\controllers;

use common\models\OrderLog;
use common\models\OrderProduct;
use common\models\Product;
use Yii;
use common\models\Order;
use yii\web\Response;
use yii\data\ActiveDataProvider;
use yii\filters\AccessControl;
use yii\web\NotFoundHttpException;

class OrderController extends \frontend\components\Controller
{
    public $layout = 'column2';

    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'rules' => [
                    [
                        'allow' => true,
                        'roles' => ['@']
                    ]
                ]
            ],
        ];
    }

    public function actionIndex()
    {
        $status = [];
        if (Yii::$app->request->get('status')) {
            $status = Yii::$app->request->get('status');
            if (strpos($status, ',')) {
                $status = explode( ',', $status);
            }
            $query = Order::find()->where(['user_id' => Yii::$app->user->id, 'status' => $status]);
        } elseif (Yii::$app->request->get('sn')) {
            $query = Order::find()->where(['sn' => Yii::$app->request->get('sn')]);
        } else {
            $query = Order::find()->where(['and', 'user_id=' . Yii::$app->user->id, 'status > ' . Order::STATUS_DELETED]);
        }
        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'pagination' => ['defaultPageSize' => Yii::$app->params['defaultPageSizeOrder']],
            'sort' => ['defaultOrder' => ['created_at' => SORT_DESC]],
        ]);

        if (!is_array($status)) {
            $status = [$status];
        }
        return $this->render('index', [
            'orders' => $dataProvider->getModels(),
            'pagination' => $dataProvider->pagination,
            'status' => $status,
        ]);
    }

    public function actionView($id)
    {
        $this->layout = 'cart';
        return $this->render('view', [
            'model' => $this->findModel($id),
        ]);
    }

    public function actionAjaxStatus($id, $status)
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $model= $this->findModel($id);

        if ($model) {
            $oldStatus = $model->status;
            $model->status = $status;
            $model->save();

            // 记录订单日志
            $orderLog = new OrderLog([
                'order_id' => $model->id,
                'status' => $model->status,
            ]);
            $orderLog->save();

            // 如果订单为取消，则恢复对应的库存
            if ($oldStatus > 0 && $status == Order::STATUS_CANCEL) {
                $orderProducts = OrderProduct::find()->where(['order_id' => $model->id])->all();
                foreach ($orderProducts as $product) {
                    Product::updateAllCounters(['stock' => $product->number], ['id' => $product->product_id]);
                }
            }

            return [
                'status' => 1,
            ];
        }
        return [
            'status' => -1,
        ];
    }

    /**
     * Finds the Category model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param integer $id
     * @return Category the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = Order::findOne($id)) !== null) {
            return $model;
        } else {
            throw new NotFoundHttpException('The requested page does not exist.');
        }
    }

}
