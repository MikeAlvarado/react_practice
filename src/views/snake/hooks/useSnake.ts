import { useEffect, useState } from 'react'
import { createSnake, setDirection, tickSnake } from '../logic/snake'
import type { GameStatus, Snake } from '../types/snake.types'

export function useSnake(gridSize: number, tickIntervalMs: number) {
  const [snake, setSnake] = useState<Snake>(() => createSnake(gridSize))
  const [status, setStatus] = useState<GameStatus>('PLAYING')

  useEffect(() => {
    if (status !== 'PLAYING') return

    const intervalId = setInterval(() => {
      setSnake((currentSnake) => {
        const result = tickSnake(currentSnake, gridSize)
        setStatus(result.status)
        return result.snake
      })
    }, tickIntervalMs)

    return () => clearInterval(intervalId)
  }, [status, gridSize, tickIntervalMs])

  useEffect(() => {
    if (status !== 'PLAYING') return

    const handleKeyDown = (event: KeyboardEvent) => {
      setSnake((currentSnake) => setDirection(currentSnake, event.key))
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [status])

  const reset = () => {
    setSnake(createSnake(gridSize))
    setStatus('PLAYING')
  }

  return { snake, status, reset }
}
