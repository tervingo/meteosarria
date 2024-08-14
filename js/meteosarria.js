/* meteosarria main JavaScript file */

/* include JavaScript modules */

var variables_src = "js/variables.js";
var maxminval_src = "js/maxmin_values.js?id="+Math.random();
var history_src = "js/history.js?id="+Math.random();
var meteodata_src = "js/meteodata.js?id="+Math.random();

// document.write('<script type="text/javascript" src="js/variables.js"></script>');

document.write('<script type="text/javascript" src="js/variables.js"></script>');
document.write('<script type="text/javascript" src="js/auxiliary.js"></script>');
document.write('<script type="text/javascript" src="js/radar.js"></script>');
document.write('<script type="text/javascript" src="js/loader.js"></script>');
document.write('<script type="text/javascript" src="js/background.js"></script>');
document.write('<script type="text/javascript" src="js/current_data.js"></script>');
document.write('<script type="text/javascript" src="js/links.js"></script>');
document.write('<script type="text/javascript" src='+maxminval_src+'"></script>');
document.write('<script type="text/javascript" src='+history_src+'"></script>');
document.write('<script type="text/javascript" src='+meteodata_src+'"></script>');

function print_meteosarria_data ()
{
    loadData();
    draw_meteoSarriaBackground();
    drawHistory();
    print_day_meteodata();
    update_meteoSarriaCurrentData ()
    update_meteoSarria_day_maxmin ()
    print_meteosarriaYearMonthData(METEODATA_YEAR);
}