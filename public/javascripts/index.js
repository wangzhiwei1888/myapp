$(function(){

    var updateStatus = function()
    {

        var loginStatus = JSON.parse(localStorage.getItem('login'));
        console.log(loginStatus);

        if(loginStatus != null && Object.keys(loginStatus).length >= 2){

            var data = {'username':loginStatus.username};

            $.ajax({
                type:'GET',
                url:"/weekly",
                data:data,
                // responseType:'json',
                success:function(data){

                    $('.welcome').hide();
                    var data = JSON.parse(data);
                    var str = ""
                    for(var i=0;i<data.length;i++){

                        var temp = data[i];
                        str +='<tr><td>'+temp.projectName+'</td><td>'+temp.task+'</td><td>'+temp.progress+'</td></tr>';
                    }
                    // console.log(data);

                    localStorage.setItem('weekly', JSON.stringify(data));
                    $('.table-striped').show();
                    $("tbody").html(str);

                }
            })
            $('.nameBox').html("实施人:"+loginStatus.username);

            // alert(1);
            var addStr = '<button class="btn btn-primary" id="add" style="margin-left: 10px; ">添加</button>';
            $('.content').append(addStr);
        }
    }
    updateStatus()





    $('body').on('click','#add',function(){

        $('.showForm').show();
    })


    $('.cancel').on('click',function(){

        $('.showForm').hide();
        $('.loginform').hide();
        $('.regform').hide();

    })


    $('.sure').on('click',function(){


        var data = {
            username:JSON.parse(localStorage.getItem('login')).username,
            projectName:$("[name='projectName']").val(),
            task:$("[name='task']").val(),
            progress:$("[name='progress']").val(),
            others:$("[name='others']").val()
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

        console.log(data);

        $.ajax({
            type:'POST',
            url:"/weekly",
            // data:data,
            data:JSON.stringify(data),
            // responseType:'json',
            success:function(data){

                localStorage.setItem('weekly', data);

                var temp = JSON.parse(data);
                // console.log(typeof data);
                var str = '<tr><td>'+temp.projectName+'</td><td>'+temp.task+'</td><td>'+temp.progress+'</td></tr>';
                $("tbody").append(str);

            }
        })

        // reg()

    })

    $('.loginBtn').on('click',function(){

        $('.loginform').show();

    })


    $('.regBtn').on('click',function(){

        $('.regform').show();


    })

    $('.sureReg').on('click',function(){

        var data = {
            username:$('.regform').find("[name='username']").val(),
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
            url:"/reg",
            // data:data,
            data:JSON.stringify(data),
            // responseType:'json',
            success:function(resp){

                localStorage.setItem('login', resp);
                $('.loginBtn').parent().html("实施人:"+data.username);

                updateStatus()

            }
        })


    })

    $('.sureLogin').on('click',function(){

        var data = {
            username:$("[name='username']").val(),
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
            type:'POST',
            url:"/login",
            // data:data,
            data:JSON.stringify(data),
            // responseType:'json',
            success:function(resp){

                var respData = JSON.parse(resp);

                // alert(respData.result == 1);
                if(respData.result == 1){
                    $('.loginform').hide();
                    localStorage.setItem('login', resp);
                    // $('.loginBtn').parent().html("实施人:"+data.username);

                    updateStatus();
                }
                else{

                    $('.loginform').find('.err-msg').html(respData.errMsg);
                    // localStorage.setItem('login', resp);
                    // $('.loginBtn').parent().html("实施人:"+data.username);
                    // updateStatus()

                }

            }
        })


    })




    // function reg(){
    //        // var username = document.querySelector("input[name='username']").value;
    //        // var age  =document.querySelector("input[name='age']").value;
    //        var user = {
    //            username:'wzw',
    //            age:12
    //        }
    //        //1.创建ajax对象 0
    //        var xhr = new XMLHttpRequest();

    //        //指定参数 1
    //        xhr.open('POST','/weekly',true);
    //        //设置响应的类型，会自动化xhr.response转成对应的类型
    //        xhr.responseType = 'json';
    //        //注册当状态变化之后的回调函数
    //        xhr.onreadystatechange = function(){
    //            //当状态为4的时候，也就是响应接收完毕的时候
    //            if(xhr.readyState == 4){
    //                if(xhr.status == 200){
    //                    var user = xhr.response;
    //                    console.log(user);
    // var tbody = document.querySelector("table tbody");
    // var tr = document.createElement('tr');
    // var td1 = document.createElement('td');
    // td1.innerHTML =user.username;
    // var td2 = document.createElement('td');
    // td2.innerHTML =user.age;
    // tr.appendChild(td1);
    // tr.appendChild(td2);
    // tbody.appendChild(tr);
    //                }else{

    //                }

    //            }
    //        }
    //        //指定请求体发送数据
    //        xhr.send(JSON.stringify(user));
    //    }







})