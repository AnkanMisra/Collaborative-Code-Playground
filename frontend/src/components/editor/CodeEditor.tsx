import { Editor } from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  language: string;
  onChange: (value: string) => void;
}

const CodeEditor = ({ code, language, onChange }: CodeEditorProps) => {
  return (
    <div className="h-[calc(100vh-12rem)]">
      <Editor
        height="100%"
        defaultLanguage={language}
        language={language}
        theme="vs-dark"
        value={code}
        onChange={(value) => onChange(value || "")}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          scrollBeyondLastLine: false,
          roundedSelection: false,
          padding: { top: 10 },
          automaticLayout: true,
          wordWrap: "on",
          lineNumbers: "on",
          folding: true,
          bracketPairColorization: { enabled: true },
        }}
      />
    </div>
  );
};

export default CodeEditor;