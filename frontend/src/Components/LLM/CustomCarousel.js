import { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { FaLinkedin, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CustomCarousel = () => {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <div className='empty-response-container'>
            <div className='empty-response'>
                <Carousel
                    activeIndex={index}
                    onSelect={handleSelect}
                    interval={null}
                    className='Carousel-container'
                    prevIcon={<FaChevronLeft size={14} color="#a5b4fc" />}
                    nextIcon={<FaChevronRight size={14} color="#a5b4fc" />}
                >
                    {/* Slide 1 — Intro */}
                    <Carousel.Item>
                        <div className="skillbridge-intro-section">
                            <h4>✨ Introducing SkillBridge</h4>
                            <p>
                                Your <strong style={{ color: '#a5b4fc' }}>AI-powered career companion</strong>, designed to accelerate your professional growth and unlock new opportunities in your field.
                            </p>
                            <p>
                                Simply upload your resume and receive expert guidance, personalized recommendations, and strategic insights powered by <strong style={{ color: '#00f5d4' }}>Gemma-2</strong> — our advanced AI model that understands your unique career journey.
                            </p>
                            <p>
                                From skill gap analysis to career roadmaps, mock interviews to personalized learning paths — we bridge the gap between where you are and where you want to be.
                            </p>
                            <p
                                className="intro-highlight"
                                onClick={() => setIndex(1)}
                            >
                                🚀 Ready to transform your career? Meet our amazing team →
                            </p>
                        </div>
                    </Carousel.Item>

                    {/* Slide 2 — Team */}
                    <Carousel.Item>
                        <div className="team-section">
                            <h4>👥 Meet Our Team</h4>
                            <div className='d-flex flex-column' style={{ gap: '6px' }}>

                                <a href="https://www.linkedin.com/in/abdullah-siddique-682734263/" target="_blank" rel="noopener noreferrer">
                                    <div className="team-member-card">
                                        <FaLinkedin size={22} />
                                        <span className="team-member-name">Abdullah Siddique</span>
                                    </div>
                                </a>

                                <a href="https://www.linkedin.com/in/ibrahim-bin-mansoor-967377248/" target="_blank" rel="noopener noreferrer">
                                    <div className="team-member-card">
                                        <FaLinkedin size={22} />
                                        <span className="team-member-name">Ibrahim Bin Mansoor</span>
                                    </div>
                                </a>

                                <a href="https://www.linkedin.com/in/ahmadkhushi/" target="_blank" rel="noopener noreferrer">
                                    <div className="team-member-card">
                                        <FaLinkedin size={22} />
                                        <span className="team-member-name">Ahmad Raza</span>
                                    </div>
                                </a>

                                <a href="https://www.linkedin.com/in/sarah-khan-48274a315/" target="_blank" rel="noopener noreferrer">
                                    <div className="team-member-card">
                                        <FaLinkedin size={22} />
                                        <span className="team-member-name">Luna</span>
                                    </div>
                                </a>

                                <a href="https://www.linkedin.com/in/bilawalmujeeb/" target="_blank" rel="noopener noreferrer">
                                    <div className="team-member-card">
                                        <FaLinkedin size={22} />
                                        <span className="team-member-name">Bilawal Mujeeb</span>
                                    </div>
                                </a>

                            </div>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    )
}

export default CustomCarousel
