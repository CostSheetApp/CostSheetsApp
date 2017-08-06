let express = require('express');
// let serveStatic = require('serve-static');
let app = express();
app.use(express.static("./"));
app.use(express.static("dist"));

app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`);
});

let port = process.env.PORT || 5000;
app.listen(port,function(){
  console.log('server started '+ port);
});