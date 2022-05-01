// var ip_wan = "";
            var geo = {};
            function getGeo(json){
                geo = {
                    longitude: json.geoplugin_longitude,
                    latitude: json.geoplugin_latitude,
                    city: json.geoplugin_city,
                    country: json.geoplugin_countryName
                };
                console.log("DONE");
            }
            
            // function getIPWan(json){
            //     console.log("WAN");
            //     ip_wan = json.ip;
            //     var s = document.createElement("script");
            //     s.type = "text/javascript";
            //     s.src = "http://www.geoplugin.net/json.gp?ip=ip_wan&jsoncallback=getGeo";
            //     $("head").append(s);        
            // }

            // $(document).ready(function(){
            //     var s = document.createElement("script");
            //     s.type = "text/javascript";
            //     s.src = "https://api.ipify.org?format=jsonp&callback=getIPWan";
            //     $("head").append(s);                
            // });