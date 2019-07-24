/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// @flow
import React, { Component } from 'react';
import styles from './Attachments.css';
import utility from '../../../utils/utility';

const classNames = require('classnames');
const { remote } = require('electron');

const { dialog } = remote;
const fs = require('fs');

const { app } = remote;

type Props = {
  attachments: Array<string>,
  onAddAttachment: (path: string) => void,
  onRemoveAttachment: (file: string) => void
};

type States = {
  selectedAttachment: string
};

export default class Attachments extends Component<Props, States> {
  props: Props;

  state = {
    selectedAttachment: ''
  };

  onAddAttachment = () => {
    dialog.showOpenDialog(
      {
        filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif', 'jpeg'] }]
      },
      filePaths => {
        if (filePaths === undefined) {
          return;
        }
        const homePath = `${app.getPath('home')}/adam602`;
        filePaths.map(filePath => {
          const fileName = utility.getRandomInt();
          const copyPath = `${homePath}/${fileName}`;
          fs.copyFile(filePath, copyPath, err => {
            if (err) {
              alert('Can not copy file');
            }

            const { onAddAttachment } = this.props;
            onAddAttachment(copyPath);
          });
        });
      }
    );
  };

  onRemoveAttachment = () => {
    const { selectedAttachment } = this.state;
    if (selectedAttachment) {
      const { onRemoveAttachment } = this.props;
      fs.unlink(selectedAttachment, () => {});
      onRemoveAttachment(selectedAttachment);
    }
  };

  renderAttachments = (attachments: Array) => {
    if (attachments) {
      const { selectedAttachment } = this.state;
      const result = attachments.map((attachment: string, index: number) => {
        let attatchmentClassName = styles.attachmentContainer;
        if (attachment === selectedAttachment) {
          attatchmentClassName = classNames(
            styles.attachmentContainer,
            styles.selected
          );
        }
        return (
          <div
            key={index}
            className={attatchmentClassName}
            onClick={() => this.setSelectedAttachment(attachment)}
          >
            <img
              alt="attachment"
              src={attachment}
              className={styles.attachment}
            />
          </div>
        );
      });
      return result;
    }
    return null;
  };

  setSelectedAttachment = (attachment: string) => {
    this.setState({
      selectedAttachment: attachment
    });
  };

  render() {
    const { attachments } = this.props;

    return (
      <fieldset>
        <legend>Attachments</legend>
        <div
          className={classNames(
            'rounded-description-container',
            styles.attchmentsContainer
          )}
        >
          {this.renderAttachments(attachments)}
        </div>
        <div className={styles.buttonContainer}>
          <button
            type="button"
            className="tab-container-button"
            onClick={this.onAddAttachment}
          >
            +
          </button>
          <button
            type="button"
            className="tab-container-button"
            onClick={this.onRemoveAttachment}
          >
            -
          </button>
        </div>
      </fieldset>
    );
  }
}
