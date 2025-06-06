$(function() {

    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须要在6~12个字符中间'
            }
        }
    })
    initUserInfo()
        // 初始化用户的基本信息
    function initUserInfo() {
        // $.ajax({
        //     method: 'GET',
        //     url: '/my/userinfo',
        //     success: function(res) {
        //         if (res.status !== 0) {
        //             return layer.msg('获取用户信息失败！')
        //         }
        // 调用form.val()快速为表单赋值
        var res = {
            data: {
                "username": 'ing',
                "nickname": 'iiu',
                "email": '2590@qq.com'
            }
        }
        form.val('formUserInfo', res.data)
            //     }
            // })
    }

    // 重置表单的数据
    $('#btnReset').on('click', function(e) {
        // 阻止表单默认的重置行为
        e.preventDefault()
        initUserInfo()
    })

    // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止表单默认的提交行为
        e.preventDefault()
            // 发起ajax请求
            // $.ajax({
            //     method: 'POST',
            //     url: 'url',
            //     data: $(this).serialize(),
            //     success: function(res) {
            //         if (res.status !== 0) {
            //             return layer.msg('更新用户信息失败！')
            //         }
            //
        layer.msg('更新用户信息成功！')
            // 调用父页面中的方法重新渲染子页面的信息
        window.parent.getUserInfo()
            // }
            // })
    })
})