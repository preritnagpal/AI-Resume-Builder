// features/chatbot/getbotresponse.ts

export function getBotResponse(message: string): string | { text: string; isHTML: boolean } {
  const input = message.toLowerCase();

  // Resume Help
  if (input.includes('write my resume') || input.includes('improve my resume')) {
    return `Sure! I can guide you step-by-step or improve your resume based on your input.`;
  }
  if (input.includes('resume without experience') || input.includes('resume for first job') || input.includes('no experience')) {
    return `No worries! I’ll help craft a resume that highlights your strengths, even without experience.`;
  }
  if (input.includes('career gap')) {
    return `I can help you address gaps professionally and focus on your strengths.`;
  }
  if (input.includes('job hopping')) {
    return `Let’s structure your resume to emphasize growth and value, despite frequent changes.`;
  }
  if (input.includes('remote job')) {
    return `I can help tailor your resume to highlight remote-friendly skills and tools.`;
  }
  if (input.includes('internship')) {
    return `I’ll help you build a strong resume for internships.`;
  }
  if (input.includes('certifications')) {
    return `Yes! Add a Certifications section or include them under Education.`;
  }
  if (input.includes('side projects')) {
    return `Side projects are valuable! I’ll show you where to add them.`;
  }
  if (input.includes('career change')) {
    return `Let’s focus on transferable skills and show how your experience fits the new path.`;
  }
  if (input.includes('part-time job')) {
    return `Absolutely, let’s build a strong resume for part-time roles.`;
  }
  if (input.includes('no degree')) {
    return `No degree? No problem. Let’s highlight your skills and experience.`;
  }
  if (input.includes('freelance')) {
    return `Freelance experience is valuable. I’ll help you include it effectively.`;
  }
  if (input.includes('linkedin')) {
    return `Yes, add your LinkedIn profile in the contact or links section.`;
  }
  if (input.includes('government')) {
    return `We can tailor your resume for government job requirements.`;
  }
  if (input.includes('achievements')) {
    return `Let’s add measurable achievements to show impact.`;
  }
  if (input.includes('resume vs cv')) {
    return `A resume is concise and tailored; a CV is more detailed and academic.`;
  }
  if (input.includes('not include')) {
    return `Avoid personal info, unrelated experience, and generic statements.`;
  }
  if (input.includes('ats-friendly')) {
    return `Use clear formatting, keywords from the job post, and avoid images.`;
  }

  // 🎨 Design & Formatting
  if (input.includes('best format')) {
    return `Reverse-chronological is best for most cases.`;
  }
  if (input.includes('ats format')) {
    return `Keep it simple, no tables/columns if targeting ATS.`;
  }
  if (input.includes('chronological vs functional')) {
    return `Chronological = timeline; Functional = skills-first. Choose what fits best.`;
  }
  if (input.includes('resume length')) {
    return `1 page for <10 years of experience, 2 pages max otherwise.`;
  }
  if (input.includes('font for resume')) {
    return `Use professional fonts like Arial, Calibri, or Helvetica.`;
  }
  if (input.includes('colors in resume')) {
    return `Use minimal color for section headers or accents.`;
  }
  if (input.includes('margins') || input.includes('spacing')) {
    return `Use 0.5–1 inch margins and clean spacing for readability.`;
  }
  if (input.includes('icons in resume')) {
    return `Icons can be nice visually but may affect ATS parsing.`;
  }
  if (input.includes('two-column')) {
    return `Great for design, but check for ATS-friendliness.`;
  }
  if (input.includes('photo')) {
    return `Photos are optional and depend on region – avoid in US/UK.`;
  }

  // 📂 Industry-Specific Resumes
  if (input.includes('software engineer')) {
    return `We have templates and suggestions tailored for software engineering roles.`;
  }
  if (input.includes('data analyst')) {
    return `Include tools like Excel, SQL, Python, dashboards, and data projects.`;
  }
  if (input.includes('teacher')) {
    return `Include certifications, classroom experience, and student outcomes.`;
  }
  if (input.includes('designer')) {
    return `Highlight portfolios, creative tools, and unique layouts.`;
  }
  if (input.includes('doctor')) {
    return `List degrees, residency, clinical experience, and licenses.`;
  }
  if (input.includes('lawyer')) {
    return `Include bar membership, legal internships, and relevant cases.`;
  }
  if (input.includes('finance')) {
    return `Focus on numbers, analysis, results, and certifications like CFA.`;
  }
  if (input.includes('customer support')) {
    return `Show communication, CRM tools, and resolution metrics.`;
  }
  if (input.includes('digital marketer')) {
    return `Include campaign metrics, SEO/SEM tools, and analytics.`;
  }
  if (input.includes('management')) {
    return `Highlight leadership, KPIs, budgeting, and team impact.`;
  }

  // ✍️ Bullet Points & Content
  if (input.includes('write bullet') || input.includes('bullet points')) {
    return `Sure! Paste your text and I’ll convert it into strong bullet points.`;
  }
  if (input.includes('action verb')) {
    return `Use verbs like Led, Managed, Created, Designed, Analyzed, Improved.`;
  }
  if (input.includes('achievement example')) {
    return `Example: Increased sales by 20% in 3 months by optimizing outreach.`;
  }
  if (input.includes('star format')) {
    return `Situation, Task, Action, Result – use it to write results-driven content.`;
  }
  if (input.includes('show impact')) {
    return `Use numbers, outcomes, or improvement metrics to show impact.`;
  }
  if (input.includes('job description help')) {
    return `Paste your role or task, and I’ll help write a compelling description.`;
  }
  if (input.includes('add internship')) {
    return `Add internships under Experience or a dedicated Internship section.`;
  }
  if (input.includes('volunteering')) {
    return `Volunteer work shows initiative – add it under Experience or Extras.`;
  }

  // 📝 Summary & Objective
  if (input.includes('write summary')) {
    return `Sure! Tell me your role and background, and I’ll draft one.`;
  }
  if (input.includes('objective vs summary')) {
    return `Objectives state goals; summaries highlight experience and value.`;
  }
  if (input.includes('career objective')) {
    return `Example: “To secure a challenging role where I can apply my skills...”`;
  }
  if (input.includes('summary for experienced')) {
    return `Summarize your years of experience, specialties, and value to employers.`;
  }
  if (input.includes('tailor summary')) {
    return `Sure! Share the job role and your profile, I’ll customize it.`;
  }

  // 📈 ATS & Keywords
  if (input.includes('what is ats')) {
    return `ATS (Applicant Tracking System) scans resumes before a human does.`;
  }
  if (input.includes('optimize for ats')) {
    return `Use keywords, simple format, standard sections, and no graphics.`;
  }
  if (input.includes('ats score')) {
    return `You can check your ATS score using our Resume Checker tool.`;
  }
  if (input.includes('add keywords')) {
    return `Share a job description and I’ll find the best keywords for you.`;
  }
  if (input.includes('scan job description')) {
    return `Sure, I’ll scan the job post and suggest matching resume terms.`;
  }
  if (input.includes('keyword stuffing')) {
    return `Avoid overloading keywords unnaturally – keep it readable.`;
  }

  // 💼 Cover Letters
  if (input.includes('cover letter')) {
    return `I can help generate personalized cover letters or guide you through writing one.`;
  }
  if (input.includes('short cover letter')) {
    return `Yes! Keep it brief, 3–4 paragraphs with key highlights.`;
  }
  if (input.includes('personalize cover letter')) {
    return `Include the company name, role, and why you’re interested.`;
  }
  if (input.includes('addressing cover letter')) {
    return `Use the hiring manager’s name if known, otherwise “Dear Hiring Team”.`;
  }
  if (input.includes('no company name')) {
    return `Use a general but respectful greeting like “Dear Hiring Manager”.`;
  }

  // 🧠 Interview Help
  if (input.includes('interview')) {
    return `I can help with interview tips, questions, and follow-up guidance.`;
  }
  if (input.includes('strengths') || input.includes('weaknesses')) {
    return `Let’s craft honest and strategic strengths and weaknesses responses.`;
  }
  if (input.includes('star answers')) {
    return `Use STAR: Situation, Task, Action, Result for behavioral answers.`;
  }
  if (input.includes('what to wear')) {
    return `Dress slightly more formal than the company’s dress code.`;
  }
  if (input.includes('follow-up email')) {
    return `I can help you write a professional thank-you follow-up email.`;
  }

  // 🛠️ Tools / Features
  if (input.includes('tools') || input.includes('features')) {
    return `We offer tools like AI Resume Builder, Resume Checker, and Keyword Scanner.`;
  }
  if (input.includes('multiple resumes')) {
    return `Yes, you can save and manage multiple resumes for different roles.`;
  }
  if (input.includes('customize templates')) {
    return `All templates are editable – tweak layouts, colors, and content.`;
  }

  // 🌐 Navigation
  if (input.includes('open') || input.includes('show') || input.includes('where is') || input.includes('link')) {
    return {
      text: `Here are some useful links:<br/>
        <a href="/builder" target="_blank" class="text-blue-600 underline">AI Resume Builder</a><br/>
        <a href="/checker" target="_blank" class="text-blue-600 underline">Resume Checker</a><br/>
        <a href="/scanner" target="_blank" class="text-blue-600 underline">Keyword Scanner</a><br/>
        <span class="text-gray-500">Cover Letter Generator (coming soon)</span>`,
      isHTML: true,
    };
  }

  // 💬 User Interaction
  if (input.includes('hello') || input.includes('hi') || input.includes('hey') || input.includes('namaste')) {
    return `Hello! 👋 How can I help you today?`;
  }
  if (input.includes('thank') || input.includes('thanks')) {
    return `You're welcome! 😊 Let me know if there's anything else.`;
  }
  if (input.includes('bye')) {
    return `Goodbye! 👋 Feel free to come back anytime.`;
  }
  if (input.includes('amazing')) {
    return `You're amazing too! 💫 Let’s create something awesome together.`;
  }

  // Default fallback
  return `I'm here to help with resumes, cover letters, interviews, keywords, and more! ✨`;
}
