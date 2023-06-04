
import { Button, ButtonType, ButtonSize } from './components/Button/button'
import { Menu } from './components/Menu/menu'
import { MenuItem } from './components/Menu/menuItem'
import { SubMenu } from './components/Menu/subMenu'

function App() {
  return (
    <>
      <Button disabled size={ButtonSize.Small}>default</Button>

      <Button size={ButtonSize.Small}>hello</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>large HELLO</Button>
      <Button btnType={ButtonType.Link} target='_blank' size={ButtonSize.Small} href='http://www.baidu.com'>Baidu Link</Button>
      <Button btnType={ButtonType.Link} disabled href='http://www.baidu.com'>Baidu Link</Button>
      <br />
      <Menu defaultIndex={'0'} mode='vertical' onSelect={(index) => console.log(index)} defaultOpenSubMenus={['2']}>
        <MenuItem>
          cool link 1
        </MenuItem>
        <MenuItem disabled>
          cool link 2
        </MenuItem>
        <SubMenu title={'测试1'}>
          <MenuItem>
            dorpdown1
          </MenuItem>
          <MenuItem>
            dorpdown2
          </MenuItem>
        </SubMenu>
        <SubMenu title={'测试2'}>
          <MenuItem>
            dorpdown1
          </MenuItem>
          <MenuItem>
            dorpdown2
          </MenuItem>
        </SubMenu>
        <MenuItem>
          cool link 3
        </MenuItem>
      </Menu>
      <br />
      <Menu defaultIndex={'0'} mode='horizontal' onSelect={(index) => console.log(index)}>
        <MenuItem>
          cool link 1
        </MenuItem>
        <MenuItem disabled>
          cool link 2
        </MenuItem>
        <SubMenu title={'测试1'}>
          <MenuItem>
            dorpdown1
          </MenuItem>
          <MenuItem>
            dorpdown2
          </MenuItem>
        </SubMenu>
        <MenuItem>
          cool link 3
        </MenuItem>
      </Menu>
    </>
  )
}

export default App
