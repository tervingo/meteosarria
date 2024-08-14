
/* PRINT & UPDATE CURRENT DATA (except wind) */

function print_meteoSarriaCurrentData (time,tempExt,tempInt,heatIdx,windChill,tempTrend,hum,humTrend,pres,presTrend,windDir,windSpeed,windGust,uvIdx,solarRad,hourlyRain,dailyRain,forecast,luna,tempMax,tempMin)
{
    
    print_current_data (time,tempExt,tempInt,heatIdx,windChill,tempTrend,
                        hum,humTrend,
                        pres,presTrend,
                        windDir,windSpeed,windGust,
                        uvIdx,solarRad,
                        hourlyRain,dailyRain,
                        forecast,luna,
                        tempMax,tempMin, false);

}

function update_meteoSarriaCurrentData ()
{

    var dataNow = [];
    
    dataNow = getDataNow();
    
    var time = dataNow[0];
    var tempExt = dataNow[1];
    var tempInt = dataNow[2];
    var heatIdx = parseFloat(dataNow[3]);
    var tempTrend = dataNow[4];
    var hum = dataNow[5];
    var humTrend = dataNow[6];
    var pres = dataNow[7];
    var presTrend = dataNow[8];
    var windDir = parseInt(dataNow[9]);
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
    var windChill = parseFloat(dataNow[20]);
    var rainRate = dataNow[24];
    
    print_current_data (time,tempExt,tempInt,heatIdx,windChill,tempTrend,
                    hum,humTrend,
                    pres,presTrend,
                    windDir,windSpeed,windGust,
                    uvIdx,solarRad,
                    hourlyRain,dailyRain,
                    forecast,luna,
                    tempMax,tempMin, 
                    rainRate, true);

    
}

// MAIN FUNCTION

function print_current_data (time,tempExt,tempInt,heatIdx,windChill,tempTrend,hum,humTrend,pres,presTrend,windDir,windSpeed,windGust,uvIdx,solarRad,hourlyRain,dailyRain,forecast,luna,tempMax,tempMin,rainRate, update)
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
    
    var datosRainNow = [];
    var datosRain10mAg0 = [];
    
     // Canvas 
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");

    // set axis 
    
    currentDataAnchorX = timeLineAnchor+(hour + mins/60)*timeLineOffset + 50;
    xaxis = currentDataAnchorX;
    currentDataAnchorY = tempLineAnchor - (tempExt/10)*tempLineOffset;
    yaxis = currentDataAnchorY;
    
    if (update)
    {
        if (prevCurDataAnchorX != 0) 
        { 
            ctx.clearRect(prevCurDataAnchorX+curDataFrameXOffset-1,prevCurDataAnchorY+curDataFrameYOffset-1,curDataFrameWidth+2, curDataFrameHeight+2 ); 
        }
    }
    prevCurDataAnchorX = currentDataAnchorX;
    prevCurDataAnchorY = currentDataAnchorY;

    // draw cur data rectangle
    
    ctx.beginPath();
    ctx.rect(currentDataAnchorX+curDataFrameXOffset, currentDataAnchorY+curDataFrameYOffset, curDataFrameWidth, curDataFrameHeight);
    ctx.lineWidth="2";
    ctx.strokeStyle="DimGray";
    ctx.stroke();
    ctx.fillStyle="WhiteSmoke";
    ctx.fill();

    // print time

    var timeX = xaxis+5;
    var timeY = yaxis-45;
    var fecha;
    var horaminuto;
    
    ctx.font = dateTimeFontSize+"px Arial";
    ctx.fillStyle = "Black";

    if (update)
    {
        fecha = time.toString().substring(0,10);
        horaminuto = time.toString().substring(11,16);
    }
    else
    {
        var anno=getYear(time);
        var mes = getMonth(time);
        var dia = getDay(time);
        var hora = getHour(time);
        var minuto = getMin(time);
        var secs = getSec(time);
        fecha = dia+"."+mes+"."+anno;
        horaminuto = hora+":"+minuto;
    }
    ctx.fillText(fecha, timeX, timeY);       
        

    // print time bar
    
    var timeBarFromX = timeLineAnchor+(hour + mins/60)*timeLineOffset;
    var timeBarFromY = currentDataAnchorY+curDataFrameYOffset;
    var timeBarToX = timeLineAnchor+(hour + mins/60)*timeLineOffset;
    var timeBarToY = tempLineAnchor - 4*tempLineOffset-30;
    ctx.beginPath();
    ctx.lineWidth = "0.2";
    ctx.strokeStyle = "LightGray";
    ctx.moveTo(timeBarFromX,timeBarFromY);
    ctx.lineTo(timeBarToX,timeBarToY);
    ctx.stroke();
    
    // delete previous value and print new one
    
    ctx.beginPath();
    ctx.clearRect(timeBarToX-30,timeBarToY-20,100, 17);
    
    ctx.font = dateTimeFontSize+"px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText(horaminuto, timeBarToX, timeBarToY-5);
    
    var clockColor = getTempColor(tempExt);
    print_clock(timeBarToX+35,timeBarToY-12,8,0,ctx, clockColor);

    // print tempExt
    
    ctx.font = tempLegendFontSize+"px Arial";
    ctx.fillStyle = getTempColor(tempExt);
    ctx.fillText(tempExt+"º",xaxis,yaxis);
    
    // print sensation temperature (heat index or wind chill)
    if ( (heatIdx > tempExt) || (windChill < tempExt))
    {    
        if (isInt(tempExt)) { var xaxisSens = xaxis+45; } else { var xaxisSens = xaxis+65; }
        var yaxisSens = yaxis-2;
        if (heatIdx > tempExt)
        {
            ctx.fillStyle=getTempColor(heatIdx);
            ctx.font = tempSensFontSize+"px Arial";
            ctx.fillText("("+heatIdx+"º)",xaxisSens+15,yaxisSens);
            var heatIdxImg = new Image();
            heatIdxImg.src = "heat_index.png";
            heatIdxImg.onload = function () 
            {
                ctx.drawImage(heatIdxImg,xaxisSens-25,yaxisSens-13,15,15);
            }
        }
        else
        {
            ctx.fillStyle=getTempColor(windChill);
            ctx.font = tempSensFontSize+"px Arial";
            ctx.fillText("("+windChill+"º)",xaxisSens+15,yaxisSens);           
            ctx.beginPath();
            var chillImg = new Image();
            chillImg.src = "chill.png";
            chillImg.onload = function () 
            {
                ctx.drawImage(chillImg,xaxisSens-25,yaxisSens-13,15,15);
            }
        }
    }
 
    // print temp trend
    
    var tempTrendX = xaxis+70;
    var tempTrendY = yaxis-15;
    ctx.font = trendFontSize+"px Arial";
    ctx.fillStyle = getTrendColor(tempTrend);
    var Ttrend = getTrendSymbol(tempTrend)
    ctx.fillText(Ttrend,tempTrendX,tempTrendY);
    
 
    // difference wrt last 1h 
    
    var xaxisDif1h = xaxis-40;
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
 
    var xaxisDif24h = xaxis+25;
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
    
    ctx.textAlign = "left";
    
    var xaxisHum = currentDataAnchorX-40;
    var yaxisHum = currentDataAnchorY+35;
    ctx.font = humPresLegendFontSize+"px Arial";
    ctx.fillStyle = getHumColor(hum);
    ctx.fillText(hum+"%", xaxisHum+12, yaxisHum);
    
    ctx.beginPath();
    var humImg = new Image();
    humImg.src = "cur_hum.png";
    humImg.onload = function () 
    {
        ctx.drawImage(humImg,xaxisHum-38,yaxisHum-25,27,27);
    }
    ctx.font = curdataIconLegends+"px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("Hum", xaxisHum-18, yaxisHum+2);
    
   // print hum trend
    
    var humTrendX = currentDataAnchorX+20;
    var humTrendY = currentDataAnchorY+40;
    ctx.font = trendFontSize+"px Arial";
    ctx.fillStyle = getTrendColor(humTrend);
    var Htrend = getTrendSymbol(humTrend)
    ctx.fillText(Htrend,humTrendX,humTrendY);

    // Pressure
    
    var xaxisPres = currentDataAnchorX-40;
    var yaxisPres = currentDataAnchorY+55;
    ctx.font = humPresLegendFontSize+"px Arial";
    ctx.fillStyle = presHistColor;
    ctx.fillText(pres+"hPa", xaxisPres+10, yaxisPres);

    // pres icon
    
    ctx.beginPath();
    var presImg = new Image();
    presImg.src = "cur_pres.png";
    presImg.onload = function () 
    {
        ctx.drawImage(presImg,xaxisPres-40,yaxisPres-15,20,20);
    }
    ctx.font = curdataIconLegends+"px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("Pres", xaxisPres-18, yaxisPres+2);

   // print press trend
    
    var presTrendX = currentDataAnchorX+70;
    var presTrendY = currentDataAnchorY+60;
    ctx.font = trendFontSize+"px Arial";
    ctx.fillStyle = getTrendColor(presTrend);
    var Ptrend = getTrendSymbol(presTrend)
    ctx.fillText(Ptrend,presTrendX,presTrendY);

    // Rain
    
    var xaxisRain = currentDataAnchorX-30;
    var yaxisRain = currentDataAnchorY+70;
    
    if (update)
    {
        hourlyRain = parseFloat(hourlyRain).toFixed(1);
        dailyRain = parseFloat(dailyRain).toFixed(1);
    }
    else
    {
        hourlyRain = hourlyRain.toFixed(1);
        dailyRain = dailyRain.toFixed(1);
    }
    
    // Rain icon
    
    ctx.beginPath();
    var rainImg = new Image();
    rainImg.src = "cur_rain.png";
    rainImg.onload = function () 
    {
        ctx.drawImage(rainImg,xaxisRain-50,yaxisRain-22,20,20);
    }

    
    // Hourly rain
    
    ctx.font = rainLegendFontSize+"px Arial";
    ctx.fillStyle = "DarkBlue"
    ctx.fillText(hourlyRain+" mm", xaxisRain+5, yaxisRain);
    
    ctx.font = curDataTimeLapseFontSize+"px Arial";
    ctx.fillStyle = "DimGray"
    ctx.fillText("(1h)", xaxisRain+70, yaxisRain-2);

    // Daily rain
    yaxisRain = yaxisRain+18;
    
    ctx.font = rainLegendFontSize+"px Arial";
    ctx.fillStyle = "DarkBlue"
    ctx.fillText(dailyRain+" mm", xaxisRain+5, yaxisRain);
    
    ctx.font = curDataTimeLapseFontSize+"px Arial";
    ctx.fillStyle = "DimGray"
    ctx.fillText("("+day+"."+month+")", xaxisRain+70, yaxisRain-2);
    
    // Rain icon "it's raining"
    
//    if (mins <10)
//    {
//        var lepta = 0;
//     }
//    else
//    {
//        var lepta = parseInt(mins/10)*10;
//        
//    }
//    var tr4q = getTime4Query(hour,lepta)
//    datosRain10mAgo = getDataAt(tr4q);
//    var dailyRain10mAgo = datosRain10mAgo[5];
    
 //   if (dailyRain > dailyRain10mAgo)
    if (rainRate > 0)
//    if (true)
    {
        ctx.beginPath();
        var rnicon = new Image();
        rnicon.src = "umbrella.png";
        rnicon.onload = function () 
        {
            ctx.drawImage(rnicon, currentDataAnchorX-80, currentDataAnchorY+130, 40, 40);
        }
        ctx.font = rainRateFontSize+"px Arial";
        ctx.fillStyle = "DarkBlue"
        ctx.fillText(rainRate+" mm/h", currentDataAnchorX-80, currentDataAnchorY+185);
        
        
    }

    
    // Solar rad
        
    var xaxisSol = currentDataAnchorX-40;
    var yaxisSol = currentDataAnchorY+105;
    ctx.font = solUvLegendFontSize+"px Arial";
    ctx.fillStyle = "OrangeRed"
    ctx.fillText(solarRad+" Wm2", xaxisSol+15, yaxisSol);   

    // UV
    
    var xaxisUv = currentDataAnchorX+40;
    var yaxisUv = currentDataAnchorY+105;    
    ctx.font = solUvLegendFontSize+"px Arial";
    ctx.fillStyle = "BlueViolet"
    ctx.fillText("uv "+uvIdx, xaxisUv+20, yaxisUv);   
    
    // Solar icon
    
    ctx.beginPath();
    var sicon = new Image();
    sicon.src = "cur_solar.png";
    sicon.onload = function () 
    {
        ctx.drawImage(sicon, xaxisSol-40, yaxisSol-15, 20, 20);
    }
    ctx.font = curdataIconLegends+"px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("Rad.", xaxisSol-18, yaxisSol-5);
    ctx.fillText("solar", xaxisSol-18, yaxisSol+5);
 

    // TempInt
    
    var xaxisTi = currentDataAnchorX+65;
    var yaxisTi = currentDataAnchorY+15;
    ctx.fillStyle=getTempColor(tempInt);
    ctx.font = intTempLegendFontSize+"px Arial";
    ctx.fillText("("+tempInt+"º)", xaxisTi, yaxisTi);   

    ctx.textAlign = "center";
    
    // WIND ROSE 
    
    var xaxisWind = currentDataAnchorX+10;
    var yaxisWind = currentDataAnchorY+150
    var radio = windRoseRadius;

    // draw circle
    
    ctx.beginPath();
    ctx.arc(xaxisWind, yaxisWind, radio, 0, 2*Math.PI, false);
    ctx.lineWidth=1;
    ctx.strokeStyle="DarkGray";
    ctx.stroke();
    
    // draw N, E, W, S within circle
    
    ctx.font = neswWindFontSize+"px Arial";
    ctx.fillStyle = "Gray";
    var Nxaxis = xaxisWind;
    var Nyaxis = yaxisWind-radio+10; 
    ctx.fillText("N", Nxaxis, Nyaxis);
    
    var Exaxis = xaxisWind+radio-7;
    var Eyaxis = yaxisWind; 
    ctx.fillText("E", Exaxis, Eyaxis);

    var Sxaxis = xaxisWind;
    var Syaxis = yaxisWind+radio-5; 
    ctx.fillText("S", Sxaxis, Syaxis);

    var Wxaxis = xaxisWind-radio+7;
    var Wyaxis = yaxisWind; 
    ctx.fillText("W", Wxaxis, Wyaxis);
    
    // draw wind direction
    var dir4display = windDir+270;
    if (dir4display>360) { dir4display = dir4display-360; }
    var startDir = dir4display*Math.PI/180;
    var endDir = startDir+0.1;

    // draw arrow 
    
    ctx.beginPath();
    windDirRad = windDir*Math.PI/180;
    var arrowX = xaxisWind+(radio-10)*Math.sin(windDirRad);
    var arrowY = yaxisWind-(radio-10)*Math.cos(windDirRad);
    var arrowDir = windDir+180;
    arrowDir = windDirRad + Math.PI;
    
    drawArrowhead(arrowX,arrowY,arrowDir,ctx,"Gray");

    // print wind speed
    
    ctx.beginPath();
    ctx.font = windSpeedLegendFontSize+"px Arial";
    ctx.fillStyle = "Blue"
    ctx.fillText(windSpeed+" km/h", xaxisWind, yaxisWind-10);
    ctx.font = windDirTextFontSize+"px Arial";
    ctx.fillText(windDir+"º  "+getWindDirText(windDir),xaxisWind, yaxisWind+5);
    
    ctx.beginPath();
    ctx.font = windGustLegendFontSize+"px Arial";
    ctx.fillStyle = "DarkBlue";
    ctx.fillText("("+windGust+" km/h)", xaxisWind, yaxisWind+20);
     
       
    var t = setTimeout('update_meteoSarriaCurrentData()', 60000);
    
}

