<?php
return [
    'adminEmail' => 'admin@example.com',
    'supportEmail' => 'support@example.com',
    'user.passwordResetTokenExpire' => 3600,

    'alipay' => [
        //应用ID,您的APPID。
        'app_id' => "2016091100483937",

        //商户私钥
        'merchant_private_key' => "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/18jif+JkdlO1fmc52nq3FARSyta5QjT+e+NdXKANa5K2Y5e2HBX41eLdRlZbFa7P851lUbCZejay2a8m4nYhk+ivi+RRVhSYqdMCAN6tJsuq5jgt6QChRN9Z8v3NDfAaNZYvBMcUcqrvkGs+NDbZZHkL4GvNvXVPSLq4TABryQkygrf5ye2brjdMl1Jl78VKIaO/oLOGOhFEW0wLn/aQB2OOgkpPIoKEXYEjVbj09xJZik/MrJ2/9W8A9hKl0xdH34i3g+hP3cqqTMdscj4l8mlcdg/6xv2KavmdpTFqsQc38pn1ZOYEBdi0fqH2qxrlXJkxyeb8Jwa+416r7RqfAgMBAAECggEADM9Dwpv3ae3cuQmvqtVDzGWxxDV3EPeywitTizBcH4lHSpZr0uUdMnhVpaDEs2BHQ+toXxONTzIx5M9UOqx0ZtmRd+dHX4b36Rmt1TxpofYtM0QcDDS6rgoDP+ZRvBdqKNXbKViQUnU1pLln78dcwjdLPdfGWv6Djr+0eAnbHVc5XISpLw9Lianifv/pX1t/8rf306A4MYP2NNq8GdADlPokFLyePyy2IDCwX+s3i9XSv/OQhd7n0LOUHbUaRm8L928JwkpeiZBhrPl6rAZxjzqfQ/KWmeBxQRm54e4fWxl58Bo82ACOgVl4gaTq14qsrTdEDR2Q/D43BuHk9QrzwQKBgQD172ksZKehz1LvTDKFGHLYGs+7I211cn1jVAi60L61apa++ElTZrRs2qQqFWSwMR4+cTpN0RG5IMGIgvQZkIvG6Ry/pv0y27xjR6qDQWa+6gW/atGjfGI/B3VbD3o0dm8EY0nYu+G8mwHQ3U2rTcGwRCRtmBiGm2oJ8b2VWKe6VQKBgQDHsapLP3Xq3VsJtG+LWz5BD/fm/vJvHcpEluDJH/Z3nHJz+s2dw8CcoV6Desbx41t8DWI7drly60oVN7w9rF4bGzEqVRTvQaYg3vBxtfpScQhdRj4/xZYrd42MFtNlP47wBJ6jJCLW7e5kyrSt25oTljmADan/3M6UmwRVUlcdIwKBgFPjxXlqIDA2uzB7SmRSEaKbiq5oCEdetVyzZoLq/5J8eE1N/h0f1H2pGwRr5bugFZPxJZUzspr2jG2XVdJ+lt9T1wWc3ZOClsE6yfQZ1AVdaHaB5l6g6BZd4e8c2W+Z0oapo5/1fqvKKBVp17uOO3p31AE6N2t7CfG4bxXJdvU9AoGBAJJYrQG6f1NhZ9+D4Z9Sfhw2dKpQOyGdxmdf31rmVr0v5V0D9/5fwF/JjzdyGiyZP6l5MX18s8n5j3BfSVA1az4YPn7UnaP+C57ZY4MiJ1KVzdh1qxcXWcd/NTfuXnw8CSfzasMKr5GuC2DIgYNMhe1G0dr7qJN/odGcjZ9t2bPbAoGAdXkM0xVKo9l+TRrchhOj0wKdV0R6iFI+Zurq/Nlv29w1AHOxyWpVdK2FlgnxwEsTbCLtnItMpsfLMt8cu393UenwisYg4nmcvz4Q4ftB5ez6G4y+H3FeKFh1nlRZGvS1N4VUGC7itk3Q/PydupWx6J1PXZgICRrs24AVF2kEZLM=",

        //异步通知地址
        //'notify_url' => "http://10.154.63.206/alipay.trade.page.pay-PHP-UTF-8/notify_url.php",
        'notify_url' => "http://www.ouyangj.cn/",
//123.207.179.223
        //同步跳转
        //'return_url' => "http://10.154.63.206/alipay.trade.page.pay-PHP-UTF-8/return_url.php",
        'return_url' => "http://www.ouyangj.cn/",

        //编码格式
        'charset' => "UTF-8",

        //签名方式
        'sign_type'=>"RSA2",

        //支付宝网关
        //'gatewayUrl' => "https://openapi.alipay.com/gateway.do",
        'gatewayUrl' => "https://openapi.alipaydev.com/gateway.do",

        //支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
        'alipay_public_key' => "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwLcpydySW6kaWwOzQTxPf3mWZyLWP+YVGKzYDP6ytD9sRekon/fXjW9BEuD3fggkCIjvy9FoPX3zxs4z0W0CdtllG/BJlWRniiy8Gc2y/oYQkTzkrfk1MKQaIBetjXMOhRal9uEHA7cyzITdpekMWtiddcwKda1QVYrCZZrq4YX9Rw+nwYKwoLTqxH6LdokG/MuJ1pcP3c9z6WpE70t7tI+wJw0yCDpe4HpVk9FQJdk53RwyNtNpPldTd89PuatxdpOr4Gytkirn+vlY18rr9IrqxvCVoryZKV+NDwrC9Q0FLRPLcY0SoPtuT6f7wHy0gTTWeFvauU8woGJcI7TKSQIDAQAB",
    ],
];
