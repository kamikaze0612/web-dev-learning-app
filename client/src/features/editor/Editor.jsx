/* eslint-disable react/prop-types */
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-monokai";

function Editor({ mode, title, onChange, value }) {
  return (
    <AceEditor
      onChange={onChange}
      mode={mode}
      theme="xcode"
      value={value}
      name={title}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      tabSize={2}
      width="100%"
      height="75vh"
    />
  );
}

export default Editor;
