import {useEffect, useState} from 'react'
import './style.css'

export const Profile = () => {
  const [profile, setProfile] = useState({avatar: '', name: '', gender: ''})

  useEffect(() => {
    fetch('/api/profile')
      .then((res) => res.json())
      .then(setProfile)
  }, [])

  return (
    <div className='profile'>
      <img src={profile.avatar} />
      <div className='info'>
        <p>Name: {profile.name}</p>
        <p>Gender: {profile.gender}</p>
      </div>
    </div>
  )
}
