import React, { useState } from 'react';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
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
                <div className='main-outside-div' >
                    <Navbar className="bg-body-tertiary boot-nav custom-shadow">
                        <Container className='d-flex justify-content-center' >
                            <Navbar.Brand href="#home" >
                                <img
                                    alt=""
                                    src="/logoBlue.png"
                                    width={30}
                                    // height={30}
                                    className="d-inline-block align-top"
                                />
                                SkillBridge
                            </Navbar.Brand>
                        </Container>
                    </Navbar>
                </div>

                {/* New section below the navbar */}
                <div className='grid-container' >
                    <Row className='h-100'>
                        <Col className="d-flex justify-content-center" xs={12} sm={12} md={6} lg={5} xl={5}>
                            <Upload 
                                feature1={Analysis} 
                                feature2={Mock} 
                                feature3={Career} 
                                feature4={Recommendation} 
                                handleFileChange={handleFileChange} 
                                handleSubmit={handleSubmit} 
                                btnDisabled={btnDisabled} 
                                setBtnDisabled={setBtnDisabled}
                                uploadStatus={uploadStatus}
                                uploadMessage={uploadMessage}
                            />
                        </Col>
                        <Col className="d-flex justify-content-center" xs={12} sm={12} md={6} lg={7} xl={7}>
                            <LLM showTextField={showTextField} showSpinner={showSpinner} singleResponse={singleResponse} />
                        </Col>
                    </Row>
                </div>

            </div>
        </>
    )
}

export default Home
