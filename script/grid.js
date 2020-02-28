$(document).ready(function()
{   
    var selectedColor="red";
    $("body").css("overflow", "hidden");
    /*https://stackoverflow.com/questions/28576966/draw-clickable-grid-of-1-million-squares*/
    var canvas = document.getElementById('myCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var context = canvas.getContext('2d');

    drawGrid(context);

    // https://jsfiddle.net/SamyBencherif/2tjxcz99/
    canvas.addEventListener('click', function(evt) {
        var mousePos = getSquare(canvas, evt);
        var color=selectedColor;
        
        var eventLocation = getEventLocation(this,evt);
        // Get the data of the pixel according to the location generate by the getEventLocation function
        var context2 = this.getContext('2d');
        var pixelData2 = context2.getImageData(eventLocation.x, eventLocation.y, 1, 1).data; 
        if((pixelData2[0] == 0) && (pixelData2[1] == 0) && (pixelData2[2] == 0)){
        fillSquare(context, mousePos.x, mousePos.y,color);
        }else{
            fillSquare(context, mousePos.x, mousePos.y,"white");
        }
        
    }, false);

     /*
    https://stackoverflow.com/questions/47737404/detecting-left-and-right-mouse-events-for-a-canvas-game
    left button=0, 
    middle button=1,
    right button=2
    */
    var isVisible=false;
    canvas.addEventListener('mousedown', function(evt) {
      var btnCode=evt.button;
      switch (btnCode) {
      case 0:       
        // left button: /.
        break;

      case 1:
        // middle button: /.
        break;

      case 2:                
        var mousePos = getSquare(canvas, evt);    
        if(!isVisible){
            replaceColorPicker(mousePos.x, mousePos.y);
            popup();  
            isVisible=true;
            canvas.addEventListener("mousemove",function(e){
                var eventLocation = getEventLocation(this,e);
                var x1=eventLocation.x;
                var x2=mousePos.x;
                var colorPickerLengthX=181;
                
                if(x2<x1 || x2>(x1+colorPickerLengthX)){
                    closePopup();
                }
            });
        }else{
            closePopup();
            isVisible=false;
        }
        break;
        }
    });
    
    /*http://jsfiddle.net/f5EMT/1/*/
    var mousePosition;
    var offset = [0,0];
    var div;
    var isDown = false;

    div = document.getElementById('myColorPicker');

    div.addEventListener('mousedown', function(e) {
        isDown = true;
        offset = [
            div.offsetLeft - e.clientX,
            div.offsetTop - e.clientY
        ];
    }, true);

    document.addEventListener('mouseup', function() {
        isDown = false;
    }, true);

    document.addEventListener('mousemove', function(event) {
        event.preventDefault();
        if (isDown) {
            mousePosition = {

                x : event.clientX,
                y : event.clientY
            };
            div.style.left = (mousePosition.x + offset[0]) + 'px';
            div.style.top  = (mousePosition.y + offset[1]) + 'px';
        }
    }, true);

    canvas.addEventListener("mousemove",function(e){
    // http://jsfiddle.net/Meligy/2kyaJ/3/
    setInterval(function(){
        var $sample1 = $("#magentaID");
        var $sample2 = $("#redID");
        var $sample3 = $("#blueID");
        var $sample4 = $("#yellowID");
        var $sample5 = $("#cyanID");
        if($sample1.is(":hover")) {
            selectedColor="magenta";
        }
        else if($sample2.is(":hover")){
            selectedColor="red";
        }
        else if($sample3.is(":hover")){
            selectedColor="blue";
        }
        else if($sample4.is(":hover")){
            selectedColor="yellow";
        }
        else if($sample5.is(":hover")){
            selectedColor="cyan";
        }
        else {
           //
        }
    }, 200);
},false);

});

function getSquare(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: 1 + (evt.clientX - rect.left) - (evt.clientX - rect.left)%10,
        y: 1 + (evt.clientY - rect.top) - (evt.clientY - rect.top)%10
    };
}

function drawGrid(context) {
    var length = 1000;
    for (var x = 0.5; x < length+1; x += 10) {
      context.moveTo(x, 0);
      context.lineTo(x, length);
    }
    
    for (var y = 0.5; y < length+1; y += 10) {
      context.moveTo(0, y);
      context.lineTo(length, y);
    }
    
    context.strokeStyle = "#ddd";
    context.stroke();
}

function fillSquare(context, x, y, color){
    context.fillStyle = color;
    context.fillRect(x,y,9,9);
}

/*https://www.w3schools.com/howto/howto_css_modals.asp*/
function popup(){
    // Get the colorPicker
    var colorPicker = document.getElementById("myColorPicker");
    $(colorPicker).fadeIn(1500);
}

function closePopup(){
    var colorPicker = document.getElementById("myColorPicker");
    $(colorPicker).fadeOut(1500);
}

function replaceColorPicker(x_pos, y_pos) {
  var d = document.getElementById('myColorPicker');
  d.style.position = "absolute";
  d.style.left = x_pos+'px';
  d.style.top = y_pos+'px';
}

/*https://ourcodeworld.com/articles/read/185/how-to-get-the-pixel-color-from-a-canvas-on-click-or-mouse-event-with-javascript*/
var canvas = document.getElementById("canvas");

function getElementPosition(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

function getEventLocation(element,event){
		var pos = getElementPosition(element);
    
    return {
    		x: (event.pageX - pos.x),
      	y: (event.pageY - pos.y)
    };
}

// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onmousedown
function mouseDownMagenta() {
  var colorPicker = document.getElementById("myColorPicker");
  $(colorPicker).fadeOut(1500);
}

function mouseDownRed() {
  var colorPicker = document.getElementById("myColorPicker");
  $(colorPicker).fadeOut(1500);
}

function mouseDownBlue() {
  var colorPicker = document.getElementById("myColorPicker");
  $(colorPicker).fadeOut(1500);
}

function mouseDownYellow() {
  var colorPicker = document.getElementById("myColorPicker");
  $(colorPicker).fadeOut(1500);
}

function mouseDownCyan() {
  var colorPicker = document.getElementById("myColorPicker");
  $(colorPicker).fadeOut(1500);
}

$(window).resize(function(){
    if ($(window).width() < canvas.width) {
       window.resizeTo(canvas.width ,$(window).width());
    }
    if ($(window).height() < canvas.height) {
       window.resizeTo(canvas.height ,$(window).height());
    }
});




