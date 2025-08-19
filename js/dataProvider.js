/**
 * Class for accessing (meta-)data for the risks and used classifications.
 */
class DataProvider {
  static _LINK_PAGE_BASE_URL = {
    de: "https://www.uni-augsburg.de/de/fakultaet/med/profs/klimawandel-gesundheit/forschung/adaptnet/risikokarten",
    en: "https://www.uni-augsburg.de/en/fakultaet/med/profs/klimawandel-gesundheit/forschung/adaptnet/risikokarten",
  };
  static _RISK_DATA = {
    Luftbelastung: {
      riskName: { de: "Luftbelastung", en: "air quality" },
      explanation: {
        de: `<b>Gesundheitliche Folgen von Luftverschmutzung</b><br>
        Feinstaub, Ozon und Stickstoffoxide können unsere Gesundheit stark belasten – vor allem Atemwege und das Herz-Kreislaufsystem sind gefährdet.<br>
        <b>Wer ist besonders betroffen?</b></br>
        Kinder, ältere Menschen, chronisch erkrankte Menschen und Menschen, die viel Zeit im Freien verbringen, sind besonders anfällig.
        <a href="${DataProvider._LINK_PAGE_BASE_URL.de}#gesundheit">Mehr Infos</a>`,
        en: `<b>Health Impacts of Air Pollution</b><br>
        Fine particulate matter, ozone, and nitrogen oxides can severely affect our health, primarily impacting the respiratory and cardiovascular systems.<br>
        <b>Who is especially affected?</b><br>
        Children, older adults, people with chronic illnesses, and those who spend a lot of time outdoors are particularly susceptible.
        <a href="${DataProvider._LINK_PAGE_BASE_URL.en}#gesundheit">more info</a>`,
      },
      past: {
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
      future: {
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
      <a href="${DataProvider._LINK_PAGE_BASE_URL.de}#gesundheit">Mehr Infos</a>`,
        en: `<b>Health Risks from Pollen and Other Allergens</b><br>
      Climate change is causing longer pollen seasons and can alter the types of allergens in the environment, for example, through the spread of new allergenic plants.<br>
      <b>Who is particularly sensitive?</b><br>
      Children and adults with allergies or allergic asthma are especially affected.
      <a href="${DataProvider._LINK_PAGE_BASE_URL.en}#gesundheit">more info</a>`,
      },
      past: {
        factorNameTranslations: {
          "Faktor 1 (Prozessionsspinner)": "factor 1 (processionary moth)",
          "Faktor 2 (Heuschnupfen)": "factor 2 (hay fever)",
          "Faktor 3 (Pollen)": "factor 3 (pollen)",
          "Faktor 4 (Luftbelastung)": "factor 4 (air quality)",
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
          "Faktor 4 (Luftbelastung)": {
            de: ["gering", "niedrig", "mittel", "hoch", "kritisch"],
            en: ["very low", "low", "medium", "high", "critical"],
            values: [0, 0.5, 1, 1.5, 2],
          },
          Summe: { Maximum: 6 },
        },
      },
      future: {
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
      <a href="${DataProvider._LINK_PAGE_BASE_URL.de}#gesundheit">Mehr Infos</a>`,
        en: `<b>Health Impacts of Flooding</b><br>
      Floods can cause not only severe property damage but also serious health risks, includ-ing injuries and fatalities, contaminated water, infections, and psychological stress.<br>
      <b>Who is most affected?</b><br>
      People with mobility or cognitive impairments, emergency responders, and individuals who come into direct contact with polluted water are particularly at risk.
      <a href="${DataProvider._LINK_PAGE_BASE_URL.en}#gesundheit">more info</a>`,
      },
      past: {
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
      future: {
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
      <a href="${DataProvider._LINK_PAGE_BASE_URL.de}#gesundheit">Mehr Infos</a>`,
        en: `<b>Health Impacts of Wildfires</b><br>
      Wildfires not only endanger the environment but also pose serious health risks, from respiratory issues caused by smoke to physical injuries and psychological stress.<br>
      <b>Who is particularly vulnerable?</b><br>
      Children, the elderly, pregnant individuals, people with limited mobility, and emergency personnel are especially at risk during wildfires.
      <a href="${DataProvider._LINK_PAGE_BASE_URL.en}#gesundheit">more info</a>`,
      },
      past: {
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
      future: {
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
      <a href="${DataProvider._LINK_PAGE_BASE_URL.de}#gesundheit">Mehr Infos</a>`,
        en: `<b>Health Risks from Heat</b><br>
      High temperatures can place a significant strain on the body – especially for people with certain pre-existing conditions or during intense physical activity.<br>
      <b>Who is especially at risk during heatwaves?</b><br>
      Everyone can be affected, but some groups are particularly vulnerable – including older adults, children, and people with certain chronic illnesses.
      <a href="${DataProvider._LINK_PAGE_BASE_URL.en}#gesundheit">more info</a>`,
      },
      past: {
        factorNameTranslations: {
          "Faktor 1 (Hitzebelastung)": "factor 1 (heat exposure)",
          "Faktor 1 (Trop.Nächte)": "factor 1 (tropical nights)",
          "Faktor 2 (Kreistyp)": "factor 2 (county type)",
          "Faktor 3 (Siedlungs-und Verkehrsfläche)":
            "factor 3 (settlement and traffic area)",
          Summe: "sum",
        },
        headers: {
          "Faktor 1 (Hitzebelastung)": {
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
      future: {
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
      <a href="${DataProvider._LINK_PAGE_BASE_URL.de}#gesundheit">Mehr Infos</a>`,
        en: `<b>Health Risks from Vector-Borne Diseases</b><br>
      Vectors are disease carriers such as ticks or mosquitoes. In Germany, ticks already transmit diseases like Lyme borreliosis. In the future, mosquitoes may increasingly spread diseases such as West Nile virus or dengue fever.<br>
      <b>Who is particularly exposed?</b><br>
      People who spend a lot of time in nature (in meadows, forests, or gardens) are more likely to come into contact with ticks.
      <a href="${DataProvider._LINK_PAGE_BASE_URL.en}#gesundheit">more info</a>`,
      },
      past: {
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
      future: {
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
      riskName: { de: "HotSpots", en: "hot spots" },
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
  static _TIMES = {
    // mapping of time-flags on data time descriptors
    past: "Vergangenheit",
    future: "Zukunft",
    change: "Veränderung",
  };
  static _CLASSIFICATIONS = {
    atTime: {
      colors: [
        "#FEF0D9",
        "#FDD49E",
        "#FDBB84",
        "#FC8D59",
        "#E34A33",
        "#B30000",
      ],
      legendFontColors: ["black", "black", "black", "black", "black", "white"],
      bounds: [20, 40, 60, 80, 100, 1000],
      intervalLabels: [
        "&lt;20",
        "20 - &lt;40",
        "40 - &lt;60",
        "60 - &lt;80",
        "80 - &lt;100",
        "&ge;100",
      ],
      classLabels: {
        de: ["gering", "niedrig", "mittel", "hoch", "kritisch", "extrem"],
        en: ["very low", "low", "medium", "high", "critical", "extreme"],
      },
    },
    change: {
      colors: [
        "#4575b4",
        "#91bfdb",
        "#ffffb2",
        "#fecc5c",
        "#fd8d3c",
        "#f03b20",
        "#bd0026",
      ],
      legendFontColors: [
        "white",
        "black",
        "black",
        "black",
        "black",
        "black",
        "white",
      ],
      bounds: [-10, 0, 10, 20, 30, 40, 100],
      intervalLabels: [
        "&lt;-10",
        "-10 - &lt;0",
        "0 - &lt;10",
        "10 - &lt;20",
        "20 - &lt;30",
        "30 - &lt;40",
        "&ge;40",
      ],
      classLabels: {
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
    },
    hotspotsChange: {
      colors: ["#eaeaea", "#feb24c", "#f03b20"],
      legendFontColors: ["black", "black", "white"],
      bounds: [0, 1, 2],
      intervalLabels: ["0", "+1", "+2"],
      classLabels: {
        de: ["gleichbleibend", "zunehmend", "stark zunehmend"],
        en: ["constant", "increasing", "strongly increasing"],
      },
    },
  };

  /**
   * Get the configuration data for the classification on the given risk at the given point in time.
   * @param {*} risk
   * @param {*} time
   * @returns The configuration data for the classification as JSON-object (in ascending order):
   * colors: the HEX-color codes for the classes
   * legendFontColors: the color in which the interval gets written inside the legend color-box
   * bounds: upper bounds for the classes
   * intervalLabels: the text content of the color-boxes in the legend
   * classLabels: the description of the classes
   */
  static getClassification(risk, time) {
    if (risk === "HotSpots" && time === "change")
      return DataProvider._CLASSIFICATIONS.hotspotsChange;
    else if (time === "change") return DataProvider._CLASSIFICATIONS.change;
    else return DataProvider._CLASSIFICATIONS.atTime;
  }

  /**
   * Get the factor classification for the passed factor-name.
   * @param {*} risk
   * @param {*} time
   * @param {*} factorName
   * @returns An object containing three arrays:
   * de: class names in german,
   * en: class names in english
   * values: the class values
   */
  static getFactorClasses(risk, time, factorName) {
    return DataProvider._RISK_DATA[risk][time].headers[factorName];
  }

  /**
   * Get the names of a risk-factor for a provided risk and time.
   * @param {*} risk
   * @param {*} time
   * @returns An object containing the factor-name in german as key, the factor-name in english as value.
   */
  static getFactorNames(risk, time, factorName) {
    return DataProvider._RISK_DATA[risk][time].factorNameTranslations[
      factorName
    ];
  }

  /**
   * Retrieve the URL of the project-page.
   * @param {*} language the language of the URL-link to retrieve
   * @returns The URL which leads to the appropriate project-website.
   */
  static getLinkPageUrl(language) {
    return DataProvider._LINK_PAGE_BASE_URL[language];
  }

  /**
   * Get the risk-names in both featured languages.
   * @param {*} risk
   * @returns An object containing two entries:
   * de: risk-name in german
   * en: risk-name in english
   */
  static getRiskName(risk) {
    return DataProvider._RISK_DATA[risk].riskName;
  }
  /**
   * Return metadata from all factors regarding the provided risk for a given time.
   * @param {*} risk
   * @param {*} time
   * @returns An nested object containing every risk-factors classification as:
   * de: class names in german,
   * en: class names in english
   * values: the class values
   */
  static getRiskFactors(risk, time) {
    return DataProvider._RISK_DATA[risk][time].headers;
  }

  /**
   * Get a risk-explanation.
   * @param {*} risk The risk of the explanation
   * @param {*} language The language of the explanation.
   * @returns The explanation as string.
   */
  static getRiskExplanation(risk, language) {
    return DataProvider._RISK_DATA[risk].explanation[language];
  }

  /**
   * Get the time descriptor for a given time-flag.
   * @param {*} time the time-flag of the requesting instance
   * @returns the appropriate time descriptor for the provided time flag
   */
  static getTimeDescriptor(time) {
    return DataProvider._TIMES[time];
  }
}
