import '../../Main.css'
import Spinner from 'react-bootstrap/Spinner';
import ReactMarkdown from 'react-markdown';
import CustomCarousel from './CustomCarousel';


const LLM = ({ showSpinner, singleResponse }) => {

    return (
        <div className="section-right custom-shadow">
            {/* Add content for the second section */}
            <h3>SkillBridge</h3>
            <div className='llm-container' >
                {singleResponse?.length === 0 ? (
                    showSpinner ? (
                        <div className='d-flex justify-content-start align-items-center loading-state' style={{
                            fontWeight: '600', 
                            color: 'var(--primary-blue)'
                        }}>
                            <Spinner animation="grow" style={{marginRight: '15px'}} />
                            <span>Loading...</span>
                        </div>
                    ) : (<CustomCarousel />)
                ) : (
                    <>
                        <div className='llm-responses p-2' >
                            {singleResponse?.Type === "Analysis" && 
                                <div className="message-container custom-shadow mb-3" style={{animationDelay: '0.1s'}}>
                                    <img src="/logoBlue.png" width={35} height={35} alt="Logo" style={{
                                        borderRadius: '50%',
                                        border: '3px solid #667eea',
                                        animation: 'pulse 2s infinite'
                                    }} />
                                    <div className='message-container-text' >
                                        <h3>🎯 Skill Gaps</h3>
                                        <ReactMarkdown>{singleResponse.SkillsGaps}</ReactMarkdown>
                                        <br></br>
                                        <h3>📚 Recommended Course</h3>
                                        <ReactMarkdown>{singleResponse.RecommendedCourse}</ReactMarkdown>
                                        <br></br>
                                        <h3>🏆 Recommended Certificates</h3>
                                        <ReactMarkdown>{singleResponse.RecommendedCertificates}</ReactMarkdown>
                                        <br></br>
                                        <h3>🚀 Relevant Projects</h3>
                                        <ReactMarkdown>{singleResponse.ReleventProjects}</ReactMarkdown>
                                    </div>
                                </div>
                            }
                            {singleResponse?.Type === 'Career' && 
                                <div className="message-container custom-shadow mb-3" style={{animationDelay: '0.2s'}}>
                                    <img src="/logoBlue.png" width={35} height={35} alt="Logo" style={{
                                        borderRadius: '50%',
                                        border: '3px solid #667eea',
                                        animation: 'pulse 2s infinite'
                                    }} />
                                    <div className='message-container-text' >
                                        <h3>🎯 Recommended Career Path</h3>
                                        <ReactMarkdown>{singleResponse.recommendedPaths}</ReactMarkdown>
                                    </div>
                                </div>
                            }
                            {singleResponse?.Type === "Recommend" && 
                                <div className="message-container custom-shadow mb-3" style={{animationDelay: '0.3s'}}>
                                    <img src="/logoBlue.png" width={35} height={35} alt="Logo" style={{
                                        borderRadius: '50%',
                                        border: '3px solid #667eea',
                                        animation: 'pulse 2s infinite'
                                    }} />
                                    <div className='message-container-text' >
                                        <h3>💡 Recommended Skills to Learn</h3>
                                        <ReactMarkdown>{singleResponse.SkillsRoadMap}</ReactMarkdown>
                                    </div>
                                </div>
                            }
                            {singleResponse?.Type === "Mock" && 
                                <div className="message-container custom-shadow mb-3" style={{animationDelay: '0.4s'}}>
                                    <img src="/logoBlue.png" width={35} height={35} alt="Logo" style={{
                                        borderRadius: '50%',
                                        border: '3px solid #667eea',
                                        animation: 'pulse 2s infinite'
                                    }} />
                                    <div className='message-container-text' >
                                        <h3>🎤 Mock Interview</h3>
                                        <h3>❓ Questions</h3>
                                        <ReactMarkdown>{singleResponse.Questions}</ReactMarkdown>
                                        <h3>💬 Example Answers</h3>
                                        <ReactMarkdown>{singleResponse.answers}</ReactMarkdown>
                                    </div>
                                </div>
                            }
                        </div>
                        {showSpinner && 
                            <div className='d-flex justify-content-start align-items-center loading-state' style={{
                                fontWeight: '600', 
                                color: 'var(--primary-blue)'
                            }}>
                                <Spinner animation="grow" style={{marginRight: '15px'}} />
                                <span>Loading...</span>
                            </div>
                        }
                    </>
                )}
            </div>
        </div >
    )
}

export default LLM
