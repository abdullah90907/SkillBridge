import React from 'react'
import '../../Main.css'
import { Button, Row, Col, Form } from 'react-bootstrap'


const Upload = ({ feature1, feature2, feature3, feature4, handleFileChange, handleSubmit, btnDisabled, uploadStatus, uploadMessage }) => {

    return (
        <div className="section-left custom-shadow">
            {/* Add content for the first section */}
            <h3>Upload Resume/CV</h3>
            <div className='upload-container' >
                <div className='upload custom-shadow' >
                    <div className='upload-icon-and-button' >
                        <img src='/submit.png' width={100} height={100} />
                        <Form onSubmit={handleSubmit} className='d-flex flex-column justify-content form-submit mt-3' >
                            <Form.Group controlId="formFile" className="mb-1">
                                <Form.Control type="file" onChange={handleFileChange} />
                            </Form.Group>
                            <Button className='submit-btn btn-shadow mb-3' type='submit'>Upload Resume</Button>
                        </Form>
                    </div>
                    <div className='upload-instructions' >
                        <ul>
                            <li>Please make sure that the document is in a pdf form.</li>
                            <li>Upload the document by clicking on the icon and then click on the button</li>
                        </ul>

                    </div>
                    
                    {/* Upload Status Notification */}
                    {uploadStatus && (
                        <div className={`upload-notification ${uploadStatus}`}>
                            {uploadStatus === 'uploading' && (
                                <div className="d-flex align-items-center">
                                    <div className="upload-spinner me-2"></div>
                                    <span>{uploadMessage}</span>
                                </div>
                            )}
                            {uploadStatus === 'success' && (
                                <div className="d-flex align-items-center">
                                    <span className="upload-icon success me-2">✅</span>
                                    <span>{uploadMessage}</span>
                                </div>
                            )}
                            {uploadStatus === 'error' && (
                                <div className="d-flex align-items-center">
                                    <span className="upload-icon error me-2">❌</span>
                                    <span>{uploadMessage}</span>
                                </div>
                            )}
                        </div>
                    )}

                    <div className='feature-choice'>
                        <Row >
                            <Col xs={6} className="mb-3">
                                <Button className="btn"
                                    onClick={feature1}
                                    disabled={btnDisabled}
                                >Resume Analysis</Button>
                            </Col>
                            <Col xs={6} className="mb-3">
                                <Button className="btn"
                                    onClick={feature2}
                                    disabled={btnDisabled}>Mock Interview</Button>
                            </Col>
                            <Col xs={6} className="mb-3">
                                <Button className="btn"
                                    onClick={feature3}
                                    disabled={btnDisabled}>Career path suggestion</Button>
                            </Col>
                            <Col xs={6} className="mb-3">
                                <Button className="btn"
                                    onClick={feature4}
                                    disabled={btnDisabled}>Skills Recommendation</Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upload
