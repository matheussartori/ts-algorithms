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
      <div>
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
      <div>
        {currentIndex > -1 && (
          <div>
            <p>Is it {array[currentIndex]} equal to {element}?</p>
            {array[currentIndex] === element ? (
            <p>Yes! Return the index of this position ({currentIndex}).</p>
            ) : (
            <p>No, go to the next element.</p>
            )}
          </div>
        )}
      </div>
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
    </div>
  )
}
