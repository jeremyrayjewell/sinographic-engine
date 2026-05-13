import type {
  AppLocale,
  Classifier,
  ClassifierDeck
} from '@sinographic-engine/shared-types'

type ClassifierTranslation = {
  meanings: string[]
  usage: string
  examples: Record<string, string>
}

const deckTranslations: Record<
  string,
  Record<AppLocale, Pick<ClassifierDeck, 'name' | 'description'>>
> = {
  survival: {
    en: {
      name: 'Common',
      description: 'High-frequency classifiers for immediate daily function.'
    },
    'es-419': {
      name: 'Comunes',
      description: 'Clasificadores de alta frecuencia para desenvolverse de inmediato en la vida diaria.'
    }
  },
  'conversationally-solid': {
    en: {
      name: 'Conversationally Solid',
      description: 'A broader spoken inventory for ordinary conversational range.'
    },
    'es-419': {
      name: 'Solidez Conversacional',
      description: 'Un inventario oral más amplio para manejar conversaciones cotidianas con soltura.'
    }
  },
  'very-comfortable': {
    en: {
      name: 'Very Comfortable',
      description: 'A larger literary and nuanced working set for confident usage.'
    },
    'es-419': {
      name: 'Muy Cómodo',
      description: 'Un repertorio más amplio, matizado y algo más literario para usar con seguridad.'
    }
  },
  'all-classifiers': {
    en: {
      name: 'All Classifiers',
      description: 'Combined deck spanning the full classifier roadmap.'
    },
    'es-419': {
      name: 'Todos los Clasificadores',
      description: 'Mazo combinado que reúne toda la ruta prevista de clasificadores.'
    }
  }
}

const tagTranslations: Record<string, string> = {
  accounts: 'cuentas',
  alignment: 'alineación',
  animals: 'animales',
  archives: 'archivo',
  art: 'arte',
  batches: 'lotes',
  books: 'libros',
  bottles: 'botellas',
  bound: 'encuadernado',
  bounded: 'acotado',
  boxes: 'cajas',
  buildings: 'edificios',
  bursts: 'ráfagas',
  businesses: 'negocios',
  calendar: 'calendario',
  cans: 'latas',
  cases: 'casos',
  categories: 'categorías',
  ceremonial: 'ceremonial',
  chapters: 'capítulos',
  chunks: 'trozos',
  classes: 'clases',
  cloth: 'tela',
  clothing: 'ropa',
  clusters: 'racimos',
  completion: 'completitud',
  containers: 'recipientes',
  cups: 'tazas',
  cycles: 'ciclos',
  cylinders: 'cilindros',
  documents: 'documentos',
  drinks: 'bebidas',
  episodes: 'episodios',
  equipment: 'equipo',
  establishments: 'establecimientos',
  events: 'eventos',
  families: 'familias',
  fish: 'peces',
  flat: 'plano',
  flexible: 'flexible',
  floors: 'pisos',
  food: 'comida',
  forces: 'fuerzas',
  formal: 'formal',
  general: 'general',
  goods: 'mercancías',
  grip: 'agarre',
  groups: 'grupos',
  handled: 'con mango',
  headwear: 'sombreros',
  heaps: 'montones',
  households: 'hogares',
  instruments: 'instrumentos',
  items: 'ítems',
  jars: 'frascos',
  lamps: 'lámparas',
  landforms: 'relieves',
  layers: 'capas',
  letters: 'cartas',
  lines: 'líneas',
  linked: 'ensartado',
  liquid: 'líquido',
  literary: 'literario',
  livestock: 'ganado',
  long: 'largo',
  machines: 'máquinas',
  masses: 'masas',
  matters: 'asuntos',
  meals: 'comidas',
  measure: 'medida',
  media: 'medios',
  models: 'modelos',
  money: 'dinero',
  mouthfuls: 'bocados',
  music: 'música',
  objects: 'objetos',
  occurrences: 'ocasiones',
  pages: 'páginas',
  pairs: 'pares',
  paper: 'papel',
  particles: 'partículas',
  people: 'personas',
  performances: 'presentaciones',
  pieces: 'piezas',
  piles: 'pilas',
  pinches: 'pizcas',
  plants: 'plantas',
  poetry: 'poesía',
  polite: 'cortés',
  portions: 'porciones',
  printed: 'impreso',
  repetition: 'repetición',
  retail: 'comercio',
  rigid: 'rígido',
  rooms: 'cuartos',
  round: 'ronda',
  rounds: 'rondas',
  rows: 'filas',
  schedules: 'turnos',
  segments: 'segmentos',
  sentences: 'oraciones',
  servings: 'porciones servidas',
  sessions: 'sesiones',
  sets: 'conjuntos',
  ships: 'barcos',
  shots: 'disparos',
  sides: 'caras',
  'single-from-pair': 'uno de un par',
  slices: 'rebanadas',
  small: 'pequeño',
  'small amounts': 'cantidades pequeñas',
  smells: 'olores',
  spaces: 'espacios',
  speech: 'habla',
  stacks: 'pilas',
  statues: 'estatuas',
  stems: 'tallos',
  strands: 'hebras',
  streams: 'corrientes',
  strings: 'hileras',
  structures: 'estructuras',
  styles: 'estilos',
  subjects: 'materias',
  surfaces: 'superficies',
  surges: 'oleadas',
  systems: 'sistemas',
  technical: 'técnico',
  technology: 'tecnología',
  texts: 'textos',
  time: 'tiempo',
  tiny: 'minúsculo',
  tools: 'herramientas',
  tops: 'partes superiores',
  transport: 'transporte',
  trees: 'árboles',
  tubes: 'tubos',
  types: 'tipos',
  variant: 'variante',
  varieties: 'variedades',
  vehicles: 'vehículos',
  waves: 'olas',
  weather: 'clima',
  wisps: 'hilillos',
  writing: 'escritura'
}

const classifierTranslations: Record<string, ClassifierTranslation> = {
  ba: {
    meanings: ['clasificador para objetos con mango', 'clasificador para cosas que se pueden agarrar con la mano'],
    usage: 'Se usa para sillas, paraguas, cuchillos y objetos que se entienden por el agarre o el mango.',
    examples: { 'ba-example-001': 'una silla' }
  },
  ban: {
    meanings: ['clasificador para servicios programados o turnos'],
    usage: 'Se usa para clases, salidas de transporte y turnos de trabajo.',
    examples: { 'ban-example-001': 'un recorrido de autobús' }
  },
  bei: {
    meanings: ['clasificador para tazas', 'clasificador para tazas como medida'],
    usage: 'Se usa para bebidas servidas en taza o para la medida de una taza.',
    examples: {
      'bei-example-001': 'una taza de café',
      'bei-example-002': 'dos vasos de agua'
    }
  },
  ben: {
    meanings: ['clasificador para volúmenes encuadernados', 'clasificador para libros'],
    usage: 'Se usa para libros, revistas, cuadernos, diccionarios y otros materiales impresos encuadernados.',
    examples: {
      'ben-example-001': 'un diccionario',
      'ben-example-002': 'dos revistas'
    }
  },
  bi: {
    meanings: ['clasificador para sumas de dinero o transacciones'],
    usage: 'Se usa para sumas de dinero, cuentas y transacciones como entradas separadas.',
    examples: { 'bi-example-001': 'una suma de dinero' }
  },
  bian: {
    meanings: ['clasificador para repeticiones completas'],
    usage: 'Se usa cuando algo se hace una vez completa, de principio a fin.',
    examples: { 'bian-example-001': 'ver una vez de principio a fin' }
  },
  bo: {
    meanings: ['clasificador para olas u oleadas'],
    usage: 'Se usa para olas, tendencias y oleadas que llegan en una secuencia perceptible.',
    examples: { 'bo-example-001': 'una ola de gente' }
  },
  bu: {
    meanings: ['clasificador para máquinas, obras o vehículos', 'clasificador para obras completas de medios'],
    usage: 'Se usa para películas, teléfonos, máquinas y vehículos cuando se tratan como unidades completas o producciones cerradas.',
    examples: {
      'bu-example-001': 'un teléfono celular',
      'bu-example-002': 'esta película'
    }
  },
  ce: {
    meanings: ['clasificador para libros o volúmenes encuadernados en estilo formal'],
    usage: 'Es un clasificador más formal o archivístico para volúmenes, registros y libros encuadernados.',
    examples: { 'ce-example-001': 'un álbum de arte' }
  },
  ceng: {
    meanings: ['clasificador para capas y pisos'],
    usage: 'Se usa para capas, pisos de un edificio y unidades estratificadas por niveles.',
    examples: { 'ceng-example-001': 'un piso' }
  },
  chang: {
    meanings: ['clasificador para eventos o presentaciones', 'clasificador para sucesos acotados'],
    usage: 'Se usa para presentaciones, partidos, tormentas, discusiones y otros sucesos o escenas delimitadas.',
    examples: {
      'chang-example-001': 'una función de cine',
      'chang-example-002': 'ese partido'
    }
  },
  chi: {
    meanings: ['clasificador para cucharadas'],
    usage: 'Se usa para medidas a cucharadas de medicina, azúcar y comida.',
    examples: { 'chi-example-001': 'una cucharada de azúcar' }
  },
  chuan: {
    meanings: ['clasificador para hileras o racimos enlazados'],
    usage: 'Se usa para cosas ensartadas o enlazadas en una hilera, como llaves, cuentas o números.',
    examples: { 'chuan-example-001': 'un manojo de llaves' }
  },
  ci: {
    meanings: ['clasificador para ocasiones', 'clasificador para eventos repetidos'],
    usage: 'Se usa para eventos repetidos, intentos, visitas o incidentes contados por ocurrencia.',
    examples: {
      'ci-example-001': 'un viaje',
      'ci-example-002': 'dos exámenes'
    }
  },
  cong: {
    meanings: ['clasificador para matas o matorrales'],
    usage: 'Se usa para arbustos, flores y cosas que crecen o se agrupan densamente.',
    examples: { 'cong-example-001': 'un grupo de flores' }
  },
  cuo: {
    meanings: ['clasificador para pizcas o pequeños manojos'],
    usage: 'Se usa para pizcas de polvo, hierbas u otras cantidades mínimas reunidas.',
    examples: { 'cuo-example-001': 'una pizca de sal' }
  },
  di: {
    meanings: ['clasificador para gotas'],
    usage: 'Se usa para gotas de líquido y cantidades diminutas que caen.',
    examples: { 'di-example-001': 'una gota de agua' }
  },
  die: {
    meanings: ['clasificador para pilas'],
    usage: 'Se usa para pilas y capas apiladas de objetos delgados.',
    examples: { 'die-example-001': 'una pila de papel' }
  },
  ding: {
    meanings: ['clasificador para sombreros y objetos pensados desde la parte superior'],
    usage: 'Se usa para sombreros, sillas de manos y cosas concebidas desde la parte superior o la cubierta.',
    examples: { 'ding-example-001': 'un sombrero' }
  },
  dui: {
    meanings: ['clasificador para montones o pilas'],
    usage: 'Se usa para montones de objetos o quejas abstractas presentadas como una pila.',
    examples: { 'dui-example-001': 'un montón de libros' }
  },
  dun: {
    meanings: ['clasificador para comidas o golpes'],
    usage: 'Se usa para comidas, regaños y golpes contados como episodios delimitados.',
    examples: { 'dun-example-001': 'una comida' }
  },
  fa: {
    meanings: ['clasificador para rondas de disparos o artillería'],
    usage: 'Se usa para tiros, balas y algunas descargas explosivas contadas como liberaciones individuales.',
    examples: { 'fa-example-001': 'un disparo' }
  },
  fan: {
    meanings: ['clasificador para vueltas o rondas'],
    usage: 'Se usa para rondas de discusión, esfuerzo o ciclos repetidos con un matiz retórico.',
    examples: { 'fan-example-001': 'una ronda de esfuerzo' }
  },
  fen: {
    meanings: ['clasificador para porciones', 'clasificador para documentos o juegos'],
    usage: 'Se usa para porciones, comidas preparadas, documentos y partes de algo tratadas como una porción completa en el mandarín de Taiwán.',
    examples: { 'fen-example-001': 'un desayuno preparado' }
  },
  feng: {
    meanings: ['clasificador para cartas'],
    usage: 'Se usa para cartas y correspondencia sellada.',
    examples: { 'feng-example-001': 'una carta' }
  },
  fu: {
    meanings: ['clasificador para obras planas como pinturas'],
    usage: 'Se usa para pinturas, pancartas y obras visuales anchas y planas.',
    examples: { 'fu-example-001': 'una pintura' }
  },
  ge: {
    meanings: ['clasificador general', 'clasificador por defecto'],
    usage: 'Es el clasificador por defecto para muchas personas y objetos cotidianos cuando no se prefiere uno más específico. En el mandarín de Taiwán también es frecuente en el habla como recurso de salida cuando no se elige un clasificador más preciso semánticamente.',
    examples: {
      'ge-example-001': 'un estudiante',
      'ge-example-002': 'tres preguntas'
    }
  },
  gen: {
    meanings: ['clasificador para cosas largas, delgadas y rígidas'],
    usage: 'Se usa para cabellos, postes, tallos de plátano y otros objetos alargados y rígidos.',
    examples: { 'gen-example-001': 'un plátano' }
  },
  gu: {
    meanings: ['clasificador para corrientes, olores o fuerzas'],
    usage: 'Se usa para corrientes, olores y fuerzas abstractas que se mueven como una corriente.',
    examples: { 'gu-example-001': 'un olor' }
  },
  'guan-jar': {
    meanings: ['clasificador para latas y frascos'],
    usage: 'Se usa para bebidas en lata, frascos y recipientes con tapa.',
    examples: { 'guan-jar-example-001': 'una lata de cola' }
  },
  'guan-tube': {
    meanings: ['clasificador para tubos o elementos cilíndricos delgados'],
    usage: 'Se usa para tubos, instrumentos de viento y unidades cilíndricas alargadas.',
    examples: { 'guan-tube-example-001': 'un tubo de pasta de dientes' }
  },
  hang: {
    meanings: ['clasificador para filas'],
    usage: 'Se usa para líneas de texto, filas de asientos u objetos alineados.',
    examples: { 'hang-example-001': 'una línea de texto' }
  },
  he: {
    meanings: ['clasificador para cajas'],
    usage: 'Se usa para cosas en caja y para cajas como medida.',
    examples: { 'he-example-001': 'una caja de galletas' }
  },
  hu: {
    meanings: ['clasificador para hogares'],
    usage: 'Se usa para contar hogares, familias registradas o unidades domésticas comerciales.',
    examples: { 'hu-example-001': 'un hogar' }
  },
  hui: {
    meanings: ['clasificador para veces o capítulos'],
    usage: 'Se usa para ocurrencias en estilo coloquial y para cambios de capítulo en narrativas clásicas.',
    examples: { 'hui-example-001': 'una llamada telefónica' }
  },
  jia: {
    meanings: ['clasificador para familias', 'clasificador para negocios o establecimientos'],
    usage: 'Se usa para hogares, tiendas, restaurantes, empresas y establecimientos semejantes.',
    examples: {
      'jia-example-001': 'un restaurante',
      'jia-example-002': 'esta empresa'
    }
  },
  'jian-item': {
    meanings: ['clasificador para eventos', 'clasificador para prendas de ropa'],
    usage: 'Se usa a menudo para prendas de vestir, asuntos, casos e ítems discretos tratados como unidades.',
    examples: {
      'jian-item-example-001': 'un abrigo',
      'jian-item-example-002': 'este asunto'
    }
  },
  'jian-room': {
    meanings: ['clasificador para cuartos', 'clasificador para establecimientos'],
    usage: 'Se usa para cuartos, casas, oficinas, tiendas y negocios como espacios cerrados y discretos.',
    examples: {
      'jian-room-example-001': 'un salón de clases',
      'jian-room-example-002': 'esa tienda'
    }
  },
  'jia-rack': {
    meanings: ['clasificador para máquinas o estructuras enmarcadas'],
    usage: 'Se usa para aviones, pianos, cámaras y cosas concebidas como instalaciones con armazón.',
    examples: { 'jia-rack-example-001': 'un avión' }
  },
  jie: {
    meanings: ['clasificador para segmentos o periodos de clase'],
    usage: 'Se usa para lecciones, articulaciones, secciones y unidades segmentadas.',
    examples: { 'jie-example-001': 'un periodo de clase' }
  },
  jing: {
    meanings: ['clasificador para tallos'],
    usage: 'Se usa para flores y plantas contadas por tallo.',
    examples: { 'jing-example-001': 'un tallo de flor' }
  },
  ju: {
    meanings: ['clasificador para oraciones o líneas'],
    usage: 'Se usa para enunciados, oraciones y líneas fijas de habla.',
    examples: { 'ju-example-001': 'una oración' }
  },
  'ke-plant': {
    meanings: ['clasificador para plantas y árboles'],
    usage: 'Se usa para árboles, arbustos y organismos vegetales enraizados contados individualmente.',
    examples: { 'ke-plant-example-001': 'un árbol' }
  },
  'ke-small': {
    meanings: ['clasificador para objetos pequeños y redondos'],
    usage: 'Se usa para perlas, dientes, estrellas y otros objetos pequeños, redondos o similares a cuentas.',
    examples: { 'ke-small-example-001': 'una estrella' }
  },
  kou: {
    meanings: ['clasificador para personas de un hogar', 'clasificador para bocas o bocados'],
    usage: 'Se usa para miembros de la familia contados por registro doméstico y para bocados en algunas expresiones.',
    examples: { 'kou-example-001': 'tres miembros de la familia' }
  },
  kuai: {
    meanings: ['clasificador para trozos o pedazos', 'clasificador para dinero en el habla coloquial'],
    usage: 'Se usa para trozos, masas y unidades coloquiales de dinero en el mandarín de Taiwán.',
    examples: { 'kuai-example-001': 'un pedazo de pastel' }
  },
  kuan: {
    meanings: ['clasificador para modelos o estilos'],
    usage: 'Se usa para estilos de productos, sumas de pago y modelos enumerados en contextos comerciales.',
    examples: { 'kuan-example-001': 'un modelo de teléfono' }
  },
  li: {
    meanings: ['clasificador para granos y partículas diminutas'],
    usage: 'Se usa para granos, pastillas, cuentas y partículas discretas muy pequeñas.',
    examples: { 'li-example-001': 'un grano de arroz' }
  },
  liang: {
    meanings: ['clasificador para vehículos', 'clasificador para transporte con ruedas'],
    usage: 'Se usa específicamente para vehículos con ruedas como autos, autobuses, bicicletas y camiones.',
    examples: {
      'liang-example-001': 'un auto',
      'liang-example-002': 'dos autobuses'
    }
  },
  lie: {
    meanings: ['clasificador para líneas o trenes'],
    usage: 'Se usa para filas ordenadas, columnas y trenes en conteo formal.',
    examples: { 'lie-example-001': 'un tren' }
  },
  lou: {
    meanings: ['clasificador coloquial para pisos de un edificio'],
    usage: 'Se usa coloquialmente para pisos y niveles de edificios, especialmente en direcciones y ubicaciones.',
    examples: { 'lou-example-001': 'el tercer piso' }
  },
  lv: {
    meanings: ['clasificador para hilillos o hebras'],
    usage: 'Se usa para hilillos de humo, hebras de aroma o rastros delicados en forma de hilo.',
    examples: { 'lv-example-001': 'un hilillo de humo' }
  },
  men: {
    meanings: ['clasificador para materias académicas o categorías'],
    usage: 'Se usa para materias escolares, piezas de artillería y algunas categorías clasificadas.',
    examples: { 'men-example-001': 'una materia' }
  },
  mian: {
    meanings: ['clasificador para superficies planas o caras'],
    usage: 'Se usa para espejos, banderas, tambores y objetos con cara o superficie plana.',
    examples: { 'mian-example-001': 'un espejo' }
  },
  ming: {
    meanings: ['clasificador para personas en conteo formal'],
    usage: 'Se usa en contextos formales o administrativos para contar personas, personal o participantes.',
    examples: { 'ming-example-001': 'tres estudiantes' }
  },
  nian: {
    meanings: ['clasificador para años'],
    usage: 'Se usa para contar años en edad, duración y referencia calendárica.',
    examples: { 'nian-example-001': 'dos años de tiempo' }
  },
  pai: {
    meanings: ['clasificador para filas'],
    usage: 'Se usa para filas de asientos, casas o unidades alineadas en línea recta.',
    examples: { 'pai-example-001': 'una fila de sillas' }
  },
  pan: {
    meanings: ['clasificador para platos o fuentes'],
    usage: 'Se usa para platos servidos, bandejas y rondas de juego o actividad en algunos contextos.',
    examples: { 'pan-example-001': 'un plato de fruta' }
  },
  pi: {
    meanings: ['clasificador para caballos y rollos de tela'],
    usage: 'Tradicionalmente se usa para caballos y, por extensión, rollos de tela.',
    examples: { 'pi-example-001': 'un caballo' }
  },
  pian: {
    meanings: ['clasificador para rebanadas o piezas planas'],
    usage: 'Se usa para rebanadas, tabletas y fragmentos planos.',
    examples: { 'pian-example-001': 'una rebanada de pan' }
  },
  'pian-article': {
    meanings: ['clasificador para textos escritos'],
    usage: 'Se usa para artículos, ensayos y composiciones escritas más largas.',
    examples: { 'pian-article-example-001': 'un artículo' }
  },
  'pi-batch': {
    meanings: ['clasificador para lotes'],
    usage: 'Se usa para lotes de mercancías, grupos procesados juntos u oleadas de aprobaciones.',
    examples: { 'pi-batch-example-001': 'un lote de mercancías' }
  },
  ping: {
    meanings: ['clasificador para botellas'],
    usage: 'Se usa para bebidas embotelladas, salsas y otros recipientes de botella.',
    examples: { 'ping-example-001': 'una botella de agua' }
  },
  'pi-variant': {
    meanings: ['variante de clasificador para rollos de tela'],
    usage: 'Es una forma variante tradicional que aparece en escritura antigua o especializada para medir tela.',
    examples: { 'pi-variant-example-001': 'un rollo de tela' }
  },
  qun: {
    meanings: ['clasificador para grupos de personas o animales'],
    usage: 'Se usa para multitudes, bandadas y grupos que actúan colectivamente.',
    examples: { 'qun-example-001': 'una bandada de aves' }
  },
  shou: {
    meanings: ['clasificador para canciones y poemas'],
    usage: 'Se usa para canciones, poemas y composiciones líricas.',
    examples: { 'shou-example-001': 'una canción' }
  },
  shuang: {
    meanings: ['clasificador para pares'],
    usage: 'Se usa para pares naturales o funcionales como zapatos, palillos y manos.',
    examples: { 'shuang-example-001': 'un par de zapatos' }
  },
  sou: {
    meanings: ['clasificador para barcos'],
    usage: 'Se usa para botes, barcos y embarcaciones marítimas de mayor tamaño.',
    examples: { 'sou-example-001': 'un bote' }
  },
  tai: {
    meanings: ['clasificador para máquinas', 'clasificador para equipo'],
    usage: 'Se usa para máquinas y equipo como computadoras, televisores y aires acondicionados.',
    examples: {
      'tai-example-001': 'una computadora',
      'tai-example-002': 'tres aires acondicionados'
    }
  },
  tang: {
    meanings: ['clasificador para clases o sesiones'],
    usage: 'Se usa para lecciones, audiencias y sesiones formales, especialmente periodos de clase.',
    examples: { 'tang-example-001': 'un periodo de clase' }
  },
  tao: {
    meanings: ['clasificador para conjuntos'],
    usage: 'Se usa para conjuntos completos de ropa, muebles o sistemas tratados como unidades a juego.',
    examples: { 'tao-example-001': 'un juego de ropa' }
  },
  tian: {
    meanings: ['clasificador para días'],
    usage: 'Se usa para contar días como unidades calendáricas o vivenciales.',
    examples: { 'tian-example-001': 'tres días libres' }
  },
  tiao: {
    meanings: ['clasificador para cosas largas y flexibles', 'clasificador para cosas en forma de tira'],
    usage: 'Se usa para peces, ríos, pantalones, cuerdas, caminos y otros objetos largos o en forma de tira.',
    examples: {
      'tiao-example-001': 'un pez',
      'tiao-example-002': 'dos pantalones'
    }
  },
  tong: {
    meanings: ['clasificador para recipientes cilíndricos o tubos'],
    usage: 'Se usa para cosas enrolladas, tubulares o contenidas en cilindros.',
    examples: { 'tong-example-001': 'un rollo de papel higiénico' }
  },
  tou: {
    meanings: ['clasificador para ganado grande'],
    usage: 'Se usa para animales domésticos grandes como vacas o cerdos.',
    examples: { 'tou-example-001': 'una vaca' }
  },
  tuan: {
    meanings: ['clasificador para grupos o masas'],
    usage: 'Se usa para grupos, racimos y masas reunidas en una sola unidad.',
    examples: { 'tuan-example-001': 'un grupo de personas' }
  },
  wan: {
    meanings: ['clasificador para tazones', 'clasificador para tazones como medida'],
    usage: 'Se usa para comida o líquido servido en tazón y para el tazón mismo en contextos de conteo.',
    examples: {
      'wan-example-001': 'un tazón de fideos',
      'wan-example-002': 'tres tazones de arroz'
    }
  },
  wei: {
    meanings: ['clasificador cortés para personas', 'clasificador honorífico para personas'],
    usage: 'Es un clasificador respetuoso para personas, común en atención al público, presentaciones formales y conversación cortés en el mandarín de Taiwán.',
    examples: {
      'wei-example-001': 'un maestro',
      'wei-example-002': 'dos invitados'
    }
  },
  'wei-tail': {
    meanings: ['clasificador para peces'],
    usage: 'Se usa especialmente para peces y algunos animales con cola al contarlos.',
    examples: { 'wei-tail-example-001': 'un pez' }
  },
  xing: {
    meanings: ['clasificador para tipos o modelos'],
    usage: 'Se usa para tipos y clases de modelo, especialmente en contextos técnicos o de productos.',
    examples: { 'xing-example-001': 'un tipo de producto' }
  },
  yang: {
    meanings: ['clasificador para clases y estilos'],
    usage: 'Se usa para clases, estilos y formas diferenciadas externamente.',
    examples: { 'yang-example-001': 'una cosa' }
  },
  ye: {
    meanings: ['clasificador para páginas'],
    usage: 'Se usa para páginas de libros, sitios web y materiales encuadernados.',
    examples: { 'ye-example-001': 'una página de un libro' }
  },
  ze: {
    meanings: ['clasificador para notas informativas o piezas escritas breves'],
    usage: 'Se usa para reportes, avisos y piezas escritas discretas en estilo periodístico.',
    examples: { 'ze-example-001': 'una nota informativa' }
  },
  zhan: {
    meanings: ['clasificador para lámparas o tazas pequeñas'],
    usage: 'Se usa para lámparas, tazas de té y algunos objetos pequeños con forma de recipiente en estilo literario o refinado.',
    examples: { 'zhan-example-001': 'una lámpara' }
  },
  zhang: {
    meanings: ['clasificador para objetos planos', 'clasificador para hojas o superficies'],
    usage: 'Se usa para cosas planas o de superficie como papel, boletos, mesas, camas y fotografías.',
    examples: {
      'zhang-example-001': 'un boleto',
      'zhang-example-002': 'dos fotos'
    }
  },
  zhen: {
    meanings: ['clasificador para ráfagas o periodos breves'],
    usage: 'Se usa para rachas de clima, dolor, risa u otros episodios con forma de oleada.',
    examples: { 'zhen-example-001': 'una ráfaga de viento' }
  },
  zhi: {
    meanings: ['clasificador para objetos largos y rígidos', 'clasificador para varillas o instrumentos de escritura'],
    usage: 'Se usa para plumas, botellas, palos y objetos largos y rígidos contados como unidades individuales.',
    examples: { 'zhi-example-001': 'una pluma' }
  },
  'zhi-animal': {
    meanings: ['clasificador para animales y para uno de un par'],
    usage: 'Se usa para muchos animales y para un miembro de un conjunto naturalmente pareado.',
    examples: { 'zhi-animal-example-001': 'un perro' }
  },
  zhong: {
    meanings: ['clasificador para clases o tipos'],
    usage: 'Se usa para clases, variedades y agrupaciones taxonómicas.',
    examples: { 'zhong-example-001': 'un tipo de método' }
  },
  zhuang: {
    meanings: ['clasificador para asuntos o casos'],
    usage: 'Se usa para incidentes o asuntos discretos, a menudo con un tono algo oficial o narrativo.',
    examples: { 'zhuang-example-001': 'un asunto' }
  },
  zun: {
    meanings: ['clasificador para estatuas u objetos venerados'],
    usage: 'Se usa para estatuas, campanas grandes y objetos a los que se concede respeto ceremonial.',
    examples: { 'zun-example-001': 'una estatua de Buda' }
  },
  zuo: {
    meanings: ['clasificador para objetos grandes e inmóviles'],
    usage: 'Se usa para montañas, puentes, edificios y otros objetos grandes y fijos.',
    examples: { 'zuo-example-001': 'un puente' }
  }
}

const mapSemanticTags = (tags: string[], locale: AppLocale) => {
  if (locale === 'en') {
    return tags
  }

  return tags.map((tag) => tagTranslations[tag] ?? tag)
}

export const localizeClassifier = (
  classifier: Classifier,
  locale: AppLocale
): Classifier => {
  if (locale === 'en') {
    return classifier
  }

  const translation = classifierTranslations[classifier.id]

  if (!translation) {
    return classifier
  }

  return {
    ...classifier,
    meanings: translation.meanings,
    usage: translation.usage,
    semanticTags: mapSemanticTags(classifier.semanticTags, locale),
    examples: classifier.examples.map((example) => ({
      ...example,
      english: translation.examples[example.id] ?? example.english
    }))
  }
}

export const localizeClassifierDeck = (
  deck: ClassifierDeck,
  locale: AppLocale
): ClassifierDeck => {
  const translation = deckTranslations[deck.id]?.[locale]

  if (!translation) {
    return deck
  }

  return {
    ...deck,
    ...translation
  }
}

export const localizeClassifierDeckWithCount = <
  T extends ClassifierDeck & { availableCount: number }
>(
  deck: T,
  locale: AppLocale
): T => {
  return {
    ...deck,
    ...localizeClassifierDeck(deck, locale)
  }
}
