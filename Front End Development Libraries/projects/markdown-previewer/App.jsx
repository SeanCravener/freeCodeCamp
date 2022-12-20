import React from "react";
// import './App.css';
// Needed to sanitize text from editor to prevent XSS attacks
import sanitizeHtml from "sanitize-html";
import { marked } from "marked";

const DEFAULT_TEXT =
  "# Markdown Previewer\n## Made w/ React & Bootstrap\n - Coded By **Sean Cravener**" +
  "\nCheck Out My [GitHub](https://github.com/SeanCravener)!\n\nHeres some code, `<div></div>`, between 2 backticks." +
  "\n```\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {" +
  "\n    return multiLineCode;\n  }\n}\n```";

const App = () => {
  const [editorText, setEditorText] = React.useState(DEFAULT_TEXT);

  const onChange = (e) => {
    setEditorText(e.target.value);
  };

  const createMarkup = () => {
    return { __html: sanitizeHtml(marked(editorText)) };
  };

  return (
    <div className="container-fluid">
      <div className="row text-center">
        <div className="col-sm-12 text-center p-5">
          <h1>Markdown Previewer</h1>
        </div>
        <div className="col-md-6 p-3 d-flex">
          <textarea
            className="container-fluid"
            id="editor"
            type="text"
            value={editorText}
            onChange={onChange}
          ></textarea>
        </div>
        <div className="col-md-6 p-3 d-flex">
          <div
            className="container-fluid"
            id="preview"
            dangerouslySetInnerHTML={createMarkup()}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default App;
