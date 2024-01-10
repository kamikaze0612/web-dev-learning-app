import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";

import CssEditor from "../features/editor/CssEditor";
import HtmlEditor from "../features/editor/HtmlEditor";
import { useDebounce } from "../hooks/useDebounce";
import { useInstruction } from "../context/InstructionContext";
import CheckButton from "../features/editor/CheckButton";
import Modal from "./Modal";
import toast from "react-hot-toast";

const StyledPane = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props["bg-color"]};
  position: relative;
`;

const Preview = styled.iframe`
  width: 100%;
  height: 100%;
  display: block;
  border: 0;
`;

const Buttons = styled.div`
  height: 5vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 4px solid var(--color-grey-900);
  width: 100%;
`;

const Button = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  cursor: pointer;

  &.active {
    color: #fff;
    background-color: var(--color-grey-900);
    border: none;
  }
`;

function AppLayout() {
  const { id } = useParams();
  const { data } = useInstruction();

  // SHOWING FORM
  const [showModal, setShowModal] = useState(false);

  // SIZING PANEL SIZE
  const [sizes, setSizes] = useState(["50vw", "50vw"]);

  // HTML AND CSS CODES
  const [htmlValue, setHtmlValue] = useState("");
  const [cssValue, setCssValue] = useState("");

  // OUTPUT CODE
  const [outputValue, setOutputValue] = useState("");

  // ACTIVE EDITOR TAB
  const [activeEditor, setActiveEditor] = useState("html");

  // DELAY RENDER BY 1 SECOND
  const htmlDebounced = useDebounce(htmlValue, 1000);
  const cssDebounced = useDebounce(cssValue, 1000);

  useEffect(() => {
    if (data?.[id - 1]?.startingCode.html)
      setHtmlValue(data?.[id - 1]?.startingCode.html);
    if (data?.[id - 1]?.startingCode.css)
      setCssValue(data?.[id - 1]?.startingCode.css);
  }, [data, id]);

  useEffect(() => {
    const output = `<html>
                    <style>
                    ${cssDebounced}
                    </style>
                    <body>
                    ${htmlDebounced}
                    </body>
                  </html>`;
    setOutputValue(output);
  }, [cssDebounced, htmlDebounced]);

  const handleCheckCode = function () {
    console.log(htmlValue.replaceAll(" ", "").replaceAll("\t", ""));
    console.log(data?.[id - 1]?.checkingCode?.html);
    if (
      htmlValue.replaceAll(" ", "").replaceAll("\t", "") ==
      data?.[id - 1]?.checkingCode?.html
    ) {
      setShowModal(true);
    } else {
      toast.error("Дахин нэг удаа нягтална уу.");
    }
  };

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      {showModal && <Modal onShow={setShowModal} />}
      <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
        <Pane minSize={600}>
          <StyledPane
            style={{ borderRight: "4px solid var(--color-grey-700)" }}
          >
            <Outlet />
            <Buttons>
              <Button
                onClick={() => setActiveEditor("html")}
                className={activeEditor === "html" ? `active` : ""}
              >
                index.html
              </Button>
              <Button
                onClick={() => setActiveEditor("css")}
                className={activeEditor === "css" ? `active` : ""}
              >
                styles.css
              </Button>
            </Buttons>
            {activeEditor === "html" && (
              <HtmlEditor onChange={setHtmlValue} value={htmlValue} />
            )}
            {activeEditor === "css" && (
              <CssEditor onChange={setCssValue} value={cssValue} />
            )}
            <CheckButton onCheck={handleCheckCode} />
          </StyledPane>
        </Pane>
        <Pane minSize="50vw">
          <div style={{ height: "100vh" }}>
            <Preview allow="fullscreen" srcDoc={outputValue}></Preview>
          </div>
        </Pane>
      </SplitPane>
    </div>
  );
}

export default AppLayout;
