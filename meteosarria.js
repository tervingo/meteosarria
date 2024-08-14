/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* GLOBAL VARIABLES */

var tempLineOffset = 68;
var tempLineAnchor = 600;
var humLineAnchor = tempLineAnchor+tempLineOffset;
var humLineOffset = (5*tempLineOffset)/10;
var presLineAnchor = tempLineAnchor+tempLineOffset;
var presLineOffset = (5*tempLineOffset)/7;
var timeLineOffset = 45;
var timeLineAnchor = 60;
var correctionTempOffset = 10;
var titleFontSize = 50;
var bcnFontSize = 15;
var fechaHoraFontSize = 20;
var dateTimeFontSize = 20;

var histValuesFontSize = 10;
var tempLegendFontSize = 50;
var tempMaxMinLegendFontSize = 35;
var tempMaxMin24hFontSize = 15;
var tempSensFontSize = 16;
var humPresLegendFontSize = 25;
var humPresMaxMinLegendFontSize = 20;
var humPresMaxMin24hFontSize = 10;
var humPresMaxMinDateTimeFontSize = 15;
var difTemp24hagoFontSize = 12;

var tempMaxLast24h;
var tempMinLast24h;
var humMaxLast24h;
var humMinLast24h;
var presMaxLast24h;
var presMinLast24h;

var timeTempMaxLast24h = [];
var timeTempMinLast24h = [];
var timeHumMaxLast24h = [];
var timeHumMinLast24h = [];
var timePresMaxLast24h = [];
var timePresMinLast24h = [];



var d = new Date();
var year = d.getFullYear();
var month = d.getMonth()+1;
var day = d.getDate();
var hour = d.getHours();
var mins = d.getMinutes();
var secs = d.getSeconds(); 

// links within canvas

var inLink = false;
var linkTextFontSize = 15;

var linkWidth;
var linkHeight = linkTextFontSize;

var radarx = 50;
var radary = 40;
var radarText = "Radar";
var radarLink = "http://www.meteo.cat/observacions/radar";


   
function draw_meteoSarriaBackground ()
{
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");
    
    ctx.beginPath();

    var titleYaxis = 135;
    var bcnYaxis = 160;
    var coorYaxis = 180;
    var tempLegend;
    var timeLegend;
    var humLegend;
    var presLegend;
    
    // Image
    
    var img = new Image();
    img.onload = function () {
        ctx.drawImage(img, canvas.width/2-400, 0, 800, 140);
        ctx.font = titleFontSize+"px Arial";
        ctx.fillStyle = "LightGray";
        ctx.textAlign = "center";
        ctx.fillText("#meteoSarrià", canvas.width/2, titleYaxis); 
    }
    img.src = "portada.JPG";

    // Title 
    ctx.font = bcnFontSize+"px Arial";
    ctx.fillStyle = "DimGray";
    ctx.textAlign = "center";
    ctx.fillText("Sarrià - Barcelona", canvas.width/2, bcnYaxis);     
    ctx.fillText("41º 23' 42\" N - 2º 7' 21\" E (110 m.)", canvas.width/2, coorYaxis);     
    
      // Temp lines
     
    ctx.fillStyle = "LightGray";
    ctx.strokeStyle = "WhiteSmoke";

    for (var level=4; level>-2; level--)
    {
        ctx.lineWidth = 0.5; 
        ctx.moveTo(40,tempLineAnchor-tempLineOffset*level);
        ctx.lineTo(timeLineAnchor+25*timeLineOffset,tempLineAnchor-tempLineOffset*level);
        ctx.stroke();
        
        // Temp legend
        
        tempLegend = level*10+"º";
        ctx.font = "15px Arial";
        ctx.fillText(tempLegend,20,tempLineAnchor-tempLineOffset*level);
    }
    // Hum legend
    
    for (var level = 0; level<11; level++)
    {
        humLegend = 10*level+"%";
        ctx.fillText(humLegend, timeLineAnchor+25*timeLineOffset, humLineAnchor-level*humLineOffset);
    }
    
    // Pres Legend

    for (var level = 0; level<8; level++)
    {
        presLegend = 980+10*level+"hPa";
        ctx.fillText(presLegend, timeLineAnchor+26*timeLineOffset+10, presLineAnchor-level*presLineOffset);
    }
    
    // Time lines
    for (var time=0; time<25; time++)
    {
        ctx.lineWidth = 0.5; 
        ctx.moveTo(timeLineAnchor+time*timeLineOffset, tempLineAnchor-4*tempLineOffset);
        ctx.lineTo(timeLineAnchor+time*timeLineOffset, tempLineAnchor+tempLineOffset);
        ctx.stroke();
        timeLegend = time+"h";
        ctx.font = "15px Arial";
        ctx.fillText(timeLegend,timeLineAnchor+time*timeLineOffset,tempLineAnchor-4.2*tempLineOffset);
        
    }
    
    // draw links 
    
    draw_meteoSarria_links ();
}

// LINKS WITHIN CANVAS

function draw_meteoSarria_links ()
{
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");
    
    // Radar
    
    ctx.beginPath();
    ctx.clearRect(0, 0, 180, 180);
    var rain = new Image();
    rain.src = "Rain_icon_2.png";
    rain.onload = function () 
    {
        ctx.drawImage(rain, radarx, radary, 20, 20);
    }
    ctx.font = linkTextFontSize+"px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText(radarText,radarx+50, radary+14);

    linkWidth=ctx.measureText(radarText).width;

    //add mouse listeners
    canvas.addEventListener("mousemove", on_mousemove, false);
    canvas.addEventListener("click", on_click, false);
    
}

//check if the mouse is over the link and change cursor style
function on_mousemove (ev) {
  var x, y;

  // Get the mouse position relative to the canvas element.
  if (ev.layerX || ev.layerX == 0) { //for firefox
    x = ev.layerX;
    y = ev.layerY;
  }
  
  //is the mouse over the link?
  if(x>=radarx && x <= (radarx + 50 + linkWidth) && y<=radary+14 && y>= (radary+14-linkHeight)){
      document.body.style.cursor = "pointer";
      inLink=true;
  }
  else{
      document.body.style.cursor = "";
      inLink=false;
  }
}

//if the link has been clicked, go to link
function on_click(e) {
  if (inLink)  {
    window.open(radarLink);
  }
}


// Print temperatures

function print_meteoSarriaTemp (temp, tempSens)
{
    var xaxis;
    var yaxis;
    
    var xaxisSens;
    var yaxisSens;

    var hora;
    var fecha;

    var data1hago = [];
    var temp1hago;
    var difTemp1hago;
    
    var data24hago = [];
    var temp24hago;
    var difTemp24hago;
    
    xaxis = timeLineAnchor+(hour + mins/60)*timeLineOffset;
    if (temp==99)
    {
        yaxis = tempLineAnchor - tempLineOffset+correctionTempOffset;
        temp = '--';
    }
    else
    {    
        yaxis = tempLineAnchor - (temp/10)*tempLineOffset+correctionTempOffset;
    }

    
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");
    
    mins = mins > 9 ? mins : '0' + mins;
    
    fecha = day+"."+month+"."+year;
    hora = hour+":"+mins;
    
    ctx.font = tempLegendFontSize+"px Arial";
    ctx.fillStyle = getTempColor(temp);
    ctx.fillText(temp+"º",xaxis,yaxis);
    ctx.font = dateTimeFontSize+"px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText(fecha, xaxis, yaxis-tempLegendFontSize+10);
    ctx.fillText(hora, xaxis, yaxis+tempLegendFontSize-30);
    
    // dif in 1h 
    
    if (hour == 0)
    {
        data1hago =  getDataAt(23);
    }
    else
    {
        data1hago = getDataAt(hour-1); 
    }
    temp1hago = data1hago[0];
    difTemp1hago = temp - temp1hago;

    ctx.font = difTemp24hagoFontSize+"px Arial";
    if (difTemp1hago>0)
    {
        ctx.fillStyle = "FireBrick";
        ctx.fillText("+"+difTemp1hago.toFixed(1)+"º en 1h",xaxis,yaxis+tempLegendFontSize-15);
    }
    else
    {
        ctx.fillStyle = "DodgerBlue";
        ctx.fillText(difTemp1hago.toFixed(1)+"º en 1h",xaxis,yaxis+tempLegendFontSize-15);        
    }
    // dif in 24h 
    
    if (hour < 23)
    {
        data24hago =  getDataAt(hour+1);
    }
    else
    {
        data24hago = getDataAt(0); 
    }
    temp24hago = data24hago[0];
    difTemp24hago = temp - temp24hago;

    ctx.font = difTemp24hagoFontSize+"px Arial";
    if (difTemp24hago>0)
    {
        ctx.fillStyle = "FireBrick";
        ctx.fillText("+"+difTemp24hago.toFixed(1)+"º en 24h",xaxis,yaxis+tempLegendFontSize);
    }
    else
    {
        ctx.fillStyle = "DodgerBlue";
        ctx.fillText(difTemp24hago.toFixed(1)+"º en 24h",xaxis,yaxis+tempLegendFontSize);        
    }
    
    if (tempSens <99)
    {
        xaxisSens = xaxis+57;
        yaxisSens=yaxis+5;
        ctx.fillStyle=getTempColor(tempSens);
        ctx.font = tempSensFontSize+"px Arial";
        ctx.fillText("(t.s. "+tempSens+"º)",xaxis,yaxis+tempLegendFontSize+15);
    }
    
}

function print_meteoSarriaHum(hum)
{
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");
  
    xaxis = timeLineAnchor+(hour + mins/60)*timeLineOffset;
    yaxis = tempLineAnchor - 5.5*tempLineOffset-correctionTempOffset;
    
    if (hum==300)
    {
        hum = '--%';
    }
    
    ctx.font = humPresLegendFontSize+"px Arial";
    ctx.fillStyle = getHumColor(hum);
    
    ctx.fillText(hum+"%", xaxis, yaxis);

}

function print_meteoSarriaPres(pres)
{
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");
  
    xaxis = timeLineAnchor+(hour + mins/60)*timeLineOffset;
    yaxis = tempLineAnchor - 5.1*tempLineOffset-correctionTempOffset;
    
    if (pres==300)
    {
        pres = '--hPa';
    }
    
    ctx.font = humPresLegendFontSize+"px Arial";
    ctx.fillStyle = "DarkGreen"
    
    ctx.fillText(pres+"hPa", xaxis, yaxis);

}

// MAX & MIN VALUES during last 24 hours

// MAX Temperature

function print_meteoSarriaTempMax(timeMax, tempMax)
{
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");

    var hourMax = timeMax.toString().substring(8,10);
    var minMax = timeMax.toString().substring(10,12);
    var yearMax = timeMax.toString().substring(0,4);
    var monthMax = timeMax.toString().substring(4,6);
    var dayMax =  timeMax.toString().substring(6,8);
    var horaMax4display = hourMax+":"+minMax;
    var fechaMax4display = dayMax+"."+monthMax+"."+yearMax;
    
    tempMaxLast24h = tempMax;
    timeTempMaxLast24h[0] = Number (hourMax);
    timeTempMaxLast24h[1] = Number (minMax);
    
    xaxis = timeLineAnchor+(Number(hourMax) + Number(minMax)/60)*timeLineOffset;
    yaxis = tempLineAnchor + 2*tempLineOffset+35;
    ctx.font = tempMaxMinLegendFontSize+"px Arial";
    ctx.fillStyle = getTempColor(tempMax);
    ctx.fillText(tempMax+"º", xaxis, yaxis);
    ctx.fillStyle = "red";
    ctx.fillText("↑", xaxis-50, yaxis);
    ctx.font = tempMaxMin24hFontSize+"px Arial";
    ctx.fillText("24h",xaxis-50, yaxis+25);
   
    ctx.font = dateTimeFontSize+"px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText(fechaMax4display, xaxis, yaxis-tempMaxMinLegendFontSize+3)
    ctx.fillText(horaMax4display, xaxis-5, yaxis+tempMaxMinLegendFontSize-10);
}

//  MIN Temperature

function print_meteoSarriaTempMin(timeMin, tempMin)
{
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");

    var hourMin = timeMin.toString().substring(8,10);
    var minMin = timeMin.toString().substring(10,12);
    var yearMin = timeMin.toString().substring(0,4);
    var monthMin = timeMin.toString().substring(4,6);
    var dayMin =  timeMin.toString().substring(6,8);
    var horaMin4display = hourMin+":"+minMin;
    var fechaMin4display = dayMin+"."+monthMin+"."+yearMin;

    tempMinLast24h = tempMin;
    timeTempMinLast24h[0] = Number (hourMin);
    timeTempMinLast24h[1] = Number (minMin);
    
    
    xaxis = timeLineAnchor+(Number(hourMin) + Number(minMin)/60)*timeLineOffset;
    yaxis = tempLineAnchor + 2*tempLineOffset+35;
    ctx.font = tempMaxMinLegendFontSize+"px Arial";
    ctx.fillStyle = getTempColor(tempMin);
    ctx.fillText(tempMin+"º", xaxis, yaxis);
    ctx.fillStyle = "blue";
    ctx.fillText("↓", xaxis-50, yaxis);
    ctx.font = tempMaxMin24hFontSize+"px Arial";
    ctx.fillText("24h",xaxis-50, yaxis+25);
    
    ctx.font = dateTimeFontSize+"px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText(fechaMin4display, xaxis, yaxis-tempMaxMinLegendFontSize+3)
    ctx.fillText(horaMin4display, xaxis-5, yaxis+tempMaxMinLegendFontSize-10);
}

// MAX Humidity

function print_meteoSarriaHumMax(timeMax, humMax)
{
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");

    var hourMax = timeMax.toString().substring(8,10);
    var minMax = timeMax.toString().substring(10,12);
    var yearMax = timeMax.toString().substring(0,4);
    var monthMax = timeMax.toString().substring(4,6);
    var dayMax =  timeMax.toString().substring(6,8);
    var horaMax4display = hourMax+":"+minMax;
    var fechaMax4display = dayMax+"."+monthMax+"."+yearMax;
       
    xaxis = timeLineAnchor+(Number(hourMax) + Number(minMax)/60)*timeLineOffset;
    yaxis = tempLineAnchor - 4.6*tempLineOffset;
    ctx.font = humPresMaxMinLegendFontSize+"px Arial";
    ctx.fillStyle = getHumColor(humMax);
    ctx.fillText(humMax+"%", xaxis, yaxis);
    ctx.fillStyle = "red";
    ctx.fillText("↑", xaxis-35, yaxis);
    ctx.font = humPresMaxMin24hFontSize+"px Arial";
    ctx.fillText("24h",xaxis-35, yaxis+15);
   
    ctx.font = humPresMaxMinDateTimeFontSize+"px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText(fechaMax4display, xaxis, yaxis-humPresMaxMinLegendFontSize)
    ctx.fillText(horaMax4display, xaxis-5, yaxis+humPresMaxMinLegendFontSize-6);
}

// MIN Humidity

function print_meteoSarriaHumMin(timeMin, humMin)
{
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");

    var hourMin = timeMin.toString().substring(8,10);
    var minMin = timeMin.toString().substring(10,12);
    var yearMin = timeMin.toString().substring(0,4);
    var monthMin = timeMin.toString().substring(4,6);
    var dayMin =  timeMin.toString().substring(6,8);
    var horaMin4display = hourMin+":"+minMin;
    var fechaMin4display = dayMin+"."+monthMin+"."+yearMin;
    
    xaxis = timeLineAnchor+(Number(hourMin) + Number(minMin)/60)*timeLineOffset;
    yaxis = tempLineAnchor - 4.6*tempLineOffset;
    ctx.font = humPresMaxMinLegendFontSize+"px Arial";
    ctx.fillStyle = getHumColor(humMin);
    ctx.fillText(humMin+"%", xaxis, yaxis);
    ctx.fillStyle = "blue";
    ctx.fillText("↓", xaxis-35, yaxis);
    ctx.font = humPresMaxMin24hFontSize+"px Arial";
    ctx.fillText("24h",xaxis-35, yaxis+15);
   
    ctx.font = humPresMaxMinDateTimeFontSize+"px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText(fechaMin4display, xaxis, yaxis-humPresMaxMinLegendFontSize)
    ctx.fillText(horaMin4display, xaxis-5, yaxis+humPresMaxMinLegendFontSize-6);
}

// MAX Pressure

function print_meteoSarriaPresMax(timeMax, presMax)
{
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");

    var hourMax = timeMax.toString().substring(8,10);
    var minMax = timeMax.toString().substring(10,12);
    var yearMax = timeMax.toString().substring(0,4);
    var monthMax = timeMax.toString().substring(4,6);
    var dayMax =  timeMax.toString().substring(6,8);
    var horaMax4display = hourMax+":"+minMax;
    var fechaMax4display = dayMax+"."+monthMax+"."+yearMax;
       
    xaxis = timeLineAnchor+(Number(hourMax) + Number(minMax)/60)*timeLineOffset;
    yaxis = tempLineAnchor + 1.5*tempLineOffset;
    ctx.font = humPresMaxMinLegendFontSize+"px Arial";
    ctx.fillStyle = "DarkGreen";
    ctx.fillText(presMax+"hPa", xaxis, yaxis);
    ctx.fillStyle = "red";
    ctx.fillText("↑", xaxis-45, yaxis);
    ctx.font = humPresMaxMin24hFontSize+"px Arial";
    ctx.fillText("24h",xaxis-45, yaxis+15);
   
    ctx.font = humPresMaxMinDateTimeFontSize+"px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText(fechaMax4display, xaxis, yaxis-humPresMaxMinLegendFontSize)
    ctx.fillText(horaMax4display, xaxis-5, yaxis+humPresMaxMinLegendFontSize-6);
}

// MIN Humidity

function print_meteoSarriaPresMin(timeMin, presMin)
{
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");

    var hourMin = timeMin.toString().substring(8,10);
    var minMin = timeMin.toString().substring(10,12);
    var yearMin = timeMin.toString().substring(0,4);
    var monthMin = timeMin.toString().substring(4,6);
    var dayMin =  timeMin.toString().substring(6,8);
    var horaMin4display = hourMin+":"+minMin;
    var fechaMin4display = dayMin+"."+monthMin+"."+yearMin;
    
    xaxis = timeLineAnchor+(Number(hourMin) + Number(minMin)/60)*timeLineOffset;
    yaxis = tempLineAnchor + 1.5*tempLineOffset;
    ctx.font = humPresMaxMinLegendFontSize+"px Arial";
    ctx.fillStyle = "DarkGreen";
    ctx.fillText(presMin+"hPa", xaxis, yaxis);
    ctx.fillStyle = "blue";
    ctx.fillText("↓", xaxis-45, yaxis);
    ctx.font = humPresMaxMin24hFontSize+"px Arial";
    ctx.fillText("24h",xaxis-45, yaxis+15);
   
    ctx.font = humPresMaxMinDateTimeFontSize+"px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText(fechaMin4display, xaxis, yaxis-humPresMaxMinLegendFontSize)
    ctx.fillText(horaMin4display, xaxis-5, yaxis+humPresMaxMinLegendFontSize-6);
}


// LAST 24 hours

function drawHistory ()
{
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");
    
	var datos = [];
	var nextDatos = [];
	
    var horaHist;
    var nextHoraHist;
    var nextHoraHist4Display;
    var tempHoraHist;
    var nextTempHoraHist;
    var humHoraHist;
    var nextHumHoraHist;
    var presHoraHist;
    var nextPresHoraHist;
    var fromx;
    var fromy;
    var tox;
    var toy;
    
    var wrongTemptReading = false;
    var wrongHumReading = false;
     
       
    for (var h=0; h<23; h++)
    {
        horaHist = hour + h + 1;
        if (horaHist > 23)
        {
            horaHist = horaHist-24;
        }
        if (horaHist == 23)
        {
            nextHoraHist = 0;
            nextHoraHist4Display = 24;
        }
        else
        {
            nextHoraHist = horaHist+1;
            nextHoraHist4Display = nextHoraHist;
        }
		
        datos = getDataAt (horaHist);
	nextDatos = getDataAt (nextHoraHist);
        
        /* TEMPERATURE */


        tempHoraHist = datos[0];
        nextTempHoraHist = nextDatos[0];
        
        if (tempHoraHist == 99)
        { tempHoraHist = nextTempHoraHist; wrongTempReading = true; }         
        if (nextTempHoraHist == 99) 
        { nextTempHoraHist = tempHoraHist; wrongTempReading = true; }
        else { wrongTempReading = false; }
        
        ctx.beginPath();
        
        if (timeTempMaxLast24h[0] == horaHist)
        {
            // from horaHist to TempMax time 
            
            fromx = timeLineAnchor+horaHist*timeLineOffset;
            fromy = tempLineAnchor - (tempHoraHist/10)*tempLineOffset;
            tox = timeLineAnchor+((timeTempMaxLast24h[0]+(timeTempMaxLast24h[1]/60))*timeLineOffset);
            toy = tempLineAnchor - (tempMaxLast24h/10)*tempLineOffset;
            if (wrongTempReading) 
            { ctx.strokeStyle = "DimGray"; }
            else
            { ctx.strokeStyle = getTempColor(nextTempHoraHist); }
            
            
            ctx.moveTo(fromx,fromy);
            ctx.lineTo(tox,toy);
            if (horaHist > hour) 
            { 
                ctx.setLineDash([5,2]);
            }
            else
            {
                ctx.setLineDash([1,0]);
            }
            ctx.stroke();
            
            // from TempMax time to nextHoraHist
            
            ctx.beginPath();
            
            fromx = timeLineAnchor+(timeTempMaxLast24h[0]+(timeTempMaxLast24h[1]/60))*timeLineOffset;
            fromy = tempLineAnchor - (tempMaxLast24h/10)*tempLineOffset;
            tox = timeLineAnchor+nextHoraHist4Display*timeLineOffset;
            toy = tempLineAnchor - (nextTempHoraHist/10)*tempLineOffset;
            
            if (wrongTempReading) 
            { ctx.strokeStyle = "DimGray"; }
            else
            { ctx.strokeStyle = getTempColor(nextTempHoraHist); }
            ctx.moveTo(fromx,fromy);
            ctx.lineTo(tox,toy);
            if (horaHist > hour) 
            { 
                ctx.setLineDash([5,2]);
            }
            else
            {
                ctx.setLineDash([1,0]);
            }
            ctx.stroke();
        }
        else if (timeTempMinLast24h[0] == horaHist)
        {
            // from horaHist to TempMin time 
            
            fromx = timeLineAnchor+horaHist*timeLineOffset;
            fromy = tempLineAnchor - (tempHoraHist/10)*tempLineOffset;
            tox = timeLineAnchor+((timeTempMinLast24h[0]+(timeTempMinLast24h[1]/60))*timeLineOffset);
            toy = tempLineAnchor - (tempMinLast24h/10)*tempLineOffset;
            if (wrongTempReading) 
            { ctx.strokeStyle = "DimGray"; }
            else
            { ctx.strokeStyle = getTempColor(nextTempHoraHist); }
            
            
            ctx.moveTo(fromx,fromy);
            ctx.lineTo(tox,toy);
            if (horaHist > hour) 
            { 
                ctx.setLineDash([5,2]);
            }
            else
            {
                ctx.setLineDash([1,0]);
            }
            ctx.stroke();
            
            // from TempMin time to nextHoraHist
            
            ctx.beginPath();
            
            fromx = timeLineAnchor+(timeTempMinLast24h[0]+(timeTempMinLast24h[1]/60))*timeLineOffset;
            fromy = tempLineAnchor - (tempMinLast24h/10)*tempLineOffset;
            tox = timeLineAnchor+nextHoraHist4Display*timeLineOffset;
            toy = tempLineAnchor - (nextTempHoraHist/10)*tempLineOffset;
            
            if (wrongTempReading) 
            { ctx.strokeStyle = "DimGray"; }
            else
            { ctx.strokeStyle = getTempColor(nextTempHoraHist); }
            ctx.moveTo(fromx,fromy);
            ctx.lineTo(tox,toy);
            if (horaHist > hour) 
            { 
                ctx.setLineDash([5,2]);
            }
            else
            {
                ctx.setLineDash([1,0]);
            }
            ctx.stroke();
        }        
        
        else
        {
            fromx = timeLineAnchor+horaHist*timeLineOffset;
            fromy = tempLineAnchor - (tempHoraHist/10)*tempLineOffset;
            tox= timeLineAnchor+nextHoraHist4Display*timeLineOffset;
            toy = tempLineAnchor - (nextTempHoraHist/10)*tempLineOffset;
            if (wrongTempReading) 
            { ctx.strokeStyle = "DimGray"; }
            else
            { ctx.strokeStyle = getTempColor(nextTempHoraHist); }
            ctx.moveTo(fromx,fromy);
            ctx.lineTo(tox,toy);
            if (horaHist > hour) 
            { 
                ctx.setLineDash([5,2]);
            }
            else
            {
                ctx.setLineDash([1,0]);
            }
            ctx.stroke();
            ctx.fillStyle = "DarkGray";
            ctx.font = histValuesFontSize+"px Arial";
            if (wrongTempReading) 
            { ctx.fillStyle = "Red"; ctx.fillText("??",fromx,fromy-5); }
            else
            { ctx.fillText(tempHoraHist+"º", fromx, fromy+5); }
        }
        /* HUMIDITY */

        humHoraHist = datos[1];
        nextHumHoraHist = nextDatos[1];

        if (humHoraHist == 300)
        { humHoraHist = nextHumHoraHist; wrongHumReading = true; }         
        if (nextHumHoraHist == 300) 
        { nextHumHoraHist = humHoraHist; wrongHumReading = true; }
        else { wrongHumReading = false; }
        
        ctx.beginPath();
        fromx = timeLineAnchor+horaHist*timeLineOffset;
        fromy = humLineAnchor - (humHoraHist/10)*humLineOffset;
        tox= timeLineAnchor+nextHoraHist4Display*timeLineOffset;
        toy = humLineAnchor - (nextHumHoraHist/10)*humLineOffset;
        if (wrongHumReading) 
        { ctx.strokeStyle = "DimGray"; }
        else
        { ctx.strokeStyle = getHumColor(nextHumHoraHist); }
        ctx.moveTo(fromx,fromy);
        ctx.lineTo(tox,toy);
        ctx.stroke();
        ctx.fillStyle = "DarkGray";
        ctx.font = histValuesFontSize+"px Arial";
        if (wrongHumReading) 
        { ctx.fillStyle = "Red"; ctx.fillText("??",fromx,fromy-5); }
        else
        { ctx.fillText(humHoraHist+"%",fromx,fromy-5); }


        /* PRESSURE */
        

        presHoraHist = datos[2];
        nextPresHoraHist = nextDatos[2];
        
        if ( (presHoraHist > 300) && (nextPresHoraHist > 300) )
        {
            ctx.beginPath();
            fromx = timeLineAnchor+horaHist*timeLineOffset;
            fromy = presLineAnchor - ((presHoraHist-980)/10)*presLineOffset;
            tox= timeLineAnchor+nextHoraHist4Display*timeLineOffset;
            toy = presLineAnchor - ((nextPresHoraHist-980)/10)*presLineOffset;
            ctx.strokeStyle = "DarkGreen";
            ctx.moveTo(fromx,fromy);
            ctx.lineTo(tox,toy);
            ctx.stroke();
//            ctx.fillStyle = "DarkGray";
//            ctx.font = histValuesFontSize+"px Arial";
//            ctx.fillText(presHoraHist+"hPa",fromx,fromy-5);
        }

    }
}


// AUXILIAR FUNCTIONS


function getTempColor (temp)
{
    if (temp == '--')
    {
        return "DarkGrey";
    }
    else if (temp>35)
    {
        return "DarkMagenta";
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
        return "Orange";
    }
    else if (temp > 14.9)
    {
        return "Green";
    }
    else if (temp > 9.9)
    {
        return "Lime";
    }
    else if (temp > 4.9)
    {
        return "Aqua";
    }
    else if (temp > 0)
    {
        return "Blue";
    }
    else { return "BlueViolet"; }
    
}

function getHumColor(hum)
{
    if (hum == '--%')
    {
        return "DarkGray";
    }
    else if (hum > 79.9)
    {
        return "DarkBlue";
    }
    else if (hum > 49.9)
    {
        return "Blue";
    }
    else if (hum > 24.9)
    {
        return "Orange";
    }
    else
    {
        return "Red";
    }
}


function getClientRawData ()
{
    var request = new XMLHttpRequest();
    request.open("GET", "clientrawextra.txt", false);
    request.send(null);
    return request.responseText;
}


function getDataAt (hora)
{
	var datos = [];
    hora = hora > 9 ? hora : '0' + hora;

    var hourlyFileName = "data_"+hora+"00.xml";
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
	
	return datos;
}
