import { SystemValueEntity } from '../entities';

export class SelectOptionTransformer {
  label: string;
  value: string;

  constructor(systemValue: SystemValueEntity) {
    this.label = systemValue.displayName;
    this.value = systemValue.systemName;
  }
}
