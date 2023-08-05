import React, { useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Chip, MenuItem, Select, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

function Skills({values,setSkillValues,onClick}) {
    const [skills, setSkills] = useState([]);
    const [hobbies, setHobbies] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([])
    const [selectedHobbies, setSelectedHobbies] = useState([])
    const [selectedSubjects, setSelectedSubjects] = useState([])

    const getSkills = async() => {
        try {
            let res = await axios.get("https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/GetProfessionalSkillsResponse.json");
            if(res){
                setSkills(res?.data?.result[0].skills)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getHobbies = async() => {
        try {
            let res = await axios.get("https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/GetHobbiesResponse.json");
            if(res){
                setHobbies(res?.data?.result[0].hobbies)
            }
        } catch (error) {
            console.log(error)
        }
    }
 
    const getSubjects = async() => {
        try {
            let res = await axios.get("https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/GetSubjectsResponse.json");
            if(res){
                setSubjects(res?.data?.result[0].subjects)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setSelectedSkills(values?.selectedSkills || [])
        setSelectedHobbies(values?.selectedHobbies || [])
        setSelectedSubjects(values?.selectedSubjects || [])
    },[values])

    useEffect(() => {
        getSkills();
        getHobbies();
        getSubjects();
    },[])

  return (
    <div className='flex flex-col h-[100vh] justify-between'>
        <div className='mx-6 my-4'>
            <div className='flex'>
                <ArrowBackIosIcon fontSize="small" className='mt-1 cursor-pointer' onClick={onClick} />
                <h3 className='text-lg ml-2 font-semibold'>Skills</h3>
            </div>
            <div className='mt-6'>
                <div className='font-semibold'>I am incredible at these skills/professionally greate at</div>
                <div className='w-full overflow-x-auto mt-4'>
                <Select
                    multiple
                    style={{
                        width:"100%"
                    }}
                    value={selectedSkills}
                    onChange={(e) => setSelectedSkills(e.target.value)}
                    renderValue={(selected) => (
                    <Stack gap={1} direction="row" flexWrap="wrap">
                        {selected.map((value) => (
                        <Chip
                            key={value}
                            label={value}
                            style={{background:"#147bff", color:"white"}}
                            onDelete={() =>
                                setSelectedSkills(
                                selectedSkills.filter((item) => item !== value)
                            )
                            }
                            deleteIcon={
                            <CloseIcon
                                className='bg-white rounded-full text-black'
                                fontSize='small'
                                onMouseDown={(event) => event.stopPropagation()}
                            />
                            }
                        />
                        ))}
                    </Stack>
                    )}
                >
                {skills?.map((name) => (
                    <MenuItem
                        key={name._id}
                        value={name.value}
                        sx={{ justifyContent: "space-between" }}
                    >
                        {name.value}
                    </MenuItem>
                    ))}
                </Select>
                </div>
            </div>
            <div className='mt-6'>
                <div className='font-semibold'>I am incredible at these skills/professionally greate at</div>
                <div className='w-full overflow-x-auto mt-4'>
                <Select
                    multiple
                    style={{
                        width:"100%"
                    }}
                    value={selectedHobbies}
                    onChange={(e) => setSelectedHobbies(e.target.value)}
                    renderValue={(selected) => (
                    <Stack gap={1} direction="row" flexWrap="wrap">
                        {selected.map((value) => (
                        <Chip
                            key={value}
                            label={value}
                            style={{background:"#147bff", color:"white"}}
                            onDelete={() =>
                                setSelectedHobbies(
                                selectedHobbies.filter((item) => item !== value)
                            )
                            }
                            deleteIcon={
                            <CloseIcon
                                className='bg-white rounded-full text-black'
                                fontSize='small'
                                onMouseDown={(event) => event.stopPropagation()}
                            />
                            }
                        />
                        ))}
                    </Stack>
                    )}
                >
                {hobbies?.map((name) => (
                    <MenuItem
                        key={name._id}
                        value={name.value}
                        sx={{ justifyContent: "space-between" }}
                    >
                        {name.value}
                    </MenuItem>
                    ))}
                </Select>
                </div>
            </div>
            <div className='mt-6'>
                <div className='font-semibold'>I am incredible at these skills/professionally greate at</div>
                <div className='w-full overflow-x-auto mt-4'>
                <Select
                    multiple
                    style={{
                        width:"100%"
                    }}
                    value={selectedSubjects}
                    onChange={(e) => setSelectedSubjects(e.target.value)}
                    renderValue={(selected) => (
                    <Stack gap={1} direction="row" flexWrap="wrap">
                        {selected.map((value) => (
                        <Chip
                            key={value}
                            label={value}
                            style={{background:"#147bff", color:"white"}}
                            onDelete={() =>
                                setSelectedSubjects(
                                selectedSubjects.filter((item) => item !== value)
                            )
                            }
                            deleteIcon={
                            <CloseIcon
                                className='bg-white rounded-full text-black'
                                fontSize='small'
                                onMouseDown={(event) => event.stopPropagation()}
                            />
                            }
                        />
                        ))}
                    </Stack>
                    )}
                >
                {subjects?.map((name) => (
                    <MenuItem
                        key={name._id}
                        value={name.value}
                        sx={{ justifyContent: "space-between" }}
                    >
                        {name.value}
                    </MenuItem>
                    ))}
                </Select>
                </div>
            </div>
        </div>
        <div className='flex flex-col justify-end mx-6 mb-8'>
                <button 
                    className='bg-red-600 text-white rounded-full p-4 w-full'
                    onClick={() => {
                        setSkillValues({selectedSkills,selectedHobbies,selectedSubjects})
                        onClick();
                    }}
                >
                    Save
                </button>
            </div>
    </div>
  )
}

export default Skills