import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaPlay, FaYoutube, FaExternalLinkAlt, FaCheckCircle, FaRobot, FaFileAlt, FaMapMarkedAlt, FaGraduationCap } from 'react-icons/fa';
import '../../Main.css';

const YOUTUBE_VIDEO_URL = "https://youtu.be/eACBoCxqwl8";
const YOUTUBE_EMBED_URL = "https://www.youtube.com/embed/eACBoCxqwl8?autoplay=1";

const demoSteps = [
    {
        id: 'analysis',
        title: '🎯 Resume Analysis',
        icon: <FaFileAlt />,
        highlights: [
            'Instant skill gap detection against industry standards',
            'Tailored course & certification recommendations',
            'Actionable portfolio project ideas'
        ]
    },
    {
        id: 'mock',
        title: '🎤 Mock Interview',
        icon: <FaRobot />,
        highlights: [
            'Role-specific technical & soft skill questions',
            'Sample answers with key talking points',
            'Confidence-building preparation guide'
        ]
    },
    {
        id: 'career',
        title: '🗺️ Career Paths',
        icon: <FaMapMarkedAlt />,
        highlights: [
            'Short-term & long-term career milestones',
            'High-demand role recommendations',
            'Salary & leadership growth insights'
        ]
    },
    {
        id: 'skills',
        title: '💡 Skills Guide',
        icon: <FaGraduationCap />,
        highlights: [
            'Prioritised technology roadmap',
            'Estimated learning duration per skill',
            'Prerequisite skill mapping'
        ]
    }
];

const WatchDemoModal = ({ show, handleClose, onSelectFeature }) => {
    const [activeTab, setActiveTab] = useState(0);

    const currentStep = demoSteps[activeTab];

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            size="lg"
            className="watch-demo-modal"
        >
            <Modal.Header closeButton className="demo-modal-header d-flex justify-content-between align-items-center">
                <Modal.Title className="d-flex align-items-center gap-2">
                    <span className="demo-badge-header d-flex align-items-center gap-1">
                        <FaPlay style={{ fontSize: '0.65rem' }} /> DEMO
                    </span>
                    <span>SkillBridge Video Demo</span>
                </Modal.Title>
                <a
                    href={YOUTUBE_VIDEO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="youtube-direct-link-btn me-3"
                    title="Open directly on YouTube"
                >
                    <FaYoutube color="#ff0000" size={18} />
                    <span>Watch on YouTube</span>
                    <FaExternalLinkAlt size={10} />
                </a>
            </Modal.Header>

            <Modal.Body className="demo-modal-body">
                {/* Embedded YouTube Player */}
                <div className="youtube-player-wrapper mb-4">
                    {show && (
                        <iframe
                            width="100%"
                            height="390"
                            src={YOUTUBE_EMBED_URL}
                            title="SkillBridge Demo Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="youtube-iframe"
                        ></iframe>
                    )}
                </div>

                {/* Feature Navigation & Quick Launch */}
                <h6 className="fw-bold mb-2 text-dark">Explore Key Features:</h6>
                <div className="demo-tabs">
                    {demoSteps.map((step, idx) => (
                        <button
                            key={step.id}
                            className={`demo-tab-btn ${activeTab === idx ? 'active' : ''}`}
                            onClick={() => setActiveTab(idx)}
                        >
                            {step.icon}
                            <span>{step.title.replace(/^[^\s]+\s/, '')}</span>
                        </button>
                    ))}
                </div>

                {/* Highlights for Selected Feature */}
                <div className="demo-highlights-card">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="m-0 fw-bold">{currentStep.title} Highlights</h6>
                        <Button
                            variant="primary"
                            size="sm"
                            className="btn-demo-action"
                            onClick={() => {
                                handleClose();
                                if (onSelectFeature) {
                                    onSelectFeature(activeTab);
                                }
                            }}
                        >
                            Try {currentStep.title.replace(/^[^\s]+\s/, '')} Now 🚀
                        </Button>
                    </div>
                    <div className="highlights-list">
                        {currentStep.highlights.map((item, i) => (
                            <div key={i} className="highlight-item">
                                <FaCheckCircle className="check-icon" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer className="demo-modal-footer d-flex justify-content-between align-items-center">
                <a
                    href={YOUTUBE_VIDEO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="youtube-footer-link"
                >
                    <FaYoutube color="#ff0000" size={20} />
                    <span>https://youtu.be/eACBoCxqwl8</span>
                </a>
                <div className="d-flex gap-2">
                    <Button variant="outline-secondary" onClick={handleClose} className="btn-demo-close">
                        Close
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default WatchDemoModal;
