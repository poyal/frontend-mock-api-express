export function Column(typeFunction: any) {
  return (target: any, propertyKey: string) => {
    Reflect.metadata('$column', typeFunction)(target, propertyKey);
  };
}
