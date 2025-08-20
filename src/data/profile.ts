interface SkillSection {
  title: string;
  skills: string;
}

interface UserProfile {
  bio: string;
  skillSections: SkillSection[];
}

export const userProfile: UserProfile = {
  bio: `I'm Nikita Tantan, a software developer with a strong practical focus. My journey in programming started early and was shaped by years of hands-on work more than formal education. While I performed well academically, most of my skills were built through real-world projects, solving complex problems and constantly exploring new technologies.

I have experience in low-level programming, which gave me a solid understanding of system performance. I also explored machine learning early on. Today, my primary focus is API development, and I've recently returned to frontend work using React.`,
  
  skillSections: [
    {
      title: 'Languages:',
      skills: 'Python, TypeScript, JavaScript, C, C++, C#, SQL'
    },
    {
      title: 'Back-end:',
      skills: 'FastAPI, Flask, Express, Nest, PostgreSQL, REST API design, WebSocket, TypeOrm, NestJS, ASP.NET Core, Casablanca, MSSQL, MongoDB, Clean architecture (ONION/layer)'
    },
    {
      title: 'Front-end:',
      skills: 'React, Next.js, Tailwind CSS, Zustand, React Query'
    },
    {
      title: 'DevOps / Tools:',
      skills: 'Docker, Git, GitHub Actions, Nginx, Bash/Fish Shell'
    },
    {
      title: 'Blockchain & Crypto:',
      skills: 'Blockchain basics, cryptocurrencies, simple smart contracts, interaction with blockchain API'
    },
    {
      title: 'Other:',
      skills: 'Async programming, OAuth2, Clean Architecture, OOP, Web scraping, Machine Learning basics'
    }
  ]
};
