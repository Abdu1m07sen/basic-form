import './App.scss'
import DataTable from './components/DataTable/DataTable'
import FormComponent from './components/FormComponent/FormComponent'
import { Container } from 'react-bootstrap'
function App() {
  return (
      <Container>
        <FormComponent/>
        <DataTable/>
      </Container>
  )
}

export default App
