/**
 * Created by Administrator on 2017/5/11 0011.
	*/
//这是个四维数组 第一维 代表代表左右 第二维 代表第几次测试  第三维  代表某次中第几次采样  第四维代表第几个点 
var pointDatas = [];
pointDatas[0]=[];
pointDatas[1]=[];
var userName = '';
var modeStrings = [];
var dateStrings = [];
var echarts;
require.config({
	packages: [
		{
			name: 'echarts',
			location: './myjs/src',
			main: 'echarts'
		},
		{
			name: 'zrender',
			// location: 'http://ecomfe.github.io/zrender/src',
			location: './myjs/zrender/src',
			main: 'zrender'
		}
	]
});
require(
	[
		'echarts',
		'echarts/chart/bar',
		'echarts/chart/line',
		'echarts/chart/map',
		'echarts/chart/heatmap'
	],
	function (ec) { 
		echarts = ec;
});
window.onload = function(){
	$(".nowpage").html("1");
	Bmob.initialize("6ff39cf89b2961d80c536401f109dfa7", "2e540f69b92c8f9337dd1ae7d8e14ab7");
	var FootData = Bmob.Object.extend("FootData");
	var query = new Bmob.Query(FootData);
	// 查询用户ID为xxxx的数据
	query.equalTo("userId", "Mm1k4445");
	
	query.limit(8);
    query.find({
        success: function(results) {
            // 循环处理查询到的数据
           	/*alert(results.length);*/
			
            for (var i = 0; i < 1; i++) {
				pointDatas[0][i]=[];
				pointDatas[1][i]=[];
				var fileNameArr = results[i].get('fileName').split('-');
				userName = fileNameArr[0];
				modeStrings[i] = fileNameArr[1];
				dateStrings[i] = fileNameArr[2].substring(1,13);
				var pointDataArr = results[i].get('fileDatas');
				var j=0;
				var index=-1;
				var DT = '';
				while(j<pointDataArr.length){
					//16进制前4位是时间戳。
					DT=DT+"<tr>";
					if(j%20<4){
						j = j+4;
						//一条数据
						index++;
					}
					pointDatas[0][i][index]=[];
					pointDatas[1][i][index]=[];
					//之后18位是左脚数据，两位一个点。
					var pressureHexBegin = "0x";
					for(var k=0;k<9;k++){
						pointDatas[0][i][index][k] = parseInt(pressureHexBegin+pointDataArr.charAt(j)+pointDataArr.charAt(j+1));
						j = j+2;
						DT=DT+"<td>"+pointDatas[0][i][index][k]/5.0 +"</td>";
					}
					//之后18位是左脚数据，两位一个点。
					for(var k=0;k<9;k++){
						pointDatas[1][i][index][k] = parseInt(pressureHexBegin+pointDataArr.charAt(j)+pointDataArr.charAt(j+1));
						j = j+2;
					}
					//跳过30个数据
					j = j+20*30;
				}
				$("#backdata").append(DT);
			}
			var z = 0;
			var xData = [];
			var yData = [];
			for(var i=0;i<=200;i++){
				xData.push(i);
			}
			for(var j=0;j<=250;j++){
				yData.push(j);
			}
			var myChart = echarts.init(document.getElementById('chart1'));
			function timedCount(){
				var y = 0;
				function f2(){
					if(y != pointDatas[0][0].length - 1){
						function cal(){
							var data = [];
							for(var r = 0; r < 100; r++){
								for(var s = 0; s <= 250; s++){
									var w = add(100 - r,s,pointDatas[0][0][y]);
									data.push([r,s,w]);
									var e = add(r,s,pointDatas[1][0][y]);
									data.push([100+r,s,e]);
								}
							}
							return data;
						}
						function GaussFilter(r,s,x0,x1,y0,y1,p,f){
							var d=Math.exp(-(Math.pow((r-x0*10)/10,2)/(x1)+Math.pow((s-y0*10)/10,2)/(y1)))*p*f/5.0;
							return d;
						}
					
						function add(r,s,points){
							var a = (GaussFilter(r, s, 2.3, 2, 4, 3, points[0], 0.34))+ 
							(GaussFilter(r, s, 3, 2, 4, 5.5, points[0], 0.35)) + 
							(GaussFilter(r, s, 3.9, 2.3, 4.1, 5.5, points[1], 0.34)) + 
							(GaussFilter(r, s, 4.8, 2, 4.3, 3.6, points[1], 0.44)) + 
							(GaussFilter(r, s, 5.67, 2, 5, 4, points[1], 0.39)) +  
							(GaussFilter(r, s, 3.5, 3, 6.8, 5, points[2], 0.59))+ 
							(GaussFilter(r, s, 3.4, 3, 9.2, 5, points[2], 0.59)) + 
							(GaussFilter(r, s, 3.4, 3, 11.7, 5, points[2], 0.59)) + 
							(GaussFilter(r, s, 3.6, 3, 14, 5, points[2], 0.59)) + 
							(GaussFilter(r, s, 5.5, 2, 7.8, 5, points[3], 0.68)) + 
							(GaussFilter(r, s, 5.9, 2, 10.5, 5, points[3], 0.64)) + 
							(GaussFilter(r, s, 6.1, 2, 12.8, 5, points[3], 0.48))+ 
							(GaussFilter(r, s, 2.3, 2.3, 18.3, 3, points[4], 0.4)) + 
							(GaussFilter(r, s, 2.1, 2.2, 17.5, 3, points[4], 0.45)) + 
							(GaussFilter(r, s, 2.3, 2.3, 15.7, 3, points[4], 0.4)) + 
							(GaussFilter(r, s, 4.4, 2.5, 18, 2.1, points[5], 0.3)) + 
							(GaussFilter(r, s, 4.3, 2.5, 16.7, 3.5, points[5], 0.4)) + 
							(GaussFilter(r, s, 4.4, 2.5, 15.5, 4.5, points[5], 0.3)) + 
							(GaussFilter(r, s, 6.5, 2.4, 16.7, 3, points[6], 0.5))+ 
							(GaussFilter(r, s, 6.5, 2.4, 15.6, 4, points[6], 0.36)) + 
							(GaussFilter(r, s, 6.5, 2.4, 14.4, 4, points[6], 0.36)) + 
							(GaussFilter(r, s, 1.5, 1, 22.5, 2.5, points[7], 0.85)) + 
							(GaussFilter(r, s, 1.5, 1.5, 21.1, 1.7, points[7], 0.85)) + 
							(GaussFilter(r, s, 3.3, 0.8, 21.6, 1.5, points[7], 0.9)) + 
							(GaussFilter(r, s, 4.7, 0.8, 21, 1.5, points[7], 0.51)) +
							(GaussFilter(r, s, 4.7, 0.8, 21, 1.5, points[8], 0.51)) + 
							(GaussFilter(r, s, 6.0, 0.7, 20.2, 1.5, points[8], 0.98))+ 
							(GaussFilter(r, s, 7.3, 0.7, 19.5, 1.5,points[8], 0.92)) ;
							return a;
						}
						var data=cal();
						var option = {
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
								progressive: 4000,
								animation: false
							}]
						};
						myChart.setOption(option);
						y++;
						z = y + 1;
					}
				}
				return f2;
			}
			var function1 = timedCount();
			var counter = setInterval(function1, 2400);
			if(z == results.length){
				clearInterval(counter);
			}
        },
        error: function(error) {
            alert("查询失败: " + error.code + " " + error.message);
        }
    });
}