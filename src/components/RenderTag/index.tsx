import * as React from 'react';
import { Tag } from 'antd';
import { ITransformation } from '../../shared/types';

export const renderTag = (value: string, key: string, transformation: ITransformation) => {
  const currentObject = transformation[key].find(current => `${current.value}` === `${value}`);
  if (!currentObject) {
    return null;
  }
  return <Tag color={currentObject.color}>{currentObject.text}</Tag>;
};
