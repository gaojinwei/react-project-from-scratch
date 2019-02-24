if (typeof window != 'undefined') {
  window.setupWebViewJavascriptBridge = (callback) => {
    if (window.WebViewJavascriptBridge) {
      return callback(window.WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    const WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(() => {
      document.documentElement.removeChild(WVJBIframe);
    }, 0);
    return null;
  };
}

let isiOS = false;
if (typeof navigator != 'undefined') {
  const u = navigator.userAgent;
  isiOS = u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

function callNative(methodName, jsonData = {}) {
  if (typeof window != 'undefined' && isiOS) {
    const iosMethodName = `TZ.${methodName}`;
    window.setupWebViewJavascriptBridge((bridge) => {
      bridge.callHandler(iosMethodName, JSON.stringify(jsonData), () => {
        // do nothing
      });
    });
  } else {
    const androidMethodName = methodName;
    if (
      typeof window != 'undefined' &&
      typeof window.TZ != 'undefined' &&
      typeof window.TZ[androidMethodName] != 'undefined'
    ) {
      window.TZ[androidMethodName](JSON.stringify(jsonData));
    }
  }
}

export default {
  openAppToAppStore(jsonData) {
    callNative('openAppToAppStore', jsonData);
  },
  openAppToPage(to_page) {
    callNative('openAppToPage', { to_page });
  },
  openAppShareToSNS(shareData) {
    callNative('openAppShareToSNS', shareData);
  },
  openAppToBackPage() {
    callNative('openAppToBackPage');
  },
  refreshVip() {
    callNative('refreshVip');
  }
};

export let statistic = (eventKey, eventDetail) => {
  return callNative('statistic', { eventKey, eventDetail });
};
