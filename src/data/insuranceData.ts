import { InsurancePlan } from '../types';

export const verifiedInsurancePlans: InsurancePlan[] = [
  {
    id: 'plan-cmchis',
    nameEn: 'Chief Minister\'s Comprehensive Health Insurance Scheme (CMCHIS)',
    nameTa: 'முதலமைச்சரின் விரிவான மருத்துவக் காப்பீட்டுத் திட்டம் (CMCHIS)',
    providerEn: 'Government of Tamil Nadu (United India Insurance Co. Ltd)',
    providerTa: 'தமிழ்நாடு அரசு (யுனைடெட் இந்தியா இன்சூரன்ஸ் நிறுவனம்)',
    category: 'Government Health Scheme',
    sumInsuredEn: 'Up to ₹5,00,000 per family per year on a cashless basis',
    sumInsuredTa: 'ஆண்டுக்கு ஒரு குடும்பத்திற்கு ₹5,00,000 வரை பணமில்லா சிகிச்சை',
    premiumEn: '100% Free / Fully sponsored by Tamil Nadu State Government',
    premiumTa: 'முழுக்க இலவசம் / தமிழ்நாடு அரசே முழு பிரீமியத்தையும் செலுத்துகிறது',
    eligibilityEn: 'Families resident in Tamil Nadu with an annual household income below ₹1,20,000 (verified via Ration Card / Smart Card and VAO Certificate).',
    eligibilityTa: 'தமிழ்நாட்டில் வசிக்கும் குடும்பங்கள், ஆண்டு குடும்ப வருமானம் ₹1,20,000-க்குள் இருக்க வேண்டும் (குடும்ப அட்டை மற்றும் கிராம நிர்வாக அலுவலர் சான்றிதழ் தேவை).',
    benefitsEn: [
      'Covers 1,090 surgical and medical procedures across empaneled hospitals',
      'Diagnostic tests, pre- and post-hospitalization medications included',
      'Accepted in all Tamil Nadu Government Medical College Hospitals and approved private network hospitals',
      'Dedicated helpline 1800 425 3993 and CMCHIS kiosk at government hospitals'
    ],
    benefitsTa: [
      'அங்கீகரிக்கப்பட்ட மருத்துவமனைகளில் 1,090 அறுவை மற்றும் மருத்துவ சிகிச்சைகளுக்கு பாதுகாப்பு',
      'பரிசோதனைக் கட்டணங்கள் மற்றும் மருத்துவமனைக்கு முந்தைய, பிந்தைய மருந்துகள் இதில் அடங்கும்',
      'தமிழ்நாட்டின் அனைத்து அரசு மருத்துவக் கல்லூரி மற்றும் தேர்வு செய்யப்பட்ட தனியார் மருத்துவமனைகளில் செல்லுபடியாகும்',
      'கட்டணமில்லா உதவி எண் 1800 425 3993 மற்றும் அரசு மருத்துவமனைகளில் உதவி மையங்கள்'
    ],
    waitingPeriodEn: 'No waiting period for specified pre-existing diseases once the CMCHIS smart card is active.',
    waitingPeriodTa: 'காப்பீட்டு அட்டை பயன்பாட்டுக்கு வந்தவுடன் முந்தைய நோய்களுக்கும் காத்திருப்பு காலம் இன்றி உடனடி சிகிச்சை.',
    officialSourceUrl: 'https://cmchistn.com',
    verifiedSource: 'Department of Health and Family Welfare, Government of Tamil Nadu (cmchistn.com)'
  },
  {
    id: 'plan-pmjay',
    nameEn: 'Ayushman Bharat — Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    nameTa: 'ஆயுஷ்மான் பாரத் — பிரதமர் மக்கள் ஆரோக்கியத் திட்டம் (PM-JAY)',
    providerEn: 'National Health Authority (Government of India)',
    providerTa: 'தேசிய சுகாதார ஆணையம் (இந்திய அரசு)',
    category: 'Government Health Scheme',
    sumInsuredEn: 'Up to ₹5,00,000 per family per year for secondary and tertiary care hospitalization',
    sumInsuredTa: 'இரண்டாம் மற்றும் மூன்றாம் நிலை மருத்துவ சிகிச்சைக்கு குடும்பத்திற்கு ₹5,00,000 வரை',
    premiumEn: '100% Free / Funded jointly by Central (60%) and State (40%) Governments',
    premiumTa: 'முழுக்க இலவசம் / மத்திய (60%) மற்றும் மாநில (40%) அரசுகளால் நிதி வழங்கப்படுகிறது',
    eligibilityEn: 'Vulnerable and low-income families identified automatically through Socio-Economic Caste Census (SECC 2011) database. No family size cap.',
    eligibilityTa: 'SECC 2011 கணக்கெடுப்பின்படி பொருளாதார ரீதியாக நலிவடைந்த குடும்பங்கள். குடும்ப உறுப்பினர்களின் எண்ணிக்கைக்கு வரம்பு இல்லை.',
    benefitsEn: [
      'Cashless and paperless access to healthcare services at empaneled public and private hospitals across India',
      'Covers 3 days pre-hospitalization and 15 days post-hospitalization expenses',
      'Over 1,949 medical packages covering oncology, cardiology, neurology, and surgery',
      'Portability across all states and Union Territories in India'
    ],
    benefitsTa: [
      'இந்தியா முழுவதும் உள்ள அரசு மற்றும் தனியார் மருத்துவமனைகளில் பணமில்லா சிகிச்சை',
      'மருத்துவமனையில் சேருவதற்கு 3 நாட்கள் முந்தைய மற்றும் டிஸ்சார்ஜ் ஆன 15 நாட்கள் பிந்தைய செலவுகள் அடங்கும்',
      'புற்றுநோய், இதயம் மற்றும் நரம்பியல் உட்பட 1,949 மருத்துவ சிகிச்சை தொகுப்புகள்',
      'இந்தியாவின் எந்த மாநிலத்திலும் உள்ள அங்கீகரிக்கப்பட்ட மருத்துவமனைகளில் பயன்படுத்தலாம்'
    ],
    waitingPeriodEn: 'Zero waiting period for pre-existing medical conditions from day one of enrollment.',
    waitingPeriodTa: 'திட்டம் தொடங்கிய முதல் நாளிலிருந்தே முந்தைய நோய்களுக்கும் பூஜ்ஜிய காத்திருப்பு காலம்.',
    officialSourceUrl: 'https://pmjay.gov.in',
    verifiedSource: 'National Health Authority Portal (pmjay.gov.in)'
  },
  {
    id: 'plan-star-comprehensive',
    nameEn: 'Star Comprehensive Insurance Policy',
    nameTa: 'ஸ்டார் காம்ப்ரிஹென்சிவ் ஹெல்த் இன்சூரன்ஸ்',
    providerEn: 'Star Health and Allied Insurance Co. Ltd (IRDAI Reg. 129)',
    providerTa: 'ஸ்டார் ஹெல்த் அண்ட் அலைட் இன்சூரன்ஸ் (IRDAI பதிவு எண். 129)',
    category: 'Private Comprehensive',
    sumInsuredEn: '₹5 Lakhs to ₹1 Crore options available',
    sumInsuredTa: '₹5 லட்சம் முதல் ₹1 கோடி வரை தேர்வு செய்யலாம்',
    premiumEn: 'Starts from approx. ₹9,800/year for single adult (age 30, ₹5L cover, actual quote depends on age/medical history)',
    premiumTa: '30 வயதுடைய ஒருவருக்கு ஆண்டிற்கு சுமார் ₹9,800 முதல் தொடங்குகிறது (வயதுக்கு ஏற்ப மாறுபடும்)',
    eligibilityEn: 'Adults aged 18 to 65 years. Lifelong renewability. Children covered from 91 days to 25 years.',
    eligibilityTa: '18 முதல் 65 வயது வரை உள்ளவர்கள் இணையலாம். வாழ்நாள் முழுவதும் புதுப்பிக்கும் வசதி. குழந்தைகள் 91 நாட்கள் முதல்.',
    benefitsEn: [
      'No room rent capping or ICU sub-limits for sum insured ₹5 Lakhs and above',
      'Automatic 100% restoration of sum insured once per year upon exhaustion',
      'Covers modern day care treatments, bariatric surgery, and air ambulance (up to specified limits)',
      'Direct cashless facility across 14,000+ partner network hospitals in India'
    ],
    benefitsTa: [
      '₹5 லட்சத்திற்கு மேற்பட்ட பாலிசிகளுக்கு அறை வாடகை வரம்பு (Room Rent Capping) கிடையாது',
      'பாலிசி தொகை தீர்ந்துவிட்டால் ஆண்டுக்கு ஒருமுறை தானாகவே 100% ரீசார்ஜ் ஆகும் வசதி',
      'நவீன ஒருநாள் அறுவை சிகிச்சைகள் மற்றும் அவசர ஏர் ஆம்புலன்ஸ் பாதுகாப்பு',
      'இந்தியா முழுவதும் 14,000-க்கும் மேற்பட்ட நெட்வொர்க் மருத்துவமனைகளில் பணமில்லா சிகிச்சை'
    ],
    waitingPeriodEn: '30-day initial waiting period; 24 months for specified ailments; 36 months for pre-existing conditions.',
    waitingPeriodTa: 'ஆரம்பத்தில் 30 நாட்கள் காத்திருப்பு காலம்; குறிப்பிட்ட நோய்களுக்கு 24 மாதங்கள்; முந்தைய நோய்களுக்கு 36 மாதங்கள்.',
    officialSourceUrl: 'https://www.starhealth.in',
    verifiedSource: 'Star Health Official Policy Prospectus & IRDAI Product Filing'
  },
  {
    id: 'plan-hdfc-optima',
    nameEn: 'HDFC ERGO Optima Secure',
    nameTa: 'ஹெச்டிஎஃப்சி எர்கோ ஆப்டிமா செக்யூர்',
    providerEn: 'HDFC ERGO General Insurance Co. Ltd (IRDAI Reg. 146)',
    providerTa: 'ஹெச்டிஎஃப்சி எர்கோ பொதுக் காப்பீட்டு நிறுவனம் (IRDAI பதிவு 146)',
    category: 'Private Comprehensive',
    sumInsuredEn: '₹5 Lakhs, ₹10 Lakhs, ₹25 Lakhs, ₹50 Lakhs, ₹1 Crore',
    sumInsuredTa: '₹5 லட்சம், ₹10 லட்சம், ₹25 லட்சம், ₹50 லட்சம், மற்றும் ₹1 கோடி',
    premiumEn: 'Starts from approx. ₹11,200/year (illustrative for ₹10L cover, age 28; subject to underwriter review)',
    premiumTa: 'ஆண்டிற்கு தோராயமாக ₹11,200 முதல் (28 வயது, ₹10 லட்சம் பாலிசிக்கு உதாரணம்)',
    eligibilityEn: 'Proposer must be 18+ years; dependent children from 91 days. Lifelong renewability.',
    eligibilityTa: 'பாலிசி எடுப்பவர் 18 வயது பூர்த்தியடைந்தவராக இருக்க வேண்டும். வாழ்நாள் புதுப்பித்தல் உறுதி.',
    benefitsEn: [
      '2X coverage from Day 1: A ₹10 Lakh cover gives ₹20 Lakhs total coverage immediately without extra premium',
      '100% Restore benefit immediately if base cover is exhausted',
      'Zero deduction on non-medical expenses (gloves, masks, needles) with secure benefit',
      'Over 12,000 cashless network hospitals in India with 20-minute cashless authorization'
    ],
    benefitsTa: [
      'முதல் நாளிலிருந்தே 2 மடங்கு பாதுகாப்பு: ₹10 லட்சம் பாலிசி எடுத்தால் ₹20 லட்சம் பாதுகாப்பு கிடைக்கும்',
      'அடிப்படை பாலிசி தொகை தீர்ந்தவுடன் உடனடியாக 100% மீண்டும் ரீசார்ஜ்',
      'மருத்துவ உபகரண செலவுகள் (கையுறை, முகக்கவசம்) போன்றவற்றுக்கும் முழு பாதுகாப்பு',
      '12,000-க்கும் மேற்பட்ட மருத்துவமனைகளில் 20 நிமிடங்களில் பணமில்லா அனுமதி'
    ],
    waitingPeriodEn: 'Initial waiting period 30 days. Pre-existing disease waiting period: 36 months (can be reduced to 24 months with add-on).',
    waitingPeriodTa: 'தொடக்கக் காத்திருப்பு 30 நாட்கள். முந்தைய நோய்களுக்கு 36 மாத காத்திருப்பு காலம்.',
    officialSourceUrl: 'https://www.hdfcergo.com',
    verifiedSource: 'HDFC ERGO Official Product Document (IRDAI/NL-HLT/HDFC-GI/P-H/V.I/82/13-14)'
  },
  {
    id: 'plan-arogya-sanjeevani',
    nameEn: 'Arogya Sanjeevani Standard Health Policy',
    nameTa: 'ஆரோக்கிய சஞ்சீவனி நிலையான மருத்துவக் காப்பீடு',
    providerEn: 'The New India Assurance Co. Ltd (Govt. of India Enterprise)',
    providerTa: 'தி நியூ இந்தியா அஷ்யூரன்ஸ் (இந்திய அரசு நிறுவனம்)',
    category: 'Public Health Insurance',
    sumInsuredEn: '₹1 Lakh to ₹5 Lakhs (standardized in ₹50,000 multiples)',
    sumInsuredTa: '₹1 லட்சம் முதல் ₹5 லட்சம் வரை (அனைத்து பொதுத்துறை நிறுவனங்களிலும் பொதுவானது)',
    premiumEn: 'Regulated affordable standard premium (approx. ₹4,500 - ₹6,000/year for ₹3L-₹5L coverage)',
    premiumTa: 'அரசால் நிர்ணயிக்கப்பட்ட குறைந்த பிரீமியம் (ஆண்டுக்கு தோராயமாக ₹4,500 முதல் ₹6,000 வரை)',
    eligibilityEn: 'Individuals aged 18 to 65 years. Available as individual or family floater.',
    eligibilityTa: '18 முதல் 65 வயது வரை உள்ள இந்தியக் குடிமக்கள். தனிநபர் அல்லது குடும்பக் காப்பீடாக பெறலாம்.',
    benefitsEn: [
      'IRDAI standardized policy terms across all Indian general insurers',
      'Room rent capped at 2% of sum insured (max ₹5,000/day); ICU capped at 5% (max ₹10,000/day)',
      'Pre-hospitalization up to 30 days and post-hospitalization up to 60 days',
      'AYUSH inpatient healthcare coverage (Ayurveda, Yoga, Unani, Siddha, Homeopathy)'
    ],
    benefitsTa: [
      'இந்திய காப்பீட்டு ஆணையம் (IRDAI) நிர்ணயித்த பொதுவான விதிமுறைகள்',
      'அறை வாடகை மற்றும் ICU கட்டணங்களுக்கு நிலையான வரம்பு',
      'மருத்துவமனையில் சேருவதற்கு முன் 30 நாட்கள் மற்றும் டிஸ்சார்ஜ் பின் 60 நாட்கள் செலவுகள் பாதுகாப்பு',
      'சித்த மருத்துவம், ஆயுர்வேதம் மற்றும் ஹோமியோபதி (AYUSH) சிகிச்சைகளுக்கும் பாதுகாப்பு'
    ],
    waitingPeriodEn: '30-day initial waiting period; 24-48 months for specified conditions; 48 months for pre-existing diseases.',
    waitingPeriodTa: 'ஆரம்ப காத்திருப்பு 30 நாட்கள்; குறிப்பிட்ட நோய்களுக்கு 24-48 மாதங்கள்; முந்தைய நோய்களுக்கு 48 மாதங்கள்.',
    officialSourceUrl: 'https://www.newindia.co.in',
    verifiedSource: 'IRDAI Standard Health Insurance Product Guidelines (IRDAI/HLT/REG/CIR/194/11/2019)'
  }
];
