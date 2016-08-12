window.plugins.AdMob.setOptions( {
  publisherId: 'ca-app-pub-5149183983154394/3906975069',
  interstitialAdId: 'ca-app-pub-5149183983154394/6360913863',
  bannerAtTop: false, // set to true, to put banner at top
  overlap: false, // set to true, to allow banner overlap webview
  offsetTopBar: false, // set to true to avoid ios7 status bar overlap
  isTesting: false, // receiving test ad
  autoShow: true // auto show interstitial ad when loaded
});
// display the banner at startup
function baner(){
	alert("baner");
	window.plugins.AdMob.createBannerView();
}
function baner2(){
	alert("baner2");
	window.plugins.AdMob.createInterstitialView();
	window.plugins.AdMob.showInterstitialAd(
	  true, 
	  function(){},
	  function(e){alert(JSON.stringify(e));}
	);
}