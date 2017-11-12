import * as React from 'react';

import './DataNavigation.scss';

interface MyProps {
  currentPage: number;
  totalPages: number;
  updatePage: (newPage) => void;
}

interface MyState {
  thisSection?: number;
  totalSections?: number;
  activePage?: number;
}

class DataTableNavigation extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);

    this.state = {
      thisSection: 0,
      totalSections: 0, // activePage: 0
    };

    this.createButtons = this.createButtons.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('will recieve:', nextProps);
    if (nextProps.totalPages !== this.props.totalPages) {
      this.setState({ totalSections: this.props.totalPages / 4 });
    }
  }

  handleClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log('button has been clicked', event.currentTarget.id);
    const id = parseInt(event.currentTarget.id, 0);

    if (Number.isNaN(id)) {
      this.props.updatePage(event.currentTarget.id);
    } else {
      this.props.updatePage(id);
    }
  }

  createPrevButton() {
    return (
      <div
        key={'prev-btn'}
        id={'prev'}
        className="data-nav-button"
        onClick={this.handleClick}
      >
        <i className="fa fa-arrow-left" aria-hidden="true"/>
        Prev
      </div>);
  }

  createNextButton() {
    return (
      <div
        className="data-nav-button"
        key={'next-btn'}
        id={'next'}
        onClick={this.handleClick}
      >
        Next
        <i className="fa fa-arrow-right" aria-hidden="true"/>
      </div>
    );
  }

  createNextSectionButton() {
    return (
      <div
        className={'data-nav-button'}
        key={'section-btn'}
        id={'section-next'}
        onClick={this.handleClick}
      >
        ...
      </div>
    );
  }

  createButtons() {
    const pageButtons: any = [];
    const helperButtons: any = [];
    console.log('sections:', this.state.totalSections);
    console.log('this section', this.state.thisSection);
    console.log('activePage', this.state.activePage);
    helperButtons.push(this.createPrevButton());

    for (let i = 0; i < this.props.totalPages; i++) {
      pageButtons.push(
        <div
          key={`page-${i}`}
          id={`${i}`}
          onClick={this.handleClick}
          className={this.props.currentPage === i ? 'data-nav-button active' : 'data-nav-button'}
        >
          {i + 1}
        </div>,
      );
    }

    // TODO need to check if wee need to add '...' buttons to skip more than a page at a time
    if (this.props.totalPages > 4) {
      // then we should add '...' buttons to skip to the 5th page
      helperButtons.push(this.createNextSectionButton());
    }

    /**
     * This creates the next page button
     */
    helperButtons.push(this.createNextButton());

    return pageButtons;
  }

  render() {
    return (
      <div className="data-nav-container">
        {this.createButtons()}
      </div>
    );
  }
}

export default DataTableNavigation;
