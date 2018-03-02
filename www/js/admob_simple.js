var admobid = {};
var firstShownAd = true; 
var countAd = 0;
var isPremium = false;
if( /(android)/i.test(navigator.userAgent) ) { 
    admobid = { // for Android
        banner: 'ca-app-pub-5149183983154394/3906975069',
        interstitial: 'ca-app-pub-5149183983154394/6360913863'
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

var waitForAd = false;
function getWaitForAd(){
	return waitForAd;
}
function setWaitForAd( value ){
	waitForAd = value;
}

function prepareAd(){
	
	if(!isPremium){
		if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false} );
	}
	
}

function showAd(){
	
	if(!isPremium){
		if(countAd == 0){
			countAd = 1;
		}else{
			waitForAd = true;
			countAd++;
			if(countAd%2 == 0){
				//$("#myCall-big-ad").show();
				if(AdMob) AdMob.showInterstitial();
			}else{
				if(AdMob) AdMob.showInterstitial();
			}
		}
	}
	
}
