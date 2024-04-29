import React, { useState } from 'react'
import { Box } from '@site/src/algorithms/ui/box/box'
import Translate from '@docusaurus/Translate'

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
        <button className="button button--secondary" onClick={handlePrevious} disabled={currentIndex === -1}>
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
        {currentIndex > -1 ? (
          <>
            <p>
              <Translate id="algorithm.linearArraySearch.isItEqual_1">
                Is it
              </Translate>
              {array[currentIndex]}
              <Translate id="algorithm.linearArraySearch.isItEqual_2">
                equal to
              </Translate>
              {element}?</p>
            {array[currentIndex] === element ? (
            <p>
              <Translate id="algorithm.linearArraySearch.match">
                Yes! Return the index of this position
              </Translate>
              ({currentIndex}).</p>
            ) : (
            <p>
              <Translate id="algorithm.linearArraySearch.notMatch">
                No, go to the next element.
              </Translate>
            </p>
            )}
          </>
        ) : (
          <>
            <p>
              <Translate id="algorithm.actions.startDescription">
                Click on next to start the algorithm.
              </Translate>
            </p>
            <p>
              <Translate id="algorithm.actions.stepLogicDescription">
                The logic for each step will be displayed here.
              </Translate>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
