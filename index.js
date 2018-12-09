const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let tessel = null;
try {
  tessel = require('tessel');
} catch(e) {
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let servoPin = null;
if (tessel) {
  tessel.pwmFrequency(50);
  servoPin = tessel.port.A.pwm[0];
}

// 20ms per cycle
// 0.5 - 2.5ms target durations
// 0.5 / 20 = 0.025
// 2.5 / 20 = 0.125

app.post('/api/position', (req, res) => {
  const cycle = 0.025 + ((req.body.position / 180.0) * 0.1);
  if (servoPin) {
    servoPin.pwmDutyCycle(cycle);
  }
  res.json({ok: true});
});

app.use('/', express.static(__dirname + '/dist')); 
app.listen(tessel ? 80 : 8080);

if (tessel) {
  tessel.network.wifi.connection(function(error, settings) {
    console.log(`Server running at http://${settings.ip}/`);
  });
} else {
  console.log("Server running at http://127.0.0.1:8080/");
}
