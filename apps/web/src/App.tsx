import { useQuizStore } from './store/quiz-store'
import { HomeScreen } from './views/HomeScreen'
import { NumberQuizScreen } from './views/NumberQuizScreen'
import { NumberResultsScreen } from './views/NumberResultsScreen'
import { QuizScreen } from './views/QuizScreen'
import { ResultsScreen } from './views/ResultsScreen'

const App = () => {
  const status = useQuizStore((state) => state.status)
  const activeModule = useQuizStore((state) => state.activeModule)

  if (status === 'quiz') {
    return activeModule === 'numbers' ? <NumberQuizScreen /> : <QuizScreen />
  }

  if (status === 'results') {
    return activeModule === 'numbers' ? <NumberResultsScreen /> : <ResultsScreen />
  }

  return <HomeScreen />
}

export default App
