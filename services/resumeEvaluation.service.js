const pdf = require("pdf-parse");
const mammoth = require("mammoth");
const fs = require("fs").promises;
const OpenAI = require("openai");
const path = require("path");

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class ResumeEvaluationService {
  async extractTextFromFile(filePath) {
    const fileExt = path.extname(filePath).toLowerCase();
    let text = "";

    try {
      if (fileExt === ".pdf") {
        const dataBuffer = await fs.readFile(filePath);
        const pdfData = await pdf(dataBuffer);
        text = pdfData.text;
      } else if (fileExt === ".docx") {
        const docxBuffer = await fs.readFile(filePath);
        const result = await mammoth.extractRawText({ buffer: docxBuffer });
        text = result.value;
      } else if (fileExt === ".doc") {
        throw new Error(
          "DOC format is not supported. Please convert to DOCX or PDF."
        );
      }

      return text;
    } catch (error) {
      console.error("Error extracting text:", error);
      throw error;
    }
  }

  async evaluateResume(text, jobRequirements) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are an expert AI recruitment assistant specializing in resume evaluation.",
          },
          {
            role: "user",
            content: `
              As an AI recruitment expert, evaluate this resume against the job requirements.
              
              Resume text:
              ${text}

              Job Requirements:
              ${jobRequirements}

              Please provide a detailed analysis including:
              1. Skills match percentage
              2. Key qualifications identified
              3. Experience relevance
              4. Education assessment
              5. Technical skills evaluation
              6. Soft skills identified
              7. Overall recommendation
              8. Areas of improvement

              Format the response as a JSON object.
            `,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      });

      const analysis = JSON.parse(response.choices[0].message.content);
      return analysis;
    } catch (error) {
      console.error("Error evaluating resume:", error);
      throw error;
    }
  }

  async extractSkillsAndKeywords(text) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are an expert AI recruitment assistant specializing in resume parsing.",
          },
          {
            role: "user",
            content: `
              Extract key information from this resume text:
              ${text}

              Please identify and list:
              1. Technical skills
              2. Soft skills
              3. Years of experience
              4. Education level
              5. Previous job titles
              6. Industry keywords
              7. Certifications
              8. Languages

              Format the response as a JSON object.
            `,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const keywords = JSON.parse(response.choices[0].message.content);
      return keywords;
    } catch (error) {
      console.error("Error extracting keywords:", error);
      throw error;
    }
  }

  calculateMatchScore(resumeKeywords, jobKeywords) {
    // Implement matching algorithm
    const matchScore = {
      overall: 0,
      skillsMatch: 0,
      experienceMatch: 0,
      educationMatch: 0,
      details: {
        matchedSkills: [],
        missingSkills: [],
        additionalSkills: [],
      },
    };

    // Calculate matches
    const resumeSkills = new Set(
      resumeKeywords.technicalSkills.concat(resumeKeywords.softSkills)
    );
    const requiredSkills = new Set(jobKeywords.requiredSkills);

    // Find matched and missing skills
    matchScore.details.matchedSkills = [...resumeSkills].filter((skill) =>
      requiredSkills.has(skill)
    );
    matchScore.details.missingSkills = [...requiredSkills].filter(
      (skill) => !resumeSkills.has(skill)
    );
    matchScore.details.additionalSkills = [...resumeSkills].filter(
      (skill) => !requiredSkills.has(skill)
    );

    // Calculate scores
    matchScore.skillsMatch =
      (matchScore.details.matchedSkills.length / requiredSkills.size) * 100;
    matchScore.experienceMatch = this.calculateExperienceMatch(
      resumeKeywords.yearsOfExperience,
      jobKeywords.requiredExperience
    );
    matchScore.educationMatch = this.calculateEducationMatch(
      resumeKeywords.educationLevel,
      jobKeywords.requiredEducation
    );

    // Calculate overall score
    matchScore.overall =
      matchScore.skillsMatch * 0.5 +
      matchScore.experienceMatch * 0.3 +
      matchScore.educationMatch * 0.2;

    return matchScore;
  }

  calculateExperienceMatch(candidateExperience, requiredExperience) {
    if (candidateExperience >= requiredExperience) {
      return 100;
    }
    return (candidateExperience / requiredExperience) * 100;
  }

  calculateEducationMatch(candidateEducation, requiredEducation) {
    const educationLevels = {
      "high school": 1,
      associate: 2,
      bachelor: 3,
      master: 4,
      phd: 5,
    };

    const candidateLevel =
      educationLevels[candidateEducation.toLowerCase()] || 0;
    const requiredLevel = educationLevels[requiredEducation.toLowerCase()] || 0;

    if (candidateLevel >= requiredLevel) {
      return 100;
    }
    return (candidateLevel / requiredLevel) * 100;
  }
}

module.exports = new ResumeEvaluationService();
