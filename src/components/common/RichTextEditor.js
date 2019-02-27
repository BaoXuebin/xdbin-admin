import React, { Component } from "react";
import { Button } from "antd";
// 引入编辑器组件
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";

const ButtonGroup = Button.Group;

class RichTextEditor extends Component {
    state = {
        mode: this.props.mode || "read", // 'read'
        editorState: BraftEditor.createEditorState(this.props.value)
    };

    handleChangeModeToRead = () => {
        this.setState({ mode: "read" }, () => { this.handleSave(); });
    };

    handleChangeModeToWrite = () => {
        this.setState({ mode: "write" });
    };

    handleEditorChange = editorState => {
        this.setState({ editorState });
    };

    handleSave = () => {
        this.props.onSave(this.state.editorState.toHTML());
    };

    render() {
        const { mode, editorState } = this.state;
        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ width: '50%', fontWeight: 'bolder', fontSize: '18px' }}>
                        {this.props.title || ''}
                    </div>
                    <div style={{ width: '50%', textAlign: "right" }}>
                        <ButtonGroup>
                            <Button
                                icon="eye"
                                onClick={this.handleChangeModeToRead}
                            />
                            <Button
                                icon="edit"
                                onClick={this.handleChangeModeToWrite}
                            />
                        </ButtonGroup>
                    </div>
                </div>
                {mode === "read" && (
                    <div
                        style={{ minHeight: "50px" }}
                        dangerouslySetInnerHTML={{ __html: this.props.value }}
                    />
                )}
                {mode === "write" && (
                    <BraftEditor
                        value={editorState}
                        onSave={this.handleSave}
                        onChange={this.handleEditorChange}
                    />
                )}
            </div>
        );
    }
}

export default RichTextEditor;
