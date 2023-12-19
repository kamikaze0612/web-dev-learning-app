/* eslint-disable react/prop-types */
import Editor from "./Editor";

function CssEditor({ value, onChange }) {
  return (
    <Editor mode={"css"} value={value} onChange={onChange} title={"CSS"} />
  );
}

export default CssEditor;
