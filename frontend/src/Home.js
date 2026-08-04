import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.css'
import LLM from './Components/LLM/LLM';
import Upload from './Components/FileUpload/Upload';
import WatchDemoModal from './Components/CustomModal/WatchDemoModal';
import { endpoint } from './utils/Endpoint';
import axios from 'axios'

const Home = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [showTextField, setShowTextField] = useState(false)
    const [btnDisabled, setBtnDisabled] = useState(false)   // always enabled
    const [singleResponse, setSingleResponse] = useState([])
    const [showSpinner, setShowSpinner] = useState(false)
    const [uploadStatus, setUploadStatus] = useState('')
    const [uploadMessage, setUploadMessage] = useState('')
    const [showDemoModal, setShowDemoModal] = useState(false)

    // Shared helper — builds FormData with resume if available
    const buildFormData = () => {
        const formData = new FormData();
        if (selectedFile) {
            formData.append('resume', selectedFile);
        }
        // Let backend know whether a resume was provided
        formData.append('hasResume', selectedFile ? 'true' : 'false');
        return formData;
    }

    const Analysis = async () => {
        setShowTextField(false)
        setShowSpinner(true)
        try {
            await axios.post(`${endpoint}/ResumeAnalysis/analysis`, buildFormData(), {
                headers: { 'Content-Type': 'multipart/form-data' },
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
        setShowTextField(true)
        setShowSpinner(true)
        try {
            await axios.post(`${endpoint}/ResumeAnalysis/mock-interview`, buildFormData(), {
                headers: { 'Content-Type': 'multipart/form-data' },
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
        setShowSpinner(true)
        try {
            await axios.post(`${endpoint}/ResumeAnalysis/career-suggestions`, buildFormData(), {
                headers: { 'Content-Type': 'multipart/form-data' },
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
        setShowSpinner(true)
        try {
            await axios.post(`${endpoint}/ResumeAnalysis/skills-recommendations`, buildFormData(), {
                headers: { 'Content-Type': 'multipart/form-data' },
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
            } else {
                setSelectedFile(null);
                setUploadStatus('error');
                setUploadMessage('Only PDF files are accepted. Please select a PDF.');
                setTimeout(() => setUploadStatus(''), 3000);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setUploadStatus('error');
            setUploadMessage('No PDF selected — you can still use features without a resume!');
            setTimeout(() => setUploadStatus(''), 3500);
        } else {
            setUploadStatus('success');
            setUploadMessage('Resume confirmed! All features are now personalised to your profile.');
            setBtnDisabled(false);
            setTimeout(() => setUploadStatus(''), 4000);
        }
    };

    const handleSelectFeatureFromDemo = (featureIndex) => {
        if (featureIndex === 0) Analysis();
        else if (featureIndex === 1) Mock();
        else if (featureIndex === 2) CareerPaths();
        else if (featureIndex === 3) SkillsRecommendation();
    };

    return (
        <>
            <div className='surrounding-div' >
                {/* ── Navbar ── */}
                <div className='main-outside-div' >
                    <nav className="boot-nav navbar navbar-expand-lg">
                        <div className="container-fluid d-flex justify-content-between align-items-center">
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

                            {/* Watch Demo Button with Balance Animation */}
                            <button
                                className="watch-demo-btn"
                                onClick={() => setShowDemoModal(true)}
                                title="Watch SkillBridge Platform Demo"
                            >
                                <span className="demo-play-icon">▶</span>
                                <span className="watch-demo-text">Watch Demo</span>
                                <span className="watch-demo-badge">Live</span>
                            </button>
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
                                hasResume={!!selectedFile}
                                onOpenDemo={() => setShowDemoModal(true)}
                            />
                        </div>
                        <div className="col-12 col-md-6 col-lg-7 d-flex justify-content-center">
                            <LLM showTextField={showTextField} showSpinner={showSpinner} singleResponse={singleResponse} />
                        </div>
                    </div>
                </div>

                {/* ── Watch Demo Modal ── */}
                <WatchDemoModal
                    show={showDemoModal}
                    handleClose={() => setShowDemoModal(false)}
                    onSelectFeature={handleSelectFeatureFromDemo}
                />

            </div>
        </>
    )
}

export default Home
