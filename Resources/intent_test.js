var win = Ti.UI.currentWindow;

var button1 = Ti.UI.createButton({
	width: '100dp',
	heigth: '50dp',
	top: '30dp',
	left: '10dp',
	title: 'ACTION_SEND'
})

button1.addEventListener(
	'click',
	function(){
		var intent = Ti.Android.createIntent({
    		action: Ti.Android.ACTION_SEND,
    		type: 'text/plain',
    		data:'hogehuga'
    	});
		Ti.Android.currentActivity.startActivity(intent);
	}
);
win.add(button1);

var button2 = Ti.UI.createButton({
	width: '100dp',
	heigth: '50dp',
	top: '90dp',
	left: '10dp',
	title: 'QR Reader'
})

button2.addEventListener(
	'click',
	function(){
		var intent = Ti.Android.createIntent({
    		action: "com.google.zxing.client.android.SCAN",
    	});
		intent.putExtra("SCAN_MODE", "QR_CODE");
		intent.putExtra("SCAN_MODE", "EAN_8");
		intent.putExtra("SCAN_MODE", "EAN_13");
		Ti.Android.currentActivity.startActivity(intent);
	}
);
win.add(button2);

var button3 = Ti.UI.createButton({
	width: '100dp',
	heigth: '50dp',
	top: '150dp',
	left: '10dp',
	title: 'QR Reader with Result'
})

button3.addEventListener(
	'click',
	function(){
		var intent = Ti.Android.createIntent({
			action: "com.google.zxing.client.android.SCAN"
    	});
		intent.putExtra("SCAN_MODE", "QR_CODE");
		intent.putExtra("SCAN_MODE", "EAN_8");
		intent.putExtra("SCAN_MODE", "EAN_13");

		Ti.Android.currentActivity.startActivityForResult(
			intent,
			function(e){
				var intent = e.intent;
				Ti.API.debug(intent);
				var contents = intent.getStringExtra("SCAN_RESULT");
				alert(contents);
			}
		);
	}
);
win.add(button3);

var button4 = Ti.UI.createButton({
	width: '100dp',
	heigth: '50dp',
	top: '210dp',
	left: '10dp',
	title: 'Service Start'
})

button4.addEventListener(
	'click',
	function(){
		Ti.API.debug('create intent');
		var intent = Titanium.Android.createServiceIntent( { url: 'testservice.js' } );
		intent.putExtra('interval', 1000000);
		intent.putExtra('download_url', 'http://cdn-ak.f.st-hatena.com/images/fotolife/r/r_kurain/20090818/20090818232053.jpg');
		var service = Titanium.Android.createService(intent);
		service.start();
	}
);
win.add(button4);