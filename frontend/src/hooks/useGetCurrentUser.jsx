import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/user.slice';

function useGetCurrentUser() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true });
                dispatch(setUserData(result.data.user));
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    }, [])
}

export default useGetCurrentUser;  