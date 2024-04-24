import MonacoEditor from '@monaco-editor/react'
import { useColorMode } from '@docusaurus/theme-common'
import { useState } from 'react'
import { transpile } from 'typescript'
import SucessMDX from './success.mdx'
import ErrorMDX from './error.mdx'
import PendingMDX from './pending.mdx'

interface EditorProps {
  initialCode?: string
  expectedResult: string
  returnValue: string
  args: string
  editorHeight?: number
}

export function Editor({ initialCode, expectedResult, args, returnValue, editorHeight = 300 }: EditorProps) {
  const { colorMode } = useColorMode()
  const [output, setOutput] = useState('')
  const [code, setCode] = useState(initialCode ?? '')

  const executeCode = () => {
    try {
      const workerCode = `
        onmessage = function(e) {
          try {
            const result = eval('(' + e.data.code + ')')(${args}, ${returnValue})
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
      <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1rem' }}>
        <button className="button button--primary" onClick={executeCode}>Run code</button>
      </div>
      <MonacoEditor
        height={editorHeight}
        defaultLanguage="typescript"
        theme={colorMode === 'dark' ? 'vs-dark' : 'vs-light'}
        options={{
          padding: { top: 16 },
          minimap: { enabled: false },
        }}
        value={code}
        onChange={(value) => setCode(value)}
      />
      <div>
      {output !== "" && expectedResult == output ? (
        <SucessMDX />
      ) : output !== "" && expectedResult != output ? (
        <ErrorMDX />
      ) : (
        <PendingMDX />
      )}
      </div>
    </>
  )
}
