// Variables
var showLinkTimeout;

// nl2br from php.js
function nl2br (str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}
// Function to get text from master gist
function getText ( ) {
	// Set variables
	var url = "https://gist.githubusercontent.com/beeell2/21b45de1976c4e9ccec8b1d4f16f1124/raw/";
	var data = 0;

	// Loading text
	document.getElementById("textget").innerHTML = "Loading...";

	// Get gist
	var request = new XMLHttpRequest();
	request.open( "GET" , url, true);
	request.send(null);
	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.status == 200) {
			clearTimeout(showLinkTimeout);
			data = request.responseText;
			document.getElementById("textget").innerHTML = nl2br(data,false);
		} else {
			console.warn("Error in getting text.");
			document.getElementById("textget").innerHTML = "Failed to load content<br /> Go to the following link instead<br /> <a href='https://goo.gl/STf6NB'>https://goo.gl/STf6NB</a>";
			return ("fail");
		}
	}

	return 0;
}

function showLink() {
  document.getElementById("textget").innerHTML = "Loading...<br />It's taking a while<br /> Alternate link:<br /> <a href='https://goo.gl/Hh3P3S'>https://goo.gl/Hh3P3S</a>";
}

// Document loaded start script

document.addEventListener('DOMContentLoaded', function() {
	// Hide nojs warning and show getText div
	document.getElementById("nojs").style.display="none";
	document.getElementById("textget").style.display="block";
	// Set timeout
	var showLinkTimeout = setTimeout(showLink(),5000);
	// Get text
	getText();
}, false);
