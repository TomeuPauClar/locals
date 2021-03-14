import { Container, Typography } from "@material-ui/core";
import Header from "./components/Header"

function App() {
  return (
    <>
    <Header />
    <Container>
      <Typography variant="h1">Locals</Typography>
    </Container>
    </>
  );
}

export default App;
