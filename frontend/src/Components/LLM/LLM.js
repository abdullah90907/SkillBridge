import '../../Main.css'
import ReactMarkdown from 'react-markdown';
import CustomCarousel from './CustomCarousel';

const LLM = ({ showSpinner, singleResponse }) => {

    return (
        <div className="section-right">
            <h3>✦ SkillBridge AI</h3>

            <div className='llm-container'>
                {singleResponse?.length === 0 ? (
                    showSpinner ? (
                        <div className='loading-state'>
                            <div className="loading-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <span className="loading-label">Analyzing your resume…</span>
                        </div>
                    ) : (
                        <CustomCarousel />
                    )
                ) : (
                    <>
                        <div className={`llm-responses p-2 ${singleResponse ? 'has-responses' : ''}`}>

                            {singleResponse?.Type === "Analysis" &&
                                <div className="message-container" style={{ animationDelay: '0.1s' }}>
                                    <img src="/logoBlue.png" width={40} height={40} alt="SkillBridge AI" />
                                    <div className='message-container-text'>
                                        <h3>🎯 Skill Gaps</h3>
                                        <ReactMarkdown>{singleResponse.SkillsGaps}</ReactMarkdown>
                                        <br />
                                        <h3>📚 Recommended Course</h3>
                                        <ReactMarkdown>{singleResponse.RecommendedCourse}</ReactMarkdown>
                                        <br />
                                        <h3>🏆 Recommended Certificates</h3>
                                        <ReactMarkdown>{singleResponse.RecommendedCertificates}</ReactMarkdown>
                                        <br />
                                        <h3>🚀 Relevant Projects</h3>
                                        <ReactMarkdown>{singleResponse.ReleventProjects}</ReactMarkdown>
                                    </div>
                                </div>
                            }

                            {singleResponse?.Type === 'Career' &&
                                <div className="message-container" style={{ animationDelay: '0.2s' }}>
                                    <img src="/logoBlue.png" width={40} height={40} alt="SkillBridge AI" />
                                    <div className='message-container-text'>
                                        <h3>🗺️ Recommended Career Path</h3>
                                        <ReactMarkdown>{singleResponse.recommendedPaths}</ReactMarkdown>
                                    </div>
                                </div>
                            }

                            {singleResponse?.Type === "Recommend" &&
                                <div className="message-container" style={{ animationDelay: '0.3s' }}>
                                    <img src="/logoBlue.png" width={40} height={40} alt="SkillBridge AI" />
                                    <div className='message-container-text'>
                                        <h3>💡 Recommended Skills to Learn</h3>
                                        <ReactMarkdown>{singleResponse.SkillsRoadMap}</ReactMarkdown>
                                    </div>
                                </div>
                            }

                            {singleResponse?.Type === "Mock" &&
                                <div className="message-container" style={{ animationDelay: '0.4s' }}>
                                    <img src="/logoBlue.png" width={40} height={40} alt="SkillBridge AI" />
                                    <div className='message-container-text'>
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
                            <div className='loading-state mt-3'>
                                <div className="loading-dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <span className="loading-label">Processing…</span>
                            </div>
                        }
                    </>
                )}
            </div>
        </div>
    )
}

export default LLM
