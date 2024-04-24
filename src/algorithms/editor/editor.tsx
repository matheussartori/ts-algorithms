import MonacoEditor from '@monaco-editor/react'
import { useColorMode } from '@docusaurus/theme-common'
import { useState } from 'react'

const defaultValue = `function findTreasureIndex (treeBranches, targetBranches) {
  return -1
}`

export function Editor () {
  const { colorMode } = useColorMode()
  const [output, setOutput] = useState('')
  const [code, setCode] = useState(defaultValue)

  const executeCode = () => {
    try {
      const result = eval(`(${code})()`);
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <>
    <button onClick={executeCode}>Execute</button>
    <p>{output}</p>
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
