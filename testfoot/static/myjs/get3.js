/**
 * Created by Administrator on 2017/5/11 0011.
	*/
window.onload = function(){
	$(".nowpage").html("1");
	Bmob.initialize("6ff39cf89b2961d80c536401f109dfa7", "2e540f69b92c8f9337dd1ae7d8e14ab7");
	var left = Bmob.Object.extend("left");
	var query = new Bmob.Query(left);
	// 查询所有数据
	query.limit(8);
    query.find({
        success: function(results) {
            // 循环处理查询到的数据
           	alert(results.length);
			var pointData = {};
            for (var i = 0; i < results.length; i++) {
            	alert(i);
                var point1 = results[i].get('point1');
                var point2 = results[i].get('point2');
                var point3 = results[i].get('point3');
                var point4 = results[i].get('point4');
                var point5 = results[i].get('point5');
                var point6 = results[i].get('point6');
                var point7 = results[i].get('point7');
                var point8 = results[i].get('point8');
                var point9 = results[i].get('point9');
				pointData.point1 = point1;
				pointData.point2 = point2;
				pointData.point3 = point3;
				pointData.point4 = point4;
				pointData.point5 = point5;
				pointData.point6 = point6;
				pointData.point7 = point7;
				pointData.point8 = point8;
				pointData.point9 = point9;
				
				DT="<tr><td>"+point1+"</td>"+"<td>"+point2+"</td>"+"<td>"+point3+"</td>"+"<td>"+point4+"</td>"+"<td>"
					+point5+"</td>"+"<td>"+point6+"</td>"+"<td>"+point7+"</td>"+"<td>"+point8+"</td>"+"<td>"
					+point9+"</td></tr>";
				$("#backdata").append(DT);
				if(i == results.length - 1){
					var myChart = echarts.init(document.getElementById('chart1'));
					var xData = [];
					var yData = [];
					for(var i=0;i<=200;i++){
						for(var j=0;j<=250;j++){
						}
						xData.push(i);
					}
					for(var j=0;j<=250;j++){
						yData.push(j);
					}
					function cal(){
						var data = [];
						for(var r = 0; r < 100; r++){
							for(var s = 0; s <= 250; s++){
								pointData.r = 100 - r;
								pointData.s = s;
								var w = add(pointData);
								data.push([r,s,w]);
								pointData.r = r;
								var e = add(pointData);
								data.push([100+r,s,e]);
							}
						}
						return data;
					}
					function GaussFilter(r,s,x0,x1,y0,y1,p,f){
						var d=Math.exp(-(Math.pow((r-x0*10)/10,2)/(x1)+Math.pow((s-y0*10)/10,2)/(y1)))*p*f;
						return d;
					}
				
					function add(param){
						var a = (GaussFilter(param.r, param.s, 2.3, 2, 4, 3, param.point1, 0.34))+ 
						(GaussFilter(param.r, param.s, 3, 2, 4, 5.5, param.point1, 0.35)) + 
						(GaussFilter(param.r, param.s, 3.9, 2.3, 4.1, 5.5, param.point2, 0.34)) + 
						(GaussFilter(param.r, param.s, 4.8, 2, 4.3, 3.6, param.point2, 0.44)) + 
						(GaussFilter(param.r, param.s, 5.67, 2, 5, 4, param.point2, 0.39)) +  
						(GaussFilter(param.r, param.s, 3.5, 3, 6.8, 5, param.point3, 0.59))+ 
						(GaussFilter(param.r, param.s, 3.4, 3, 9.2, 5, param.point3, 0.59)) + 
						(GaussFilter(param.r, param.s, 3.4, 3, 11.7, 5, param.point3, 0.59)) + 
						(GaussFilter(param.r, param.s, 3.6, 3, 14, 5, param.point3, 0.59)) + 
						(GaussFilter(param.r, param.s, 5.5, 2, 7.8, 5, param.point4, 0.68)) + 
						(GaussFilter(param.r, param.s, 5.9, 2, 10.5, 5, param.point4, 0.64)) + 
						(GaussFilter(param.r, param.s, 6.1, 2, 12.8, 5, param.point4, 0.48))+ 
						(GaussFilter(param.r, param.s, 2.3, 2.3, 18.3, 3, param.point5, 0.4)) + 
						(GaussFilter(param.r, param.s, 2.1, 2.2, 17.5, 3, param.point5, 0.45)) + 
						(GaussFilter(param.r, param.s, 2.3, 2.3, 15.7, 3, param.point5, 0.4)) + 
						(GaussFilter(param.r, param.s, 4.4, 2.5, 18, 2.1, param.point6, 0.3)) + 
						(GaussFilter(param.r, param.s, 4.3, 2.5, 16.7, 3.5, param.point6, 0.4)) + 
						(GaussFilter(param.r, param.s, 4.4, 2.5, 15.5, 4.5, param.point6, 0.3)) + 
						(GaussFilter(param.r, param.s, 6.5, 2.4, 16.7, 3, param.point7, 0.5))+ 
						(GaussFilter(param.r, param.s, 6.5, 2.4, 15.6, 4, param.point7, 0.36)) + 
						(GaussFilter(param.r, param.s, 6.5, 2.4, 14.4, 4, param.point7, 0.36)) + 
						(GaussFilter(param.r, param.s, 1.5, 1, 22.5, 2.5, param.point8, 0.85)) + 
						(GaussFilter(param.r, param.s, 1.5, 1.5, 21.1, 1.7, param.point8, 0.85)) + 
						(GaussFilter(param.r, param.s, 3.3, 0.8, 21.6, 1.5, param.point8, 0.9)) + 
						(GaussFilter(param.r, param.s, 4.7, 0.8, 21, 1.5, param.point8, 0.51)) +
						(GaussFilter(param.r, param.s, 4.7, 0.8, 21, 1.5, param.point9, 0.51)) + 
						(GaussFilter(param.r, param.s, 6.0, 0.7, 20.2, 1.5, param.point9, 0.98))+ 
						(GaussFilter(param.r, param.s, 7.3, 0.7, 19.5, 1.5,param.point9, 0.92)) ;
						return a;
					}
					var data=cal();
					option = {
						tooltip: {},
						xAxis: {
							type: 'category',
							data: xData
						},	
						yAxis: {
							type: 'category',
							data: yData
						},
						visualMap: {
							min: 0,
							max: 35,
							calculable: true,
							realtime: false,
							inRange: {
								color:['#313695','#3399ff','#33ccff','#33cccc','#33cc99','#33ff99','#66ff66','#99ff99','#ccff99','#ccff66','#cccc66','#cc9966','#cc9933','#ff3333', '#a50026']

							}
						},
						series: [{
							name: 'Gaussian',
							type: 'heatmap',
							data: data,
							itemStyle: {
								emphasis: {
									borderColor: '#333',
									borderWidth: 1
								}
							},
							progressive: 1000,
							animation: false
						}]
					};
					myChart.setOption(option);
				}
			}
        },
        error: function(error) {
            alert("查询失败: " + error.code + " " + error.message);
        }
    });
}