export class FormParamsObject {
  constructor(public objectParams: any) {}

  getFullObject() {
    return this.objectParams;
  }

  convertObjectToArray(path: string) {
    const keys = path.split('.');
    let obj = this.objectParams;
    for (const key of keys) {
      obj = obj[key];
    }
    if (typeof obj !== 'object') {
      throw new Error('The specified path does not point to an object');
    }
    const result = [];
    const keysArray = Object.keys(obj);
    const maxLength = Math.max(...keysArray.map((key) => obj[key].length));
    for (let i = 0; i < maxLength; i++) {
      const item: { [key: string]: any } = {};
      for (const key of keysArray) {
        item[key] = obj[key][i];
      }
      result.push(item);
    }
    return result;
  }

  getObjectProperty(path: string) {
    const keys = path.split('.');
    let obj = this.objectParams;
    for (const key of keys) {
      if (!obj.hasOwnProperty(key)) {
        return null;
      }
      obj = obj[key];
    }
    return obj ?? null;
  }

  setObjectProperty(path: string, value: any) {
    const keys = path.split('.');
    let obj = this.objectParams;
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
  }
}
