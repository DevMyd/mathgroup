document.addEventListener('DOMContentLoaded', () => {
    
    const langToggle = document.getElementById('langToggle');

    const setLanguage = (lang) => {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        localStorage.setItem('math_lang', lang);
        langToggle.textContent = lang === 'ar' ? 'EN' : 'ع';

        const translatableElements = document.querySelectorAll('[data-translate]');
        translatableElements.forEach(el => {
            const key = el.getAttribute('data-translate');
            const translation = translations[lang][key];
            if (translation) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translation;
                } else {
                    el.innerHTML = translation;
                }
            }
        });
    };

    langToggle.addEventListener('click', () => {
        const currentLang = document.documentElement.lang;
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        setLanguage(newLang);
    });

    // Initial setup
    const savedLang = localStorage.getItem('math_lang') || 'ar';
    setLanguage(savedLang);
});

// تفعيل التبويبات في الخطة السنوية
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById(tab.dataset.tab);
    if (target) target.classList.add('active');
  });
});

// عدادات الأرقام
const counters = document.querySelectorAll('.number[data-target]');
const speed = 40;
const runCounter = (el) => {
  const target = +el.getAttribute('data-target');
  let current = 0;
  const step = Math.ceil(target / (2000 / speed));
  const update = () => {
    current += step;
    if (current < target) {
      el.textContent = current.toLocaleString();
      setTimeout(update, speed);
    } else {
      el.textContent = target.toLocaleString();
    }
  };
  update();
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      runCounter(e.target);
      observer.unobserve(e.target);
    }
  });
},{threshold:0.35});

counters.forEach(c => observer.observe(c));

// تمرير سلس للروابط الداخلية
const internalLinks = document.querySelectorAll('a[href^="#"]');
internalLinks.forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    if (id.length > 1) {
      e.preventDefault();
      const el = document.querySelector(id);
      if (el) {
        window.scrollTo({top: el.offsetTop - 60, behavior: 'smooth'});
      }
    }
  });
});

// i18n
const dict = {
  ar: {
    hero_title: 'ابتكار، تمكين، أثر مستدام',
    hero_sub: 'منصة طلابية تقود تجربة تعلم رياضية تفاعلية تدعم رؤية عُمان 2040 وتنمّي العقول الشغوفة بالتحليل والإبداع.',
    explore: 'استكشف البرامج'
  },
  en: {
    hero_title: 'Innovation, Empowerment, Sustainable Impact',
    hero_sub: 'A student platform driving an interactive mathematical learning experience aligned with Oman Vision 2040, nurturing analytical and creative minds.',
    explore: 'Explore Programs'
  }
};
// Language toggle
const translations = {
    en: {
        site_title: "Math Group | Decoding the Future",
        brand_title: "Math Group",
        brand_subtitle: "Where Numbers Meet Ambition",
        nav_home: "Home",
        nav_about: "Our Logic",
        nav_magazine: "Math Magazine",

        nav_timeline: "Events",
        nav_tools: "Math Tools",
        nav_ai: "AI Tools",
        nav_contact: "Contact Us",
        hero_title: "Decode the Future, One Equation at a Time",
        hero_subtitle: "We are an intellectual community exploring the elegant worlds of mathematics, building bridges between abstract theories and the applications that shape tomorrow.",
        hero_button: "Explore Our Dimensions",
        about_title: "The Logic of Our Existence",
        about_p: "The Math Group was founded on the principle that numbers are the language of the universe. We see mathematics not as a subject, but as a thinking methodology capable of solving complex problems, inspiring innovation, and revealing the hidden patterns in our world. We seek to empower every mind passionate about numbers to become an influential variable in the equation of progress.",
        
        // Mathematical concepts
        concept_analysis: "Mathematical Analysis",
        concept_algebra: "Linear Algebra",
        concept_calculus: "Calculus",
        concept_geometry: "Analytical Geometry",
        
        // SQU Department Section
        squ_department_title: "Mathematics Department - Sultan Qaboos University",
        squ_department_subtitle: "Explore the distinguished academic programs and educational opportunities in the Mathematics Department at Sultan Qaboos University",
        visit_squ_department: "Visit Website",
        
        mag_section_title: "Math Magazine: Your Gateway to the Major",
        mag_section_p: "Thinking about studying mathematics? We have prepared a comprehensive guide for you in the 'Math Magazine' that reviews the academic tracks available at Sultan Qaboos University and explores the promising career prospects awaiting graduates of this vital specialization.",
        mag_section_btn: "Browse the Magazine Now",
        timeline_title: "Our Timelines",
        timeline_tab_fall: "Fall Sequence",
        timeline_tab_spring: "Spring Sequence",
        timeline_f1_title: "Little Al-Khwarizmi",
        timeline_f1_desc: "An exciting math competition that reveals young students' talents and motivates them to love numbers and equations",
        timeline_f2_title: "Opening Night",
        timeline_f2_desc: "The beginning of an inspiring academic journey that brings together math enthusiasts in moments of creativity and ambition",
        timeline_f4_title: "Majors Exhibition",
        timeline_f4_desc: "A window to a bright future, where mathematical specializations meet innovative solutions for tomorrow's world",
        timeline_f5_title: "National Day Event",
        timeline_f5_desc: "A national celebration that embodies the spirit of belonging and connects mathematics with authentic Omani identity",
        timeline_f6_title: "Workshop",
        timeline_f6_desc: "Interactive intellectual laboratories that transform complex concepts into enjoyable practical experiences",
        timeline_f7_title: "Department Graduates Celebration",
        timeline_f7_desc: "Crowning an exceptional academic journey and beginning a promising professional career in the world of numbers",
        timeline_s1_title: "Children's Courses",
        timeline_s1_desc: "A fun exploratory journey that takes children to the amazing world of numbers in an interactive and creative way",
        timeline_s3_title: "Workshop",
        timeline_s3_desc: "Specialized training sessions that combine theory and practice to refine mathematical skills",
        timeline_s5_title: "Mathematics Forum",
        timeline_s5_desc: "The main event - An annual forum that brings together elite academics and researchers to exchange knowledge and expertise",
        tools_title: "Assistant Math Tools",
        tools_b1_t: "Simple Calculator",
        tools_run: "Calculate",
        tools_seq_calc: "Calculate S = n(n+1)/2",
        tools_b1_n: "Supports + - * / and powers ^.",
        tools_b2_t: "Degrees/Radians Converter",
        tools_torad: "To Radians",
        tools_todeg: "To Degrees",
        tools_b3_t: "Number Factorization",
        tools_b4_t: "Primality Test", 
        tools_b5_t: "Integer Sequence Sum",
        tools_b6_t: "Greatest Common Divisor (GCD)",
        
        // Tool placeholders
        tools_calc_placeholder: "Example: 5*3 + 2",
        tools_deg_placeholder: "Degrees",
        tools_rad_placeholder: "Radians",
        tools_factor_placeholder: "Enter number ≥ 2",
        tools_prime_placeholder: "Number",
        tools_seq_placeholder: "n",
        tools_gcd_a_placeholder: "a",
        tools_gcd_b_placeholder: "b",
        
        tools_check: "Check",
        tools_b3_n: "Enter a positive integer.",
        tools_b4_n: "Enter a number ≥ 2.",
        tools_generate: "Generate",
        ai_title: "AI-Powered Math Tools",
        ai_p: "Harnessing artificial intelligence to solve complex mathematical problems. These tools provide advanced capabilities for analysis, visualization, and problem-solving.",
        ai_b1_t: "Equation Solver & Explainer",
        ai_b1_d: "Enter a mathematical equation, and the AI will find the solution and provide a step-by-step explanation.",
        ai_b2_t: "Graph Plotter",
        ai_b2_d: "Visualize mathematical functions by plotting them on a graph. Supports multiple functions.",
        ai_b3_t: "Proof Assistant",
        ai_b3_d: "Assists in constructing mathematical proofs by verifying steps and suggesting logical rules.",
        contact_title: "Social Media Links",
        contact_p: "Your ideas and inquiries are the variables that enrich our equation. Contact us to collaborate, inquire, or join our intellectual community.",
        contact_form_name: "Name",
        contact_form_email: "Email",
        contact_form_subject: "Subject",
        contact_form_message: "Message",
        contact_form_send: "Send Message",
        footer_copy: "© 2025 Engineer Muayad Al-Alawi",
        // Magazine Page
        mag_page_title: "Math Magazine - Math Group",
        mag_page_subtitle: "Math Magazine",
        nav_main_page: "Back to Main",
        mag_hero_title: "Your Gateway to the World of Numbers",
        mag_hero_subtitle: "Explore the mathematics major at Sultan Qaboos University and learn about the academic paths and career prospects that await you.",
        mag_intro_title: "Why Choose to Study Mathematics?",
        mag_intro_p1: "Studying mathematics is not just about solving equations; it is training for the mind in logical and critical thinking and solving complex problems. The Department of Mathematics at Sultan Qaboos University aims to provide students with a solid foundation in mathematics and its applications, and to develop their analytical skills to prepare them for a successful professional future or for pursuing their graduate studies.",
        mag_prog_title: "Academic Tracks (Bachelor's)",
        mag_prog_p1_t: "Pure Mathematics",
        mag_prog_p1_d: "This track focuses on the fundamental concepts and theories in mathematics, such as analysis, algebra, and geometry. It is ideal for students who aspire to pursue scientific research or work in academia.",
        mag_prog_p2_t: "Applied Mathematics",
        mag_prog_p2_d: "This track connects mathematical theories with their practical applications in fields such as physics, engineering, and computer science. It focuses on mathematical modeling and solving real-world problems.",
        mag_prog_p3_t: "Statistics",
        mag_prog_p3_d: "This track deals with the collection, analysis, and interpretation of data. Students acquire skills in data analysis, probability, and experimental design, a highly sought-after specialization in the era of big data.",
        mag_career_title: "Promising Career Prospects",
        mag_career_p: "Mathematics graduates are in demand in a wide range of sectors thanks to their strong analytical skills.",
        mag_car_1: "Education and Academia",
        mag_car_2: "Data Analysis and Science",
        mag_car_3: "Banking and Finance",
        mag_car_4: "Insurance Companies",
        mag_car_5: "Computing and Programming",
        mag_car_6: "Research and Development",

        
        tools_b3_t: "Number Factorization",
        tools_b4_t: "Primality Test",
        tools_b5_t: "Integer Sequence Sum",
        tools_b6_t: "Greatest Common Divisor (GCD)",
        gov_title: "Organizational Structure",
        gov_r1_t: "President",
        gov_r1_d: "General supervision and strategic vision leadership for the group.",
        gov_r2_t: "Vice Presidents",
        gov_r2_d: "Support the president and coordinate work between different committees.",
        gov_r3_t: "Cultural Committee",
        gov_r3_d: "Prepare and organize cultural content and academic programs.",
        gov_r4_t: "Projects Committee",
        gov_r4_d: "Develop and manage projects and group initiatives.",
        gov_r5_t: "Relations Committee",
        gov_r5_d: "Build and strengthen partnerships with external entities.",
        gov_r6_t: "Media Committee",
        gov_r6_d: "Manage digital identity and produce media content.",
        gov_r7_t: "Organizing Committee",
        gov_r7_d: "Logistical planning and organizing events and forums.",
        ai_t1_d: "A mathematical search engine providing step-by-step solutions for algebra, calculus, and more. Uses AI to understand and interpret equations.",
        ai_t2_d: "A computational knowledge engine that answers factual questions using advanced AI algorithms and models. Ideal for complex calculations and data analysis.",
        ai_t3_d: "A tool for instant mathematical problem solving. You can type the problem or take a photo to get instant answers and detailed solutions.",
        ai_t4_d: "An interactive math application that combines geometry, algebra, spreadsheets, graphs, statistics, and calculus in one easy-to-use package.",
        ai_t5_d: "An advanced graphing calculator that uses AI to visualize functions and equations interactively and clearly.",
        
        // Math News Section
        math_news_title: "Global Mathematics News",
        math_news_intro: "Stay updated with the latest discoveries and research in mathematics from the best global sources",
        nature_math_title: "Nature Mathematics",
        nature_math_desc: "The renowned Nature magazine - Mathematics section, featuring the latest influential mathematical research and discoveries worldwide",
        ams_title: "American Mathematical Society",
        ams_desc: "American Mathematical Society - News and articles from the world's largest mathematical organization",
        maa_title: "Mathematical Association of America",
        maa_desc: "Mathematical Association of America - Educational articles and news for teachers and students",
        science_news_title: "Science News - Mathematics",
        science_news_desc: "Science News - Mathematics section, comprehensive coverage of new mathematical discoveries",
        quanta_title: "Quanta Magazine - Mathematics",
        quanta_desc: "Quanta Magazine - Mathematics section, deep and accessible articles about contemporary mathematics",
        arxiv_title: "arXiv Mathematics",
        arxiv_desc: "The world's largest mathematics research archive, latest research papers from researchers",
        feature_research: "Advanced Research",
        feature_peer_reviewed: "Peer Reviewed",
        feature_english: "English",
        feature_professional: "Professional",
        feature_news: "News",
        feature_education: "Educational",
        feature_teachers: "For Teachers",
        feature_accessible: "Easy to Read",
        feature_discoveries: "Discoveries",
        feature_indepth: "In-Depth",
        feature_visual: "Visual",
        feature_preprints: "Research Papers",
        feature_free: "Free",
        visit_source: "Visit Source",
        news_aggregator_title: "Quick News Feed",
        news_aggregator_desc: "Latest headlines from various mathematical sources",
        loading_news: "Loading news...",
        refresh_news: "Refresh News",
        ai_t6_d: "An app that uses the phone's camera to scan and solve math problems, with detailed explanations for each step using image recognition and AI technologies.",
        ai_visit: "Visit Tool",
        


    },
    ar: {
        site_title: "مجموعة الرياضيات | فك شفرة المستقبل",
        brand_title: "مجموعة الرياضيات",
        brand_subtitle: "حيث تلتقي الأرقام بالطموح",
        nav_home: "البداية",
        nav_about: "منطقنا",
        nav_squ: "القسم في الجامعة",
        nav_magazine: "مجلة الرياضيات",
        nav_timeline: "الفعاليات",
        nav_programs: "البرامج",
        nav_tools: "أدوات الرياضيات",
        nav_ai: "أدوات الذكاء الاصطناعي",
        nav_contact: "اتصل بالنسيج",
        hero_title: "فك شفرة المستقبل، معادلة بمعادلة",
        hero_subtitle: "نحن مجتمع فكري يستكشف عوالم الرياضيات الأنيقة، ونبني جسورًا بين النظريات المجردة والتطبيقات التي تشكل الغد.",
        hero_button: "استكشف أبعادنا",
        about_title: "منطق وجودنا",
        about_p: "تأسست مجموعة الرياضيات على مبدأ أن الأرقام هي لغة الكون. نحن لا نرى الرياضيات كمادة دراسية، بل كمنهجية تفكير قادرة على حل المشكلات المعقدة، وإلهام الابتكار، وكشف الأنماط الخفية في عالمنا. نسعى لتمكين كل عقل شغوف بالأرقام ليصبح متغيرًا مؤثرًا في معادلة التقدم.",
        
        // Mathematical concepts
        concept_analysis: "التحليل الرياضي",
        concept_algebra: "الجبر الخطي", 
        concept_calculus: "حساب التفاضل والتكامل",
        concept_geometry: "الهندسة التحليلية",
        
        // SQU Department Section
        squ_department_title: "قسم الرياضيات - جامعة السلطان قابوس",
        squ_department_subtitle: "استكشف البرامج الأكاديمية والفرص التعليمية المتميزة في قسم الرياضيات بجامعة السلطان قابوس",
        visit_squ_department: "زيارة الموقع",
        
        squ_title: "قسم الرياضيات بجامعة السلطان قابوس",
        squ_p1: "يعد قسم الرياضيات من الأقسام الأساسية في كلية العلوم بجامعة السلطان قابوس. منذ تأسيسه، يلتزم القسم بتقديم تعليم رياضي عالي الجودة، وإجراء أبحاث مبتكرة تساهم في التقدم العلمي، وخدمة المجتمع من خلال نشر المعرفة الرياضية وتطبيقاتها.",
        squ_p2: "تتمثل رؤية القسم في تحقيق التميز والريادة على المستويين المحلي والدولي في مجالات التعليم والبحث العلمي في الرياضيات. ويسعى عبر رسالته إلى إعداد كوادر مؤهلة ومزودة بأسس رياضية متينة ومهارات تحليلية تمكنهم من المنافسة في سوق العمل والمساهمة بفعالية في التنمية المستدامة للسلطنة.",
        squ_p3: "يقدم القسم برامج أكاديمية متنوعة تشمل درجة البكالوريوس في تخصصات الرياضيات البحتة، الرياضيات التطبيقية، والإحصاء. كما يوفر برامج الدراسات العليا (الماجستير والدكتوراه) للراغبين في تعميق معرفتهم البحثية والتخصصية في مختلف فروع الرياضيات.",
        mag_section_title: "مجلة الرياضيات: بوابتك للتخصص",
        mag_section_p: "هل تفكر في دراسة الرياضيات؟ لقد أعددنا لك دليلاً شاملاً في 'مجلة الرياضيات' يستعرض المسارات الأكاديمية المتاحة في جامعة السلطان قابوس، ويستكشف الآفاق الوظيفية الواعدة التي تنتظر خريجي هذا التخصص الحيوي.",
        mag_section_btn: "تصفح المجلة الآن",
        timeline_title: "متجهاتنا الزمنية",
        timeline_tab_fall: "متتالية الخريف",
        timeline_tab_spring: "متتالية الربيع",
        timeline_f1_title: "الخوارزمي الصغير",
        timeline_f1_desc: "مسابقة رياضية مثيرة تكشف عن مواهب الطلاب الصغار وتحفزهم على حب الأرقام والمعادلات",
        timeline_f2_title: "الأمسية الافتتاحية",
        timeline_f2_desc: "بداية رحلة أكاديمية ملهمة تجمع عشاق الرياضيات في لحظات من الإبداع والطموح",
        timeline_f4_title: "معرض التخصصات",
        timeline_f4_desc: "نافذة على مستقبل مشرق، حيث تلتقي التخصصات الرياضية بالحلول المبتكرة لعالم الغد",
        timeline_f5_title: "فعالية اليوم الوطني",
        timeline_f5_desc: "احتفالية وطنية تجسد روح الانتماء وتربط الرياضيات بالهوية العمانية الأصيلة",
        timeline_f6_title: "Workshop",
        timeline_f6_desc: "مختبرات فكرية تفاعلية تحول المفاهيم المعقدة إلى تجارب عملية ممتعة",
        timeline_f7_title: "الاحتفال بخريجي القسم",
        timeline_f7_desc: "تتويج رحلة أكاديمية استثنائية وبداية مسيرة مهنية واعدة في عالم الأرقام",
        timeline_s1_title: "دورات الأطفال",
        timeline_s1_desc: "رحلة استكشافية ممتعة تأخذ الأطفال إلى عالم الأرقام المدهش بطريقة تفاعلية ومبدعة",
        timeline_s3_title: "Workshop",
        timeline_s3_desc: "جلسات تدريبية متخصصة تجمع بين النظرية والتطبيق لصقل المهارات الرياضية",
        timeline_s5_title: "ملتقى الرياضيات",
        timeline_s5_desc: "الحدث الأبرز - ملتقى سنوي يجمع نخبة من الأكاديميين والباحثين لتبادل المعرفة والخبرات",
        programs_title: "برامج تصنع الأثر",
        prog_ax1_t: "التأسيس والتحليل",
        prog_ax1_d: "مراجعات، اختبارات، دعم مفاهيمي.",
        prog_ax2_t: "البيانات والذكاء الاصطناعي",
        prog_ax2_d: "ورش في الإحصاء، بايثون، التعلم الآلي.",
        prog_ax3_t: "المواهب المبكرة",
        prog_ax3_d: "استقطاب وتطوير طلبة المدارس الموهوبين.",
        prog_ax4_t: "النشر العلمي",
        prog_ax4_d: "مجلة، ملخصات، محتوى مرئي.",
        prog_ax5_t: "القيم والهوية",
        prog_ax5_d: "أنشطة وطنية ومجتمعية.",
        prog_ax6_t: "الشراكات",
        prog_ax6_d: "بناء روابط مع القطاعين الأكاديمي والمهني.",
        sponsorship_title: "نمو بالشراكات",
        sponsorship_strategy_title: "استراتيجية الرعاية",
        sponsorship_h_cat: "الفئة",
        sponsorship_h_amount: "المبلغ (ر.ع)",
        sponsorship_h_perks: "الامتيازات",
        sponsorship_r1_cat: "الراعي الرسمي",
        sponsorship_r1_perks: "كلمة، جناح، شعار رئيسي، مواد إعلامية حصرية.",
        sponsorship_r2_cat: "الذهبي",
        sponsorship_r2_perks: "شعار على البنرات والمجلة + ذكر في الحفل.",
        sponsorship_r3_cat: "الفضي",
        sponsorship_r3_perks: "شعار على المطبوعات والقوائم.",
        sponsorship_r4_cat: "البرونزي",
        sponsorship_r4_perks: "شعار في صفحات الشكر.",
        sponsorship_r5_cat: "مشارك",
        sponsorship_r5_perks: "منشور شكر.",
        sponsorship_financial_title: "المخطط المالي (تقديري)",
        sponsorship_f_item: "البند",
        sponsorship_f_cost: "التكلفة (ر.ع)",
        sponsorship_i1: "الخوارزمي الصغير",
        sponsorship_i2: "الأمسية الافتتاحية",
        sponsorship_i3: "مجلة الرياضيات",
        sponsorship_i4: "اليوم الوطني",
        sponsorship_i5: "ورش تعليمية (3)",
        sponsorship_i6: "معرض التخصصات",
        sponsorship_i7: "حفل الخريجين",
        sponsorship_i9: "زيارة مدرسية",
        sponsorship_i10: "دورة الأطفال (يوم الباي)",
        sponsorship_i11: "ملتقى الرياضيات الرابع",
        sponsorship_i12: "الأمسية الختامية",
        sponsorship_f_total: "الإجمالي",
        sponsorship_note: "قد تتغير الأرقام وفق الرعايات المتحصلة ومستوى المشاركة.",
        tools_title: "أدوات الرياضيات المساعدة",
        tools_b1_t: "آلة حاسبة بسيطة",
        tools_run: "احسب",
        tools_seq_calc: "احسب S = n(n+1)/2",
        tools_b1_n: "يدعم + - * / والأسس ^.",
        tools_b2_t: "تحويل درجات/راديان",
        tools_torad: "إلى راديان",
        tools_todeg: "إلى درجة",
        tools_b3_t: "تحليل عدد لعوامله",
        tools_b4_t: "اختبار أولية",
        tools_b5_t: "مجموع متسلسلة أعداد صحيحة",
        tools_b6_t: "أكبر قاسم مشترك (GCD)",
        
        // Tool placeholders
        tools_calc_placeholder: "مثال: 5*3 + 2",
        tools_deg_placeholder: "درجة",
        tools_rad_placeholder: "راديان",
        tools_factor_placeholder: "أدخل عدد ≥ 2",
        tools_prime_placeholder: "عدد",
        tools_seq_placeholder: "n",
        tools_gcd_a_placeholder: "a",
        tools_gcd_b_placeholder: "b",
        
        gov_title: "الهيكل التنظيمي",
        gov_r1_t: "الرئيس",
        gov_r1_d: "الإشراف العام وقيادة الرؤية الاستراتيجية للمجموعة.",
        gov_r2_t: "النواب",
        gov_r2_d: "دعم الرئيس وتنسيق العمل بين اللجان المختلفة.",
        gov_r3_t: "اللجنة الثقافية",
        gov_r3_d: "إعداد وتنظيم المحتوى الثقافي والبرامج الأكاديمية.",
        gov_r4_t: "لجنة المشاريع",
        gov_r4_d: "تطوير وإدارة المشاريع والمبادرات الخاصة بالمجموعة.",
        gov_r5_t: "لجنة العلاقات",
        gov_r5_d: "بناء وتوطيد الشراكات مع الجهات الخارجية.",
        gov_r6_t: "اللجنة الإعلامية",
        gov_r6_d: "إدارة الهوية الرقمية وإنتاج المحتوى الإعلامي.",
        gov_r7_t: "اللجنة التنظيمية",
        gov_r7_d: "التخطيط اللوجستي وتنظيم الفعاليات والملتقيات.",
        ai_title: "أدوات الذكاء الاصطناعي للرياضيات",
        ai_t1_d: "محرك بحث رياضي يقدم حلولاً خطوة بخطوة لمسائل الجبر، التفاضل والتكامل، والمزيد. يستخدم الذكاء الاصطناعي لفهم وتفسير المعادلات.",
        ai_t2_d: "محرك معرفي حسابي يجيب على الأسئلة الواقعية باستخدام خوارزميات ونماذج ذكاء اصطناعي متقدمة. مثالي للحسابات المعقدة وتحليل البيانات.",
        ai_t3_d: "أداة لحل المسائل الرياضية الفورية. يمكنك كتابة المسألة أو التقاط صورة لها للحصول على إجابات فورية وحلول مفصلة.",
        ai_t4_d: "تطبيق رياضي تفاعلي يجمع بين الهندسة والجبر وجداول البيانات والرسوم البيانية والإحصاءات والتفاضل والتكامل في حزمة واحدة سهلة الاستخدام.",
        ai_t5_d: "آلة حاسبة بيانية متقدمة تستخدم الذكاء الاصطناعي لتصور الدوال والمعادلات بشكل تفاعلي وسهل الفهم.",
        ai_t6_d: "تطبيق يستخدم كاميرا الهاتف لمسح وحل المسائل الرياضية، مع شرح تفصيلي لكل خطوة باستخدام تقنيات التعرف على الصور والذكاء الاصطناعي.",
        ai_visit: "زيارة الأداة",
        contact_title: "مواقع التواصل الاجتماعي",
        contact_p: "انضم إلينا واستكشف أبعادًا جديدة معنا عبر منصاتنا الرقمية.",
        footer_copy: "© 2025 المهندس مؤيد العلوي",

        
        // Math News Section
        math_news_title: "أخبار الرياضيات العالمية",
        math_news_intro: "ابق محدّثًا مع أحدث الاكتشافات والبحوث في عالم الرياضيات من أفضل المصادر العالمية",
        nature_math_title: "Nature Mathematics",
        nature_math_desc: "مجلة Nature الشهيرة - قسم الرياضيات، تقدم أحدث البحوث والاكتشافات الرياضية المؤثرة عالمياً",
        ams_title: "الجمعية الرياضية الأمريكية",
        ams_desc: "الجمعية الرياضية الأمريكية - أخبار ومقالات من أكبر منظمة رياضية في العالم",
        maa_title: "رابطة الرياضيات الأمريكية",
        maa_desc: "رابطة الرياضيات الأمريكية - مقالات تعليمية وأخبار للمعلمين والطلاب",
        science_news_title: "أخبار العلوم - الرياضيات",
        science_news_desc: "أخبار العلوم - قسم الرياضيات، تغطية شاملة للاكتشافات الرياضية الجديدة",
        quanta_title: "مجلة Quanta - الرياضيات",
        quanta_desc: "مجلة Quanta - قسم الرياضيات، مقالات عميقة وسهلة الفهم عن الرياضيات المعاصرة",
        arxiv_title: "أرشيف arXiv للرياضيات",
        arxiv_desc: "أرشيف البحوث الرياضية الأكبر في العالم، أحدث الأوراق البحثية من الباحثين",
        feature_research: "بحوث متقدمة",
        feature_peer_reviewed: "مُحكّمة",
        feature_english: "إنجليزي",
        feature_professional: "مهني",
        feature_news: "أخبار",
        feature_education: "تعليمي",
        feature_teachers: "للمعلمين",
        feature_accessible: "سهل القراءة",
        feature_discoveries: "اكتشافات",
        feature_indepth: "معمّق",
        feature_visual: "مرئي",
        feature_preprints: "أوراق بحثية",
        feature_free: "مجاني",
        visit_source: "زيارة المصدر",
        news_aggregator_title: "مجمع الأخبار السريع",
        news_aggregator_desc: "أحدث العناوين من مختلف المصادر الرياضية",
        loading_news: "جاري تحميل الأخبار...",
        refresh_news: "تحديث الأخبار",
        


        // Magazine Page
        mag_page_title: "Math Magazine - Math Group",
        mag_page_subtitle: "Math Magazine",
        nav_main_page: "Back to Main",
        mag_hero_title: "Your Gateway to the World of Numbers",
        mag_hero_subtitle: "Explore the mathematics major at Sultan Qaboos University and learn about the academic paths and career prospects that await you.",
        mag_intro_title: "Why Choose to Study Mathematics?",
        mag_intro_p1: "Studying mathematics is not just about solving equations; it is training for the mind in logical and critical thinking and solving complex problems. The Department of Mathematics at Sultan Qaboos University aims to provide students with a solid foundation in mathematics and its applications, and to develop their analytical skills to prepare them for a successful professional future or for pursuing their graduate studies.",
        mag_prog_title: "Academic Tracks (Bachelor's)",
        mag_prog_p1_t: "Pure Mathematics",
        mag_prog_p1_d: "This track focuses on the fundamental concepts and theories in mathematics, such as analysis, algebra, and geometry. It is ideal for students who aspire to pursue scientific research or work in academia.",
        mag_prog_p2_t: "Applied Mathematics",
        mag_prog_p2_d: "This track connects mathematical theories with their practical applications in fields such as physics, engineering, and computer science. It focuses on mathematical modeling and solving real-world problems.",
        mag_prog_p3_t: "Statistics",
        mag_prog_p3_d: "This track deals with the collection, analysis, and interpretation of data. Students acquire skills in data analysis, probability, and experimental design, a highly sought-after specialization in the era of big data.",
        mag_career_title: "Promising Career Prospects",
        mag_career_p: "Mathematics graduates are in demand in a wide range of sectors thanks to their strong analytical skills.",
        mag_car_1: "Education and Academia",
        mag_car_2: "Data Analysis and Science",
        mag_car_3: "Banking and Finance",
        mag_car_4: "Insurance Companies",
        mag_car_5: "Computing and Programming",
        mag_car_6: "Research and Development"
    }
};

let currentLang = localStorage.getItem('math_lang') || 'ar';

function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.textContent = lang === 'ar' ? 'EN' : 'AR';
    }

    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    

    
    // Handle input placeholders
    document.querySelectorAll('input[data-translate]').forEach(input => {
        const key = input.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            input.placeholder = translations[lang][key];
        }
    });
    
    // Handle data-placeholder attributes for content editors
    document.querySelectorAll('[data-placeholder][data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.setAttribute('data-placeholder', translations[lang][key]);
        }
    });
    
    localStorage.setItem('math_lang', lang);
}

// تطبيق اللغة المحفوظة فوراً عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
});

// Language Toggle Button
const langToggle = document.getElementById('langToggle');
if (langToggle) {
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        setLanguage(currentLang);
    });
}

// --- Tools Logic ---
const calcExpr = document.getElementById('calcExpr');
if (calcExpr) {
    const calcRun = document.getElementById('calcRun');
    const calcResult = document.getElementById('calcResult');
    calcRun.addEventListener('click',()=>{
      try {
        let expr = calcExpr.value.replace(/\^/g,'**');
        if(/[^0-9+\-*/(). **]/.test(expr)){throw Error('رموز غير مسموحة');}
        const val = Function('return ('+expr+')')();
        calcResult.textContent = '= ' + val;
      } catch(e){calcResult.textContent = 'خطأ: ' + e.message;}
    });
}

const degVal=document.getElementById('degVal');
if (degVal) {
    const radVal=document.getElementById('radVal');
    const degToRad=document.getElementById('degToRad');
    const radToDeg=document.getElementById('radToDeg');
    const angleResult=document.getElementById('angleResult');
    degToRad.addEventListener('click',()=>{let d=parseFloat(degVal.value);if(isNaN(d)){angleResult.textContent='أدخل قيمة';return;}angleResult.textContent = (d*Math.PI/180).toFixed(8)+' rad';});
    radToDeg.addEventListener('click',()=>{let r=parseFloat(radVal.value);if(isNaN(r)){angleResult.textContent='أدخل قيمة';return;}angleResult.textContent = (r*180/Math.PI).toFixed(6)+' °';});
}

const factInput=document.getElementById('factInput');
if (factInput) {
    function factorize(n){const f={};let d=2;while(n>1&&d*d<=n){while(n%d===0){f[d]=(f[d]||0)+1;n/=d;}d++;}if(n>1)f[n]=(f[n]||0)+1;return f;}
    const factResult=document.getElementById('factResult');
    const factRun=document.getElementById('factRun');
    factRun.addEventListener('click',()=>{let v=parseInt(factInput.value);if(isNaN(v)||v<2){factResult.textContent='عدد غير صالح';return;}const f=factorize(v);factResult.textContent=Object.entries(f).map(([p,e])=> e>1? p+'^'+e:p).join(' × ');});
}

const primeInput=document.getElementById('primeInput');
if (primeInput) {
    const primeResult=document.getElementById('primeResult');
    const primeRun=document.getElementById('primeRun');
    function isPrime(n){if(n<2)return false;if(n%2===0)return n===2;for(let i=3;i*i<=n;i+=2)if(n%i===0)return false;return true;}
    primeRun.addEventListener('click',()=>{let v=parseInt(primeInput.value);if(isNaN(v)){primeResult.textContent='أدخل عدد';return;}primeResult.textContent = isPrime(v)? 'عدد أولي':'عدد غير أولي';});
}

const seqN=document.getElementById('seqN');
if (seqN) {
    const seqResult=document.getElementById('seqResult');
    const seqRun=document.getElementById('seqRun');
    seqRun.addEventListener('click',()=>{let n=parseInt(seqN.value);if(isNaN(n)||n<0){seqResult.textContent='n غير صالح';return;}seqResult.textContent='S = '+ (n*(n+1)/2);});
}

const gcdA=document.getElementById('gcdA');
if (gcdA) {
    const gcdB=document.getElementById('gcdB');
    const gcdResult=document.getElementById('gcdResult');
    const gcdRun=document.getElementById('gcdRun');
    function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b];}return a;}
    gcdRun.addEventListener('click',()=>{let a=parseInt(gcdA.value),b=parseInt(gcdB.value);if(isNaN(a)||isNaN(b)){gcdResult.textContent='أدخل قيمتين';return;}gcdResult.textContent='GCD = '+gcd(a,b);});
}

// تصحيح الترجمات العربية لصفحة المجلة
if (translations.ar) {
    translations.ar.mag_page_title = "مجلة الرياضيات - مجموعة الرياضيات";
    translations.ar.mag_page_subtitle = "مجلة الرياضيات";
    translations.ar.nav_main_page = "العودة للرئيسية";
    translations.ar.mag_hero_title = "بوابتك إلى عالم الأرقام";
    translations.ar.mag_hero_subtitle = "استكشف تخصص الرياضيات في جامعة السلطان قابوس وتعرف على المسارات الأكاديمية والآفاق المهنية التي تنتظرك.";
    translations.ar.mag_intro_title = "لماذا تختار دراسة الرياضيات؟";
    translations.ar.mag_intro_p1 = "دراسة الرياضيات لا تقتصر على حل المعادلات، بل هي تدريب للعقل على التفكير المنطقي والنقدي وحل المشكلات المعقدة. يهدف قسم الرياضيات في جامعة السلطان قابوس إلى تزويد الطلاب بأساس متين في الرياضيات وتطبيقاتها، وتطوير مهاراتهم التحليلية لإعدادهم لمستقبل مهني ناجح أو لمواصلة دراساتهم العليا.";
    translations.ar.mag_prog_title = "المسارات الأكاديمية (البكالوريوس)";
    translations.ar.mag_prog_p1_t = "الرياضيات البحتة";
    translations.ar.mag_prog_p1_d = "يركز هذا المسار على المفاهيم والنظريات الأساسية في الرياضيات، مثل التحليل والجبر والهندسة. وهو مثالي للطلاب الذين يطمحون لمتابعة البحث العلمي أو العمل في المجال الأكاديمي.";
    translations.ar.mag_prog_p2_t = "الرياضيات التطبيقية";
    translations.ar.mag_prog_p2_d = "يربط هذا المسار بين النظريات الرياضية وتطبيقاتها العملية في مجالات مثل الفيزياء، الهندسة، وعلوم الحاسوب. يركز على النمذجة الرياضية وحل المشكلات الواقعية.";
    translations.ar.mag_prog_p3_t = "الإحصاء";
    translations.ar.mag_prog_p3_d = "يتناول هذا المسار جمع البيانات وتحليلها وتفسيرها. يكتسب الطلاب مهارات في تحليل البيانات، والاحتمالات، وتصميم التجارب، وهو تخصص مطلوب بشدة في عصر البيانات الضخمة.";
    translations.ar.mag_career_title = "آفاق وظيفية واعدة";
    translations.ar.mag_career_p = "خريجو الرياضيات مطلوبون في مجموعة واسعة من القطاعات بفضل مهاراتهم التحليلية القوية.";
    translations.ar.mag_car_1 = "القطاع التعليمي والأكاديمي";
    translations.ar.mag_car_2 = "تحليل البيانات وعلومها";
    translations.ar.mag_car_3 = "البنوك والقطاع المالي";
    translations.ar.mag_car_4 = "شركات التأمين";
    translations.ar.mag_car_5 = "الحوسبة والبرمجة";
    translations.ar.mag_car_6 = "البحث والتطوير";
}

// نظام الإشعارات المنبثقة للفعاليات
const events = [
    {
        name: "الخوارزمي الصغير",
        nameEn: "Little Al-Khwarizmi",
        date: "2025-09-15",
        description: "مسابقة رياضية للطلاب الصغار لتحفيز حب الرياضيات",
        descriptionEn: "Math competition for young students to encourage love for mathematics",
        image: "images/الخوارزمي1757676545.jpg"
    },
    {
        name: "الأمسية الافتتاحية",
        nameEn: "Opening Night",
        date: "2025-09-20",
        description: "حفل افتتاح العام الأكاديمي لمجموعة الرياضيات",
        descriptionEn: "Academic year opening ceremony for the Math Group",
        image: "images/الامسية الافتتاحية1757676545.jpg"
    },
    {
        name: "معرض التخصصات",
        nameEn: "Majors Exhibition",
        date: "2025-10-15",
        description: "معرض لعرض تخصصات الرياضيات والمسارات المهنية",
        descriptionEn: "Exhibition showcasing math majors and career paths"
    },
    {
        name: "فعالية اليوم الوطني",
        nameEn: "National Day Event",
        date: "2025-11-18",
        description: "احتفالية بمناسبة اليوم الوطني العماني المجيد",
        descriptionEn: "Celebration for the glorious Omani National Day",
        image: "images/العيد الوطني1757676545.jpg"
    },
    {
        name: "ورش",
        nameEn: "Workshops",
        date: "2025-11-25",
        description: "ورش تعليمية متنوعة في مبادئ الرياضيات",
        descriptionEn: "Various educational workshops on mathematics principles"
    },
    {
        name: "الاحتفال بخريجي القسم",
        nameEn: "Department Graduates Celebration",
        date: "2025-06-15",
        description: "احتفال بتخرج طلاب قسم الرياضيات وإنجازاتهم",
        descriptionEn: "Celebration of mathematics department graduates and their achievements",
        image: "images/الخريجيين1757676545.jpg"
    },
    {
        name: "دورات الأطفال",
        nameEn: "Children's Courses",
        date: "2025-03-10",
        description: "دورات تعليمية ممتعة للأطفال في عالم الرياضيات",
        descriptionEn: "Fun educational courses for children in the world of mathematics",
        image: "images/فعاليات الاطفال1757676545.jpg"
    },
    {
        name: "ملتقى الرياضيات",
        nameEn: "Mathematics Forum",
        date: "2025-04-15",
        description: "الحدث الأبرز - ملتقى سنوي يجمع أكاديميين وطلاب الرياضيات",
        descriptionEn: "The main event - Annual forum bringing together academics and math students",
        image: "images/الملتقى.jpg"
    }
];

function checkUpcomingEvents() {
    const today = new Date();
    const currentDate = today.toISOString().split('T')[0];
    
    // البحث عن الفعاليات القادمة في الأسبوعين القادمين
    const upcomingEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        const timeDiff = eventDate.getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return daysDiff >= 0 && daysDiff <= 14;
    });

    if (upcomingEvents.length > 0) {
        showEventNotification(upcomingEvents[0]);
    }
}

function showEventNotification(event) {
    // التحقق إذا كان المستخدم قد أغلق الإشعار مسبقاً لهذا الحدث
    const dismissedEvents = JSON.parse(localStorage.getItem('dismissedEvents') || '[]');
    if (dismissedEvents.includes(event.name)) {
        return;
    }

    const isArabic = currentLang === 'ar';
    
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = 'event-notification';
    
    const imageHtml = event.image ? `
        <div class="notification-image">
            <img src="${event.image}" alt="${isArabic ? event.name : event.nameEn}" 
                 onerror="this.style.display='none'">
        </div>
    ` : '';
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-header">
                <h3>${isArabic ? '🎉 فعالية قادمة' : '🎉 Upcoming Event'}</h3>
                <button class="close-notification" aria-label="إغلاق">×</button>
            </div>
            ${imageHtml}
            <div class="notification-body">
                <h4>${isArabic ? event.name : event.nameEn}</h4>
                <p><strong>${isArabic ? 'التاريخ:' : 'Date:'}</strong> ${new Date(event.date).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}</p>
                <p>${isArabic ? event.description : event.descriptionEn}</p>
            </div>
            <div class="notification-actions">
                <button class="btn-remind">${isArabic ? 'تذكيرني لاحقاً' : 'Remind Me Later'}</button>
                <button class="btn-dismiss">${isArabic ? 'عدم الإظهار مرة أخرى' : 'Don\'t Show Again'}</button>
            </div>
        </div>
    `;

    document.body.appendChild(notification);

    // إضافة الأحداث
    const closeBtn = notification.querySelector('.close-notification');
    const remindBtn = notification.querySelector('.btn-remind');
    const dismissBtn = notification.querySelector('.btn-dismiss');

    closeBtn.addEventListener('click', () => {
        notification.remove();
    });

    remindBtn.addEventListener('click', () => {
        notification.remove();
        // إعادة عرض الإشعار بعد 24 ساعة
        setTimeout(() => {
            showEventNotification(event);
        }, 24 * 60 * 60 * 1000);
    });

    dismissBtn.addEventListener('click', () => {
        const dismissedEvents = JSON.parse(localStorage.getItem('dismissedEvents') || '[]');
        dismissedEvents.push(event.name);
        localStorage.setItem('dismissedEvents', JSON.stringify(dismissedEvents));
        notification.remove();
    });

    // إغلاق تلقائي بعد 10 ثوانٍ
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 10000);
}

// تشغيل فحص الفعاليات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(checkUpcomingEvents, 2000); // تأخير لضمان تحميل كامل للصفحة

    initializeMathNews(); // تهيئة أخبار الرياضيات
});





// === Math News Functionality ===
function initializeMathNews() {
    loadMathNews();
    setupNewsEvents();
}

function setupNewsEvents() {
    const refreshBtn = document.getElementById('refreshNews');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', loadMathNews);
    }
}

function loadMathNews() {
    const newsFeed = document.getElementById('mathNewsFeed');
    if (!newsFeed) return;

    // Show loading state
    newsFeed.innerHTML = `
        <div class="news-loading">
            <div class="loading-spinner"></div>
            <p data-translate="loading_news">جاري تحميل الأخبار...</p>
        </div>
    `;

    // Simulate loading and display sample news
    setTimeout(() => {
        displaySampleNews(newsFeed);
    }, 2000);
}

function displaySampleNews(container) {
    const sampleNews = [
        {
            title: "اكتشاف جديد في نظرية الأعداد يحل مسألة عمرها 400 عام",
            excerpt: "فريق من الرياضيين يتوصل إلى دليل رياضي لمسألة معقدة في نظرية الأعداد الأولية",
            source: "Nature Mathematics",
            date: "2025-09-23"
        },
        {
            title: "تطبيق جديد للذكاء الاصطناعي في حل معادلات التفاضل الجزئي",
            excerpt: "باحثون يطورون نموذج ذكاء اصطناعي قادر على حل المعادلات المعقدة في وقت قياسي",
            source: "Science News",
            date: "2025-09-22"
        },
        {
            title: "رياضي شاب يفوز بميدالية فيلدز لعمله في الهندسة الجبرية",
            excerpt: "تكريم إنجازات استثنائية في مجال الهندسة الجبرية المتقدمة والتطبيقات الحديثة",
            source: "AMS News",
            date: "2025-09-21"
        },
        {
            title: "اختراق في خوارزميات التشفير الكمي المقاومة للحوسبة الكمية",
            excerpt: "تطوير طرق تشفير جديدة تستخدم الرياضيات المتقدمة لحماية البيانات من التهديدات المستقبلية",
            source: "Quanta Magazine",
            date: "2025-09-20"
        },
        {
            title: "نموذج رياضي جديد يتنبأ بسلوك الأسواق المالية بدقة عالية",
            excerpt: "استخدام نظريات الاحتمال المتقدمة لتطوير نماذج تنبؤية أكثر دقة للأسواق العالمية",
            source: "arXiv Mathematics",
            date: "2025-09-19"
        }
    ];

    const currentLang = document.documentElement.lang;
    
    if (currentLang === 'en') {
        // English sample news
        sampleNews[0] = {
            title: "New Number Theory Discovery Solves 400-Year-Old Problem",
            excerpt: "Team of mathematicians provides proof for complex prime number theory problem",
            source: "Nature Mathematics",
            date: "2025-09-23"
        };
        sampleNews[1] = {
            title: "AI Application in Solving Partial Differential Equations",
            excerpt: "Researchers develop AI model capable of solving complex equations in record time",
            source: "Science News",
            date: "2025-09-22"
        };
        sampleNews[2] = {
            title: "Young Mathematician Wins Fields Medal for Algebraic Geometry Work",
            excerpt: "Recognition of exceptional achievements in advanced algebraic geometry",
            source: "AMS News",
            date: "2025-09-21"
        };
        sampleNews[3] = {
            title: "Breakthrough in Quantum-Resistant Cryptography Algorithms",
            excerpt: "Development of new encryption methods using advanced mathematics",
            source: "Quanta Magazine",
            date: "2025-09-20"
        };
        sampleNews[4] = {
            title: "New Mathematical Model Predicts Financial Markets with High Accuracy",
            excerpt: "Using advanced probability theories for more accurate market predictions",
            source: "arXiv Mathematics",
            date: "2025-09-19"
        };
    }

    let newsHTML = '';
    sampleNews.forEach(news => {
        newsHTML += `
            <div class="news-item">
                <h4>${news.title}</h4>
                <p>${news.excerpt}</p>
                <div class="news-source">${news.source} • ${news.date}</div>
            </div>
        `;
    });

    container.innerHTML = newsHTML;
}

function showNotification(message, type = 'info') {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#007bff'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10001;
        font-family: 'Cairo', sans-serif;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // عرض الإشعار
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // إخفاء الإشعار
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}