COUNTY_NAME_PROPERTY = "gen"

LAYER_METADATA = {
    "Luftbelastung": {
        "Vergangenheit": [
            "Luftbelastung Vergangenheit Faktor 1 (PM2.5)",
            "Luftbelastung Vergangenheit Faktor 1 (PM10)",
            "Luftbelastung Vergangenheit Faktor 1 (NO2)",
            "Luftbelastung Vergangenheit Faktor 1 (O3)",
            "Luftbelastung Vergangenheit Faktor 2 (Hitze)",
            "Luftbelastung Vergangenheit Summe",
            "Luftbelastung Vergangenheit",
        ],
        "Zukunft": [
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
    "Allergene": {
        "Vergangenheit": [
            "Allergene Vergangenheit Faktor 1 (Prozessionsspinner)",
            "Allergene Vergangenheit Faktor 2 (Heuschnupfen)",
            "Allergene Vergangenheit Faktor 3 (Pollen)",
            "Allergene Vergangenheit Faktor 4 (Luftbelastung)",
            "Allergene Vergangenheit Summe",
            "Allergene Vergangenheit",
        ],
        "Zukunft": [
            "Allergene Zukunft Faktor 1 (Prozessionsspinner)",
            "Allergene Zukunft Faktor 2 (Bevölkerungsprognose)",
            "Allergene Zukunft Faktor 3 (Temperatur)",
            "Allergene Zukunft Faktor 4 (Luftqualtät)",
            "Allergene Zukunft Summe",
            "Allergene Zukunft",
        ],
    },
    "Überschwemmung": {
        "Vergangenheit": [
            "Überschwemmung Vergangenheit Faktor 1 (Starkniederschlag)",
            "Überschwemmung Vergangenheit Faktor 2 (Hochwassergefahr)",
            "Überschwemmung Vergangenheit Faktor 3 (Kreistyp)",
            "Überschwemmung Vergangenheit Faktor 4 (Siedlungs-und Verkehrsfläche)",  # noqa
            "Überschwemmung Vergangenheit Summe",
            "Überschwemmung Vergangenheit",
        ],
        "Zukunft": [
            "Überschwemmung Zukunft Faktor 1 (Starkniederschlag)",
            "Überschwemmung Zukunft Faktor 2 (Hochwassergefahr)",
            "Überschwemmung Zukunft Faktor 3 (Bevölkerungsprognose)",
            "Überschwemmung Zukunft Faktor 4 (Siedlungs-und Verkehrsfläche)",  # noqa
            "Überschwemmung Zukunft Summe",
            "Überschwemmung Zukunft",
        ],
    },
    "Waldbrand": {
        "Vergangenheit": [
            "Waldbrand Vergangenheit Faktor 1 (FWI)",
            "Waldbrand Vergangenheit Summe",
            "Waldbrand Vergangenheit",
        ],
        "Zukunft": [
            "Waldbrand Zukunft Faktor 1 (FWI)",
            "Waldbrand Zukunft Faktor 2 (Bevölkerungsprognose)",
            "Waldbrand Zukunft Summe",
            "Waldbrand Zukunft",
        ],
    },
    "Hitze": {
        "Vergangenheit": [
            "Hitze Vergangenheit Faktor 1 (Hitzebelastung)",
            "Hitze Vergangenheit Faktor 1 (Trop.Nächte)",
            "Hitze Vergangenheit Faktor 2 (Kreistyp)",
            "Hitze Vergangenheit Faktor 3 (Siedlungs-und Verkehrsfläche)",
            "Hitze Vergangenheit Summe",
            "Hitze Vergangenheit",
        ],
        "Zukunft": [
            "Hitze Zukunft Faktor 1 (Heiße Tage)",
            "Hitze Zukunft Faktor 1 (Trop.Nächte)",
            "Hitze Zukunft Faktor 2 (Bevölkerungsprognose)",
            "Hitze Zukunft Faktor 3 (Siedlungs-und Verkehrsfläche)",
            "Hitze Zukunft Summe",
            "Hitze Zukunft",
        ],
    },
    "Vektoren": {
        "Vergangenheit": [
            "Vektoren Vergangenheit Faktor 1 (FSME)",
            "Vektoren Vergangenheit Faktor 2 (Aedes albopictus)",
            "Vektoren Vergangenheit Faktor 2 (West-Nil-Virus)",
            "Vektoren Vergangenheit Faktor 3 (Zug)",
            "Vektoren Vergangenheit Faktor 3 (Flughafen)",
            "Vektoren Vergangenheit Faktor 3 (Schiff)",
            "Vektoren Vergangenheit Summe",
            "Vektoren Vergangenheit",
        ],
        "Zukunft": [
            "Vektoren Zukunft Faktor 1 (Zecken)",
            "Vektoren Zukunft Faktor 2 (Aedes albopictus)",
            "Vektoren Zukunft Faktor 2 (West-Nil-Virus)",
            "Vektoren Zukunft Faktor 3 (Bevölkerungsprognose)",
            "Vektoren Zukunft Summe",
            "Vektoren Zukunft",
        ],
    },
    "HotSpots": {
        "Vergangenheit": ["HotSpots Vergangenheit"],
        "Zukunft": ["HotSpots Zukunft"],
    },
}

RISKS = [risk for risk in LAYER_METADATA]
