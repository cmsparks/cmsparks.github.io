function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
console.log(httpGet("https://www.ctabustracker.com/bustime/api/v2/gettime?key=tZWNpjTrjnM5rMh8xLpeM8X95"))