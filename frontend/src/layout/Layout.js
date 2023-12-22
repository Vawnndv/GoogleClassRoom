
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { Stack } from '@mui/material'
import Menu from './Menu'
import { useSelector } from 'react-redux'


function Layout({ socket }) {

  const isOpenMenu = useSelector(state => state.isOpenMenu)

  return (
    <div id='layout'>
      <Header socket={socket} />

      <Stack direction='row' id='menuAndOutlet'>
        <div className={`grid1 ${!isOpenMenu && 'hide'}`}>
          <Menu/>
        </div>
        <div className='grid2'>
          <Outlet />
          <Footer/>
        </div>
      </Stack>

    </div>
  )
}

export default Layout