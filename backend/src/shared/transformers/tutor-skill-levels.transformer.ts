interface ISystemValue {
  systemName: string;
  displayName: string;
}

export class SystemValuesTransformer {
  systemName: string;
  displayName: string;

  constructor(systemValue: ISystemValue) {
    this.systemName = systemValue.systemName;
    this.displayName = systemValue.displayName;
  }
}
