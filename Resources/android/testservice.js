var service = Titanium.Android.currentService;
var intent = service.intent;
var twitter_id  = intent.getStringExtra("twitter_id");
var url = 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=' + twitter_id;
Ti.API.debug("Try Download: " + url);

var xhr = Ti.Network.createHTTPClient();

function showNotification(modified){
	Ti.API.info('start notification');
	var twitter_url = 'http://twitter.com/' + twitter_id;
	var intent = Ti.Android.createIntent({
		action: Ti.Android.ACTION_VIEW, 
	    data: twitter_url 
	});
	var pending = Ti.Android.createPendingIntent({ 
		'intent' : intent,
	});
	var notification = Ti.Android.createNotification({
		contentIntent : pending,
		contentTitle: 'Twitter をチェックしました',
		contentText:   modified ? '更新されていました' : '更新されていませんでした',
	});
	Ti.Android.NotificationManager.notify(1, notification);
}

xhr.onload = function () {
    var json = this.responseText;
    var data = JSON.parse(json);
    var tweet_id = data[0].id_str;
    
    var last_id = Ti.App.Properties.getString('last_tweet_id');
    Ti.API.info([tweet_id, last_id]);
    if (last_id && last_id == tweet_id ) {
    	showNotification(false);
    } else {
    	Ti.App.Properties.setString('last_tweet_id',tweet_id);
    	showNotification(true);
    }
};
xhr.open('GET', url);
xhr.send();
