
/* meteosarria background functions */

   
function draw_meteoSarriaBackground ()
{
    var canvas = document.getElementById("meteoinfo");
    var ctx = canvas.getContext("2d");
    
//    ctx.clearRect(0,0,1300,800);
    ctx.beginPath();

    var titleYaxis = 135;
    var bcnYaxis = 30;
    var coorYaxis = 50;
    var tempLegend;
    var timeLegend;
    var humLegend;
    var presLegend;
    
    // Image
    
    
    var img = new Image();
    img.onload = function () {
        ctx.drawImage(img, canvas.width/2-380, 0, 760, 140);
        ctx.font = titleFontSize+"px Arial";
        ctx.fillStyle = "LightGray";
        ctx.textAlign = "center";
        ctx.fillText("#meteoSarrià", canvas.width/2, titleYaxis); 
        ctx.font = bcnFontSize+"px Arial";
        
        ctx.fillText("Sarrià - Barcelona", canvas.width/2, bcnYaxis);     
        ctx.fillText("41º 23' 42\" N - 2º 7' 21\" E (110 m.)", canvas.width/2, coorYaxis); 
    }
    img.src = "portada.JPG";
//    img.src = "Tibidabo.JPG";

 //  THIS AFFECTS THE REST OF THE CANVAS!!!
     ctx.textAlign = "center";

    // Time lines
    ctx.beginPath();
    for (var time=0; time<25; time++)
    {
        ctx.lineWidth = 0.5; 
        ctx.fillStyle = "LightGray";
        ctx.strokeStyle = "WhiteSmoke";
        ctx.moveTo(timeLineAnchor+time*timeLineOffset, tempLineAnchor-4*tempLineOffset);
        ctx.lineTo(timeLineAnchor+time*timeLineOffset, tempLineAnchor+tempLineOffset);
        ctx.stroke();
        timeLegend = time+"h";
        ctx.font = "15px Arial";
        ctx.fillText(timeLegend,timeLineAnchor+time*timeLineOffset,tempLineAnchor-4.2*tempLineOffset);
        
    }
        
    // Temp lines
    ctx.beginPath();

    var ticon = new Image();
    ticon.src = "temp.png";
    ticon.onload = function () 
    {
        ctx.drawImage(ticon, 10, tempLineAnchor-tempLineOffset*4.1, 20, 25);
    }
    ctx.font = "12px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("Temp", 20, 30+tempLineAnchor-tempLineOffset*4);
    
    
    ctx.fillStyle = "LightGray";
    ctx.strokeStyle = "WhiteSmoke";

    for (var level=4; level>-2; level--)
    {
        ctx.lineWidth = 0.5; 
        ctx.moveTo(40,tempLineAnchor-tempLineOffset*level);
        ctx.lineTo(timeLineAnchor+25*timeLineOffset,tempLineAnchor-tempLineOffset*level);
        ctx.stroke();

    }
    // temp color lines
    ctx.beginPath();
    ctx.lineWidth = 2; 
    ctx.font = "15px Arial";
    // -10º to -5º
//    ctx.moveTo(timeLineAnchor+1,tempLineAnchor+tempLineOffset);
//    ctx.lineTo(timeLineAnchor+1,tempLineAnchor+tempLineOffset/2);
//    ctx.strokeStyle = getTempColor(-7);
//    ctx.stroke();
    ctx.fillStyle = getTempColor(-7);
    ctx.fillText("-10º",45,tempLineAnchor+tempLineOffset);
    // -5º to 0º
//    ctx.moveTo(timeLineAnchor+1,tempLineAnchor+tempLineOffset/2);
//    ctx.lineTo(timeLineAnchor+1,tempLineAnchor);
//    ctx.strokeStyle = getTempColor(-3);
//    ctx.stroke();
    ctx.fillStyle = getTempColor(-3);
    ctx.fillText("-5º",45,tempLineAnchor+tempLineOffset/2);
    // 0º to 5º
    ctx.beginPath();
//    ctx.moveTo(timeLineAnchor+1,tempLineAnchor);
//    ctx.lineTo(timeLineAnchor+1,tempLineAnchor-tempLineOffset/2);
//    ctx.strokeStyle = getTempColor(2);
//    ctx.stroke();
    ctx.fillStyle = getTempColor(2);
    ctx.fillText("0º",45,tempLineAnchor);
    // 5º to 10º
    ctx.beginPath();
//    ctx.moveTo(timeLineAnchor+1,tempLineAnchor-tempLineOffset/2);
//    ctx.lineTo(timeLineAnchor+1,tempLineAnchor-tempLineOffset);
//    ctx.strokeStyle = getTempColor(7);
//    ctx.stroke();
    ctx.fillStyle = getTempColor(7);
    ctx.fillText("5º",45,tempLineAnchor-tempLineOffset/2);
     // 10º to 15º
    ctx.beginPath();
//    ctx.moveTo(timeLineAnchor+1,tempLineAnchor-tempLineOffset);
//    ctx.lineTo(timeLineAnchor+1,tempLineAnchor-tempLineOffset*1.5);
//    ctx.strokeStyle = getTempColor(12);
//    ctx.stroke();
    ctx.fillStyle = getTempColor(12);
    ctx.fillText("10º",45,tempLineAnchor-tempLineOffset);
     // 15º to 20º
    ctx.beginPath();
//    ctx.moveTo(timeLineAnchor+1,tempLineAnchor-tempLineOffset*1.5);
//    ctx.lineTo(timeLineAnchor+1,tempLineAnchor-tempLineOffset*2);
//    ctx.strokeStyle = getTempColor(17);
//    ctx.stroke();
    ctx.fillStyle = getTempColor(17);
    ctx.fillText("15º",45,tempLineAnchor-tempLineOffset*1.5);
     // 20º to 25º
    ctx.beginPath();
//    ctx.moveTo(timeLineAnchor+1,tempLineAnchor-tempLineOffset*2);
//    ctx.lineTo(timeLineAnchor+1,tempLineAnchor-tempLineOffset*2.5);
//    ctx.strokeStyle = getTempColor(22);
//    ctx.stroke();
    ctx.fillStyle = getTempColor(22);
    ctx.fillText("20º",45,tempLineAnchor-tempLineOffset*2);
     // 25º to 30º
    ctx.beginPath();
//    ctx.moveTo(timeLineAnchor+1,tempLineAnchor-tempLineOffset*2.5);
//    ctx.lineTo(timeLineAnchor+1,tempLineAnchor-tempLineOffset*3);
//    ctx.strokeStyle = getTempColor(27);
//    ctx.stroke();
    ctx.fillStyle = getTempColor(27);
    ctx.fillText("25º",45,tempLineAnchor-tempLineOffset*2.5);
     // 30º to 35º
    ctx.beginPath();
//    ctx.moveTo(timeLineAnchor+1,tempLineAnchor-tempLineOffset*3);
//    ctx.lineTo(timeLineAnchor+1,tempLineAnchor-tempLineOffset*3.5);
//    ctx.strokeStyle = getTempColor(32);
//    ctx.stroke();
    ctx.fillStyle = getTempColor(32);
    ctx.fillText("30º",45,tempLineAnchor-tempLineOffset*3);
     // 35º to 40º
    ctx.beginPath();
//    ctx.moveTo(timeLineAnchor+1,tempLineAnchor-tempLineOffset*3.5);
//    ctx.lineTo(timeLineAnchor+1,tempLineAnchor-tempLineOffset*4);
//    ctx.strokeStyle = getTempColor(37);
//    ctx.stroke();
    ctx.fillStyle = getTempColor(37);
    ctx.fillText("35º",45,tempLineAnchor-tempLineOffset*3.5);
    ctx.fillText("40º",45,tempLineAnchor-tempLineOffset*4);
     
    
    // Hum legend
    ctx.beginPath();
    ctx.fillStyle = "LightGray";
    ctx.strokeStyle = "WhiteSmoke";
    
    for (var level = 0; level<11; level++)
    {
        humLegend = 10*level+"%";
        ctx.fillStyle = getHumColor(10*level);
        ctx.fillText(humLegend, timeLineAnchor+25*timeLineOffset, humLineAnchor-level*humLineOffset);
    }
    
    var hicon = new Image();
    hicon.src = "hum.png";
    hicon.onload = function () 
    {
        ctx.drawImage(hicon, timeLineAnchor+24.9*timeLineOffset-15, humLineAnchor-11*humLineOffset, 25, 25);
    }
    ctx.font = "12px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("Hum", timeLineAnchor+24.9*timeLineOffset, humLineAnchor-10.3*humLineOffset);

    
    // Pres Legend
    
    ctx.beginPath();
    ctx.fillStyle = presHistColor;
    for (var level = 0; level<6; level++)
    {
        presLegend = 990+10*level+"hPa";
        ctx.fillText(presLegend, timeLineAnchor+26*timeLineOffset+10, presLineAnchor-level*presLineOffset);
    }
    
    var picon = new Image();
    picon.src = "pres.png";
    picon.onload = function () 
    {
        ctx.drawImage(picon, timeLineAnchor+26*timeLineOffset-15, humLineAnchor-11*humLineOffset, 25, 25);
    }
    ctx.font = "12px Arial";
    ctx.fillStyle = "DimGray";
    ctx.fillText("Pres", timeLineAnchor+26*timeLineOffset, humLineAnchor-10.3*humLineOffset);
   
    // Wind Lines
        
    ctx.lineWidth = 0.5;

    for (var ws=0; ws<8; ws++)
    {
        ctx.moveTo(40,windLineAnchor-windLineOffset*ws*10);
        ctx.lineTo(timeLineAnchor+25*timeLineOffset,windLineAnchor-windLineOffset*ws*10);
        ctx.stroke();
        ctx.font = "15px Arial";
        ctx.fillText(ws*10, 25,windLineAnchor-windLineOffset*ws*10);
         
    }
    ctx.beginPath();
    var wicon = new Image();
    wicon.src = "wind.png";
    wicon.onload = function () 
    {
        ctx.drawImage(wicon, 5, windLineAnchor-windLineOffset*95, 30, 30);
    }

    ctx.fillStyle = "DimGray";
    ctx.font = "15px Arial";
    ctx.fillText("(km/h)",20,(windLineAnchor-windLineOffset*87)+20);
    
    // draw links 
    
    draw_meteoSarria_links ();
    
    
}

