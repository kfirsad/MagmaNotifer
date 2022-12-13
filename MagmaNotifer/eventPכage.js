var dayTimeAudio = new Audio(chrome.runtime.getURL("dayNote.mp3"));
dayTimeAudio.loop = false;

var nightTimeAudio = new Audio(chrome.runtime.getURL("nightNote.mp3"));
nightTimeAudio.loop = true;

myAudio = dayTimeAudio;

var toggle = on;
var isInsideMagma;
var audioPlayed = false;
var timer = null;

var currentTimeHours;
var currentTimeMinutes;
var nightHours = [23, 00, 01, 02, 03, 04, 05, 06];
var isNightTime;
var inAnotherTab;
var magmaTabId;
var loopInterval = null;
var loopCheckerArray = [];

startSystem();


function on(){
	toggle = true;

	console.log("Toggle on");
}

function off(){
	toggle = false;
stopAudio();
			
	console.log("Toggle off");
}

	function startSystem(){
	if(toggle){
	audioPlayed = false;
	window.clearTimeout(timer); 
	timer = null;
	console.log("Toggle is on. Starting");

		whatHourIsIt();
		
		if(nightHours.includes(currentTimeHours)){
			if(myAudio != nightTimeAudio){
							myAudio = nightTimeAudio
			}

		}else{
			if(myAudio != dayTimeAudio){
							myAudio = dayTimeAudio
			}		}
	
	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
     var activeTab = tabs[0];
	 if(activeTab.url.startsWith("https://estymbra.com/MDZ0311/Pages/Inbox/Inbox.aspx") && activeTab.url.slice(-1) == '0'){
		 magmaTabId = activeTab.id;
	  console.log("User inside Magma");
		refreshPage();
	  isInsideMagma = true;
	  lookForMesseages();
	 }
	 
	 	});
		
		chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){

		if(changeInfo.status == 'complete' && tab.url.startsWith("https://estymbra.com/MDZ0311/Pages/Inbox/Inbox.aspx") && tab.url.slice(-1) == '0'){
			magmaTabId = tab.id;
		console.log("User inside Magma");
		isInsideMagma = true;
		lookForMesseages();
  }		

	  		});
			
			var check = false;
			
			chrome.tabs.query({
				active: true,               // Select active tabs
				lastFocusedWindow: true     // In the current window
			  }, function(tabs){
			for (tab of tabs){
			if(tab.url.startsWith("https://estymbra.com/MDZ0311/Pages/Inbox/Inbox.aspx") && tab.url.slice(-1) == '0'){
				magmaTabId = tab.id;
				 check = true;
						break;
					}
			}


			
			chrome.tabs.query({
			active: false,               // Select active tabs
			lastFocusedWindow: true     // In the current window
			  }, function(tabs){
			for (tab of tabs){
			if(tab.url.startsWith("https://estymbra.com/MDZ0311/Pages/Inbox/Inbox.aspx") && tab.url.slice(-1) == '0'){
				magmaTabId = tab.id;
				 check = true;
						break;
					}
			}


			
			if(check){
				isInsideMagma = true;
	  lookForMesseages();
				console.log("Magma opened in the browser.");
			}else{
				isInsideMagma = false;
				audioPlayed = false;
				window.clearTimeout(timer); 
				timer = null;
				stopAudio();
clearLoopChecker()
				console.log("User updated tabs and left Magma.");
				
		}
					});	
								});	


	}
	}

var activeTabId;
var activeTab;
var check;

function lookForMesseages(){
clearLoopChecker();

		chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){

		if(tab.url.startsWith("https://estymbra.com/MDZ0311/Pages/Inbox/Inbox.aspx") && tab.url.slice(-1) == '0'){
			magmaTabId = tab.id;
			isInsideMagma = true;
			audioPlayed = false;
			window.clearTimeout(timer); 
			timer = null;
			console.log("User is inside Magma");

		}else{
			
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

      activeTab = tabs[0];
	  
	  if(tabs[0].url.startsWith("https://estymbra.com/MDZ0311/Pages/Inbox/Inbox.aspx") && tabs[0].url.slice(-1) == '0'){
		  magmaTabId = tabs[0].id;
		 isInsideMagma = true;
		console.log("User updated tabs but Magma still opened.");
	  }else{
		chrome.tabs.query({active: false, currentWindow: true}, function(tabs) {
			check = false;
		for (tab of tabs){
			if(tab.url.startsWith("https://estymbra.com/MDZ0311/Pages/Inbox/Inbox.aspx") && tab.url.slice(-1) == '0'){
				magmaTabId = tab.id;
				check = true;
				activeTab = tab;
				console.log("User updated tabs but Magma still opened.");
				break;
			}
		}
		
		if(!check){
			isInsideMagma = false;
			audioPlayed = false;
			window.clearTimeout(timer); 
			timer = null;
			stopAudio();
clearLoopChecker()
			console.log("User updated tabs and left Magma.");
		}
		
		  });

		}

  });			

		}});
		
	chrome.tabs.onActivated.addListener(function(info) {
    var tab = chrome.tabs.get(info.tabId, function(tab) {
     var currentTab = tab;
    
	if(currentTab.url.startsWith("https://estymbra.com/MDZ0311/Pages/Inbox/Inbox.aspx") && currentTab.url.slice(-1) == '0'){
			magmaTabId = currentTab.id;
			isInsideMagma = true;
			inAnotherTab = false;

			console.log("User is inside Magma Tab");

		}else{
  

			var check = false;
			
			chrome.tabs.query({
				active: true,               // Select active tabs
				lastFocusedWindow: true     // In the current window
			  }, function(tabs){
			for (tab of tabs){
			if(tab.url.startsWith("https://estymbra.com/MDZ0311/Pages/Inbox/Inbox.aspx") && tab.url.slice(-1) == '0'){
				magmaTabId = tab.id;
				 check = true;
						break;
					}
			}


			
			chrome.tabs.query({
			active: false,               // Select active tabs
			lastFocusedWindow: true     // In the current window
			  }, function(tabs){
			for (tab of tabs){
			if(tab.url.startsWith("https://estymbra.com/MDZ0311/Pages/Inbox/Inbox.aspx") && tab.url.slice(-1) == '0'){
				magmaTabId = tab.id;
				 check = true;
						break;
					}
			}


			
			if(check){
			isInsideMagma = true;
			inAnotherTab = true;
  
			console.log("User is in another tab");
			}else{
				isInsideMagma = false;
				audioPlayed = false;
				window.clearTimeout(timer); 
				timer = null;
				stopAudio();
clearLoopChecker()
				console.log("User updated tabs and left Magma.");
				
		}
					});	
								});	
		}

	  		});

		
		});
		
		
	chrome.tabs.onRemoved.addListener(function(tabid, removed) {
	if(tabid == magmaTabId){
			isInsideMagma = false;
			inAnotherTab = false;
			audioPlayed = false;
			window.clearTimeout(timer); 
			timer = null;
			
			stopAudio();
clearLoopChecker()
			
			console.log("Magma tab removed");

		}
		})
		
loopChecker();

loopInterval = setInterval(loopChecker, 70000);

loopCheckerArray.push(loopInterval);

}

function clearLoopChecker(){
for ( var i = 0; i < intervalsArticels.length; ++i ){
  clearInterval( intervalsArticels[i] );
}
}

function loopChecker(){
	
		whatHourIsIt();
		
		if(nightHours.includes(currentTimeHours)){
			if(myAudio != nightTimeAudio){
							myAudio = nightTimeAudio;
							nightTimeAudio.loop = true;
							myAudio.loop = true;
			}

		}else{
			if(myAudio != dayTimeAudio){
							myAudio = dayTimeAudio;
							dayTimeAudio.loop = false;
							myAudio.loop = false;
			}		}
	
		
	if(isInsideMagma && toggle){
			 console.log("Loop checker started");

		chrome.tabs.executeScript(magmaTabId, {
	code: 'document.getElementById("newArticleCount").innerText'
  }, numberNotifer);
	}else if(!inAnotherTab){
			stopAudio();
		 }
		 
		 if(!audioPlayed && timer == null){
			 timer = window.setTimeout(refreshPage, 210000); /* reload every 3 minutes */
			  console.log("Refresh timer running (" + timer + ")");
		 }
		 
		 if(audioPlayed){
			window.clearTimeout(timer); 
			audioPlayed = false;
			timer = window.setTimeout(refreshPage, 210000);
			console.log("Refresh timer running (" + timer + ")");
		 }
		 
		 
}

function refreshPage(){
	window.clearTimeout(timer); 
	timer = null
	audioPlayed = false;
    chrome.tabs.reload(magmaTabId);
		console.log("Website refreshed");

}

function numberNotifer(results){
	var result = results;
	console.log(result);
	if(result != ""){
		if(result >= 1){
		console.log("There are updates");
		myAudio.play();
		audioPlayed = true;
	
}
	}else{
	chrome.tabs.executeScript(magmaTabId, {
	code: 'document.getElementById("otitle")'
  }, articleShowing);
}
}

var checkIfRemoved;
var intervalsArticels = [];
var resultLength;

function articleShowing(results){
	//resultLength = results[0].length;
	console.log(results);
	if(results[0] != null){
		// checkIfRemoved = setInterval(test, 3000);
      // intervalsArticels.push(checkIfRemoved);
		console.log("There are articles showing");
		myAudio.play();
		audioPlayed = true;

}else{

stopAudio();
			}
}

// function test(){
	// chrome.tabs.executeScript(magmaTabId, {
	// code: 'document.getElementById("otitle")'
  // }, checkIfArticleShowingRemoved);
// }

// function checkIfArticleShowingRemoved(resultsNew){
	// console.log(resultsNew + " Checking if article removed");
	// if(resultsNew[0] == null || resultsNew[0].length < resultLength){
		// console.log("One or more articles removed");
		// for ( var i = 0; i < intervalsArticels.length; ++i ){
  // clearInterval( intervalsArticels[i] );
		// }
// stopAudio();
	// }
// }

function changeTimeZone(date, timeZone) {
  if (typeof date === 'string') {
    return new Date(
      new Date(date).toLocaleString('en-US', {
        timeZone,
      }),
    );
  }

  return new Date(
    date.toLocaleString('en-US', {
      timeZone,
    }),
  );
}

function whatHourIsIt() {

  date = changeTimeZone(new Date(), 'Asia/Jerusalem');

  currentTimeHours = date.getHours();
  
  //currentTimeHours = 23; //Debug for time
  
}

function stopAudio(){
			myAudio.pause();
			myAudio.currentTime = 0;

			dayTimeAudio.pause();
			dayTimeAudio.currentTime = 0;

			nightTimeAudio.pause();
			nightTimeAudio.currentTime = 0;
						
			console.log("Audio Stopped");		
	
}

