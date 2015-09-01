var http = require("http");
var express = require("express");

var fs = require("fs");
var path = require("path");

var app = express();

var ls = function (dir_path, callback) {
    var fileList = [];

    fs.readdir(dir_path, function(err, files){
            if (err){
                throw err;
            } else {
                files.filter(function(file){
                        return fs.statSync(path.join(dir_path, file)).isFile();
                }).forEach( function (file) {
                        fileList.push(path.relative(dir_path + "../../..", path.join(dir_path, file)));
                });
                callback(null, fileList);
            }
    });
}

app.use("/public", express.static(__dirname + '/public'));
app.use("/bower_components",  express.static(__dirname + '/bower_components'));

app.get("/", function (req, res) {
        res.sendFile("index.html", { root: __dirname });
});

app.get("/images", function(req, res){
        console.log('[get] "/images"');
        ls(path.resolve(process.argv[2]), function (err, fileList) {
                if(err){
                    throw err;
                } else {
                    var data = {"images": fileList};
                    console.log(JSON.stringify(data));
                    res.json(data);
                }
        });
});

http.createServer(app).listen(3000);
