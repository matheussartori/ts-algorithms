import React, { useState } from 'react'
import styles from './styles.module.css'
import { Box } from '@site/src/algorithms/ui/box/box'

interface LinearArraySearchProps {
  array: number[]
  element: number
}

export function LinearArraySearch ({ array, element }: LinearArraySearchProps) {
  const [currentIndex, setCurrentIndex] = useState(-1)

  const handleNext = () => {
    if (currentIndex < array.length - 1 && array[currentIndex] !== element) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > -1) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        {array.map((value, index) => (
          <Box
            key={index}
            isActive={currentIndex === index && array[currentIndex] === element}
            isCurrent={currentIndex === index}
          >
            {value}
          </Box>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '.75rem', marginTop: '.75rem', marginBottom: '.75rem' }}>
        <button className="button button--secondary" onClick={handlePrevious} disabled={currentIndex === -1}>Previous</button>
        <button className="button button--secondary" onClick={handleNext}>Next</button>
      </div>
      <div>
        {currentIndex > -1 ? (
          <>
            <p>Is it {array[currentIndex]} equal to {element}?</p>
            {array[currentIndex] === element ? (
            <p>Yes! Return the index of this position ({currentIndex}).</p>
            ) : (
            <p>No, go to the next element.</p>
            )}
          </>
        ) : (
          <>
            <p>Click on next to start the algorithm.</p>
            <p>The logic for each step will be displayed here.</p>
          </>
        )}
      </div>
    </div>
  )
}
