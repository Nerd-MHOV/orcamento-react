import { ContactSupport } from '@mui/icons-material'
import { Menu } from '@mui/icons-material'
import { useContext } from 'react'
import { SidebarContext } from '../../context/sidebarContext'
import './style.scss'

const Navbar = () => {

        const { setActiveSidebar } = useContext(SidebarContext)

    return (
        <div className="navbar">
            <div className="menu" onClick={setActiveSidebar}><Menu /></div>
            <div className="support"><ContactSupport /></div>
        </div>
    )
}

export default Navbar