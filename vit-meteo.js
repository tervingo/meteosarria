// JavaScript Document
// vit-meteo.js
/* showClock() function extracts the current time hours, minutes and seconds and then displays them in the div with showText id from the BODY section */ 

function showClock()
{
var clock=new Date();
var day=clock.getDate();
var month=clock.getMonth();
var year=clock.getYear();
var hours=clock.getHours();
var minutes=clock.getMinutes();
var seconds=clock.getSeconds();
// for a nice disply we'll add a zero before the numbers between 0 and 9
if (hours<10){
hours="0" + hours;
}
if (minutes<10){
minutes="0" + minutes;
}
if (seconds<10){
seconds="0" + seconds;
}

month+=1;
if (month<10) {
month = "0"+ month;
}

if ( ( (minutes == "01") || (minutes == "06") || (minutes == "11") || (minutes == "16") || (minutes == "21") ||  (minutes == "26") ||  
       (minutes == "31") || (minutes == "36") || (minutes == "41") || (minutes == "46") ||  (minutes == "51") ||  (minutes == "56") ) 
      && (seconds == "00")
      )   
   { window.location.reload(true); 
   }


document.getElementById('fechaHora-cabecera').innerHTML=day+"."+month+"."+year+"<br>"+hours+":"+minutes+":"+seconds;
t=setTimeout('showClock()',500);
/* setTimeout() JavaScript method is used to call showClock() every 1000 milliseconds (that means exactly 1 second) */
}

function logoDer()
{
   var ld = document.getElementById('logo-der');

   var mtsatSpDia = "http://www.sat24.com/images.php?country=sp&amp;sat=&amp;1193513323545";
   var mtsatEuDia = "http://www.sat24.com/images.php?country=eu&amp;sat=&amp;1193513323545";
   var mtSatSpNoche = "http://www.sat24.com/images.php?country=sp&amp;sat=ir&amp;1193513323545";
   var mtSatEuNoche = "http://www.sat24.com/images.php?country=eu&amp;sat=ir&amp;1193513323545";
   var gfsBarPanel = "http://www.wzkarten.de/pics/avnpanel1";
   var gfsTempPanel = "http://www.wzkarten.de/pics/avnpanel2";
   var gfsLluviaPanel = "http://www.wzkarten.de/pics/avnpanel4";
   var radar = "http://www.meteocat.com/mediamb_xemec/servmet/radar/images/cappi250_catalunya_10dBZ/composicio_ultima.png";
   
   var reloj = new Date();
   var hora = reloj.getHours();
   var segundo = reloj.getSeconds();

   var amanece = 8;
   var anochece = 19;
   
   if (segundo < 10)
   {
      if ( (hora > amanece) && (hora < anochece) )
      // Día 
      {
         ld.innerHTML = "<a href='"+mtsatEuDia+"' target='_blank'><img src='"+mtsatEuDia+"' width='240' height='200' /></a>";
      }
      else
      // Noche 
      {
         ld.innerHTML = "<a href='"+mtSatEuNoche+"' target='_blank'><img src='"+mtSatEuNoche+"' width='240' height='200' /></a>";
      }
   }
   else if (segundo < 20)
   {
      if ( (hora > amanece) && (hora < anochece) )
      // Día 
      {
         ld.innerHTML = "<a href='"+mtsatSpDia+"' target='_blank'><img src='"+mtsatSpDia+"' width='240' height='200' /></a>";
      }
      else
      // Noche 
      {
         ld.innerHTML = "<a href='"+mtSatSpNoche+"' target='_blank'><img src='"+mtSatSpNoche+"' width='240' height='200' /></a>";
      }
   }  
   else if (segundo < 30)
   {
      ld.innerHTML = "<a href='http://www.meteocat.com/mediamb_xemec/servmet/marcs/marc_radar.html' target='_blank'><img src='"+radar+"' width='240' height='200' /></a>";
   }
   else if (segundo < 40)
   {
      ld.innerHTML = "<a href='"+gfsBarPanel+".html' target='_blank'><img src='"+gfsBarPanel+".gif' width='240' height='200' /></a>";
   }
   else if (segundo < 50)
   {
      ld.innerHTML = "<a href='"+gfsTempPanel+".html' target='_blank'><img src='"+gfsTempPanel+".gif' width='240' height='200' /></a>";
   }
   else
   {
      ld.innerHTML = "<a href='"+gfsLluviaPanel+".html' target='_blank'><img src='"+gfsLluviaPanel+".gif' width='240' height='200' /></a>";
   }     
      
   t=setTimeout('logoDer()',10000);
   }
   
   
   var interval = 5000;

   var imageNum = 0;
   imageArray = new Array();
   imageArray[imageNum++] = new imageItem("Catedral.jpg");
   imageArray[imageNum++] = new imageItem("Espolon.jpg");
   imageArray[imageNum++] = new imageItem("MercadoNavidad.jpg");
   imageArray[imageNum++] = new imageItem("OrillaRio.jpg");
   imageArray[imageNum++] = new imageItem("TeatroPrincipal.jpg");
   imageArray[imageNum++] = new imageItem("Templete.jpg");
   imageArray[imageNum++] = new imageItem("Terraza_E.jpg");
   imageArray[imageNum++] = new imageItem("Terracita1.jpg");
   imageArray[imageNum++] = new imageItem("ViT_Nevada_2004.jpg");
   imageArray[imageNum++] = new imageItem("ViT_Nevada_2005.jpg");
   imageArray[imageNum++] = new imageItem("Espolon2.jpg");
   imageArray[imageNum++] = new imageItem("Catedral2.jpg");
   imageArray[imageNum++] = new imageItem("SanLesmes.jpg");
   imageArray[imageNum++] = new imageItem("LainCalvo.jpg");
   imageArray[imageNum++] = new imageItem("arbol.jpg");
   imageArray[imageNum++] = new imageItem("VIT_Noche.jpg");
   imageArray[imageNum++] = new imageItem("VIT_Noche2.jpg");
   imageArray[imageNum++] = new imageItem("VIT_luna.jpg");
   imageArray[imageNum++] = new imageItem("Tornado.jpg");
   imageArray[imageNum++] = new imageItem("Tibidabo.jpg");
   imageArray[imageNum++] = new imageItem("Cencellada.jpg");
   imageArray[imageNum++] = new imageItem("LaIsla_1.jpg");
   imageArray[imageNum++] = new imageItem("LaIsla_2.jpg");
   imageArray[imageNum++] = new imageItem("Espoloncillo.jpg");
   imageArray[imageNum++] = new imageItem("Espolon_ArcoStaMaria.jpg");
   imageArray[imageNum++] = new imageItem("Cencellada_2.jpg");
   imageArray[imageNum++] = new imageItem("Cencellada_3.jpg");
   imageArray[imageNum++] = new imageItem("GFS_Temp500hPa_20041227.png");
   
   var totalImages = imageArray.length;

   function imageItem(image_location) {
      this.image_item = new Image();
      this.image_item.src = image_location;
   }
   function get_ImageItemLocation(imageObj) {
      return(imageObj.image_item.src)
   }

   function randNum(x, y) {
      var range = y - x + 1;
      return Math.floor(Math.random() * range) + x;
   }

   function getNextImage() {
      imageNum = randNum(0, totalImages-1);
//    alert(imageNum);
      var new_image = get_ImageItemLocation(imageArray[imageNum]);
      return(new_image)
      }
      
      
   function logoIzq(place) {
      var new_image = getNextImage();
      document[place].src = new_image;
      var recur_call = "logoIzq('"+place+"')";
      timerID = setTimeout(recur_call, interval);
        }

