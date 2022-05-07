/*! Minimalist Web Notepad | https://github.com/pereorga/minimalist-web-notepad */

function uploadContent() {

    // If textarea value changes.
    if (content !== textarea.value) {
        var temp = textarea.value;
        var request = new XMLHttpRequest();

        request.open('POST', window.location.href, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.onload = function() {
            if (request.readyState === 4) {

                // Request has ended, check again after 1 second.
                content = temp;
                setTimeout(uploadContent, 1000);
            }
        }
        request.onerror = function() {

            // Try again after 1 second.
            setTimeout(uploadContent, 1000);
        }
        request.send('text=' + encodeURIComponent(temp));

        // Make the content available to print.
        printable.removeChild(printable.firstChild);
        printable.appendChild(document.createTextNode(temp));
    }
    else {

        // Content has not changed, check again after 1 second.
        setTimeout(uploadContent, 1000);
    }
}

var textarea = document.getElementById('content');
var printable = document.getElementById('printable');
var content = textarea.value;

// Make the content available to print.
printable.appendChild(document.createTextNode(content));

textarea.focus();
uploadContent();

// Setup the Write switcher for textarea

var writeSwitch = document.getElementById("writeable");

function makeWriteable(){
    if(writeSwitch.checked == true){
        textarea.readOnly = false;
        textarea.style.borderColor = "#0066CC";
    } else {
        textarea.readOnly = true;
        textarea.style.borderColor = "#ddd";
    }
}

writeSwitch.addEventListener("click", makeWriteable);

//open write mode if nothing in content
if (textarea.value.trim().length == 0){
    writeSwitch.checked = true
    makeWriteable()
}