import { useState } from "react";
import {
  ArrowLeft,
  Lightbulb,
  Play,
  Headphones,
  Globe,
  Clock,
  Star,
} from "lucide-react";

export default function ResourceHubPage({ onBack }) {
  const [activeSection, setActiveSection] = useState("wellness-tips");
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  /* ===== Embedded CSS: LIGHT BG + DARK TEXT ===== */
  const styles = `
  .resource-hub-page {
    --bg: #ffffff;          /* light background */
    --text: #0f172a;        /* dark text */
    --muted: #475569;       /* secondary text */
    --border: #e5e7eb;      /* soft border */
    --blue-50: #f0f7ff;     /* very pale blue */
    --blue-100: #e6f0ff;    /* hover wash */
    --blue-200: #d7e6ff;    /* active wash */
    --blue-300: #b8d0ff;    /* ring/border */
    --yellow: #facc15;      /* accent for headings/star */

    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  }

  /* Header */
  .resource-header {
    position: sticky; top: 0; z-index: 5;
    background: rgba(255,255,255,.96);
    border-bottom: 1px solid var(--border);
    backdrop-filter: saturate(160%) blur(4px);
  }
  .resource-header-inner {
    max-width: 1100px; margin: 0 auto; padding: 14px 18px;
    display: grid; grid-template-columns: 40px 1fr 40px; gap: 10px; align-items: center;
  }
  .resource-back-btn {
    width: 40px; height: 40px; display: grid; place-items: center;
    border: 1px solid var(--border); border-radius: 10px; background: #fff; cursor: pointer;
    transition: background .2s, border-color .2s, transform .08s;
  }
  .resource-back-btn:hover { background: #f8fafc; border-color: #dbe3ef; transform: translateY(-1px); }
  .resource-title { text-align: center; }
  .resource-title h1 { margin: 0; font-size: 20px; font-weight: 700; color: var(--text); }
  .resource-subtitle { margin-top: 4px; font-size: 13px; color: var(--muted); }
  .spacer-ghost { width: 40px; height: 40px; }

  /* Main container */
  .resource-main { max-width: 1100px; margin: 22px auto 56px; padding: 0 18px; }

  /* Section nav (chips) */
  .section-nav h2 { margin: 0 0 10px 2px; font-size: 18px; font-weight: 600; color: var(--muted); }
  .section-buttons { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; }
  @media (max-width: 820px){ .section-buttons{ grid-template-columns: repeat(2,1fr);} }
  @media (max-width: 420px){ .section-buttons{ grid-template-columns: 1fr;} }

  .section-btn {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 14px; border-radius: 12px;
    background: #fff; border: 1px solid var(--border); color: var(--text);
    cursor: pointer; font-weight: 600; text-align: left;
    transition: background .2s, border-color .2s, transform .08s;
    box-shadow: 0 1px 2px rgba(15,23,42,.06);
  }
  .section-btn svg { width: 18px; height: 18px; stroke: currentColor; }
  .section-btn:hover { background: var(--blue-100); border-color: #d7e3f5; transform: translateY(-1px); }
  .section-btn.active {
    background: var(--blue-200); border-color: var(--blue-300); color: var(--text);
    box-shadow: 0 4px 14px rgba(59,130,246,.12);
  }

  /* Cards */
  .v-space { margin-top: 16px; }
  .content-card {
    background: #fff; border: 1px solid var(--border); border-radius: 14px; padding: 16px;
    box-shadow: 0 8px 22px rgba(15,23,42,.06);
  }
  .card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
  .card-title { margin: 0; font-size: 17px; font-weight: 700; color: var(--text); }
  .card-subtitle { margin: 2px 0 0; font-size: 13px; color: var(--muted); }
  .card-icon {
    width: 42px; height: 42px; border-radius: 10px; display: grid; place-items: center;
    border: 1px solid var(--border); background: var(--blue-50);
  }
  .card-icon svg { width: 20px; height: 20px; color: #3b82f6; }

  /* Category blocks (tips) */
  .category-card { background: #fff; border: 1px solid var(--border); border-radius: 12px; padding: 12px; margin-top: 10px; }
  .category-title { display:flex; align-items:center; gap:8px; margin:0 0 8px; font-size:15px; font-weight:700; color: var(--yellow); }
  .inline-icon { width: 16px; height: 16px; color: var(--yellow); }
  .bullet-list { list-style: disc; padding-left: 20px; margin: 0; color: var(--text); }
  .bullet-list li { margin: 6px 0; font-size: 14px; }

  /* Media grid/cards */
  .media-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-top: 12px; }
  @media (max-width: 1000px){ .media-grid{ grid-template-columns: repeat(3,1fr);} }
  @media (max-width: 760px){ .media-grid{ grid-template-columns: repeat(2,1fr);} }
  @media (max-width: 460px){ .media-grid{ grid-template-columns: 1fr;} }

  .media-card {
    background: #fff; border: 1px solid var(--border); border-radius: 12px; padding: 12px;
    transition: transform .08s, border-color .2s, box-shadow .2s;
    box-shadow: 0 1px 2px rgba(15,23,42,.06);
  }
  .media-card:hover { transform: translateY(-2px); border-color: #d7e3f5; box-shadow: 0 6px 18px rgba(15,23,42,.08); }

  .media-thumbnail {
    height: 120px; border-radius: 10px; border: 1px solid var(--border);
    display: grid; place-items: center; margin-bottom: 8px;
    background: linear-gradient(135deg, #f4f9ff, #eef4ff);
  }
  .media-thumbnail svg { width: 24px; height: 24px; color: #3b82f6; opacity: .9; }

  .media-title { margin: 6px 0 4px; font-size: 15px; font-weight: 700; color: var(--text); }
  .media-description { margin: 0; font-size: 13px; color: var(--muted); }
  .media-duration {
    margin-top: 8px; font-size: 12px; color: #334155; display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 8px; border-radius: 999px; background: #f2f7ff; border: 1px solid #e3edff; width: fit-content;
  }
  .inline-icon-sm { width: 14px; height: 14px; }

  /* Language selector */
  .form-group { margin-top: 10px; }
  .form-label { display:block; font-weight:600; font-size:14px; margin-bottom:8px; color: var(--muted); }
  .language-selector { display:flex; flex-wrap:wrap; gap:8px; }
  .language-btn {
    padding: 7px 12px; border-radius: 999px; border: 1px solid var(--border);
    background: #fff; font-size: 13px; cursor: pointer; transition: background .2s, border-color .2s, transform .08s;
    box-shadow: 0 1px 2px rgba(15,23,42,.06); color: var(--text);
  }
  .language-btn:hover { background: var(--blue-100); border-color: #d7e3f5; transform: translateY(-1px); }
  .language-btn.selected { background: var(--blue-200); border-color: var(--blue-300); font-weight: 700; }

  /* Keyboard focus */
  button:focus-visible { outline: 3px solid var(--blue-300); outline-offset: 2px; border-radius: 10px; }
  #wellness-tips-panel .content-card,
  #wellness-tips-panel .category-card {
    background: #ffffff !important;
    color: var(--text) !important;
    border-color: var(--border) !important;
  }

  #wellness-tips-panel .card-title,
  #wellness-tips-panel .bullet-list,
  #wellness-tips-panel .bullet-list li,
  #wellness-tips-panel .bullet-list li span {
    color: var(--text) !important;
  }

  #wellness-tips-panel .card-subtitle {
    color: var(--muted) !important;
  }

  #wellness-tips-panel .category-title,
  #wellness-tips-panel .category-title .inline-icon {
    color: var(--yellow) !important;
    stroke: var(--yellow) !important;
  }
`;

  /* ===== DATA (unchanged) ===== */
  const wellnessTips = [
    {
      category: "Mental Health",
      tips: [
        "Practice mindfulness meditation for 10 minutes daily",
        "Try traditional Indian practices like Yoga Nidra or Pranayama",
        "Limit social media usage to reduce comparison",
        "Set realistic goals and celebrate small wins",
        "Practice deep breathing (Anulom Vilom) when feeling anxious",
        "Maintain a consistent sleep schedule aligned with natural rhythms",
        "Express gratitude daily - try keeping a gratitude journal",
        "Connect with family and community for emotional support",
      ],
    },
    {
      category: "Physical Health",
      tips: [
        "Stay hydrated - drink 8 glasses of water daily",
        "Get at least 30 minutes of physical activity (walking, yoga, or traditional exercises)",
        "Take regular breaks from screens - follow the 20-20-20 rule",
        "Eat a balanced diet with seasonal fruits and vegetables",
        "Include traditional Indian superfoods like turmeric, ginger, and ghee",
        "Practice good posture while working",
        "Get 7-9 hours of quality sleep",
        "Try Ayurvedic practices like oil pulling or warm oil massage",
      ],
    },
    {
      category: "Stress Management",
      tips: [
        "Use the 4-7-8 breathing technique or traditional Pranayama",
        "Create a worry journal to write down concerns",
        "Practice progressive muscle relaxation or Yoga stretches",
        "Use visualization techniques or guided meditation",
        "Set boundaries with work and personal time",
        "Engage in hobbies that bring joy - music, art, gardening",
        "Try aromatherapy with essential oils like lavender or sandalwood",
        "Practice mindful eating - eat slowly and savor each bite",
      ],
    },
    {
      category: "Cultural Wellness",
      tips: [
        "Participate in community festivals and cultural events",
        "Learn and practice traditional arts, music, or dance",
        "Connect with your cultural roots through stories and traditions",
        "Practice intergenerational bonding with family elders",
        "Engage in community service (Seva) for mental well-being",
        "Celebrate small cultural milestones and achievements",
        "Share traditional recipes and cooking with family",
        "Practice gratitude for cultural heritage and values",
      ],
    },
  ];

  const relaxingVideos = [
    { id: 1, title: "Guided Meditation for Beginners", duration: "10 minutes", description: "Perfect for starting your mindfulness journey" },
    { id: 2, title: "Pranayama Breathing Exercises", duration: "15 minutes", description: "Traditional Indian breathing techniques for relaxation" },
    { id: 3, title: "Yoga Nidra Deep Relaxation", duration: "25 minutes", description: "Ancient yogic sleep practice for complete restoration" },
    { id: 4, title: "Nature Sounds: Monsoon Rains", duration: "30 minutes", description: "Soothing monsoon rain sounds for deep relaxation" },
    { id: 5, title: "Gentle Yoga Flow", duration: "20 minutes", description: "Traditional yoga poses to release tension and stress" },
    { id: 6, title: "Mantra Chanting Meditation", duration: "12 minutes", description: "Sacred sounds for inner peace and spiritual connection" },
    { id: 7, title: "Forest Ambience with Birds", duration: "45 minutes", description: "Peaceful Indian forest sounds for deep relaxation" },
    { id: 8, title: "Sunrise Meditation", duration: "8 minutes", description: "Morning meditation to start your day with positivity" },
  ];

  const relaxingAudios = [
    { id: 1, title: "Monsoon Rain Sounds", duration: "45 minutes", description: "Gentle monsoon rain for sleep and relaxation" },
    { id: 2, title: "Traditional Sitar Music", duration: "30 minutes", description: "Classical Indian sitar for meditation and focus" },
    { id: 3, title: "Nature White Noise", duration: "60 minutes", description: "Consistent nature sounds to block distractions" },
    { id: 4, title: "Flute Meditation", duration: "25 minutes", description: "Soothing bamboo flute music for inner peace" },
    { id: 5, title: "Birds & Water Sounds", duration: "40 minutes", description: "Morning birds with flowing water for positive energy" },
    { id: 6, title: "Mantra Chanting", duration: "35 minutes", description: "Sacred Sanskrit mantras for spiritual well-being" },
    { id: 7, title: "Ocean Waves", duration: "50 minutes", description: "Calming ocean waves for deep relaxation" },
    { id: 8, title: "Classical Ragas", duration: "28 minutes", description: "Traditional Indian classical music for meditation" },
  ];

  const wellnessGuides = {
    English: [
      { title: "Understanding Anxiety", description: "Learn about anxiety symptoms and coping strategies" },
      { title: "Building Resilience", description: "Develop mental strength and adaptability" },
      { title: "Sleep Hygiene Guide", description: "Improve your sleep quality and habits" },
      { title: "Digital Detox Plan", description: "Reduce screen time for better mental health" },
      { title: "Mindfulness & Meditation", description: "Practice mindfulness techniques for inner peace" },
      { title: "Stress Management", description: "Effective strategies to manage daily stress" },
    ],
    "हिंदी (Hindi)": [
      { title: "चिंता को समझना", description: "चिंता के लक्षणों और सामना करने की रणनीतियों के बारे में जानें" },
      { title: "लचीलापन बनाना", description: "मानसिक शक्ति और अनुकूलनशीलता विकसित करें" },
      { title: "नींद की स्वच्छता गाइड", description: "अपनी नींद की गुणवत्ता और आदतों में सुधार करें" },
      { title: "डिजिटल डिटॉक्स प्लान", description: "बेहतर मानसिक स्वास्थ्य के लिए स्क्रीन टाइम कम करें" },
      { title: "ध्यान और मनन", description: "आंतरिक शांति के लिए माइंडफुलनेस तकनीकों का अभ्यास करें" },
      { title: "तनाव प्रबंधन", description: "दैनिक तनाव का प्रबंधन करने के प्रभावी तरीके" },
    ],
    "বাংলা (Bengali)": [
      { title: "উদ্বেগ বোঝা", description: "উদ্বেগের লক্ষণ এবং মোকাবিলার কৌশল সম্পর্কে জানুন" },
      { title: "স্থিতিস্থাপকতা গড়ে তোলা", description: "মানসিক শক্তি এবং অভিযোজন ক্ষমতা বিকাশ করুন" },
      { title: "ঘুমের স্বাস্থ্যবিধি গাইড", description: "আপনার ঘুমের গুণমান এবং অভ্যাস উন্নত করুন" },
      { title: "ডিজিটাল ডিটক্স প্ল্যান", description: "ভাল মানসিক স্বাস্থ্যের জন্য স্ক্রিন টাইম কমান" },
      { title: "মননশীলতা ও ধ্যান", description: "আভ্যন্তরীণ শান্তির জন্য মাইন্ডফুলনেস কৌশল অনুশীলন করুন" },
      { title: "চাপ ব্যবস্থাপনা", description: "দৈনন্দিন চাপ মোকাবিলার কার্যকর কৌশল" },
    ],
    "తెలుగు (Telugu)": [
      { title: "ఆందోళనను అర్థం చేసుకోవడం", description: "ఆందోళన లక్షణాలు మరియు నిర్వహణ వ్యూహాల గురించి తెలుసుకోండి" },
      { title: "స్థితిస్థాపకతను నిర్మించడం", description: "మానసిక బలం మరియు అనుకూలతను అభివృద్ధి చేయండి" },
      { title: "నిద్ర హైజీన్ గైడ్", description: "మీ నిద్ర నాణ్యత మరియు అలవాట్లను మెరుగుపరచండి" },
      { title: "డిజిటల్ డిటాక్స్ ప్లాన్", description: "మంచి మానసిక ఆరోగ్యం కోసం స్క్రీన్ టైమ్ తగ్గించండి" },
      { title: "మైండ్ఫుల్నెస్ మరియు ధ్యానం", description: "ఆంతరిక శాంతి కోసం మైండ్ఫుల్నెస్ పద్ధతులను అభ్యసించండి" },
      { title: "ఒత్తిడి నిర్వహణ", description: "రోజువారీ ఒత్తిడిని నిర్వహించడానికి ప్రభావవంతమైన వ్యూహాలు" },
    ],
    "தமிழ் (Tamil)": [
      { title: "கவலைகளை புரிந்துகொள்ளுதல்", description: "கவலையின் அறிகுறிகள் மற்றும் சமாளிக்கும் உத்திகளை அறிந்துகொள்ளுங்கள்" },
      { title: "நெகிழ்வுத்தன்மையை உருவாக்குதல்", description: "மன உறுதி மற்றும் பொருத்தமைப்பு திறனை வளர்த்துகொள்ளுங்கள்" },
      { title: "தூக்க சுகாதார வழிகாட்டி", description: "உங்கள் தூக்கத்தின் தரம் மற்றும் பழக்கவழக்கங்களை மேம்படுத்துங்கள்" },
      { title: "டிஜிட்டல் டிடாக்ஸ் திட்டம்", description: "நல்ல மன ஆரோக்கியத்திற்கு திரை நேரத்தை குறைக்கவும்" },
      { title: "மனதளவு மற்றும் தியானம்", description: "உள் அமைதிக்காக மனதளவு நுட்பங்களை பயிற்சி செய்யுங்கள்" },
      { title: "மன அழுத்த மேலாண்மை", description: "தினசரி மன அழுத்தத்தை நிர்வகிக்க பயனுள்ள உத்திகள்" },
    ],
    "മലയാളം (Malayalam)": [
      { title: "വിഷമം മനസ്സിലാക്കൽ", description: "വിഷമത്തിന്റെ ലക്ഷണങ്ങളും അതിനെ നേരിടാനുള്ള തന്ത്രങ്ങളും പഠിക്കുക" },
      { title: "ചെയ്യാത്തതിന്റെ ശക്തി വർദ്ധിപ്പിക്കൽ", description: "മാനസിക ശക്തിയും പൊരുത്തപ്പെടാനുള്ള കഴിവും വികസിപ്പിക്കുക" },
      { title: "ഉറക്ക സുഖാരോഗ്യ ഗൈഡ്", description: "നിങ്ങളുടെ ഉറക്കത്തിന്റെ ഗുണനിലവാരവും ശീലങ്ങളും മെച്ചപ്പെടുത്തുക" },
      { title: "ഡിജിറ്റൽ ഡിറ്റോക്സ് പ്ലാൻ", description: "നല്ല മാനസികാരോഗ്യത്തിനായി സ്ക്രീൻ സമയം കുറയ്ക്കുക" },
      { title: "മനോജാഗ്രതയും ധ്യാനവും", description: "ആന്തരിക ശാന്തിക്കായി മനോജാഗ്രതാ രീതികൾ പരിശീലിക്കുക" },
      { title: "സമ്മർദ്ദ മാനേജ്മെന്റ്", description: "ദൈനംദిన സമ്മർദ്ദം നിയന്ത്രിക്കാനുള്ള ഫലപ്രദമായ തന്ത്രങ്ങൾ" },
    ],
    "ગુજરાતી (Gujarati)": [
      { title: "ચિંતાને સમજવું", description: "ચિંતા ના લક્ષણો અને સામનો કરવાની વ્યૂહરચના વિશે જાણો" },
      { title: "લાચકતા બનાવવી", description: "માનસિક શક્તિ અને અનુકૂળતા વિકસાવો" },
      { title: "ઊંઘની સ્વચ્છતા ગાઇડ", description: "તમારી ઊંઘની ગુણવત્તા અને આદતોમાં સુધારો કરો" },
      { title: "ડિજિટલ ડિટોક્સ પ્લાન", description: "સારા માનસિક સ્વાસ્થ્ય માટે સ્ક્રિન સમય ઘટાડો" },
      { title: "મનન અને ધ્યાન", description: "આંતરિક શાંતિ માટે મનન તકનીકોનો અભ્યાસ કરો" },
      { title: "તણાવ વ્યવસ્થાપન", description: "દૈનિક તણાવનો સામનો કરવા માટે અસરકારક વ્યૂહરચના" },
    ],
    "اردو (Urdu)": [
      { title: "پریشانی کو سمجھنا", description: "پریشانی کی علامات اور نمٹنے کی حکمت عملیوں کے بارے میں جانیں" },
      { title: "لچک پیدا کرنا", description: "ذہنی طاقت اور موافقت کی صلاحیت تیار کریں" },
      { title: "نیند کی حفظان صحت گائیڈ", description: "اپنی نیند کی کوالٹی اور عادات کو بہتر بنائیں" },
      { title: "ڈیجیٹل ڈیٹاکس پلان", description: "بہتر ذہنی صحت کے لیے اسکرین ٹائم کم کریں" },
      { title: "ذہن سازی اور مراقبہ", description: "داخلی امن کے لیے ذہن سازی کی تکنیکوں کا مشق کریں" },
      { title: "تناؤ کا انتظام", description: "روزانہ تناؤ کا انتظام کرنے کے مؤثر طریقے" },
    ],
    "मराठी (Marathi)": [
      { title: "चिंता समजून घेणे", description: "चिंतेची लक्षणे आणि तिच्याशी सामना करण्याच्या रणनीतींबद्दल जाणून घ्या" },
      { title: "लवचिकता निर्माण करणे", description: "मानसिक शक्ती आणि अनुकूलन क्षमता विकसित करा" },
      { title: "झोपेच्या स्वच्छतेचे मार्गदर्शन", description: "तुमच्या झोपेची गुणवत्ता आणि सवयी सुधारा" },
      { title: "डिजिटल डिटॉक्स योजना", description: "चांगल्या मानसिक आरोग्यासाठी स्क्रीन वेळ कमी करा" },
      { title: "मनोजागरूकता आणि ध्यान", description: "आंतरिक शांतीसाठी मनोजागरूकतेच्या तंत्रांचा सराव करा" },
      { title: "ताण व्यवस्थापन", description: "दैनंदिन ताणाचे व्यवस्थापन करण्यासाठी प्रभावी रणनीती" },
    ],
  };

  const languages = Object.keys(wellnessGuides);

  const sections = [
    { id: "wellness-tips", name: "Wellness Tips", icon: Lightbulb },
    { id: "relaxing-videos", name: "Relaxing Videos", icon: Play },
    { id: "relaxing-audios", name: "Relaxing Audios", icon: Headphones },
    { id: "wellness-guides", name: "Wellness Guides", icon: Globe },
  ];

  const guides = wellnessGuides[selectedLanguage] ?? wellnessGuides["English"];

  return (
    <div className="resource-hub-page">
      <style>{styles}</style>

      {/* Header */}
      <header className="resource-header">
        <div className="resource-header-inner">
          <button aria-label="Back" onClick={onBack} className="resource-back-btn">
            <ArrowLeft />
          </button>

          <div className="resource-title">
            <h1>Resource Hub</h1>
            <div className="resource-subtitle">Mental Wellness Tools</div>
          </div>

          <div className="spacer-ghost" />
        </div>
      </header>

      <main className="resource-main">
        {/* Section Navigation */}
        <section className="section-nav" aria-label="Available Tools">
          <h2>Available Tools</h2>
          <div className="section-buttons" role="tablist">
            {sections.map((section) => {
              const Icon = section.icon;
              const active = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`section-btn ${active ? "active" : ""}`}
                  role="tab"
                  aria-selected={active}
                  aria-controls={`${section.id}-panel`}
                  id={`${section.id}-tab`}
                >
                  <Icon />
                  <span>{section.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Wellness Tips */}
        {activeSection === "wellness-tips" && (
          <section id="wellness-tips-panel" role="tabpanel" aria-labelledby="wellness-tips-tab" className="v-space">
            <div className="content-card">
              <div className="card-header">
                <div className="card-icon"><Lightbulb /></div>
                <div>
                  <h3 className="card-title">Mental & Physical Wellness Tips</h3>
                  <p className="card-subtitle">Expert advice for better well-being</p>
                </div>
              </div>

              <div className="v-space">
                {wellnessTips.map((category, i) => (
                  <div key={i} className="category-card">
                    <h4 className="category-title"><Star className="inline-icon" />{category.category}</h4>
                    <ul className="bullet-list">
                      {category.tips.map((tip, j) => (<li key={j}>{tip}</li>))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Relaxing Videos */}
        {activeSection === "relaxing-videos" && (
          <section id="relaxing-videos-panel" role="tabpanel" aria-labelledby="relaxing-videos-tab" className="v-space">
            <div className="content-card">
              <div className="card-header">
                <div className="card-icon"><Play /></div>
                <div>
                  <h3 className="card-title">Relaxing Videos</h3>
                  <p className="card-subtitle">Guided meditations and calming content</p>
                </div>
              </div>

              <div className="media-grid">
                {relaxingVideos.map((v) => (
                  <div key={v.id} className="media-card">
                    <div className="media-thumbnail"><Play /></div>
                    <h4 className="media-title">{v.title}</h4>
                    <p className="media-description">{v.description}</p>
                    <div className="media-duration"><Clock className="inline-icon-sm" />{v.duration}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Relaxing Audios */}
        {activeSection === "relaxing-audios" && (
          <section id="relaxing-audios-panel" role="tabpanel" aria-labelledby="relaxing-audios-tab" className="v-space">
            <div className="content-card">
              <div className="card-header">
                <div className="card-icon"><Headphones /></div>
                <div>
                  <h3 className="card-title">Relaxing Audio</h3>
                  <p className="card-subtitle">Soothing sounds for relaxation and focus</p>
                </div>
              </div>

              <div className="media-grid">
                {relaxingAudios.map((a) => (
                  <div key={a.id} className="media-card">
                    <div className="media-thumbnail"><Headphones /></div>
                    <h4 className="media-title">{a.title}</h4>
                    <p className="media-description">{a.description}</p>
                    <div className="media-duration"><Clock className="inline-icon-sm" />{a.duration}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Wellness Guides */}
        {activeSection === "wellness-guides" && (
          <section id="wellness-guides-panel" role="tabpanel" aria-labelledby="wellness-guides-tab" className="v-space">
            <div className="content-card">
              <div className="card-header">
                <div className="card-icon"><Globe /></div>
                <div>
                  <h3 className="card-title">Mental Wellness Guides</h3>
                  <p className="card-subtitle">Comprehensive guides in multiple languages</p>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Select Language:</label>
                <div className="language-selector" role="group" aria-label="Languages">
                  {Object.keys(wellnessGuides).map((language) => (
                    <button
                      key={language}
                      onClick={() => setSelectedLanguage(language)}
                      className={`language-btn ${selectedLanguage === language ? "selected" : ""}`}
                      aria-pressed={selectedLanguage === language}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div>

              <div className="media-grid">
                {(wellnessGuides[selectedLanguage] ?? wellnessGuides.English).map((g, i) => (
                  <div key={i} className="media-card">
                    <div className="media-thumbnail"><Globe /></div>
                    <h4 className="media-title">{g.title}</h4>
                    <p className="media-description">{g.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
