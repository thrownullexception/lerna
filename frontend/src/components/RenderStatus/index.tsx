import * as React from 'react';
import { StatusThemes } from '../../app/types';
import './styles.scss';

interface IProps {
  theme: StatusThemes;
  text: string;
}

const transformThemeToColor = (theme: StatusThemes): string => {
  switch (theme) {
    case StatusThemes.Default:
      return 'gray';
    case StatusThemes.Primary:
      return 'blue';
    case StatusThemes.Success:
      return 'green';
  }
};

export const RenderStatus: React.SFC<IProps> = ({ theme, text }) => {
  return <span className={`tag tag-${transformThemeToColor(theme)}`}>{text}</span>;
};
