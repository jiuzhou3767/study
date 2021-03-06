

function animate(ele,endJson,time,callback){
        var startJson ={};   //开始数值
        for(var k in endJson){
            startJson[k] = parseInt(getStyle(ele,k));
        }
         console.log(startJson);


         var semaJson ={};   //信号量数值
         for(var k in startJson){
            semaJson[k] = startJson[k];
         }
         console.log(semaJson);


         var interval = 50; //间隔时间
         var zongcishu = time / interval;
         var count = 0;

         var stepJson = {};
         for(var k in endJson){
            endJson[k] = parseInt(endJson[k]);
            stepJson[k] = (endJson[k] - startJson[k])/zongcishu;
         }
         console.log(stepJson);
         console.log(endJson);
         console.log(zongcishu);


         timer = setInterval(function(){
            for(var k in endJson){
                 semaJson[k] += stepJson[k];
                 }
                 // console.log(semaJson);
                 if(count >= zongcishu){
                    for(var k in endJson){
                         semaJson[k] = endJson[k];
                    }
                    clearInterval(timer);
                    callback.apply(ele);
                 }
                count++;
                 for(var k in endJson){

                    if(k != "opacity"){
                        ele.style[k]  = semaJson[k] + 'px';
                        console.log(ele.style[k]);
                    }else{
                        ele.style[k] = semaJson[k];
                        ele.style.filter = "alpha(opcity="+semaJson[k] * 100+")";
                    }

                 // console.log(semaJson[k]);
                 // console.log(k);

                  }
                 // console.log(count);

         },interval);


     }


     function getStyle(obj,property){
        //能力检测
        if(window.getComputedStyle){
            //高级浏览器，要把用户输入的property属性中检测一下是不是驼峰，如果是就转为连字符写法
            //强制把用户输入的大写字母，变为小写加-
            //paddingLeft 转为 padding-left
            property = property.replace(/([A-Z])/g,function(match,$1){
                return "-" + $1.toLowerCase()
            });

            return window.getComputedStyle(obj)[property];
        }else{
            //IE只认识驼峰，要防止用户输入短横，要把短横改为大写字母
            //padding-left转为 paddingLeft
            property = property.replace(/\-([a-z])/g,function(match,$1){
                return  $1.toUpperCase()
            });

            return obj.currentStyle[property];
        }
     }