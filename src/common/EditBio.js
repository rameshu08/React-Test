import React, { useEffect, useRef, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogContent, MenuItem, Select, TextField } from '@mui/material';

function EditBio({onClick, setAboutValues, values}) {

    const handleRef = useRef(null);
    const [description, setDescription] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [resume, setResume] = useState(null);
    const [deleteResume, setDeleteResume] = useState(false)

    useEffect(() => {
        setDescription(values?.description || '')
        setBloodGroup(values?.bloodGroup || '')
        setResume(values?.resume || null)
    },[values])

    const handleClick = () => {
        handleRef.current.click()
    }

    const handleChange = (e) => {
        setResume(e.target.files[0]);
    }

    return (
        <div className='flex flex-col h-[100vh] justify-between'>
            <div className='mx-6 my-4'>
                <div className='flex'>
                    <ArrowBackIosIcon fontSize="small" className='mt-1 cursor-pointer' onClick={onClick} />
                    <h3 className='text-lg ml-2 font-semibold'>My Bio</h3>
                </div>
                <div className='mt-6'>
                    <div className='font-semibold'>Write something about yourself</div>
                    <div className='w-full'>
                        <TextField 
                            multiline 
                            value={description}
                            minRows={4} 
                            style={{width: "100%"}} 
                            placeholder='Write something here...' 
                            onChange={(e) => {
                                if(e.target.value.length < 500){
                                    setDescription(e.target.value)
                                }
                            }}
                        />
                        <span className='flex justify-end text-sm'>{description.length}/500</span>
                    </div>
                </div>
                <div>
                    <div>
                        <input type='file' ref={handleRef} hidden onChange={handleChange} accept='application/pdf' />
                    </div>
                    {!resume ? <div 
                        className='mt-4 border border-dashed border-gray-400 px-8 py-10 text-center cursor-pointer'
                        onClick={handleClick}  
                    >
                        <ImageIcon fontSize='large' style={{color: "blueviolet"}} />
                        <div className='font-semibold'>Upload Resume</div>
                    </div> : 
                    <div className='mt-4 border border-gray-400 p-4 flex justify-between shadow-md rounded-sm'>  
                        <div><PictureAsPdfIcon /> {resume.name}</div>
                        <DeleteIcon className='cursor-pointer' style={{color:"red"}} onClick={() => setDeleteResume(true)} />
                    </div>
                    }
                </div>
                <div className='mt-4'>
                    <div className='font-semibold'>Blood Group</div>
                    <div className='w-full'>
                        <Select 
                            style={{width:"100%"}}
                            placeholder='Select Blood Group'
                            value={bloodGroup}
                            onChange={(e) => {
                                setBloodGroup(e.target.value)
                            }}
                        >
                            <MenuItem value=''>Select Blood Group</MenuItem>
                            <MenuItem value="A+ (Positive)">A+ (Positive)</MenuItem>
                            <MenuItem value="B+ (Positive)">B+ (Positive)</MenuItem>
                            <MenuItem value="A- (Negative)">A- (Negative)</MenuItem>
                            <MenuItem value="B- (Negative)">B- (Negative)</MenuItem>
                            <MenuItem value="AB+ (Positive)">AB+ (Positive)</MenuItem>
                            <MenuItem value="AB- (Negative)">AB- (Negative)</MenuItem>
                            <MenuItem value="O+ (Positive)">O+ (Positive)</MenuItem>
                            <MenuItem value="O- (Negative)">O- (Negative)</MenuItem>
                        </Select>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-end mx-6 mb-8'>
                <button 
                    className='bg-red-600 text-white rounded-full p-4 w-full'
                    onClick={() => {
                        setAboutValues({description,bloodGroup,resume})
                        onClick();
                    }}
                >
                    Submit
                </button>
            </div>
            <Dialog
                open={deleteResume}
            >
                <DialogContent>
                    <div className='flex flex-col justify-center items-center'>
                        <DeleteIcon fontSize='large' style={{color:"red"}} />
                        <div className='text-lg'>Are you sure you want to delete resume?</div>
                    </div>
                    <div className='flex justify-center font-semibold mt-4'>
                        <button 
                            className='border p-2 rounded-full w-32'
                            onClick={() => setDeleteResume(false)}
                        >
                            Cancel
                        </button>
                        <button 
                            className='bg-red-600 text-white ml-4 p-2 rounded-full w-32'
                            onClick={() => {
                                setResume(null)
                                setDeleteResume(false)
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>        
    )
}


export default EditBio