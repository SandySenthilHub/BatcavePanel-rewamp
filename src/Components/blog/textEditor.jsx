import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, Modifier } from 'draft-js';
import 'draft-js/dist/Draft.css';

const RichTextEditor = ({ handleContentChange, initialContent }) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const onChange = (editorState) => {
    setEditorState(editorState);
    handleContentChange(editorState.getCurrentContent().getPlainText());
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const applyInlineStyle = (style) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();

    const newContentState = Modifier.applyInlineStyle(contentState, selection, style);
    const newEditorState = EditorState.push(editorState, newContentState, 'change-inline-style');

    onChange(newEditorState);
  };

  const onBoldClick = () => {
    applyInlineStyle('BOLD');
  };

  const onItalicClick = () => {
    applyInlineStyle('ITALIC');
  };

  const onUnderlineClick = () => {
    applyInlineStyle('UNDERLINE');
  };

  return (
    <div>
      <div className="toolbar">
        <button onClick={onBoldClick}>Bold</button>
        <button onClick={onItalicClick}>Italic</button>
        <button onClick={onUnderlineClick}>Underline</button>
      </div>
      <div className="editor-container">
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
          placeholder="Enter your text here..."
          stripPastedStyles
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
