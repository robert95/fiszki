// display the banner at startup
function baner(){
	alert("baner");
	initAd();
}
function baner2(){
	alert("baner2");
	window.plugins.AdMob.createBannerView();
}

function initAd(){
	if ( window.plugins && window.plugins.AdMob ) {
		window.plugins.AdMob.setOptions( {
			publisherId: 'ca-app-pub-5149183983154394/3906975069',
			interstitialAdId: 'ca-app-pub-5149183983154394/6360913863',
			adSize: window.plugins.AdMob.AD_SIZE.SMART_BANNER,	//use SMART_BANNER, BANNER, IAB_MRECT, IAB_BANNER, IAB_LEADERBOARD 
			bannerAtTop: false, // set to true, to put banner at top 
			overlap: true, // banner will overlap webview  
			offsetTopBar: false, // set to true to avoid ios7 status bar overlap 
			isTesting: false, // receiving test ad 
			autoShow: false // auto show interstitial ad when loaded 
		});

		registerAdEvents();
		window.plugins.AdMob.createInterstitialView();	//get the interstitials ready to be shown 
		window.plugins.AdMob.requestInterstitialAd();

	} else {
		alert( 'admob plugin not ready' ); 
	}
}
//functions to allow you to know when ads are shown, etc. 
function registerAdEvents() {
	document.addEventListener('onReceiveAd', function(){});
	document.addEventListener('onFailedToReceiveAd', function(data){});
	document.addEventListener('onPresentAd', function(){});
	document.addEventListener('onDismissAd', function(){ });
	document.addEventListener('onLeaveToAd', function(){ });
	document.addEventListener('onReceiveInterstitialAd', function(){ });
	document.addEventListener('onPresentInterstitialAd', function(){ });
	document.addEventListener('onDismissInterstitialAd', function(){
		window.plugins.AdMob.createInterstitialView();			//REMOVE THESE 2 LINES IF USING AUTOSHOW 
		window.plugins.AdMob.requestInterstitialAd();			//get the next one ready only after the current one is closed 
	});
}