import { Mentor } from '../types/mentor';

export const mentors: Mentor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    department: 'Computer Science',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    yearsExperience: 8,
    tagline: 'Specializing in Machine Learning and AI Ethics',
    matchPercentage: 95,
    bio: 'Dr. Chen is an associate professor in the Computer Science department with a passion for making AI accessible and ethical. She has mentored over 30 independent studies focusing on practical applications of machine learning.',
    background: 'Ph.D. in Computer Science from MIT, previously worked at Google AI Research. Published over 40 papers in top-tier conferences on machine learning and natural language processing.',
    interests: ['Machine Learning', 'AI', 'Data Science', 'Ethics in Technology'],
    pastStudies: [
      'Building a sentiment analysis tool for social media',
      'Developing an AI-powered tutoring system',
      'Ethical considerations in facial recognition technology',
      'Predicting student success using machine learning'
    ],
    cvUrl: 'https://example.com/cv/sarah-chen.pdf'
  },
  {
    id: '2',
    name: 'Prof. Michael Rodriguez',
    department: 'Art',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    yearsExperience: 12,
    tagline: 'Digital Art and Interactive Media Expert',
    matchPercentage: 88,
    bio: 'Professor Rodriguez combines traditional art techniques with cutting-edge digital tools. His independent study projects often explore the intersection of art and technology.',
    background: 'MFA from Yale School of Art. Exhibited work internationally in over 50 galleries. Specializes in digital installations and interactive art experiences.',
    interests: ['Digital Art', 'Graphic Design', 'Photography', 'Interactive Media'],
    pastStudies: [
      'Creating an augmented reality art exhibition',
      'Developing a personal portfolio website with interactive elements',
      'Exploring generative art through code',
      'Documentary photography project on campus life'
    ],
    cvUrl: 'https://example.com/cv/michael-rodriguez.pdf'
  },
  {
    id: '3',
    name: 'Dr. Emily Watson',
    department: 'Biology',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    yearsExperience: 10,
    tagline: 'Ecology and Conservation Biology Researcher',
    matchPercentage: 92,
    bio: 'Dr. Watson is dedicated to field-based research and has led numerous student projects in local ecosystems. She encourages hands-on learning and real-world impact.',
    background: 'Ph.D. in Ecology from UC Berkeley. Research focuses on forest ecosystems and climate change impacts. Lead investigator on multiple NSF-funded projects.',
    interests: ['Ecology', 'Marine Biology', 'Evolution', 'Environmental Science'],
    pastStudies: [
      'Studying bird migration patterns in Western Massachusetts',
      'Impact of invasive species on local wetlands',
      'Creating a sustainable campus garden initiative',
      'Water quality monitoring in Connecticut River'
    ],
    cvUrl: 'https://example.com/cv/emily-watson.pdf'
  },
  {
    id: '4',
    name: 'Prof. James Park',
    department: 'Psychology',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    yearsExperience: 7,
    tagline: 'Cognitive Psychology and Human-Computer Interaction',
    matchPercentage: 85,
    bio: 'Professor Park studies how people interact with technology and make decisions. He brings a multidisciplinary approach to independent studies.',
    background: 'Ph.D. in Cognitive Psychology from Stanford. Former UX researcher at Microsoft. Expertise in experimental design and user research.',
    interests: ['Cognitive', 'Research Methods', 'Social Psychology', 'User Experience'],
    pastStudies: [
      'Investigating decision-making in online environments',
      'Designing and conducting memory experiments',
      'Study on social media impact on college students',
      'Exploring attention and multitasking behavior'
    ]
  },
  {
    id: '5',
    name: 'Dr. Amanda Foster',
    department: 'Chemistry',
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
    yearsExperience: 9,
    tagline: 'Green Chemistry and Sustainable Materials',
    matchPercentage: 90,
    bio: 'Dr. Foster is passionate about developing environmentally friendly chemical processes. She encourages students to think about the real-world applications of their research.',
    background: 'Ph.D. in Chemistry from Northwestern. Specializes in sustainable synthesis methods. Winner of the ACS Green Chemistry Award.',
    interests: ['Green Chemistry', 'Organic Chemistry', 'Materials Science', 'Sustainability'],
    pastStudies: [
      'Developing biodegradable plastics from natural materials',
      'Analyzing water contaminants in local sources',
      'Creating natural dyes from plant materials',
      'Sustainable battery technology research'
    ]
  },
  {
    id: '6',
    name: 'Prof. David Kim',
    department: 'Engineering',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    yearsExperience: 15,
    tagline: 'Robotics and Mechanical Engineering Innovation',
    matchPercentage: 87,
    bio: 'Professor Kim has extensive industry experience and loves helping students build tangible prototypes. His projects often involve hands-on fabrication and testing.',
    background: 'Ph.D. in Mechanical Engineering from Carnegie Mellon. Previously worked at Boston Dynamics. Expert in robotics, mechatronics, and design.',
    interests: ['Mechanical', 'Electrical', 'Biomedical', 'Robotics'],
    pastStudies: [
      'Designing and building an autonomous rover',
      'Creating prosthetic devices with 3D printing',
      'Developing a smart irrigation system',
      'Building a competition robot for engineering challenges'
    ]
  },
  {
    id: '7',
    name: 'Dr. Rachel Green',
    department: 'English',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    yearsExperience: 11,
    tagline: 'Creative Writing and Contemporary Literature',
    matchPercentage: 91,
    bio: 'Dr. Green is an award-winning author who mentors students in finding their unique voice. She specializes in creative nonfiction and personal essays.',
    background: 'MFA in Creative Writing from Iowa Writers Workshop. Published two novels and numerous short stories. Regular contributor to The New Yorker.',
    interests: ['Creative Writing', 'Literature', 'Poetry', 'Journalism'],
    pastStudies: [
      'Writing and publishing a personal essay collection',
      'Creating a literary magazine for campus',
      'Developing a memoir about family history',
      'Poetry chapbook exploring identity themes'
    ]
  },
  {
    id: '8',
    name: 'Prof. Thomas Anderson',
    department: 'Economics',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
    yearsExperience: 6,
    tagline: 'Behavioral Economics and Public Policy',
    matchPercentage: 83,
    bio: 'Professor Anderson applies economic principles to real-world policy questions. He encourages students to conduct original research with social impact.',
    background: 'Ph.D. in Economics from Harvard. Former policy advisor at the Federal Reserve. Research focuses on labor markets and inequality.',
    interests: ['Microeconomics', 'Development Economics', 'Labor Economics', 'Econometrics'],
    pastStudies: [
      'Analyzing the impact of minimum wage on local businesses',
      'Study on student loan debt and career choices',
      'Economic analysis of campus sustainability initiatives',
      'Research on gig economy workers in Massachusetts'
    ]
  },
  {
    id: '9',
    name: 'Dr. Lisa Martinez',
    department: 'Mathematics',
    photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400',
    yearsExperience: 8,
    tagline: 'Applied Mathematics and Data Modeling',
    matchPercentage: 89,
    bio: 'Dr. Martinez loves showing students how mathematics can solve real problems. She specializes in mathematical modeling and computational approaches.',
    background: 'Ph.D. in Applied Mathematics from Princeton. Research in optimization, network theory, and mathematical biology. Published 25+ papers.',
    interests: ['Applied Math', 'Statistics', 'Data Science', 'Discrete Math'],
    pastStudies: [
      'Mathematical modeling of disease spread on campus',
      'Creating algorithms for optimal class scheduling',
      'Statistical analysis of climate data',
      'Network analysis of social connections'
    ]
  },
  {
    id: '10',
    name: 'Prof. Robert Taylor',
    department: 'History',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    yearsExperience: 14,
    tagline: 'American History and Public Memory',
    matchPercentage: 86,
    bio: 'Professor Taylor specializes in how historical events are remembered and commemorated. His projects often involve archival research and oral histories.',
    background: 'Ph.D. in History from Columbia. Expert on 20th century American history. Published three books on civil rights movement and public memory.',
    interests: ['American History', 'Cultural History', 'Political History', 'Oral History'],
    pastStudies: [
      'Oral history project documenting campus activism',
      'Research on local historical landmarks',
      'Creating a digital archive of student newspapers',
      'Study on commemoration of historical events in Amherst'
    ]
  },
  {
    id: '11',
    name: 'Dr. Jennifer Lee',
    department: 'Physics',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    yearsExperience: 9,
    tagline: 'Astrophysics and Computational Physics',
    matchPercentage: 94,
    bio: 'Dr. Lee studies the universe at both cosmic and quantum scales. She encourages students to explore theoretical concepts through computational simulations.',
    background: 'Ph.D. in Physics from Caltech. Postdoctoral research at NASA. Specializes in exoplanet detection and cosmology.',
    interests: ['Astrophysics', 'Quantum Mechanics', 'Particle Physics', 'Computational Physics'],
    pastStudies: [
      'Simulating galaxy formation and evolution',
      'Building a telescope for campus astronomy club',
      'Analyzing data from particle physics experiments',
      'Study on dark matter detection methods'
    ]
  },
  {
    id: '12',
    name: 'Prof. Christopher White',
    department: 'Business',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    yearsExperience: 10,
    tagline: 'Entrepreneurship and Innovation Strategy',
    matchPercentage: 88,
    bio: 'Professor White is a serial entrepreneur who loves helping students turn ideas into reality. He has founded three successful startups and mentors aspiring entrepreneurs.',
    background: 'MBA from Wharton. Founded tech companies in education and healthcare. Active angel investor and startup advisor.',
    interests: ['Entrepreneurship', 'Marketing', 'Strategy', 'Business Analytics'],
    pastStudies: [
      'Developing a business plan for a student startup',
      'Market research for a new mobile app concept',
      'Creating a social enterprise to address food insecurity',
      'Launching an e-commerce platform for local artisans'
    ]
  },
  {
    id: '13',
    name: 'Dr. Patricia Alvarez',
    department: 'Anthropology',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    yearsExperience: 13,
    tagline: 'Cultural Anthropology and Ethnographic Research',
    matchPercentage: 87,
    bio: 'Dr. Alvarez specializes in cultural anthropology with extensive fieldwork experience. She encourages students to explore diverse cultures and human experiences through immersive research.',
    background: 'Ph.D. in Anthropology from University of Chicago. Conducted fieldwork in Latin America and Southeast Asia. Published two ethnographic monographs.',
    interests: ['Cultural Anthropology', 'Ethnography', 'Medical Anthropology', 'Migration Studies'],
    pastStudies: [
      'Ethnographic study of local immigrant communities',
      'Research on healthcare practices in diverse populations',
      'Cultural analysis of food traditions',
      'Study of ritual and identity in diaspora communities'
    ]
  },
  {
    id: '14',
    name: 'Prof. David Nakamura',
    department: 'Astronomy',
    photo: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400',
    yearsExperience: 11,
    tagline: 'Exoplanet Detection and Observational Astronomy',
    matchPercentage: 93,
    bio: 'Professor Nakamura is passionate about discovering new worlds beyond our solar system. He mentors students in telescope operation, data analysis, and astronomical research.',
    background: 'Ph.D. in Astronomy from Caltech. Member of several exoplanet discovery teams. Access to major observatory networks worldwide.',
    interests: ['Exoplanets', 'Observational Astronomy', 'Planetary Science', 'Stellar Astronomy'],
    pastStudies: [
      'Analyzing light curves for exoplanet transits',
      'Building a small radio telescope for solar observation',
      'Photometric study of variable stars',
      'Research on habitable zone planets'
    ]
  },
  {
    id: '15',
    name: 'Dr. Olivia Thompson',
    department: 'Communication',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    yearsExperience: 7,
    tagline: 'Digital Media and Public Relations Strategist',
    matchPercentage: 84,
    bio: 'Dr. Thompson brings real-world media experience to the classroom. She helps students develop professional communication skills and understand the evolving media landscape.',
    background: 'Ph.D. in Communication from Northwestern. Former communications director at Fortune 500 company. Expert in crisis communication and social media strategy.',
    interests: ['Digital Media', 'Public Relations', 'Media Studies', 'Strategic Communication'],
    pastStudies: [
      'Creating a comprehensive social media campaign',
      'Crisis communication case study analysis',
      'Developing a podcast series on campus issues',
      'Public relations strategy for a nonprofit organization'
    ]
  },
  {
    id: '16',
    name: 'Prof. Marcus Johnson',
    department: 'Education',
    photo: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400',
    yearsExperience: 14,
    tagline: 'STEM Education and Curriculum Innovation',
    matchPercentage: 91,
    bio: 'Professor Johnson is dedicated to improving STEM education at all levels. He works with students to design innovative curricula and teaching methods that engage diverse learners.',
    background: 'Ed.D. from Harvard Graduate School of Education. Former high school teacher and curriculum designer. National recognition for innovative teaching methods.',
    interests: ['STEM Education', 'Curriculum Design', 'Educational Technology', 'Teacher Training'],
    pastStudies: [
      'Designing hands-on science curriculum for middle school',
      'Developing educational technology tools for mathematics',
      'Research on culturally responsive teaching practices',
      'Creating professional development workshops for teachers'
    ]
  },
  {
    id: '17',
    name: 'Dr. Sophia Patel',
    department: 'Environmental Science',
    photo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400',
    yearsExperience: 9,
    tagline: 'Climate Change and Sustainability Solutions',
    matchPercentage: 96,
    bio: 'Dr. Patel is at the forefront of climate change research and sustainable development. She mentors students in environmental research that can make a real difference in our world.',
    background: 'Ph.D. in Environmental Science from Stanford. Lead author on IPCC reports. Advisor to environmental policy organizations.',
    interests: ['Climate Change', 'Sustainability', 'Renewable Energy', 'Environmental Policy'],
    pastStudies: [
      'Carbon footprint analysis of campus operations',
      'Designing renewable energy solutions for rural communities',
      'Research on local climate adaptation strategies',
      'Sustainable agriculture project with local farms'
    ]
  },
  {
    id: '18',
    name: 'Prof. Catherine Morris',
    department: 'Geography',
    photo: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400',
    yearsExperience: 10,
    tagline: 'Urban Planning and GIS Technology',
    matchPercentage: 86,
    bio: 'Professor Morris combines geographic information systems with urban planning to address contemporary challenges. She helps students use spatial analysis for problem-solving.',
    background: 'Ph.D. in Geography from UCLA. Certified GIS Professional. Consultant for urban development projects across New England.',
    interests: ['GIS', 'Urban Planning', 'Human Geography', 'Spatial Analysis'],
    pastStudies: [
      'Mapping food deserts in Massachusetts',
      'GIS analysis of public transportation accessibility',
      'Urban heat island study using remote sensing',
      'Creating interactive maps for community planning'
    ]
  },
  {
    id: '19',
    name: 'Dr. Benjamin Stone',
    department: 'Geosciences',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
    yearsExperience: 12,
    tagline: 'Geology and Earth System Science',
    matchPercentage: 89,
    bio: 'Dr. Stone studies the Earth\'s processes from deep time to the present. His fieldwork-based approach gives students hands-on experience with geological phenomena.',
    background: 'Ph.D. in Geosciences from Penn State. Research on sedimentary geology and paleoclimatology. Extensive field experience in North America and Africa.',
    interests: ['Geology', 'Paleontology', 'Climate Science', 'Sedimentology'],
    pastStudies: [
      'Geological mapping of local rock formations',
      'Fossil identification and paleoenvironment reconstruction',
      'Study of glacial features in New England',
      'Analysis of sediment cores from local lakes'
    ]
  },
  {
    id: '20',
    name: 'Dr. Aisha Williams',
    department: 'Kinesiology',
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400',
    yearsExperience: 8,
    tagline: 'Exercise Science and Athletic Performance',
    matchPercentage: 85,
    bio: 'Dr. Williams researches human movement and athletic performance. She works with students interested in sports science, rehabilitation, and human physiology.',
    background: 'Ph.D. in Kinesiology from University of Michigan. Former collegiate athlete. Certified strength and conditioning specialist.',
    interests: ['Exercise Science', 'Biomechanics', 'Sports Medicine', 'Motor Learning'],
    pastStudies: [
      'Biomechanical analysis of running gait',
      'Designing training programs for collegiate athletes',
      'Research on injury prevention in youth sports',
      'Study of exercise adherence and motivation'
    ]
  },
  {
    id: '21',
    name: 'Prof. Daniel Chang',
    department: 'Linguistics',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    yearsExperience: 11,
    tagline: 'Sociolinguistics and Language Variation',
    matchPercentage: 88,
    bio: 'Professor Chang investigates how language varies across social contexts and communities. He mentors students in linguistic analysis and language documentation.',
    background: 'Ph.D. in Linguistics from MIT. Research on language contact and multilingualism. Fluent in five languages.',
    interests: ['Sociolinguistics', 'Language Acquisition', 'Phonetics', 'Computational Linguistics'],
    pastStudies: [
      'Documenting local dialect features in Massachusetts',
      'Study of code-switching in bilingual communities',
      'Phonetic analysis of second language acquisition',
      'Creating a corpus of student speech patterns'
    ]
  },
  {
    id: '22',
    name: 'Dr. Isabella Romano',
    department: 'Music',
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
    yearsExperience: 15,
    tagline: 'Music Composition and Ethnomusicology',
    matchPercentage: 90,
    bio: 'Dr. Romano is an accomplished composer who also studies music from global perspectives. She encourages students to explore both creative and scholarly approaches to music.',
    background: 'DMA in Composition from Juilliard. Works performed by major orchestras. Research on music traditions in Mediterranean cultures.',
    interests: ['Composition', 'Ethnomusicology', 'Music Theory', 'Music Technology'],
    pastStudies: [
      'Composing an original chamber music piece',
      'Ethnographic study of local music communities',
      'Creating electronic music using digital tools',
      'Research on music and cultural identity'
    ]
  },
  {
    id: '23',
    name: 'Prof. Rebecca Martinez',
    department: 'Nursing',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    yearsExperience: 13,
    tagline: 'Community Health and Public Health Nursing',
    matchPercentage: 87,
    bio: 'Professor Martinez has extensive clinical experience and focuses on community-based health interventions. She mentors students in public health nursing and health equity.',
    background: 'Ph.D. in Nursing from Johns Hopkins. 20 years of clinical practice. Specialist in community health and health disparities.',
    interests: ['Community Health', 'Public Health Nursing', 'Health Equity', 'Clinical Practice'],
    pastStudies: [
      'Community health needs assessment project',
      'Developing health education programs for underserved populations',
      'Research on barriers to healthcare access',
      'Creating culturally competent nursing interventions'
    ]
  },
  {
    id: '24',
    name: 'Dr. Nathan Brooks',
    department: 'Philosophy',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    yearsExperience: 10,
    tagline: 'Ethics and Political Philosophy',
    matchPercentage: 84,
    bio: 'Dr. Brooks specializes in applied ethics and contemporary political philosophy. He helps students develop critical thinking skills and engage with pressing moral questions.',
    background: 'Ph.D. in Philosophy from Princeton. Published books on justice and moral philosophy. Regular contributor to public philosophy forums.',
    interests: ['Ethics', 'Political Philosophy', 'Philosophy of Mind', 'Epistemology'],
    pastStudies: [
      'Ethical analysis of emerging technologies',
      'Research on theories of justice and inequality',
      'Philosophical examination of environmental ethics',
      'Study of free will and moral responsibility'
    ]
  },
  {
    id: '25',
    name: 'Prof. Victoria Chen',
    department: 'Political Science',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    yearsExperience: 9,
    tagline: 'International Relations and Comparative Politics',
    matchPercentage: 91,
    bio: 'Professor Chen studies global politics and comparative political systems. She mentors students interested in international affairs, diplomacy, and global governance.',
    background: 'Ph.D. in Political Science from Georgetown. Former policy analyst at State Department. Expert on East Asian politics and international security.',
    interests: ['International Relations', 'Comparative Politics', 'Political Theory', 'Public Policy'],
    pastStudies: [
      'Comparative analysis of electoral systems',
      'Research on international cooperation and conflict',
      'Study of democratization in developing countries',
      'Policy analysis of global environmental agreements'
    ]
  },
  {
    id: '26',
    name: 'Dr. Andrew Sullivan',
    department: 'Public Health',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    yearsExperience: 11,
    tagline: 'Epidemiology and Disease Prevention',
    matchPercentage: 93,
    bio: 'Dr. Sullivan is an epidemiologist who investigates patterns of disease and health in populations. He mentors students in research methods and data analysis for public health.',
    background: 'Ph.D. in Epidemiology from Harvard School of Public Health. Former CDC researcher. Expertise in infectious disease and chronic disease epidemiology.',
    interests: ['Epidemiology', 'Biostatistics', 'Health Policy', 'Disease Prevention'],
    pastStudies: [
      'Epidemiological study of campus health trends',
      'Analysis of vaccination coverage and disease outbreaks',
      'Research on chronic disease risk factors',
      'Public health intervention design and evaluation'
    ]
  },
  {
    id: '27',
    name: 'Dr. Maya Jackson',
    department: 'Sociology',
    photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400',
    yearsExperience: 8,
    tagline: 'Race, Inequality, and Social Justice',
    matchPercentage: 92,
    bio: 'Dr. Jackson researches social inequality and movements for justice. She encourages students to use sociological methods to understand and address social problems.',
    background: 'Ph.D. in Sociology from University of California, Berkeley. Published research on race, class, and social movements. Community-engaged scholar.',
    interests: ['Race and Ethnicity', 'Inequality', 'Social Movements', 'Urban Sociology'],
    pastStudies: [
      'Ethnographic study of student activism',
      'Research on racial disparities in education',
      'Analysis of social networks and community organizing',
      'Study of gentrification in local neighborhoods'
    ]
  },
  {
    id: '28',
    name: 'Prof. Alexander Wright',
    department: 'Theater',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    yearsExperience: 12,
    tagline: 'Directing and Performance Studies',
    matchPercentage: 86,
    bio: 'Professor Wright is an award-winning director with productions on and off Broadway. He mentors students in all aspects of theater creation, from acting to directing to design.',
    background: 'MFA in Directing from Yale School of Drama. Directed over 50 productions. Multiple regional theater awards.',
    interests: ['Directing', 'Acting', 'Playwriting', 'Theater History'],
    pastStudies: [
      'Directing an original student-written play',
      'Creating a solo performance piece',
      'Adapting a classic work for contemporary audiences',
      'Research on experimental theater techniques'
    ]
  },
  {
    id: '29',
    name: 'Dr. Rachel Hamilton',
    department: 'Veterinary Science',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    yearsExperience: 10,
    tagline: 'Animal Behavior and Wildlife Health',
    matchPercentage: 89,
    bio: 'Dr. Hamilton combines veterinary medicine with conservation biology. She mentors students interested in animal welfare, wildlife health, and veterinary research.',
    background: 'DVM from Cornell and Ph.D. in Wildlife Health. Field veterinarian experience in Africa. Specialist in animal behavior and wildlife medicine.',
    interests: ['Animal Behavior', 'Wildlife Health', 'Veterinary Pathology', 'Conservation Medicine'],
    pastStudies: [
      'Behavioral study of local wildlife populations',
      'Research on disease transmission between domestic and wild animals',
      'Animal welfare assessment in agricultural settings',
      'Wildlife rehabilitation and release protocols'
    ]
  },
  {
    id: '30',
    name: 'Dr. Kevin Nguyen',
    department: 'Biochemistry',
    photo: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400',
    yearsExperience: 7,
    tagline: 'Protein Engineering and Structural Biology',
    matchPercentage: 94,
    bio: 'Dr. Nguyen studies protein structure and function at the molecular level. He mentors students in cutting-edge biochemical research and laboratory techniques.',
    background: 'Ph.D. in Biochemistry from Stanford. Postdoctoral research at NIH. Expert in X-ray crystallography and protein design.',
    interests: ['Protein Structure', 'Enzymology', 'Structural Biology', 'Molecular Genetics'],
    pastStudies: [
      'Purifying and characterizing novel enzymes',
      'Structural analysis of protein-drug interactions',
      'Designing mutant proteins with enhanced function',
      'Research on metabolic pathway regulation'
    ]
  }
];
