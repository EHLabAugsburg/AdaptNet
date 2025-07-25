"use strict";
/**
 * Class to ensure the dynamically display of correct information in popups, tooltips and subpages.
 */
class ContentHandler {
  static _COUNTY_NAME_PROPERTY_NAME = "gen";
  static _LINK_PAGE_BASE_URL = {
    de: "https://www.uni-augsburg.de/de/fakultaet/med/profs/klimawandel-gesundheit/forschung/adaptnet/risikokarten",
    en: "https://www.uni-augsburg.de/en/fakultaet/med/profs/klimawandel-gesundheit/forschung/adaptnet/risikokarten",
  };
  static _FACTOR_CLASSIFICATIONS = {
    Luftqualität: {
      riskName: { de: "Luftqualität", en: "air quality" },
      explanation: {
        de: `<b>Gesundheitliche Folgen von Luftverschmutzung</b><br>
        Feinstaub, Ozon und Stickstoffoxide können unsere Gesundheit stark belasten – vor allem Atemwege und das Herz-Kreislaufsystem sind gefährdet.<br>
        <b>Wer ist besonders betroffen?</b></br>
        Kinder, ältere Menschen, chronisch erkrankte Menschen und Menschen, die viel Zeit im Freien verbringen, sind besonders anfällig.
        <a href="${ContentHandler._LINK_PAGE_BASE_URL.de}#gesundheit">Mehr Infos</a>`,
        en: `<b>Health Impacts of Air Pollution</b><br>
        Fine particulate matter, ozone, and nitrogen oxides can severely affect our health, primarily impacting the respiratory and cardiovascular systems.<br>
        <b>Who is especially affected?</b><br>
        Children, older adults, people with chronic illnesses, and those who spend a lot of time outdoors are particularly susceptible.
        <a href="${ContentHandler._LINK_PAGE_BASE_URL.en}#gesundheit">more info</a>`,
      },
      Gegenwart: {
        factorNameTranslations: {
          "Faktor 1 (PM2.5)": "factor 1 (PM2.5)",
          "Faktor 1 (PM10)": "factor 1 (PM10)",
          "Faktor 1 (NO2)": "factor 1 (NO2)",
          "Faktor 1 (O3)": "factor 1 (O3)",
          "Faktor 2 (Hitze)": "factosr 2 (heat)",
          Summe: "sum",
        },
        headers: {
          "Faktor 1 (PM2.5)": {
            de: ["gering", "mittel", "hoch"],
            en: ["low", "medium", "high"],
            values: [0, 1, 2],
          },
          "Faktor 1 (PM10)": {
            de: ["gering", "mittel", "hoch"],
            en: ["low", "medium", "high"],
            values: [0, 1, 2],
          },
          "Faktor 1 (NO2)": {
            de: ["gering", "mittel", "hoch"],
            en: ["low", "medium", "high"],
            values: [0, 1, 2],
          },
          "Faktor 1 (O3)": {
            de: ["gering", "mittel", "hoch"],
            en: ["low", "medium", "high"],
            values: [0, 1, 2],
          },
          "Faktor 2 (Hitze)": {
            de: ["gering", "niedrig", "mittel", "hoch", "kritisch"],
            en: ["very low", "low", "medium", "high", "critical"],
            values: [0, 0.5, 1, 1.5, 2],
          },
          Summe: { Maximum: 10 },
        },
      },
      Zukunft: {
        factorNameTranslations: {
          "Faktor 1 (PM2.5)": "factor 1 (PM2.5)",
          "Faktor 1 (PM10)": "factor 1 (PM10)",
          "Faktor 1 (NO2)": "factor 1 (NO2)",
          "Faktor 1 (O3)": "factor 1 (O3)",
          "Faktor 2 (Bevölkerungsprognose)": "factor 2 (population forecast)",
          "Faktor 3 (Hitze)": "factor 3 (heat)",
          Summe: "sum",
        },
        headers: {
          "Faktor 1 (PM2.5)": {
            de: ["abnehmend"],
            en: ["decreasing"],
            values: [-0.5],
          },
          "Faktor 1 (PM10)": {
            de: ["abnehmend"],
            en: ["decreasing"],
            values: [-0.5],
          },
          "Faktor 1 (NO2)": {
            de: ["abnehmend"],
            en: ["decreasing"],
            values: [-0.5],
          },
          "Faktor 1 (O3)": {
            de: ["stagnierend"],
            en: ["stagnating"],
            values: [0],
          },
          "Faktor 2 (Bevölkerungsprognose)": {
            de: [
              "stark abnehmend",
              "eher abnehmend",
              "stagnierend",
              "eher zunehmend",
              "stark zunehmend",
            ],
            en: [
              "strongly decreasing",
              "slightly decreasing",
              "stagnating",
              "slightly increasing",
              "strongly increasing",
            ],
            values: [-1, -0.5, 0, 0.5, 1],
          },
          "Faktor 3 (Hitze)": {
            de: [
              "stagnierend",
              "leicht zunehmend",
              "zunehmend",
              "stark zunehmend",
              "kritisch zunehmend",
            ],
            en: [
              "stagnating",
              "slightly increasing",
              "increasing",
              "strongly increasing",
              "critically increasing",
            ],
            values: [0, 1, 2, 3, 4],
          },
          Summe: { Maximum: 10 },
        },
      },
    },
    Allergene: {
      riskName: { de: "Allergene", en: "allergens" },
      explanation: {
        de: `<b>Gesundheitsgefahren durch Pollen und andere Allergene</b><br>
      Der Klimawandel führt dazu, dass sich die Pollensaison verlängert und sich die in der Umwelt vorkommenden Allergene verändern können, z.B. durch die Ansiedlung neuer allergener Pflanzen.<br>
      <b>Wer besonders anfällig ist:</b><br>
      Kinder und Erwachsene mit Allergien oder allergischen Asthma sind besonders betroffen.
      <a href="${ContentHandler._LINK_PAGE_BASE_URL.de}#gesundheit">Mehr Infos</a>`,
        en: `<b>Health Risks from Pollen and Other Allergens</b><br>
      Climate change is causing longer pollen seasons and can alter the types of allergens in the environment, for example, through the spread of new allergenic plants.<br>
      <b>Who is particularly sensitive?</b><br>
      Children and adults with allergies or allergic asthma are especially affected.
      <a href="${ContentHandler._LINK_PAGE_BASE_URL.en}#gesundheit">more info</a>`,
      },
      Gegenwart: {
        factorNameTranslations: {
          "Faktor 1 (Prozessionsspinner)": "factor 1 (processionary moth)",
          "Faktor 2 (Heuschnupfen)": "factor 2 (hay fever)",
          "Faktor 3 (Pollen)": "factor 3 (pollen)",
          "Faktor 4 (Luftqualität)": "factor 4 (air quality)",
          Summe: "sum",
        },
        headers: {
          "Faktor 1 (Prozessionsspinner)": {
            de: ["nicht relevant", "relevant"],
            en: ["irrelevant", "relevant"],
            values: [0, 1],
          },
          "Faktor 2 (Heuschnupfen)": {
            de: ["nicht relevant", "gering", "mittel", "hoch", "sehr hoch"],
            en: ["irrelevant", "low", "medium", "high", "very high"],
            values: [0, 0.25, 0.5, 0.75, 1],
          },
          "Faktor 3 (Pollen)": { de: ["hoch"], en: ["high"], values: [2] },
          "Faktor 4 (Luftqualität)": {
            de: ["gering", "niedrig", "mittel", "hoch", "kritisch"],
            en: ["very low", "low", "medium", "high", "critical"],
            values: [0, 0.5, 1, 1.5, 2],
          },
          Summe: { Maximum: 6 },
        },
      },
      Zukunft: {
        factorNameTranslations: {
          "Faktor 1 (Prozessionsspinner)": "factor 1 (processionary moth)",
          "Faktor 2 (Bevölkerungsprognose)": "factor 2 (population forecast)",
          "Faktor 3 (Temperatur)": "factor 3 (temperature)",
          Summe: "sum",
        },
        headers: {
          "Faktor 1 (Prozessionsspinner)": {
            de: ["stagnierend", "zunehmend"],
            en: ["stagnating", "increasing"],
            values: [0, 0.5],
          },
          "Faktor 2 (Bevölkerungsprognose)": {
            de: [
              "stark abnehmend",
              "eher abnehmend",
              "stagnierend",
              "eher zunehmend",
              "stark zunehmend",
            ],
            en: [
              "strongly decreasing",
              "slightly decreasing",
              "stagnating",
              "slightly increasing",
              "strongly increasing",
            ],
            values: [-0.5, -0.25, 0, 0.25, 0.5],
          },
          "Faktor 3 (Temperatur)": {
            de: ["stagnierend", "zunehmend"],
            en: ["stagnating", "increasing"],
            values: [0, 1],
          },
          Summe: { Maximum: 6 },
        },
      },
    },
    Überschwemmung: {
      riskName: { de: "Überschwemmung", en: "flooding" },
      explanation: {
        de: `<b>Gesundheitliche Folgen von Überschwemmungen</b><br>
      Hochwasser kann nicht nur hohe Sachschäden mit sich bringen, sondern auch die Gesundheit gefährden – durch Verletzungsrisiken bis hin zu Todesfällen, verunreinigtes Wasser, Infektionen oder psychische Belastungen.<br>
      <b>Wer ist besonders betroffen?</b><br>
      Besonders gefährdet sind Menschen mit Mobilitäts- und kognitiven Einschränkungen, Einsatzkräfte oder Personen, die direkt mit verschmutztem Wasser in Kontakt kommen.
      <a href="${ContentHandler._LINK_PAGE_BASE_URL.de}#gesundheit">Mehr Infos</a>`,
        en: `<b>Health Impacts of Flooding</b><br>
      Floods can cause not only severe property damage but also serious health risks, includ-ing injuries and fatalities, contaminated water, infections, and psychological stress.<br>
      <b>Who is most affected?</b><br>
      People with mobility or cognitive impairments, emergency responders, and individuals who come into direct contact with polluted water are particularly at risk.
      <a href="${ContentHandler._LINK_PAGE_BASE_URL.en}#gesundheit">more info</a>`,
      },
      Gegenwart: {
        factorNameTranslations: {
          "Faktor 1 (Starkniederschlag)": "factor 1 (heavy precipitation)",
          "Faktor 2 (Hochwassergefahr)": "factor 2 (flooding risk)",
          "Faktor 3 (Kreistyp)": "factor 3 (county type)",
          "Faktor 4 (Siedlungs-und Verkehrsfläche)":
            "factor 4 (settlement and traffic area)",
          Summe: "sum",
        },
        headers: {
          "Faktor 1 (Starkniederschlag)": {
            de: ["gering", "mittel", "hoch"],
            en: ["low", "medium", "high"],
            values: [0, 1, 2],
          },
          "Faktor 2 (Hochwassergefahr)": {
            de: ["nicht relevant", "gering", "mittel", "hoch", "sehr hoch"],
            en: ["irrelevant", "low", "medium", "high", "very high"],
            values: [0, 0.5, 1, 1.5, 2],
          },
          "Faktor 3 (Kreistyp)": {
            de: ["nicht relevant", "gering", "mittel", "hoch"],
            en: ["irrelevant", "low", "medium", "high"],
            values: [0, 0.25, 0.5, 1],
          },
          "Faktor 4 (Siedlungs-und Verkehrsfläche)": {
            de: ["gering", "mittel", "hoch"],
            en: ["low", "medium", "high"],
            values: [0, 0.5, 1],
          },
          Summe: { Maximum: 6 },
        },
      },
      Zukunft: {
        factorNameTranslations: {
          "Faktor 1 (Starkniederschlag)": "factor 1 (heavy precipitation)",
          "Faktor 2 (Hochwassergefahr)": "factor 2 (flooding risk)",
          "Faktor 3 (Bevölkerungsprognose)": "factor 3 (population forecast)",
          "Faktor 4 (Siedlungs-und Verkehrsfläche)":
            "factor 4 (settlement and traffic area)",
          Summe: "sum",
        },
        headers: {
          "Faktor 1 (Starkniederschlag)": {
            de: ["abnehmend", "stagnierend", "zunehmend"],
            en: ["decreasing", "stagnating", "increasing"],
            values: [-1, 0, 1],
          },
          "Faktor 2 (Hochwassergefahr)": {
            de: ["unbekannt"],
            en: ["unknown"],
            values: [0],
          },
          "Faktor 3 (Bevölkerungsprognose)": {
            de: [
              "stark abnehmend",
              "eher abnehmend",
              "stagnierend",
              "eher zunehmend",
              "stark zunehmend",
            ],
            en: [
              "strongly decreasing",
              "slightly decreasing",
              "stagnating",
              "slightly increasing",
              "strongly increasing",
            ],
            values: [-0.5, -0.25, 0, 0.25, 0.5],
          },
          "Faktor 4 (Siedlungs-und Verkehrsfläche)": {
            de: ["abnehmend", "stagnierend", "zunehmend"],
            en: ["decreasing", "stagnating", "increasing"],
            values: [-0.5, 0, 0.5],
          },
          Summe: { Maximum: 6 },
        },
      },
    },
    Waldbrand: {
      riskName: { de: "Waldbrand", en: "forest fire" },
      explanation: {
        de: `<b>Gesundheitliche Folgen von Waldbränden</b><br>
      Waldbrände gefährden nicht nur die Natur, sondern auch unsere Gesundheit – durch Atemwegsprobleme durch Rauch, Verletzungen und psychische Belastung.<br>
      <b>Wer ist besonders betroffen?</b><br>
      Kinder, ältere Menschen, Schwangere, Personen mit eingeschränkter Mobilität und Einsatzkräfte sind durch Waldbrände besonders gefährdet.
      <a href="${ContentHandler._LINK_PAGE_BASE_URL.de}#gesundheit">Mehr Infos</a>`,
        en: `<b>Health Impacts of Wildfires</b><br>
      Wildfires not only endanger the environment but also pose serious health risks, from respiratory issues caused by smoke to physical injuries and psychological stress.<br>
      <b>Who is particularly vulnerable?</b><br>
      Children, the elderly, pregnant individuals, people with limited mobility, and emergency personnel are especially at risk during wildfires.
      <a href="${ContentHandler._LINK_PAGE_BASE_URL.en}#gesundheit">more info</a>`,
      },
      Gegenwart: {
        factorNameTranslations: {
          "Faktor 1 (FWI)": "factor 1 (FWI)",
          Summe: "sum",
        },
        headers: {
          "Faktor 1 (FWI)": {
            de: ["gering", "niedrig", "mittel", "hoch", "kritisch"],
            en: ["very low", "low", "medium", "high", "critical"],
            values: [1, 2, 3, 4, 5],
          },
          Summe: { Maximum: 5 },
        },
      },
      Zukunft: {
        factorNameTranslations: {
          "Faktor 1 (FWI)": "factor 1 (FWI)",
          "Faktor 2 (Bevölkerungsprognose)": "factor 2 (popuation forecast)",
          Summe: "sum",
        },
        headers: {
          "Faktor 1 (FWI)": {
            de: ["stagnierend", "zunehmend", "stark zunehmend"],
            en: ["stagnating", "increasing", "strongly increasing"],
            values: [0, 0.83, 1.67],
          },
          "Faktor 2 (Bevölkerungsprognose)": {
            de: [
              "stark abnehmend",
              "eher abnehmend",
              "stagnierend",
              "eher zunehmend",
              "stark zunehmend",
            ],
            en: [
              "strongly decreasing",
              "slightly decreasing",
              "stagnating",
              "slightly increasing",
              "strongly increasing",
            ],
            values: [-0.83, -0.42, 0, 0.42, 0.83],
          },
          Summe: { Maximum: 5 },
        },
      },
    },
    Hitze: {
      riskName: { de: "Hitze", en: "heat" },
      explanation: {
        de: `<b>Gesundheitliche Risiken durch Hitze</b><br>
      Hohe Temperaturen können den Körper stark belasten – besonders bei bestimmten Vorerkrankungen oder anstrengender körperlicher Tätigkeit.<br>
      <b>Wer ist bei Hitze besonders gefährdet?</b><br>
      Jeder Mensch kann betroffen sein, aber einige Menschen sind durch Hitze besonders gefährdet – darunter ältere Menschen, Kinder und Personen mit bestimmten Vorerkrankungen.
      <a href="${ContentHandler._LINK_PAGE_BASE_URL.de}#gesundheit">Mehr Infos</a>`,
        en: `<b>Health Risks from Heat</b><br>
      High temperatures can place a significant strain on the body – especially for people with certain pre-existing conditions or during intense physical activity.<br>
      <b>Who is especially at risk during heatwaves?</b><br>
      Everyone can be affected, but some groups are particularly vulnerable – including older adults, children, and people with certain chronic illnesses.
      <a href="${ContentHandler._LINK_PAGE_BASE_URL.en}#gesundheit">more info</a>`,
      },
      Gegenwart: {
        factorNameTranslations: {
          "Faktor 1 (Region)": "factor 1 (region)",
          "Faktor 1 (Trop.Nächte)": "factor 1 (tropical nights)",
          "Faktor 2 (Kreistyp)": "factor 2 (county type)",
          "Faktor 3 (Siedlungs-und Verkehrsfläche)":
            "factor 3 (settlement and traffic area)",
          Summe: "sum",
        },
        headers: {
          "Faktor 1 (Region)": {
            de: ["gering", "mittel", "hoch"],
            en: ["low", "medium", "high"],
            values: [1, 2, 3],
          },
          "Faktor 1 (Trop.Nächte)": {
            de: ["nicht relevant", "relevant"],
            en: ["irrelevant", "relevant"],
            values: [0, 3],
          },
          "Faktor 2 (Kreistyp)": {
            de: ["nicht relevant", "gering", "mittel", "hoch"],
            en: ["irrelevant", "low", "medium", "high"],
            values: [0, 0.5, 1, 1.5],
          },
          "Faktor 3 (Siedlungs-und Verkehrsfläche)": {
            de: ["nicht relevant", "mittel", "hoch"],
            en: ["irrelevant", "medium", "high"],
            values: [0, 0.75, 1.5],
          },
          Summe: { Maximum: 9 },
        },
      },
      Zukunft: {
        factorNameTranslations: {
          "Faktor 1 (Heiße Tage)": "factor 1 (hot days)",
          "Faktor 1 (Trop.Nächte)": "factor 1 (tropical nights)",
          "Faktor 2 (Bevölkerungsprognose)": "factor 2 (population forecast)",
          "Faktor 3 (Siedlungs-und Verkehrsfläche)":
            "factor 3 (settlement and traffic area)",
          Summe: "sum",
        },
        headers: {
          "Faktor 1 (Heiße Tage)": {
            de: ["stagnierend", "zunehmend"],
            en: ["stagnating", "increasing"],
            values: [0, 2],
          },
          "Faktor 1 (Trop.Nächte)": {
            de: ["stagnierend", "zunehmend"],
            en: ["stagnating", "increasing"],
            values: [0, 2],
          },
          "Faktor 2 (Bevölkerungsprognose)": {
            de: [
              "stark abnehmend",
              "eher abnehmend",
              "stagnierend",
              "eher zunehmend",
              "stark zunehmend",
            ],
            en: [
              "strongly decreasing",
              "slightly decreasing",
              "stagnating",
              "slightly increasing",
              "strongly increasing",
            ],
            values: [-1, -0.5, 0, 0.5, 1],
          },
          "Faktor 3 (Siedlungs-und Verkehrsfläche)": {
            de: ["abnehmend", "moderat zunehmend", "stark zunehmend"],
            en: ["decreasing", "slightly increasing", "strongly increasing"],
            values: [-1, 0, 1],
          },
          Summe: { Maximum: 9 },
        },
      },
    },
    Vektoren: {
      riskName: { de: "Vektoren", en: "vectors" },
      explanation: {
        de: `<b>Gesundheitsrisiken durch von Vektoren übertragene Krankheiten</b><br>
      Vektoren sind Krankheitsüberträger, z.B. Zecken oder Mücken. Zecken übertragen in Deutschland schon heute Erkrankungen wie die Borreliose. Mücken könnten in Zukunft vermehrt Erkrankungen wie West-Nil-Fieber oder Denguefieber übertragen.<br>
      <b>Wer ist besonders anfällig?</b><br>
      Insbesondere Menschen, die sich viel in der Natur aufhalten, kommen häufiger mit Zecken in Kontakt, z.B. in Wiesen, Wald und Gärten.
      <a href="${ContentHandler._LINK_PAGE_BASE_URL.de}#gesundheit">Mehr Infos</a>`,
        en: `<b>Health Risks from Vector-Borne Diseases</b><br>
      Vectors are disease carriers such as ticks or mosquitoes. In Germany, ticks already transmit diseases like Lyme borreliosis. In the future, mosquitoes may increasingly spread diseases such as West Nile virus or dengue fever.<br>
      <b>Who is particularly exposed?</b><br>
      People who spend a lot of time in nature (in meadows, forests, or gardens) are more likely to come into contact with ticks.
      <a href="${ContentHandler._LINK_PAGE_BASE_URL.en}#gesundheit">more info</a>`,
      },
      Gegenwart: {
        factorNameTranslations: {
          "Faktor 1 (FSME)": "factor 1 (FSME)",
          "Faktor 2 (Aedes albopictus)": "factor 2 (Aedes albopictus)",
          "Faktor 2 (West-Nil-Virus)": "factor 2 (western-nile virus)",
          "Faktor 3 (Zug)": "factor 3 (train)",
          "Faktor 3 (Flughafen)": "factor 3 (airport)",
          "Faktor 3 (Schiff)": "factor 3 (ship)",
          Summe: "sum",
        },
        headers: {
          "Faktor 1 (FSME)": {
            de: ["nicht relevant", "relevant"],
            en: ["irrelevant", "relevant"],
            values: [0, 1.33],
          },
          "Faktor 2 (Aedes albopictus)": {
            de: ["nicht relevant", "relevant"],
            en: ["irrelevant", "relevant"],
            values: [0, 1.33],
          },
          "Faktor 2 (West-Nil-Virus)": {
            de: ["nicht relevant", "relevant"],
            en: ["irrelevant", "relevant"],
            values: [0, 1.33],
          },
          "Faktor 3 (Zug)": {
            de: ["nicht relevant", "relevant"],
            en: ["irrelevant", "relevant"],
            values: [0, 0.67],
          },
          "Faktor 3 (Flughafen)": {
            de: ["nicht relevant", "relevant"],
            en: ["irrelevant", "relevant"],
            values: [0, 0.67],
          },
          "Faktor 3 (Schiff)": {
            de: ["nicht relevant", "relevant"],
            en: ["irrelevant", "relevant"],
            values: [0, 0.67],
          },
          Summe: { Maximum: 6 },
        },
      },
      Zukunft: {
        factorNameTranslations: {
          "Faktor 1 (Zecken)": "factor 1 (ticks)",
          "Faktor 2 (Aedes albopictus)": "factor 2 (Aedes albopictus)",
          "Faktor 2 (West-Nil-Virus)": "factor 2 (western-nile virus)",
          "Faktor 3 (Bevölkerungsprognose)": "factor 3 (population forecast)",
          Summe: "sum",
        },
        headers: {
          "Faktor 1 (Zecken)": {
            de: ["zunehmend"],
            en: ["increasing"],
            values: [0.67],
          },
          "Faktor 2 (Aedes albopictus)": {
            de: ["stagnierend", "zunehmend"],
            en: ["stagnating", "increasing"],
            values: [0, 0.67],
          },
          "Faktor 2 (West-Nil-Virus)": {
            de: ["stagnierend", "zunehmend"],
            en: ["stagnating", "increasing"],
            values: [0, 0.67],
          },
          "Faktor 3 (Bevölkerungsprognose)": {
            de: [
              "stark abnehmend",
              "eher abnehmend",
              "stagnierend",
              "eher zunehmend",
              "stark zunehmend",
            ],
            en: [
              "strongly decreasing",
              "slightly decreasing",
              "stagnating",
              "slightly increasing",
              "strongly increasing",
            ],
            values: [-1, -0.5, 0, 0.5, 1],
          },
          Summe: { Maximum: 6 },
        },
      },
    },
    HotSpots: {
      explanation: {
        de: `<b>HotSpots der Gesundheitsgefahren</b><br>
      Diese Karte stellt die insgesamt durchschnittliche Gesundheitsgefahr durch den Klimawandel dar. Sie fasst die Belastungen durch verschiedene Umweltgefahren zusammen: <b>Hitze</b>, <b>Überschwemmungen</b>, <b>Allergene</b>, <b>Krankheitsüberträger (Vektoren)</b>, <b>Waldbrände</b> und <b>Luftverschmutzung</b>.<br>
      Die angezeigte Gesundheitsgefahr ergibt sich also aus einer Kombination all dieser Faktoren und bietet einen Überblick darüber, wie stark ein Gebiet im Durchschnitt gesundheitlich durch den Klimawandel belastet ist.`,
        en: `<b>Hotspots of Climate-Related Health Hazards</b><br>
      This map shows the overall average health risk from climate change. It combines the impact of several environmental hazards: <b>heat</b>, <b>flooding</b>, <b>allergens</b>, <b>disease vectors</b>, <b>wildfires</b>, and <b>air pollution</b>.<br>
      The displayed health risk results from a combination of all these factors and provides an overview of how strongly a particular region is, on average, affected by climate-related health threats.`,
      },
    },
  };
  static _IMPRINT = `
  <div id="imprint-content" class="subframe">
    <b>Impressum:</b> <br />
    Regional Climate Change and Health<br />
    Faculty of Medicine<br />
    University of Augsburg<br />
    Gutenbergstr. 7<br />
    86356 Neusäß<br />
    Contact: <a href="mailto:ehs@med.uni-augsburg.de"> ehs@med.uni-augsburg.de </a><br />
    <button></button>
  </div>`;
  static _LAYER_CLASSIFICATIONS = {
    // mapping of class descriptors to their upper bounds (exclusive)
    HotSpotsVeränderung: {
      headers: {
        de: ["gleichbleibend", "zunehmend", "stark zunehmend"],
        en: ["constant", "increasing", "strongly increasing"],
      },
      upperBounds: [0, 1, 2],
    },
    Veränderung: {
      headers: {
        de: [
          "abnehmend",
          "leicht abnehmend",
          "leicht zunehmend",
          "zunehmend",
          "stark zunehmend",
          "kritisch zunehmend",
          "extrem zunehmend",
        ],
        en: [
          "decreasing",
          "slightly decreasing",
          "slightly increasing",
          "increasing",
          "strongly increasing",
          "critically increasing",
          "extremely increasing",
        ],
      },
      upperBounds: [-10, 0, 10, 20, 30, 40, 1000],
    },
    Zeitpunkt: {
      headers: {
        de: [
          "geringes Risiko",
          "niedriges Risiko",
          "mittleres Risiko",
          "hohes Risiko",
          "kritisches Risiko",
          "extremes Risiko",
        ],
        en: [
          "very low risk",
          "low risk",
          "medium risk",
          "high risk",
          "critical risk",
          "extreme risk",
        ],
      },
      upperBounds: [20, 40, 60, 80, 100, 1000],
    },
  };
  static _METHODS = `
  <div id="methods-content" class="subframe">
    Will be available after publication.<br />
    <button></button>
  </div>`;

  static _TEXT_CONTENTS = {
    riskControlHint: {
      de: "Wählen Sie eine Gefahr:",
      en: "Please choose a hazard:",
    },
    timeControlHint: {
      de: "Wählen Sie einen Zeitraum",
      en: "Please choose a time period:",
    },
    currentTimeTitle: {
      de: "Gegenwart",
      en: "currently",
    },
    futureTimeTitle: {
      de: "Zukunft (um 2050)",
      en: "future (about 2050)",
    },
    changeTimeTitle: {
      de: "Veränderung",
      en: "change",
    },
    methodsButtonTitle: {
      de: "Methodik",
      en: "methods",
    },
    sourcesButtonTitle: {
      de: "Quellen",
      en: "sources",
    },
    imprintButtonTitle: {
      de: "Impressum",
      en: "imprint",
    },
    searchPlaceHolder: {
      de: "Kreis suchen...",
      en: "Search county...",
    },
    risk: { de: "Risiko", en: "risk" },
    change: { de: "Veränderung", en: "change" },
  };

  /**
   *
   * @param {*} risk The risk of the current displayed layer.
   * @param {*} time The time of the current displayed layer.
   * @param {*} languageHandler The global LanguageHandler-instance.
   */
  constructor(risk, time, languageHandler) {
    this._risk = risk;
    this._time =
      time === "current"
        ? "Gegenwart"
        : time === "future"
        ? "Zukunft"
        : "Veränderung";
    this._languageHandler = languageHandler;
  }

  /**
   * Get the class of the provided value regards the classification based on an optional detailed risk.
   * @param {*} value The value to classify.
   * @param {*} classMap The classification to use.
   * @param {*} detailedRisk The detail-factor the classification is based on. Per default undefined.
   * @returns The class as an array: The class-name in german at index 0, class-name in english at index 1 and the upper bound of the class interval at index 2.
   */
  _getClassForValue(value, classMap, detailedRisk = undefined) {
    if (!detailedRisk) {
      const upperBound = classMap.upperBounds
        .filter((bound) => {
          if (
            classMap ===
            ContentHandler._LAYER_CLASSIFICATIONS.HotSpotsVeränderung
          )
            return bound >= value;
          return bound > value;
        })
        .sort((number1, number2) =>
          number1 > number2 ? 1 : number1 === number2 ? 0 : -1
        )[0];
      const upperBoundIndex = classMap.upperBounds.indexOf(upperBound);
      const classNameDe = classMap.headers.de[upperBoundIndex];
      const classNameEn = classMap.headers.en[upperBoundIndex];
      return [classNameDe, classNameEn, upperBound];
    } else {
      for (const [classNameDe, classValue] of Object.entries(classMap)) {
        if (value === classValue) {
          return [
            classNameDe,
            ContentHandler._FACTOR_CLASSIFICATIONS[this._risk][this._time]
              .headers[detailedRisk].en[
              ContentHandler._FACTOR_CLASSIFICATIONS[this._risk][
                this._time
              ].headers[detailedRisk].de.indexOf(classNameDe)
            ],
            value,
          ];
        }
      }
    }
  }

  /**
   * Get a html-parsed string which displays the deatiled feature's property information.
   * @param {*} county The feature to compute the detailed information for.
   * @returns A html-parsed string with the detailed information.
   */
  _getDetailedPopupInformation(county) {
    let detailedHtml = '</div><div id="detailed">';
    detailedHtml += `<div id="${this._risk}-${this._time}" class="explanation">`;
    if (this._risk === "HotSpots" && this._time !== "Veränderung") {
      const riskPropertiesToDisplay = Object.keys(
        county.feature.properties
      ).filter((property) => {
        return (
          property.endsWith(this._time) && !property.startsWith("HotSpots")
        );
      });
      for (const riskPropertyName of riskPropertiesToDisplay) {
        let classForValue = this._getClassForValue(
          county.feature.properties[riskPropertyName],
          ContentHandler._LAYER_CLASSIFICATIONS.Zeitpunkt
        );
        detailedHtml += `
        <span class='${this._risk}-${
          this._time
        }-detailed' lang="de"><b>${riskPropertyName}:</b> ${
          classForValue[0]
        }<br></span>
        <span class='${this._risk}-${this._time}-detailed' lang="en"><b>${
          ContentHandler._FACTOR_CLASSIFICATIONS[riskPropertyName.split(" ")[0]]
            .riskName.en
        } ${
          this._time === "Veränderung"
            ? "change"
            : this._time === "Gegenwart"
            ? "currently"
            : "future"
        }:</b> ${classForValue[1]}<br></span>`;
      }
    } else if (this._time === "Veränderung") {
      const riskScoreToday =
        county.feature.properties[`${this._risk} Gegenwart`];
      const riskScoreFuture =
        county.feature.properties[`${this._risk} Zukunft`];
      const classToday = this._getClassForValue(
        riskScoreToday,
        ContentHandler._LAYER_CLASSIFICATIONS.Zeitpunkt
      );
      const classFuture = this._getClassForValue(
        riskScoreFuture,
        ContentHandler._LAYER_CLASSIFICATIONS.Zeitpunkt
      );
      detailedHtml += `
      <span class='${this._risk}-${this._time}-detailed' lang="de"><b>${
        this._risk
      } Gegenwart :</b> ${classToday[0]}<br></span>
      <span class='${this._risk}-${this._time}-detailed' lang="de"><b>${
        this._risk
      } Zukunft :</b> ${classFuture[0]}<br></span>
      <span class='${this._risk}-${this._time}-detailed' lang="en"><b>${
        this._risk === "HotSpots"
          ? "HotSpots"
          : ContentHandler._FACTOR_CLASSIFICATIONS[this._risk].riskName.en
      } currently :</b> ${classToday[1]}<br></span>
      <span class='${this._risk}-${this._time}-detailed' lang="en"><b>${
        this._risk === "HotSpots"
          ? "HotSpots"
          : ContentHandler._FACTOR_CLASSIFICATIONS[this._risk].riskName.en
      } in future :</b> ${classFuture[1]}<br></span>`;
    } else {
      Object.entries(
        ContentHandler._FACTOR_CLASSIFICATIONS[this._risk][this._time].headers
      ).forEach(([riskName, riskClasses]) => {
        if (riskName === "Summe") {
          detailedHtml += `<span class='${this._risk}-${
            this._time
          }-detailed' lang="de"><b>${riskName}:</b> ${county.feature.properties[
            `${this._risk} ${this._time} Summe`
          ].toFixed()} von ${
            ContentHandler._FACTOR_CLASSIFICATIONS[this._risk][this._time]
              .headers[riskName].Maximum
          }<br></span>
          <span class='${this._risk}-${
            this._time
          }-detailed' lang="en"><b>sum:</b> ${county.feature.properties[
            `${this._risk} ${this._time} Summe`
          ].toFixed()} out of ${
            ContentHandler._FACTOR_CLASSIFICATIONS[this._risk][this._time]
              .headers[riskName].Maximum
          }<br></span>`;
        } else {
          let detailedRiskValue =
            county.feature.properties[
              `${this._risk} ${this._time} ${riskName}`
            ];
          let classForValue = this._getClassForValue(
            detailedRiskValue,
            Object.fromEntries(
              riskClasses.de.map((element, index) => [
                element,
                riskClasses.values[index],
              ])
            ),
            riskName
          );
          detailedHtml += `<span class='${this._risk}-${
            this._time
          }-detailed' lang="de"><b>${riskName.substring(
            riskName.indexOf("(") + 1,
            riskName.indexOf(")")
          )}:</b> ${classForValue[0]}<br></span>
          <span class='${this._risk}-${
            this._time
          }-detailed' lang="en"><b>${ContentHandler._FACTOR_CLASSIFICATIONS[
            this._risk
          ][this._time].factorNameTranslations[riskName].substring(
            ContentHandler._FACTOR_CLASSIFICATIONS[this._risk][
              this._time
            ].factorNameTranslations[riskName].indexOf("(") + 1,
            ContentHandler._FACTOR_CLASSIFICATIONS[this._risk][
              this._time
            ].factorNameTranslations[riskName].indexOf(")")
          )}:</b> ${classForValue[1]}<br></span>`;
        }
      });
    }
    return (detailedHtml += "</div></div>");
  }

  /**
   * Remove the subframe HTML-Element from DOM and update the interface-appearance.
   * @param {*} subframeHtmlContainer The parent-node of the subframe HTML-element.
   */
  static closeCurrentSubframe(subframeHtmlContainer) {
    for (const button of document.querySelectorAll("#metadata button")) {
      button.classList.remove("current");
    }
    for (const subframe of document.querySelectorAll(".subframe")) {
      subframeHtmlContainer.removeChild(subframe);
    }
  }

  /**
   * Show the corresponding subframe to the clicked button.
   * @param {*} subframeHtmlContainer The parent-node of the subframe HTML-element. Latter gets inserted here.
   * @param {*} clickedButton The button that was clicked and led to subframe request.
   */
  static showSubframe(subframeHtmlContainer, clickedButton) {
    ContentHandler.closeCurrentSubframe(subframeHtmlContainer);
    const subframeHtml =
      clickedButton.id === "imprint"
        ? ContentHandler._IMPRINT
        : ContentHandler._METHODS;
    subframeHtmlContainer.insertAdjacentHTML("afterbegin", subframeHtml);
    clickedButton.classList.add("current");
    document.querySelector(".subframe button").onclick = () =>
      ContentHandler.closeCurrentSubframe(subframeHtmlContainer);
  }

  static getLegendClasses(risk, time, language) {
    if (time === "Veränderung" && risk === "HotSpots") {
      return ContentHandler._LAYER_CLASSIFICATIONS.HotSpotsVeränderung.headers[
        language
      ];
    } else if (time === "Veränderung") {
      return ContentHandler._LAYER_CLASSIFICATIONS.Veränderung.headers[
        language
      ];
    } else {
      return ContentHandler._LAYER_CLASSIFICATIONS.Zeitpunkt.headers[language];
    }
  }

  /**
   * Get the title of the legend.
   * @param {*} risk The risk the map displays currently.
   * @param {*} time The time the map displays currently.
   * @param {*} language The langage of the legend-title.
   * @returns The appropriate legend-title as string.
   */
  static getLegendTitle(risk, time, language) {
    const legendRisk =
      risk === "HotSpots"
        ? "HotSpots"
        : ContentHandler._FACTOR_CLASSIFICATIONS[risk].riskName[language];
    const legendTime =
      time === "Gegenwart"
        ? ContentHandler._TEXT_CONTENTS.currentTimeTitle[language]
        : time === "Veränderung"
        ? ContentHandler._TEXT_CONTENTS.changeTimeTitle[language]
        : ContentHandler._TEXT_CONTENTS.futureTimeTitle[language];
    return `${legendRisk} ${legendTime}`;
  }

  /**
   * Get the title of the map.
   * @param {*} risk The risk the map displays currently.
   * @param {*} language The langage of the map-title.
   * @returns The appropriate map-title as string.
   */
  static getMapTitle(risk, language) {
    if (language === "de") {
      return risk !== "HotSpots"
        ? `Gesundheitliche Risiken durch ${risk}`
        : "HotSpots der Gesundheitsgefahren";
    } else {
      return risk !== "HotSpots"
        ? `health risks through ${ContentHandler._FACTOR_CLASSIFICATIONS[risk].riskName[language]}`
        : "Hotspots of Climate-Related Health Hazards";
    }
  }

  /**
   * Get a risk-explanation.
   * @param {*} risk The risk of the explanation
   * @param {*} language The language of the explanation.
   * @returns The explanation as string.
   */
  static getRiskExplanation(risk, language) {
    return ContentHandler._FACTOR_CLASSIFICATIONS[risk].explanation[language];
  }

  /**
   * Get a html-parsed string which displays the feature-specific popup.
   * @param {*} county The feature to compute the popup for.
   * @returns A html-parsed string representing the popup for the provided county.
   */
  getPopupContent(county) {
    let popupContentHtml = `<h4>${
      county.feature.properties[ContentHandler._COUNTY_NAME_PROPERTY_NAME]
    }</h4>`;
    let countyClass, classSeperatorsAmount;
    const classMap =
      this._time === "Veränderung" && this._risk === "HotSpots"
        ? ContentHandler._LAYER_CLASSIFICATIONS.HotSpotsVeränderung
        : this._time === "Veränderung"
        ? ContentHandler._LAYER_CLASSIFICATIONS.Veränderung
        : ContentHandler._LAYER_CLASSIFICATIONS.Zeitpunkt;
    let index = new Array(
      classMap.upperBounds.sort(
        (number1, number2) =>
          classMap.upperBounds[number1] - classMap.upperBounds[number2]
      )
    )[0];
    countyClass = this._getClassForValue(
      county.feature.properties[`${this._risk} ${this._time}`],
      classMap
    );
    const riskClassText = // alter risk-description for value 0 on change-layers
      county.feature.properties[`${this._risk} ${this._time}`] === 0 &&
      this._time === "Veränderung"
        ? ["gleichbleibend", "constant"]
        : [countyClass[0], countyClass[1]];
    popupContentHtml += `<span class="${this._risk}-${
      this._time
    }-result" lang="de"><b>${
      this._time === "Veränderung"
        ? `${this._risk}-Veränderung: `
        : `${this._risk}-Risiko: `
    }</b>${riskClassText[0]}</span>
    <span class="${this._risk}-${this._time}-result" lang="en"><b>${
      this._risk === "HotSpots" && this._time === "Veränderung"
        ? "HotSpots change: "
        : this._risk === "HotSpots"
        ? "HotSpots risk: "
        : this._time === "Veränderung"
        ? `${
            ContentHandler._FACTOR_CLASSIFICATIONS[this._risk].riskName.en
          } change: `
        : `${
            ContentHandler._FACTOR_CLASSIFICATIONS[this._risk].riskName.en
          } risk: `
    }</b>${riskClassText[1]}</span>`;
    let valueToDisplay =
      county.feature.properties[`${this._risk} ${this._time}`];
    let left_property;
    if (this._risk === "HotSpots" && this._time === "Veränderung") {
      classSeperatorsAmount = 3;
      popupContentHtml += '<div id="hotspot-change" class="score-bar">';
      left_property = Math.min(40 * valueToDisplay + 8, 188); // 8px from left end to middle of first bar, then +40px for each class
    } else if (this._time === "Veränderung") {
      classSeperatorsAmount = 6;
      popupContentHtml += '<div id="change" class="score-bar">';
      left_property =
        valueToDisplay <= 0
          ? Math.max(4 * valueToDisplay + 68, -12)
          : Math.min(4 * valueToDisplay + 68, 268); // 4px represent one score-point, 68px represents zero score-points
    } else {
      classSeperatorsAmount = 5;
      popupContentHtml += '<div id="at-time" class="score-bar">';
      left_property = Math.min(2 * valueToDisplay - 12, 228); // 2px represent one score-point, minus offset 12px
    }
    for (let i = 1; i <= index.length; i++) {
      if (i === 1) {
        valueToDisplay =
          this._time === "Veränderung" && valueToDisplay >= 0.5
            ? `+${Number(valueToDisplay.toFixed())}`
            : `${Number(valueToDisplay.toFixed())}`;

        popupContentHtml += `
        <div class="class-${i}">
          <div class="interval-border" ${
            this._risk === "HotSpots" && this._time === "Veränderung"
              ? "style=left:8px;"
              : ""
          }>
            <span class="interval-bound">${index[i - 1]}</span>
            <span class="interval-seperator">|</span>
          </div>
          <div id="value-pointer" style="left:${left_property}px;">
            <span id="pointer"></span>
            <span id="value">${valueToDisplay}</span>
          </div>
        </div>`;
      } else {
        popupContentHtml += `<div class="class-${i}">`;
        if (i <= classSeperatorsAmount) {
          popupContentHtml += `
          <div class="interval-border" ${
            this._risk === "HotSpots" && this._time === "Veränderung"
              ? "style=left:8px;"
              : ""
          }>
            <span class="interval-bound">${index[i - 1]}</span>
            <span class="interval-seperator">|</span>
          </div>
        </div>`;
        } else {
          popupContentHtml += "</div>";
          break;
        }
      }
    }
    popupContentHtml += this._getDetailedPopupInformation(county);
    return popupContentHtml;
  }

  /**
   * Get a html-parsed string which displays the feature-specific tooltip.
   * @param {*} county The feature to compute the tooltip for.
   * @returns A html-parsed string representing the tooltip for the provided county.
   */
  getTooltipContent(county) {
    const symbolizingValue =
      county.feature.properties[`${this._risk} ${this._time}`];
    return `<span class="tooltip-title">${
      county.feature.properties[ContentHandler._COUNTY_NAME_PROPERTY_NAME]
    }</span><br><span class="value" style="color: ${StyleManager.getHexColor(
      symbolizingValue,
      this._risk,
      this._time
    )}">${
      symbolizingValue > 0 && this._time === "Veränderung" ? "+" : ""
    }${Number(symbolizingValue).toFixed()}</span>`;
  }
}
