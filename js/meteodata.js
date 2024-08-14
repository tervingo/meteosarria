/* 
 METEO data to the right of the title image
 */

function print_day_meteodata ()
{
    var dayData = [];
    dayData = getDayData();
    
    var tmax = dayData[1];
    var tmaxTime = dayData[2]; 
    var tmin  = dayData[3];
    var tminTime = dayData[4]; 
    var hmax = dayData[5]; 
    var hmaxTime = dayData[6];
    var hmin = dayData[7]; 
    var hminTime = dayData[8]; 
    var pmax = dayData[9]; 
    var pmaxTime = dayData[10]; 
    var pmin = dayData[11]; 
    var pminTime = dayData[12]; 
    var solmax = dayData[13]; 
    var solmaxTime = dayData[14]; 
    var windmaxspeed = dayData[15]; 
    var windmaxdir = dayData[16]; 
    var windmaxTime = dayData[17];
    var rainday = dayData[18];
    var rainyear = dayData[19];
    var forecast = dayData[20];
    var lunaSeg = dayData[21]; 
    var lunaPerc = dayData[22];
    
    print_meteosarriaDayMeteoData(tmax, tmaxTime, tmin, tminTime, 
                                       hmax, hmaxTime, hmin, hminTime, 
                                       pmax, pmaxTime, pmin, pminTime, 
                                       solmax, solmaxTime, 
                                       windmaxspeed, windmaxdir, windmaxTime, 
                                       rainday, rainyear,
                                       forecast,
                                       lunaSeg, lunaPerc);
}


function print_meteosarriaDayMeteoData(tmax, tmaxTime, tmin, tminTime, 
                                       hmax, hmaxTime, hmin, hminTime, 
                                       pmax, pmaxTime, pmin, pminTime, 
                                       solmax, solmaxTime, 
                                       windmaxspeed, windmaxdir, windmaxTime, 
                                       rainday, rainyear,
                                       forecast,
                                       lunaSeg, lunaPerc)
{
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");

    ctx.textAlign = "start";

    var nowData = [];
    nowData = getDataNow();
//    var forecast = nowData[16];
//    var luna = nowData[17];
    var sunriseTime = nowData[21];
    var sunsetTime = nowData[22];
    var dayLength = nowData[23];


// Date & Time


    mins = mins > 9 ? mins : '0' + mins;
    
    var date = day+"."+month+"."+year;
    var time = hour+":"+mins;
    ctx.font = meteoDataHeaderFontSize+"px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText(date+" - "+time, meteoDataDateTimeAnchorX, meteoDataDateTimeAnchorY);
 
 
// Tmax
    var tmaxX = meteoDataAnchorX;
    var tmaxY = meteoDataAnchorY;

    ctx.beginPath();
    var ticon = new Image();
    ticon.src = "temp.png";
    ticon.onload = function () 
    {
        ctx.drawImage(ticon, tmaxX, tmaxY, 20, 20);
    }
    ctx.font = "11px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("max", tmaxX+20, tmaxY+20);
    ctx.font = meteoDataValFontSize+"px Arial";
    ctx.fillStyle = getTempColor(tmax);
    ctx.fillText(tmax+"º",tmaxX+40, tmaxY+15);
    var timeTmax = getHour(tmaxTime)+":"+getMin(tmaxTime);
    ctx.font = "11px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("("+timeTmax+")", tmaxX+80, tmaxY+15);
    

// Tmin
    var tminX = meteoDataAnchorX+meteoDataAnchorXOffset;
    var tminY = meteoDataAnchorY;

    ctx.beginPath();
    var ticon = new Image();
    ticon.src = "temp.png";
    ticon.onload = function () 
    {
        ctx.drawImage(ticon, tminX, tminY, 20, 20);
    }
    ctx.font = "11px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("min", tminX+20, tminY+20);
    ctx.font = meteoDataValFontSize+"px Arial";
    ctx.fillStyle = getTempColor(tmin);
    ctx.fillText(tmin+"º",tminX+40, tminY+15);
    var timeTmin = getHour(tminTime)+":"+getMin(tminTime);
    ctx.font = "11px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("("+timeTmin+")", tminX+80, tminY+15);

 
// Hmax
    var hmaxX = meteoDataAnchorX;
    var hmaxY = meteoDataAnchorY+meteoDataAnchorYOffset;

    ctx.beginPath();
    var hicon = new Image();
    hicon.src = "cur_hum.png";
    hicon.onload = function () 
    {
        ctx.drawImage(hicon, hmaxX+2, hmaxY-5, 23, 23);
    }
    ctx.font = "11px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("max", hmaxX+20, hmaxY+20);
    ctx.font = meteoDataValFontSize+"px Arial";
    ctx.fillStyle = getHumColor(hmax);
    ctx.fillText(hmax+"%",hmaxX+40, hmaxY+15);
    var timeHmax = getHour(hmaxTime)+":"+getMin(hmaxTime);
    ctx.font = "11px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("("+timeHmax+")", hmaxX+80, hmaxY+15);

// Hmin
    var hminX = meteoDataAnchorX+meteoDataAnchorXOffset;
    var hminY = meteoDataAnchorY+meteoDataAnchorYOffset;

    ctx.beginPath();
    var hicon = new Image();
    hicon.src = "cur_hum.png";
    hicon.onload = function () 
    {
        ctx.drawImage(hicon, hminX+2, hminY-5, 23, 23);
    }
    ctx.font = "11px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("min", hminX+20, hminY+20);
    ctx.font = meteoDataValFontSize+"px Arial";
    ctx.fillStyle = getHumColor(hmin);
    ctx.fillText(hmin+"%",hminX+40, hminY+15);
    var timeHmin = getHour(hminTime)+":"+getMin(hminTime);
    ctx.font = "11px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("("+timeHmin+")", hminX+80, hminY+15);

// Pmax
    var pmaxX = meteoDataAnchorX;
    var pmaxY = meteoDataAnchorY+2*meteoDataAnchorYOffset;

    ctx.beginPath();
    var picon = new Image();
    picon.src = "cur_pres.png";
    picon.onload = function () 
    {
        ctx.drawImage(picon, pmaxX, pmaxY, 18, 18);
    }
    ctx.font = "11px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("max", pmaxX+20, pmaxY+20);
    ctx.font = meteoDataValFontSize+"px Arial";
    ctx.fillStyle = presHistColor;
    ctx.fillText(pmax+" hPa",pmaxX+40, pmaxY+15);
    var timePmax = getHour(pmaxTime)+":"+getMin(pmaxTime);
    ctx.font = "11px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("("+timePmax+")", pmaxX+90, pmaxY+25);

// Pmin
    var pminX = meteoDataAnchorX+meteoDataAnchorXOffset;
    var pminY = meteoDataAnchorY+2*meteoDataAnchorYOffset;

    ctx.beginPath();
    var picon = new Image();
    picon.src = "cur_pres.png";
    picon.onload = function () 
    {
        ctx.drawImage(picon, pminX, pminY, 18, 18);
    }
    ctx.font = "11px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("min", pminX+20, pminY+20);
    ctx.font = meteoDataValFontSize+"px Arial";
    ctx.fillStyle = presHistColor;
    ctx.fillText(pmin+" hPa",pminX+40, pminY+15);
    var timePmin = getHour(pminTime)+":"+getMin(pminTime);
    ctx.font = "11px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("("+timePmin+")", pminX+90, pminY+25);

// Solar max

    var smaxX = meteoDataAnchorX;
    var smaxY = meteoDataAnchorY+5+3*meteoDataAnchorYOffset;

    ctx.beginPath();
    var sicon = new Image();
    sicon.src = "cur_solar.png";
    sicon.onload = function () 
    {
        ctx.drawImage(sicon, smaxX, smaxY, 18, 18);
    }
    ctx.font = "11px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("max", smaxX+20, smaxY+20);
    ctx.font = meteoDataValFontSize+"px Arial";
    ctx.fillStyle = "OrangeRed";
    ctx.fillText(solmax+" Wm2",smaxX+40, smaxY+15);
    var timeSmax = getHour(solmaxTime)+":"+getMin(solmaxTime);
    ctx.font = "11px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("("+timeSmax+")", smaxX+110, smaxY+15);
   

// Wind gust max

    var wmaxX = meteoDataAnchorX;
    var wmaxY = meteoDataAnchorY+5+4*meteoDataAnchorYOffset;

    ctx.beginPath();
    var wicon = new Image();
    wicon.src = "wind.png";
    wicon.onload = function () 
    {
        ctx.drawImage(wicon, wmaxX, wmaxY, 20, 20);
    }
    ctx.font = "11px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("max", wmaxX+20, wmaxY+20);
    ctx.font = meteoDataValFontSize+"px Arial";
    ctx.fillStyle = "Blue";
    ctx.fillText(windmaxspeed+" km/h",wmaxX+40, wmaxY+15);
    ctx.fillText("("+windmaxdir+"º "+getWindDirText(windmaxdir)+")",wmaxX+110, wmaxY+15);
    var timeWmax = getHour(windmaxTime)+":"+getMin(windmaxTime);
    ctx.font = "11px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("("+timeWmax+")", wmaxX+190, wmaxY+15);
    
//  Rain (daily / yearly)

    var rmaxX = meteoDataAnchorX;
    var rmaxY = meteoDataAnchorY+5+5*meteoDataAnchorYOffset;

    ctx.beginPath();
    var ricon1 = new Image();
    ricon1.src = "cur_rain.png";
    ricon1.onload = function () 
    {
        ctx.drawImage(ricon1, rmaxX, rmaxY, 20, 20);
    }
    ctx.font = "11px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText(day+"."+month, rmaxX+20, rmaxY+20);
    ctx.font = meteoDataValFontSize+"px Arial";
    ctx.fillStyle = "DodgerBlue";
    ctx.fillText(rainday+" mm",rmaxX+40, rmaxY+15);

    var ricon2 = new Image();
    ricon2.src = "cur_rain.png";
    ricon2.onload = function () 
    {
        ctx.drawImage(ricon2, rmaxX+meteoDataAnchorXOffset, rmaxY, 20, 20);
    }
    ctx.font = "11px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText(year, rmaxX+147, rmaxY+20);
    ctx.font = meteoDataValFontSize+"px Arial";
    ctx.fillStyle = "DodgerBlue";
    ctx.fillText(rainyear+" mm", rmaxX+180, rmaxY+15);
    
    // Sunrise - sunset data
    
    ctx.textAlign = "center";
    
    var sunriseRtime = getRealTimeFrom(sunriseTime);
    var sunriseX = timeLineAnchor+sunriseRtime*timeLineOffset;
    var sunriseY = tempLineAnchor - 4*tempLineOffset;
    
    ctx.beginPath();
    drawSunriseLoop(sunriseX, sunriseY, 1, ctx);
//    ctx.arc(sunriseX, sunriseY, 15, -Math.PI, 0, false);
//    ctx.fillStyle="Gold";
//    ctx.fill();
    ctx.font="12px Arial";
    ctx.fillStyle="DimGray";
    ctx.fillText(sunriseTime, sunriseX, sunriseY+15);

    ctx.beginPath();
    ctx.lineWidth = 0.3;
    ctx.setLineDash([4,2]);
    ctx.moveTo(sunriseX, sunriseY);
    ctx.lineTo(sunriseX, tempLineAnchor+tempLineOffset);
    ctx.strokeStyle="Gold";
    ctx.stroke();
    ctx.setLineDash([1,0]);
    

    var sunsetRtime = getRealTimeFrom(sunsetTime);
    var sunsetX = timeLineAnchor+sunsetRtime*timeLineOffset;
    var sunsetY = tempLineAnchor - 4*tempLineOffset;
    
    ctx.beginPath();
    var ss = setTimeout(function() { drawSunsetLoop(sunsetX, sunsetY, 20, ctx) }, 8000);
//    ctx.arc(sunsetX, sunsetY, 15, -Math.PI, 0, false);
//    ctx.fillStyle="DarkOrange";
//    ctx.fill();
    ctx.font="12px Arial";
    ctx.fillStyle="DimGray";
    ctx.fillText(sunsetTime, sunsetX, sunsetY+15);

    ctx.beginPath();
    ctx.lineWidth = 0.3;
    ctx.setLineDash([2,2]);
    ctx.moveTo(sunsetX, sunsetY);
    ctx.lineTo(sunsetX, tempLineAnchor+tempLineOffset);
    ctx.strokeStyle="DarkOrange";
    ctx.stroke();
    ctx.setLineDash([1,0]);

    var dayLengthY = tempLineAnchor - 4*tempLineOffset - 10;
    ctx.font="15px Arial";
    ctx.fillStyle="DarkSlateGray";
    var horas = dayLength.toString().substring(0,2);
    var minutos = dayLength.toString().substring(3,5);
    ctx.fillText(horas+"h "+minutos+"m", (sunriseX+sunsetX)/2, dayLengthY+5);
    drawArrowhead((sunriseX+sunsetX)/2-60,dayLengthY,-Math.PI/2,ctx,"Gold");
    drawArrowhead((sunriseX+sunsetX)/2+60,dayLengthY,Math.PI/2,ctx,"DarkOrange");
    
    // luna
    
    var xaxisLuna = sunsetX + 50;
    var yaxisLuna = tempLineAnchor - 4*tempLineOffset-20;

    drawMoonPhase(lunaSeg,ctx,xaxisLuna, yaxisLuna+10, 10, lunaPerc);
    ctx.font="14 px Arial";
    ctx.fillStyle="DarkSlateGray";
    ctx.fillText(lunaPerc+"%", xaxisLuna+40, yaxisLuna+15);  
    
     // forecast

//    var xaxisFc = meteoDayDataFcX;
//    var yaxisFc = meteoDayDataFcY;
//
//    ctx.beginPath();
//    var fcIcon = new Image();
//    fcIcon.src = "fc.png";
//    fcIcon.onload = function () 
//    {
//        ctx.drawImage(fcIcon,xaxisFc-25,yaxisFc+5,30,30);
//    }
//
//    ctx.beginPath();
//    var fcImg = new Image();
//    fcImg.src = "fc"+forecast+".png";
//    fcImg.onload = function () 
//    {
//        ctx.drawImage(fcImg,xaxisFc+20,yaxisFc,40,40);
//    }
   
}

var linkWidth;
var linkHeight;
var linkX;
var linkY;
var function2call; 
 


function print_meteosarriaYearMonthData(yearOrMonth)
{
    var canvas = document.getElementById("monthyear");
    var ctx = canvas.getContext("2d");

    var yearData = [];
    var monthData = [];
    
    var fromX;
    var fromY;
    var toX;
    var toY;
    
    ctx.textAlign = "center";

   
    if (yearOrMonth == METEODATA_YEAR)
    {
        ctx.clearRect(meteoYearDataYearAnchorX-50,meteoYearDataYearAnchorY-20,250,180);
        // PRINT YEAR
 
        ctx.font = meteoDataHeaderFontSize+"px Arial";
        ctx.fillStyle = "DimGray";
        ctx.fillText(year, meteoYearDataYearAnchorX, meteoYearDataYearAnchorY);

        // Print tab & dimmed month with link 


        ctx.beginPath();
        ctx.strokeStyle = "LightGray";
        ctx.arc(meteoYearDataYearAnchorX+40, meteoYearDataYearAnchorY-8, 11, -Math.PI/2,0);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(meteoYearDataYearAnchorX+62, meteoYearDataYearAnchorY-8, 11, Math.PI/2,Math.PI);
        ctx.stroke();
        
        ctx.beginPath();
        fromX = meteoYearDataYearAnchorX+62;
        fromY = meteoYearDataYearAnchorY+3;
        toX = meteoYearDataYearAnchorX+180;
        toY = meteoYearDataYearAnchorY+3;
        ctx.strokeStyle = "LightGray";
        ctx.moveTo(fromX,fromY);
        ctx.lineTo(toX,toY);
        ctx.stroke();
        ctx.beginPath();
        fromX = meteoYearDataYearAnchorX+40;
        fromY = meteoYearDataYearAnchorY-19;
        toX = meteoYearDataYearAnchorX-50;
        toY = meteoYearDataYearAnchorY-19;
        ctx.strokeStyle = "LightGray";
        ctx.moveTo(fromX,fromY);
        ctx.lineTo(toX,toY);
        ctx.stroke();


        ctx.font = meteoDataHeaderFontSize+"px Arial";
        ctx.fillStyle = "SteelBlue";
        ctx.fillText(month+"/"+year, meteoYearDataYearAnchorX+110, meteoYearDataYearAnchorY);
        
        linkWidth = ctx.measureText(month+"/"+year).width;
        linkHeight = 30;
        linkX = meteoYearDataYearAnchorX+60;
        linkY = meteoYearDataYearAnchorY+10;
        function2call = METEODATA_MONTH;
        
        draw_link();
        
        // Get yearly data
        yearData = getYearData(year);
        var tmax = yearData[1];
        var tmaxT = yearData[2];
        var tmin = yearData[3];
        var tminT = yearData[4];
        var pmax = yearData[5];
        var pmaxT = yearData[6];
        var pmin = yearData[7];
        var pminT = yearData[8];
        var wmaxS = yearData[9];
        var wmaxD = yearData[10];
        var wmaxT = yearData[11];
        var solMax = yearData[12];
        var solMaxT = yearData[13];
        var rain = yearData[14];
        
        print_meteosarriaYearMonthMeteoData(tmax, tmaxT, tmin, tminT, pmax, pmaxT, pmin, pminT, solMax, solMaxT, wmaxS, wmaxD, wmaxT, rain, ctx, METEODATA_YEAR);
    }
    else
    {
        ctx.clearRect(meteoYearDataYearAnchorX-50, meteoYearDataYearAnchorY-20,250,180);
        // PRINT MONTH

        ctx.font = meteoDataHeaderFontSize+"px Arial";
        ctx.fillStyle = "DimGray";
        ctx.fillText(month+"/"+year, meteoYearDataYearAnchorX+110, meteoYearDataYearAnchorY);
        
        // Print tab & dimmed year with link 

        ctx.beginPath();

        ctx.strokeStyle = "LightGray";
        ctx.arc(meteoYearDataYearAnchorX+40, meteoYearDataYearAnchorY-8, 11, 0, Math.PI/2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(meteoYearDataYearAnchorX+62, meteoYearDataYearAnchorY-8, 11, Math.PI, -Math.PI/2);
        ctx.stroke();

        ctx.beginPath();
        fromX = meteoYearDataYearAnchorX+62;
        fromY = meteoYearDataYearAnchorY-19;
        toX = meteoYearDataYearAnchorX+180;
        toY = meteoYearDataYearAnchorY-19;
        ctx.strokeStyle = "LightGray";
        ctx.moveTo(fromX,fromY);
        ctx.lineTo(toX,toY);
        ctx.stroke();
        ctx.beginPath();
        fromX = meteoYearDataYearAnchorX+40;
        fromY = meteoYearDataYearAnchorY+3;
        toX = meteoYearDataYearAnchorX-50;
        toY = meteoYearDataYearAnchorY+3;
        ctx.strokeStyle = "LightGray";
        ctx.moveTo(fromX,fromY);
        ctx.lineTo(toX,toY);
        ctx.stroke();

        ctx.font = meteoDataHeaderFontSize+"px Arial";
        ctx.fillStyle = "SteelBlue";
        ctx.fillText(year, meteoYearDataYearAnchorX, meteoYearDataYearAnchorY);

        linkWidth = ctx.measureText(year).width;
        linkHeight = 30;
        linkX = meteoYearDataYearAnchorX-20;
        linkY = meteoYearDataYearAnchorY+10;
        function2call = METEODATA_YEAR;
        
        draw_link();

        // Get month data
        monthData = getMonthData(month);
        var tmax = monthData[1];
        var tmaxT = monthData[2];
        var tmin = monthData[3];
        var tminT = monthData[4];
        var pmax = monthData[5];
        var pmaxT = monthData[6];
        var pmin = monthData[7];
        var pminT = monthData[8];
        var wmaxS = monthData[9];
        var wmaxD = monthData[10];
        var wmaxT = monthData[11];
        var solMax = monthData[12];
        var solMaxT = monthData[13];
        var rain = monthData[14];
        
        print_meteosarriaYearMonthMeteoData(tmax, tmaxT, tmin, tminT, pmax, pmaxT, pmin, pminT, solMax, solMaxT, wmaxS, wmaxD, wmaxT, rain, ctx, METEODATA_MONTH);
        

    }
}

//check if the mouse is over the link and change cursor style
function on_mousemove_mt (ev) {
  var x, y;

  // Get the mouse position relative to the canvas element.
  if (ev.layerX || ev.layerX == 0) { //for firefox
    x = ev.layerX;
    y = ev.layerY;
  }
//  x-=canvas.offsetLeft;
//  y-=canvas.offsetTop;

  //is the mouse over the link?
  if(x>=linkX && x <= (linkX + linkWidth) && y<=linkY && y>= (linkY-linkHeight)){
      document.body.style.cursor = "pointer";
      inLink=true;
  }
  else{
      document.body.style.cursor = "";
      inLink=false;
  }
}

//if the link has been clicked, go to link
function on_click_mt(e) {
  if (inLink)  {
    print_meteosarriaYearMonthData(function2call);
    return false;
  }
}

function draw_link()
{
   //add mouse listeners
    byId('monthyear').addEventListener("mousemove", on_mousemove_mt, false);
    byId('monthyear').addEventListener("click", on_click_mt, false);

}


function print_meteosarriaYearMonthMeteoData(tmax, tmaxT, tmin, tminT, pmax, pmaxT, pmin, pminT, solMax, solMaxT, wmaxS, wmaxD, wmaxT, rain, ctx, yearOrMonth)
{

    // Tmax

    var tmaxX = meteoYearDataAnchorX;
    var tmaxY = meteoYearDataAnchorY;
    
    var monthM = getMonth(tmaxT);
    var dayM = getDay(tmaxT);
    var hourM = getHour(tmaxT);
    var minM = getMin(tmaxT);


    ctx.textAlign = "start";

    ctx.beginPath();
    var ticon = new Image();
    ticon.src = "temp.png";
    ticon.onload = function () 
    {
        ctx.drawImage(ticon, tmaxX, tmaxY, 20, 20);
    }
    ctx.font = "11px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("max", tmaxX+20, tmaxY+20);
    ctx.font = meteoDataValFontSize+"px Arial";
    ctx.fillStyle = getTempColor(tmax);
    ctx.fillText(tmax+"º",tmaxX+65, tmaxY+20);
    ctx.fillStyle = "DimGray";
    ctx.font = meteoDataValFontSize+"px Arial";
    ctx.fillText("("+dayM+"."+monthM+" - "+hourM+":"+minM+")", tmaxX+meteoYearDataDateOffset, tmaxY+20);
    
    // Tmin

    var tminX = meteoYearDataAnchorX;
    var tminY = meteoYearDataAnchorY+meteoDataAnchorYOffset;
    
    var monthM = getMonth(tminT);
    var dayM = getDay(tminT);
    var hourM = getHour(tminT);
    var minM = getMin(tminT);

    ctx.beginPath();
    var ticon = new Image();
    ticon.src = "temp.png";
    ticon.onload = function () 
    {
        ctx.drawImage(ticon, tminX, tminY, 20, 20);
    }
    ctx.font = "11px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("min", tminX+20, tminY+20);
    ctx.font = meteoDataValFontSize+"px Arial";
    ctx.fillStyle = getTempColor(tmin);
    ctx.fillText(tmin+"º",tminX+65, tminY+18);
    ctx.fillStyle = "DimGray";
    ctx.font = meteoDataValFontSize+"px Arial";
    ctx.fillText("("+dayM+"."+monthM+" - "+hourM+":"+minM+")", tminX+meteoYearDataDateOffset, tminY+18);
    
// Pmax

    var pmaxX = meteoYearDataAnchorX;
    var pmaxY = meteoYearDataAnchorY+2*meteoDataAnchorYOffset;;
    
    var monthM = getMonth(pmaxT);
    var dayM = getDay(pmaxT);
    var hourM = getHour(pmaxT);
    var minM = getMin(pmaxT);

    ctx.beginPath();
    var picon = new Image();
    picon.src = "cur_pres.png";
    picon.onload = function () 
    {
        ctx.drawImage(picon, pmaxX, pmaxY, 20, 20);
    }
    ctx.font = "11px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("max", pmaxX+20, pmaxY+20);
    ctx.font = meteoDataValFontSize+"px Arial";
    ctx.fillStyle = presHistColor;
    ctx.fillText(pmax+" hPa",pmaxX+65, pmaxY+15);
    ctx.fillStyle = "DimGray";
    ctx.font = meteoDataValFontSize+"px Arial";
    ctx.fillText("("+dayM+"."+monthM+" - "+hourM+":"+minM+")", pmaxX+meteoYearDataDateOffset, pmaxY+15);
    
    // Pmin

    var pminX = meteoYearDataAnchorX;
    var pminY = meteoYearDataAnchorY+3*meteoDataAnchorYOffset;
    
    var monthM = getMonth(tminT);
    var dayM = getDay(tminT);
    var hourM = getHour(tminT);
    var minM = getMin(tminT);

    ctx.beginPath();
    var picon = new Image();
    picon.src = "cur_pres.png";
    picon.onload = function () 
    {
        ctx.drawImage(picon, pminX, pminY, 20, 20);
    }
    ctx.font = "11px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("min", pminX+20, pminY+20);
    ctx.font = meteoDataValFontSize+"px Arial";
    ctx.fillStyle = presHistColor;
    ctx.fillText(pmin+" hPa",pminX+65, pminY+15);
    ctx.fillStyle = "DimGray";
    ctx.font = meteoDataValFontSize+"px Arial";
    ctx.fillText("("+dayM+"."+monthM+" - "+hourM+":"+minM+")", pminX+meteoYearDataDateOffset, pminY+15);
    
// sol max

    var smaxX = meteoYearDataAnchorX;
    var smaxY = meteoYearDataAnchorY+4*meteoDataAnchorYOffset;;
    
    var monthM = getMonth(solMaxT);
    var dayM = getDay(solMaxT);
    var hourM = getHour(solMaxT);
    var minM = getMin(solMaxT);

    ctx.beginPath();
    var sicon = new Image();
    sicon.src = "cur_solar.png";
    sicon.onload = function () 
    {
        ctx.drawImage(sicon, smaxX, smaxY, 20, 20);
    }
    ctx.font = "11px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("max", smaxX+20, smaxY+20);
    ctx.font = meteoDataValFontSize+"px Arial";
    ctx.fillStyle = "OrangeRed";
    ctx.fillText(solMax+" Wm2",smaxX+65, smaxY+15);
    ctx.fillStyle = "DimGray";
    ctx.font = meteoDataValFontSize+"px Arial";
    ctx.fillText("("+dayM+"."+monthM+" - "+hourM+":"+minM+")", smaxX+meteoYearDataDateOffset, smaxY+15);

    // Wind wmaxS, wmaxD, wmaxT, rain
    
    var wmaxX = meteoYearDataAnchorX;
    var wmaxY = meteoYearDataAnchorY+5*meteoDataAnchorYOffset;;
    
    var monthM = getMonth(wmaxT);
    var dayM = getDay(wmaxT);
    var hourM = getHour(wmaxT);
    var minM = getMin(wmaxT);

    ctx.beginPath();
    var wicon = new Image();
    wicon.src = "wind.png";
    wicon.onload = function () 
    {
        ctx.drawImage(wicon, wmaxX, wmaxY, 20, 20);
    }
    ctx.font = "11px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("max", wmaxX+20, wmaxY+20);
    ctx.font = meteoDataValFontSize+"px Arial";
    ctx.fillStyle = "Blue";
    ctx.fillText(wmaxS+" k/m",wmaxX+65, wmaxY+15);
    ctx.fillText(getWindDirText(wmaxD),wmaxX+125, wmaxY+15);
    ctx.fillStyle = "DimGray";
    ctx.font = meteoDataValFontSize+"px Arial";
    ctx.fillText("("+dayM+"."+monthM+" - "+hourM+":"+minM+")", wmaxX+meteoYearDataDateOffset, wmaxY+15);
    
// Rain

    var rmaxX = meteoYearDataAnchorX;
    var rmaxY = meteoYearDataAnchorY+6*meteoDataAnchorYOffset;;
    
    var monthM = getMonth(solMaxT);
    var dayM = getDay(solMaxT);
    var hourM = getHour(solMaxT);
    var minM = getMin(solMaxT);

    ctx.beginPath();
    var ricon = new Image();
    ricon.src = "cur_rain.png";
    ricon.onload = function () 
    {
        ctx.drawImage(ricon, rmaxX, rmaxY, 20, 20);
    }
    ctx.font = "11px Arial";
    ctx.fillStyle = "DimGray";
    if (yearOrMonth==METEODATA_YEAR) { ctx.fillText(year, rmaxX+20, rmaxY+20); }
    else { ctx.fillText(month+"."+year, rmaxX+20, rmaxY+20); }
    ctx.font = meteoDataValFontSize+"px Arial";
    ctx.fillStyle = "DodgerBlue";
    ctx.fillText(rain+" mm",rmaxX+65, rmaxY+15);
    
    ctx.textAlign = "center";

}




