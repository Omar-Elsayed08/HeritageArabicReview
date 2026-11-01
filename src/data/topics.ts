export type TopicId =
  | "prepositions"
  | "questions"
  | "pronouns"
  | "present"
  | "future"
  | "past"
  | "plurals"
  | "adjectives"
  | "present-negation"
  | "past-negation"
  | "laysa"
  | "kana"
  | "attached-pronouns"
  | "dual"
  | "noun-adjective"
  | "idaafa"
  | "nominal-sentences"
  | "nisba"
  | "subjunctive"
  | "verbal-sentences"
  | "roots-patterns"
  | "vocabulary"

export interface TopicUse {
  label: string
  arabic?: string
  note: string
}

export interface Topic {
  id: TopicId
  title: string
  arabicTitle: string
  summary: string
  instruction: string
  uses: TopicUse[]
  bank?: string[]
}

export const TOPICS: Topic[] = [
  {
    id: "prepositions",
    title: "Prepositions",
    arabicTitle: "حُرُوفُ الجَرّ",
    summary: "Pick the preposition that links the verb or noun correctly.",
    instruction: "Fill in the correct preposition.",
    bank: ["فِي", "مِنْ", "إِلَى", "عَلَى", "عَنْ", "مَعَ", "بِـ", "لِـ", "مُنْذُ"],
    uses: [
      { label: "In / At", arabic: "فِي", note: "Location or time: أَسْكُنُ فِي بُوسْطُن. Also used with سَكَنَ، عَاشَ، أَقَامَ، نَجَحَ." },
      { label: "From", arabic: "مِنْ", note: "Origin or starting point: أَنَا مِنْ سُورِيَا. Used with تَخَرَّجَ (to graduate from)." },
      { label: "To / Towards", arabic: "إِلَى", note: "Direction: ذَهَبَ إِلَى، سَافَرَ إِلَى، اِسْتَمَعَ إِلَى." },
      { label: "On / Upon", arabic: "عَلَى", note: "Physical position, and the verb تَعَرَّفَ عَلَى (to get to know)." },
      { label: "About / Away from", arabic: "عَنْ", note: "Topic of speech: تَكَلَّمَ عَنْ (to talk about)." },
      { label: "With (company)", arabic: "مَعَ", note: "Accompaniment: أَسْكُنُ مَعَ عَائِلَتِي، تَكَلَّمَ مَعَ (talk with)." },
      { label: "With / By (attached)", arabic: "بِـ", note: "Attaches to the noun: اِلْتَحَقَ بِالجَامِعَةِ، قَهْوَةٌ بِالحَلِيبِ." },
      { label: "For / Belonging to (attached)", arabic: "لِـ", note: "Attaches to the noun: هَذِهِ الهَدِيَّةُ لِأُمِّي." },
      { label: "Since / Ago", arabic: "مُنْذُ", note: "Duration that is still ongoing: أَدْرُسُ العَرَبِيَّةَ مُنْذُ سَنَتَيْنِ." },
    ],
  },
  {
    id: "questions",
    title: "Question Words",
    arabicTitle: "أَدَوَاتُ الاِسْتِفْهَام",
    summary: "Use the answer to figure out which question word was asked.",
    instruction: "Read the answer after the dash, then fill in the question word.",
    bank: ["هَلْ", "مَا", "مَاذَا", "مَنْ", "مَعَ مَنْ", "كَيْفَ", "مَتَى", "مُنْذُ مَتَى", "أَيْنَ", "مِنْ أَيْنَ", "كَمْ", "أَيّ", "لِمَاذَا"],
    uses: [
      { label: "Yes / No", arabic: "هَلْ", note: "Turns a statement into a yes/no question: هَلْ أَنْتَ طَالِبٌ؟" },
      { label: "What (+ noun)", arabic: "مَا", note: "Use before a noun: مَا اسْمُكَ؟" },
      { label: "What (+ verb)", arabic: "مَاذَا", note: "Use before a verb: مَاذَا تَدْرُسُ؟" },
      { label: "Who / With whom", arabic: "مَنْ / مَعَ مَنْ", note: "مَنْ هَذَا؟ — مَعَ مَنْ تَسْكُنُ؟" },
      { label: "How", arabic: "كَيْفَ", note: "كَيْفَ الحَالُ؟" },
      { label: "When / Since when", arabic: "مَتَى / مُنْذُ مَتَى", note: "مَتَى يَبْدَأُ الدَّرْسُ؟ — مُنْذُ مَتَى تَدْرُسُ العَرَبِيَّةَ؟" },
      { label: "Where / From where", arabic: "أَيْنَ / مِنْ أَيْنَ", note: "أَيْنَ المَكْتَبَةُ؟ — مِنْ أَيْنَ أَنْتَ؟" },
      { label: "How many", arabic: "كَمْ", note: "Followed by a singular noun with tanween fatha: كَمْ صَفًّا عِنْدَكَ؟" },
      { label: "Which", arabic: "أَيّ / أَيَّة", note: "Followed by a noun in the genitive: فِي أَيِّ جَامِعَةٍ تَدْرُسُ؟" },
      { label: "Why", arabic: "لِمَاذَا", note: "Usually answered with لِأَنَّ: لِمَاذَا تُحِبُّ العَرَبِيَّةَ؟" },
    ],
  },
  {
    id: "pronouns",
    title: "Pronoun Replacement",
    arabicTitle: "الضَّمَائِرُ المُنْفَصِلَة",
    summary: "Replace the people in the sentence with one subject pronoun.",
    instruction: "Replace the highlighted subject with the correct pronoun.",
    bank: ["أَنَا", "نَحْنُ", "أَنْتَ", "أَنْتِ", "أَنْتُمَا", "أَنْتُمْ", "أَنْتُنَّ", "هُوَ", "هِيَ", "هُمَا", "هُمْ", "هُنَّ"],
    uses: [
      { label: "1st person", arabic: "أَنَا / نَحْنُ", note: "\"Me and someone else\" always becomes نَحْنُ." },
      { label: "2nd person singular", arabic: "أَنْتَ / أَنْتِ", note: "أَنْتَ for a male, أَنْتِ for a female." },
      { label: "2nd person dual", arabic: "أَنْتُمَا", note: "Two people being addressed, male or female." },
      { label: "2nd person plural", arabic: "أَنْتُمْ / أَنْتُنَّ", note: "أَنْتُمْ for males or mixed groups, أَنْتُنَّ for all-female groups." },
      { label: "3rd person singular", arabic: "هُوَ / هِيَ", note: "هُوَ for a male (or masculine thing), هِيَ for a female." },
      { label: "3rd person dual", arabic: "هُمَا", note: "Any two people being talked about." },
      { label: "3rd person plural", arabic: "هُمْ / هُنَّ", note: "هُمْ for males or mixed groups, هُنَّ for all-female groups." },
    ],
  },
  {
    id: "present",
    title: "Present Tense",
    arabicTitle: "المُضَارِعُ المَرْفُوع",
    summary: "Conjugate the verb in parentheses into the present tense.",
    instruction: "Conjugate the verb in parentheses (given in the هُوَ form) to match the subject.",
    uses: [
      { label: "أَنَا / نَحْنُ", note: "أَـ...ُ (أَكْتُبُ) and نَـ...ُ (نَكْتُبُ)." },
      { label: "أَنْتَ / أَنْتِ", note: "تَـ...ُ (تَكْتُبُ) and تَـ...ِينَ (تَكْتُبِينَ)." },
      { label: "أَنْتُمَا / هُمَا", note: "تَـ...َانِ for أَنْتُمَا and هُمَا (f), يَـ...َانِ for هُمَا (m)." },
      { label: "أَنْتُمْ / أَنْتُنَّ", note: "تَـ...ُونَ (تَكْتُبُونَ) and تَـ...ْنَ (تَكْتُبْنَ)." },
      { label: "هُوَ / هِيَ", note: "يَـ...ُ (يَكْتُبُ) and تَـ...ُ (تَكْتُبُ)." },
      { label: "هُمْ / هُنَّ", note: "يَـ...ُونَ (يَكْتُبُونَ) and يَـ...ْنَ (يَكْتُبْنَ)." },
      { label: "Word order", note: "When the subject comes first (الطُّلَّابُ يَذْهَبُونَ), the verb agrees in number too." },
    ],
  },
  {
    id: "future",
    title: "Future Tense",
    arabicTitle: "المُسْتَقْبَل",
    summary: "Use سَـ or سَوْفَ with the present-tense verb to talk about the future.",
    instruction: "Conjugate the verb for the subject and add سَـ or سَوْفَ.",
    uses: [
      { label: "Near/flexible future", arabic: "سَـ + المُضَارِع", note: "Attach سَـ to the present verb: سَأَذْهَبُ (I will go), سَيَذْهَبُونَ (they will go)." },
      { label: "Future", arabic: "سَوْفَ + المُضَارِع", note: "سَوْفَ comes before a present-tense verb: سَوْفَ نَدْرُسُ (we will study). The verb keeps its present-tense endings." },
    ],
  },
  {
    id: "past",
    title: "Past Tense",
    arabicTitle: "المَاضِي",
    summary: "Conjugate the verb in parentheses into the past tense.",
    instruction: "Conjugate the verb in parentheses (given in the هُوَ form) to match the subject.",
    uses: [
      { label: "أَنَا / نَحْنُ", note: "...ْتُ (كَتَبْتُ) and ...ْنَا (كَتَبْنَا)." },
      { label: "أَنْتَ / أَنْتِ", note: "...ْتَ (كَتَبْتَ) and ...ْتِ (كَتَبْتِ)." },
      { label: "أَنْتُمَا", note: "...ْتُمَا (كَتَبْتُمَا)." },
      { label: "أَنْتُمْ / أَنْتُنَّ", note: "...ْتُمْ (كَتَبْتُمْ) and ...ْتُنَّ (كَتَبْتُنَّ)." },
      { label: "هُوَ / هِيَ", note: "Base form (كَتَبَ) and ...َتْ (كَتَبَتْ)." },
      { label: "هُمَا", note: "...َا for masculine (كَتَبَا), ...َتَا for feminine (كَتَبَتَا)." },
      { label: "هُمْ / هُنَّ", note: "...ُوا (كَتَبُوا — note the silent alif) and ...ْنَ (كَتَبْنَ)." },
    ],
  },
  {
    id: "plurals",
    title: "Plurals",
    arabicTitle: "الجَمْع",
    summary: "Write the plural of the noun in parentheses.",
    instruction: "Write the plural form of the noun in parentheses.",
    uses: [
      { label: "Sound feminine plural", arabic: "ـَات", note: "طَالِبَة ← طَالِبَات، كَلِمَة ← كَلِمَات، سَنَة ← سَنَوَات." },
      { label: "Broken plurals", note: "Change the internal pattern of the word: وَلَد ← أَوْلَاد، بَيْت ← بُيُوت، مَدِينَة ← مُدُن." },
      { label: "Pattern أَفْعَال", note: "وَلَد ← أَوْلَاد، يَوْم ← أَيَّام." },
      { label: "Pattern أَفْعِلَاء", note: "صَدِيق ← أَصْدِقَاء." },
      { label: "Pattern فُعَّال", note: "طَالِب ← طُلَّاب." },
      { label: "Pattern مَفَاعِل / أَفَاعِيل", note: "مَطْعَم ← مَطَاعِم، أُسْبُوع ← أَسَابِيع." },
      { label: "Numbers 3–10", note: "Followed by a plural noun: ثَلَاثَةُ إِخْوَةٍ، سَبْعَةُ أَيَّامٍ." },
    ],
  },
  {
    id: "adjectives",
    title: "Adjectives & Adverbs",
    arabicTitle: "الصِّفَاتُ وَالظُّرُوف",
    summary: "Choose the adjective or adverb that fits the meaning.",
    instruction: "Fill in the adjective or adverb that fits. Make adjectives agree in gender.",
    bank: ["عَازِب", "مُتَزَوِّج", "نَاجِح", "فَاشِل", "قَرِيب", "بَعِيد", "صَغِير", "جَدِيد", "جَيِّد", "دَائِمًا", "أَحْيَانًا", "أَمْسِ", "قَرِيبًا"],
    uses: [
      { label: "Agreement", note: "Adjectives follow the noun and agree in gender: أَخِي صَغِيرٌ / أُخْتِي صَغِيرَةٌ." },
      { label: "Opposites", note: "عَازِب ↔ مُتَزَوِّج، نَاجِح ↔ فَاشِل، قَرِيب ↔ بَعِيد." },
      { label: "قَرِيب مِنْ / بَعِيد عَنْ", note: "قَرِيب takes مِنْ, بَعِيد takes عَنْ." },
      { label: "Frequency adverbs", arabic: "دَائِمًا / أَحْيَانًا", note: "دَائِمًا = always, أَحْيَانًا = sometimes." },
      { label: "Time adverbs", arabic: "أَمْسِ / قَرِيبًا", note: "أَمْسِ goes with past verbs, قَرِيبًا with future (سَـ / سَوْفَ)." },
    ],
  },
  {
    id: "present-negation",
    title: "Negating the Present",
    arabicTitle: "نَفْيُ المُضَارِع",
    summary: "Use لَا to negate a present-tense verb.",
    instruction: "Complete the sentence with the present-tense verb negated by لَا.",
    uses: [
      { label: "Present negation", arabic: "لَا + المُضَارِع", note: "Place لَا before a present-tense verb: لَا أُحِبُّ اللَّحْمَ (I do not like meat)." },
    ],
  },
  {
    id: "past-negation",
    title: "Negating the Past",
    arabicTitle: "نَفْيُ المَاضِي",
    summary: "Use مَا before a past-tense verb to say something did not happen.",
    instruction: "Complete the sentence with مَا and the past-tense verb.",
    uses: [
      { label: "Past negation", arabic: "مَا + المَاضِي", note: "مَا comes before the past-tense verb: مَا نَجَحْتُ فِي الاِمْتِحَانِ (I did not pass the exam)." },
    ],
  },
  {
    id: "laysa",
    title: "لَيْسَ (Present ‘not’)",
    arabicTitle: "لَيْسَ",
    summary: "Negate a noun, adjective, or prepositional predicate in a nominal sentence.",
    instruction: "Conjugate لَيْسَ to agree with the subject. Its meaning is present time.",
    uses: [
      { label: "Nominal sentence", arabic: "لَيْسَ + subject + predicate", note: "لَيْسَ is a past-form verb with present meaning. The middle vowel drops with first and second person forms; third person forms generally retain it, except هُنَّ لَسْنَ." },
      { label: "Predicate", note: "Use لَيْسَ with a noun, adjective, or prepositional phrase: لَسْتُ طَالِبًا، لَيْسَ فِي البَيْتِ." },
    ],
  },
  {
    id: "kana",
    title: "كَانَ (Was / Used to)",
    arabicTitle: "كَانَ وَأَخَوَاتُهَا",
    summary: "Use كان with a predicate to describe a past state or ongoing past action.",
    instruction: "Conjugate كَانَ to match the subject; use a noun/adjective predicate for ‘was’ or a present verb for ‘was doing/used to.’",
    uses: [
      { label: "State in the past", arabic: "كَانَ + predicate", note: "With a noun, adjective, or prepositional phrase, كان means was/were: كَانَ الطَّالِبُ مُجْتَهِدًا." },
      { label: "Ongoing past", arabic: "كَانَ + المُضَارِعُ المَرْفُوع", note: "With a present-tense verb, كان can mean was doing or used to do: كُنْتُ أَدْرُسُ (I was studying / used to study)." },
      { label: "Conjugation", note: "The middle ألف drops in first- and second-person forms and with هُنَّ; it remains in most third-person forms." },
    ],
  },
  {
    id: "attached-pronouns",
    title: "Attached Pronouns",
    arabicTitle: "الضَّمَائِرُ المُتَّصِلَة",
    summary: "Identify attached pronouns as possessors, verb objects, or complements of prepositions.",
    instruction: "Complete the word with the attached pronoun shown by the English meaning.",
    uses: [
      { label: "Attached to a noun", note: "An attached pronoun on a noun shows possession: كِتَابِي (my book), كِتَابُهَا (her book)." },
      { label: "Attached to a verb", note: "An attached pronoun on a verb is its object: رَآنِي (he saw me), سَاعَدَهُمْ (he helped them)." },
      { label: "After prepositions", note: "Pronouns also attach to prepositions and words of possession: مَعَهُ، فِيهَا، عِنْدِي، لَهُمْ." },
    ],
  },
  {
    id: "dual", title: "Dual Forms", arabicTitle: "المُثَنَّى",
    summary: "Form dual nouns and match verbs and adjectives to two people or things.",
    instruction: "Complete the sentence with the correct dual form.",
    uses: [{ label: "Nouns", arabic: "ـانِ / ـيْنِ", note: "The dual nominative typically ends in ـانِ; after a preposition or as an object it ends in ـيْنِ." }, { label: "Verbs", arabic: "ـَانِ / ـتَانِ", note: "Dual subjects take a dual verb when placed before the verb: الطَّالِبَانِ يَدْرُسَانِ." }],
  },
  {
    id: "noun-adjective", title: "Noun–Adjective Agreement", arabicTitle: "النَّعْتُ وَالمَنْعُوت",
    summary: "Make adjectives agree with nouns in gender, number, and definiteness.",
    instruction: "Choose or form the adjective that agrees with the noun.",
    uses: [{ label: "Agreement", note: "A descriptive adjective follows its noun and agrees in gender, number, and definiteness." }, { label: "Nonhuman plural", note: "Nonhuman plural nouns usually take a feminine singular adjective: كُتُبٌ جَدِيدَةٌ." }],
  },
  {
    id: "idaafa", title: "Possessive Phrases (إضافة)", arabicTitle: "الإِضَافَة",
    summary: "Connect two nouns to express possession or a noun-noun relationship.",
    instruction: "Complete the possessive phrase with the second noun or attached pronoun.",
    uses: [{ label: "Noun + noun", arabic: "مُضَاف + مُضَاف إِلَيْهِ", note: "The first noun has no ال and no tanween; the final noun carries definiteness: بَيْتُ الطُّلَّابِ (the students’ house)." }, { label: "Possessive suffix", note: "A suffix can replace the final noun: بَيْتِي (my house), بَيْتُهَا (her house)." }],
  },
  {
    id: "nominal-sentences", title: "Nominal Sentences", arabicTitle: "الجُمْلَةُ الاِسْمِيَّة",
    summary: "Build complete sentences with a subject and a predicate.",
    instruction: "Complete the nominal sentence with the appropriate subject or predicate.",
    uses: [{ label: "Structure", arabic: "مُبْتَدَأ + خَبَر", note: "A nominal sentence starts with a noun or pronoun and gives information about it: أُخْتِي طَالِبَةٌ." }, { label: "Phrase or sentence", note: "Arabic noun-adjective and possessive constructions are phrases; a nominal sentence makes a complete statement." }],
  },
  {
    id: "nisba", title: "Nisba Adjectives", arabicTitle: "يَاءُ النِّسْبَة",
    summary: "Make adjectives for nationality, language, or affiliation from nouns.",
    instruction: "Choose the nisba adjective that agrees with the person described.",
    uses: [{ label: "Formation", arabic: "ـِيّ / ـِيَّة", note: "Add يّ to form a masculine nisba adjective and يّة for feminine: مِصْر ← مِصْرِيّ / مِصْرِيَّة." }],
  },
  {
    id: "subjunctive", title: "Subjunctive Present", arabicTitle: "المُضَارِعُ المَنْصُوب",
    summary: "Use the subjunctive after أنْ, لِـ, كَيْ, and related expressions.",
    instruction: "Conjugate the present verb in the subjunctive after the trigger phrase.",
    uses: [{ label: "Common triggers", arabic: "أَنْ، لِـ، كَيْ، لِكَيْ", note: "These are followed by the subjunctive: أُرِيدُ أَنْ أَدْرُسَ." }, { label: "Endings", note: "Sound singular verbs take fatḥa; dual and masculine plural verbs drop ن; feminine plural keeps نَ." }],
  },
  {
    id: "verbal-sentences", title: "Verbal Sentences", arabicTitle: "الجُمْلَةُ الفِعْلِيَّة",
    summary: "Recognize verb-first sentences and match verb agreement to word order.",
    instruction: "Complete the verb-first sentence with the form that follows Arabic agreement.",
    uses: [{ label: "Verb first", arabic: "فِعْل + فَاعِل", note: "When a verb comes before a plural subject, it commonly stays singular: يَدْرُسُ الطُّلَّابُ." }, { label: "Subject first", note: "When the plural subject comes first, the verb agrees in number: الطُّلَّابُ يَدْرُسُونَ." }],
  },
  {
    id: "roots-patterns", title: "Roots & Patterns", arabicTitle: "الجِذْرُ وَالوَزْن",
    summary: "Connect related Arabic words through shared roots and patterns.",
    instruction: "Identify the word that shares the root or pattern described.",
    uses: [{ label: "Root", note: "Many Arabic words share a consonant root that carries a core meaning, such as د-ر-س in دَرَسَ، دِرَاسَة، مَدْرَسَة." }, { label: "Pattern", note: "A word pattern adds a common meaning to the root, such as مَفْعَل for a place: مَدْرَسَة." }],
  },
  {
    id: "vocabulary", title: "Vocabulary (Multiple Choice)", arabicTitle: "المُفْرَدَات",
    summary: "Review the vocabulary lists from all five handouts in one multiple-choice unit.",
    instruction: "Choose the English meaning of the Arabic word or phrase.",
    uses: [{ label: "Study tip", note: "The unit combines listed vocabulary from the family, daily activities, and Quiz 2 review materials." }],
  },
]

export const TOPIC_MAP: Record<TopicId, Topic> = Object.fromEntries(
  TOPICS.map((t) => [t.id, t]),
) as Record<TopicId, Topic>
