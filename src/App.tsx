// import React, { useEffect, useState } from 'react'
// import { Button } from './components/Button/Button'
// import { Menu } from './components/Menu/Menu'
// import { MenuItem } from './components/Menu/MenuItem'
// import { SubMenu } from './components/Menu/SubMenu'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { Icon } from './components/Icon/Icon'
// import { Transition } from './components/Transition/transition'

// library.add(fas)

// const App: React.FC = () => {
//   const [show, setShow] = useState(false)
//   return (
//     <>
//       <Icon icon={'arrow-down'} theme='primary' size='4x'></Icon>
//       <FontAwesomeIcon icon={'coffee'} size='2x' />
//       <Button disabled size={'sm'}>default</Button>

//       <Button size={'sm'}>hello</Button>
//       <Button btnType={'primary'} size={'lg'}>large HELLO</Button>
//       <Button btnType={'link'} target='_blank' size={'sm'} href='http://www.baidu.com'>Baidu Link</Button>
//       <Button btnType={'link'} disabled href='http://www.baidu.com'>Baidu Link</Button>
//       <br />
//       <Menu defaultIndex={'0'} mode='vertical' onSelect={(index) => console.log(index)} defaultOpenSubMenus={['2']}>
//         <MenuItem>
//           cool link 1
//         </MenuItem>
//         <MenuItem disabled>
//           cool link 2
//         </MenuItem>
//         <SubMenu title={'测试1'}>
//           <MenuItem>
//             dorpdown1
//           </MenuItem>
//           <MenuItem>
//             dorpdown2
//           </MenuItem>
//         </SubMenu>
//         <SubMenu title={'测试2'}>
//           <MenuItem>
//             dorpdown1
//           </MenuItem>
//           <MenuItem>
//             dorpdown2
//           </MenuItem>
//         </SubMenu>
//         <MenuItem>
//           cool link 3
//         </MenuItem>
//       </Menu>
//       <br />
//       <Menu defaultIndex={'0'} mode='horizontal' onSelect={(index) => console.log(index)}>
//         <MenuItem>
//           cool link 1
//         </MenuItem>
//         <MenuItem disabled>
//           cool link 2
//         </MenuItem>
//         <SubMenu title={'测试1'}>
//           <MenuItem>
//             dorpdown1
//           </MenuItem>
//           <MenuItem>
//             dorpdown2
//           </MenuItem>
//         </SubMenu>
//         <MenuItem>
//           cool link 3
//         </MenuItem>
//       </Menu>
//       <Button size='lg' btnType='primary' onClick={() => setShow(!show)}>
//         show Or unshow
//       </Button>
//       <Transition
//         in={show}
//         timeout={500}
//         animation='zoom-in-left'
//         wrapper
//       >
//         <div>
//           <p>
//             Edit <code>src/App.tsx</code> and save to reload.
//           </p>
//           <p>
//             Edit <code>src/App.tsx</code> and save to reload.
//           </p>
//           <p>
//             Edit <code>src/App.tsx</code> and save to reload.
//           </p>
//           <p>
//             Edit <code>src/App.tsx</code> and save to reload.
//           </p>
//         </div>
//       </Transition>
//       <Transition
//         in={show}
//         timeout={500}
//         animation='zoom-in-left'
//         wrapper
//       >
//         <Button btnType='primary' size='lg'>A Large Button</Button>
//       </Transition>
//     </>
//   )

// }

// 基本的axios请求联合jsonplacehoder
// import { useState, useEffect } from 'react'
// import axios from 'axios'

// const App: React.FC = () => {
//   const [title, setTitle] = useState('')
//   const postData = {
//     title: 'my title',
//     body: 'hello man'
//   }
//   useEffect(() => {
//     axios.post('https://jsonplaceholder.typicode.com/posts', postData)
//       .then(res => {
//         console.log(res);
//         setTitle(res.data.title)

//       })
//     // axios.get('https://jsonplaceholder.typicode.com/posts', {
//     //   headers: {
//     //     'X-Request-With': "XMLHttpRequest"
//     //   },
//     //   responseType: 'json'
//     // })
//     //   .then(res => {
//     //     console.log(res);
//     //     setTitle(res.data.title)

//     //   })
//   })
//   return (
//     <div className='App'>
//       <header className='App-header'>
//         <h1>{title}</h1>
//       </header>

//     </div>
//   )
// }

import axios from "axios"

const App: React.FC = () => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const uploadedFile = files[0]
      const formData = new FormData()
      formData.append(uploadedFile.name, uploadedFile)
      axios.post('https://jsonplaceholder.typicode.com/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(res => {
          console.log(res);
          
        })
    }
  }
  return (
    <div className="App" style={{ marginTop: "100px", marginLeft: '100px' }}>
      <input type="file" name='myfile' onChange={handleFileChange}></input>
    </div>
  )
}

export default App
