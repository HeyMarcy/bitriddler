export const stringifyId = id => typeof id == 'number' ? String(id) : id;

export const containId = (ids, id) => ids.map(stringifyId).indexOf(stringifyId(id)) > -1;

export const compareIds = (id1, id2) => stringifyId(id1) == stringifyId(id2);

export const getDocumentId = object => (object instanceof Object) && object._id ? String(object._id) : String(object);

export const unique = (array) => array.filter((val, i, self) => self.indexOf(val) === i);

export function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

export function camelCaseToUnderscore(str) {
  return str.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
}

export function hasProp(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function objectKeys(object) {
  if(! object || typeof object !== 'object') {
    return [];
  }

  return Object.keys(object);
}

function buildAction(type, payload) {
  return {
    type,
    payload: payload || {}
  }
}

export function makeAction(type) {
  return payload => buildAction(type, payload);
}

export function makeApiActions(actions, actionsConstant) {
  let result = {};

  actions.forEach((action) => {
    let upperCase = camelCaseToUnderscore(action).toUpperCase();

    result[`${action}`] = makeAction(actionsConstant[`${upperCase}`]);
    result[`${action}Success`] = makeAction(actionsConstant[`${upperCase}_SUCCESS`]);
    result[`${action}Failure`] = makeAction(actionsConstant[`${upperCase}_FAILURE`]);
    result[`${action}Reset`] = makeAction(actionsConstant[`${upperCase}_RESET`]);
  });

  return result;
}

export function makeActions(actions, actionsConstant) {
  let result = {};

  actions.forEach((action) => {
    let upperCase = camelCaseToUnderscore(action).toUpperCase();

    result[`${action}`] = makeAction(actionsConstant[`${upperCase}`]);
  });

  return result;
}

export function makeApiActionsTypes(types) {
  let result = {};

  types.map((type) => {
    let [prepend, actionType] = type.split('.');
    result[`${actionType}`] = `${prepend}.${actionType}`;
    result[`${actionType}_SUCCESS`] = `${prepend}.${actionType}_SUCCESS`;
    result[`${actionType}_FAILURE`] = `${prepend}.${actionType}_FAILURE`;
    result[`${actionType}_RESET`] = `${prepend}.${actionType}_RESET`;
  });

  return result;
}

export function makeActionsTypes(types, prepend) {
  let result = {};

  types.map((type) => {
    let [prepend, actionType] = type.split('.');
    result[`${actionType}`] = `${prepend}.${actionType}`;
  });

  return result;
}

export function isEmpty(object) {
  if (! object || typeof object !== 'object') {
    return true;
  }

  for (var key in object) {
    if(object.hasOwnProperty(key)) return false;
  }

  return true;
}

export const convertToUnderscore = (str) => str.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});

export const isEmail = (text) => {
  const r = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
  return r.test(text);
}

export function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

export function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
