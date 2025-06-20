export function StringToDate(format: string) {
  return (target: any, propertyKey: string) => {
    Reflect.metadata('$stringToDate', format)(target, propertyKey);
  };
}

export function DateToString(format: string) {
  return (target: any, propertyKey: string) => {
    Reflect.metadata('$dateToString', format)(target, propertyKey);
  };
}

export function DateFormat(format: string) {
  return (target: any, propertyKey: string) => {
    Reflect.metadata('$stringToDate', format)(target, propertyKey);
    Reflect.metadata('$dateToString', format)(target, propertyKey);
  };
}
