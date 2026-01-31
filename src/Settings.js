import React, { Component } from "react";
import {
  Card,
  Divider,
  HTMLTable,
  Callout
} from "@blueprintjs/core";

import "./s/Settings.css";
import Apple from "./i/Apple.png";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Card style={{ marginBottom: "10px" }}>
          <div style={{ textAlign: "center", padding: "20px" }}>
            <img
              src={Apple}
              alt="Apple Music"
              style={{ width: "100px", marginBottom: "20px" }}
            />
            <h3>Apple Music Web Player</h3>
            <p style={{ color: "#888" }}>
              已连接 Apple Music，可以使用完整功能
            </p>
          </div>
        </Card>

        <Card>
          <h4>关于</h4>
          <Divider />
          <HTMLTable style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td><strong>应用名称</strong></td>
                <td>ThinMusic for Volumio</td>
              </tr>
              <tr>
                <td><strong>版本</strong></td>
                <td>0.5.0</td>
              </tr>
              <tr>
                <td><strong>MusicKit</strong></td>
                <td>已配置</td>
              </tr>
              <tr>
                <td><strong>状态</strong></td>
                <td>运行中</td>
              </tr>
            </tbody>
          </HTMLTable>
        </Card>

        <Callout
          intent="primary"
          style={{ marginTop: "20px" }}
          title="提示"
        >
          <p>
            此版本已移除 Firebase 认证功能，直接使用 Apple Music 服务。
          </p>
          <p>
            如需 Last.fm scrobbling 或社交登录功能，请配置相应服务。
          </p>
        </Callout>
      </div>
    );
  }
}

export default Settings;
