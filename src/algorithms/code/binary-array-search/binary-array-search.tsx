import React, { useEffect, useState } from 'react'
import { Box } from '@site/src/algorithms/ui/box/box'
import Translate from '@docusaurus/Translate'
import styles from '../styles.module.css'

interface BinaryArraySearchProps {
  array: number[]
  element: number
}

export function BinaryArraySearch ({ array, element }: BinaryArraySearchProps) {
  const [low, setLow] = useState(0)
  const [high, setHigh] = useState(array.length - 1)

  const [mid, setMid] = useState(-1)
  const [returnValue, setReturnValue] = useState<null | number>(null)

  const eliminatedIndexes: number[] = []
  for (let i = 0; i < array.length; i++) {
    if (i < low || i > high) {
      eliminatedIndexes.push(i)
    }
  }

  const handleNext = () => {
    if (low <= high) {
      if (array[mid] > element) {
        setHigh(mid - 1)
      } else {
        setLow(mid + 1)
      }
    } else {
      setReturnValue(-1)
    }
  }

  useEffect(() => {
    if (low <= high) {
      setMid(Math.floor((low + high) / 2))
    }
  }, [low, high])

  useEffect(() => {
    if (element === array[mid]) {
      setReturnValue(mid)
    }
  }, [mid, element])

  useEffect(() => {
    console.log({ low, high, mid, returnValue })
  }, [low, high, mid, returnValue])

  const handlePrevious = () => {

  }

  const isNextButtonDisabled = returnValue !== null

  return (
    <div>
      <div className={styles.boxContainer}>
        {array.map((value, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ marginBottom: 0 }}>{index}</p>
            <Box isCurrent={index === mid} isDisabled={eliminatedIndexes.includes(index)}>
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
        <button className="button button--secondary" onClick={handleNext} disabled={isNextButtonDisabled}>
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
