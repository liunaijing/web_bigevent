$(function() {
    getUserInfo()

    var layer = layui.layer

    // 退出登录功能
    $('#btnOut').on('click', function() {
            layer.confirm('确定退出登录', { icon: 3, title: '提示' }, function(index) {
                //do something
                // 清空本地存储的token
                // localStorage.removeItem('token')
                // 重新跳转到登录页
                location.href = '/login.html'
                    // 关闭弹窗
                layer.close(index);


            });
        })
        //获取用户的基本信息
    function getUserInfo() {
        // $.ajax({
        //     method: 'GET',
        //     url: '/myuserunfo',
        //     // Headers 就是请求头配置对象
        //     Headers: {
        //         Authorization: localStorage.getItem('token') || ''
        //     },
        //     success: function(res) {
        //        if(res.status!=0){
        // return layui.layer.msg('获取用户信息失败！')
        // }
        res = {
            data: {
                nickname: 'liu',
                username: 'ing',
                // userpic: 'assets/images/11.jpg'
            }
        }
        renderAvatar(res.data)
            //     }
            //     // 无论请求失败还是成功都会调用complete回调函数
            //     // complete: function(res) {
            //     // 在complete回调函数中 可以使用res.responseJSON拿到服务器响应回来的数据
            // if (res.responseJSON.status === 1 && res.responseJSON.message === '身份验证失败！') {
            //     // 1.强制清空token 
            //     localStorage.removeItem('token')
            //         // 2.强制跳转登录页面
            //     location.href = '/login.html'
            // }
            // }
            // })
    }
    // 渲染用户的头像信息
    function renderAvatar(user) {
        // 1.获取用户的昵称
        var name = user.nickname || user.name
            // 2.设置欢迎的文本
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
            // 3.按需渲染头像
        if (user.userpic != null) {
            // 3.1渲染图片头像
            $('.layui-nav-img').attr('src', user.userpic).show()
            $('.text-avatar').hide()
        } else {
            // 3.2渲染文本头像
            $('.layui-nav-img').hide()
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first)
        }
    }
    3.
})