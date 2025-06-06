$(function() {
    var layer = layui.layer
    var form = layui.form

    initCate()
        // 初始化富文本编辑器
    initEditor()
        // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 为选择封面的按钮，绑定点击事件处理函数
    $('#btnChooseImage').on('click', function() {
            $('#coverFile').click()
        })
        // 监听 coverFile 的 change 事件，获取用户选择的文件列表
    $('#coverFile').on('change', function(e) {
            //获取到文件的列表数据
            var files = e.target.files
                // 判断用户是否选择了文件
            if (files === 0) {
                return
            }
            // 根据文件，创建对应的 URL 地址
            var newImgURL = URL.createObjectURL(files[0])
                // 为裁剪区域重新设置图片
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', newImgURL) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域
        })
        // 定义文章的发布状态
    var art_state = '已发布'
        // 为存为草稿按钮，绑定点击事件处理函数
    $('#btnSave2').on('click', function() {
        art_state = '草稿'
    })

    //定义加载文章分类的方法
    function initCate() {
        // $.ajax({
        //     method: 'GET',
        //     url: "url",
        //     scccess: function(res) {
        //         if (res.status !== 0) {
        //             return layer.msg('初始化文章分类失败！')
        //         }
        //         // 调用模板引擎渲染 分类的下拉菜单
        res = {
            data: [{ id: 1, name: 'haha' }, { id: 2, name: 'andy' }]
        }
        var htmlStr = template('tpl-cate', res)
        $('[name=cate_id').html(htmlStr)
            //             // 一定要记得调用form.render()
        form.render()

        //     }
        // })
    }
})