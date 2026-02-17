import React, { useState, useEffect } from 'react';
import { Clock, ChefHat, ArrowLeft, Flame, AlertCircle, Check, Play, Pause, RotateCcw, Heart, Zap, Coffee, Leaf, Plus, X, ChevronDown, Scale, RefreshCw, ShoppingBag } from 'lucide-react';

// ==========================================
// 1. BASE DE DATOS SIMULADA (RECIPES_DB)
// ==========================================
const RECIPES_DB = [
  // === ENERGETIC ===
  {
    id: 1,
    title: "Wok de Pollo Express",
    image: "https://images.unsplash.com/photo-1603133872878-684f57143b34?auto=format&fit=crop&q=80&w=1000",
    time: 20,
    calories: 450,
    mood: "energetic",
    moodLabel: "Energético",
    ingredients: [
      { name: "Pollo", sub: "Tofu, Seitán o Carne de Cerdo" },
      { name: "Pimiento", sub: "Zanahoria en tiras o Calabacín" },
      { name: "Salsa de Soja", sub: "Tamari o Sal disuelta en agua con azúcar" },
      { name: "Ajo", sub: "Ajo en polvo o Aceite de ajo" },
      { name: "Jengibre", sub: "Jengibre en polvo o Ralladura de limón" }
    ],
    steps: [
      { text: "Cortar el pollo en cubos medianos.", time: 0 },
      { text: "Calentar el wok a fuego máximo con aceite.", time: 0 },
      { text: "Dorar el pollo sin moverlo mucho.", time: 300 },
      { text: "Agregar vegetales y saltear.", time: 180 },
      { text: "Añadir salsa y servir.", time: 0 }
    ]
  },
  {
    id: 2,
    title: "Omelette Proteico",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=1000",
    time: 10,
    calories: 350,
    mood: "energetic",
    moodLabel: "Energético",
    ingredients: [
      { name: "Huevo", sub: "Claras de huevo o Tofu sedoso" },
      { name: "Queso", sub: "Levadura nutricional o Ricota" },
      { name: "Tomate", sub: "Pimiento rojo o Morrones asados" },
      { name: "Espinaca", sub: "Rúcula, Acelga o cualquier hoja verde" }
    ],
    steps: [
      { text: "Batir 3 huevos con sal y pimienta.", time: 0 },
      { text: "Calentar sartén antiadherente con un poco de aceite.", time: 0 },
      { text: "Verter huevos y cocinar a fuego medio-bajo.", time: 120 },
      { text: "Agregar relleno en una mitad y doblar.", time: 60 },
      { text: "Servir con hojas verdes al costado.", time: 0 }
    ]
  },
  {
    id: 3,
    title: "Arroz con Pollo",
    image: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&q=80&w=1000",
    time: 40,
    calories: 550,
    mood: "energetic",
    moodLabel: "Energético",
    ingredients: [
      { name: "Arroz", sub: "Quinoa o Fideos cortados" },
      { name: "Pollo", sub: "Cerdo desmenuzado o Garbanzos" },
      { name: "Cebolla", sub: "Puerro o Cebolla de verdeo" },
      { name: "Pimiento", sub: "Zanahoria rallada o Choclo" },
      { name: "Ajo", sub: "Ajo en polvo" }
    ],
    steps: [
      { text: "Dorar el pollo trozado con aceite y reservar.", time: 300 },
      { text: "En la misma olla, rehogar cebolla, ajo y pimiento.", time: 180 },
      { text: "Agregar el arroz y nacrar un minuto.", time: 60 },
      { text: "Incorporar el pollo, cubrir con agua caliente (doble de arroz) y sal.", time: 0 },
      { text: "Cocinar tapado a fuego bajo sin revolver.", time: 900 },
      { text: "Apagar, dejar reposar tapado 5 min y servir.", time: 300 }
    ]
  },
  {
    id: 4,
    title: "Wrap de Pollo y Verduras",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=1000",
    time: 15,
    calories: 400,
    mood: "energetic",
    moodLabel: "Energético",
    ingredients: [
      { name: "Pollo", sub: "Atún en lata o Hummus" },
      { name: "Harina", sub: "Tortillas compradas o Pan árabe" },
      { name: "Lechuga", sub: "Rúcula, Espinaca o Repollo" },
      { name: "Tomate", sub: "Pimiento asado o Zanahoria rallada" },
      { name: "Limón", sub: "Vinagre o Mostaza" }
    ],
    steps: [
      { text: "Cortar el pollo en tiras finas y saltear con sal y limón.", time: 180 },
      { text: "Calentar la tortilla en sartén seca.", time: 30 },
      { text: "Armar: lechuga, pollo, tomate en la tortilla.", time: 0 },
      { text: "Enrollar bien apretado y cortar al medio.", time: 0 }
    ]
  },
  // === COMFORT ===
  {
    id: 5,
    title: "Risotto de Setas",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=1000",
    time: 45,
    calories: 600,
    mood: "comfort",
    moodLabel: "Comfort",
    ingredients: [
      { name: "Arroz", sub: "Arroz común (menos cremoso) o Quinoa" },
      { name: "Setas", sub: "Champiñones de lata o Berenjenas asadas" },
      { name: "Vino", sub: "Vinagre de manzana diluido o Caldo con limón" },
      { name: "Queso", sub: "Cualquier queso rallado o Levadura nutricional" },
      { name: "Manteca", sub: "Aceite de oliva o Margarina" }
    ],
    steps: [
      { text: "Sofreír cebolla y setas.", time: 300 },
      { text: "Tostar el arroz hasta que esté nacarado.", time: 120 },
      { text: "Agregar caldo poco a poco removiendo.", time: 1200 },
      { text: "Mantecar con queso y manteca fuera del fuego.", time: 0 }
    ]
  },
  {
    id: 6,
    title: "Milanesas con Puré",
    image: "https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?auto=format&fit=crop&q=80&w=1000",
    time: 40,
    calories: 700,
    mood: "comfort",
    moodLabel: "Comfort",
    ingredients: [
      { name: "Carne", sub: "Pollo, Berenjena o Soja texturizada" },
      { name: "Huevo", sub: "Leche con harina (mezcla espesa)" },
      { name: "Pan", sub: "Harina de maíz o Avena procesada" },
      { name: "Papa", sub: "Batata, Calabaza o Mandioca" },
      { name: "Leche", sub: "Caldo o Agua con manteca" }
    ],
    steps: [
      { text: "Pelar papas, cortar en cubos y hervir con sal.", time: 900 },
      { text: "Pasar la carne por harina, huevo batido y pan rallado.", time: 0 },
      { text: "Freír las milanesas en aceite caliente.", time: 300 },
      { text: "Pisar las papas con leche caliente y manteca.", time: 0 },
      { text: "Servir milanesa sobre el puré.", time: 0 }
    ]
  },
  {
    id: 7,
    title: "Fideos con Salsa Casera",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&q=80&w=1000",
    time: 25,
    calories: 500,
    mood: "comfort",
    moodLabel: "Comfort",
    ingredients: [
      { name: "Pasta", sub: "Fideos secos, Ñoquis o Arroz" },
      { name: "Tomate", sub: "Salsa de tomate envasada o Pimiento asado" },
      { name: "Cebolla", sub: "Puerro o Cebolla de verdeo" },
      { name: "Ajo", sub: "Ajo en polvo" },
      { name: "Queso", sub: "Levadura nutricional o Ricota" }
    ],
    steps: [
      { text: "Poner agua a hervir con sal para los fideos.", time: 0 },
      { text: "Rehogar cebolla y ajo picados en aceite de oliva.", time: 180 },
      { text: "Agregar tomates, sal, azúcar (pizca) y cocinar.", time: 600 },
      { text: "Cocinar los fideos al dente y escurrir.", time: 480 },
      { text: "Mezclar fideos con salsa y servir con queso.", time: 0 }
    ]
  },
  {
    id: 8,
    title: "Guiso de Lentejas",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=1000",
    time: 50,
    calories: 480,
    mood: "comfort",
    moodLabel: "Comfort",
    ingredients: [
      { name: "Lenteja", sub: "Porotos o Garbanzos (remojar antes)" },
      { name: "Papa", sub: "Batata o Zapallo" },
      { name: "Zanahoria", sub: "Calabaza o Zapallito" },
      { name: "Cebolla", sub: "Puerro" },
      { name: "Ajo", sub: "Ajo en polvo" }
    ],
    steps: [
      { text: "Rehogar cebolla, ajo y zanahoria en cubos.", time: 300 },
      { text: "Agregar lentejas (lavadas), papa en cubos y cubrir con agua.", time: 0 },
      { text: "Condimentar con sal, comino y pimentón.", time: 0 },
      { text: "Cocinar a fuego medio-bajo tapado.", time: 1500 },
      { text: "Verificar que las lentejas estén tiernas y servir.", time: 0 }
    ]
  },
  // === HEALTHY ===
  {
    id: 9,
    title: "Ensalada Detox Verde",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000",
    time: 10,
    calories: 250,
    mood: "healthy",
    moodLabel: "Sano",
    ingredients: [
      { name: "Espinaca", sub: "Lechuga, Rúcula o Kale" },
      { name: "Aguacate", sub: "Hummus o Queso crema" },
      { name: "Pepino", sub: "Apio o Manzana verde" },
      { name: "Limón", sub: "Vinagre de sidra o Naranja" }
    ],
    steps: [
      { text: "Lavar bien las espinacas.", time: 0 },
      { text: "Cortar aguacate y pepino en rodajas.", time: 0 },
      { text: "Preparar vinagreta con limón, aceite y sal.", time: 0 },
      { text: "Mezclar todo suavemente y servir.", time: 0 }
    ]
  },
  {
    id: 10,
    title: "Bowl de Quinoa y Verduras",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000",
    time: 25,
    calories: 380,
    mood: "healthy",
    moodLabel: "Sano",
    ingredients: [
      { name: "Arroz", sub: "Quinoa real o Cuscús" },
      { name: "Zanahoria", sub: "Remolacha rallada o Zapallo asado" },
      { name: "Espinaca", sub: "Rúcula, Kale o Lechuga" },
      { name: "Limón", sub: "Vinagre de manzana" },
      { name: "Huevo", sub: "Garbanzos o Pollo desmenuzado" }
    ],
    steps: [
      { text: "Cocinar la quinoa/arroz según instrucciones.", time: 900 },
      { text: "Rallar zanahoria y preparar espinacas.", time: 0 },
      { text: "Hervir un huevo (punto medio).", time: 420 },
      { text: "Armar bowl: base de quinoa, verduras alrededor, huevo arriba.", time: 0 },
      { text: "Aliñar con limón, aceite de oliva y sal.", time: 0 }
    ]
  },
  {
    id: 11,
    title: "Sopa de Verduras",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1000",
    time: 35,
    calories: 200,
    mood: "healthy",
    moodLabel: "Sano",
    ingredients: [
      { name: "Zanahoria", sub: "Calabaza o Batata" },
      { name: "Papa", sub: "Zapallo o Choclo" },
      { name: "Cebolla", sub: "Puerro o Cebolla de verdeo" },
      { name: "Ajo", sub: "Ajo en polvo" }
    ],
    steps: [
      { text: "Picar todas las verduras en cubos parejos.", time: 0 },
      { text: "Rehogar cebolla y ajo en una olla con aceite.", time: 120 },
      { text: "Agregar el resto de verduras y cubrir con agua.", time: 0 },
      { text: "Cocinar tapado a fuego medio.", time: 1200 },
      { text: "Opcionalmente licuar para crema. Servir con pan.", time: 0 }
    ]
  },
  {
    id: 12,
    title: "Tostadas de Palta",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&q=80&w=1000",
    time: 10,
    calories: 320,
    mood: "healthy",
    moodLabel: "Sano",
    ingredients: [
      { name: "Pan", sub: "Tostadas de arroz o Galletitas integrales" },
      { name: "Aguacate", sub: "Hummus o Queso crema" },
      { name: "Tomate", sub: "Pepino en rodajas o Rabanitos" },
      { name: "Limón", sub: "Vinagre de sidra" }
    ],
    steps: [
      { text: "Tostar el pan hasta que esté crocante.", time: 60 },
      { text: "Pisar la palta con tenedor, agregar limón y sal.", time: 0 },
      { text: "Untar generosamente sobre el pan.", time: 0 },
      { text: "Decorar con rodajas de tomate y semillas si tenés.", time: 0 }
    ]
  },
  // === FANCY ===
  {
    id: 13,
    title: "Pasta al Pesto Casero",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=1000",
    time: 20,
    calories: 550,
    mood: "fancy",
    moodLabel: "Fancy",
    ingredients: [
      { name: "Pasta", sub: "Ñoquis o Fideos de arroz" },
      { name: "Ajo", sub: "Ajo en polvo" },
      { name: "Queso", sub: "Levadura nutricional o Ricota salada" },
      { name: "Aceite", sub: "Aceite de girasol (menos sabor)" }
    ],
    steps: [
      { text: "Cocinar la pasta al dente en abundante agua con sal.", time: 480 },
      { text: "Procesar/pisar ajo, queso rallado y aceite de oliva.", time: 0 },
      { text: "Escurrir pasta reservando media taza de agua de cocción.", time: 0 },
      { text: "Mezclar pasta con el pesto, agregando agua si queda seco.", time: 0 },
      { text: "Servir con queso rallado extra por encima.", time: 0 }
    ]
  },
  {
    id: 14,
    title: "Bruschetta Caprese",
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&q=80&w=1000",
    time: 15,
    calories: 300,
    mood: "fancy",
    moodLabel: "Fancy",
    ingredients: [
      { name: "Pan", sub: "Tostadas o Crackers" },
      { name: "Tomate", sub: "Tomates cherry o Pimiento asado" },
      { name: "Queso", sub: "Ricota o Queso crema" },
      { name: "Aceite", sub: "Aceite de girasol" },
      { name: "Ajo", sub: "Ajo en polvo" }
    ],
    steps: [
      { text: "Cortar el pan en rebanadas y tostar en horno o sartén.", time: 120 },
      { text: "Frotar un diente de ajo sobre el pan caliente.", time: 0 },
      { text: "Cortar tomates en cubitos, mezclar con aceite y sal.", time: 0 },
      { text: "Colocar queso y tomate sobre cada pan.", time: 0 },
      { text: "Terminar con un hilo de aceite de oliva.", time: 0 }
    ]
  },
  {
    id: 15,
    title: "Tarta de Verduras",
    image: "https://images.unsplash.com/photo-1608039829572-46b0e4d8a726?auto=format&fit=crop&q=80&w=1000",
    time: 50,
    calories: 450,
    mood: "fancy",
    moodLabel: "Fancy",
    ingredients: [
      { name: "Harina", sub: "Masa de tapa comprada" },
      { name: "Huevo", sub: "Mezcla de harina y agua (para vegana)" },
      { name: "Cebolla", sub: "Puerro o Cebolla de verdeo" },
      { name: "Espinaca", sub: "Acelga, Zapallito o Brócoli" },
      { name: "Queso", sub: "Ricota o Crema" }
    ],
    steps: [
      { text: "Hacer masa: harina, agua, aceite y sal. Dejar reposar.", time: 600 },
      { text: "Rehogar cebolla y espinacas. Dejar enfriar.", time: 300 },
      { text: "Mezclar verduras con huevos batidos y queso.", time: 0 },
      { text: "Estirar masa en tartera aceitada, volcar relleno.", time: 0 },
      { text: "Hornear hasta dorar.", time: 1500 }
    ]
  },
  {
    id: 16,
    title: "Peceto al Horno con Papas",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1000",
    time: 75,
    calories: 650,
    mood: "fancy",
    moodLabel: "Fancy",
    ingredients: [
      { name: "Carne", sub: "Pollo entero o Bondiola de cerdo" },
      { name: "Papa", sub: "Batata o Zapallo" },
      { name: "Cebolla", sub: "Chalota o Puerro" },
      { name: "Ajo", sub: "Ajo en polvo" },
      { name: "Vino", sub: "Caldo de carne o Cerveza" }
    ],
    steps: [
      { text: "Sellar la carne en sartén caliente con aceite por todos los lados.", time: 300 },
      { text: "Cortar papas y cebollas en cuartos. Poner en fuente para horno.", time: 0 },
      { text: "Apoyar la carne sobre las verduras, agregar vino y ajo.", time: 0 },
      { text: "Hornear a 180°C tapado con papel aluminio.", time: 2400 },
      { text: "Destapar los últimos 15 min para dorar.", time: 900 },
      { text: "Dejar reposar 10 min antes de cortar.", time: 600 }
    ]
  }
];

// ==========================================
// 2. UTILIDADES Y LÓGICA
// ==========================================
const checkHasIngredient = (items, ingredientName) => {
  if (!items || !Array.isArray(items)) return false;
  return items.some(item => {
    if (!item || !item.name) return false;
    return item.name.toLowerCase().includes(ingredientName.toLowerCase()) ||
           ingredientName.toLowerCase().includes(item.name.toLowerCase());
  });
};

const INGREDIENT_KEYWORDS = {
  'carnes': ['pollo', 'carne', 'asado', 'pescado', 'atun', 'atún', 'cerdo', 'jamon', 'jamón', 'bife', 'milanesa', 'hamburguesa', 'salchicha', 'panceta', 'chorizo'],
  'verduras': ['manzana', 'banana', 'pera', 'durazno', 'frutilla', 'limon', 'limón', 'naranja', 'tomate', 'lechuga', 'cebolla', 'ajo', 'pimiento', 'zanahoria', 'papa', 'batata', 'zapallo', 'calabaza', 'palta', 'aguacate', 'rucula', 'rúcula', 'espinaca', 'acelga', 'brocoli', 'coliflor', 'setas', 'champiñon', 'champiñón', 'cilantro', 'perejil'],
  'lacteos': ['leche', 'queso', 'huevo', 'manteca', 'yogur', 'crema', 'ricota'],
  'dulces': ['chocolate', 'galletita', 'alfajor', 'dulce', 'azucar', 'azúcar', 'miel', 'cacao', 'vainilla'],
  'despensa': ['arroz', 'fideo', 'pasta', 'harina', 'pan', 'aceite', 'sal', 'vinagre', 'lenteja', 'poroto', 'garbanzo', 'cafe', 'café', 'yerba', 'te', 'té', 'vino', 'pimienta', 'comino']
};

const ALL_INGREDIENTS_LIST = Object.values(INGREDIENT_KEYWORDS).flat().sort();

const detectCategory = (name) => {
  if (!name) return 'despensa';
  const lowerName = name.toLowerCase();
  for (const [category, terms] of Object.entries(INGREDIENT_KEYWORDS)) {
    if (terms.some(term => lowerName.includes(term))) {
      return category;
    }
  }
  return 'despensa';
};

const detectUnit = (name) => {
  if (!name) return 'u';
  const lowerName = name.toLowerCase();
  if (['leche', 'agua', 'vino', 'vinagre', 'aceite', 'caldo', 'jugo', 'crema', 'salsa', 'yogur'].some(k => lowerName.includes(k))) return 'L';
  if (['arroz', 'harina', 'azucar', 'azúcar', 'sal', 'carne', 'pollo', 'pescado', 'fideo', 'pasta', 'lenteja', 'poroto', 'garbanzo', 'queso', 'manteca'].some(k => lowerName.includes(k))) return 'kg';
  return 'u';
};

const CATEGORY_MAP = {
  'carnes': { label: 'Carnes & Proteínas', icon: '🥩', bgColor: '#E9633E', textColor: 'text-white' },
  'verduras': { label: 'Frutas & Verduras', icon: '🥦', bgColor: '#A0AF72', textColor: 'text-white' },
  'lacteos': { label: 'Lácteos & Huevos', icon: '🧀', bgColor: '#EAAA42', textColor: 'text-stone-900' },
  'despensa': { label: 'Despensa & Granos', icon: '🥫', bgColor: '#537987', textColor: 'text-white' },
  'dulces': { label: 'Dulces & Snacks', icon: '🍭', bgColor: '#E3A58A', textColor: 'text-white' },
};

// ==========================================
// 3. COMPONENTES
// ==========================================
function StepTimer({ seconds }) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const secs = time % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="mt-2 flex items-center space-x-2 bg-orange-100 p-2 rounded-lg w-fit">
      <Clock size={16} className="text-orange-600" />
      <span className="font-mono font-bold text-orange-800">{formatTime(timeLeft)}</span>
      <button onClick={() => setIsActive(!isActive)} className="p-1 bg-orange-500 text-white rounded hover:bg-orange-600">
        {isActive ? <Pause size={14} /> : <Play size={14} />}
      </button>
      <button onClick={() => { setIsActive(false); setTimeLeft(seconds); }} className="p-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300">
        <RotateCcw size={14} />
      </button>
    </div>
  );
}

// Componente extraído para evitar bug de hooks en render condicional
function CookingScreen({ recipe, onBack, onFinish, onAddToPantry }) {
  const [activeTab, setActiveTab] = useState('prep');
  const [checkedSteps, setCheckedSteps] = useState({});
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [manuallyFound, setManuallyFound] = useState({});
  const [showDone, setShowDone] = useState(false);

  const toggleFound = (idx) => {
    const wasFound = manuallyFound[idx];
    setManuallyFound(prev => ({ ...prev, [idx]: !wasFound }));
    // Si lo marca como encontrado y no estaba en alacena, agregarlo
    if (!wasFound && !recipe.ingredients[idx].has) {
      onAddToPantry(recipe.ingredients[idx].name);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="h-1/3 relative flex-shrink-0">
        <img src={recipe.image} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <button onClick={onBack} className="absolute top-6 left-6 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition">
          <ArrowLeft size={24} />
        </button>
        <div className="absolute bottom-8 left-8 text-white max-w-[80%]">
          <h2 className="text-3xl font-black leading-tight mb-2">{recipe.title}</h2>
          <div className="flex items-center text-sm font-medium opacity-90">
            <Clock size={16} className="mr-1.5" /> {recipe.time} min
            <span className="mx-3 text-white/40">•</span>
            <span className="uppercase tracking-wider text-xs font-bold bg-white/20 px-3 py-1 rounded-full">{recipe.moodLabel}</span>
          </div>
        </div>
      </div>

      <div className="flex border-b border-stone-100 sticky top-0 bg-white z-10 px-6">
        <button
          onClick={() => setActiveTab('prep')}
          className={`flex-1 py-5 text-sm font-black uppercase tracking-wider transition-all border-b-2 ${activeTab === 'prep' ? 'text-[#E9633E] border-[#E9633E]' : 'text-stone-300 border-transparent hover:text-stone-400'}`}
        >
          Ingredientes
        </button>
        <button
          onClick={() => setActiveTab('cook')}
          className={`flex-1 py-5 text-sm font-black uppercase tracking-wider transition-all border-b-2 ${activeTab === 'cook' ? 'text-[#E9633E] border-[#E9633E]' : 'text-stone-300 border-transparent hover:text-stone-400'}`}
        >
          Paso a Paso
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-[#F9F9F9]">
        {activeTab === 'prep' ? (
          <div className="space-y-3">
            <p className="text-xs text-stone-400 font-bold uppercase mb-4 tracking-widest">Lista de Compras</p>
            {recipe.ingredients.map((ing, idx) => {
              const isAvailable = ing.has || manuallyFound[idx];
              const isMissing = !isAvailable;
              return (
                <div key={idx} className={`bg-white p-4 rounded-2xl shadow-sm border border-stone-100 transition-all duration-300 ${checkedIngredients[idx] ? 'opacity-50 grayscale' : ''}`}>
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 accent-[#E9633E] rounded cursor-pointer"
                      checked={!!checkedIngredients[idx]}
                      onChange={() => setCheckedIngredients({ ...checkedIngredients, [idx]: !checkedIngredients[idx] })}
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-stone-800 font-bold text-lg ${checkedIngredients[idx] ? 'line-through decoration-2' : ''}`}>
                          {ing.name}
                        </span>
                        {isAvailable ? (
                          <span
                            onClick={() => !ing.has && toggleFound(idx)}
                            className={`text-[10px] bg-[#A0AF72]/20 text-[#A0AF72] px-2 py-1 rounded-lg font-bold flex items-center gap-1 ${!ing.has ? 'cursor-pointer hover:bg-[#A0AF72]/30' : ''}`}
                          >
                            {ing.has ? "En Alacena" : "¡Lo tengo!"}
                            {!ing.has && <Check size={10} />}
                          </span>
                        ) : (
                          <button
                            onClick={() => toggleFound(idx)}
                            className="text-[10px] bg-[#E9633E]/10 text-[#E9633E] px-2 py-1 rounded-lg font-bold hover:bg-[#E9633E]/20 transition-colors flex items-center gap-1"
                          >
                            Falta <RefreshCw size={10} />
                          </button>
                        )}
                      </div>
                      {isMissing && ing.sub && (
                        <div className="mt-2 inline-block animate-fadeIn">
                          <div className="text-xs text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg font-medium flex items-center">
                            <RotateCcw size={12} className="mr-1.5" /> Reemplazo: {ing.sub}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-8 pb-10 pt-2">
            {recipe.steps.map((step, idx) => (
              <div key={idx} className={`relative pl-6 transition-all duration-500 ${checkedSteps[idx] ? 'opacity-40' : 'opacity-100'}`}>
                <div className="absolute left-0 top-2 bottom-0 w-0.5 bg-stone-200"></div>
                <div className="absolute left-[-5px] top-0 w-3 h-3 rounded-full bg-[#E9633E] ring-4 ring-white"></div>
                <div
                  onClick={() => setCheckedSteps({ ...checkedSteps, [idx]: !checkedSteps[idx] })}
                  className="relative z-10 cursor-pointer group"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-xs font-black uppercase tracking-widest ${checkedSteps[idx] ? 'text-stone-400' : 'text-[#E9633E]'}`}>Paso {idx + 1}</span>
                    {checkedSteps[idx] && <Check size={20} className="text-[#A0AF72]" />}
                  </div>
                  <p className={`text-stone-700 text-lg leading-relaxed font-medium ${checkedSteps[idx] ? 'line-through decoration-stone-300' : ''}`}>{step.text}</p>
                  {step.time > 0 && !checkedSteps[idx] && <StepTimer seconds={step.time} />}
                </div>
              </div>
            ))}
            {showDone ? (
              <div className="mt-12 text-center animate-fadeIn">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-black text-stone-800 mb-2">¡Buen provecho!</h3>
                <p className="text-stone-400 text-sm mb-6">Plato completado exitosamente</p>
                <button
                  onClick={onFinish}
                  className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold text-lg hover:bg-black transition-colors"
                >
                  Volver al inicio
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowDone(true)}
                className="w-full mt-12 py-5 bg-[#A0AF72] text-white rounded-2xl font-black text-lg shadow-xl shadow-[#A0AF72]/30 flex items-center justify-center space-x-2 hover:bg-[#8f9d63] transition-colors"
              >
                <Check size={24} />
                <span>¡Plato Terminado!</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 4. COMPONENTE PRINCIPAL (APP)
// ==========================================
const DEFAULT_PANTRY = [
  { name: 'Pollo', category: 'carnes', quantity: 1, unit: 'kg' },
  { name: 'Arroz', category: 'despensa', quantity: null, unit: 'kg' },
  { name: 'Ajo', category: 'verduras', quantity: 3, unit: 'u' },
  { name: 'Huevos', category: 'lacteos', quantity: 6, unit: 'u' },
  { name: 'Leche', category: 'lacteos', quantity: 1, unit: 'L' },
  { name: 'Tomate', category: 'verduras', quantity: null, unit: 'u' },
  { name: 'Chocolate', category: 'dulces', quantity: null, unit: 'g' }
];

const loadPantry = () => {
  try {
    const saved = localStorage.getItem('cocina-app-pantry');
    if (saved) return JSON.parse(saved);
  } catch (e) { /* ignore */ }
  return DEFAULT_PANTRY;
};

export default function App() {
  const [screen, setScreen] = useState('home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [finalPantryList, setFinalPantryList] = useState(loadPantry);

  const [editingItem, setEditingItem] = useState(null);
  const [editQty, setEditQty] = useState('');
  const [editUnit, setEditUnit] = useState('');
  const [newItem, setNewItem] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showQtyInput, setShowQtyInput] = useState(false);
  const [newQty, setNewQty] = useState('');
  const [newUnit, setNewUnit] = useState('u');
  const [timeMood, setTimeMood] = useState(30);
  const [selectedMood, setSelectedMood] = useState('energetic');
  const [duplicateWarning, setDuplicateWarning] = useState('');

  // Persistencia: guardar alacena en localStorage
  useEffect(() => {
    localStorage.setItem('cocina-app-pantry', JSON.stringify(finalPantryList));
  }, [finalPantryList]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setNewItem(val);
    if (val.length > 1) {
      const filtered = ALL_INGREDIENTS_LIST.filter(item =>
        item.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (val) => {
    setNewItem(val);
    setShowSuggestions(false);
    setNewUnit(detectUnit(val));
  };

  const addItem = () => {
    if (newItem.trim()) {
      const trimmed = newItem.trim();
      // Prevenir duplicados
      const exists = finalPantryList.some(item =>
        item.name.toLowerCase() === trimmed.toLowerCase()
      );
      if (exists) {
        setDuplicateWarning(`"${trimmed}" ya está en tu alacena`);
        setTimeout(() => setDuplicateWarning(''), 2000);
        return;
      }
      const category = detectCategory(trimmed);
      const quantity = showQtyInput && newQty ? parseFloat(newQty) : null;
      const unit = showQtyInput ? newUnit : detectUnit(trimmed);
      setFinalPantryList([...finalPantryList, { name: trimmed, category, quantity, unit }]);
      setNewItem('');
      setNewQty('');
      setShowSuggestions(false);
      setDuplicateWarning('');
    }
  };

  const removeItem = (itemToRemove) => {
    setFinalPantryList(finalPantryList.filter(item => item !== itemToRemove));
  };

  const openEditModal = (item, idx) => {
    setEditingItem({ ...item, idx });
    setEditQty(item.quantity === null ? '' : item.quantity);
    setEditUnit(item.unit || detectUnit(item.name));
  };

  const saveEdit = () => {
    if (!editingItem) return;
    const updatedList = [...finalPantryList];
    updatedList[editingItem.idx] = {
      ...updatedList[editingItem.idx],
      quantity: editQty === '' || editQty === 0 ? null : parseFloat(editQty),
      unit: editUnit
    };
    setFinalPantryList(updatedList);
    setEditingItem(null);
  };

  const getProcessedRecipes = () => {
    return RECIPES_DB
      .filter(recipe => recipe.mood === selectedMood && recipe.time <= timeMood)
      .map(recipe => {
        const recipeWithStatus = recipe.ingredients.map(ing => ({
          ...ing,
          has: checkHasIngredient(finalPantryList, ing.name)
        }));
        const totalIng = recipeWithStatus.length;
        const haveIng = recipeWithStatus.filter(i => i.has).length;
        const matchScore = Math.round((haveIng / totalIng) * 100);
        return { ...recipe, ingredients: recipeWithStatus, matchScore };
      }).sort((a, b) => b.matchScore - a.matchScore);
  };

  // --- PANTALLA HOME ---
  const renderHome = () => (
    <div className="flex flex-col h-full bg-[#E8E6E1] relative font-sans">
      <div className="flex-1 overflow-y-auto p-6 pb-24">
        <div className="mt-8 mb-6">
          <h1 className="text-3xl font-black text-stone-800 leading-tight tracking-tight">
            Hola, <span className="text-[#E9633E]">Chef.</span>
          </h1>
          <p className="text-stone-500 text-sm mt-1 font-medium">Tu cocina está lista.</p>
        </div>
        <div className="mt-4 space-y-8">
        <div className="rounded-2xl p-6 shadow-xl relative overflow-hidden group border border-white/20" style={{ backgroundColor: '#537987' }}>
          <div className="relative z-10 text-white">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm">
                  <ShoppingBag className="text-white" size={18} />
                </div>
                <h2 className="font-bold text-lg tracking-wide">Alacena</h2>
              </div>
              <button onClick={() => setScreen('inventory')} className="text-xs bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors font-semibold backdrop-blur-sm">
                Abrir
              </button>
            </div>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newItem}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === 'Enter' && addItem()}
                placeholder="Agregar ingrediente..."
                className="flex-1 bg-black/20 border border-white/10 text-white text-sm rounded-xl px-4 py-3 outline-none placeholder-white/50"
              />
              <button onClick={addItem} className="bg-[#E9633E] text-white p-3 rounded-xl hover:bg-[#d85532] transition-colors shadow-lg">
                <Plus size={20} />
              </button>
            </div>
            {duplicateWarning && (
              <div className="mb-2 text-xs text-amber-200 bg-amber-900/30 px-3 py-2 rounded-lg animate-fadeIn">
                ⚠️ {duplicateWarning}
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {finalPantryList.slice(0, 4).map((item, idx) => (
                <span key={idx} className="bg-white/10 text-white/90 text-xs px-3 py-1.5 rounded-lg border border-white/5 flex items-center backdrop-blur-sm">
                  {item.name}
                </span>
              ))}
              {finalPantryList.length > 4 && (
                <span className="text-xs text-white/60 py-1.5 px-2">+{finalPantryList.length - 4}</span>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">Tiempo</label>
              <span className="text-[#E9633E] font-bold text-xl">{timeMood} <span className="text-sm text-stone-400 font-normal">min</span></span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              step="5"
              value={timeMood}
              onChange={(e) => setTimeMood(e.target.value)}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#E9633E]"
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">Mood</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'healthy', icon: Leaf, label: 'Sano' },
                { id: 'comfort', icon: Coffee, label: 'Comfort' },
                { id: 'fancy', icon: Heart, label: 'Fancy' },
                { id: 'energetic', icon: Zap, label: 'Power' },
              ].map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`p-4 rounded-2xl flex items-center space-x-3 transition-all duration-300 ${
                    selectedMood === mood.id
                      ? 'bg-[#E9633E] text-white shadow-xl scale-[1.02]'
                      : 'bg-white text-stone-500 hover:bg-white/80 shadow-sm'
                  }`}
                >
                  <mood.icon size={20} />
                  <span className="font-bold text-sm">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 pt-3 bg-gradient-to-t from-[#E8E6E1] via-[#E8E6E1] to-transparent">
        <button
          onClick={() => setScreen('results')}
          className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:bg-black transform transition active:scale-95 flex items-center justify-center space-x-3"
        >
          <ChefHat size={22} />
          <span>Cocinar Algo</span>
        </button>
      </div>
    </div>
  );

  // --- PANTALLA INVENTARIO ---
  const renderInventory = () => (
    <div className="flex flex-col h-full bg-[#E8E6E1] relative font-sans">
      <div className="pt-6 px-6 pb-4 bg-[#E8E6E1] sticky top-0 z-30 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setScreen('home')} className="p-3 -ml-3 rounded-full hover:bg-stone-200/50 transition-colors">
            <ArrowLeft size={24} className="text-stone-800" />
          </button>
          <h2 className="text-2xl font-bold text-stone-800 tracking-tight">Tu Alacena</h2>
          <div className="w-10"></div>
        </div>
        <div className="flex flex-col gap-2 relative">
          <div className="flex gap-2">
            <div className="flex-1 flex bg-white rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-[#E9633E]/50 transition-all items-center relative z-20">
              <input
                type="text"
                value={newItem}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === 'Enter' && addItem()}
                placeholder="Ej: Manzana, Arroz..."
                className="flex-1 bg-transparent border-none px-5 py-4 outline-none text-stone-800 placeholder-stone-400 font-medium rounded-2xl"
                autoComplete="off"
              />
              <button
                onClick={() => setShowQtyInput(!showQtyInput)}
                className={`mr-2 p-2 rounded-xl transition-colors ${showQtyInput ? 'bg-[#E9633E]/10 text-[#E9633E]' : 'text-stone-400 hover:bg-stone-100'}`}
              >
                <Scale size={20} />
              </button>
            </div>
            <button onClick={addItem} className="bg-stone-900 text-white p-4 rounded-2xl hover:bg-black transition-colors shadow-lg z-20">
              <Plus size={24} />
            </button>
          </div>
          {showQtyInput && (
            <div className="flex gap-2 animate-fadeIn bg-white p-2 rounded-xl shadow-sm border border-stone-100">
              <input
                type="number"
                value={newQty}
                onChange={(e) => setNewQty(e.target.value)}
                placeholder="Cant."
                className="flex-1 bg-stone-50 rounded-lg px-3 py-2 text-sm font-bold text-stone-800 outline-none"
              />
              <select
                value={newUnit}
                onChange={(e) => setNewUnit(e.target.value)}
                className="w-20 bg-stone-50 rounded-lg px-2 py-2 text-sm font-bold text-stone-800 outline-none"
              >
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="L">L</option>
                <option value="ml">ml</option>
                <option value="u">u</option>
                <option value="paq">paq</option>
              </select>
            </div>
          )}
          {duplicateWarning && (
            <div className="mt-2 text-xs text-amber-700 bg-amber-50 px-3 py-2 rounded-xl animate-fadeIn font-medium">
              ⚠️ {duplicateWarning}
            </div>
          )}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-[calc(100%-4rem)] mt-2 bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden z-50">
              {suggestions.map((sug, idx) => (
                <div
                  key={idx}
                  onClick={() => selectSuggestion(sug)}
                  className="px-5 py-3 hover:bg-stone-50 cursor-pointer text-stone-700 font-medium border-b border-stone-50 last:border-0"
                >
                  {sug}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-20 pt-2 space-y-4">
        {finalPantryList.length === 0 ? (
          <div className="text-center mt-20 text-stone-400">
            <ShoppingBag size={64} className="mx-auto mb-6 opacity-20" />
            <p className="font-medium">Tu alacena está vacía.</p>
          </div>
        ) : (
          <>
            {Object.keys(CATEGORY_MAP).map(catKey => {
              const catItems = finalPantryList.filter(i => i.category === catKey);
              if (catItems.length === 0) return null;
              const catConfig = CATEGORY_MAP[catKey];
              return (
                <div
                  key={catKey}
                  className={`relative rounded-2xl p-6 shadow-sm min-h-[120px] transition-transform hover:-translate-y-1 ${catConfig.textColor}`}
                  style={{ backgroundColor: catConfig.bgColor }}
                >
                  <div className="flex items-center mb-6 opacity-90">
                    <span className="text-2xl mr-3">{catConfig.icon}</span>
                    <h3 className="font-bold text-lg tracking-wide uppercase">{catConfig.label}</h3>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {catItems.map((item, idx) => {
                      const realIndex = finalPantryList.indexOf(item);
                      return (
                        <div
                          key={idx}
                          onClick={() => openEditModal(item, realIndex)}
                          className="group cursor-pointer flex items-baseline hover:opacity-75 transition-opacity"
                        >
                          <span className="font-bold text-lg leading-none tracking-tight">{item.name}</span>
                          {item.quantity !== null && (
                            <span className="ml-1.5 text-sm font-normal opacity-70">{item.quantity}{item.unit}</span>
                          )}
                          <button
                            onClick={(e) => { e.stopPropagation(); removeItem(item); }}
                            className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-black/10 rounded-full"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <div className="h-24"></div>
          </>
        )}
      </div>
      {editingItem && (
        <div className="absolute inset-0 bg-stone-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#E8E6E1] rounded-[2rem] p-6 w-full max-w-sm shadow-2xl border border-white/50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black text-stone-800">{editingItem.name}</h3>
              <button onClick={() => setEditingItem(null)} className="p-2 bg-stone-200/50 rounded-full text-stone-500 hover:bg-stone-300/50">
                <X size={20} />
              </button>
            </div>
            <div className="flex gap-3 mb-8">
              <div className="flex-1">
                <label className="text-[10px] font-bold text-stone-400 mb-2 block uppercase tracking-wider">Cantidad</label>
                <input
                  type="number"
                  value={editQty}
                  onChange={(e) => setEditQty(e.target.value)}
                  placeholder="∞"
                  className="w-full bg-white rounded-2xl px-5 py-4 font-bold text-xl text-stone-800 shadow-sm outline-none focus:ring-2 focus:ring-[#E9633E] placeholder-stone-300"
                />
              </div>
              <div className="w-1/3">
                <label className="text-[10px] font-bold text-stone-400 mb-2 block uppercase tracking-wider">Unidad</label>
                <div className="relative">
                  <select
                    value={editUnit}
                    onChange={(e) => setEditUnit(e.target.value)}
                    className="w-full bg-white rounded-2xl px-4 py-4 font-bold text-lg text-stone-800 shadow-sm outline-none appearance-none"
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="L">L</option>
                    <option value="ml">ml</option>
                    <option value="u">u</option>
                    <option value="paq">paq</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                </div>
              </div>
            </div>
            <button
              onClick={saveEdit}
              className="w-full py-4 bg-stone-900 text-white font-bold text-lg rounded-2xl shadow-xl flex justify-center items-center gap-2 hover:bg-black transform transition active:scale-95"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // --- PANTALLA RESULTADOS ---
  const renderResults = () => {
    const recipes = getProcessedRecipes();
    return (
      <div className="flex flex-col h-full bg-[#E8E6E1]">
        <div className="bg-[#E8E6E1] p-6 pb-2 z-10 sticky top-0">
          <div className="flex items-center mb-6">
            <button onClick={() => setScreen('home')} className="p-3 -ml-3 rounded-full hover:bg-stone-200/50 transition-colors">
              <ArrowLeft size={24} className="text-stone-800" />
            </button>
            <div className="ml-2">
              <h2 className="text-2xl font-bold text-stone-800 leading-none">Resultados</h2>
              <span className="text-xs text-stone-400 font-medium mt-1 block">Basado en tus {finalPantryList.length} ingredientes</span>
            </div>
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-4">
            <span className="px-4 py-2 bg-[#E9633E]/10 text-[#E9633E] text-sm font-bold rounded-xl whitespace-nowrap">
              {timeMood} min máx
            </span>
            <span className="px-4 py-2 bg-[#A0AF72]/10 text-[#A0AF72] text-sm font-bold rounded-xl capitalize whitespace-nowrap">
              Mood: {selectedMood}
            </span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-20 space-y-4">
          {recipes.length === 0 && (
            <div className="text-center mt-16 px-6">
              <ChefHat size={64} className="mx-auto mb-6 text-stone-300" />
              <h3 className="text-xl font-bold text-stone-600 mb-2">No hay recetas</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                No encontramos recetas para <strong>{selectedMood}</strong> en <strong>{timeMood} min</strong>.
                Probá subir el tiempo o cambiar el mood.
              </p>
              <button
                onClick={() => setScreen('home')}
                className="mt-6 px-6 py-3 bg-[#E9633E] text-white rounded-2xl font-bold text-sm hover:bg-[#d85532] transition-colors"
              >
                Ajustar filtros
              </button>
            </div>
          )}
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-[2rem] shadow-sm overflow-hidden transform transition hover:scale-[1.02] active:scale-95 cursor-pointer relative group"
              onClick={() => { setSelectedRecipe(recipe); setScreen('cooking'); }}
            >
              <div className="h-56 relative">
                <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className={`absolute top-4 right-4 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-black shadow-lg ${
                  recipe.matchScore === 100 ? 'bg-[#A0AF72] text-white' :
                  recipe.matchScore >= 70 ? 'bg-white text-[#E9633E]' : 'bg-stone-800 text-white'
                }`}>
                  {recipe.matchScore === 100 ? '¡Tienes Todo!' : `${recipe.matchScore}% Match`}
                </div>
              </div>
              <div className="p-6 relative">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-black text-stone-800 w-3/4 leading-tight">{recipe.title}</h3>
                  <div className="flex flex-col items-end text-stone-400 text-xs font-bold bg-stone-100 p-2 rounded-xl">
                    <span className="flex items-center"><Clock size={12} className="mr-1" /> {recipe.time}m</span>
                    <span className="flex items-center mt-1 text-[#E9633E]"><Flame size={12} className="mr-1" /> {recipe.calories}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-stone-100">
                  {recipe.ingredients.some(ing => !ing.has) ? (
                    <div className="flex items-start text-amber-600 bg-amber-50 p-3 rounded-xl text-xs font-bold">
                      <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span>Falta: {recipe.ingredients.filter(i => !i.has).map(i => i.name).join(', ')}</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-[#A0AF72] bg-[#A0AF72]/10 p-3 rounded-xl text-xs font-bold">
                      <Check size={16} className="mr-2" />
                      <span>¡Puedes cocinarlo ya!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-stone-200 p-4 font-sans">
      <div className="w-[375px] h-[812px] bg-[#E8E6E1] rounded-[3rem] overflow-hidden shadow-2xl relative border-[8px] border-stone-900 ring-2 ring-stone-400/50">
        <div className="absolute top-0 w-full h-8 bg-[#E8E6E1] z-50 flex justify-between items-center px-8 mt-2">
          <span className="text-xs font-bold text-black">9:41</span>
          <div className="w-24 h-6 bg-black rounded-b-2xl absolute left-1/2 -translate-x-1/2 top-0"></div>
          <div className="flex space-x-1.5">
            <div className="w-4 h-4 bg-black rounded-full text-[8px] flex items-center justify-center text-white font-bold">5G</div>
            <div className="w-5 h-3 bg-black rounded-sm border border-black"></div>
          </div>
        </div>
        <div className="h-full pt-10">
          {screen === 'home' && renderHome()}
          {screen === 'inventory' && renderInventory()}
          {screen === 'results' && renderResults()}
          {screen === 'cooking' && selectedRecipe && (
            <CookingScreen
              recipe={selectedRecipe}
              onBack={() => setScreen('results')}
              onFinish={() => setScreen('home')}
              onAddToPantry={(name) => {
                const exists = finalPantryList.some(item => item.name.toLowerCase() === name.toLowerCase());
                if (!exists) {
                  setFinalPantryList(prev => [...prev, {
                    name,
                    category: detectCategory(name),
                    quantity: null,
                    unit: detectUnit(name)
                  }]);
                }
              }}
            />
          )}
        </div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-stone-900 rounded-full z-50 opacity-90"></div>
      </div>
    </div>
  );
}
