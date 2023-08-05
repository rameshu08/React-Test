import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';

function Bio({onClick, values, skillValues, onClickSubType}) {
    const [about, setAbout] = useState(null)
    const [skill, setSkill] = useState(null);
    const [ethicalCodeCount, setEthicalCodeCount] = useState(0);
    const [meetCount, setMeetCount] = useState(0);

    const getEthicalCodeRatings = async() => {
        try {
            let res = await axios.get("https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/RatingsEthicalCodeResponse.json");
            if(res){
                setEthicalCodeCount(res?.data?.ethicalCodeCount)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getMeeters = async() => {
        try {
            let res = await axios.get("https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/RatingsVirtuallyMetResponse.json");
            if(res){
                setMeetCount(res?.data?.virtuallyMetCount)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setAbout(values)
        setSkill(skillValues)
    },[values])

    useEffect(() => {
        getEthicalCodeRatings()
        getMeeters()
    })

    return (
        <div className='flex flex-col w-full justify-between flex-grow'>
            <div className='flex-grow'>
                <div className='mx-6 my-2'>
                    <div className='flex'>
                        <ArrowBackIosIcon fontSize="small" className='mt-1' />
                        <h3 className='text-lg ml-2 font-semibold'>My Bio</h3>
                    </div>
                    <div className='font-semibold mt-8 flex justify-between items-center'>
                        <h3 className='text-lg'>About Me</h3>
                        <EditIcon fontSize='small' className='cursor-pointer' onClick={() => onClick("ABOUT")} />
                    </div>
                    <div className='text-sm mt-2 text-gray-600 border-b-2 border-gray-200 pb-4'>
                            {about?.description}
                    </div>
                    <div className='mt-4 border-b-2 border-gray-200 pb-4'>
                        <div className="flex justify-between items-center">
                            <div className='font-semibold'>Blood Group</div>
                            <div className='text-gray-500'>{about?.bloodGroup}</div>
                        </div>
                        <div className="mt-4 flex justify-between items-center font-semibold shadow-lg p-4">
                            <div>
                                Resume
                            </div>
                            <div
                                onClick={() => {
                                    console.log(typeof(about?.resume))
                                    let url = URL.createObjectURL(about?.resume)
                                    console.log(url)
                                    const reader = new FileReader();

                                    reader.onload = function(e) {
                                        const blob = new Blob([new Uint8Array(e.target.result)], {type: skill?.resume?.type });
                                        let ur = URL.createObjectURL(blob)
                                        console.log(ur);
                                    };
                                    reader.readAsArrayBuffer(about?.resume);
                                }} 
                            >
                                <ArrowForwardIosIcon fontSize='small' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mx-6 my-2'>
                    <div className='font-semibold mt-7 flex justify-between items-center'>
                        <h3 className='text-lg'>Skills</h3>
                        <EditIcon fontSize='small' className='cursor-pointer'  onClick={() => onClick("SKILLS")}/>
                    </div>
                    {skill ? <div className='pb-2'>
                        <div className='mt-4 border-b-2 border-gray-200 pb-2'>
                            <div>
                                I am incredible at these skills/professionally great at
                            </div>
                            <div className='flex mt-2 overflow-x-auto'>
                                {skill?.selectedSkills?.map(sk => {
                                    return <div className='' key={sk}>
                                        <div className='bg-blue-500 whitespace-nowrap rounded-full p-2 text-sm m-1 text-white font-semibold'>{sk}</div>
                                    </div>
                                })}
                            </div>
                        </div>
                        <div className='mt-4 border-b-2 border-gray-200 pb-2'>
                            <div>
                                Hobbies I am passionate about
                            </div>
                            <div className='flex mt-2 overflow-x-auto'>
                                {skill?.selectedHobbies?.map(hobby => {
                                    return <div className='' key={hobby}>
                                        <div className='bg-blue-500 whitespace-nowrap rounded-full p-2 text-sm m-1 text-white font-semibold'>{hobby}</div>
                                    </div>
                                })}
                            </div>
                        </div>
                        <div className='mt-4 border-b-2 border-gray-200 pb-2'>
                            <div>
                                My favourite subjects are
                            </div>
                            <div className='flex mt-2 overflow-x-auto'>
                                {skill?.selectedSubjects?.map(sub => {
                                    return <div className='' key={sub}>
                                        <div className='w-full bg-blue-500 whitespace-nowrap rounded-full p-2 text-sm m-1 text-white font-semibold'>{sub}</div>
                                    </div>
                                })}
                                <div className="flex py-2 px-4 overflow-x-auto">
                        </div>
                            </div>
                        </div>
                    </div> : <div className='mt-8 mb-72 text-center text-gray-500'>No soft skills added yet</div>}
                </div> 
            </div>
            <div className='bottom-0 bg-[#999999] w-full pt-2 justify-items-center	'>
                <div className='mx-2 mb-2 bg-[#75767a] pt-6 pb-2 rounded-lg'>
                    <div className='text-white mx-4 mb-1'>Ratings</div>
                    <div 
                        className='flex items-center border-b-2 border-gray-200 pb-2 mx-4 text-sm text-white'
                        onClick={() => {
                            onClick("USERS")
                            onClickSubType("CODE")
                        }}
                    >
                        <div className='mr-8'>{ethicalCodeCount}</div>
                        <div>Say has of ethical code of conduct and is safe to do business with</div>
                    </div>
                    <div 
                        className='flex items-center mx-4 mt-2 text-sm text-white'
                        onClick={() => {
                            onClick("USERS")
                            onClickSubType("MEET")
                        }}
                    >
                        <div className='mr-8'>{meetCount}</div>
                        <div>Have met in real life/video call</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bio