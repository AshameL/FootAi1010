/**
 * Created by Administrator on 2017/2/22 0022.
 */
$(function(){
	$(".login_btn").click(function(){
		var username=$(".user_icon").val();
		var password=$(".password_icon").val();
		//MobileUser.login(username,password);
		var MobileUser = Bmob.Object.extend("MobileUser");
		var mobileUser = new MobileUser();
		var query = new Bmob.Query(MobileUser);
		query.equalTo("name", username);
		query.equalTo("password", password);
	
		query.find({
			success: function(results) {
				alert(results);
				if(results.length>0){
					window.location.href="index.html?userid="+results[0].id;
				}else{
					alert("登录失败");
				}
			},
			error: function(error) {
				alert("登录失败");
			}
		});
	});
});