import { FirstAidTopic } from '../types';

export const firstAidTopics: FirstAidTopic[] = [
  {
    id: 'burns',
    titleEn: 'Burns & Scalds',
    titleTa: 'தீக்காயங்கள் மற்றும் சுடுநீர் காயங்கள்',
    iconName: 'Flame',
    overviewEn: 'Immediate cooling stops the burning process and protects deeper tissue layers. Acting within the first 10 minutes prevents severe scarring and infection.',
    overviewTa: 'உடனடியாக குளிர்ந்த நீரில் கழுவுவது தீக்காயத்தின் தீவிரத்தைக் குறைத்து உள் திசுக்களைப் பாதுகாக்கும். முதல் 10 நிமிடங்களில் செய்யப்படும் முதலுதவி மிக முக்கியமானது.',
    warningSignsEn: [
      'Skin looks charred white, dark brown, or leathery (3rd degree burn)',
      'Burns covering the face, neck, hands, groin, or major joints',
      'Burns caused by high-voltage electricity or caustic chemicals',
      'Victim has difficulty breathing or inhaled smoke'
    ],
    warningSignsTa: [
      'தோல் கருகி வெள்ளையாகவோ, அடர் பழுப்பு நிறமாகவோ அல்லது கடினமாகவோ மாறுதல் (ஆழ்ந்த தீக்காயம்)',
      'முகம், கழுத்து, கைகள், பிறப்புறுப்பு அல்லது முக்கிய மூட்டுகளில் தீக்காயம் ஏற்படுதல்',
      'மின்சாரம் அல்லது கடுமையான ரசாயனங்களால் ஏற்பட்ட தீக்காயம்',
      'சுவாசிப்பதில் சிரமம் அல்லது புகையை சுவாசித்திருத்தல்'
    ],
    stepsEn: [
      'Remove heat source safely: Ensure the surroundings are safe before approaching.',
      'Cool under running tap water: Hold the burnt area under cool (not ice-cold) running tap water for at least 20 minutes continuously.',
      'Remove tight items: Gently remove rings, watches, belts, or loose clothing near the burn before swelling sets in. Do NOT remove clothes stuck to the burn.',
      'Cover with clean cling wrap or sterile cloth: Cover loosely with clear plastic kitchen wrap or a sterile non-fluffy dressing to prevent infection.',
      'Keep the person warm: Cover non-injured parts of the body with a blanket to prevent hypothermia, especially in children.'
    ],
    stepsTa: [
      'வெப்ப மூலத்திலிருந்து விலகுங்கள்: முதலில் உங்கள் பாதுகாப்பை உறுதி செய்துகொள்ளுங்கள்.',
      'குளிர்ந்த குழாய் நீரில் 20 நிமிடங்கள் கழுவுங்கள்: குளிர்ந்த (ஐஸ் தண்ணீர் அல்ல) குழாய் தண்ணீரில் குறைந்தது 20 நிமிடங்கள் தொடர்ந்து காயத்தைக் காட்டுங்கள்.',
      'இறுக்கமான பொருட்களை அகற்றுங்கள்: வீக்கம் ஏற்படுவதற்கு முன் மோதிரம், கைக்கடிகாரம், நகைகளை மெதுவாக கழற்றுங்கள். தோலில் ஒட்டியுள்ள துணிகளை இழுத்துப் பிரிக்க வேண்டாம்.',
      'சுத்தமான துணி அல்லது பிளாஸ்டிக் ரேப்பால் மூடுங்கள்: தொற்று ஏற்படாமல் இருக்க சுத்தமான பிளாஸ்டிக் கவர் அல்லது மெல்லிய கிருமி நீக்கம் செய்த துணியால் லேசாக மூடுங்கள்.',
      'உடலை கதகதப்பாக வையுங்கள்: உடலின் காயமடையாத பகுதிகளை போர்வையால் போர்த்தி குளிர் நடுக்கம் ஏற்படாமல் பார்த்துக் கொள்ளுங்கள்.'
    ],
    dontsEn: [
      'DO NOT apply ice, ice water, butter, toothpaste, oil, or turmeric powder on burns.',
      'DO NOT burst blisters or peel peeling skin; blisters protect raw tissue underneath.',
      'DO NOT apply adhesive bandages directly over the burn.',
      'DO NOT pull off clothing that is stuck to the burnt flesh.'
    ],
    dontsTa: [
      'தீக்காயத்தின் மேல் ஐஸ் கட்டி, பற்பசை (Toothpaste), வெண்ணெய், எண்ணெய் அல்லது மஞ்சள் பொடி எதையும் பூச வேண்டாம்.',
      'ஏற்பட்டுள்ள கொப்புளங்களை ஒருபோதும் உடைக்கவோ கிள்ளவோ வேண்டாம்.',
      'நேரடியாக ஒட்டும் பிளாஸ்திரிகளை தீக்காயத்தின் மேல் ஒட்டாதீர்கள்.',
      'தோலில் ஒட்டிக்கொண்ட ஆடைகளை பலவந்தமாக இழுத்துப் பறிக்காதீர்கள்.'
    ],
    whenToCall108En: 'Dial 108 immediately if the burn is larger than the victim’s palm, caused by electricity or chemicals, involves the face or airway, or if the victim is a child or elderly person.',
    whenToCall108Ta: 'தீக்காயம் பாதிக்கப்பட்டவரின் உள்ளங்கையை விட பெரிதாக இருந்தால், மின்சாரம் அல்லது ரசாயனத்தால் ஏற்பட்டால், முகம் அல்லது சுவாசப் பாதையை பாதித்தால் உடனடியாக 108 ஆம்புலன்ஸை அழைக்கவும்.',
    medicalSource: 'St John Ambulance / International Federation of Red Cross and Red Crescent Societies (IFRC First Aid Guidelines)',
    voiceScriptEn: 'First Aid for Burns and Scalds. First, immediately cool the burn under running cool tap water for at least 20 minutes. Do not use ice or ice-cold water, as this damages the tissue further. Remove rings, watches, and restrictive jewelry before swelling begins. Do not burst any blisters. Never apply toothpaste, turmeric, butter, or oils. Loosely cover the burn with clean cling film or a sterile dressing. Call 108 emergency services immediately if the burn is larger than the palm, affects the face, or was caused by electricity or chemicals.',
    voiceScriptTa: 'தீக்காயங்களுக்கான அவசர முதலுதவி வழிகாட்டுதல். முதலில், தீக்காயம்பட்ட இடத்தை சாதாரண குளிர்ந்த குழாய் தண்ணீரில் குறைந்தது 20 நிமிடங்கள் தொடர்ந்து வையுங்கள். ஐஸ் கட்டி அல்லது பனிநீரைப் பயன்படுத்தாதீர்கள். அது தோலின் திசுக்களை மேலும் சேதப்படுத்தும். வீக்கம் தொடங்குவதற்கு முன் மோதிரங்கள், நகைகள், கைக்கடிகாரங்களை கழற்றி விடுங்கள். கொப்புளங்களை உடைக்காதீர்கள். பற்பசை, மஞ்சள், எண்ணெய் போன்றவற்றை ஒருபோதும் பூச வேண்டாம். சுத்தமான பிளாஸ்டிக் கவர் அல்லது மெல்லிய துணியால் லேசாக மூடி வையுங்கள். காயம் உள்ளங்கையை விட பெரிதாக இருந்தாலோ அல்லது மின்சாரத்தால் ஏற்பட்டாலோ உடனடியாக 108 அவசர ஊர்தியை அழைக்கவும்.'
  },
  {
    id: 'bleeding',
    titleEn: 'Severe Bleeding & Open Wounds',
    titleTa: 'கடுமையான ரத்தப்போக்கு மற்றும் காயங்கள்',
    iconName: 'Droplet',
    overviewEn: 'Uncontrolled heavy bleeding can lead to shock and life-threatening blood loss within minutes. Direct firm pressure is the single most effective first aid intervention.',
    overviewTa: 'கட்டுப்படுத்த முடியாத அதிக ரத்தப்போக்கு சில நிமிடங்களில் உயிருக்கு ஆபத்தை விளைவிக்கும். காயத்தின் மீது நேரடியாக அழுத்தம் கொடுப்பதே மிகச் சிறந்த முதலுதவி முறையாகும்.',
    warningSignsEn: [
      'Blood spurting or pumping rhythmically from the wound (arterial bleed)',
      'Bleeding that does not stop after 10 minutes of direct firm pressure',
      'Pale, clammy, cold skin and rapid weak pulse (signs of hypovolemic shock)',
      'Victim becomes dizzy, confused, or loses consciousness'
    ],
    warningSignsTa: [
      'காயத்திலிருந்து ரத்தம் வேகமாக பீறிட்டு அடித்தல் (தமனி ரத்தப்போக்கு)',
      '10 நிமிடங்கள் அழுத்தியும் ரத்தப்போக்கு நிற்காமல் தொடர்ந்து வெளியேறுதல்',
      'தோல் வெளிறி குளிர்ந்து போதல், நாடித்துடிப்பு பலவீனமடைதல் (ரத்த இழப்பு அதிர்ச்சி)',
      'மயக்கம், குழப்பம் அல்லது சுயநினைவை இழத்தல்'
    ],
    stepsEn: [
      'Apply direct pressure: Press firmly on the wound with a clean cloth, sterile gauze pad, or your gloved hand.',
      'Maintain continuous pressure: Keep pressing firmly for at least 10 to 15 minutes without lifting the cloth to check.',
      'Add more pads if blood soaks through: Do NOT remove the original soaked cloth; place fresh pads directly over it and keep pressing.',
      'Elevate the limb if no fracture: If an arm or leg is bleeding and there are no broken bones, raise it gently above the level of the heart.',
      'Bandage securely: Secure the pad with a bandage or strip of cloth, firm enough to maintain pressure without cutting off circulation to fingers/toes.'
    ],
    stepsTa: [
      'நேரடி அழுத்தம் கொடுங்கள்: சுத்தமான துணி அல்லது துணி பேடை காயத்தின் மேல் வைத்து இரு கைகளாலும் பலமாக அழுத்துங்கள்.',
      'தொடர்ந்து அழுத்தத்தை பராமரியுங்கள்: ரத்தம் நிற்கிறதா என்று பார்க்க துணியை எடுக்காமல் குறைந்தது 10 முதல் 15 நிமிடங்கள் தொடர்ந்து அழுத்தவும்.',
      'துணி நனைந்தால் மேல் மேலும் துணி வையுங்கள்: நனைந்த முதல் துணியை ஒருபோதும் எடுக்க வேண்டாம்; அதன் மேலேயே புதிய துணியை வைத்து அழுத்தவும்.',
      'காயமடைந்த கையை அல்லது காலை உயர்த்துங்கள்: எலும்பு முறிவு இல்லை என்றால், காயம்பட்ட கையை இதய மட்டத்தை விட சற்று உயர்த்தி வையுங்கள்.',
      'பாண்டேஜ் கட்டுங்கள்: ரத்தப்போக்கு நின்ற பிறகு கட்டுப்போடுங்கள். விரல்களுக்கு ரத்த ஓட்டம் தடைபடாத அளவுக்கு மிதமான இறுக்கத்துடன் கட்டுங்கள்.'
    ],
    dontsEn: [
      'DO NOT remove any deeply embedded object (like glass or knife); stabilize around the object with rolled pads.',
      'DO NOT release pressure repeatedly to check if bleeding has stopped.',
      'DO NOT wash a deep, heavily bleeding wound under water; prioritize stopping the blood loss.',
      'DO NOT use a makeshift tourniquet unless trained and the bleed is catastrophic and uncontrolled.'
    ],
    dontsTa: [
      'காயத்தில் ஆழமாக குத்தியுள்ள கண்ணாடி அல்லது கூர்மையான பொருளை வெளியே இழுக்காதீர்கள்; பொருளைச் சுற்றி துணி வைத்து நகராமல் கட்டுங்கள்.',
      'ரத்தம் நின்றுவிட்டதா என்று அடிக்கடி துணியைத் தூக்கிப் பார்க்காதீர்கள்.',
      'அதிக ரத்தப்போக்கு உள்ள ஆழமான காயத்தை தண்ணீரில் கழுவி நேரத்தை வீணாக்காதீர்கள்; ரத்தத்தை நிறுத்துவதற்கே முன்னுரிமை கொடுங்கள்.',
      'முறையான பயிற்சி இல்லாமல் கை அல்லது காலில் ரத்த ஓட்டத்தை முழுமையாக நிறுத்தும் கயிறு கட்டுகளைப் போடாதீர்கள்.'
    ],
    whenToCall108En: 'Dial 108 immediately if blood is spurting, will not stop after 10 minutes of direct pressure, an object is embedded, or the person feels faint or confused.',
    whenToCall108Ta: 'ரத்தம் பீறிட்டு அடித்தாலோ, 10 நிமிட அழுத்தத்திற்குப் பிறகும் ரத்தம் நிற்காவிட்டாலோ, ஆழமான பொருள் குத்தியிருந்தாலோ உடனே 108 ஆம்புலன்ஸை அழைக்கவும்.',
    medicalSource: 'World Health Organization (WHO) & International Red Cross Guidelines on Haemorrhage Control',
    voiceScriptEn: 'First Aid for Severe Bleeding. The most crucial action is to apply immediate, firm, direct pressure onto the wound using a clean cloth or sterile pad. Maintain continuous pressure for at least 10 to 15 minutes. Do not keep lifting the pad to check. If the cloth soaks through with blood, do not remove it; place another cloth on top and press even harder. If an object is stuck inside the wound, do not pull it out; support around it. Call 108 immediately if bleeding is rapid or the person feels faint.',
    voiceScriptTa: 'கடுமையான ரத்தப்போக்கிற்கான முதலுதவி விளக்கம். ரத்தப்போக்கைத் தடுக்க மிக முக்கியமானது காயத்தின் மீது நேரடியான, அழுத்தமான பிடியாகும். சுத்தமான துணியை காயத்தின் மேல் வைத்து 10 முதல் 15 நிமிடங்கள் தொடர்ந்து பலமாக அழுத்துங்கள். ரத்தம் நிற்கிறதா என்று பார்க்க அடிக்கடி துணியை விலக்காதீர்கள். ரத்தம் அதிகமாக கசிந்தால், பழைய துணியை எடுக்காமல் அதன் மேலேயே இன்னொரு துணியை வைத்து அழுத்தவும். காயத்தில் ஏதேனும் பொருள் குத்தியிருந்தால் அதை வெளியே இழுக்காதீர்கள். ரத்தம் நிற்கவில்லை என்றால் தாமதிக்காமல் உடனடியாக 108 ஆம்புலன்ஸை அழையுங்கள்.'
  },
  {
    id: 'choking',
    titleEn: 'Choking (Airway Obstruction)',
    titleTa: 'தொண்டையில் உணவு அல்லது பொருள் அடைத்தல் (மூச்சுத்திணறல்)',
    iconName: 'ShieldAlert',
    overviewEn: 'When the windpipe is blocked, oxygen cannot reach the brain. Recognizing the universal sign of choking and delivering rapid back blows and abdominal thrusts can save a life.',
    overviewTa: 'சுவாசக் குழாயில் உணவு அல்லது பொருள் அடைத்துக்கொண்டால் மூளைக்கு ஆக்சிஜன் செல்வது தடைபடும். முதுகில் தட்டுதல் மற்றும் அடிவயிற்று அழுத்த முறையால் அடைப்பை நீக்கலாம்.',
    warningSignsEn: [
      'Person clutches their throat with both hands (universal distress sign)',
      'Inability to speak, cry, or cough forcefully',
      'High-pitched wheezing sound while breathing in',
      'Skin, lips, or fingernails turning bluish or grayish'
    ],
    warningSignsTa: [
      'பாதிக்கப்பட்டவர் தன் இரு கைகளாலும் தொண்டையைப் பிடித்துக் கொள்ளுதல் (உலகளாவிய மூச்சுத்திணறல் அடையாளம்)',
      'பேசவோ, இருமவோ அல்லது சத்தம் எழுப்பவோ இயலாமை',
      'மூச்சை உள்ளிழுக்கும் போது விசித்திரமான சீறல் சத்தம்',
      'உதடுகள், விரல் நகங்கள் அல்லது முகம் நீல நிறமாக மாறுதல்'
    ],
    stepsEn: [
      'Encourage coughing if the victim can cough: If they can cough forcefully or speak, encourage them to keep coughing. Do not interfere.',
      'Give 5 firm Back Blows: If they cannot cough or speak, lean the person forward supporting their chest with one hand. Give up to 5 sharp blows between the shoulder blades with the heel of your hand.',
      'Perform 5 Abdominal Thrusts (Heimlich Maneuver): Stand behind the person. Wrap your arms around their waist. Make a fist just above the navel. Grasp your fist with your other hand and pull sharply inward and upward.',
      'Alternate between 5 back blows and 5 abdominal thrusts until the object is expelled.',
      'If the person loses consciousness: Lower them carefully to the floor, call 108 immediately, and start CPR chest compressions.'
    ],
    stepsTa: [
      'இரும முடிகிறதா என்று பாருங்கள்: அவர்களால் பேசவோ இருமவோ முடிந்தால், தொடர்ந்து பலமாக இருமச் சொல்லுங்கள். உடனே முதுகில் அடிக்க வேண்டாம்.',
      'முதுகில் 5 முறை தட்டுங்கள்: பேச முடியாவிட்டால், நபரை சற்று முன்னோக்கி சாய்த்து ஒரு கையால் மார்பைத் தாங்கி, மற்றொரு கையின் அடிப்பகுதியால் தோள்பட்டைகளுக்கு இடையே 5 முறை தட்டுங்கள்.',
      '5 முறை வயிற்றுப் பகுதியில் அழுத்தம் கொடுங்கள் (ஹெய்ம்லிச் முறை): நபரின் பின்புறம் நின்று வயிற்றைச் சுற்றி கைகளால் வளைத்து, தொப்புளுக்கு சற்று மேலே ஒரு கையை மடக்கி பிடித்து, உள்நோக்கியும் மேல்நோக்கியும் 5 முறை வேகமாக அழுத்துங்கள்.',
      'பொருள் வெளியேறும் வரை: 5 முறை முதுகில் தட்டுவதையும் 5 முறை வயிற்றில் அழுத்துவதையும் மாறி மாறி செய்யுங்கள்.',
      'சுயநினைவை இழந்தால்: தரையில் நேராக படுக்க வைத்து உடனடியாக 108-ஐ அழைத்து, CPR மார்பு அழுத்தத்தைத் தொடங்குங்கள்.'
    ],
    dontsEn: [
      'DO NOT perform blind finger sweeps inside the mouth; you may push the object deeper into the throat.',
      'DO NOT give abdominal thrusts to pregnant women or infants under 1 year (use chest thrusts instead).',
      'DO NOT give the person water to drink while they are actively choking.',
      'DO NOT slap their back while they are standing completely upright.'
    ],
    dontsTa: [
      'வாய்க்குள் விரலை விட்டு கண்ணை மூடிக்கொண்டு தேடாதீர்கள்; அது அடைத்த பொருளை மேலும் உள்ளே தள்ளிவிடும்.',
      'கர்ப்பிணிப் பெண்கள் மற்றும் 1 வயதுக்குட்பட்ட குழந்தைகளுக்கு அடிவயிற்று அழுத்த முறை செய்யாதீர்கள் (மார்பு அழுத்த முறை மட்டுமே செய்ய வேண்டும்).',
      'மூச்சுத்திணறும் போது தண்ணீர் குடிக்கக் கொடுக்காதீர்கள்.',
      'நபரை முன்னோக்கி சாய்க்காமல் நேராக நிற்க வைத்து முதுகில் அடிக்காதீர்கள்.'
    ],
    whenToCall108En: 'Call 108 immediately if the obstruction does not clear within 1 minute, or if the victim collapses or becomes unresponsive.',
    whenToCall108Ta: 'பொருள் வெளியேறாமல் ஒரு நிமிடத்திற்கு மேல் நீடித்தால் அல்லது நபர் மயக்கமடைந்து கீழே விழுந்தால் உடனடியாக 108 அவசர எண்ணை அழையுங்கள்.',
    medicalSource: 'American Heart Association (AHA) & Resuscitation Council UK BLS Guidelines',
    voiceScriptEn: 'First Aid for Choking. If the person can speak or cough forcefully, encourage them to keep coughing. If they cannot speak or breathe, lean them forward and deliver 5 firm back blows between their shoulder blades using the heel of your hand. If the blockage remains, stand behind them, place a fist just above the navel, and deliver 5 quick upward abdominal thrusts. Alternate between 5 back blows and 5 abdominal thrusts until the blockage clears. If they collapse or lose consciousness, call 108 and start CPR immediately.',
    voiceScriptTa: 'தொண்டை அடைப்பு மற்றும் மூச்சுத்திணறலுக்கான முதலுதவி. நபரால் பேசவோ இருமவோ முடிந்தால், தொடர்ந்து இரும ஊக்குவியுங்கள். பேசவோ சுவாசிக்கவோ முடியாவிட்டால், நபரை முன்னோக்கி சாய்த்து, இரு தோள்பட்டைகளுக்கு இடையே உங்கள் உள்ளங்கையின் அடிப்பகுதியால் 5 முறை பலமாக தட்டுங்கள். அடைப்பு நீங்காவிட்டால், நபரின் பின்புறம் நின்று, தொப்புளுக்கு மேலே உங்கள் கையை மடக்கி பிடித்து, உள்நோக்கியும் மேல்நோக்கியும் 5 முறை வேகமாக அழுத்துங்கள். பொருள் வெளியேறும் வரை இதை மாற்றி மாற்றி செய்யுங்கள். நபர் சுயநினைவை இழந்தால் உடனே 108-ஐ அழைத்து மார்பு அழுத்தத்தைத் தொடங்குங்கள்.'
  },
  {
    id: 'fainting',
    titleEn: 'Fainting & Unconsciousness',
    titleTa: 'மயக்கம் மற்றும் சுயநினைவின்மை',
    iconName: 'UserX',
    overviewEn: 'Fainting is a temporary loss of consciousness caused by a brief drop in blood flow to the brain. Proper positioning restores oxygen circulation rapidly.',
    overviewTa: 'மயக்கம் என்பது மூளைக்கு செல்லும் ரத்த ஓட்டம் தற்காலிகமாகக் குறைவதால் ஏற்படும் சுயநினைவின்மை ஆகும். சரியான முறையில் படுக்க வைப்பது ரத்த ஓட்டத்தை விரைவாக சீராக்கும்.',
    warningSignsEn: [
      'Person remains unconscious for longer than 1 to 2 minutes',
      'Unconsciousness preceded by chest pain, palpitations, or severe headache',
      'Seizure activity, jerking limbs, or incontinence',
      'Person is unresponsive with abnormal or absent breathing'
    ],
    warningSignsTa: [
      'நபர் 1 முதல் 2 நிமிடங்களுக்கு மேலாக சுயநினைவு பெறாமல் இருத்தல்',
      'மயக்கத்திற்கு முன் நெஞ்சு வலி, படபடப்பு அல்லது கடுமையான தலைவலி இருந்திருத்தல்',
      'கை கால்கள் வெட்டி இழுத்தல் (வலிப்பு) அல்லது சிறுநீர் கசிவு',
      'சுவாசம் இன்றி அல்லது விசித்திரமான மூச்சு சத்தத்துடன் அசைவற்று இருத்தல்'
    ],
    stepsEn: [
      'Check responsiveness and breathing: Shake their shoulders gently and ask loudly, "Are you okay?" Look, listen, and feel for normal breathing for 10 seconds.',
      'Elevate legs 12 inches (30 cm): Lay the person flat on their back and raise their feet above heart level to assist venous return to the brain.',
      'Loosen tight clothing: Unbutton tight collars, loosen ties, belts, or tight waistbands to ease breathing.',
      'Ensure fresh air: Clear crowds away from the person and open windows or fan them gently.',
      'Put in Recovery Position if breathing but unresponsive: Roll them onto their side with their top leg bent at a right angle to keep their airway open and prevent choking on vomit.'
    ],
    stepsTa: [
      'சுயநினைவு மற்றும் சுவாசத்தை சோதிக்கவும்: தோள்களை லேசாகத் தட்டி "நீங்கள் நலமாக இருக்கிறீர்களா?" என்று சத்தமாகக் கேளுங்கள். 10 வினாடிகள் இயல்பான சுவாசத்தைக் கவனியுங்கள்.',
      'கால்களை 12 அங்குலம் உயர்த்தவும்: நபரை மல்லாந்து படுக்க வைத்து, கால்களை இதய மட்டத்திற்கு மேல் சுமார் ஒரு அடி தூக்கி வையுங்கள்.',
      'இறுக்கமான உடைகளை தளர்த்தவும்: சட்டை காலர், பெல்ட் மற்றும் இறுக்கமான ஆடைகளைத் தளர்த்தி சுவாசம் எளிதாக செல்ல உதவுங்கள்.',
      'சுத்தமான காற்று கிடைக்கச் செய்யுங்கள்: கூட்டத்தைக் கலைத்து, ஜன்னல்களைத் திறந்து காற்றோட்டத்தை ஏற்படுத்துங்கள்.',
      'மீட்பு நிலையில் (Recovery Position) படுக்க வைக்கவும்: சுயநினைவு திரும்பவில்லை ஆனால் சுவாசிக்கிறார் என்றால், அவரை ஒரு பக்கமாக சாய்த்து ஒரு காலை மடக்கி படுக்க வைக்கவும்.'
    ],
    dontsEn: [
      'DO NOT splash water on their face or force them to sit up immediately.',
      'DO NOT give anything to drink or eat while they are semi-conscious or unresponsive.',
      'DO NOT slap their cheeks or shake them violently.',
      'DO NOT place a pillow under their head if you suspect a neck or spinal injury.'
    ],
    dontsTa: [
      'மயங்கி விழுந்தவர் முகத்தில் தண்ணீரை ஊற்றவோ அல்லது உடனடியாக எழுந்து உட்கார வைக்கவோ கூடாது.',
      'சுயநினைவு முழுமையாக திரும்பும் வரை குடிக்க தண்ணீர் அல்லது உணவை வாயில் புகட்டாதீர்கள்.',
      'கன்னத்தில் அறையவோ அல்லது பலமாக உலுக்கவோ வேண்டாம்.',
      'தலைக்கு அடியில் பெரிய தலையணையை வைக்காதீர்கள்.'
    ],
    whenToCall108En: 'Dial 108 immediately if the person does not regain consciousness within 2 minutes, suffered a fall with a head strike, has chest pain, or is not breathing normally.',
    whenToCall108Ta: 'நபர் 2 நிமிடங்களுக்குள் விழித்துக்கொள்ளாவிட்டால், தலையில் பலத்த அடிபட்டிருந்தால், நெஞ்சு வலி இருந்திருந்தால் உடனடியாக 108 அவசர எண்ணை அழைக்கவும்.',
    medicalSource: 'UK National Health Service (NHS) & Mayo Clinic First Aid Guidelines',
    voiceScriptEn: 'First Aid for Fainting. Check if the person is responsive and breathing. Lay them flat on their back and elevate their feet about 12 inches to restore blood flow to the brain. Loosen tight collars, belts, and ties. Ensure they get plenty of fresh air. Do not splash cold water on their face, and never give liquids to drink while they are unconscious. If they do not wake up within 2 minutes, or if they have chest pain or irregular breathing, call 108 immediately.',
    voiceScriptTa: 'மயக்கத்திற்கான முதலுதவி வழிகாட்டுதல். நபர் சுவாசிக்கிறாரா என்று பாருங்கள். அவரை தரையில் மல்லாந்து படுக்க வைத்து, மூளைக்கு ரத்த ஓட்டம் செல்ல கால்களை ஒரு அடி உயரத்திற்கு தூக்கி வையுங்கள். சட்டை காலர் மற்றும் பெல்ட்டைத் தளர்த்துங்கள். கூட்டத்தைக் கலைத்து நல்ல காற்றோட்டம் கிடைக்கச் செய்யுங்கள். முகத்தில் தண்ணீரை விசிறி அடிக்காதீர்கள். மயக்கத்தில் இருக்கும் போது தண்ணீர் புகட்ட வேண்டாம். 2 நிமிடங்களுக்கு மேல் கண் விழிக்காவிட்டாலோ அல்லது நெஞ்சுவலி இருந்தாலோ உடனடியாக 108 ஆம்புலன்ஸை அழைக்கவும்.'
  },
  {
    id: 'fractures',
    titleEn: 'Fractures & Bone Injuries',
    titleTa: 'எலும்பு முறிவு மற்றும் தசை மூட்டுக் காயங்கள்',
    iconName: 'Activity',
    overviewEn: 'Immobilizing a suspected broken bone prevents bone fragments from damaging nerves, blood vessels, and soft tissues, while significantly reducing shock and pain.',
    overviewTa: 'முறிந்த எலும்பு அசையாமல் நிலைநிறுத்துவது சுற்றியுள்ள நரம்புகள் மற்றும் ரத்தக் குழாய்கள் சேதமடைவதைத் தடுத்து, வலியையும் அதிர்ச்சியையும் பெருமளவு குறைக்கும்.',
    warningSignsEn: [
      'Bone has pierced through the skin (open or compound fracture)',
      'Limb appears visibly deformed, crooked, or shortened',
      'Numbness, tingling, or blue/cold skin in fingers or toes below the injury',
      'Heavy grating sensation or sound (crepitus) during movement'
    ],
    warningSignsTa: [
      'முறிந்த எலும்பு தோலைக் கிழித்துக்கொண்டு வெளியே தெரிதல் (திறந்த எலும்பு முறிவு)',
      'கையோ காலோ வளைந்து அல்லது இயல்புக்கு மாறாக கோணலாகத் தெரிதல்',
      'காயத்திற்கு கீழே உள்ள விரல்களில் உணர்வின்மை, மரத்துப் போதல் அல்லது நீல நிறமாக மாறுதல்',
      'அசையும் போது எலும்பு உராயும் சத்தம் அல்லது கடுமையான தாங்க முடியாத வலி'
    ],
    stepsEn: [
      'Immobilize the injured area: Keep the broken bone completely still in the exact position you found it.',
      'Support the joint above and below: Use folded magazines, cardboard, or wood padded with cloth to make a temporary splint.',
      'Control any external bleeding: If skin is broken, cover the wound with a clean cloth and apply gentle pressure around (not on) the exposed bone.',
      'Apply ice wrapped in cloth: Place an ice pack wrapped in a towel for 15-20 minutes to reduce painful swelling.',
      'Treat for shock: Keep the person calm, lying down comfortably, and covered with a light blanket.'
    ],
    stepsTa: [
      'காயம்பட்ட பகுதியை அசையாமல் வையுங்கள்: முறிந்த பாகம் எந்த நிலையில் இருந்ததோ அதே நிலையில் அசையாமல் பார்த்துக் கொள்ளுங்கள்.',
      'முறிவு ஏற்பட்ட இடத்திற்கு மேலும் கீழும் தாங்குதல் கொடுங்கள்: மடிக்கப்பட்ட அட்டை, பலகை அல்லது உருட்டப்பட்ட துணிகளைக் கொண்டு அசையாதவாறு ஸ்பிளின்ட் கட்டுங்கள்.',
      'ரத்தப்போக்கு இருந்தால் கட்டுப்படுத்துங்கள்: தோல் கிழிந்திருந்தால் சுத்தமான துணியை வைத்து எலும்பை அழுத்தாமல் சுற்றி அழுத்தி கட்டுங்கள்.',
      'துணியில் சுற்றிய ஐஸ் வையுங்கள்: வீக்கத்தைக் குறைக்க ஐஸ் கட்டிகளை ஒரு துணியில் சுற்றி 15-20 நிமிடங்கள் லேசாக வையுங்கள்.',
      'அதிர்ச்சியைத் தணிக்கவும்: நோயாளியை அமைதிப்படுத்தி, படுக்க வைத்து லேசான போர்வையால் போர்த்துங்கள்.'
    ],
    dontsEn: [
      'DO NOT try to straighten, re-align, or push back a deformed bone or dislocated joint.',
      'DO NOT move a person with suspected spine, neck, or pelvic fractures unless in immediate danger.',
      'DO NOT let the victim walk on an injured leg or bear weight on the arm.',
      'DO NOT give food or liquids if emergency surgery may be required.'
    ],
    dontsTa: [
      'வளைந்த எலும்பையோ அல்லது மூட்டையோ பிடித்து நேராக்கவோ உள்ளே தள்ளவோ முயலாதீர்கள்.',
      'கழுத்து, முதுகுத்தண்டு அல்லது இடுப்பு எலும்பு முறிவு என சந்தேகித்தால் நபரை அசைக்கவே கூடாது.',
      'காயமடைந்த காலை தரையில் ஊன்றி நடக்க அனுமதிக்காதீர்கள்.',
      'அவசர அறுவை சிகிச்சை தேவைப்படலாம் என்பதால் எதையும் சாப்பிடவோ குடிக்கவோ கொடுக்காதீர்கள்.'
    ],
    whenToCall108En: 'Dial 108 immediately if the bone pierces through the skin, the injury involves the neck/back/pelvis, or the fingers/toes turn cold and blue.',
    whenToCall108Ta: 'எலும்பு தோலை விட்டு வெளியே தெரிந்தாலோ, முதுகுத்தண்டு அல்லது இடுப்பில் காயம் ஏற்பட்டாலோ, விரல்கள் மரத்து குளிர்ந்து போனாலோ உடனடியாக 108 ஆம்புலன்ஸை அழைக்கவும்.',
    medicalSource: 'Ganga Medical Centre Orthopaedic Guidelines & British Red Cross First Aid Manual',
    voiceScriptEn: 'First Aid for Fractures and Broken Bones. The most important rule is to immobilize the limb and keep it completely still. Do not try to realign or force the bone back into place. Support the injured part using a rigid splint or rolled cloth. Apply an ice pack wrapped in a towel to reduce swelling. If an open wound has bone protruding, cover it gently without pressing on the bone. Do not give the patient food or water. Call 108 immediately for severe fractures or spinal injuries.',
    voiceScriptTa: 'எலும்பு முறிவுக்கான முதலுதவி அறிவுரை. மிக முக்கியமான விதி, முறிந்த கையை அல்லது காலை அசைக்காமல் அப்படியே வைக்க வேண்டும். முறிந்த எலும்பை நேராக்கவோ பலவந்தமாக உள்ளே தள்ளவோ கூடாது. அட்டை அல்லது பலகை கொண்டு அசையாமல் தாங்கி கட்டுங்கள். வீக்கத்தைக் குறைக்க துணியில் சுற்றிய ஐஸ் கட்டிகளை வையுங்கள். எலும்பு தோலை விட்டு வெளியே தெரிந்தால் அதன் மேல் அழுத்தாமல் சுத்தமான துணியால் லேசாக மூடுங்கள். நோயாளிக்கு தண்ணீர் கொடுக்க வேண்டாம். கடுமையான எலும்பு முறிவுக்கு உடனடியாக 108 அவசர ஊர்தியை அழையுங்கள்.'
  },
  {
    id: 'heart-attack',
    titleEn: 'Heart Attack Response',
    titleTa: 'மாரடைப்பு அவசர அறிகுறிகள் மற்றும் உதவி',
    iconName: 'HeartPulse',
    overviewEn: 'A heart attack occurs when blood supply to part of the heart muscle is severely blocked. Every minute counts. Immediate recognition and resting reduces permanent cardiac muscle damage.',
    overviewTa: 'இதய தசைக்கு செல்லும் ரத்த ஓட்டம் தடைபடும் போது மாரடைப்பு ஏற்படுகிறது. ஒவ்வொரு நொடியும் விலைமதிப்பற்றது. உடனடி ஓய்வும் மருத்துவ உதவியும் உயிராபத்தைத் தடுக்கும்.',
    warningSignsEn: [
      'Chest discomfort: Pressure, squeezing, fullness, or central crushing chest pain lasting more than a few minutes',
      'Pain spreading to left arm, back, neck, jaw, or upper stomach',
      'Shortness of breath, with or without chest pain',
      'Cold sweat, unexplained nausea, extreme dizziness, or sudden lightheadedness'
    ],
    warningSignsTa: [
      'மார்பில் தாங்க முடியாத பாரம், இறுக்கம், அழுத்தம் அல்லது எரியும் போன்ற வலி சில நிமிடங்களுக்கு மேல் நீடித்தல்',
      'வலி இடது கை, முதுகு, கழுத்து, தாடை அல்லது மேல் வயிற்றுப் பகுதிக்கு பரவுதல்',
      'மூச்சுத் திணறல் ஏற்படுதல்',
      'குளிர்ந்த வியர்வை கொட்டுதல், வாந்தி வருவது போன்ற உணர்வு மற்றும் திடீர் தலைசுற்றல்'
    ],
    stepsEn: [
      'Call 108 IMMEDIATELY: Do not wait to see if the pain goes away. Request an ambulance with cardiac resuscitation equipment.',
      'Place in "W" Resting Position: Sit the person on the floor, leaning back against a wall or your knees, with knees bent. This position eases pressure on the heart.',
      'Loosen tight clothing: Unbutton collar, loosen tie and belt to allow unrestricted breathing.',
      'Chew Aspirin 300mg if advised and not allergic: If the person has no aspirin allergy and has not been advised against it, have them chew a full adult Aspirin (300mg) tablet slowly.',
      'Monitor consciousness: If the person collapses and stops breathing normally, start CPR chest compressions (100 to 120 per minute in the center of the chest).'
    ],
    stepsTa: [
      'உடனடியாக 108 ஆம்புலன்ஸை அழையுங்கள்: வலி குறைகிறதா என்று காத்திருக்காதீர்கள். இதய அவசர சிகிச்சை வசதி கொண்ட ஊர்தியை வரவழையுங்கள்.',
      '"W" நிலையில் உட்கார வையுங்கள்: நோயாளியை தரையில் சுவரில் சாய்ந்து உட்கார வைத்து, முழங்கால்களை மடக்கி வைக்கவும். இது இதயத்தின் சுமையைக் குறைக்கும்.',
      'இறுக்கமான உடைகளை தளர்த்தவும்: சட்டை காலர் மற்றும் பெல்ட்டைத் தளர்த்தி சுவாசம் எளிதாக இருக்கச் செய்யுங்கள்.',
      'ஆஸ்பிரின் (300mg) மாத்திரை: நோயாளிக்கு ஆஸ்பிரின் ஒவ்வாமை இல்லை என்றால் மற்றும் மருத்துவர் தடை செய்யவில்லை என்றால் ஒரு ஆஸ்பிரின் மாத்திரையை மென்று விழுங்கச் சொல்லலாம்.',
      'சுவாசத்தைக் கண்காணியுங்கள்: நபர் சுயநினைவை இழந்து சுவாசம் நின்றால், உடனடியாக மார்பின் மையத்தில் நிமிடத்திற்கு 100 முதல் 120 முறை CPR அழுத்தத்தைத் தொடங்குங்கள்.'
    ],
    dontsEn: [
      'DO NOT allow the person to walk, drive themselves, or exert themselves in any way.',
      'DO NOT dismiss chest pain as simple indigestion or gastric gas.',
      'DO NOT give food, tea, coffee, or large drinks.',
      'DO NOT leave the person alone except to make the emergency phone call.'
    ],
    dontsTa: [
      'நோயாளியை நடக்கவோ, காரை ஓட்டவோ அல்லது எந்தவித உடல் உழைப்பில் ஈடுபடவோ அனுமதிக்காதீர்கள்.',
      'நெஞ்சு வலியை வெறும் வாயுத் தொல்லை (Gastric) என்று அலட்சியப்படுத்தாதீர்கள்.',
      'டீ, காபி அல்லது உணவு எதையும் சாப்பிடக் கொடுக்காதீர்கள்.',
      'அவசர அழைப்பு செய்வதைத் தவிர நோயாளியை தனியாக விட்டுவிட்டு எங்கும் செல்லாதீர்கள்.'
    ],
    whenToCall108En: 'Dial 108 right away. Every minute of delay causes irreversible heart muscle death. The ambulance is equipped to provide treatment en route.',
    whenToCall108Ta: 'உடனடியாக 108 அவசர எண்ணை அழையுங்கள். ஒவ்வொரு நிமிட தாமதமும் இதய தசைகளை நிரந்தரமாக சேதப்படுத்தும். ஆம்புலன்ஸில் வரும்போதே சிகிச்சை தொடங்கும்.',
    medicalSource: 'Cardiological Society of India (CSI) & American Heart Association (AHA) Emergency Guidelines',
    voiceScriptEn: 'First Aid for a Heart Attack. If someone experiences crushing chest pain, pressure radiating to the arm, jaw, or back, shortness of breath, or cold sweats, call 108 immediately. Do not delay. Sit the person down on the floor with their back supported and knees bent in the W position. Loosen any tight clothing. If not allergic, having them chew an aspirin tablet can help prevent further clotting. Keep the person calm and still. If they become unconscious and stop breathing, begin CPR chest compressions immediately.',
    voiceScriptTa: 'மாரடைப்பிற்கான அவசர முதலுதவி வழிகாட்டுதல். ஒருவருக்கு மார்பில் கடுமையான அழுத்தம் அல்லது பாரம், வலி இடது கை மற்றும் தாடைக்கு பரவுதல், மூச்சுத்திணறல், குளிர்ந்த வியர்வை போன்றவை ஏற்பட்டால் உடனடியாக 108 அவசர எண்ணை அழையுங்கள். வாயுத் தொல்லை என்று தாமதிக்காதீர்கள். நோயாளியை தரையில் சுவரில் சாய்த்து முழங்கால்களை மடக்கி ஓய்வு நிலையில் உட்கார வையுங்கள். உடைகளைத் தளர்த்துங்கள். ஒவ்வாமை இல்லை என்றால் ஆஸ்பிரின் மாத்திரையை மென்று விழுங்கச் செய்யலாம். நபர் அமைதியாக இருக்க வேண்டும். சுயநினைவு இழந்தால் உடனே CPR மார்பு அழுத்தத்தைத் தொடங்குங்கள்.'
  }
];
