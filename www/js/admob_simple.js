// display the banner at startup
function baner(){
	alert("baner");
	initAd(); 
	admob.createBannerView();
}
function baner2(){
	alert("baner2");
	// Set AdMobAds options:
      admob.setOptions({
        publisherId:          "ca-app-pub-5149183983154394~4884180664"  // Required
      });

      // Start showing banners (atomatic when autoShowBanner is set to true)
     
}