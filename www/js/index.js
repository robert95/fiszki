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

/* GET LANG LIST */
var res = false;
var srcFile = false;
function getLangList(){
	srcFile = path() + "lang.json";
	readWriteFile();
	showLangList();
}
function showLangList(){
	if(!res){
        setTimeout(showLangList, 50);
    }else{	
		var langs = JSON.parse(res);
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
}
/* END GET LAND LIST */

/* GET CAT LIST */
var subcats = false;
function getCatList(){
	res = false;
	srcFile = false;
	var idCat = $("#myLang").val();
	srcFile = path() + idCat + "/cat.json";
	readWriteFile();
	showCatList();
}
function showCatList(){
	if(!res){
        setTimeout(showCatList, 50);
    }else{	
		var cats = JSON.parse(res);
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
}
/* END GET CAT LIST */

/* GET SUBCAT LIST */
var parent = false;
function getSubCatList(idCat){
	res = false;
	srcFile = false;
	var idLang = $("#myLang").val();
	srcFile = path() + idLang + "/" + idCat + "/subcat.json";
	readWriteFile();
	parent = idCat;
	showSubCatList();
}
function showSubCatList(){
	if(!res){
        setTimeout(showSubCatList, 50);
    }else{
		var cats = JSON.parse(res);
		var tmp = '<div class="list-of-subcat">';
		for(var x in cats){
			var cat = cats[x];
			tmp += '<p class="text setCat" ontouchstart="setCat(this);" data-name="' + cat.name + '" data-parent="' + parent + '" data-subcat="' + cat.id + '">' + cat.name + '</p>';
		}
		tmp += '</div>';
		subcats = tmp;
	}
}
/* END GET SUBCAT LIST */

/* GET WORD LIST */
var idWord = false;
var nameWord = false;
var srcFileWordList = false;
function getWordList(){
	res = false;
	//resL = false;
	srcFile = false;
	var idLang = $("#myLang").val();
	var idParentCat = $("#myParentCat").val();
	var idSubCat = $("#myCat").val();
	var idLernLang = $("#learnLang").val();
	srcFile = path() + idLang + "/" + idParentCat + "/" + idSubCat + "/words.json";
	srcFileWordList = srcFile;
	//srcFileL = path() + idLernLang + "/" + idParentCat + "/" + idSubCat + "/words.json";
	readWriteFile();
	wrapShowWordList();
}
var resL = false;
function wrapShowWordList(){
	if(!res){
		setTimeout(wrapShowWordList, 50);
	}else{
		resL = res;
		res = false;
		var idLang = $("#myLang").val();
		var idParentCat = $("#myParentCat").val();
		var idSubCat = $("#myCat").val();
		var idLernLang = $("#learnLang").val();
		srcFile = path() + idLernLang + "/" + idParentCat + "/" + idSubCat + "/words.json";
		readWriteFile();
		showWordList();
	}
}
var words, trans;
function showWordList(){
	if(!res){
        setTimeout(showWordList, 50);
    }else{
		words = JSON.parse(resL);
		trans = JSON.parse(res);
		$("#words").html("");
		var tmp = "";
		for(var x in words){
			nameWord = false;
			var word = words[x];
			var tran = trans[x];
			tmp += '<div class="word" data-id="' + word.id + '" data-check="1" onclick="checkWord(this);"><table><tr><td><p class="text">' + word.name + '</p></td><td rowspan="2"><img src="img/check.png"></td></tr><tr><td><p class="text">' + tran.name + '</p></td></tr></table></div>';
		}
		$("#words").html(tmp);
	}
}
/* END GET WORD LIST */

/* GET NAV WORD LIST */
function getNavWordList(){
	//$("#my-trans").focus();
	var i = 0;
	var firstId = -1;
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
	setTimeout(function(){
		$("#nav-words-container p").eq(0).addClass("activ");
		$("#nav-words-container p").eq(0).addClass("pulse");
		setWordToMethod(2)
		setNavWordPosition(0);
		tellMe();
	}, 50);
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
	//$("#my-text").val("");
	var lang = $("#learnLang").val();
	var result = "";
	for(var x in words){
		var word = words[x];
		if(word.id == id) {
			for(var n in word.notices){
				if(word.notices[n].idLang == lang){
					act_text = word.notices[n].text;
				}
			}
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
	$("#my-trans").focus();
	var id = $("#idWord").val();
	var idLang = $("#learnLang").val();
	var idParentCat = $("#myParentCat").val();
	var idSubCat = $("#myCat").val();
	var src = path() + idLang + "/" + idParentCat + "/" + idSubCat + "/sound/" + id + ".m4a";
	var my_media = new Media(src,
            // success callback
             function () { console.log("playAudio():Audio Success"); },
            // error callback
             function (err) { console.log("playAudio():Audio Error: " + err); }
    );
           // Play audio
    my_media.play();
	$("#my-trans").focus();
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
	//var text = $('#my-text').val();
	var id = $('#idWord').val();
	var lang = $("#learnLang").val();
	
	for(var x in words){
		var word = words[x];
		if(word.id == id) {
			var add = false;
			for(var n in word.notices){
				if(word.notices[n].idLang == lang){
					word.notices[n].text = text;
					add = true;
				}
			}
			if(!add) word.notices.push({"idLang": lang, "text": text});
		}
	}
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSN, failN);
}

function gotFSN(fileSystem) {
	fileSystem.root.getFile(srcFileWordList, {create: false}, gotFileEntryN, failN);
}

function gotFileEntryN(fileEntry) {
	fileEntry.createWriter(gotFileWriterN, failN);
}

function gotFileWriterN(writer) {
	writer.onwrite = function(evt) {
		console.log("write success");
	};

	writer.write(JSON.stringify(words));
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
var act_text = "a";

function setWordToMethod(idM){
	$(".learnMethod").hide();
	switch(idM) {
		case 1:
			$("#confirm-correct-1").text(act_word);
			$("#confirm-trans-1").text(act_trans);
			break;
		case 2:
			$("#confirm-correct-2").text(act_word);
			$("#confirm-trans-2").text(act_trans);
			$("#confirm-text-2").val(act_text);			
			break;
		case 3:
			$("#question-3").val("");
			break;
		case 4:
			tellMe();
			$("#confirm-correct-4").text(act_word);
			$("#confirm-trans-4").text("");
			$("#confirm-text-4").val(act_text);			
			break;
		case 5:
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
function nextStep(){
	if(canNextStep == 2){
		noPlus = 1;
		canNextStep = 1;
	}
	if(canNextStep == 0){
		noLearnt();
		return;
	}
	setTimeout(function(){
		clearDraggableField();
	}, 700);
	if(round == 1){
		if(nbMethod == 2){
			nbMethod = 3;
			setWordToMethod(3);
		}else if(nbMethod == 3){
			saveNotice($("#confirm-text-2").val());
			nbMethod = 2;
			var length = $("#nav-words-container p").length;
			var index = $("#nav-words-container p.activ").index() + 1;
			if(length <= index){
				round = 2;
				nextStep();
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
	}else if(round == 2){
		var id = ($("#nav-words-container p").eq(0)).data('word-id');
		setActWord(id);
		setNavWordPosition(1);
		$("#nav-words-container p").removeClass("activ");
		$("#nav-words-container p").removeClass("pulse");
		$("#nav-words-container p").eq(0).addClass("activ");
		$("#nav-words-container p").eq(0).addClass("pulse");
		setTimeout(function(){
			setWordToMethod(4);
		}, 100);
		round = 3;
		nbMethod = 4;
	}else if(round == 3){
		if(nbMethod == 4 && nbStep == 0){
			saveNotice($("#confirm-text-4").val());
			var length = $("#nav-words-container p").length;
			if(noPlus == 0 ) var index = $("#nav-words-container p.activ").index() + 1;
			else{
				var index = $("#nav-words-container p.activ").index();
				noPlus = 0;
			}
			if(length <= index){
				round = 4;
				nextStep();
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
				}, 100);
				nbMethod = 4;
				nbStep = 1;
			}
		}else if(nbMethod == 4 && nbStep != 0){
			saveNotice($("#confirm-text-4").val());
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
		}		
	}else{
		alert("KONIEC!!!");
	}
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