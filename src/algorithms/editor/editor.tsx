import MonacoEditor from '@monaco-editor/react'
import { useColorMode } from '@docusaurus/theme-common'
import { useState } from 'react'
import { transpile } from 'typescript'

interface EditorProps {
  initialCode?: string
  tests?: string[]
}

export function Editor ({ initialCode, tests }) {
  const { colorMode } = useColorMode()
  const [output, setOutput] = useState('')
  const [result, setResult] = useState('')
  const [code, setCode] = useState(initialCode ?? '')

  const executeCode = () => {
    try {
      const jsCode = transpile(code)
      const result = eval(`(${jsCode})()`);
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  }

  const runTests = () => {
    try {
      const jsCode = transpile(code)
      const result = eval(`(${jsCode})([2,4,6,8,10], 6)`)
      setResult(result)
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  }

  return (
    <>
    <div style={{ display: 'flex', gap: '.5rem' }}>
      <button className="button button--primary" onClick={executeCode}>Run code</button>
      <button className="button button--secondary" onClick={runTests}>Submit</button>
    </div>
    <p>{output}</p>
    <p>{result}</p>
      <MonacoEditor
        height={300}
        defaultLanguage="typescript"
        theme={colorMode === 'dark' ? 'vs-dark' : 'vs-light'}
        options={{
          minimap: { enabled: false },
        }}
        value={code}
        onChange={(value) => setCode(value)}
      />
    </>
  )
}
