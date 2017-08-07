let express = require('express');
// let serveStatic = require('serve-static');
// let path = require('path');
let app = express();
app.use(express.static("./"));
app.use(express.static("dist"));
// app.locals.root_path = __dirname;
app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`);
});

let port = process.env.PORT || 5000;
app.listen(port,function(){
  console.log('server started '+ port);
});