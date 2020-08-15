import React from 'react';
import { Form } from 'react-final-form';
import classnames from 'classnames';
import './styles.scss';

interface IProps {
  onSubmit: (values: Record<string, unknown>) => void;
  initialValues: Record<string, unknown>;
}

interface IState {
  page: number;
  values: Record<string, unknown>;
}

export class FormWizard extends React.PureComponent<IProps, IState> {
  static Page = ({ children }: any) => children;

  constructor(props: IProps) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues || {},
    };
  }

  next = (values: Record<string, unknown>) => {
    this.setState(state => ({
      page: Math.min(state.page + 1, React.Children.count(this.props.children) - 1),
      values,
    }));
  };

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0),
    }));

  handleSubmit = (values: Record<string, unknown>) => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values);
    }
    this.next(values);
  };

  render() {
    const { children } = this.props;
    const { page, values } = this.state;
    const wizardPages = React.Children.toArray(children);
    const activePage = wizardPages[page];
    const wizardCount = React.Children.count(children);
    const isLastPage = page === wizardCount - 1;

    const wizardTitles: string[] = wizardPages.map(({ props }: any) => props.title);

    return (
      <Form initialValues={values} onSubmit={this.handleSubmit}>
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <div role="application" className="wizard clearfix">
              <div className="steps clearfix">
                <ul role="tablist">
                  {wizardTitles.map((wizardTitle, index) => {
                    const index$1 = index;
                    return (
                      <li
                        role="tab"
                        key={wizardTitle}
                        className={classnames({
                          first: index === 0,
                          last: index === wizardCount - 1,
                          disabled: index > page,
                          done: index < page,
                          current: index === page,
                        })}
                      >
                        <button type="button" className="link-like">
                          <span className="number">{index$1 + 1}</span>
                          <span className="title">{wizardTitle}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="content clearfix">{activePage}</div>
              <div className="actions clearfix">
                <ul role="menu" aria-label="Pagination">
                  <li className={classnames({ disabled: page === 0 })} aria-disabled="false">
                    <button
                      type="button"
                      className="link-like"
                      disabled={page === 0}
                      onClick={this.previous}
                    >
                      « Previous
                    </button>
                  </li>
                  {!isLastPage ? (
                    <li aria-hidden="false" aria-disabled="false">
                      <button type="submit" className="link-like" role="menuitem">
                        Next &raquo;
                      </button>
                    </li>
                  ) : (
                    <li aria-hidden="true">
                      <button type="submit" className="link-like" disabled={submitting}>
                        Finish
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            {/* <pre>{JSON.stringify(values$1, null, 2)}</pre> */}
          </form>
        )}
      </Form>
    );
  }
}
