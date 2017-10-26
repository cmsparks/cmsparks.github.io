console.log("loaded test");
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
console.log(httpGet("https://www.ctabustracker.com/bustime/api/v2/gettime?key=tZWNpjTrjnM5rMh8xLpeM8X95"));
console.log("finished http get");