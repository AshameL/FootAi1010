/**
 * ------------------------------------------------------------------
 * 日期模版对象方法描述总计：
 * 
 * 	 model.IsLeapYear    日期是否是闰年  
 *   model.Formate       日期格式化        
 *   model.DateCalc      日期计算          
 *   model.CountTime     日期间隔时间差值  
 *   model.GetMonthDays  日期月份天数统计
 *   model.CompareDate   日期大小比较
 *   model.getMonthLastDay    日期月份最后一天
 *   model.parseDate     将字符、数字等转换为日期类型
 * ------------------------------------------------------------------
 */
var DateFmt = (function (model){

        //开发版本号
        model.version = "1.0.0";
        model.author = "xiaoyx";
        model.email = "xiaoyx@asiainfo.com";
		/**
		 * 闰年定义 ：非整百年能被4整除的为闰年
		 * 判断闰年  @param dateParam 日期对象、数字、字符串(数字格式) 
		 * ------------------------------------------------------------------
		 */ 
		model.IsLeapYear = function(dateParam){

			var leapFlag = false;
			var yearNumber;
                if(dateParam instanceof Date){
                        yearNumber =  dateParam.getFullYear();
                }else{
                        yearNumber = parseInt(dateParam,10); //格式化数字
                }
                //console.log("日期年份："+yearNumber);
                if(!isNaN(yearNumber)){
                    if((0 == yearNumber % 4) && ((yearNumber%100 != 0)||(yearNumber % 400==0))){
                       leapFlag = true;
                    }
                }else{
                	console.log("传递的参数格式不正确！");
                }

                return leapFlag;
		}

        /**
		 * 将日期格式化成指定格式的字符串
         * @param date 要格式化的日期，不传时默认当前时间，也可以是一个时间戳
         * @param fmt 目标字符串格式，支持的字符有：y,M,d,q,w,H,h,m,S，默认：
         * yyyy-MM-dd HH:mm:ss
         * @returns 返回格式化后的日期字符串
		 * ------------------------------------------------------------------
		 */ 
		model.Formate = function(dateObj, fmtStr){

			var weekArr = ['天', '一', '二', '三', '四', '五', '六'];
			    dateObj =this.parseDate(dateObj);

			    fmtStr = fmtStr || 'yyyy-MM-dd HH:mm:ss';
            var yearNumber =  dateObj.getFullYear() + "";
            var dayNumber  = dateObj.getDay();
            var objMap = {         
				    "M+" : dateObj.getMonth()+1, //月份         
				    "d+" : dateObj.getDate(), //日         
				    "h+" : dateObj.getHours()%12 == 0 ? 12 : dateObj.getHours()%12, //小时         
				    "H+" : dateObj.getHours(), //小时         
				    "m+" : dateObj.getMinutes(), //分         
				    "s+" : dateObj.getSeconds(), //秒         
				    "q+" : Math.floor((dateObj.getMonth()+3)/3), //季度         
				    "S" : dateObj.getMilliseconds() //毫秒         
			    };
			    //匹配年     
			    if(/(y+)/.test(fmtStr)){         
			        fmtStr = fmtStr.replace(RegExp.$1, yearNumber.substr(4 - RegExp.$1.length));         
			    }
			    //匹配周      
			    if(/(E+)/.test(fmtStr)){
			        fmtStr = fmtStr.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? '星期' : '周') : "") + weekArr[dayNumber]);         
			    }
			    for(var k in objMap){
			        if(new RegExp("("+ k +")").test(fmtStr)){
			            fmtStr = fmtStr.replace(RegExp.$1, (RegExp.$1.length==1) ? (objMap[k]) : (("00"+ objMap[k]).substr((""+ objMap[k]).length)));         
			        }         
			    }

			    return fmtStr;        
		}

	    /**
		 * 日期计算 
		 * @param s:秒
		 * @param m:分
		 * @param h:时
		 * @param d:天
		 * @param w:周
		 * @param q:季度
		 * @param M:月份
		 * @param y:年
		 * ------------------------------------------------------------------
		 */ 
		model.DateCalc = function(dateObj,fmt,number) {

			    dateObj =this.parseDate(dateObj);
			    var Y = dateObj.getFullYear(),
			        M = dateObj.getMonth(),
			        D = dateObj.getDate(),
			        H = dateObj.getDate(),
			        m = dateObj.getDate(),
			        s = dateObj.getDate(),
			        dateTemp = null;
			    switch (fmt) {   
			        case 's' :
			            dateTemp = new Date(Date.parse(dateObj) + (1000 * number));
			            break;
			        case 'm' :
			            dateTemp = new Date(Date.parse(dateObj) + (60000 * number));
			            break; 
			        case 'h' :
			            dateTemp = new Date(Date.parse(dateObj) + (3600000 * number));
			            break;   
			        case 'd' :
			            dateTemp = new Date(Date.parse(dateObj) + (86400000 * number));
			            break;  
			        case 'w' :
                        dateTemp = new Date(Date.parse(dateObj) + ((86400000 * 7) * number));
                        break;
			        case 'q' :
			            dateTemp = new Date(Y, M + number*3, D, H, m, s);
			            break;
			        case 'M' :
			            dateTemp = new Date(Y, M + number, D, H, m, s);
			            break; 
			        case 'y' :
			            dateTemp =  new Date((Y + number), M, D, H, m, s);
			            break; 
			         default:  
			            dateTemp =  new Date();
			    }
			    return dateTemp;
		}  
		  
		
		/**
		 * 计算2日期之间的时间
		 * @param startDate : 开始日期  日期对象(new Date())、"2017/01/12"、"2017-01-12" 
		 * @param endDate   : 结束日期 
		 * @param fmt:  返回日期间隔 
		 *  例如：s:秒、 m:分、h:时、d:天、w:周、M:月份、y:年
		 * ------------------------------------------------------------------
		 */ 
		model.CountTime = function( dateStart , dateEnd , fmt) {

			 dateStart =this.parseDate(dateStart);
			 dateEnd   =this.parseDate(dateEnd);

			var dateNumber,
			    dateDiff = dateEnd - dateStart;
                //console.log(typeof dateEnd );
		    switch (fmt) {   
		        case 's' :
		            dateNumber =  parseInt(dateDiff / 1000);
		            break;  
		        case 'm' :
		            dateNumber = parseInt(dateDiff / 60000);
                    break; 
		        case 'h' :
                    dateNumber = parseInt(dateDiff / 3600000);
                    break; 
		        case 'd' :
                    dateNumber = parseInt(dateDiff / 86400000);
                    break; 
		        case 'w' :
                    dateNumber = parseInt(dateDiff/(86400000 * 7) ,10);
                    break; 
		        case 'M' :
                    dateNumber = (dateEnd.getMonth()+1)+((dateEnd.getFullYear() - dateStart.getFullYear())*12) - (dateStart.getMonth()+1); 
                    break; 
		        case 'y' :
                    dateNumber =  dateEnd.getFullYear() - dateStart.getFullYear();
                    break;
                default :
                    console.log("传递的比较参数格式不存在!");
		    }
            return dateNumber;
		}

        /**
		 * 获取某年某个月的天数
		 * @param date : 日期类型或者字符串 
	     * 方式一：$.getMonthDays();
         * 方式二：$.getMonthDays(new Date());
         * 方式三：$.getMonthDays("2013-12"||"2013/12");
		 * ------------------------------------------------------------------
		 */ 
		model.GetMonthDays = function(date){

		    var y,m,d;

	            date =this.parseDate(date);

	            y = date.getFullYear();
	            m = date.getMonth()+1;
				d= new Date( y ,m ,0); 
			   return d.getDate();  
		}  
        /**
		 * 比较两个日期的大小
		 * @param dateStart : 开始日期  --参数类型 ：字符串、数字、日期Date
		 * @param dateEnd :   结束日期  --参数类型 ：字符串、数字、日期Date
		 * ------------------------------------------------------------------
		 */
		model.CompareDate = function(dateStart, dateEnd){
            
            dateStart =this.parseDate(dateStart);
            dateEnd =this.parseDate(dateEnd);
            //提取公共方法校验参数
			var timesBegin = dateStart.getTime();
			var timesEnd = dateEnd.getTime();
            console.log("timesBegin : " + timesBegin);
            console.log("timesEnd : " + timesEnd);
           /* if(isNaN()){

            }*/
			    if(timesBegin > timesEnd) {
			        //alert('开始时间大于离开时间,请检查!');
			        return 1;
			    }else if(timesBegin == timesEnd){
			        return 0;
			    }else{
                    return -1;
			    }
        }
        /**
		 * 获取某个月的最后一天日期
		 * @param date : 日期类型或者字符串 
	     * 方式一：$.getMonthDays();
         * 方式二：$.getMonthDays(new Date());
         * 方式三：$.getMonthDays("2013-12"||"2013/12");
		 * ------------------------------------------------------------------
		 */
		model.getMonthLastDay = function(date){
		    var y,m,d;
	            date =this.parseDate(date);
	            y = date.getFullYear();
	            m = date.getMonth()+1;
	            //取下一个月的第一天，方便计算（最后一天不固定）
				if(m > 11){     
					 m -=12;    //月份减     
					 y++;      //年份增     
				}     
				d= new Date( y ,m ,1);

			return (new Date(d.getTime()-1000*60*60*24)); //获取当月最后一天日期

		}

        /**
		 * 解析字符串为日期类型
		 * @param date : 日期类型或者字符串 
	     * 方式一：$.parseDate();
         * 方式二：$.parseDate(new Date());
         * 方式三：$.parseDate("2013-12"||"2013/12");
         * @return  Date 类型对象
		 * ------------------------------------------------------------------
		 */
        model.parseDate = function(date){
        	//
            if(date == undefined){
                date = new Date();
            }else if(typeof date == 'string' ){
            	date = new Date(Date.parse(date));
            }else if(typeof date == 'number'){
               date = new Date(date);
            }
            var times = date.getTime();
             //   console.log(times);
            if(isNaN(times)){//转化日期类型错误
                return null;
            }
            return date;

        }

        return model;

        

	})(window.DateFmt || {});