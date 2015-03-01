// var fs = require('fs');
// // func spec three arguments
// // directory name, file extension, callback function
// module.exports = function(dir, fileExt, func) {
//    	fs.readdir(dir, function(err, files) {
//    		// Check for errors in params
//    		// pass back error with file list
//     	if (err) return func(err, files);
//        	// filter files list
//        	var result = files.filter(function(file) {
//            return file.indexOf("." + fileExt) > -1;
//        	});
//        	// pass back result data
//        	func(null, result);
//    	});
// }

var fs = require('fs');
var path = require('path');
module.exports = function (dir, filterStr, callback) {
  fs.readdir(dir, function (err, list) {
    if (err)
      return callback(err);
    list = list.filter(function (file) {
      return path.extname(file) === '.' + filterStr;
    });
    callback(null, list);
  });
}
