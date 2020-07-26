import * as React from 'react';
import { Radio, Button, Input, Switch, Icon } from 'antd';
import { PaginationConfig, SorterResult } from 'antd/lib/table';
import get from 'lodash-es/get';

export enum FilterTypes {
  TEXT_SEARCH = 'text_search',
  NUMERICAL = 'numerical',
  IS_PRESENT = 'is_present',
}

interface ISelectedKey {
  type?: FilterTypes;
  comparision?: NumberComparisions;
  value?: string | boolean;
}

interface IFilterBaggage {
  column: string;
  confirm: () => void;
  setSelectedKeys: (selectedKeys: Array<ISelectedKey | boolean | string>) => void;
  selectedKeys: ISelectedKey[];
}

enum NumberComparisions {
  GREATER_THAN = 'g',
  LESS_THAN = 'l',
  EQUAL_TO = 'q',
}

export interface IFullTableDriver {
  pagination?: PaginationConfig;
  sorter?: SorterResult<any>;
  filters?: object; // object of key string to value of ISelectedKey
}

interface IFilterDropDown extends Omit<IFilterBaggage, 'column'> {
  clearFilters: () => void;
}

export abstract class AntdFilteringReactComponent<T> extends React.PureComponent<T> {
  searchInput!: Input | null;
  fullTableDriver: IFullTableDriver = {
    pagination: {},
    sorter: undefined,
    filters: {},
  };

  abstract fetchDataWithFilters(fullTableDriver: IFullTableDriver): void;

  handleTablePaginationAndSortingChange = (
    pagination: PaginationConfig = {},
    filters = {},
    sorter?: SorterResult<any>,
  ) => {
    this.fullTableDriver = {
      sorter,
      pagination,
      filters,
    };
    this.fetchData();
  };

  addFilterPanel = (column: string, type: FilterTypes) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: IFilterDropDown) => (
      <div style={{ padding: 8, width: '250px' }}>
        {this.renderFilterPanelType(type, {
          column,
          setSelectedKeys,
          selectedKeys,
          confirm,
        })}
        <Button
          onClick={() => this.clearFilterProperty(column, clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <Icon
        type={type === FilterTypes.TEXT_SEARCH ? 'search' : 'filter'}
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
  });

  private getFilterValue = (
    selectedKeys: object[],
    column: string,
    field = 'value',
  ): string | boolean | undefined => {
    if (selectedKeys[0]) {
      return get(selectedKeys, [0, field]);
    }
    const value = get(this.fullTableDriver.filters, [column, field]);
    if (value) {
      return value;
    }
    return undefined;
  };

  private renderNumericalFilter = ({
    column,
    setSelectedKeys,
    selectedKeys,
    confirm,
  }: IFilterBaggage) => {
    const selectedKey = selectedKeys[0];
    return (
      <React.Fragment>
        <Radio.Group
          onChange={e => {
            const selectedKeyValue = {
              ...selectedKey,
              type: FilterTypes.NUMERICAL,
              comparision: e.target.value,
            };
            setSelectedKeys([selectedKeyValue]);
          }}
          value={this.getFilterValue(selectedKeys, column, 'comparision')}
        >
          <Radio.Button value={NumberComparisions.GREATER_THAN}>Greater Than</Radio.Button>
          <Radio.Button value={NumberComparisions.LESS_THAN}>Less Than</Radio.Button>
          <Radio.Button value={NumberComparisions.EQUAL_TO}>Equals To</Radio.Button>
        </Radio.Group>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          type="number"
          placeholder={`Search ${column}`}
          value={this.getFilterValue(selectedKeys, column) as string}
          onChange={e => {
            const selectedKeyValue = {
              type: FilterTypes.NUMERICAL,
              comparision: get(selectedKey, ['comparision'], NumberComparisions.GREATER_THAN),
              value: e.target.value,
            };
            setSelectedKeys(
              e.target.value ? [selectedKeyValue] : [{ comparision: selectedKey.comparision }],
            );
          }}
          onPressEnter={confirm}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={confirm}
          icon="filter"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Filter
        </Button>
      </React.Fragment>
    );
  };

  private renderIsPresentFilter = ({
    column,
    setSelectedKeys,
    selectedKeys,
    confirm,
  }: IFilterBaggage) => {
    return (
      <Switch
        defaultChecked={!!this.getFilterValue(selectedKeys, column)}
        checkedChildren="Is Present"
        unCheckedChildren="Not Present"
        onChange={checked => {
          setSelectedKeys([checked]);
          this.addFilterProperty(
            column,
            {
              type: FilterTypes.IS_PRESENT,
              value: checked,
            },
            confirm,
          );
        }}
      />
    );
  };

  private renderTextSearchFilter = ({
    column,
    setSelectedKeys,
    selectedKeys,
    confirm,
  }: IFilterBaggage) => {
    return (
      <React.Fragment>
        <Input
          ref={node => {
            this.searchInput = node; // CRY_FOR_HELP: Please anybody that knows how to fix this console bug should help me
          }}
          placeholder={`Search ${column}`}
          value={this.getFilterValue(selectedKeys, column) as string}
          onChange={e =>
            setSelectedKeys(
              e.target.value ? [{ type: FilterTypes.TEXT_SEARCH, value: e.target.value }] : [],
            )
          }
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => confirm()}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
      </React.Fragment>
    );
  };

  private renderFilterPanelType = (type: FilterTypes, filterBaggage: IFilterBaggage) => {
    switch (type) {
      case FilterTypes.TEXT_SEARCH:
        return this.renderTextSearchFilter(filterBaggage);
      case FilterTypes.NUMERICAL:
        return this.renderNumericalFilter(filterBaggage);
      case FilterTypes.IS_PRESENT:
        return this.renderIsPresentFilter(filterBaggage);
      default:
        return null;
    }
  };

  private addFilterProperty = (column: string, selectedKey: ISelectedKey, confirm: () => void) => {
    // confirm();
  };

  private clearFilterProperty = (column: string, clearFilters: () => void) => {
    clearFilters();
    this.fullTableDriver.filters = { ...this.fullTableDriver.filters, [column]: undefined };
    this.fetchData();
  };

  private fetchData() {
    this.fetchDataWithFilters(this.fullTableDriver);
  }
}
