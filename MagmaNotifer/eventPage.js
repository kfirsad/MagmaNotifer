var dayTimeAudio = new Audio(chrome.runtime.getURL("dayNote.mp3"));
var nightTimeAudio = new Audio(chrome.runtime.getURL("nightNote.mp3"));
myAudio = dayTimeAudio;

var toggle;
var isInsideMagma;
var audioPlayed = false;
var timer = null;

var currentTimeHours;
var currentTimeMinutes;
var nightHours = [23, 00, 01, 02, 03, 04, 05, 06];
var isNightTime;
var inAnotherTab;
var magmaTabId;

startSystem();

function on(){
	toggle = true;
	console.log("Toggle on");
}

function off(){
	toggle = false;
	if(!myAudio.paused || myAudio.currentTime){
stopAudio();
			}
	console.log("Toggle off");
}

	function startSystem(){
	if(toggle){
		
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
	 console.log(activeTab.url);
	 if(activeTab.url.startsWith("https://estymbra.com/MDZ0311/Pages/Inbox/Inbox.aspx") && activeTab.url.slice(-1) == '0'){
		 magmaTabId = activeTab.id;
	  console.log("User inside Magma");
		refreshPage();
	  isInsideMagma = true;
	  lookForMesseages();
	 }else{
		isInsideMagma = false;
			if(!myAudio.paused || myAudio.currentTime){
stopAudio();	}
	
		chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){

		if(changeInfo.status == 'complete' && tab.url.startsWith("https://estymbra.com/MDZ0311/Pages/Inbox/Inbox.aspx") && tab.url.slice(-1) == '0'){
			magmaTabId = tab.id;
		console.log("User inside Magma");
		isInsideMagma = true;
		lookForMesseages();
  }else{
			var check = false;
			
			chrome.tabs.query({
				active: true,               // Select active tabs
				lastFocusedWindow: true     // In the current window
			  }, function(tabs){
			for (tab of tabs){
				console.log(tab.id + " and " + magmaTabId);
					if (tab.id == magmaTabId){
						check = true;
						break;
					}
			}


			
			chrome.tabs.query({
			active: false,               // Select active tabs
			lastFocusedWindow: true     // In the current window
			  }, function(tabs){
			for (tab of tabs){
				console.log(tab.id + " and " + magmaTabId);
					if (tab.id == magmaTabId){
						check = true;
						break;
					}
			}


			
			if(check){
				isInsideMagma = true;
				console.log("User updated tabs but Magma still opened.");
			}else{
				isInsideMagma = false;
				console.log("User updated tabs and left Magma.");
				
		}
					});	
								});	
		}
		});
	 }
	});

	}else{
			if(!myAudio.paused || myAudio.currentTime){
			stopAudio();	}
	}

	}

var activeTabId;
var activeTab;
var check;

function lookForMesseages(){

		chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){

		if(tab.url.startsWith("https://estymbra.com/MDZ0311/Pages/Inbox/Inbox.aspx") && tab.url.slice(-1) == '0'){
			magmaTabId = tab.id;
			isInsideMagma = true;
			console.log("User is inside Magma");

		}else{
			
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

      activeTab = tabs[0];
	  console.log(tabs[0].url);
	  
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
			console.log("User updated tabs and left Magma.");
		}
		
		  });

		}

  });			

		}});
		
	chrome.tabs.onActivated.addListener(function(info) {
    var tab = chrome.tabs.get(info.tabId, function(tab) {
     var currentTab = tab;
    
	 console.log(currentTab.url);
	 if(currentTab.url.startsWith("https://estymbra.com/MDZ0311/Pages/Inbox/Inbox.aspx") && currentTab.url.slice(-1) == '0'){
			magmaTabId = currentTab.id;
			isInsideMagma = true;
			inAnotherTab = false;

			console.log("User is inside Magma Tab");

		}else{
			inAnotherTab = true;
  
			console.log("User is in another tab");
		}
		});
		});
		
	chrome.tabs.onRemoved.addListener(function(tabid, removed) {
	if(tabid == magmaTabId){
			isInsideMagma = false;
			inAnotherTab = false;
			
			stopAudio();
			
			console.log("Magma tab removed");

		}
		})

	var interval = setInterval(function(){ // Start loop

		whatHourIsIt();
		
		if(nightHours.includes(currentTimeHours)){
			if(myAudio != nightTimeAudio){
							myAudio = nightTimeAudio
							myAudio.loop = true;
			}

		}else{
			if(myAudio != dayTimeAudio){
							myAudio = dayTimeAudio
							myAudio.loop = false;
			}		}
	
		
		 if(isInsideMagma && toggle){
			 console.log("Loop checker started");

		chrome.tabs.executeScript(magmaTabId, {
	code: 'document.getElementById("newArticleCount").innerText'
  }, numberNotifer);
	}else if(!inAnotherTab){

	  	if(!myAudio.paused || myAudio.currentTime){
			stopAudio();
  }
		 }
		 
		 if(!audioPlayed && timer == null){
			 timer = window.setTimeout(refreshPage, 210000);
			 console.log(timer);
		 }
		 
		 if(audioPlayed){
			window.clearTimeout(timer); 
			audioPlayed = false;
			timer = window.setTimeout(refreshPage, 210000);
		 }
	}, 70000 /* check every minute and a half */);
}


function refreshPage(){
				window.clearTimeout(timer); 
			audioPlayed = false;
		  chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
    chrome.tabs.reload(arrayOfTabs[0].id);
		console.log("Website refreshed");
});
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

function articleShowing(results){
	var result = results;
	console.log(result);
	if(result[0] != null){
		console.log("There are articles showing");
		myAudio.play();
		audioPlayed = true;

}else{
	if(!myAudio.paused || myAudio.currentTime){
stopAudio();
			}}
}

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
  
  //currentTimeHours = '23'; //Debug for time
  
}

function stopAudio(){
				myAudio.pause();
			myAudio.currentTime = 0;

			dayTimeAudio.pause();
			dayTimeAudio.currentTime = 0;

			nightTimeAudio.pause();
			nightTimeAudio.currentTime = 0;
}

