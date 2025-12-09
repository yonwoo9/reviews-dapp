export type Language = 'zh' | 'en' | 'ja' | 'ko' | 'es' | 'fr' | 'de';

export interface Translations {
  // Header
  appTitle: string;
  appSubtitle: string;
  demoMode: string;
  connectWallet: string;
  disconnectWallet: string;
  addReview: string;
  
  // View modes
  allReviews: string;
  leaderboard: string;
  
  // Categories
  categoryFilter: string;
  all: string;
  movie: string;
  music: string;
  book: string;
  game: string;
  other: string;
  
  // Review form
  reviewTitle: string;
  selectCategory: string;
  rating: string;
  reviewContent: string;
  author: string;
  cancel: string;
  submit: string;
  posting: string;
  
  // Review list
  allReviewsTitle: string;
  movieReviews: string;
  musicReviews: string;
  bookReviews: string;
  gameReviews: string;
  otherReviews: string;
  noReviews: string;
  
  // Leaderboard
  leaderboardTitle: string;
  movieLeaderboard: string;
  musicLeaderboard: string;
  bookLeaderboard: string;
  gameLeaderboard: string;
  otherLeaderboard: string;
  leaderboardDescription: string;
  comprehensiveScore: string;
  noLeaderboardData: string;
  by: string;
  
  // Demo mode notice
  demoModeNoticeTitle: string;
  demoModeNoticeDesc1: string;
  demoModeNoticeDesc2: string;
  demoModeNoticeDesc3: string;
  dismiss: string;
  
  // Messages
  connectWalletFirst: string;
  postFailed: string;
  checkWalletAndBalance: string;
  loading: string;
  
  // Wallet
  walletConnected: string;
  walletAddress: string;
}

export const translations: Record<Language, Translations> = {
  zh: {
    appTitle: '评论世界 DApp',
    appSubtitle: 'Web3去中心化评论平台 · 综合排行榜',
    demoMode: '(演示模式)',
    connectWallet: '连接钱包',
    disconnectWallet: '断开连接',
    addReview: '发布评论',
    
    allReviews: '全部评论',
    leaderboard: '综合排行榜',
    
    categoryFilter: '分类筛选',
    all: '全部',
    movie: '电影',
    music: '音乐',
    book: '书籍',
    game: '游戏',
    other: '其他',
    
    reviewTitle: '作品名称',
    selectCategory: '选择分类',
    rating: '评分',
    reviewContent: '评论内容',
    author: '署名',
    cancel: '取消',
    submit: '提交',
    posting: '发布中...',
    
    allReviewsTitle: '所有评论',
    movieReviews: '电影评论',
    musicReviews: '音乐评论',
    bookReviews: '书籍评论',
    gameReviews: '游戏评论',
    otherReviews: '其他评论',
    noReviews: '暂无评论',
    
    leaderboardTitle: '综合排行榜 TOP 100',
    movieLeaderboard: '电影排行榜 TOP 100',
    musicLeaderboard: '音乐排行榜 TOP 100',
    bookLeaderboard: '书籍排行榜 TOP 100',
    gameLeaderboard: '游戏排行榜 TOP 100',
    otherLeaderboard: '其他排行榜 TOP 100',
    leaderboardDescription: '排名基于评分(70%)和时间热度(30%)的综合得分计算',
    comprehensiveScore: '综合得分',
    noLeaderboardData: '暂无排行数据',
    by: 'by',
    
    demoModeNoticeTitle: '演示模式',
    demoModeNoticeDesc1: '智能合约尚未部署，当前运行在演示模式下。',
    demoModeNoticeDesc2: '您的评论将保存在浏览器本地存储中，无需连接钱包。',
    demoModeNoticeDesc3: '要启用完整的Web3功能，请部署智能合约并更新合约地址。',
    dismiss: '知道了',
    
    connectWalletFirst: '请先连接钱包',
    postFailed: '发布评论失败',
    checkWalletAndBalance: '发布评论失败，请检查钱包连接和余额',
    loading: '加载中...',
    
    walletConnected: '已连接',
    walletAddress: '钱包地址',
  },
  
  en: {
    appTitle: 'Review World DApp',
    appSubtitle: 'Web3 Decentralized Review Platform · Leaderboard',
    demoMode: '(Demo Mode)',
    connectWallet: 'Connect Wallet',
    disconnectWallet: 'Disconnect',
    addReview: 'Add Review',
    
    allReviews: 'All Reviews',
    leaderboard: 'Leaderboard',
    
    categoryFilter: 'Filter by Category',
    all: 'All',
    movie: 'Movies',
    music: 'Music',
    book: 'Books',
    game: 'Games',
    other: 'Other',
    
    reviewTitle: 'Title',
    selectCategory: 'Select Category',
    rating: 'Rating',
    reviewContent: 'Review Content',
    author: 'Author',
    cancel: 'Cancel',
    submit: 'Submit',
    posting: 'Posting...',
    
    allReviewsTitle: 'All Reviews',
    movieReviews: 'Movie Reviews',
    musicReviews: 'Music Reviews',
    bookReviews: 'Book Reviews',
    gameReviews: 'Game Reviews',
    otherReviews: 'Other Reviews',
    noReviews: 'No reviews yet',
    
    leaderboardTitle: 'Leaderboard TOP 100',
    movieLeaderboard: 'Movie Leaderboard TOP 100',
    musicLeaderboard: 'Music Leaderboard TOP 100',
    bookLeaderboard: 'Book Leaderboard TOP 100',
    gameLeaderboard: 'Game Leaderboard TOP 100',
    otherLeaderboard: 'Other Leaderboard TOP 100',
    leaderboardDescription: 'Rankings based on rating (70%) and recency (30%)',
    comprehensiveScore: 'Score',
    noLeaderboardData: 'No leaderboard data',
    by: 'by',
    
    demoModeNoticeTitle: 'Demo Mode',
    demoModeNoticeDesc1: 'The smart contract has not been deployed yet.',
    demoModeNoticeDesc2: 'Your reviews will be saved in browser local storage without wallet connection.',
    demoModeNoticeDesc3: 'To enable full Web3 features, deploy the contract and update the address.',
    dismiss: 'Got it',
    
    connectWalletFirst: 'Please connect wallet first',
    postFailed: 'Failed to post review',
    checkWalletAndBalance: 'Failed to post. Please check wallet connection and balance',
    loading: 'Loading...',
    
    walletConnected: 'Connected',
    walletAddress: 'Wallet Address',
  },
  
  ja: {
    appTitle: 'レビューワールド DApp',
    appSubtitle: 'Web3分散型レビュープラットフォーム · ランキング',
    demoMode: '(デモモード)',
    connectWallet: 'ウォレット接続',
    disconnectWallet: '切断',
    addReview: 'レビュー投稿',
    
    allReviews: '全てのレビュー',
    leaderboard: 'ランキング',
    
    categoryFilter: 'カテゴリーフィルター',
    all: '全て',
    movie: '映画',
    music: '音楽',
    book: '書籍',
    game: 'ゲーム',
    other: 'その他',
    
    reviewTitle: 'タイトル',
    selectCategory: 'カテゴリー選択',
    rating: '評価',
    reviewContent: 'レビュー内容',
    author: '投稿者',
    cancel: 'キャンセル',
    submit: '投稿',
    posting: '投稿中...',
    
    allReviewsTitle: '全てのレビュー',
    movieReviews: '映画レビュー',
    musicReviews: '音楽レビュー',
    bookReviews: '書籍レビュー',
    gameReviews: 'ゲームレビュー',
    otherReviews: 'その他レビュー',
    noReviews: 'レビューはまだありません',
    
    leaderboardTitle: '総合ランキング TOP 100',
    movieLeaderboard: '映画ランキング TOP 100',
    musicLeaderboard: '音楽ランキング TOP 100',
    bookLeaderboard: '書籍ランキング TOP 100',
    gameLeaderboard: 'ゲームランキング TOP 100',
    otherLeaderboard: 'その他ランキング TOP 100',
    leaderboardDescription: 'ランキングは評価(70%)と投稿時期(30%)で計算',
    comprehensiveScore: 'スコア',
    noLeaderboardData: 'ランキングデータはありません',
    by: 'by',
    
    demoModeNoticeTitle: 'デモモード',
    demoModeNoticeDesc1: 'スマートコントラクトはまだデプロイされていません。',
    demoModeNoticeDesc2: 'レビューはブラウザのローカルストレージに保存されます。',
    demoModeNoticeDesc3: 'Web3機能を有効にするには、コントラクトをデプロイしてください。',
    dismiss: 'わかりました',
    
    connectWalletFirst: 'まずウォレットを接続してください',
    postFailed: 'レビュー投稿に失敗しました',
    checkWalletAndBalance: '投稿失敗。ウォレット接続と残高を確認してください',
    loading: '読み込み中...',
    
    walletConnected: '接続済み',
    walletAddress: 'ウォレットアドレス',
  },
  
  ko: {
    appTitle: '리뷰 월드 DApp',
    appSubtitle: 'Web3 탈중앙화 리뷰 플랫폼 · 순위표',
    demoMode: '(데모 모드)',
    connectWallet: '지갑 연결',
    disconnectWallet: '연결 해제',
    addReview: '리뷰 작성',
    
    allReviews: '모든 리뷰',
    leaderboard: '순위표',
    
    categoryFilter: '카테고리 필터',
    all: '전체',
    movie: '영화',
    music: '음악',
    book: '도서',
    game: '게임',
    other: '기타',
    
    reviewTitle: '제목',
    selectCategory: '카테고리 선택',
    rating: '평점',
    reviewContent: '리뷰 내용',
    author: '작성자',
    cancel: '취소',
    submit: '제출',
    posting: '게시 중...',
    
    allReviewsTitle: '모든 리뷰',
    movieReviews: '영화 리뷰',
    musicReviews: '음악 리뷰',
    bookReviews: '도서 리뷰',
    gameReviews: '게임 리뷰',
    otherReviews: '기타 리뷰',
    noReviews: '아직 리뷰가 없습니다',
    
    leaderboardTitle: '종합 순위표 TOP 100',
    movieLeaderboard: '영화 순위표 TOP 100',
    musicLeaderboard: '음악 순위표 TOP 100',
    bookLeaderboard: '도서 순위표 TOP 100',
    gameLeaderboard: '게임 순위표 TOP 100',
    otherLeaderboard: '기타 순위표 TOP 100',
    leaderboardDescription: '평점(70%)과 최신도(30%)를 기반으로 순위 계산',
    comprehensiveScore: '점수',
    noLeaderboardData: '순위 데이터가 없습니다',
    by: 'by',
    
    demoModeNoticeTitle: '데모 모드',
    demoModeNoticeDesc1: '스마트 컨트랙트가 아직 배포되지 않았습니다.',
    demoModeNoticeDesc2: '리뷰는 브라우저 로컬 스토리지에 저장됩니다.',
    demoModeNoticeDesc3: 'Web3 기능을 활성화하려면 컨트랙트를 배포하세요.',
    dismiss: '확인',
    
    connectWalletFirst: '먼저 지갑을 연결하세요',
    postFailed: '리뷰 게시 실패',
    checkWalletAndBalance: '게시 실패. 지갑 연결과 잔액을 확인하세요',
    loading: '로딩 중...',
    
    walletConnected: '연결됨',
    walletAddress: '지갑 주소',
  },
  
  es: {
    appTitle: 'Review World DApp',
    appSubtitle: 'Plataforma de Reseñas Descentralizada Web3 · Clasificación',
    demoMode: '(Modo Demo)',
    connectWallet: 'Conectar Cartera',
    disconnectWallet: 'Desconectar',
    addReview: 'Añadir Reseña',
    
    allReviews: 'Todas las Reseñas',
    leaderboard: 'Clasificación',
    
    categoryFilter: 'Filtrar por Categoría',
    all: 'Todas',
    movie: 'Películas',
    music: 'Música',
    book: 'Libros',
    game: 'Juegos',
    other: 'Otros',
    
    reviewTitle: 'Título',
    selectCategory: 'Seleccionar Categoría',
    rating: 'Calificación',
    reviewContent: 'Contenido de la Reseña',
    author: 'Autor',
    cancel: 'Cancelar',
    submit: 'Enviar',
    posting: 'Publicando...',
    
    allReviewsTitle: 'Todas las Reseñas',
    movieReviews: 'Reseñas de Películas',
    musicReviews: 'Reseñas de Música',
    bookReviews: 'Reseñas de Libros',
    gameReviews: 'Reseñas de Juegos',
    otherReviews: 'Otras Reseñas',
    noReviews: 'Aún no hay reseñas',
    
    leaderboardTitle: 'Clasificación TOP 100',
    movieLeaderboard: 'Clasificación de Películas TOP 100',
    musicLeaderboard: 'Clasificación de Música TOP 100',
    bookLeaderboard: 'Clasificación de Libros TOP 100',
    gameLeaderboard: 'Clasificación de Juegos TOP 100',
    otherLeaderboard: 'Otras Clasificaciones TOP 100',
    leaderboardDescription: 'Clasificación basada en calificación (70%) y actualidad (30%)',
    comprehensiveScore: 'Puntuación',
    noLeaderboardData: 'No hay datos de clasificación',
    by: 'por',
    
    demoModeNoticeTitle: 'Modo Demo',
    demoModeNoticeDesc1: 'El contrato inteligente aún no ha sido desplegado.',
    demoModeNoticeDesc2: 'Tus reseñas se guardarán en el almacenamiento local del navegador.',
    demoModeNoticeDesc3: 'Para habilitar funciones Web3 completas, despliega el contrato.',
    dismiss: 'Entendido',
    
    connectWalletFirst: 'Por favor, conecta primero la cartera',
    postFailed: 'Error al publicar reseña',
    checkWalletAndBalance: 'Error al publicar. Verifica la conexión y el saldo',
    loading: 'Cargando...',
    
    walletConnected: 'Conectado',
    walletAddress: 'Dirección de Cartera',
  },
  
  fr: {
    appTitle: 'Review World DApp',
    appSubtitle: 'Plateforme d\'Avis Décentralisée Web3 · Classement',
    demoMode: '(Mode Démo)',
    connectWallet: 'Connecter Portefeuille',
    disconnectWallet: 'Déconnecter',
    addReview: 'Ajouter un Avis',
    
    allReviews: 'Tous les Avis',
    leaderboard: 'Classement',
    
    categoryFilter: 'Filtrer par Catégorie',
    all: 'Tous',
    movie: 'Films',
    music: 'Musique',
    book: 'Livres',
    game: 'Jeux',
    other: 'Autres',
    
    reviewTitle: 'Titre',
    selectCategory: 'Sélectionner une Catégorie',
    rating: 'Note',
    reviewContent: 'Contenu de l\'Avis',
    author: 'Auteur',
    cancel: 'Annuler',
    submit: 'Soumettre',
    posting: 'Publication...',
    
    allReviewsTitle: 'Tous les Avis',
    movieReviews: 'Avis sur les Films',
    musicReviews: 'Avis sur la Musique',
    bookReviews: 'Avis sur les Livres',
    gameReviews: 'Avis sur les Jeux',
    otherReviews: 'Autres Avis',
    noReviews: 'Pas encore d\'avis',
    
    leaderboardTitle: 'Classement TOP 100',
    movieLeaderboard: 'Classement Films TOP 100',
    musicLeaderboard: 'Classement Musique TOP 100',
    bookLeaderboard: 'Classement Livres TOP 100',
    gameLeaderboard: 'Classement Jeux TOP 100',
    otherLeaderboard: 'Autres Classements TOP 100',
    leaderboardDescription: 'Classement basé sur la note (70%) et la récence (30%)',
    comprehensiveScore: 'Score',
    noLeaderboardData: 'Aucune donnée de classement',
    by: 'par',
    
    demoModeNoticeTitle: 'Mode Démo',
    demoModeNoticeDesc1: 'Le contrat intelligent n\'a pas encore été déployé.',
    demoModeNoticeDesc2: 'Vos avis seront enregistrés dans le stockage local du navigateur.',
    demoModeNoticeDesc3: 'Pour activer les fonctionnalités Web3 complètes, déployez le contrat.',
    dismiss: 'Compris',
    
    connectWalletFirst: 'Veuillez d\'abord connecter le portefeuille',
    postFailed: 'Échec de la publication de l\'avis',
    checkWalletAndBalance: 'Échec de la publication. Vérifiez la connexion et le solde',
    loading: 'Chargement...',
    
    walletConnected: 'Connecté',
    walletAddress: 'Adresse du Portefeuille',
  },
  
  de: {
    appTitle: 'Review World DApp',
    appSubtitle: 'Web3 Dezentrale Bewertungsplattform · Bestenliste',
    demoMode: '(Demo-Modus)',
    connectWallet: 'Wallet Verbinden',
    disconnectWallet: 'Trennen',
    addReview: 'Bewertung Hinzufügen',
    
    allReviews: 'Alle Bewertungen',
    leaderboard: 'Bestenliste',
    
    categoryFilter: 'Nach Kategorie Filtern',
    all: 'Alle',
    movie: 'Filme',
    music: 'Musik',
    book: 'Bücher',
    game: 'Spiele',
    other: 'Andere',
    
    reviewTitle: 'Titel',
    selectCategory: 'Kategorie Auswählen',
    rating: 'Bewertung',
    reviewContent: 'Bewertungsinhalt',
    author: 'Autor',
    cancel: 'Abbrechen',
    submit: 'Absenden',
    posting: 'Wird Veröffentlicht...',
    
    allReviewsTitle: 'Alle Bewertungen',
    movieReviews: 'Filmbewertungen',
    musicReviews: 'Musikbewertungen',
    bookReviews: 'Buchbewertungen',
    gameReviews: 'Spielebewertungen',
    otherReviews: 'Andere Bewertungen',
    noReviews: 'Noch keine Bewertungen',
    
    leaderboardTitle: 'Bestenliste TOP 100',
    movieLeaderboard: 'Film-Bestenliste TOP 100',
    musicLeaderboard: 'Musik-Bestenliste TOP 100',
    bookLeaderboard: 'Buch-Bestenliste TOP 100',
    gameLeaderboard: 'Spiele-Bestenliste TOP 100',
    otherLeaderboard: 'Andere Bestenlisten TOP 100',
    leaderboardDescription: 'Ranking basiert auf Bewertung (70%) und Aktualität (30%)',
    comprehensiveScore: 'Punktzahl',
    noLeaderboardData: 'Keine Bestenlisten-Daten',
    by: 'von',
    
    demoModeNoticeTitle: 'Demo-Modus',
    demoModeNoticeDesc1: 'Der Smart Contract wurde noch nicht bereitgestellt.',
    demoModeNoticeDesc2: 'Ihre Bewertungen werden im lokalen Browser-Speicher gespeichert.',
    demoModeNoticeDesc3: 'Um vollständige Web3-Funktionen zu aktivieren, stellen Sie den Vertrag bereit.',
    dismiss: 'Verstanden',
    
    connectWalletFirst: 'Bitte verbinden Sie zuerst das Wallet',
    postFailed: 'Bewertung konnte nicht veröffentlicht werden',
    checkWalletAndBalance: 'Veröffentlichung fehlgeschlagen. Überprüfen Sie Verbindung und Guthaben',
    loading: 'Lädt...',
    
    walletConnected: 'Verbunden',
    walletAddress: 'Wallet-Adresse',
  },
};

// Detect language from IP geolocation
export async function detectLanguageFromIP(): Promise<Language> {
  try {
    // Try ipapi.co (free, no API key required)
    const response = await fetch('https://ipapi.co/json/');
    if (response.ok) {
      const data = await response.json();
      const countryCode = data.country_code?.toLowerCase();
      
      // Map country codes to languages
      const countryToLanguage: Record<string, Language> = {
        'cn': 'zh',
        'tw': 'zh',
        'hk': 'zh',
        'us': 'en',
        'gb': 'en',
        'sg': 'en',
        'ca': 'en',
        'au': 'en',
        'nz': 'en',
        'jp': 'ja',
        'kr': 'ko',
        'es': 'es',
        'mx': 'es',
        'ar': 'es',
        'co': 'es',
        'cl': 'es',
        'fr': 'fr',
        'be': 'fr',
        'ch': 'fr',
        'de': 'de',
        'at': 'de',
      };
      
      return countryToLanguage[countryCode] || 'en';
    }
  } catch (error) {
    console.log('IP detection failed, falling back to browser language');
  }
  
  // Fallback to browser language
  return detectLanguageFromBrowser();
}

// Detect language from browser settings
export function detectLanguageFromBrowser(): Language {
  const browserLang = navigator.language.toLowerCase();
  
  if (browserLang.startsWith('zh')) return 'zh';
  if (browserLang.startsWith('ja')) return 'ja';
  if (browserLang.startsWith('ko')) return 'ko';
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('fr')) return 'fr';
  if (browserLang.startsWith('de')) return 'de';
  
  return 'en'; // Default to English
}

export function getTranslation(lang: Language): Translations {
  return translations[lang];
}
