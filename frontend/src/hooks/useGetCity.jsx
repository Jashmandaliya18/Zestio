import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCity } from "../redux/user.slice"

function useGetCity() {
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const latitude = pos.coords.latitude;
            const longitude = pos.coords.longitude;
            const apiKey = import.meta.env.VITE_GEOAPIKEY;

            const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`)

            // console.log(result.data.results[0].city);
            const city = result?.data?.results[0]?.city;

            dispatch(setCity(city));
        })
    }, [userData])
}

export default useGetCity