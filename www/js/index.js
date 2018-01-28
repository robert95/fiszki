var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
	
    onDeviceReady: function() {
		alert("aaa");
/*
		var src = '/android_asset/www/date/1.m4a';
		my_media = new Media(src, function () { }, function (err) { console.log("M: " + err.message + " - " + err.code); });
		
		if(!checkConnection()){	
			navigator.notification.confirm(
				getTrans(t_not_connected_text),
				onNoInternetConfirm,
				getTrans(t_not_connected_title),
				getTrans(t_not_connected_exit)
			);
		}else{
			startApp();
			setTextWidth();
		}
		document.addEventListener("resume", hideBars, false);
*/

		/*var autoHideNavigationBar = true;
		if($( window ).width() < 600) window.navigationbar.setUp(autoHideNavigationBar); */
		
/*		
		if($( window ).width() > 600) {
			StatusBar.hide();	
		}else{
			AndroidFullScreen.immersiveMode(emptyFunctionS, emptyFunctionS);
		}
		
		document.addEventListener('onAdDismiss',function(data){
			//prepareAd();	
			removeAllProgress();
			removeAllProgress2();
			setTimeout(function(){	
				loadProgressBarToFull();
				loadProgressBarToFull2();
			}, 100);
			actionAfterCloseAd();
		});
		
		document.addEventListener('onAdLeaveApp',function(data){
			//prepareAd();
			actionAfterCloseAd();
		});
		
		document.addEventListener('onAdPresent',function(data){
			setTimeout(function(){		
				removeAllProgress();
				removeAllProgress2();
			}, 50);
			prepareAd();
		});
*/
		
	/*	document.addEventListener("pause", function() {
			navigator.notification.confirm(
				"Jeżeli zamkniesz teraz aplikacje Twój dzisiejszy postęp nie zostanie zapisany!",
				onConfirm,
				"Uwaga!",
				"Anuluj, Wyjście"
			);
		});*/
/*		
		document.addEventListener("backbutton", function (e) {
            e.preventDefault();
        }, false );
		
		setTextWidth();
		
		volumeTest();
		
		//smoothLoadProgressBarWelcome();
*/		

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};