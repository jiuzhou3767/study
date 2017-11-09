 function getAlloffset(o){
        var isIE8 = window.navigator.userAgent.indexOf('MSIE 8.0') != -1;
        var result = {
            "top":o.offsetTop,
            "left":o.offsetLeft
        }
        while(o = o.offsetParent){
            if(window.getComputedStyle){
                var borderTop = parseInt(getComputedStyle(o)['border-top-width']);
                var borderLeft = parseInt(getComputedStyle(o)['border-left-width']);
            }else{
                var borderTop = parseInt(o.currentStyle['borderTopWidth']);
                var borderLeft = parseInt(o.currentStyl['borderLeftWidth']);
            }
            if(isNaN(borderTop)){
                borderTop = 0;
            }
            if(isNaN(borderLeft)){
                borderLeft = 0;
            }

            !isIE8 && (result.top += borderTop);
            !isIE8 && (result.left += borderLeft);
            result.top +=o.offsetTop;
            result.left += o.offsetLeft;
        }
        return result;
     }