let genericProducts = [
    {
        name: "Pollo entero",
        img: "https://res.cloudinary.com/dfxn0bmo9/image/upload/v1670082361/icons/carniceria/carniceria-13-19_ha8pue.svg",
        category: "carnicería",
        productCode: [
            {
                supermarketName: "carrefour",
                supermarketCode: "R-791562917"
            },
            {
                supermarketName: "dia",
                supermarketCode: "6423"
            },
            {
                supermarketName: "alcampo",
                supermarketCode: "43298"
            }
        ],
        supermarkets: []
    },
    {
        name: "Filete de vacuno",
        img: "https://res.cloudinary.com/dfxn0bmo9/image/upload/v1670082361/icons/carniceria/carniceria-11_dapccs.svg",
        category: "carnicería",
        productCode: [
            {
                supermarketName: "carrefour",
                supermarketCode: "R-prod1070081"
            },
            {
                supermarketName: "dia",
                supermarketCode: "181288"
            },
            {
                supermarketName: "alcampo",
                supermarketCode: "78424"
            }
        ],
        supermarkets: []
    },
    {
        name: "Filete de salmón",
        img: "https://res.cloudinary.com/dfxn0bmo9/image/upload/v1670082489/icons/pescaderia/pescaderia-02_ypdsny.svg",
        category: "pescadería",
        productCode: [
            {
                supermarketName: "carrefour",
                supermarketCode: "R-prod261161"
            },
            {
                supermarketName: "dia",
                supermarketCode: "162012"
            },
            {
                supermarketName: "alcampo",
                supermarketCode: "74418"
            }
        ],
        supermarkets: []
    },
    {
        name: "Filete de merluza",
        img: "https://res.cloudinary.com/dfxn0bmo9/image/upload/v1670082489/icons/pescaderia/pescaderia-04_kllonw.svg",
        category: "pescadería",
        productCode: [
            {
                supermarketName: "carrefour",
                supermarketCode: "R-prod395352"
            },
            {
                supermarketName: "dia",
                supermarketCode: "192291"
            },
            {
                supermarketName: "alcampo",
                supermarketCode: "82345"
            }
        ],
        supermarkets: []
    },
    {
        name: "Botella de agua 1,5L",
        img: "https://res.cloudinary.com/dfxn0bmo9/image/upload/v1670082703/icons/bebidas/bebidas-06_krgqlb.svg",
        category: "bebidas",
        productCode: [
            {
                supermarketName: "carrefour",
                supermarketCode: "R-695701669"
            },
            {
                supermarketName: "dia",
                supermarketCode: "26995"
            },
            {
                supermarketName: "alcampo",
                supermarketCode: "32868"
            }
        ],
        supermarkets: []
    },
    {
        name: "Zumo de naranja con pulpa 1L",
        img: "https://res.cloudinary.com/dfxn0bmo9/image/upload/v1670082703/icons/bebidas/bebidas-09-18_sejyc2.svg",
        category: "bebidas",
        productCode: [
            {
                supermarketName: "carrefour",
                supermarketCode: "R-823705656"
            },
            {
                supermarketName: "dia",
                supermarketCode: "50690"
            },
            {
                supermarketName: "alcampo",
                supermarketCode: "71695"
            }
        ],
        supermarkets: []
    },
    {
        name: "Croquetas congeladas de Jamón 500g",
        img: "https://res.cloudinary.com/dfxn0bmo9/image/upload/v1670082778/icons/congelados/congelados-25_y67dzp.svg",
        category: "congelados",
        productCode: [
            {
                supermarketName: "carrefour",
                supermarketCode: "R-VC4AECOMM-690584"
            },
            {
                supermarketName: "dia",
                supermarketCode: "52974"
            },
            {
                supermarketName: "alcampo",
                supermarketCode: "67042"
            }
        ],
        supermarkets: []
    },
    {
        name: "Guisantes congelados 1Kg",
        img: "https://res.cloudinary.com/dfxn0bmo9/image/upload/v1670082778/icons/congelados/congelados-22_hbacuh.svg",
        category: "congelados",
        productCode: [
            {
                supermarketName: "carrefour",
                supermarketCode: "R-531705261"
            },
            {
                supermarketName: "dia",
                supermarketCode: "263266"
            },
            {
                supermarketName: "alcampo",
                supermarketCode: "69545"
            }
        ],
        supermarkets: []
    },
    {
        name: "Leche semidesnatada 1L",
        img: "https://res.cloudinary.com/dfxn0bmo9/image/upload/v1670082556/icons/lacteos/lacteos-27_wz8tiv.svg",
        category: "lácteos",
        productCode: [
            {
                supermarketName: "carrefour",
                supermarketCode: "R-521007071"
            },
            {
                supermarketName: "dia",
                supermarketCode: "504"
            },
            {
                supermarketName: "alcampo",
                supermarketCode: "53549"
            }
        ],
        supermarkets: []
    },
    {
        name: "Mantequilla con sal 250g",
        img: "https://res.cloudinary.com/dfxn0bmo9/image/upload/v1670082556/icons/lacteos/lacteos-28_ejjltw.svg",
        category: "lácteos",
        productCode: [
            {
                supermarketName: "carrefour",
                supermarketCode: "R-fprod1350153"
            },
            {
                supermarketName: "dia",
                supermarketCode: "270690"
            }
        ],
        supermarkets: []
    },
    {
        name: "Pack macarrones 1Kg",
        img: "https://res.cloudinary.com/dfxn0bmo9/image/upload/v1670082708/icons/despensa/despensa-15_pkfn6t.svg",
        category: "despensa",
        productCode: [
            {
                supermarketName: "carrefour",
                supermarketCode: "R-544501833"
            },
            {
                supermarketName: "dia",
                supermarketCode: "50973"
            },
            {
                supermarketName: "alcampo",
                supermarketCode: "27254"
            }
        ],
        supermarkets: []
    },
    {
        name: "Aceite de oliva virgen extra 1L",
        img: "https://res.cloudinary.com/dfxn0bmo9/image/upload/v1670082708/icons/despensa/despensa-14_fhjxwi.svg",
        category: "despensa",
        productCode: [
            {
                supermarketName: "carrefour",
                supermarketCode: "R-520660335"
            },
            {
                supermarketName: "dia",
                supermarketCode: "112529"
            },
            {
                supermarketName: "alcampo",
                supermarketCode: "29834"
            }
        ],
        supermarkets: []
    }
]

module.exports = genericProducts