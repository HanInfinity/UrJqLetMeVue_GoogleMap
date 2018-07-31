# Alex宅幹嘛-你的jQ我來Vue單元

17來ViewVue了....👉👈


### 應用服務說明
簡易串接GoogleMap API

### 功能說明
🔸套用客製化Style
>說明：

點擊TabBar可切換地圖的style，使用到jq的`addClass()`&`removeClass()`，切換到`Alex Style`按鈕時，使用到jq `$.ajax`呼叫已經存好的`mapStyle.json`。

>參考網址:
- [Google Maps APIs Styling Wizard](https://mapstyle.withgoogle.com/)
- [Styling documentation](https://developers.google.com/maps/documentation/javascript/styling)

DEMO:
![套用客製化Style](https://github.com/tinatyc/TheF2E-17King/blob/master/ScreenShot/1_TodoList_Screenshot.gif?raw=true "套用客製化Style")

🔸取得當前位置
>說明：

點擊`取得當前位置`，瀏覽器會問`允許取得位置權限`> 允許後map帶入當前的經緯度座標，
使用到原生js的`getCurrentPosition()`。

>參考網址:
- [MDN - Geolocation.getCurrentPosition()](https://developer.mozilla.org/zh-TW/docs/Web/API/Geolocation/getCurrentPosition)
- [Google Maps Geolocation documentation](https://developers.google.com/maps/documentation/javascript/examples/map-geolocation)

DEMO:
![取得當前位置](https://github.com/tinatyc/UrJqLetMeVue_GoogleMap/blob/master/gif/currentPosition.gif?raw=true "取得當前位置")

🔸HTML5 Web Storage (localStorage)
>說明：

取得當前位置後，Map的[infoWindow](https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple?hl=zh-tw)會跳出自訂的資訊，按`儲存當前位置`按鈕，會把當前座標存到`localStorage`裡，下次重新載入頁面時會判斷有無記憶座標，有則帶入儲存的位置、無則帶入出初始位置。
`PS：在無全部關閉瀏覽器的情況下`

>參考網址:
- [MDN - window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

DEMO:
![localStorage](https://github.com/tinatyc/UrJqLetMeVue_GoogleMap/blob/master/gif/currentPosition.gif?raw=true "localStorage")
