var http = require('http');
var fs = require('fs');
var path = require('path');
var open = require('open');

http.createServer(function (request, response) {
    console.log('saving', request.url);
    if (request.url === '/editor/savescene') {
        var data = '';
        request.on('data', function (chunk) {
            data += chunk;
        });
        request.on('end', function () {
            data = JSON.parse(data.toString());
            fs.writeFileSync(data.filename + '.json', JSON.stringify(data.scene.scene, 0, 2), 'utf8');
        });
    }

    var filePath = request.url;
    if (filePath == '/') {
        filePath = '/index-dev.html';
    }

    filePath = '.' + filePath;

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');
console.log('Editor running at http://127.0.0.1:8125/editor/index.html');
console.log('Preview running at http://127.0.0.1:8125/index-dev.html');

process.argv.forEach(function (val, index, array) {
    if (index === 2) {
        open('http://127.0.0.1:8125/' + val);
    }
});

