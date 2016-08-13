// display the banner at startup
function baner(){
	alert("baner");
	var admobid = {};
	// select the right Ad Id according to platform
	if( /(android)/i.test(navigator.userAgent) ) { 
		admobid = { // for Android
			banner: 'ca-app-pub-6869992474017983/9375997553',
			interstitial: 'ca-app-pub-6869992474017983/1657046752'
		};
	} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
		admobid = { // for iOS
			banner: 'ca-app-pub-6869992474017983/4806197152',
			interstitial: 'ca-app-pub-6869992474017983/7563979554'
		};
	} else {
		admobid = { // for Windows Phone
			banner: 'ca-app-pub-6869992474017983/8878394753',
			interstitial: 'ca-app-pub-6869992474017983/1355127956'
		};
	}
}
function baner2(){
	alert("baner2");
	alert(AdMob);
	
	AdMob.setOptions({
      // adSize: 'SMART_BANNER',
      position: AdMob.AD_POSITION.BOTTOM_CENTER,
      isTesting: true, // set to true, to receiving test ad for testing purpose
      bgColor: 'black', // color name, or '#RRGGBB'
      // autoShow: true // auto show interstitial ad when loaded, set to false if prepare/show
      // offsetTopBar: false, // avoid overlapped by status bar, for iOS7+
    });
    // new events, with variable to differentiate: adNetwork, adType, adEvent
    $(document).on('onAdFailLoad', function(e){
      // when jquery used, it will hijack the event, so we have to get data from original event
      if(typeof e.originalEvent !== 'undefined') e = e.originalEvent;
      var data = e.detail || e.data || e;
      alert('error: ' + data.error +
          ', reason: ' + data.reason +
          ', adNetwork:' + data.adNetwork +
          ', adType:' + data.adType +
          ', adEvent:' + data.adEvent); // adType: 'banner', 'interstitial', etc.
    });
     
}

function createSelectedBanner(){
	if(AdMob) AdMob.createBanner( admobid.banner );
	if(AdMob) AdMob.showBanner( 8 );
}