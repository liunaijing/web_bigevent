// 每次调用$.get() $.post() $.ajax()的时候 会先调用ajaxPrefilter这个函数
$.ajaxPrefilter(function(option) {
    console.log(option.url);
    // 在发起真正的ajax请求前 统一拼接请求根路径
    option.url = 'http://ajax.frontend.itheima.net' + option.url
        // 统一为有权限的接口 设置headers请求头
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Headers: {
                Authorization: localStorage.getItem('token') || ''
            }
        }

    }
    // 全局统一挂在complete 回调函数
    option.complete = function(res) {
        // 无论请求失败还是成功都会调用complete回调函数
        // complete: function(res) {
        // 在complete回调函数中 可以使用res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份验证失败！') {
            // 1.强制清空token 
            localStorage.removeItem('token')
                // 2.强制跳转登录页面
            location.href = '/login.html'
        }
    }

})