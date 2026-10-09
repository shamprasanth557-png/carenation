-- CareNation: Seed Data for Coimbatore Hospitals, First Aid, Doctors, and Schemes
-- File: database/seeds/001_seed_data.sql

-- Seed Verified Coimbatore Hospitals
INSERT INTO hospitals (
    id, name_en, name_ta, type, city, address_en, address_ta, phone, emergency_phone,
    specialties_en, specialties_ta, facilities_en, facilities_ta, verified_status,
    verified_source, verified_date, map_link, live_bed_status_note_en, live_bed_status_note_ta
) VALUES
(
    'hosp-cmch',
    'Coimbatore Medical College Hospital (CMCH)',
    'கோயம்புத்தூர் அரசு மருத்துவக் கல்லூரி மருத்துவமனை (CMCH)',
    'Government',
    'Coimbatore',
    'Trichy Road, Gopalapuram, Coimbatore, Tamil Nadu 641018',
    'திருச்சி ரோடு, கோபாலபுரம், கோயம்புத்தூர், தமிழ்நாடு 641018',
    '+91 422 230 1393',
    '108 / +91 422 230 0151',
    ARRAY['24x7 Emergency & Trauma Care', 'General Medicine', 'General Surgery', 'Cardiology', 'Pediatrics'],
    ARRAY['24x7 அவசர & விபத்து சிகிச்சை', 'பொது மருத்துவம்', 'அறுவை சிகிச்சை', 'இதயவியல்', 'குழந்தைகள் நலம்'],
    ARRAY['Blood Bank', 'Free Treatment under CMCHIS', 'Intensive Care Unit (ICU)', '24x7 Casualty'],
    ARRAY['இரத்த வங்கி', 'முதலமைச்சர் காப்பீட்டு திட்ட இலவச சிகிச்சை', 'தீவிர சிகிச்சைப் பிரிவு (ICU)', '24 மணி நேர அவசர பிரிவு'],
    TRUE,
    'Department of Health & Family Welfare, Govt. of Tamil Nadu',
    '2025-10-01',
    'https://www.google.com/maps/search/?api=1&query=Coimbatore+Medical+College+Hospital+Trichy+Road',
    'Live bed availability is not connected to a real-time telematics stream. Please dial the emergency helpline or visit casualty for immediate admission status.',
    'நிகழ்நேர படுக்கை இருப்பு விவரங்கள் நேரடி கணினி இணைப்புடன் இணைக்கப்படவில்லை. அவசர சேர்க்கைக்கு மருத்துவமனை அவசர எண்ணை அல்லது 108-ஐ அழைக்கவும்.'
),
(
    'hosp-ramakrishna',
    'Sri Ramakrishna Hospital',
    'ஸ்ரீ ராமகிருஷ்ணா மருத்துவமனை',
    'Trust / Non-Profit',
    'Coimbatore',
    'No. 395, Sarojini Naidu Road, Siddhapudur, Coimbatore, Tamil Nadu 641044',
    'எண் 395, சரோஜினி நாயுடு ரோடு, சித்தாபுதூர், கோயம்புத்தூர், தமிழ்நாடு 641044',
    '+91 422 450 0000',
    '+91 422 450 0100',
    ARRAY['Cardiology & CTVS', 'Oncology (Cancer Centre)', 'Nephrology & Urology', 'Neurology'],
    ARRAY['இதயவியல் & அறுவை சிகிச்சை', 'புற்றுநோய் சிகிச்சை மையம்', 'சிறுநீரகவியல்', 'நரம்பியல்'],
    ARRAY['NABH Accredited', '24x7 Emergency', 'Advanced PET-CT', 'Cath Lab'],
    ARRAY['NABH அங்கீகாரம் பெற்றது', '24x7 அவசர சிகிச்சை', 'நவீன PET-CT பரிசோதனை', 'கேத் லேப்'],
    TRUE,
    'Official Hospital Registry & SNR Sons Charitable Trust Directory',
    '2025-09-15',
    'https://www.google.com/maps/search/?api=1&query=Sri+Ramakrishna+Hospital+Siddhapudur+Coimbatore',
    'Live bed telemetry unavailable. Contact emergency desk at +91 422 450 0100 for current ward and ICU availability.',
    'நிகழ்நேர படுக்கை நிலை நேரலை செய்யப்படவில்லை. தற்போதைய படுக்கை நிலைக்கு +91 422 450 0100 என்ற எண்ணில் தொடர்பு கொள்ளவும்.'
)
ON CONFLICT (id) DO NOTHING;

-- Seed Sample Doctor
INSERT INTO doctors (
    id, name_en, name_ta, specialty_en, specialty_ta, hospital_name_en, hospital_name_ta,
    qualification, experience_years, available_days_en, available_days_ta, available_slots,
    consultation_fee, consultation_type, is_demo_record
) VALUES
(
    'doc-1',
    'Dr. R. Senthil Nathan, MD, DM',
    'டாக்டர் ஆர். செந்தில் நாதன், MD, DM',
    'Cardiology (Heart Care)',
    'இதயவியல் (இதய சிகிச்சை)',
    'Coimbatore Medical College Hospital (CMCH)',
    'கோயம்புத்தூர் அரசு மருத்துவக் கல்லூரி மருத்துவமனை',
    'MBBS, MD (General Medicine), DM (Cardiology)',
    16,
    'Monday, Wednesday, Friday (09:00 AM - 01:00 PM)',
    'திங்கள், புதன், வெள்ளி (காலை 09:00 - மதியம் 01:00)',
    ARRAY['09:30 AM', '10:30 AM', '11:30 AM', '12:30 PM'],
    'Free (Govt OPD) / ₹0',
    'In-Person Consultation',
    TRUE
)
ON CONFLICT (id) DO NOTHING;
