const products = [
  {
    id: 1,
    nombre: "Vitamina C 1000mg",
    precio: "$5.990",
    imagen: "/images/producto-vitamina-c.jpg",
    accion_terapeutica: "Refuerzo del sistema inmunológico",
    principio_activo: "Ácido ascórbico",
    ficha_tecnica: "Suplemento de vitamina C efervescente para adultos. Contribuye a la función inmune normal y protección frente al daño oxidativo.",
    stock: 12,
    sku: "VC1000-001",
    categoria: "Vitaminas",
    laboratorio: "Germán Pharma",
    precio_fraccionado: "$200 / tableta"
  },
  {
    id: 2,
    nombre: "Mascarilla KN95",
    precio: "$1.500",
    imagen: "/images/producto-mascarilla-kn95.jpg",
    accion_terapeutica: "Prevención de transmisión de enfermedades respiratorias",
    ficha_tecnica: "Mascarilla desechable tipo KN95 con 5 capas de filtrado, eficacia ≥ 95%. Uso recomendado para zonas de alto riesgo.",
    stock: 25,
    sku: "MSK95-002",
    categoria: "Accesorios médicos",
    laboratorio: "ProtecCare",
    precio_fraccionado: "$1.500 / unidad"
  },
  {
    id: 3,
    nombre: "Gel Analgésico",
    precio: "$6.990",
    imagen: "/images/producto-gel-analgesico.jpg",
    accion_terapeutica: "Analgésico tópico antiinflamatorio",
    principio_activo: "Diclofenaco dietilamónico",
    ficha_tecnica: "Tratamiento local del dolor muscular y articular. Alivio de inflamaciones leves causadas por lesiones o artritis.",
    stock: 8,
    sku: "GA100-003",
    categoria: "Medicamentos",
    laboratorio: "Laboratorios Flogoderm",
    precio_fraccionado: "$350 / aplicación"
  },
  {
    id: 4,
    nombre: "Termómetro Digital",
    precio: "$4.200",
    imagen: "/images/producto-termometro-digital.jpg",
    accion_terapeutica: "Medición precisa de temperatura corporal",
    ficha_tecnica: "Termómetro infrarrojo sin contacto para uso clínico y doméstico. Pantalla digital, memoria interna y respuesta en segundos.",
    stock: 10,
    sku: "TDG-004",
    categoria: "Accesorios médicos",
    laboratorio: "ThermoTech",
    precio_fraccionado: "$4.200 / unidad"
  },
  {
    id: 5,
    nombre: "Vitamina D3",
    precio: "$7.990",
    imagen: "/images/producto-vitamina-d3.jpg",
    accion_terapeutica: "Suplemento nutricional para huesos y sistema inmune",
    principio_activo: "Colecalciferol (Vitamina D3)",
    ficha_tecnica: "Complemento alimenticio en cápsulas blandas. Mejora la absorción de calcio y apoya el sistema inmune. 800 UI por cápsula.",
    stock: 15,
    sku: "VD3-005",
    categoria: "Vitaminas",
    laboratorio: "NutriLife",
    precio_fraccionado: "$266 / cápsula"
  },
  {
    id: 6,
    nombre: "Alcohol Gel 70%",
    precio: "$2.500",
    imagen: "/images/producto-alcohol-gel.jpg",
    accion_terapeutica: "Desinfección de manos sin enjuague",
    principio_activo: "Etanol al 70%",
    ficha_tecnica: "Gel antibacterial de uso externo. Elimina el 99.9% de gérmenes y bacterias sin necesidad de agua. Contiene humectantes.",
    stock: 20,
    sku: "AG70-006",
    categoria: "Higiene",
    laboratorio: "CleanHands",
    precio_fraccionado: "$125 / ml"
  }
];

export default products;
