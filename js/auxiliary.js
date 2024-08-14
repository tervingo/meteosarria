/* 
 AUXILIARY FUNCTIONS
 */



function getTempColor (temp)
{
    if (temp == '--')
    {
        return "DarkGrey";
    }
    else if (temp>35)
    {
        return "Maroon";
    }
    else if (temp > 29.9)
    {
        return "Fuchsia";
    }
    else if (temp > 24.9)
    {
        return "Red";
    }
    else if (temp > 19.9)
    {
        return "DarkOrange";
    }
    else if (temp > 14.9)
    {
        return "Green";
    }
    else if (temp > 9.9)
    {
        return "DodgerBlue";
    }
    else if (temp > 4.9)
    {
        return "Blue";
    }
    else if (temp > -0.1)
    {
        return "Magenta";
    }
    else if (temp > -4.9)
    {
        return "DarkViolet";
    }
    else { return "Indigo"; }
    
}

function getHumColor(hum)
{
    if (hum == '--%')
    {
        return "DarkGray";
    }
    else if (hum > 79.9)
    {
        return "Fuchsia";
    }
    else if (hum > 49.9)
    {
        return "Blue";
    }
    else if (hum > 30)
    {
        return "LimeGreen";
    }
    else if (hum > 20)
    {
        return "GoldenRod";
    }
    else if (hum > 10)
    {
        return "LightCoral";
    }
    else
    {
        return "IndianRed";
    }
}

function getTrendColor (trend)
{
    if (trend == 1) { return "Red"; }
    else if (trend == 0) { return "Green"; }
    else { return "Blue"; }
}

function getTrendSymbol (trend)
{
    if (trend == 1) { return "↗"; }
    else if (trend == 0) { return "~"; }
    else { return "↘"; }    
}

function getClientRawData ()
{
    var request = new XMLHttpRequest();
    request.open("GET", "clientrawextra.txt", false);
    request.send(null);
    return request.responseText;
}


function getDataAt (time)
{
    var datos = [];

    var hourlyFileName = "data_"+time+".xml?id="+Math.random();
    var request = new XMLHttpRequest();
    request.open("GET", hourlyFileName, false);
    request.send(null);
    var xmlResp = request.responseText;
    
    /* parse response an return temp */
    
    if (window.DOMParser)
    {
        parser=new DOMParser();
        xmlDoc=parser.parseFromString(xmlResp,"text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async=false;
        xmlDoc.loadXML(xmlResp);
    }
    datos[0] = xmlDoc.getElementsByTagName("temp")[0].childNodes[0].nodeValue;
    datos[1] = xmlDoc.getElementsByTagName("hum")[0].childNodes[0].nodeValue;
    datos[2] = xmlDoc.getElementsByTagName("pres")[0].childNodes[0].nodeValue;
    datos[3] = xmlDoc.getElementsByTagName("solar_rad")[0].childNodes[0].nodeValue;
    datos[4] = xmlDoc.getElementsByTagName("hourly_rain")[0].childNodes[0].nodeValue;
    datos[5] = xmlDoc.getElementsByTagName("daily_rain")[0].childNodes[0].nodeValue;
    datos[6] = xmlDoc.getElementsByTagName("wind_dir")[0].childNodes[0].nodeValue;
    datos[7] = xmlDoc.getElementsByTagName("wind_speed")[0].childNodes[0].nodeValue;
    datos[8] = xmlDoc.getElementsByTagName("wind_gust")[0].childNodes[0].nodeValue;
    datos[9] = xmlDoc.getElementsByTagName("time")[0].childNodes[0].nodeValue;
    

    return datos;
}

function getIndexAt (time)
{
    for (var slice = 0; slice<145 ; slice++ )
    {
        if (String(indexDatos24h[slice])===String(time)) { break;}
    }
    return slice;
}

// just try
function getTempRenuncio ()
{
    var fileName = "http://www.renuncio.com/meteorologia/actual";
    var request = new XMLHttpRequest();
    request.open("GET", fileName, false);
    request.send(null);
    var htmlResp = request.responseText;
    var tempPos = htmlResp.search("\"temperatura_valor\">");
    var tempRenuncio = htmlResp.substring(tempPos+20,tempPos+24);
    document.write(tempRenuncio);
}


function getDataNow ()
{
    var datos = [];

    var fileName = "data_now.xml?id="+Math.random();
    var request = new XMLHttpRequest();
    request.open("GET", fileName, false);
    request.send(null);
    var xmlResp = request.responseText;


    /* parse response an return temp */
    
    if (window.DOMParser)
    {
        parser=new DOMParser();
        xmlDoc=parser.parseFromString(xmlResp,"text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async=false;
        xmlDoc.loadXML(xmlResp);
    }
    
    
    datos[0] = xmlDoc.getElementsByTagName("time")[0].childNodes[0].nodeValue;
    datos[1] = xmlDoc.getElementsByTagName("temp_ext")[0].childNodes[0].nodeValue;
    datos[2] = xmlDoc.getElementsByTagName("temp_int")[0].childNodes[0].nodeValue;
    datos[3] = xmlDoc.getElementsByTagName("heat_index")[0].childNodes[0].nodeValue;
    datos[4] = xmlDoc.getElementsByTagName("temp_trend_60m")[0].childNodes[0].nodeValue;
    datos[5] = xmlDoc.getElementsByTagName("hum")[0].childNodes[0].nodeValue;
    datos[6] = xmlDoc.getElementsByTagName("hum_trend_60m")[0].childNodes[0].nodeValue;
    datos[7] = xmlDoc.getElementsByTagName("pres")[0].childNodes[0].nodeValue;
    datos[8] = xmlDoc.getElementsByTagName("pres_trend_60m")[0].childNodes[0].nodeValue;
    datos[9] = xmlDoc.getElementsByTagName("wind_dir")[0].childNodes[0].nodeValue;
    datos[10] = xmlDoc.getElementsByTagName("wind_speed")[0].childNodes[0].nodeValue;
    datos[11] = xmlDoc.getElementsByTagName("wind_gust")[0].childNodes[0].nodeValue;
    datos[12] = xmlDoc.getElementsByTagName("uv_index")[0].childNodes[0].nodeValue;
    datos[13] = xmlDoc.getElementsByTagName("solar_rad")[0].childNodes[0].nodeValue;
    datos[14] = xmlDoc.getElementsByTagName("hourly_rain")[0].childNodes[0].nodeValue;
    datos[15] = xmlDoc.getElementsByTagName("daily_rain")[0].childNodes[0].nodeValue;
    datos[16] = xmlDoc.getElementsByTagName("forecast")[0].childNodes[0].nodeValue;
    datos[17] = xmlDoc.getElementsByTagName("luna")[0].childNodes[0].nodeValue;
    datos[18] = xmlDoc.getElementsByTagName("temp_max_24h")[0].childNodes[0].nodeValue;
    datos[19] = xmlDoc.getElementsByTagName("temp_min_24h")[0].childNodes[0].nodeValue;
    datos[20] = xmlDoc.getElementsByTagName("wind_chill")[0].childNodes[0].nodeValue;
    datos[21] = xmlDoc.getElementsByTagName("sunrise")[0].childNodes[0].nodeValue;
    datos[22] = xmlDoc.getElementsByTagName("sunset")[0].childNodes[0].nodeValue;
    datos[23] = xmlDoc.getElementsByTagName("day_length")[0].childNodes[0].nodeValue;
    datos[24] = xmlDoc.getElementsByTagName("rain_rate")[0].childNodes[0].nodeValue;

    return datos;
}

function getYearData(anyo)
{
    var datos = [];

    var fileName = "data_y"+anyo+".xml?id="+Math.random();
    var request = new XMLHttpRequest();
    request.open("GET", fileName, false);
    request.send(null);
    var xmlResp = request.responseText;

    /* parse response an return temp */
    
    if (window.DOMParser)
    {
        parser=new DOMParser();
        xmlDoc=parser.parseFromString(xmlResp,"text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async=false;
        xmlDoc.loadXML(xmlResp);
    }

    datos[0] = xmlDoc.getElementsByTagName("time")[0].childNodes[0].nodeValue;
    datos[1] = xmlDoc.getElementsByTagName("temp_max")[0].childNodes[0].nodeValue;
    datos[2] = xmlDoc.getElementsByTagName("temp_max_time")[0].childNodes[0].nodeValue;
    datos[3] = xmlDoc.getElementsByTagName("temp_min")[0].childNodes[0].nodeValue;
    datos[4] = xmlDoc.getElementsByTagName("temp_min_time")[0].childNodes[0].nodeValue;
    datos[5] = xmlDoc.getElementsByTagName("pres_max")[0].childNodes[0].nodeValue;
    datos[6] = xmlDoc.getElementsByTagName("pres_max_time")[0].childNodes[0].nodeValue;
    datos[7] = xmlDoc.getElementsByTagName("pres_min")[0].childNodes[0].nodeValue;
    datos[8] = xmlDoc.getElementsByTagName("pres_min_time")[0].childNodes[0].nodeValue;
    datos[9] = xmlDoc.getElementsByTagName("wind_gust_max_speed")[0].childNodes[0].nodeValue;
    datos[10] = xmlDoc.getElementsByTagName("wind_gust_max_dir")[0].childNodes[0].nodeValue;
    datos[11] = xmlDoc.getElementsByTagName("wind_gust_max_time")[0].childNodes[0].nodeValue;
    datos[12] = xmlDoc.getElementsByTagName("solar_rad_max")[0].childNodes[0].nodeValue;
    datos[13] = xmlDoc.getElementsByTagName("solar_rad_max_time")[0].childNodes[0].nodeValue;
    datos[14] = xmlDoc.getElementsByTagName("yearly_rain")[0].childNodes[0].nodeValue;
    
    return datos;
}

function getMonthData(mes)
{
    var datos = [];
    var m4q = mes < 10 ? '0'+parseInt(mes) : String(mes);

    var fileName = "data_m"+m4q+".xml?id="+Math.random();
    var request = new XMLHttpRequest();
    request.open("GET", fileName, false);
    request.send(null);
    var xmlResp = request.responseText;

    /* parse response an return temp */
    
    if (window.DOMParser)
    {
        parser=new DOMParser();
        xmlDoc=parser.parseFromString(xmlResp,"text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async=false;
        xmlDoc.loadXML(xmlResp);
    }

    datos[0] = xmlDoc.getElementsByTagName("time")[0].childNodes[0].nodeValue;
    datos[1] = xmlDoc.getElementsByTagName("temp_max")[0].childNodes[0].nodeValue;
    datos[2] = xmlDoc.getElementsByTagName("temp_max_time")[0].childNodes[0].nodeValue;
    datos[3] = xmlDoc.getElementsByTagName("temp_min")[0].childNodes[0].nodeValue;
    datos[4] = xmlDoc.getElementsByTagName("temp_min_time")[0].childNodes[0].nodeValue;
    datos[5] = xmlDoc.getElementsByTagName("pres_max")[0].childNodes[0].nodeValue;
    datos[6] = xmlDoc.getElementsByTagName("pres_max_time")[0].childNodes[0].nodeValue;
    datos[7] = xmlDoc.getElementsByTagName("pres_min")[0].childNodes[0].nodeValue;
    datos[8] = xmlDoc.getElementsByTagName("pres_min_time")[0].childNodes[0].nodeValue;
    datos[9] = xmlDoc.getElementsByTagName("wind_gust_max_speed")[0].childNodes[0].nodeValue;
    datos[10] = xmlDoc.getElementsByTagName("wind_gust_max_dir")[0].childNodes[0].nodeValue;
    datos[11] = xmlDoc.getElementsByTagName("wind_gust_max_time")[0].childNodes[0].nodeValue;
    datos[12] = xmlDoc.getElementsByTagName("solar_rad_max")[0].childNodes[0].nodeValue;
    datos[13] = xmlDoc.getElementsByTagName("solar_rad_max_time")[0].childNodes[0].nodeValue;
    datos[14] = xmlDoc.getElementsByTagName("monthly_rain")[0].childNodes[0].nodeValue;
    
    return datos;
}

function getDayData()
{
    var datos = [];

    var fileName = "data_day.xml?id="+Math.random();
    var request = new XMLHttpRequest();
    request.open("GET", fileName, false);
    request.send(null);
    var xmlResp = request.responseText;

    /* parse response an return temp */
    
    if (window.DOMParser)
    {
        parser=new DOMParser();
        xmlDoc=parser.parseFromString(xmlResp,"text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async=false;
        xmlDoc.loadXML(xmlResp);
    }

    datos[0] = xmlDoc.getElementsByTagName("time")[0].childNodes[0].nodeValue;
    datos[1] = xmlDoc.getElementsByTagName("temp_max")[0].childNodes[0].nodeValue;
    datos[2] = xmlDoc.getElementsByTagName("temp_max_time")[0].childNodes[0].nodeValue;
    datos[3] = xmlDoc.getElementsByTagName("temp_min")[0].childNodes[0].nodeValue;
    datos[4] = xmlDoc.getElementsByTagName("temp_min_time")[0].childNodes[0].nodeValue;
    datos[5] = xmlDoc.getElementsByTagName("hum_max")[0].childNodes[0].nodeValue;
    datos[6] = xmlDoc.getElementsByTagName("hum_max_time")[0].childNodes[0].nodeValue;
    datos[7] = xmlDoc.getElementsByTagName("hum_min")[0].childNodes[0].nodeValue;
    datos[8] = xmlDoc.getElementsByTagName("hum_min_time")[0].childNodes[0].nodeValue;
    datos[9] = xmlDoc.getElementsByTagName("pres_max")[0].childNodes[0].nodeValue;
    datos[10] = xmlDoc.getElementsByTagName("pres_max_time")[0].childNodes[0].nodeValue;
    datos[11] = xmlDoc.getElementsByTagName("pres_min")[0].childNodes[0].nodeValue;
    datos[12] = xmlDoc.getElementsByTagName("pres_min_time")[0].childNodes[0].nodeValue;
    datos[13] = xmlDoc.getElementsByTagName("solar_rad_max")[0].childNodes[0].nodeValue;
    datos[14] = xmlDoc.getElementsByTagName("solar_rad_max_time")[0].childNodes[0].nodeValue;
    datos[15] = xmlDoc.getElementsByTagName("wind_gust_max_speed")[0].childNodes[0].nodeValue;
    datos[16] = xmlDoc.getElementsByTagName("wind_gust_max_dir")[0].childNodes[0].nodeValue;
    datos[17] = xmlDoc.getElementsByTagName("wind_gust_max_time")[0].childNodes[0].nodeValue;
    datos[18] = xmlDoc.getElementsByTagName("daily_rain")[0].childNodes[0].nodeValue;
    datos[19] = xmlDoc.getElementsByTagName("yearly_rain")[0].childNodes[0].nodeValue;
    datos[20] = xmlDoc.getElementsByTagName("forecast")[0].childNodes[0].nodeValue;
    datos[21] = xmlDoc.getElementsByTagName("lunar_phase_seg")[0].childNodes[0].nodeValue;
    datos[22] = xmlDoc.getElementsByTagName("lunar_phase_perc")[0].childNodes[0].nodeValue;
    
    return datos;
}

function getMaxMinData()
{
    var datos = [];

    var fileName = "data_day_maxmin.xml?id="+Math.random();
    var request = new XMLHttpRequest();
    request.open("GET", fileName, false);
    request.send(null);
    var xmlResp = request.responseText;

    /* parse response an return temp */
    
    if (window.DOMParser)
    {
        parser=new DOMParser();
        xmlDoc=parser.parseFromString(xmlResp,"text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async=false;
        xmlDoc.loadXML(xmlResp);
    }

    datos[0] = xmlDoc.getElementsByTagName("time")[0].childNodes[0].nodeValue;
    datos[1] = xmlDoc.getElementsByTagName("temp_max")[0].childNodes[0].nodeValue;
    datos[2] = xmlDoc.getElementsByTagName("temp_max_time")[0].childNodes[0].nodeValue;
    datos[3] = xmlDoc.getElementsByTagName("temp_min")[0].childNodes[0].nodeValue;
    datos[4] = xmlDoc.getElementsByTagName("temp_min_time")[0].childNodes[0].nodeValue;
    datos[5] = xmlDoc.getElementsByTagName("hum_max")[0].childNodes[0].nodeValue;
    datos[6] = xmlDoc.getElementsByTagName("hum_max_time")[0].childNodes[0].nodeValue;
    datos[7] = xmlDoc.getElementsByTagName("hum_min")[0].childNodes[0].nodeValue;
    datos[8] = xmlDoc.getElementsByTagName("hum_min_time")[0].childNodes[0].nodeValue;
    datos[9] = xmlDoc.getElementsByTagName("pres_max")[0].childNodes[0].nodeValue;
    datos[10] = xmlDoc.getElementsByTagName("pres_max_time")[0].childNodes[0].nodeValue;
    datos[11] = xmlDoc.getElementsByTagName("pres_min")[0].childNodes[0].nodeValue;
    datos[12] = xmlDoc.getElementsByTagName("pres_min_time")[0].childNodes[0].nodeValue;
     
    return datos;
}



function isInt(n)
{
    return parseInt(n) === n;
}


function getWindDirText(dir)
{
    var dirval = parseInt(String((dir/22.5)+0.5));
    var compass = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
    return compass[(dirval % 16)];
}

function getTime4Query(h,m)
{
    h = h < 10 ? '0'+h : String(h);
    m = m < 10 ? '0'+m : String(m);
    
    return h+m;
}

function getYear (time)
{
    return time.toString().substring(0,4);
}

function getMonth (time)
{
    return time.toString().substring(4,6);
}

function getDay (time)
{
    return time.toString().substring(6,8);
}

function getHour (time)
{
    return time.toString().substring(8,10);
}

function getMin (time)
{
    return time.toString().substring(10,12);
}

function getSec (time)
{
    return time.toString().substring(12,14);
}

function wasDayYesterday(dia)
{
    yd2c = parseInt(dia);
    td2c = parseInt(day);

    if (td2c>1) { return (td2c==yd2c+1); }
    else   // today is 1st of month
    {
        if (month==MAR)
        {
            if (isLeapYear(year)) { return (yd2c==29); }
            else { return (yd2c==29); }
        }
        else if ( (month==MAY) || (month==JUL) || (month==OCT) || (month==DEC) )
        { return (yd2c==30); }
        else { return (yd2c==31); }
    }
}

function isLeapYear(year)
{
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

function drawArrowhead(x,y,radians,ctx,color)
{
    ctx.save();
    ctx.beginPath();
    ctx.translate(x,y);
    ctx.rotate(radians);
    ctx.moveTo(0,0);
    ctx.lineTo(4,15);
    ctx.lineTo(-4,15);
    ctx.closePath();
    ctx.restore();
    ctx.fillStyle=color;
    ctx.fill();
}

function getRealTimeFrom(hm)
{
    var hora = hm.toString().substring(0,2);
    var minuto = hm.toString().substring(3,5);
    
    var realTime = parseInt(hora)+parseInt(minuto)/60;
    return realTime;
}

function drawMoonPhase(phase, ctx, xaxis, yaxis, moonRadius, lunaPerc)
{
    ctx.beginPath();
    ctx.strokeStyle = "Gray";
    ctx.fillStyle = "LightGray";

    if (phase == 0)
    {
        ctx.arc(xaxis,yaxis,moonRadius, 0, 2*Math.PI);
        ctx.fillStyle = "White";
    }
    else if (phase == 1)
    {
        ctx.arc(xaxis,yaxis,moonRadius, -0.5*Math.PI, 0.5*Math.PI);
        ctx.moveTo(xaxis,yaxis+moonRadius);
        ctx.bezierCurveTo(xaxis+moonRadius-3, yaxis+moonRadius/2, xaxis+moonRadius-3, yaxis-moonRadius/2, xaxis, yaxis-moonRadius);
    }
    else if (phase == 2)
    {
        ctx.arc(xaxis,yaxis,moonRadius, -0.5*Math.PI, 0.5*Math.PI);
    }
    else if (phase == 3)
    {
        ctx.arc(xaxis,yaxis,moonRadius, -0.5*Math.PI, 0.5*Math.PI);
        ctx.moveTo(xaxis,yaxis+moonRadius);
        ctx.bezierCurveTo(xaxis-moonRadius+2, yaxis+moonRadius/2, xaxis-moonRadius+2, yaxis-moonRadius/2, xaxis, yaxis-moonRadius);
    }
    else if (phase == 4)
    {
        ctx.arc(xaxis,yaxis,moonRadius, 0, 2*Math.PI);
        if (lunaPerc>98) { ctx.fillStyle = "Gold"; }
    }
    else if (phase == 5)
    {
        ctx.arc(xaxis,yaxis,moonRadius, 0.5*Math.PI, 1.5*Math.PI);
        ctx.moveTo(xaxis,yaxis-moonRadius);
        ctx.bezierCurveTo(xaxis+moonRadius-2, yaxis-moonRadius/2, xaxis+moonRadius-2, yaxis+moonRadius/2, xaxis, yaxis+moonRadius);
    }
    else if (phase == 6)
    {
        ctx.arc(xaxis,yaxis,moonRadius, 0.5*Math.PI, 1.5*Math.PI);
    }
    else if (phase == 7)
    {
        ctx.arc(xaxis,yaxis,moonRadius, 0.5*Math.PI, 1.5*Math.PI);
        ctx.moveTo(xaxis,yaxis-moonRadius);
        ctx.bezierCurveTo(xaxis-moonRadius+2, yaxis-moonRadius/2, xaxis-moonRadius+2, yaxis+moonRadius/2, xaxis, yaxis+moonRadius);
    }

    ctx.stroke();
    ctx.fill();        
    
    ctx.beginPath();
    if ( (phase > 0) && (phase < 4))
    {
        ctx.arc(xaxis,yaxis,moonRadius, 0.5*Math.PI, 1.5*Math.PI);
    }
    else if (phase > 4)
    {
        ctx.arc(xaxis,yaxis,moonRadius, -0.5*Math.PI, 0.5*Math.PI);        
    }
    ctx.strokeStyle = "LightGray";
    ctx.stroke();

    
}

function print_clock(atX, atY, radio, secs, ctx, color)
{
    ctx.beginPath();

    var angle = secs*6*Math.PI/180;
    var circleX = atX+radio*Math.sin(angle);
    var circleY = atY-radio*Math.cos(angle);
    
    ctx.moveTo(atX,atY);
    ctx.lineTo(circleX,circleY);
    ctx.strokeStyle = color;
    ctx.stroke();

    var t = setTimeout(function() {print_clock(atX, atY, radio, secs+1, ctx, color); }, 1000);
    
}

function getUtcTimestamp(min4q,h4q,d4q,mth4q,y4q)
{
    var utcTs = [];
        
    if (min4q >= 0) 
    {     
        var min4q = parseInt((min4q)/10)*10;
    }
    else 
    { 
        var min4q = 50;
        if (h4q>0) {h4q--; }
        else 
        {
            h4q = 23;
            if (d4q>0) { d4q--; }
            else
            {
                if (mth4q == 3) { d4q=28; } 
                else if ( (mth4q == 5) || (mth4q == 7) || (mth4q == 10) || (mth4q == 12)) { d4q = 30; }
                else { d4q = 31; }
                if (mth4q > 1) { mth4q--; }
                else 
                {
                    mth4q = 12;
                    y4q--;
                }
            }
        }
            
    }
    var mth4q = mth4q < 10 ? '0'+ parseInt(mth4q) : String(mth4q);
    var d4q = d4q < 10 ? '0'+ parseInt(d4q) : String(d4q);   
    var h4q = h4q < 10 ? '0'+ parseInt(h4q) : String(h4q);   
    var min4q = min4q < 10 ? '0' + parseInt(min4q) : String(min4q);   
   
    utcTs[0] = y4q+mth4q+d4q+h4q+min4q;
    utcTs[1] = min4q;
    utcTs[2] = h4q;
    utcTs[3] = d4q;
    utcTs[4] = mth4q;
    utcTs[5] = y4q;

    return utcTs;
}

function getCurrentUtcTimestamp ()
{
    var y4q = utcYear;
    var mth4q = utcMonth;
    var d4q = utcDay;
    var h4q = utcHour;
    var min4q = utcMins;
    var utcTimestamp  = [];
    
    // get timestamp from 10 minutes ago;
    
    min4q = min4q-10;
    
    utcTimestamp= getUtcTimestamp(min4q,h4q,d4q,mth4q,y4q);
  
    return utcTimestamp;

}

function getLast20UtcTimeStamp4Radar()
{
    var y4q = utcYear;
    var mth4q = utcMonth;
    var d4q = utcDay;
    var h4q = utcHour;
    var min4q = utcMins;
    var last20UtcTimestamp  = [[]];
    
    for (var seq=1; seq<20; seq++)
    {
       min4q = min4q-10;
       last20UtcTimestamp[seq] = getUtcTimestamp(min4q,h4q,d4q,mth4q,y4q);
       min4q = last20UtcTimestamp[seq][1];
       h4q = last20UtcTimestamp[seq][2];
       d4q = last20UtcTimestamp[seq][3];
       mth4q = last20UtcTimestamp[seq][4];
       y4q = last20UtcTimestamp[seq][5];
    }
    return last20UtcTimestamp;

}


function drawSunriseLoop(atX, atY, loop, ctx)
{
    if (loop<21)
    {
        ctx.beginPath();
        ctx.clearRect(atX-16,atY-15,34,15);
        ctx.arc(atX-(20-loop), atY, 0.75*loop,(-Math.PI/2)-(0.05*loop*Math.PI/2),(-Math.PI/2)+(0.05*loop*Math.PI/2), false);
        ctx.fillStyle="Gold";
        ctx.fill();
        if (loop==1) {var sr = setTimeout(function() { drawSunriseLoop(atX, atY, loop, ctx); }, 5000); }
        else {var sr = setTimeout(function() { drawSunriseLoop(atX, atY, loop, ctx); }, 100); }
        loop++;
    }
    else
    {
        loop = 1;
        var sr = setTimeout(function() { drawSunriseLoop(atX, atY, loop, ctx); }, 5000);
    }
    

}

function drawSunsetLoop(atX, atY, loop, ctx)
{
    if (loop>0)
    {
        ctx.beginPath();
        ctx.clearRect(atX-16,atY-15,34,15);
        ctx.arc(atX+(20-loop), atY, 0.75*loop,(-Math.PI/2)-(0.05*loop*Math.PI/2),(-Math.PI/2)+(0.05*loop*Math.PI/2), false);
        ctx.fillStyle="DarkOrange";
        ctx.fill();
        if (loop==20) { var ss = setTimeout(function() { drawSunsetLoop(atX, atY, loop, ctx); }, 5000); }
        else { var ss = setTimeout(function() { drawSunsetLoop(atX, atY, loop, ctx); }, 100); }
        loop--;
    }
    else
    {
        loop = 20;
        var ss = setTimeout(function() { drawSunsetLoop(atX, atY, loop, ctx); }, 5000);
    }
    

}