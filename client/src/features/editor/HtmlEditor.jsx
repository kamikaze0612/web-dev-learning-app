/* eslint-disable react/prop-types */
import Editor from "./Editor";

function HtmlEditor({ onChange, value }) {
  return (
    <Editor onChange={onChange} value={value} mode={"html"} title={"HTML"} />
  );
}

export default HtmlEditor;
