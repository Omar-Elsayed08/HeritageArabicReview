import type { Question } from "./questions"

/** Vocabulary entries transcribed from the organized word lists in the supplied handouts. */
const entries = `
صديق|friend
صديقة|female friend
أصدقاء|friends
صديقات|female friends
رفيق|companion
صاحب|friend; companion
زميل|classmate; colleague
زميلة|female classmate; colleague
زملاء|male or mixed classmates; colleagues
زميلات|female classmates; colleagues
طفولة|childhood
ولد|boy; son
أولاد|boys; children
بنت|girl; daughter
بنات|girls; daughters
والد|father
والدة|mother
أب|father
أم|mother
أخ|brother
إخوة|brothers; siblings
أخوان|two brothers
أخت|sister
أخوات|sisters
خال|maternal uncle
أخوال|maternal uncles
خالة|maternal aunt
خالات|maternal aunts
ابن|son
أبناء|sons; children
ابنة|daughter
أسرة|immediate family
أسر|families
عائلة|family
عائلات|families
فرد|individual; member
أفراد|individuals; members
رجل|man
رجال|men
امرأة|woman
نساء|women
زوج|husband
زوجة|wife
صهر|in-law
حفيد|grandson
أقارب|relatives
ناس|people
إنسان|human being
مستوى|level
مدرسة|school
مدرسة ابتدائية|elementary school
مدرسة إعدادية|middle school
مدرسة ثانوية|high school
ثانوية عامة|high school diploma
جامعة|university
كلية|college; school
معهد|institute
مركز|center
قسم|department
صف|classroom; class
صفوف|classes
درس|lesson
دروس|lessons
محاضرة|lecture
محاضرات|lectures; seminars
واجب|assignment; homework
واجبات|assignments; homework
مادة|course; subject
امتحان|exam
رسوم الدراسة|tuition; school fees
دراسة|study; studies
دراسات الشرق الأوسط|Middle Eastern studies
تاريخ|history
اقتصاد|economics
علوم سياسية|political science
أدب|literature
فلسفة|philosophy
لغة|language
اللغة العربية|Arabic language
موسيقى|music
فصل دراسي|academic term; semester
برنامج|program; schedule
برامج|programs
قائمة|list
قوائم|lists
فرصة|opportunity
فرص|opportunities
مهنة|profession
وظيفة|job; position
وظائف|jobs; positions
عمل|work; job
شغل|work; job
منحة|scholarship; grant
مهاجر|immigrant
مواطن|citizen
جنسية|nationality
جنس|gender
عنوان|address
شارع|street
شوارع|streets
منطقة|area; neighborhood
مناطق|areas; neighborhoods
مدينة|city
مدن|cities
بلد|country
بلدان|countries
بلاد|lands; countries
بيت|house; home
بيوت|houses; homes
منزل|house; home
منازل|houses; homes
شقة|apartment
شقق|apartments
دار|home; house
دور|homes; houses
بنك|bank
شركة|company
مكتبة|library
مطبخ|kitchen
سرير|bed
مسبح|swimming pool
مطار|airport
سيارة|car
سيارات|cars
قطار|train
قطارات|trains
طائرة|airplane
طائرات|airplanes
باص|bus
مترو|subway
حافلة|bus
مفتاح|key
كتاب|book
دفتر|notebook
كلمة|word
كلمات|words
باب|door
تليفون|telephone; phone
خضار|vegetables
فاكهة|fruit
فاكهة|fruit
فيلم|movie
سينما|cinema; movie theater
نشاط|activity
نشاطات|activities
هواية|hobby
هوايات|hobbies
تصوير|photography
رياضة|sports
كرة السلة|basketball
سباحة|swimming
جري|running
غناء|singing
عزف|playing a musical instrument
آلة موسيقية|musical instrument
أغنية|song
أغاني|songs
يوم|day
أيام|days
أسبوع|week
أسابيع|weeks
شهر|month
سنة|year
سنوات|years
عام|year
أعوام|years
عمر|age
صباح|morning
مساء|evening
ليل|night
ليلة|night
نهار|daytime
فجر|dawn
ربيع|spring
صيف|summer
خريف|autumn; fall
شتاء|winter
أحد|Sunday
اثنين|Monday
ثلاثاء|Tuesday
أربعاء|Wednesday
خميس|Thursday
جمعة|Friday
سبت|Saturday
ساعة|hour; clock
دقيقة|minute
اليوم|today
الليلة|tonight
غداً|tomorrow
أمس|yesterday
بعد غد|the day after tomorrow
الآن|now
حينما|when; while
عندما|when
لمّا|when
حيث|where; wherein
خلال|during
أثناء|during
طوال|throughout
منذ|since; ago
أحياناً|sometimes
من حين لآخر|from time to time
غالباً|often; usually
دائماً|always
عادةً|usually
كالعادة|as usual
باكراً|early
متأخراً|late
بسرعة|quickly
تقريباً|approximately; almost
على الأقل|at least
إلا|except
فقط|only
أخيراً|finally
في نهاية الأسبوع|on the weekend
عطلة|vacation; break
إجازة|vacation; leave
نهاية الأسبوع|weekend
بعد ذلك|after that
ثم|then
قبل ذلك|before that
اليوم التالي|the following day
الأسبوع الماضي|last week
الأسبوع القادم|next week
في الصباح|in the morning
في المساء|in the evening
ليلاً|at night
ظهراً|at noon
عصراً|in the afternoon
غداء|lunch
فطور|breakfast
عشاء|dinner
نوم|sleep
استيقاظ|waking up
حمام|bath; bathroom
ملابس|clothes
عم|paternal uncle
أعمام|paternal uncles
جد|grandfather
أجداد|grandfathers; ancestors
جدة|grandmother
جدات|grandmothers
أحفاد|grandchildren
طفل|child
أطفال|children
تلميذ|pupil
تلاميذ|pupils
تعليم|education
ذكر|male
أنثى|female
حضانة|preschool; nursery
مركز علمي|science center
مدرسة عامة|public school
ثقافة|culture
واحدة|one o’clock; one
الثانية|two o’clock; second
الثالثة|three o’clock; third
الرابعة|four o’clock; fourth
الخامسة|five o’clock; fifth
السادسة|six o’clock; sixth
السابعة|seven o’clock; seventh
الثامنة|eight o’clock; eighth
التاسعة|nine o’clock; ninth
العاشرة|ten o’clock; tenth
الحادية عشرة|eleven o’clock
الثانية عشرة|twelve o’clock
ظهراً|at noon
فجراً|at dawn
الظهر|noon
الصباح|morning
المساء|evening
الليل|night
النهار|daytime
كتب|write (past)
يكتب|write (present)
حفظ|memorize; preserve (past)
يحفظ|memorize; preserve (present)
نجح|succeed; pass (past)
ينجح|succeed; pass (present)
تخرج|graduate (past)
يتخرج|graduate (present)
التحق|join; enroll (past)
يلتحق|join; enroll (present)
سافر|travel (past)
يسافر|travel (present)
شاهد|watch (past)
يشاهد|watch (present)
استمع|listen (past)
يستمع|listen (present)
عرف|know (past)
يعرف|know (present)
عاش|live (past)
يعيش|live (present)
أقام|reside (past)
يقيم|reside (present)
ولد|be born (past)
كبر|grow up (past)
قضى|spend (past)
اختار|choose (past)
مستويات|levels
شهادة|certificate; degree
شهادات|certificates; degrees
دبلوم|diploma
دبلومات|diplomas
تعليم عالٍ|higher education
ماجستير|master’s degree
دكتوراه|doctoral degree; PhD
علوم إنسانية|humanities
علوم اجتماعية|social sciences
علوم|science; sciences
فن|art
فنون|arts
كلية الحقوق|law school
سيرة ذاتية|résumé; biography
ولاية|state; province
ولايات|states; provinces
دولة|state; country
دول|states; countries
مدرسة حكومية|public school
مدرسة دولية|international school
شمال أفريقيا|North Africa
الأهل|family; relatives
والداي|my parents
أكبر|older; biggest
كبار|adults; big ones
حياة|life
حي|neighborhood
ترجمة|translation
مترجم|translator
مترجمون|translators
موظف|employee
موظفون|employees
قبول|acceptance; admission
وقت|time
وقت قصير|a short time
مدة|duration; period
ربع|quarter
نصف|half
عشرون دقيقة|twenty minutes
الأولى|first
التسوق|shopping
شراء|buying; purchase
خضروات|vegetables
فواكه|fruit
نشاط عائلي|family activity
الفصل الدراسي|academic term; semester
بعض|some
إحدى|one (feminine)
أخرى|another (feminine)
آخر|another; last
تعب|tiredness; fatigue
للأسف|unfortunately
إلى|to; toward
من|from
في|in; at
على|on; at least (in expressions)
عن|about; away from
مع|with
لـ|for; to
بـ|with; by
عند|at; have (with)
أين|where
من أين|from where
إلى أين|to where
متى|when
منذ متى|since when
ما|what (before a noun)
ماذا|what (before a verb)
من|who
مع من|with whom
كيف|how
كم|how many; how much
أي|which
لماذا|why
هل|yes/no question marker
لغة إنجليزية|English language
لغة فرنسية|French language
لغة إيطالية|Italian language
هندسة|engineering
فيزياء|physics
رياضة|sport; athletics
رقص|dancing
عزف على|play (an instrument)
رسالة|letter; message
رسالة جامعية|university degree
قضية|case; issue
طبيب|doctor
مهندس|engineer
شاعر|poet
أديب|writer; literary figure
أستاذ جامعي|university professor
فنان|artist
صورة|picture; photograph
صور|pictures; photographs
من مواليد|born in
قضى طفولته|spend one’s childhood
قدم|introduce; present
قابل|meet
تراسل|correspond; exchange letters
فكر بـ|think about
انقطع|stop; be interrupted
طلب|ask for; request
ربما|perhaps
تراث|heritage
أصل|origin
العالم العربي|the Arab world
الشرق الأوسط|the Middle East
المشرق|the Levant; eastern Arab world
المغرب|the Maghreb; western Arab world
عربي|Arab; Arabic (masculine)
عربية|Arab; Arabic (feminine)
أمريكي|American (masculine)
أمريكية|American (feminine)
إنجليزي|English; Englishman (masculine)
إنجليزية|English; Englishwoman (feminine)
سوري|Syrian (masculine)
سورية|Syrian (feminine)
لبناني|Lebanese (masculine)
لبنانية|Lebanese (feminine)
مصري|Egyptian (masculine)
مصرية|Egyptian (feminine)
مغربي|Moroccan (masculine)
مغربية|Moroccan (feminine)
أردني|Jordanian (masculine)
أردنية|Jordanian (feminine)
فلسطيني|Palestinian (masculine)
فلسطينية|Palestinian (feminine)
جزائري|Algerian (masculine)
جزائرية|Algerian (feminine)
إماراتي|Emirati (masculine)
إماراتية|Emirati (feminine)
كبير|big; large
كبيرة|big; large (feminine)
صغير|small; young
صغيرة|small; young (feminine)
طويل|tall; long
طويلة|tall; long (feminine)
قصير|short
قصيرة|short (feminine)
جميل|beautiful; nice
جميلة|beautiful; nice (feminine)
قبيح|ugly
قبيحة|ugly (feminine)
لطيف|kind; nice
لطيفة|kind; nice (feminine)
لئيم|mean; rude
ذكي|smart; intelligent
ذكية|smart; intelligent (feminine)
غبي|stupid
غبية|stupid (feminine)
سهل|easy
صعب|difficult
جيد|good
جديد|new
قريب|near; close
بعيد|far
عازب|single (masculine)
عزباء|single (feminine)
متزوج|married (masculine)
متزوجة|married (feminine)
مطلق|divorced (masculine)
مطلقة|divorced (feminine)
ناجح|successful
ناجحة|successful (feminine)
فاشل|unsuccessful; failing
فاشلة|unsuccessful; failing (feminine)
ممتاز|excellent
ممتازة|excellent (feminine)
ممتع|enjoyable
ممتعة|enjoyable (feminine)
ممل|boring
مملة|boring (feminine)
متنوع|diverse; varied
متنوعة|diverse; varied (feminine)
مختلف|different
مختلفة|different (feminine)
مشغول|busy (masculine)
مشغولة|busy (feminine)
متخصص|specialized; majoring (masculine)
متخصصة|specialized; majoring (feminine)
وحيد|alone; only (masculine)
وحيدة|alone; only (feminine)
هادئ|quiet
مزدحم|crowded
مريح|comfortable
موسيقي|musical
صحيح|correct
فعلاً|really; indeed
أيضاً|also
كذلك|as well
هنا|here
هناك|there
نفس|same
لأن|because
لكن|but
لذلك|therefore; so
بالإضافة إلى|in addition to
هكذا|like this; thus
أو|or
أما ... فـ|as for ... then
من أصل|originally from
قريباً من|near to
بعيداً عن|far from
يتكون من|consist of
حصل على|obtain; get
تخرج من|graduate from
التحق بـ|join; enroll in
تخصص في|major in; specialize in
استمتع بـ|enjoy
انشغل بـ|be busy with
شعر بـ|feel
احتاج إلى|need
استطاع|be able to
قدر على|be able to
غادر|leave; depart
انتظر|wait for
ركب|ride; take (transport)
جلس|sit
رتب|organize; tidy
طبخ|cook
سهر|stay up late
نام|sleep
صحا|wake up
استيقظ|wake up
غسل|wash
تحمم|take a shower; bathe
نظف|clean
لبس|wear; put on
تناول|eat; have (a meal)
أفطر|eat breakfast
تغدى|eat lunch
تعشى|eat dinner
عاد|return; come back
رجع|return; go back
بدأ|begin; start
انتهى من|finish
أحب|like; love
أراد|want
رفض|refuse
يمكن|be possible; can
فعل|do
لعب|play
حضر|prepare
شاهد|watch; see
رأى|see
ساعد|help
عرف|know
قال|say
ترجم|translate
قبل|accept
ولد|be born
كبر|grow up
قضى|spend (time)
نشأ|grow up; be raised
انتقل إلى|move to
هاجر|emigrate
رحل|leave; depart
اختار|choose
مر|pass; go by
تزوج|marry
طلق|divorce
عمل|work
اشتغل|work
درس|study
تكلم|speak; talk
تحدث مع|talk with
سكن في|live in
عاش في|live in
أقام في|reside in
ذهب إلى|go to
سافر إلى|travel to
استمع إلى|listen to
تعرف على|get to know
تعلم|learn
يذاكر|review; study
يفطر|eat breakfast
يستمتع بـ|enjoy
ينشغل بـ|be busy with
يحتاج إلى|need
يشعر بـ|feel
يستطيع|be able to
يصحو|wake up
يستيقظ|wake up
يغسل|wash
يتحمم|take a shower; bathe
ينظف|clean
يلبس|wear; put on
يتناول|eat; have (a meal)
يغادر|leave; depart
ينتظر|wait for
يركب|ride; take (transport)
يتغدى|eat lunch
يرجع|return; go back
يعود|return; come back
يجلس|sit
يرتب|organize; tidy
يطبخ|cook
يتعشى|eat dinner
يسهر|stay up late
ينام|sleep
يعمل|work
يشتغل|work
يدرس|study
يتكلم|speak; talk
يتحدث مع|talk with
يسكن|live
يعيش|live
يقيم|reside
يذهب إلى|go to
يسافر إلى|travel to
يستمع إلى|listen to
يتعرف على|get to know
يتعلم|learn
يحصل على|obtain; get
يتخرج من|graduate from
يلتحق بـ|join; enroll in
يتخصص في|major in; specialize in
يترجم|translate
يقبل|accept
يريد|want
يحب|like; love
يرفض|refuse
يشاهد|watch; see
يرى|see
يساعد|help
يعرف|know
يقول|say
يفعل|do
يلعب|play
يحضر|prepare
يبدأ|begin; start
ينتهي من|finish
ينشأ|grow up; be raised
ينتقل إلى|move to
يهاجر|emigrate
يختار|choose
يقضي|spend (time)
يتزوج|marry
يطلق|divorce
يصف|describe
يزور|visit
يخرج|go out
يشتري|buy
يمشي|walk
يستمع|listen
يبحث عن|look for
`.trim()

const groupedEntries = new Map<string, Set<string>>()
for (const line of entries.split("\n")) {
  const separator = line.indexOf("|")
  const arabic = line.slice(0, separator)
  const english = line.slice(separator + 1)
  const translations = groupedEntries.get(arabic) ?? new Set<string>()
  translations.add(english)
  groupedEntries.set(arabic, translations)
}
const allEntries = Array.from(groupedEntries, ([arabic, translations]) => ({
  arabic,
  english: Array.from(translations).join("; "),
}))

function choicesFor(index: number, answer: string): string[] {
  const choices = [answer]
  for (let offset = 1; choices.length < 4 && offset < allEntries.length; offset++) {
    const candidate = allEntries[(index + offset * 37) % allEntries.length].english
    if (!choices.includes(candidate)) choices.push(candidate)
  }
  return choices.sort((a, b) => a.localeCompare(b))
}

export const VOCABULARY_QUESTIONS: Question[] = allEntries.map(({ arabic, english }, index) => ({
  id: `vocabulary-${index + 1}`,
  topic: "vocabulary",
  sentence: "___",
  answers: [english],
  choices: choicesFor(index, english),
  cue: arabic,
  english: `${arabic} means “${english}.”`,
  explanation: `The meaning of ${arabic} is “${english}.”`,
}))
