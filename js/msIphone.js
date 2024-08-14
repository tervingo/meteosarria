/* 
 MeteoSarria for iPhone 5S
 */

document.write('<script type="text/javascript" src="js/msIphoneVars.js"></script>');
document.write('<script type="text/javascript" src="js/auxiliary.js"></script>');


function print_msIphoneMeteoData(fechaHora, tempExt, heatIdx, windChill, tempInt, tempMax, timeTmax, tempMin, timeTmin, tempTrend, 
                                 hum, humTrend, 
                                 pres, presTrend, 
                                 windDir, windSpeed, windGust, 
                                 uv, solar, 
                                 rainHour, rainDay,
                                 forecast,
                                 lunaSeg, lunaPerc) 
{
   
    var canvas = document.getElementById("meteoIphone");
    var ctx = canvas.getContext("2d");
    
    // title
    
    ctx.font = titleFontSize+"px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("#meteoSarrià",titleX,titleY);
    
    // Date & Time

    var dia = getDay(fechaHora);
    var mes = getMonth(fechaHora);
    var anno = getYear(fechaHora);
    var hora = getHour(fechaHora);
    var min = getMin(fechaHora);
    var ts = dia+"."+mes+"."+anno+" - "+hora+":"+min;

    ctx.font = timeDateFontSize+"px Arial";
    ctx.fillStyle = "SlateGray";
    ctx.fillText(ts,timeDateX,timeDateY);


    // tempExt
 
    ctx.font = tempExtFontSize+"px Arial";
    ctx.fillStyle = getTempColor(tempExt);
    ctx.fillText(tempExt+"º",tempExtX,tempExtY);
    
    // tempExtTrend 15m
    
    ctx.font = trendFontSize+"px Arial";
    ctx.fillStyle = getTrendColor(tempTrend);
    var trend = getTrendSymbol(tempTrend)
    ctx.fillText(trend,tempExtX+140,tempExtY-5);
    
    // tempInt
 
    ctx.font = tempIntFontSize+"px Arial";
    ctx.fillStyle = getTempColor(tempInt);
    ctx.fillText(tempInt+"º",tempIntX,tempIntY);

    // temp Sens
    
    if ( (heatIdx > tempExt) || (windChill < tempExt))
    {    
        if (isInt(tempExt)) { tSensX = tSensX-45; }
        if (heatIdx > tempExt)
        {
            ctx.fillStyle=getTempColor(heatIdx);
            ctx.font = tempSensFontSize+"px Arial";
            ctx.fillText("("+heatIdx+"º)",tSensX, tSensY);
        }
        else
        {
            ctx.fillStyle=getTempColor(windChill);
            ctx.font = tempSensFontSize+"px Arial";
            ctx.fillText("("+windChill+"º)",tSensX,tSensY);           
        }
    }
    
      
    // hum
    
 
    ctx.font = humFontSize+"px Arial";
    ctx.fillStyle = getHumColor(hum);
    ctx.fillText(hum+"%",humX,humY);
 
    // hum icon
    
    ctx.beginPath();
    var humImg = new Image();
    humImg.src = "cur_hum.png";
    humImg.onload = function () 
    {
        ctx.drawImage(humImg,humX-35,humY-45,45,45);
    }

 
    // humTrend 15m

    ctx.font = trendFontSize+"px Arial";
    ctx.fillStyle = getTrendColor(humTrend);
    var trend = getTrendSymbol(humTrend)
    ctx.fillText(trend,humX+90,humY);
 
     // pres
    
    ctx.font = presFontSize+"px Arial";
    ctx.fillStyle = presHistColor;
    ctx.fillText(pres+"hPa",presX,presY);

    // pres icon
    
    ctx.beginPath();
    var presImg = new Image();
    presImg.src = "cur_pres.png";
    presImg.onload = function () 
    {
        ctx.drawImage(presImg,presX-40,presY-25,30,30);
    }

    // presTrend 60m
    
    ctx.font = trendFontSize+"px Arial";
    ctx.fillStyle = getTrendColor(presTrend);
    var trend = getTrendSymbol(presTrend)
    ctx.fillText(trend,presX+150,presY);
    
    // sol
    
    ctx.font = solFontSize+"px Arial";
    ctx.fillStyle = "OrangeRed";
    ctx.fillText(solar+" Wm2",solX,solY);

    // sol icon
    
    ctx.beginPath();
    var solImg = new Image();
    solImg.src = "cur_solar.png";
    solImg.onload = function () 
    {
        ctx.drawImage(solImg,solX-40,solY-25,30,30);
    }


    // rain
    
    ctx.font = rainFontSize+"px Arial";
    ctx.fillStyle = "DodgerBlue";
    ctx.fillText(rainHour+"mm (h)",rainX,rainY);
    ctx.fillText(rainDay+"mm (d)", rainX+120, rainY);
    
    
    // wind
    
    // draw circle
    
    ctx.beginPath();
    ctx.arc(windX, windY, radio, 0, 2*Math.PI, false);
    ctx.lineWidth=1;
    ctx.strokeStyle="DarkGray";
    ctx.stroke();
    
    // draw N, E, W, S within circle
    
    ctx.font = "15px Arial";
    ctx.fillStyle = "DarkGray";
    var Nxaxis = windX-5;
    var Nyaxis = windY-radio+15; 
    ctx.fillText("N", Nxaxis, Nyaxis);
    
    // draw wind direction

    var windDirRad = windDir*Math.PI/180;
    var arrowX = windX+(radio-20)*Math.sin(windDirRad);
    var arrowY = windY-(radio-20)*Math.cos(windDirRad);
    var arrowDir = windDir+180;
    arrowDir = windDirRad + Math.PI;
    
    drawArrowhead(arrowX,arrowY,arrowDir,ctx, "DarkGray");

    
    // print wind speed
    
    ctx.beginPath();
    ctx.font = windSpeedFontSize+"px Arial";
    ctx.fillStyle = "Blue"
    ctx.fillText(windSpeed+" km/h", windX-35, windY-10);
    ctx.font = windDirFontSize+"px Arial";
    ctx.fillText(getWindDirText(windDir),windX-10, windY+10);
    
    ctx.beginPath();
    ctx.font = windGustFontSize+"px Arial";
    ctx.fillStyle = "DarkBlue";
    ctx.fillText("("+windGust+" km/h)", windX-30, windY+35);
    
    // Tmax 
    
    ctx.font = tempMaxMinFontSize+"px Arial";
    ctx.fillStyle="Red";
    ctx.fillText("↑",tempMaxX,tempMaxY-5);
    ctx.fillStyle = getTempColor(tempMax);
    ctx.fillText(tempMax+"º",tempMaxX+15,tempMaxY);
    
    // Time Tmax
    
    ctx.font = timeTmaxMinFontSize+"px Arial";
    ctx.fillStyle="SlateGray";
    var hourTmax = getHour(timeTmax) ;
    var minTmax = getMin(timeTmax) ;
    ctx.fillText(hourTmax+":"+minTmax, timeTmaxX, timeTmaxY);
    
    
    // Tmin 
    
    ctx.font = tempMaxMinFontSize+"px Arial";
    ctx.fillStyle="Blue";
    ctx.fillText("↓",tempMinX,tempMinY-5);
    ctx.fillStyle = getTempColor(tempMin);
    ctx.fillText(tempMin+"º",tempMinX+15,tempMinY);

    // Time Tmin
    
    ctx.font = timeTmaxMinFontSize+"px Arial";
    ctx.fillStyle="SlateGray";
    var hourTmin = getHour(timeTmin) ;
    var minTmin = getMin(timeTmin) ;
    ctx.fillText(hourTmin+":"+minTmin, timeTminX, timeTminY);
      
    
    // forecast


    ctx.beginPath();
    var fcImg = new Image();
    fcImg.src = "fc"+forecast+".png";
    fcImg.onload = function () 
    {
        ctx.drawImage(fcImg,fcX,fcY,50,50);
    }
    
    // luna
    
    ctx.beginPath();
    drawMoonPhase(lunaSeg,ctx,lunaX,lunaY,20,lunaPerc);
    ctx.font="14 px Arial";
    ctx.fillStyle="DarkSlateGray";
    ctx.fillText(lunaPerc+"%", lunaX-15, lunaY+40);  

    // Sunrise & sunset

    var nowData = [];
    nowData = getDataNow();
    var sunriseTime = nowData[21];
    var sunsetTime = nowData[22];
    var dayLength = nowData[23];

    
    ctx.beginPath();
    ctx.arc(sunriseX, sunriseY, 15, -Math.PI, 0, false);
    ctx.fillStyle="Gold";
    ctx.fill();
    ctx.font="12px Arial";
    ctx.fillStyle="DimGray";
    ctx.fillText(sunriseTime, sunriseX-15, sunriseY+15);
    

    ctx.beginPath();
    ctx.arc(sunsetX, sunsetY, 15, -Math.PI, 0, false);
    ctx.fillStyle="DarkOrange";
    ctx.fill();
    ctx.font="12px Arial";
    ctx.fillStyle="DimGray";
    ctx.fillText(sunsetTime, sunsetX-15, sunsetY+15);

    ctx.font = dayLengthFontSize+"px Arial";
    ctx.fillStyle="SlateGray";
    var horas = dayLength.toString().substring(0,2);
    var minutos = dayLength.toString().substring(3,5);
    ctx.fillText(horas+"h "+minutos+"m", dayLengthX, dayLengthY);
 
    drawArrowhead(dayLengthX-25,dayLengthY-5,-Math.PI/2,ctx,"DarkGray");
    drawArrowhead(dayLengthX+85,dayLengthY-5,Math.PI/2,ctx,"DarkGray");

}
                                    