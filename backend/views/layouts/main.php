<?php
use backend\assets\AppAsset;
use yii\helpers\Html;
use yii\widgets\Breadcrumbs;
use frontend\widgets\Alert;

/* @var $this \yii\web\View */
/* @var $content string */

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
</head>
<body>
    <?php $this->beginBody() ?>
    <div class="wrap">
        <?= $this->render('//layouts/top-menu.php') ?>

        <div class="container">
            <section class="content-header">
                <h1><?= $this->title ?></h1>
                <?= Breadcrumbs::widget([
                    'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
                ]) ?>
            </section>
            <?= Alert::widget() ?>
            <section class="content">
                <?= $content ?>
            </section>
        </div>
    </div>

    <footer class="footer">
        <div class="container">
            <p class="pull-left">&copy; Easy Buy <?= date('Y') ?></p>
            <p class="pull-right"><?/*= Yii::powered() */?>
                Copyright <?= date('Y') ?>, 辽宁省大连市大连民族大学  备案号：<a href="http://www.miitbeian.gov.cn" target="_blank" rel="nofollow">辽ICP备17018620号</a>
            </p>
        </div>
    </footer>


    <?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
