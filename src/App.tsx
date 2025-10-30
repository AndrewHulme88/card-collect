import './App.css'
import HomeHeader from './components/HomeHeader'
import type { HomeHeaderProps } from './components/HomeHeader';

const headerProps: HomeHeaderProps = {
  title: "Card Collection",
  description: "Track your card collection"
};

function App() {
  return (
    <>
      <HomeHeader 
      title={headerProps.title}
      description={headerProps.description}>
      </HomeHeader>
    </>
  )
}

export default App
