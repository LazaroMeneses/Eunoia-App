import { useState, useEffect } from 'react';
import QuoteCard from './components/QuoteCard';
import BottomNav from './components/BottomNav';
import { Sparkles, TrendingUp, BookOpen, Zap, Bell, Moon, Sun, Globe, Volume2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const quotes = [
  { text: "Sólo sé que no sé nada", author: "Sócrates" },
  { text: "El hombre es la medida de todas las cosas", author: "Protágoras" },
  { text: "Pienso, luego existo", author: "René Descartes" },
  { text: "La vida no examinada no merece ser vivida", author: "Sócrates" },
  { text: "El ser humano está condenado a ser libre", author: "Jean-Paul Sartre" },
  { text: "Conviértete en quien eres", author: "Friedrich Nietzsche" },
  { text: "La felicidad depende de nosotros mismos", author: "Aristóteles" },
  { text: "Todo fluye, nada permanece", author: "Heráclito" },
  { text: "El silencio es el lenguaje de Dios, todo lo demás es mala traducción", author: "Rumi" },
  { text: "Nadie se baña dos veces en el mismo río", author: "Heráclito" },
  { text: "La muerte no es nada para nosotros, pues cuando existimos, la muerte no está presente", author: "Epicuro" },
  { text: "El hombre es un lobo para el hombre", author: "Thomas Hobbes" },
  { text: "Conocerse a uno mismo es el principio de toda sabiduría", author: "Aristóteles" },
  { text: "La duda es el principio de la sabiduría", author: "Aristóteles" },
  { text: "No hay nada permanente excepto el cambio", author: "Heráclito" },
  { text: "El que tiene un porqué para vivir puede soportar casi cualquier cómo", author: "Friedrich Nietzsche" },
  { text: "La única verdadera sabiduría está en saber que no sabes nada", author: "Sócrates" },
  { text: "El hombre nace libre, pero en todos lados está encadenado", author: "Jean-Jacques Rousseau" },
  { text: "La verdad es aquello que resiste la prueba de la experiencia", author: "Albert Einstein" },
  { text: "El absurdo nace de la confrontación entre el llamado humano y el silencio irracional del mundo", author: "Albert Camus" },
  { text: "No buscamos la felicidad, buscamos ser felices", author: "Aristóteles" },
  { text: "La libertad no es algo que se da, es algo que se toma", author: "Jean-Paul Sartre" },
  { text: "Quien mira afuera, sueña. Quien mira adentro, despierta", author: "Carl Jung" },
  { text: "La razón es esclava de las pasiones", author: "David Hume" },
  { text: "El infierno son los otros", author: "Jean-Paul Sartre" },
  { text: "Dios ha muerto y nosotros lo hemos matado", author: "Friedrich Nietzsche" },
  { text: "La existencia precede a la esencia", author: "Jean-Paul Sartre" },
  { text: "Hay una sola pregunta filosófica verdaderamente seria: el suicidio", author: "Albert Camus" },
  { text: "El que lucha con monstruos debe tener cuidado de no convertirse en monstruo", author: "Friedrich Nietzsche" },
  { text: "La esperanza es un veneno", author: "Friedrich Nietzsche" },
  { text: "Lo que no me mata me hace más fuerte", author: "Friedrich Nietzsche" },
  { text: "El placer es el principio y fin de la vida feliz", author: "Epicuro" },
  { text: "La virtud está en el término medio", author: "Aristóteles" },
  { text: "No es lo que nos ocurre, sino nuestra respuesta lo que nos hace daño", author: "Epicteto" },
  { text: "La fortuna favorece a la mente preparada", author: "Louis Pasteur" },
  { text: "El tiempo es la imagen móvil de la eternidad", author: "Platón" },
  { text: "La justicia consiste en dar a cada uno lo que le corresponde", author: "Platón" },
  { text: "El sabio no dice todo lo que piensa, pero siempre piensa todo lo que dice", author: "Aristóteles" },
  { text: "La belleza es el resplandor de la verdad", author: "Platón" },
  { text: "El hombre prudente no busca el placer, sino la ausencia del dolor", author: "Aristóteles" },
  { text: "Aprender sin pensar es inútil. Pensar sin aprender, peligroso", author: "Confucio" },
  { text: "El ignorante afirma, el sabio duda y reflexiona", author: "Aristóteles" },
  { text: "No hay viento favorable para el que no sabe a dónde va", author: "Séneca" },
  { text: "La paciencia es amarga, pero su fruto es dulce", author: "Jean-Jacques Rousseau" },
  { text: "El camino más largo comienza con un solo paso", author: "Lao Tzu" },
  { text: "Cuando te das cuenta de que nada falta, el mundo entero te pertenece", author: "Lao Tzu" },
  { text: "El hombre superior es modesto en su discurso, pero abundante en sus acciones", author: "Confucio" },
  { text: "El silencio es un argumento difícil de refutar", author: "Henry Wheeler Shaw" },
  { text: "La palabra es plata, el silencio es oro", author: "Proverbio" },
  { text: "El ser es, el no ser no es", author: "Parménides" },
  { text: "Todo está lleno de almas", author: "Tales de Mileto" },
  { text: "El principio de todas las cosas es el agua", author: "Tales de Mileto" },
  { text: "El número es la esencia de todas las cosas", author: "Pitágoras" },
  { text: "La armonía invisible es mayor que la armonía visible", author: "Heráclito" },
  { text: "Los mortales son inmortales, los inmortales son mortales", author: "Heráclito" },
  { text: "El alma es un logos que se incrementa a sí mismo", author: "Heráclito" },
  { text: "La guerra es el padre de todas las cosas", author: "Heráclito" },
  { text: "El mal nace de la ignorancia", author: "Sócrates" },
  { text: "Una vida sin examen no merece la pena ser vivida", author: "Sócrates" },
  { text: "El alma humana es inmortal", author: "Platón" },
  { text: "La realidad es una proyección de las ideas", author: "Platón" },
  { text: "El mundo sensible es una sombra del mundo de las ideas", author: "Platón" },
  { text: "La filosofía es la preparación para la muerte", author: "Platón" },
  { text: "El cuerpo es la cárcel del alma", author: "Platón" },
  { text: "Buscamos la verdad no en las cosas, sino en nuestra alma", author: "Platón" },
  { text: "La excelencia moral es el resultado del hábito", author: "Aristóteles" },
  { text: "Somos lo que hacemos repetidamente", author: "Aristóteles" },
  { text: "El todo es más que la suma de sus partes", author: "Aristóteles" },
  { text: "La naturaleza no hace nada en vano", author: "Aristóteles" },
  { text: "El hombre es por naturaleza un animal político", author: "Aristóteles" },
  { text: "La amistad es un alma que habita en dos cuerpos", author: "Aristóteles" },
  { text: "Educar la mente sin educar el corazón no es educar en absoluto", author: "Aristóteles" },
  { text: "La esperanza es el sueño del hombre despierto", author: "Aristóteles" },
  { text: "No hay que temer nada en la vida, solo comprender", author: "Marie Curie" },
  { text: "La libertad significa responsabilidad", author: "George Bernard Shaw" },
  { text: "El hombre es el único animal que tropieza dos veces con la misma piedra", author: "Proverbio" },
  { text: "La memoria es el diario que todos llevamos con nosotros", author: "Oscar Wilde" },
  { text: "Ser o no ser, esa es la cuestión", author: "William Shakespeare" },
  { text: "La imaginación es más importante que el conocimiento", author: "Albert Einstein" },
  { text: "En medio de la dificultad yace la oportunidad", author: "Albert Einstein" },
  { text: "La vida es lo que pasa mientras estás ocupado haciendo otros planes", author: "John Lennon" },
  { text: "El miedo es el camino hacia el lado oscuro", author: "Yoda" },
  { text: "La única manera de hacer un gran trabajo es amar lo que haces", author: "Steve Jobs" },
  { text: "No cuentes los días, haz que los días cuenten", author: "Muhammad Ali" },
  { text: "La acción es la clave fundamental de todo éxito", author: "Pablo Picasso" },
  { text: "La creatividad es la inteligencia divirtiéndose", author: "Albert Einstein" },
  { text: "El hombre sabio querrá estar siempre con quien sea mejor que él", author: "Platón" },
  { text: "La medida del amor es amar sin medida", author: "San Agustín" },
  { text: "No temas a la grandeza; algunos nacen grandes, algunos logran grandeza", author: "William Shakespeare" },
  { text: "El hombre libre es aquel que no teme ir al final de su pensamiento", author: "León Blum" },
  { text: "La vida es muy peligrosa. No por las personas que hacen el mal, sino por las que se sientan a ver lo que pasa", author: "Albert Einstein" },
  { text: "El primer paso hacia la filosofía es la incredulidad", author: "Denis Diderot" },
  { text: "El sabio puede cambiar de opinión. El necio, nunca", author: "Immanuel Kant" },
  { text: "La mente es su propio lugar, y en sí misma puede hacer un cielo del infierno, un infierno del cielo", author: "John Milton" },
  { text: "No podemos resolver problemas usando el mismo tipo de pensamiento que usamos cuando los creamos", author: "Albert Einstein" },
  { text: "La única cosa necesaria para el triunfo del mal es que los hombres buenos no hagan nada", author: "Edmund Burke" },
  { text: "Donde hay educación no hay distinción de clases", author: "Confucio" },
  { text: "El miedo siempre está dispuesto a ver las cosas peor de lo que son", author: "Tito Livio" },
  { text: "La verdadera sabiduría está en reconocer la propia ignorancia", author: "Sócrates" },
  { text: "El hombre es mortal por sus temores e inmortal por sus deseos", author: "Pitágoras" },
  { text: "La música es la aritmética del alma que cuenta sin darse cuenta", author: "Gottfried Leibniz" },
  { text: "El lenguaje es la casa del ser", author: "Martin Heidegger" },
  { text: "La historia no es más que una sucesión de falsos problemas", author: "Henri Bergson" },
  { text: "El poder corrompe y el poder absoluto corrompe absolutamente", author: "Lord Acton" },
  { text: "Actúa de tal modo que la máxima de tu voluntad pueda ser siempre válida como principio de legislación universal", author: "Immanuel Kant" },
  { text: "No existe el destino. Somos arquitectos de nuestro propio destino", author: "Karl Marx" },
  { text: "La ciencia sin religión está coja, la religión sin ciencia está ciega", author: "Albert Einstein" },
  { text: "El que no conoce la historia está condenado a repetirla", author: "George Santayana" },
  { text: "La conciencia es la voz del alma, las pasiones son la voz del cuerpo", author: "Jean-Jacques Rousseau" },
  { text: "La verdad os hará libres", author: "Jesús de Nazaret" },
  { text: "Nunca consideres el estudio como una obligación sino como una oportunidad", author: "Albert Einstein" },
  { text: "El secreto de la existencia humana no solo está en vivir, sino también en saber para qué se vive", author: "Fyodor Dostoevsky" },
  { text: "Solo hay felicidad donde hay virtud y esfuerzo serio", author: "Aristóteles" },
  { text: "El único modo de fortalecernos es mediante el sufrimiento", author: "Friedrich Nietzsche" },
  { text: "La envidia es la religión de los mediocres", author: "José Ortega y Gasset" },
  { text: "El arte es la mentira que nos permite comprender la verdad", author: "Pablo Picasso" },
  { text: "La duda es uno de los nombres de la inteligencia", author: "Jorge Luis Borges" },
  { text: "La soledad es el imperio de la conciencia", author: "Gustave Thibon" },
  { text: "Hay dos maneras de difundir la luz: ser la lámpara que la emite o el espejo que la refleja", author: "Edith Wharton" },
  { text: "El valor no es la ausencia de miedo, sino la capacidad de actuar a pesar del miedo", author: "Mark Twain" },
  { text: "La mente intuitiva es un regalo sagrado y la mente racional es un fiel sirviente", author: "Albert Einstein" },
  { text: "No hay nada noble en ser superior a tu prójimo; la verdadera nobleza es ser superior a tu antiguo yo", author: "Ernest Hemingway" },
  { text: "Las masas humanas más peligrosas son aquellas en cuyas venas ha sido inyectado el veneno del miedo", author: "Octavio Paz" },
  { text: "El amor es la fuerza más humilde, pero la más poderosa de que dispone el ser humano", author: "Mahatma Gandhi" },
  { text: "La educación es el arma más poderosa que puedes usar para cambiar el mundo", author: "Nelson Mandela" },
  { text: "Si juzgas a las personas, no tienes tiempo para amarlas", author: "Madre Teresa de Calcuta" },
  { text: "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito", author: "Albert Schweitzer" },
  { text: "No hay caminos para la paz; la paz es el camino", author: "Mahatma Gandhi" },
  { text: "La injusticia en cualquier lugar es una amenaza a la justicia en todas partes", author: "Martin Luther King Jr." },
  { text: "Nuestra mayor gloria no está en no caer nunca, sino en levantarnos cada vez que caemos", author: "Confucio" },
  { text: "La mejor venganza es no ser como tu enemigo", author: "Marco Aurelio" },
  { text: "Tienes poder sobre tu mente, no sobre los acontecimientos externos. Date cuenta de esto, y encontrarás fortaleza", author: "Marco Aurelio" },
  { text: "Si no está en tus manos cambiar una situación que te produce dolor, siempre podrás escoger la actitud con la que afrontes ese sufrimiento", author: "Viktor Frankl" },
  { text: "La única forma de lidiar con un mundo sin libertad es volverse tan absolutamente libre que tu propia existencia sea un acto de rebelión", author: "Albert Camus" },
  { text: "La verdad nunca daña a una causa justa", author: "Mahatma Gandhi" },
  { text: "El conocimiento habla, pero la sabiduría escucha", author: "Jimi Hendrix" },
  { text: "La mayor declaración de amor es la que no se hace; el hombre que siente mucho, habla poco", author: "Platón" },
  { text: "El hombre que mueve montañas comienza apartando pequeñas piedras", author: "Confucio" },
  { text: "La paciencia es la compañera de la sabiduría", author: "San Agustín" },
  { text: "Elige un trabajo que te guste y no tendrás que trabajar ni un día de tu vida", author: "Confucio" },
  { text: "El silencio del envidioso está lleno de ruidos", author: "Khalil Gibran" },
  { text: "El pesimista se queja del viento; el optimista espera que cambie; el realista ajusta las velas", author: "William George Ward" },
  { text: "La felicidad no es hacer lo que uno quiere sino querer lo que uno hace", author: "Jean-Paul Sartre" },
  { text: "El hombre está condenado a ser libre", author: "Jean-Paul Sartre" },
  { text: "La vida es aquello que te va sucediendo mientras te empeñas en hacer otros planes", author: "John Lennon" },
  { text: "Lo importante no es lo que han hecho de nosotros, sino lo que hacemos con lo que han hecho de nosotros", author: "Jean-Paul Sartre" },
  { text: "El hombre es el único ser que se niega a ser lo que es", author: "Albert Camus" },
  { text: "Hay que imaginar a Sísifo feliz", author: "Albert Camus" },
  { text: "Vivir es sufrir, sobrevivir es encontrarle sentido al sufrimiento", author: "Friedrich Nietzsche" },
  { text: "Sin música la vida sería un error", author: "Friedrich Nietzsche" },
  { text: "Quien tiene un porqué para vivir, encontrará casi siempre el cómo", author: "Friedrich Nietzsche" },
  { text: "El destino baraja las cartas y nosotros las jugamos", author: "Arthur Schopenhauer" },
  { text: "La compasión por los animales está íntimamente ligada con la bondad de carácter", author: "Arthur Schopenhauer" },
  { text: "El talento alcanza un objetivo que nadie más puede alcanzar; el genio alcanza un objetivo que nadie más puede ver", author: "Arthur Schopenhauer" },
  { text: "El yo no es el amo en su propia casa", author: "Sigmund Freud" },
  { text: "Un día sin una sonrisa es un día perdido", author: "Charlie Chaplin" },
  { text: "La inteligencia consiste no solo en el conocimiento, sino también en la destreza de aplicar los conocimientos en la práctica", author: "Aristóteles" },
  { text: "El ignorante afirma, el sabio duda y reflexiona", author: "Aristóteles" },
  { text: "La excelencia no es un acto, sino un hábito", author: "Aristóteles" },
  { text: "Cualquiera puede enfadarse, eso es algo muy sencillo. Pero enfadarse con la persona adecuada, en el grado exacto, en el momento oportuno, con el propósito justo y del modo correcto, eso, ciertamente, no resulta tan sencillo", author: "Aristóteles" },
  { text: "El hombre libre es aquel que, teniendo fuerza y talento para hacer una cosa, no encuentra impedimentos a su voluntad", author: "Thomas Hobbes" },
  { text: "La lectura hace al hombre completo; la conversación, ágil, y el escribir, preciso", author: "Francis Bacon" },
  { text: "Saber que se sabe lo que se sabe y que no se sabe lo que no se sabe; he aquí el verdadero saber", author: "Confucio" },
  { text: "Exígete mucho a ti mismo y espera poco de los demás. Así te ahorrarás disgustos", author: "Confucio" },
  { text: "Cuando veas a un hombre bueno, trata de imitarlo; cuando veas a un hombre malo, reflexiona", author: "Confucio" },
  { text: "El que domina a los otros es fuerte; el que se domina a sí mismo es verdaderamente poderoso", author: "Lao Tzu" },
  { text: "Un viaje de mil millas comienza con un primer paso", author: "Lao Tzu" },
  { text: "Saber que no sabes es lo mejor. Pretender saber cuando no sabes es una enfermedad", author: "Lao Tzu" },
  { text: "Si das pescado a un hombre hambriento lo nutres durante una jornada. Si le enseñas a pescar, le nutrirás toda su vida", author: "Lao Tzu" },
  { text: "La naturaleza hace que los hombres nos parezcamos unos a otros y nos juntemos; la educación hace que seamos diferentes y que nos alejemos", author: "Confucio" },
  { text: "No importa lo ocupado que pienses que estás, debes encontrar tiempo para leer, o entregarte a una ignorancia autoelegida", author: "Confucio" },
  { text: "Tres cosas no pueden ser escondidas por mucho tiempo: el sol, la luna y la verdad", author: "Buda" },
  { text: "No hay camino hacia la felicidad, la felicidad es el camino", author: "Buda" },
  { text: "El dolor es inevitable pero el sufrimiento es opcional", author: "Buda" },
  { text: "Todo lo que somos es el resultado de lo que hemos pensado", author: "Buda" },
  { text: "No te detengas en el pasado, no sueñes con el futuro, concentra la mente en el momento presente", author: "Buda" },
  { text: "Somos lo que pensamos. Todo lo que somos surge con nuestros pensamientos. Con nuestros pensamientos, hacemos el mundo", author: "Buda" },
  { text: "La salud es la mayor posesión. La alegría es el mayor tesoro. La confianza es el mayor amigo", author: "Lao Tzu" },
  { text: "El que sabe no habla, el que habla no sabe", author: "Lao Tzu" },
  { text: "La simplicidad es la máxima sofisticación", author: "Leonardo da Vinci" },
  { text: "He aprendido que el coraje no es la ausencia de miedo, sino el triunfo sobre él", author: "Nelson Mandela" },
  { text: "La mayor gloria no es nunca caer, sino levantarse siempre", author: "Nelson Mandela" },
  { text: "Sé tú mismo; los demás puestos ya están ocupados", author: "Oscar Wilde" },
  { text: "Vivir es lo más raro del mundo. La mayoría de la gente solo existe", author: "Oscar Wilde" },
  { text: "Podemos perdonar fácilmente a un niño que tiene miedo de la oscuridad; la verdadera tragedia de la vida es cuando los hombres tienen miedo de la luz", author: "Platón" },
  { text: "La opinión es el medio entre el conocimiento y la ignorancia", author: "Platón" },
  { text: "El precio de la grandeza es la responsabilidad", author: "Winston Churchill" },
  { text: "El éxito consiste en ir de fracaso en fracaso sin pérdida de entusiasmo", author: "Winston Churchill" },
  { text: "No juzgues cada día por la cosecha que recoges, sino por las semillas que plantas", author: "Robert Louis Stevenson" },
  { text: "La vida no se trata de encontrarte a ti mismo, sino de crearte a ti mismo", author: "George Bernard Shaw" },
  { text: "La gente razonable se adapta al mundo; la gente irrazonable intenta adaptar el mundo a ella. Por lo tanto, todo progreso depende de la gente irrazonable", author: "George Bernard Shaw" },
  { text: "No hay nada más difícil de llevar, ni más peligroso de manejar, ni más incierto en su éxito, que tomar la delantera en la introducción de un nuevo orden de cosas", author: "Nicolás Maquiavelo" },
  { text: "Es mejor ser temido que amado, si no puedes ser ambos", author: "Nicolás Maquiavelo" },
  { text: "Los fines justifican los medios", author: "Nicolás Maquiavelo" },
  { text: "El hombre prudente debe comportarse como esos arqueros expertos que, conociendo el alcance de su arco, apuntan mucho más alto que el objetivo que quieren dar", author: "Nicolás Maquiavelo" },
];

const categories = [
  { name: 'Existencialismo', color: 'from-purple-500 to-pink-500', count: 24, icon: Zap },
  { name: 'Metafísica', color: 'from-blue-500 to-cyan-500', count: 18, icon: Sparkles },
  { name: 'Ética', color: 'from-orange-500 to-red-500', count: 15, icon: BookOpen },
  { name: 'Epistemología', color: 'from-green-500 to-teal-500', count: 21, icon: TrendingUp },
  { name: 'Estoicismo', color: 'from-indigo-500 to-purple-500', count: 12, icon: Sparkles },
  { name: 'Lógica', color: 'from-pink-500 to-rose-500', count: 19, icon: BookOpen },
];

const translations = {
  es: {
    home: 'Inicio',
    favorites: 'Favoritos',
    categories: 'Categorías',
    settings: 'Ajustes',
    thoughtOfDay: 'Pensamiento del Día',
    reflectPhilosophers: 'Reflexiona con los grandes filósofos',
    myFavorites: 'Mis Favoritos',
    noFavorites: 'No tienes frases favoritas aún',
    tapHeart: 'Toca el corazón para guardar tus frases favoritas',
    configuration: 'Configuración',
    appearance: 'Apariencia',
    darkMode: 'Modo oscuro',
    language: 'Idioma',
    notifications: 'Notificaciones',
    dailyQuote: 'Frase diaria',
    sounds: 'Sonidos',
    statistics: 'Estadísticas',
    favoritePhrases: 'Frases favoritas',
    reflectionDays: 'Días de reflexión',
    quotes: 'frases',
  },
  en: {
    home: 'Home',
    favorites: 'Favorites',
    categories: 'Categories',
    settings: 'Settings',
    thoughtOfDay: 'Thought of the Day',
    reflectPhilosophers: 'Reflect with the great philosophers',
    myFavorites: 'My Favorites',
    noFavorites: 'You have no favorite quotes yet',
    tapHeart: 'Tap the heart to save your favorite quotes',
    configuration: 'Settings',
    appearance: 'Appearance',
    darkMode: 'Dark mode',
    language: 'Language',
    notifications: 'Notifications',
    dailyQuote: 'Daily quote',
    sounds: 'Sounds',
    statistics: 'Statistics',
    favoritePhrases: 'Favorite phrases',
    reflectionDays: 'Reflection days',
    quotes: 'quotes',
  },
  zh: {
    home: '首页',
    favorites: '收藏',
    categories: '分类',
    settings: '设置',
    thoughtOfDay: '每日思想',
    reflectPhilosophers: '与伟大的哲学家一起反思',
    myFavorites: '我的收藏',
    noFavorites: '您还没有收藏的名言',
    tapHeart: '点击心形图标保存您喜欢的名言',
    configuration: '配置',
    appearance: '外观',
    darkMode: '深色模式',
    language: '语言',
    notifications: '通知',
    dailyQuote: '每日名言',
    sounds: '声音',
    statistics: '统计',
    favoritePhrases: '收藏的名言',
    reflectionDays: '反思天数',
    quotes: '名言',
  },
  hi: {
    home: 'होम',
    favorites: 'पसंदीदा',
    categories: 'श्रेणियाँ',
    settings: 'सेटिंग्स',
    thoughtOfDay: 'आज का विचार',
    reflectPhilosophers: 'महान दार्शनिकों के साथ विचार करें',
    myFavorites: 'मेरे पसंदीदा',
    noFavorites: 'आपके पास अभी तक कोई पसंदीदा उद्धरण नहीं है',
    tapHeart: 'अपने पसंदीदा उद्धरण सहेजने के लिए हृदय पर टैप करें',
    configuration: 'कॉन्फ़िगरेशन',
    appearance: 'दिखावट',
    darkMode: 'डार्क मोड',
    language: 'भाषा',
    notifications: 'सूचनाएं',
    dailyQuote: 'दैनिक उद्धरण',
    sounds: 'ध्वनियाँ',
    statistics: 'आंकड़े',
    favoritePhrases: 'पसंदीदा वाक्यांश',
    reflectionDays: 'चिंतन दिवस',
    quotes: 'उद्धरण',
  },
  ar: {
    home: 'الرئيسية',
    favorites: 'المفضلة',
    categories: 'الفئات',
    settings: 'الإعدادات',
    thoughtOfDay: 'فكرة اليوم',
    reflectPhilosophers: 'تأمل مع الفلاسفة العظماء',
    myFavorites: 'مفضلاتي',
    noFavorites: 'ليس لديك اقتباسات مفضلة بعد',
    tapHeart: 'انقر على القلب لحفظ اقتباساتك المفضلة',
    configuration: 'التكوين',
    appearance: 'المظهر',
    darkMode: 'الوضع الداكن',
    language: 'اللغة',
    notifications: 'الإشعارات',
    dailyQuote: 'الاقتباس اليومي',
    sounds: 'الأصوات',
    statistics: 'الإحصائيات',
    favoritePhrases: 'العبارات المفضلة',
    reflectionDays: 'أيام التأمل',
    quotes: 'اقتباسات',
  },
  pt: {
    home: 'Início',
    favorites: 'Favoritos',
    categories: 'Categorias',
    settings: 'Configurações',
    thoughtOfDay: 'Pensamento do Dia',
    reflectPhilosophers: 'Reflita com os grandes filósofos',
    myFavorites: 'Meus Favoritos',
    noFavorites: 'Você ainda não tem citações favoritas',
    tapHeart: 'Toque no coração para salvar suas citações favoritas',
    configuration: 'Configuração',
    appearance: 'Aparência',
    darkMode: 'Modo escuro',
    language: 'Idioma',
    notifications: 'Notificações',
    dailyQuote: 'Citação diária',
    sounds: 'Sons',
    statistics: 'Estatísticas',
    favoritePhrases: 'Frases favoritas',
    reflectionDays: 'Dias de reflexão',
    quotes: 'citações',
  },
  bn: {
    home: 'হোম',
    favorites: 'প্রিয়',
    categories: 'বিভাগ',
    settings: 'সেটিংস',
    thoughtOfDay: 'আজকের চিন্তা',
    reflectPhilosophers: 'মহান দার্শনিকদের সাথে চিন্তা করুন',
    myFavorites: 'আমার প্রিয়',
    noFavorites: 'আপনার এখনও কোন প্রিয় উক্তি নেই',
    tapHeart: 'আপনার প্রিয় উক্তি সংরক্ষণ করতে হৃদয়ে ট্যাপ করুন',
    configuration: 'কনফিগারেশন',
    appearance: 'চেহারা',
    darkMode: 'ডার্ক মোড',
    language: 'ভাষা',
    notifications: 'বিজ্ঞপ্তি',
    dailyQuote: 'দৈনিক উক্তি',
    sounds: 'শব্দ',
    statistics: 'পরিসংখ্যান',
    favoritePhrases: 'প্রিয় বাক্যাংশ',
    reflectionDays: 'প্রতিফলন দিন',
    quotes: 'উক্তি',
  },
  ru: {
    home: 'Главная',
    favorites: 'Избранное',
    categories: 'Категории',
    settings: 'Настройки',
    thoughtOfDay: 'Мысль дня',
    reflectPhilosophers: 'Размышляйте с великими философами',
    myFavorites: 'Мои избранные',
    noFavorites: 'У вас пока нет избранных цитат',
    tapHeart: 'Нажмите на сердце, чтобы сохранить избранные цитаты',
    configuration: 'Конфигурация',
    appearance: 'Внешний вид',
    darkMode: 'Темный режим',
    language: 'Язык',
    notifications: 'Уведомления',
    dailyQuote: 'Ежедневная цитата',
    sounds: 'Звуки',
    statistics: 'Статистика',
    favoritePhrases: 'Избранные фразы',
    reflectionDays: 'Дни размышлений',
    quotes: 'цитаты',
  },
  ja: {
    home: 'ホーム',
    favorites: 'お気に入り',
    categories: 'カテゴリー',
    settings: '設定',
    thoughtOfDay: '今日の思考',
    reflectPhilosophers: '偉大な哲学者と共に考える',
    myFavorites: 'お気に入り',
    noFavorites: 'まだお気に入りの引用はありません',
    tapHeart: 'ハートをタップしてお気に入りの引用を保存',
    configuration: '設定',
    appearance: '外観',
    darkMode: 'ダークモード',
    language: '言語',
    notifications: '通知',
    dailyQuote: '毎日の引用',
    sounds: 'サウンド',
    statistics: '統計',
    favoritePhrases: 'お気に入りのフレーズ',
    reflectionDays: '反省の日々',
    quotes: '引用',
  },
  fr: {
    home: 'Accueil',
    favorites: 'Favoris',
    categories: 'Catégories',
    settings: 'Paramètres',
    thoughtOfDay: 'Pensée du jour',
    reflectPhilosophers: 'Réfléchissez avec les grands philosophes',
    myFavorites: 'Mes favoris',
    noFavorites: "Vous n'avez pas encore de citations favorites",
    tapHeart: 'Appuyez sur le cœur pour enregistrer vos citations favorites',
    configuration: 'Configuration',
    appearance: 'Apparence',
    darkMode: 'Mode sombre',
    language: 'Langue',
    notifications: 'Notifications',
    dailyQuote: 'Citation quotidienne',
    sounds: 'Sons',
    statistics: 'Statistiques',
    favoritePhrases: 'Phrases favorites',
    reflectionDays: 'Jours de réflexion',
    quotes: 'citations',
  },
};

const languageNames = {
  es: 'Español',
  en: 'English',
  zh: '中文',
  hi: 'हिन्दी',
  ar: 'العربية',
  pt: 'Português',
  bn: 'বাংলা',
  ru: 'Русский',
  ja: '日本語',
  fr: 'Français',
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [likedQuotes, setLikedQuotes] = useState<number[]>(() => {
    const saved = localStorage.getItem('likedQuotes');
    return saved ? JSON.parse(saved) : [];
  });
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [soundsEnabled, setSoundsEnabled] = useState(() => {
    const saved = localStorage.getItem('soundsEnabled');
    return saved ? JSON.parse(saved) : true;
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const saved = localStorage.getItem('notificationsEnabled');
    return saved ? JSON.parse(saved) : true;
  });
  const [notificationFrequency, setNotificationFrequency] = useState(() => {
    const saved = localStorage.getItem('notificationFrequency');
    return saved || '24h';
  });
  const [language, setLanguage] = useState<keyof typeof translations>(() => {
    const saved = localStorage.getItem('language');
    return (saved as keyof typeof translations) || 'es';
  });
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [swipeCount, setSwipeCount] = useState(0);
  const [showHeader, setShowHeader] = useState(true);

  const notificationFrequencyOptions = [
    { value: '1h', label: '1 hora' },
    { value: '6h', label: '6 horas' },
    { value: '12h', label: '12 horas' },
    { value: '24h', label: '24 horas' },
  ] as const;

  const t = translations[language];

  const getNotificationInterval = (frequency: string) => {
    switch (frequency) {
      case '1h':
        return 60 * 60 * 1000;
      case '6h':
        return 6 * 60 * 60 * 1000;
      case '12h':
        return 12 * 60 * 60 * 1000;
      case '24h':
      default:
        return 24 * 60 * 60 * 1000;
    }
  };

  // Guardar favoritos en localStorage
  useEffect(() => {
    localStorage.setItem('likedQuotes', JSON.stringify(likedQuotes));
  }, [likedQuotes]);

  // Guardar modo oscuro en localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Guardar sonidos en localStorage
  useEffect(() => {
    localStorage.setItem('soundsEnabled', JSON.stringify(soundsEnabled));
  }, [soundsEnabled]);

  // Guardar notificaciones en localStorage
  useEffect(() => {
    localStorage.setItem('notificationsEnabled', JSON.stringify(notificationsEnabled));
  }, [notificationsEnabled]);

  useEffect(() => {
    localStorage.setItem('notificationFrequency', notificationFrequency);
  }, [notificationFrequency]);

  // Guardar idioma en localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    if (notificationsEnabled && 'Notification' in window) {
      Notification.requestPermission();
    }
  }, [notificationsEnabled]);

  useEffect(() => {
    if (!notificationsEnabled || typeof window === 'undefined') return;
    if (!('Notification' in window) || Notification.permission !== 'granted') return;

    const interval = getNotificationInterval(notificationFrequency);
    const intervalId = window.setInterval(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      sendNotification('Frase para ti', randomQuote.text);
    }, interval);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [notificationsEnabled, notificationFrequency]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const playSound = (type: 'click' | 'like' | 'refresh') => {
    if (!soundsEnabled) return;

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === 'click') {
      oscillator.frequency.value = 800;
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } else if (type === 'like') {
      oscillator.frequency.value = 600;
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } else if (type === 'refresh') {
      oscillator.frequency.value = 400;
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.15);
    }
  };

  const sendNotification = (title: string, body: string) => {
    if (notificationsEnabled && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  };

  const handleRefresh = () => {
    playSound('refresh');
    setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    sendNotification('Nueva frase', quotes[(currentQuoteIndex + 1) % quotes.length].text);
  };

  const handleLike = () => {
    playSound('like');
    setLikedQuotes((prev) => {
      if (prev.includes(currentQuoteIndex)) {
        return prev.filter((i) => i !== currentQuoteIndex);
      }
      sendNotification('Frase guardada', '¡Has añadido una nueva frase a tus favoritos!');
      return [...prev, currentQuoteIndex];
    });
  };

  const handleShare = () => {
    playSound('click');
    if (navigator.share) {
      navigator.share({
        title: 'Frase filosófica',
        text: `"${quotes[currentQuoteIndex].text}" - ${quotes[currentQuoteIndex].author}`,
      });
    } else {
      alert('¡Compartiendo frase filosófica!');
    }
  };

  const handleTabChange = (tab: string) => {
    playSound('click');
    setActiveTab(tab);
    if (tab === 'home') {
      setShowHeader(true);
      setSwipeCount(0);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="relative h-full overflow-hidden">
            <AnimatePresence>
              {showHeader && (
                <motion.div
                  initial={{ y: 0, opacity: 1 }}
                  exit={{ y: -100, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed top-0 left-0 right-0 z-10 px-4 pt-8 pb-4 bg-gradient-to-b from-purple-50 via-pink-50 to-transparent dark:from-gray-900 dark:via-purple-950 pointer-events-none"
                >
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                        <Sparkles className="w-7 h-7 text-white" />
                      </div>
                      <h1 className="text-gray-800 dark:text-gray-100 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{t.thoughtOfDay}</h1>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">{t.reflectPhilosophers}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="h-full flex items-center justify-center">
              <AnimatePresence mode="wait" custom={currentQuoteIndex}>
                <motion.div
                  key={currentQuoteIndex}
                  custom={currentQuoteIndex}
                  initial={{ y: 300, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -300, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.y) * velocity.y;

                    if (swipe > 500 || offset.y > 100) {
                      // Swipe down - frase anterior
                      playSound('refresh');
                      setCurrentQuoteIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
                      setSwipeCount((prev) => prev + 1);
                      if (swipeCount >= 1) {
                        setShowHeader(false);
                      }
                    } else if (swipe < -500 || offset.y < -100) {
                      // Swipe up - siguiente frase
                      playSound('refresh');
                      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
                      sendNotification('Nueva frase', quotes[(currentQuoteIndex + 1) % quotes.length].text);
                      setSwipeCount((prev) => prev + 1);
                      if (swipeCount >= 1) {
                        setShowHeader(false);
                      }
                    }
                  }}
                  className="w-full cursor-grab active:cursor-grabbing"
                >
                  <QuoteCard
                    quote={quotes[currentQuoteIndex].text}
                    author={quotes[currentQuoteIndex].author}
                    onLike={handleLike}
                    onShare={handleShare}
                    onRefresh={handleRefresh}
                    isLiked={likedQuotes.includes(currentQuoteIndex)}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="fixed bottom-24 left-0 right-0 flex justify-center gap-1 px-4 z-10">
              {[...Array(Math.min(5, quotes.length))].map((_, i) => {
                const index = (currentQuoteIndex - 2 + i + quotes.length) % quotes.length;
                return (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all ${
                      i === 2
                        ? 'w-8 bg-gradient-to-r from-purple-500 to-pink-500'
                        : 'w-1 bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        );

      case 'favorites':
        return (
          <div className="px-4 py-6 pb-24">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h1 className="text-gray-800 dark:text-gray-100 mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{t.myFavorites}</h1>
              {likedQuotes.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-purple-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2">{t.noFavorites}</p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm">{t.tapHeart}</p>
                </div>
              ) : (
                <div className="space-y-4 max-w-md mx-auto">
                  {likedQuotes.map((index, i) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 shadow-lg border border-purple-100"
                    >
                      <p className="text-gray-700 mb-3 leading-relaxed">"{quotes[index].text}"</p>
                      <p className="text-purple-600 text-sm">— {quotes[index].author}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        );

      case 'categories':
        return (
          <div className="px-4 py-6 pb-24">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h1 className="text-gray-800 dark:text-gray-100 mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{t.categories}</h1>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {categories.map((category, i) => {
                  const Icon = category.icon;
                  return (
                    <motion.button
                      key={category.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all`}
                    >
                      <Icon className="w-8 h-8 mb-3 opacity-90" />
                      <p className="mb-2">{category.name}</p>
                      <p className="text-sm opacity-80">{category.count} {t.quotes}</p>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        );

      case 'settings':
        return (
          <div className="px-4 py-6 pb-24">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h1 className="text-gray-800 dark:text-gray-100 mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{t.configuration}</h1>
              <div className="max-w-md mx-auto space-y-4">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 shadow-xl border border-purple-100 dark:border-purple-900"
                >
                  <h2 className="text-gray-700 dark:text-gray-300 mb-4">{t.appearance}</h2>
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        playSound('click');
                        setDarkMode(!darkMode);
                      }}
                      className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        {darkMode ? <Sun className="w-5 h-5 text-purple-500" /> : <Moon className="w-5 h-5 text-purple-500" />}
                        <span className="text-gray-700 dark:text-gray-300">{t.darkMode}</span>
                      </div>
                      <div className={`w-12 h-6 rounded-full relative transition-colors ${darkMode ? 'bg-purple-500' : 'bg-gray-200'}`}>
                        <motion.div
                          className="absolute top-1 w-4 h-4 bg-white rounded-full"
                          animate={{ left: darkMode ? '26px' : '4px' }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        playSound('click');
                        setShowLanguageModal(true);
                      }}
                      className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-purple-500" />
                        <span className="text-gray-700 dark:text-gray-300">{t.language}</span>
                      </div>
                      <span className="text-gray-400 dark:text-gray-500">{languageNames[language]}</span>
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 shadow-xl border border-purple-100 dark:border-purple-900"
                >
                  <h2 className="text-gray-700 dark:text-gray-300 mb-4">{t.notifications}</h2>
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        playSound('click');
                        setNotificationsEnabled(!notificationsEnabled);
                        if (!notificationsEnabled && 'Notification' in window) {
                          Notification.requestPermission();
                        }
                      }}
                      className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-purple-500" />
                        <span className="text-gray-700 dark:text-gray-300">{t.dailyQuote}</span>
                      </div>
                      <div className={`w-12 h-6 rounded-full relative transition-colors ${notificationsEnabled ? 'bg-purple-500' : 'bg-gray-200 dark:bg-gray-600'}`}>
                        <motion.div
                          className="absolute top-1 w-4 h-4 bg-white rounded-full"
                          animate={{ left: notificationsEnabled ? '26px' : '4px' }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </div>
                    </button>

                    <div className="w-full p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Bell className="w-5 h-5 text-purple-500" />
                          <span className="text-gray-700 dark:text-gray-300">Frecuencia</span>
                        </div>
                        <span className="text-gray-400 dark:text-gray-500">{notificationFrequencyOptions.find((option) => option.value === notificationFrequency)?.label}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {notificationFrequencyOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              playSound('click');
                              setNotificationFrequency(option.value);
                            }}
                            className={`rounded-2xl px-3 py-3 text-sm font-medium transition-all border ${notificationFrequency === option.value ? 'border-purple-500 bg-purple-500 text-white' : 'border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200'}`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        playSound('click');
                        setSoundsEnabled(!soundsEnabled);
                      }}
                      className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <Volume2 className="w-5 h-5 text-purple-500" />
                        <span className="text-gray-700 dark:text-gray-300">{t.sounds}</span>
                      </div>
                      <div className={`w-12 h-6 rounded-full relative transition-colors ${soundsEnabled ? 'bg-purple-500' : 'bg-gray-200 dark:bg-gray-600'}`}>
                        <motion.div
                          className="absolute top-1 w-4 h-4 bg-white rounded-full"
                          animate={{ left: soundsEnabled ? '26px' : '4px' }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </div>
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 shadow-xl border border-purple-100 dark:border-purple-900"
                >
                  <h2 className="text-gray-700 dark:text-gray-300 mb-4">{t.statistics}</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                      <span className="text-gray-600 dark:text-gray-400">{t.favoritePhrases}</span>
                      <span className="px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full">{likedQuotes.length}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                      <span className="text-gray-600 dark:text-gray-400">{t.reflectionDays}</span>
                      <span className="px-4 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full">1</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="size-full bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900 overflow-auto transition-colors">
      {renderContent()}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />

      <AnimatePresence>
        {showLanguageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowLanguageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-gray-800 dark:text-gray-100">{t.language}</h2>
                <button
                  onClick={() => setShowLanguageModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {(Object.keys(languageNames) as Array<keyof typeof languageNames>).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      playSound('click');
                      setLanguage(lang);
                      setShowLanguageModal(false);
                    }}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      language === lang
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    {languageNames[lang]}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}