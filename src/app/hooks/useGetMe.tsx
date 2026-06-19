'use client'
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const useGetMe = (enabled: boolean) => {

    const dispatch = useDispatch()

  useEffect(()=>{
    if(!enabled){
        return
    }
    const getMe = async ()=>{
      try {
        const {data} = await axios.get('/api/auth/user/me')
        console.log('User data:', data);
        dispatch(setUserData(data))

      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }
    getMe()
  },[enabled, dispatch])
}

export default useGetMe