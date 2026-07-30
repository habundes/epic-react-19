import { useEffect, useReducer } from 'react'
import { calculateNextValue, calculateStatus, calculateWinner, isValidGameState, type GameState,
} from '../shared/tic-tac-toe-utils'
import Board from './Board'

const defaultState: GameState = {
	history: [Array(9).fill(null)],
	currentStep: 0,
}

const localStorageKey = 'tic-tac-toe'

type GameAction = | { type: 'SELECT_SQUARE'; index: number } | { type: 'RESTART' } | { type: 'SELECT_STEP'; step: number };

function gameStateReducer(state: GameState, action: GameAction) {
	switch (action.type) {
		case 'SELECT_SQUARE': {
      const { index } = action
      const currentSquares = state.history[state.currentStep]
      const winner = calculateWinner(currentSquares)
      const nextValue = calculateNextValue(currentSquares)

      if (winner || currentSquares[index]) return state
			const { currentStep, history } = state
			const newHistory = history.slice(0, currentStep + 1)
			const squares = history[currentStep].with(index, nextValue)

			return {
				history: [...newHistory, squares],
				currentStep: newHistory.length,
			}
    }
		case 'RESTART':
			return defaultState
		case 'SELECT_STEP':
			return {
				...state,
				currentStep: action.step,
			}
	}
}

function getInitialGameState() {
  let localStorageValue
  try {
    localStorageValue = JSON.parse(
      window.localStorage.getItem(localStorageKey) ?? 'null',
    )
  } catch {
    // something is wrong in localStorage, so don't use it
  }
  return isValidGameState(localStorageValue)
    ? localStorageValue
    : defaultState
}

export default function Game() {
  const  [state, dispatch] = useReducer(gameStateReducer, null,  getInitialGameState)
	const currentSquares = state.history[state.currentStep]

	const winner = calculateWinner(currentSquares)
	const nextValue = calculateNextValue(currentSquares)
	const status = calculateStatus(winner, currentSquares, nextValue)

	useEffect(() => {
		window.localStorage.setItem(localStorageKey, JSON.stringify(state))
	}, [state])

	function selectSquare(index: number) {
    dispatch({ type: 'SELECT_SQUARE', index })
	}

	function restart() {
    dispatch({ type: 'RESTART' })
	}

	const moves = state.history.map((_stepSquares, step) => {
		const desc = step ? `Go to move number ${step}` : 'Go to game start'
		const isCurrentStep = step === state.currentStep
		return (
			<li key={step}>
				<button
					onClick={ () => dispatch({ type: 'SELECT_STEP', step })}
					disabled={isCurrentStep}
				>
					{desc} {isCurrentStep ? '(current)' : null}
				</button>
			</li>
		)
	})

	return (
		<div className="game">
			<div className="game-board">
				<Board onClick={selectSquare} squares={currentSquares} />
				<button className="restart" onClick={restart}>
					restart
				</button>
			</div>
			<div className="game-info">
				<div aria-live="polite">{status}</div>
				<ol>{moves}</ol>
			</div>
		</div>
	)
}
