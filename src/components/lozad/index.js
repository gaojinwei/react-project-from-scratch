import React, { Component } from 'react';

export default function(Comp, ...propertys) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = Object.keys(props || {}).reduce((state, key) => {
        if (propertys.includes(key)) {
          return state;
        }
        state[key] = props[key];
        return state;
      }, {});
    }
    componentWillReceiveProps(nextProps) {
      this.setState(nextProps);
    }
    render() {
      return <Comp {...this.state} />;
    }
    componentDidMount() {
      this.setState(this.props);
    }
  };
}
