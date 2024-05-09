import MonacoEditor from '@monaco-editor/react'
import { useColorMode } from '@docusaurus/theme-common'
import { useRef, useState } from 'react'
import { transpile } from 'typescript'
import Admonition from '@theme/Admonition'
import Translate, { translate } from '@docusaurus/Translate'
import styles from './styles.module.css'

interface EditorProps {
  initialCode?: string
  expectedResult: string
  args: string
  editorHeight?: number
  tests?: Array<{ input: string; output: string }>
}

interface Test {
  input: string
  output: string
  isCorrect?: boolean
}

export function Editor({ initialCode, expectedResult, args, tests, editorHeight = 300 }: EditorProps) {
  const { colorMode } = useColorMode()
  const [output, setOutput] = useState('')
  const codeRef = useRef(initialCode ?? '')

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
    for (const test of tests) {
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
          console.log(e.data, test.output)
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
    </>
  )
}
