
import { Button, ButtonType, ButtonSize } from './components/Button/button'
import { Menu } from './components/Menu/menu'
import { MenuItem } from './components/Menu/menuItem'

function App() {
  return (
    <>
      <Button disabled size={ButtonSize.Small}>default</Button>

      <Button size={ButtonSize.Small}>hello</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>large HELLO</Button>
      <Button btnType={ButtonType.Link} target='_blank' size={ButtonSize.Small} href='http://www.baidu.com'>Baidu Link</Button>
      <Button btnType={ButtonType.Link} disabled href='http://www.baidu.com'>Baidu Link</Button>
      <br />
      <Menu defaultIndex={0} mode='vertical' onSelect={(index) => console.log(index)}>
        <MenuItem index={0}>
          cool link 1
        </MenuItem>
        <MenuItem index={1} disabled>
          cool link 2
        </MenuItem>
        <MenuItem index={2}>
          cool link 3
        </MenuItem>

      </Menu>
    </>
  )
}

export default App
