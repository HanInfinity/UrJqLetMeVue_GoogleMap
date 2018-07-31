// Initialize and add the map
function initMap() {
  memLat = localStorage.getItem("lat");
  memLng = localStorage.getItem("lng");
  console.log(memLat);
  if( memLat === null){
    latlng = {
        lat: 25.0306328,
        lng: 121.5353035
    };
  }else{
    latlng = {
        lat: Number(memLat),
        lng: Number(memLng)
    };
  }
    //大安森林公園的經緯度位置
    
    var infoWindow = new google.maps.InfoWindow;
    // var uluru = {lat: -25.344, lng: 131.036};
    // The map, centered at Lat&Lng

    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 14,
            center: latlng
        });
    // The marker, positioned at Lat&Lng
    var marker = new google.maps.Marker({
        position: latlng,
        map: map
    });
    var infoContent = '<div class="infoWin"><h2 style="text-align: center">認同請分享Alex宅在嘛～</h2><img src="../img/localAlex.png"><button type="button" id="saveCurPos" class="btn">儲存當前位置</button></div>';

    function openInfoWindow(CurrentPos) {
        infoWindow.setPosition(CurrentPos);
        infoWindow.setContent(infoContent);
        infoWindow.open(map);
    }

    // https://developers.google.com/maps/documentation/javascript/examples/map-geolocation
    function getCurrentPosition(CurrentPos) {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position);
            CurrentPos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log(CurrentPos);
            openInfoWindow(CurrentPos);
            // addMarker(CurrentPos);
            map.setCenter(CurrentPos);
            $(".loding").css("visibility","hidden");
            CurLat = CurrentPos.lat;
            CurLng = CurrentPos.lng;
            console.log(CurLat);
            $("#saveCurPos").click(function(){
              localStorage.setItem("lat", CurLat);
              localStorage.setItem("lng", CurLng);
            });
          });
    }

    function addMarker(CurrentPos) {
        var marker = new google.maps.Marker({
            position: CurrentPos,
            map: map
        });
    }
  
    /********
     * function:改變map style
     * update:2018070
     * developer:King Tzeng
     * URL:https://developers.google.com/maps/documentation/javascript/styling
     ********/
      
    function mapStyle() {
        let styleUrl = "json/mapStyle.json";
        $.ajax({
            url: styleUrl,
            type: "GET",
            data: null,
            success: function(styledMap) {
                // styledMap = styledMap;
                console.log(styledMap);
                map.setOptions({
                    styles: styledMap
                });

            },
            error: function(data) {
                console.log(data);
            },
            complete: function(data) {
                console.log(data);
            }
        });

    }
    function clearMemory(){
      localStorage.removeItem('lat');
      localStorage.removeItem('lng');
    }
    $("#CurrentPositionBtn").click(function() {
      $(".loding").css("visibility","visible");
        getCurrentPosition();

    });
    $("#AlexStyleBtn").click(function() {
        mapStyle();
    });
    $("#OriginStyleBtn").click(function(){
      map.setOptions({
          styles: []
      });
    });
    $("#ClearPositionBtn").click(function(){
      clearMemory();
    });    
}
