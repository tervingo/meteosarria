/* 
 Print current data functions 
 */

/* CURRENT TEMPERATURE */

function print_meteoSarriaTemp (temp, tempSens, tempMax, tempMin)
{
    window.curTemp = temp;
    
    var xaxis;
    var yaxis;
    
    var hora;
    var fecha;

    var data1hago = [];
    var temp1hago;
    var difTemp1hago;
    
    var data24hago = [];
    var temp24hago;
    var difTemp24hago;
    var t4q;
    
    currentDataAnchorX = timeLineAnchor+(hour + mins/60)*timeLineOffset + 40;
    xaxis = currentDataAnchorX;

//    if (tempMin>10)
//    {
//        currentDataAnchorY = tempLineAnchor-40;
//    }
//    else if (tempMax<21)
//    {
//        currentDataAnchorY = tempLineAnchor+3*tempLineOffset;
//    }
//    else 
//    {
//        currentDataAnchorY = tempLineAnchor-40;
//    }    
    
    currentDataAnchorY = tempLineAnchor - (temp/10)*tempLineOffset;
    
    yaxis = currentDataAnchorY;
//    
//    if (temp=='--')
//    {
//        yaxis = tempLineAnchor - tempLineOffset;
//        temp = '--';
//    }
//    else
//    {    
//        yaxis = tempLineAnchor - (temp/10)*tempLineOffset;
//    }
//
    
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");
    
    // Print current data rectangle 
    
    ctx.beginPath();
    ctx.rect(currentDataAnchorX+curDataFrameXOffset, currentDataAnchorY+curDataFrameYOffset, curDataFrameWidth, curDataFrameHeight);
    ctx.lineWidth="2";
    ctx.strokeStyle="DimGray";
    ctx.stroke();
    ctx.fillStyle="White";
    ctx.fill();
    
    mins = mins > 9 ? mins : '0' + mins;
    
    fecha = day+"."+month+"."+year;
    hora = hour+":"+mins;
    // Current temperature
    ctx.font = tempLegendFontSize+"px Arial";
    ctx.fillStyle = getTempColor(temp);
    ctx.fillText(temp+"º",xaxis,yaxis);
    // current data & time
    var xaxisDate = xaxis-35;
    var yaxisDate = yaxis-40;
    var xaxisTime = xaxis+50;
    var yaxisTime = yaxis-40;
    var xaxisDash = xaxis+20;
    var yaxisDash = yaxis-40;
    
    ctx.font = dateTimeFontSize+"px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText(fecha, xaxisDate, yaxisDate);
    ctx.fillText("-", xaxisDash, yaxisDash);
    ctx.fillText(hora, xaxisTime, yaxisTime);
    // current heat index
    if (tempSens <99)
    {
        if (isInt(temp)) { var xaxisSens = xaxis+40; } else { var xaxisSens = xaxis+60; }
        var yaxisSens = yaxis-2;
        ctx.fillStyle=getTempColor(tempSens);
        ctx.font = tempSensFontSize+"px Arial";
        ctx.fillText("("+tempSens+"º)",xaxisSens,yaxisSens);
    }
    // difference wrt last 1h 
    
    var xaxisDif1h = xaxis-30;
    var yaxisDif1h = yaxis+15;
    
    var mins4query = parseInt(String(mins/10))*10;
    
    if (hour == 0)
    {
        t4q = getTime4Query(23,mins4query);
        data1hago =  getDataAt(t4q);
    }
    else
    {
        t4q = getTime4Query((hour-1),0);
        data1hago = getDataAt(t4q); 
    }
    temp1hago = data1hago[0];
    difTemp1hago = temp - temp1hago;

    ctx.font = difTemp24hagoFontSize+"px Arial";
    if (difTemp1hago>0)
    {
        ctx.fillStyle = "FireBrick";
    }
    else
    {
        ctx.fillStyle = "DodgerBlue";
    }
    ctx.fillText(difTemp1hago.toFixed(1)+"º en 1h |",xaxisDif1h,yaxisDif1h);        

    // difference wrt last 24h 
 
    var xaxisDif24h = xaxis+35;
    var yaxisDif24h = yaxis+15;
     
    if (hour < 23)
    {
        t4q = getTime4Query(hour+1,0);
        data24hago =  getDataAt(t4q);
    }
    else
    {
        data24hago = getDataAt("0000"); 
    }
    temp24hago = data24hago[0];
    difTemp24hago = temp - temp24hago;

    ctx.font = difTemp24hagoFontSize+"px Arial";
    if (difTemp24hago>0)
    {
        ctx.fillStyle = "FireBrick";
    }
    else
    {
        ctx.fillStyle = "DodgerBlue";
    }
    ctx.fillText(difTemp24hago.toFixed(1)+"º en 24h",xaxisDif24h,yaxisDif24h);        
    
    
}

/* CURRENT HUMIDITY */

function print_meteoSarriaHum(hum)
{
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");
  
    var xaxisHum = currentDataAnchorX;
//    var yaxisHum = tempLineAnchor - (curTemp/10)*tempLineOffset+35;
    var yaxisHum = currentDataAnchorY+35;
    
    ctx.font = humPresLegendFontSize+"px Arial";
    ctx.fillStyle = getHumColor(hum);
    
    ctx.fillText(hum+"%", xaxisHum, yaxisHum);

}

/* CURRENT PRESSURE */

function print_meteoSarriaPres(pres)
{
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");
  
    var xaxisPres = currentDataAnchorX;
//    var yaxisPres = tempLineAnchor - (curTemp/10)*tempLineOffset+55;
    var yaxisPres = currentDataAnchorY+55;
    
    
    if (pres==300)
    {
        pres = '--hPa';
    }
    
    ctx.font = humPresLegendFontSize+"px Arial";
    ctx.fillStyle = "DarkGreen"
    
    ctx.fillText(pres+"hPa", xaxisPres, yaxisPres);

}

/* CURRENT WIND */

function print_meteoSarriaWind(dir, vel, racha, tempMax, tempMin)
{
    
//    alert(dir);
    
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");

    // position wind rose according to current time (xaxisWind) and max/min temperature (yaxisWind)
    
    var xaxisWind;
    var yaxisWind;
    var radio = tempLineOffset;

    if (hour > 12)
    {
        xaxisWind = 200;
    }
    else
    {
        xaxisWind = 900;
    }

    if (tempMin>10)
    {
        yaxisWind = tempLineAnchor;
    }
    else if (tempMax<21)
    {
        yaxisWind = tempLineAnchor+3*tempLineOffset;
    }
    else 
    {
        yaxisWind = tempLineAnchor;
    }
    
     // clear previous circle
    
    if (prevWindX != 0) { ctx.clearRect(prevWindX-radio, prevWindY-radio, 2*radio, 2*radio); }
    prevWindX = xaxisWind;
    prevWindY = yaxisWind;
        
    
    // draw circle
    
    ctx.beginPath();
    ctx.arc(xaxisWind, yaxisWind, radio, 0, 2*Math.PI, false);
    ctx.lineWidth=1;
    ctx.strokeStyle="DarkGray";
    ctx.stroke();
    
    // draw N, E, W, S within circle
    
    ctx.font = neswWindFontSize+"px Arial";
    ctx.fillStyle = "DarkGray";
    var Nxaxis = xaxisWind;
    var Nyaxis = yaxisWind-radio+15; 
    ctx.fillText("N", Nxaxis, Nyaxis);
    
    var Exaxis = xaxisWind+radio-10;
    var Eyaxis = yaxisWind; 
    ctx.fillText("E", Exaxis, Eyaxis);

    var Sxaxis = xaxisWind;
    var Syaxis = yaxisWind+radio-10; 
    ctx.fillText("S", Sxaxis, Syaxis);

    var Wxaxis = xaxisWind-radio+10;
    var Wyaxis = yaxisWind; 
    ctx.fillText("W", Wxaxis, Wyaxis);
    
    // draw wind direction
    var dir4display = dir+270;
    if (dir4display>360) { dis4display = dir4display-360; }
    var startDir = dir4display*Math.PI/180;
    var endDir = startDir+0.1;

    ctx.beginPath();   
    ctx.arc(xaxisWind,yaxisWind, radio, startDir, endDir, false);
    ctx.lineWidth=5;
    ctx.strokeStyle="Blue";
    ctx.stroke();

    
    // print wind speed
    
    ctx.beginPath();
    ctx.font = windSpeedLegendFontSize+"px Arial";
    ctx.fillStyle = "Blue"
    ctx.fillText(vel+" km/h", xaxisWind, yaxisWind-5);
    ctx.font = windDirTextFontSize+"px Arial";
    ctx.fillText(dir+"º  "+getWindDirText(dir),xaxisWind, yaxisWind+15);
    
    ctx.beginPath();
    ctx.font = windGustLegendFontSize+"px Arial";
    ctx.fillStyle = "DarkBlue";
    ctx.fillText("("+racha+" km/h)", xaxisWind, yaxisWind+35);
    
    
}

/* CURRENT DAILYRAIN */

function print_meteoSarriaRain(rainHour, rainDay)
{
   
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");
  
    var xaxisRain = currentDataAnchorX;
//    var yaxisRain = tempLineAnchor - (curTemp/10)*tempLineOffset+75;
    var yaxisRain = currentDataAnchorY+75;
    
    ctx.font = humPresLegendFontSize+"px Arial";
    ctx.fillStyle = "DarkBlue"

    ctx.fillText(rainHour+" mm", xaxisRain-35, yaxisRain);
    ctx.fillText("("+rainDay+" mm)", xaxisRain+40, yaxisRain);
    
}

/* CURRENT SOLAR */

function print_meteoSarriaSolar(rad)
{
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");
  
    var xaxisSol = currentDataAnchorX-30;
//    var yaxisSol = tempLineAnchor - (curTemp/10)*tempLineOffset+90;
    var yaxisSol = currentDataAnchorY+90;
   
    ctx.font = solUvLegendFontSize+"px Arial";
    ctx.fillStyle = "OrangeRed"
    
    ctx.fillText(rad+" Wm2", xaxisSol, yaxisSol);   
    
}

/* CURRENT UV */

function print_meteoSarriaUv(index)
{
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");
  
    var xaxisUv = currentDataAnchorX+30;
//    var yaxisUv = tempLineAnchor - (curTemp/10)*tempLineOffset+90;
    var yaxisUv = currentDataAnchorY+90;    
    ctx.font = solUvLegendFontSize+"px Arial";
    ctx.fillStyle = "BlueViolet"
    
    ctx.fillText("uv "+index, xaxisUv, yaxisUv);   
}

function print_meteoSarriaIntTemp(intTemp)
{
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");
  
    var xaxisTi = currentDataAnchorX;
//    var yaxisTi = tempLineAnchor - (curTemp/10)*tempLineOffset+105;
    var yaxisTi = currentDataAnchorY+105;
    
    ctx.fillStyle=getTempColor(intTemp);
    ctx.font = intTempLegendFontSize+"px Arial";

    
    ctx.fillText(intTemp+"º", xaxisTi, yaxisTi);   
}

function print_meteoSarriaInstantData ()
{
    var xaxis;
    var yaxis;
    
    var dataNow = [];
    
    var hora;
    var fecha;

    var data1hago = [];
    var temp1hago;
    var difTemp1hago;
    
    var data24hago = [];
    var temp24hago;
    var difTemp24hago;
    var t4q;
    
    dataNow = getDataNow();
    
    var time = dataNow[0];
    var tempExt = dataNow[1];
    var tempInt = dataNow[2];
    var heatIdx = dataNow[3];
    var tempTrend = dataNow[4];
    var hum = dataNow[5];
    var humTrend = dataNow[6];
    var pres = dataNow[7];
    var presTrend = dataNow[8];
    var windDir = dataNow[9];
    var windSpeed = dataNow[10];
    var windGust = dataNow[11];
    var uvIdx = dataNow[12];
    var solarRad = dataNow[13];
    var hourlyRain = dataNow[14];
    var dailyRain = dataNow[15];
    var forecast = dataNow[16];
    var luna = dataNow[17];
    var tempMax = dataNow[18];
    var tempMin = dataNow[19];

    // Canvas 
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");
     
    // set axis 
    
    currentDataAnchorX = timeLineAnchor+(hour + mins/60)*timeLineOffset + 40;
    xaxis = currentDataAnchorX;
    currentDataAnchorY = tempLineAnchor - (tempExt/10)*tempLineOffset;
    yaxis = currentDataAnchorY;
    
    // clear previous rectangle
    
//    if (prevCurDataAnchorX != 0) { ctx.clearRect(prevCurDataAnchorX+curDataFrameXOffset,prevCurDataAnchorY+curDataFrameYOffset,curDataFrameWidth, curDataFrameHeight ); }
//    prevCurDataAnchorX = currentDataAnchorX;
//    prevCurDataAnchorY = currentDataAnchorY;
    
    // draw cur data rectangle
    
    ctx.beginPath();
    ctx.rect(currentDataAnchorX+curDataFrameXOffset, currentDataAnchorY+curDataFrameYOffset, curDataFrameWidth, curDataFrameHeight);
    ctx.lineWidth="2";
    ctx.strokeStyle="DimGray";
    ctx.stroke();
    ctx.fillStyle="White";
    ctx.fill();

    // print time

    var hora = hour+"."+mins+"."+secs;

    var timeX = xaxis+5;
    var timeY = yaxis-40;
    ctx.font = dateTimeFontSize+"px Arial";
    ctx.fillStyle = "DimGray";
//    ctx.fillText(time, timeX, timeY);
    ctx.fillText(hora, timeX, timeY);
    
    // print tempExt
    
    ctx.font = tempLegendFontSize+"px Arial";
    ctx.fillStyle = getTempColor(tempExt);
    ctx.fillText(tempExt+"º",xaxis,yaxis);
    
    // print heat index
    
    if (isInt(tempExt)) { var xaxisSens = xaxis+40; } else { var xaxisSens = xaxis+60; }
    var yaxisSens = yaxis-2;
    ctx.fillStyle=getTempColor(heatIdx);
    ctx.font = tempSensFontSize+"px Arial";
    ctx.fillText("("+heatIdx+"º)",xaxisSens,yaxisSens);
 
    // difference wrt last 1h 
    
    var xaxisDif1h = xaxis-30;
    var yaxisDif1h = yaxis+15;
    var mins4query = parseInt(String(mins/10))*10;
    
    if (hour == 0)
    {
        t4q = getTime4Query(23,mins4query);
        data1hago =  getDataAt(t4q);
    }
    else
    {
        t4q = getTime4Query((hour-1),0);
        data1hago = getDataAt(t4q); 
    }
    temp1hago = data1hago[0];
    difTemp1hago = tempExt - temp1hago;

    ctx.font = difTemp24hagoFontSize+"px Arial";
    if (difTemp1hago>0) {ctx.fillStyle = "FireBrick"; }
    else { ctx.fillStyle = "DodgerBlue"; }
    ctx.fillText(difTemp1hago.toFixed(1)+"º en 1h |",xaxisDif1h,yaxisDif1h);        

    // difference wrt last 24h 
 
    var xaxisDif24h = xaxis+35;
    var yaxisDif24h = yaxis+15;
     
    if (hour < 23)
    {
        t4q = getTime4Query(hour+1,0);
        data24hago =  getDataAt(t4q);
    }
    else
    {
        data24hago = getDataAt("0000"); 
    }
    temp24hago = data24hago[0];
    difTemp24hago = tempExt - temp24hago;

    ctx.font = difTemp24hagoFontSize+"px Arial";
    if (difTemp24hago>0) { ctx.fillStyle = "FireBrick"; }
    else { ctx.fillStyle = "DodgerBlue"; }
    ctx.fillText(difTemp24hago.toFixed(1)+"º en 24h",xaxisDif24h,yaxisDif24h);        
     
    // Humidity
    
    var xaxisHum = currentDataAnchorX;
    var yaxisHum = currentDataAnchorY+35;
    ctx.font = humPresLegendFontSize+"px Arial";
    ctx.fillStyle = getHumColor(hum);
    ctx.fillText(hum+"%", xaxisHum, yaxisHum);

    // Pressure
    
    var xaxisPres = currentDataAnchorX;
    var yaxisPres = currentDataAnchorY+55;
    ctx.font = humPresLegendFontSize+"px Arial";
    ctx.fillStyle = "DarkGreen"
    ctx.fillText(pres+"hPa", xaxisPres, yaxisPres);

    // Rain
    
    var xaxisRain = currentDataAnchorX;
    var yaxisRain = currentDataAnchorY+75;
    
    ctx.font = humPresLegendFontSize+"px Arial";
    ctx.fillStyle = "DarkBlue"
    ctx.fillText(hourlyRain+" mm", xaxisRain-45, yaxisRain);
    ctx.fillText("("+dailyRain+" mm)", xaxisRain+45, yaxisRain);

    // Solar rad
        
    var xaxisSol = currentDataAnchorX-30;
    var yaxisSol = currentDataAnchorY+90;
    ctx.font = solUvLegendFontSize+"px Arial";
    ctx.fillStyle = "OrangeRed"
    ctx.fillText(solarRad+" Wm2", xaxisSol, yaxisSol);   

    // UV
    
    var xaxisUv = currentDataAnchorX+40;
    var yaxisUv = currentDataAnchorY+90;    
    ctx.font = solUvLegendFontSize+"px Arial";
    ctx.fillStyle = "BlueViolet"
    ctx.fillText("uv "+uvIdx, xaxisUv, yaxisUv);   

    // TempInt
    
    var xaxisTi = currentDataAnchorX;
    var yaxisTi = currentDataAnchorY+105;
    ctx.fillStyle=getTempColor(tempInt);
    ctx.font = intTempLegendFontSize+"px Arial";
    ctx.fillText(tempInt+"º", xaxisTi, yaxisTi);   

    // Print Wind

//    print_meteoSarriaWind(windDir, windSpeed, windGust, tempMax, tempMin);
}

function print_meteoSarriaCurrentData (time,tempExt,tempInt,heatIdx,tempTrend,hum,humTrend,pres,presTrend,windDir,windSpeed,windGust,uvIdx,solarRad,hourlyRain,dailyRain,forecast,luna,tempMax,tempMin)
{
    var xaxis;
    var yaxis;
    
    var hora;
    var fecha;

    var data1hago = [];
    var temp1hago;
    var difTemp1hago;
    
    var data24hago = [];
    var temp24hago;
    var difTemp24hago;
    var t4q;
    
     // Canvas 
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");
     
    // set axis 
    
    currentDataAnchorX = timeLineAnchor+(hour + mins/60)*timeLineOffset + 40;
    xaxis = currentDataAnchorX;
    currentDataAnchorY = tempLineAnchor - (tempExt/10)*tempLineOffset;
    yaxis = currentDataAnchorY;
    
    // clear previous rectangle
    
//    if (prevCurDataAnchorX != 0) { ctx.clearRect(prevCurDataAnchorX+curDataFrameXOffset,prevCurDataAnchorY+curDataFrameYOffset,curDataFrameWidth, curDataFrameHeight ); }
//    prevCurDataAnchorX = currentDataAnchorX;
//    prevCurDataAnchorY = currentDataAnchorY;
    
    // draw cur data rectangle
    
    ctx.beginPath();
    ctx.rect(currentDataAnchorX+curDataFrameXOffset, currentDataAnchorY+curDataFrameYOffset, curDataFrameWidth, curDataFrameHeight);
    ctx.lineWidth="2";
    ctx.strokeStyle="DimGray";
    ctx.stroke();
    ctx.fillStyle="White";
    ctx.fill();

    // print time

    var timeX = xaxis-5;
    var timeY = yaxis-45;
    ctx.font = dateTimeFontSize+"px Arial";
    ctx.fillStyle = "Black";
    var anno=getYear(time);
    var mes = getMonth(time);
    var dia = getDay(time);
    var hora = getHour(time);
    var minuto = getMin(time);
    
    var fecha = dia+"."+mes+"."+anno+" - "+hora+":"+minuto;
    ctx.fillText(fecha, timeX, timeY);
    
    // print tempExt
    
    ctx.font = tempLegendFontSize+"px Arial";
    ctx.fillStyle = getTempColor(tempExt);
    ctx.fillText(tempExt+"º",xaxis,yaxis);
    
    // print heat index
    
    if (isInt(tempExt)) { var xaxisSens = xaxis+45; } else { var xaxisSens = xaxis+65; }
    var yaxisSens = yaxis-2;
    ctx.fillStyle=getTempColor(heatIdx);
    ctx.font = tempSensFontSize+"px Arial";
    ctx.fillText("("+heatIdx+"º)",xaxisSens,yaxisSens);
 
    // print temp trend
    
    var tempTrendX = xaxis+70;
    var tempTrendY = yaxis-15;
    ctx.font = trendFontSize+"px Arial";
    ctx.fillStyle = getTrendColor(tempTrend);
    var Ttrend = getTrendSymbol(tempTrend)
    ctx.fillText(Ttrend,tempTrendX,tempTrendY);
    
 
    // difference wrt last 1h 
    
    var xaxisDif1h = xaxis-30;
    var yaxisDif1h = yaxis+15;
    var mins4query = parseInt(String(mins/10))*10;
    
    if (hour == 0)
    {
        t4q = getTime4Query(23,mins4query);
        data1hago =  getDataAt(t4q);
    }
    else
    {
        t4q = getTime4Query((hour-1),0);
        data1hago = getDataAt(t4q); 
    }
    temp1hago = data1hago[0];
    difTemp1hago = tempExt - temp1hago;

    ctx.font = difTemp24hagoFontSize+"px Arial";
    if (difTemp1hago>0) {ctx.fillStyle = "FireBrick"; }
    else { ctx.fillStyle = "DodgerBlue"; }
    ctx.fillText(difTemp1hago.toFixed(1)+"º en 1h |",xaxisDif1h,yaxisDif1h);        

    // difference wrt last 24h 
 
    var xaxisDif24h = xaxis+35;
    var yaxisDif24h = yaxis+15;
     
    if (hour < 23)
    {
        t4q = getTime4Query(hour+1,0);
        data24hago =  getDataAt(t4q);
    }
    else
    {
        data24hago = getDataAt("0000"); 
    }
    temp24hago = data24hago[0];
    difTemp24hago = tempExt - temp24hago;

    ctx.font = difTemp24hagoFontSize+"px Arial";
    if (difTemp24hago>0) { ctx.fillStyle = "FireBrick"; }
    else { ctx.fillStyle = "DodgerBlue"; }
    ctx.fillText(difTemp24hago.toFixed(1)+"º en 24h",xaxisDif24h,yaxisDif24h);        
     
    // Humidity
    
    var xaxisHum = currentDataAnchorX;
    var yaxisHum = currentDataAnchorY+35;
    ctx.font = humPresLegendFontSize+"px Arial";
    ctx.fillStyle = getHumColor(hum);
    ctx.fillText(hum+"%", xaxisHum, yaxisHum);

   // print hum trend
    
    var humTrendX = currentDataAnchorX+35;
    var humTrendY = currentDataAnchorY+40;
    ctx.font = trendFontSize+"px Arial";
    ctx.fillStyle = getTrendColor(humTrend);
    var Htrend = getTrendSymbol(humTrend)
    ctx.fillText(Htrend,humTrendX,humTrendY);

    // Pressure
    
    var xaxisPres = currentDataAnchorX-20
    var yaxisPres = currentDataAnchorY+55;
    ctx.font = humPresLegendFontSize+"px Arial";
    ctx.fillStyle = "DarkGreen"
    ctx.fillText(pres+"hPa", xaxisPres, yaxisPres);

   // print press trend
    
    var presTrendX = currentDataAnchorX+45;
    var presTrendY = currentDataAnchorY+60;
    ctx.font = trendFontSize+"px Arial";
    ctx.fillStyle = getTrendColor(presTrend);
    var Ptrend = getTrendSymbol(presTrend)
    ctx.fillText(Ptrend,presTrendX,presTrendY);

    // Rain
    
    var xaxisRain = currentDataAnchorX;
    var yaxisRain = currentDataAnchorY+75;
    
    ctx.font = humPresLegendFontSize+"px Arial";
    ctx.fillStyle = "DarkBlue"
    ctx.fillText(hourlyRain+" mm", xaxisRain-45, yaxisRain);
    ctx.fillText("("+dailyRain+" mm)", xaxisRain+45, yaxisRain);

    // Solar rad
        
    var xaxisSol = currentDataAnchorX-30;
    var yaxisSol = currentDataAnchorY+90;
    ctx.font = solUvLegendFontSize+"px Arial";
    ctx.fillStyle = "OrangeRed"
    ctx.fillText(solarRad+" Wm2", xaxisSol, yaxisSol);   

    // UV
    
    var xaxisUv = currentDataAnchorX+40;
    var yaxisUv = currentDataAnchorY+90;    
    ctx.font = solUvLegendFontSize+"px Arial";
    ctx.fillStyle = "BlueViolet"
    ctx.fillText("uv "+uvIdx, xaxisUv, yaxisUv);   

    // TempInt
    
    var xaxisTi = currentDataAnchorX;
    var yaxisTi = currentDataAnchorY+105;
    ctx.fillStyle=getTempColor(tempInt);
    ctx.font = intTempLegendFontSize+"px Arial";
    ctx.fillText(tempInt+"º", xaxisTi, yaxisTi);   

    // Print Wind

//    print_meteoSarriaWind(windDir, windSpeed, windGust, tempMax, tempMin);

    // forecast

    var xaxisFc = currentDataAnchorX+60;
    var yaxisFc = currentDataAnchorY+35;

    ctx.beginPath();
    var fcImg = new Image();
    fcImg.src = "fc"+forecast+".png";
    fcImg.onload = function () 
    {
        ctx.drawImage(fcImg,xaxisFc,yaxisFc,30,30);
    }
    
    // luna
    
    var xaxisLuna = currentDataAnchorX+75;
    var yaxisLuna = currentDataAnchorY-60;

    ctx.beginPath();
    var lunaImg = new Image();
    lunaImg.src = "mp"+luna+".png";
    lunaImg.onload = function () 
    {
        ctx.drawImage(lunaImg,xaxisLuna,yaxisLuna,20,20);
    }
    

}