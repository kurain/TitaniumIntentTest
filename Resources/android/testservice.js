var service = Titanium.Android.currentService;
var intent = service.intent;
var url = intent.getStringExtra("download_url");
Ti.API.debug("Try Download: " + url);

var xhr = Ti.Network.createHTTPClient();

xhr.onload = function () {
    var image = this.responseData;
    Titanium.Media.Android.setSystemWallpaper(image,false);
};
xhr.open('GET', url);
xhr.send();
