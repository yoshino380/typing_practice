class EducationalTypingApp {
    constructor() {
        this.currentLesson = 'home-position';
        this.currentScreen = 'lesson-menu'; // 'lesson-menu', 'learning', 'result'
        this.currentCharIndex = 0;
        this.lessonProgress = 0;
        this.maxProgress = 20; // 各レベルで20問（レベル6は30問）
        
        this.stats = {
            correct: 0,
            incorrect: 0,
            totalKeystrokes: 0,
            weakKeys: {},
            startTime: null
        };
        
        this.progressData = {
            'home-position': { completed: false, accuracy: 0 },
            'basic-keys': { completed: false, accuracy: 0 },
            'all-keys': { completed: false, accuracy: 0 },
            'japanese-words': { completed: false, accuracy: 0 },
            'long-japanese-words': { completed: false, accuracy: 0 },
            'daily-conversation': { completed: false, accuracy: 0 }
        };
        
        // 学習データ定義
        this.lessons = {
            'home-position': {
                title: 'レベル1: ホームポジション',
                description: '左手の指をA・S・D・F、右手の指をJ・K・Lに置いて、正しい指で文字を入力しましょう。',
                chars: ['f', 'j', 'd', 'k', 's', 'l', 'a'],
                requiredAccuracy: 80
            },
            'basic-keys': {
                title: 'レベル2: 基本文字',
                description: 'ホームポジションから近いキーも使って、より多くの文字を練習しましょう。',
                chars: ['f', 'j', 'd', 'k', 's', 'l', 'a', 'g', 'h', 'r', 'u', 'e', 'i', 'w', 'o', 'q', 'p', 't', 'y'],
                requiredAccuracy: 85
            },
            'all-keys': {
                title: 'レベル3: 全文字',
                description: '全てのアルファベットキーを使って、完全なタイピングスキルを身につけましょう。',
                chars: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
                requiredAccuracy: 90
            },
            'japanese-words': {
                title: 'レベル4: 日本語単語',
                description: '日本語の単語をローマ字で入力して、実践的なタイピングスキルを身につけましょう。',
                words: [
                    { japanese: 'ねこ', romaji: 'neko', alternatives: [] },
                    { japanese: 'いぬ', romaji: 'inu', alternatives: [] },
                    { japanese: 'さくら', romaji: 'sakura', alternatives: [] },
                    { japanese: 'みず', romaji: 'mizu', alternatives: [] },
                    { japanese: 'ほん', romaji: 'hon', alternatives: [] },
                    { japanese: 'でんわ', romaji: 'denwa', alternatives: [] },
                    { japanese: 'てがみ', romaji: 'tegami', alternatives: [] },
                    { japanese: 'くるま', romaji: 'kuruma', alternatives: [] },
                    { japanese: 'がっこう', romaji: 'gakkou', alternatives: ['gakkoo'] },
                    { japanese: 'しごと', romaji: 'shigoto', alternatives: ['sigoto'] },
                    { japanese: 'いえ', romaji: 'ie', alternatives: [] },
                    { japanese: 'かぞく', romaji: 'kazoku', alternatives: [] },
                    { japanese: 'ともだち', romaji: 'tomodachi', alternatives: ['tomodati'] },
                    { japanese: 'せんせい', romaji: 'sensei', alternatives: [] },
                    { japanese: 'がくせい', romaji: 'gakusei', alternatives: [] },
                    { japanese: 'ちち', romaji: 'chichi', alternatives: ['titi'] },
                    { japanese: 'はは', romaji: 'haha', alternatives: [] },
                    { japanese: 'あに', romaji: 'ani', alternatives: [] },
                    { japanese: 'あね', romaji: 'ane', alternatives: [] },
                    { japanese: 'おとうと', romaji: 'otouto', alternatives: [] },
                    { japanese: 'いもうと', romaji: 'imouto', alternatives: [] },
                    { japanese: 'つき', romaji: 'tsuki', alternatives: ['tuki'] },
                    { japanese: 'ひ', romaji: 'hi', alternatives: [] },
                    { japanese: 'みち', romaji: 'michi', alternatives: ['miti'] },
                    { japanese: 'やま', romaji: 'yama', alternatives: [] },
                    { japanese: 'うみ', romaji: 'umi', alternatives: [] },
                    { japanese: 'かわ', romaji: 'kawa', alternatives: [] },
                    { japanese: 'あめ', romaji: 'ame', alternatives: [] },
                    { japanese: 'ゆき', romaji: 'yuki', alternatives: [] },
                    { japanese: 'はな', romaji: 'hana', alternatives: [] },
                ],
                requiredAccuracy: 85
            },
            'long-japanese-words': {
                title: 'レベル5: 長めの単語',
                description: '文字数の多い単語に挑戦して、タイピングの持久力をつけましょう。',
                words: [
                    { japanese: 'おはよう', romaji: 'ohayou', alternatives: [] },
                    { japanese: 'こんばんは', romaji: 'konbanwa', alternatives: [] },
                    { japanese: 'さようなら', romaji: 'sayounara', alternatives: [] },
                    { japanese: 'ありがとう', romaji: 'arigatou', alternatives: [] },
                    { japanese: 'すみません', romaji: 'sumimasen', alternatives: [] },
                    { japanese: 'こんにちは', romaji: 'konnichiha', alternatives: ['konnitiha'] },
                    { japanese: 'いただきます', romaji: 'itadakimasu', alternatives: [] },
                    { japanese: 'ごちそうさま', romaji: 'gochisousama', alternatives: ['gotisousama'] },
                    { japanese: 'はじめまして', romaji: 'hajimemashite', alternatives: ['hazimemasite'] },
                    { japanese: 'よろしく', romaji: 'yoroshiku', alternatives: ['yorosiku'] },
                    { japanese: 'げんきです', romaji: 'genkidesu', alternatives: [] },
                    { japanese: 'たんじょうび', romaji: 'tanjoubi', alternatives: ['tanjyoubi'] },
                    { japanese: 'でんしゃ', romaji: 'densha', alternatives: ['densya'] },
                    { japanese: 'びょういん', romaji: 'byouin', alternatives: ['byooin'] },
                    { japanese: 'ぎんこう', romaji: 'ginkou', alternatives: ['ginkoo'] },
                    { japanese: 'だいがく', romaji: 'daigaku', alternatives: [] },
                    { japanese: 'しんぶん', romaji: 'shinbun', alternatives: ['sinbun'] },
                    { japanese: 'たべもの', romaji: 'tabemono', alternatives: [] },
                    { japanese: 'のみもの', romaji: 'nomimono', alternatives: [] },
                    { japanese: 'きょうしつ', romaji: 'kyoushitsu', alternatives: ['kyoositu'] },
                    { japanese: 'としょかん', romaji: 'toshokan', alternatives: ['tosyokan'] },
                    { japanese: 'きっぷ', romaji: 'kippu', alternatives: [] },
                    { japanese: 'りょこう', romaji: 'ryokou', alternatives: ['ryokoo'] },
                    { japanese: 'しゅくだい', romaji: 'shukudai', alternatives: ['syukudai'] },
                    { japanese: 'せんたく', romaji: 'sentaku', alternatives: [] },
                    { japanese: 'びじゅつかん', romaji: 'bijutsukan', alternatives: ['bizutsukan'] },
                    { japanese: 'やくそく', romaji: 'yakusoku', alternatives: [] },
                    { japanese: 'ちゅうしゃじょう', romaji: 'chuushajou', alternatives: ['tyuusyazyou'] },
                    { japanese: 'けしゴム', romaji: 'keshigomu', alternatives: [] },
                    { japanese: 'あたらしい', romaji: 'atarashii', alternatives: ['atarasii'] },
                    { japanese: 'つぎのひ', romaji: 'tsuginohi', alternatives: ['tuginohi'] },
                    { japanese: 'きのう', romaji: 'kinou', alternatives: ['kinoo'] },
                    { japanese: 'あした', romaji: 'ashita', alternatives: [] },
                    { japanese: 'らいしゅう', romaji: 'raishuu', alternatives: ['raisyuu'] },
                    { japanese: 'せんしゅう', romaji: 'senshuu', alternatives: ['sensyuu'] },
                    { japanese: 'ともだち', romaji: 'tomodachi', alternatives: ['tomodati'] },
                    { japanese: 'ざっし', romaji: 'zasshi', alternatives: ['zassi'] },
                    { japanese: 'もんだい', romaji: 'mondai', alternatives: [] },
                    { japanese: 'けっこん', romaji: 'kekkon', alternatives: [] },
                    { japanese: 'しゃしん', romaji: 'shashin', alternatives: ['syasin'] },
                    { japanese: 'じかん', romaji: 'jikan', alternatives: ['zikan'] },
                    { japanese: 'ちいさい', romaji: 'chiisai', alternatives: ['tiisai'] },
                    { japanese: 'おおきい', romaji: 'ookii', alternatives: [] },
                    { japanese: 'たのしい', romaji: 'tanoshii', alternatives: ['tanosii'] },
                    { japanese: 'かなしい', romaji: 'kanashii', alternatives: ['kanasii'] },
                    { japanese: 'うれしい', romaji: 'ureshii', alternatives: ['uresii'] },
                    { japanese: 'つまらない', romaji: 'tsumaranai', alternatives: ['tumaranai'] },
                    { japanese: 'むずかしい', romaji: 'muzukashii', alternatives: ['muzukasii'] },
                    { japanese: 'やさしい', romaji: 'yasashii', alternatives: ['yasasii'] },
                    { japanese: 'おもしろい', romaji: 'omoshiroi', alternatives: [] },
                ],
                requiredAccuracy: 80
            },
            'daily-conversation': {
                title: 'レベル6: 日常会話',
                description: '実際の日常会話で使われる表現をタイピング練習しましょう。',
                sentences: [
                    { japanese: 'おはようございます', hiragana: 'おはようございます', romaji: 'ohayougozaimasu', alternatives: [] },
                    { japanese: 'こんにちは', hiragana: 'こんにちは', romaji: 'konnichiha', alternatives: ['konnitiha'] },
                    { japanese: 'こんばんは', hiragana: 'こんばんは', romaji: 'konbanwa', alternatives: [] },
                    { japanese: 'ありがとうございます', hiragana: 'ありがとうございます', romaji: 'arigatougozaimasu', alternatives: [] },
                    { japanese: 'どういたしまして', hiragana: 'どういたしまして', romaji: 'douitashimashite', alternatives: ['douitasimasite'] },
                    { japanese: 'すみません', hiragana: 'すみません', romaji: 'sumimasen', alternatives: [] },
                    { japanese: 'ごめんなさい', hiragana: 'ごめんなさい', romaji: 'gomennasai', alternatives: [] },
                    { japanese: 'おやすみなさい', hiragana: 'おやすみなさい', romaji: 'oyasuminasai', alternatives: [] },
                    { japanese: 'いらっしゃいませ', hiragana: 'いらっしゃいませ', romaji: 'irasshaimase', alternatives: ['irassyaimase'] },
                    { japanese: 'よろしくお願いします', hiragana: 'よろしくおねがいします', romaji: 'yoroshikuonegaishimasu', alternatives: ['yorosikuonegaisimasu'] },
                    { japanese: 'お疲れ様でした', hiragana: 'おつかれさまでした', romaji: 'otsukareasamadeshita', alternatives: ['otukaresamadesita'] },
                    { japanese: 'はじめまして', hiragana: 'はじめまして', romaji: 'hajimemashite', alternatives: ['hazimemasite'] },
                    { japanese: 'お元気ですか', hiragana: 'おげんきですか', romaji: 'ogenkidesuka', alternatives: [] },
                    { japanese: 'げんきです', hiragana: 'げんきです', romaji: 'genkidesu', alternatives: [] },
                    { japanese: 'いただきます', hiragana: 'いただきます', romaji: 'itadakimasu', alternatives: [] },
                    { japanese: 'ごちそうさまでした', hiragana: 'ごちそうさまでした', romaji: 'gochisousamadeshita', alternatives: ['gotisousamadesita'] },
                    { japanese: 'いってきます', hiragana: 'いってきます', romaji: 'ittekimasu', alternatives: [] },
                    { japanese: 'いってらっしゃい', hiragana: 'いってらっしゃい', romaji: 'itterasshai', alternatives: ['itterassyai'] },
                    { japanese: 'ただいま', hiragana: 'ただいま', romaji: 'tadaima', alternatives: [] },
                    { japanese: 'おかえりなさい', hiragana: 'おかえりなさい', romaji: 'okaerinasai', alternatives: [] },
                    { japanese: 'おめでとうございます', hiragana: 'おめでとうございます', romaji: 'omedetougozaimasu', alternatives: [] },
                    { japanese: 'がんばってください', hiragana: 'がんばってください', romaji: 'ganbattekudasai', alternatives: [] },
                    { japanese: 'だいじょうぶです', hiragana: 'だいじょうぶです', romaji: 'daijoubudesu', alternatives: ['daizyoubudesu'] },
                    { japanese: 'わかりました', hiragana: 'わかりました', romaji: 'wakarimashita', alternatives: ['wakarimasita'] },
                    { japanese: 'しつれいします', hiragana: 'しつれいします', romaji: 'shitsureishimasu', alternatives: ['sitsureisimasu'] },
                    { japanese: 'お世話になります', hiragana: 'おせわになります', romaji: 'osewaninarimasu', alternatives: [] },
                    { japanese: 'お先に失礼します', hiragana: 'おさきにしつれいします', romaji: 'osakinishitsureishimasu', alternatives: ['osakinisitsureisimasu'] },
                    { japanese: 'いいお天気ですね', hiragana: 'いいおてんきですね', romaji: 'iiotenkidesune', alternatives: [] },
                    { japanese: 'お忙しいですか', hiragana: 'おいそがしいですか', romaji: 'oisogashiidesuka', alternatives: ['oisogasiidesuka'] },
                    { japanese: 'また明日', hiragana: 'またあした', romaji: 'mataashita', alternatives: [] },
                    { japanese: 'また今度', hiragana: 'またこんど', romaji: 'matakondo', alternatives: [] },
                    { japanese: 'お疲れ様', hiragana: 'おつかれさま', romaji: 'otsukaresama', alternatives: ['otukaresamadesu'] },
                    { japanese: 'いいえ、けっこうです', hiragana: 'いいえ、けっこうです', romaji: 'iie,kekkou desu', alternatives: [] },
                    { japanese: 'ちょっと待ってください', hiragana: 'ちょっとまってください', romaji: 'chottomattekudasai', alternatives: ['tyottomattekudasai'] },
                    { japanese: 'お時間ありますか', hiragana: 'おじかんありますか', romaji: 'ozikanarimasuka', alternatives: ['ojikanarimasuka'] },
                    { japanese: 'お手伝いしましょうか', hiragana: 'おてつだいしましょうか', romaji: 'otetsudaishimashoka', alternatives: [] },
                    { japanese: 'とても美味しいです', hiragana: 'とてもおいしいです', romaji: 'totemooishiidesu', alternatives: ['totemooisiidesu'] },
                    { japanese: 'お腹がすきました', hiragana: 'おなかがすきました', romaji: 'onakagasukimashita', alternatives: [] },
                    { japanese: 'のどが渇きました', hiragana: 'のどがかわきました', romaji: 'nodogakawakimashita', alternatives: [] },
                    { japanese: '眠くなりました', hiragana: 'ねむくなりました', romaji: 'nemukunarimashita', alternatives: [] },
                    { japanese: 'お金を貸してください', hiragana: 'おかねをかしてください', romaji: 'okanewokashitekudasai', alternatives: [] },
                    { japanese: 'どこで買いましたか', hiragana: 'どこでかいましたか', romaji: 'dokodekaimashitaka', alternatives: [] },
                    { japanese: 'いくらですか', hiragana: 'いくらですか', romaji: 'ikuradesuka', alternatives: [] },
                    { japanese: 'それは高すぎます', hiragana: 'それはたかすぎます', romaji: 'sorehatakasugimasuu', alternatives: [] },
                    { japanese: 'もう少し安くしてください', hiragana: 'もうすこしやすくしてください', romaji: 'mousukoshiyasukushitekudasai', alternatives: [] },
                    { japanese: '今日は暑いですね', hiragana: 'きょうはあついですね', romaji: 'kyouhaatsuidesune', alternatives: [] },
                    { japanese: '今日は寒いですね', hiragana: 'きょうはさむいですね', romaji: 'kyouhasamuidesune', alternatives: [] },
                    { japanese: '雨が降りそうです', hiragana: 'あめがふりそうです', romaji: 'amegafurisoudesu', alternatives: [] },
                    { japanese: '電話番号を教えてください', hiragana: 'でんわばんごうをおしえてください', romaji: 'denwabangouwooshietekudasai', alternatives: [] },
                    { japanese: '住所はどこですか', hiragana: 'じゅうしょはどこですか', romaji: 'juushohadokodesuka', alternatives: ['zyuusyohadokodesuka'] },
                    { japanese: '今何時ですか', hiragana: 'いまなんじですか', romaji: 'imananjidesuka', alternatives: [] }
                ],
                requiredAccuracy: 90
            }
        };
        
        this.fingerMap = {
            'q': 'left-pinky', 'w': 'left-ring', 'e': 'left-middle', 'r': 'left-index', 't': 'left-index',
            'a': 'left-pinky', 's': 'left-ring', 'd': 'left-middle', 'f': 'left-index', 'g': 'left-index',
            'z': 'left-pinky', 'x': 'left-ring', 'c': 'left-middle', 'v': 'left-index', 'b': 'left-index',
            'y': 'right-index', 'u': 'right-index', 'i': 'right-middle', 'o': 'right-ring', 'p': 'right-pinky',
            'h': 'right-index', 'j': 'right-index', 'k': 'right-middle', 'l': 'right-ring', ';': 'right-pinky',
            'n': 'right-index', 'm': 'right-index', '-': 'right-pinky',
            '、': 'right-ring', '。': 'right-middle', '.': 'right-middle', ',': 'right-ring'
        };
        
        this.fingerNames = {
            'left-pinky': '左手の小指',
            'left-ring': '左手の薬指',
            'left-middle': '左手の中指',
            'left-index': '左手の人差し指',
            'right-index': '右手の人差し指',
            'right-middle': '右手の中指',
            'right-ring': '右手の薬指',
            'right-pinky': '右手の小指'
        };
        
        this.currentTarget = '';
        this.isWordMode = false;
        this.isSentenceMode = false;
        this.currentJapaneseItem = null;
        this.typedRomaji = '';
        this.validRomajiPatterns = [];
        this.activePatterns = [];
        this.timeLimit = null;
        this.timer = null;
        this.timeRemaining = 0;
        this.consecutiveFailures = 0;
        this.maxConsecutiveFailures = 5;
        
        this.init();
    }
    
    init() {
        this.loadProgress();
        this.setupEventListeners();
        this.showLessonMenu();
        this.updateProgressDisplay();
    }
    
    setupEventListeners() {
        document.querySelectorAll('.lesson-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const lesson = e.currentTarget.dataset.lesson;
                if (this.isLessonUnlocked(lesson)) {
                    this.startLesson(lesson);
                }
            });
        });
        
        document.getElementById('back-btn').addEventListener('click', () => this.showLessonMenu());
        document.getElementById('hint-btn').addEventListener('click', () => this.showHint());
        document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('retry-btn').addEventListener('click', () => this.retryLesson());
        document.getElementById('next-level-btn').addEventListener('click', () => this.goToNextLevel());
        document.getElementById('menu-btn').addEventListener('click', () => this.showLessonMenu());
        
        const input = document.getElementById('typing-input');
        input.addEventListener('input', (e) => this.handleTyping(e.target.value));
        
        document.addEventListener('keydown', (e) => {
            this.highlightKey(e.key);
            if (e.key === 'Enter' && this.currentScreen === 'learning') {
                e.preventDefault();
                this.nextQuestion();
            }
        });
        
        document.addEventListener('keyup', (e) => this.removeKeyHighlight(e.key));
        document.addEventListener('click', () => {
            if (this.currentScreen === 'learning') input.focus();
        });
    }

    loadProgress() {
        const saved = localStorage.getItem('typingProgress');
        if (saved) {
            const savedData = JSON.parse(saved);
            this.progressData = {...this.progressData, ...savedData};
        }
    }
    
    saveProgress() {
        localStorage.setItem('typingProgress', JSON.stringify(this.progressData));
    }
    
    isLessonUnlocked(lesson) {
        const lessons = ['home-position', 'basic-keys', 'all-keys', 'japanese-words', 'long-japanese-words', 'daily-conversation'];
        const index = lessons.indexOf(lesson);
        if (index === 0) return true;
        const prevLesson = lessons[index - 1];
        return this.progressData[prevLesson] && this.progressData[prevLesson].completed;
    }
    
    updateProgressDisplay() {
        document.querySelectorAll('.lesson-card').forEach(card => {
            const lesson = card.dataset.lesson;
            const statusElement = card.querySelector('.lesson-status');
            const isUnlocked = this.isLessonUnlocked(lesson);
            card.classList.toggle('unlocked', isUnlocked);
            card.classList.toggle('locked', !isUnlocked);
            if (isUnlocked) {
                if (this.progressData[lesson] && this.progressData[lesson].completed) {
                    statusElement.textContent = '✅ クリア済み';
                    statusElement.className = 'lesson-status completed';
                } else {
                    statusElement.textContent = '開始可能';
                    statusElement.className = 'lesson-status unlocked';
                }
            } else {
                statusElement.textContent = '🔒 ロック中';
                statusElement.className = 'lesson-status locked';
            }
        });
        
        const totalLevels = 6;
        const completedLevels = Object.values(this.progressData).filter(p => p.completed).length;
        const progressPercentage = (completedLevels / totalLevels) * 100;
        document.getElementById('progress-fill').style.width = progressPercentage + '%';
        
        const currentLevel = completedLevels < totalLevels ? completedLevels + 1 : totalLevels;
        const levelNames = ['ホームポジション', '基本文字', '全文字', '日本語単語', '長めの単語', '日常会話'];
        document.getElementById('progress-text').textContent = 
            completedLevels === totalLevels ? '🎉 全レベルクリア！' : `レベル${currentLevel}: ${levelNames[currentLevel - 1]}`;
    }
    
    showLessonMenu() {
        this.currentScreen = 'lesson-menu';
        document.getElementById('lesson-menu').style.display = 'block';
        document.getElementById('learning-area').style.display = 'none';
        document.getElementById('result-screen').style.display = 'none';
        this.updateProgressDisplay();
    }
    
    startLesson(lesson) {
        this.currentLesson = lesson;
        this.currentScreen = 'learning';
        this.lessonProgress = 0;
        this.stats = { correct: 0, incorrect: 0, totalKeystrokes: 0, weakKeys: {}, startTime: new Date() };
        this.consecutiveFailures = 0;
        
        // レベル6のみ30問、他は20問
        this.maxProgress = lesson === 'daily-conversation' ? 30 : 20;
        
        // レベル6のみ制限時間を設定
        this.timeLimit = lesson === 'daily-conversation' ? 15 : null;
        
        document.getElementById('lesson-menu').style.display = 'none';
        document.getElementById('learning-area').style.display = 'block';
        document.getElementById('result-screen').style.display = 'none';
        
        const lessonData = this.lessons[lesson];
        document.getElementById('lesson-title').textContent = lessonData.title;
        document.getElementById('lesson-description').textContent = lessonData.description;
        
        this.isWordMode = lesson === 'japanese-words' || lesson === 'long-japanese-words';
        this.isSentenceMode = lesson === 'daily-conversation';
        
        this.generateQuestion();
        this.updateStats();
        this.updateFailureCounter();
        
        setTimeout(() => document.getElementById('typing-input').focus(), 100);
    }
    
    generateQuestion() {
        const lessonData = this.lessons[this.currentLesson];
        
        if (this.isWordMode || this.isSentenceMode) {
            const items = this.isWordMode ? lessonData.words : lessonData.sentences;
            this.currentJapaneseItem = items[Math.floor(Math.random() * items.length)];
            this.currentTarget = this.currentJapaneseItem.romaji;
            this.typedRomaji = '';
            
            // Create base patterns from romaji and alternatives
            const basePatterns = [this.currentJapaneseItem.romaji, ...this.currentJapaneseItem.alternatives].filter(p => p);
            
            // Add normalized versions (without spaces and punctuation) for input validation
            const normalizeText = (text) => text.replace(/[\s\.,\?\!。、・？！]/g, '');
            const allPatterns = [];
            
            for (const pattern of basePatterns) {
                allPatterns.push(pattern);
                const normalized = normalizeText(pattern);
                if (normalized !== pattern && normalized.length > 0) {
                    allPatterns.push(normalized);
                }
            }
            
            this.validRomajiPatterns = [...new Set(allPatterns)]; // Remove duplicates
            this.activePatterns = [...this.validRomajiPatterns];

            // Display Japanese (original)
            document.getElementById('japanese-display').textContent = this.currentJapaneseItem.japanese;
            
            // Display hiragana reading (if available)
            if (this.currentJapaneseItem.hiragana) {
                document.getElementById('hiragana-display').textContent = this.currentJapaneseItem.hiragana;
                document.getElementById('hiragana-display').style.display = 'block';
            } else {
                document.getElementById('hiragana-display').style.display = 'none';
            }
            
            // Display romaji input patterns
            const patternsText = this.validRomajiPatterns.join(' / ');
            document.getElementById('romaji-display').textContent = patternsText;
            
            // Simplified instruction text
            document.getElementById('finger-instruction').textContent = '上記のローマ字を入力してください';
        } else {
            this.currentTarget = lessonData.chars[Math.floor(Math.random() * lessonData.chars.length)];
            document.getElementById('japanese-display').textContent = this.currentTarget.toUpperCase();
            document.getElementById('hiragana-display').style.display = 'none'; // Hide hiragana for character practice
            document.getElementById('romaji-display').textContent = ''; // Clear romaji display for character practice
            const finger = this.fingerMap[this.currentTarget];
            const fingerName = this.fingerNames[finger];
            document.getElementById('finger-instruction').textContent = `${fingerName}で「${this.currentTarget.toUpperCase()}」を押してください`;
        }
        
        const input = document.getElementById('typing-input');
        input.value = '';
        input.maxLength = (this.isWordMode || this.isSentenceMode) ? 100 : 1;
        
        this.highlightTargetKey();
        this.highlightTargetFinger();
        this.startTimer();
        this.updateFailureCounter();
    }

    getNextTargetChar() {
        if (this.isWordMode || this.isSentenceMode) {
            if (this.activePatterns.length > 0) {
                // Find the best matching pattern based on current input
                const inputLower = this.typedRomaji;
                let bestPattern = null;
                
                // First try to find exact match
                for (const pattern of this.activePatterns) {
                    if (pattern.startsWith(inputLower)) {
                        bestPattern = pattern;
                        break;
                    }
                }
                
                // If no exact match, try normalized matching
                if (!bestPattern) {
                    const normalizeText = (text) => text.replace(/[\s\.,\?\!。、・？！]/g, '');
                    const normalizedInput = normalizeText(inputLower);
                    
                    for (const pattern of this.activePatterns) {
                        const normalizedPattern = normalizeText(pattern);
                        if (normalizedPattern.startsWith(normalizedInput)) {
                            // Calculate the next character position in the original pattern
                            let charCount = 0;
                            for (let i = 0; i < pattern.length; i++) {
                                const char = pattern[i];
                                if (!/[\s\.,\?\!。、・？！]/.test(char)) {
                                    if (charCount === normalizedInput.length) {
                                        return char;
                                    }
                                    charCount++;
                                } else if (charCount === normalizedInput.length) {
                                    return char;
                                }
                            }
                        }
                    }
                }
                
                if (bestPattern) {
                    return bestPattern[inputLower.length] || '';
                }
            }
        } else {
            return this.currentTarget;
        }
        return '';
    }

    highlightTargetKey() {
        document.querySelectorAll('.key').forEach(key => key.classList.remove('active'));
        const targetChar = this.getNextTargetChar();
        if (targetChar) {
            const keyElement = document.querySelector(`.key[data-key="${targetChar}"]`);
            if (keyElement) keyElement.classList.add('active');
        }
    }
    
    highlightTargetFinger() {
        document.querySelectorAll('.finger').forEach(finger => finger.classList.remove('active'));
        const targetChar = this.getNextTargetChar();
        if (targetChar && this.fingerMap[targetChar]) {
            const finger = this.fingerMap[targetChar];
            const fingerElement = document.querySelector(`.finger[data-finger="${finger}"]`);
            if (fingerElement) fingerElement.classList.add('active');
        }
    }
    
    startTimer() {
        this.clearTimer();
        
        if (this.timeLimit) {
            this.timeRemaining = this.timeLimit;
            this.updateTimerDisplay();
            
            this.timer = setInterval(() => {
                this.timeRemaining--;
                this.updateTimerDisplay();
                
                if (this.timeRemaining <= 0) {
                    this.handleTimeUp();
                }
            }, 1000);
        }
    }
    
    clearTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
    
    updateTimerDisplay() {
        const timerElement = document.getElementById('timer-display');
        if (timerElement && this.timeLimit) {
            timerElement.textContent = `残り時間: ${this.timeRemaining}秒`;
            timerElement.style.display = 'block';
            
            // 時間が少なくなったら色を変える
            if (this.timeRemaining <= 3) {
                timerElement.style.color = '#ff4444';
            } else if (this.timeRemaining <= 5) {
                timerElement.style.color = '#ff8800';
            } else {
                timerElement.style.color = '#333';
            }
        } else if (timerElement) {
            timerElement.style.display = 'none';
        }
    }
    
    updateFailureCounter() {
        const failureElement = document.getElementById('failure-counter');
        if (failureElement && this.currentLesson === 'daily-conversation') {
            const remaining = this.maxConsecutiveFailures - this.consecutiveFailures;
            failureElement.textContent = `連続失敗: ${this.consecutiveFailures}回 (あと${remaining}回でゲームオーバー)`;
            failureElement.style.display = 'block';
            
            // 失敗回数に応じて色を変える
            if (remaining <= 1) {
                failureElement.style.color = '#ff0000';
            } else if (remaining <= 2) {
                failureElement.style.color = '#ff4444';
            } else if (remaining <= 3) {
                failureElement.style.color = '#ff8800';
            } else {
                failureElement.style.color = '#d32f2f';
            }
        } else if (failureElement) {
            failureElement.style.display = 'none';
        }
    }
    
    handleTimeUp() {
        this.clearTimer();
        
        this.stats.incorrect++;
        this.consecutiveFailures++;
        
        const targetChar = this.getNextTargetChar();
        if (targetChar) {
            this.stats.weakKeys[targetChar] = (this.stats.weakKeys[targetChar] || 0) + 1;
        }
        
        // レベル6で連続失敗回数が上限に達した場合、レッスンを強制終了
        if (this.currentLesson === 'daily-conversation' && this.consecutiveFailures >= this.maxConsecutiveFailures) {
            this.showFeedback('incorrect', `${this.maxConsecutiveFailures}回連続で失敗しました。レッスンを終了します。`);
            setTimeout(() => {
                this.showResult();
            }, 2500);
            return;
        }
        
        // レベル6で時間切れした場合、ゲームオーバー
        if (this.currentLesson === 'daily-conversation') {
            this.showFeedback('incorrect', '時間切れ！ゲームオーバーです。');
            setTimeout(() => {
                this.showResult();
            }, 2500);
            return;
        }
        
        let feedbackMessage = '時間切れ！';
        this.showFeedback('incorrect', feedbackMessage);
        const inputElement = document.getElementById('typing-input');
        inputElement.value = '';
        
        if (this.isWordMode || this.isSentenceMode) {
            this.typedRomaji = '';
            this.activePatterns = [...this.validRomajiPatterns];
        }
        
        this.highlightTargetKey();
        this.highlightTargetFinger();
        this.updateStats();
        this.updateFailureCounter();
    }
    
    handleTyping(input) {
        if (this.currentScreen !== 'learning') return;
        
        if (this.isWordMode || this.isSentenceMode) {
            const inputLower = input.toLowerCase();
            
            // Create normalized versions for comparison (remove spaces and punctuation)
            const normalizeText = (text) => text.replace(/[\s\.,\?\!。、・？！]/g, '');
            const normalizedInput = normalizeText(inputLower);
            
            const remainingPatterns = this.validRomajiPatterns.filter(p => {
                const normalizedPattern = normalizeText(p);
                return normalizedPattern.startsWith(normalizedInput) || p.startsWith(inputLower);
            });

            if (remainingPatterns.length > 0) {
                this.activePatterns = remainingPatterns;
                this.typedRomaji = inputLower;

                // Check completion with both normalized and exact matching
                const isCompletedExact = this.activePatterns.some(p => p === inputLower);
                const isCompletedNormalized = this.activePatterns.some(p => {
                    const normalizedPattern = normalizeText(p);
                    return normalizedPattern === normalizedInput && normalizedInput.length > 0;
                });
                
                if (isCompletedExact || isCompletedNormalized) {
                    this.currentTarget = this.activePatterns.find(p => 
                        p === inputLower || normalizeText(p) === normalizedInput
                    );
                    this.handleCorrectAnswer();
                } else {
                    this.highlightTargetKey();
                    this.highlightTargetFinger();
                }
            } else {
                this.handleIncorrectAnswer();
            }
        } else {
            if (input.toLowerCase() === this.currentTarget) {
                this.handleCorrectAnswer();
            } else {
                this.handleIncorrectAnswer();
            }
        }
    }
    
    handleCorrectAnswer() {
        this.clearTimer();
        this.stats.correct++;
        this.lessonProgress++;
        this.consecutiveFailures = 0; // 正解時は連続失敗回数をリセット
        this.showFeedback('correct', '正解！');
        this.updateStats();
        this.updateFailureCounter();
        
        // Clear input field for all modes
        const inputElement = document.getElementById('typing-input');
        inputElement.value = '';
        
        setTimeout(() => {
            if (this.lessonProgress >= this.maxProgress) {
                this.showResult();
            } else {
                this.generateQuestion();
            }
        }, 800);
    }
    
    handleIncorrectAnswer() {
        this.stats.incorrect++;
        this.consecutiveFailures++;
        
        const targetChar = this.getNextTargetChar();
        if (targetChar) {
            this.stats.weakKeys[targetChar] = (this.stats.weakKeys[targetChar] || 0) + 1;
        }
        
        // レベル6で連続失敗回数が上限に達した場合、レッスンを強制終了
        if (this.currentLesson === 'daily-conversation' && this.consecutiveFailures >= this.maxConsecutiveFailures) {
            this.showFeedback('incorrect', `${this.maxConsecutiveFailures}回連続で失敗しました。レッスンを終了します。`);
            setTimeout(() => {
                this.showResult();
            }, 2500);
            return;
        }
        
        let feedbackMessage = 'もう一度！';
        if (this.currentLesson === 'daily-conversation' && this.consecutiveFailures > 1) {
            feedbackMessage = `連続${this.consecutiveFailures}回目の失敗！あと${this.maxConsecutiveFailures - this.consecutiveFailures}回失敗するとレッスン終了です！`;
        }
        
        this.showFeedback('incorrect', feedbackMessage);
        const inputElement = document.getElementById('typing-input');
        inputElement.value = '';
        
        if (this.isWordMode || this.isSentenceMode) {
            this.typedRomaji = '';
            this.activePatterns = [...this.validRomajiPatterns];
        }
        
        this.highlightTargetKey();
        this.highlightTargetFinger();
        this.updateStats();
        this.updateFailureCounter();
    }
    
    showFeedback(type, message) {
        const feedback = document.getElementById('typing-feedback');
        feedback.textContent = message;
        feedback.className = `typing-feedback ${type}`;
        setTimeout(() => { feedback.textContent = ''; feedback.className = 'typing-feedback'; }, 1500);
    }
    
    updateStats() {
        document.getElementById('correct-count').textContent = this.stats.correct;
        document.getElementById('miss-count').textContent = this.stats.incorrect;
        const totalAttempts = this.stats.correct + this.stats.incorrect;
        const accuracy = totalAttempts > 0 ? Math.round((this.stats.correct / totalAttempts) * 100) : 100;
        document.getElementById('accuracy').textContent = accuracy + '%';
        document.getElementById('level-progress').textContent = `${this.lessonProgress}/${this.maxProgress}`;
    }
    
    showResult() {
        this.clearTimer();
        this.currentScreen = 'result';
        
        // 失敗カウンターを非表示にする
        const failureElement = document.getElementById('failure-counter');
        if (failureElement) {
            failureElement.style.display = 'none';
        }
        const totalAttempts = this.stats.correct + this.stats.incorrect;
        const accuracy = totalAttempts > 0 ? Math.round((this.stats.correct / totalAttempts) * 100) : 100;
        const lessonData = this.lessons[this.currentLesson];
        const passed = accuracy >= lessonData.requiredAccuracy;

        if (passed) {
            this.progressData[this.currentLesson].completed = true;
            this.progressData[this.currentLesson].accuracy = accuracy;
            this.saveProgress();
        }

        document.getElementById('learning-area').style.display = 'none';
        document.getElementById('result-screen').style.display = 'block';

        const resultTitle = document.getElementById('result-title');
        const resultMessage = document.getElementById('result-message');

        if (passed) {
            resultTitle.textContent = '🎉 レベルクリア！';
            resultMessage.textContent = '素晴らしい！次のレベルに進みましょう！';
        } else {
            resultTitle.textContent = '😭 もう一歩！';
            resultMessage.textContent = `残念！クリアには正答率${lessonData.requiredAccuracy}%以上が必要です。`;
        }

        document.getElementById('total-inputs').textContent = totalAttempts;
        document.getElementById('final-correct').textContent = this.stats.correct;
        document.getElementById('final-accuracy').textContent = accuracy + '%';

        const weakKeys = Object.keys(this.stats.weakKeys).sort((a, b) => this.stats.weakKeys[b] - this.stats.weakKeys[a]).slice(0, 3);
        document.getElementById('weak-keys').textContent = weakKeys.length > 0 ? weakKeys.join(', ').toUpperCase() : 'なし';

        const nextLevelBtn = document.getElementById('next-level-btn');
        const nextLesson = this.getNextLesson();
        
        // Show next level button if passed and not on the last level
        if (passed && nextLesson) {
            nextLevelBtn.style.display = 'inline-block';
            nextLevelBtn.style.visibility = 'visible';
        } else {
            nextLevelBtn.style.display = 'none';
            nextLevelBtn.style.visibility = 'hidden';
        }
    }
    
    getNextLesson() {
        const lessons = ['home-position', 'basic-keys', 'all-keys', 'japanese-words', 'long-japanese-words', 'daily-conversation'];
        const currentIndex = lessons.indexOf(this.currentLesson);
        return currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
    }
    
    retryLesson() {
        this.startLesson(this.currentLesson);
    }
    
    goToNextLevel() {
        const nextLesson = this.getNextLesson();
        if (nextLesson) this.startLesson(nextLesson);
    }
    
    nextQuestion() {
        if (this.lessonProgress >= this.maxProgress) {
            this.showResult();
        } else {
            this.generateQuestion();
        }
    }
    
    showHint() {
        const targetChar = this.getNextTargetChar();
        if (targetChar && this.fingerMap[targetChar]) {
            const finger = this.fingerMap[targetChar];
            const fingerName = this.fingerNames[finger];
            this.showFeedback('correct', `ヒント: ${fingerName}で「${targetChar.toUpperCase()}」を押してください`);
        }
    }
    
    highlightKey(key) {
        if (/^[a-zA-Z-]$/.test(key) || key === '、' || key === '。' || key === '.' || key === ',') {
            const keyElement = document.querySelector(`.key[data-key="${key.toLowerCase()}"]`);
            if (keyElement) keyElement.classList.add('pressed');
        }
    }
    
    removeKeyHighlight(key) {
        if (/^[a-zA-Z-]$/.test(key) || key === '、' || key === '。' || key === '.' || key === ',') {
            const keyElement = document.querySelector(`.key[data-key="${key.toLowerCase()}"]`);
            if (keyElement) keyElement.classList.remove('pressed');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new EducationalTypingApp();
});