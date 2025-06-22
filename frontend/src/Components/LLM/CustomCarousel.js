import { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { FaLinkedin, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CustomCarousel = () => {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (

        <div
            className='empty-response-container'
        >
            <div className='empty-response custom-shadow' >
                <Carousel activeIndex={index} onSelect={handleSelect} interval={null}
                    className='Carousel-container'
                    prevIcon={<FaChevronLeft size={20} />}
                    nextIcon={<FaChevronRight size={20} />}
                >
                    <Carousel.Item>
                        <div className="skillbridge-intro-section">
                            <h4>✨ Introducing SkillBridge</h4>
                            <p>Your AI-powered career companion, designed to accelerate your professional growth and unlock new opportunities in your field.</p>
                            <p>Simply upload your resume and receive expert guidance, personalized recommendations, and strategic insights powered by Gemma-2, our advanced AI model that understands your unique career journey.</p>
                            <p>From skill gap analysis to career roadmaps, mock interviews to personalized learning paths - we're here to bridge the gap between where you are and where you want to be.</p>
                            <p className="intro-highlight" style={{cursor: 'pointer'}} onClick={() => setIndex(1)}>
                                🚀 Ready to transform your career? Meet our amazing team →
                            </p>
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div className="team-section">
                            <h4>Meet Our Team</h4>
                            <div className='d-flex flex-column' style={{gap: '8px'}}>
                                <a href="https://www.linkedin.com/in/abdullah-siddique-682734263/" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>
                                    <div className="team-member-card" style={{
                                        background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.08), rgba(254, 202, 87, 0.08))',
                                        cursor: 'pointer'
                                    }}>
                                        <FaLinkedin size={26} color="#0077b5" />
                                        <span className="team-member-name">Abdullah Siddique</span>
                                    </div>
                                </a>
                                <a href="https://www.linkedin.com/in/ibrahim-bin-mansoor-967377248/" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>
                                    <div className="team-member-card" style={{
                                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08), rgba(118, 75, 162, 0.08))',
                                        cursor: 'pointer'
                                    }}>
                                        <FaLinkedin size={26} color="#0077b5" />
                                        <span className="team-member-name">Ibrahim Bin Mansoor</span>
                                    </div>
                                </a>
                                <a href="https://www.linkedin.com/in/ahmadkhushi/" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>
                                    <div className="team-member-card" style={{
                                        background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.08), rgba(254, 202, 87, 0.08))',
                                        cursor: 'pointer'
                                    }}>
                                        <FaLinkedin size={26} color="#0077b5" />
                                        <span className="team-member-name">Ahmad Raza</span>
                                    </div>
                                </a>
                                <a href="https://www.linkedin.com/in/sarah-khan-48274a315/" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>
                                    <div className="team-member-card" style={{
                                        background: 'linear-gradient(135deg, rgba(0, 184, 148, 0.08), rgba(0, 206, 201, 0.08))',
                                        cursor: 'pointer'
                                    }}>
                                        <FaLinkedin size={26} color="#0077b5" />
                                        <span className="team-member-name">Luna</span>
                                    </div>
                                </a>
                                <a href="https://www.linkedin.com/in/bilawalmujeeb/" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>
                                    <div className="team-member-card" style={{
                                        background: 'linear-gradient(135deg, rgba(116, 185, 255, 0.08), rgba(9, 132, 227, 0.08))',
                                        cursor: 'pointer'
                                    }}>
                                        <FaLinkedin size={26} color="#0077b5" />
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
