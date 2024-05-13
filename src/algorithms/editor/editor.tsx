import MonacoEditor from '@monaco-editor/react'
import { useColorMode } from '@docusaurus/theme-common'
import { useRef, useState } from 'react'
import { transpile } from 'typescript'
import Admonition from '@theme/Admonition'
import Translate, { translate } from '@docusaurus/Translate'
import styles from './styles.module.css'
import { TestPanel } from './test-panel'

interface EditorProps {
  initialCode?: string
  expectedResult: string
  args: string
  editorHeight?: number
  tests?: Array<{ id: string, input: string; expectedOutput: string }>
}

export interface Test {
  id: string
  input: string
  output?: string
  expectedOutput: string
  isCorrect?: boolean
}

export function Editor({ initialCode, expectedResult, args, tests, editorHeight = 300 }: EditorProps) {
  const { colorMode } = useColorMode()
  const [output, setOutput] = useState('')
  const codeRef = useRef(initialCode ?? '')
  const [testResults, setTestResults] = useState<Test[]>(tests)

  const executeCode = () => {
    try {
      const workerCode = `
        onmessage = function(e) {
          try {
            const result = eval('(' + e.data.code + ')')(${args})
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

      worker.postMessage({ code: transpile(codeRef.current) })
    } catch (error) {
      setOutput(`Error: ${error.message}`)
    }
  }

  const executeTests = () => {
    for (const test of testResults) {
      try {
        const workerCode = `
          onmessage = function(e) {
            try {
              const result = eval('(' + e.data.code + ')')(${test.input})
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
          console.error('Error: Timeout reached. Execution took too long.')
        }, 3000)

        worker.onmessage = (e) => {
          clearTimeout(timeout)
          const result = e.data == test.expectedOutput
          setTestResults((prev) => prev.map((testItem) => (testItem.id === test.id ? { ...testItem, isCorrect: result, output: e.data } : testItem)))
        }

        worker.postMessage({ code: transpile(codeRef.current) })
      } catch (error) {
        console.error(`Error: ${error.message}`)
      }
    }
  }

  return (
    <>
      <div className={styles.container}>
        <button className="button button--secondary" onClick={executeCode}>
          <Translate id="editor.runCode.text">
            Run code
          </Translate>
        </button>
        <button className="button button--primary" onClick={executeTests}>
          Attempt solution
        </button>
      </div>
      <MonacoEditor
        height={editorHeight}
        defaultLanguage="typescript"
        theme={colorMode === 'dark' ? 'vs-dark' : 'vs-light'}
        options={{
          padding: { top: 16 },
          minimap: { enabled: false },
        }}
        value={codeRef.current}
        onChange={(value) => codeRef.current= value}
      />
      <div style={{ marginTop: '1rem' }}>
      {output !== "" && expectedResult == output ? (
        <Admonition type="success" title={translate({ message: 'admonition.success.text'} )}>
          <Translate id="editor.sucess.text">
            Your code works for the sample test case.
          </Translate>
        </Admonition>
      ) : output !== "" && expectedResult != output ? (
        <Admonition type="warning">
          <Translate id="editor.error.text">
            Your code did not match the expected output for the sample test case.
          </Translate>
        </Admonition>
      ) : (
        <Admonition type="note">
          <Translate id="editor.pending.text">
            Finish the function above and click on `Run code` to check if your algorithm is correct.
          </Translate>
        </Admonition>
      )}
      </div>
      <TestPanel tests={testResults} />
    </>
  )
}
