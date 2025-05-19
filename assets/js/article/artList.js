$(function() {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage;
    // 定义补零的函数
    function padZero(n) {
        n > 9 ? n : '0' + n
    }
    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义一个查询的参数对象，将来请求数据的时候 需要将请求参数对象提交到服务器
    var q = {
        pagenum: 1, //页码值，默认请求第一页的数据
        pagesize: 2, //每页显示几条数据 默认每页显示2条
        cata_id: '', //文章分类的id
        state: '' //文章的发布状态
    }
    initTable()
    initCate()

    function initTable() {
        // $.ajax({
        //     method: 'GET',
        //     url: 'url',
        //     data: q,
        //     success: function(res) {
        //         if (res.status !== 0) {
        //             return layer.msg('获取文章列表失败！')
        //         }
        // 使用模板引擎渲染数据
        res = {
            data: [{
                title: '1',
                cat_name: 'haa',
                pub_date: '2019/1/23',
                state: 'true'
            }, {
                title: '2',
                cat_name: 'haa',
                pub_date: '2019/3/7',
                state: 'true'
            }, {
                title: '3',
                cat_name: 'haa',
                pub_date: '2019/3/7',
                state: 'true'
            }],
            total: 3
        }
        var htmlStr = template('tplTable', res)
        $('tbody').html(htmlStr)
            // 调用渲染分页的方法
        renderPage(res.total)
            //         }
            //     })
    }

    //初始化文章分类的方法
    function initCate() {
        // $.ajax({
        //     method: "GET",
        //     url: "url",
        //     success: function() {
        //         if (res.status !== 0) {
        //             return layer.msg('获取分类数据失败！')
        //         }
        //调用模板引擎分类的可选项
        res = {
            data: [{ id: 1, name: 'one' }, { id: 2, name: 'two' }]
        }
        var htmlStr = template('tplCate', res)

        $('[name=cate_id]').html(htmlStr) //layui检测不到 要重新渲染表单区域
        form.render()
            //     }
            // })
    }
    // 为筛选表单绑定 submit事件
    $('#form-search').on('submit', function(e) {
        e.preventDefault()
            // 获取表单中选中的值
        var cate_id = $('[name=cate_id').val()
        var state = $('[name=state]').val()
            // 为查询参数对象 q 中对应的属性赋值
        q.cata_id = cate_id
        q.state = state
            // 根据最新的筛选条件 重新渲染表格的数据
        initTable()
    })

    // 定义渲染分类的方法
    function renderPage(total) {
        // 调用laypage.render()渲染数据
        laypage.render({
            elem: 'pageBox', //分页容器的id
            count: total, //总数据条数
            limit: q.pagesize, //每页显示几条数据
            curr: q.pagenum, //设置被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 分页发生切换的时候 触发jump回调
            // 触发jump回调有两种方式：
            // 1.点击页码的时候 会触发jump回调 first是undefined
            // 2.只要调用了laypage.render()方法 就会触发jump回调 first是true
            jump: function(obj, first) {
                // 可以通过first的值来判断是哪种方式触发的jump 回调
                // console.log(obj.curr); //拿到最新的页码值
                q.pagenum = obj.curr //最新的页码值赋值到q查询参数中
                    // 把最新的条目数 赋值到q这个查询参数对象的pagesize属性中
                q.pagesize = obj.limit
                    //根据最新的q 获取对应的数据 并渲染
                if (!first) {
                    initTable()
                }
            }
        })
    }

    // 通过代理的形式为删除按钮 绑定点击事件处理
    $('tbody').on('click', '.btn-delete', function() {
        // 获取删除按钮的个数
        var len = $('.btn-delete').length
        console.log(len);

        // 自定义属性的方式 拿到id
        var id = $(this).attr('data-id')
            //询问 是否要删除数据
        layer.confirm('确认删除', { icon: 3, title: '提示' }, function(index) {
            //do something
            // $.ajax({
            //     method: 'GET',
            //     url: '/delete' + id,
            //     success: function(res) {
            //         if (res.status !== 0) {
            //             return layer.msg('删除文章失败！')
            //         }
            //         layer.msg('删除文章成功！')
            // 当数据删除完成后 需要判断这一页中 是否还有剩余的数据
            // 如果没有剩余的数据  则让页码值-1 之后 再重新调用initTable()
            if (len === 1) {
                //    len等于1 删除后页面上没有任何数据
                // 页码值最小是1
                q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
            }
            initTable()
                //     }
                // })
            layer.close(index);
        });

    })
})