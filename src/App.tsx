
import {Button,ButtonType,ButtonSize} from './components/Button/button'

function App() {
  return (
    <>
      <Button disabled size={ButtonSize.Small}>default</Button>

      <Button size={ButtonSize.Small}>hello</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>large HELLO</Button>
      <Button btnType={ButtonType.Link} size={ButtonSize.Small} href='http://www.baidu.com'>Baidu Link</Button>
      <Button btnType={ButtonType.Link} disabled href='http://www.baidu.com'>Baidu Link</Button>

    </>
  )
}

export default App
