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
		getLangList();
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

var mainPath;
function path(){
	var res = (cordova.file.externalDataDirectory).split('/').slice(-5);
	mainPath = (res.toString()).replace(/,/g,'/');
	return (res.toString()).replace(/,/g,'/');
}

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
	alert("Ładownie...proszę czekać...");
	copyFirstPath();
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
	
	writer.write(JSON.stringify(datesJSON));
	writer.abort();
}

function failN(error) {
	alert("error : "+error.code);
}

/* END SAVE FILE */
/* GET LANG LIST */
var firstCycle = false;
var secondCycle = false;
var thirdCycle = false;
var srcSave = false;
var datesJSON = false;
var res = false;
var srcFile = false;
var res2 = false;
var srcFile2 = false;
var dayJSON = false;
var toLearnJSON = false;
var noticeJSON = false;
var isFirstCycle = true;
var toLearn = [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
function getDay(){
	srcFile = path() + "day.json";
	readWriteFile();
	getDayHelper();
}
function getDayHelper(){
	if(res == false){
        setTimeout(getDayHelper, 100);
		return;
	}else{
		dayJSON = JSON.parse(res);
		res = false;
		$("#nrDay").text(dayJSON.day);
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
		toLearnJSON = JSON.parse(res);
		for(var x in toLearnJSON){
			var pack = toLearnJSON[x];
			var day = $("#nrDay").text();
			var dayNr = day - pack.start;
			switch(dayNr) {
			case 1:
				toLearn[0] = pack.catid + "/" + pack.subid;
				toLearn[1] = pack.catid + "/" + pack.subid;
				break;
			case 4:
				toLearn[2] = pack.catid + "/" + pack.subid;
				toLearn[3] = pack.catid + "/" + pack.subid;
				break;
			case 10:
				toLearn[4] = pack.catid + "/" + pack.subid;
				toLearn[5] = pack.catid + "/" + pack.subid;
				break;
			case 27:
				toLearn[6] = pack.catid + "/" + pack.subid;
				break;
			case 60:
				toLearn[7] = pack.catid + "/" + pack.subid;
				break;
			default:
				break;
			} 
		}
	}
}
function saveDay(){
	dayJSON.day = dayJSON.day + 1;  //zmienić na 1
	datesJSON = dayJSON;
	srcSave = path() + "day.json";
	saveFile();
}
function getLangList(){
	getDay();
	$.get("date/lang.json", function(result) {
		showLangList(result);
		startTmp();
	});
}
function showLangList(l){
	var langs = JSON.parse(l);
	for(var x in langs){
		var lang = langs[x];
		var tmp = '<div><h1 class="text expand" ontouchstart="expand(this);">'+ lang.label + '</h1><div class="list-of-lang">';
		for(var y in langs){
			var langTmp = langs[y];
			if(y != x) tmp += '<p class="text setLang" ontouchstart="setLang(this);" data-mylang="' + lang.id + '" data-learnlang="' + langTmp.id + '">' + langTmp.name + '</p>';
		}
		tmp += '</div></div>';
		$("#langs").append(tmp);
	}
}
/* END GET LAND LIST */

/* GET CAT LIST */
var subcats = false;
function getCatList(){
	var idCat = $("#myLang").val();
	$.get("date/"+ idCat + "/cat.json", function(result) {
		showCatList(result);
		setTimeout(
			function(){
				getToLearn();
			}, 100);
    });
}
function showCatList(c){
	var cats = JSON.parse(c);
	$("#cats").html("");
	for(var x in cats){
		subcats = false;
		var cat = cats[x];
		var tmp = '<div><h1 class="text expand" ontouchstart="expand(this);">'+ cat.name + '</h1>';
		getSubCatList(cat.id);
		setTimeout(
			function(){
				tmp += subcats + '</div>';
				$("#cats").append(tmp);
			}, 50);
	}
}
/* END GET CAT LIST */

/* GET SUBCAT LIST */
var parent = false;
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
		tmp += '<p class="text setCat" onclick="setCat(this);" data-name="' + cat.name + '" data-parent="' + parent + '" data-subcat="' + cat.id + '">' + cat.name + '</p>';
	}
	tmp += '</div>';
	subcats = tmp;
}
/* END GET SUBCAT LIST */
function setNewCat(c, s){
	toLearn[8] = c + "/" + s;
	toLearn[9] = c + "/" + s;
	srt = $("#nrDay").text();
	toLearnJSON.push({"subid": s,"catid": c,"start": srt});
	/*datesJSON = toLearnJSON;
	srcSave = path() + "save.json";
	saveFile(); */  //ODKOMENTOWAĆ POTEM
}
function showtoLearn(){
	for(var i = 0; i < 10; i++) ;
		//alert(i + ")" + toLearn[i]);
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
	if(isFirstCycle){
		$("#words").html("");
		var tmp = "";
		for(var x in words){
			nameWord = false;
			var word = words[x];
			var tran = trans[x];
			tmp += '<div class="word" data-id="' + word.id + '" data-check="1" onclick="checkWord(this);"><table><tr><td><p class="text">' + word.name + '</p></td><td rowspan="2"><img src="img/check.png"></td></tr><tr><td><p class="text">' + tran.name + '</p></td></tr></table></div>';
		}
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

function clearDraggableField(){
	$(".confirm-swipe table").show();
	$(".confirm-swipe table").css({	top: "0px"});
	$('.confirm-swipe table').removeClass('good');
	$('.confirm-swipe table').removeClass('bad');
}
/*END SET WORD TO LEARN*/
/*PLAY SOUND*/
function tellMe(){
	var id = $("#idWord").val();
	var idLang = $("#learnLang").val();
	var idParentCat = $("#myParentCat").val();
	var idSubCat = $("#myCat").val();
	
	var src = '/android_asset/www/date/' + idLang + "/" + idParentCat + "/" + idSubCat + "/sound/" + id + ".m4a";
	var my_media = new Media(src,
            // success callback
             function () { console.log("playAudio():Audio Success"); },
            // error callback
             function (err) { console.log("playAudio():Audio Error: " + err.code); }
    );
           // Play audio
    my_media.play();
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
		function() { alert("pliki zostały skopiowane"); location.reload();}, 
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
	switch(idM) {
		case 1:
			$("#confirm-correct-1").text("");
			$("#confirm-trans-1").text(act_trans);
			$("#confirm-text-1").val(act_text);	
			break;
		case 2:
			$("#confirm-correct-2").text(act_word);
			$("#confirm-trans-2").text(act_trans);
			$("#confirm-text-2").val(act_text);			
			break;
		case 3:
			$("#confirm-text-3").val(act_text);		
			$("#question-3").val("");
			break;
		case 4:
			tellMe();
			$("#confirm-correct-4").text(act_word);
			$("#confirm-trans-4").text("");
			$("#confirm-text-4").val(act_text);			
			break;
		case 5:
			$("#confirm-text-5").val(act_text);	
			$("#question-5").val("");
			break;
		case 6:
			$("#confirm-correct-6").text(act_word);
			$("#confirm-trans-6").text("");
			$("#confirm-text-6").val(act_text);			
			break;
		default:
			console.log("error");
	}
	$("#word-lern-" + idM).show();
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

function nextStepBlock(){
	canNextStep = 0;
}

function noLearnt(){
	canNextStep = 0;
	setTimeout(function(){
		clearDraggableField();
	}, 100);
	if(noLerntStep == 0){
		setWordToMethod(3);
		noLerntStep = 1;
	}else{
		setWordToMethod(4);
		noLerntStep = 0;
		canNextStep = 2;
	}
}
var noPlus = 0;
var prepareToThird = 1;
var isPreparetoFirst = false;
var readyToSaveNotice = false;
function nextStep(){
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
	}, 700);
	if(firstCycle){
		if(!isPreparetoFirst){
			setActWord(($("#nav-words-container p").eq(0)).data('word-id'));
			$("#nav-words-container p").eq(0).addClass("activ");
			$("#nav-words-container p").eq(0).addClass("pulse");
			setWordToMethod(2)
			setNavWordPosition(0);
			isPreparetoFirst = true;
			tellMe();
		}else{
			if(nbMethod == 2){
				nbMethod = 3;
				setWordToMethod(3);
			}else if(nbMethod == 3){
				nbMethod = 2;
				var length = $("#nav-words-container p").length;
				var index = $("#nav-words-container p.activ").index() + 1;
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
					}, 100);
				}
			}
		}		
	}else if(secondCycle){
		if(round == 2){
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
			round = 3;
			nbMethod = 4;
		}else if(round == 3){
			if(nbMethod == 4 && nbStep == 0){
				//saveNotice($("#confirm-text-4").val());
				var length = $("#nav-words-container p").length;
				if(true) var index = $("#nav-words-container p.activ").index() + 1;
				else{
					var index = $("#nav-words-container p.activ").index();
					noPlus = 0;
				}
				if(length <= index){
					$("#nav-words-container p").removeClass("activ");
					$("#nav-words-container p").removeClass("pulse");
					$("#nav-words-container p").eq(0).addClass("activ");
					$("#nav-words-container p").eq(0).addClass("pulse");
					round = 4;
					//nextStep();
					secondCycle = false;
					nextStep();
					return;
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
					setWordToMethod(5);
				}, 100);
				nbMethod = 5;
				nbStep = 1;
			}else if(nbMethod == 5 && nbStep == 1){
				nbMethod = 6;
				setWordToMethod(6);
				nbStep = 2;
			}else if(nbMethod == 6){
				var index = $("#nav-words-container p.activ").index() + 1;
				var id = ($("#nav-words-container p").eq(index)).data('word-id');
				setActWord(id);
				setNavWordPosition(index);
				$("#nav-words-container p").removeClass("activ");
				$("#nav-words-container p").removeClass("pulse");
				$("#nav-words-container p").eq(index).addClass("activ");
				$("#nav-words-container p").eq(index).addClass("pulse");
				setTimeout(function(){
					setWordToMethod(5);
				}, 100);
				nbMethod = 5;
			}else if(nbMethod == 5 && nbStep == 2){
				nbMethod = 4;
				nbStep = 0;
				nextStep();
				return;
			}		
		}
	} else if(thirdCycle){
		if(round == 4){
			if(canNextStep == 0){
				canNextStep = 1; 
				var index = $("#nav-words-container p.activ").index();
				var id = ($("#nav-words-container p").eq(index)).data('word-id');
				fst_id = id;
			}
			updateThirdNav();
			if(nbStep == 0){
				if(prepareToThird != 1){
					var length = $("#nav-words-container p").length;
					var index = $("#nav-words-container p.activ").index() + 1;
					if(length <= index){
						round = 5;
						thirdCycle = false;
						nextStep();	
						return;
					}else{			
						if( snd_id < 1 && thd_id < 1){
							$("#nav-words-container-thd p").removeClass('pulse');
							$("#nav-words-container-thd p").removeClass("activ");
							var id = ($("#nav-words-container p").eq(index)).data('word-id');
							setActWord(id);
							setNavWordPosition(index);
							$("#nav-words-container p").removeClass("activ");
							$("#nav-words-container p").removeClass("pulse");
							$("#nav-words-container p").eq(index).addClass("activ");
							$("#nav-words-container p").eq(index).addClass("pulse");
						}else{
							$("#nav-words-container p").removeClass("pulse");
							if(thd_id > 0){
								repeatThrid(thd_id);
								thd_id = 0;
								return;
							}
							if(snd_id > 0){
								repeatThrid(snd_id);
								temp_id = snd_id;
								snd_id = 0;
								return;
							}		
						}
					}
				}else{
					prepareToThird = 0;
				}
				
				var index = $("#nav-words-container p.activ").index();
				var id = ($("#nav-words-container p").eq(index)).data('word-id');
				setActWord(id);
				setNavWordPosition(index);
				setTimeout(function(){
					setWordToMethod(1);
				}, 100);
				nbMethod = 5;
				nbStep = 1;
			}else if(nbStep == 1){
				$("#nav-words-container p.activ").eq(index).addClass("pulse");
				//saveNotice($("#confirm-text-1").val());
				var id = ($("#nav-words-container p").eq(index)).data('word-id');
				setTimeout(function(){
					setWordToMethod(6);
				}, 100);
				nbStep = 0;
				thd_id = temp_id;
				snd_id = fst_id;
				fst_id = 0;
				temp_id = 0;
			}else{
				round = 5;
				thirdCycle = false;
				nextStep();
				return;
			}		
		}else{
			updateThirdNav();
			if(thd_id > 0){
				repeatThrid(thd_id);
				thd_id = 0;
				return;
			}
			if(snd_id > 0){
				repeatThrid(snd_id);
				temp_id = snd_id;
				snd_id = 0;
				return;
			}
			if(fst_id > 0){
				repeatThrid(fst_id);
				fin_id = fst_id;
				fst_id = 0;
				return;
			}
			if(temp_id > 0){
				repeatThrid(temp_id);
				temp_id = 0;
				return;
			}
			if(fin_id > 0){
				repeatThrid(fin_id);
				fin_id = 0;
				return;
			}
			thirdCycle = false;
			nextStep();
			return;
		}
	}else{
		nextPack();
	}
}

function nextPack(){
	packControler();
}

var fst_id = 0;
var snd_id = 0;
var thd_id = 0;
var temp_id = 0;
var fin_id = 0;

function repeatThrid(id){
	setTimeout(function(){
		clearDraggableField();
		setActWord(id);
		setTimeout(function(){
			setWordToMethod(5);
			pulseThdNav(id);
		}, 200);
	}, 200);
}

function updateThirdNav(){
	var i = 1;
	var ids = [];
	ids.push(fst_id);
	ids.push(snd_id);
	ids.push(thd_id);
	ids.push(temp_id);
	ids.push(fin_id);
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

function showNote(x){
	var target = "#l-n-" + x;
	var target2 = "#l-t-" + x;
	var targetE = "#l-e-" + x;
	$(target2).hide();
	if($(target).is(":visible") == true){
		$(target).hide();
		$(targetE).show();
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

function tellMeNow(obj){
	var par = $(obj).parent().parent();
	if(parseInt(par.css('top')) == 0){
		tellMe();
	}
}

function prepareGlobalForCycle(i){
	switch(i){
		case 1:
			round = 1;
			nbMethod = 2;
			isPreparetoFirst = false;
			firstCycle = true;
			secondCycle = false;
			thirdCycle = false;
			break;
		case 2:
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
			break;
	}
	$("#nav-words-container p").removeClass("activ");
	$("#nav-words-container p").removeClass("pulse");
	$("#nav-words-container p").eq(0).addClass("activ");
	$("#nav-words-container p").eq(0).addClass("pulse");
}

var continueLearning = false;
function packControler(){
	var endThis = false;
	for(var i = 0; i < 10 && !endThis; i++){
		continueLearning = false;
		if(toLearn[i] != -1){
			setEveryThingToStartCat(toLearn[i]);
			endThis = true;
			continueLearning = true;
			toLearn[i] = -1;
			switch(i) {
			case 0:
				prepareGlobalForCycle(1);
				setTimeout(function(){ nextStep();}, 300);
				break;
			case 1:
				prepareGlobalForCycle(2);
				setTimeout(function(){ nextStep();}, 300);
				break;
			case 2:
				prepareGlobalForCycle(2);
				setTimeout(function(){ nextStep();}, 300);
				break;
			case 3:
				prepareGlobalForCycle(3);
				setTimeout(function(){ nextStep();}, 300);
				break;
			case 4:
				prepareGlobalForCycle(2);
				setTimeout(function(){ nextStep();}, 300);
				break;
			case 5:
				prepareGlobalForCycle(3);
				setTimeout(function(){ nextStep();}, 300);
				break;
			case 6:
				prepareGlobalForCycle(3);
				setTimeout(function(){ nextStep();}, 300);
				break;
			case 7:
				prepareGlobalForCycle(3);
				setTimeout(function(){ nextStep();}, 300);
				break;
			case 8:
				prepareGlobalForCycle(1);
				setTimeout(function(){ nextStep();}, 300);
				break;
			case 9:
				prepareGlobalForCycle(2);
				setTimeout(function(){ nextStep();}, 300);
				break;
			default:
				break;
			} 
		}
	}
	if(!continueLearning){
		saveDay();
		setTimeout(function(){ 
			datesJSON = toLearnJSON;
			srcSave = path() + "save.json";
			saveFile();
		}, 200);
		alert("NA DZISIAJ KONIEC:)");
	}
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