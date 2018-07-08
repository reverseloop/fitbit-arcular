import * as fs from "fs";

const FILE_NAME = "arcularConfig.json";

let configMap = {};

export function setItem(key, value) {
  configMap[key] = value;
}

export function getItem(key) {
  return configMap[key];
}

export function load() {  
  try {
    configMap = fs.readFileSync(FILE_NAME, "json");   
    return true;
  } catch(error) {
    console.warn("Could not load " + FILE_NAME);
    return false;
  }
}

export function save() {  
  try {
    fs.writeFileSync(FILE_NAME, configMap, "json");
    return true;
  } catch(error) {
    console.error("Could not save " + FILE_NAME);
    return false;
  }
}