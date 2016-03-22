$(function(){

    $('body').on('click','#add',function(){

        $('.showForm').show();
    })

    $('.cancel').on('click',function(){

        $('.showForm').hide();
        $('.loginform').hide();
        $('.regform').hide();

    })
    var count = 1;

    function getWeeklys(count){

        if(localStorage.getItem('login') !="")
        {

            $.ajax({
                type:'GET',
                url:"/weekly/weeklys",
                data:"userId="+JSON.parse(localStorage.getItem('login'))._id+"&count="+count,
                success:function(data){
                    var str = "";
                    for(var i =0;i<data.length;i++){

                        var temp = data[i];
                        str += '<tr><td>'+temp.projectName+'</td><td>'+temp.task+'</td><td>'+temp.progress+'</td></tr>';
                    }
                    $("tbody").html(str);
                }
            })

        }

    }

    getWeeklys(1);



    $('.prev').on('click',function(){


        count = count+1;
        getWeeklys(count);

        //if(localStorage.getItem('login') !="")
        //{
        //
        //    $.ajax({
        //        type:'POST',
        //        url:"/weekly/weeklys",
        //        data:"userId="+JSON.parse(localStorage.getItem('login'))._id+"&count="+count,
        //        success:function(data){
        //            var str = "";
        //            for(var i =0;i<data.length;i++){
        //
        //                var temp = data[i];
        //                str += '<tr><td>'+temp.projectName+'</td><td>'+temp.task+'</td><td>'+temp.progress+'</td></tr>';
        //            }
        //            $("tbody").html(str);
        //        }
        //    })
        //
        //}

    })

    $('.next').on('click',function(){


        count = count-1;
        getWeeklys(count);

    })



    $('.sure').on('click',function(){

        var data = {
            userId:JSON.parse(localStorage.getItem('login'))._id,
            projectName:$("[name='projectName']").val(),
            task:$("[name='task']").val(),
            progress:$("[name='progress']").val()
        };

        console.log(data);

        for(var i in data){

            if(data[i] == "")
            {

                $('.err-msg').html('文本内容不能为空');
                return;
            }
        }

        $('.showForm').hide();



        $.ajax({
            type:'POST',
            url:"/weekly/weekly",
            // data:data,
            data:$("#weeklyform").serialize(),
            // responseType:'json',
            success:function(resp){

                //localStorage.setItem('weekly', data);

                //var temp = JSON.parse(data);
                // console.log(typeof data);
                var str = '<tr><td>'+data.projectName+'</td><td>'+data.task+'</td><td>'+data.progress+'</td></tr>';
                $("tbody").append(str);

            }
        })

        // reg()

    })

    $('.nameBox').on('click','.loginBtn',function(){

        $('.loginform').show();

    })


    $('.nameBox').on('click','.regBtn',function(){

        $('.regform').show();

    })

    $('.sureReg').on('click',function(){

        var data = {
            username:$('.regform').find("[name='username']").val(),
            telphone:$('.regform').find("[name='telphone']").val(),
            password:$('.regform').find("[name='password']").val()
        };

        for(var i in data){

            if(data[i] == "")
            {

                $('.err-msg').html('文本内容不能为空');
                return;
            }
        }

        $('.regform').hide();

        console.log(data);

        $.ajax({
            type:'POST',
            url:"/api/user",
            // data:data,
            "contentType":"application/x-www-form-urlencoded",
            //data:JSON.stringify(data),
            data: $("#regform").serialize(),
            // responseType:'json',
            success:function(data){
                data = data.user;
                localStorage.setItem('login', JSON.stringify(data));
                //$('.loginBtn').parent().html("用户名:"+data.username+" | "+"<a href='javascript:;' class='logout'>退出</a>");

                //updateStatus()
                //$('.cancel').click();
                window.location.href = window.location.href;
            }
        })


    })

    $('.nameBox').on('click','.logout',function(){

        $.ajax({
            type:'GET',
            url:"/logout",
            "contentType":"application/x-www-form-urlencoded",
            success:function(resp){

                //$('.nameBox').html('<a href="javascript:;" class="loginBtn">登录</a> / <a href="javascript:;" class="regBtn">注册</a>');
                localStorage.setItem('login', '');
                window.location.href = window.location.href;
            }
        })
    })

    $('.sureLogin').on('click',function(){

        var data = {
            telphone:$("[name='telphone']").val(),
            password:$("[name='password']").val()
        };

        for(var i in data){

            if(data[i] == "")
            {

                $('.err-msg').html('文本内容不能为空');
                return;
            }
        }
        console.log(data);

        $.ajax({
            type:'post',
            url:"/login",
            // data:data,
            "contentType":"application/x-www-form-urlencoded",
            data:$("#loginform").serialize(),
            // responseType:'json',

            success:function(data){
                //data = data.user;
                localStorage.setItem('login', JSON.stringify(data));
                //$('.loginBtn').parent().html("用户名:"+data.username+" | "+"<a href='javascript:;' class='logout'>退出</a>");
                //
                //$('.loginform').hide();
                window.location.href = window.location.href;

            }
        })
    })

})