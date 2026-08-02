import type { ProfileExperienceData } from '../types/profile.types';

export const mockProfileExperience: ProfileExperienceData = {
  profile: {
    id: 'profile-1',
    displayName: 'علی محمدی',
    username: '@ali.mohammadi',
    bio: 'به دنبال ایده‌های روشن، پادکست‌های عمیق و لحظه‌های یادماندنی در مسیر یادگیری.',
    verified: true,
    status: 'Voices of thoughtful listening',
    followers: 1840,
    following: 322,
    contributionLevel: 'Insightful Member',
    favoriteTopics: ['فناوری', 'روانشناسی', 'کارآفرینی', 'تاریخ'],
    joinedAt: '2023-01-15T00:00:00.000Z',
    isFollowing: false,
  },
  stats: [
    { id: 'hours', label: 'ساعت گوش دادن', value: '128h', detail: 'در مسیر یادگیری' },
    { id: 'completed', label: 'محتوای تکمیل‌شده', value: '47', detail: 'از تجربه‌های مورد علاقه' },
    { id: 'moments', label: 'لحظه‌های ذخیره‌شده', value: '21', detail: 'برای بازبینی بعدی' },
    { id: 'discussions', label: 'بحث‌های عضو شده', value: '14', detail: 'در جوامع فعال' },
    { id: 'bookmarks', label: 'نشانک‌ها', value: '89', detail: 'از یادداشت‌های ارزشمند' },
    { id: 'highlights', label: 'هایلایت‌ها', value: '36', detail: 'در مسیر شناخت' },
  ],
  memories: [
    { id: 'moment-1', title: 'لحظه‌ی یادماندنی از Atomic Habits', detail: '۱:۴۲ بعد از شروع', kind: 'moment' },
    { id: 'moment-2', title: 'هایلایت از گفتگوی AI Trends', detail: 'نکته‌ی کلیدی برای آینده', kind: 'highlight' },
    { id: 'moment-3', title: 'یادداشت شخصی درباره‌ی کارآفرینی', detail: 'برای مرور در پایان هفته', kind: 'note' },
  ],
  collections: [
    { id: 'collection-1', title: 'کتاب‌هایی که ذهنم را تغییر دادند', description: 'مجموعه‌ی یادگیری عمیق', count: 8, accent: 'from-accent/20 to-accent/5' },
    { id: 'collection-2', title: 'پادکست‌های مورد علاقه', description: 'برای گوش دادن دوباره', count: 12, accent: 'from-surface-secondary to-surface-card' },
    { id: 'collection-3', title: 'نقشه‌ی یادگیری', description: 'برنامه‌ی رشد شخصی', count: 5, accent: 'from-success/15 to-transparent' },
  ],
  activities: [
    { id: 'activity-1', label: 'لحظه‌ای از Atomic Habits ذخیره شد', value: 'امروز', detail: 'برای بازبینی بعدی' },
    { id: 'activity-2', label: 'در بحث AI Trends شرکت کرد', value: 'دیروز', detail: '۵ نظر ثبت شد' },
    { id: 'activity-3', label: 'یک پادکست جدید دنبال شد', value: '۳ روز پیش', detail: 'از یک خالق مورد علاقه' },
  ],
  contributions: [
    { id: 'contrib-1', label: 'بحث‌های شروع‌شده', description: '۳ بحث فعال و ارزشمند' },
    { id: 'contrib-2', label: 'نظرات مفید', description: '۲۴ بازخورد در جوامع' },
    { id: 'contrib-3', label: 'پاسخ‌های کمک‌کننده', description: '۱۲ واکنش مثبت از دیگران' },
  ],
  socialGroups: [
    { id: 'people', title: 'افراد', items: ['سعید', 'نازنین', 'آرمان'] },
    { id: 'creators', title: 'سازندگان', items: ['James Clear', 'Lex Fridman'] },
    { id: 'topics', title: 'موضوعات', items: ['هوش مصنوعی', 'روانشناسی', 'توسعه شخصی'] },
  ],
  interests: ['فناوری', 'روانشناسی', 'کارآفرینی', 'تاریخ', 'علوم'],
  content: [
    { id: 'content-1', title: 'اخیراً پخش شده', subtitle: 'Atomic Habits', meta: '۲۹ دقیقه' },
    { id: 'content-2', title: 'سازندگان مورد علاقه', subtitle: 'James Clear', meta: 'پادکست‌ساز' },
    { id: 'content-3', title: 'دسته‌بندی‌های محبوب', subtitle: 'توسعه شخصی', meta: '۳۲ درصد' },
  ],
  journeyCards: [
    {
      id: 'journey-1',
      title: 'در حال گوش دادن به Siren Stories',
      subtitle: 'پادکست نیمه‌تمام',
      detail: '۳۵٪ پیشرفت',
      type: 'listening',
      progress: 35,
    },
    {
      id: 'journey-2',
      title: 'سریال مستند ذهن‌سنجی',
      subtitle: 'ویدیوی بعدی در فهرست',
      detail: '۵۰٪ تکمیل‌شده',
      type: 'watching',
      progress: 50,
    },
    {
      id: 'journey-3',
      title: 'کتاب صوتی The Power of Habit',
      subtitle: 'فصل سوم در حال پخش',
      detail: '۲۱٪ پیشرفت',
      type: 'audiobook',
      progress: 21,
    },
  ],
  favorites: [
    {
      id: 'favorite-1',
      title: 'پادکست‌های مورد علاقه',
      description: 'کست‌هایی که بیشتر از همه به آن‌ها برمی‌گردی',
      meta: 'Podcasts',
      items: [
        { id: 'fav-1', title: 'Siren Stories', detail: 'پادکست داستانی', meta: '35 قسمت' },
        { id: 'fav-2', title: 'Future Minds', detail: 'هوش مصنوعی و آینده', meta: '21 قسمت' },
      ],
    },
    {
      id: 'favorite-2',
      title: 'سازندگان مورد علاقه',
      description: 'صداهایی که مسیر فکری تو را شکل داده‌اند',
      meta: 'Creators',
      items: [
        { id: 'fav-3', title: 'James Clear', detail: 'پادکست‌ساز', meta: 'Followed' },
        { id: 'fav-4', title: 'Nadia Azar', detail: 'گفتگوهای ذهن‌آگاه', meta: 'Following' },
      ],
    },
  ],
  achievements: [
    { id: 'achievement-1', title: 'اولین اپیزود کامل', subtitle: 'به یک گوش‌دهنده معتبر تبدیل شدی', detail: 'این شروع مسیر جدید است.', tag: 'Milestone' },
    { id: 'achievement-2', title: '۱۰ ساعت گوش دادن', subtitle: 'عمیق در تجربه', detail: 'گوش دادن به محتوای ارزشمند', tag: 'Journey' },
    { id: 'achievement-3', title: 'اولین نظر', subtitle: 'قدم در جامعه', detail: 'با دیدگاه خود به گفتگوها اضافه شدی', tag: 'Community' },
  ],
  libraryLinks: [
    { id: 'link-1', title: 'لیست‌های مورد علاقه', subtitle: 'پلی‌لیست‌های خودت', count: '16' },
    { id: 'link-2', title: 'تاریخچه', subtitle: 'آخرین لحظات پخش', count: '24' },
    { id: 'link-3', title: 'محتوای ذخیره‌شده', subtitle: 'مجموعه‌های شخصی', count: '12' },
    { id: 'link-4', title: 'نشانک‌ها', subtitle: 'لحظه‌های بازگشتی', count: '9' },
  ],
  creatorOverview: {
    draftCount: 3,
    publishedCount: 5,
    status: 'Ready to share your first story',
    invitation: 'یک مسیر خلاقانه جدید با صدای شخصی شما منتظر است. وارد فضای سازنده‌ی Castaminofen شو و اولین محتوای خود را تعریف کن.',
  },
  creatorDrafts: [
    { id: 'draft-1', title: 'مینی‌سری امروزهای آینده', status: 'در انتظار بازبینی' },
    { id: 'draft-2', title: 'لحظه‌های طلایی مطالعه', status: 'مستعد تبدیل به پادکست' },
  ],
  creatorPublished: [
    { id: 'published-1', title: 'شروع به یادگیری عمیق', detail: 'پادکست شخصی شما درباره‌ی عادت‌ها' },
    { id: 'published-2', title: 'صدای شهرهای آینده', detail: 'رفع موانع خلاقیت و ساخت مسیر' },
  ],
};
