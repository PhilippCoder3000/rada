export const onBlurHandler = (target, array) => {
  const currentInputItems = array.filter(
    (item) => item.fields.indexOf(target.name) !== -1
  );
  let result = [];
  currentInputItems.forEach((item) => {
    switch (item.type) {
      case "required":
        requiredCase(item, target, result);
        break;
      case "string":
        stringCase(item, target, result);
        break;
      case "integer":
        integerCase(item, target, result);
        break;
      case "double":
        doubleCase(item, target, result);
        break;
      case "match":
        matchCase(item, target, result);
        break;
      case "email":
        emailCase(item, target, result);
        break;
      case "in":
        inCase(item, target, result);
        break;
      case "date":
        break;
      case "time":
        break;
      case "link":
        break;
      default:
        break;
    }
  });
  return result;
};

const requiredCase = (item, target, result) => {
  const invalidLength = target.value.length === 0;
  let message = "Поле обязательно для заполнения";
  if (item.hasOwnProperty("rules")) {
    if (item.rules.hasOwnProperty("message")) {
      message = item.rules.message;
    }
  }
  if (invalidLength) {
    result.push({
      field: target.name,
      message: message,
    });
  }
};

const stringCase = (item, target, result) => {
  let invalidLengthMin = false;
  let invalidLengthMax = false;
  let message = "Стандартное сообщение об ошибке";
  if (item.hasOwnProperty("rules")) {
    if (item.rules.hasOwnProperty("min")) {
      invalidLengthMin = target.value.length < item.rules.min;
      message = `Длинна должна быть больше ${item.rules.min} символов`;
    }
    if (item.rules.hasOwnProperty("max")) {
      invalidLengthMax = target.value.length > item.rules.max;
      message = `Длинна не должна превышать ${item.rules.max} символов`;
    }
    if (item.rules.hasOwnProperty("message")) {
      message = item.rules.message;
    }
  }
  if (invalidLengthMin || invalidLengthMax) {
    result.push({
      field: target.name,
      message,
    });
  }
};

const integerCase = (item, target, result) => {
  let invalidMin = false;
  let invalidMax = false;
  let invalidInteger = false;
  let message = "Стандартное сообщение об ошибке";
  if (item.hasOwnProperty("rules")) {
    if (item.rules.hasOwnProperty("min")) {
      invalidMin = target.value < item.rules.min;
      message = `Число должно быть больше чем ${item.rules.min}`;
    }
    if (item.rules.hasOwnProperty("max")) {
      invalidMax = target.value > item.rules.max;
      message = `Число должно быть меньше чем ${item.rules.max}`;
    }
    if (!target.value.match(/^\d+$/)) {
      invalidInteger = true;
      message = `Требуется целое числовое значение`;
    }
    if (item.rules.hasOwnProperty("message")) {
      message = item.rules.message;
    }
  }
  if (invalidMin || invalidMax || invalidInteger) {
    result.push({
      field: target.name,
      message,
    });
  }
};

const doubleCase = (item, target, result) => {
  let invalidMin = false;
  let invalidMax = false;
  let message = "Стандартное сообщение об ошибке";
  if (item.hasOwnProperty("rules")) {
    if (item.rules.hasOwnProperty("min")) {
      invalidMin = target.value < item.rules.min;
      message = `Число должно быть больше чем ${item.rules.min}`;
    }
    if (item.rules.hasOwnProperty("max")) {
      invalidMax = target.value > item.rules.max;
      message = `Число должно быть меньше чем ${item.rules.max}`;
    }
    if (item.rules.hasOwnProperty("message")) {
      message = item.rules.message;
    }
  }
  if (invalidMin || invalidMax) {
    result.push({
      field: target.name,
      message,
    });
  }
};

const matchCase = (item, target, result) => {
  let invalidMatch = false;
  let message = "Стандартное сообщение об ошибке";
  if (item.hasOwnProperty("rules")) {
    if (item.rules.hasOwnProperty("pattern")) {
      if (!target.value.match(item.rules.pattern)) {
        invalidMatch = true;
      }
    }
    if (item.rules.hasOwnProperty("message")) {
      message = item.rules.message;
    }
  }
  if (invalidMatch) {
    result.push({
      field: target.name,
      message,
    });
  }
};

const emailCase = (item, target, result) => {
  let invalidEmail = false;
  let message = "Введите корруктный email";
  if (
    target.value.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    invalidEmail = true;
  }
  if (item.hasOwnProperty("rules")) {
    if (item.rules.hasOwnProperty("message")) {
      message = item.rules.message;
    }
  }
  if (invalidEmail) {
    result.push({
      field: target.name,
      message,
    });
  }
};

const inCase = (item, target, result) => {
  let invalidValueInArray = false;
  let message = "Введите корректный email";
  if (item.rules.range.indexOf(target.value)) {
    invalidValueInArray = true;
  }
  if (item.hasOwnProperty("rules")) {
    if (item.rules.hasOwnProperty("message")) {
      message = item.rules.message;
    }
  }
  if (invalidValueInArray) {
    result.push({
      field: target.name,
      message,
    });
  }
};
