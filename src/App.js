import React, { Component } from "react";
import {
  Divider
} from "@blueprintjs/core";
import { isChrome } from "react-device-detect";

import "./s/App.css";
import Panel from "./Panel";
import Player from "./Player";

const MusicKit = window.MusicKit;
const AUTH_LOGGED_IN = 2;

class App extends Component {
  constructor(props) {
    super(props);
    let instance = MusicKit.getInstance();
    this.state = {
      authState: AUTH_LOGGED_IN,
      user: { apple: true }, // 简化的用户对象
      music: instance,
      currentTrack: null,
      audioElement: null,
      audioContext: null,
      audioSource: null
    };
    this.itemId = null;
    this.panel = React.createRef();
  }

  componentDidMount() {
    let self = this;
    self.state.music.addEventListener("mediaCanPlay", () => {
      if (self.state.audioElement) {
        return;
      }

      let element = window.document.getElementById("apple-music-player");
      let context = null;
      let source = null;
      if (isChrome) {
        context = new (window.AudioContext || window.webkitAudioContext)();
        source = context.createMediaElementSource(element);
        source.connect(context.destination);
      }
      self.setState({
        audioElement: element,
        audioContext: context,
        audioSource: source
      });
    });

    // Last.fm scrobbling 已禁用（需要配置）
    // self.state.music.addEventListener("mediaItemWillChange", event => {
    //   let item = event.item;
    //   self.itemId = item.id;
    // });
  }

  componentWillUnmount() {
    this.state.music.removeEventListener("mediaCanPlay");
  }

  userUpdate = () => {
    // Firebase 已移除，此方法保留以兼容 Panel 组件
  };

  showCollection = (item, event) => {
    if (this.panel && this.panel.current) {
      this.panel.current.showCollection(item, event);
    }
  };

  render() {
    return (
      <div className="app">
        <Player
          music={this.state.music}
          audioElement={this.state.audioElement}
          audioContext={this.state.audioContext}
          audioSource={this.state.audioSource}
          showCollection={this.showCollection}
        />
        <Panel
          ref={this.panel}
          music={this.state.music}
          user={this.state.user}
          userUpdate={this.userUpdate}
        />
        <Divider />
      </div>
    );
  }
}

export default App;
