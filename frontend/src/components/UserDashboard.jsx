import React, { useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { GrCart } from "react-icons/gr";
import { IoIosClose } from "react-icons/io";
import { useSelector } from 'react-redux';
import Nav from './Nav';

function UserDashboard() {
    const { userData, city } = useSelector(state => state.user);
    const [showInfo, setShowInfo] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    return (
        <>
            <Nav />
        </>
    )
}

export default UserDashboard