/* 
MAXIMUN & MINIMUM VALUES DURING LAST 24h
 */


// GLOBAL VARIABLES

var xaxisTempMax;
var xaxisTempMin;
var xaxisHumMax;
var xaxisHumMin;
var xaxisPresMax;
var xaxisPresMin;

var prevYaxis;

function update_meteoSarria_day_maxmin ()
{
    var datos_maxmin = [];
    datos_maxmin = getMaxMinData();
    
    var tempMax = datos_maxmin[1];
    var tempMaxTime = datos_maxmin[2];
    var tempMin = datos_maxmin[3];
    var tempMinTime = datos_maxmin[4];
    var humMax = datos_maxmin[5];
    var humMaxTime = datos_maxmin[6];
    var humMin = datos_maxmin[7];
    var humMinTime = datos_maxmin[8];
    var presMax = datos_maxmin[9];
    var presMaxTime = datos_maxmin[10];
    var presMin = datos_maxmin[11];
    var presMinTime = datos_maxmin[12];
    
    print_meteoSarriaTempMax(tempMaxTime, tempMax);
    print_meteoSarriaTempMin(tempMinTime, tempMin);
    print_meteoSarriaHumMax(humMaxTime, humMax);
    print_meteoSarriaHumMin(humMinTime, humMin);
    print_meteoSarriaPresMax(presMaxTime, presMax);
    print_meteoSarriaPresMin(presMinTime, presMin);
}


// MAX Temperature

function print_meteoSarriaTempMax(timeMax, tempMax)
{
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");

    var hourMax = getHour(timeMax);
    var minMax = getMin(timeMax);
    var yearMax = getYear(timeMax);
    var monthMax = getMonth(timeMax);
    var dayMax =  getDay(timeMax);
    var horaMax4display = hourMax+":"+minMax;
    var fechaMax4display = dayMax+"."+monthMax+"."+yearMax;
    
    xaxisTempMax = timeLineAnchor+(Number(hourMax) + Number(minMax)/60)*timeLineOffset+10;
    yaxisTempMax = tempLineAnchor - (tempMax/10)*tempLineOffset-20;
    
    prevYaxis = yaxisTempMax;
    yaxisTempMax = getMaxMinYaxis(xaxisTempMax, yaxisTempMax, "temp", true);
    if (yaxisTempMax != prevYaxis) { tMaxYaxisMoved = true; } else { tMaxYaxisMoved = false; }
 

    ctx.font = tempMaxMinLegendFontSize+"px Arial";
    ctx.fillStyle = getTempColor(tempMax);
    ctx.fillText(tempMax+"º", xaxisTempMax, yaxisTempMax);
  
    ctx.font = tempMaxMinDateTimeFontSize+"px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText(horaMax4display, xaxisTempMax-5, yaxisTempMax+14);
    
    if (tMaxYaxisMoved) { xaxis4arrow = xaxisTempMax-25; yaxis4arrow = yaxisTempMax+5; } else { xaxis4arrow = xaxisTempMax; yaxis4arrow = yaxisTempMax+25; }
    drawArrowhead(xaxis4arrow,yaxis4arrow,2*Math.PI,ctx,getTempColor(tempMax));  

}

//  MIN Temperature

function print_meteoSarriaTempMin(timeMin, tempMin)
{
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");

    var hourMin = getHour(timeMin);
    var minMin = getMin(timeMin);
    var yearMin = getYear(timeMin);
    var monthMin = getMonth(timeMin);
    var dayMin =  getDay(timeMin);
    var horaMin4display = hourMin+":"+minMin;
    var fechaMin4display = dayMin+"."+monthMin+"."+yearMin;

    var xaxisTempMin = timeLineAnchor+(Number(hourMin) + Number(minMin)/60)*timeLineOffset+10;
    var yaxisTempMin = tempLineAnchor - (tempMin/10)*tempLineOffset+20;

    prevYaxis = yaxisTempMin;
    yaxisTempMin = getMaxMinYaxis(xaxisTempMin, yaxisTempMin, "temp", false);
    if (yaxisTempMin != prevYaxis) { tMinYaxisMoved = true; } else { tMinYaxisMoved = false; }
    
    
    ctx.font = tempMaxMinLegendFontSize+"px Arial";
    ctx.fillStyle = getTempColor(tempMin);
    ctx.fillText(tempMin+"º", xaxisTempMin, yaxisTempMin);
    
    ctx.font = tempMaxMinDateTimeFontSize+"px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText(horaMin4display, xaxisTempMin-5, yaxisTempMin+14);

    if (tMinYaxisMoved) { xaxis4arrow = xaxisTempMin-25; yaxis4arrow = yaxisTempMin+5; } else { xaxis4arrow = xaxisTempMin; yaxis4arrow = yaxisTempMin-20; }
    drawArrowhead(xaxis4arrow,yaxis4arrow,Math.PI,ctx,getTempColor(tempMin));  
 
}

// MAX Humidity

function print_meteoSarriaHumMax(timeMax, humMax)
{
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");

    var hourMax = getHour(timeMax);
    var minMax = getMin(timeMax);
    var yearMax = getYear(timeMax);
    var monthMax = getMonth(timeMax);
    var dayMax =  getDay(timeMax);
    var horaMax4display = hourMax+":"+minMax;
    var fechaMax4display = dayMax+"."+monthMax+"."+yearMax;

    var xaxisHumMax = timeLineAnchor+(Number(hourMax) + Number(minMax)/60)*timeLineOffset;
    var yaxisHumMax = humLineAnchor - (humMax/10)*humLineOffset-20;
    var yaxisHumMaxLegend = maxMinHumMaxYaxis;

    prevYaxis = yaxisHumMax;
    yaxisHumMax = getMaxMinYaxis(xaxisHumMax, yaxisHumMax, "hum", true);
    if (yaxisHumMax != prevYaxis) { hMaxYaxisMoved = true;} else { hMaxYaxisMoved = false; }
     
    ctx.font = humPresMaxMinLegendFontSize+"px Arial";
    ctx.fillStyle = getHumColor(humMax);
    ctx.fillText(humMax+"%", xaxisHumMax, yaxisHumMaxLegend);
   
    ctx.font = humPresMaxMinDateTimeFontSize+"px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText(horaMax4display, xaxisHumMax-5, yaxisHumMaxLegend+humPresMaxMinLegendFontSize-6);

    if (hMaxYaxisMoved) { xaxis4arrow = xaxisHumMax-25; yaxis4arrow = yaxisHumMax+5; } 
    else 
    { 
        xaxis4arrow = xaxisHumMax; yaxis4arrow = yaxisHumMax+25; 
        ctx.beginPath();
        ctx.moveTo(xaxis4arrow,yaxis4arrow);
        ctx.lineTo(xaxisHumMax, yaxisHumMaxLegend+humPresMaxMinLegendFontSize-6);
        ctx.strokeStyle=getHumColor(humMax);
        ctx.lineWidth=0.5;
        ctx.setLineDash([2,2]);
        ctx.stroke();
        ctx.setLineDash([1,0]);
    }
    drawArrowhead(xaxis4arrow,yaxis4arrow,2*Math.PI,ctx,getHumColor(humMax));  

}

// MIN Humidity

function print_meteoSarriaHumMin(timeMin, humMin)
{
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");

    var hourMin = getHour(timeMin);
    var minMin = getMin(timeMin);
    var yearMin = getYear(timeMin);
    var monthMin = getMonth(timeMin);
    var dayMin =  getDay(timeMin);
    var horaMin4display = hourMin+":"+minMin;
    var fechaMin4display = dayMin+"."+monthMin+"."+yearMin;
    
    var xaxisHumMin = timeLineAnchor+(Number(hourMin) + Number(minMin)/60)*timeLineOffset;
    var yaxisHumMin = humLineAnchor - (humMin/10)*humLineOffset+20;  
    var yaxisHumMinLegend = maxMinHumMinYaxis;

    prevYaxis = yaxisHumMin;
    yaxisHumMin = getMaxMinYaxis(xaxisHumMin, yaxisHumMin, "hum", false);
    if (yaxisHumMin != prevYaxis) { hMinYaxisMoved = true; } else { hMinYaxisMoved = false; }
  
    ctx.font = humPresMaxMinLegendFontSize+"px Arial";
    ctx.fillStyle = getHumColor(humMin);
    ctx.fillText(humMin+"%", xaxisHumMin, yaxisHumMinLegend);
   
    ctx.font = humPresMaxMinDateTimeFontSize+"px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText(horaMin4display, xaxisHumMin-5, yaxisHumMinLegend+humPresMaxMinLegendFontSize-6);

    if (hMinYaxisMoved) { xaxis4arrow = xaxisHumMin-25; yaxis4arrow = yaxisHumMin+5; } 
    else 
    { 
        xaxis4arrow = xaxisHumMin; 
        yaxis4arrow = yaxisHumMin-20; 
        ctx.beginPath();
        ctx.moveTo(xaxis4arrow,yaxis4arrow);
        ctx.lineTo(xaxisHumMin, yaxisHumMinLegend+humPresMaxMinLegendFontSize-6);
        ctx.strokeStyle=getHumColor(humMin);
        ctx.lineWidth=0.5;
        ctx.setLineDash([2,2]);
        ctx.stroke();
        ctx.setLineDash([1,0]);
    }
    drawArrowhead(xaxis4arrow,yaxis4arrow,Math.PI,ctx,getHumColor(humMin));  

}

// MAX Pressure

function print_meteoSarriaPresMax(timeMax, presMax)
{
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");

    var hourMax = getHour(timeMax);
    var minMax = getMin(timeMax);
    var yearMax = getYear(timeMax);
    var monthMax = getMonth(timeMax);
    var dayMax =  getDay(timeMax);
    var horaMax4display = hourMax+":"+minMax;
    var fechaMax4display = dayMax+"."+monthMax+"."+yearMax;
       
    var xaxisPresMax = timeLineAnchor+(Number(hourMax) + Number(minMax)/60)*timeLineOffset;
    var yaxisPresMax = presLineAnchor - ((presMax-990)/10)*presLineOffset-20;
    var yaxisPresMaxLegend = maxMinPresMaxYaxis; 

    prevYaxis = yaxisPresMax;
    yaxisPresMax = getMaxMinYaxis(xaxisPresMax, yaxisPresMax, "pres", true);
    if (yaxisPresMax != prevYaxis) { pMaxYaxisMoved = true; } else { pMaxYaxisMoved = false; }
 
    ctx.font = humPresMaxMinLegendFontSize+"px Arial";
    ctx.fillStyle = presHistColor;
    ctx.fillText(presMax+"hPa", xaxisPresMax, yaxisPresMaxLegend);
   
    ctx.font = humPresMaxMinDateTimeFontSize+"px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText(horaMax4display, xaxisPresMax-5, yaxisPresMaxLegend+humPresMaxMinLegendFontSize-6);

    if (pMaxYaxisMoved) { xaxis4arrow = xaxisPresMax-50; yaxis4arrow = yaxisPresMax+5; } 
    else 
    { 
        xaxis4arrow = xaxisPresMax; 
        yaxis4arrow = yaxisPresMax+25; 
        ctx.beginPath();
        ctx.moveTo(xaxis4arrow,yaxis4arrow);
        ctx.lineTo(xaxisPresMax, yaxisPresMaxLegend+humPresMaxMinLegendFontSize-6);
        ctx.strokeStyle=presHistColor;
        ctx.lineWidth=0.5;
        ctx.setLineDash([2,2]);
        ctx.stroke();
        ctx.setLineDash([1,0]);
    }
    drawArrowhead(xaxis4arrow,yaxis4arrow,2*Math.PI,ctx,presHistColor);  

}

// MIN PRES

function print_meteoSarriaPresMin(timeMin, presMin)
{
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");

    var hourMin = getHour(timeMin);
    var minMin = getMin(timeMin);
    var yearMin = getYear(timeMin);
    var monthMin = getMonth(timeMin);
    var dayMin =  getDay(timeMin);
    var horaMin4display = hourMin+":"+minMin;
    var fechaMin4display = dayMin+"."+monthMin+"."+yearMin;
    
    var xaxisPresMin = timeLineAnchor+(Number(hourMin) + Number(minMin)/60)*timeLineOffset;
    var yaxisPresMin = presLineAnchor - ((presMin-990)/10)*presLineOffset+20;
    var yaxisPresMinLegend = maxMinPresMinYaxis; 

    prevYaxis = yaxisPresMin;
    yaxisPresMin = getMaxMinYaxis(xaxisPresMin, yaxisPresMin, "pres", false);
    if (yaxisPresMin != prevYaxis) { pMinYaxisMoved = true; } else { pMinYaxisMoved = false; }

    ctx.font = humPresMaxMinLegendFontSize+"px Arial";
    ctx.fillStyle = presHistColor;
    ctx.fillText(presMin+"hPa", xaxisPresMin, yaxisPresMinLegend);
   
    ctx.font = humPresMaxMinDateTimeFontSize+"px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText(horaMin4display, xaxisPresMin-5, yaxisPresMinLegend+humPresMaxMinLegendFontSize-6);

    if (pMinYaxisMoved) { xaxis4arrow = xaxisPresMin-50; yaxis4arrow = yaxisPresMin+5; } 
    else 
    { 
        xaxis4arrow = xaxisPresMin; 
        yaxis4arrow = yaxisPresMin-20; 
        ctx.beginPath();
        ctx.moveTo(xaxis4arrow,yaxis4arrow);
        ctx.lineTo(xaxisPresMin, yaxisPresMinLegend+humPresMaxMinLegendFontSize-6);
        ctx.strokeStyle=presHistColor;
        ctx.lineWidth=0.5;
        ctx.setLineDash([2,2]);
        ctx.stroke();
        ctx.setLineDash([1,0]);
    }
    drawArrowhead(xaxis4arrow,yaxis4arrow,Math.PI,ctx,presHistColor);  
}


// Get MaxMin YAXIS so that it does not overlap 

function getMaxMinYaxis(axX, axY, tempHumPres, ismax)
{
    if ( 
            ( axY+maxMinRectYOffset+maxMinRectHeight > currentDataAnchorY+curDataFrameYOffset ) &&  // lower side of maxmin rect is below upper side of cur data rect
            ( axY+maxMinRectYOffset < currentDataAnchorY+curDataFrameYOffset+curDataFrameHeight ) && // upper side of maxmin rect is above lower side of cur data rect
            ( axX+maxMinRectXOffset+maxMinRectWidth > currentDataAnchorX+curDataFrameXOffset)  &&  // right side of maxmin rect is to the right of letf side of cur data rect
            ( axX+maxMinRectXOffset < currentDataAnchorX+curDataFrameXOffset+curDataFrameWidth) // left side of maxmin rect is to the left of right side of cur data rect
        )
    {
        if (ismax) 
        { 
            if (tempHumPres == "temp") { return currentDataAnchorY+curDataFrameYOffset+maxMinRectJump4Max; }
            else if (tempHumPres == "hum" )
            {
                if (tMaxYaxisMoved) {return currentDataAnchorY+curDataFrameYOffset+2*maxMinRectJump4Max; }
                else { return currentDataAnchorY+curDataFrameYOffset+maxMinRectJump4Max; }
            }
            else // pres
            {
                 if (tMaxYaxisMoved && hMaxYaxisMoved) {return currentDataAnchorY+curDataFrameYOffset+3*maxMinRectJump4Max; }
                 else if (tMaxYaxisMoved || hMaxYaxisMoved) {return currentDataAnchorY+curDataFrameYOffset+2*maxMinRectJump4Max; }
                 else { return currentDataAnchorY+curDataFrameYOffset+maxMinRectJump4Max; }
            }
        }
        else 
        { 
            if (tempHumPres == "temp") { return currentDataAnchorY+curDataFrameYOffset+curDataFrameHeight+maxMinRectJump4Min; }
           else if (tempHumPres == "hum" )
            {
                if (tMinYaxisMoved) {return currentDataAnchorY+curDataFrameYOffset+curDataFrameHeight+2*maxMinRectJump4Min; }
                else { return currentDataAnchorY+curDataFrameYOffset+curDataFrameHeight+maxMinRectJump4Min; }
            }
            else // pres
            {
                 if (tMinYaxisMoved && hMinYaxisMoved) {return currentDataAnchorY+curDataFrameYOffset+curDataFrameHeight+3*maxMinRectJump4Min;}
                 else if (tMinYaxisMoved || hMinYaxisMoved) {return currentDataAnchorY+curDataFrameYOffset+curDataFrameHeight+2*maxMinRectJump4Min; }
                 else { return currentDataAnchorY+curDataFrameYOffset+curDataFrameHeight+maxMinRectJump4Min; }
            }
        }
    }
    else { return axY; }
}

