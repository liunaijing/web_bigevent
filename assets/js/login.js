$(function() {
    // 点击去注册账号的链接
    $('#linkReg').on('click', function() {

        $('.login-box').hide()
        $('.reg-box').show()

    })

    // 点击去登录账号的链接
    $('#linkLogin').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从lay 中获取form对象
    var form = layui.form
    var layer = layui.layer
        // 通过form verify()函数自定义验证规则
    form.verify({
        // 自定义pwd 校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致
        repwd: function(value) {
            // 通过形参拿到的是确认密码框的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            var pwd = $('.reg-box [name=password]').val()

            if (pwd != value) {

                return '两次密码不一致'
            }
        }
    })

    //监听注册表单的提交事件
    $('#formReg').on('submit', function(e) {
        // 阻止默认的提交行为
        e.preventDefault()
        var data = {
                username: $('#formReg [name=username]').val(),
                password: $('#formReg [name=password]').val()
            }
            // $.post('/reguser1', data, function(res) {
            // if (res.status !== 0) {
            // return layer.msg(res.message)
            // }
        layer.msg('注册成功');
        // 模拟人的点击行为
        $('#linkLogin').click()

        // })
    })

    // 监听登录表单的提交事件
    $('#formLogin').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
            // $.ajax({
            //     url: '/login',
            //     method: 'POST',
            //     data: $(this).serialize(),
            //     success: function(res) {
            //         if (res.status !== 0) {
            //             return layer.msg('登录失败')
            //         }
        layer.msg('登录成功！')
            // 将登录成功得到的token 字符串 保存到localStorage中
            // localStorage.setItem('token', res.token)
            // 跳转到后台主页
        location.href = '/index.html'
            //     }
            // })
    })
})