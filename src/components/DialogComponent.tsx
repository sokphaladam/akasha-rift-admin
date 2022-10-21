import { Dialog } from "evergreen-ui";
import React, { Component } from "react";

interface IButton {
  title: string;
  onPress?: () => void;
  class?: any;
  invisible?: boolean;
}

interface IState {
  visible?: boolean;
  title?: string;
  message?: string;
  buttons: IButton[];
  body?: React.ComponentType;
}

export class DialogComponent extends Component<{}, IState> {
  pressRef: any | null = null;

  state: IState = {
    visible: false,
    title: "",
    message: "",
    buttons: [],
    body: () => <></>,
  };

  onShow = (p: IState) => {
    this.setState({
      ...p,
      visible: true,
    });
  };

  onPress = (press?: () => void) => {
    if (!!press) {
      this.pressRef = press;
    }
    this.onClose();
  };

  onClose = () => {
    this.setState(
      {
        title: "",
        message: "",
        buttons: [],
        body: () => <></>,
        visible: false,
      },
      () => {
        if (!!this.pressRef) {
          this.pressRef();
          this.pressRef = null;
        }
      }
    );
  };

  render() {
    return (
      <Dialog
        isShown={this.state.visible}
        onCloseComplete={this.onClose}
        onCancel={this.onClose}
        title={this.state.title}
        hasFooter={false}
      >
        <div>{this.state.message}</div>
        <br />
        {this.state.body}
        <div style={{ display: "flex", justifyContent: "right" }}>
          {this.state.buttons.map((btn, i) => (
            <button
              key={i}
              className={`btn btn-${btn.class} btn-sm m-1`}
              onClick={() => this.onPress(btn.onPress)}
              style={{ display: btn.invisible ? "none" : "" }}
            >
              {btn.title}
            </button>
          ))}
        </div>
      </Dialog>
    );
  }
}
