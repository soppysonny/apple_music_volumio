// Utils.js - 工具函数模块（重建版本）

// 占位符：Firebase 相关函数
const Utils = {
  // 认证相关
  addAuthObserver: (callback) => {
    console.warn('Utils.addAuthObserver: Firebase not configured');
    // 返回一个清理函数
    return () => {};
  },

  login: (provider, callback) => {
    console.warn('Utils.login: Firebase not configured');
    callback(null, new Error('Firebase not configured'));
  },

  logout: (callback) => {
    console.warn('Utils.logout: Firebase not configured');
    if (callback) callback();
  },

  userRef: () => {
    console.warn('Utils.userRef: Firebase not configured');
    return null;
  },

  userProvider: () => {
    return null;
  },

  loginMethods: (email) => {
    console.warn('Utils.loginMethods: Firebase not configured');
    return Promise.resolve([]);
  },

  // Apple Music 相关
  connectApple: (music, callback) => {
    console.warn('Utils.connectApple: Not implemented');
    music.authorize().then(token => {
      if (callback) callback(token, null);
    }).catch(err => {
      if (callback) callback(null, err);
    });
  },

  disconnectApple: (callback) => {
    console.warn('Utils.disconnectApple: Not implemented');
    if (callback) callback();
  },

  isReallyLoggedIn: (music) => {
    return Promise.resolve(music.isAuthorized);
  },

  // Last.fm 相关
  scrobble: (key, nowPlaying, item, timestamp) => {
    console.log('Utils.scrobble:', { key, nowPlaying, item, timestamp });
    // Last.fm scrobbling 占位符
  },

  // 格式化和显示辅助函数
  icon: (artwork, width, height) => {
    if (!artwork) return '';
    if (typeof artwork === 'string') return artwork;
    if (artwork.url) {
      return artwork.url.replace('{w}', width).replace('{h}', height);
    }
    return '';
  },

  formatDate: (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  },

  durationSeconds: (seconds) => {
    if (!seconds || seconds === 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  },

  durationListFormat: (count, totalDuration) => {
    const hours = Math.floor(totalDuration / 3600000);
    const minutes = Math.floor((totalDuration % 3600000) / 60000);

    let result = `${count} song${count !== 1 ? 's' : ''}`;
    if (hours > 0) {
      result += `, ${hours} hr ${minutes} min`;
    } else {
      result += `, ${minutes} min`;
    }
    return result;
  },

  showArtist: (music, artist, event) => {
    if (event && event.preventDefault) event.preventDefault();
    console.log('Utils.showArtist:', artist);
    // 这里应该导航到艺术家页面
  },

  showAlbum: (music, album, event) => {
    if (event && event.preventDefault) event.preventDefault();
    console.log('Utils.showAlbum:', album);
    // 这里应该导航到专辑页面
  },

  isSameTrack: (track1, track2) => {
    if (!track1 || !track2) return false;
    return track1.id === track2.id;
  },
};

export default Utils;
