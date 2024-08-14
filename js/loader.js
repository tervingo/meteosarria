/* 
 LOADER.JS
 */

function loadData()
{
    var h4q;
    var m4q;
    var t4q;

    // initialize indexDatos24h
    var contador=0;
    for (var h4q=0; h4q<24; h4q++)
    {
        for (var minu4q=0;minu4q<6;minu4q++)
        {
            var m4q = minu4q*10;
            t4q = getTime4Query(h4q,m4q);
            indexDatos24h[contador]= t4q;
            contador++;
        }
    }

    // almacenar datos en datos24h

    for(var slice=0;slice<contador;slice++)
    {
        datos24h[slice]=getDataAt(indexDatos24h[slice]);
        h4q = parseInt(indexDatos24h[slice].substring(0,2));
        
        var dayStamp=parseInt(datos24h[slice][9].substring(0,2));
        
        if ( (h4q<=parseInt(hour)) && (dayStamp !== parseInt(day)) )
        {
            datos24h[slice]=getDataAt(indexDatos24h[slice-1]);
        }
        else if ( (h4q>parseInt(hour)) && !(wasDayYesterday(dayStamp)) )
        {
            datos24h[slice]=getDataAt(indexDatos24h[slice-1]);            
        }
    }
}

