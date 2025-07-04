import { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { FaLinkedin } from 'react-icons/fa';

const CustomCarousel = () => {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (

        <div
            className='empty-response-container'
        >
            <div className='empty-response custom-shadow col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6' >
                <Carousel activeIndex={index} onSelect={handleSelect} interval={null}
                    className='Carousel-container'
                >
                    <Carousel.Item>
                        <div className="d-flex flex-column justify-content-center align-items-start carousel-item">
                            <h4>Introducing SkillBridge</h4>
                            <p>our AI-powered assistant, designed to accelerate your professional growth and success.</p>
                            <p>Simply upload your resume, and receive expert guidance and tailored recommendations from Gemma-2, our state-of-the-art LLM model, equipped to help you navigate the path to career excellence.</p>
                            <p><b>Meet the teammates &rarr;</b></p>
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div className="d-flex flex-column justify-content-center align-items-start carousel-item">
                            <div className="text-start">
                                <h4>Meet the team</h4>
                                <div className='d-flex flex-column team-members' >
                                    <div className='team-member'>
                                        <a href="https://www.linkedin.com/in/mr-abdullah-siddique" target="_blank" rel="noopener noreferrer">
                                            <FaLinkedin size={30} color="#0077b5" />
                                            <span>Abdullah Siddique</span>
                                        </a>
                                    </div>
                                    <div className='team-member'>
                                        <a href="https://www.linkedin.com/in/ibrahim-bin-mansoor-967377248/" target="_blank" rel="noopener noreferrer">
                                            <FaLinkedin size={30} color="#0077b5" />
                                            <span>Ibrahim Bin Mansoor</span>
                                        </a>
                                    </div>
                                    <div className='team-member'>
                                        <a href="https://www.linkedin.com/in/ahmadkhushi/" target="_blank" rel="noopener noreferrer">
                                            <FaLinkedin size={30} color="#0077b5" />
                                            <span>Ahmad Raza</span>
                                        </a>
                                    </div>
                                    <div className='team-member'>
                                        <a href="https://www.linkedin.com/in/sarah-khan-48274a315/" target="_blank" rel="noopener noreferrer">
                                            <FaLinkedin size={30} color="#0077b5" />
                                            <span>Luna</span>
                                        </a>
                                    </div>
                                    <div className='team-member'>
                                        <a href="https://www.linkedin.com/in/bilawalmujeeb/" target="_blank" rel="noopener noreferrer">
                                            <FaLinkedin size={30} color="#0077b5" />
                                            <span>Bilawal Mujeeb</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>
                </Carousel>


            </div>
        </div>

    )
}

export default CustomCarousel
