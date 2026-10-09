import { Router, Request, Response } from 'express';
import { db } from './db';

export const apiRouter = Router();

// 1. Health check endpoint
apiRouter.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    product: 'CareNation',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: {
      status: 'connected',
      verifiedHospitals: db.getHospitals().length,
      firstAidTopics: db.getFirstAidTopics().length,
      verifiedDoctors: db.getDoctors().length,
      insurancePlans: db.getInsurancePlans().length
    }
  });
});

// 2. Hospitals Endpoints
apiRouter.get('/hospitals', (req: Request, res: Response) => {
  const { query, type } = req.query;
  let hospitals = db.getHospitals();

  if (query && typeof query === 'string') {
    const q = query.toLowerCase();
    hospitals = hospitals.filter(h =>
      h.nameEn.toLowerCase().includes(q) ||
      h.nameTa.toLowerCase().includes(q) ||
      h.specialtiesEn.some(s => s.toLowerCase().includes(q)) ||
      h.specialtiesTa.some(s => s.toLowerCase().includes(q))
    );
  }

  if (type && typeof type === 'string' && type !== 'all') {
    hospitals = hospitals.filter(h => h.type.toLowerCase() === type.toLowerCase());
  }

  res.json(hospitals);
});

apiRouter.get('/hospitals/:id', (req: Request, res: Response) => {
  const hospital = db.getHospitalById(req.params.id);
  if (!hospital) {
    return res.status(404).json({ error: 'Hospital record not found' });
  }
  res.json(hospital);
});

// 3. First Aid Endpoints
apiRouter.get('/first-aid', (req: Request, res: Response) => {
  res.json(db.getFirstAidTopics());
});

apiRouter.get('/first-aid/:id', (req: Request, res: Response) => {
  const topic = db.getFirstAidById(req.params.id);
  if (!topic) {
    return res.status(404).json({ error: 'First aid topic not found' });
  }
  res.json(topic);
});

// 4. Doctors Endpoints
apiRouter.get('/doctors', (req: Request, res: Response) => {
  const { specialty, query } = req.query;
  let doctors = db.getDoctors();

  if (specialty && typeof specialty === 'string' && specialty !== 'all') {
    doctors = doctors.filter(d =>
      d.specialtyEn.toLowerCase().includes(specialty.toLowerCase()) ||
      d.specialtyTa.toLowerCase().includes(specialty.toLowerCase())
    );
  }

  if (query && typeof query === 'string') {
    const q = query.toLowerCase();
    doctors = doctors.filter(d =>
      d.nameEn.toLowerCase().includes(q) ||
      d.nameTa.toLowerCase().includes(q) ||
      d.specialtyEn.toLowerCase().includes(q)
    );
  }

  res.json(doctors);
});

// 5. Appointments Endpoints
apiRouter.get('/appointments', (req: Request, res: Response) => {
  res.json(db.getAppointments());
});

apiRouter.post('/appointments', (req: Request, res: Response) => {
  const {
    doctorId,
    doctorNameEn,
    doctorNameTa,
    specialtyEn,
    specialtyTa,
    patientName,
    patientPhone,
    appointmentDate,
    appointmentTime,
    reason
  } = req.body;

  // Validation
  if (!patientName || typeof patientName !== 'string' || patientName.trim().length < 2) {
    return res.status(400).json({ error: 'Please enter a valid patient name (minimum 2 characters)' });
  }

  const phoneRegex = /^[6-9]\d{9}$/;
  const cleanPhone = (patientPhone || '').replace(/\D/g, '');
  if (!phoneRegex.test(cleanPhone)) {
    return res.status(400).json({ error: 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9' });
  }

  if (!appointmentDate || !appointmentTime) {
    return res.status(400).json({ error: 'Please select both an appointment date and a time slot' });
  }

  const newAppointment = db.createAppointment({
    doctorId: doctorId || 'demo-doc',
    doctorNameEn: doctorNameEn || 'Consulting Specialist',
    doctorNameTa: doctorNameTa || 'சிறப்பு மருத்துவர்',
    specialtyEn: specialtyEn || 'General Medicine',
    specialtyTa: specialtyTa || 'பொது மருத்துவம்',
    patientName: patientName.trim(),
    patientPhone: cleanPhone,
    appointmentDate,
    appointmentTime,
    reason: (reason || 'General health consultation').trim()
  });

  res.status(201).json({
    message: 'Demonstration appointment successfully recorded',
    appointment: newAppointment
  });
});

apiRouter.delete('/appointments/:id', (req: Request, res: Response) => {
  const success = db.deleteAppointment(req.params.id);
  if (!success) {
    return res.status(404).json({ error: 'Appointment not found' });
  }
  res.json({ message: 'Appointment cancelled successfully' });
});

// 6. Insurance Endpoints
apiRouter.get('/insurance/plans', (req: Request, res: Response) => {
  res.json(db.getInsurancePlans());
});

apiRouter.get('/insurance/applications', (req: Request, res: Response) => {
  res.json(db.getInsuranceApplications());
});

apiRouter.post('/insurance/applications', (req: Request, res: Response) => {
  const {
    planId,
    planNameEn,
    planNameTa,
    applicantName,
    applicantPhone,
    applicantAadhaarOrId,
    district,
    familyMembersCount
  } = req.body;

  if (!applicantName || typeof applicantName !== 'string' || applicantName.trim().length < 2) {
    return res.status(400).json({ error: 'Applicant name is required' });
  }

  const cleanPhone = (applicantPhone || '').replace(/\D/g, '');
  if (cleanPhone.length < 10) {
    return res.status(400).json({ error: 'A valid contact phone number is required' });
  }

  const newApp = db.createInsuranceApplication({
    planId: planId || 'plan-cmchis',
    planNameEn: planNameEn || "Chief Minister's Comprehensive Health Insurance Scheme",
    planNameTa: planNameTa || 'முதலமைச்சரின் விரிவான மருத்துவக் காப்பீட்டுத் திட்டம்',
    applicantName: applicantName.trim(),
    applicantPhone: cleanPhone,
    applicantAadhaarOrId: (applicantAadhaarOrId || 'Not provided').trim(),
    district: (district || 'Coimbatore').trim(),
    familyMembersCount: Number(familyMembersCount) || 1
  });

  res.status(201).json({
    message: 'Assistance request logged in CareNation queue',
    application: newApp
  });
});

// 7. Medicine Reminders Endpoints
apiRouter.get('/reminders', (req: Request, res: Response) => {
  res.json(db.getReminders());
});

apiRouter.post('/reminders', (req: Request, res: Response) => {
  const { medicineName, dosage, timeSlot, mealRelation, daysSchedule } = req.body;
  if (!medicineName || !timeSlot) {
    return res.status(400).json({ error: 'Medicine name and time slot are required' });
  }

  const reminder = db.createReminder({
    medicineName: medicineName.trim(),
    dosage: (dosage || '1 dose').trim(),
    timeSlot,
    mealRelation: mealRelation || 'after_meal',
    daysSchedule: daysSchedule || 'Daily'
  });

  res.status(201).json(reminder);
});

apiRouter.patch('/reminders/:id', (req: Request, res: Response) => {
  const { status } = req.body;
  if (!['pending', 'taken', 'skipped'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  const updated = db.updateReminderStatus(req.params.id, status);
  if (!updated) {
    return res.status(404).json({ error: 'Reminder not found' });
  }
  res.json(updated);
});

apiRouter.delete('/reminders/:id', (req: Request, res: Response) => {
  const deleted = db.deleteReminder(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Reminder not found' });
  }
  res.json({ message: 'Reminder deleted' });
});

// 8. Emergency Contacts Endpoint
apiRouter.get('/emergency-contacts', (req: Request, res: Response) => {
  res.json(db.getEmergencyContacts());
});

// 9. Symptom Check Educational Endpoint
apiRouter.post('/symptom-check', (req: Request, res: Response) => {
  const { symptoms, ageGroup, duration } = req.body;
  const symStr = Array.isArray(symptoms) ? symptoms.join(' ').toLowerCase() : String(symptoms || '').toLowerCase();

  // Red Flag Safety Screening
  const isEmergency =
    symStr.includes('chest pain') ||
    symStr.includes('heart') ||
    symStr.includes('severe breathing') ||
    symStr.includes('breathless') ||
    symStr.includes('stroke') ||
    symStr.includes('face drooping') ||
    symStr.includes('unconscious') ||
    symStr.includes('heavy bleeding') ||
    symStr.includes('நெஞ்சு வலி') ||
    symStr.includes('மூச்சுத்திணறல்') ||
    symStr.includes('ரத்தப்போக்கு');

  if (isEmergency) {
    return res.json({
      isEmergency: true,
      emergencyNoticeEn: 'EMERGENCY RED FLAG: The symptoms reported require immediate in-person emergency evaluation. Please call 108 or go to the nearest hospital casualty department immediately.',
      emergencyNoticeTa: 'அவசர எச்சரிக்கை: தாங்கள் குறிப்பிட்டுள்ள அறிகுறிகள் உடனடி அவசர மருத்துவ பரிசோதனைக்குரியவை. உடனடியாக 108 ஆம்புலன்ஸை அழைக்கவும் அல்லது அருகிலுள்ள மருத்துவமனைக்குச் செல்லவும்.',
      possibleCausesEn: ['Acute cardiovascular distress', 'Severe respiratory distress', 'Acute surgical or neurological emergency'],
      possibleCausesTa: ['இதய அவசரநிலை', 'கடுமையான சுவாசக் கோளாறு', 'அவசர நரம்பியல் அல்லது ரத்த நாள பாதிப்பு'],
      recommendedActionsEn: [
        'Call 108 immediately for an emergency ambulance',
        'Do not drive yourself to the hospital',
        'Rest in a comfortable, seated upright position while awaiting responders',
        'Have someone stay with the patient continuously'
      ],
      recommendedActionsTa: [
        'உடனடியாக 108 ஆம்புலன்ஸை அழையுங்கள்',
        'தானாக வாகனத்தை ஓட்டிக்கொண்டு செல்ல வேண்டாம்',
        'ஆம்புலன்ஸ் வரும் வரை சாய்ந்து ஓய்வாக அமரவும்',
        'நோயாளியுடன் எப்போதும் ஒரு துணை இருக்க வேண்டும்'
      ]
    });
  }

  // Non-emergency educational guidance
  res.json({
    isEmergency: false,
    summaryEn: `Educational overview for reported symptoms (${symptoms.slice(0, 3).join(', ')}). This guidance is informational only and not a clinical diagnosis.`,
    summaryTa: `குறிப்பிடப்பட்ட அறிகுறிகளுக்கான (${symptoms.slice(0, 3).join(', ')}) பொது விழிப்புணர்வு வழிகாட்டுதல். இது மருத்துவ நோயறிதல் அல்ல.`,
    possibleCausesEn: [
      'Viral upper respiratory infection or common flu',
      'Mild tension or seasonal physical fatigue',
      'Digestive sensitivity or mild dehydration'
    ],
    possibleCausesTa: [
      'சாதாரண சளி அல்லது வைரஸ் காய்ச்சல் தொற்று',
      'பருவநிலை மாற்றம் அல்லது உடல் சோர்வு',
      'செரிமான கோளாறு அல்லது நீர்ச்சத்து குறைவு'
    ],
    recommendedActionsEn: [
      'Stay well hydrated with clean boiled water, tender coconut, or ORS fluids',
      'Take adequate physical rest and monitor your body temperature',
      'Consult a physician at a verified hospital OPD or clinic if symptoms persist over 48 hours',
      'Do not take unprescribed antibiotics or heavy analgesics'
    ],
    recommendedActionsTa: [
      'காய்ச்சி வடிகட்டிய நீர், இளநீர் அல்லது ORS திரவங்களை அருந்தி நீர்ச்சத்தை பராமரிக்கவும்',
      'போதுமான உடல் ஓய்வு எடுக்கவும் மற்றும் உடல் வெப்பநிலையைக் கண்காணிக்கவும்',
      'அறிகுறிகள் 48 மணி நேரத்திற்கு மேல் நீடித்தால் மருத்துவரை அணுகவும்',
      'மருத்துவர் பரிந்துரையின்றி ஆன்டிபயாடிக் மருந்துகளை உட்கொள்ள வேண்டாம்'
    ],
    scriptEn: `Educational Health Guidance. For the symptoms described, stay well hydrated and ensure adequate physical rest. Monitor for any high fever or breathing distress. If symptoms do not improve within 48 hours, visit an outpatient clinic. Do not take self-prescribed medications.`,
    scriptTa: `உடல்நல விழிப்புணர்வு வழிகாட்டுதல். குறிப்பிட்டுள்ள அறிகுறிகளுக்கு போதுமான ஓய்வும், சீரான நீர்ச்சத்தும் தேவை. காய்ச்சல் தீவிரமடைந்தாலோ அல்லது 2 நாட்களுக்கு மேல் நீடித்தாலோ மருத்துவரை நேரில் அணுகவும். சுயமாக மருந்துக்கடைகளில் மாத்திரைகளை வாங்கி உட்கொள்வதைத் தவிர்க்கவும்.`
  });
});
