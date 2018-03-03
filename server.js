const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getFullYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
app.set('view engine', 'hbs');
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Error appending log to file');
    }
  });
  next();
});
// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     welcomeMessage: 'Be right back'
//   });
// });
app.use(express.static(__dirname+'/public')); // ensure static page not rendered in maintenance
app.get('/', (req, res) => {
  // res.send('<h1>Hello Express</h1');
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome'
  });
});
app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page',
    welcomeMessage: 'This is the about page'
  });
});
app.get('/bad', (req, res) => {
  res.send({
    status: 404,
    errorMesssage: 'Can\'t find the page requested'
  });
});
app.listen(3000, () => {
  console.log('Server is up on PORT 3000');
});
