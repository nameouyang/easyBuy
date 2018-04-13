<?php
namespace frontend\models;

use yii\base\Model;
use Yii;

/**
 * Password reset request form
 */
class PasswordResetRequestForm extends Model
{
    public $email;

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            ['email', 'filter', 'filter' => 'trim'],
            ['email', 'required'],
            ['email', 'email'],
            ['email', 'exist',
                'targetClass' => '\common\models\User',
                'filter' => ['status' => User::STATUS_ACTIVE],
                'message' => Yii::t('app', 'There is no user with such email.')
            ],
        ];
    }

    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'username' => Yii::t('app', 'Username'),
            'password' => Yii::t('app', 'Password'),
            'repassword' => Yii::t('app', 'Repassword'),
            'email' => Yii::t('app', 'Email'),
            'role' => Yii::t('app', 'Role'),
            'status' => Yii::t('app', 'Status'),
            'created_at' => Yii::t('app', 'Created At'),
            'updated_at' => Yii::t('app', 'Updated At'),
            'create_user_id' => Yii::t('app', 'Create User Id'),
            'update_user_id' => Yii::t('app', 'Update User Id'),
        ];
    }

    /**
     * Sends an email with a link, for resetting the password.
     *
     * @return boolean whether the email was send
     */
    public function sendEmail()
    {
        /* @var $user User */
        $user = User::findOne([
            'status' => User::STATUS_ACTIVE,
            'email' => $this->email,
        ]);

        if ($user) {
            if (!User::isPasswordResetTokenValid($user->password_reset_token)) {
                $user->generatePasswordResetToken();
            }


            if ($user->save()) {
                // return \Yii::$app->mailer->compose('passwordResetToken', ['user' => $user])
                //     ->setFrom([\Yii::$app->params['supportEmail'] => \Yii::$app->name . ' robot'])
                //     //->setTo($this->email)
                //     ->setTo('990233513@qq.com')
                //     ->setSubject('Password reset for ' . \Yii::$app->name)
                //     ->send();
                return Yii::$app->mailer->compose('passwordResetToken', ['user' => $user])
                    ->setFrom(['804572454@qq.com'=>'change password']) //和上面的from字段相对应  可以只写一个
//                    ->setTo('804572454@qq.com')
                    ->setTo($this->email)
                    ->setSubject('Password reset for ' . \Yii::$app->name)
                    //->setTextBody('test')  //如果不在compose中加内容的话， 就要设置改选项
                    ->send();

            }
        }

        return false;
    }

    public static function sendEmailCode($email, $code)
    {

        return Yii::$app->mailer->compose()
            ->setFrom(['804572454@qq.com'=>'easyBuy 验证码']) //和上面的from字段相对应  可以只写一个
//                    ->setTo('804572454@qq.com')
            ->setTo($email)
            ->setSubject('easyBuy 验证码')
            ->setTextBody('您的验证码为：' . $code)  //如果不在compose中加内容的话， 就要设置改选项
            ->send();
    }
}
