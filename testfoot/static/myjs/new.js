Bmob.initialize("6ff39cf89b2961d80c536401f109dfa7", "2e540f69b92c8f9337dd1ae7d8e14ab7");

var MobileUser = Bmob.Object.extend("MobileUser", 
	{
	  //实例方法
	  update: function() {
	    this.save(null, {
		  success: function(user) {
			alert("数据修改成功！");
		  },
		  error: function(user, error) {
			alert("数据修改失败！");
		  }
		});
	  }
	}, 
	{
		login:function(account,password) {
    	var MobileUser = new MobileUser();
		var query = new Bmob.Query(MobileUser);
    	query.equalTo("username", account);
		query.equalTo("password", password);
	
		query.find({
			success: function(results) {
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
  		},
  //类方法
  
 /* register:function(account,password) {
    var user = new MobileUser();
	var query = new Bmob.Query(MobileUser);
    user.set("username", account);
	user.set("password", password);
	
	user.save(null, {
	  success: function(user) {
		// 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
		//alert('添加数据成功，返回的objectId是：' + user.id);
		window.location.href="message.html?userid="+user.id;
	  },
	  error: function(user, error) {
		  debugger;
		// 添加失败
		alert('注册失败，注册用户已存在！' );
	  }
	});
  },*/
});
// Bmob.initialize("6ff39cf89b2961d80c536401f109dfa7", "2e540f69b92c8f9337dd1ae7d8e14ab7");













// get:function(){
// 		console.log("hhh")
// 		var left=Bmob.Object.extend("left");
// 		var query=new Bmob.Query(left);
// 		query.find({
// 			success: function(results) {
// 				// debugger
// 				document.getElementById("datal1").value=results[0];
// 				console.log(results[0])
// 				document.getElementById("datal2").value=results[1];
// 				document.getElementById("datal3").value=results[2];
// 				document.getElementById("datal4").value=results[3];
// 				document.getElementById("datal5").value=results[4];
// 				document.getElementById("datal6").value=results[5];
// 				document.getElementById("datal7").value=results[6];
// 				document.getElementById("datal8").value=results[7];
// 				document.getElementById("datal9").value=results[8];
// 				document.getElementById("datal10").value=results[9];
// 				document.getElementById("datal11").value=results[10];
// 			},
// 			error: function(error) {
// 				alert("查询失败" );
// 			}
// 		});

// 	};



