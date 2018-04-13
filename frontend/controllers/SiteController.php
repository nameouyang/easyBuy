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

use common\models\Product;
use common\models\Profile;
use frontend\models\ChangePasswordForm;
use Yii;
use common\models\LoginForm;
use frontend\models\PasswordResetRequestForm;
use frontend\models\ResetPasswordForm;
use frontend\models\SignupForm;
use frontend\models\ContactForm;
use yii\base\InvalidParamException;
use yii\web\BadRequestHttpException;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;

/**
 * Site controller
 */
class SiteController extends \frontend\components\Controller
{
    public $layout = 'site';
    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['logout', 'signup', 'change-password', 'get-email-code'],
                'rules' => [
                    [
                        'actions' => ['signup', 'get-email-code'],
                        'allow' => true,
                        'roles' => ['?'],
                    ],
                    [
                        'actions' => ['logout', 'change-password', 'get-email-code'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            /*'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post'],
                ],
            ],*/
        ];
    }

    /**
     * @inheritdoc
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    public function actionIndex()
    {
         /*$source = Yii::$app->redis->set('var1','asdasd');
         $source = Yii::$app->redis->get('var1');
         var_dump($source);die;*/
        $this->layout = 'main';
        $products = Product::find()->orderBy(['created_at' => SORT_DESC])->orderBy('created_at', 'desc')->limit(6)->all();
        return $this->render('index', [
            'products' => $products,
        ]);
    }

    public function actionLogin()
    {
        if (!\Yii::$app->user->isGuest) {
            return $this->goHome();
        }

        if (Yii::$app->request->get('returnUrl')) {
            Yii::$app->user->setReturnUrl(Yii::$app->request->get('returnUrl'));
        }

        $model = new LoginForm();
        if ($model->load(Yii::$app->request->post()) && $model->login()) {
            return $this->goBack();
        } else {
            return $this->render('login', [
                'model' => $model,
            ]);
        }
    }

    public function actionLogout()
    {
        Yii::$app->user->logout();

        return $this->goHome();
    }

    public function actionContact()
    {
        $model = new ContactForm();
        if ($model->load(Yii::$app->request->post()) && $model->validate()) {
            if ($model->sendEmail(Yii::$app->params['adminEmail'])) {
                Yii::$app->session->setFlash('success', 'Thank you for contacting us. We will respond to you as soon as possible.');
            } else {
                Yii::$app->session->setFlash('error', 'There was an error sending email.');
            }

            return $this->refresh();
        } else {
            return $this->render('contact', [
                'model' => $model,
            ]);
        }
    }

    public function actionAbout()
    {
        return $this->render('about');
    }

    /**
     * 注册
    */
    public function actionSignup()
    {
        $model = new SignupForm();
        //$post = Yii::$app->request->post();
        if ($model->load(Yii::$app->request->post())) {
            if ($user = $model->signup()) {
                /*if (Yii::$app->getUser()->login($user)) {
                    //return $this->goHome();
                }*/
                Yii::$app->getUser()->login($user);
                self::json(200, '注册成功', []);
            } else {
                $errors = $model->getErrors();
                $errData = '';

                foreach ($errors as $error) {
                    foreach ($error as $data) {
                        $errData .= $data . '   ';
                    }
                }
                self::json(1001, '注册失败' , ['data'=>$errData]);
            }
        }

        return $this->render('signup', [
            'model' => $model,
        ]);
    }

    public function actionRequestPasswordReset()
    {
        $model = new PasswordResetRequestForm();
        if ($model->load(Yii::$app->request->post()) && $model->validate()) {
            if ($model->sendEmail()) {
                Yii::$app->getSession()->setFlash('success', Yii::t('app', 'Check your email for further instructions.'));

                //return $this->goHome();
            } else {
                Yii::$app->getSession()->setFlash('error', Yii::t('app', 'Sorry, we are unable to reset password for email provided.'));
            }
        }

        return $this->render('requestPasswordResetToken', [
            'model' => $model,
        ]);
    }

    public function actionResetPassword($token)
    {
        try {
            $model = new ResetPasswordForm($token);
        } catch (InvalidParamException $e) {
            throw new BadRequestHttpException($e->getMessage());
        }

        if ($model->load(Yii::$app->request->post()) && $model->validate() && $model->resetPassword()) {
            Yii::$app->getSession()->setFlash('success', Yii::t('app', 'New password was saved.'));

            return $this->goHome();
        }

        return $this->render('resetPassword', [
            'model' => $model,
        ]);
    }

    public function actionChangePassword()
    {
        try {
            $model = new ChangePasswordForm();
        } catch (InvalidParamException $e) {
            throw new BadRequestHttpException($e->getMessage());
        }

        if ($model->load(Yii::$app->request->post()) && $model->validate() && $model->changePassword()) {
            Yii::$app->getSession()->setFlash('success', Yii::t('app', 'New password was saved.'));

            return $this->goHome();
        }

        return $this->render('changePassword', [
            'model' => $model,
        ]);
    }

    public function actionProfile()
    {
        $model = Profile::findOne(['user_id' => Yii::$app->user->id]);
        if (!$model) {
            $model = new Profile();
            $model->user_id = Yii::$app->user->id;
        }

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            Yii::$app->getSession()->setFlash('success', Yii::t('app', 'New password was saved.'));

            return $this->goHome();
        }

        return $this->render('profile', [
            'model' => $model,
        ]);
    }

    public function actionLoginInfo()
    {
        if (Yii::$app->user->isGuest) {
            return json_encode(['login' => 0]);
        } else {
            return json_encode([
                "login" => 1,
                'name' => Yii::$app->user->identity->username,
            ]);
        }
    }

    /**
     * 发送验证码到邮箱
    */
    public function actionGetEmailCode()
    {
        if ($post = Yii::$app->request->post()) {
            $email = $post['email'];
            $code = rand(100000, 999999);
            PasswordResetRequestForm::sendEmailCode($email, $code);
            self::json(200, 'success', ['code'=>$code]);
        } else {
            self::json(1001, 'error', []);
        }
    }

    public function actionTest()
    {
        $index = 'test';
        var_dump($index);

    }

    /**
     * ajax请求返回json数据
    */
    public static function json($code, $msg= '', $data = [])
    {
        $response = ['code' => $code, 'msg'=> $msg, 'data' => $data];
        header('Content-type: application/json;charset=utf-8');
        echo(json_encode($response, JSON_UNESCAPED_UNICODE)); //unicode不转码
        exit;
    }
}
