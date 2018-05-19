/**
 * Created by Administrator on 2017/3/6 0006.
 */
 $(function(){
	 $("#t1").click(function(){
		 identify();
	 });
	 
	 $(".login_btn").click(function(){
		 debugger;
		 var pass=$(".password_icon").val();
		 var user=$(".user_icon").val();
		 Person.register(user,pass);
		 //window.location.href="message.html";
	 });
	 
	 var identity =$(".select option:selected").val();
	function identify() {
		debugger;
		if ($("#t1").attr("checked") == "checked" &&$(".user_icon").val() !== "" &&$(".password_icon").val() !== "") {
			$(".login_btn").attr('disabled', false);
		}
		else {
			$(".login_btn").attr('disabled', true);
		}
		debugger
	}
 });
