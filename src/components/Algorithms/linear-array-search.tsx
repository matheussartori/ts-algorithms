import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'

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
          <div
            key={index}
            style={{
              width: '50px',
              height: '50px',
              border: '1px solid black',
              display: 'flex',
              margin: '5px',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            className={currentIndex === index && array[currentIndex] === element ? styles.found : currentIndex === index ? styles.active : ''}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  )
}