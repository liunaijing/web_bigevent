// 每次调用$.get() $.post() $.ajax()的时候 会先调用ajaxPrefilter这个函数
$.ajaxPrefilter(function(option) {
    console.log(option.url);
    // 在发起真正的ajax请求前 统一拼接请求根路径
    option.url = 'http://ajax.frontend.itheima.net' + option
})