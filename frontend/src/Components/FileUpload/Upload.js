import React from 'react'
import '../../Main.css'
import { Button, Form } from 'react-bootstrap'

const Upload = ({ feature1, feature2, feature3, feature4, handleFileChange, handleSubmit, uploadStatus, uploadMessage, hasResume }) => {

    return (
        <div className="section-left">
            <h3><span>Upload Resume / CV</span></h3>

            <div className='upload-container'>
                <div className='upload'>

                    {/* Upload Icon */}
                    <div className='upload-icon-and-button'>
                        <div className="upload-icon-wrap">
                            <img src="/submit.png" alt="Upload icon" />
                        </div>

                        <Form onSubmit={handleSubmit} className='d-flex flex-column align-items-center form-submit w-100 gap-2'>
                            <Form.Group controlId="formFile" className="mb-1 w-100">
                                <Form.Control type="file" onChange={handleFileChange} />
                            </Form.Group>
                            <Button className='submit-btn btn-shadow mb-1 w-100' type='submit'>
                                ⚡ Confirm Resume
                            </Button>
                        </Form>
                    </div>

                    {/* Instructions */}
                    <div className='upload-instructions'>
                        <ul>
                            <li>Upload your <strong>Resume, CV, or Document</strong> (PDF, TXT, etc.).</li>
                            <li>Resume is <strong>optional</strong> — all features work without one too!</li>
                        </ul>
                    </div>

                    {/* Upload Status Notification */}
                    {uploadStatus && (
                        <div className={`upload-notification ${uploadStatus}`}>
                            {uploadStatus === 'uploading' && (
                                <div className="d-flex align-items-center gap-2">
                                    <div className="loading-dots">
                                        <span></span><span></span><span></span>
                                    </div>
                                    <span>{uploadMessage}</span>
                                </div>
                            )}
                            {uploadStatus === 'success' && (
                                <div className="d-flex align-items-center gap-2">
                                    <span>✅</span>
                                    <span>{uploadMessage}</span>
                                </div>
                            )}
                            {uploadStatus === 'error' && (
                                <div className="d-flex align-items-center gap-2">
                                    <span>⚠️</span>
                                    <span>{uploadMessage}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* No-resume hint */}
                    {!hasResume && !uploadStatus && (
                        <div className="no-resume-hint">
                            💡 No resume? No problem — tap any feature below for guidance!
                        </div>
                    )}

                    {/* Feature Buttons — 2x2 Grid Layout */}
                    <div className='feature-choice w-100'>
                        <div className="feature-grid-2x2">
                            <Button className="feature-btn" onClick={feature1}>
                                <span>🎯 Resume Analysis</span>
                            </Button>
                            <Button className="feature-btn" onClick={feature2}>
                                <span>🎤 Mock Interview</span>
                            </Button>
                            <Button className="feature-btn" onClick={feature3}>
                                <span>🗺️ Career Paths</span>
                            </Button>
                            <Button className="feature-btn" onClick={feature4}>
                                <span>💡 Skills Guide</span>
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Upload
