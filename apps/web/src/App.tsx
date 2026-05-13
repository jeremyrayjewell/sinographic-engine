import { useQuizStore } from './store/quiz-store'
import { HomeScreen } from './views/HomeScreen'
import { QuizScreen } from './views/QuizScreen'
import { ResultsScreen } from './views/ResultsScreen'

const App = () => {
  const status = useQuizStore((state) => state.status)

  if (status === 'quiz') {
    return <QuizScreen />
  }

  if (status === 'results') {
    return <ResultsScreen />
  }

  return <HomeScreen />
}

export default App
