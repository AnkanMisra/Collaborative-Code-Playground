import { Editor } from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
}

const CodeEditor = ({ code, onChange }: CodeEditorProps) => {
  return (
    <div className="h-[calc(100vh-12rem)]">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={(value) => onChange(value || "")}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          roundedSelection: false,
          padding: { top: 10 },
        }}
      />
    </div>
  );
};

export default CodeEditor;