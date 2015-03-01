
// Exercise 1: HELLO WORLD
//console.log('HELLO WORLD');

// Exercise 2: BABY STEPS
//console.log(process.argv);

// var total = 0;
// for (var i = 2; i < process.argv.length; i++) {
// 	//total = total+ Number(process.argv[i]);
// 	// another way to write it is...
// 	total += Number(process.argv[i]);
// };
// console.log(total);

// Exercise 3: MY FIRST I/O!
// var filenameStr = process.argv[2];
// //console.log(filenameStr);

// var fs = require('fs');
// var fileBufferObj = fs.readFileSync(filenameStr);
// var fileContentStr = fileBufferObj.toString();
// //console.log('\n<'+fileContentStr+'>\n');

// var lineArray = fileContentStr.split(/\n/);
// console.log(lineArray.length-1);

// Given hint solution from verify command
// var fs = require('fs')
// var contents = fs.readFileSync(process.argv[2])
// var lines = contents.toString().split('\n').length - 1
// console.log(lines)

// Exercise 4: MY FIRST ASYNC I/O!

// See hints at 
// https://github.com/maxogden/art-of-node#callbacks

// var fs = require('fs');
// var contents = fs.readFile(process.argv[2], 'utf8',
// 	// third argument of readFile()
// 	function(err, data){
// 		if (err) throw err;
// 		// raw buffer returned by readFile()
// 		//console.log(data.toString().split('\n').length-1);
// 		console.log(data.split('\n').length-1);
// 	});

// Exercise 5: FILTERES LS

// var fs = require('fs');
// //console.log(process.argv);
// // process.argv[2] provides directory path
// // Callback function as second parameter
// fs.readdir(process.argv[2], function(err, files) {
// 	if (err) throw err; //console.log(err);
// 	files.forEach(function(file) {
// 		// console.log(file); // test by showing files in dir
// 		// process.argv[3] provides file extension, like md or js
// 		if (file.indexOf("."+process.argv[3]) > -1)
// 		console.log(file);
// 	});
// });

// official solution as follows
// var fs = require('fs');
// var path = require('path');
// fs.readdir(process.argv[2], function (err, list) {
//   list.forEach(function (file) {
//     if (path.extname(file) === '.' + process.argv[3])
//       console.log(file);
//   });
// });

// Exercise 6: MAKE IT MODULAR

// var mymodule_func = require('./mymodule.js');
// // Call function defined by module in another file
// mymodule_func(process.argv[2], process.argv[3],
// 	function(err, data) {
// 		 if (err) return;
// 		 for (var i = 0; i < data.length; ++i)
// 		  console.log(data[i]);
// 	}
// );

// // official solution as follows
// var filterFn = require('./mymodule.js');
// var dir = process.argv[2];
// var filterStr = process.argv[3];
// filterFn(dir, filterStr, function (err, list) {
//   if (err)
//     return console.error('There was an error:', err);
//   list.forEach(function (file) {
//     console.log(file);
//   });
// });

// Exercise 7: HTTP CLIENT

// // Hint: 
// // file://C:\Users\hpdm4\AppData\Roaming\npm\node_modules\learnyounode\node_apidoc\http.html

// var http = require('http');
// // get URL, Callback function
// http.get(process.argv[2], function(res) {
//    // response on event type: data, error, end
//    res.on('data', function(data) {
//        // data is node buffer objects
//        console.log(data.toString());
//    });
// });

// var http = require('http');
// http.get(process.argv[2], function (response) {
//   response.setEncoding('utf8');
//   response.on('data', console.log);
//   response.on('error', console.error);
// });

// Exercise 8: HTTP COLLECT
//file://C:\Users\hpdm4\AppData\Roaming\npm\node_modules\learnyounode\docs\bl.html
//file://C:\Users\hpdm4\AppData\Roaming\npm\node_modules\learnyounode\docs\concat-stream.html
// var http = require('http');
// var bl = require('bl');
// http.get(process.argv[2], function(response) {
//    	var result = "";
//  // First try using different event types
// 	// response.on('data', function(data) {
// 	//    result += data.toString();
// 	// });
// 	// response.on('end', function() {
// 	//    console.log(result.length);
// 	//    console.log(result);
// 	// });
// 	response.pipe(bl(function (err, data) {
// 	//response.pipe(concatStream(function (err, data) {
// 	  if (err)
// 	      return console.error(err);
// 	  console.log(data.toString().length);
// 	  console.log(data.toString());
// 	}));
// });

// Exercise 9: JUGGLING ASYNC

// var http = require('http');
// var bl = require('bl');
// var content1, content2, content3;
// // show console log when all get responses complete
// // then show the content of responses
// function finish() {
//    if (content1 && content2 && content3) {
//      // Show in order related to argument sequence
//      console.log(content1);
//      console.log(content2);
//      console.log(content3);
//    }
// };
// http.get(process.argv[2], function(res) {
//    var result = "";
//    res.pipe(bl(function (err, data) {
//       if (err)
//          return console.err(err);
//       content1 = data.toString();
//       finish();
//    } ));
// });
// http.get(process.argv[3], function(res) {
//    res.pipe(bl(function (err, data) {
//       if (err)
//          return console.err(err);
//       content2 = data.toString();
//       finish();
//    }));
// });
// http.get(process.argv[4], function(res) {
//    var result = "";
//    res.pipe(bl(function (err, data) {
//       if (err)
//          return console.err(err);
//       content3 = data.toString();
//       finish();
//    }));
// });
// Official solution as follows...
// var http = require('http')
// var bl = require('bl')
// var results = []
// var count = 0

// function printResults () {
//   for (var i = 0; i < 3; i++)
//     console.log(results[i]);
// };
// function httpGet (index) {
//   http.get(process.argv[2 + index], function (response) {
//     response.pipe(bl(function (err, data) {
//       if (err)
//         return console.error(err);

//       results[index] = data.toString();
//       count++;

//       if (count == 3)
//         printResults();
//     }));
//   });
// };
// // Execute the http get calls
// for (var i = 0; i < 3; i++)
//   httpGet(i);

// More... Exercise 9: JUGGLING ASYNC
//console.log('start');
// var http = require('http');
// var concatStream = require('concat-stream');

// var urls = process.argv.slice(2),
//     results = [],
//     resultsCount = 0;

// urls.forEach(function (url, i) {
//   http.get(url, function (response) {
//     response.setEncoding('utf8');

//     response.pipe(concatStream(function (data) {
//       results[i] = data;
//       resultsCount++;

//       if (resultsCount === urls.length) {
//         results.forEach(function (result) {
//           console.log(result);
//           //console.log('resultElement: ' +result+'\n\n');
//         });
//       }
//     }));  // pipe
//   });  // get
// });  // forEach
//console.log(urls);

// Exercise 10: TIME SERVER 

// net module documentation
// file://C:\Users\hpdm4\AppData\Roaming\npm\node_modules\learnyounode\node_apidoc\net.html

// var net = require('net');
// function formatNumber(data) {
//     if (String(data).length == 1)
//         return '0' + data;
//     return data;
// };
// var server = net.createServer(function(socket) {
//    var now = new Date();
//    // YYYY-MM-DD-hh:mm
//    socket.write(now.getFullYear() + "-" + 
//  			   formatNumber(now.getMonth() + 1) + "-" +
//                 formatNumber(now.getDate()) + " " + 
//                 formatNumber(now.getHours()) + ":" + 
//                 formatNumber(now.getMinutes()) + '\n');
//    socket.end();
// });
// server.listen(process.argv[2]);

// second solution follows as...

// function formatNumber(number) {
//   return number < 10 ? '0' + number : number;
// }
// function getFormattedCurrentTime() {
//   var now = new Date();
//   // YYYY-MM-DD-hh:mm
//   return [now.getFullYear(), 
//           formatNumber(now.getMonth() + 1), 
//           formatNumber(now.getDate())].join('-') + ' ' + 
//   		 [formatNumber(now.getHours()), 
//   		  formatNumber(now.getMinutes())].join(':');
// }
// var net = require('net');
// var server = net.createServer(function (socket) {
//   socket.end(getFormattedCurrentTime() + '\n'); 
// });
// server.listen(process.argv[2]);

// Exercise 11: HTTP FILE SERVER

// var http = require('http');
// var fs = require('fs');
// var port = process.argv[2];      // first argument as port
// var filePath = process.argv[3];  // file location
// var server = http.createServer(function(req, res) {
//     var fileStream = fs.createReadStream(filePath);
//     fileStream.pipe(res);
// });
// server.listen(port);

// Second solution as follows...

// var http = require('http');
// var fs = require('fs');
// var port = process.argv[2];
// var file = process.argv[3];
// // pass in func
// http.createServer(function (req, res) {
//   res.writeHead(200, { 'content-type' : 'text/plain' });
//   fs.createReadStream(file).pipe(res);
// }).listen(port);

// Exercise 12: HTTP UPPERCASERER

// var http = require('http');
// // Transform stream like Array#map
// var map = require('through2-map');
// var server = http.createServer(function (req, res) {
// 					if (req.method === 'POST') {
// 						return res.end('send me a POST\n');
// 					}
// 					req.pipe(map(function (chunk) {
// 						return chunk.toString().toUpperCase();})).pipe(res);
// 			});
// server.listen(process.argv[2]);

// Second solution as follows...

// var http = require('http');
// // Transform stream like Array#map
// var map = require('through2-map');
// var port = process.argv[2];  // first argument as port
// var server = http.createServer(
// 				function(req, res) {
// 			    	req.pipe(
// 			    		map(function(chunk) 
// 			    			{ return chunk.toString().toUpperCase();})
// 			    	).pipe(res)
// 			    }
// 			);
// server.listen(port);

// Exercise 13: HTTP JSON API SERVER

// function getTimestamp(strtime) {
//   return Date.parse(strtime);
// }

// function getUnixTimestamp(strtime) {
//   return {
//     unixtime: getTimestamp(strtime)
//   };  
// }

// function getTimeObj(strtime) {
//   var date = new Date(getTimestamp(strtime));

//   return {
//     hour: date.getHours(),
//     minute: date.getMinutes(),
//     second: date.getSeconds()
//   };
// }

// var http = require('http');
// var url = require('url');
// var server = http.createServer(function (req, res) {

//   var urlObj = url.parse(req.url, true),
//       pathname = urlObj.pathname,
//       strtime = urlObj.query.iso,
//       result;
      
//   if (pathname === '/api/unixtime') {
//      result = getUnixTimestamp(strtime);
//   }
//   else if (pathname === '/api/parsetime') {
//     result = getTimeObj(strtime);
//   }

//   if (result) {
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify(result));
//   }
//   else {
//     res.writeHead(404);
//     res.end();
//   }
// });
// server.listen(process.argv[2]);

// Second solution refactored as follows...

// var http = require('http')
// var url = require('url')
// var server = http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'application/json'});
//     var path = url.parse(req.url, true);
//     var time;
//     var date = new Date(path.query.iso);
//     if (path.pathname == "/api/parsetime") {
//       time = JSON.stringify({
//                  'hour': date.getHours(),
//                  'minute': date.getMinutes(),
//                  'second': date.getSeconds()});
//     } else if (path.pathname == "/api/unixtime") {
//       time = JSON.stringify({'unixtime': date.getTime() });
//     } 
//     if (time) {
//         res.writeHead(200, {'Content-Type': 'application/json'});
//         res.end(time);
//     } else {
//         res.writeHead(404);
//         res.end();
//     }
// });
// server.listen(process.argv[2]);
