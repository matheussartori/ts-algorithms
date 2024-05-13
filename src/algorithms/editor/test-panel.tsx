import Translate from '@docusaurus/Translate'
import { Test } from './editor'

interface TestPanelProps {
  tests: Test[]
}

export function TestPanel({ tests }: TestPanelProps) {
  return (
    <>
      <h2>Tests</h2>
      <table style={{ display: 'table', width: '100%' }}>
        <thead>
          <tr>
            <th>
              <Translate id="editor.testPanel.input">
                Input
              </Translate>
            </th>
            <th>
              <Translate id="editor.testPanel.expectedOutput">
                Expected output
              </Translate>
            </th>
            <th>
              <Translate id="editor.testPanel.output">
                Output
              </Translate>
            </th>
            <th>
              <Translate id="editor.testPanel.result">
                Result
              </Translate>
            </th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test, index) => (
            <tr key={index}>
              <td>{test.input}</td>
              <td>{test.expectedOutput}</td>
              <td>{test.output}</td>
              <td>{test.isCorrect === undefined ? '⏳' : test.isCorrect ? '✅' : '❌'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
