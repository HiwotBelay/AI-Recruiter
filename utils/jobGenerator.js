const jobTitles = [
  "Software Engineer",
  "Product Manager",
  "UX Designer",
  "Data Scientist",
  "DevOps Engineer",
  "Marketing Manager",
  "Sales Representative",
  "HR Manager",
  "Business Analyst",
  "Project Manager",
];

const departments = [
  "Engineering",
  "Product",
  "Design",
  "Data",
  "Operations",
  "Marketing",
  "Sales",
  "Human Resources",
  "Business",
  "Project Management",
];

const locations = [
  "New York, NY",
  "San Francisco, CA",
  "Remote",
  "London, UK",
  "Toronto, CA",
  "Berlin, DE",
  "Singapore",
  "Sydney, AU",
  "Tokyo, JP",
  "Dubai, UAE",
];

const skillSets = {
  "Software Engineer": [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
  ],
  "Product Manager": [
    "Product Strategy",
    "Agile",
    "User Research",
    "Data Analysis",
    "Roadmapping",
  ],
  "UX Designer": [
    "Figma",
    "User Testing",
    "Prototyping",
    "Design Systems",
    "Adobe Creative Suite",
  ],
  "Data Scientist": [
    "Python",
    "Machine Learning",
    "SQL",
    "Statistics",
    "Data Visualization",
  ],
  "DevOps Engineer": ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux"],
  "Marketing Manager": [
    "Digital Marketing",
    "SEO",
    "Content Strategy",
    "Analytics",
    "Social Media",
  ],
  "Sales Representative": [
    "CRM",
    "Negotiation",
    "Sales Strategy",
    "Lead Generation",
    "Client Relations",
  ],
  "HR Manager": [
    "Recruitment",
    "Employee Relations",
    "HR Policies",
    "Training",
    "Benefits Administration",
  ],
  "Business Analyst": [
    "Data Analysis",
    "SQL",
    "Requirements Gathering",
    "Process Modeling",
    "Reporting",
  ],
  "Project Manager": [
    "Agile",
    "Scrum",
    "Project Planning",
    "Risk Management",
    "Stakeholder Management",
  ],
};

const generateRandomJob = () => {
  const randomIndex = Math.floor(Math.random() * jobTitles.length);
  const title = jobTitles[randomIndex];
  const department = departments[randomIndex];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const jobType = ["full-time", "part-time", "contract", "internship"][
    Math.floor(Math.random() * 4)
  ];
  const min_experience = Math.floor(Math.random() * 8) + 1;
  const salaryBase = 50000 + Math.floor(Math.random() * 100000);

  return {
    title,
    department,
    location,
    jobType,
    description: `We are seeking an experienced ${title} to join our ${department} team. The ideal candidate will have strong expertise in ${skillSets[
      title
    ]
      .slice(0, 3)
      .join(", ")}, and a passion for innovation.`,
    required_skills: skillSets[title],
    min_experience,
    min_education: ["Bachelor", "Master", "PhD"][Math.floor(Math.random() * 3)],
    salary_range: `$${salaryBase.toLocaleString()} - $${(
      salaryBase + 30000
    ).toLocaleString()}`,
    status: "open",
  };
};

const generateMultipleJobs = (count = 5) => {
  return Array(count)
    .fill(null)
    .map(() => generateRandomJob());
};

module.exports = {
  generateRandomJob,
  generateMultipleJobs,
};
