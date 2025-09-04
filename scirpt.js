
class ElonWealthGame {
    constructor() {
        this.state = {
            wealth: 440000000000, // $440B - Elon's actual wealth
            incomePerSec: 0,
            expensePerSec: 0,
            reputation: 50,
            innovation: 50,
            happiness: 50,
            carbon: 0,
            influence: 0,
            research: 0,
            knowledge: 0,
            ownedItems: {},
            activeProjects: [],
            completedProjects: [],
            unlockedCategories: ['luxury', 'tech', 'space', 'investment'],
            achievements: [],
            milestones: [],
            multipliers: {
                income: 1,
                reputation: 1,
                innovation: 1,
                research: 1
            },
            gameStats: {
                totalSpent: 0,
                timeElapsed: 0,
                biggestPurchase: 0,
                eventsTriggered: 0
            }
        };

        this.data = this.initializeData();
        this.currentTab = 'luxury';
        this.lastUpdate = Date.now();
        this.eventChance = 0.003;
        this.achievements = this.initAchievements();
        this.milestones = this.initMilestones();

        this.init();
    }

    initializeData() {
        return {
            luxury: [
                {
                    id: 'hypercar_collection',
                    name: 'مجموعة السيارات الخارقة',
                    description: 'مجموعة من أندر السيارات في العالم - لامبورغيني، مكلارين، بوجاتي شيرون',
                    icon: '🏎️',
                    baseCost: 5000000,
                    scaling: { alpha: 0.12, beta: 1.1 },
                    effects: { reputation: 3, carbon: 8, influence: 1 },
                    limit: 50,
                    upkeep: 75000
                },
                {
                    id: 'diamond_watch_collection',
                    name: 'مجموعة ساعات الماس النادرة',
                    description: 'ساعات بتيك فيليب وريتشارد ميل مرصعة بالماس الخالص',
                    icon: '⌚',
                    baseCost: 25000000,
                    scaling: { alpha: 0.15, beta: 1.2 },
                    effects: { reputation: 8, influence: 3, happiness: 5 },
                    limit: 30,
                    upkeep: 200000
                },
                {
                    id: 'private_chef_army',
                    name: 'جيش الطهاة العالميين',
                    description: 'أفضل الطهاة من جميع أنحاء العالم لخدمتك الشخصية',
                    icon: '👨‍🍳',
                    baseCost: 15000000,
                    scaling: { alpha: 0.18, beta: 1.15 },
                    effects: { happiness: 12, reputation: 6, influence: 2 },
                    limit: 25,
                    upkeep: 500000
                },
                {
                    id: 'gold_helicopter_fleet',
                    name: 'أسطول الهليكوبتر الذهبي',
                    description: 'هليكوبترات مطلية بالذهب الخالص للتنقل الفاخر',
                    icon: '🚁',
                    baseCost: 80000000,
                    scaling: { alpha: 0.20, beta: 1.25 },
                    effects: { reputation: 15, influence: 8, carbon: 25 },
                    limit: 15,
                    upkeep: 2000000
                },
                {
                    id: 'underwater_palace',
                    name: 'قصر تحت الماء',
                    description: 'قصر مذهل تحت المحيط مع نوافذ زجاجية عملاقة ومختبر بحري',
                    icon: '🏰',
                    baseCost: 1500000000,
                    scaling: { alpha: 0.30, beta: 1.4 },
                    effects: { reputation: 35, happiness: 25, innovation: 15, influence: 12 },
                    limit: 3,
                    upkeep: 10000000
                },
                {
                    id: 'mega_yacht',
                    name: 'يخت عملاق مخصص',
                    description: 'يخت بطول 200 متر مع مهبط هليكوبتر وغواصة شخصية ومختبر أبحاث',
                    icon: '🛥️',
                    baseCost: 500000000,
                    scaling: { alpha: 0.15, beta: 1.2 },
                    effects: { reputation: 12, happiness: 8, carbon: 35, influence: 3 },
                    limit: 5,
                    upkeep: 5000000
                },
                {
                    id: 'penthouse_collection',
                    name: 'مجموعة البنتهاوس العالمية',
                    description: 'بنتهاوس في أهم مدن العالم - نيويورك، لندن، طوكيو، دبي، سنغافورة',
                    icon: '🏙️',
                    baseCost: 100000000,
                    scaling: { alpha: 0.10, beta: 1.3 },
                    effects: { reputation: 8, happiness: 6, influence: 2 },
                    limit: 20,
                    upkeep: 1000000
                },
                {
                    id: 'private_jet_fleet',
                    name: 'أسطول طائرات خاصة',
                    description: 'طائرات بوينغ وإيرباص مخصصة بالكامل مع جناح خاص',
                    icon: '✈️',
                    baseCost: 300000000,
                    scaling: { alpha: 0.18, beta: 1.15 },
                    effects: { reputation: 10, innovation: 2, carbon: 45, influence: 4 },
                    limit: 15,
                    upkeep: 3000000
                },
                {
                    id: 'art_masterpieces',
                    name: 'تحف فنية نادرة',
                    description: 'لوحات دافنشي، بيكاسو، ومنحوتات عصر النهضة',
                    icon: '🎨',
                    baseCost: 150000000,
                    scaling: { alpha: 0.20, beta: 1.4 },
                    effects: { reputation: 15, happiness: 10, influence: 5 },
                    limit: 25,
                    upkeep: 500000
                },
                {
                    id: 'private_island',
                    name: 'جزيرة خاصة',
                    description: 'جزيرة استوائية كاملة مع منتجع فاخر ومطار خاص',
                    icon: '🏝️',
                    baseCost: 2000000000,
                    scaling: { alpha: 0.25, beta: 1.5 },
                    effects: { reputation: 25, happiness: 20, influence: 10, carbon: -10 },
                    limit: 3,
                    upkeep: 8000000
                },
                {
                    id: 'luxury_train',
                    name: 'قطار شخصي فاخر',
                    description: 'قطار فاخر مخصص للسفر عبر القارات بأقصى درجات الرفاهية',
                    icon: '🚞',
                    baseCost: 800000000,
                    scaling: { alpha: 0.22, beta: 1.3 },
                    effects: { reputation: 18, happiness: 15, innovation: 5 },
                    limit: 2,
                    upkeep: 4000000
                }
            ],
            tech: [
                {
                    id: 'ai_datacenter',
                    name: 'مركز بيانات ذكاء اصطناعي',
                    description: 'مراكز بيانات متطورة تدير خوارزميات الذكاء الاصطناعي المتقدمة',
                    icon: '🤖',
                    baseCost: 8000000000,
                    scaling: { alpha: 0.25, beta: 1.3 },
                    effects: { innovation: 25, incomePerSec: 500000, reputation: 8, research: 10 },
                    limit: 15,
                    upkeep: 2000000
                },
                {
                    id: 'holographic_lab',
                    name: 'مختبر التصوير المجسم',
                    description: 'تقنية متطورة للتصوير المجسم ثلاثي الأبعاد والواقع المعزز',
                    icon: '📽️',
                    baseCost: 6000000000,
                    scaling: { alpha: 0.20, beta: 1.25 },
                    effects: { innovation: 30, happiness: 20, incomePerSec: 400000, research: 8 },
                    limit: 12,
                    upkeep: 1800000
                },
                {
                    id: 'nanotech_factory',
                    name: 'مصنع النانو تكنولوجي',
                    description: 'مصنع لإنتاج مواد النانو والروبوتات الجزيئية الدقيقة',
                    icon: '⚛️',
                    baseCost: 25000000000,
                    scaling: { alpha: 0.35, beta: 1.5 },
                    effects: { innovation: 60, incomePerSec: 1200000, research: 25, reputation: 20 },
                    limit: 8,
                    upkeep: 5000000
                },
                {
                    id: 'weather_control_system',
                    name: 'نظام التحكم بالطقس',
                    description: 'تقنية متقدمة للتحكم في الأحوال الجوية والمناخ العالمي',
                    icon: '⛈️',
                    baseCost: 100000000000,
                    scaling: { alpha: 0.40, beta: 1.6 },
                    effects: { innovation: 100, carbon: -200, happiness: 150, influence: 50 },
                    limit: 3,
                    upkeep: 15000000
                },
                {
                    id: 'teleportation_device',
                    name: 'جهاز النقل الفوري',
                    description: 'تقنية ثورية للنقل الفوري عبر المسافات الطويلة',
                    icon: '🌀',
                    baseCost: 200000000000,
                    scaling: { alpha: 0.50, beta: 1.8 },
                    effects: { innovation: 200, incomePerSec: 3000000, influence: 80, research: 50 },
                    limit: 2,
                    upkeep: 25000000
                },
                {
                    id: 'quantum_lab',
                    name: 'مختبر الحوسبة الكمية',
                    description: 'أحدث تقنيات الحوسبة الكمية لحل المشاكل المعقدة',
                    icon: '⚛️',
                    baseCost: 5000000000,
                    scaling: { alpha: 0.35, beta: 1.4 },
                    effects: { innovation: 30, reputation: 15, incomePerSec: 300000, research: 15 },
                    limit: 8,
                    upkeep: 1500000
                },
                {
                    id: 'neural_interface',
                    name: 'واجهة دماغية عصبية',
                    description: 'تقنية Neuralink المتقدمة لربط الدماغ بالحاسوب',
                    icon: '🧠',
                    baseCost: 12000000000,
                    scaling: { alpha: 0.40, beta: 1.5 },
                    effects: { innovation: 50, reputation: 20, happiness: 15, knowledge: 20 },
                    limit: 5,
                    upkeep: 3000000
                },
                {
                    id: 'robotics_factory',
                    name: 'مصنع الروبوتات المتقدمة',
                    description: 'مصانع تنتج روبوتات تسلا وروبوتات صناعية متطورة',
                    icon: '🦾',
                    baseCost: 15000000000,
                    scaling: { alpha: 0.30, beta: 1.25 },
                    effects: { innovation: 20, incomePerSec: 800000, influence: 8 },
                    limit: 12,
                    upkeep: 4000000
                },
                {
                    id: 'biotech_lab',
                    name: 'مختبر التكنولوجيا الحيوية',
                    description: 'مختبرات متطورة لأبحاث الجينات والعلاج الجيني',
                    icon: '🧬',
                    baseCost: 20000000000,
                    scaling: { alpha: 0.28, beta: 1.4 },
                    effects: { innovation: 40, reputation: 30, happiness: 25, research: 25 },
                    limit: 6,
                    upkeep: 6000000
                },
                {
                    id: 'fusion_reactor',
                    name: 'مفاعل اندماج نووي',
                    description: 'مفاعل اندماج نووي نظيف لطاقة لا نهائية',
                    icon: '⚡',
                    baseCost: 50000000000,
                    scaling: { alpha: 0.20, beta: 1.6 },
                    effects: { innovation: 80, incomePerSec: 2000000, carbon: -100, reputation: 50 },
                    limit: 3,
                    upkeep: 10000000
                }
            ],
            space: [
                {
                    id: 'starship_fleet',
                    name: 'أسطول ستارشيب',
                    description: 'صواريخ SpaceX قابلة لإعادة الاستخدام للسفر بين الكواكب',
                    icon: '🚀',
                    baseCost: 20000000000,
                    scaling: { alpha: 0.22, beta: 1.2 },
                    effects: { innovation: 35, reputation: 25, incomePerSec: 1000000 },
                    limit: 20,
                    upkeep: 5000000
                },
                {
                    id: 'jupiter_space_station',
                    name: 'محطة فضائية حول المشتري',
                    description: 'محطة فضائية عملاقة تدور حول المشتري لاستكشاف أقماره',
                    icon: '🪐',
                    baseCost: 350000000000,
                    scaling: { alpha: 0.25, beta: 1.7 },
                    effects: { innovation: 150, reputation: 200, incomePerSec: 8000000, research: 80 },
                    limit: 2,
                    upkeep: 40000000
                },
                {
                    id: 'interstellar_probe',
                    name: 'مجس النجوم البعيدة',
                    description: 'مجسات فضائية لاستكشاف النجوم والكواكب خارج المجموعة الشمسية',
                    icon: '🛸',
                    baseCost: 180000000000,
                    scaling: { alpha: 0.30, beta: 1.5 },
                    effects: { innovation: 120, research: 60, knowledge: 40, influence: 30 },
                    limit: 5,
                    upkeep: 20000000
                },
                {
                    id: 'wormhole_generator',
                    name: 'مولد الثقوب الدودية',
                    description: 'تقنية متطورة لإنشاء ثقوب دودية للسفر الفوري عبر الكون',
                    icon: '🕳️',
                    baseCost: 800000000000,
                    scaling: { alpha: 0.60, beta: 2.0 },
                    effects: { innovation: 500, incomePerSec: 20000000, influence: 200, research: 150 },
                    limit: 1,
                    upkeep: 80000000
                },
                {
                    id: 'mars_base',
                    name: 'قاعدة المريخ',
                    description: 'أول مستعمرة بشرية دائمة على سطح المريخ',
                    icon: '🪐',
                    baseCost: 100000000000,
                    scaling: { alpha: 0.15, beta: 1.6 },
                    effects: { innovation: 100, reputation: 150, happiness: 80, influence: 50 },
                    limit: 3,
                    upkeep: 20000000
                },
                {
                    id: 'satellite_network',
                    name: 'شبكة أقمار ستارلينك',
                    description: 'آلاف الأقمار الصناعية لتوفير إنترنت عالمي عالي السرعة',
                    icon: '📡',
                    baseCost: 25000000000,
                    scaling: { alpha: 0.18, beta: 1.3 },
                    effects: { incomePerSec: 1500000, innovation: 20, happiness: 40, influence: 15 },
                    limit: 10,
                    upkeep: 8000000
                },
                {
                    id: 'space_elevator',
                    name: 'مصعد فضائي',
                    description: 'مصعد يربط الأرض بالفضاء لتسهيل النقل الفضائي',
                    icon: '🏗️',
                    baseCost: 200000000000,
                    scaling: { alpha: 0.12, beta: 1.8 },
                    effects: { innovation: 200, reputation: 300, incomePerSec: 5000000 },
                    limit: 2,
                    upkeep: 50000000
                },
                {
                    id: 'moon_mining',
                    name: 'تعدين القمر',
                    description: 'محطات تعدين على القمر لاستخراج المواد النادرة',
                    icon: '🌙',
                    baseCost: 80000000000,
                    scaling: { alpha: 0.25, beta: 1.4 },
                    effects: { incomePerSec: 3000000, innovation: 60, influence: 30 },
                    limit: 5,
                    upkeep: 15000000
                },
                {
                    id: 'asteroid_mining',
                    name: 'تعدين الكويكبات',
                    description: 'مناجم فضائية لاستخراج المعادن من الكويكبات',
                    icon: '☄️',
                    baseCost: 150000000000,
                    scaling: { alpha: 0.30, beta: 1.5 },
                    effects: { incomePerSec: 8000000, innovation: 80, influence: 40 },
                    limit: 4,
                    upkeep: 25000000
                }
            ],
            projects: [
                {
                    id: 'hyperloop_network',
                    name: 'شبكة هايبرلوب عالمية',
                    description: 'شبكة نقل فائقة السرعة تربط القارات',
                    icon: '🚄',
                    cost: 80000000000,
                    buildTime: 240,
                    yields: { incomePerSec: 2000000, innovation: 40, carbon: -50, influence: 25 },
                    upkeep: 10000000
                },
                {
                    id: 'ocean_cities',
                    name: 'المدن العائمة',
                    description: 'مدن تكنولوجية عائمة على المحيطات مع نظم بيئية مستدامة',
                    icon: '🏝️',
                    cost: 400000000000,
                    buildTime: 600,
                    yields: { incomePerSec: 12000000, happiness: 200, carbon: -150, innovation: 80 },
                    upkeep: 25000000
                },
                {
                    id: 'quantum_internet',
                    name: 'الإنترنت الكمي العالمي',
                    description: 'شبكة اتصالات كمية فائقة السرعة وآمنة تماماً',
                    icon: '🌐',
                    cost: 600000000000,
                    buildTime: 800,
                    yields: { incomePerSec: 18000000, innovation: 300, research: 150, influence: 200 },
                    upkeep: 35000000
                },
                {
                    id: 'atmospheric_processor',
                    name: 'معالج الغلاف الجوي',
                    description: 'محطات عملاقة لتنقية وإعادة تأهيل الغلاف الجوي العالمي',
                    icon: '🌪️',
                    cost: 800000000000,
                    buildTime: 1000,
                    yields: { carbon: -800, happiness: 400, reputation: 600, influence: 300 },
                    upkeep: 50000000
                },
                {
                    id: 'consciousness_backup',
                    name: 'نظام نسخ الوعي',
                    description: 'تقنية لحفظ ونسخ الوعي البشري كاحتياطي للمستقبل',
                    icon: '💾',
                    cost: 1200000000000,
                    buildTime: 1500,
                    yields: { knowledge: 500, research: 300, innovation: 200, influence: 400 },
                    upkeep: 75000000
                },
                {
                    id: 'tesla_gigafactory',
                    name: 'مصانع تسلا العملاقة',
                    description: 'مصانع عملاقة لإنتاج البطاريات والسيارات الكهربائية',
                    icon: '🏭',
                    cost: 50000000000,
                    buildTime: 180,
                    yields: { incomePerSec: 3000000, carbon: -80, happiness: 30, influence: 20 },
                    upkeep: 8000000
                },
                {
                    id: 'solar_city',
                    name: 'مدن الطاقة الشمسية',
                    description: 'مدن كاملة تعتمد على الطاقة المتجددة 100%',
                    icon: '☀️',
                    cost: 120000000000,
                    buildTime: 300,
                    yields: { incomePerSec: 4000000, carbon: -200, happiness: 60, reputation: 80 },
                    upkeep: 15000000
                },
                {
                    id: 'global_internet',
                    name: 'إنترنت عالمي مجاني',
                    description: 'توفير إنترنت مجاني لكل شخص على وجه الأرض',
                    icon: '🌐',
                    cost: 200000000000,
                    buildTime: 360,
                    yields: { happiness: 200, reputation: 250, influence: 100 },
                    upkeep: 25000000
                },
                {
                    id: 'brain_computer_network',
                    name: 'شبكة الدماغ الحاسوبية',
                    description: 'ربط جميع البشر بشبكة دماغية موحدة',
                    icon: '🧠',
                    cost: 300000000000,
                    buildTime: 480,
                    yields: { innovation: 500, knowledge: 300, influence: 200, happiness: 100 },
                    upkeep: 40000000
                },
                {
                    id: 'climate_restoration',
                    name: 'استعادة المناخ العالمي',
                    description: 'مشروع ضخم لإعادة تأهيل مناخ الأرض',
                    icon: '🌍',
                    cost: 500000000000,
                    buildTime: 600,
                    yields: { carbon: -1000, happiness: 500, reputation: 800, influence: 300 },
                    upkeep: 60000000
                },
                {
                    id: 'interstellar_gateway',
                    name: 'بوابة النجوم',
                    description: 'بوابة للسفر الفوري بين النجوم',
                    icon: '🌌',
                    cost: 1000000000000,
                    buildTime: 1200,
                    yields: { innovation: 1000, incomePerSec: 50000000, influence: 1000, reputation: 2000 },
                    upkeep: 100000000
                }
            ],
            investment: [
                {
                    id: 'crypto_empire',
                    name: 'إمبراطورية العملات المشفرة',
                    description: 'استثمار ضخم في البيتكوين والعملات الرقمية المتطورة',
                    icon: '₿',
                    baseCost: 50000000000,
                    scaling: { alpha: 0.25, beta: 1.4 },
                    effects: { incomePerSec: 8000000, influence: 30, innovation: 20 },
                    limit: 10,
                    upkeep: 5000000
                },
                {
                    id: 'ai_trading_bots',
                    name: 'روبوتات التداول الذكية',
                    description: 'روبوتات ذكاء اصطناعي متطورة للتداول في جميع الأسواق العالمية',
                    icon: '🤖',
                    baseCost: 30000000000,
                    scaling: { alpha: 0.30, beta: 1.3 },
                    effects: { incomePerSec: 12000000, innovation: 40, research: 15 },
                    limit: 8,
                    upkeep: 3000000
                },
                {
                    id: 'global_stock_control',
                    name: 'السيطرة على الأسهم العالمية',
                    description: 'شراء حصص مسيطرة في أكبر الشركات العالمية',
                    icon: '📈',
                    baseCost: 100000000000,
                    scaling: { alpha: 0.20, beta: 1.5 },
                    effects: { incomePerSec: 15000000, influence: 80, reputation: 40 },
                    limit: 15,
                    upkeep: 8000000
                },
                {
                    id: 'rare_metals_monopoly',
                    name: 'احتكار المعادن النادرة',
                    description: 'السيطرة على مناجم المعادن النادرة في العالم',
                    icon: '💎',
                    baseCost: 200000000000,
                    scaling: { alpha: 0.35, beta: 1.6 },
                    effects: { incomePerSec: 25000000, influence: 100, innovation: 30 },
                    limit: 5,
                    upkeep: 12000000
                }
            ],
            realestate: [
                {
                    id: 'manhattan_skyscrapers',
                    name: 'ناطحات سحاب مانهاتن',
                    description: 'امتلاك أطول وأفخم ناطحات السحاب في مانهاتن',
                    icon: '🏗️',
                    baseCost: 15000000000,
                    scaling: { alpha: 0.18, beta: 1.2 },
                    effects: { incomePerSec: 3000000, reputation: 25, influence: 15 },
                    limit: 25,
                    upkeep: 2000000
                },
                {
                    id: 'luxury_hotels_chain',
                    name: 'سلسلة الفنادق الفاخرة',
                    description: 'سلسلة فنادق 7 نجوم في أجمل مدن العالم',
                    icon: '🏨',
                    baseCost: 80000000000,
                    scaling: { alpha: 0.22, beta: 1.3 },
                    effects: { incomePerSec: 8000000, happiness: 50, reputation: 40 },
                    limit: 20,
                    upkeep: 5000000
                },
                {
                    id: 'shopping_mall_empire',
                    name: 'إمبراطورية المولات التجارية',
                    description: 'أضخم مراكز التسوق في العالم مع تقنيات متطورة',
                    icon: '🏬',
                    baseCost: 120000000000,
                    scaling: { alpha: 0.25, beta: 1.4 },
                    effects: { incomePerSec: 15000000, happiness: 80, influence: 25 },
                    limit: 12,
                    upkeep: 8000000
                },
                {
                    id: 'underground_cities',
                    name: 'المدن تحت الأرض',
                    description: 'مدن كاملة تحت الأرض بتقنيات المستقبل',
                    icon: '🕳️',
                    baseCost: 300000000000,
                    scaling: { alpha: 0.30, beta: 1.6 },
                    effects: { incomePerSec: 20000000, innovation: 100, happiness: 150 },
                    limit: 5,
                    upkeep: 15000000
                }
            ],
            military: [
                {
                    id: 'private_army',
                    name: 'الجيش الخاص',
                    description: 'جيش خاص متطور مع أحدث التقنيات العسكرية',
                    icon: '🪖',
                    baseCost: 100000000000,
                    scaling: { alpha: 0.40, beta: 1.5 },
                    effects: { influence: 150, reputation: -20, incomePerSec: 5000000 },
                    limit: 3,
                    upkeep: 20000000
                },
                {
                    id: 'cyber_warfare_unit',
                    name: 'وحدة الحرب السيبرانية',
                    description: 'وحدة متخصصة في الحرب الإلكترونية والأمن السيبراني',
                    icon: '💻',
                    baseCost: 50000000000,
                    scaling: { alpha: 0.35, beta: 1.4 },
                    effects: { influence: 80, innovation: 60, research: 40 },
                    limit: 8,
                    upkeep: 10000000
                },
                {
                    id: 'space_defense_system',
                    name: 'نظام الدفاع الفضائي',
                    description: 'منظومة دفاعية فضائية لحماية الأرض من التهديدات',
                    icon: '🛡️',
                    baseCost: 500000000000,
                    scaling: { alpha: 0.50, beta: 1.8 },
                    effects: { influence: 300, innovation: 150, reputation: 200 },
                    limit: 2,
                    upkeep: 50000000
                }
            ],
            charity: [
                {
                    id: 'climate_reversal',
                    name: 'عكس التغير المناخي',
                    description: 'مشروع عالمي لعكس آثار التغير المناخي',
                    icon: '🌍',
                    baseCost: 50000000000,
                    scaling: { alpha: 0.08, beta: 1.2 },
                    effects: { carbon: -200, happiness: 100, reputation: 150 },
                    limit: 5,
                    upkeep: 0
                },
                {
                    id: 'universal_education',
                    name: 'التعليم العالمي المجاني',
                    description: 'توفير تعليم عالي الجودة مجاناً للجميع',
                    icon: '🎓',
                    baseCost: 30000000000,
                    scaling: { alpha: 0.10, beta: 1.1 },
                    effects: { happiness: 80, innovation: 30, reputation: 100, knowledge: 50 },
                    limit: 8,
                    upkeep: 0
                },
                {
                    id: 'disease_eradication',
                    name: 'القضاء على الأمراض',
                    description: 'برنامج للقضاء على الأمراض المعدية عالمياً',
                    icon: '🏥',
                    baseCost: 75000000000,
                    scaling: { alpha: 0.12, beta: 1.3 },
                    effects: { happiness: 150, reputation: 200, influence: 50 },
                    limit: 4,
                    upkeep: 0
                },
                {
                    id: 'poverty_elimination',
                    name: 'القضاء على الفقر',
                    description: 'مبادرة عالمية للقضاء على الفقر المدقع',
                    icon: '🤝',
                    baseCost: 100000000000,
                    scaling: { alpha: 0.15, beta: 1.4 },
                    effects: { happiness: 200, reputation: 300, influence: 100 },
                    limit: 2,
                    upkeep: 0
                },
                {
                    id: 'ocean_cleanup',
                    name: 'تنظيف المحيطات',
                    description: 'مشروع ضخم لتنظيف جميع محيطات العالم من التلوث',
                    icon: '🌊',
                    baseCost: 60000000000,
                    scaling: { alpha: 0.14, beta: 1.25 },
                    effects: { carbon: -150, happiness: 120, reputation: 180 },
                    limit: 6,
                    upkeep: 0
                },
                {
                    id: 'forest_restoration',
                    name: 'استعادة الغابات',
                    description: 'زراعة مليارات الأشجار لاستعادة الغابات المفقودة',
                    icon: '🌳',
                    baseCost: 40000000000,
                    scaling: { alpha: 0.12, beta: 1.2 },
                    effects: { carbon: -300, happiness: 80, reputation: 120 },
                    limit: 10,
                    upkeep: 0
                }
            ],
            research: [
                {
                    id: 'immortality_research',
                    name: 'أبحاث الخلود',
                    description: 'أبحاث متقدمة لإطالة العمر والوصول للخلود',
                    icon: '⚰️',
                    baseCost: 100000000000,
                    scaling: { alpha: 0.30, beta: 1.6 },
                    effects: { research: 100, knowledge: 80, innovation: 60, reputation: 50 },
                    limit: 3,
                    upkeep: 20000000
                },
                {
                    id: 'consciousness_upload',
                    name: 'رفع الوعي',
                    description: 'تقنية نقل الوعي البشري إلى الحاسوب',
                    icon: '🤖',
                    baseCost: 200000000000,
                    scaling: { alpha: 0.40, beta: 1.8 },
                    effects: { research: 200, knowledge: 150, innovation: 100 },
                    limit: 2,
                    upkeep: 50000000
                },
                {
                    id: 'time_travel',
                    name: 'السفر عبر الزمن',
                    description: 'أبحاث نظرية وعملية للسفر عبر الزمن',
                    icon: '⏰',
                    baseCost: 500000000000,
                    scaling: { alpha: 0.50, beta: 2.0 },
                    effects: { research: 500, knowledge: 300, innovation: 200, influence: 500 },
                    limit: 1,
                    upkeep: 100000000
                },
                {
                    id: 'parallel_universe',
                    name: 'الأكوان المتوازية',
                    description: 'أبحاث الوصول للأكوان المتوازية',
                    icon: '🌌',
                    baseCost: 1000000000000,
                    scaling: { alpha: 0.60, beta: 2.5 },
                    effects: { research: 1000, knowledge: 500, innovation: 300, influence: 1000 },
                    limit: 1,
                    upkeep: 200000000
                }
            ],
            entertainment: [
                {
                    id: 'virtual_reality_world',
                    name: 'عالم الواقع الافتراضي',
                    description: 'عالم افتراضي كامل يحاكي الواقع بدقة 100%',
                    icon: '🥽',
                    baseCost: 80000000000,
                    scaling: { alpha: 0.25, beta: 1.4 },
                    effects: { happiness: 200, innovation: 50, incomePerSec: 2000000 },
                    limit: 5,
                    upkeep: 15000000
                },
                {
                    id: 'theme_park_empire',
                    name: 'إمبراطورية المدن الترفيهية',
                    description: 'سلسلة من أكبر المدن الترفيهية في العالم',
                    icon: '🎢',
                    baseCost: 50000000000,
                    scaling: { alpha: 0.20, beta: 1.3 },
                    effects: { happiness: 150, reputation: 80, incomePerSec: 1500000 },
                    limit: 8,
                    upkeep: 10000000
                },
                {
                    id: 'space_casino',
                    name: 'كازينو فضائي',
                    description: 'كازينو فاخر في محطة فضائية مدارية',
                    icon: '🎰',
                    baseCost: 120000000000,
                    scaling: { alpha: 0.30, beta: 1.5 },
                    effects: { incomePerSec: 5000000, reputation: 40, influence: 60 },
                    limit: 3,
                    upkeep: 25000000
                },
                {
                    id: 'holographic_concerts',
                    name: 'حفلات هولوجرافية',
                    description: 'حفلات موسيقية ثلاثية الأبعاد في جميع أنحاء العالم',
                    icon: '🎵',
                    baseCost: 30000000000,
                    scaling: { alpha: 0.18, beta: 1.2 },
                    effects: { happiness: 100, reputation: 60, incomePerSec: 800000 },
                    limit: 12,
                    upkeep: 5000000
                }
            ]
        };
    }

    initAchievements() {
        return [
            { id: 'first_billion', name: 'أول مليار', description: 'أنفق أول مليار دولار', condition: () => this.getTotalSpent() >= 1000000000 },
            { id: 'space_pioneer', name: 'رائد الفضاء', description: 'اشتر 10 عناصر فضائية', condition: () => this.getCategoryCount('space') >= 10 },
            { id: 'tech_mogul', name: 'قطب التكنولوجيا', description: 'وصل لمستوى ابتكار 500+', condition: () => this.state.innovation >= 500 },
            { id: 'philanthropist', name: 'المحسن الكبير', description: 'أنفق 100 مليار على الخير', condition: () => this.getCategorySpent('charity') >= 100000000000 },
            { id: 'mars_colonizer', name: 'مستعمر المريخ', description: 'امتلك قاعدة المريخ', condition: () => (this.state.ownedItems['mars_base'] || 0) > 0 },
            { id: 'research_master', name: 'سيد الأبحاث', description: 'وصل لمستوى بحث 1000+', condition: () => this.state.research >= 1000 },
            { id: 'knowledge_sage', name: 'حكيم المعرفة', description: 'وصل لمستوى معرفة 500+', condition: () => this.state.knowledge >= 500 },
            { id: 'influence_emperor', name: 'إمبراطور النفوذ', description: 'وصل لنفوذ 1000+', condition: () => this.state.influence >= 1000 },
            { id: 'carbon_savior', name: 'منقذ الكوكب', description: 'قلل البصمة الكربونية بـ 1000 نقطة', condition: () => this.state.carbon <= -1000 },
            { id: 'happiness_master', name: 'سيد السعادة', description: 'وصل لسعادة عامة 1000+', condition: () => this.state.happiness >= 1000 }
        ];
    }

    initMilestones() {
        return [
            { id: 'first_purchase', name: 'أول شراء', description: 'اشتر أول عنصر', threshold: 1, type: 'purchases' },
            { id: 'hundred_billion', name: '100 مليار', description: 'أنفق 100 مليار دولار', threshold: 100000000000, type: 'spending' },
            { id: 'innovation_master', name: 'سيد الابتكار', description: 'وصل لابتكار 1000', threshold: 1000, type: 'innovation' },
            { id: 'global_influence', name: 'النفوذ العالمي', description: 'وصل لنفوذ 500', threshold: 500, type: 'influence' },
            { id: 'research_genius', name: 'عبقري البحث', description: 'وصل لبحث 500', threshold: 500, type: 'research' }
        ];
    }

    init() {
        this.setupEventListeners();
        this.renderCurrentTab();
        this.startGameLoop();
        this.updateDisplay();
        this.initCanvas();
        this.checkAchievements();
        this.checkMilestones();
        this.unlockCategories();
        
        this.showToast('🚀 مرحباً بك في إمبراطورية إيلون ماسك المالية المطورة! استعد لتجربة استراتيجية لا تُنسى!', 'success');
    }

    unlockCategories() {
        if (this.state.innovation >= 100 && !this.state.unlockedCategories.includes('research')) {
            this.state.unlockedCategories.push('research');
            this.addResearchTab();
            this.showToast('🔬 تم فتح فئة الأبحاث المتقدمة!', 'success');
        }
        
        if (this.state.happiness >= 200 && !this.state.unlockedCategories.includes('entertainment')) {
            this.state.unlockedCategories.push('entertainment');
            this.addEntertainmentTab();
            this.showToast('🎭 تم فتح فئة الترفيه والتسلية!', 'success');
        }
        
        if (this.state.wealth <= 350000000000 && !this.state.unlockedCategories.includes('realestate')) {
            this.state.unlockedCategories.push('realestate');
            this.addRealestateTab();
            this.showToast('🏢 تم فتح فئة العقارات الفاخرة!', 'success');
        }
        
        if (this.state.influence >= 100 && !this.state.unlockedCategories.includes('military')) {
            this.state.unlockedCategories.push('military');
            this.addMilitaryTab();
            this.showToast('🪖 تم فتح فئة القوة العسكرية!', 'warning');
        }
    }

    addResearchTab() {
        const tabsContainer = document.getElementById('tabs');
        const researchTab = document.createElement('button');
        researchTab.className = 'tab-button';
        researchTab.dataset.tab = 'research';
        researchTab.innerHTML = `
            <span class="tab-icon">🔬</span>
            <span>أبحاث</span>
        `;
        researchTab.addEventListener('click', () => this.switchTab('research'));
        tabsContainer.appendChild(researchTab);
        
        const panel = document.getElementById('panel');
        const researchPanel = document.createElement('div');
        researchPanel.className = 'panel-content';
        researchPanel.id = 'research-panel';
        researchPanel.style.display = 'none';
        researchPanel.innerHTML = `
            <div class="category-header">
                <h2>🔬 الأبحاث المتقدمة</h2>
                <p class="category-desc">ادفع حدود العلم والمعرفة البشرية</p>
            </div>
            <div class="items-grid" id="research-items"></div>
        `;
        panel.appendChild(researchPanel);
    }

    addEntertainmentTab() {
        const tabsContainer = document.getElementById('tabs');
        const entertainmentTab = document.createElement('button');
        entertainmentTab.className = 'tab-button';
        entertainmentTab.dataset.tab = 'entertainment';
        entertainmentTab.innerHTML = `
            <span class="tab-icon">🎭</span>
            <span>ترفيه</span>
        `;
        entertainmentTab.addEventListener('click', () => this.switchTab('entertainment'));
        tabsContainer.appendChild(entertainmentTab);
        
        const panel = document.getElementById('panel');
        const entertainmentPanel = document.createElement('div');
        entertainmentPanel.className = 'panel-content';
        entertainmentPanel.id = 'entertainment-panel';
        entertainmentPanel.style.display = 'none';
        entertainmentPanel.innerHTML = `
            <div class="category-header">
                <h2>🎭 الترفيه والتسلية</h2>
                <p class="category-desc">امتع العالم واستمتع بأفخم وسائل الترفيه</p>
            </div>
            <div class="items-grid" id="entertainment-items"></div>
        `;
        panel.appendChild(entertainmentPanel);
    }

    addRealestateTab() {
        const tabsContainer = document.getElementById('tabs');
        const realestateTab = document.createElement('button');
        realestateTab.className = 'tab-button';
        realestateTab.dataset.tab = 'realestate';
        realestateTab.innerHTML = `
            <span class="tab-icon">🏢</span>
            <span>عقارات</span>
        `;
        realestateTab.addEventListener('click', () => this.switchTab('realestate'));
        tabsContainer.appendChild(realestateTab);
        
        const panel = document.getElementById('panel');
        const realestatePanel = document.createElement('div');
        realestatePanel.className = 'panel-content';
        realestatePanel.id = 'realestate-panel';
        realestatePanel.style.display = 'none';
        realestatePanel.innerHTML = `
            <div class="category-header">
                <h2>🏢 الإمبراطورية العقارية</h2>
                <p class="category-desc">امتلك أفخم العقارات والمشاريع الاستثمارية في العالم</p>
            </div>
            <div class="items-grid" id="realestate-items"></div>
        `;
        panel.appendChild(realestatePanel);
    }

    addMilitaryTab() {
        const tabsContainer = document.getElementById('tabs');
        const militaryTab = document.createElement('button');
        militaryTab.className = 'tab-button military-tab';
        militaryTab.dataset.tab = 'military';
        militaryTab.innerHTML = `
            <span class="tab-icon">🪖</span>
            <span>قوة</span>
        `;
        militaryTab.addEventListener('click', () => this.switchTab('military'));
        tabsContainer.appendChild(militaryTab);
        
        const panel = document.getElementById('panel');
        const militaryPanel = document.createElement('div');
        militaryPanel.className = 'panel-content';
        militaryPanel.id = 'military-panel';
        militaryPanel.style.display = 'none';
        militaryPanel.innerHTML = `
            <div class="category-header">
                <h2>🪖 القوة العسكرية الخاصة</h2>
                <p class="category-desc">بناء قوة عسكرية خاصة بتقنيات المستقبل - استخدم بحذر!</p>
            </div>
            <div class="items-grid" id="military-items"></div>
        `;
        panel.appendChild(militaryPanel);
    }

    initCanvas() {
        this.canvas = document.getElementById('fx-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.particles = [];
        this.startParticleSystem();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    startParticleSystem() {
        setInterval(() => {
            if (this.particles.length < 100) {
                this.particles.push(this.createParticle());
            }
            this.updateParticles();
            this.renderParticles();
        }, 80);
    }

    createParticle() {
        const colors = ['#00d4ff', '#00ff88', '#ffd700', '#ff6b6b', '#9c27b0'];
        return {
            x: Math.random() * this.canvas.width,
            y: this.canvas.height + 10,
            vx: (Math.random() - 0.5) * 4,
            vy: -Math.random() * 5 - 2,
            life: 1,
            decay: Math.random() * 0.015 + 0.005,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 4 + 2
        };
    }

    updateParticles() {
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;
            return p.life > 0;
        });
    }

    renderParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(p => {
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        this.ctx.globalAlpha = 1;
    }

    setupEventListeners() {
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', () => {
                this.switchTab(button.dataset.tab);
            });
        });

        document.getElementById('event-modal').addEventListener('click', (e) => {
            if (e.target.id === 'event-modal') {
                this.closeModal();
            }
        });
    }

    switchTab(tabName) {
        if (this.currentTab === tabName) return;
        
        if (!this.state.unlockedCategories.includes(tabName)) {
            this.showToast('🔒 هذه الفئة مقفلة! تحتاج لتطوير مهاراتك أكثر.', 'warning');
            return;
        }
        
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        document.querySelectorAll('.panel-content').forEach(panel => {
            panel.style.display = 'none';
        });
        document.getElementById(`${tabName}-panel`).style.display = 'block';
        
        this.currentTab = tabName;
        this.renderCurrentTab();
    }

    renderCurrentTab() {
        switch (this.currentTab) {
            case 'luxury':
            case 'tech':
            case 'space':
            case 'charity':
            case 'research':
            case 'entertainment':
            case 'investment':
            case 'realestate':
            case 'military':
                this.renderItems(this.currentTab);
                break;
            case 'projects':
                this.renderProjects();
                break;
        }
    }

    renderItems(category) {
        const container = document.getElementById(`${category}-items`);
        if (!container) return;
        
        container.innerHTML = '';
        
        this.data[category].forEach(item => {
            const owned = this.state.ownedItems[item.id] || 0;
            const cost = this.calculateCost(item, owned);
            const canAfford = this.state.wealth >= cost;
            const canBuy = !item.limit || owned < item.limit;
            
            const card = document.createElement('div');
            card.className = 'item-card';
            if (owned > 0) card.classList.add('owned');
            
            card.innerHTML = `
                <div class="item-header">
                    <span class="item-icon">${item.icon}</span>
                    <div class="item-info">
                        <h3 class="item-name">${item.name}</h3>
                        <p class="item-description">${item.description}</p>
                    </div>
                </div>
                <div class="item-stats">
                    ${this.renderEffects(item.effects)}
                </div>
                <div class="item-footer">
                    <div>
                        <div class="item-price">${this.formatMoney(cost)}</div>
                        ${item.upkeep ? `<div class="stat-badge negative">صيانة: ${this.formatMoney(item.upkeep)}/س</div>` : ''}
                        ${item.limit ? `<div class="item-limit">الحد الأقصى: ${item.limit}</div>` : ''}
                    </div>
                    <div style="text-align: left;">
                        ${owned > 0 ? `<div class="item-owned">مملوك: ${owned}${item.limit ? `/${item.limit}` : ''}</div>` : ''}
                        <button class="buy-button ${canAfford ? 'affordable' : 'expensive'}" 
                            onclick="game.buyItem('${item.id}', '${category}')"
                            ${!canAfford || !canBuy ? 'disabled' : ''}>
                            ${!canAfford ? 'مال غير كافٍ' : canBuy ? 'اشتري الآن' : 'مكتمل'}
                        </button>
                    </div>
                </div>
            `;
            
            container.appendChild(card);
        });
    }

    renderProjects() {
        const container = document.getElementById('project-items');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.data.projects.forEach(project => {
            const activeProject = this.state.activeProjects.find(p => p.id === project.id);
            const isBuilding = activeProject && !activeProject.completed;
            const isCompleted = activeProject && activeProject.completed;
            const canAfford = this.state.wealth >= project.cost;
            
            const card = document.createElement('div');
            card.className = 'project-card';
            if (isCompleted) card.classList.add('completed');
            
            let progressSection = '';
            let button = '';
            
            if (isBuilding) {
                const progress = ((project.buildTime - activeProject.timeLeft) / project.buildTime) * 100;
                progressSection = `
                    <div class="project-progress">
                        <div class="project-progress-bar" style="width: ${progress}%"></div>
                        <span class="progress-text">${Math.round(progress)}%</span>
                    </div>
                    <div class="building-status">
                        🚧 جاري البناء... ${Math.ceil(activeProject.timeLeft)} ثانية متبقية
                    </div>
                `;
                button = '<button class="buy-button building" disabled>⏳ قيد البناء</button>';
            } else if (isCompleted) {
                progressSection = '<div class="completed-status">✅ مكتمل ونشط - يولد عوائد مستمرة</div>';
                button = '<button class="buy-button completed" disabled>✅ مكتمل</button>';
            } else {
                button = `<button class="buy-button ${canAfford ? 'affordable' : 'expensive'}" 
                    onclick="game.startProject('${project.id}')"
                    ${!canAfford ? 'disabled' : ''}>
                    ${canAfford ? '🚀 ابدأ المشروع' : '💰 مال غير كافٍ'}
                </button>`;
            }
            
            card.innerHTML = `
                <div class="project-header">
                    <div class="project-info">
                        <h3>${project.icon} ${project.name}</h3>
                        <p class="project-description">${project.description}</p>
                    </div>
                    <div class="project-costs">
                        <div class="project-cost">${this.formatMoney(project.cost)}</div>
                        <div class="project-build-time">⏱️ ${project.buildTime} ثانية</div>
                        ${project.upkeep ? `<div class="stat-badge negative">🔧 ${this.formatMoney(project.upkeep)}/س</div>` : ''}
                    </div>
                </div>
                ${progressSection}
                <div class="project-yields">
                    <h4>العوائد المتوقعة:</h4>
                    ${this.renderYields(project.yields)}
                </div>
                <div class="project-action">
                    ${button}
                </div>
            `;
            
            container.appendChild(card);
        });
    }

    renderEffects(effects) {
        let html = '';
        Object.entries(effects).forEach(([key, value]) => {
            const isPositive = value > 0;
            const className = isPositive ? 'positive' : 'negative';
            const sign = isPositive ? '+' : '';
            const icon = this.getEffectIcon(key);
            html += `<span class="stat-badge ${className}">${icon} ${sign}${this.formatValue(value, key)}</span>`;
        });
        return html;
    }

    renderYields(yields) {
        let html = '';
        Object.entries(yields).forEach(([key, value]) => {
            const isPositive = value > 0;
            const sign = isPositive ? '+' : '';
            const icon = this.getEffectIcon(key);
            html += `<div class="yield-item">
                <span class="yield-icon">${icon}</span>
                <span class="yield-value ${isPositive ? 'positive' : 'negative'}">${sign}${this.formatValue(value, key)}</span>
            </div>`;
        });
        return html;
    }

    getEffectIcon(effect) {
        const icons = {
            reputation: '👑',
            innovation: '🚀',
            happiness: '😊',
            carbon: '🌱',
            incomePerSec: '💰',
            influence: '⭐',
            research: '🔬',
            knowledge: '📚'
        };
        return icons[effect] || '📊';
    }

    formatValue(value, type) {
        if (type === 'incomePerSec') {
            return this.formatMoney(value) + '/س';
        }
        return value.toString();
    }

    calculateCost(item, owned) {
        return Math.floor(item.baseCost * Math.pow(1 + item.scaling.alpha, Math.pow(owned, item.scaling.beta)));
    }

    buyItem(itemId, category) {
        const item = this.data[category].find(i => i.id === itemId);
        if (!item) return;
        
        const owned = this.state.ownedItems[itemId] || 0;
        const cost = this.calculateCost(item, owned);
        
        if (this.state.wealth < cost) {
            this.showToast('💸 ليس لديك مال كافٍ لهذا الشراء!', 'warning');
            this.shakeElement('.wealth-main');
            return;
        }
        
        if (item.limit && owned >= item.limit) {
            this.showToast('🚫 وصلت للحد الأقصى من هذا العنصر!', 'warning');
            return;
        }
        
        this.state.wealth -= cost;
        this.state.ownedItems[itemId] = owned + 1;
        this.state.gameStats.totalSpent += cost;
        
        if (cost > this.state.gameStats.biggestPurchase) {
            this.state.gameStats.biggestPurchase = cost;
        }
        
        this.applyEffects(item.effects);
        
        if (item.upkeep) {
            this.state.expensePerSec += item.upkeep;
        }
        
        this.showPurchaseEffect(item.icon, cost);
        this.showToast(`✨ تم شراء ${item.name} بنجاح! ${item.icon}`, 'success');
        this.createMoneyExplosion();
        
        this.updateDisplay();
        this.renderCurrentTab();
        this.checkAchievements();
        this.checkMilestones();
        this.unlockCategories();
    }

    startProject(projectId) {
        const project = this.data.projects.find(p => p.id === projectId);
        if (!project || this.state.wealth < project.cost) return;
        
        const existing = this.state.activeProjects.find(p => p.id === projectId);
        if (existing) return;
        
        this.state.wealth -= project.cost;
        this.state.gameStats.totalSpent += project.cost;
        this.state.activeProjects.push({
            id: projectId,
            timeLeft: project.buildTime,
            completed: false
        });
        
        this.showToast(`🚧 بدأ مشروع ${project.name}!`, 'success');
        this.updateDisplay();
        this.renderCurrentTab();
    }

    applyEffects(effects) {
        Object.entries(effects).forEach(([key, value]) => {
            if (key === 'incomePerSec') {
                this.state.incomePerSec += value * this.state.multipliers.income;
            } else if (this.state.multipliers[key]) {
                this.state[key] = (this.state[key] || 0) + value * this.state.multipliers[key];
            } else {
                this.state[key] = (this.state[key] || 0) + value;
            }
        });
    }

    checkMilestones() {
        this.milestones.forEach(milestone => {
            if (!this.state.milestones.includes(milestone.id)) {
                let achieved = false;
                
                switch (milestone.type) {
                    case 'purchases':
                        achieved = Object.values(this.state.ownedItems).reduce((a, b) => a + b, 0) >= milestone.threshold;
                        break;
                    case 'spending':
                        achieved = this.state.gameStats.totalSpent >= milestone.threshold;
                        break;
                    case 'innovation':
                        achieved = this.state.innovation >= milestone.threshold;
                        break;
                    case 'influence':
                        achieved = this.state.influence >= milestone.threshold;
                        break;
                    case 'research':
                        achieved = this.state.research >= milestone.threshold;
                        break;
                }
                
                if (achieved) {
                    this.state.milestones.push(milestone.id);
                    this.showMilestone(milestone);
                }
            }
        });
    }

    showMilestone(milestone) {
        this.showToast(`🏅 إنجاز رئيسي: ${milestone.name} - ${milestone.description}`, 'success');
        this.createCelebrationEffect();
        
        // Bonus rewards for milestones
        this.state.wealth += 1000000000; // 1B bonus
        this.state.reputation += 25;
        this.showToast(`🎁 مكافأة الإنجاز: +$1B و+25 سمعة!`, 'success');
    }

    startGameLoop() {
        setInterval(() => this.gameLoop(), 100);
        setInterval(() => this.updateDisplay(), 50);
    }

    gameLoop() {
        const now = Date.now();
        const dt = (now - this.lastUpdate) / 1000;
        this.lastUpdate = now;
        
        this.state.gameStats.timeElapsed += dt;
        
        const netIncome = this.state.incomePerSec - this.state.expensePerSec;
        this.state.wealth += netIncome * dt;
        this.state.wealth = Math.max(0, this.state.wealth);
        
        this.updateProjects(dt);
        this.updateMultipliers();
        
        if (Math.random() < this.eventChance * dt) {
            this.triggerRandomEvent();
        }
        
        if (Math.random() < 0.03 * dt) {
            this.applyMarketVolatility();
        }
        
        // Progressive difficulty and rewards
        this.adjustGameBalance();
    }

    adjustGameBalance() {
        const hoursPlayed = this.state.gameStats.timeElapsed / 3600;
        
        // Increase event frequency over time
        this.eventChance = 0.003 + (hoursPlayed * 0.0005);
        
        // Bonus research points over time
        if (this.state.innovation > 100) {
            this.state.research += 0.1;
        }
        
        // Knowledge accumulation
        if (this.state.research > 50) {
            this.state.knowledge += 0.05;
        }
    }

    updateProjects(dt) {
        this.state.activeProjects.forEach(activeProject => {
            if (activeProject.completed) return;
            
            activeProject.timeLeft -= dt;
            
            if (activeProject.timeLeft <= 0) {
                activeProject.timeLeft = 0;
                activeProject.completed = true;
                
                const project = this.data.projects.find(p => p.id === activeProject.id);
                if (project) {
                    this.applyEffects(project.yields);
                    if (project.upkeep) {
                        this.state.expensePerSec += project.upkeep;
                    }
                    this.state.completedProjects.push(project.id);
                    this.showToast(`🎉 اكتمل ${project.name}! يولد عوائد الآن!`, 'success');
                    this.createCelebrationEffect();
                    this.renderCurrentTab();
                }
            }
        });
    }

    updateMultipliers() {
        this.state.multipliers.income = 1 + (this.state.innovation / 300) + (this.state.research / 1000);
        this.state.multipliers.reputation = 1 + (this.state.influence / 200) + (this.state.knowledge / 500);
        this.state.multipliers.innovation = 1 + (this.state.reputation / 300) + (this.state.research / 800);
        this.state.multipliers.research = 1 + (this.state.knowledge / 400) + (this.state.innovation / 600);
    }

    triggerRandomEvent() {
        const events = [
            {
                title: '🌟 اختراق تقني مذهل!',
                description: 'فريقك طور تقنية ثورية جديدة! العالم يترقب قرارك.',
                choices: [
                    { 
                        text: '🔓 نشر التقنية مجاناً للعالم', 
                        effect: () => {
                            this.state.reputation += 100;
                            this.state.happiness += 80;
                            this.state.knowledge += 50;
                            this.showToast('🌍 أصبحت بطلاً عالمياً للعلم المفتوح!', 'success');
                        }
                    },
                    { 
                        text: '💰 بيع براءة الاختراع', 
                        effect: () => {
                            this.state.wealth += 50000000000;
                            this.state.innovation += 30;
                            this.state.research += 20;
                            this.showToast('💎 ربحت 50 مليار دولار وطورت قدراتك!', 'success');
                        }
                    },
                    {
                        text: '🔬 الاستثمار في المزيد من الأبحاث',
                        effect: () => {
                            this.state.research += 100;
                            this.state.innovation += 50;
                            this.state.incomePerSec += 1000000;
                            this.showToast('🚀 أصبحت رائداً في الأبحاث المتقدمة!', 'success');
                        }
                    }
                ]
            },
            {
                title: '👽 اتصال من الفضاء!',
                description: 'حضارة فضائية متقدمة تتواصل معك! ماذا ستفعل؟',
                choices: [
                    { 
                        text: '🤝 التعاون والتبادل التكنولوجي', 
                        effect: () => {
                            this.state.innovation += 500;
                            this.state.knowledge += 300;
                            this.state.influence += 200;
                            this.showToast('🛸 حصلت على تقنيات فضائية متقدمة!', 'success');
                        }
                    },
                    { 
                        text: '🌍 دعوتهم لزيارة الأرض', 
                        effect: () => {
                            this.state.happiness += 500;
                            this.state.reputation += 300;
                            this.state.incomePerSec += 5000000;
                            this.showToast('🎉 أصبحت الأرض مركزاً للحضارات!', 'success');
                        }
                    },
                    {
                        text: '🔍 دراسة تقنياتهم سراً',
                        effect: () => {
                            this.state.research += 200;
                            this.state.innovation += 150;
                            this.state.influence += 100;
                            this.showToast('🕵️ اكتسبت معرفة سرية متقدمة!', 'success');
                        }
                    }
                ]
            },
            {
                title: '⚡ طفرة الطاقة النظيفة!',
                description: 'تقنياتك في الطاقة النظيفة حققت طفرة عالمية!',
                choices: [
                    { 
                        text: '🌱 توزيع مجاني للدول النامية', 
                        effect: () => {
                            this.state.carbon -= 500;
                            this.state.happiness += 300;
                            this.state.reputation += 400;
                            this.showToast('🌍 أنقذت الكوكب وأسعدت البشرية!', 'success');
                        }
                    },
                    { 
                        text: '💼 إنشاء إمبراطورية طاقة', 
                        effect: () => {
                            this.state.incomePerSec += 8000000;
                            this.state.influence += 150;
                            this.state.innovation += 80;
                            this.showToast('⚡ أصبحت إمبراطور الطاقة العالمي!', 'success');
                        }
                    }
                ]
            }
        ];
        
        const event = events[Math.floor(Math.random() * events.length)];
        this.state.gameStats.eventsTriggered++;
        this.showEventModal(event);
    }

    applyMarketVolatility() {
        const scenarios = [
            {
                type: 'ai_revolution',
                change: 0.20,
                message: '🤖 ثورة الذكاء الاصطناعي تدفع أسهمك +20%'
            },
            {
                type: 'space_boom',
                change: 0.25,
                message: '🚀 طفرة الاستكشاف الفضائي +25%'
            },
            {
                type: 'crypto_surge',
                change: 0.18,
                message: '₿ موجة صعود العملات المشفرة +18%'
            },
            {
                type: 'tech_crash',
                change: -0.12,
                message: '📉 تصحيح مؤقت في قطاع التكنولوجيا -12%'
            },
            {
                type: 'innovation_bonus',
                change: 0.15,
                message: '💡 مكافأة الابتكار والبحث +15%'
            }
        ];
        
        const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
        this.state.wealth *= (1 + scenario.change);
        
        if (scenario.change > 0) {
            this.showToast(scenario.message, 'success');
            this.createMoneyRain();
        } else {
            this.showToast(scenario.message, 'warning');
        }
    }

    showEventModal(event) {
        const modal = document.getElementById('event-modal');
        document.getElementById('event-title').textContent = event.title;
        document.getElementById('event-description').textContent = event.description;
        
        const choicesContainer = document.getElementById('event-choices');
        choicesContainer.innerHTML = '';
        
        event.choices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'choice-button';
            button.textContent = choice.text;
            button.addEventListener('click', () => {
                choice.effect();
                this.closeModal();
                this.updateDisplay();
                this.checkAchievements();
                this.checkMilestones();
                this.unlockCategories();
            });
            choicesContainer.appendChild(button);
        });
        
        modal.style.display = 'flex';
    }

    closeModal() {
        document.getElementById('event-modal').style.display = 'none';
    }

    checkAchievements() {
        this.achievements.forEach(achievement => {
            if (!this.state.achievements.includes(achievement.id) && achievement.condition()) {
                this.state.achievements.push(achievement.id);
                this.showAchievement(achievement);
            }
        });
    }

    showAchievement(achievement) {
        this.showToast(`🏆 إنجاز جديد: ${achievement.name} - ${achievement.description}`, 'success');
        this.createCelebrationEffect();
        
        // Achievement rewards
        this.state.wealth += 500000000; // 500M bonus
        this.state.reputation += 10;
    }

    getTotalSpent() {
        return this.state.gameStats.totalSpent;
    }

    getCategoryCount(category) {
        let count = 0;
        this.data[category].forEach(item => {
            count += this.state.ownedItems[item.id] || 0;
        });
        return count;
    }

    getCategorySpent(category) {
        let spent = 0;
        this.data[category].forEach(item => {
            const owned = this.state.ownedItems[item.id] || 0;
            for (let i = 0; i < owned; i++) {
                spent += this.calculateCost(item, i);
            }
        });
        return spent;
    }

    updateDisplay() {
        document.getElementById('wealth').textContent = this.formatMoney(this.state.wealth);
        document.getElementById('income-rate').textContent = `+${this.formatMoney(this.state.incomePerSec)}/س`;
        document.getElementById('expense-rate').textContent = `-${this.formatMoney(this.state.expensePerSec)}/س`;
        
        document.getElementById('reputation').textContent = Math.floor(this.state.reputation);
        document.getElementById('innovation').textContent = Math.floor(this.state.innovation);
        document.getElementById('happiness').textContent = Math.floor(this.state.happiness);
        document.getElementById('carbon').textContent = Math.floor(this.state.carbon);
        
        const influenceDisplay = document.getElementById('influence');
        if (influenceDisplay) {
            influenceDisplay.textContent = Math.floor(this.state.influence);
        }
        
        this.updateIndicatorColors();
        this.updateWealthGlow();
    }

    updateIndicatorColors() {
        const indicators = [
            { id: 'reputation', value: this.state.reputation, good: 200, bad: 20 },
            { id: 'innovation', value: this.state.innovation, good: 300, bad: 30 },
            { id: 'happiness', value: this.state.happiness, good: 200, bad: 20 },
            { id: 'carbon', value: -this.state.carbon, good: -100, bad: 100 },
            { id: 'influence', value: this.state.influence, good: 100, bad: 10 }
        ];
        
        indicators.forEach(indicator => {
            const element = document.getElementById(indicator.id);
            if (!element) return;
            
            const parent = element.parentElement;
            parent.classList.remove('positive', 'negative', 'neutral');
            
            if (indicator.value >= indicator.good) {
                parent.classList.add('positive');
            } else if (indicator.value <= indicator.bad) {
                parent.classList.add('negative');
            } else {
                parent.classList.add('neutral');
            }
        });
    }

    updateWealthGlow() {
        const wealthElement = document.getElementById('wealth');
        const netIncome = this.state.incomePerSec - this.state.expensePerSec;
        
        wealthElement.classList.remove('gaining', 'losing');
        
        if (netIncome > 0) {
            wealthElement.classList.add('gaining');
        } else if (netIncome < 0) {
            wealthElement.classList.add('losing');
        }
    }

    formatMoney(amount) {
        const units = ['', 'K', 'M', 'B', 'T', 'Q', 'Qi', 'Sx', 'Sp'];
        let unitIndex = 0;
        let value = Math.abs(amount);
        
        while (value >= 1000 && unitIndex < units.length - 1) {
            value /= 1000;
            unitIndex++;
        }
        
        const formatted = value < 10 ? value.toFixed(2) : value < 100 ? value.toFixed(1) : Math.floor(value);
        return `$${formatted}${units[unitIndex]}`;
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<span class="toast-icon">${type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️'}</span> ${message}`;
        
        const container = document.getElementById('toast-container');
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }

    showPurchaseEffect(icon, cost) {
        const effect = document.createElement('div');
        effect.className = 'purchase-effect';
        effect.innerHTML = `
            <div class="effect-icon">${icon}</div>
            <div class="effect-cost">-${this.formatMoney(cost)}</div>
        `;
        
        document.body.appendChild(effect);
        
        setTimeout(() => effect.remove(), 2500);
    }

    createMoneyExplosion() {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                this.particles.push({
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2,
                    vx: (Math.random() - 0.5) * 15,
                    vy: (Math.random() - 0.5) * 15,
                    life: 1,
                    decay: 0.02,
                    color: '#3ddc97',
                    size: Math.random() * 6 + 4
                });
            }, i * 30);
        }
    }

    createCelebrationEffect() {
        const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#9C27B0'];
        for (let i = 0; i < 80; i++) {
            setTimeout(() => {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: -10,
                    vx: (Math.random() - 0.5) * 6,
                    vy: Math.random() * 8 + 3,
                    life: 1,
                    decay: 0.008,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    size: Math.random() * 5 + 3
                });
            }, i * 50);
        }
    }

    createMoneyRain() {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: -10,
                    vx: 0,
                    vy: Math.random() * 4 + 3,
                    life: 1,
                    decay: 0.006,
                    color: '#00d4ff',
                    size: Math.random() * 4 + 3
                });
            }, i * 100);
        }
    }

    shakeElement(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.classList.add('shake');
            setTimeout(() => element.classList.remove('shake'), 600);
        }
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    save() {
        const saveData = {
            ...this.state,
            saveTime: Date.now()
        };
        localStorage.setItem('elonWealthGame', JSON.stringify(saveData));
        this.showToast('💾 تم حفظ إمبراطوريتك المالية!', 'success');
    }

    load() {
        const saved = localStorage.getItem('elonWealthGame');
        if (saved) {
            const data = JSON.parse(saved);
            this.state = { ...this.state, ...data };
            
            // Calculate offline earnings
            if (data.saveTime) {
                const offlineTime = (Date.now() - data.saveTime) / 1000;
                const offlineEarnings = Math.max(0, (this.state.incomePerSec - this.state.expensePerSec) * Math.min(offlineTime, 43200)); // Max 12 hours
                if (offlineEarnings > 0) {
                    this.state.wealth += offlineEarnings;
                    this.showToast(`💰 ربحت ${this.formatMoney(offlineEarnings)} أثناء غيابك!`, 'success');
                }
            }
            
            this.updateDisplay();
            this.renderCurrentTab();
            this.unlockCategories();
            this.showToast('📁 تم تحميل إمبراطوريتك بنجاح!', 'success');
        }
    }
}

// Auto-save every 20 seconds
setInterval(() => {
    if (window.game) {
        window.game.save();
    }
}, 20000);

// Initialize game
window.addEventListener('DOMContentLoaded', () => {
    window.game = new ElonWealthGame();
    setTimeout(() => window.game.load(), 1000);
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (!window.game) return;
    
    const shortcuts = {
        '1': 'luxury',
        '2': 'tech', 
        '3': 'space',
        '4': 'projects',
        '5': 'charity',
        '6': 'research',
        '7': 'entertainment'
    };
    
    if (shortcuts[e.key]) {
        window.game.switchTab(shortcuts[e.key]);
    } else if (e.key === 's' && e.ctrlKey) {
        e.preventDefault();
        window.game.save();
    }
});

// PWA support
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {
        console.log('Service Worker registration failed');
    });
}
