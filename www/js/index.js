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
			var tmp = '<div><h1 class="text expand" onclick="expand(this);">'+ lang.label + '</h1><div class="list-of-lang">';
			for(var y in langs){
				var langTmp = langs[y];
				if(y != x) tmp += '<p class="text setLang" onclick="setLang(this);" data-mylang="' + lang.id + '" data-learnlang="' + langTmp.id + '">' + langTmp.name + '</p>';
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
			var tmp = '<div><h1 class="text expand" onclick="expand(this);">'+ cat.name + '</h1>';
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
			tmp += '<p class="text setCat" onclick="setCat(this);" data-name="' + cat.name + '" data-parent="' + parent + '" data-subcat="' + cat.id + '">' + cat.name + '</p>';
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
	$("#my-trans").focus();
	var i = 0;
	var firstId = -1;
	$(".word").each(function(index){
		if($(this).attr('data-check') != 0){
			i++;
			var id = $(this).data('id');
			if(i == 1) firstId = id;
			//$("#nav-words-container").append('<p onclick="setWordToLearn(' + id + ', this)" data-word-id="' + id + '"><img src="img/nav-bg.png" class="no-activ-img"><img src="img/nav-bg-activ.png" class="activ-img"><span>' + i + '</span></p>');
			$("#nav-words-container").append('<p data-word-id="' + id + '"><img src="img/nav-bg.png" class="no-activ-img"><img src="img/nav-bg-activ.png" class="activ-img"><span>' + i + '</span></p>');
		}
	});
	setTimeout(function(){setWordToLearn(firstId, $("#nav-words-container p").eq(0)); $("#my-trans").focus(); setNavWordPosition(0);}, 50);
	
}

function setNavWordPosition(i){
	var j;
	if(i==0) j=3;
	else{ j=i+2; i--;}

	$('#nav-words-container p').hide().slice(i, j).show();
}

/*SET WORD TO LEARN*/
function setWordToLearn(id, obj){
	$("#nav-words-container p").removeClass("activ");
	$(obj).addClass("activ");
	$("#word-lern-1").fadeOut().fadeIn();
	var curWord = setWordById(id); 
	var curTrans = "tłumaczenie";//setTransById(id);
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
	saveNotice();
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
	for(var x in trans){
		var word = trans[x];
		if(word.id == id) {
			$("#cur-word").html(word.name);		
		}
	}
}

function setNoteById(id){
	$("#my-text").val("");
	var lang = $("#learnLang").val();
	var result = "";
	for(var x in words){
		var word = words[x];
		if(word.id == id) {
			for(var n in word.notices){
			//	alert(word.notices[n].idLang + " -> " + lang);
				if(word.notices[n].idLang == lang){
				//	alert(word.notices[n].text);
					$("#my-text").val(word.notices[n].text);
				}
			}
		}
	}
}

function setTransById(id){
	for(var x in words){
		var word = words[x];
		if(word.id == id) {
			return (word.name);				
		}
	}
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
function saveNotice(){
	var text = $('#my-text').val();
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