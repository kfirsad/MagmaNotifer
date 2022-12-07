var bgPage = chrome.extension.getBackgroundPage();

var windowToggle = {

        onHandler : function(e) {
			bgPage.on();
			bgPage.startSystem();
			window.close();
        },

        offHandler : function(e) {
			bgPage.off();
            window.close();
        },

        setup: function() {
            var a = document.getElementById('windowToggleOn');
            a.addEventListener('click',  windowToggle.onHandler );
            var a = document.getElementById('windowToggleOff');
            a.addEventListener('click',  windowToggle.offHandler );
        }
};

document.addEventListener('DOMContentLoaded', function () {
    windowToggle.setup();
});

