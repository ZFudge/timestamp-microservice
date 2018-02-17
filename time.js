var http = require('http');
var url = require('url');

var server = http.createServer(function(req, res) {
    var obj = url.parse(req.url, true);
    var path = obj.path.replace(/\//, "");
    var time = {
    	"unixtime": null,
    	"natural": null
    };
    
    if (!isNaN(path)) {
		time.unixtime = Number(path);
		time.natural = unixToNatural(Number(path))
    } else if (valiDate(path)) {

    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(time));
}).listen(1337, "localhost");

function valiDate(date) {
	return false;
}

var unixToNatural = (n) => new Date(n*1000);
