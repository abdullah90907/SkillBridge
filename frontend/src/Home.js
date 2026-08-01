import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.css'
import LLM from './Components/LLM/LLM';
import Upload from './Components/FileUpload/Upload';
import { endpoint } from './utils/Endpoint';
import axios from 'axios'

const Home = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [showTextField, setShowTextField] = useState(false)
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [singleResponse, setSingleResponse] = useState([])
    const [showSpinner, setShowSpinner] = useState(false)
    const [uploadStatus, setUploadStatus] = useState('') // 'uploading', 'success', 'error', ''
    const [uploadMessage, setUploadMessage] = useState('')

    const Analysis = async () => {
        if (!selectedFile) {
            alert('Please select a PDF file first!');
            return;
        }
        
        setShowTextField(false)
        setShowSpinner(true)

        try {
            const formData = new FormData();
            formData.append('resume', selectedFile);
            
            await axios.post(`${endpoint}/ResumeAnalysis/analysis`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((response) => {
                setSingleResponse(response.data)
            }).finally(() => {
                setShowSpinner(false)
            })
        } catch (error) {
            setShowSpinner(false)
            console.log("There was an error while getting an analysis on the resume")
        }
    }

    const Mock = async () => {
        if (!selectedFile) {
            alert('Please select a PDF file first!');
            return;
        }
        
        setShowTextField(true)
        setShowSpinner(true)
        try {
            const formData = new FormData();
            formData.append('resume', selectedFile);
            
            await axios.post(`${endpoint}/ResumeAnalysis/mock-interview`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((response) => {
                setShowSpinner(false)
                setSingleResponse(response.data)
            })
        } catch (error) {
            setShowSpinner(false)
            console.log("There was an issue while generating mock interview questions")
        }
    }

    const CareerPaths = async () => {
        if (!selectedFile) {
            alert('Please select a PDF file first!');
            return;
        }
        
        setShowSpinner(true)
        try {
            const formData = new FormData();
            formData.append('resume', selectedFile);
            
            await axios.post(`${endpoint}/ResumeAnalysis/career-suggestions`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((response) => {
                setSingleResponse(response.data)
            }).finally(() => {
                setShowSpinner(false)
            })
        } catch (error) {
            setShowSpinner(false)
            console.log("There was an error while getting career paths")
        }
    }

        const SkillsRecommendation = async () => {
        if (!selectedFile) {
            alert('Please select a PDF file first!');
            return;
        }
        
        setShowSpinner(true)
        try {
            const formData = new FormData();
            formData.append('resume', selectedFile);
            
            await axios.post(`${endpoint}/ResumeAnalysis/skills-recommendations`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((response) => {
                setSingleResponse(response.data)
            }).finally(() => {
                setShowSpinner(false)
            })
        } catch (error) {
            setShowSpinner(false)
            console.log("There was an error while getting skills recommendation")
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type === 'application/pdf') {
                setSelectedFile(file);
                console.log('PDF file uploaded:', file);
            } else {
                setSelectedFile(null);
                alert("The selected file is not a pdf.")
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            setUploadStatus('error');
            setUploadMessage('Please select a PDF file first.');
            setTimeout(() => setUploadStatus(''), 3000);
        } else {
            setUploadStatus('success');
            setUploadMessage('Resume selected successfully! You can now use the analysis features.');
            setBtnDisabled(false);
            setTimeout(() => setUploadStatus(''), 4000);
        }
    };


    return (
        <>
            <div className='surrounding-div' >
                {/* ── Navbar ── */}
                <div className='main-outside-div' >
                    <nav className="boot-nav navbar navbar-expand-lg">
                        <div className="container-fluid d-flex justify-content-center">
                            <a className="navbar-brand" href="#home">
                                <div className="navbar-logo-wrap">
                                    <img
                                        alt="SkillBridge Logo"
                                        src="/logoBlue.png"
                                    />
                                </div>
                                <span className="navbar-brand-text">SkillBridge</span>
                                <span className="nav-badge">AI</span>
                            </a>
                        </div>
                    </nav>
                </div>

                {/* ── Main Grid ── */}
                <div className='grid-container' >
                    <div className="row h-100">
                        <div className="col-12 col-md-6 col-lg-5 d-flex justify-content-center">
                            <Upload 
                                feature1={Analysis} 
                                feature2={Mock} 
                                feature3={CareerPaths} 
                                feature4={SkillsRecommendation} 
                                handleFileChange={handleFileChange} 
                                handleSubmit={handleSubmit} 
                                btnDisabled={btnDisabled} 
                                setBtnDisabled={setBtnDisabled}
                                uploadStatus={uploadStatus}
                                uploadMessage={uploadMessage}
                            />
                        </div>
                        <div className="col-12 col-md-6 col-lg-7 d-flex justify-content-center">
                            <LLM showTextField={showTextField} showSpinner={showSpinner} singleResponse={singleResponse} />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Home
