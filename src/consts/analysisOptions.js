export const options = [
    {
        algorithm: 'Regresión lineal',
        operations: [
            'Graficar puntos',
            'Función de tendencia',
            'Predicción de tendencia',
        ],
        fields: ['Variable independiente', 'Variable dependiente'],
        filter: ['Tiempo']
    },
    {
        algorithm: 'Regresión polinomial',
        operations: [
            'Graficar puntos',
            'Función de tendencia',
            'Predicción de tendencia',
        ],
        fields: ['Variable independiente', 'Variable dependiente'],
        filter: ['Tiempo']
    },
    {
        algorithm: 'Clasificador gaussiano',
        operations: ['Predicción'],
        fields: [],
        filter: []
    },
    {
        algorithm: 'Clasificador de árboles de decisión',
        operations: ['Grafica de árbol'],
        fields: [],
        filter: []
    },
    {
        algorithm: 'Redes neuronales',
        operations: ['Predicción'],
        fields: [],
        filter: []
    },
];