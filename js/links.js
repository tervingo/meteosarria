/* 
 LINKS WITHIN CANVAS
 */

// LINKS WITHIN CANVAS

function byId(e){return document.getElementById(e);}

function draw_meteoSarria_links ()
{
    outlineLinks();
    byId('meteoinfo').addEventListener("mousemove", on_mousemove, false);
    byId('meteoinfo').addEventListener("click", on_click, false);
}

var inLink = "";
var link_widths = [];

function outlineLinks()
{
    var canvas = byId('meteoinfo');
    var ctx = canvas.getContext('2d');

    ctx.beginPath();
    var enlace = new Image();
    enlace.src = "link.png";
    enlace.onload = function () 
    {
        ctx.drawImage(enlace,linkIconAnchorX,linkIconAnchorY,20,20);
    }


    var i, n = link_pos.length;
    ctx.textAlign = "left";

    for (i=0; i<n; i++)
    {
        ctx.font = linkTextFontSize+"px Arial";
        ctx.fillStyle = "SteelBlue";
        ctx.fillText(link_labels[i],link_pos[i][0], link_pos[i][1]);
        link_widths[i]=ctx.measureText(link_labels[i]).width;
    }
    
    ctx.textAlign = "center";

}

function on_mousemove(evt) 
{
    var mouse_x, mouse_y;

    // Get the mouse position relative to the canvas element.
    if (evt.layerX || evt.layerX) 
    { //for firefox
        mouse_x = evt.layerX;
        mouse_y = evt.layerY;
    }
    mouse_x -= this.offsetLeft;
    mouse_y -= this.offsetTop;

    var n = link_labels.length;
    inLink = "";
    for(i=0; i<n; i++) 
    {
        var linkX = link_pos[i][0]-10,  // why the offset?
            linkY = link_pos[i][1]-50,   // why the offset?
            linkwidth = link_widths[i],
            linkheight = 15;

        //is the mouse over the link?
        if( (mouse_x >= linkX) && (mouse_x <= (linkX + linkwidth)) && (mouse_y >= linkY) && (mouse_y <= (linkY + linkheight)))
        {
            document.body.style.cursor = "pointer";
            inLink = link_URLs[i];
            break;
        }
        else{
            document.body.style.cursor = "";
        }
    }
}
function on_click(evt)
{
    if (inLink != "")
        window.open(inLink);
}


