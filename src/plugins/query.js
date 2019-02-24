import fetch from 'cross-fetch';

class Query {
  constructor(url, option = {}, isServerToldErrorFn = () => false) {
    this.url = url;
    this.option = option;
    this.data = null;
    this.isServerToldErrorFn = isServerToldErrorFn;
    this.fetchPromise = null;
    this.state = {
      loading: false,
      error: null,
      data: null
    };
    this.startCallBackFunction = [];
    this.successCallBackFunction = [];
    this.errorCallBackFunction = [];
    this.endCallBackFunction = [];
  }
  start(data) {
    if (this.dispatch) {
      throw new Error(
        `you cant in startCallback or successCallback or errorCallback do query.start`
      );
    }
    if (this.state.loading) {
      return console.warn('query is loading');
    }
    this.state.loading = true;
    if (arguments.length > 0) {
      this.data = data;
    }
    let option = Object.assign({}, this.option);
    if (this.data) {
      option = Object.assign(option, { body: this.data });
    }
    return (this.promise = fetch(`${this.url}`, option)
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      })
      .then((json) => {
        this.state.loading = false;
        return json;
      })
      .then((json) => {
        const serverToldError = this.isServerToldErrorFn(json);
        if (serverToldError) {
          throw serverToldError;
        }
        return json;
      })
      .then((json) => {
        // success
        this.state.data = json;
        this.state.error = null;
        this.dispatch('success');
        return json;
      })
      .catch((err) => {
        // error
        this.state.data = null;
        this.state.error = err;
        this.dispatch('error');
        return error;
      })
      .finally(() => {
        this.dispatch('end');
      })
      .then(() => Object.assign(this.state)));
  }
  set onStart(cb) {
    this.startCallBackFunction.push(cb);
    return cb;
  }
  set onSuccess(cb) {
    this.successCallBackFunction.push(cb);
    return cb;
  }
  set onError(cb) {
    this.errorCallBackFunction.push(cb);
    return cb;
  }
  set onEnd(cb) {
    this.endCallBackFunction.push(cb);
    return cb;
  }
  dispatch(type) {
    if (type == 'end') {
      const cbs = [...this['endCallBackFunction']];
      cbs.forEach((cb) => {
        cb(this.state, this.data);
      });
      return this;
    }
    if (this.isDispatch) {
      throw new Error('you can`t dispatch call dispatch!');
    }
    this.isDispatch = true;
    const key = `${type}CallBackFunction`;
    const cbs = [...this[key]];
    try {
      cbs.forEach((cb) => {
        cb(this.state, this.data);
      });
    } catch (error) {
      console.log(`dispatch ${type}`, error);
    }
    this.isDispatch = false;
    return this;
  }
}

export default Query;
