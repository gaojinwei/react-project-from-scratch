import React from 'react';

class RankListWrapper extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(this.props.list) === JSON.stringify(nextProps.list)) {
      return false;
    } else {
      return true;
    }
  }
  render() {
    return (
      <div style={{ overflow: 'hidden', margin: '20px 10px', borderRadius: '16px' }}>
        {this.props.children}
      </div>
    );
  }
}

export default RankListWrapper;
