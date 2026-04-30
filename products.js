const PRODUCTS = [

  // ══════════════ NAPOLI (Serie A) ══════════════
  { id: 1, name: "Maglia Napoli Home 2025/26", category: "SerieA", categoryLabel: "Serie A", price: 34.99, oldPrice: null, badge: null, badgeLabel: null, image: "images/3d/Napoli home 2526.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "La maglia casalinga del Napoli 2025/26. Azzurro brillante con dettagli premium.", inStock: true },
  { id: 2, name: "Maglia Napoli Away 2025/26", category: "SerieA", categoryLabel: "Serie A", price: 45.00, oldPrice: 60.00, badge: "sale", badgeLabel: "25% OFF", image: "images/3d/Napoli away 2526.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia trasferta Napoli 2025/26. Design moderno con tecnologia traspirante.", inStock: true },
  { id: 3, name: "Maglia Napoli Home 2024/25", category: "SerieA", categoryLabel: "Serie A", price: 88.00, oldPrice: null, badge: "new", badgeLabel: "NUOVO", image: "images/3d/Napoli home 2425.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia ufficiale Napoli stagione 2024/25.", inStock: true },
  { id: 4, name: "Maglia Napoli Away 2024/25", category: "SerieA", categoryLabel: "Serie A", price: 87.50, oldPrice: 95.00, badge: "sale", badgeLabel: "OFFERTA", image: "images/3d/Napoli away 2425.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia trasferta Napoli 2024/25.", inStock: true },
  { id: 5, name: "Maglia Napoli Away 2023/24", category: "SerieA", categoryLabel: "Serie A", price: 84.99, oldPrice: null, badge: null, badgeLabel: null, image: "images/3d/Napoli away 2324.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia trasferta Napoli 2023/24.", inStock: true },
  { id: 6, name: "Maglia Napoli Third 2023/24", category: "SerieA", categoryLabel: "Serie A", price: 20.00, oldPrice: null, badge: "old", badgeLabel: "Vintage", image: "images/3d/Napoli 3°maglia 2324.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Terza maglia Napoli 2023/24 da collezione.", inStock: true },
  { id: 7, name: "Maglia Napoli Halloween 2023", category: "SerieA", categoryLabel: "Serie A", price: 20.00, oldPrice: 25.99, badge: "sale", badgeLabel: "OFFERTA", image: "images/3d/Napoli 4°maglia 2324.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Edizione speciale Halloween del Napoli 2023.", inStock: true },
  { id: 8, name: "Maglia Napoli Prematch 2023/24", category: "SerieA", categoryLabel: "Serie A", price: 20.00, oldPrice: null, badge: "old", badgeLabel: "Vintage", image: "images/3d/Napoli Prematch 2324.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia pre-partita Napoli 2023/24.", inStock: true },
  { id: 9, name: "Maglia Napoli Allenamento 2023/24", category: "SerieA", categoryLabel: "Serie A", price: 18.99, oldPrice: null, badge: null, badgeLabel: null, image: "images/3d/Napoli Training 2324.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia allenamento Napoli 2023/24.", inStock: true },

  // ══════════════ REAL MADRID ══════════════
  { id: 13, name: "Maglia Real Madrid Home 2025/26", category: ["Champions", "SerieA"], categoryLabel: ["Champions League", "Serie A"], price: 20.00, oldPrice: null, badge: null, badgeLabel: null, image: "images/3d/ChatGPT Image 29 apr 2026, 01_40_03.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "La divisa della squadra che ha vinto 15 Champions League.", inStock: true },
  { id: 14, name: "Maglia Real Madrid Away 2025/26", category: "Champions", categoryLabel: "Champions League", price: 89.99, oldPrice: 110.00, badge: "sale", badgeLabel: "18% OFF", image: "images/teams/real_away.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia trasferta del Real Madrid 2025/26. Design elegante viola.", inStock: true },

  // ══════════════ PSG ══════════════
  { id: 15, name: "Maglia PSG Home 2025/26", category: "Champions", categoryLabel: "Champions League", price: 94.99, oldPrice: null, badge: "new", badgeLabel: "NUOVO", image: "images/teams/psg_home.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "La maglia casalinga del Paris Saint-Germain 2025/26. Blu con dettagli rossi.", inStock: true },
  { id: 16, name: "Maglia PSG Away 2025/26", category: "Champions", categoryLabel: "Champions League", price: 89.99, oldPrice: null, badge: null, badgeLabel: null, image: "images/teams/psg_away.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia trasferta PSG 2025/26. Bianco con bordi colorati.", inStock: true },

  // ══════════════ BARCELLONA ══════════════
  { id: 17, name: "Maglia Barcellona Home 2025/26", category: "Champions", categoryLabel: "Champions League", price: 92.00, oldPrice: null, badge: "new", badgeLabel: "NUOVO", image: "images/teams/barca_home.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "La classica blaugrana del Barcellona 2025/26. Tessuto tecnico Dri-FIT.", inStock: true },
  { id: 18, name: "Maglia Barcellona Away 2025/26", category: "Champions", categoryLabel: "Champions League", price: 87.00, oldPrice: 100.00, badge: "sale", badgeLabel: "13% OFF", image: "images/teams/barca_away.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia trasferta Barcellona 2025/26. Oro e bordò.", inStock: true },

  // ══════════════ ATLETICO MADRID ══════════════
  { id: 19, name: "Maglia Atletico Madrid Home 2025/26", category: "Champions", categoryLabel: "Champions League", price: 85.00, oldPrice: null, badge: null, badgeLabel: null, image: "images/teams/atletico_home.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia casalinga Atletico Madrid 2025/26. Strisce bianche e rosse iconiche.", inStock: true },
  { id: 20, name: "Maglia Atletico Madrid Away 2025/26", category: "Champions", categoryLabel: "Champions League", price: 80.00, oldPrice: null, badge: null, badgeLabel: null, image: "images/teams/atletico_away.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia trasferta Atletico Madrid 2025/26.", inStock: true },

  // ══════════════ PORTO ══════════════
  { id: 21, name: "Maglia Porto Home 2025/26", category: "Champions", categoryLabel: "Champions League", price: 75.00, oldPrice: null, badge: null, badgeLabel: null, image: "images/teams/porto_home.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia casalinga Porto 2025/26. Blu e bianco.", inStock: true },

  // ══════════════ MANCHESTER CITY (Premier League) ══════════════
  { id: 22, name: "Maglia Manchester City Home 2025/26", category: ["Champions", "Premier"], categoryLabel: ["Champions League", "Premier League"], price: 95.00, oldPrice: null, badge: "new", badgeLabel: "NUOVO", image: "images/teams/mancity_home.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia casalinga Manchester City 2025/26. Azzurro cielo con sponsor Puma.", inStock: true },
  { id: 23, name: "Maglia Manchester City Away 2025/26", category: "Premier", categoryLabel: "Premier League", price: 90.00, oldPrice: 105.00, badge: "sale", badgeLabel: "14% OFF", image: "images/teams/mancity_away.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia trasferta Manchester City 2025/26. Design bianco elegante.", inStock: true },

  // ══════════════ ARSENAL ══════════════
  { id: 24, name: "Maglia Arsenal Home 2025/26", category: ["Champions", "Premier"], categoryLabel: ["Champions League", "Premier League"], price: 92.00, oldPrice: null, badge: "new", badgeLabel: "NUOVO", image: "images/teams/arsenal_home.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "La classica maglia rossa dell'Arsenal 2025/26. Adidas con dettagli bianchi.", inStock: true },
  { id: 25, name: "Maglia Arsenal Away 2025/26", category: "Premier", categoryLabel: "Premier League", price: 87.00, oldPrice: null, badge: null, badgeLabel: null, image: "images/teams/arsenal_away.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia trasferta Arsenal 2025/26. Giallo con dettagli blu.", inStock: true },

  // ══════════════ LIVERPOOL ══════════════
  { id: 26, name: "Maglia Liverpool Home 2025/26", category: ["Champions", "Premier"], categoryLabel: ["Champions League", "Premier League"], price: 94.00, oldPrice: null, badge: "new", badgeLabel: "NUOVO", image: "images/teams/liverpool_home.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia casalinga Liverpool 2025/26. Rosso intenso con logo LFC ricamato.", inStock: true },
  { id: 27, name: "Maglia Liverpool Away 2025/26", category: "Premier", categoryLabel: "Premier League", price: 88.00, oldPrice: 100.00, badge: "sale", badgeLabel: "12% OFF", image: "images/teams/liverpool_away.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia trasferta Liverpool 2025/26. Verde menta con dettagli rossi.", inStock: true },

  // ══════════════ CHELSEA ══════════════
  { id: 28, name: "Maglia Chelsea Home 2025/26", category: "Premier", categoryLabel: "Premier League", price: 90.00, oldPrice: null, badge: null, badgeLabel: null, image: "images/teams/chelsea_home.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia casalinga Chelsea 2025/26. Blu reale con logo CFC.", inStock: true },
  { id: 29, name: "Maglia Chelsea Away 2025/26", category: "Premier", categoryLabel: "Premier League", price: 85.00, oldPrice: null, badge: null, badgeLabel: null, image: "images/teams/chelsea_away.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia trasferta Chelsea 2025/26. Bianco con bordi blu.", inStock: true },

  // ══════════════ MANCHESTER UNITED ══════════════
  { id: 30, name: "Maglia Manchester United Home 2025/26", category: "Premier", categoryLabel: "Premier League", price: 93.00, oldPrice: null, badge: "new", badgeLabel: "NUOVO", image: "images/teams/manutd_home.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia casalinga Manchester United 2025/26. Rosso iconico con logo diavolo.", inStock: true },
  { id: 31, name: "Maglia Manchester United Away 2025/26", category: "Premier", categoryLabel: "Premier League", price: 88.00, oldPrice: 100.00, badge: "sale", badgeLabel: "12% OFF", image: "images/teams/manutd_away.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia trasferta Manchester United 2025/26. Bianco con dettagli neri.", inStock: true },

  // ══════════════ TOTTENHAM ══════════════
  { id: 32, name: "Maglia Tottenham Home 2025/26", category: "Premier", categoryLabel: "Premier League", price: 86.00, oldPrice: null, badge: null, badgeLabel: null, image: "images/teams/tottenham_home.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia casalinga Tottenham 2025/26. Bianco con gallo ricamato.", inStock: true },

  // ══════════════ NEWCASTLE ══════════════
  { id: 33, name: "Maglia Newcastle Home 2025/26", category: "Premier", categoryLabel: "Premier League", price: 84.00, oldPrice: null, badge: null, badgeLabel: null, image: "images/teams/newcastle_home.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia casalinga Newcastle 2025/26. Strisce bianco-nere iconiche.", inStock: true },

  // ══════════════ INTER (Serie A) ══════════════
  { id: 34, name: "Maglia Inter Home 2025/26", category: ["Champions", "SerieA"], categoryLabel: ["Champions League", "Serie A"], price: 91.00, oldPrice: null, badge: "new", badgeLabel: "NUOVO", image: "images/teams/inter_home.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia casalinga Inter 2025/26. Strisce nerazzurre con Nike.", inStock: true },
  { id: 35, name: "Maglia Inter Away 2025/26", category: "SerieA", categoryLabel: "Serie A", price: 86.00, oldPrice: 100.00, badge: "sale", badgeLabel: "14% OFF", image: "images/teams/inter_away.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia trasferta Inter 2025/26. Bianco con dettagli nerazzurri.", inStock: true },

  // ══════════════ JUVENTUS (Serie A) ══════════════
  { id: 36, name: "Maglia Juventus Home 2025/26", category: ["Champions", "SerieA"], categoryLabel: ["Champions League", "Serie A"], price: 90.00, oldPrice: null, badge: "new", badgeLabel: "NUOVO", image: "images/teams/juve_home.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia casalinga Juventus 2025/26. Strisce bianconere iconiche.", inStock: true },
  { id: 37, name: "Maglia Juventus Away 2025/26", category: "SerieA", categoryLabel: "Serie A", price: 85.00, oldPrice: null, badge: null, badgeLabel: null, image: "images/teams/juve_away.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia trasferta Juventus 2025/26. Nero con dettagli oro.", inStock: true },

  // ══════════════ MILAN (Serie A) ══════════════
  { id: 38, name: "Maglia Milan Home 2025/26", category: ["Champions", "SerieA"], categoryLabel: ["Champions League", "Serie A"], price: 89.00, oldPrice: null, badge: "new", badgeLabel: "NUOVO", image: "images/teams/milan_home.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia casalinga Milan 2025/26. Strisce rossonere con Puma.", inStock: true },
  { id: 39, name: "Maglia Milan Away 2025/26", category: "SerieA", categoryLabel: "Serie A", price: 84.00, oldPrice: 100.00, badge: "sale", badgeLabel: "16% OFF", image: "images/teams/milan_away.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia trasferta Milan 2025/26. Bianco con banda rossa.", inStock: true },

  // ══════════════ ROMA (Serie A) ══════════════
  { id: 40, name: "Maglia Roma Home 2025/26", category: "SerieA", categoryLabel: "Serie A", price: 82.00, oldPrice: null, badge: null, badgeLabel: null, image: "images/teams/roma_home.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia casalinga Roma 2025/26. Rosso giallorosso con lupo ricamato.", inStock: true },
  { id: 41, name: "Maglia Roma Away 2025/26", category: "SerieA", categoryLabel: "Serie A", price: 78.00, oldPrice: null, badge: null, badgeLabel: null, image: "images/teams/roma_away.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia trasferta Roma 2025/26. Bianco con bordi gialli.", inStock: true },

  // ══════════════ LAZIO (Serie A) ══════════════
  { id: 42, name: "Maglia Lazio Home 2025/26", category: "SerieA", categoryLabel: "Serie A", price: 82.00, oldPrice: null, badge: null, badgeLabel: null, image: "images/teams/lazio_home.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia casalinga Lazio 2025/26. Celeste con aquila ricamata.", inStock: true },
  { id: 43, name: "Maglia Lazio Away 2025/26", category: "SerieA", categoryLabel: "Serie A", price: 77.00, oldPrice: null, badge: null, badgeLabel: null, image: "images/teams/lazio_away.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia trasferta Lazio 2025/26. Bianco con dettagli celesti.", inStock: true },

  // ══════════════ FIORENTINA (Serie A) ══════════════
  { id: 44, name: "Maglia Fiorentina Home 2025/26", category: "SerieA", categoryLabel: "Serie A", price: 79.00, oldPrice: null, badge: null, badgeLabel: null, image: "images/teams/fiorentina_home.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia casalinga Fiorentina 2025/26. Viola con giglio ricamato.", inStock: true },

  // ══════════════ ATALANTA (Serie A) ══════════════
  { id: 45, name: "Maglia Atalanta Home 2025/26", category: ["Champions", "SerieA"], categoryLabel: ["Champions League", "Serie A"], price: 80.00, oldPrice: null, badge: "new", badgeLabel: "NUOVO", image: "images/teams/atalanta_home.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia casalinga Atalanta 2025/26. Strisce neroazzurre bergamasche.", inStock: true },

  // ══════════════ BORUSSIA DORTMUND ══════════════
  { id: 46, name: "Maglia Borussia Dortmund Home 2025/26", category: ["Champions", "Bundesliga"], categoryLabel: ["Champions League", "Bundesliga"], price: 88.00, oldPrice: null, badge: "new", badgeLabel: "NUOVO", image: "images/teams/dortmund_home.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia casalinga BVB 2025/26. Giallo-nero iconico di Dortmund.", inStock: true },
  { id: 47, name: "Maglia Borussia Dortmund Away 2025/26", category: "Bundesliga", categoryLabel: "Bundesliga", price: 83.00, oldPrice: null, badge: null, badgeLabel: null, image: "images/teams/dortmund_away.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia trasferta BVB 2025/26. Nero con dettagli gialli.", inStock: true },

  // ══════════════ BAYERN MONACO ══════════════
  { id: 48, name: "Maglia Bayern Monaco Home 2025/26", category: ["Champions", "Bundesliga"], categoryLabel: ["Champions League", "Bundesliga"], price: 92.00, oldPrice: null, badge: "new", badgeLabel: "NUOVO", image: "images/jersey_germany.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia casalinga Bayern Monaco 2025/26. Rosso Adidas con stemma ricamato.", inStock: true },
  { id: 49, name: "Maglia Bayern Monaco Away 2025/26", category: "Bundesliga", categoryLabel: "Bundesliga", price: 87.00, oldPrice: 100.00, badge: "sale", badgeLabel: "13% OFF", image: "images/teams/bayern_away.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia trasferta Bayern Monaco 2025/26. Bianco con bordi rossi.", inStock: true },

  // ══════════════ BAYER LEVERKUSEN ══════════════
  { id: 50, name: "Maglia Bayer Leverkusen Home 2025/26", category: "Bundesliga", categoryLabel: "Bundesliga", price: 82.00, oldPrice: null, badge: null, badgeLabel: null, image: "images/teams/leverkusen_home.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia casalinga Bayer Leverkusen 2025/26. Rosso-nero dei campioni.", inStock: true },

  // ══════════════ RB LEIPZIG ══════════════
  { id: 51, name: "Maglia RB Leipzig Home 2025/26", category: "Bundesliga", categoryLabel: "Bundesliga", price: 80.00, oldPrice: null, badge: null, badgeLabel: null, image: "images/teams/leipzig_home.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia casalinga RB Leipzig 2025/26. Bianco e rosso con Nike.", inStock: true },

  // ══════════════ EINTRACHT FRANCOFORTE ══════════════
  { id: 52, name: "Maglia Eintracht Francoforte Home 2025/26", category: "Bundesliga", categoryLabel: "Bundesliga", price: 78.00, oldPrice: null, badge: null, badgeLabel: null, image: "images/teams/eintracht_home.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia casalinga Eintracht Francoforte 2025/26. Bianco-nero-rosso.", inStock: true },

  // ══════════════ AL NASSR (Saudi Pro League) ══════════════
  { id: 53, name: "Maglia Al Nassr Home 2025/26", category: "SaudiLeague", categoryLabel: "Saudi Pro League", price: 75.00, oldPrice: null, badge: "new", badgeLabel: "NUOVO", image: "images/teams/alnassr_home.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "La maglia di Cristiano Ronaldo! Al Nassr Home 2025/26. Giallo e blu iconici.", inStock: true },
  { id: 54, name: "Maglia Al Nassr Away 2025/26", category: "SaudiLeague", categoryLabel: "Saudi Pro League", price: 70.00, oldPrice: 85.00, badge: "sale", badgeLabel: "18% OFF", image: "images/teams/alnassr_away.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia trasferta Al Nassr 2025/26 — la squadra di CR7. Bianco con dettagli blu.", inStock: true },
  { id: 55, name: "Maglia Al Nassr CR7 Edition 2025", category: "SaudiLeague", categoryLabel: "Saudi Pro League", price: 99.00, oldPrice: null, badge: "new", badgeLabel: "SPECIALE", image: "images/teams/alnassr_cr7.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Edizione speciale Al Nassr con il numero 7 di Cristiano Ronaldo. Collezione limitata.", inStock: true },

  // ══════════════ AL HILAL ══════════════
  { id: 56, name: "Maglia Al Hilal Home 2025/26", category: "SaudiLeague", categoryLabel: "Saudi Pro League", price: 72.00, oldPrice: null, badge: null, badgeLabel: null, image: "images/teams/alhilal_home.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia casalinga Al Hilal 2025/26. Blu con mezzaluna ricamata.", inStock: true },
  { id: 57, name: "Maglia Al Hilal Away 2025/26", category: "SaudiLeague", categoryLabel: "Saudi Pro League", price: 68.00, oldPrice: null, badge: null, badgeLabel: null, image: "images/teams/alhilal_away.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia trasferta Al Hilal 2025/26. Bianco con dettagli blu.", inStock: true },

  // ══════════════ AL ITTIHAD ══════════════
  { id: 58, name: "Maglia Al Ittihad Home 2025/26", category: "SaudiLeague", categoryLabel: "Saudi Pro League", price: 70.00, oldPrice: null, badge: null, badgeLabel: null, image: "images/teams/alittihad_home.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia casalinga Al Ittihad 2025/26. Strisce giallo-nere.", inStock: true },

  // ══════════════ AL AHLI ══════════════
  { id: 59, name: "Maglia Al Ahli Home 2025/26", category: "SaudiLeague", categoryLabel: "Saudi Pro League", price: 68.00, oldPrice: null, badge: null, badgeLabel: null, image: "images/teams/alahli_home.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia casalinga Al Ahli 2025/26. Verde con dettagli bianchi.", inStock: true },

  // ══════════════ AL QADSIAH ══════════════
  { id: 60, name: "Maglia Al Qadsiah Home 2025/26", category: "SaudiLeague", categoryLabel: "Saudi Pro League", price: 65.00, oldPrice: null, badge: null, badgeLabel: null, image: "images/teams/alqadsiah_home.png", sizes: ["XS", "S", "M", "L", "XL", "XXL"], description: "Maglia casalinga Al Qadsiah 2025/26.", inStock: true },

];
