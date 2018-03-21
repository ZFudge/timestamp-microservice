var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function(req, res) {
    var obj = url.parse(req.url, true);
    var path = obj.path.replace(/\//, "");
    
    if (path === "") {
    	fs.readFile('./index.html', function (err, html) {
		    if (err) throw err; 
	        res.writeHeader(200, {"Content-Type": "text/html"});  
	        res.write(html);  
	        res.end();  
		});
    } else {
    	var time = { "unixtime": null, "natural": null };
    	if (!isNaN(path)) {
			time.unixtime = Number(path);
			time.natural = unixToNatural(Number(path))
	    } else if (valiDate(path)) {
	    	var str = path.split("%20");
	    	var date = new Date(str[2], months.indexOf(str[0]), str[1].replace(",",""), 0, 0, 0, 0);
	    	console.log(date, str[2], months.indexOf(str[0]), str[1])
			time.unixtime = date.getTime() / 1000;
			time.natural = path.replace(/%20/g, " ");
	    }
	    res.writeHead(200, { 'Content-Type': 'application/json' });
	    res.end(JSON.stringify(time));
	}
}).listen(1337, "localhost");

function valiDate(path) {
	return months.includes(path.split("%20")[0]);
}

var unixToNatural = (n) => {
	var date = new Date(n*1000);
	var natural = "";
	natural += months[date.getMonth()] + " ";
	natural += date.getDate() + ", ";
	natural += date.getFullYear();
	return natural;
}

var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



