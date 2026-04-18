import React from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/user.slice';

function userGetMyShop() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchShop = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/getMyShop`, { withCredentials: true })
                dispatch(setUserData(result.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchShop()
    },[])
}

export default userGetMyShop