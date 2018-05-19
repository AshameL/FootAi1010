window.onload=function(){
	var objectId = $("#number").val();
	var footData = Bmob.Object.extend("FootData");
	var dataQuery = new Bmob.query(footData);
	dataQuery.equalTo("userId", objectId);
	dataQuery.find(function(results){
		alert(results.length);
	});
	
}