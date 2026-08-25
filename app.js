/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   GoalKit — app.js
   Carrello + Ordini + EmailJS
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

// â”€â”€ CONFIG EMAIL (salvata in localStorage) â”€â”€
// Le credenziali sono configurate UNA VOLTA dal venditore via "âš™ï¸ Setup Email"
// e poi funzionano automaticamente per tutti gli ordini di tutti i clienti.
const DEFAULT_EMAIL_CONFIG = {
  publicKey: "z3BLJtLhUWt266yFW",
  serviceId: "service_0onnes3",
  templateId: "template_i8e9odd",
  customerTemplateId: "template_oo5ig0c",
  ownerEmail: "worldofkits04@gmail.com"
};
let EMAIL_CONFIG = Object.assign({}, DEFAULT_EMAIL_CONFIG, JSON.parse(localStorage.getItem('gk_email_config') || '{}'));

// â”€â”€ LINGUE / TRADUZIONI â”€â”€
const I18N = {
  it: {
    'nav.menu': 'MENU', 'nav.calcio': 'Calcio', 'nav.sport': 'Sport', 'nav.mondiali': 'Mondiali',
    'nav.scarpe': 'Scarpe', 'nav.vestiario': 'Vestiario', 'nav.outlet': 'Outlet',
    'nav.campionati': 'Campionati', 'nav.tipoMaglia': 'Tipo Maglia', 'nav.abbigliamento': 'Abbigliamento',
    'nav.competizioni': 'Competizioni', 'nav.brand': 'Brand', 'nav.tipo': 'Tipo', 'nav.offerte': 'Offerte',
    'nav.novita': 'Novità', 'nav.vintage': 'Vintage', 'nav.tute': 'Tute', 'nav.felpe': 'Felpe',
    'nav.tshirt': 'T-Shirt', 'nav.pantaloni': 'Pantaloni', 'nav.daCalcio': 'Da calcio', 'nav.running': 'Running',
    'nav.lifestyle': 'Lifestyle', 'nav.promozioni': 'Promozioni', 'nav.ultimiPezzi': 'Ultimi pezzi',
    'nav.scontiStagionali': 'Sconti stagionali', 'nav.mondiale2026': 'Mondiale 2026', 'nav.nazionali': 'Nazionali',
    'nav.cercaPh': 'Cerca...',
    'common.acquista': 'Acquista', 'common.scopriTutto': 'Scopri tutto', 'common.indietro': 'Indietro',
    'common.applica': 'Applica', 'common.totale': 'Totale', 'common.spedizione': 'Spedizione',
    'common.subtotale': 'Subtotale', 'common.sconto': 'Sconto', 'common.gratis': 'Gratuita',
    'hero.nuovaCollezione': 'Nuova collezione', 'hero.qualitaPremium': 'Qualità Premium',
    'hero.tessutoOriginale': 'Tessuto Originale', 'hero.storeUfficiale': 'STORE UFFICIALE',
    'hero.tagline': 'Maglie da calcio premium per ogni tifoso',
    'musthave.nostri': 'I Nostri', 'musthave.vediTutti': 'Vedi tutti i bestseller',
    'sconto.title': '+10% SCONTO SUL PRIMO ORDINE CON IL CODICE: WOK10',
    'sconto.sub': 'Acquista anche un solo prodotto e ricevi lo sconto del 10% direttamente nel carrello',
    'crq.title': 'Non trovi il tuo prodotto?',
    'crq.sub': 'Inserisci i dettagli qui: scrivici l\'articolo che cerchi e faremo del nostro meglio per trovarlo',
    'crq.btn': 'Inserisci i dettagli',
    'mondiali.title': 'MAGLIE DEL MONDIALE', 'mondiali.acquista': 'Acquista prodotti Mondiali',
    'vintage.title': 'MAGLIE VINTAGE', 'vintage.acquista': 'Acquista prodotti Vintage',
    'brand.title': 'Acquista per brand',
    'nuova.title': 'Nuova Stagione', 'nuova.sub': 'Le ultime collezioni per ogni campo',
    'scarpe.title': 'SCARPE', 'scarpe.acquista': 'Acquista prodotti Scarpe',
    'accessori.title': 'ACCESSORI', 'accessori.acquista': 'Acquista Accessori',
    'tute.title': 'TUTE', 'tute.acquista': 'Acquista Tute',
    'footer.tagline': 'Il tuo store di fiducia per maglie da calcio e articoli sportivi.',
    'footer.navigazione': 'Navigazione', 'footer.home': 'Home', 'footer.prodotti': 'Prodotti',
    'footer.chiSiamo': 'Chi Siamo', 'footer.contatti': 'Contatti', 'footer.categorie': 'Categorie',
    'footer.serieA': 'Serie A', 'footer.champions': 'Champions League', 'footer.informazioni': 'Informazioni',
    'footer.recensioni': 'Recensioni', 'footer.ordinePersonalizzato': 'Ordine Personalizzato',
    'footer.contattaci': 'Contattaci', 'footer.diritti': '© 2026 WorldOfKits. Tutti i diritti riservati.',
    'search.categorie': 'Categorie', 'search.prodotti': 'Prodotti',
    'cart.title': 'Il tuo Carrello', 'cart.empty': 'Il carrello è vuoto', 'cart.goShop': 'Vai ai Prodotti',
    'cart.procedi': 'Procedi all\'Ordine', 'cart.articoli': 'articoli', 'cart.codicePh': 'Codice sconto...',
    'fav.title': 'I Tuoi Preferiti', 'fav.empty': 'Nessun preferito ancora', 'fav.sfoglia': 'Sfoglia i Prodotti',
    'fav.svuotaTutti': 'Svuota tutti i preferiti', 'fav.aggiungiTutti': 'Aggiungi tutti al carrello',
    'order.title': 'Completa il tuo Ordine',
    'order.sub': 'Inserisci i tuoi dati per finalizzare l\'acquisto',
    'order.nome': 'Nome', 'order.cognome': 'Cognome', 'order.email': 'Email', 'order.telefono': 'Telefono',
    'order.indirizzo': 'Indirizzo di Spedizione', 'order.citta': 'Città', 'order.cap': 'CAP',
    'order.note': 'Note sull\'ordine', 'order.conferma': 'Conferma Ordine', 'order.invio': 'Invio in corso...',
    'order.riepilogo': 'Riepilogo Ordine',
    'order.pagamento': 'Il pagamento avverrà al momento della consegna (contrassegno) o tramite bonifico bancario. Verrai contattato via email.',
    'confirm.title': 'Ordine Ricevuto!', 'confirm.grazie': 'Grazie',
    'confirm.inviato': 'il tuo ordine è stato inviato con successo.',
    'confirm.numeroOrdine': 'Numero ordine', 'confirm.totalePagato': 'Totale pagato',
    'confirm.contatto': 'Verrai contattato via email o telefono per la conferma della spedizione. Il pagamento avviene alla consegna.',
    'confirm.perfetto': 'Perfetto, grazie!',
    'confirm.errore': 'Errore nell\'invio. Controlla la configurazione email e riprova.',
    'qv.dettaglio': 'Dettaglio Prodotto', 'qv.taglia': 'Taglia', 'qv.tipoMaglia': 'Tipo Maglia',
    'qv.standard': 'Standard', 'qv.tifoso': 'Tifoso', 'qv.player': 'Player', 'qv.composizione': 'Composizione',
    'qv.soloMaglia': 'Solo Maglia', 'qv.inclusa': 'Inclusa nel prezzo', 'qv.magliaPanta': 'Maglia + Pantaloncino',
    'qv.kitCompleto': 'Kit Completo', 'qv.kitCompletoSub': 'Maglia+Pant+Calzettoni',
    'qv.personalizzazione': 'Personalizzazione applicata',
    'qv.aggiungi': 'Aggiungi al Carrello', 'qv.aggiorna': 'Aggiorna', 'qv.aggiornaCarrello': 'Aggiorna Carrello',
    'qv.personalizza': 'Personalizza (Nome & Numero)', 'qv.nonTrovato': 'Non trovi il tuo prodotto?',
    'cat.prodotti': 'prodotti', 'cat.nessunProdotto': 'Nessun prodotto trovato per questa selezione.',
    'cat.ordina': 'Ordina', 'cat.prezzoCrescente': 'Prezzo crescente', 'cat.prezzoDecrescente': 'Prezzo decrescente',
    'mob.home': 'Home', 'mob.cerca': 'Cerca', 'mob.prodotti': 'Prodotti', 'mob.preferiti': 'Preferiti',
    'mob.carrello': 'Carrello',
    'crqPage.intro': 'Scrivi il nome dell\'articolo che cerchi: ti ricontatteremo con prezzo e disponibilità.',
    'crqPage.nomeArticolo': 'Nome dell\'articolo', 'crqPage.taglia': 'Taglia', 'crqPage.quantita': 'Quantità',
    'crqPage.dettagli': 'Dettagli aggiuntivi', 'crqPage.invia': 'Invia richiesta',
    'crqPage.disclaimer': 'Il prezzo verrà comunicato via email prima della conferma.',
    'customize.title': 'Personalizza Maglia', 'customize.nome': 'NOME SULLA MAGLIA',
    'customize.numero': 'NUMERO SULLA MAGLIA', 'customize.conferma': 'Conferma Personalizzazione',
    'toast.aggiunto': 'aggiunto!', 'toast.aggiornato': 'aggiornato!',
    'toast.preferitiAggiunto': 'Aggiunto ai preferiti!', 'toast.preferitiRimosso': 'Rimosso dai preferiti.',
    'toast.carrelloVuoto': 'Il carrello è vuoto!',
    'toast.emailNonConfig': 'Sistema email non configurato.',
    'toast.erroreInvio': 'Errore nell\'invio.',
    'toast.prezzoComunicato': 'Il prezzo ti verrà comunicato via email.',
    'qv.aggiungiSticky': 'Aggiungi', 'cart.taglia': 'Taglia', 'cart.gratis': 'Gratis',
    'cart.omaggio': 'Omaggio', 'cart.rimuovi': 'Rimuovi', 'cart.vediProdotto': 'Vedi prodotto',
    'customize.maxCaratteri': 'Max 15 caratteri. Verrà stampato sulla schiena.',
    'customize.numeroRange': 'Numero da 1 a 99.', 'customize.nomePh': 'IL TUO NOME',
    'order.nomePh': 'Mario', 'order.cognomePh': 'Rossi', 'order.emailPh': 'mario.rossi@email.com',
    'order.telefonoPh': '+39 333 000 0000', 'order.indirizzoPh': 'Via Roma 1, 00100 Roma (RM)',
    'order.cittaPh': 'Roma', 'order.capPh': '00100', 'order.notePh': 'Personalizzazione maglia (nome/numero), note speciali...',
    'auth.title': 'Benvenuto su WorldOfKits',
    'auth.sub': 'Accedi o registrati per salvare carrello e preferiti nel tuo profilo.',
    'auth.register': 'Registrati', 'auth.login': 'Accedi',
    'auth.guest': 'Continua senza registrarti',
    'auth.guestWarn': 'Continuando senza registrarti, carrello e preferiti non verranno salvati nel tuo profilo.',
    'auth.name': 'Nome', 'auth.email': 'Email',
    'auth.namePh': 'Il tuo nome', 'auth.emailPh': 'tua@email.com',
    'auth.submitRegister': 'Crea account', 'auth.submitLogin': 'Entra',
    'auth.haveAccount': 'Hai già un account? Accedi',
    'auth.noAccount': 'Non hai un account? Registrati',
    'auth.hello': 'Ciao,', 'auth.logout': 'Esci',
    'auth.welcome': 'Benvenuto', 'auth.welcomeBack': 'Bentornato',
    'auth.errorNotFound': 'Account non trovato. Registrati prima.',
    'auth.errorExists': 'Esiste già un account con questa email.'
  },
  en: {
    'nav.menu': 'MENU', 'nav.calcio': 'Football', 'nav.sport': 'Sport', 'nav.mondiali': 'World Cup',
    'nav.scarpe': 'Shoes', 'nav.vestiario': 'Apparel', 'nav.outlet': 'Outlet',
    'nav.campionati': 'Leagues', 'nav.tipoMaglia': 'Shirt Type', 'nav.abbigliamento': 'Clothing',
    'nav.competizioni': 'Competitions', 'nav.brand': 'Brands', 'nav.tipo': 'Type', 'nav.offerte': 'Offers',
    'nav.novita': 'New Arrivals', 'nav.vintage': 'Vintage', 'nav.tute': 'Tracksuits', 'nav.felpe': 'Hoodies',
    'nav.tshirt': 'T-Shirt', 'nav.pantaloni': 'Pants', 'nav.daCalcio': 'Football', 'nav.running': 'Running',
    'nav.lifestyle': 'Lifestyle', 'nav.promozioni': 'Promotions', 'nav.ultimiPezzi': 'Last pieces',
    'nav.scontiStagionali': 'Seasonal sales', 'nav.mondiale2026': 'World Cup 2026', 'nav.nazionali': 'National Teams',
    'nav.cercaPh': 'Search...',
    'common.acquista': 'Buy', 'common.scopriTutto': 'Discover all', 'common.indietro': 'Back',
    'common.applica': 'Apply', 'common.totale': 'Total', 'common.spedizione': 'Shipping',
    'common.subtotale': 'Subtotal', 'common.sconto': 'Discount', 'common.gratis': 'Free',
    'hero.nuovaCollezione': 'New Collection', 'hero.qualitaPremium': 'Premium Quality',
    'hero.tessutoOriginale': 'Original Fabric', 'hero.storeUfficiale': 'OFFICIAL STORE',
    'hero.tagline': 'Premium football shirts for every fan',
    'musthave.nostri': 'Our', 'musthave.vediTutti': 'See all bestsellers',
    'sconto.title': '+10% OFF YOUR FIRST ORDER WITH CODE: WOK10',
    'sconto.sub': 'Buy even a single product and get 10% off directly in the cart',
    'crq.title': 'Can\'t find your product?',
    'crq.sub': 'Enter the details here: tell us the item you\'re looking for and we\'ll do our best to find it',
    'crq.btn': 'Enter the details',
    'mondiali.title': 'WORLD CUP SHIRTS', 'mondiali.acquista': 'Shop World Cup products',
    'vintage.title': 'VINTAGE SHIRTS', 'vintage.acquista': 'Shop Vintage products',
    'brand.title': 'Shop by brand',
    'nuova.title': 'New Season', 'nuova.sub': 'The latest collections for every pitch',
    'scarpe.title': 'SHOES', 'scarpe.acquista': 'Shop Shoes',
    'accessori.title': 'ACCESSORIES', 'accessori.acquista': 'Shop Accessories',
    'tute.title': 'TRACKSUITS', 'tute.acquista': 'Shop Tracksuits',
    'footer.tagline': 'Your trusted store for football shirts and sports items.',
    'footer.navigazione': 'Navigation', 'footer.home': 'Home', 'footer.prodotti': 'Products',
    'footer.chiSiamo': 'About Us', 'footer.contatti': 'Contact', 'footer.categorie': 'Categories',
    'footer.serieA': 'Serie A', 'footer.champions': 'Champions League', 'footer.informazioni': 'Information',
    'footer.recensioni': 'Reviews', 'footer.ordinePersonalizzato': 'Custom Order',
    'footer.contattaci': 'Contact Us', 'footer.diritti': '© 2026 WorldOfKits. All rights reserved.',
    'search.categorie': 'Categories', 'search.prodotti': 'Products',
    'cart.title': 'Your Cart', 'cart.empty': 'Your cart is empty', 'cart.goShop': 'Go to Products',
    'cart.procedi': 'Proceed to Checkout', 'cart.articoli': 'items', 'cart.codicePh': 'Discount code...',
    'fav.title': 'Your Favorites', 'fav.empty': 'No favorites yet', 'fav.sfoglia': 'Browse Products',
    'fav.svuotaTutti': 'Clear all favorites', 'fav.aggiungiTutti': 'Add all to cart',
    'order.title': 'Complete Your Order',
    'order.sub': 'Enter your details to finalize your purchase',
    'order.nome': 'First Name', 'order.cognome': 'Last Name', 'order.email': 'Email', 'order.telefono': 'Phone',
    'order.indirizzo': 'Shipping Address', 'order.citta': 'City', 'order.cap': 'ZIP',
    'order.note': 'Order notes', 'order.conferma': 'Confirm Order', 'order.invio': 'Sending...',
    'order.riepilogo': 'Order Summary',
    'order.pagamento': 'Payment will be made on delivery (cash on delivery) or by bank transfer. You will be contacted by email.',
    'confirm.title': 'Order Received!', 'confirm.grazie': 'Thank you',
    'confirm.inviato': 'your order has been sent successfully.',
    'confirm.numeroOrdine': 'Order number', 'confirm.totalePagato': 'Total paid',
    'confirm.contatto': 'You will be contacted by email or phone to confirm shipping. Payment is made on delivery.',
    'confirm.perfetto': 'Perfect, thanks!',
    'confirm.errore': 'Error sending. Check the email configuration and try again.',
    'qv.dettaglio': 'Product Details', 'qv.taglia': 'Size', 'qv.tipoMaglia': 'Shirt Type',
    'qv.standard': 'Standard', 'qv.tifoso': 'Fan', 'qv.player': 'Player', 'qv.composizione': 'Composition',
    'qv.soloMaglia': 'Shirt Only', 'qv.inclusa': 'Included in the price', 'qv.magliaPanta': 'Shirt + Shorts',
    'qv.kitCompleto': 'Full Kit', 'qv.kitCompletoSub': 'Shirt+Shorts+Socks',
    'qv.personalizzazione': 'Customization applied',
    'qv.aggiungi': 'Add to Cart', 'qv.aggiorna': 'Update', 'qv.aggiornaCarrello': 'Update Cart',
    'qv.personalizza': 'Customize (Name & Number)', 'qv.nonTrovato': 'Can\'t find your product?',
    'cat.prodotti': 'products', 'cat.nessunProdotto': 'No products found for this selection.',
    'cat.ordina': 'Sort', 'cat.prezzoCrescente': 'Price low to high', 'cat.prezzoDecrescente': 'Price high to low',
    'mob.home': 'Home', 'mob.cerca': 'Search', 'mob.prodotti': 'Products', 'mob.preferiti': 'Favorites',
    'mob.carrello': 'Cart',
    'crqPage.intro': 'Write the name of the item you\'re looking for: we\'ll get back to you with price and availability.',
    'crqPage.nomeArticolo': 'Item name', 'crqPage.taglia': 'Size', 'crqPage.quantita': 'Quantity',
    'crqPage.dettagli': 'Additional details', 'crqPage.invia': 'Send request',
    'crqPage.disclaimer': 'The price will be communicated by email before confirmation.',
    'customize.title': 'Customize Shirt', 'customize.nome': 'NAME ON SHIRT',
    'customize.numero': 'NUMBER ON SHIRT', 'customize.conferma': 'Confirm Customization',
    'toast.aggiunto': 'added!', 'toast.aggiornato': 'updated!',
    'toast.preferitiAggiunto': 'Added to favorites!', 'toast.preferitiRimosso': 'Removed from favorites.',
    'toast.carrelloVuoto': 'Your cart is empty!',
    'toast.emailNonConfig': 'Email system not configured.',
    'toast.erroreInvio': 'Error sending.',
    'toast.prezzoComunicato': 'The price will be communicated to you by email.',
    'qv.aggiungiSticky': 'Add', 'cart.taglia': 'Size', 'cart.gratis': 'Free',
    'cart.omaggio': 'Gift', 'cart.rimuovi': 'Remove', 'cart.vediProdotto': 'View product',
    'customize.maxCaratteri': 'Max 15 characters. It will be printed on the back.',
    'customize.numeroRange': 'Number from 1 to 99.', 'customize.nomePh': 'YOUR NAME',
    'order.nomePh': 'John', 'order.cognomePh': 'Smith', 'order.emailPh': 'john.smith@email.com',
    'order.telefonoPh': '+1 555 000 0000', 'order.indirizzoPh': '1 Main St, 00100 Rome',
    'order.cittaPh': 'Rome', 'order.capPh': '00100', 'order.notePh': 'Shirt customization (name/number), special notes...',
    'auth.title': 'Welcome to WorldOfKits',
    'auth.sub': 'Log in or register to save your cart and favorites to your profile.',
    'auth.register': 'Register', 'auth.login': 'Log in',
    'auth.guest': 'Continue without registering',
    'auth.guestWarn': 'By continuing without registering, your cart and favorites will not be saved to your profile.',
    'auth.name': 'Name', 'auth.email': 'Email',
    'auth.namePh': 'Your name', 'auth.emailPh': 'you@email.com',
    'auth.submitRegister': 'Create account', 'auth.submitLogin': 'Sign in',
    'auth.haveAccount': 'Already have an account? Log in',
    'auth.noAccount': 'Don\'t have an account? Register',
    'auth.hello': 'Hi,', 'auth.logout': 'Log out',
    'auth.welcome': 'Welcome', 'auth.welcomeBack': 'Welcome back',
    'auth.errorNotFound': 'Account not found. Please register first.',
    'auth.errorExists': 'An account with this email already exists.'
  },
  es: {
    'nav.menu': 'MENÚ', 'nav.calcio': 'Fútbol', 'nav.sport': 'Deporte', 'nav.mondiali': 'Mundial',
    'nav.scarpe': 'Zapatillas', 'nav.vestiario': 'Ropa', 'nav.outlet': 'Outlet',
    'nav.campionati': 'Ligas', 'nav.tipoMaglia': 'Tipo de Camiseta', 'nav.abbigliamento': 'Ropa',
    'nav.competizioni': 'Competiciones', 'nav.brand': 'Marcas', 'nav.tipo': 'Tipo', 'nav.offerte': 'Ofertas',
    'nav.novita': 'Novedades', 'nav.vintage': 'Vintage', 'nav.tute': 'Chándales', 'nav.felpe': 'Sudaderas',
    'nav.tshirt': 'Camiseta', 'nav.pantaloni': 'Pantalones', 'nav.daCalcio': 'De fútbol', 'nav.running': 'Running',
    'nav.lifestyle': 'Lifestyle', 'nav.promozioni': 'Promociones', 'nav.ultimiPezzi': 'Últimas unidades',
    'nav.scontiStagionali': 'Rebajas de temporada', 'nav.mondiale2026': 'Mundial 2026', 'nav.nazionali': 'Selecciones',
    'nav.cercaPh': 'Buscar...',
    'common.acquista': 'Comprar', 'common.scopriTutto': 'Descubre todo', 'common.indietro': 'Atrás',
    'common.applica': 'Aplicar', 'common.totale': 'Total', 'common.spedizione': 'Envío',
    'common.subtotale': 'Subtotal', 'common.sconto': 'Descuento', 'common.gratis': 'Gratis',
    'hero.nuovaCollezione': 'Nueva Colección', 'hero.qualitaPremium': 'Calidad Premium',
    'hero.tessutoOriginale': 'Tejido Original', 'hero.storeUfficiale': 'TIENDA OFICIAL',
    'hero.tagline': 'Camisetas de fútbol premium para cada aficionado',
    'musthave.nostri': 'Nuestros', 'musthave.vediTutti': 'Ver todos los bestsellers',
    'sconto.title': '+10% DE DESCUENTO EN TU PRIMER PEDIDO CON EL CÓDIGO: WOK10',
    'sconto.sub': 'Compra incluso un solo producto y recibe el 10% de descuento directamente en el carrito',
    'crq.title': '¿No encuentras tu producto?',
    'crq.sub': 'Introduce los detalles aquí: escríbenos el artículo que buscas y haremos todo lo posible por encontrarlo',
    'crq.btn': 'Introduce los detalles',
    'mondiali.title': 'CAMISETAS DEL MUNDIAL', 'mondiali.acquista': 'Compra productos del Mundial',
    'vintage.title': 'CAMISETAS VINTAGE', 'vintage.acquista': 'Compra productos vintage',
    'brand.title': 'Compra por marca',
    'nuova.title': 'Nueva Temporada', 'nuova.sub': 'Las últimas colecciones para cada campo',
    'scarpe.title': 'ZAPATILLAS', 'scarpe.acquista': 'Compra zapatillas',
    'accessori.title': 'ACCESORIOS', 'accessori.acquista': 'Compra accesorios',
    'tute.title': 'CHÁNDALES', 'tute.acquista': 'Compra chándales',
    'footer.tagline': 'Tu tienda de confianza para camisetas de fútbol y artículos deportivos.',
    'footer.navigazione': 'Navegación', 'footer.home': 'Inicio', 'footer.prodotti': 'Productos',
    'footer.chiSiamo': 'Quiénes Somos', 'footer.contatti': 'Contacto', 'footer.categorie': 'Categorías',
    'footer.serieA': 'Serie A', 'footer.champions': 'Champions League', 'footer.informazioni': 'Información',
    'footer.recensioni': 'Reseñas', 'footer.ordinePersonalizzato': 'Pedido Personalizado',
    'footer.contattaci': 'Contáctanos', 'footer.diritti': '© 2026 WorldOfKits. Todos los derechos reservados.',
    'search.categorie': 'Categorías', 'search.prodotti': 'Productos',
    'cart.title': 'Tu Carrito', 'cart.empty': 'Tu carrito está vacío', 'cart.goShop': 'Ir a Productos',
    'cart.procedi': 'Proceder al Pago', 'cart.articoli': 'artículos', 'cart.codicePh': 'Código de descuento...',
    'fav.title': 'Tus Favoritos', 'fav.empty': 'Aún no hay favoritos', 'fav.sfoglia': 'Explorar Productos',
    'fav.svuotaTutti': 'Vaciar todos los favoritos', 'fav.aggiungiTutti': 'Añadir todo al carrito',
    'order.title': 'Completa tu Pedido',
    'order.sub': 'Introduce tus datos para finalizar la compra',
    'order.nome': 'Nombre', 'order.cognome': 'Apellido', 'order.email': 'Email', 'order.telefono': 'Teléfono',
    'order.indirizzo': 'Dirección de Envío', 'order.citta': 'Ciudad', 'order.cap': 'CP',
    'order.note': 'Notas del pedido', 'order.conferma': 'Confirmar Pedido', 'order.invio': 'Enviando...',
    'order.riepilogo': 'Resumen del Pedido',
    'order.pagamento': 'El pago se realizará en el momento de la entrega (contra reembolso) o mediante transferencia bancaria. Te contactaremos por email.',
    'confirm.title': '¡Pedido Recibido!', 'confirm.grazie': 'Gracias',
    'confirm.inviato': 'tu pedido ha sido enviado con éxito.',
    'confirm.numeroOrdine': 'Número de pedido', 'confirm.totalePagato': 'Total pagado',
    'confirm.contatto': 'Te contactaremos por email o teléfono para confirmar el envío. El pago se realiza en la entrega.',
    'confirm.perfetto': '¡Perfecto, gracias!',
    'confirm.errore': 'Error al enviar. Comprueba la configuración del email y vuelve a intentarlo.',
    'qv.dettaglio': 'Detalle del Producto', 'qv.taglia': 'Talla', 'qv.tipoMaglia': 'Tipo de Camiseta',
    'qv.standard': 'Estándar', 'qv.tifoso': 'Aficionado', 'qv.player': 'Jugador', 'qv.composizione': 'Composición',
    'qv.soloMaglia': 'Solo Camiseta', 'qv.inclusa': 'Incluido en el precio', 'qv.magliaPanta': 'Camiseta + Pantalón',
    'qv.kitCompleto': 'Kit Completo', 'qv.kitCompletoSub': 'Camiseta+Pant+Calcetines',
    'qv.personalizzazione': 'Personalización aplicada',
    'qv.aggiungi': 'Añadir al Carrito', 'qv.aggiorna': 'Actualizar', 'qv.aggiornaCarrello': 'Actualizar Carrito',
    'qv.personalizza': 'Personalizar (Nombre y Número)', 'qv.nonTrovato': '¿No encuentras tu producto?',
    'cat.prodotti': 'productos', 'cat.nessunProdotto': 'No se encontraron productos para esta selección.',
    'cat.ordina': 'Ordenar', 'cat.prezzoCrescente': 'Precio ascendente', 'cat.prezzoDecrescente': 'Precio descendente',
    'mob.home': 'Inicio', 'mob.cerca': 'Buscar', 'mob.prodotti': 'Productos', 'mob.preferiti': 'Favoritos',
    'mob.carrello': 'Carrito',
    'crqPage.intro': 'Escribe el nombre del artículo que buscas: te contactaremos con precio y disponibilidad.',
    'crqPage.nomeArticolo': 'Nombre del artículo', 'crqPage.taglia': 'Talla', 'crqPage.quantita': 'Cantidad',
    'crqPage.dettagli': 'Detalles adicionales', 'crqPage.invia': 'Enviar solicitud',
    'crqPage.disclaimer': 'El precio se comunicará por email antes de la confirmación.',
    'customize.title': 'Personalizar Camiseta', 'customize.nome': 'NOMBRE EN LA CAMISETA',
    'customize.numero': 'NÚMERO EN LA CAMISETA', 'customize.conferma': 'Confirmar Personalización',
    'toast.aggiunto': '¡añadido!', 'toast.aggiornato': '¡actualizado!',
    'toast.preferitiAggiunto': '¡Añadido a favoritos!', 'toast.preferitiRimosso': 'Eliminado de favoritos.',
    'toast.carrelloVuoto': '¡Tu carrito está vacío!',
    'toast.emailNonConfig': 'Sistema de email no configurado.',
    'toast.erroreInvio': 'Error al enviar.',
    'toast.prezzoComunicato': 'El precio se te comunicará por email.',
    'qv.aggiungiSticky': 'Añadir', 'cart.taglia': 'Talla', 'cart.gratis': 'Gratis',
    'cart.omaggio': 'Regalo', 'cart.rimuovi': 'Eliminar', 'cart.vediProdotto': 'Ver producto',
    'customize.maxCaratteri': 'Máx. 15 caracteres. Se imprimirá en la espalda.',
    'customize.numeroRange': 'Número del 1 al 99.', 'customize.nomePh': 'TU NOMBRE',
    'order.nomePh': 'Juan', 'order.cognomePh': 'García', 'order.emailPh': 'juan.garcia@email.com',
    'order.telefonoPh': '+34 600 000 000', 'order.indirizzoPh': 'Calle Mayor 1, 00100 Roma',
    'order.cittaPh': 'Roma', 'order.capPh': '00100', 'order.notePh': 'Personalización de camiseta (nombre/número), notas especiales...',
    'auth.title': 'Bienvenido a WorldOfKits',
    'auth.sub': 'Inicia sesión o regístrate para guardar tu carrito y favoritos en tu perfil.',
    'auth.register': 'Regístrate', 'auth.login': 'Inicia sesión',
    'auth.guest': 'Continuar sin registrarte',
    'auth.guestWarn': 'Si continúas sin registrarte, tu carrito y favoritos no se guardarán en tu perfil.',
    'auth.name': 'Nombre', 'auth.email': 'Correo electrónico',
    'auth.namePh': 'Tu nombre', 'auth.emailPh': 'tu@correo.com',
    'auth.submitRegister': 'Crear cuenta', 'auth.submitLogin': 'Entrar',
    'auth.haveAccount': '¿Ya tienes una cuenta? Inicia sesión',
    'auth.noAccount': '¿No tienes una cuenta? Regístrate',
    'auth.hello': 'Hola,', 'auth.logout': 'Cerrar sesión',
    'auth.welcome': 'Bienvenido', 'auth.welcomeBack': 'Bienvenido de nuevo',
    'auth.errorNotFound': 'Cuenta no encontrada. Regístrate primero.',
    'auth.errorExists': 'Ya existe una cuenta con este correo.'
  },
  fr: {
    'nav.menu': 'MENU', 'nav.calcio': 'Football', 'nav.sport': 'Sport', 'nav.mondiali': 'Mondial',
    'nav.scarpe': 'Chaussures', 'nav.vestiario': 'Vêtements', 'nav.outlet': 'Outlet',
    'nav.campionati': 'Championnats', 'nav.tipoMaglia': 'Type de Maillot', 'nav.abbigliamento': 'Vêtements',
    'nav.competizioni': 'Compétitions', 'nav.brand': 'Marques', 'nav.tipo': 'Type', 'nav.offerte': 'Offres',
    'nav.novita': 'Nouveautés', 'nav.vintage': 'Vintage', 'nav.tute': 'Survêtements', 'nav.felpe': 'Sweats',
    'nav.tshirt': 'T-shirt', 'nav.pantaloni': 'Pantalons', 'nav.daCalcio': 'De football', 'nav.running': 'Running',
    'nav.lifestyle': 'Lifestyle', 'nav.promozioni': 'Promotions', 'nav.ultimiPezzi': 'Dernières pièces',
    'nav.scontiStagionali': 'Soldes saisonniers', 'nav.mondiale2026': 'Coupe du Monde 2026', 'nav.nazionali': 'Équipes nationales',
    'nav.cercaPh': 'Rechercher...',
    'common.acquista': 'Acheter', 'common.scopriTutto': 'Découvrir tout', 'common.indietro': 'Retour',
    'common.applica': 'Appliquer', 'common.totale': 'Total', 'common.spedizione': 'Livraison',
    'common.subtotale': 'Sous-total', 'common.sconto': 'Remise', 'common.gratis': 'Gratuite',
    'hero.nuovaCollezione': 'Nouvelle Collection', 'hero.qualitaPremium': 'Qualité Premium',
    'hero.tessutoOriginale': 'Tissu Original', 'hero.storeUfficiale': 'BOUTIQUE OFFICIELLE',
    'hero.tagline': 'Maillots de football premium pour chaque fan',
    'musthave.nostri': 'Nos', 'musthave.vediTutti': 'Voir tous les best-sellers',
    'sconto.title': '+10% DE RÉDUCTION SUR VOTRE PREMIÈRE COMMANDE AVEC LE CODE : WOK10',
    'sconto.sub': 'Achetez même un seul produit et bénéficiez de 10% de réduction directement dans le panier',
    'crq.title': 'Vous ne trouvez pas votre produit ?',
    'crq.sub': 'Saisissez les détails ici : écrivez-nous l\'article que vous cherchez et nous ferons de notre mieux pour le trouver',
    'crq.btn': 'Saisissez les détails',
    'mondiali.title': 'MAILLOTS DE LA COUPE DU MONDE', 'mondiali.acquista': 'Acheter des produits Mondial',
    'vintage.title': 'MAILLOTS VINTAGE', 'vintage.acquista': 'Acheter des produits vintage',
    'brand.title': 'Acheter par marque',
    'nuova.title': 'Nouvelle Saison', 'nuova.sub': 'Les dernières collections pour chaque terrain',
    'scarpe.title': 'CHAUSSURES', 'scarpe.acquista': 'Acheter des chaussures',
    'accessori.title': 'ACCESSOIRES', 'accessori.acquista': 'Acheter des accessoires',
    'tute.title': 'SURVÊTEMENTS', 'tute.acquista': 'Acheter des survêtements',
    'footer.tagline': 'Votre boutique de confiance pour les maillots de football et les articles de sport.',
    'footer.navigazione': 'Navigation', 'footer.home': 'Accueil', 'footer.prodotti': 'Produits',
    'footer.chiSiamo': 'À propos', 'footer.contatti': 'Contact', 'footer.categorie': 'Catégories',
    'footer.serieA': 'Serie A', 'footer.champions': 'Ligue des Champions', 'footer.informazioni': 'Informations',
    'footer.recensioni': 'Avis', 'footer.ordinePersonalizzato': 'Commande Personnalisée',
    'footer.contattaci': 'Contactez-nous', 'footer.diritti': '© 2026 WorldOfKits. Tous droits réservés.',
    'search.categorie': 'Catégories', 'search.prodotti': 'Produits',
    'cart.title': 'Votre Panier', 'cart.empty': 'Votre panier est vide', 'cart.goShop': 'Aller aux Produits',
    'cart.procedi': 'Passer à la Commande', 'cart.articoli': 'articles', 'cart.codicePh': 'Code promo...',
    'fav.title': 'Vos Favoris', 'fav.empty': 'Aucun favori', 'fav.sfoglia': 'Parcourir les Produits',
    'fav.svuotaTutti': 'Vider tous les favoris', 'fav.aggiungiTutti': 'Tout ajouter au panier',
    'order.title': 'Complétez votre Commande',
    'order.sub': 'Saisissez vos données pour finaliser votre achat',
    'order.nome': 'Prénom', 'order.cognome': 'Nom', 'order.email': 'E-mail', 'order.telefono': 'Téléphone',
    'order.indirizzo': 'Adresse de Livraison', 'order.citta': 'Ville', 'order.cap': 'Code postal',
    'order.note': 'Notes de commande', 'order.conferma': 'Confirmer la Commande', 'order.invio': 'Envoi en cours...',
    'order.riepilogo': 'Récapitulatif',
    'order.pagamento': 'Le paiement sera effectué à la livraison (contre remboursement) ou par virement bancaire. Vous serez contacté par email.',
    'confirm.title': 'Commande Reçue !', 'confirm.grazie': 'Merci',
    'confirm.inviato': 'votre commande a été envoyée avec succès.',
    'confirm.numeroOrdine': 'Numéro de commande', 'confirm.totalePagato': 'Total payé',
    'confirm.contatto': 'Vous serez contacté par email ou téléphone pour confirmer la livraison. Le paiement se fait à la livraison.',
    'confirm.perfetto': 'Parfait, merci !',
    'confirm.errore': 'Erreur d\'envoi. Vérifiez la configuration email et réessayez.',
    'qv.dettaglio': 'Détails du Produit', 'qv.taglia': 'Taille', 'qv.tipoMaglia': 'Type de Maillot',
    'qv.standard': 'Standard', 'qv.tifoso': 'Supporter', 'qv.player': 'Joueur', 'qv.composizione': 'Composition',
    'qv.soloMaglia': 'Maillot Seul', 'qv.inclusa': 'Inclus dans le prix', 'qv.magliaPanta': 'Maillot + Short',
    'qv.kitCompleto': 'Kit Complet', 'qv.kitCompletoSub': 'Maillot+Short+Chaussettes',
    'qv.personalizzazione': 'Personnalisation appliquée',
    'qv.aggiungi': 'Ajouter au Panier', 'qv.aggiorna': 'Mettre à jour', 'qv.aggiornaCarrello': 'Mettre à jour le Panier',
    'qv.personalizza': 'Personnaliser (Nom et Numéro)', 'qv.nonTrovato': 'Vous ne trouvez pas votre produit ?',
    'cat.prodotti': 'produits', 'cat.nessunProdotto': 'Aucun produit trouvé pour cette sélection.',
    'cat.ordina': 'Trier', 'cat.prezzoCrescente': 'Prix croissant', 'cat.prezzoDecrescente': 'Prix décroissant',
    'mob.home': 'Accueil', 'mob.cerca': 'Rechercher', 'mob.prodotti': 'Produits', 'mob.preferiti': 'Favoris',
    'mob.carrello': 'Panier',
    'crqPage.intro': 'Écrivez le nom de l\'article que vous cherchez : nous vous recontacterons avec le prix et la disponibilité.',
    'crqPage.nomeArticolo': 'Nom de l\'article', 'crqPage.taglia': 'Taille', 'crqPage.quantita': 'Quantité',
    'crqPage.dettagli': 'Détails supplémentaires', 'crqPage.invia': 'Envoyer la demande',
    'crqPage.disclaimer': 'Le prix sera communiqué par email avant la confirmation.',
    'customize.title': 'Personnaliser le Maillot', 'customize.nome': 'NOM SUR LE MAILLOT',
    'customize.numero': 'NUMÉRO SUR LE MAILLOT', 'customize.conferma': 'Confirmer la Personnalisation',
    'toast.aggiunto': 'ajouté !', 'toast.aggiornato': 'mis à jour !',
    'toast.preferitiAggiunto': 'Ajouté aux favoris !', 'toast.preferitiRimosso': 'Retiré des favoris.',
    'toast.carrelloVuoto': 'Votre panier est vide !',
    'toast.emailNonConfig': 'Système d\'email non configuré.',
    'toast.erroreInvio': 'Erreur d\'envoi.',
    'toast.prezzoComunicato': 'Le prix vous sera communiqué par email.',
    'qv.aggiungiSticky': 'Ajouter', 'cart.taglia': 'Taille', 'cart.gratis': 'Gratuit',
    'cart.omaggio': 'Cadeau', 'cart.rimuovi': 'Retirer', 'cart.vediProdotto': 'Voir le produit',
    'customize.maxCaratteri': 'Max 15 caractères. Il sera imprimé dans le dos.',
    'customize.numeroRange': 'Numéro de 1 à 99.', 'customize.nomePh': 'VOTRE NOM',
    'order.nomePh': 'Jean', 'order.cognomePh': 'Martin', 'order.emailPh': 'jean.martin@email.com',
    'order.telefonoPh': '+33 600 000 000', 'order.indirizzoPh': '1 rue de Rome, 00100 Rome',
    'order.cittaPh': 'Rome', 'order.capPh': '00100', 'order.notePh': 'Personnalisation du maillot (nom/numéro), notes spéciales...',
    'auth.title': 'Bienvenue sur WorldOfKits',
    'auth.sub': 'Connectez-vous ou inscrivez-vous pour enregistrer votre panier et vos favoris dans votre profil.',
    'auth.register': 'S\'inscrire', 'auth.login': 'Se connecter',
    'auth.guest': 'Continuer sans inscription',
    'auth.guestWarn': 'En continuant sans vous inscrire, votre panier et vos favoris ne seront pas enregistrés dans votre profil.',
    'auth.name': 'Nom', 'auth.email': 'E-mail',
    'auth.namePh': 'Votre nom', 'auth.emailPh': 'vous@email.com',
    'auth.submitRegister': 'Créer un compte', 'auth.submitLogin': 'Se connecter',
    'auth.haveAccount': 'Vous avez déjà un compte ? Se connecter',
    'auth.noAccount': 'Vous n\'avez pas de compte ? S\'inscrire',
    'auth.hello': 'Bonjour,', 'auth.logout': 'Se déconnecter',
    'auth.welcome': 'Bienvenue', 'auth.welcomeBack': 'Bon retour',
    'auth.errorNotFound': 'Compte introuvable. Inscrivez-vous d\'abord.',
    'auth.errorExists': 'Un compte avec cet e-mail existe déjà.'
  },
  de: {
    'nav.menu': 'MENÜ', 'nav.calcio': 'Fußball', 'nav.sport': 'Sport', 'nav.mondiali': 'WM',
    'nav.scarpe': 'Schuhe', 'nav.vestiario': 'Bekleidung', 'nav.outlet': 'Outlet',
    'nav.campionati': 'Ligen', 'nav.tipoMaglia': 'Trikotart', 'nav.abbigliamento': 'Bekleidung',
    'nav.competizioni': 'Wettbewerbe', 'nav.brand': 'Marken', 'nav.tipo': 'Art', 'nav.offerte': 'Angebote',
    'nav.novita': 'Neuheiten', 'nav.vintage': 'Vintage', 'nav.tute': 'Trainingsanzüge', 'nav.felpe': 'Sweatshirts',
    'nav.tshirt': 'T-Shirt', 'nav.pantaloni': 'Hosen', 'nav.daCalcio': 'Fußball', 'nav.running': 'Laufen',
    'nav.lifestyle': 'Lifestyle', 'nav.promozioni': 'Aktionen', 'nav.ultimiPezzi': 'Letzte Stücke',
    'nav.scontiStagionali': 'Saisonrabatte', 'nav.mondiale2026': 'WM 2026', 'nav.nazionali': 'Nationalmannschaften',
    'nav.cercaPh': 'Suchen...',
    'common.acquista': 'Kaufen', 'common.scopriTutto': 'Alles entdecken', 'common.indietro': 'Zurück',
    'common.applica': 'Anwenden', 'common.totale': 'Gesamt', 'common.spedizione': 'Versand',
    'common.subtotale': 'Zwischensumme', 'common.sconto': 'Rabatt', 'common.gratis': 'Kostenlos',
    'hero.nuovaCollezione': 'Neue Kollektion', 'hero.qualitaPremium': 'Premium-Qualität',
    'hero.tessutoOriginale': 'Originalstoff', 'hero.storeUfficiale': 'OFFIZIELLER SHOP',
    'hero.tagline': 'Premium-Fußballtrikots für jeden Fan',
    'musthave.nostri': 'Unsere', 'musthave.vediTutti': 'Alle Bestseller ansehen',
    'sconto.title': '+10% RABATT AUF IHRE ERSTE BESTELLUNG MIT DEM CODE: WOK10',
    'sconto.sub': 'Kaufen Sie bereits ein einzelnes Produkt und erhalten Sie 10% Rabatt direkt im Warenkorb',
    'crq.title': 'Produkt nicht gefunden?',
    'crq.sub': 'Geben Sie hier die Details ein: Schreiben Sie uns den Artikel, den Sie suchen, und wir tun unser Bestes, um ihn zu finden',
    'crq.btn': 'Details eingeben',
    'mondiali.title': 'WM-TRIKOTS', 'mondiali.acquista': 'WM-Produkte kaufen',
    'vintage.title': 'VINTAGE-TRIKOTS', 'vintage.acquista': 'Vintage-Produkte kaufen',
    'brand.title': 'Nach Marke einkaufen',
    'nuova.title': 'Neue Saison', 'nuova.sub': 'Die neuesten Kollektionen für jeden Platz',
    'scarpe.title': 'SCHUHE', 'scarpe.acquista': 'Schuhe kaufen',
    'accessori.title': 'ZUBEHÖR', 'accessori.acquista': 'Zubehör kaufen',
    'tute.title': 'TRAININGSANZÜGE', 'tute.acquista': 'Trainingsanzüge kaufen',
    'footer.tagline': 'Ihr vertrauenswürdiger Shop für Fußballtrikots und Sportartikel.',
    'footer.navigazione': 'Navigation', 'footer.home': 'Startseite', 'footer.prodotti': 'Produkte',
    'footer.chiSiamo': 'Über uns', 'footer.contatti': 'Kontakt', 'footer.categorie': 'Kategorien',
    'footer.serieA': 'Serie A', 'footer.champions': 'Champions League', 'footer.informazioni': 'Informationen',
    'footer.recensioni': 'Bewertungen', 'footer.ordinePersonalizzato': 'Individuelle Bestellung',
    'footer.contattaci': 'Kontaktiere uns', 'footer.diritti': '© 2026 WorldOfKits. Alle Rechte vorbehalten.',
    'search.categorie': 'Kategorien', 'search.prodotti': 'Produkte',
    'cart.title': 'Ihr Warenkorb', 'cart.empty': 'Ihr Warenkorb ist leer', 'cart.goShop': 'Zu den Produkten',
    'cart.procedi': 'Zur Kasse', 'cart.articoli': 'Artikel', 'cart.codicePh': 'Rabattcode...',
    'fav.title': 'Ihre Favoriten', 'fav.empty': 'Noch keine Favoriten', 'fav.sfoglia': 'Produkte durchstöbern',
    'fav.svuotaTutti': 'Alle Favoriten löschen', 'fav.aggiungiTutti': 'Alle in den Warenkorb',
    'order.title': 'Schließen Sie Ihre Bestellung ab',
    'order.sub': 'Geben Sie Ihre Daten ein, um den Kauf abzuschließen',
    'order.nome': 'Vorname', 'order.cognome': 'Nachname', 'order.email': 'E-Mail', 'order.telefono': 'Telefon',
    'order.indirizzo': 'Lieferadresse', 'order.citta': 'Stadt', 'order.cap': 'PLZ',
    'order.note': 'Bestellnotizen', 'order.conferma': 'Bestellung bestätigen', 'order.invio': 'Wird gesendet...',
    'order.riepilogo': 'Bestellübersicht',
    'order.pagamento': 'Die Zahlung erfolgt bei Lieferung (Nachnahme) oder per Überweisung. Sie werden per E-Mail kontaktiert.',
    'confirm.title': 'Bestellung erhalten!', 'confirm.grazie': 'Danke',
    'confirm.inviato': 'Ihre Bestellung wurde erfolgreich gesendet.',
    'confirm.numeroOrdine': 'Bestellnummer', 'confirm.totalePagato': 'Bezahlter Betrag',
    'confirm.contatto': 'Sie werden per E-Mail oder Telefon zur Lieferbestätigung kontaktiert. Die Zahlung erfolgt bei Lieferung.',
    'confirm.perfetto': 'Perfekt, danke!',
    'confirm.errore': 'Fehler beim Senden. Überprüfen Sie die E-Mail-Konfiguration und versuchen Sie es erneut.',
    'qv.dettaglio': 'Produktdetails', 'qv.taglia': 'Größe', 'qv.tipoMaglia': 'Trikotart',
    'qv.standard': 'Standard', 'qv.tifoso': 'Fan', 'qv.player': 'Spieler', 'qv.composizione': 'Zusammenstellung',
    'qv.soloMaglia': 'Nur Trikot', 'qv.inclusa': 'Im Preis inbegriffen', 'qv.magliaPanta': 'Trikot + Shorts',
    'qv.kitCompleto': 'Komplettes Kit', 'qv.kitCompletoSub': 'Trikot+Shorts+Socken',
    'qv.personalizzazione': 'Personalisierung angewendet',
    'qv.aggiungi': 'In den Warenkorb', 'qv.aggiorna': 'Aktualisieren', 'qv.aggiornaCarrello': 'Warenkorb aktualisieren',
    'qv.personalizza': 'Personalisieren (Name & Nummer)', 'qv.nonTrovato': 'Produkt nicht gefunden?',
    'cat.prodotti': 'Produkte', 'cat.nessunProdotto': 'Keine Produkte für diese Auswahl gefunden.',
    'cat.ordina': 'Sortieren', 'cat.prezzoCrescente': 'Preis aufsteigend', 'cat.prezzoDecrescente': 'Preis absteigend',
    'mob.home': 'Start', 'mob.cerca': 'Suchen', 'mob.prodotti': 'Produkte', 'mob.preferiti': 'Favoriten',
    'mob.carrello': 'Warenkorb',
    'crqPage.intro': 'Schreiben Sie den Namen des gesuchten Artikels: Wir melden uns mit Preis und Verfügbarkeit.',
    'crqPage.nomeArticolo': 'Artikelname', 'crqPage.taglia': 'Größe', 'crqPage.quantita': 'Menge',
    'crqPage.dettagli': 'Weitere Details', 'crqPage.invia': 'Anfrage senden',
    'crqPage.disclaimer': 'Der Preis wird vor der Bestätigung per E-Mail mitgeteilt.',
    'customize.title': 'Trikot personalisieren', 'customize.nome': 'NAME AUF DEM TRIKOT',
    'customize.numero': 'NUMMER AUF DEM TRIKOT', 'customize.conferma': 'Personalisierung bestätigen',
    'toast.aggiunto': 'hinzugefügt!', 'toast.aggiornato': 'aktualisiert!',
    'toast.preferitiAggiunto': 'Zu Favoriten hinzugefügt!', 'toast.preferitiRimosso': 'Von Favoriten entfernt.',
    'toast.carrelloVuoto': 'Ihr Warenkorb ist leer!',
    'toast.emailNonConfig': 'E-Mail-System nicht konfiguriert.',
    'toast.erroreInvio': 'Fehler beim Senden.',
    'toast.prezzoComunicato': 'Der Preis wird Ihnen per E-Mail mitgeteilt.',
    'qv.aggiungiSticky': 'Hinzufügen', 'cart.taglia': 'Größe', 'cart.gratis': 'Kostenlos',
    'cart.omaggio': 'Geschenk', 'cart.rimuovi': 'Entfernen', 'cart.vediProdotto': 'Produkt ansehen',
    'customize.maxCaratteri': 'Max. 15 Zeichen. Wird auf den Rücken gedruckt.',
    'customize.numeroRange': 'Nummer von 1 bis 99.', 'customize.nomePh': 'IHR NAME',
    'order.nomePh': 'Max', 'order.cognomePh': 'Müller', 'order.emailPh': 'max.mueller@email.com',
    'order.telefonoPh': '+49 170 000 0000', 'order.indirizzoPh': 'Hauptstraße 1, 00100 Rom',
    'order.cittaPh': 'Rom', 'order.capPh': '00100', 'order.notePh': 'Trikot-Personalisierung (Name/Nummer), besondere Hinweise...',
    'auth.title': 'Willkommen bei WorldOfKits',
    'auth.sub': 'Melde dich an oder registriere dich, um Warenkorb und Favoriten in deinem Profil zu speichern.',
    'auth.register': 'Registrieren', 'auth.login': 'Anmelden',
    'auth.guest': 'Ohne Registrierung fortfahren',
    'auth.guestWarn': 'Wenn du ohne Registrierung fortfährst, werden Warenkorb und Favoriten nicht in deinem Profil gespeichert.',
    'auth.name': 'Name', 'auth.email': 'E-Mail',
    'auth.namePh': 'Dein Name', 'auth.emailPh': 'du@email.com',
    'auth.submitRegister': 'Konto erstellen', 'auth.submitLogin': 'Anmelden',
    'auth.haveAccount': 'Du hast bereits ein Konto? Anmelden',
    'auth.noAccount': 'Du hast noch kein Konto? Registrieren',
    'auth.hello': 'Hallo,', 'auth.logout': 'Abmelden',
    'auth.welcome': 'Willkommen', 'auth.welcomeBack': 'Willkommen zurück',
    'auth.errorNotFound': 'Konto nicht gefunden. Registriere dich zuerst.',
    'auth.errorExists': 'Ein Konto mit dieser E-Mail existiert bereits.'
  }
};

let currentLang = localStorage.getItem('gk_lang') || 'it';
if (!I18N[currentLang]) currentLang = 'it';

function t(key) {
  const lang = I18N[currentLang];
  if (lang && lang[key] != null) return lang[key];
  const it = I18N.it;
  return (it && it[key] != null) ? it[key] : key;
}

function applyLang() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = t(el.dataset.i18n);
    if (val && val !== el.dataset.i18n) el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const val = t(el.dataset.i18nPh);
    if (val) el.placeholder = val;
  });
  const cur = document.getElementById('langCurrent');
  if (cur) cur.textContent = currentLang.toUpperCase();
  document.querySelectorAll('.lang-option').forEach(o => {
    o.classList.toggle('active', o.dataset.lang === currentLang);
  });
  document.documentElement.lang = currentLang;
}

function setLang(lang) {
  if (!I18N[lang]) lang = 'it';
  currentLang = lang;
  localStorage.setItem('gk_lang', lang);
  applyLang();
}

function setupLang() {
  const wrap = document.getElementById('langWrap');
  const btn = document.getElementById('langBtn');
  if (!wrap || !btn) return;
  btn.addEventListener('click', e => {
    e.stopPropagation();
    wrap.classList.toggle('open');
  });
  document.querySelectorAll('.lang-option').forEach(o => {
    o.addEventListener('click', () => {
      setLang(o.dataset.lang);
      wrap.classList.remove('open');
    });
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.lang-wrap')) wrap.classList.remove('open');
  });
  applyLang();
}

// â”€â”€ STATO â”€â”€
// ══════════════════════════════════════════════
// AUTH / ACCOUNT — Accedi / Registrati / Ospite
// ══════════════════════════════════════════════
function getAuthUsers() {
  try { return JSON.parse(localStorage.getItem('gk_users') || '{}'); }
  catch (e) { return {}; }
}

function setAuthUsers(users) {
  localStorage.setItem('gk_users', JSON.stringify(users));
}

function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem('gk_user') || 'null'); }
  catch (e) { return null; }
}

function setCurrentUser(user) {
  if (user) localStorage.setItem('gk_user', JSON.stringify(user));
  else localStorage.removeItem('gk_user');
  const btn = document.getElementById('authBtn');
  if (btn) btn.classList.toggle('logged', !!user);
}

function authShowView(id) {
  ['authChoiceView', 'authRegisterView', 'authLoginView', 'authProfileView'].forEach(v => {
    const el = document.getElementById(v);
    if (el) el.style.display = (v === id) ? 'flex' : 'none';
  });
}

function openAuthModal() {
  const user = getCurrentUser();
  const profileName = document.getElementById('authProfileName');
  if (user) {
    if (profileName) profileName.textContent = t('auth.hello') + ' ' + (user.name || user.email);
    authShowView('authProfileView');
  } else {
    authShowView('authChoiceView');
  }
  openOverlay('authOverlay');
  navPush();
}

function closeAuthModal() {
  closeOverlay('authOverlay');
}

function setupAuth() {
  const overlay = document.getElementById('authOverlay');
  const btn = document.getElementById('authBtn');
  if (!overlay || !btn) return;

  btn.addEventListener('click', openAuthModal);
  document.getElementById('authClose')?.addEventListener('click', closeAuthModal);
  overlay.addEventListener('click', e => {
    if (e.target.id === 'authOverlay') closeAuthModal();
  });

  document.getElementById('authGoRegister')?.addEventListener('click', () => {
    const err = document.getElementById('authRegError');
    if (err) err.style.display = 'none';
    authShowView('authRegisterView');
  });
  document.getElementById('authGoLogin')?.addEventListener('click', () => {
    const err = document.getElementById('authLoginError');
    if (err) err.style.display = 'none';
    authShowView('authLoginView');
  });
  document.getElementById('authRegBack')?.addEventListener('click', () => authShowView('authChoiceView'));
  document.getElementById('authLoginBack')?.addEventListener('click', () => authShowView('authChoiceView'));

  document.getElementById('authGoGuest')?.addEventListener('click', () => {
    continueAsGuest();
    localStorage.setItem('gk_auth_dismissed', '1');
    closeAuthModal();
  });

  document.getElementById('authLogout')?.addEventListener('click', () => {
    continueAsGuest();
    closeAuthModal();
    showToast('', t('auth.logout'));
  });

  document.getElementById('authRegisterForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('authRegName').value.trim();
    const email = document.getElementById('authRegEmail').value.trim().toLowerCase();
    const err = document.getElementById('authRegError');
    const users = getAuthUsers();
    if (users[email]) {
      if (err) { err.textContent = t('auth.errorExists'); err.style.display = 'block'; }
      return;
    }
    users[email] = { name, email };
    setAuthUsers(users);
    activateAccount({ name, email }, true);
    localStorage.setItem('gk_auth_dismissed', '1');
    closeAuthModal();
    showToast('', t('auth.welcome') + ', ' + name);
  });

  document.getElementById('authLoginForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('authLoginEmail').value.trim().toLowerCase();
    const err = document.getElementById('authLoginError');
    const users = getAuthUsers();
    if (!email || !users[email]) {
      if (err) { err.textContent = t('auth.errorNotFound'); err.style.display = 'block'; }
      return;
    }
    activateAccount(users[email], true);
    localStorage.setItem('gk_auth_dismissed', '1');
    closeAuthModal();
    showToast('', t('auth.welcomeBack') + ', ' + users[email].name);
  });

  // Stato iniziale del bottone account
  btn.classList.toggle('logged', !!getCurrentUser());

  // Popup di benvenuto al primo accesso (finché non sceglie utente o ospite)
  if (!getCurrentUser() && !localStorage.getItem('gk_auth_dismissed')) {
    openAuthModal();
  }
}

// ── NOMI PRODOTTO / DATI SALVATI ──
// I nomi salvati nel carrello sono copie dello stato precedente del catalogo. Per
// evitare testo corrotto o obsoleto, per gli articoli catalogati usiamo sempre
// il nome attuale di PRODUCTS, lasciando invariati solo gli articoli personalizzati.
function readStoredArray(key, storage) {
  const source = storage || localStorage;
  try {
    const value = JSON.parse(source.getItem(key) || '[]');
    return Array.isArray(value) ? value : [];
  } catch (e) {
    return [];
  }
}

function getAccountStorageInfo() {
  const user = getCurrentUser();
  if (user && user.email) {
    const emailKey = encodeURIComponent(String(user.email).trim().toLowerCase());
    return {
      storage: localStorage,
      cartKey: 'gk_cart_user_' + emailKey,
      favoritesKey: 'gk_favorites_user_' + emailKey,
      user
    };
  }
  return {
    storage: sessionStorage,
    cartKey: 'gk_guest_cart',
    favoritesKey: 'gk_guest_favorites',
    user: null
  };
}

function loadActiveArray(type) {
  const info = getAccountStorageInfo();
  const key = type === 'cart' ? info.cartKey : info.favoritesKey;
  if (info.storage.getItem(key) !== null) return readStoredArray(key, info.storage);

  // Migrazione una tantum dei dati creati dalla versione precedente.
  const legacyKey = type === 'cart' ? 'gk_cart' : 'gk_favorites';
  const legacy = readStoredArray(legacyKey, localStorage);
  if (legacy.length) {
    info.storage.setItem(key, JSON.stringify(legacy));
    localStorage.removeItem(legacyKey);
  }
  return legacy;
}

function saveActiveArray(type, value) {
  const info = getAccountStorageInfo();
  const key = type === 'cart' ? info.cartKey : info.favoritesKey;
  info.storage.setItem(key, JSON.stringify(value));
}

function cleanDisplayText(value) {
  return String(value == null ? '' : value)
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '')
    .replace(/\uFFFD/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function getCartProduct(item) {
  if (!item || item.id == null) return null;
  const rawId = String(item.id);
  const baseId = rawId.replace(/^(shorts|socks)-/, '');
  return PRODUCTS.find(p => String(p.id) === baseId) || null;
}

function getCartItemName(item) {
  const rawId = item && item.id != null ? String(item.id) : '';
  const product = getCartProduct(item);
  if (product) {
    const productName = cleanDisplayText(product.name);
    if (rawId.indexOf('shorts-') === 0) {
      return 'Pantaloncini – ' + productName.replace(/^Maglia\s*/i, '').trim();
    }
    if (rawId.indexOf('socks-') === 0) {
      return 'Calzettoni – ' + productName.replace(/^Maglia\s*/i, '').trim();
    }
    return productName;
  }
  return cleanDisplayText(item && item.name);
}

function normalizeFavoriteIds(items) {
  return items
    .map(id => {
      const numericId = typeof id === 'string' && id.trim() !== '' ? Number(id) : id;
      return Number.isFinite(numericId) ? numericId : id;
    })
    .filter((id, index, list) => list.indexOf(id) === index && PRODUCTS.some(p => String(p.id) === String(id)));
}

function syncAccountDataUI() {
  updateCartUI();
  updateFavBadge();
  if (document.getElementById('cartSidebar')?.classList.contains('open')) renderCartItems();
  if (document.getElementById('favSidebar')?.classList.contains('open')) renderFavoritesSidebar();
}

function activateAccount(user, transferGuestData) {
  const previousUser = getCurrentUser();
  const guestCart = !previousUser ? cart.slice() : [];
  const guestFavorites = !previousUser ? favorites.slice() : [];

  saveActiveArray('cart', normalizeCartItems(cart));
  saveActiveArray('favorites', favorites);
  setCurrentUser(user);
  localStorage.removeItem('gk_guest_mode');

  cart = normalizeCartItems(loadActiveArray('cart'));
  favorites = normalizeFavoriteIds(loadActiveArray('favorites'));

  // Mantieni gli articoli aggiunti prima della registrazione/accesso, se il
  // profilo non aveva ancora un carrello o una lista preferiti.
  if (transferGuestData && !previousUser) {
    if (cart.length === 0 && guestCart.length) cart = normalizeCartItems(guestCart);
    if (favorites.length === 0 && guestFavorites.length) favorites = normalizeFavoriteIds(guestFavorites);
    saveActiveArray('cart', cart);
    saveActiveArray('favorites', favorites);
  }
  syncAccountDataUI();
}

function continueAsGuest() {
  // Non lasciare visibili nel profilo successivo i dati dell'account precedente.
  saveActiveArray('cart', normalizeCartItems(cart));
  saveActiveArray('favorites', favorites);
  setCurrentUser(null);
  cart = [];
  favorites = [];
  saveActiveArray('cart', cart);
  saveActiveArray('favorites', favorites);
  localStorage.removeItem('gk_cart');
  localStorage.removeItem('gk_favorites');
  localStorage.setItem('gk_guest_mode', '1');
  syncAccountDataUI();
}

function normalizeCartItems(items) {
  return items.map(function (item) {
    if (!item || typeof item !== 'object') return item;
    if (typeof item.id === 'string' && /^\d+$/.test(item.id)) item.id = Number(item.id);
    if (!item._uid) item._uid = Date.now() + '-' + Math.random().toString(36).slice(2);
    item.name = getCartItemName(item);
    return item;
  }).filter(Boolean);
}

let cart = normalizeCartItems(loadActiveArray('cart'));
// Salva subito i nomi canonici: corregge anche i carrelli già presenti nel browser.
if (cart.length) saveActiveArray('cart', cart);
let currentFilter = 'new';
let currentTeam = null;
let currentSearch = '';
let currentBrand = null;
let currentSort = 'default';
let quickViewProduct = null;
let qvEditUid = null; // uid della riga carrello in modifica (edit dalla scheda prodotto)
let currentCustomization = null; // { name, number, shortsNumber, sockSize }
let favorites = normalizeFavoriteIds(loadActiveArray('favorites')); // array di product id
if (favorites.length) saveActiveArray('favorites', favorites);

// ── STATO SCONTO ──
let appliedDiscount = null; // { code, type, description, amount }

// â”€â”€ SQUADRE PER CATEGORIA â”€â”€
const TEAMS = {
  Champions: [
    'Real Madrid', 'Manchester City', 'Bayern Monaco', 'PSG', 'Inter', 'Juventus',
    'Atletico Madrid', 'Borussia Dortmund', 'Arsenal', 'Barcellona', 'Napoli', 'Porto',
    'Ajax', 'Chelsea', 'Liverpool', 'Milan', 'Tottenham', 'Benfica', 'Leverkusen',
    'RB Leipzig', 'Atalanta',
  ],
  Premier: [
    'Arsenal FC', 'Aston Villa', 'Brighton', 'Chelsea', 'Crystal Palace', 'Liverpool FC',
    'Manchester City', 'Manchester United', 'Newcastle', 'Tottenham', 'West Ham',
  ],
  SerieA: [
    'Atalanta', 'Bologna', 'Cagliari', 'Como', 'Cremonese', 'Fiorentina', 'Genoa', 'Inter', 'Juventus', 'Lazio',
    'Lecce', 'Milan', 'Napoli', 'Parma', 'Pisa', 'Roma', 'Sassuolo', 'Torino', 'Udinese', 'Verona'
  ],
  Bundesliga: [
    'Bayern Monaco', 'Borussia Dortmund', 'Bayer Leverkusen', 'RB Leipzig',
    'Eintracht Francoforte', 'Wolfsburg', 'Stoccarda', 'Friburgo'
  ],
  SaudiLeague: [
    'Al Nassr', 'Al Hilal', 'Al Ittihad', 'Al Ahli',
    'Al Qadsiah', 'Al Shabab', 'Al Ettifaq', 'Al Fayha'
  ],
  LaLiga: [
    'Real Madrid', 'Barcellona', 'Atletico Madrid', 'Siviglia', 'Villarreal',
    'Real Betis', 'Athletic Bilbao', 'Real Sociedad', 'Osasuna', 'Valencia'
  ],
  Ligue1: [
    'PSG', 'Marseille', 'Lyonnais', 'Monaco', 'Lilla', 'Nizza',
    'Rennes', 'Lens'
  ],
  Nazionali: [
    'Italia', 'Francia', 'Spagna', 'Germania', 'Brasile', 'Argentina',
    'Portogallo', 'Inghilterra', 'Belgio', 'Olanda', 'Marocco', 'Giappone'
  ],
  Mondiale2026: [
    'Italia', 'Francia', 'Spagna', 'Germania', 'Brasile', 'Argentina',
    'Portogallo', 'Inghilterra', 'USA', 'Messico', 'Canada', 'Marocco',
    'Giappone', 'Corea del Sud', 'Australia', 'Olanda', 'Belgio', 'Svizzera',
    'Colombia', 'Uraguay', 'Senegal', 'Croazia'
  ],
};

// â”€â”€ INIT â”€â”€
document.addEventListener('DOMContentLoaded', () => {
  initEmailJS();
  renderProducts(currentFilter);
  updateCartUI();
  setupParticles();
  setupNav();
  setupLang();
  applyLang();
  setupNavMegaMenu();
  // Link residui verso la vecchia sezione #products (rimossa) → pagina prodotti
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href="#products"]');
    if (!link) return;
    // I trigger del mega menu (Calcio, Sport...) aprono il loro dropdown: non interferire
    if (link.classList.contains('nav-mega-trigger')) return;
    // I link del mega menu con data-league/data-filter sono già gestiti da setupNavMegaMenu
    if (link.dataset.league || link.dataset.filter || link.dataset.filterType) return;
    e.preventDefault();
    openCatPage('all', 'TUTTI I PRODOTTI', 'Prodotti', []);
  });
  setupNavSearch();
  setupFeatured();
  setupMondiali();
  setupCartSidebar();
  setupOrderModal();
  setupQuickView();
  setupContactForm();
  setupSetupModal();
  setupAdminBtn();
  setupScrollSpy();
  setupFilters();
  setupSearch();
  setupVendorPanel();
  setupReviews();
  setupCustomOrder();
  setupCustomRequest();
  setupHeroCarousel();
  setupHeroSlideshow();
  setupReviewMiniCarousels();
  setupFavorites();
  setupCustomizeModal();
  setupVintage();
  setupScarpeSection();
  setupAccessoriSection();
  setupTuteSection();
  setupMustHave();
  setupBrands();
  setupSquadra();
  setupDiscountCode();
  setupAuth();
});

// ══════════════════════════════════════════════
// SCEGLI LA TUA SQUADRA — freccia scroll
// ══════════════════════════════════════════════
function setupSquadra() {
  const btn = document.getElementById('squadraScrollRight');
  const viewport = document.getElementById('squadraViewport');
  if (!btn || !viewport) return;
  btn.addEventListener('click', () => {
    viewport.scrollBy({ left: 170 * 2, behavior: 'smooth' });
  });
  // Quando si arriva alla fine, ricomincia dall'inizio
  viewport.addEventListener('scroll', () => {
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    if (viewport.scrollLeft >= maxScroll - 2) {
      setTimeout(() => viewport.scrollTo({ left: 0, behavior: 'smooth' }), 400);
    }
  }, { passive: true });
}

// â”€â”€ EMAILJS INIT â”€â”€
function initEmailJS() {
  if (EMAIL_CONFIG.publicKey) {
    emailjs.init({ publicKey: EMAIL_CONFIG.publicKey });
  }
}

// â”€â”€ PARTICELLE HERO â”€â”€
function setupParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 4}s;
      animation-duration: ${4 + Math.random() * 4}s;
      width: ${2 + Math.random() * 3}px;
      height: ${2 + Math.random() * 3}px;
      opacity: ${0.2 + Math.random() * 0.3};
    `;
    container.appendChild(p);
  }
}

// â”€â”€ NAVBAR â”€â”€
function setupNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  function closeAllPanels() {
    document.querySelectorAll('.nav-mega-item').forEach(i => i.classList.remove('active'));
  }

  hamburger?.addEventListener('click', () => {
    const closing = navLinks?.classList.contains('open');
    navLinks?.classList.toggle('open');
    if (closing) closeAllPanels();
  });

  // Tasto chiudi nel drawer: chiude menu e pannelli
  document.getElementById('drawerClose')?.addEventListener('click', () => {
    navLinks?.classList.remove('open');
    closeAllPanels();
    const hb = document.getElementById('hamburger');
    if (hb) hb.setAttribute('aria-expanded', 'false');
  });

  // Chiudi menu su click link (ma NON sui trigger del mega menu: quelli aprono il pannello)
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.classList.contains('nav-mega-trigger')) return;
    link.addEventListener('click', () => navLinks?.classList.remove('open'));
  });

  // Logo click → top
  document.querySelector('.nav-logo')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // â”€â”€ MEGA MENU: apri/chiudi con timeout per evitare chiusura sul gap â”€â”€
  const megaItems = document.querySelectorAll('.nav-mega-item');
  let closeTimer = null;

  function openMega(item) {
    // Cancella eventuale timer di chiusura in corso
    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
    // Chiudi tutti gli altri panel
    megaItems.forEach(other => { if (other !== item) other.classList.remove('active'); });
    item.classList.add('active');
  }

  function closeMega(item) {
    // Un pannello aperto con un CLICK (tap/click sul trigger) resta aperto finché
    // non si clicca altrove o si chiude: non deve sparire al passaggio del mouse.
    if (item.dataset.clickOpened === '1') return;
    // Aspetta 300ms prima di chiudere: se il cursore entra nel panel il timer viene annullato
    closeTimer = setTimeout(() => {
      item.classList.remove('active');
      closeTimer = null;
    }, 300);
  }

  function closeAllMega() {
    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
    megaItems.forEach(item => item.classList.remove('active'));
  }

  megaItems.forEach(item => {
    // Apri quando il cursore entra sul nav-mega-item (trigger + panel sono dentro)
    item.addEventListener('mouseenter', () => openMega(item));
    // Avvia timer chiusura quando il cursore esce dall'intero nav-mega-item
    item.addEventListener('mouseleave', () => closeMega(item));

    // Click/tap sul trigger: apre il pannello (funziona anche su mobile, dove il
    // mouseenter non esiste). Evita il conflitto col hover desktop: se l'apertura
    // è avvenuta col mouse (mouseenter) il click NON chiude subito; chiude solo se
    // era stato aperto da un click precedente (secondo tap = chiudi).
    const trigger = item.querySelector('.nav-mega-trigger');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const openedByClick = item.dataset.clickOpened === '1';
        if (item.classList.contains('active') && openedByClick) {
          // Secondo tap: chiudi il pannello
          item.classList.remove('active');
          delete item.dataset.clickOpened;
        } else {
          // Apri (chiude gli altri e azzera il timer di chiusura pendente)
          openMega(item);
          item.dataset.clickOpened = '1';
        }
      });
    }
    // Un hover reale resetta il flag: il pannello aperto col mouse si chiude
    // normalmente con mouseleave, e il click dopo l'hover lo mantiene aperto
    item.addEventListener('mouseenter', () => { delete item.dataset.clickOpened; });
  });

  // Chiudi anche se si clicca fuori dalla navbar
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-mega-item')) closeAllMega();
  });

  // Chiudi se si preme ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAllMega();
  });
}

// â”€â”€ SCROLL SPY â”€â”€
function setupScrollSpy() {
  const sections = ['home', 'products', 'about', 'contact'];
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = 'home';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) current = id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// PRODOTTI
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

// Controlla se un prodotto appartiene a una categoria (supporta stringa e array)
function productMatchesCategory(p, filter) {
  if (filter === 'all') return true;
  if (filter === 'new') return p.badge === 'new';
  if (filter === 'vintage') {
    return p.badge === 'vintage';
  }
  const cats = Array.isArray(p.category) ? p.category : [p.category];
  return cats.includes(filter);
}

// Controlla se un prodotto appartiene a una squadra specifica
function productMatchesTeam(p, team) {
  if (!team) return true;
  return p.name.toLowerCase().includes(team.toLowerCase());
}

// Controlla se un prodotto corrisponde al testo di ricerca
function productMatchesSearch(p, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  const name = p.name.toLowerCase();
  const label = Array.isArray(p.categoryLabel)
    ? p.categoryLabel.join(' ').toLowerCase()
    : (p.categoryLabel || '').toLowerCase();
  const brand = (p.brand || '').toLowerCase();
  return name.includes(q) || label.includes(q) || brand.includes(q);
}

// Controlla se un prodotto appartiene a un brand specifico
function productMatchesBrand(p, brand) {
  if (!brand) return true;
  const b = brand.toLowerCase();
  return (p.brand || '').toLowerCase() === b ||
         p.name.toLowerCase().includes(b);
}

// Controlla se un prodotto ha una categoriaLabel specifica (es. "Scarpe da calcio", "Running")
function productMatchesLabel(p, label) {
  if (!label) return true;
  const l = label.toLowerCase();
  const labels = Array.isArray(p.categoryLabel) ? p.categoryLabel : [p.categoryLabel || ''];
  return labels.some(x => String(x).toLowerCase().includes(l));
}

function renderProducts(filter, team = null) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  let filtered = PRODUCTS.filter(p =>
    productMatchesCategory(p, filter) &&
    productMatchesTeam(p, team) &&
    productMatchesSearch(p, currentSearch) &&
    productMatchesBrand(p, currentBrand)
  );

  // Sort
  if (currentSort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (currentSort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);

  // Aggiorna contatore
  const countEl = document.getElementById('shopCount');
  if (countEl) countEl.textContent = `(${filtered.length})`;

  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:4rem 1rem;color:var(--text-muted);">
        <div style="font-size:3rem;margin-bottom:1rem;">🔍</div>
        <p style="font-size:1.1rem;">Nessun prodotto trovato per questa selezione.</p>
      </div>`;
    return;
  }

  filtered.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = p.id;
    card.style.animationDelay = `${i * 0.06}s`;
    card.onclick = () => openQuickView(p.id);
    const catLabel = Array.isArray(p.categoryLabel)
      ? p.categoryLabel[0]
      : p.categoryLabel;
    const fav = isFavorite(p.id);
    card.innerHTML = `
      <div class="card-img-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy"
             onerror="this.onerror=null;this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 3 4%22%3E%3Crect fill=%22%23f0f0f0%22 width=%223%22 height=%224%22/%3E%3Ctext x=%221.5%22 y=%222.2%22 fill=%22%23ccc%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-size=%221%22%3E%E2%9A%BD%3C/text%3E%3C/svg%3E'" style="width:100%;height:100%;object-fit:cover;display:block;">
        ${p.badge ? `<span class="card-badge ${p.badge}">${p.badgeLabel}</span>` : ''}
        <button class="card-fav-btn${fav ? ' active' : ''}" data-pid="${p.id}" onclick="event.stopPropagation();toggleFavorite(${p.id},this)" title="${fav ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}" aria-label="Preferiti">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="${fav ? '#e44545' : 'none'}" stroke="${fav ? '#e44545' : '#999'}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
      <div class="card-info">
        <div class="card-category">${catLabel}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-price-row">
          <span class="card-price">&#x20AC;${p.price.toFixed(2)}</span>
          ${p.oldPrice ? `<span class="card-price-old">&#x20AC;${p.oldPrice.toFixed(2)}</span>` : ''}
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

}

// ── SETUP FILTRI SIDEBAR 3-LEVEL ──
function setupFilters() {

  // ── Novità / Vintage ──
  document.getElementById('filterNew')?.addEventListener('click', () => setActiveFilter('new', null));
  document.getElementById('filterVintage')?.addEventListener('click', () => setActiveFilter('vintage', null));

  // ── CALCIO: toggle apre/chiude l'intera sezione campionati ──
  const calcioBtn = document.getElementById('calcioToggleBtn');
  const calcioList = document.getElementById('calcioSubList');
  if (calcioBtn && calcioList) {
    calcioBtn.addEventListener('click', () => {
      const isOpen = calcioList.classList.contains('open');
      // Chiudi Accessori se aperto
      document.getElementById('accessoriSubList')?.classList.remove('open');
      document.getElementById('accessoriToggleBtn')?.classList.remove('active');
      if (isOpen) {
        calcioList.classList.remove('open');
        calcioBtn.classList.remove('active');
      } else {
        calcioList.classList.add('open');
        calcioBtn.classList.add('active');
      }
    });
  }

  // ── League buttons (livello 2 dentro Calcio) ──
  const leagueDefs = [
    { btnId: 'filterChampions', listId: 'menuChampions', filter: 'Champions' },
    { btnId: 'megaBtnSerieA', listId: 'megaListSerieA', filter: 'SerieA' },
    { btnId: 'megaBtnLaLiga', listId: 'megaListLaLiga', filter: 'LaLiga' },
    { btnId: 'megaBtnPremier', listId: 'megaListPremier', filter: 'Premier' },
    { btnId: 'megaBtnBundesliga', listId: 'megaListBundesliga', filter: 'Bundesliga' },
    { btnId: 'megaBtnSaudi', listId: 'megaListSaudi', filter: 'SaudiLeague' },
    { btnId: 'megaBtnNazionali', listId: 'megaListNazionali', filter: 'Nazionali' },
  ];

  // ── MONDIALE 2026: pulsante flat diretto ──
  const mondialBtn = document.getElementById('megaBtnMondiale2026');
  if (mondialBtn) {
    mondialBtn.addEventListener('click', () => {
      setActiveFilter('Mondiale2026', null);
    });
  }

  leagueDefs.forEach(({ btnId, listId, filter }) => {
    const btn = document.getElementById(btnId);
    const list = document.getElementById(listId);
    if (!btn || !list) return;

    // Popola lista squadre (livello 3)
    list.innerHTML = (TEAMS[filter] || []).map(t =>
      `<li><button data-team="${t}" data-filter="${filter}">${t}</button></li>`
    ).join('');

    // Click campionato: filtra lega + toggle squadre, non chiude Calcio
    btn.addEventListener('click', () => {
      const isOpen = list.classList.contains('open');
      // Chiudi tutte le altre sub-list di livello 3 dentro calcio (non calcioSubList)
      if (calcioList) {
        calcioList.querySelectorAll('.sidebar-sub-list.open').forEach(sl => {
          if (sl !== list) sl.classList.remove('open');
        });
        calcioList.querySelectorAll('.sidebar-nested-btn').forEach(b => {
          if (b !== btn) b.classList.remove('active');
        });
      }
      if (!isOpen) {
        list.classList.add('open');
        btn.classList.add('active');
      } else {
        list.classList.remove('open');
        btn.classList.remove('active');
      }
      setActiveFilter(filter, null);
    });

    // Click team (livello 3)
    list.addEventListener('click', (e) => {
      const item = e.target.closest('button[data-team]');
      if (!item) return;
      list.querySelectorAll('button').forEach(b => b.classList.remove('dd-item-active'));
      item.classList.add('dd-item-active');
      setActiveFilter(filter, item.dataset.team || null);
      // Su mobile la sidebar è sopra la griglia → scroll alla griglia prodotti
      setTimeout(() => {
        const gridEl = document.getElementById('productsGrid');
        if (gridEl) {
          const navbarH = (document.querySelector('.header')?.offsetHeight || 60) + 16;
          const top = gridEl.getBoundingClientRect().top + window.pageYOffset - navbarH;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 120);
    });
  });

  // ── ACCESSORI: toggle apre/chiude la sezione ──
  const accessoriBtn = document.getElementById('accessoriToggleBtn');
  const accessoriList = document.getElementById('accessoriSubList');
  if (accessoriBtn && accessoriList) {
    accessoriBtn.addEventListener('click', () => {
      const isOpen = accessoriList.classList.contains('open');
      // Chiudi Calcio se aperto
      calcioList?.classList.remove('open');
      calcioBtn?.classList.remove('active');
      if (isOpen) {
        accessoriList.classList.remove('open');
        accessoriBtn.classList.remove('active');
      } else {
        accessoriList.classList.add('open');
        accessoriBtn.classList.add('active');
      }
    });

    // Sub-item Accessori
    accessoriList.querySelectorAll('.sidebar-nested-btn[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        accessoriList.querySelectorAll('.sidebar-nested-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        setActiveFilter(btn.dataset.filter, null);
      });
    });
  }

  // ── Toggle sidebar ("Nascondi filtri" / "Mostra filtri") ──
  const toggleBtn = document.getElementById('sidebarToggleBtn');
  const layout = document.getElementById('shopLayout');
  if (toggleBtn && layout) {
    toggleBtn.addEventListener('click', () => {
      const hidden = layout.classList.toggle('sidebar-hidden');
      toggleBtn.innerHTML = hidden
        ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg> Mostra filtri`
        : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg> Nascondi filtri`;
    });
  }

  // ── Sort menu ──
  const sortWrap = document.querySelector('.shop-sort-wrap');
  const sortBtn = document.getElementById('shopSortBtn');
  if (sortBtn && sortWrap) {
    sortBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sortWrap.classList.toggle('open');
    });
    document.addEventListener('click', () => sortWrap.classList.remove('open'));
    document.querySelectorAll('.shop-sort-item').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.shop-sort-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        currentSort = item.dataset.sort || 'default';
        sortWrap.classList.remove('open');
        renderProducts(currentFilter, currentTeam);
      });
    });
  }
}

// ── BRAND SECTION ──
function setupBrands() {
  document.querySelectorAll('.brand-card[data-brand]').forEach(card => {
    card.addEventListener('click', () => {
      const brand = card.dataset.brand; // es. "EA7", "Nike", "Adidas"...
      const brandUpper = brand.toUpperCase();
      // Apre lo stesso overlay catPage usato da "Acquista prodotti Vintage"
      openCatPage(
        'all',           // mostra tutti i prodotti del brand (non filtrare per categoria)
        brandUpper,      // titolo overlay (es. "EA7")
        brand,           // breadcrumb
        [],              // nessun sub-tab
        null,            // nessuna squadra specifica
        brand            // <-- filtro brand
      );
    });
  });
}

function closeAllDropdowns() {
  // (kept for compatibility)
}

function setActiveFilter(filter, team, updateActiveBtn = true) {
  currentFilter = filter;
  currentTeam = team || null;
  if (updateActiveBtn) {
    // Resetta tutti i flat-btn e nested-btn
    document.querySelectorAll('.sidebar-flat-btn, .sidebar-nested-btn').forEach(b => {
      if (b.id !== 'calcioToggleBtn' && b.id !== 'accessoriToggleBtn') {
        b.classList.remove('active');
      }
    });
    if (filter === 'new') document.getElementById('filterNew')?.classList.add('active');
    else if (filter === 'vintage') document.getElementById('filterVintage')?.classList.add('active');
    else if (filter === 'Champions') document.getElementById('filterChampions')?.classList.add('active');
    else if (filter === 'SerieA') document.getElementById('megaBtnSerieA')?.classList.add('active');
    else if (filter === 'LaLiga') document.getElementById('megaBtnLaLiga')?.classList.add('active');
    else if (filter === 'Premier') document.getElementById('megaBtnPremier')?.classList.add('active');
    else if (filter === 'Bundesliga') document.getElementById('megaBtnBundesliga')?.classList.add('active');
    else if (filter === 'SaudiLeague') document.getElementById('megaBtnSaudi')?.classList.add('active');
    else if (filter === 'Nazionali') document.getElementById('megaBtnNazionali')?.classList.add('active');
    else if (filter === 'Mondiale2026') document.getElementById('megaBtnMondiale2026')?.classList.add('active');
    // Accessori sub-items sono già gestiti direttamente
  }
  renderProducts(currentFilter, currentTeam);
}

// ── SEARCH BAR ──
function setupSearch() {
  const input = document.getElementById('searchInput');
  const clearBtn = document.getElementById('searchClear');
  if (!input) return;

  let debounceTimer;

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      currentSearch = input.value.trim();
      // Se c'è testo di ricerca, resetta filtro categoria per cercare ovunque
      if (currentSearch) {
        currentFilter = 'all';
        currentTeam = null;
        currentBrand = null; // reset filtro brand
        document.querySelectorAll('.brand-card').forEach(c => c.classList.remove('active'));
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('filterAll')?.classList.add('active');
        closeAllDropdowns();
      }
      clearBtn?.classList.toggle('visible', currentSearch.length > 0);
      renderProducts(currentFilter, currentTeam);
    }, 200);
  });

  clearBtn?.addEventListener('click', () => {
    input.value = '';
    currentSearch = '';
    currentBrand = null; // reset filtro brand
    document.querySelectorAll('.brand-card').forEach(c => c.classList.remove('active'));
    clearBtn.classList.remove('visible');
    renderProducts(currentFilter, currentTeam);
    input.focus();
  });

  // Chiudi dropdown quando si digita nella search
  input.addEventListener('focus', () => closeAllDropdowns());
}

// ══════════════════════════════════════════════
// QUICK VIEW
// ══════════════════════════════════════════════
function setupQuickView() {
  // La scheda prodotto è una pagina a schermo intero: si chiude con il
  // pulsante "← Indietro" (onclick inline) o col tasto indietro del browser.
}

function openQuickView(id, editItem) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  quickViewProduct = p;
  currentCustomization = null;
  if (!editItem) qvEditUid = null; // apertura normale: nessuna riga in modifica
  const addLabel = editItem ? t('qv.aggiornaCarrello') : t('qv.aggiungi');
  const stickyLabel = editItem ? t('qv.aggiorna') : t('qv.aggiungiSticky');
  const content = document.getElementById('quickViewContent');
  const catLabel = Array.isArray(p.categoryLabel) ? p.categoryLabel[0] : p.categoryLabel;
  const kitType = p.kitType || 'solo';
  const isSoloAllowed = kitType !== 'unico';
  const isFav = isFavorite(p.id);

  // Titolo prodotto nella topbar della scheda
  const titleEl = document.getElementById('qvPageTitle');
  if (titleEl) titleEl.textContent = p.name;

  content.innerHTML = `
    <div class="qv-grid">
      <div class="qv-img-wrap">
        <img src="${getProductImage(p)}" alt="${p.name}" class="qv-img"
             onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22480%22><rect fill=%22%230f1525%22 width=%22400%22 height=%22480%22/><text x=%2250%25%22 y=%2250%25%22 fill=%22%236c63ff%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-size=%2270%22>&#x26BD;</text></svg>'">
        ${p.badge ? `<span class="card-badge ${p.badge} qv-badge">${p.badgeLabel}</span>` : ''}
        <button class="card-fav-btn${isFav ? ' active' : ''}" id="qvFavBtn" onclick="toggleFavoriteFromQV(${p.id})" title="${isFav ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="${isFav ? '#e44545' : 'none'}" stroke="${isFav ? '#e44545' : '#888'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
      <div class="qv-details">
        <div class="qv-category">${catLabel}</div>
        <h1 class="qv-name">${p.name}</h1>
        <p class="qv-desc">${p.description}</p>

        <div class="qv-price-wrap">
          <span class="qv-price" id="qvPriceDisplay" data-base="${p.price}">&#x20AC;${p.price.toFixed(2)}</span>
          ${p.oldPrice ? `<span class="qv-price-old">&#x20AC;${p.oldPrice.toFixed(2)}</span>` : ''}
        </div>

        <!-- Taglia -->
        <div class="qv-section-label" data-i18n="qv.taglia">Taglia</div>
        <div class="qv-sizes">
          ${p.sizes.map((s, i) => `<button class="qv-size-btn${i === 0 ? ' active' : ''}" onclick="selectQvSize(this)">${s}</button>`).join('')}
        </div>

        <!-- Tipo Maglia -->
        <div class="qv-section-label" data-i18n="qv.tipoMaglia">Tipo Maglia</div>
        <div class="qv-fabric-row">
          <button class="qv-option-btn active" data-extra="0" onclick="selectQvFabric(this)">
            <span class="qv-opt-text"><strong data-i18n="qv.standard">Standard</strong><small data-i18n="qv.tifoso">Tifoso</small></span>
          </button>
          <button class="qv-option-btn" data-extra="4" onclick="selectQvFabric(this)">
            <span class="qv-opt-text"><strong data-i18n="qv.player">Player</strong><small>+&#x20AC;3,00</small></span>
          </button>
        </div>

        <!-- Composizione -->
        <div class="qv-section-label" data-i18n="qv.composizione">Composizione</div>
        <div class="qv-kit-row">
          ${isSoloAllowed ? `<button class="qv-option-btn active" data-kit="solo" data-extra="0" onclick="selectQvKit(this)">
            <span class="qv-opt-text"><strong data-i18n="qv.soloMaglia">Solo Maglia</strong><small data-i18n="qv.inclusa">Inclusa nel prezzo</small></span>
          </button>` : ''}
          <button class="qv-option-btn${!isSoloAllowed ? ' active' : ''}" data-kit="shorts" data-extra="6" onclick="selectQvKit(this)">
            <span class="qv-opt-text"><strong data-i18n="qv.magliaPanta">Maglia + Pantaloncino</strong><small>+&#x20AC;6,00</small></span>
          </button>
          <button class="qv-option-btn" data-kit="full" data-extra="10" onclick="selectQvKit(this)">
            <span class="qv-opt-text"><strong data-i18n="qv.kitCompleto">Kit Completo</strong><small><span data-i18n="qv.kitCompletoSub">Maglia+Pant+Calzettoni</span> +&#x20AC;10,00</small></span>
          </button>
        </div>

        <!-- Badge personalizzazione applicata -->
        <div id="qvCustomizeBadge" style="display:none;margin-top:.5rem;">
          <span class="customize-applied-badge" data-i18n="qv.personalizzazione">Personalizzazione applicata</span>
        </div>

        <button class="btn btn-primary btn-full qv-add-btn" onclick="addToCartFromQV(${p.id}); closeQuickView();">
          ${addLabel}
        </button>

        <!-- Pulsante Personalizza (sempre visibile) -->
        <button class="qv-customize-btn" id="qvCustomizeBtn" onclick="openCustomizeModal(${p.id})" style="display:flex;">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          <span data-i18n="qv.personalizza">Personalizza (Nome &amp; Numero)</span>
        </button>
      </div>
    </div>
  `;

  // Barra sticky mobile: prezzo + aggiungi al carrello sempre visibili
  const sticky = document.getElementById('qvStickyBar');
  if (sticky) {
    sticky.innerHTML = `
      <div class="qv-sticky-info">
        <span class="qv-price" id="qvMobilePrice">&#x20AC;${p.price.toFixed(2)}</span>
      </div>
      <button class="btn btn-primary qv-sticky-add" onclick="addToCartFromQV(${p.id}); closeQuickView();">
        ${stickyLabel}
      </button>
    `;
  }

  // Modifica dal carrello: preseleziona taglia/tessuto/kit della riga esistente
  if (editItem) {
    const normFabric = String(editItem.fabric || '').replace(/\uD83D\uDC55/g, '').trim();

    let sizeMatched = false;
    content.querySelectorAll('.qv-size-btn').forEach(b => {
      const m = b.textContent.trim() === editItem.size;
      b.classList.toggle('active', m);
      if (m) sizeMatched = true;
    });
    if (!sizeMatched && content.querySelector('.qv-size-btn')) content.querySelector('.qv-size-btn').classList.add('active');

    let fabricMatched = false;
    content.querySelectorAll('.qv-fabric-row .qv-option-btn').forEach(b => {
      const m = (b.querySelector('strong') ? b.querySelector('strong').textContent.trim() : '') === normFabric;
      b.classList.toggle('active', m);
      if (m) fabricMatched = true;
    });
    if (!fabricMatched && content.querySelector('.qv-fabric-row .qv-option-btn')) content.querySelector('.qv-fabric-row .qv-option-btn').classList.add('active');

    let kitMatched = false;
    content.querySelectorAll('.qv-kit-row .qv-option-btn').forEach(b => {
      const m = b.dataset.kit === (editItem.kitMode || 'solo');
      b.classList.toggle('active', m);
      if (m) kitMatched = true;
    });
    if (!kitMatched && content.querySelector('.qv-kit-row .qv-option-btn')) content.querySelector('.qv-kit-row .qv-option-btn').classList.add('active');

    // Badge personalizzazione se la riga nel carrello ne ha una
    if (editItem.custNote) {
      const badge = document.getElementById('qvCustomizeBadge');
      if (badge) badge.style.display = 'block';
    }
    updateQvPrice();
  }

  content.scrollTop = 0;
  openOverlay('quickViewOverlay');
  applyLang();
  navPush();
}

function selectQvSize(btn) {
  btn.closest('.qv-sizes').querySelectorAll('.qv-size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function selectQvFabric(btn) {
  btn.closest('.qv-fabric-row').querySelectorAll('.qv-option-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  updateQvPrice();
}

function selectQvKit(btn) {
  btn.closest('.qv-kit-row').querySelectorAll('.qv-option-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  updateQvPrice();
  // Il pulsante Personalizza è sempre visibile per qualsiasi kit
  const kit = btn.dataset.kit || 'solo';
  const customizeBtn = document.getElementById('qvCustomizeBtn');
  if (customizeBtn) customizeBtn.style.display = 'flex';
  // Se si cambia kit, resetta la personalizzazione precedente per non creare confusione
  currentCustomization = null;
  const badge = document.getElementById('qvCustomizeBadge');
  if (badge) badge.style.display = 'none';
  // Placeholder: mantiene compatibilità con il resto del codice
  if (false) {
  }
}

function updateQvPrice() {
  const priceEl = document.getElementById('qvPriceDisplay');
  if (!priceEl) return;
  const base = parseFloat(priceEl.dataset.base || 0);
  const fabricBtn = document.querySelector('.qv-fabric-row .qv-option-btn.active');
  const kitBtn = document.querySelector('.qv-kit-row .qv-option-btn.active');
  const fabricExtra = fabricBtn ? parseFloat(fabricBtn.dataset.extra || 0) : 0;
  const kitExtra = kitBtn ? parseFloat(kitBtn.dataset.extra || 0) : 0;
  const total = base + fabricExtra + kitExtra;
  priceEl.textContent = `€${total.toFixed(2)}`;
  const mobEl = document.getElementById('qvMobilePrice');
  if (mobEl) mobEl.textContent = `€${total.toFixed(2)}`;
}

function addToCartFromQV(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;

  const activeSize = document.querySelector('.qv-sizes .qv-size-btn.active');
  const activeFabric = document.querySelector('.qv-fabric-row .qv-option-btn.active');
  const activeKit = document.querySelector('.qv-kit-row .qv-option-btn.active');

  const selectedSize = activeSize ? activeSize.textContent.trim() : (p.sizes[0] || 'M');
  let fabricText = activeFabric ? activeFabric.querySelector('strong').textContent.trim() : 'Standard';
  // Normalizza il nome del tessuto (in qualsiasi lingua) al valore canonico
  if (fabricText === t('qv.standard') || fabricText === t('qv.tifoso')) fabricText = 'Standard';
  else if (fabricText === t('qv.player')) fabricText = 'Player';
  const fabricLabel = fabricText;
  const fabricExtra = activeFabric ? parseFloat(activeFabric.dataset.extra || 0) : 0;
  const kitMode = activeKit ? activeKit.dataset.kit : 'solo';
  const isWithShorts = kitMode === 'shorts' || kitMode === 'full';
  const isFullKit = kitMode === 'full';
  const finalPrice = p.price + fabricExtra;

  // Testo personalizzazione maglia
  let custNote = '';
  if (currentCustomization && (currentCustomization.name || currentCustomization.number)) {
    const parts = [];
    if (currentCustomization.name) parts.push('Nome: ' + currentCustomization.name);
    if (currentCustomization.number) parts.push('N.' + currentCustomization.number);
    custNote = parts.join(' | ');
  } else if (qvEditUid) {
    // In modifica senza nuova personalizzazione: mantieni quella esistente della riga
    const editRow = cart.find(x => (x._uid || x.id) === qvEditUid);
    if (editRow) custNote = editRow.custNote || '';
  }

  const isEdit = !!qvEditUid;

  if (isEdit) {
    // ── MODO MODIFICA: aggiorna la riga esistente invece di aggiungerne una nuova ──
    const editUid = qvEditUid;
    qvEditUid = null;

    // Conserva i vecchi componenti kit (per non perdere taglie/personalizzazioni)
    let oldShorts = null, oldSocks = null;
    cart.forEach(x => {
      if (x.id === 'shorts-' + p.id) oldShorts = x;
      if (x.id === 'socks-' + p.id) oldSocks = x;
    });
    // Rimuovi le vecchie righe componenti kit della maglia
    cart = cart.filter(x => x.id !== 'shorts-' + p.id && x.id !== 'socks-' + p.id);

    const idx = cart.findIndex(x => (x._uid || x.id) === editUid);
    if (idx === -1) {
      // Riga non più presente: aggiungi come nuova
      cart.push({ id: p.id, name: p.name, price: finalPrice, image: getProductImage(p), qty: 1, size: selectedSize, fabric: fabricLabel, custNote: custNote, kitMode: kitMode, _uid: Date.now() + '-' + Math.random().toString(36).slice(2) });
    } else {
      // Se esiste già un'altra riga identica alla nuova configurazione, unifica lì
      const dupIdx = cart.findIndex((x, i) => i !== idx && x.id === p.id && x.size === selectedSize && x.fabric === fabricLabel && x.custNote === custNote);
      if (dupIdx !== -1) {
        cart[dupIdx].qty += cart[idx].qty;
        cart.splice(idx, 1);
      } else {
        cart[idx].size = selectedSize;
        cart[idx].fabric = fabricLabel;
        cart[idx].custNote = custNote;
        cart[idx].price = finalPrice;
        cart[idx].kitMode = kitMode;
      }
    }

    // Ri-aggiungi pantaloncino secondo il kitMode scelto
    if (isWithShorts) {
      const shortsProduct = p.shortsProductId ? PRODUCTS.find(x => x.id === p.shortsProductId) : null;
      const shortsName = shortsProduct
        ? shortsProduct.name
        : 'Pantaloncini \u2013 ' + p.name.replace(/Maglia\s*/i, '').trim();
      const shortsPrice = 6 + fabricExtra;
      const shortsImage = shortsProduct ? getProductImage(shortsProduct) : (p.shortsImage || getProductImage(p));
      const hasNewShortsCust = !!(currentCustomization && currentCustomization.shortsNumber && currentCustomization.number);
      const shortsCustNote = hasNewShortsCust
        ? 'N.' + currentCustomization.number + ' sul pantaloncino'
        : (oldShorts ? oldShorts.custNote : '');
      cart.push({ id: 'shorts-' + p.id, name: shortsName, price: shortsPrice, image: shortsImage, qty: 1, size: selectedSize, fabric: fabricLabel, custNote: shortsCustNote, _uid: Date.now() + '-s-' + Math.random().toString(36).slice(2) });
    }

    // Ri-aggiungi calzettoni (solo Kit Completo)
    if (isFullKit) {
      const sockSize = (currentCustomization && currentCustomization.sockSize) || (oldSocks ? oldSocks.size : '');
      const socksProduct = p.socksProductId ? PRODUCTS.find(x => x.id === p.socksProductId) : null;
      const socksName = socksProduct
        ? socksProduct.name
        : 'Calzettoni \u2013 ' + p.name.replace(/Maglia\s*/i, '').trim();
      const socksPrice = socksProduct ? socksProduct.price : 4;
      const socksImage = socksProduct ? getProductImage(socksProduct) : (p.socksImage || p.shortsImage || getProductImage(p));
      const socksCustNote = sockSize ? 'Taglia scarpa: ' + sockSize : (oldSocks ? oldSocks.custNote : '');
      cart.push({ id: 'socks-' + p.id, name: socksName, price: socksPrice, image: socksImage, qty: 1, size: sockSize || selectedSize, fabric: fabricLabel, custNote: socksCustNote, _uid: Date.now() + '-k-' + Math.random().toString(36).slice(2) });
    }
  } else {
    // ── AGGIUNTA NORMALE ──
    const existing = cart.find(item =>
      item.id === productId && item.size === selectedSize && item.fabric === fabricLabel && item.custNote === custNote
    );
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id: p.id, name: p.name, price: finalPrice, image: getProductImage(p), qty: 1, size: selectedSize, fabric: fabricLabel, custNote: custNote, kitMode: kitMode, _uid: Date.now() + '-' + Math.random().toString(36).slice(2) });
    }

    // Aggiungi pantaloncino (Maglia+Pantaloncino oppure Kit Completo)
    if (isWithShorts) {
      const shortsProduct = p.shortsProductId ? PRODUCTS.find(x => x.id === p.shortsProductId) : null;
      const shortsName = shortsProduct
        ? shortsProduct.name
        : 'Pantaloncini \u2013 ' + p.name.replace(/Maglia\s*/i, '').trim();
      const shortsPrice = 6 + fabricExtra;
      const shortsImage = shortsProduct ? getProductImage(shortsProduct) : (p.shortsImage || getProductImage(p));
      const shortsWithNumber = currentCustomization && currentCustomization.shortsNumber;
      const shortsCustNote = (shortsWithNumber && currentCustomization.number)
        ? 'N.' + currentCustomization.number + ' sul pantaloncino'
        : '';
      cart.push({ id: 'shorts-' + p.id, name: shortsName, price: shortsPrice, image: shortsImage, qty: 1, size: selectedSize, fabric: fabricLabel, custNote: shortsCustNote, _uid: Date.now() + '-s-' + Math.random().toString(36).slice(2) });
    }

    // Aggiungi calzettoni (solo Kit Completo)
    if (isFullKit) {
      const sockSize = (currentCustomization && currentCustomization.sockSize) || '';
      const socksProduct = p.socksProductId ? PRODUCTS.find(x => x.id === p.socksProductId) : null;
      const socksName = socksProduct
        ? socksProduct.name
        : 'Calzettoni \u2013 ' + p.name.replace(/Maglia\s*/i, '').trim();
      const socksPrice = socksProduct ? socksProduct.price : 4;
      const socksImage = socksProduct ? socksProduct.image : (p.socksImage || p.shortsImage || p.image);
      const socksCustNote = sockSize ? 'Taglia scarpa: ' + sockSize : '';
      cart.push({ id: 'socks-' + p.id, name: socksName, price: socksPrice, image: socksImage, qty: 1, size: sockSize || selectedSize, fabric: fabricLabel, custNote: socksCustNote, _uid: Date.now() + '-k-' + Math.random().toString(36).slice(2) });
    }
  }

  saveCart();
  updateCartUI();
  const custSuffix = custNote ? ' + ' + t('qv.personalizzazione') : '';
  const verb = isEdit ? t('toast.aggiornato') : t('toast.aggiunto');
  const msg = isFullKit
    ? 'Kit Completo (' + selectedSize + ' \u00B7 ' + fabricText + ')' + custSuffix + ' ' + verb
    : isWithShorts
      ? 'Maglia + Pantaloncino (' + selectedSize + ' \u00B7 ' + fabricText + ')' + custSuffix + ' ' + verb
      : '"' + p.name + '" (' + selectedSize + ' \u00B7 ' + fabricText + ')' + custSuffix + ' ' + verb;
  showToast('\u2705', msg);
  openCart();
  currentCustomization = null;
}


function closeQuickView() {
  qvEditUid = null;
  closeOverlay('quickViewOverlay');
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// CARRELLO
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function addToCart(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;

  // Taglia attiva
  const sizeContainer = document.querySelector('.card-sizes[data-product-id="' + productId + '"]');
  const activeSize = sizeContainer ? sizeContainer.querySelector('.size-tag.active') : null;
  const selectedSize = activeSize ? activeSize.textContent.trim() : (p.sizes[0] || 'M');

  // Tessuto attivo (Tifoso / Player)
  const fabricContainer = document.querySelector('.card-fabric[data-product-id="' + productId + '"]');
  const activeFabric = fabricContainer ? fabricContainer.querySelector('.fabric-btn.active') : null;
  const fabricLabel = activeFabric ? activeFabric.textContent.replace('+€4', '').trim() : 'Tifoso';
  const fabricExtra = activeFabric ? parseFloat(activeFabric.dataset.extra || 0) : 0;
  const finalPrice = p.price + fabricExtra;

  // Distingui per id + taglia + tessuto
  const existing = cart.find(item =>
    item.id === productId && item.size === selectedSize && item.fabric === fabricLabel
  );
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: p.id,
      name: p.name,
      price: finalPrice,
      image: getProductImage(p),
      qty: 1,
      size: selectedSize,
      fabric: fabricLabel,
      _uid: Date.now() + '-' + Math.random().toString(36).slice(2)
    });
  }
  saveCart();
  updateCartUI();
  showToast('✅', '"' + p.name + '" (' + selectedSize + ' · ' + fabricLabel + ') ' + t('toast.aggiunto'));
  openCart();
}

function selectCardSize(btn) {
  const container = btn.closest('.card-sizes');
  if (!container) return;
  container.querySelectorAll('.size-tag').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function selectCardFabric(btn) {
  const container = btn.closest('.card-fabric');
  if (!container) return;
  container.querySelectorAll('.fabric-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Aggiorna il prezzo mostrato nella card
  const productId = container.dataset.productId;
  const priceEl = document.querySelector('.card-price[data-product-id="' + productId + '"]');
  if (priceEl) {
    const base = parseFloat(priceEl.dataset.base || 0);
    const extra = parseFloat(btn.dataset.extra || 0);
    priceEl.textContent = '\u20ac' + (base + extra).toFixed(2);
  }
}

function removeFromCart(uid) {
  cart = cart.filter(item => item._uid !== uid && item.id != uid);
  saveCart();
  updateCartUI();
  renderCartItems();
}

function changeQty(uid, delta) {
  const item = cart.find(x => x._uid === uid || x.id == uid);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  updateCartUI();
  renderCartItems();
}

function saveCart() {
  cart.forEach(item => {
    if (item && typeof item === 'object') item.name = getCartItemName(item);
  });
  saveActiveArray('cart', cart);
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartUI() {
  const badge = document.getElementById('cartBadge');
  const count = getCartCount();
  if (badge) badge.textContent = count;
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  const empty = document.getElementById('cartEmpty');
  if (!container) return;

  if (cart.length === 0) {
    if (empty) empty.style.display = 'flex';
    if (footer) footer.style.display = 'none';
    container.innerHTML = '';
    container.appendChild(empty);
    return;
  }
  if (empty) empty.style.display = 'none';
  if (footer) footer.style.display = 'block';

  const total = getCartTotal();
  const shipping = total >= 50 ? t('common.gratis') : '€3.00';

  let html = '';
  cart.forEach(function (item) {
    const isGift = !!item._gift;
    const uid = item._uid || item.id;
    const uidRef = "'" + uid + "'";
    const itemName = getCartItemName(item);

    const priceLabel = isGift
      ? '<span style="color:#2e7d32;font-weight:700;">🎁 ' + t('cart.gratis') + '</span>'
      : '&euro;' + (item.price * item.qty).toFixed(2);

    const qtyControls = isGift
      ? '<span style="font-size:.75rem;color:#2e7d32;font-weight:600;">' + t('cart.omaggio') + '</span>'
      : '<button class="qty-btn" onclick="event.stopPropagation();changeQty(' + uidRef + ', -1)">&minus;</button>'
        + '<span class="qty-val">' + item.qty + '</span>'
        + '<button class="qty-btn" onclick="event.stopPropagation();changeQty(' + uidRef + ', +1)">+</button>';

    const removeBtn = isGift
      ? '' // gli articoli omaggio non si possono rimuovere manualmente
      : '<button class="cart-item-remove" onclick="event.stopPropagation();removeFromCart(' + uidRef + ')" title="' + t('cart.rimuovi') + '">&#x2715;</button>';

    let fabricTxt = String(item.fabric || '').replace(/\uD83D\uDC55/g, '').trim();
    if (fabricTxt === 'Standard') fabricTxt = t('qv.standard');
    else if (fabricTxt === 'Player') fabricTxt = t('qv.player');

    html += '<div class="cart-item' + (isGift ? ' cart-item--gift' : '') + '" onclick="openCartItemProduct(' + uidRef + ')" title="' + t('cart.vediProdotto') + '">'
      + '<div class="cart-item-info">'
      + '<div class="cart-item-name">' + itemName + '</div>'
      + '<div class="cart-item-meta">' + t('cart.taglia') + ': ' + item.size + (item.fabric ? ' &nbsp;&middot;&nbsp; ' + fabricTxt : '') + (item.custNote ? '<br><span style="color:#2e7d32;font-size:.72rem;">' + item.custNote + '</span>' : '') + '</div>'
      + '<div class="cart-item-row">'
      + '<div class="cart-item-price">' + priceLabel + '</div>'
      + '<div class="cart-item-qty">' + qtyControls + '</div>'
      + '</div>'
      + '</div>'
      + removeBtn
      + '</div>';
  });
  container.innerHTML = html;

  const subtotalEl = document.getElementById('cartSubtotal');
  const shippingEl = document.getElementById('cartShipping');
  const totalEl = document.getElementById('cartTotal');
  const discountLine = document.getElementById('cartDiscountLine');
  const discountLabel = document.getElementById('cartDiscountLabel');
  const discountValue = document.getElementById('cartDiscountValue');

  if (subtotalEl) subtotalEl.textContent = `€${total.toFixed(2)}`;
  if (shippingEl) shippingEl.textContent = shipping;

  const discountAmount = getDiscountAmount();
  if (discountLine) {
    if (appliedDiscount && discountAmount > 0) {
      discountLine.style.display = 'flex';
      if (discountLabel) discountLabel.textContent = `${t('common.sconto')} (${appliedDiscount.code})`;
      if (discountValue) discountValue.textContent = `-€${discountAmount.toFixed(2)}`;
    } else {
      discountLine.style.display = 'none';
    }
  }

  const rawTotal = shipping === t('common.gratis') ? total : total + 3.00;
  const finalTotal = Math.max(0, rawTotal - discountAmount);
  if (totalEl) totalEl.textContent = `€${finalTotal.toFixed(2)}`;
}

// ══════════════════════════════════════════════════════════
// SISTEMA CODICI SCONTO
// ══════════════════════════════════════════════════════════

/**
 * Verifica se un item nel carrello è una maglia nazionale
 * (categoria Nazionali o Mondiale2026)
 */
function isNazionaleCartItem(item) {
  // I prodotti nazionali hanno id che si trovano in PRODUCTS con categoria Nazionali/Mondiale2026
  const p = PRODUCTS.find(x => x.id === item.id);
  if (!p) return false;
  const cats = Array.isArray(p.category) ? p.category : [p.category];
  return cats.includes('Nazionali') || cats.includes('Mondiale2026');
}

/**
 * Verifica se un item nel carrello è una maglia vintage
 * (badge === 'vintage')
 */
function isVintageCartItem(item) {
  const p = PRODUCTS.find(x => x.id === item.id);
  if (!p) return false;
  return p.badge === 'vintage';
}

/**
 * Valida un codice sconto rispetto al carrello corrente.
 * Restituisce { valid, code, type, description, amount, error } 
 */
function validateDiscountCode(code) {
  const upperCode = (code || '').trim().toUpperCase();

  // ── Codice MONDIALE3X2 ──
  if (upperCode === 'MONDIALE3X2') {
    // Cerca le maglie nazionali nel carrello (escludi pantaloncini/calzettoni aggiunti da kit)
    const nazionaliItems = cart.filter(item => {
      // Ignora gli item aggiunti come articolo regalo (prezzo 0 e _gift)
      if (item._gift) return false;
      // Deve avere un id numerico (non 'shorts-...' o 'socks-...') e essere nazionale
      if (typeof item.id !== 'number') return false;
      return isNazionaleCartItem(item);
    });

    if (nazionaliItems.length < 2) {
      return {
        valid: false,
        error: '⚠️ Serve almeno 2 maglie nazionali nel carrello per usare questo codice.'
      };
    }

    // Trova la maglia nazionale meno costosa
    const cheapest = nazionaliItems.reduce((min, item) =>
      item.price < min.price ? item : min
    , nazionaliItems[0]);

    const discountAmount = cheapest.price * cheapest.qty;

    return {
      valid: true,
      code: 'MONDIALE3X2',
      type: 'mondiale3x2',
      description: `🏆 3x2 Nazionali — "${cheapest.name}" gratis`,
      amount: discountAmount,
      targetUid: cheapest._uid
    };
  }

  // ── Codice MONDIALETOT ──
  if (upperCode === 'MONDIALETOT') {
    const hasVintage = cart.some(item => !item._gift && typeof item.id === 'number' && isVintageCartItem(item));
    const nazionaliItems = cart.filter(item => !item._gift && typeof item.id === 'number' && isNazionaleCartItem(item));

    if (!hasVintage) {
      return {
        valid: false,
        error: '⚠️ Devi avere almeno 1 maglia vintage nel carrello per usare questo codice.'
      };
    }
    if (nazionaliItems.length === 0) {
      return {
        valid: false,
        error: '⚠️ Devi avere almeno 1 maglia nazionale nel carrello per usare questo codice.'
      };
    }

    // Prende la prima maglia nazionale nel carrello
    const nazItem = nazionaliItems[0];
    const nazProduct = PRODUCTS.find(x => x.id === nazItem.id);

    return {
      valid: true,
      code: 'MONDIALETOT',
      type: 'mondialetot',
      description: `🎁 Kit regalo Mondiale — Pantaloncino + Calzettoni della ${nazItem.name} gratis`,
      amount: 0, // I regali vengono aggiunti al carrello a €0
      nazProduct: nazProduct,
      nazItem: nazItem
    };
  }

  return {
    valid: false,
    error: '❌ Codice sconto non valido.'
  };
}

/**
 * Rimuove eventuali articoli regalo aggiunti da codici sconto precedenti
 */
function removeGiftItems() {
  cart = cart.filter(item => !item._gift);
}

/**
 * Applica lo sconto al carrello.
 * Per MONDIALE3X2: salva il discount object (verrà sottratto dal totale).
 * Per MONDIALETOT: aggiunge pantaloncino + calzettoni gratis al carrello.
 */
function applyDiscountCode(discountObj) {
  // Prima rimuovi eventuali articoli regalo precedenti
  removeGiftItems();

  if (discountObj.type === 'mondiale3x2') {
    appliedDiscount = discountObj;
  }

  if (discountObj.type === 'mondialetot') {
    appliedDiscount = discountObj;
    const naz = discountObj.nazProduct;
    const nazItem = discountObj.nazItem;

    // Pantaloncino gratis
    const shortsProduct = naz && naz.shortsProductId ? PRODUCTS.find(x => x.id === naz.shortsProductId) : null;
    const shortsName = shortsProduct
      ? shortsProduct.name
      : 'Pantaloncino regalo — ' + (nazItem ? nazItem.name.replace(/Maglia\s*/i, '').trim() : 'Nazionale');
    const shortsImage = shortsProduct ? shortsProduct.image : (naz ? naz.image : '');
    cart.push({
      id: 'gift-shorts-mondialetot',
      name: shortsName,
      price: 0,
      image: shortsImage,
      qty: 1,
      size: nazItem ? nazItem.size : 'M',
      fabric: '',
      custNote: '🎁 OMAGGIO con codice MondialeTot',
      _uid: 'gift-shorts-' + Date.now(),
      _gift: true
    });

    // Calzettoni gratis
    const socksProduct = naz && naz.socksProductId ? PRODUCTS.find(x => x.id === naz.socksProductId) : null;
    const socksName = socksProduct
      ? socksProduct.name
      : 'Calzettoni regalo — ' + (nazItem ? nazItem.name.replace(/Maglia\s*/i, '').trim() : 'Nazionale');
    const socksImage = socksProduct ? socksProduct.image : (naz ? naz.image : '');
    cart.push({
      id: 'gift-socks-mondialetot',
      name: socksName,
      price: 0,
      image: socksImage,
      qty: 1,
      size: nazItem ? nazItem.size : 'M',
      fabric: '',
      custNote: '🎁 OMAGGIO con codice MondialeTot',
      _uid: 'gift-socks-' + Date.now() + 1,
      _gift: true
    });
  }

  saveCart();
}

/**
 * Rimuove lo sconto applicato e gli articoli regalo
 */
function removeDiscount() {
  appliedDiscount = null;
  removeGiftItems();
  saveCart();
  // Reset UI
  const input = document.getElementById('discountCodeInput');
  const msg = document.getElementById('cartDiscountMsg');
  if (input) input.value = '';
  if (msg) { msg.textContent = ''; msg.className = 'cart-discount-msg'; }
}

/**
 * Calcola lo sconto monetario da sottrarre al totale (per MONDIALE3X2)
 */
function getDiscountAmount() {
  if (!appliedDiscount) return 0;
  if (appliedDiscount.type === 'mondiale3x2') {
    // Ricalcola dinamicamente: trova ancora la maglia nazionale meno costosa
    const nazionaliItems = cart.filter(item => !item._gift && typeof item.id === 'number' && isNazionaleCartItem(item));
    if (nazionaliItems.length < 2) return 0;
    const cheapest = nazionaliItems.reduce((min, item) => item.price < min.price ? item : min, nazionaliItems[0]);
    return cheapest.price * cheapest.qty;
  }
  return 0; // per mondialetot lo sconto è negli item gratis
}

/**
 * Setup del campo codice sconto nel carrello
 */
function setupDiscountCode() {
  document.getElementById('applyDiscountBtn')?.addEventListener('click', () => {
    const input = document.getElementById('discountCodeInput');
    const msg = document.getElementById('cartDiscountMsg');
    if (!input || !msg) return;

    const code = input.value.trim();
    if (!code) {
      msg.textContent = '⚠️ Inserisci un codice sconto.';
      msg.className = 'cart-discount-msg error';
      return;
    }

    // Se c'è già uno sconto applicato, rimuovilo prima
    if (appliedDiscount) removeDiscount();

    const result = validateDiscountCode(code);
    if (!result.valid) {
      msg.textContent = result.error;
      msg.className = 'cart-discount-msg error';
      return;
    }

    applyDiscountCode(result);
    msg.textContent = `✅ ${result.description}`;
    msg.className = 'cart-discount-msg success';
    renderCartItems();
  });

  // Invio con tasto Enter
  document.getElementById('discountCodeInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('applyDiscountBtn')?.click();
  });
}

// ── SIDEBAR CART ──
function setupCartSidebar() {
  const cartBtn = document.getElementById('cartBtn');
  const cartClose = document.getElementById('cartClose');
  const overlay = document.getElementById('cartOverlay');
  const goShop = document.getElementById('goShopBtn');
  const checkoutBtn = document.getElementById('checkoutBtn');

  cartBtn?.addEventListener('click', openCart);
  cartClose?.addEventListener('click', closeCart);
  overlay?.addEventListener('click', closeCart);
  goShop?.addEventListener('click', (e) => { e.preventDefault(); closeCart(); openCatPage('all', 'TUTTI I PRODOTTI', 'Prodotti', []); });
  checkoutBtn?.addEventListener('click', () => { closeCart(); openOrderModal(); });
}

function openCart() {
  // Evita sovrapposizioni: chiudi gli altri pannelli aperti (preferiti, ricerca, pagina prodotti)
  closeFavSidebar();
  closeMobSearch();
  closeCatPage();
  renderCartItems();
  document.getElementById('cartSidebar')?.classList.add('open');
  document.getElementById('cartOverlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
  navPush();
}

function closeCart() {
  document.getElementById('cartSidebar')?.classList.remove('open');
  document.getElementById('cartOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

// Clic su un prodotto del carrello → apre la sua scheda prodotto.
// Il carrello resta aperto sotto la scheda: tornando indietro si ritorna nel carrello.
function openCartItemProduct(uid) {
  const item = cart.find(x => (x._uid || x.id) === uid);
  if (!item) return;
  const p = PRODUCTS.find(x => x.id === item.id);
  if (!p) return; // componenti kit (pantaloncino/calzettoni) senza scheda dedicata
  qvEditUid = uid; // modalità modifica: la scheda preseleziona e salva sulla riga esistente
  openQuickView(p.id, item);
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// ORDINE MODAL
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function setupOrderModal() {
  document.getElementById('orderClose')?.addEventListener('click', closeOrderModal);
  document.getElementById('orderOverlay')?.addEventListener('click', e => {
    if (e.target.id === 'orderOverlay') closeOrderModal();
  });
  document.getElementById('orderForm')?.addEventListener('submit', submitOrder);
}

function openOrderModal() {
  if (cart.length === 0) { showToast('âš ï¸', t('toast.carrelloVuoto')); return; }
  renderOrderSummary();
  openOverlay('orderOverlay');
  navPush();
}

function closeOrderModal() {
  closeOverlay('orderOverlay');
}

function renderOrderSummary() {
  const box = document.getElementById('orderSummaryBox');
  if (!box) return;
  const total = getCartTotal();
  const shipping = total >= 50 ? 0 : 3.00;
  const finalTotal = total + shipping;
  box.innerHTML = `
    <h4>📋 <span data-i18n="order.riepilogo">Riepilogo Ordine</span></h4>
    ${cart.map(item => `
      <div class="order-summary-row">
        <span>${getCartItemName(item)} × ${item.qty} (${item.size})</span>
        <span>€${(item.price * item.qty).toFixed(2)}</span>
      </div>
    `).join('')}
    <div class="order-summary-row">
      <span data-i18n="common.spedizione">Spedizione</span>
      <span>${shipping === 0 ? t('common.gratis') + ' 🎉' : '€3.00'}</span>
    </div>
    <div class="order-summary-total">
      <span data-i18n="common.totale">TOTALE</span>
      <span>€${finalTotal.toFixed(2)}</span>
    </div>
  `;
  applyLang();
}

async function submitOrder(e) {
  e.preventDefault();
  const btn = document.getElementById('orderSubmitBtn');
  const btnText = document.getElementById('orderBtnText');

  // Controlla configurazione EmailJS (usa la variabile globale)
  if (!EMAIL_CONFIG.publicKey || !EMAIL_CONFIG.serviceId || !EMAIL_CONFIG.templateId || !EMAIL_CONFIG.ownerEmail) {
    showToast('⚠️', t('toast.emailNonConfig'));
    return;
  }

  const name = document.getElementById('orderName').value.trim();
  const surname = document.getElementById('orderSurname').value.trim();
  const email = document.getElementById('orderEmail').value.trim();
  const phone = document.getElementById('orderPhone').value.trim();
  const address = document.getElementById('orderAddress').value.trim();
  const city = document.getElementById('orderCity').value.trim();
  const zip = document.getElementById('orderZip').value.trim();
  const notes = document.getElementById('orderNotes').value.trim();

  const total = getCartTotal();
  const shipping = total >= 60 ? 0 : 3.00;
  const discountAmount = getDiscountAmount();
  const finalTotal = Math.max(0, total + shipping - discountAmount);
  const orderNum = 'WOK-' + Date.now().toString().slice(-6);

  const discountLine = appliedDiscount
    ? `\nCodice Sconto: ${appliedDiscount.code} (-€${discountAmount.toFixed(2)})`
    : '';

  const orderDetails = cart.map(item => {
    const priceStr = item.custom ? 'âš ï¸ Prezzo da definire' : `€${(item.price * item.qty).toFixed(2)}`;
    return `• ${getCartItemName(item)} | Taglia: ${item.size} | Qtà: ${item.qty} | ${priceStr}`;
  }).join('\n');


  // Loading state
  btn.disabled = true;
  btnText.textContent = 'â³ Invio in corso...';

  try {
    // Invia email SOLO al venditore tramite EmailJS
    const emailData = {
      to_email: EMAIL_CONFIG.ownerEmail,
      customer_name: `${name} ${surname}`,
      customer_email: email,
      customer_phone: phone || 'Non fornito',
      customer_address: address,
      customer_city: city,
      customer_zip: zip,
      order_number: orderNum,
      order_details: orderDetails + discountLine,
      order_subtotal: `€${total.toFixed(2)}`,
      order_shipping: shipping === 0 ? 'Gratuita' : '€3.00',
      order_total: `€${finalTotal.toFixed(2)}`,
      order_notes: notes || 'Nessuna nota',
      reply_to: email
    };

    console.log("DATI INVIATI A EMAILJS:", emailData);

    await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      emailData
    );

    // Invia conferma automatica AL CLIENTE
    const customerTemplateId = EMAIL_CONFIG.customerTemplateId || EMAIL_CONFIG.templateId;
    const customerConfirmData = {
      to_email: email,                              // â† va al cliente
      customer_name: `${name} ${surname}`,
      customer_email: email,
      customer_phone: phone || 'Non fornito',
      customer_address: `${address}, ${zip} ${city}`,
      order_number: orderNum,
      order_details: orderDetails,
      order_subtotal: `€${total.toFixed(2)}`,
      order_shipping: shipping === 0 ? 'Gratuita ðŸŽ‰' : '€3.00',
      order_total: `€${finalTotal.toFixed(2)}`,
      order_notes: notes || 'Nessuna nota',
      reply_to: EMAIL_CONFIG.ownerEmail            // cliente può rispondere al venditore
    };
    try {
      await emailjs.send(EMAIL_CONFIG.serviceId, customerTemplateId, customerConfirmData);
    } catch (customerErr) {
      console.warn('Email conferma cliente non inviata:', customerErr);
    }

    // Svuota carrello, reset sconto e mostra conferma al cliente
    const savedOrder = { orderNum, name, surname, finalTotal, shipping, cart: [...cart] };
    cart = [];
    appliedDiscount = null;
    saveCart();
    updateCartUI();
    closeOrderModal();
    document.getElementById('orderForm')?.reset();
    // Reset UI campo sconto
    const discInput = document.getElementById('discountCodeInput');
    const discMsg = document.getElementById('cartDiscountMsg');
    if (discInput) discInput.value = '';
    if (discMsg) { discMsg.textContent = ''; discMsg.className = 'cart-discount-msg'; }
    showOrderConfirmation(savedOrder);

  } catch (err) {
    console.error('Errore invio ordine:', err);
    showToast('âŒ', t('confirm.errore'));
  } finally {
    btn.disabled = false;
    btnText.textContent = '✅ Conferma Ordine';
  }
}

// â”€â”€ MODAL CONFERMA ORDINE (per il cliente) â”€â”€
function showOrderConfirmation({ orderNum, name, surname, finalTotal, shipping, cart: items }) {
  // Crea overlay dinamico
  let overlay = document.getElementById('confirmOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'confirmOverlay';
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal glass" style="max-width:500px;text-align:center;">
        <h2 style="font-size:1.6rem;font-weight:800;margin:1rem 0 .5rem;" data-i18n="confirm.title">Ordine Ricevuto!</h2>
        <p style="color:var(--text-muted);margin-bottom:1.5rem;"><span data-i18n="confirm.grazie">Grazie</span> <strong id="confName"></strong>, <span data-i18n="confirm.inviato">il tuo ordine è stato inviato con successo.</span></p>
        <div class="glass" style="border-radius:12px;padding:1rem;margin-bottom:1.5rem;text-align:left;">
          <div style="display:flex;justify-content:space-between;margin-bottom:.5rem;">
            <span style="color:var(--text-muted);font-size:.85rem;" data-i18n="confirm.numeroOrdine">Numero ordine</span>
            <strong id="confNum" style="color:var(--accent);"></strong>
          </div>
          <div style="display:flex;justify-content:space-between;">
            <span style="color:var(--text-muted);font-size:.85rem;" data-i18n="confirm.totalePagato">Totale pagato</span>
            <strong id="confTotal"></strong>
          </div>
        </div>
        <p style="font-size:.85rem;color:var(--text-muted);margin-bottom:2rem;" data-i18n="confirm.contatto">Verrai contattato via email o telefono per la conferma della spedizione. Il pagamento avviene alla consegna.</p>
        <button class="btn btn-primary btn-full" id="confClose" data-i18n="confirm.perfetto">Perfetto, grazie!</button>
      </div>
    `;
    document.body.appendChild(overlay);
    document.getElementById('confClose').addEventListener('click', () => {
      overlay.classList.remove('open');
      setTimeout(() => {
        overlay.style.display = 'none';
        document.body.style.overflow = ''; // â† ripristina lo scroll
      }, 300);
    });
  }

  document.getElementById('confName').textContent = `${name} ${surname}`;
  document.getElementById('confNum').textContent = orderNum;
  document.getElementById('confTotal').textContent = `€${finalTotal.toFixed(2)}`;
  applyLang();

  overlay.style.display = 'flex';
  requestAnimationFrame(() => overlay.classList.add('open'));
  // NON blocchiamo overflow qui — closeOrderModal lo ha già rilasciato
}



// â”€â”€ CONTACT FORM â”€â”€
function setupContactForm() {
  document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const msg = document.getElementById('contactMsg').value;
    const btn = document.getElementById('contactSubmit');
    btn.disabled = true;

    try {
      if (EMAIL_CONFIG.publicKey && EMAIL_CONFIG.serviceId && EMAIL_CONFIG.templateId) {
        // 📩 EMAIL AL VENDITORE
        await emailjs.send(
          EMAIL_CONFIG.serviceId,
          EMAIL_CONFIG.templateId,
          emailData
        );

        // 📩 EMAIL AL CLIENTE
        await emailjs.send(
          EMAIL_CONFIG.serviceId,
          "order_customer", // ðŸ‘ˆ nome template cliente
          {
            ...emailData,
            to_email: email // ðŸ‘ˆ invia al cliente
          }
        );
      } else {
        const sub = encodeURIComponent(`[WorldOfKits] Messaggio da ${name}`);
        const body = encodeURIComponent(`Da: ${name} <${email}>\n\n${msg}`);
        window.open(`mailto:${EMAIL_CONFIG.ownerEmail || ''}?subject=${sub}&body=${body}`);
      }
      showToast('✅', 'Messaggio inviato! Ti risponderemo presto.');
      document.getElementById('contactForm').reset();
    } catch {
      showToast('âŒ', 'Errore invio. Riprova.');
    } finally {
      btn.disabled = false;
    }
  });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SETUP EMAIL MODAL
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function setupSetupModal() {
  document.getElementById('setupClose')?.addEventListener('click', closeSetupModal);
  document.getElementById('setupOverlay')?.addEventListener('click', e => {
    if (e.target.id === 'setupOverlay') closeSetupModal();
  });
  document.getElementById('setupForm')?.addEventListener('submit', saveEmailConfig);

  // Pre-fill se già configurato
  if (EMAIL_CONFIG.publicKey) {
    document.getElementById('ejsPublicKey').value = EMAIL_CONFIG.publicKey || '';
    document.getElementById('ejsServiceId').value = EMAIL_CONFIG.serviceId || '';
    document.getElementById('ejsTemplateId').value = EMAIL_CONFIG.templateId || '';
    document.getElementById('ejsOwnerEmail').value = EMAIL_CONFIG.ownerEmail || '';
    const ctEl = document.getElementById('ejsCustomerTemplateId');
    if (ctEl) ctEl.value = EMAIL_CONFIG.customerTemplateId || '';
  }
}

function openSetupModal() {
  document.getElementById('setupOverlay').style.display = 'flex';
  setTimeout(() => document.getElementById('setupOverlay').classList.add('open'), 10);
}

function closeSetupModal() {
  document.getElementById('setupOverlay').classList.remove('open');
  setTimeout(() => document.getElementById('setupOverlay').style.display = 'none', 300);
}

function saveEmailConfig(e) {
  e.preventDefault();
  EMAIL_CONFIG = {
    publicKey: document.getElementById('ejsPublicKey').value.trim(),
    serviceId: document.getElementById('ejsServiceId').value.trim(),
    templateId: document.getElementById('ejsTemplateId').value.trim(),
    ownerEmail: document.getElementById('ejsOwnerEmail').value.trim(),
    customerTemplateId: (document.getElementById('ejsCustomerTemplateId')?.value || '').trim()
  };
  localStorage.setItem('gk_email_config', JSON.stringify(EMAIL_CONFIG));
  emailjs.init({ publicKey: EMAIL_CONFIG.publicKey });
  closeSetupModal();
  showToast('✅', 'Configurazione email salvata!');
  updateAdminBtnVisibility();
  updateVendorBtnVisibility();
}

// â”€â”€ ADMIN BTN â”€â”€
function setupAdminBtn() {
  const btn = document.getElementById('adminBtn');
  if (!btn) return;

  // Nascondi il bottone se la configurazione è già salvata
  updateAdminBtnVisibility();

  btn.addEventListener('click', openSetupModal);
}

function updateAdminBtnVisibility() {
  const btn = document.getElementById('adminBtn');
  if (!btn) return;
  const isConfigured = EMAIL_CONFIG.publicKey && EMAIL_CONFIG.serviceId &&
    EMAIL_CONFIG.templateId && EMAIL_CONFIG.ownerEmail;
  btn.style.display = isConfigured ? 'none' : 'flex';
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// UTILITY
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// ── TASTO INDIETRO (browser / Android) ──
// Ogni overlay aperto aggiunge una voce alla cronologia: il tasto indietro
// del telefono/browser chiude l'overlay aperto invece di uscire dal sito.
// Lo stato reale è letto dal DOM (sorgente di verità), così anche le voci
// "stale" (overlay chiusi col pulsante) vengono consumate senza errori.
function navPush() {
  try { history.pushState({ gkNav: true }, ''); } catch (e) { /* file:// ecc. */ }
}

function getTopmostOpenOverlay() {
  if (document.getElementById('orderOverlay')?.classList.contains('open')) return 'order';
  if (document.getElementById('quickViewOverlay')?.classList.contains('open')) return 'quickview';
  if (document.getElementById('customRequestOverlay')?.classList.contains('open')) return 'customreq';
  for (const key of Object.keys(_infoPageMap)) {
    if (document.getElementById(_infoPageMap[key])?.classList.contains('open')) return 'info';
  }
  if (document.getElementById('catPageOverlay')?.classList.contains('open')) return 'cat';
  if (document.getElementById('favSidebar')?.classList.contains('open')) return 'fav';
  if (document.getElementById('cartSidebar')?.classList.contains('open')) return 'cart';
  if (document.getElementById('mobSearchPanel')?.classList.contains('open')) return 'search';
  if (document.getElementById('authOverlay')?.classList.contains('open')) return 'auth';
  return null;
}

function navPop() {
  const top = getTopmostOpenOverlay();
  if (top === 'cat') closeCatPage();
  else if (top === 'quickview') closeQuickView();
  else if (top === 'customreq') closeCustomRequest();
  else if (top === 'info') Object.keys(_infoPageMap).forEach(key => closeInfoPage(key));
  else if (top === 'cart') closeCart();
  else if (top === 'fav') closeFavSidebar();
  else if (top === 'order') closeOrderModal();
  else if (top === 'search') closeMobSearch();
  else if (top === 'auth') closeAuthModal();
}

window.addEventListener('popstate', navPop);

// Evita che il resize causato dalla tastiera virtuale ricalcoli o sposti il layout.
// Il modal usa la viewport stabile (svh); aggiorniamo solo la variabile di altezza
// quando cambia davvero la dimensione della finestra, non durante il keyboard resize.
(function keepViewportStableForKeyboard() {
  const root = document.documentElement;
  let initialHeight = window.innerHeight;
  root.style.setProperty('--app-viewport-height', initialHeight + 'px');
  window.addEventListener('resize', () => {
    const active = document.activeElement;
    const keyboardLikelyOpen = active && /^(INPUT|TEXTAREA|SELECT)$/.test(active.tagName) && window.innerHeight < initialHeight - 120;
    if (!keyboardLikelyOpen) {
      initialHeight = Math.max(initialHeight, window.innerHeight);
      root.style.setProperty('--app-viewport-height', initialHeight + 'px');
    }
  }, { passive: true });
})();

function openOverlay(id) {
  const el = document.getElementById(id);
  if (!el) return;
  clearTimeout(el._closeTimer); // annulla eventuale chiusura pendente (race close→reopen)
  el.style.display = 'flex';
  // Aggiungi .open SUBITO: su mobile/webview iOS requestAnimationFrame può
  // essere throttled e non scattare mai, lasciando l'overlay invisibile anche se
  // il click ha aperto il prodotto (sintomo: "clicco ma non si apre nulla").
  // La transizione di ingresso funziona comunque: l'elemento era già renderizzato
  // (visibility:hidden + translateX), quindi il cambio classe anima da sola.
  el.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeOverlay(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('open');
  clearTimeout(el._closeTimer);
  el._closeTimer = setTimeout(() => { el.style.display = 'none'; }, 300);
  // Riabilita lo scroll solo se non è rimasto aperto nessun altro overlay
  if (!getTopmostOpenOverlay()) document.body.style.overflow = '';
}

let toastTimeout;
function showToast(icon, msg) {
  const toast = document.getElementById('toast');
  const toastIcon = document.getElementById('toastIcon');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast) return;
  if (toastIcon) toastIcon.textContent = icon;
  if (toastMsg) toastMsg.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 3500);
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// PANNELLO VENDITORE — Rispondi al Cliente
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

const REPLY_TEMPLATES = {
  confirm: (name, orderNum) =>
    `Ciao ${name || '[Nome Cliente]'},

grazie mille per il tuo ordine su WorldOfKits! ðŸŽ‰

📦 Numero Ordine: ${orderNum || '[WOK-XXXXXX]'}

Il tuo ordine è stato ricevuto ed è attualmente in fase di lavorazione.
Ti contatteremo non appena è pronto per la spedizione.

Per qualsiasi domanda, rispondi pure a questa email.

A presto,
Il Team WorldOfKits ⚽`,

  shipped: (name, orderNum) =>
    `Ciao ${name || '[Nome Cliente]'},

ottime notizie! Il tuo ordine è in viaggio! ðŸšš

📦 Numero Ordine: ${orderNum || '[WOK-XXXXXX]'}

Il pacco è stato spedito e dovrebbe arrivare entro 24–72 ore lavorative.
Ti avviseremo con i dettagli di tracciamento non appena disponibili.

Grazie per aver scelto WorldOfKits!

Il Team WorldOfKits ⚽`,

  info: (name, orderNum) =>
    `Ciao ${name || '[Nome Cliente]'},

ti scriviamo riguardo al tuo ordine ${orderNum || '[WOK-XXXXXX]'}.

Per poter procedere, avremmo bisogno di alcune informazioni aggiuntive:

ðŸ‘‰ [Scrivi qui cosa ti serve — es: conferma taglia, indirizzo, ecc.]

Puoi rispondere direttamente a questa email.

Grazie per la collaborazione,
Il Team WorldOfKits ⚽`,

  custom: () =>
    `Ciao [Nome Cliente],

[Scrivi qui il tuo messaggio personalizzato]

Il Team WorldOfKits ⚽`
};

function setupVendorPanel() {
  const vendorBtn = document.getElementById('vendorReplyBtn');
  const overlay = document.getElementById('vendorOverlay');
  const closeBtn = document.getElementById('vendorClose');
  const copyBtn = document.getElementById('replyCopyBtn');
  const mailtoBtn = document.getElementById('replyMailtoBtn');
  const ejsBtn = document.getElementById('replyEjsBtn');
  const msgArea = document.getElementById('replyMessage');
  const nameInput = document.getElementById('replyCustomerName');
  const numInput = document.getElementById('replyOrderNum');
  const tplBtns = document.querySelectorAll('.reply-tpl-btn');

  if (!vendorBtn || !overlay) return;

  // Mostra bottone solo se EmailJS è configurato
  updateVendorBtnVisibility();

  vendorBtn.addEventListener('click', () => {
    overlay.style.display = 'flex';
    requestAnimationFrame(() => overlay.classList.add('open'));
    document.body.style.overflow = 'hidden';
    refreshMessage();
  });

  closeBtn?.addEventListener('click', closeVendorPanel);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeVendorPanel(); });

  // Aggiorna messaggio al cambio template
  tplBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tplBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      refreshMessage();
    });
  });

  // Aggiorna messaggio al cambio nome/numero ordine
  nameInput?.addEventListener('input', refreshMessage);
  numInput?.addEventListener('input', refreshMessage);

  // Copia testo
  copyBtn?.addEventListener('click', () => {
    if (!msgArea) return;
    navigator.clipboard.writeText(msgArea.value).then(() => {
      showToast('📋', 'Messaggio copiato negli appunti!');
    });
  });

  // Apri client email (mailto)
  mailtoBtn?.addEventListener('click', () => {
    const toEmail = document.getElementById('replyEmail')?.value.trim();
    if (!toEmail) { showToast('âš ï¸', 'Inserisci l\'email del cliente!'); return; }
    const orderNum = numInput?.value.trim() || '';
    const subject = encodeURIComponent(`Re: Ordine WorldOfKits${orderNum ? ' — ' + orderNum : ''}`);
    const body = encodeURIComponent(msgArea?.value || '');
    window.open(`mailto:${toEmail}?subject=${subject}&body=${body}`);
  });

  // Invia via EmailJS (richiede secondo template)
  ejsBtn?.addEventListener('click', async () => {
    const toEmail = document.getElementById('replyEmail')?.value.trim();
    const customerName = nameInput?.value.trim() || 'Cliente';
    if (!toEmail) { showToast('âš ï¸', 'Inserisci l\'email del cliente!'); return; }
    if (!EMAIL_CONFIG.publicKey || !EMAIL_CONFIG.serviceId) {
      showToast('âš ï¸', 'EmailJS non configurato. Usa "Apri Email" come alternativa.');
      return;
    }
    try {
      ejsBtn.disabled = true;
      ejsBtn.textContent = 'â³ Invio...';
      await emailjs.send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.templateId, {
        to_email: toEmail,
        customer_name: customerName,
        customer_email: toEmail,
        order_number: numInput?.value.trim() || 'N/A',
        order_details: msgArea?.value || '',
        order_total: '—',
        order_notes: '—',
        reply_to: EMAIL_CONFIG.ownerEmail
      });
      showToast('✅', `Email inviata a ${toEmail}!`);
      closeVendorPanel();
    } catch (err) {
      console.error(err);
      showToast('âŒ', 'Errore invio. Usa "Apri Email" come alternativa.');
    } finally {
      ejsBtn.disabled = false;
      ejsBtn.textContent = '⚡ Invia via EmailJS';
    }
  });

  function refreshMessage() {
    const activeTpl = document.querySelector('.reply-tpl-btn.active')?.dataset.tpl || 'confirm';
    const name = nameInput?.value.trim();
    const num = numInput?.value.trim();
    if (msgArea) msgArea.value = REPLY_TEMPLATES[activeTpl](name, num);
  }

  function closeVendorPanel() {
    overlay.classList.remove('open');
    setTimeout(() => { overlay.style.display = 'none'; }, 300);
    document.body.style.overflow = '';
  }
}

function updateVendorBtnVisibility() {
  const btn = document.getElementById('vendorReplyBtn');
  if (!btn) return;
  const isConfigured = EMAIL_CONFIG.publicKey && EMAIL_CONFIG.serviceId &&
    EMAIL_CONFIG.templateId && EMAIL_CONFIG.ownerEmail;
  btn.style.display = isConfigured ? 'flex' : 'none';
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// CAROSELLO RECENSIONI
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function setupReviews() {
  const track = document.getElementById('reviewsTrack');
  const prevBtn = document.getElementById('reviewsPrev');
  const nextBtn = document.getElementById('reviewsNext');
  const dotsEl = document.getElementById('reviewsDots');
  if (!track || !prevBtn || !nextBtn) return;

  const cards = track.querySelectorAll('.review-card');
  const total = cards.length;
  let current = 0;
  let autoInterval = null;

  // Calcola la larghezza di uno step (card + gap)
  function cardWidth() {
    const card = cards[0];
    const gap = parseFloat(getComputedStyle(track).gap) || 20;
    return card.offsetWidth + gap;
  }

  // Crea i dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'reviews-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Recensione ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  });

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * cardWidth()}px)`;
    dotsEl.querySelectorAll('.reviews-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  // Auto-play ogni 4s
  function startAuto() {
    autoInterval = setInterval(() => goTo(current + 1), 4000);
  }
  function resetAuto() {
    clearInterval(autoInterval);
    startAuto();
  }
  startAuto();

  // Pausa al hover
  const wrap = track.closest('.reviews-carousel-wrap');
  wrap?.addEventListener('mouseenter', () => clearInterval(autoInterval));
  wrap?.addEventListener('mouseleave', startAuto);

  // Swipe su mobile
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? goTo(current + 1) : goTo(current - 1); resetAuto(); }
  });

  // Ricalcola posizione al resize
  window.addEventListener('resize', () => goTo(current));
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// RICHIESTA PRODOTTO PERSONALIZZATA
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// Aggiunge al carrello una richiesta prodotto personalizzata (usata da entrambi i form)
function pushCustomRequestItem(name, size, qty) {
  const customItem = {
    id: 'custom-' + Date.now(),
    name: name,
    size: size,
    qty: qty,
    price: 28,
    custom: true
  };
  const existing = cart.find(i => i.name === customItem.name && i.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push(customItem);
  }
  saveCart();
  updateCartUI();
}

function setupCustomOrder() {
  const form = document.getElementById('customOrderForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('customProductName')?.value.trim();
    const size = document.getElementById('customProductSize')?.value || 'M';
    const qty = parseInt(document.getElementById('customProductQty')?.value) || 1;

    if (!name) return;

    pushCustomRequestItem(name, size, qty);
    openCart();

    showToast('✅', `"${name}" ${t('toast.aggiunto')} ${t('toast.prezzoComunicato')}`);
    form.reset();
    document.getElementById('customProductSize').value = 'M';
    document.getElementById('customProductQty').value = '1';
  });
}

// Scheda "Non trovi il tuo prodotto?": invia direttamente la richiesta al venditore.
function setupCustomRequest() {
  const form = document.getElementById('customRequestForm');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const productName = document.getElementById('crqName')?.value.trim();
    const customerName = document.getElementById('crqCustomerName')?.value.trim();
    const customerEmail = document.getElementById('crqCustomerEmail')?.value.trim();
    const size = document.getElementById('crqSize')?.value || 'M';
    const qty = parseInt(document.getElementById('crqQty')?.value, 10) || 1;
    const note = document.getElementById('crqNote')?.value.trim() || 'Nessun dettaglio aggiuntivo';
    if (!productName || !customerName || !customerEmail) return;

    const submit = form.querySelector('button[type="submit"]');
    if (submit) { submit.disabled = true; submit.dataset.originalText = submit.textContent; submit.textContent = 'Invio in corso...'; }

    try {
      if (!EMAIL_CONFIG.publicKey || !EMAIL_CONFIG.serviceId || !EMAIL_CONFIG.templateId || !EMAIL_CONFIG.ownerEmail) {
        throw new Error('EmailJS non configurato');
      }
      await emailjs.send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.templateId, {
        to_email: EMAIL_CONFIG.ownerEmail,
        customer_name: customerName,
        customer_email: customerEmail,
        order_number: 'Richiesta prodotto',
        order_details: `Prodotto richiesto: ${productName}\nTaglia: ${size}\nQuantità: ${qty}\nDettagli: ${note}`,
        order_notes: note,
        order_total: 'Prezzo da comunicare',
        reply_to: customerEmail
      });
      closeCustomRequest();
      showToast('', 'Richiesta inviata. Ti ricontatteremo via email.');
      form.reset();
      const sz = document.getElementById('crqSize'); if (sz) sz.value = 'M';
      const qt = document.getElementById('crqQty'); if (qt) qt.value = '1';
    } catch (err) {
      console.error('Richiesta prodotto non inviata:', err);
      showToast('', 'Errore nell\'invio della richiesta. Riprova.');
    } finally {
      if (submit) { submit.disabled = false; submit.textContent = submit.dataset.originalText || 'Invia richiesta'; }
    }
  });
}

function openCustomRequest() {
  const el = document.getElementById('customRequestOverlay');
  if (!el) return;
  openOverlay('customRequestOverlay');
  navPush();
}

function closeCustomRequest() {
  closeOverlay('customRequestOverlay');
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// MINI-CAROSELLO RECENSIONI
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function setupReviewMiniCarousels() {
  document.querySelectorAll('[data-rmc]').forEach(function (rmc) {
    const imgs = rmc.querySelectorAll('.rmc-img');
    const dots = rmc.querySelectorAll('.rmc-dot');
    if (imgs.length <= 1) return;

    let idx = 0;

    function goTo(n) {
      imgs[idx].classList.remove('active');
      dots[idx].classList.remove('active');
      idx = (n + imgs.length) % imgs.length;
      imgs[idx].classList.add('active');
      dots[idx].classList.add('active');
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); clearInterval(timer); timer = setInterval(function () { goTo(idx + 1); }, 3000); });
    });

    var timer = setInterval(function () { goTo(idx + 1); }, 3000);
  });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// HERO CAROUSEL (immagini modelli)
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// ── HERO NUOVA COLLEZIONE: carosello automatico di foto (dalla cartella models) ──
function setupHeroSlideshow() {
  const img = document.getElementById('edHeroImg');
  if (!img) return;

  const slides = [
    'images/3d/editorial-hero.jpg',
    'images/models/Immagine 2026-05-03 111519.png',
    'images/models/Immagine 2026-05-03 111700.png',
    'images/models/Immagine 2026-05-03 112008.png',
    'images/models/Immagine 2026-05-03 112108.png',
    'images/models/Immagine 2026-05-03 112241.png'
  ];

  // Preload di tutte le foto per uno switch immediato
  slides.forEach(s => {
    const pre = new Image();
    pre.src = s;
  });

  let i = 0;
  const INTERVAL = 4000; // cambia ogni 4 secondi

  setInterval(() => {
    i = (i + 1) % slides.length;
    // fade out → switch → fade in
    img.style.opacity = '0';
    setTimeout(() => {
      img.src = slides[i];
      img.style.opacity = '1';
    }, 300);
  }, INTERVAL);
}

function setupHeroCarousel() {
  const imgs = document.querySelectorAll('.hero-carousel-img');
  const dotsEl = document.getElementById('heroCarouselDots');
  if (!imgs.length || !dotsEl) return;

  let current = 0;
  let interval = null;

  // Crea dots
  imgs.forEach(function (_, i) {
    const dot = document.createElement('button');
    dot.className = 'hero-carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Foto ' + (i + 1));
    dot.addEventListener('click', function () { goTo(i); resetAuto(); });
    dotsEl.appendChild(dot);
  });

  function goTo(index) {
    imgs[current].classList.remove('active');
    dotsEl.querySelectorAll('.hero-carousel-dot')[current].classList.remove('active');
    current = (index + imgs.length) % imgs.length;
    imgs[current].classList.add('active');
    dotsEl.querySelectorAll('.hero-carousel-dot')[current].classList.add('active');
  }

  function startAuto() {
    interval = setInterval(function () { goTo(current + 1); }, 2000);
  }
  function resetAuto() { clearInterval(interval); startAuto(); }
  startAuto();
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// NAVBAR MEGA MENU (hover) — collega filtri ai link
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function setupNavMegaMenu() {
  // Chiude il drawer mobile e il pannello dopo la navigazione
  function closeNavAfterNav() {
    document.getElementById('navLinks')?.classList.remove('open');
    document.querySelectorAll('.nav-mega-item').forEach(i => i.classList.remove('active'));
  }

  // Delegazione click su tutti i bottoni con data-league nel mega menu
  document.querySelectorAll('.nav-mega-link[data-league]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const league = btn.dataset.league;
      const label = btn.textContent.split('\n')[0].trim();
      closeNavAfterNav();
      openCatPage(league, label.toUpperCase(), label, []);
    });
  });

  // Bottoni con data-filter (Tute, Felpe, ecc.)
  document.querySelectorAll('.nav-mega-link[data-filter]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = btn.dataset.filter;
      const label = btn.textContent.split('\n')[0].trim();
      closeNavAfterNav();
      openCatPage(filter, label.toUpperCase(), label, []);
    });
  });

  // Bottoni tipo (new/vintage)
  document.querySelectorAll('.nav-mega-link[data-filter-type]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const type = btn.dataset.filterType;
      const label = btn.textContent.split('\n')[0].trim();
      closeNavAfterNav();
      openCatPage(type, label.toUpperCase(), label, []);
    });
  });

  // Sotto-elementi Scarpe/Sport ancora collegati a #products: li colleghiamo alle pagine giuste
  // Brand scarpe → pagina brand (filtra per marchio)
  document.querySelectorAll('.nav-mega-link[data-brand]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const brand = btn.dataset.brand;
      const label = btn.textContent.split('\n')[0].trim();
      closeNavAfterNav();
      openCatPage('all', label.toUpperCase(), label, [], null, brand);
    });
  });

  // Tipo scarpe (Da calcio / Running / Lifestyle) → filtra per categoriaLabel
  document.querySelectorAll('.nav-mega-link[data-label]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const lbl = btn.dataset.label;
      const label = btn.textContent.split('\n')[0].trim();
      closeNavAfterNav();
      openCatPage('all', label.toUpperCase(), label, [], null, null, lbl);
    });
  });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// BARRA DI RICERCA NAVBAR → Dropdown sotto navbar
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

// Mappa categorie: nome display → filtro da passare a setActiveFilter
const SEARCH_CATEGORIES = [
  // Le icone erano emoji salvate con encoding errato e apparivano come testo corrotto.
  // I nomi dei campionati restano puliti e leggibili in tutte le lingue.
  { label: 'Serie A', icon: '', filter: 'SerieA' },
  { label: 'Champions League', icon: '', filter: 'Champions' },
  { label: 'Premier League', icon: '', filter: 'Premier' },
  { label: 'La Liga', icon: '', filter: 'LaLiga' },
  { label: 'Ligue 1', icon: '', filter: 'Ligue1' },
  { label: 'Bundesliga', icon: '', filter: 'Bundesliga' },
  { label: 'Nazionali', icon: '', filter: 'Nazionali' },
  { label: 'Mondiale 2026', icon: '', filter: 'Mondiale2026' },
  { label: 'Saudi Pro League', icon: '', filter: 'SaudiLeague' },
];

function setupNavSearch() {
  const navInput = document.getElementById('navSearchInput');
  const navBtn = document.getElementById('navSearchBtn');
  const dropdown = document.getElementById('searchDropdown');
  const backdrop = document.getElementById('searchDropdownBackdrop');
  const searchClose = document.getElementById('searchDropdownClose');
  if (!navInput || !dropdown) return;

  // â”€â”€ Aggiorna dropdown ad ogni input â”€â”€
  navInput.addEventListener('input', () => {
    clearTimeout(navInput._sdDebounce);
    navInput._sdDebounce = setTimeout(() => {
      const q = navInput.value.trim();
      if (!q) { closeSearchDropdown(); return; }
      openSearchDropdown(q);
    }, 180);
  });

  // Invio o click icona
  navBtn?.addEventListener('click', () => {
    const q = navInput.value.trim();
    if (q) openSearchDropdown(q);
  });
  navInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = navInput.value.trim();
      if (q) openSearchDropdown(q);
    }
    if (e.key === 'Escape') closeSearchDropdown();
  });

  // Chiudi cliccando sul backdrop o sul pulsante sempre visibile nel pannello.
  const closeSearch = () => {
    closeMobSearch();
    navInput.value = '';
  };
  backdrop?.addEventListener('click', closeSearch);
  searchClose?.addEventListener('click', closeSearch);

  // Chiudi con ESC globale
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMobSearch();
  });

  // ── SEARCH BAR MOBILE (tasto Cerca della bottom nav) ──
  const mobPanel   = document.getElementById('mobSearchPanel');
  const mobInput   = document.getElementById('mobSearchInput');
  const mobClose   = document.getElementById('mobSearchClose');

  mobInput?.addEventListener('input', () => {
    clearTimeout(mobInput._sdDebounce);
    mobInput._sdDebounce = setTimeout(() => {
      const q = mobInput.value.trim();
      if (!q) { closeSearchDropdown(); return; }
      openSearchDropdown(q);
    }, 180);
  });

  mobInput?.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = mobInput.value.trim();
      if (q) openSearchDropdown(q);
    }
    if (e.key === 'Escape') closeMobSearch();
  });

  mobClose?.addEventListener('click', closeMobSearch);
}

// Apre la barra di ricerca mobile (bottom nav → Cerca)
function openMobSearch() {
  const panel = document.getElementById('mobSearchPanel');
  const input = document.getElementById('mobSearchInput');
  if (!panel) return;
  // Evita sovrapposizioni: chiudi gli altri pannelli aperti
  closeCart();
  closeFavSidebar();
  closeCatPage();
  panel.classList.add('open');
  panel.setAttribute('aria-hidden', 'false');
  document.body.classList.add('mob-search-open');
  setTimeout(() => input?.focus(), 60);
  navPush();
}

// Chiude la barra di ricerca mobile e il dropdown
function closeMobSearch() {
  const panel = document.getElementById('mobSearchPanel');
  const input = document.getElementById('mobSearchInput');
  if (panel) {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
  }
  if (input) input.value = '';
  document.body.classList.remove('mob-search-open');
  closeSearchDropdown();
}

function openSearchDropdown(query) {
  const dropdown = document.getElementById('searchDropdown');
  const backdrop = document.getElementById('searchDropdownBackdrop');
  if (!dropdown) return;
  renderSearchDropdown(query);
  dropdown.classList.add('open');
  backdrop?.classList.add('open');
}

function closeSearchDropdown() {
  const dropdown = document.getElementById('searchDropdown');
  const backdrop = document.getElementById('searchDropdownBackdrop');
  dropdown?.classList.remove('open');
  backdrop?.classList.remove('open');
}

function renderSearchDropdown(query) {
  const catList = document.getElementById('sdCatList');
  const prodGrid = document.getElementById('sdProductsGrid');
  if (!catList || !prodGrid) return;

  const q = query.toLowerCase();

  // â”€â”€ 1. CATEGORIE: le 5 più rilevanti in base alla query â”€â”€
  // Una categoria è rilevante se contiene prodotti che matchano la query
  // oppure se il suo nome matcha la query
  const relevantCats = [];
  for (const cat of SEARCH_CATEGORIES) {
    if (relevantCats.length >= 5) break;
    const catMatches = cat.label.toLowerCase().includes(q);
    const hasProducts = PRODUCTS.some(p => {
      const cats = Array.isArray(p.category) ? p.category : [p.category];
      if (!cats.includes(cat.filter)) return false;
      const name = p.name.toLowerCase();
      const label = Array.isArray(p.categoryLabel) ? p.categoryLabel.join(' ').toLowerCase() : (p.categoryLabel || '').toLowerCase();
      return name.includes(q) || label.includes(q) || catMatches;
    });
    if (hasProducts || catMatches) relevantCats.push(cat);
  }

  // Se non ci sono categorie rilevanti, mostra tutte (max 5)
  const catsToShow = relevantCats.length > 0 ? relevantCats : SEARCH_CATEGORIES.slice(0, 5);

  catList.innerHTML = catsToShow.map(cat => `
    <li class="sd-cat-item">
      <button class="sd-cat-btn" onclick="closeMobSearch(); openCatPage('${cat.filter}', '${cat.label.toUpperCase()}', '${cat.label}', []);">
        ${cat.icon ? `<span class="sd-cat-icon">${cat.icon}</span>` : ''}
        <span class="sd-cat-label">${cat.label}</span>
      </button>
    </li>
  `).join('');

  // ── 2. PRODOTTI: max 5 che matchano la query ──
  const results = PRODUCTS.filter(p => {
    const name = p.name.toLowerCase();
    const label = Array.isArray(p.categoryLabel) ? p.categoryLabel.join(' ').toLowerCase() : (p.categoryLabel || '').toLowerCase();
    const cats = Array.isArray(p.category) ? p.category.join(' ').toLowerCase() : (p.category || '').toLowerCase();
    return name.includes(q) || label.includes(q) || cats.includes(q);
  }).slice(0, 5);

  if (results.length === 0) {
    prodGrid.innerHTML = `<div class="sd-empty">Nessun prodotto trovato per "<strong>${query}</strong>"</div>`;
    return;
  }

  prodGrid.innerHTML = '';
  results.forEach(p => {
    const card = document.createElement('div');
    card.className = 'sd-card';
    card.onclick = () => {
      closeMobSearch();
      openQuickView(p.id);
    };
    card.innerHTML = `
      <div class="sd-card-img-wrap">
        <img class="sd-card-img" src="${p.image}" alt="${p.name}" loading="lazy"
             onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22267%22><rect fill=%22%23f5f5f5%22 width=%22200%22 height=%22267%22/><text x=%2250%25%22 y=%2250%25%22 fill=%22%23ccc%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-size=%2240%22>⚽</text></svg>'">
      </div>
      <div class="sd-card-name">${p.name}</div>
      <div class="sd-card-price">€${p.price.toFixed(2)}</div>
    `;
    prodGrid.appendChild(card);
  });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SEZIONE VINTAGE — Maglie con badge "vintage"
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function setupVintage() {
  const grid     = document.getElementById('vintageGrid');
  const viewport = document.getElementById('vintageViewport');
  const track    = document.getElementById('vintageTrack');
  const thumb    = document.getElementById('vintageThumb');
  const seeAll   = document.getElementById('vintageSeeAll');

  if (grid) {
    // Filtra per badge === 'vintage' (campo badge nei prodotti)
    const products = PRODUCTS.filter(p => p.badge === 'vintage').slice(0, 12);

    if (products.length === 0) {
      grid.innerHTML = '<div class="vintage-empty">Nessuna maglia vintage disponibile al momento.</div>';
    } else {
      grid.innerHTML = '';
      products.forEach(p => {
        const catLabel = Array.isArray(p.categoryLabel) ? p.categoryLabel[0] : (p.categoryLabel || '');
        const card = document.createElement('div');
        card.className = 'vintage-card';
        card.onclick = () => openQuickView(p.id);
        card.innerHTML = `
          <div class="vintage-card-img-wrap">
            <img class="vintage-card-img" src="${p.image}" alt="${p.name}" loading="lazy"
                 onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22400%22><rect fill=%22%23f5f5f5%22 width=%22300%22 height=%22400%22/><text x=%2250%25%22 y=%2250%25%22 fill=%22%23ccc%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-size=%2260%22>⚽</text></svg>'">
          </div>
          ${p.badgeLabel ? `<div class="vintage-card-tag">${p.badgeLabel}</div>` : ''}
          <div class="vintage-card-name">${p.name}</div>
          <div class="vintage-card-cat">${catLabel}</div>
          <div class="vintage-card-price">€${p.price.toFixed(2)}${p.oldPrice ? ` <span style="font-size:.82em;color:#aaa;font-weight:400;text-decoration:line-through;">€${p.oldPrice.toFixed(2)}</span>` : ''}</div>
        `;
        grid.appendChild(card);
      });
    }
  }

  // "Acquista prodotti Vintage" → gestito da setupCatPage (openCatPage)
  // (listener rimosso per evitare duplicazioni)

  if (!viewport || !track || !thumb) return;
  function updateThumb() {
    const scrollRatio = viewport.scrollLeft / (viewport.scrollWidth - viewport.clientWidth || 1);
    const thumbW = (viewport.clientWidth / viewport.scrollWidth) * 100;
    thumb.style.width = Math.max(thumbW, 10) + '%';
    thumb.style.left = scrollRatio * (100 - parseFloat(thumb.style.width)) + '%';
  }
  viewport.addEventListener('scroll', updateThumb, { passive: true });
  window.addEventListener('load', updateThumb);
  setTimeout(updateThumb, 400);
  track.addEventListener('click', e => {
    if (e.target === thumb) return;
    const rect = track.getBoundingClientRect();
    viewport.scrollLeft = ((e.clientX - rect.left) / rect.width) * (viewport.scrollWidth - viewport.clientWidth);
  });
  let dragging = false, dragStartX = 0, dragStartScroll = 0;
  thumb.addEventListener('pointerdown', e => {
    dragging = true; dragStartX = e.clientX; dragStartScroll = viewport.scrollLeft;
    thumb.setPointerCapture(e.pointerId); e.preventDefault();
  });
  thumb.addEventListener('pointermove', e => {
    if (!dragging) return;
    viewport.scrollLeft = dragStartScroll + ((e.clientX - dragStartX) / track.clientWidth) * (viewport.scrollWidth - viewport.clientWidth);
  });
  thumb.addEventListener('pointerup', () => { dragging = false; });
  thumb.addEventListener('pointercancel', () => { dragging = false; });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SEZIONE MUST HAVE — Articoli più venduti / bestseller
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// Foto prodotto reali presenti nella cartella images (fallback per le card Must Have)
// Foto di riserva per i prodotti la cui immagine non esiste, abbinate alla squadra giusta
const MUST_HAVE_IMAGE_OVERRIDES = {
  // Riservato alle immagini locali sostitutive di prodotti che non hanno un asset valido.
};

// Un prodotto è valido per la sezione se ha una foto locale esistente (o un override)
function mustHaveHasImage(p) {
  if (MUST_HAVE_IMAGE_OVERRIDES[p.id]) return true;
  return !!p.image && !p.image.startsWith('http') && !p.image.includes('images/teams/');
}

// Foto effettiva del prodotto: usa l'override se l'immagine di catalogo è mancante/remota
function getProductImage(p) {
  if (!p) return '';
  if (MUST_HAVE_IMAGE_OVERRIDES[p.id]) return MUST_HAVE_IMAGE_OVERRIDES[p.id];
  return p.image || '';
}

function setupMustHave() {
  const grid     = document.getElementById('mustHaveGrid');
  const viewport = document.getElementById('mustHaveViewport');
  const track    = document.getElementById('mustHaveTrack');
  const thumb    = document.getElementById('mustHaveThumb');
  const seeAll   = document.getElementById('mustHaveSeeAll');

  if (grid) {
    // Priorità: badge "bestseller" o "hot", poi badge "sale", poi badge "new", poi per prezzo desc
    const scored = PRODUCTS.filter(p => !p.nascondiMustHave && mustHaveHasImage(p)).map(p => {
      let score = 0;
      if (p.badge === 'bestseller' || p.badge === 'hot') score += 100;
      else if (p.badge === 'sale') score += 50;
      else if (p.badge === 'new') score += 30;
      if (p.oldPrice) score += 20; // in offerta → più rilevante
      return { p, score };
    });
    scored.sort((a, b) => b.score - a.score);
    const products = scored.slice(0, 12).map(x => x.p);

    if (products.length === 0) {
      grid.innerHTML = '<div class="mustHave-empty">Nessun prodotto disponibile al momento.</div>';
    } else {
      grid.innerHTML = '';
      products.forEach((p, i) => {
        const catLabel = Array.isArray(p.categoryLabel) ? p.categoryLabel[0] : (p.categoryLabel || '');
        const card = document.createElement('div');
        card.className = 'mustHave-card';
        card.onclick = () => openQuickView(p.id);
        const badgeHtml = i < 3 ? '<span class="mustHave-badge">🔥 Bestseller</span>' : '';
        const imgSrc = MUST_HAVE_IMAGE_OVERRIDES[p.id] || p.image || '';
        card.innerHTML = `
          ${badgeHtml}
          <div class="mustHave-card-img-wrap">
            <img class="mustHave-card-img" src="${imgSrc}" alt="${p.name}" loading="lazy"
                 onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22400%22><rect fill=%22%23f5f5f5%22 width=%22300%22 height=%22400%22/></svg>'">
          </div>
          ${p.badgeLabel ? `<div class="mustHave-card-tag">${p.badgeLabel}</div>` : ''}
          <div class="mustHave-card-name">${p.name}</div>
          <div class="mustHave-card-cat">${catLabel}</div>
          <div class="mustHave-card-price">€${p.price.toFixed(2)}${p.oldPrice ? ` <span style="font-size:.82em;color:#aaa;font-weight:400;text-decoration:line-through;">€${p.oldPrice.toFixed(2)}</span>` : ''}</div>
        `;
        grid.appendChild(card);
      });
    }
  }

  // "Vedi tutti i bestseller" → gestito da setupCatPage (openCatPage)

  if (!viewport || !track || !thumb) return;
  function updateThumb() {
    const scrollRatio = viewport.scrollLeft / (viewport.scrollWidth - viewport.clientWidth || 1);
    const thumbW = (viewport.clientWidth / viewport.scrollWidth) * 100;
    thumb.style.width = Math.max(thumbW, 10) + '%';
    thumb.style.left = scrollRatio * (100 - parseFloat(thumb.style.width)) + '%';
  }
  viewport.addEventListener('scroll', updateThumb, { passive: true });
  window.addEventListener('load', updateThumb);
  setTimeout(updateThumb, 400);
  track.addEventListener('click', e => {
    if (e.target === thumb) return;
    const rect = track.getBoundingClientRect();
    viewport.scrollLeft = ((e.clientX - rect.left) / rect.width) * (viewport.scrollWidth - viewport.clientWidth);
  });
  let dragging = false, dragStartX = 0, dragStartScroll = 0;
  thumb.addEventListener('pointerdown', e => {
    dragging = true; dragStartX = e.clientX; dragStartScroll = viewport.scrollLeft;
    thumb.setPointerCapture(e.pointerId); e.preventDefault();
  });
  thumb.addEventListener('pointermove', e => {
    if (!dragging) return;
    viewport.scrollLeft = dragStartScroll + ((e.clientX - dragStartX) / track.clientWidth) * (viewport.scrollWidth - viewport.clientWidth);
  });
  thumb.addEventListener('pointerup', () => { dragging = false; });
  thumb.addEventListener('pointercancel', () => { dragging = false; });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SEZIONE MONDIALI — Maglie Mondiale 2026
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function setupMondiali() {
  const grid = document.getElementById('mondialiGrid');
  const viewport = document.getElementById('mondialiViewport');
  const track = document.getElementById('mondialiTrack');
  const thumb = document.getElementById('mondialiThumb');
  const seeAll = document.getElementById('mondialiSeeAll');

  // â”€â”€ 1. Popola la griglia (max 8 prodotti) â”€â”€
  if (grid) {
    const products = PRODUCTS.filter(p => {
      const cats = Array.isArray(p.category) ? p.category : [p.category];
      return cats.includes('Mondiale2026') || cats.includes('Nazionali');
    }).slice(0, 12);

    if (products.length === 0) {
      grid.innerHTML = '<div class="mondiali-empty">Nessuna maglia del mondiale disponibile al momento.</div>';
    } else {
      grid.innerHTML = '';
      products.forEach(p => {
        const catLabel = Array.isArray(p.categoryLabel) ? p.categoryLabel[0] : (p.categoryLabel || '');
        const card = document.createElement('div');
        card.className = 'mondiali-card';
        card.onclick = () => openQuickView(p.id);
        card.innerHTML = `
          <div class="mondiali-card-img-wrap">
            <img class="mondiali-card-img" src="${p.image}" alt="${p.name}" loading="lazy"
                 onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22400%22><rect fill=%22%23f5f5f5%22 width=%22300%22 height=%22400%22/><text x=%2250%25%22 y=%2250%25%22 fill=%22%23ccc%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-size=%2260%22>⚽</text></svg>'">
          </div>
          ${p.badgeLabel ? `<div class="mondiali-card-tag">${p.badgeLabel}</div>` : ''}
          <div class="mondiali-card-name">${p.name}</div>
          <div class="mondiali-card-cat">${catLabel}</div>
          <div class="mondiali-card-price">€${p.price.toFixed(2)}${p.oldPrice ? ` <span style="font-size:.82em;color:#aaa;font-weight:400;text-decoration:line-through;">€${p.oldPrice.toFixed(2)}</span>` : ''}</div>
        `;
        grid.appendChild(card);
      });
    }
  }

  // â”€â”€ 2. "Acquista prodotti Mondiali" → gestito da setupCatPage (openCatPage) â”€â”€

  // â”€â”€ 3. Scrollbar custom â”€â”€
  if (!viewport || !track || !thumb) return;

  // Aggiorna posizione e larghezza thumb in base allo scroll corrente
  function updateThumb() {
    const scrollRatio = viewport.scrollLeft / (viewport.scrollWidth - viewport.clientWidth || 1);
    const thumbW = (viewport.clientWidth / viewport.scrollWidth) * 100;
    thumb.style.width = Math.max(thumbW, 10) + '%';
    thumb.style.left = scrollRatio * (100 - parseFloat(thumb.style.width)) + '%';
  }

  // Sync thumb ↓ scroll
  viewport.addEventListener('scroll', updateThumb, { passive: true });
  // Ricalcola dopo che le immagini sono caricate
  window.addEventListener('load', updateThumb);
  setTimeout(updateThumb, 400);

  // Click sul track → salto diretto
  track.addEventListener('click', e => {
    if (e.target === thumb) return; // gestito sotto
    const rect = track.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    viewport.scrollLeft = ratio * (viewport.scrollWidth - viewport.clientWidth);
  });

  // Drag del thumb
  let dragging = false;
  let dragStartX = 0;
  let dragStartScroll = 0;

  thumb.addEventListener('pointerdown', e => {
    dragging = true;
    dragStartX = e.clientX;
    dragStartScroll = viewport.scrollLeft;
    thumb.setPointerCapture(e.pointerId);
    e.preventDefault();
  });

  thumb.addEventListener('pointermove', e => {
    if (!dragging) return;
    const dx = e.clientX - dragStartX;
    const trackW = track.clientWidth;
    const scrollRange = viewport.scrollWidth - viewport.clientWidth;
    viewport.scrollLeft = dragStartScroll + (dx / trackW) * scrollRange;
  });

  thumb.addEventListener('pointerup', () => { dragging = false; });
  thumb.addEventListener('pointercancel', () => { dragging = false; });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// FEATURED HOME — Category cards + Prodotti in evidenza
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function setupFeatured() {
  // â”€â”€ 1. Category cards: click → filtra e scrolla â”€â”€
  document.querySelectorAll('.feat-league-card').forEach(card => {
    card.addEventListener('click', () => {
      const league = card.dataset.league;
      const label = (card.textContent || league).trim();
      openCatPage(league, label.toUpperCase(), label, []);
    });
  });

  // â”€â”€ 2. Ultimi Arrivi: prodotti con badge "new" (max 4) â”€â”€
  const newRow = document.getElementById('featNewRow');
  if (newRow) {
    const newProducts = PRODUCTS.filter(p => p.badge === 'new').slice(0, 4);
    newRow.innerHTML = newProducts.length
      ? newProducts.map(p => featProductCardHTML(p)).join('')
      : '<p style="color:var(--text-muted);grid-column:1/-1">Nessuna novità al momento.</p>';
  }

  // â”€â”€ 3. Più Richiesti: prime 4 maglie Serie A + La Liga con prezzi bassi â”€â”€
  const topRow = document.getElementById('featTopRow');
  if (topRow) {
    // Seleziona 4 prodotti: i primi disponibili da categorie principali
    const topCats = ['SerieA', 'LaLiga', 'Bundesliga', 'Premier'];
    const topProducts = [];
    topCats.forEach(cat => {
      const found = PRODUCTS.find(p => {
        const cats = Array.isArray(p.category) ? p.category : [p.category];
        return cats.includes(cat) && !topProducts.includes(p);
      });
      if (found) topProducts.push(found);
    });
    topRow.innerHTML = topProducts.length
      ? topProducts.map(p => featProductCardHTML(p)).join('')
      : '<p style="color:var(--text-muted);grid-column:1/-1">Nessun prodotto disponibile.</p>';
  }

  // â”€â”€ 4. Pulsanti "Vedi tutti" â”€â”€
  document.getElementById('featSeeAllNew')?.addEventListener('click', () => {
    openCatPage('all', 'TUTTI I PRODOTTI', 'Prodotti', []);
  });
  document.getElementById('featSeeAllTop')?.addEventListener('click', () => {
    openCatPage('all', 'TUTTI I PRODOTTI', 'Prodotti', []);
  });
}

// HTML di una mini product card per le featured rows
function featProductCardHTML(p) {
  const label = Array.isArray(p.categoryLabel)
    ? p.categoryLabel[0]
    : (p.categoryLabel || '');
  const badgeHTML = p.badge
    ? `<span class="feat-product-badge ${p.badge}">${p.badgeLabel}</span>`
    : '';
  return `
    <div class="feat-product-card" onclick="openQuickView(${p.id})" title="${p.name}">
      ${badgeHTML}
      <img class="feat-product-img"
           src="${p.image}" alt="${p.name}" loading="lazy"
           onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22180%22><rect fill=%22%230f1525%22 width=%22300%22 height=%22180%22/><text x=%2250%25%22 y=%2250%25%22 fill=%22%236c63ff%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-size=%2240%22>⚽</text></svg>'">
      <div class="feat-product-body">
        <div class="feat-product-league">${label}</div>
        <div class="feat-product-name">${p.name}</div>
        <div class="feat-product-price">€${p.price.toFixed(2)}</div>
      </div>
    </div>`;
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// PREFERITI — Sidebar laterale + badge navbar
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function saveFavorites() {
  favorites = normalizeFavoriteIds(favorites);
  saveActiveArray('favorites', favorites);
}

function isFavorite(productId) {
  return favorites.includes(productId);
}

function updateFavBadge() {
  const badge = document.getElementById('favBadge');
  const btn = document.getElementById('favBtn');
  const count = favorites.length;
  if (badge) {
    badge.textContent = count;
    badge.classList.toggle('show', count > 0);
  }
  if (btn) {
    btn.classList.toggle('has-items', count > 0);
  }
}

function openFavSidebar() {
  // Evita sovrapposizioni: chiudi gli altri pannelli aperti (carrello, ricerca, pagina prodotti)
  closeCart();
  closeMobSearch();
  closeCatPage();
  document.getElementById('favOverlay')?.classList.add('open');
  document.getElementById('favSidebar')?.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderFavoritesSidebar();
  navPush();
}

function closeFavSidebar() {
  document.getElementById('favOverlay')?.classList.remove('open');
  document.getElementById('favSidebar')?.classList.remove('open');
  document.body.style.overflow = '';
}

function toggleFavorite(productId, btnEl) {
  const idx = favorites.indexOf(productId);
  if (idx === -1) {
    favorites.push(productId);
    showToast('', t('toast.preferitiAggiunto'));
  } else {
    favorites.splice(idx, 1);
    showToast('', t('toast.preferitiRimosso'));
  }
  saveFavorites();
  updateFavBadge();
  // Aggiorna icona cuore sulla card cliccata
  if (btnEl) {
    const isFav = isFavorite(productId);
    btnEl.classList.toggle('active', isFav);
    const svg = btnEl.querySelector('svg');
    if (svg) {
      svg.setAttribute('fill', isFav ? '#e44545' : 'none');
      svg.setAttribute('stroke', isFav ? '#e44545' : '#999');
    }
  }
  // Se la sidebar è aperta, aggiorna anche quella
  if (document.getElementById('favSidebar')?.classList.contains('open')) {
    renderFavoritesSidebar();
  }
}

function toggleFavoriteFromQV(productId) {
  const idx = favorites.indexOf(productId);
  if (idx === -1) {
    favorites.push(productId);
    showToast('', t('toast.preferitiAggiunto'));
  } else {
    favorites.splice(idx, 1);
    showToast('', t('toast.preferitiRimosso'));
  }
  saveFavorites();
  updateFavBadge();
  // Aggiorna il bottone nel quick view
  const btn = document.getElementById('qvFavBtn');
  if (btn) {
    const isFav = isFavorite(productId);
    btn.classList.toggle('active', isFav);
    btn.title = isFav ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti';
    const svg = btn.querySelector('svg');
    if (svg) {
      svg.setAttribute('fill', isFav ? '#e44545' : 'none');
      svg.setAttribute('stroke', isFav ? '#e44545' : '#aaa');
    }
  }
  // Aggiorna anche le card nella griglia prodotti
  document.querySelectorAll('[data-pid="' + productId + '"]').forEach(cardBtn => {
    const isFav = isFavorite(productId);
    cardBtn.classList.toggle('active', isFav);
    const svg = cardBtn.querySelector('svg');
    if (svg) {
      svg.setAttribute('fill', isFav ? '#e44545' : 'none');
      svg.setAttribute('stroke', isFav ? '#e44545' : '#999');
    }
  });
}

function renderFavoritesSidebar() {
  const container = document.getElementById('favItems');
  const footer = document.getElementById('favFooter');
  const empty = document.getElementById('favEmpty');
  if (!container) return;

  const favProducts = favorites.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

  if (favProducts.length === 0) {
    if (empty) empty.style.display = 'flex';
    if (footer) footer.style.display = 'none';
    // Rimuovi vecchi item
    container.querySelectorAll('.fav-item').forEach(el => el.remove());
    return;
  }

  if (empty) empty.style.display = 'none';
  if (footer) footer.style.display = 'block';

  // Ricostruisci lista
  container.querySelectorAll('.fav-item').forEach(el => el.remove());

  favProducts.forEach(p => {
    const div = document.createElement('div');
    div.className = 'fav-item';
    const productName = cleanDisplayText(p.name);
    div.innerHTML =
      '<img class="fav-item-img" src="' + p.image + '" alt="' + productName + '" onclick="closeFavSidebar();openQuickView(' + p.id + ')" ' +
      'onerror="this.style.display=\'none\'">' +
      '<div class="fav-item-info">' +
      '<div class="fav-item-name" onclick="closeFavSidebar();openQuickView(' + p.id + ')">' + productName + '</div>' +
      '<div class="fav-item-price">&#x20AC;' + p.price.toFixed(2) + '</div>' +
      '<div class="fav-item-actions">' +
      '<button class="fav-item-add" onclick="closeFavSidebar();openQuickView(' + p.id + ')">Vedi prodotto</button>' +
      '<button class="fav-item-remove" onclick="removeFavoriteFromSidebar(' + p.id + ')" title="Rimuovi dai preferiti">&#x2665;</button>' +
      '</div>' +
      '</div>';
    container.insertBefore(div, empty ? empty.nextSibling : null);
    container.appendChild(div);
  });
}

function removeFavoriteFromSidebar(productId) {
  const idx = favorites.indexOf(productId);
  if (idx !== -1) favorites.splice(idx, 1);
  saveFavorites();
  updateFavBadge();
  // Aggiorna cuore sulla card prodotto
  document.querySelectorAll('[data-pid="' + productId + '"]').forEach(btn => {
    btn.classList.remove('active');
    const svg = btn.querySelector('svg');
    if (svg) { svg.setAttribute('fill', 'none'); svg.setAttribute('stroke', '#999'); }
  });
  renderFavoritesSidebar();
}

function setupFavorites() {
  // Badge iniziale
  updateFavBadge();

  // Apri sidebar al click sul cuore navbar
  document.getElementById('favBtn')?.addEventListener('click', openFavSidebar);

  // Chiudi sidebar
  document.getElementById('favClose')?.addEventListener('click', closeFavSidebar);
  document.getElementById('favOverlay')?.addEventListener('click', closeFavSidebar);

  // Vai ai prodotti
  document.getElementById('goShopFromFavBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    closeFavSidebar();
    openCatPage('all', 'TUTTI I PRODOTTI', 'Prodotti', []);
  });

  // Svuota preferiti
  document.getElementById('favClearBtn')?.addEventListener('click', () => {
    favorites = [];
    saveFavorites();
    updateFavBadge();
    // Aggiorna tutti i cuori nelle card
    document.querySelectorAll('.card-fav-btn').forEach(btn => {
      btn.classList.remove('active');
      const svg = btn.querySelector('svg');
      if (svg) { svg.setAttribute('fill', 'none'); svg.setAttribute('stroke', '#999'); }
    });
    renderFavoritesSidebar();
    showToast('', 'Preferiti svuotati.');
  });

  // Aggiungi tutti al carrello
  document.getElementById('favAddAllBtn')?.addEventListener('click', () => {
    const favProducts = favorites.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
    favProducts.forEach(p => {
      const existing = cart.find(i => i.id === p.id && !i.custNote);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ id: p.id, name: p.name, price: p.price, image: getProductImage(p), qty: 1, size: p.sizes[0] || 'M', fabric: 'Standard', custNote: '', _uid: Date.now() + '-' + Math.random().toString(36).slice(2) });
      }
    });
    saveCart();
    updateCartUI();
    closeFavSidebar();
    showToast('✅', favProducts.length + ' prodotti aggiunti al carrello!');
    openCart();
  });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// MODALE PERSONALIZZAZIONE MAGLIA
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

let _customizeProductId = null;
let _customizeKitType = 'shorts'; // kit attivo quando si apre il modal

function openCustomizeModal(productId) {
  _customizeProductId = productId;

  // Determina il tipo di kit selezionato nel quick view
  const activeKitBtn = document.querySelector('.qv-kit-row .qv-option-btn.active');
  _customizeKitType = activeKitBtn ? (activeKitBtn.dataset.kit || 'solo') : 'solo';

  const overlay = document.getElementById('customizeOverlay');
  if (!overlay) return;

  // Mostra/nascondi sezioni in base al tipo di kit
  // Solo Maglia → solo nome/numero, niente shorts checkbox né calzettoni
  // Maglia+Pantaloncino → nome/numero + checkbox pantaloncino
  // Kit Completo → tutto
  const shortsGroup = document.getElementById('custShortsNumberGroup');
  const sockGroup = document.getElementById('custSockGroup');
  if (shortsGroup) shortsGroup.style.display = (_customizeKitType === 'shorts' || _customizeKitType === 'full') ? 'block' : 'none';
  if (sockGroup) sockGroup.style.display = _customizeKitType === 'full' ? 'block' : 'none';

  // Precompila con personalizzazione esistente
  const custName = document.getElementById('custName');
  const custNumber = document.getElementById('custNumber');
  const custShortsNumber = document.getElementById('custShortsNumber');
  const custSockSize = document.getElementById('custSockSize');
  if (currentCustomization) {
    if (custName) custName.value = currentCustomization.name || '';
    if (custNumber) custNumber.value = currentCustomization.number || '';
    if (custShortsNumber) custShortsNumber.checked = !!currentCustomization.shortsNumber;
    if (custSockSize) custSockSize.value = currentCustomization.sockSize || '';
  } else {
    if (custName) custName.value = '';
    if (custNumber) custNumber.value = '';
    if (custShortsNumber) custShortsNumber.checked = false;
    if (custSockSize) custSockSize.value = '';
  }
  updateCustomizePreview();

  overlay.style.display = 'flex';
  requestAnimationFrame(() => overlay.classList.add('open'));
  document.body.style.overflow = 'hidden';
}

function closeCustomizeModal() {
  const overlay = document.getElementById('customizeOverlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  setTimeout(() => {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }, 320);
}

function updateCustomizePreview() {
  const name = (document.getElementById('custName')?.value || '').trim().toUpperCase() || 'IL TUO NOME';
  const number = (document.getElementById('custNumber')?.value || '').trim() || '10';
  const prevName = document.getElementById('prevName');
  const prevNumber = document.getElementById('prevNumber');
  if (prevName) prevName.textContent = name;
  if (prevNumber) prevNumber.textContent = number;
}

function setupCustomizeModal() {
  const overlay = document.getElementById('customizeOverlay');
  const closeBtn = document.getElementById('customizeClose');
  const confirmBtn = document.getElementById('customizeConfirmBtn');
  const custName = document.getElementById('custName');
  const custNumber = document.getElementById('custNumber');

  if (!overlay) return;

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeCustomizeModal();
  });
  closeBtn?.addEventListener('click', closeCustomizeModal);
  custName?.addEventListener('input', updateCustomizePreview);
  custNumber?.addEventListener('input', updateCustomizePreview);

  confirmBtn?.addEventListener('click', () => {
    const name = (custName?.value || '').trim();
    const number = (custNumber?.value || '').trim();
    const shortsNumber = document.getElementById('custShortsNumber')?.checked || false;
    const sockSize = document.getElementById('custSockSize')?.value || '';

    if (!name && !number) {
      showToast('\u26A0\uFE0F', 'Inserisci almeno il nome o il numero!');
      return;
    }
    if (number && (parseInt(number) < 1 || parseInt(number) > 99)) {
      showToast('\u26A0\uFE0F', 'Il numero deve essere tra 1 e 99.');
      return;
    }
    if (_customizeKitType === 'full' && !sockSize) {
      showToast('\u26A0\uFE0F', 'Seleziona la taglia dei calzettoni!');
      return;
    }

    currentCustomization = { name, number, shortsNumber, sockSize };

    const badge = document.getElementById('qvCustomizeBadge');
    if (badge) badge.style.display = 'block';

    const parts = [];
    if (name) parts.push(name);
    if (number) parts.push('#' + number);
    if (shortsNumber) parts.push('N. pantaloncino');
    if (sockSize) parts.push('Calzettoni ' + sockSize);
    showToast('\u270F\uFE0F', 'Personalizzazione: ' + parts.join(' | '));
    closeCustomizeModal();
  });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  CATEGORY PAGE — Adidas-style full-screen shop view
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

let _catFilter  = 'all';
let _catTeam    = null;
let _catSort    = 'default';
let _catTabs    = [];  // [{label, filter}]
let _catBrand   = null; // filtro brand per la catPage
let _catLabel   = null; // filtro per tipo (es. "Scarpe da calcio", "Running")

/**
 * Apre la pagina categoria.
 * @param {string}   filter    — filtro categoria principale (es. 'Mondiale2026', 'vintage', 'SerieA')
 * @param {string}   title     — titolo della pagina (es. "MAGLIE DEL MONDIALE")
 * @param {string}   bcLabel   — label breadcrumb (es. "Mondiale 2026")
 * @param {Array}    tabs      — array di {label, filter} per i sub-tab, o [] per nessun tab
 * @param {string}   [team]    — squadra opzionale da pre-selezionare
 */
function openCatPage(filter, title, bcLabel, tabs, team, brand, label) {
  // Evita sovrapposizioni: chiudi gli altri pannelli aperti (carrello, preferiti, ricerca)
  closeCart();
  closeFavSidebar();
  closeMobSearch();
  _catFilter = filter;
  _catTeam   = team || null;
  _catSort   = 'default';
  _catTabs   = tabs || [];
  _catBrand  = brand || null;
  _catLabel  = label || null; // filtro per tipo (es. "Scarpe da calcio")

  // Titolo e breadcrumb
  document.getElementById('catPageTitle').textContent  = title;
  document.getElementById('catPageBcLabel').textContent = bcLabel;

  // Sub-tabs
  const tabsBar = document.getElementById('catPageTabsBar');
  const tabsEl  = document.getElementById('catPageTabs');
  if (_catTabs.length > 0) {
    tabsEl.innerHTML = _catTabs.map((t, i) =>
      `<button class="cat-page-tab${i === 0 ? ' active' : ''}" data-filter="${t.filter}" data-label="${t.label}">${t.label}</button>`
    ).join('');
    tabsBar.style.display = '';
    tabsEl.querySelectorAll('.cat-page-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        tabsEl.querySelectorAll('.cat-page-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        _catFilter = btn.dataset.filter;
        _catTeam   = null;
        _catBrand  = null; // i tab resettano il filtro brand
        _catLabel  = null; // i tab resettano anche il filtro tipo
        renderCatPage();
      });
    });
  } else {
    tabsBar.style.display = 'none';
    tabsEl.innerHTML = '';
  }

  // Reset sort
  _catSort = 'default';
  document.querySelectorAll('.cat-sort-item').forEach(i => {
    i.classList.toggle('active', i.dataset.sort === 'default');
  });

  renderCatPage();

  const overlay = document.getElementById('catPageOverlay');
  overlay.removeAttribute('aria-hidden');
  overlay.classList.add('open');
  // Scroll interno all'inizio
  overlay.scrollTop = 0;
  // Blocca scroll della pagina sottostante
  document.body.style.overflow = 'hidden';
  navPush();
}

function closeCatPage() {
  const overlay = document.getElementById('catPageOverlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  _catBrand = null; // reset brand filter alla chiusura
  _catLabel = null; // reset filtro tipo alla chiusura
}

function renderCatPage() {
  const grid = document.getElementById('catPageGrid');
  if (!grid) return;

  // Filtra prodotti
  let filtered = PRODUCTS.filter(p =>
    productMatchesCategory(p, _catFilter) &&
    productMatchesTeam(p, _catTeam) &&
    productMatchesBrand(p, _catBrand) &&
    productMatchesLabel(p, _catLabel)
  );

  // Ordina
  if (_catSort === 'price-asc')  filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (_catSort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);

  // Aggiorna contatori
  const countEl   = document.getElementById('catPageCount');
  const resultsEl = document.getElementById('catPageResults');
  const label     = `(${filtered.length})`;
  if (countEl)   countEl.textContent   = label;
  if (resultsEl) resultsEl.textContent = `${filtered.length} ${t('cat.prodotti')}`;

  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="cat-page-empty">
        <span class="cat-page-empty-icon">🔍</span>
        <p>${t('cat.nessunProdotto')}</p>
      </div>`;
    return;
  }

  filtered.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${i * 0.04}s`;
    card.dataset.id = p.id;
    card.onclick = () => openQuickView(p.id);
    const catLabel = Array.isArray(p.categoryLabel) ? p.categoryLabel[0] : p.categoryLabel;
    const fav = isFavorite(p.id);
    card.innerHTML = `
      <div class="card-img-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy"
             onerror="this.onerror=null;this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 3 4%22%3E%3Crect fill=%22%23f0f0f0%22 width=%223%22 height=%224%22/%3E%3Ctext x=%221.5%22 y=%222.2%22 fill=%22%23ccc%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-size=%221%22%3E%E2%9A%BD%3C/text%3E%3C/svg%3E'"
             style="width:100%;height:100%;object-fit:cover;display:block;">
        ${p.badge ? `<span class="card-badge ${p.badge}">${p.badgeLabel}</span>` : ''}
        <button class="card-fav-btn${fav ? ' active' : ''}" data-pid="${p.id}"
                onclick="event.stopPropagation();toggleFavorite(${p.id},this)"
                title="${fav ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}" aria-label="Preferiti">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="${fav ? '#e44545' : 'none'}"
               stroke="${fav ? '#e44545' : '#999'}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div class="card-info">
        <div class="card-category">${catLabel}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-price-row">
          <span class="card-price">&#x20AC;${p.price.toFixed(2)}</span>
          ${p.oldPrice ? `<span class="card-price-old">&#x20AC;${p.oldPrice.toFixed(2)}</span>` : ''}
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// â”€â”€ Setup category page (chiamato in DOMContentLoaded) â”€â”€
function setupCatPage() {
  // Pulsante Indietro
  document.getElementById('catPageBackBtn')?.addEventListener('click', closeCatPage);

  // Chiudi con ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeCatPage();
  });

  // Sort dropdown
  const sortWrap = document.getElementById('catSortWrap');
  const sortBtn  = document.getElementById('catSortBtn');
  sortBtn?.addEventListener('click', e => {
    e.stopPropagation();
    sortWrap.classList.toggle('open');
  });
  document.addEventListener('click', () => sortWrap?.classList.remove('open'));
  document.querySelectorAll('.cat-sort-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.cat-sort-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      _catSort = item.dataset.sort || 'default';
      sortWrap.classList.remove('open');
      renderCatPage();
    });
  });

  // â”€â”€ SEZIONE MONDIALI â”€â”€
  document.getElementById('mondialiSeeAll')?.addEventListener('click', () => {
    openCatPage(
      'Mondiale2026',
      'MAGLIE DEL MONDIALE',
      'Mondiale 2026',
      [
       { label: 'Tutte le nazionali', filter: 'Mondiale2026' },
      ]
    );
  });

  // â”€â”€ SEZIONE VINTAGE â”€â”€
  document.getElementById('vintageSeeAll')?.addEventListener('click', () => {
    openCatPage(
      'vintage',
      'MAGLIE VINTAGE',
      'Vintage',
      []
    );
  });

  // â”€â”€ SEZIONE MUST HAVE â”€â”€
  document.getElementById('mustHaveSeeAll')?.addEventListener('click', () => {
    openCatPage(
      'must',
      'MUST HAVE',
      'Must Have',
      [
        { label: 'Popolari', filter: 'Must'   },
      ]
    );
  });

  // â”€â”€ NAV MEGA MENU — bottoni lega nel pannello CALCIO â”€â”€
  const navLeagueMap = {
    navLeagueSerieA:    { filter: 'SerieA',      title: 'SERIE A',          bc: 'Serie A',        tabs: [] },
    navLeagueLaLiga:    { filter: 'LaLiga',       title: 'LA LIGA',          bc: 'La Liga',        tabs: [] },
    navLeagueBundesliga:{ filter: 'Bundesliga',   title: 'BUNDESLIGA',       bc: 'Bundesliga',     tabs: [] },
    navLeaguePremier:   { filter: 'Premier',      title: 'PREMIER LEAGUE',   bc: 'Premier League', tabs: [] },
    navLeagueChampions: { filter: 'Champions',    title: 'CHAMPIONS LEAGUE', bc: 'Champions League', tabs: [] },
    navLeagueSaudi:     { filter: 'SaudiLeague',  title: 'SAUDI PRO LEAGUE', bc: 'Saudi League',   tabs: [] },
    navLeagueMondiale2026: {
      filter: 'Mondiale2026',
      title: 'MONDIALE 2026',
      bc: 'Mondiale 2026',
      tabs: [
        { label: 'Tutte le nazionali', filter: 'Mondiale2026' },
        { label: 'Nazionali',          filter: 'Nazionali'    },
      ]
    },
    navLeagueNazionali: { filter: 'Nazionali',    title: 'NAZIONALI',        bc: 'Nazionali',      tabs: [] },
  };

  Object.entries(navLeagueMap).forEach(([id, cfg]) => {
    // Cerca TUTTI i bottoni con quell'id (ci possono essere duplicati nel mega menu)
    document.querySelectorAll(`[id="${id}"], [data-league="${cfg.filter}"]`).forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        openCatPage(cfg.filter, cfg.title, cfg.bc, cfg.tabs);
      });
    });
  });

  // â”€â”€ NAV tipo-maglia: Novità / Vintage â”€â”€
  document.querySelectorAll('[data-filter-type]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const t = btn.dataset.filterType;
      if (t === 'new') {
        openCatPage('new', 'NOVITÀ', 'Novità', []);
      } else if (t === 'vintage') {
        openCatPage('vintage', 'VINTAGE', 'Vintage', []);
      }
    });
  });
}

// â”€â”€ Aggiunge setupCatPage al DOMContentLoaded â”€â”€
document.addEventListener('DOMContentLoaded', setupCatPage);

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  INFO PAGES — Chi Siamo / Recensioni / Contatti / Custom
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

const _infoPageMap = {
  about:   'infoPageAbout',
  reviews: 'infoPageReviews',
  contact: 'infoPageContact',
  custom:  'infoPageCustom',
};
const _infoPageRafs = {};

function openInfoPage(key) {
  const id = _infoPageMap[key];
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  el.removeAttribute('aria-hidden');
  el.scrollTop = 0;
  // Force reflow before adding class so transition fires
  _infoPageRafs[key] = requestAnimationFrame(() => {
    el.classList.add('open');
    delete _infoPageRafs[key];
  });
  document.body.style.overflow = 'hidden';
  navPush();
}

function closeInfoPage(key) {
  const id = _infoPageMap[key];
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  // Se l'apertura era ancora in coda (rAF non ancora eseguito), annullala
  if (_infoPageRafs[key]) {
    cancelAnimationFrame(_infoPageRafs[key]);
    delete _infoPageRafs[key];
  }
  el.classList.remove('open');
  el.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Close info pages on ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    Object.keys(_infoPageMap).forEach(key => closeInfoPage(key));
  }
});

// ══════════════════════════════════════════════════════════
// SEZIONE SCARPE — Prodotti con category 'Scarpe'
// ══════════════════════════════════════════════════════════
function setupScarpeSection() {
  const grid     = document.getElementById('scarpeSecGrid');
  const viewport = document.getElementById('scarpeSecViewport');
  const track    = document.getElementById('scarpeSecTrack');
  const thumb    = document.getElementById('scarpeSecThumb');
  const seeAll   = document.getElementById('scarpeSectionSeeAll');

  if (grid) {
    const products = PRODUCTS.filter(function(p) {
      var cats = Array.isArray(p.category) ? p.category : [p.category];
      return cats.some(function(c) {
        return (c || '').toLowerCase().includes('scarpe') || (c || '').toLowerCase().includes('shoe');
      });
    }).slice(0, 12);

    if (products.length === 0) {
      grid.innerHTML = '<div class="vintage-empty">Nessuna scarpa disponibile al momento.</div>';
    } else {
      grid.innerHTML = '';
      products.forEach(function(p) {
        var catLabel = Array.isArray(p.categoryLabel) ? p.categoryLabel[0] : (p.categoryLabel || '');
        var card = document.createElement('div');
        card.className = 'vintage-card';
        card.onclick = function() { openQuickView(p.id); };
        var oldPriceHtml = p.oldPrice ? ' <span style="font-size:.82em;color:#aaa;font-weight:400;text-decoration:line-through;">&#8364;' + p.oldPrice.toFixed(2) + '</span>' : '';
        var badgeHtml = p.badgeLabel ? '<div class="vintage-card-tag">' + p.badgeLabel + '</div>' : '';
        card.innerHTML =
          '<div class="vintage-card-img-wrap">' +
            '<img class="vintage-card-img" src="' + p.image + '" alt="' + p.name + '" loading="lazy">' +
          '</div>' +
          badgeHtml +
          '<div class="vintage-card-name">' + p.name + '</div>' +
          '<div class="vintage-card-cat">' + catLabel + '</div>' +
          '<div class="vintage-card-price">&#8364;' + p.price.toFixed(2) + oldPriceHtml + '</div>';
        grid.appendChild(card);
      });
    }
  }

  if (seeAll) {
    seeAll.addEventListener('click', function() {
      openCatPage('Scarpe', 'SCARPE', 'Scarpe', []);
    });
  }

  if (!viewport || !track || !thumb) return;

  function updateThumb() {
    var scrollRatio = viewport.scrollLeft / (viewport.scrollWidth - viewport.clientWidth || 1);
    var thumbW = (viewport.clientWidth / viewport.scrollWidth) * 100;
    thumb.style.width = Math.max(thumbW, 10) + '%';
    thumb.style.left = scrollRatio * (100 - parseFloat(thumb.style.width)) + '%';
  }
  viewport.addEventListener('scroll', updateThumb, { passive: true });
  window.addEventListener('load', updateThumb);
  setTimeout(updateThumb, 400);

  track.addEventListener('click', function(e) {
    if (e.target === thumb) return;
    var rect = track.getBoundingClientRect();
    viewport.scrollLeft = ((e.clientX - rect.left) / rect.width) * (viewport.scrollWidth - viewport.clientWidth);
  });

  var dragging = false, dragStartX = 0, dragStartScroll = 0;
  thumb.addEventListener('pointerdown', function(e) {
    dragging = true; dragStartX = e.clientX; dragStartScroll = viewport.scrollLeft;
    thumb.setPointerCapture(e.pointerId); e.preventDefault();
  });
  thumb.addEventListener('pointermove', function(e) {
    if (!dragging) return;
    viewport.scrollLeft = dragStartScroll + ((e.clientX - dragStartX) / track.clientWidth) * (viewport.scrollWidth - viewport.clientWidth);
  });
  thumb.addEventListener('pointerup', function() { dragging = false; });
  thumb.addEventListener('pointercancel', function() { dragging = false; });
}

// ══════════════════════════════════════════════════════════
// SEZIONE ACCESSORI
// ══════════════════════════════════════════════════════════
function setupAccessoriSection() {
  var grid     = document.getElementById('accessoriSecGrid');
  var viewport = document.getElementById('accessoriSecViewport');
  var track    = document.getElementById('accessoriSecTrack');
  var thumb    = document.getElementById('accessoriSecThumb');
  var seeAll   = document.getElementById('accessoriSectionSeeAll');

  if (grid) {
    var products = PRODUCTS.filter(function(p) {
      var cats = Array.isArray(p.category) ? p.category : [p.category];
      return cats.some(function(c) { return (c || '').toLowerCase().includes('accessori'); });
    }).slice(0, 12);

    if (products.length === 0) {
      grid.innerHTML = '<div class="vintage-empty">Nessun accessorio disponibile al momento.</div>';
    } else {
      grid.innerHTML = '';
      products.forEach(function(p) {
        var catLabel = Array.isArray(p.categoryLabel) ? p.categoryLabel[0] : (p.categoryLabel || '');
        var card = document.createElement('div');
        card.className = 'vintage-card';
        card.onclick = function() { openQuickView(p.id); };
        var oldPriceHtml = p.oldPrice ? ' <span style="font-size:.82em;color:#aaa;font-weight:400;text-decoration:line-through;">&#8364;' + p.oldPrice.toFixed(2) + '</span>' : '';
        var badgeHtml = p.badgeLabel ? '<div class="vintage-card-tag">' + p.badgeLabel + '</div>' : '';
        card.innerHTML =
          '<div class="vintage-card-img-wrap">' +
            '<img class="vintage-card-img" src="' + p.image + '" alt="' + p.name + '" loading="lazy">' +
          '</div>' +
          badgeHtml +
          '<div class="vintage-card-name">' + p.name + '</div>' +
          '<div class="vintage-card-cat">' + catLabel + '</div>' +
          '<div class="vintage-card-price">&#8364;' + p.price.toFixed(2) + oldPriceHtml + '</div>';
        grid.appendChild(card);
      });
    }
  }

  if (seeAll) {
    seeAll.addEventListener('click', function() { openCatPage('Accessori', 'ACCESSORI', 'Accessori', []); });
  }

  if (!viewport || !track || !thumb) return;
  function updateThumbA() {
    var r = viewport.scrollLeft / (viewport.scrollWidth - viewport.clientWidth || 1);
    var w = (viewport.clientWidth / viewport.scrollWidth) * 100;
    thumb.style.width = Math.max(w, 10) + '%';
    thumb.style.left  = r * (100 - parseFloat(thumb.style.width)) + '%';
  }
  viewport.addEventListener('scroll', updateThumbA, { passive: true });
  window.addEventListener('load', updateThumbA);
  setTimeout(updateThumbA, 400);
  track.addEventListener('click', function(e) {
    if (e.target === thumb) return;
    viewport.scrollLeft = ((e.clientX - track.getBoundingClientRect().left) / track.clientWidth) * (viewport.scrollWidth - viewport.clientWidth);
  });
  var draggingA = false, dStartXA = 0, dStartScrollA = 0;
  thumb.addEventListener('pointerdown', function(e) { draggingA = true; dStartXA = e.clientX; dStartScrollA = viewport.scrollLeft; thumb.setPointerCapture(e.pointerId); e.preventDefault(); });
  thumb.addEventListener('pointermove', function(e) { if (!draggingA) return; viewport.scrollLeft = dStartScrollA + ((e.clientX - dStartXA) / track.clientWidth) * (viewport.scrollWidth - viewport.clientWidth); });
  thumb.addEventListener('pointerup', function() { draggingA = false; });
  thumb.addEventListener('pointercancel', function() { draggingA = false; });
}

// ══════════════════════════════════════════════════════════
// SEZIONE TUTE
// ══════════════════════════════════════════════════════════
function setupTuteSection() {
  var grid     = document.getElementById('tuteSecGrid');
  var viewport = document.getElementById('tuteSecViewport');
  var track    = document.getElementById('tuteSecTrack');
  var thumb    = document.getElementById('tuteSecThumb');
  var seeAll   = document.getElementById('tuteSectionSeeAll');

  if (grid) {
    var products = PRODUCTS.filter(function(p) {
      var cats = Array.isArray(p.category) ? p.category : [p.category];
      return cats.some(function(c) { return (c || '').toLowerCase().includes('tute') || (c || '').toLowerCase().includes('tuta'); });
    }).slice(0, 12);

    if (products.length === 0) {
      grid.innerHTML = '<div class="vintage-empty">Nessuna tuta disponibile al momento.</div>';
    } else {
      grid.innerHTML = '';
      products.forEach(function(p) {
        var catLabel = Array.isArray(p.categoryLabel) ? p.categoryLabel[0] : (p.categoryLabel || '');
        var card = document.createElement('div');
        card.className = 'vintage-card';
        card.onclick = function() { openQuickView(p.id); };
        var oldPriceHtml = p.oldPrice ? ' <span style="font-size:.82em;color:#aaa;font-weight:400;text-decoration:line-through;">&#8364;' + p.oldPrice.toFixed(2) + '</span>' : '';
        var badgeHtml = p.badgeLabel ? '<div class="vintage-card-tag">' + p.badgeLabel + '</div>' : '';
        card.innerHTML =
          '<div class="vintage-card-img-wrap">' +
            '<img class="vintage-card-img" src="' + p.image + '" alt="' + p.name + '" loading="lazy">' +
          '</div>' +
          badgeHtml +
          '<div class="vintage-card-name">' + p.name + '</div>' +
          '<div class="vintage-card-cat">' + catLabel + '</div>' +
          '<div class="vintage-card-price">&#8364;' + p.price.toFixed(2) + oldPriceHtml + '</div>';
        grid.appendChild(card);
      });
    }
  }

  if (seeAll) {
    seeAll.addEventListener('click', function() { openCatPage('Tute', 'TUTE', 'Tute', []); });
  }

  if (!viewport || !track || !thumb) return;
  function updateThumbT() {
    var r = viewport.scrollLeft / (viewport.scrollWidth - viewport.clientWidth || 1);
    var w = (viewport.clientWidth / viewport.scrollWidth) * 100;
    thumb.style.width = Math.max(w, 10) + '%';
    thumb.style.left  = r * (100 - parseFloat(thumb.style.width)) + '%';
  }
  viewport.addEventListener('scroll', updateThumbT, { passive: true });
  window.addEventListener('load', updateThumbT);
  setTimeout(updateThumbT, 400);
  track.addEventListener('click', function(e) {
    if (e.target === thumb) return;
    viewport.scrollLeft = ((e.clientX - track.getBoundingClientRect().left) / track.clientWidth) * (viewport.scrollWidth - viewport.clientWidth);
  });
  var draggingT = false, dStartXT = 0, dStartScrollT = 0;
  thumb.addEventListener('pointerdown', function(e) { draggingT = true; dStartXT = e.clientX; dStartScrollT = viewport.scrollLeft; thumb.setPointerCapture(e.pointerId); e.preventDefault(); });
  thumb.addEventListener('pointermove', function(e) { if (!draggingT) return; viewport.scrollLeft = dStartScrollT + ((e.clientX - dStartXT) / track.clientWidth) * (viewport.scrollWidth - viewport.clientWidth); });
  thumb.addEventListener('pointerup', function() { draggingT = false; });
  thumb.addEventListener('pointercancel', function() { draggingT = false; });
}

// ── CLICK HANDLER MOBILE — Compatibile iOS Safari / Android Chrome ──
// Puro fallback di event delegation: le card renderizzate hanno già un handler
// diretto (card.onclick / onclick inline). Qui gestiamo SOLO le card che non
// hanno un handler proprio (es. .product-card della categoria page, che ha solo
// data-id), evitando di aprire la quick view due volte.
const handleProductClick = (e) => {
  // Ignora pulsanti interni (preferiti, carrello, ecc.)
  if (e.target.closest('button, .card-fav-btn, .btn-fav, .btn-cart')) return;

  const card = e.target.closest(
    '.product-card, .vintage-card, .mustHave-card, .mondiali-card'
  );
  if (!card) return;

  // Se il target (o la card) ha già un onclick inline/diretto, non duplicare
  const inlineTarget = e.target.getAttribute && e.target.getAttribute('onclick');
  if (inlineTarget || card.onclick || card.getAttribute('onclick')) return;

  const productId = card.dataset.id;
  if (productId && typeof openQuickView === 'function') {
    e.preventDefault();
    openQuickView(parseInt(productId, 10));
  }
};

// Fallback: il click arriva qui via event delegation (desktop e mobile)
document.addEventListener('click', handleProductClick);
