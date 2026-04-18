import React from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { setMyShopData } from '../redux/owner.slice';

function useGetMyShop() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchShop = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/shop/getMyShop`, { withCredentials: true })
                dispatch(setMyShopData(result.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchShop()
    }, [])
}

export default useGetMyShop