// Initialize and add the map
function initMap() {
    //取得記憶的經緯度
    memLat = localStorage.getItem("lat");
    memLng = localStorage.getItem("lng");
    console.log(memLat);

    //偵測有沒有記憶的經緯度
    if (memLat === null) {
        //初始經緯度 大安森林公園的經緯度位置
        latlng = {
            lat: 25.0306328,
            lng: 121.5353035
        };
    } else {
        latlng = {
            lat: Number(memLat),
            lng: Number(memLng)
        };
    }
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

    /* infoWindow */
    var infoWindow = new google.maps.InfoWindow;
    var infoContent = '<div class="infoWin"><h2 style="text-align: center">認同請分享Alex宅在嘛～</h2><img src="../img/localAlex.png"><button type="button" id="saveCurPos" class="btn">儲存當前位置</button></div>';

    function openInfoWindow(CurrentPos) {
        infoWindow.setPosition(CurrentPos);
        infoWindow.setContent(infoContent);
        infoWindow.open(map);
    }

    /********
     * function:取得當前位置 PS.使用原生js的function
     * update: 20180731
     * developer:King Tzeng
     * Url:https://developers.google.com/maps/documentation/javascript/examples/map-geolocation
     ********/

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
            $(".loding").css("visibility", "hidden");
            CurLat = CurrentPos.lat;
            CurLng = CurrentPos.lng;
            console.log(CurLat);
            //按鈕-儲存經緯度到localStorage
            $("#saveCurPos").click(function() {
                localStorage.setItem("lat", CurLat);
                localStorage.setItem("lng", CurLng);
            });
        });
    }
    // 增加一個pin
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

    //清除localStorage
    function clearMemory() {
        localStorage.removeItem('lat');
        localStorage.removeItem('lng');
    }
    //按鈕-取得當前位置
    $("#CurrentPositionBtn").click(function() {
        $(".loding").css("visibility", "visible");
        getCurrentPosition();
    });
    //按鈕-套用自訂map的map stlye
    $("#AlexStyleBtn").click(function() {
        mapStyle();
    });
    //按鈕-套用原始的map stlye
    $("#OriginStyleBtn").click(function() {
        map.setOptions({
            styles: []
        });
    });
    //按鈕-清除記憶
    $("#ClearPositionBtn").click(function() {
        clearMemory();
    });
}
