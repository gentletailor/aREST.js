window.addEventListener(
  "load",
  function () {
    // do something here ...

    // Create new aREST device when button is clicked

    document.querySelector("#validate").addEventListener("click", () => {
      var address = document.querySelector("#validate").value;
      var device = new Device(address);

      // Set device pins
      device.pinMode(6, "OUTPUT");
      device.pinMode(2, "INPUT");

      // Button
      document.querySelector("#on").addEventListener("click", () => {
        device.digitalWrite(6, 1);
      });

      document.querySelector("#off").addEventListener("click", () => {
        device.digitalWrite(6, 0);
      });

      // Analog write
      document.querySelector("#on").addEventListener("mouseup", () => {
        var val = document.querySelector("#slider").value;
        device.analogWrite(6, val);
      });

      //Analog read every 5 seconds
      device.analogRead(0, function (data) {
        document.querySelector("#A0").innerHTML = data.return_value;
      });
      setInterval(function () {
        device.analogRead(0, function (data) {
          document.querySelector("#A0").innerHTML = data.return_value;
        });
      }, 5000);

      // Digital read every 5 seconds
      device.digitalRead(11, function (data) {
        document.querySelector("#2").innerHTML = data.return_value;
      });
      setInterval(function () {
        device.digitalRead(11, function (data) {
          document.querySelector("#2").innerHTML = data.return_value;
        });
      }, 5000);

      // Temperature display
      device.getVariable("temperature", function (data) {
        document.querySelector("#temperature").innerHTML = data.temperature;
      });

      // Humidity display
      device.getVariable("humidity", function (data) {
        document.querySelector("#humidity").innerHTML = data.humidity;
      });
    });
  },
  false
);
