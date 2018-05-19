/**
        * Created by Administrator on 2017/5/11 0011.
    */
    window.onload=function(){
        $(".nowpage").html("1");
        Bmob.initialize("6ff39cf89b2961d80c536401f109dfa7", "2e540f69b92c8f9337dd1ae7d8e14ab7");
        var left = Bmob.Object.extend("left");
        var query = new Bmob.Query(left);
        // 查询所有数据
        query.limit(8);
    query.find({
        success: function(results) {
            // 循环处理查询到的数据
            for (var i = 0; i < results.length; i++) {
                var l1 = results[i].get('point1');
                var l2 = results[i].get('point2');
                var l3 = results[i].get('point3');
                var l4 = results[i].get('point4');
                var l5 = results[i].get('point5');
                var l6=results[i].get('point6');
                var l7=results[i].get('point7');
                var l8=results[i].get('point8');
                var l9=results[i].get('point9');
            DT="<tr><td>"+l1+"</td>"+"<td>"+l2+"</td>"+"<td>"+l3+"</td>"+"<td>"+l4+"</td>"+"<td>"
                +l5+"</td>"+"<td>"+l6+"</td>"+"<td>"+l7+"</td>"+"<td>"+l8+"</td>"+"<td>"
                +l9+"</td></tr>"
                $("#backdata").append(DT);
            }
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
                var data=[];
                for(var r=0;r<100;r++){
                    for(var s=0;s<=250;s++){
                        var w=add(100-r,s);
                        data.push([r,s,w]);
                        var e=add(r,s);
                        data.push([100+r,s,e]);
                    }
                }
                return data;
            }
            function GaussFilter(r,s,x0,x1,y0,y1,p,f){
                var d=Math.exp(-(Math.pow((r-x0*10)/10,2)/(x1)+Math.pow((s-y0*10)/10,2)/(y1)))*p*f;
                return d;
            }
            
            function add(r,s,l1,l2,l3,l4,l5,l6,l7,l8,l9){
                var a = (GaussFilter(r, s, 2.3, 2, 4, 3, l1, 0.34))+ (GaussFilter(r, s, 3, 2, 4, 5.5, l1, 0.35)) + (GaussFilter(r, s, 3.9, 2.3, 4.1, 5.5, l2, 0.34)) +(GaussFilter(r, s, 4.8, 2, 4.3, 3.6, l2, 0.44)) + (GaussFilter(r, s, 5.67, 2, 5, 4, l2, 0.39)) +  (GaussFilter(r, s, 3.5, 3, 6.8, 5, l3, 0.59))+ (GaussFilter(r, s, 3.4, 3, 9.2, 5, l3, 0.59)) +( GaussFilter(r, s, 3.4, 3, 11.7, 5, l3, 0.59)) + ( GaussFilter(r, s, 3.6, 3, 14, 5, l3, 0.59)) + ( GaussFilter(r, s, 5.5, 2, 7.8, 5, l4, 0.68)) + (GaussFilter(r, s, 5.9, 2, 10.5, 5, l4, 0.64)) + (GaussFilter(r, s, 6.1, 2, 12.8, 5, l4, 0.48))+ (GaussFilter(r, s, 2.3, 2.3, 18.3, 3, l5, 0.4)) +(GaussFilter(r, s, 2.1, 2.2, 17.5, 3, l5, 0.45)) + (GaussFilter(r, s, 2.3, 2.3, 15.7, 3, l5, 0.4)) + (GaussFilter(r, s, 4.4, 2.5, 18, 2.1, l6, 0.3)) + ( GaussFilter(r, s, 4.3, 2.5, 16.7, 3.5, l6, 0.4)) + (GaussFilter(r, s, 4.4, 2.5, 15.5, 4.5, l6, 0.3)) + (GaussFilter(r, s, 6.5, 2.4, 16.7, 3, l7, 0.5))+ (GaussFilter(r, s, 6.5, 2.4, 15.6, 4, l7, 0.36)) + (GaussFilter(r, s, 6.5, 2.4, 14.4, 4, l7, 0.36)) + (GaussFilter(r, s, 1.5, 1, 22.5, 2.5, l8, 0.85)) + (GaussFilter(r, s, 1.5, 1.5, 21.1, 1.7, l8, 0.85)) +(GaussFilter(r, s, 3.3, 0.8, 21.6, 1.5, l8, 0.9)) + ( GaussFilter(r, s, 4.7, 0.8, 21, 1.5, l8, 0.51)) +(GaussFilter(r, s, 4.7, 0.8, 21, 1.5, l9, 0.51)) + ( GaussFilter(r, s, 6.0, 0.7, 20.2, 1.5, l9, 0.98))+ ( GaussFilter(r, s, 7.3, 0.7, 19.5, 1.5,l9, 0.92)) ;
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




        







        },
        error: function(error) {
            alert("查询失败: " + error.code + " " + error.message);
        }
    });
}