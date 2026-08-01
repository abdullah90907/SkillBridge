import React from 'react'
import '../../Main.css'
import { Button, Row, Col, Form } from 'react-bootstrap'

const Upload = ({ feature1, feature2, feature3, feature4, handleFileChange, handleSubmit, btnDisabled, uploadStatus, uploadMessage }) => {

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
                            <li>Document must be in <strong>PDF format</strong> only.</li>
                            <li>Select your file then click <strong>Confirm Resume</strong> to unlock features.</li>
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
                                    <span>❌</span>
                                    <span>{uploadMessage}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Feature Buttons */}
                    <div className='feature-choice w-100'>
                        <Row className="g-2 w-100 m-0">
                            <Col xs={6}>
                                <Button className="btn" onClick={feature1} disabled={btnDisabled}>
                                    <span>🎯 Resume Analysis</span>
                                </Button>
                            </Col>
                            <Col xs={6}>
                                <Button className="btn" onClick={feature2} disabled={btnDisabled}>
                                    <span>🎤 Mock Interview</span>
                                </Button>
                            </Col>
                            <Col xs={6}>
                                <Button className="btn" onClick={feature3} disabled={btnDisabled}>
                                    <span>🗺️ Career Paths</span>
                                </Button>
                            </Col>
                            <Col xs={6}>
                                <Button className="btn" onClick={feature4} disabled={btnDisabled}>
                                    <span>💡 Skills Guide</span>
                                </Button>
                            </Col>
                        </Row>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Upload
