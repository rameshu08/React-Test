import { Close } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Users({onClick, userSubType}) {
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(0);

    const getUsers = async() => {
        try {
            let url;
            if(userSubType === "CODE"){
                url = "https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/RatingsEthicalCodeResponse.json"
            } else if(userSubType === "MEET"){
                url = "https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/RatingsVirtuallyMetResponse.json"
            }
            let res = await axios.get(url);
            if(res){
                if(userSubType === "CODE"){
                    setCount(res?.data?.ethicalCodeCount)
                    setUsers(res?.data?.result)
                }else if(userSubType === "MEET"){
                    setCount(res?.data?.virtuallyMetCount)
                    setUsers(res?.data?.result)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
       getUsers()
    })

  return (
    <div>
        <div className='flex justify-between mx-2 mt-2'>
            <div className='flex'>
                <div className='mr-1 font-bold'>{count}</div> 
                <div className='text-gray-500 text-ellipsis'>{userSubType === "CODE" ? "Say has of ethical code of conduct and is safe to do business with" : "Have met in real life/video call"}</div>
            </div>
            <div><Close className='cursor-pointer text-red-600' onClick={onClick} /></div>
        </div>
        <div className='mx-4 my-1 overflow-y-auto'>
            {users.map(user => {
                return <div className='flex items-center my-4 border-b-2 border-gray-200 pb-4 overflow-y-auto'>
                    <div className='mr-2'><Avatar alt={user?.firstname} src={user?.dpURL} /></div>
                    <div>
                        <div className='font-semibold'>{user?.firstname + ' ' + user?.lastname}</div>
                        <div className='text-xs text-gray-400'>{user?.title[0]?.value}</div>
                    </div>
                </div>
            })}
        </div>
    </div>
  )
}

export default Users