Device(address) {
  this.address = address;

  this.pinMode = function (pin, state) {
    let mode;
    if (pin == null || isNaN(pin) || pin < 1 || pin > 50)
      return "specify pin number between 1 and 50";
    if (state == "OUTPUT") mode = "o";
    else if (state == "INPUT") mode = "i";
    else if (state == "INPUT_PULLUP") mode = "I";
    else if (!mode) return "wrong mode parameter";
    fetchWithTimeout(this.address + "/mode/" + pin + mode);
    //.then((data) => console.log(data));
  };

  this.digitalWrite = function (pin, state) {
    if (pin == null || isNaN(pin) || pin < 1 || pin > 50)
      return "specify pin number between 1 and 50";
    if (state == null) return "state missing";
    if (state != 0 && state != 1) return "wrong state";
    fetchWithTimeout(this.address + "/digital/" + pin + "/" + state);
    //.then((data) => console.log(data));
  };

  this.analogWrite = function (pin, state) {
    if (pin == null || isNaN(pin) || pin < 1 || pin > 50)
      return "specify pin number between 1 and 50";
    if (state == null) return "state missing";
    if (isNaN(state) || state < 0 || state > 255)
      return "PWM must be between 0 ans 255";
    fetchWithTimeout(this.address + "/analog/" + pin + "/" + state);
    //.then((data) => console.log(data));
  };

  this.analogRead = function (pin, callback) {
    if (pin == null || isNaN(pin) || pin < 1 || pin > 50)
      return "specify pin number between 1 and 50";
    fetchWithTimeout(this.address + "/analog/" + pin).then((data) =>
      callback(data)
    );
  };

  this.digitalRead = function (pin, callback) {
    if (pin == null || isNaN(pin) || pin < 1 || pin > 50)
      return "specify pin number between 1 and 50";
    fetchWithTimeout(this.address + "/digital/" + pin).then((data) =>
      callback(data)
    );
  };

  this.getVariable = function (variable, callback) {
    if (variable == null) return "specify variable";
    fetchWithTimeout(this.address + "/" + variable).then((data) =>
      callback(data)
    );
  };

  this.callFunction = function (called_function, parameters, callback) {
    if (called_function == null) return "specify function";
    if (parameters == null) return "specify parameters";
    fetchWithTimeout(
      this.address + "/" + called_function + "?params=" + parameters
    ).then(function () {
      if (callback != null) {
        callback(data);
      }
    });
  };
}

async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 5000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
}