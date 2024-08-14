/* 
 Last 24h history graphs
 */

function drawHistory ()
{
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");
    
    var datos = [];
    var nextDatos = [];
	
    var horaHist;
    var horaHist4Query;
    var timeHist4Query;
    var min4Query;
    var realTimeHist;
    var nextHoraHist;
    var nextTimeHist4Query;
    var nextRealTimeHist;
    var nextTimeHist4Display;
    var tempHoraHist;
    var nextTempHoraHist;
    var humHoraHist;
    var nextHumHoraHist;
    var presHoraHist;
    var nextPresHoraHist;
    var solHoraHist;
    var nextSolHoraHist;
    var hourlyRainHoraHist;
    var dailyRainHoraHist;
    var nextDailyRainHoraHist;
    var windDirHoraHist;
    var windSpeedHoraHist;
    var windGustHoraHist;
    var fromx;
    var fromy;
    var tox;
    var toy;
    var minute;
    var t4q;
    
    var wrongTemptReading = false;
    var wrongHumReading = false;
     
       
    for (var h=0; h<22; h++)
    {
     
        horaHist = hour + h + 2;
        if (horaHist > 23)
        {
            horaHist = horaHist-24;
        }
//        horaHist4Query = horaHist > 9 ? String(horaHist) : '0' + horaHist;

        for (var min=0; min<6; min++)
        {
            minute = min*10;
            
            if (!( (horaHist==hour-1) && (minute>mins+10) )) 
            {           
                timeHist4Query = getTime4Query(horaHist,minute); 
                realTimeHist = horaHist+minute/60;
            }
            
            if (timeHist4Query == '2350')
            {
                nextTimeHist4Query = '0000';
                nextRealTimeHist = 0;
                nextTimeHist4Display = 24; //!!!
            }
            else if (minute==0)
            {
//                nextTimeHist4Query = horaHist4Query+"10";
                nextTimeHist4Query = getTime4Query(horaHist,10);
                nextRealTimeHist = horaHist+(10/60);
                nextTimeHist4Display = nextRealTimeHist; // !!!              
            }
            else if (minute<50)
            {
//                nextTimeHist4Query = horaHist4Query+String(minute+10);
                nextTimeHist4Query = getTime4Query(horaHist,minute+10);
                nextRealTimeHist = horaHist+((minute+10)/60);
                nextTimeHist4Display = nextRealTimeHist; // !!!
            }
            else  // minute = 50
            {
//                var tmpHoraHist = (horaHist+1);
//                tmpHoraHist = tmpHoraHist > 9 ? String(tmpHoraHist) : '0'+tmpHoraHist;
                nextTimeHist4Query = getTime4Query(horaHist+1,0);
                nextRealTimeHist = horaHist+1;
                nextTimeHist4Display = nextRealTimeHist; // !!!
            }
            
//            datos = getDataAt (timeHist4Query);
//            nextDatos = getDataAt (nextTimeHist4Query);

            var idx = getIndexAt(timeHist4Query);
            var idxNext = getIndexAt(nextTimeHist4Query);
            datos = datos24h[idx];
            nextDatos = datos24h[idxNext];
               
            var dayDatos = parseInt(datos[9].substring(0,2));
            var dayNextDatos = parseInt(nextDatos[9].substring(0,2));

            /* TEMPERATURE */

            tempHoraHist = datos[0];
            if (dayNextDatos < dayDatos-1) {nextTempHoraHist = datos[0]; }
            else { nextTempHoraHist = nextDatos[0]; }
            
//            if (timeHist4Query == "0000")
//            {
//                ctx.beginPath();
//                var ticon = new Image();
//                ticon.src = "temp.png";
//                ticon.onload = function () 
//                {
//                    ctx.drawImage(ticon, timeLineAnchor+10, tempLineAnchor - (tempHoraHist/10)*tempLineOffset, 20, 25);
//                }
//            }

            ctx.beginPath();
            ctx.lineWidth=2.5;
 
            fromx = timeLineAnchor+realTimeHist*timeLineOffset;
            fromy = tempLineAnchor - (tempHoraHist/10)*tempLineOffset;
            tox= timeLineAnchor+nextTimeHist4Display*timeLineOffset;
            toy = tempLineAnchor - (nextTempHoraHist/10)*tempLineOffset;
            ctx.strokeStyle = getTempColor(nextTempHoraHist);
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
            
            if (minute==0)
            {
                ctx.fillStyle = "DarkGray";
                ctx.font = histValuesFontSize+"px Arial";
                ctx.fillText(tempHoraHist+"º", fromx, fromy-5);
            }
        
                 
            /* HUMIDITY */

            humHoraHist = datos[1];
            nextHumHoraHist = nextDatos[1];

//            if (timeHist4Query == "0000")
//            if ( (horaHist == 0) && (minute==0) )
//            {
//                ctx.beginPath();
//                var hicon = new Image();
//                hicon.src = "hum.png";
//                hicon.onload = function () 
//                {
//                    ctx.drawImage(hicon, timeLineAnchor+10, (humLineAnchor - (humHoraHist/10)*humLineOffset), 25, 25);
//                    ctx.fillText(humHoraHist, timeLineAnchor-20,500);
//                }
//            }
            ctx.beginPath();
            ctx.lineWidth=1;
            fromx = timeLineAnchor+realTimeHist*timeLineOffset;
            fromy = humLineAnchor - (humHoraHist/10)*humLineOffset;
            tox= timeLineAnchor+nextTimeHist4Display*timeLineOffset;
            toy = humLineAnchor - (nextHumHoraHist/10)*humLineOffset;
            ctx.strokeStyle = getHumColor(nextHumHoraHist);
            ctx.moveTo(fromx,fromy);
            ctx.lineTo(tox,toy);
            ctx.stroke();
            ctx.fillStyle = "DarkGray";
            ctx.font = histValuesFontSize+"px Arial";
            if (minute==0) 
            { ctx.fillText(humHoraHist+"%",fromx,fromy-5); }


            /* PRESSURE */

//            if (timeHist4Query == "0000")
//            {
//                ctx.beginPath();
//                var picon = new Image();
//                picon.src = "pres.png";
//                picon.onload = function () 
//                {
//                    ctx.drawImage(picon, timeLineAnchor+10, presLineAnchor - ((presHoraHist-990)/10)*presLineOffset, 25, 25);
//                }
//            }

            presHoraHist = datos[2];
            nextPresHoraHist = nextDatos[2];

            if ( (presHoraHist > 300) && (nextPresHoraHist > 300) )
            {
                ctx.beginPath();
                fromx = timeLineAnchor+realTimeHist*timeLineOffset;
                fromy = presLineAnchor - ((presHoraHist-990)/10)*presLineOffset;
                tox= timeLineAnchor+nextTimeHist4Display*timeLineOffset;
                toy = presLineAnchor - ((nextPresHoraHist-990)/10)*presLineOffset;
                ctx.strokeStyle = presHistColor;
                ctx.moveTo(fromx,fromy);
                ctx.lineTo(tox,toy);
                ctx.stroke();
            }

            /* SOLAR RADIATION */

            solHoraHist = datos[3];
            nextSolHoraHist = nextDatos[3];

            if (timeHist4Query == "0000")
            {
                ctx.beginPath();
                var sicon = new Image();
                sicon.src = "cur_solar.png";
                sicon.onload = function () 
                {
                    ctx.drawImage(sicon, timeLineAnchor+10, solLineAnchor-40, 25, 25);
                }
            }

            if ( (solHoraHist != '--') && (nextSolHoraHist != '--') && (horaHist<=hour) )
            {
                ctx.beginPath();
                fromx = timeLineAnchor+realTimeHist*timeLineOffset;
                fromy = solLineAnchor - solHoraHist*solLineOffset;
                tox= timeLineAnchor+nextTimeHist4Display*timeLineOffset;
                toy = solLineAnchor - nextSolHoraHist*solLineOffset;
                ctx.strokeStyle = "OrangeRed";
                ctx.moveTo(fromx,fromy);
                ctx.lineTo(tox,toy);
                ctx.lineWidth=0.5;
                ctx.stroke();
                ctx.closePath();
                ctx.fillStyle="LightYellow";
                ctx.fill();
            }
            
            /* WIND  */
            
            if (horaHist <= hour)
            {
                windDirHoraHist = parseInt(datos[6]);
                windSpeedHoraHist = parseInt(datos[7]);
                windGustHoraHist = parseInt(datos[8]);
                
                var arrowDir = windDirHoraHist*Math.PI/180 - Math.PI;;
                
                ctx.beginPath();
                fromx = timeLineAnchor+realTimeHist*timeLineOffset;
                fromy = windLineAnchor;
                tox = timeLineAnchor+realTimeHist*timeLineOffset;
                toy = windLineAnchor-windSpeedHoraHist*windLineOffset;
                ctx.strokeStyle = "LightGray";
                ctx.moveTo(fromx,fromy);
                ctx.lineTo(tox,toy);
                ctx.lineWidth=0.5;
                ctx.stroke();
                drawArrowhead(tox,toy,arrowDir,ctx, "Gray")
                
                if (windGustHoraHist>29)
                {
                    ctx.beginPath();
                    fromx = timeLineAnchor+realTimeHist*timeLineOffset;
                    fromy = windLineAnchor-windSpeedHoraHist*windLineOffset;
                    tox = timeLineAnchor+realTimeHist*timeLineOffset;
                    toy = windLineAnchor-windGustHoraHist*windLineOffset;
                    ctx.strokeStyle = "Salmon";
                    ctx.moveTo(fromx,fromy);
                    ctx.lineTo(tox,toy);
                    ctx.lineWidth=0.5;
                    ctx.stroke();
                    drawArrowhead(tox,toy,arrowDir,ctx,"Tomato");
                }
                
            }
            
            /* RAIN */
            
            
            hourlyRainHoraHist = datos[4];
            dailyRainHoraHist = datos[5];
            nextHourlyRainHoraHist = nextDatos[4];
            nextDailyRainHoraHist = nextDatos[5];
                 

            if ( (horaHist<=hour) && (dailyRainHoraHist > 0) )
            {
                ctx.beginPath();
                
                fromx = timeLineAnchor+realTimeHist*timeLineOffset;
                fromy = histRainBottomAnchor-(histRainBottomOffset*dailyRainHoraHist);
                tox= timeLineAnchor+nextTimeHist4Display*timeLineOffset;
                toy = histRainBottomAnchor-(histRainBottomOffset*nextDailyRainHoraHist);
                ctx.strokeStyle = "DodgerBlue";
                ctx.lineWidth=1;
                ctx.moveTo(fromx,fromy);
                ctx.lineTo(tox,toy);
                ctx.stroke();
                
                if (nextDailyRainHoraHist > dailyRainHoraHist)
                {
                    var rain10m = nextDailyRainHoraHist-dailyRainHoraHist;
                    var hourRainRectUppLeftX = timeLineAnchor+realTimeHist*timeLineOffset;
                    var hourRainRectUppLeftY = histRainBottomAnchor-(histRainBottomOffset*rain10m);
                    var hourRainRectHeight = histRainBottomOffset*rain10m;
                    var hourRainRectWidth = timeLineOffset/6;
                    ctx.fillStyle="PaleTurquoise";
                    ctx.fillRect(hourRainRectUppLeftX, hourRainRectUppLeftY, hourRainRectWidth, hourRainRectHeight);

                    ctx.save();
                    ctx.translate(hourRainRectUppLeftX+timeLineOffset/6,hourRainRectUppLeftY-20);
                    ctx.rotate(-Math.PI/2);
                    ctx.font = histRainValuesFontSize+"px Arial";
                    ctx.fillStyle = "Black";
                    ctx.fillText(rain10m.toFixed(1)+" mm",0,0);
                    ctx.restore();
                    
                }
            }
            
        }

    }
}

