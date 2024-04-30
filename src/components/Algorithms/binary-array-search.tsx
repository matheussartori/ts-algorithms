import React, { useState } from 'react'
import { Box } from '@site/src/algorithms/ui/box/box'
import Translate from '@docusaurus/Translate'

interface BinaryArraySearchProps {
  array: number[]
  element: number
}

export function BinaryArraySearch ({ array, element }: BinaryArraySearchProps) {
  const [mid, setMid] = useState(-1)
  const [low, setLow] = useState(array[0])
  const [high, setHigh] = useState(array[array.length - 1])

  const handleNext = () => {

  }

  const handlePrevious = () => {

  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        {array.map((value, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ marginBottom: 0 }}>{index}</p>
            <Box>
              {value}
            </Box>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '.75rem', marginTop: '.75rem', marginBottom: '.75rem' }}>
        <button className="button button--secondary" onClick={handlePrevious}>
          <Translate id="algorithm.actions.previous">
            Previous
          </Translate>
        </button>
        <button className="button button--secondary" onClick={handleNext}>
          <Translate id="algorithm.actions.next">
            Next
          </Translate>
        </button>
      </div>
      <div>
        {/* Actions */}
      </div>
    </div>
  )
}
