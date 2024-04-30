import React, { useEffect, useState } from 'react'
import { Box } from '@site/src/algorithms/ui/box/box'
import Translate from '@docusaurus/Translate'
import styles from '../styles.module.css'

interface BinaryArraySearchProps {
  array: number[]
  element: number
}

interface Version {
  mid: number
  low: number
  high: number
  returnValue: null | number
  eliminatedIndexes: number[]
}

export function BinaryArraySearch({ array, element }: BinaryArraySearchProps) {
  const [versions, setVersions] = useState<Version[]>([
    {
      mid: -1,
      low: 0,
      high: array.length - 1,
      returnValue: null,
      eliminatedIndexes: [],
    }
  ])

  const currentVersion = versions[versions.length - 1]

  const handleNext = () => {
    if (currentVersion && currentVersion.low <= currentVersion.high) {
      const mid = Math.floor((currentVersion.low + currentVersion.high) / 2)

      const eliminatedIndexes: number[] = []

      for (let i = 0; i < array.length; i++) {
        if (i < currentVersion.low || i > currentVersion.high) {
          eliminatedIndexes.push(i)
        }
      }
      if (array[mid] === element) {
        const newVersion: Version = {
          ...currentVersion,
          mid,
          returnValue: mid,
          eliminatedIndexes
        }
        setVersions([...versions, newVersion])
      } else if (array[mid] > element) {
        const newVersion: Version = {
          ...currentVersion,
          high: mid - 1,
          mid: Math.floor((currentVersion.low + currentVersion.high) / 2),
          eliminatedIndexes
        }
        setVersions([...versions, newVersion])
      } else {
        const newVersion: Version = {
          ...currentVersion,
          low: mid + 1,
          mid: Math.floor((currentVersion.low + currentVersion.high) / 2),
          eliminatedIndexes
        }
        setVersions([...versions, newVersion])
      }
    } else {
      const newVersion: Version = {
        ...currentVersion,
        returnValue: -1,
      }
      setVersions([...versions, newVersion])
    }
  }

  const handlePrevious = () => {
    if (versions.length > 1) {
      setVersions(versions.slice(0, -1))
    }
  }

  const isNextButtonDisabled = currentVersion && currentVersion.returnValue !== null
  const isPreviousButtonDisabled = versions.length === 1

  return (
    <div>
      <div className={styles.boxContainer}>
        {array.map((value, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ marginBottom: 0 }}>{index}</p>
            <Box
              isCurrent={currentVersion && index === currentVersion.mid}
              isDisabled={currentVersion && currentVersion.eliminatedIndexes.includes(index)}
            >
              {value}
            </Box>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '.75rem', marginTop: '.75rem', marginBottom: '.75rem' }}>
        <button className="button button--secondary" onClick={handlePrevious} disabled={isPreviousButtonDisabled}>
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
