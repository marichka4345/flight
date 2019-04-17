import React, {Component} from 'react';
import styles from './tabs.module.css';

class Tabs extends Component {
  state = {
    activeTabName: this.props.tabNames[0],
    sliderMoved: false
  };

  handleTabClick = e => {
    const activeTabName = e.target.getAttribute('data-name');
    this.setState(({sliderMoved}) => ({
      activeTabName,
      sliderMoved: !sliderMoved
    }));
  };

  getTabClassName = tabName => {
    const {activeTabName} = this.state;
    const commonTabClass = styles.tab;
    return activeTabName === tabName
      ? `${commonTabClass} ${styles.activeTab}`
      : commonTabClass;
  };

  getSliderClassName = () => {
    const {sliderMoved} = this.state;
    const commonSliderClass = styles.slider;
    return sliderMoved
      ? `${commonSliderClass} ${styles.movedSlider}`
      : commonSliderClass;
  }

  render() {
    const {tabNames, children} = this.props;
    const {activeTabName} = this.state;

    const formattedChildren = React.Children.toArray(children);
    const activeTab = formattedChildren.filter(
      element => element.props.id === activeTabName
    )[0];
    
    return (
      <>
        <div className={styles.tabNames}>
          {
            tabNames.map(
              tabName => (
                <div
                  key={tabName}
                  onClick={this.handleTabClick}
                  data-name={tabName}
                  className={this.getTabClassName(tabName)}
                >
                  {tabName}
                </div>
              )
            )
          }

          <div className={this.getSliderClassName()} />
        </div>

        {activeTab}
      </>
    );
  }
}

export default Tabs;