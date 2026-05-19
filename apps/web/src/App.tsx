import { useEffect } from 'react'
import { preloadVoices } from '@sinographic-engine/speech-engine'
import { useQuizStore } from './store/quiz-store'
import { HomeScreen } from './views/HomeScreen'
import { NumberQuizScreen } from './views/NumberQuizScreen'
import { NumberResultsScreen } from './views/NumberResultsScreen'
import { PastResultsScreen } from './views/PastResultsScreen'
import { PastStudyScreen } from './views/PastStudyScreen'
import { PeopleQuizScreen } from './views/PeopleQuizScreen'
import { PeopleResultsScreen } from './views/PeopleResultsScreen'
import { QuizScreen } from './views/QuizScreen'
import { ResultsScreen } from './views/ResultsScreen'

const App = () => {
  const status = useQuizStore((state) => state.status)
  const activeModule = useQuizStore((state) => state.activeModule)

  useEffect(() => {
    void preloadVoices()

    const preloadAfterInteraction = () => {
      void preloadVoices()
    }

    window.addEventListener('pointerdown', preloadAfterInteraction, {
      once: true,
      passive: true
    })
    window.addEventListener('keydown', preloadAfterInteraction, { once: true })
    window.addEventListener('touchstart', preloadAfterInteraction, {
      once: true,
      passive: true
    })

    return () => {
      window.removeEventListener('pointerdown', preloadAfterInteraction)
      window.removeEventListener('keydown', preloadAfterInteraction)
      window.removeEventListener('touchstart', preloadAfterInteraction)
    }
  }, [])

  if (status === 'quiz') {
    if (activeModule === 'numbers') {
      return <NumberQuizScreen />
    }

    if (activeModule === 'people') {
      return <PeopleQuizScreen />
    }

    if (activeModule === 'past') {
      return <PastStudyScreen />
    }

    return <QuizScreen />
  }

  if (status === 'results') {
    if (activeModule === 'numbers') {
      return <NumberResultsScreen />
    }

    if (activeModule === 'people') {
      return <PeopleResultsScreen />
    }

    if (activeModule === 'past') {
      return <PastResultsScreen />
    }

    return <ResultsScreen />
  }

  return <HomeScreen />
}

export default App
