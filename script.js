class EducationalTypingApp {
    constructor() {
        this.currentLesson = 'home-position';
        this.currentScreen = 'lesson-menu'; // 'lesson-menu', 'learning', 'result'
        this.currentCharIndex = 0;
        this.lessonProgress = 0;
        this.maxProgress = 20; // 各レベルで20問
        
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
                    { japanese: 'ちょう', romaji: 'chou', alternatives: ['tyou'] },
                    { japanese: 'つき', romaji: 'tsuki', alternatives: ['tuki'] },
                    { japanese: 'みち', romaji: 'michi', alternatives: ['miti'] },
                    { japanese: 'たいよう', romaji: 'taiyou', alternatives: ['taiyoo'] },
                    { japanese: 'おちゃ', romaji: 'ocha', alternatives: ['otya'] },
                    { japanese: 'いちご', romaji: 'ichigo', alternatives: ['itigo'] },
                    { japanese: 'ともだち', romaji: 'tomodachi', alternatives: ['tomodati'] },
                ],
                requiredAccuracy: 85
            },
            'long-japanese-words': {
                title: 'レベル5: 長めの単語',
                description: '文字数の多い単語に挑戦して、タイピングの持久力をつけましょう。',
                words: [
                    { japanese: '挑戦', romaji: 'chousen', alternatives: ['tyousen'] },
                    { japanese: '物語', romaji: 'monogatari', alternatives: [] },
                    { japanese: 'プログラミング', romaji: 'puroguramingu', alternatives: [] },
                    { japanese: 'コミュニケーション', romaji: 'komyunike-shon', alternatives: [] },
                    { japanese: 'アプリケーション', romaji: 'apurike-shon', alternatives: [] },
                    { japanese: '新幹線', romaji: 'shinkansen', alternatives: ['sinkansen'] },
                    { japanese: '遊園地', romaji: 'yuuenchi', alternatives: ['yuuenti'] },
                    { japanese: '美術館', romaji: 'bijutsukan', alternatives: ['bijutukan'] },
                    { japanese: '誕生日', romaji: 'tanjoubi', alternatives: ['tanjyobi'] },
                    { japanese: 'お正月', romaji: 'oshougatsu', alternatives: ['osyougatu'] },
                ],
                requiredAccuracy: 80
            },
            'daily-conversation': {
                title: 'レベル6: 日常会話',
                description: '実際の日常会話で使われる表現をタイピング練習しましょう。',
                sentences: [
                    { japanese: 'おはようございます。今日も一日頑張りましょう。', hiragana: 'おはようございます。きょうもいちにちがんばりましょう。', romaji: 'ohayougozaimasu.kyoumo ichinichi ganbarimashou.', alternatives: [] },
                    { japanese: '今日の天気は晴れですね。お出かけにぴったりです。', hiragana: 'きょうのてんきははれですね。おでかけにぴったりです。', romaji: 'kyouno tenkiha haredesune.odekakeni pittaridesu.', alternatives: [] },
                    { japanese: 'すみません、駅への行き方を教えてください。', hiragana: 'すみません、えきへのいきかたをおしえてください。', romaji: 'sumimasen,ekieno ikikatawo oshietekudasai.', alternatives: [] },
                    { japanese: 'この週末は何か予定がありますか？', hiragana: 'このしゅうまつはなにかよていがありますか？', romaji: 'kono shuumatsuha nanika yoteiga arimasuka?', alternatives: ['konosyumatuha nanika yoteiga arimasuka?'] },
                    { japanese: 'また会いましょう。楽しみにしています。', hiragana: 'またあいましょう。たのしみにしています。', romaji: 'mata aimashou.tanoshimini shiteimasu.', alternatives: [] },
                ],
                requiredAccuracy: 95
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
            if (this.isSentenceMode) {
                document.getElementById('finger-instruction').textContent = 'スペースと句読点は入力してもしなくても正解です';
            } else {
                document.getElementById('finger-instruction').textContent = '上記のローマ字を入力してください';
            }
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
        this.stats.correct++;
        this.lessonProgress++;
        this.showFeedback('correct', '正解！');
        this.updateStats();
        
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
        const targetChar = this.getNextTargetChar();
        if (targetChar) {
            this.stats.weakKeys[targetChar] = (this.stats.weakKeys[targetChar] || 0) + 1;
        }
        
        this.showFeedback('incorrect', 'もう一度！');
        const inputElement = document.getElementById('typing-input');
        inputElement.value = '';
        
        if (this.isWordMode || this.isSentenceMode) {
            this.typedRomaji = '';
            this.activePatterns = [...this.validRomajiPatterns];
        }
        
        this.highlightTargetKey();
        this.highlightTargetFinger();
        this.updateStats();
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
        this.currentScreen = 'result';
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