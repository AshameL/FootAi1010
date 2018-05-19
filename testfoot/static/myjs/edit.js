window.onload=function(){
    $("#sex option[value='女']").attr("selected","selected");
}
$('.edit').click(function(){
        $('input[type="text"]').removeAttr('disabled');
        $('select').removeAttr('disabled');
         $(this).hide();
		 $(".submit").show();
		 return false;
    });


