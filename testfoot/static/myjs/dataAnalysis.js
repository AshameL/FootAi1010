$(function () {
        checkLeftOrRight();
        updateMark();
    })
    // 表格动态添加数据
    var DT = "";
    for (i = 0; i < fdList_len; i++) {
        DT += "<tr>" + "<td>" + fdList[i].time + "</td>" +
            "<td>" + fdList[i].left[0] + "</td>" + "<td>" + fdList[i].left[1] + "</td>" + "<td>"
            + fdList[i].left[2] + "</td>" + "<td>" + fdList[i].left[3] + "</td>" + "<td>"
            + fdList[i].left[4] + "</td>" + "<td>" + fdList[i].left[5] + "</td>" + "<td>"
            + fdList[i].left[6] + "</td>" + "<td>" + fdList[i].left[7] + "</td>" + "<td>"
            + fdList[i].left[8] + "</td>" + "<td>"
            + fdList[i].right[0] + "</td>" + "<td>" + fdList[i].right[1] + "</td>" + "<td>"
            + fdList[i].right[2] + "</td>" + "<td>" + fdList[i].right[3] + "</td>" + "<td>"
            + fdList[i].right[4] + "</td>" + "<td>" + fdList[i].right[5] + "</td>" + "<td>"
            + fdList[i].right[6] + "</td>" + "<td>" + fdList[i].right[7] + "</td>" + "<td>"
            + fdList[i].right[8] + "</td>" + "</tr>"
    }
    $("#footDataTable").append(DT);    

    var gaitCycle;
    var swingTime;
    var braceTime;
    var pressurePeak;
    var timePeak;
    var cadence;
    
    var gaitCycleList = new Array();
    var swingTimeList = new Array();
    var braceTimeList = new Array();
    var pressurePeakList = new Array();
    var timePeakList = new Array();
    var cadenceList = new Array();
    

    function checkLeftOrRight() {
        if (fdList[2].left[0] < 5 || fdList[2].left[1] < 5) {
            rightCal();
        }
        else {
            leftCal();
        }
    }
    function updateMark(){
        for(var i = 0; i< gaitCycleList.length;i++){
            setInterval(rewrite,80);
            function rewrite(){
                $("#gaitCycle").html(gaitCycleList[i]);
                $("#swingTime").html(swingTimeList[i]);
                $("#braceTime").html(braceTimeList[i]);
                $("#pressurePeak").html(pressurePeakList[i]);
                $("#timePeak").html(timePeakList[i]);
                $("#cadence").html(cadenceList[i]);
            }
            
        }      
    }
    function rightCal() {
        var startTime = 0;
        var endTime = 0;
        var swingStartTime = 0;
        var swingEndTime = 0;
        var braceStartTime = 0;
        var braceEndTime = 0;

        var startTimeList = new Array();
        var endTimeList = new Array();
        var swingStartTimeList = new Array();
        var swingEndTimeList = new Array();
        var braceStartTimeList = new Array();
        var braceEndTimeList = new Array();

        var flag = 0;
        for (var i = 1; i < fdList_len; i++) {
            if ((fdList[i].right[7] > 5 || fdList[i].right[8] > 5 ) && (flag == 0 )){
                startTime = fdList[i].time;
                startTimeList.push(startTime);
                flag ++;
            }
            if((fdList[i].right[7] < 5 || fdList[i].right[8] < 5 ) && (flag !== 0 )){
                flag ++;
            }
            if ((fdList[i].right[7] > 5 || fdList[i].right[8] > 5 ) && (flag == 2 )){
                endTime = fdList[i].time;
                endTimeList.push(endTime);
                flag = 0;
                
            }

        }
        
        for(var j = 0; j < endTimeList.length; j++){
            // 步态周期
            gaitCycleNumber = (endTimeList[j]-startTimeList[j])/1000;
            gaitCycle = gaitCycleNumber +"s";
            gaitCycleList.push(gaitCycle);
            //步频
            var preData = 60/gaitCycleNumber;
            cadence = preData.toString().substring(0, preData.toString().indexOf(".")) +"/s";
            cadenceList.push(cadence);
        }

        //达峰值压力、达峰值时间
        for (var i = 0; i < fdList_len; i++){
            for(var j = 0;j < 9;j++){
                var maxLeft = fdList[i].left[0];
                if(fdList[i].left[j] > maxLeft){
                    maxLeft = fdList[i].left[j];
                }
                if(fdList[i].right[j] > maxLeft){
                    pressurePeak = fdList[i].right[j] ;
                    pressurePeakList.push(pressurePeak);
                    timePeak = fdList[i].time /1000 +"s";
                    timePeakList.push(timePeak);
                }
            }
        }
        // 摆动时相
        var secondFlag = 0;
        for(var i = 1; i < fdList_len; i++){
            if((fdList[i].right[0] < 5 && fdList[i].right[1] < 5 ) && secondFlag == 0){
                swingStartTime = fdList[i].time;
                secondFlag = 1;
                swingStartTimeList.push(swingStartTime);
            }
            if((fdList[i].right[0] < 5 && fdList[i].right[1] < 5 ) && (fdList[i].right[7] > 5 || fdList[i].right[8] > 5 ) && secondFlag == 1){
                swingEndTime = fdList[i].time;
                secondFlag = 0;
                swingEndTimeList.push(swingEndTime);
            }
        }
        for(var j = 0;j < swingEndTimeList.length; j++){
            swingTime = (swingEndTimeList[j] - swingStartTimeList[j])/1000 + "s";
            swingTimeList.push(swingTime);
        }
        //支撑时相
        var thirdFlag = 0;
        for(var i = 1; i < fdList_len; i++){
            if((fdList[i].right[7] > 5 || fdList[i].right[8] > 5 ) && thirdFlag == 0){
                braceStartTime = fdList[i].time;
                thirdFlag = 1;
                braceStartTimeList.push(braceStartTime);
            }
            if((fdList[i].right[0] < 5 && fdList[i].right[1] < 5 ) && thirdFlag == 1){
                braceEndTime = fdList[i].time;
                thirdFlag = 0;
                braceEndTimeList.push(braceEndTime);
            }
        }
        for(var j = 0;j < braceEndTimeList.length; j++){
            braceTime = (braceEndTimeList[j] - braceStartTimeList[j])/1000 + "s";
            braceTimeList.push(braceTime);
        }
        


    }