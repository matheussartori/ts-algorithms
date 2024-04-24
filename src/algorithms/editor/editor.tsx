import MonacoEditor from '@monaco-editor/react'
import { useColorMode } from '@docusaurus/theme-common'
import { useState } from 'react'
import { transpile } from 'typescript'

interface EditorProps {
  initialCode?: string
}

export function Editor({ initialCode }: EditorProps) {
  const { colorMode } = useColorMode()
  const [output, setOutput] = useState('')
  const [code, setCode] = useState(initialCode ?? '')

  const executeCode = () => {
    try {
      const workerCode = `
        onmessage = function(e) {
          try {
            const result = eval('(' + e.data.code + ')')([1], 1)
            postMessage(result)
          } catch (error) {
            postMessage('Error: ' + error.message)
          }
        }
      `

      const blob = new Blob([workerCode], { type: 'application/javascript' })
      const workerURL = URL.createObjectURL(blob)
      const worker = new Worker(workerURL)

      const timeout = setTimeout(() => {
        worker.terminate()
        setOutput('Error: Timeout reached. Execution took too long.')
      }, 3000)

      worker.onmessage = (e) => {
        clearTimeout(timeout)
        setOutput(e.data)
      }

      worker.postMessage({ code: transpile(code) })
    } catch (error) {
      setOutput(`Error: ${error.message}`)
    }
  }

  return (
    <>
      <div style={{ display: 'flex', gap: '.5rem' }}>
        <button className="button button--primary" onClick={executeCode}>Run code</button>
      </div>
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
