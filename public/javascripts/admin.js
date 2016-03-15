/**
 * Created by jason on 16/3/15.
 */

$(function () {

    //注册
    $('.sureReg').on('click',function(){

        var data = {
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

        console.log(data);

        $.ajax({
            type:'POST',
            url:"/api/user",
            "contentType":"application/x-www-form-urlencoded",
            data: $(".regform").serialize(),
            success:function(resp){

                if(resp.status == "OK"){
                    var data = resp.user;
                    var str = '<tr><td class="username">'+ data.telphone +'</td><td class="password">'+ data.password +'</td>' +
                        '<td class="col-sm-4">' +
                        '<button type="button" class="btn btn-info edit" id_attr="'+data._id+'">Edit</button>' +
                        '<button type="button" class="btn btn-warning col-sm-offset-1 remove" id_attr="'+data._id+'">Remove</button>' +
                        '</td></tr>';
                    $('.table').append(str);
                    $('.regform').find("[name='telphone']").val("");
                    $('.regform').find("[name='password']").val("");
                }

            }
        })


    })
})