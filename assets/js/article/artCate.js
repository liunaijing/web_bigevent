$(function() {
    var layer = layui.layer
    var form = layui.form
    initArtCateList()

    function initArtCateList() {
        // $.ajax({
        //     method: 'GET',
        //     url: 'url',
        //     success: function (res) {
        //         console.log(res);
        res = {
            data: [
                { name: 'a', time: '19', id: 1 },
                { name: 'b', time: '80', id: 2 }
            ]
        }
        var htmlStr = template('tplTable', res)
        $('tbody').html(htmlStr)
            //     }
            // })
    }

    var indexAdd = null;

    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章列表',
            content: $('#dialogAdd').html(),

        })
    })

    // 通过代理的形式，为 formAdd 表单绑定 submit 事件
    $('body').on('submit', '#formAdd', function(e) {
        e.preventDefault();
        // $.ajax({
        //     method: 'POST',
        //     url: '',
        //     data: $(this).serialize(),
        //     success: function(res) {
        //         if (res.status !== 0) {
        //             return layer.msg('新增分类失败！')
        //         }
        //         initArtCateList()
        layer.msg('新增分类成功！')
            // 根据索引关闭对应的弹出层
        layer.close(indexAdd)
            //     }
            // })

    })

    // 通过代理的形式，为btn-edit按钮绑定点击事件
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function() {
            indexEdit = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '添加文章列表',
                content: $('#dialogEdit').html(),
            })
            var id = $(this).attr('data-id')
            console.log(id);
            //发起请求获取对应的分类数据
            $.ajax({
                method: 'GET',
                url: 'url' + id,
                success: function(res) {
                    form.val('form-edit', res.data)
                }
            })
        })
        // 通过代理的形式 为修改分类的表单绑定submit 事件
    $('body').on('submit', '#form-edit', function() {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    // 通过代理的形式 为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: 'url/delete' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                }
            })

        })

    })
})