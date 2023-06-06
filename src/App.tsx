import React, { useState } from 'react'
import { Button } from './components/Button/Button'
import { Menu } from './components/Menu/Menu'
import { MenuItem } from './components/Menu/MenuItem'
import { SubMenu } from './components/Menu/SubMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { Icon } from './components/Icon/Icon'
import { Transition } from './components/Transition/transition'

library.add(fas)

const App: React.FC = () => {
  const [show, setShow] = useState(false)
  return (
    <>
      <Icon icon={'arrow-down'} theme='primary' size='4x'></Icon>
      <FontAwesomeIcon icon={'coffee'} size='2x' />
      <Button disabled size={'sm'}>default</Button>

      <Button size={'sm'}>hello</Button>
      <Button btnType={'primary'} size={'lg'}>large HELLO</Button>
      <Button btnType={'link'} target='_blank' size={'sm'} href='http://www.baidu.com'>Baidu Link</Button>
      <Button btnType={'link'} disabled href='http://www.baidu.com'>Baidu Link</Button>
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
      <Button size='lg' btnType='primary' onClick={() => setShow(!show)}>
        show Or unshow
      </Button>
      <Transition
        in={show}
        timeout={500}
        animation='zoom-in-left'
        wrapper
      >
        <div>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
        </div>
      </Transition>
      <Transition
        in={show}
        timeout={500}
        animation='zoom-in-left'
        wrapper
      >
        <Button btnType='primary' size='lg'>A Large Button</Button>
      </Transition>
    </>
  )
}

export default App
