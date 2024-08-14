/* 
 CODE TO LOAD THE RADAR IMAGE FROM AEMET
 */


function draw_radarImage()
{
    var curUtcTimeStamp = [];
    curUtcTimeStamp = getCurrentUtcTimestamp();
    var radarGif = "http://www.aemet.es/imagenes_d/eltiempo/observacion/radar/"+curUtcTimeStamp[0]+"_r8ba.gif";
    
    document.getElementById('radar').src = radarGif;
    document.getElementById('radar_legend').innerHTML = "radar "+hour+":"+curUtcTimeStamp[1];

}

function draw_radarSequence ()
{
    var last20UtcTimeStamp4Radar = [[]];
    last20UtcTimeStamp4Radar = getLast20UtcTimeStamp4Radar();
 
    draw_single_radar_image(last20UtcTimeStamp4Radar,10);
  
}

function draw_single_radar_image(timestamp,seq)
{
//    var msg = "SEQ = "+seq+" TS = "+ timestamp[seq][0]+"</br>";
//    document.write(msg);
    
    var radarGif;
    var hora4d = parseInt(timestamp[seq][2])+1;
    if (hora4d>23) {hora4d=hora4d-24; }
        
    try
    {
        radarGif = "http://www.aemet.es/imagenes_d/eltiempo/observacion/radar/"+timestamp[seq][0]+"_r8ba.gif";
    }
    catch(err)
    {
        radarGif = "";
    }

    document.getElementById('radar').src = radarGif;
 
    if (seq==1)
    {
        document.getElementById('radar_legend_now').innerHTML = "radar "+hora4d+":"+timestamp[seq][1];        
        document.getElementById('radar_legend').innerHTML = "";        
    } 
    else
    {
        document.getElementById('radar_legend').innerHTML = "radar "+hora4d+":"+timestamp[seq][1];        
        document.getElementById('radar_legend_now').innerHTML = "";        
    } 
        
    if (seq>1) {seq--;} else {seq=11;}

    if (seq == 11)
    {
        timerID = setTimeout(function(){ draw_single_radar_image(timestamp,seq); }, 7000);
    }
    else
    {
        timerID = setTimeout(function(){ draw_single_radar_image(timestamp,seq); }, 1000);
    }
        
}