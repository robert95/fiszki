/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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
		//getLangList();
		if(!checkConnection()){
			alert("Połącz się z Internetem aby korzystać z aplikacji!");
			navigator.app.exitApp();
		}else{
			startApp();
		}
		document.addEventListener("resume", hideBars, false);
		var autoHideNavigationBar = true;
		if($( window ).width() < 600) window.navigationbar.setUp(autoHideNavigationBar);  
		
		document.addEventListener('onAdDismiss',function(data){
			prepareAd();
		});
		
		document.addEventListener('onAdLeaveApp',function(data){
			prepareAd();
		});
		
		AppRate.preferences = {
		  displayAppName: 'SpeakUp',
		  storeAppURL: {
			android: 'market://details?id=com.AwesomeIndustries.DriftZone2'
		  },
		  useLanguage: 'pl'
		};
		
		document.addEventListener("backbutton", function (e) {
            e.preventDefault();
        }, false );
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
function hideBars() {
	StatusBar.hide();	
	if($( window ).width() < 600) {
		window.navigationbar.setUp(false);
		window.navigationbar.hide();
		window.navigationbar.setUp(true);
	}
}
/* OBSŁUGA ŚCIEŻKI */
var mainPath;
function path(){
	var res = (cordova.file.externalDataDirectory).split('/').slice(-5);
	mainPath = (res.toString()).replace(/,/g,'/');
	return (res.toString()).replace(/,/g,'/');
}
/* END OBSŁUGA ŚCIEŻKI */

/* READ FILE3 */
function readDayF() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSSuccess3, onFSError);
}
function onFSSuccess3(fileSystem) {
    fileSystem.root.getFile(srcFile3, {create:false, exclusive:false}, gotFileEntry3, onFSError);
}
function gotFileEntry3(fileEntry) {
    fileEntry.file(gotFile3, onFSError);
}
function gotFile3(file) {
    readAsText3(file);
}
function readAsText3(file) {
  var reader = new FileReader();
  reader.onloadend = function(evt) {
		res3 = evt.target.result;
  };
  reader.readAsText(file);    
}
/* END READ FILE */

/* READ LANG */
function readLang() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSSuccessLangR, onFSErrorLangR);
}
function onFSSuccessLangR(fileSystem) {
    fileSystem.root.getFile(srcLang, {create:false, exclusive:false}, gotFileEntryLangR, onFSErrorLangR);
}
function gotFileEntryLangR(fileEntry) {
    fileEntry.file(gotFileLangR, onFSErrorLangR);
}
function gotFileLangR(file) {
    readAsTextLangR(file);
}
function readAsTextLangR(file) {
	var reader = new FileReader();
	reader.onloadend = function(evt) {
		resLang = evt.target.result;
	};
	reader.readAsText(file);    
}
function onFSErrorLangR(err) {
	var p = path();
	//alert("Pierwsze uruchomienie");
	//copyFirstPath();
	resLang = '{"lang":-1}';
}
/* END READ FILE */

/* READ FILE */
function readWriteFile() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSSuccess, onFSError);
}
function onFSSuccess(fileSystem) {
    fileSystem.root.getFile(srcFile, {create:false, exclusive:false}, gotFileEntry, onFSError);
}
function gotFileEntry(fileEntry) {
    fileEntry.file(gotFile, onFSError);
}
function gotFile(file) {
    readAsText(file);
}
function readAsText(file) {
  var reader = new FileReader();
  reader.onloadend = function(evt) {
		res = evt.target.result;
  };
  reader.readAsText(file);    
}
function onFSError(err) {
	var p = path();
	//alert("Ładownie...proszę czekać...");
	//copyFirstPath();
	res = "[]";
}
/* END READ FILE */

/* READ FILE2 */
function readWriteFile2() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSSuccess2, onFSError);
}
function onFSSuccess2(fileSystem) {
    fileSystem.root.getFile(srcFile2, {create:false, exclusive:false}, gotFileEntry2, onFSError);
}
function gotFileEntry2(fileEntry) {
    fileEntry.file(gotFile2, onFSError);
}
function gotFile2(file) {
    readAsText2(file);
}
function readAsText2(file) {
  var reader = new FileReader();
  reader.onloadend = function(evt) {
		res2 = evt.target.result;
  };
  reader.readAsText(file);    
}
/* END READ FILE */

/* SAVE FILE */
function saveFile(){
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSN2, failN);
}

function gotFSN2(fileSystem) {
	fileSystem.root.getFile(srcSave, {create: false}, gotFileEntryN2, failN);
}

function gotFileEntryN2(fileEntry) {
	fileEntry.createWriter(gotFileWriterN2, failN);
}

function gotFileWriterN2(writer) {
	writer.onwrite = function(evt) {
		console.log("write success");
	};
	
	//alert(JSON.stringify(datesJSON));
	writer.write(JSON.stringify(datesJSON));
	writer.abort();
}

function failN(error) {
	alert("error : "+error.code);
}
/* END SAVE FILE */

/* SAVE LANG */
function saveMyLang(mylang){
	langJSON.lang = mylang;
	getCatWithPos(0, 1);
	saveLang();
}
function saveLang(){
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSNLang, failN);
}

function gotFSNLang(fileSystem) {
	fileSystem.root.getFile(srcLang, {create: false}, gotFileEntryLang, failN);
}

function gotFileEntryLang(fileEntry) {
	fileEntry.createWriter(gotFileWriterLang, failN);
}

function gotFileWriterLang(writer) {
	writer.onwrite = function(evt) {
		console.log("write success");
	};
	writer.write(JSON.stringify(langJSON));
	writer.abort();
}
/* END SAVE FILE */

/* SAVE FILE2 */
function saveFile5(){
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSN5, failN);
}

function gotFSN5(fileSystem) {
	fileSystem.root.getFile(srcSave5, {create: false}, gotFileEntryN5, failN);
}

function gotFileEntryN5(fileEntry) {
	fileEntry.createWriter(gotFileWriterN5, failN);
}

function gotFileWriterN5(writer) {
	writer.onwrite = function(evt) {
		console.log("write success");
	};
	
	//alert(JSON.stringify(datesJSON5));
	writer.write(JSON.stringify(datesJSON5));
	writer.abort();
}

/* END SAVE FILE */

/*POTRZEBNE ZMIENNE*/
var wordsInOneCat = 10;
var minCat = 5;
var countOfCycle = 2;
var firstCycle = false;
var secondCycle = false;
var thirdCycle = false;
var srcSave = false;
var srcSave5 = false;
var srcLang = false;
var datesJSON = false;
var datesJSON5 = false;
var langJSON = JSON.parse('{"lang":-1}');//JSON.parse('{"lang":3}');//
var resLang = false;
var res = false;
var srcFile = false;
var res2 = false;
var srcFile2 = false;
var res3 = false;
var srcFile3 = false;
var dayJSON = false;//JSON.parse('{"day": 3, "words": 10, "km": 10, "skiped": ["1/1", "1/2", "1/3", "1/5", "1/8", "1/6"]}');//
var toLearnJSON = [];//JSON.parse('[{"subid":4,"catid":1,"start":"2"},{"subid":7,"catid":1,"start":"3"}]');//
var noticeJSON = [];
var isFirstCycle = true;
var startLearn = false;
var toLearn = [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 ];
var countWord = 0;
var countCatsToLearn = 0;
var countWordsToLearn = wordsInOneCat*2 + (wordsInOneCat*4-2)//wordsInOneCat*2; //2 cykle w nowej kategorii po 10 słów
var learnedWords = 0;
var learnedWordsInCat = 0;
var countWordsToLearnInThisCycle = 0;
var suggestedCatPath = "";
var suggestedCatName = "";
var learnedCat = [];
var inProgressCat = [];
var missingCat = [];
var gameIsBegin = false;
var allCats = [];
var allUsedCats = [];
var allEndedCats = [];
var todayEndedCat = "";
/* START APP*/
function startApp(){
	StatusBar.hide();
	//sprawdź czy to pierwsze uruchomienia
	$("#first-use-loading-page").show();
	getMyLang(); //sprawdzamy czy jest ustawiony mój język
	setTimeout(function(){	
		var lang = langJSON.lang;
		//TAK
		if(lang < 1){
			$("#first-use-loading-page").hide();
			startLearn = true; //po tutorialu zacznie naukę
			getLangList(); //wybierz swój język
			$("#choose-lang").show(); //zapisz język jest w funciton setLang w index.html
			copyFirstPath(); //utwórz potrzebne pliki
		}
		else{
		//NIE
			//getMyLang();
			$("#myLang").val(lang);
			$("body").addClass('lang'+lang);
			getDay(); //pobierz numer dnia
			getNotice(); //pobierz notice
			getToLearn(); //pobierz toLearn
			setTimeout(function(){
				getCatWithPos(0, 1);
			}, 500);
			setTimeout(function(){
				prepareAd();
				gameIsBegin = true;
				$("#first-use-loading-page").hide();				
				showStartLessonPage(); //uruchom ekran informacyjny do rozpoczęcia nauki	
			}, 1000);
		}
	}, 1500);
}
/*END START APP*/
function getMyLang(){
	srcLang = path() + "lang.json";
	readLang();
	setTimeout(function() {getMyLangHelper();}, 100);
}
function getMyLangHelper(){
	if(resLang == false){
        setTimeout(function() {getMyLangHelper();}, 100);
	    return;
	}else{
		langJSON = JSON.parse(resLang);
		resLang = false;
		return;
	}
}
function getDay(){
	srcFile3 = path() + "day.json";
	readDayF();
	getDayHelper();
	
	/*getAllCatsInArray();
	$("#nrDayFiled").text(dayJSON.day); //usunąć
	$(".allWords").text(dayJSON.words); //usunąć
	$("#countWordsToLearn").text(countWordsToLearn); //usunąć
	$(".countKMLearned").text( Math.floor( dayJSON.km*minCat / 60)); //usunąć
	$(".countMinLearned").text( dayJSON.km*minCat % 60); //usunąć
	for(var x in dayJSON.skiped){
		var skip = dayJSON.skiped[x];
		allUsedCats.push(skip);
		allEndedCats.push(skip);
	}
	$("#end-nr-lesson").text(dayJSON.day);
		for(var x in toLearnJSON){ //usunąc
			var pack = toLearnJSON[x];
			var day = dayJSON.day;
			var dayNr = day - pack.start;
			allUsedCats.push(pack.catid + "/" + pack.subid);
			if(dayNr > 60){
				learnedCat.push(pack.catid + "/" + pack.subid);
				allEndedCats.push(pack.catid + "/" + pack.subid);
			}
			if(dayNr < 60) inProgressCat.push(pack.catid + "/" + pack.subid);
			switch(dayNr) {
			case 1:
				toLearn[0] = pack.catid + "/" + pack.subid;
				toLearn[1] = pack.catid + "/" + pack.subid;
				countCatsToLearn++;
				countOfCycle++;
				countOfCycle++;
				countWordsToLearn += wordsInOneCat*2;
				countWordsToLearn += wordsInOneCat*4-2;
				setSuggestedCat(pack.catid, pack.subid);
				inProgressCat.push(pack.catid + "/" + pack.subid);
				break;
			case 4:
				toLearn[2] = pack.catid + "/" + pack.subid;
				toLearn[3] = pack.catid + "/" + pack.subid;
				countCatsToLearn++;
				countOfCycle++;
				countOfCycle++;
				countWordsToLearn += wordsInOneCat*4-2;
				countWordsToLearn += wordsInOneCat*2;
				inProgressCat.push(pack.catid + "/" + pack.subid);
				break;
			case 10:
				toLearn[4] = pack.catid + "/" + pack.subid;
				toLearn[5] = pack.catid + "/" + pack.subid;
				countCatsToLearn++;
				countOfCycle++;
				countOfCycle++;
				countWordsToLearn += wordsInOneCat*4-2;
				countWordsToLearn += wordsInOneCat*2;
				inProgressCat.push(pack.catid + "/" + pack.subid);
				break;
			case 27:
				toLearn[6] = pack.catid + "/" + pack.subid;
				countCatsToLearn++;
				countOfCycle++;
				countWordsToLearn += wordsInOneCat*2;
				inProgressCat.push(pack.catid + "/" + pack.subid);
				break;
			case 60:
				toLearn[7] = pack.catid + "/" + pack.subid;
				todayEndedCat = pack.catid + "/" + pack.subid;
				countCatsToLearn++;
				countOfCycle++;
				countWordsToLearn += wordsInOneCat*2;
				inProgressCat.push(pack.catid + "/" + pack.subid);
				break;
			default:
				break;
			} 
		}
		setTimeout(showInProgressCat, 100);
		setTimeout(function(){
			uniqueallUsedCats = allUsedCats.filter(function(item, pos) {
				return allUsedCats.indexOf(item) == pos;
			})
			if(allCats.sort().toString() == uniqueallUsedCats.sort().toString()){
				countWordsToLearn -= wordsInOneCat*2 + (wordsInOneCat*4-2);
				countOfCycle -= 2;
				$("#countWordsToLearn").text(countWordsToLearn);
			}else{
				$("#countWordsToLearn").text(countWordsToLearn);	
			}
		}, 150);*/
}
function getDayHelper(){
	if(res3 == false){
        setTimeout(getDayHelper, 100);
		return;
	}else{
		dayJSON = JSON.parse(res3);
		res3 = false;
		$("#nrDayFiled").text(dayJSON.day);
		$(".allWords").text(dayJSON.words);
		$("#end-nr-lesson").text(dayJSON.day);
		$("#countWordsToLearn").text(countWordsToLearn); 
		$(".countKMLearned").text( Math.floor( dayJSON.km*minCat / 60)); //usunąć
		$(".countMinLearned").text( dayJSON.km*minCat % 60); //usunąć
		for(var x in dayJSON.skiped){
			var skip = dayJSON.skiped[x];
			allUsedCats.push(skip);
			allEndedCats.push(skip);
		}
	}
}
function getNotice(){
	srcFile2 = path() + "notice.json";
	readWriteFile2();
	getNoticeHelper();
}
function getNoticeHelper(){
	if(res2 == false){
        setTimeout(getNoticeHelper, 100);
		return;
	}else{
		noticeJSON = JSON.parse(res2);
		res2 = false;
	}
}
function getToLearn(){
	srcFile = path() + "save.json";
	readWriteFile();
	getToLearnHelper();
}
function getToLearnHelper(){
	if(!res){
        setTimeout(getToLearnHelper, 100);
	}else{
		getAllCatsInArray();
		toLearnJSON = JSON.parse(res);
		for(var x in toLearnJSON){
			var pack = toLearnJSON[x];
			var day = $("#nrDayFiled").text();
			var dayNr = day - pack.start;
			allUsedCats.push(pack.catid + "/" + pack.subid);
			if(dayNr > 60){
				learnedCat.push(pack.catid + "/" + pack.subid);
				allEndedCats.push(pack.catid + "/" + pack.subid);
			}
			if(dayNr < 60) inProgressCat.push(pack.catid + "/" + pack.subid);
			switch(dayNr) {
			case 1:
				toLearn[0] = pack.catid + "/" + pack.subid;
				toLearn[1] = pack.catid + "/" + pack.subid;
				countCatsToLearn++;
				countOfCycle++;
				countOfCycle++;
				countWordsToLearn += wordsInOneCat*2;
				countWordsToLearn += wordsInOneCat*4-2;
				setSuggestedCat(pack.catid, pack.subid);
				inProgressCat.push(pack.catid + "/" + pack.subid);
				break;
			case 4:
				toLearn[2] = pack.catid + "/" + pack.subid;
				toLearn[3] = pack.catid + "/" + pack.subid;
				countCatsToLearn++;
				countOfCycle++;
				countOfCycle++;
				countWordsToLearn += wordsInOneCat*4-2;
				countWordsToLearn += wordsInOneCat*2;
				inProgressCat.push(pack.catid + "/" + pack.subid);
				break;
			case 10:
				toLearn[4] = pack.catid + "/" + pack.subid;
				toLearn[5] = pack.catid + "/" + pack.subid;
				countCatsToLearn++;
				countOfCycle++;
				countOfCycle++;
				countWordsToLearn += wordsInOneCat*4-2;
				countWordsToLearn += wordsInOneCat*2;
				inProgressCat.push(pack.catid + "/" + pack.subid);
				break;
			case 27:
				toLearn[6] = pack.catid + "/" + pack.subid;
				countCatsToLearn++;
				countOfCycle++;
				countWordsToLearn += wordsInOneCat*2;
				inProgressCat.push(pack.catid + "/" + pack.subid);
				break;
			case 60:
				toLearn[7] = pack.catid + "/" + pack.subid;
				todayEndedCat = pack.catid + "/" + pack.subid;
				countCatsToLearn++;
				countOfCycle++;
				countWordsToLearn += wordsInOneCat*2;
				inProgressCat.push(pack.catid + "/" + pack.subid);
				break;
			default:
				break;
			} 
		}
		setTimeout(showInProgressCat, 100);
		setTimeout(function(){
			uniqueallUsedCats = allUsedCats.filter(function(item, pos) {
				return allUsedCats.indexOf(item) == pos;
			})
			if(allCats.sort().toString() == uniqueallUsedCats.sort().toString()){
				countWordsToLearn -= wordsInOneCat*2 + (wordsInOneCat*4-2);
				countOfCycle -= 2;
				$("#countWordsToLearn").text(countWordsToLearn);
			}else{
				$("#countWordsToLearn").text(countWordsToLearn);	
			}
		}, 150);
	}
}
function setCountWord(){
	for(var i = 0; i < 8; i++){
		if(toLearn[i] > 0){
			countWord += wordsInOneCat;
		}		
	}
}
function saveDay(){
	dayJSON.day = dayJSON.day + 1;  //zmienić na 1
	dayJSON.km = dayJSON.km + countOfCycle;  
	datesJSON5 = dayJSON;
	srcSave5 = path() + "day.json";
	saveFile5();
}
function getLangList(){
	getDay();
	$.get("date/lang.json", function(result) {
		showLangList(result);
		//startTmp();
	});
}
function showLangList(l){
	var langs = JSON.parse(l);
	for(var x in langs){
		var lang = langs[x];
		var tmp = '<h1 class="text" ontouchstart="setLang(this);" data-mylang="' + lang.id + '" >'+ lang.label + '</h1>';
		if(x > 0) $("#langs").append(tmp);
	}
}
/* END GET LAND LIST */

/* GET CAT LIST */
var subcats = false;
function getCatList(){
	var idCat = $("#myLang").val();
	$.get("date/"+ idCat + "/cat.json", function(result) {
		setTimeout(
			function(){
				setTimeout(
					function(){
						showCatList(result);
					}, 200);
				//getToLearn();
			}, 200);
    });
}
function showCatList(c){
	var cats = JSON.parse(c);
	$("#cats").html("");
	for(var x in cats){
		subcats = false;
		var cat = cats[x];
		var tmp = '<div><h1 class="text supercat expand" ontouchstart="expand(this);">'+ cat.name + '</h1>';
		getSubCatList(cat.id);
		setTimeout(
			function(){
				tmp += subcats + '</div>';
				$("#cats").append(tmp);
			}, 50);
	}
}
function getSubCatName(cs){
	var res = cs.split("/");
	var idp = res[0];
	var idc = res[1];
	var idLang = $("#myLang").val();
	$.get("date/"+ idLang + "/" + idp + "/subcat.json", function(result) {
		var scat = JSON.parse(result);
		for(var x in scat){
			var cat = scat[x];
			if(cat.id == idc) {	
				nameCat = cat.name;
			}
		}
    });
}
function getWordToSuggestCat(cs){
	var res = cs.split("/");
	var idp = res[0];
	var idc = res[1];
	var idLang = $("#myLang").val();
	$("#list-word-in-sug-cat").text("");
	$.get("date/"+ idLang + "/" + idp + "/" + idc + "/words.json", function(result) {
		var words = JSON.parse(result);
		for(var x in words){
			var w = words[x];
			$("#list-word-in-sug-cat").append(w.name + "<br>");
		}
    });
}
/* END GET CAT LIST */

/* GET SUBCAT LIST */
var parent = false;
var firstGenerationCat = true;
function getSubCatList(idCat){
	getNotice();
	var idLang = $("#myLang").val();
	parent = idCat;
	$.get("date/"+ idLang + "/" + idCat + "/subcat.json", function(result) {
		showSubCatList(result);
    });
}
function showSubCatList(s){
	var cats = JSON.parse(s);
	var tmp = '<div class="list-of-subcat">';
	for(var x in cats){
		var cat = cats[x];
		var cl = "";
		var catSgn = parent + "/" + cat.id;
		if(dayJSON.skiped.indexOf(catSgn) >= 0){
			cl = "missingCat";
		}
		if(learnedCat.indexOf(catSgn) >= 0){
			cl = "learnedCat";
		}
		if(inProgressCat.indexOf(catSgn) >= 0){
			cl = "inProgressCat";
		}
		tmp += '<p class="text setCat '+ cl +'" onclick="getThisCatAsSug(this);" data-name="' + cat.name + '" data-parent="' + parent + '" data-subcat="' + cat.id + '" data-pos="' + cat.id + '">' + cat.name + '<span class="inProgressCatInfo">w trakcie nauki</span> <span class="missingCatInfo">kategoria pominięta</span> <span class="learnedCatInfo">nauka zakończona</span></p>';
		if(firstGenerationCat) $(".list").append('<li><p class="cat-name" data-id="' + cat.id + '" data-par="' + parent + '">' + cat.name + '</p></li>');
	}
	tmp += '</div>';
	subcats = tmp;
}
/* END GET SUBCAT LIST */
function setNewCat(c, s){
	toLearn[8] = c + "/" + s;
	toLearn[9] = c + "/" + s;
	setTimeout(	function(){
		srt = $("#nrDayFiled").text();
		toLearnJSON.push({"subid": s,"catid": c,"start": srt});
	}, 150);
	
	/*datesJSON = toLearnJSON;
	srcSave = path() + "save.json";
	saveFile(); */  //ODKOMENTOWAĆ POTEM
}
function showtoLearn(){
	for(var i = 0; i < 10; i++) ;
		//(i + ")" + toLearn[i]);
}
/* GET WORD LIST */
var idWord = false;
var nameWord = false;
function getWordList(){
	var idLang = $("#myLang").val();
	var idParentCat = $("#myParentCat").val();
	var idSubCat = $("#myCat").val();
	var idLernLang = $("#learnLang").val();
	var words = false;
	var trans = false;
	$.get("date/"+ idLang + "/" + idParentCat + "/" + idSubCat + "/words.json", function(result) {
		words = result;
		$.get("date/"+ idLernLang + "/" + idParentCat + "/" + idSubCat + "/words.json", function(trans) {
			showWordList(words, trans);
		});
    });
}
var words, trans;
function showWordList(w, t){
	words = JSON.parse(w);
	trans = JSON.parse(t);
    isFirstCycle = false;
	if(isFirstCycle){
		$("#words").html("");
		var tmp = "";
		for(var x in words){
			nameWord = false;
			var word = words[x];
			var tran = trans[x];
			tmp += '<div class="word" data-id="' + word.id + '" data-check="1" onclick="checkWord(this);"><table><tr><td><p class="text">' + word.name + '</p></td><td rowspan="2"><img src="img/check.png"></td></tr><tr><td><p class="text">' + tran.name + '</p></td></tr></table></div>';
		}
		//alert("jesten");
		$("#words").html(tmp);
		isFirstCycle = false;
	}else{
		getNavWordList();
	}	
}
/* END GET WORD LIST */

/* GET NAV WORD LIST */
function getNavWordList(){
	$("#nav-words-container").text("");
	var i = 0;
	var firstId = -1;
	if(isFirstCycle){
		$(".word").each(function(index){
			if($(this).attr('data-check') != 0){
				i++;
				var id = $(this).data('id');
				if(i == 1){
					firstId = id;
					setActWord(id);
				}
				//$("#nav-words-container").append('<p ontouchstart="setWordToLearn(' + id + ', this)" data-word-id="' + id + '"><img src="img/nav-bg.png" class="no-activ-img"><img src="img/nav-bg-activ.png" class="activ-img"><span>' + i + '</span></p>');
				//$("#nav-words-container").append('<p data-word-id="' + id + '"><img src="img/nav-bg.png" class="no-activ-img"><img src="img/nav-bg-activ.png" class="activ-img"><span>' + i + '</span></p>');
				$("#nav-words-container").append('<p data-word-id="' + id + '"><img src="img/' + i + '.png" class="no-activ-img"><img src="img/' + i + '.png" class="activ-img"></p>');
			}
		});
		isFirstCycle = false;
		setTimeout(function(){
			setNavWordPosition(0);
			$("#nav-words-container p").removeClass("activ");
			$("#nav-words-container p").removeClass("pulse");
			$("#nav-words-container p").eq(0).addClass("activ");
			$("#nav-words-container p").eq(0).addClass("pulse");
		}, 50);
	}else{
		for(var x in words){
			var word = words[x];
			var id = word.id;
			i++;
			if(i == 1){
				firstId = id;
				setActWord(id);
			}
			//$("#nav-words-container").append('<p ontouchstart="setWordToLearn(' + id + ', this)" data-word-id="' + id + '"><img src="img/nav-bg.png" class="no-activ-img"><img src="img/nav-bg-activ.png" class="activ-img"><span>' + i + '</span></p>');
			//$("#nav-words-container").append('<p data-word-id="' + id + '"><img src="img/nav-bg.png" class="no-activ-img"><img src="img/nav-bg-activ.png" class="activ-img"><span>' + i + '</span></p>');
			$("#nav-words-container").append('<p data-word-id="' + id + '"><img src="img/' + i + '.png" class="no-activ-img"><img src="img/' + i + '.png" class="activ-img"></p>');
		}
		setTimeout(function(){
		//	alert($("#nav-words-container").text(""));
			setNavWordPosition(0);
			$("#nav-words-container p").removeClass("activ");
			$("#nav-words-container p").removeClass("pulse");
			$("#nav-words-container p").eq(0).addClass("activ");
			$("#nav-words-container p").eq(0).addClass("pulse");
		}, 50);
	}	
}

function setNavWordPosition(i, k){
	var k = k || 3;
	var j;
	if(k == 3){
		if(i==0) j=3;
		else{ 
			j=i+2; 
			i--;
		}
	}else if(k == 1){
		j=i+1;
	}else if(k == 2){
		j=i+1;
		i--;
	}
	
	$('#nav-words-container p').hide().slice(i, j).show();
}

/*SET WORD TO LEARN*/
function setWordToLearn(id, obj){
	$("#nav-words-container p").removeClass("activ");
	$(obj).addClass("activ");
	$("#word-lern-1").fadeOut().fadeIn();
	var curWord = setWordById(id); 
	var curTrans = setTransById(id);
	var curMyNote = "moja notatka";
	setNoteById(id);
	$("#my-text").attr("data-id", id);
	$("#idWord").val(id);
	$("#word-lern-1").attr("data-id", id);
	$("#word-lern-1").attr("data-word", curWord);
	$("#word-lern-1").attr("data-trans", curTrans);
	$("#my-trans").val("");
	$("#my-trans").focus();

	var index = $("#nav-words-container p.activ").index();
	setNavWordPosition(index);
	setTimeout(tellMe, 100);
}

function nextWord(){
	$('.confirm-swipe').hide();	  
	$("#my-trans").focus();
	//saveNotice();
	var length = $("#nav-words-container p").length;
	var index = $("#nav-words-container p.activ").index() + 1;
	if(length <= index) alert("Wszystkiego już się nauczyłeś:)");
	else{
		var id = ($("#nav-words-container p").eq(index)).data('word-id');
		setWordToLearn(id, $("#nav-words-container p").eq(index));	
		setNavWordPosition(index);
	}
}

function setWordById(id){
	$("#idWord").val(id);
	for(var x in trans){
		var word = trans[x];
		if(word.id == id) {
			act_word = word.name;		
		}
	}
}

function setNoteById(id){
	act_text = "";
	var idLang = $("#myLang").val();
	var idParentCat = $("#myParentCat").val();
	var idSubCat = $("#myCat").val();
	var idLernLang = $("#learnLang").val();
	var tmp = idLang+"\\"+idParentCat+"\\"+idSubCat+"\\"+idLernLang+"\\"+id;
	
	for(var x in noticeJSON){
		var notice = noticeJSON[x];
		if(notice.word == tmp){
			act_text = notice.notice;
			return;
		}			
	}
}

function setTransById(id){
	for(var x in words){
		var word = words[x];
		if(word.id == id) {
			act_trans = word.name;				
		}
	}
}

function checkMySelf(){
	$("#word-lern-1").hide();
	$("#confirm-my").text($("#my-trans").val());
	$(".confirm-swipe").show();
	$(".confirm-swipe table").show();
	$(".confirm-swipe table").css({	top: "0px"});
	$('.confirm-swipe table').removeClass('good');
	$('.confirm-swipe table').removeClass('bad');
}

var blockClear = false;
function clearDraggableField(){
	if(!blockClear){
		$(".confirm-swipe table").show();
		setTimeout(function(){
			$(".confirm-swipe").removeClass('flipper-hide');
			$('.confirm-swipe table').removeClass('good');
			$('.confirm-swipe table').removeClass('bad');
			$('.confirm-swipe table').removeClass('good-right');
			$('.confirm-swipe table').removeClass('bad-right');
			$('.confirm-swipe table').removeClass('goLeft');
			$('.confirm-swipe table').removeClass('goRight');
			setTimeout(function(){antyNaparzanka = false;}, 500);
		}, 50);
	}
}
/*END SET WORD TO LEARN*/
/*PLAY SOUND*/
var my_media;
function tellMe(){
	if(my_media!=null){
            my_media.stop();
            my_media.stopRecord();
			my_media.release();
            my_media=null;
	}
	var id = $("#idWord").val();
	var idLang = $("#learnLang").val();
	var idParentCat = $("#myParentCat").val();
	var idSubCat = $("#myCat").val();
	var src = '/android_asset/www/date/' + idLang + "/" + idParentCat + "/" + idSubCat + "/sound/" + id + ".m4a";
	//alert(src);
	setTimeout(function(){
		if(my_media!=null){/*jak coś to do usunięcia*/
				my_media.stop();
				my_media.stopRecord();
				my_media.release();
				my_media=null;
		}
		
		my_media = new Media(src,
            // success callback
             function () { this.release(); },
            // error callback
             function (err) { console.log("M: " + err.message + " - " + err.code); }
		);
			   // Play audio
		my_media.play();
	}, 100);
	
	//var audio = new Audio(src);
	//audio.play();
}
/*END PLAY SOUND*/

/*COPY FIRST PATCH*/
function copyFirstPath(){
	asset2sd.copyDir({
			asset_directory: "www/firstPatch",
			destination_directory: mainPath
		},
		function() { }, 
		function() { alert('fail'); }
	);
} 
/*END TELL ME*/

/*START SAVE NOTATION*/
function saveNotice(text){
	if(text == "") return;
	act_text = text;
	var idLang = $("#myLang").val();
	var idParentCat = $("#myParentCat").val();
	var idSubCat = $("#myCat").val();
	var idLernLang = $("#learnLang").val();
	var id = $('#idWord').val();
	
	var tmp = idLang+"\\"+idParentCat+"\\"+idSubCat+"\\"+idLernLang+"\\"+id;
	var add = false;
	for(var x in noticeJSON){
		var notice = noticeJSON[x];
		if(notice.word == tmp){
			notice.notice = text;
			add = true;
		}
	}
	if(!add) noticeJSON.push({"word": tmp, "notice": text});
	
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSN, failN);
}

function gotFSN(fileSystem) {
	var srcFileNotice = path() + "notice.json";
	fileSystem.root.getFile(srcFileNotice, {create: false}, gotFileEntryN, failN);
}

function gotFileEntryN(fileEntry) {
	fileEntry.createWriter(gotFileWriterN, failN);
}

function gotFileWriterN(writer) {
	writer.onwrite = function(evt) {
		console.log("write success");
	};
	
	//alert(JSON.stringify(noticeJSON));
	writer.write(JSON.stringify(noticeJSON));
	writer.abort();
	// contents of file now 'some different text'
}

function failN(error) {
	console.log("error : "+error.code);
}
/*END SAVE NATATION*/
/*START ALGORYTHM MANAGAMENT*/
var act_word = "";
var act_trans = "";
var act_text = "";

function setWordToMethod(idM){
	$(".learnMethod").hide();
	if(idM == 6 || (idM == 1 && !thirdCycle)) $("#badBTN").show();
	else $("#badBTN").hide();
	if(act_text != "") $("#notebtn").addClass('pulse-btn');
	else $("#notebtn").removeClass('pulse-btn');
	switch(idM) {
		case 1:
			$("#confirm-correct-1").html("");
			$("#confirm-trans-1").html(act_trans);
			$("#confirm-text-1").val(act_text);	
			break;
		case 2:
			$("#confirm-correct-2").html(act_word);
			$("#confirm-trans-2").html(act_trans);
			$("#confirm-text-2").val(act_text);			
			break;
		case 3:
			$("#confirm-text-3").val(act_text);		
			$("#question-3").val("");
			break;
		case 4:
			tellMe();
			$("#confirm-correct-4").html(act_word);
			$("#confirm-trans-4").html("");
			$("#confirm-text-4").val(act_text);			
			break;
		case 5:
			$("#confirm-text-5").val(act_text);	
			$("#question-5").val("");
			break;
		case 6:
			$("#confirm-correct-6").html(act_word);
			$("#confirm-trans-6").html("");
			$("#confirm-text-6").val(act_text);			
			break;
		default:
			console.log("error");
	}
	$("#word-lern-" + idM).show();
	
	$(".nbWordInCycle").text(($("#nav-words-container p.pulse").index() + 1) + "/10");
	if($("#nav-words-container p.pulse").index() < 0){
		$(".nbWordInCycle").text("");
		$("#nav-words-container-thd p").each(function(){
			if($(this).hasClass('activ')){
				var id = $(this).attr('data-word-id');
				$(".nbWordInCycle").text(id + "/10");
			}
		});
		setTimeout(function(){
			$("#nav-words-container-thd p").each(function(){
				if($(this).hasClass('activ')){
					var id = $(this).attr('data-word-id');
					$(".nbWordInCycle").text(id + "/10");
				}
			});
		}, 300);
	}
}

function setActWord(id){
	$('#idWord').val(id);
	setWordById(id);
	setNoteById(id);
	setTransById(id);
}

var round = 1;
var nbMethod = 2;
var nbStep = 0;
var canNextStep = 1;
var noLerntStep = 0;
var ileSnd = 0;
var ileThd = 0;

function nextStepBlock(){
	canNextStep = 0;
}

function noLearnt(){
	canNextStep = 0;
	setTimeout(function(){
		clearDraggableField();
	}, 100);
	noLerntStep = 1;
	if(noLerntStep == 0){
		whereGo = 0;
		setWordToMethod(3);
		noLerntStep = 1;
	}else{
		theSameMethod = true;
		whereGo = -1;
		setWordToMethod(4);
		noLerntStep = 0;
		canNextStep = 2;
	}
}
var noPlus = 0;
var prepareToThird = 1;
var isPreparetoFirst = false;
var readyToSaveNotice = false;
var whereGo = 0;
var noFlipIfWrong = false;
var lastWordSecondRound = true;
var repeatSec = 1;
var repeatThd = 1;
var s_nowe = 0;
var t_nowe = 0;
var id_powt = -1;
var s_bylo = 0;
var t_bylo = 0;
var step_pow = 0;
var ile_s = 0;
var ile_t = 0;
var last_r_s = -1;
var theSameMethod = false;
var antyNaparzanka = false;

function getAntyNaparzanka(){
	return antyNaparzanka;
}

function setAntyNaparzankaToTrue(){
	antyNaparzanka = true;
}

function nextStep(){
	antyNaparzanka = true;
	StatusBar.hide();
	backToNormalStateNote();
	updateProgressBar();
	if(readyToSaveNotice){
		saveNotice($("#confirm-text-"+nbMethod).val());
	}else{
		readyToSaveNotice = true;
	}
	if(round == 3){
		if(canNextStep == 2){
		noPlus = 1;
		canNextStep = 1;
		nbMethod = 4;
		nbStep = 0;
		}
		if(canNextStep == 0){
			noLearnt();
			return;
		}
	}	
	setTimeout(function(){
		clearDraggableField();
	}, 300);
	if(firstCycle){
		if(!isPreparetoFirst){
			whereGo = 0;
			setActWord(($("#nav-words-container p").eq(0)).data('word-id'));
			$("#nav-words-container p").eq(0).addClass("activ");
			$("#nav-words-container p").eq(0).addClass("pulse");
			setWordToMethod(2)
			setNavWordPosition(0);
			isPreparetoFirst = true;
			tellMe();
		}else{
			if(!canNextStep){
				whereGo = 0;
				nbMethod = 2;
				setWordToMethod(2);
				canNextStep = true;
				tellMe();
				return;
			}
			if(nbMethod == 2){
				whereGo = -1;
				nbMethod = 1;
				setWordToMethod(1);
			}else if(nbMethod == 1){
				whereGo = 0;
				nbMethod = 2;
				var length = $("#nav-words-container p").length;
				var index = $("#nav-words-container p.activ").index() + 1;
				//learnedWords++;
				//alert(learnedWords);
				if(length <= index){
					round = 2;
					firstCycle = false;
					nextStep();
					return;
				}else{
					var id = ($("#nav-words-container p").eq(index)).data('word-id');
					setActWord(id);
					setNavWordPosition(index);
					$("#nav-words-container p").removeClass("activ");
					$("#nav-words-container p").removeClass("pulse");	
					$("#nav-words-container p").eq(index).addClass("pulse");
					$("#nav-words-container p").eq(index).addClass("activ");
					setTimeout(function(){
						setWordToMethod(2);
						tellMe();
					}, 50);
				}
			}
		}		
	}else if(secondCycle){
		if(round == 2){
			lastWordSecondRound = true;
			whereGo = -1;
			var id = ($("#nav-words-container p").eq(0)).data('word-id');
			setActWord(id);
			setNavWordPosition(1);
			$("#nav-words-container p").removeClass("activ");
			$("#nav-words-container p").removeClass("pulse");
			$("#nav-words-container p").eq(0).addClass("activ");
			$("#nav-words-container p").eq(0).addClass("pulse");
			setTimeout(function(){
				setWordToMethod(4);
				tellMe();
			}, 100);
			theSameMethod = true;
			round = 3;
			nbMethod = 4;
		}else if(round == 3){
			theSameMethod = false;
			noFlipIfWrong = false;
			if(nbMethod == 4 && nbStep == 0){
				//saveNotice($("#confirm-text-4").val());
				whereGo = 1;
				var length = $("#nav-words-container p").length;
				if(true) var index = $("#nav-words-container p.activ").index() + 1;
				else{
					var index = $("#nav-words-container p.activ").index();
					noPlus = 0;
				}
				if(length <= index){
					if(lastWordSecondRound){
						index--;
						setWordToMethod(6);
						whereGo = -1;
						var id = ($("#nav-words-container p").eq(index)).data('word-id');
						setActWord(id);
						lastWordSecondRound = false;
					}else{
						$("#nav-words-container p").removeClass("activ");
						$("#nav-words-container p").removeClass("pulse");
						$("#nav-words-container p").eq(0).addClass("activ");
						$("#nav-words-container p").eq(0).addClass("pulse");
						round = 4;
						//nextStep();
						secondCycle = false;
						nextStep();
						return;
					}
				}else{
					var id = ($("#nav-words-container p").eq(index)).data('word-id');
					setActWord(id);
					setNavWordPosition(index);
					$("#nav-words-container p").removeClass("activ");
					$("#nav-words-container p").removeClass("pulse");
					$("#nav-words-container p").eq(index).addClass("activ");
					$("#nav-words-container p").eq(index).addClass("pulse");
					setTimeout(function(){
						setWordToMethod(4);
						tellMe();
					}, 100);
					nbMethod = 4;
					nbStep = 1;
				}
			}else if(nbMethod == 4 && nbStep != 0){
				whereGo = 0;
				//saveNotice($("#confirm-text-4").val());
				var index = $("#nav-words-container p.activ").index() - 1;
				var id = ($("#nav-words-container p").eq(index)).data('word-id');
				setActWord(id);
				//setNavWordPosition(index);
				$("#nav-words-container p").removeClass("activ");
				$("#nav-words-container p").removeClass("pulse");
				$("#nav-words-container p").eq(index).addClass("activ");
				$("#nav-words-container p").eq(index).addClass("pulse");
				setTimeout(function(){
					setWordToMethod(1);
				}, 100);
				nbMethod = 1;
				nbStep = 1;
			}else if(nbMethod == 1 && nbStep == 1){
				whereGo = -1;
				nbMethod = 6;
				setWordToMethod(6);
				nbStep = 2;
				noFlipIfWrong = true;
			}else if(nbMethod == 6){
				whereGo = -1;
			//	learnedWords++;
			//	alert(learnedWords);
				var index = $("#nav-words-container p.activ").index() + 1;
				var id = ($("#nav-words-container p").eq(index)).data('word-id');
				setActWord(id);
				setNavWordPosition(index);
				$("#nav-words-container p").removeClass("activ");
				$("#nav-words-container p").removeClass("pulse");
				$("#nav-words-container p").eq(index).addClass("activ");
				$("#nav-words-container p").eq(index).addClass("pulse");
				setTimeout(function(){
					if(index == 9) whereGo = 0;
					setWordToMethod(1);
				}, 100);
				nbMethod = 1;
			}else if(nbMethod == 1 && nbStep == 2){
				whereGo = -1;
				nbMethod = 4;
				nbStep = 0;
				nextStep();
				return;
			}		
		}
	}else if(thirdCycle){
		if(round == 4){
			if(canNextStep == 0){
				canNextStep = 1; 
				if(id_powt > 0){
					if(id_powt == snd_id){
						ile_s = 2;
					}else if(id_powt == thd_id){
						ile_t = 2;
					}
				}else{					
					var index = $("#nav-words-container p.activ").index();
					var id = ($("#nav-words-container p").eq(index)).data('word-id');
					if(snd_id > 0){
						thd_id = id;
						t_nowe = 1;
						ile_t = 2;
					}else{
						snd_id = id;
						s_nowe = 1;
						ile_s = 2;					
					}
				}
			}
			updateThirdNav();
			if(nbStep == 0){
				if(prepareToThird != 1){
					var length = $("#nav-words-container p").length;
					var index = $("#nav-words-container p.activ").index() + 1;
					if(length <= index){
					//	learnedWords++;
					//	alert(learnedWords);
						round = 5;
						nextStep();	
						return;
					}else{
						//powtórka
						$("#nav-words-container p").removeClass("pulse");
						//alert(snd_id + " " + s_nowe + " " + s_bylo + " " + ile_s + " " + thd_id + " " + t_nowe + " " + t_bylo + " " + ile_t);
						if(step_pow == 0){
							if(ile_s == 0) snd_id = -1;
							if(ile_t == 0) thd_id = -1;
							updateThirdNav();
							if(s_nowe == 0 && s_bylo == 0 && snd_id > 0){
								id_powt = snd_id;
							}else if(t_nowe == 0 && t_bylo == 0 && thd_id > 0){
								id_powt = thd_id;
							}else{
								id_powt = -1;
							}
						}
						//alert(id_powt + " " + step_pow);
						if(id_powt > 0){
							if(step_pow == 0){
								repeatThrid(id_powt, 1);
								step_pow = 1;
								return;
							}else{
								repeatThrid(id_powt, 6);
								step_pow = 0;
								if(id_powt == snd_id){
									ile_s--;
									s_bylo = 1;
								}
								if(id_powt == thd_id){
									ile_t--;
									t_bylo = 1;
								}
								last_r_s = id_powt;
								return;
							}
						}
						//end-powtórka
						//warunke przejścia dalej
							if(snd_id > 0 && thd_id > 0){
								s_bylo = 0;
								t_bylo = 0;
								s_nowe = 0;
								t_nowe = 0;
								nextStep();
								return;
							}
						//
						id_powt = -1;
						t_nowe = 0;
						s_nowe = 0;
						repeatSec = 1;
						repeatThd = 1;
						wasSndTime = 0;
						wasThdTime = 0;
						s_bylo = 0;
						t_bylo = 0;
						$("#nav-words-container-thd p").removeClass('pulse');
						$("#nav-words-container-thd p").removeClass("activ");
						var id = ($("#nav-words-container p").eq(index)).data('word-id');
						setActWord(id);
						setNavWordPosition(index);
						$("#nav-words-container p").removeClass("activ");
						$("#nav-words-container p").removeClass("pulse");
						$("#nav-words-container p").eq(index).addClass("activ");
						$("#nav-words-container p").eq(index).addClass("pulse");
					}
				}else{
					prepareToThird = 0;
				}
				whereGo = 0;
				var index = $("#nav-words-container p.activ").index();
				var id = ($("#nav-words-container p").eq(index)).data('word-id');
				setActWord(id);
				setNavWordPosition(index);
				//learnedWords++;
				//alert(learnedWords);
				setTimeout(function(){
					setWordToMethod(1);
				}, 100);
				nbMethod = 5;
				nbStep = 1;
			}else if(nbStep == 1){
				whereGo = -1;
				$("#nav-words-container p.activ").eq(index).addClass("pulse");
				//saveNotice($("#confirm-text-1").val());
				var id = ($("#nav-words-container p").eq(index)).data('word-id');
				setTimeout(function(){
					setWordToMethod(6);
				}, 100);
				nbStep = 0;
			}else{
				round = 5;
				thirdCycle = false;
				nextStep();
				return;
			}		
		}else if(round == 5){
			if(canNextStep == 0){
				canNextStep = 1; 
				if(id_powt > 0){
					if(id_powt == snd_id){
						ile_s = 2;
					}else if(id_powt == thd_id){
						ile_t = 2;
					}
				}
			}
			$("#nav-words-container p").removeClass("pulse");
			if(step_pow == 0){
				//alert("t1");
				if(ile_s == 0) snd_id = -1;
				if(ile_t == 0) thd_id = -1;
				updateThirdNav();
				if(s_nowe == 0 && s_bylo == 0 && snd_id > 0){
					id_powt = snd_id;
				}else if(t_nowe == 0 && t_bylo == 0 && thd_id > 0){
					id_powt = thd_id;
				}else{
					id_powt = -1;
				}
			}
			if(id_powt > 0){
				if(step_pow == 0){
					repeatThrid(id_powt, 1);
					step_pow = 1;
					return;
				}else{
					repeatThrid(id_powt, 6);
					step_pow = 0;
					if(id_powt == snd_id){
						ile_s--;
						s_bylo = 1;
					}
					if(id_powt == thd_id){
						ile_t--;
						t_bylo = 1;
					}
					last_r_s = id_powt;
					return;
				}
			}
			//end-powtórka
			//warunke przejścia dalej
				if(snd_id > 0 || thd_id > 0){
					s_bylo = 0;
					t_bylo = 0;
					s_nowe = 0;
					t_nowe = 0;
					nextStep();
					return;
				}else{
					thirdCycle = false;
					nextStep();
					return;
				}
			//
		}
	}else{
		nextPack();
	}
}

function nextPack(){
	blockClear = true;
	$('.confirm-swipe table').hide();
	setTimeout(function(){		
		blockClear = false;
		$('.confirm-swipe table').addClass('goRight');
		if(isRepeatCycle){
			$('section').hide();
			$("#end-cat").show();	
			setTimeout(function(){				
				$("#end-cat").removeClass('next-cat-left');
				$("#learn-container").addClass('next-cat-left');
			}, 50);
			isRepeatCycle = false;
		}else{
			$("#end-cat").addClass('next-cat-right');
			setTimeout(function(){	
				$("#end-cat").hide();		
				$("#end-cat").removeClass('next-cat-right');
				$("#end-cat").addClass('next-cat-left');	
				packControler();
			}, 800);
		}
	}, 500);
}

var fst_id = 0;
var snd_id = 0;
var thd_id = 0;
var temp_id = 0;
var fin_id = 0;
var repeatFstRound = true;
//var repeatSecRound = false;
function repeatThrid(id, met){
	if(met == 6) whereGo = -1;
	else whereGo = 0;
	setTimeout(function(){
		setActWord(id);
		setTimeout(function(){
			setWordToMethod(met);
			pulseThdNav(id);
		}, 5);
	}, 100);
}

function updateThirdNav(){
	var i = 1;
	var ids = [];
	ids.push(snd_id);
	ids.push(thd_id);
	$("#nav-words-container-thd p").hide();
	$("#nav-words-container-thd p").attr('data-word-id', 0);
	$("#nav-words-container p").each(function(){
		var id = $(this).attr('data-word-id');
		var src = $(this).children('img').attr('src');
		for(k = 0; k < ids.length; k++){
			if(id == ids[k]){
				$("#nav-th-"+i).children('img').attr('src', src);
				$("#nav-th-"+i).attr('data-word-id', id);
				$("#nav-th-"+i).show();
				i++;
				ids.splice(k, 1);
				break;
			}
		}
	});
}

function pulseThdNav(idW){
	setTimeout(function(){
		$("#nav-words-container p").removeClass('pulse');
		$("#nav-words-container-thd p").removeClass('pulse');
		$("#nav-words-container-thd p").removeClass("activ");
		$("#nav-words-container-thd p").each(function(){
			var id = $(this).attr('data-word-id');
			if(idW == id){
				$(this).addClass('pulse');
				$(this).addClass('activ');
			}
		});
	}, 200);
}
/*END ALGORYTHM MANAGAMENT*/

function showAllNote(){
	showNote(1);
	showNote(2);
	showNote(3);
	showNote(4);
	showNote(5);
	showNote(6);
}
function showNote(x){
	var target = "#l-n-" + x;
	var target2 = "#l-t-" + x;
	var targetE = "#l-e-" + x;
	$(target2).hide();
	if($(target).is(":visible") == true){
		$(target).hide();
		$(targetE).show();
		showTrans(x);
	}else{
		$(targetE).hide();
		$(target).show();
	}
}

function showTrans(x){
	var target = "#l-n-" + x;
	var target2 = "#l-t-" + x;
	var targetE = "#l-e-" + x;
	$(target).hide();
	if($(target2).is(":visible") == true){
		$(target2).hide();
		$(targetE).show();
	}else{
		$(targetE).hide();
		$(target2).show();
	}
}

function backToNormalStateNote(){
	$("#l-n-1").hide();
	$("#l-n-2").hide();
	$("#l-n-3").hide();
	$("#l-n-4").hide();
	$("#l-n-5").hide();
	$("#l-n-6").hide();
	$("#l-e-1").hide();
	$("#l-e-2").hide();
	$("#l-e-3").hide();
	$("#l-e-4").hide();
	$("#l-e-5").hide();
	$("#l-e-6").hide();
	$("#l-t-1").show();
	$("#l-t-2").show();
	$("#l-t-3").show();
	$("#l-t-4").show();
	$("#l-t-5").show();
	$("#l-t-6").show();
	hideKeyboard();
	hideHoverNoteBtn('.note-btn');
}

function hideKeyboard(){
	$("#l-n-1").blur();
	$("#l-n-2").blur();
	$("#l-n-3").blur();
	$("#l-n-4").blur();
	$("#l-n-5").blur();
	$("#l-n-6").blur();
}

function showNoteForTut(x){
	var target = "#t-l-n-" + x;
	var target2 = "#t-l-t-" + x;
	var targetE = "#t-l-e-" + x;
	$(target2).hide();
	if($(target).is(":visible") == true){
		$(target).hide();
		$(targetE).show();
	}else{
		$(targetE).hide();
		$(target).show();
	}
}

function showTransForTut(x){
	var target = "#t-l-n-" + x;
	var target2 = "#t-l-t-" + x;
	var targetE = "#t-l-e-" + x;
	$(target).hide();
	if($(target2).is(":visible") == true){
		$(target2).hide();
		$(targetE).show();
	}else{
		$(targetE).hide();
		$(target2).show();
	}
}

function tellMeNow(obj){
	//var par = $(obj).parent().parent();
	//if(parseInt(par.css('top')) == 0){
		tellMe();
	//}
}

function prepareGlobalForCycle(i){
	switch(i){
		case 1:
			$("#nav-words-container-thd p").hide();
			round = 1;
			nbMethod = 2;
			isPreparetoFirst = false;
			firstCycle = true;
			secondCycle = false;
			thirdCycle = false;
			break;
		case 2:
			$("#nav-words-container-thd p").hide();
			round = 2;
			nbMethod = 2;
			nbStep = 0;
			noPlus = 0;
			canNextStep = 1;
			noLerntStep = 0;
			firstCycle = false;
			secondCycle = true;
			thirdCycle = false;
			break;
		case 3:
			$("#nav-words-container-thd p").hide();
			round = 4;
			nbStep = 0;
			canNextStep = 1;
			prepareToThird = 1;
			fst_id = 0;
			snd_id = 0;
			thd_id = 0;
			temp_id = 0;
			fin_id = 0;
			firstCycle = false;
			secondCycle = false;
			thirdCycle = true;
			repeatSec = 1;
			repeatThd = 1;
			s_nowe = 0;
			t_nowe = 0;
			id_powt = -1;
			s_bylo = 0;
			t_bylo = 0;
			step_pow = 0;
			ile_s = 0;
			ile_t = 0;
			last_r_s = -1;
			break;
	}
	$("#nav-words-container p").removeClass("activ");
	$("#nav-words-container p").removeClass("pulse");
	$("#nav-words-container p").eq(0).addClass("activ");
	$("#nav-words-container p").eq(0).addClass("pulse");
}

function addFunction(a, b) {
	if(Number.isInteger(b)) return a + b;
	else return a;
}

var continueLearning = false;
var nameCat;
var newCategoryisSet = false;
var learnetCatToday = 1;
var isRepeatCycle = false;
function packControler(){
	waintingLearned = 0;
	var endThis = false;
	$("#startDay").hide();
	$("#words-nav").show();
	$("#ok-no-panel").show();
	/*alert($("#progress-circle .c100").width());
	alert($("#start-day-wrap-ok-no .good-bad").width());
	alert($( window ).width());
	alert(toLearn.reduce(function(a, b) { return a + b; }, 0));
	alert(toLearn.reduce(function(a, b) { return a + b; }, 0) > -10 );
	alert(Number(toLearn.reduce(function(a, b) { return a + b; }, 0)) == 0);*/
	if(toLearn.reduce(function(a, b) { return a + b; }, 0) != -10){
		$("#learn-container").show();
		setTimeout(function(){				
			$("#learn-container").removeClass('next-cat-left');
		}, 500);
	}	
	alert("ToLearn: " + toLearn.toString());
	for(var i = 0; i < 10 && !endThis; i++){
		continueLearning = false;
		if(toLearn[i] != -1){
			clearNoticeFields();
			setEveryThingToStartCat(toLearn[i]);
			getSubCatName(toLearn[i]);
			endThis = true;
			continueLearning = true;
			toLearn[i] = -1;
			switch(i){
			case 0:
				isRepeatCycle = false;
				showAd();
				countWordsToLearnInThisCycle = wordsInOneCat*2 + wordsInOneCat*4 - 2;
				learnedWordsInCat = 0;
				prepareGlobalForCycle(1);
				setTimeout(function(){ showStartCat(learnetCatToday, nameCat);}, 100);
				break;
			case 1:
				isRepeatCycle = true;
				prepareGlobalForCycle(2);
				setTimeout(function(){ nextStep(); }, 300);
				learnetCatToday++;
				break;
			case 2:
				isRepeatCycle = false;
				showAd();
				countWordsToLearnInThisCycle = wordsInOneCat*2 + wordsInOneCat*4 - 2;
				learnedWordsInCat = 0;
				prepareGlobalForCycle(2);
				setTimeout(function(){ showStartCat(learnetCatToday, nameCat);}, 100);
				break;
			case 3:
				isRepeatCycle = true;
				prepareGlobalForCycle(3);
				setTimeout(function(){ nextStep(); }, 300);
				learnetCatToday++;
				break;
			case 4:
				isRepeatCycle = false;
				showAd();
				countWordsToLearnInThisCycle = wordsInOneCat*2 + wordsInOneCat*4 - 2;
				learnedWordsInCat = 0;
				prepareGlobalForCycle(2);
				setTimeout(function(){ showStartCat(learnetCatToday, nameCat);}, 100);
				break;
			case 5:
				isRepeatCycle = true;
				prepareGlobalForCycle(3);
				setTimeout(function(){ nextStep(); }, 300);
				learnetCatToday++;
				break;
			case 6:
				isRepeatCycle = true;
				showAd();
				countWordsToLearnInThisCycle = wordsInOneCat*2;
				learnedWordsInCat = 0;
				prepareGlobalForCycle(3);
				setTimeout(function(){ showStartCat(learnetCatToday, nameCat);}, 100);
				learnetCatToday++;
				break;
			case 7:
				isRepeatCycle = true;
				showAd();
				countWordsToLearnInThisCycle = wordsInOneCat*2;
				learnedWordsInCat = 0;
				prepareGlobalForCycle(3);
				setTimeout(function(){ showStartCat(learnetCatToday, nameCat);}, 100);
				learnetCatToday++;
				break;
			case 8:
				isRepeatCycle = false;
				countWordsToLearnInThisCycle = wordsInOneCat*2 + wordsInOneCat*4 - 2;
				learnedWordsInCat = 0;
				newCategoryisSet = true;
				prepareGlobalForCycle(1);
				setTimeout(function(){ nextStep(); }, 300);
				break;
			case 9:
				isRepeatCycle = false;
				newCategoryisSet = true;
				prepareGlobalForCycle(2);
				setTimeout(function(){ nextStep(); }, 300);
				break;
			default:
				break;
			} 
		}
	}	
	if(!continueLearning){
		alert("newCat = " + newCategoryisSet);
		if(newCategoryisSet){
			saveDay();
			setTimeout(function(){ 
				datesJSON = toLearnJSON;
				srcSave = path() + "save.json";
				saveFile();
				setTimeout(function(){ endLearn();}, 1000);
			}, 500);
		}else{
			showAd();
			alert("jestem w wyborze nowej kategorii");
			startChoiceNewCategory();
			//startSetNewCategory();
		}
	}
	
}

function clearNoticeFields(){
	$("#confirm-text-1").val("");
	$("#confirm-text-2").val("");
	$("#confirm-text-3").val("");
	$("#confirm-text-4").val("");
	$("#confirm-text-5").val("");
	$("#confirm-text-6").val("");
}

function setEveryThingToStartCat(cat){
	var res = cat.split("/");
	var p = res[0];
	var c = res[1];
	$("#myParentCat").val(p);
	$("#myCat").val(c);
	setTimeout(function(){
			getWordList();
	}, 10);
}

function whereGoNow(){ //-1 - left, 1- right, 0-no;
	return whereGo;
}

function getsecondCycle(){
	return secondCycle;
}
function getfirstCycle(){
	return firstCycle;
}
function getNoFlipIfWrong(){
	return noFlipIfWrong;
}
function setNoFlipIfWrong(val){
	noFlipIfWrong = val;
}
function isRoundTwoAndTheSameMethod(){
	return (round == 3 && theSameMethod);
}

function showStartCat(count, name){
    removeAllProgressClass($("#progess-btn-stan"));
	$("#start-next-cat").show();
	$("#nav-circle-word").hide();
	$("#learn-container").hide();
	$("#main-text-next-cat").text(count + "/" + countCatsToLearn);
	$("#main-text-next-cat-end").text(count + "/" + countCatsToLearn);
	$("#name-next-cat").text(name);
	
	var percent = Math.round(((count-1)/countCatsToLearn)*100);
	//$("#progess-btn-stan").addClass('p'+percent);
	$("#progess-btn-per").text(percent+"%");
	
	setTimeout(function(){				
		$("#start-next-cat").removeClass('next-cat-left');
		setTimeout(function(){				
			loadProgressBarToFull();
		}, 500);
	}, 500);
}
var ix = 1;
function loadProgressBarToFull(){
	ix = 1;
	smoothLoadProgressBar();
}

function smoothLoadProgressBar() {          
   setTimeout(function () {    
      $("#progess-btn-stan").addClass('p'+ix);        
      ix++;                   
      if (ix < 101) {           
         smoothLoadProgressBar();        
      }                   
   }, 15)
}

function nextCatBtn(){
	$("#start-next-cat").addClass('next-cat-right');
	$("#learn-container").addClass('next-cat-left');
	setTimeout(function(){					  
		$("#nav-circle-word").show();
		$("#learn-container").show();
		setTimeout(function(){				
			$("#learn-container").removeClass('next-cat-left');
			removeAllProgress();
		}, 500);
		$("#start-next-cat").hide();
		$("#start-next-cat").removeClass('next-cat-right');
		$("#start-next-cat").addClass('next-cat-left');
		nextStep();
	}, 500);
}

function removeAllProgress(){
	for(var i = 1; i < 102; i++){
		$("#progess-btn-stan").removeClass('p'+i); 
	}
}

var waintingLearned = 0;

function increaseLearned(){
	if(waintingLearned > 0){
		waintingLearned--;
	}else{
		if(thirdCycle){
			var bylo = false;
			$("#nav-words-container-thd p").each(function(){
				if($(this).hasClass('activ')){
					bylo = true;
				}
			});
			setTimeout(function(){
				if(!bylo){
					learnedWords++;
					learnedWordsInCat++;
				}
			}, 50);
		}else{
			learnedWords++;
			learnedWordsInCat++;
		}
	}
}

function setWaintingLearned(){
	if(getfirstCycle()){
		waintingLearned = 1;
	}else if(getsecondCycle()){
		if(nbMethod == 6){
			waintingLearned += 3;
		}else{
			if(nbStep == 2){
				waintingLearned += 0;
			}else{
				waintingLearned += 2;
			}
		}
	}
	if(thirdCycle){
		var bylo = false;
		$("#nav-words-container-thd p").each(function(){
			if($(this).hasClass('activ')){
				bylo = true;
			}
		});
		setTimeout(function(){
			if(!bylo){
				learnedWords++;
				learnedWordsInCat++;
			}
		}, 50);
	}
}
/*END APP*/
function endLearn(){
	$("#learn-container").addClass('next-cat-right');
	
	if(todayEndedCat != "") allEndedCats.push(todayEndedCat);
	uniqueallEndedCats = allEndedCats.filter(function(item, pos) {
		return allEndedCats.indexOf(item) == pos;
	});
	
	if(allCats.sort().toString() == uniqueallEndedCats.sort().toString()  && (inProgressCat.length == 0 || (inProgressCat.length == 1 && inProgressCat[0] == todayEndedCat))){
		setTimeout(function(){
			//showAd();
			$(".countKMLearned").text( Math.floor( (dayJSON.km + 1)*minCat / 60) );
			$(".countMinLearned").text( Math.floor( (dayJSON.km + 1)*minCat % 60) );
			$("#learn-container").hide();
			$("#end-course").show();
			setTimeout(function(){				
				$("#end-course").removeClass('next-cat-left');
				showRating();
			}, 100);
		}, 500);
	}else{
		setTimeout(function(){
			//showAd();
			alert("jestem2");
			$("#learn-container").hide();
			$("#end-panel").show();
			setTimeout(function(){				
				$("#end-panel").removeClass('next-cat-left');
				showRating();
			}, 100);
		}, 500);
	}
	
}
/*END END APP*/
/*TUTORIAL*/
var stepTut = 0;
function startTut(){
	stepTut = 0;
	$("#tutorial").show();
	setTimeout(function(){				
		$("#tutorial").removeClass('next-cat-left');
	}, 100);
	$("#tut-lern-0").show();
}
function nextTutStep(){
	stepTut++;
	$(".tut-method").hide();
	if(stepTut > 18) endTut();
	else{
		$("#tut-lern-" + stepTut).show();
		setTimeout(function(){	
			updateProgressTut(stepTut);		  
			$('.tut-method').removeClass('goLeft');
			$('.tut-method').removeClass('goRight');
			$('.tut-method').removeClass('flipper-hide');
			if(stepTut == 3){
				$('#count-word-to-learn-tut').addClass('shown');
				$('#count-word-to-learn-tut').addClass('pulse-btn');
			}
			if(stepTut == 5){
				$('#count-word-to-learn-tut').removeClass('pulse-btn');
				$('#count-word-to-learn-tut').removeClass('shown');
				$('#noteInTut').addClass('pulse-btn');
				$('#noteInTut').addClass('shown');
			}
			if(stepTut == 7){
				$('#remind-tut').addClass('shown');
				$('#noteInTut').removeClass('pulse-btn');
			}
			if(stepTut == 9){
				$('#noteInTut').removeClass('shown');
				$('#remind-tut').removeClass('shown');
			}
			if(stepTut == 11){
				$('#menu-switch').addClass('pulse-btn');
			}
			if(stepTut == 13){
				$('#menu-switch').removeClass('pulse-btn');
			}
		}, 300);
	}
}

function updateProgressTut(step){
	var percent = 100 - Math.round(((step)/(19))*100);
	$("#progess-btn-stan-in-cycle-tut2").addClass('p'+percent);
	removeProgressClassMin($("#progess-btn-stan-in-cycle-tut2"), percent);
}
function endTut(){ 
	$("#startDay").addClass('next-cat-left');
	stepTut = 0;
	$("#tutorial").hide();
	$(".tut-method").hide();
	if(startLearn){
		//zacznij naukę
		showStartLessonPage();
		startLearn = false;
	}else{
		//powrót do głównego
	}
}
function startSetNewCategory(){
	getCatList();
	$("#new-category-choice").addClass('next-cat-left');
	setTimeout(function(){	
		if(firstGenerationCat){
			firstGenerationCat = false;
			activateSearch();
		}
		$('section').hide();			
		$("#choose-cat").show();
		setTimeout(function(){		
			$("#choose-cat").removeClass('next-cat-right');
		}, 50);
		$("#cats").show();
	}, 500);
}
function backToSetNewCategory(){
	$("#choose-cat").addClass('next-cat-right');
	setTimeout(function(){				
		$("#choose-cat").hide();
		$("#new-category-choice").show();	
		setTimeout(function(){				
			$("#new-category-choice").removeClass('next-cat-left');
			$("#learn-container").addClass('next-cat-left');
			$("#progess-btn-stan-in-cycle").addClass('p100');
			setTimeout(function(){	loadProgressBarToFull2(); }, 200);
		}, 50);
	}, 500);
}
function startChoiceNewCategory(){
	alert("sugGetIsSetter" + sugGetIsSetter);
	if(sugGetIsSetter){
		$("#suggest-new-category").text(suggestedCatName);
		$('section').hide();
		$("#new-category-choice").show();	
		setTimeout(function(){				
			$("#new-category-choice").removeClass('next-cat-left');
			$("#learn-container").addClass('next-cat-left');
			$("#progess-btn-stan-in-cycle").addClass('p100');
			setTimeout(function(){	loadProgressBarToFull2(); }, 200);
		}, 50);
	}else{
		saveDay();
		setTimeout(function(){ 
			datesJSON = toLearnJSON;
			srcSave = path() + "save.json";
			saveFile();
			setTimeout(function(){ endLearn();}, 1000);
		}, 500);
	}
}

var ix2 = 1;
function loadProgressBarToFull2(){
	ix2 = 1;
	smoothLoadProgressBar2();
}

function smoothLoadProgressBar2() {          
   setTimeout(function () {    
      $("#progess-btn-stan-in-cycle-ncat").addClass('p'+ix2);        
      ix2++;                   
      if (ix2 < 101) {           
         smoothLoadProgressBar2();        
      }                   
   }, 15)
}

function removeAllProgress2(){
	for(var i = 1; i < 102; i++){
		$("#progess-btn-stan-in-cycle-ncat").removeClass('p'+i); 
	}
}

function setSuggestedCat(par, cat){
	var idLang = $("#myLang").val();
	$.get("date/"+ idLang + "/" + par + "/subcat.json", function(result) {
		var scat = JSON.parse(result);
		for(var x in scat){
			var c = scat[x];
			if(c.id == cat) {	
				getCatWithPos(c.pos, 1);
			}
		}
    });
}

var userChoiceCat = false;
function setThisAsSuggestedCat(par, cat){
	var idLang = $("#myLang").val();
	userChoiceCat = true;
	$.get("date/"+ idLang + "/" + par + "/subcat.json", function(result) {
		var scat = JSON.parse(result);
		for(var x in scat){
			var c = scat[x];
			if(c.id == cat) {	
				getCatWithPos(c.pos, 0);
			}
		}
    });
}

function setSuggestedCatName(idp, idc){
	var idLang = $("#myLang").val();
	$.get("date/"+ idLang + "/" + idp + "/subcat.json", function(result) {
		var scat = JSON.parse(result);
		for(var x in scat){
			var cat = scat[x];
			if(cat.id == idc) {	
				getCatWithPos(cat.pos, 1);
			}
		}
    });
}

function setSuggestedCatAsNew(){
	$("#new-category-choice").addClass('next-cat-right');
	setTimeout(function(){
		$("#new-category-choice").hide();
		dayJSON.words = dayJSON.words + wordsInOneCat;
		var res = suggestedCatPath.split("/");
		var parent = res[0];
		var cat = res[1];
		$("#learn-container").addClass('next-cat-left');
		setTimeout(function(){
			setNewCat(parent, cat);
			$("#myCat").val(cat);
			$("#myParentCat").val(parent);
			$("#learn-container").show();	
			packControler();
			$("#words-nav").show();
		}, 300);
	}, 500);
}

function showStartLessonPage(){
	gameIsBegin = true;
	$('seciton').hide();
	$("#startDay").show();
	setTimeout(function(){				
		$("#startDay").removeClass('next-cat-left');
	}, 100);
}

function startLesson(){
	packControler();	
}

function removeAllProgressClass(obj){
	return;
}

function removeProgressClassMin(obj, min){
	for(var i = 100; i > min; i--){
		obj.removeClass('p'+i);
	}
}

function updateProgressBar(){
	removeAllProgressClass($("#progess-btn-stan-in-cycle"));
	removeAllProgressClass($("#progess-btn-stan-in-cycle-2"));
	setTimeout(function(){				
		var percent = 100 - Math.round(((learnedWords)/(countWordsToLearn))*100);
		var percent2 = 100 - Math.round(((learnedWordsInCat)/(countWordsToLearnInThisCycle))*100);
		$("#progess-btn-stan-in-cycle").addClass('p'+percent2);
		$("#progess-btn-stan-in-cycle-2").addClass('p'+percent);
		removeProgressClassMin($("#progess-btn-stan-in-cycle"), percent2);
		removeProgressClassMin($("#progess-btn-stan-in-cycle-2"), percent);
		$("#progess-btn-per-in-cycle-2").text(countWordsToLearn-learnedWords);
	}, 50);
}
/*END TUTORIAL*/
var sugGetIsSetter = false;
var scdCycleInSearchSub = false;
function getCatWithPos(pos, off){
	//alert(allCats.sort().toString());
	alert(pos + " - " + off + " / " + allCats.length + " / " + langJSON.lang);
	//alert(scdCycleInSearchSub);*/
	$.get("date/"+ langJSON.lang + "/cat.json", function(result) {
		var cats = JSON.parse(result);
		var catSize = cats.length;
		for(var x in cats){
			var cat = cats[x];
			var idP = cat.id;
			$.get("date/"+ langJSON.lang + "/" + idP + "/subcat.json", function(result) {
				var scats = JSON.parse(result);
				var scatSize = scats.length;
				for(var sc in scats){
					var scat = scats[sc];
					if(parseInt(scat.pos) == (parseInt(pos)+off)){
						if(!userChoiceCat && (dayJSON.skiped.indexOf(idP + "/" + scat.id) >= 0 || learnedCat.indexOf(idP + "/" + scat.id) >= 0 || inProgressCat.indexOf(idP + "/" + scat.id) >= 0)){
							alert("catSize: " + catSize + " - scatSize: " + scatSize + " - scdCycleInSearchSub: " + scdCycleInSearchSub);
							if((parseInt(x)+1) == catSize && (parseInt(sc)+1) == scatSize){
								if(scdCycleInSearchSub) {
									isNotNewCat();
									return;	
								}
								else{
									scdCycleInSearchSub = true;
									getCatWithPos(1, 0);
									return;	
								}
							}
							off++;
						}else{
							alert(idP + " - " + scat.id);
							userChoiceCat = false;
							$("#sugCatPar").val(idP);
							$("#sugCatSub").val(scat.id);
							suggestedCatPath = idP + "/" + scat.id;
							suggestedCatName = scat.name;
							getWordToSuggestCat(idP + "/" + scat.id);
							sugGetIsSetter = true;
							return;	
						}
					}else if(pos == allCats.length && allCats.length > 0 && parseInt(scat.pos) == pos){
						alert("czemu to jestem;");
						if(scdCycleInSearchSub) {
							isNotNewCat();
							return;	
						}
						else{
							scdCycleInSearchSub = true;
							getCatWithPos(1, 0);
							return;	
						}
					}
				}
			});
		}
    });
}

function getAllCatsInArray(){
	$.get("date/"+ langJSON.lang + "/cat.json", function(result) {
		var cats = JSON.parse(result);
		for(var x in cats){
			var cat = cats[x];
			var idP = cat.id;
			$.get("date/"+ langJSON.lang + "/" + idP + "/subcat.json", function(result) {
				var scats = JSON.parse(result);
				for(var sc in scats){
					var scat = scats[sc];
					allCats.push(idP + "/" + scat.id);
				}
			});
		}
    });
}

function isNotNewCat(){
	if(gameIsBegin){
		$("#new-category-choice").addClass('next-cat-right');
		saveDay();
		setTimeout(function(){ 
			datesJSON = toLearnJSON;
			srcSave = path() + "save.json";
			saveFile();
			setTimeout(function(){ 
				if(todayEndedCat != "") allEndedCats.push(todayEndedCat);
				uniqueallEndedCats = allEndedCats.filter(function(item, pos) {
					return allEndedCats.indexOf(item) == pos;
				});
				if(allCats.sort().toString() == uniqueallEndedCats.sort().toString() && (inProgressCat.length == 0 || (inProgressCat.length == 1 && inProgressCat[0] == todayEndedCat))){
					$("#new-category-choice").hide();
					$("#end-course").show();
					$(".countKMLearned").text( Math.floor( (dayJSON.km + 1)*minCat / 60) );
					$(".countMinLearned").text( Math.floor( (dayJSON.km + 1)*minCat % 60) );
					setTimeout(function(){				
						$("#end-course").removeClass('next-cat-left');
						showRating();
					}, 100);
				}else{
					alert("jestem");
					$("#new-category-choice").hide();
					$("#end-panel").show();
					setTimeout(function(){				
						$("#end-panel").removeClass('next-cat-left');
						showRating();
					}, 100);
				}
			}, 500);
		}, 500);
	}	
}

function getNextSugCat(){
	scdCycleInSearchSub = false;
	var p = $("#sugCatPar").val();
	var c = $("#sugCatSub").val();
	setSuggestedCat(p, c);
	addCatToMissing(p + "/" + c);
	setTimeout(function(){$("#suggest-new-category").text(suggestedCatName);}, 100);
}

function addCatToMissing(catSgn){
	dayJSON.skiped.push(catSgn);
	allEndedCats.push(catSgn);
}
function getThisCatAsSug(obj){
	
	var p = $(obj).attr('data-parent');
	var c = $(obj).attr('data-subcat');
	setThisAsSuggestedCat(p, c);
	setTimeout(function(){$("#suggest-new-category").text(suggestedCatName); backToSetNewCategory();}, 100);
}

/* SAVE PROGRESS */
var progressJSON = [];
var srcSaveProgress = "myProgress.fiszki";
function saveProgressInFile(){
	var progress = '{"langJSON": "", "dayJSON": "", "toLearnJSON": "", "noticeJSON": ""}';
	progressJSON = JSON.parse(progress);
	progressJSON.langJSON = langJSON;
	progressJSON.dayJSON = dayJSON;
	progressJSON.toLearnJSON = toLearnJSON;
	progressJSON.noticeJSON = noticeJSON;
	saveFileProgress();
}

function saveFileProgress(){
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSNProgress, failN);
}

function gotFSNProgress(fileSystem) {
	fileSystem.root.getFile(srcSaveProgress, {create: true}, gotFileEntryNProgress, failN);
}

function gotFileEntryNProgress(fileEntry) {
	fileEntry.createWriter(gotFileWriterNProgress, failN);
}

function gotFileWriterNProgress(writer) {
	writer.onwrite = function(evt) {
		console.log("write success");
	};
	
	writer.write(JSON.stringify(progressJSON));
	writer.abort();
}

function failN(error) {
	//alert("error : "+error.code);
}
/* END SAVE FILE */

/* READ PROGRESS */
var srcLoadProgress = "";
function loadProgress(uri){
	srcLoadProgress = uri;
	window.FilePath.resolveNativePath(srcLoadProgress, function(localFileUri) {
        window.resolveLocalFileSystemURL(localFileUri, function(oFile) {
			oFile.file(function(readyFile) {
				var reader= new FileReader();
				reader.onloadend= function(evt) {
					if(IsJsonString(evt.target.result)){
						var res = JSON.parse(evt.target.result);
						langJSON = res.langJSON;
						dayJSON = res.dayJSON;
						toLearnJSON = res.toLearnJSON;
						noticeJSON = res.noticeJSON;

						saveLang(); //save lang
						window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSN, failN); //save notice
						/*save day*/
							datesJSON5 = dayJSON;
							srcSave5 = path() + "day.json";
							saveFile5();
						/*end day*/
						/*save tolearn*/
						setTimeout(function(){ 
							datesJSON = toLearnJSON;
							srcSave = path() + "save.json";
							saveFile();
						}, 200);
						/*end tolearn*/
						/*komunikat i restart*/
						setTimeout(function(){ 
							alert("Plik pomyślnie wczytano! Aplikacja automatycznie uruchomi się ponownie");
							setTimeout(function(){ 
								location.reload(); 
							}, 500);
						}, 500);
					}else{
						alert("Plik jest nieprawidłowy!");
					}
				};
				reader.readAsText(readyFile); 
			});
		}, function(err){
			//alert('### ERR: filesystem.directoryUp() - ' + (JSON.stringify(err)));
			alert("Plik jest nieprawidłowy!");
		});
    });
}
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
/* END READ FILE */
/* START statistic */
var isInList = [];
function showInProgressCat(){
	for(var p in inProgressCat){
		var res = inProgressCat[p].split("/");
		var idp = res[0];
		var idc = res[1];
		setinProgressCatList(idp, idc);
	}
}
function setinProgressCatList(idp, idc){
	if(!(isInList.indexOf(idp+"/"+idc) >= 0)){
		isInList.push(idp+"/"+idc);
		var idLang = $("#myLang").val();
		$.get("date/"+ idLang + "/" + idp + "/subcat.json", function(result) {
			var scat = JSON.parse(result);
			for(var x in scat){
				var cat = scat[x];
				if(cat.id == idc) {	
					if($(".inProgressCatList").text() != "") $(".inProgressCatList").append("</br>");
					$(".inProgressCatList").append(cat.name);
				}
			}
		});
	}
}
/* END statistic */
function checkConnection() {
	return(!(navigator.connection.type==0 || navigator.connection.type=='none'));
}
function showRating() {
	AppRate.promptForRating();
}

/*function iinit() {
	
	//This alias is a read-only pointer to the app itself
	window.resolveLocalFileSystemURL(cordova.file.applicationDirectory + "www/index.html", gotFile, fail);

}

function fail(e) {
	alert("dupa");
}

function gotFile(fileEntry) {

	fileEntry.file(function(file) {
		alert(file.localURL);
		var s = "";
		s += "<b>name:</b> " + file.name + "<br/>";
		s += "<b>localURL:</b> " + file.localURL + "<br/>";
		s += "<b>type:</b> " + file.type + "<br/>";
		s += "<b>lastModifiedDate:</b> " + (new Date(file.lastModifiedDate)) + "<br/>";
		s += "<b>size:</b> " + file.size + "<br/>";
		
		document.querySelector("#status").innerHTML = s;
		console.dir(file);
	});
}*/
/*END COPY FIRST PATCH*/
//getCategoryList(idLant)
//getSubCategoryList(idCat)
//getWordList(idLang, idCar, idSubCat)
//getSound(idLang, idCat, idSubCat, idWord)

//struktura plików
/*
 Aplikacja 	-> lang.json
			-> 1 (foldery z id języka)
			-> 2
			-> 3
				-> cat.json
				-> 1 (foldery z id cat)
				-> 2
				-> 3
					-> subcat.json
					-> 1(foldery z id subCat)
					-> 2
					-> 3
						-> sound (pliki z dźwiękami)
							-> 1.m4p
							-> 2.m4p
							-> 3.m4p 
						-> words.json
							-> id : slowo : inne dane
							-> id : slowo : inne dane
							-> id : slowo : inne dane

*/