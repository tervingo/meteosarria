/* GLOBAL VARIABLES */

var tempLineOffset = 100;   // 68 
var tempLineAnchor = 610;
var humLineAnchor = tempLineAnchor+tempLineOffset;
var humLineOffset = (5*tempLineOffset)/10;
var presLineAnchor = tempLineAnchor+tempLineOffset;
var presLineOffset = tempLineOffset;
var timeLineOffset = 45;
var timeLineAnchor = 60;
var correctionTempOffset = 10;
var histRainBottomAnchor = tempLineAnchor+tempLineOffset;
var histRainBottomOffset = tempLineOffset/7;
var solLineAnchor = tempLineAnchor+tempLineOffset;
var solLineOffset = 0.45;
var windLineAnchor = tempLineAnchor+2.3*tempLineOffset;
var windLineOffset = 3;

var windRoseRadius = 40;

var currentDataAnchorX;
var currentDataAnchorY;
var prevCurDataAnchorX = 0;
var prevCurDataAnchorY = 0;
var curDataFrameXOffset = -85;   // -85
var curDataFrameYOffset = -65;
var curDataFrameWidth = 190;
var curDataFrameHeight = 260;
var prevWindX = 0;
var prevWindY = 0;


var meteoDataAnchorX = 1040;
var meteoDataAnchorY = 25;
var meteoDataAnchorXOffset = 125;
var meteoDataAnchorYOffset = 20;
var meteoDataDateTimeAnchorX = 1060;
var meteoDataDateTimeAnchorY = 20;

var meteoDayDataFcX = 1200;
var meteoDayDataFcY = 150;
        

var meteoYearDataAnchorX = 1;
var meteoYearDataAnchorY = 20;
var meteoYearDataYearAnchorX = 60;
var meteoYearDataYearAnchorY = 20;
var meteoYearDataDateOffset = 160;

var maxMinRectXOffset = -45;
var maxMinRectYOffset = -30;
var maxMinRectWidth = 60;
var maxMinRectHeight = 50;
var maxMinRectJump4Max = -25;
var maxMinRectJump4Min = 35;

var maxMinHumMaxYaxis = tempLineAnchor - 3.7*tempLineOffset;
//var maxMinHumMinYaxis = tempLineAnchor - 3.7*tempLineOffset;
var maxMinHumMinYaxis = tempLineAnchor + 0.4*tempLineOffset;
var maxMinPresMaxYaxis = tempLineAnchor - 3.3*tempLineOffset;
//var maxMinPresMinYaxis = tempLineAnchor - 3.3*tempLineOffset;
var maxMinPresMinYaxis = tempLineAnchor + 0.8*tempLineOffset;



var titleFontSize = 50;
var bcnFontSize = 15;
var fechaHoraFontSize = 20;
var maxMinValuesFontSize = 15;
var dateTimeFontSize = 18;
var meteoDataHeaderFontSize = 22;
var meteoDataValFontSize = 14;
var trendFontSize = 30;
var curDataTimeLapseFontSize = 10;

var histValuesFontSize = 10;
var histRainValuesFontSize = 10;
var tempLegendFontSize = 50;
var humPresLegendFontSize = 20;
var rainLegendFontSize = 16;
var rainRateFontSize = 12;
var windSpeedLegendFontSize = 14;
var windDirTextFontSize = 11;
var windGustLegendFontSize = 11;
var solUvLegendFontSize = 15;
var intTempLegendFontSize = 12;
var tempMaxMinLegendFontSize = 18;
var humPresMaxMinLegendFontSize = 18;
var tempMaxMin24hFontSize = 10;
var humPresMaxMin24hFontSize = 10;
var tempSensFontSize = 16;
var humPresMaxMinDateTimeFontSize = 12;
var tempMaxMinDateTimeFontSize = 12;
var difTemp24hagoFontSize = 12;
var neswWindFontSize = 12;
var curdataIconLegends = 12; 

var presHistColor = "Sienna";

var tempMaxLast24h;
var tempMinLast24h;
var humMaxLast24h;
var humMinLast24h;
var presMaxLast24h;
var presMinLast24h;

// MaxMin values

var tMaxYaxisMoved;
var tMinYaxisMoved;
var hMaxYaxisMoved;
var hMinYaxisMoved;
var pMaxYaxisMoved;
var pMinYaxisMoved;



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

var utcYear = d.getUTCFullYear();
var utcMonth = d.getUTCMonth()+1;
var utcDay = d.getUTCDate();
var utcHour = d.getUTCHours();
var utcMins = d.getUTCMinutes();

// Global arrays for history.js

var datos24h = [[]];
var indexDatos24h = [];



// links within canvas

var inLink = false;
var linkTextFontSize = 15;

var linkWidth;
var linkHeight = linkTextFontSize;

var linkIconAnchorX = 260;
var linkIconAnchorY = 140;
var linkMouseAnchorX = 290;
var linkMouseAnchorY = 155;

var link_labels = ["Radar", "Meteosat", "Meteoclimatic", "Renuncio (BU)", "GFS&al.", "NAO/AO", "Meteocat", "AEMET", "WUnder", "Picó"];
var link_pos = [  [linkMouseAnchorX,linkMouseAnchorY],
                  [linkMouseAnchorX+60,linkMouseAnchorY],   
                  [linkMouseAnchorX+140,linkMouseAnchorY],       
                  [linkMouseAnchorX+240,linkMouseAnchorY],      
                  [linkMouseAnchorX+350,linkMouseAnchorY], 
                  [linkMouseAnchorX+410,linkMouseAnchorY], 
                  [linkMouseAnchorX+480,linkMouseAnchorY],
                  [linkMouseAnchorX+550,linkMouseAnchorY], 
                  [linkMouseAnchorX+610,linkMouseAnchorY],
                  [linkMouseAnchorX+680,linkMouseAnchorY]              
              ];

var link_URLs = ["http://www.meteo.cat/observacions/radar",
                 "http://es.sat24.com/es",
                 "http://www.meteoclimatic.net/",
                 "http://www.renuncio.com/meteorologia/actual",
                 "http://www.wetterzentrale.de/topkarten/fsavneur.html",
                 "http://www.cpc.ncep.noaa.gov/products/precip/CWlink/pna/nao.sprd2.gif",
                 "http://www.meteo.cat/",
                 "http://www.aemet.es/es/portada",
                 "http://www.wunderground.com/q/zmw:00000.14.08181?sp=LEBL",
                 "http://www.pico.cat/forum/"
                 ];


/* "CONSTANTS" */

var METEODATA_MONTH = 0;
var METEODATA_YEAR = 1;

var JAN = 1;
var FEB = 2;
var MAR = 3;
var APR = 4;
var MAY = 5;
var JUN = 6;
var JUL = 7;
var AUG = 8;
var SEP = 9;
var OCT = 10;
var NOV = 11;
var DEC = 12;




