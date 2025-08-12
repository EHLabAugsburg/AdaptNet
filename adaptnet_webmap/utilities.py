COUNTY_NAME_PROPERTY = "gen"

LAYER_METADATA = {
    "Luftbelastung": {
        "Gegenwart": {
            "headers": [
                "Luftbelastung Gegenwart Faktor 1 (PM2.5)",
                "Luftbelastung Gegenwart Faktor 1 (PM10)",
                "Luftbelastung Gegenwart Faktor 1 (NO2)",
                "Luftbelastung Gegenwart Faktor 1 (O3)",
                "Luftbelastung Gegenwart Faktor 2 (Hitze)",
                "Luftbelastung Gegenwart Summe",
                "Luftbelastung Gegenwart",
            ],
        },
        "Zukunft": {
            "headers": [
                "Luftbelastung Zukunft Faktor 1 (PM2.5)",
                "Luftbelastung Zukunft Faktor 1 (PM10)",
                "Luftbelastung Zukunft Faktor 1 (NO2)",
                "Luftbelastung Zukunft Faktor 1 (O3)",
                "Luftbelastung Zukunft Faktor 2 (Bevölkerungsprognose)",
                "Luftbelastung Zukunft Faktor 3 (Hitze)",
                "Luftbelastung Zukunft Summe",
                "Luftbelastung Zukunft",
            ],
        },
    },
    "Allergene": {
        "Gegenwart": {
            "headers": [
                "Allergene Gegenwart Faktor 1 (Prozessionsspinner)",
                "Allergene Gegenwart Faktor 2 (Heuschnupfen)",
                "Allergene Gegenwart Faktor 3 (Pollen)",
                "Allergene Gegenwart Faktor 4 (Luftbelastung)",
                "Allergene Gegenwart Summe",
                "Allergene Gegenwart",
            ],
        },
        "Zukunft": {
            "headers": [
                "Allergene Zukunft Faktor 1 (Prozessionsspinner)",
                "Allergene Zukunft Faktor 2 (Bevölkerungsprognose)",
                "Allergene Zukunft Faktor 3 (Temperatur)",
                "Allergene Zukunft Faktor 4 (Luftqualtät)",
                "Allergene Zukunft Summe",
                "Allergene Zukunft",
            ],
        },
    },
    "Überschwemmung": {
        "Gegenwart": {
            "headers": [
                "Überschwemmung Gegenwart Faktor 1 (Starkniederschlag)",
                "Überschwemmung Gegenwart Faktor 2 (Hochwassergefahr)",
                "Überschwemmung Gegenwart Faktor 3 (Kreistyp)",
                "Überschwemmung Gegenwart Faktor 4 (Siedlungs-und Verkehrsfläche)",  # noqa
                "Überschwemmung Gegenwart Summe",
                "Überschwemmung Gegenwart",
            ],
        },
        "Zukunft": {
            "headers": [
                "Überschwemmung Zukunft Faktor 1 (Starkniederschlag)",
                "Überschwemmung Zukunft Faktor 2 (Hochwassergefahr)",
                "Überschwemmung Zukunft Faktor 3 (Bevölkerungsprognose)",
                "Überschwemmung Zukunft Faktor 4 (Siedlungs-und Verkehrsfläche)",  # noqa
                "Überschwemmung Zukunft Summe",
                "Überschwemmung Zukunft",
            ],
        },
    },
    "Waldbrand": {
        "Gegenwart": {
            "headers": [
                "Waldbrand Gegenwart Faktor 1 (FWI)",
                "Waldbrand Gegenwart Summe",
                "Waldbrand Gegenwart",
            ],
        },
        "Zukunft": {
            "headers": [
                "Waldbrand Zukunft Faktor 1 (FWI)",
                "Waldbrand Zukunft Faktor 2 (Bevölkerungsprognose)",
                "Waldbrand Zukunft Summe",
                "Waldbrand Zukunft",
            ],
        },
    },
    "Hitze": {
        "Gegenwart": {
            "headers": [
                "Hitze Gegenwart Faktor 1 (Hitzebelastung)",
                "Hitze Gegenwart Faktor 1 (Trop.Nächte)",
                "Hitze Gegenwart Faktor 2 (Kreistyp)",
                "Hitze Gegenwart Faktor 3 (Siedlungs-und Verkehrsfläche)",
                "Hitze Gegenwart Summe",
                "Hitze Gegenwart",
            ],
        },
        "Zukunft": {
            "headers": [
                "Hitze Zukunft Faktor 1 (Heiße Tage)",
                "Hitze Zukunft Faktor 1 (Trop.Nächte)",
                "Hitze Zukunft Faktor 2 (Bevölkerungsprognose)",
                "Hitze Zukunft Faktor 3 (Siedlungs-und Verkehrsfläche)",
                "Hitze Zukunft Summe",
                "Hitze Zukunft",
            ],
        },
    },
    "Vektoren": {
        "Gegenwart": {
            "headers": [
                "Vektoren Gegenwart Faktor 1 (FSME)",
                "Vektoren Gegenwart Faktor 2 (Aedes albopictus)",
                "Vektoren Gegenwart Faktor 2 (West-Nil-Virus)",
                "Vektoren Gegenwart Faktor 3 (Zug)",
                "Vektoren Gegenwart Faktor 3 (Flughafen)",
                "Vektoren Gegenwart Faktor 3 (Schiff)",
                "Vektoren Gegenwart Summe",
                "Vektoren Gegenwart",
            ],
        },
        "Zukunft": {
            "headers": [
                "Vektoren Zukunft Faktor 1 (Zecken)",
                "Vektoren Zukunft Faktor 2 (Aedes albopictus)",
                "Vektoren Zukunft Faktor 2 (West-Nil-Virus)",
                "Vektoren Zukunft Faktor 3 (Bevölkerungsprognose)",
                "Vektoren Zukunft Summe",
                "Vektoren Zukunft",
            ],
        },
    },
    "HotSpots": {
        "Gegenwart": {"headers": ["HotSpots Gegenwart"]},
        "Zukunft": {"headers": ["HotSpots Zukunft"]},
    },
}

RISKS = [risk for risk in LAYER_METADATA]
