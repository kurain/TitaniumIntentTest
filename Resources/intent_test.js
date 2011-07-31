var win = Ti.UI.currentWindow;

var button1 = Ti.UI.createButton({
	width: '100dp',
	heigth: '50dp',
	top: '210dp',
	left: '10dp',
	title: 'Service Start'
})

button1.addEventListener(
	'click',
	function(){
		Ti.API.debug('create intent');
		var intent = Titanium.Android.createServiceIntent( { url: 'testservice.js' } );
		intent.putExtra('interval', 10000);
		intent.putExtra('twitter_id', 'kurain');
		var service = Titanium.Android.createService(intent);
		service.start();
	}
);
win.add(button1);