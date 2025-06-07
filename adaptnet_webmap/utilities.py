COUNTY_NAME_PROPERTY = "gen"

LAYER_METADATA = {
    "Luftqualität": {
        "Gegenwart": {
            "headers": {
                "Luftqualität Gegenwart Faktor 1 (PM2.5)": {
                    "gering": 0,
                    "mittel": 1,
                    "hoch": 2,
                },
                "Luftqualität Gegenwart Faktor 1 (PM10)": {
                    "gering": 0,
                    "mittel": 1,
                    "hoch": 2,
                },
                "Luftqualität Gegenwart Faktor 1 (NO2)": {
                    "gering": 0,
                    "mittel": 1,
                    "hoch": 2,
                },
                "Luftqualität Gegenwart Faktor 1 (O3)": {
                    "gering": 0,
                    "mittel": 1,
                    "hoch": 2,
                },
                "Luftqualität Gegenwart Faktor 2 (Hitze)": {
                    "gering": 0,
                    "niedrig": 0.5,
                    "mittel": 1,
                    "hoch": 1.5,
                    "kritisch": 2,
                },
                "Luftqualität Gegenwart Summe": {"Maximum": 10},
                "Luftqualität Gegenwart": None,
            },
        },
        "Zukunft": {
            "headers": {
                "Luftqualität Zukunft Faktor 1 (PM2.5)": {"abnehmend": -0.5},
                "Luftqualität Zukunft Faktor 1 (PM10)": {"abnehmend": -0.5},
                "Luftqualität Zukunft Faktor 1 (NO2)": {"abnehmend": -0.5},
                "Luftqualität Zukunft Faktor 1 (O3)": {"stagniernd": 0},
                "Luftqualität Zukunft Faktor 2 (Bevölkerungsprognose)": {
                    "stark abnehmend": -1,
                    "eher abnehmend": -0.5,
                    "stagnierend": 0,
                    "eher zunehmend": 0.5,
                    "stark zunehmend": 1,
                },
                "Luftqualität Zukunft Faktor 3 (Hitze)": {
                    "stagnierend": 0,
                    "leicht zunehmend": 1,
                    "zunehmend": 2,
                    "stark zunehmend": 3,
                    "kritisch zunehmend": 4,
                },
                "Luftqualität Zukunft Summe": {"Maximum": 10},
                "Luftqualität Zukunft": None,
            },
        },
    },
    "Allergene": {
        "Gegenwart": {
            "headers": {
                "Allergene Gegenwart Faktor 1 (Prozessionsspinner)": {
                    "nicht relevant": 0,
                    "relevant": 1,
                },
                "Allergene Gegenwart Faktor 2 (Heuschnupfen)": {
                    "nicht relevant": 0,
                    "gering": 0.25,
                    "mittel": 0.5,
                    "hoch": 0.75,
                    "sehr hoch": 1,
                },
                "Allergene Gegenwart Faktor 3 (Pollen)": {"hoch": 2},
                "Allergene Gegenwart Faktor 4 (Luftqualität)": {
                    "gering": 0,
                    "niedrig": 0.5,
                    "mittel": 1,
                    "hoch": 1.5,
                    "kritisch": 2,
                },
                "Allergene Gegenwart Summe": {"Maximum": 6},
                "Allergene Gegenwart": None,
            },
        },
        "Zukunft": {
            "headers": {
                "Allergene Zukunft Faktor 1 (Prozessionsspinner)": {
                    "stagnierend": 0,
                    "zunehmend": 0.5,
                },
                "Allergene Zukunft Faktor 2 (Bevölkerungsprognose)": {
                    "stark abnehmend": -0.5,
                    "eher abnehmend": -0.25,
                    "stagnierend": 0,
                    "eher zunehmend": 0.25,
                    "stark zunehmend": 0.5,
                },
                "Allergene Zukunft Faktor 3 (Temperatur)": {
                    "stagnierend": 0,
                    "zunehmend": 1,
                },
                "Allergene Zukunft Faktor 4 (Luftqualtät)": {
                    "abnehmend": -0.5,
                    "stagnierend": 0,
                    "zunehmend": 0.5,
                },
                "Allergene Zukunft Summe": {"Maximum": 6},
                "Allergene Zukunft": None,
            },
        },
    },
    "Überschwemmung": {
        "Gegenwart": {
            "headers": {
                "Überschwemmung Gegenwart Faktor 1 (Starkniederschlag)": {
                    "gering": 0,
                    "mittel": 1,
                    "hoch": 2,
                },
                "Überschwemmung Gegenwart Faktor 2 (Hochwassergefahr)": {
                    "nicht relevant": 0,
                    "gering": 0.5,
                    "mittel": 1,
                    "hoch": 1.5,
                    "sehr hoch": 2,
                },
                "Überschwemmung Gegenwart Faktor 3 (Kreistyp)": {
                    "nicht relevant": 0,
                    "gering": 0.25,
                    "mittel": 0.5,
                    "hoch": 1,
                },
                "Überschwemmung Gegenwart Faktor 4 (Siedlungs-und Verkehrsfläche)": {  # noqa
                    "gering": 0,
                    "mittel": 0.5,
                    "hoch": 1,
                },
                "Überschwemmung Gegenwart Summe": {"Maximum": 6},
                "Überschwemmung Gegenwart": None,
            },
        },
        "Zukunft": {
            "headers": {
                "Überschwemmung Zukunft Faktor 1 (Starkniederschlag)": {
                    "abnehmend": -1,
                    "stagnierend": 0,
                    "zunehmend": 1,
                },
                "Überschwemmung Zukunft Faktor 2 (Hochwassergefahr)": {
                    "unbekannt": 0
                },
                "Überschwemmung Zukunft Faktor 3 (Bevölkerungsprognose)": {
                    "stark abnehmend": -0.5,
                    "eher abnehmend": -0.25,
                    "stagnierend": 0,
                    "eher zunehmend": 0.25,
                    "stark zunehmend": 0.5,
                },
                "Überschwemmung Zukunft Faktor 4 (Siedlungs-und Verkehrsfläche)": {  # noqa
                    "abnehmend": -0.5,
                    "stagnierend": 0,
                    "zunehmend": 0.5,
                },
                "Überschwemmung Zukunft Summe": {"Maximum": 6},
                "Überschwemmung Zukunft": None,
            },
        },
    },
    "Waldbrand": {
        "Gegenwart": {
            "headers": {
                "Waldbrand Gegenwart Faktor 1 (FWI)": {
                    "gering": 1,
                    "niedrig": 2,
                    "mittel": 3,
                    "hoch": 4,
                    "kritisch": 5,
                },
                "Waldbrand Gegenwart Summe": {"Maximum": 5},
                "Waldbrand Gegenwart": None,
            },
        },
        "Zukunft": {
            "headers": {
                "Waldbrand Zukunft Faktor 1 (FWI)": {
                    "stagnierend": 0,
                    "zunehmend": 0.83,
                    "stark zunehmend": 1.67,
                },
                "Waldbrand Zukunft Faktor 2 (Bevölkerungsprognose)": {
                    "stark abnehmend": -0.83,
                    "eher abnehmend": -0.42,
                    "stagnierend": 0,
                    "eher zunehmend": 0.42,
                    "stark zunehmend": 0.83,
                },
                "Waldbrand Zukunft Summe": {"Maximum": 5},
                "Waldbrand Zukunft": None,
            },
        },
    },
    "Hitze": {
        "Gegenwart": {
            "headers": {
                "Hitze Gegenwart Faktor 1 (Region)": {
                    "gering": 1,
                    "mittel": 2,
                    "hoch": 3,
                },
                "Hitze Gegenwart Faktor 1 (Trop.Nächte)": {
                    "nicht relevant": 0,
                    "relevant": 3,
                },
                "Hitze Gegenwart Faktor 2 (Kreistyp)": {
                    "nicht relevant": 0,
                    "gering": 0.5,
                    "mittel": 1,
                    "hoch": 1.5,
                },
                "Hitze Gegenwart Faktor 3 (Siedlungs-und Verkehrsfläche)": {
                    "nicht relevant": 0,
                    "mittel": 0.75,
                    "hoch": 1.5,
                },
                "Hitze Gegenwart Summe": {"Maximum": 9},
                "Hitze Gegenwart": None,
            },
        },
        "Zukunft": {
            "headers": {
                "Hitze Zukunft Faktor 1 (Heiße Tage)": {
                    "stagnierend": 0,
                    "zunehmend": 2,
                },
                "Hitze Zukunft Faktor 1 (Trop.Nächte)": {
                    "stagnierend": 0,
                    "zunehmend": 2,
                },
                "Hitze Zukunft Faktor 2 (Bevölkerungsprognose)": {
                    "stark abnehmend": -1,
                    "eher abnehmend": -0.5,
                    "stagnierend": 0,
                    "eher zunehmend": 0.5,
                    "stark zunehmend": 1,
                },
                "Hitze Zukunft Faktor 3 (Siedlungs-und Verkehrsfläche)": {
                    "abnehmend": -1,
                    "moderat zunehmend": 0,
                    "stark zunehmend": 1,
                },
                "Hitze Zukunft Summe": {"Maximum": 9},
                "Hitze Zukunft": None,
            },
        },
    },
    "Vektoren": {
        "Gegenwart": {
            "headers": {
                "Vektoren Gegenwart Faktor 1 (FSME)": {
                    "nicht relevant": 0,
                    "relevant": 1.33,
                },
                "Vektoren Gegenwart Faktor 2 (Aedes albopictus)": {
                    "nicht relevant": 0,
                    "relevant": 1.33,
                },
                "Vektoren Gegenwart Faktor 2 (West-Nil-Virus)": {
                    "nicht relevant": 0,
                    "relevant": 1.33,
                },
                "Vektoren Gegenwart Faktor 3 (Zug)": {
                    "nicht relevant": 0,
                    "relevant": 0.67,
                },
                "Vektoren Gegenwart Faktor 3 (Flughafen)": {
                    "nicht relevant": 0,
                    "relevant": 0.67,
                },
                "Vektoren Gegenwart Faktor 3 (Schiff)": {
                    "nicht relevant": 0,
                    "relevant": 0.67,
                },
                "Vektoren Gegenwart Summe": {"Maximum": 6},
                "Vektoren Gegenwart": None,
            },
        },
        "Zukunft": {
            "headers": {
                "Vektoren Zukunft Faktor 1 (Zecken)": {"zunehmend": 0.67},
                "Vektoren Zukunft Faktor 2 (Aedes albopictus)": {
                    "stagnierend": 0,
                    "zunehmend": 0.67,
                },
                "Vektoren Zukunft Faktor 2 (West-Nil-Virus)": {
                    "stagnierend": 0,
                    "zunehmend": 0.67,
                },
                "Vektoren Zukunft Faktor 3 (Bevölkerungsprognose)": {
                    "stark abnehmend": -1,
                    "eher abnehmend": -0.5,
                    "stagnierend": 0,
                    "eher zunehmend": 0.5,
                    "stark zunehmend": 1,
                },
                "Vektoren Zukunft Summe": {"Maximum": 6},
                "Vektoren Zukunft": None,
            },
        },
    },
}

RISKS = [risk for risk in LAYER_METADATA] + ["HotSpots"]
