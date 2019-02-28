import React, { Component } from "react";
import { Button, Input } from "antd";
// 引入编辑器组件
import BraftEditor from "braft-editor";
import CodeHighlighter from "braft-extensions/dist/code-highlighter";
import "prismjs/components/prism-java";
import "prismjs/components/prism-json";
import "prismjs/components/prism-python";
import "prismjs/components/prism-sql";
// 引入编辑器样式
import "braft-editor/dist/index.css";
import "braft-extensions/dist/code-highlighter.css";

BraftEditor.use(
    CodeHighlighter({
        includeEditors: ["editor-with-code-highlighter"],
        syntaxs: [
            {
                name: "JavaScript",
                syntax: "javascript"
            },
            {
                name: "HTML",
                syntax: "html"
            },
            {
                name: "CSS",
                syntax: "css"
            },
            {
                name: "Java",
                syntax: "java"
            },
            {
                name: "Python",
                syntax: "python"
            },
            {
                name: "SQL",
                syntax: "sql"
            },
            {
                name: "Json",
                syntax: "json"
            }
        ]
    })
);
const ButtonGroup = Button.Group;
const { TextArea } = Input;

class MultiTextEditor extends Component {
    state = {
        mode: this.props.mode || "read", // 'read' 'text'
        editorState: BraftEditor.createEditorState(this.props.value)
    };

    handleChangeModeToRead = () => {
        if (this.state.mode === 'write') {
            this.handleSave();
        }
        this.setState({ mode: "read" });
    };

    handleChangeModeToWrite = () => {
        this.setState({
            mode: "write",
            editorState: BraftEditor.createEditorState(this.props.value)
        });
    };

    handleChangeModeToText = () => {
        this.setState({ mode: "text" });
    };

    handleEditorChange = editorState => {
        this.setState({ editorState });
    };

    handleChangeText = (e) => {
        // markdown
        this.props.onSave(1, e.target.value);
    };

    handleSave = () => {
        // html
        this.props.onSave(2, this.state.editorState.toHTML());
    };

    render() {
        const { mode, editorState } = this.state;
        return (
            <div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                        style={{
                            width: "50%",
                            fontWeight: "bolder",
                            fontSize: "18px"
                        }}
                    >
                        {this.props.title || ""}
                    </div>
                    <div style={{ width: "50%", textAlign: "right" }}>
                        <ButtonGroup>
                            <Button
                                icon="eye"
                                onClick={this.handleChangeModeToRead}
                            />
                            <Button
                                icon="form"
                                onClick={this.handleChangeModeToText}
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
                {mode === "text" && (
                    <div style={{ margin: "1rem 0" }}>
                        <TextArea
                            value={this.props.value}
                            onChange={this.handleChangeText}
                            placeholder="输入内容"
                            autosize={{ minRows: 5 }}
                        />
                    </div>
                )}
                {mode === "write" && (
                    <BraftEditor
                        id="editor-with-code-highlighter"
                        value={editorState}
                        onSave={this.handleSave}
                        onChange={this.handleEditorChange}
                    />
                )}
            </div>
        );
    }
}

export default MultiTextEditor;
