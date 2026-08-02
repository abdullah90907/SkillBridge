const PlainTextConversion = require('../utilities/PlainTextConversion');
const GetGemmaResponse = require('../utilities/GemmaResponse');

exports.analysisControler = async (req, res) => {
    try {
        const hasResume = req.body?.hasResume === 'true' && req.file;

        let SkillsGaps, RecommendedCourse, RecommendedCertificates, ReleventProjects;

        if (hasResume) {
            // ── Personalised analysis from uploaded resume ──
            let resumePath = req.file.path || 'uploads/resume.pdf';
            let resume = await PlainTextConversion(resumePath);

            const prompt1 = `Here is the detailed resume: ${resume}. Based on the skills mentioned, please identify any skill gaps the candidate has. Provide a list of related missing or underdeveloped skills that could improve their qualifications (Note. Only add related to mentioned skills on resume, don't add every skill). Include suggestions for learning resources and platforms where the candidate can improve these skills. Be sure to reference specific skills from the resume.`
            const prompt2 = `Here is the detailed resume: ${resume}. Based on the skills mentioned, recommend online courses (both free and paid) that would help the candidate strengthen their skills and make their resume more competitive. Include course names, platforms, URLs, and any additional relevant information about the course.`
            const prompt3 = `Here is the detailed resume: ${resume}. Based on the skills and job positions mentioned, recommend relevant certifications that would enhance the candidate's qualifications. Include certification names, issuing organizations, URLs, and whether they are free or paid.`
            const prompt4 = `Here is the detailed resume: ${resume}. Based on the candidate's skills and experience, suggest relevant personal or professional projects that can be worked on to improve their portfolio. These projects should be aligned with their career goals and should help showcase their expertise. Provide project ideas along with any resources or tools that can be used to build them.`

            SkillsGaps = await GetGemmaResponse.main(prompt1);
            RecommendedCourse = await GetGemmaResponse.main(prompt2);
            RecommendedCertificates = await GetGemmaResponse.main(prompt3);
            ReleventProjects = await GetGemmaResponse.main(prompt4);

        } else {
            // ── General guidance — no resume provided ──
            const note = `> 📄 **Note:** No resume was shared, so I'm providing general guidance. Upload your resume for a fully personalised analysis!\n\n`;

            SkillsGaps = note + await GetGemmaResponse.main(
                `I don't have a specific resume to review, but I can still help! List the most commonly overlooked skill gaps that professionals face in 2024 across tech, business, and creative fields. Provide actionable improvement tips and learning resource links for each.`
            );
            RecommendedCourse = note + await GetGemmaResponse.main(
                `Recommend the top 10 most valuable online courses for career growth in 2024 across popular fields like software development, data science, design, and business. Include course names, platforms, URLs, and cost (free/paid).`
            );
            RecommendedCertificates = note + await GetGemmaResponse.main(
                `List the most in-demand professional certifications in 2024 that significantly boost career prospects and salaries. Cover tech, cloud, project management, and data fields. Include issuing organisations, URLs, and whether they are free or paid.`
            );
            ReleventProjects = note + await GetGemmaResponse.main(
                `Suggest 8 impressive portfolio projects that any professional or developer can build to stand out to recruiters in 2024. Include the technologies involved, what skills they demonstrate, and links to learning resources for each project.`
            );
        }

        return res.json({
            SkillsGaps,
            RecommendedCourse,
            RecommendedCertificates,
            ReleventProjects,
            Type: "Analysis"
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
};
