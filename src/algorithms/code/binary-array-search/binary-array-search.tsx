import React, { useEffect, useState } from 'react'
import { Box } from '@site/src/algorithms/ui/box/box'
import Translate from '@docusaurus/Translate'
import styles from '../styles.module.css'
import { Debugger } from '../../ui/debugger/debugger'

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

  useEffect(() => {
    console.log(versions)
  }, [versions])

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
        setVersions(prevVersions => [...prevVersions, newVersion])
      } else if (array[mid] > element) {
        const newVersion: Version = {
          ...currentVersion,
          high: mid - 1,
          mid: Math.floor((currentVersion.low + currentVersion.high) / 2),
          eliminatedIndexes
        }
        setVersions(prevVersions => [...prevVersions, newVersion])
      } else {
        const newVersion: Version = {
          ...currentVersion,
          low: mid + 1,
          mid: Math.floor((currentVersion.low + currentVersion.high) / 2),
          eliminatedIndexes
        }
        setVersions(prevVersions => [...prevVersions, newVersion])
      }
    } else {
      const newVersion: Version = {
        ...currentVersion,
        returnValue: -1,
      }
      setVersions(prevVersions => [...prevVersions, newVersion])
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
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <div className={styles.boxContainer}>
          {array.map((value, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <p style={{ marginBottom: 0 }}>{index}</p>
              <Box
                isCurrent={currentVersion && index === currentVersion.mid}
                isDisabled={currentVersion && currentVersion.eliminatedIndexes.includes(index)}
                isActive={currentVersion && element === array[currentVersion.mid] && element === array[index]}
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
      <div>
      <h3>Debugger</h3>
        <Debugger>
          <p>--------------------------</p>
          {currentVersion && <p>low: {versions.length === 1 ? currentVersion.low : versions[versions.length - 2].low}</p>}
          {currentVersion && <p>high: {versions.length === 1 ? currentVersion.high : versions[versions.length - 2].high}</p>}
          {currentVersion && currentVersion.mid > -1 ? <p>mid: {currentVersion.mid}</p> : <p>mid: null</p>}
          {currentVersion && <p>return value: {currentVersion.returnValue ?? 'null'}</p>}
          <p>--------------------------</p>
        </Debugger>
      </div>
    </div>
  )
}
