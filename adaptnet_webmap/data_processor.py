import copy
from pathlib import Path

import pandas

from adaptnet_webmap import utilities
from adaptnet_webmap.data_downloader import DataDownloader


class DataProcessor:

    __ATTRIBUTE_TABLE_KEY_COLUMN = "Schlüsselnummer"
    __BASE_ATTRIBUTE_TABLE_COLUMNS = [
        "Schlüsselnummer",
        "NUTS3",
        "Regionale Bezeichnung",
        "Kreis",
    ]
    __COUNTY_AMOUNT = 400
    __COUNTY_KEY_PROPERTY = "ags"
    __RISKS_AMOUNT = 6
    __VALUE_CLASSIFICATION = (
        {  # mapping of class descriptions and their upper bounds
            "risk": {
                "geringes Risiko": 20,
                "niedriges Risiko": 40,
                "mittleres Risiko": 60,
                "hohes Risiko": 80,
                "kritisches Risiko": 100,
                "extremes Risiko": 1000,
            },
            "change": {
                "abnehmend": -10,
                "leicht abnehmend": 0,
                "leicht zunehmend": 10,
                "zunehmend": 20,
                "stark zunehmend": 30,
                "kritisch zunehmend": 40,
                "extrem zunehmend": 100,
            },
            "hotspots-change": {
                "stagnierend": 0,
                "zunehmend": 1,
                "stark zunehmend": 2,
            },
        }
    )

    def __init__(self, attribute_table_path: Path):
        self.__data_downloader = DataDownloader()
        self.__attribute_table_data_path = attribute_table_path
        self.__geo_json: tuple[dict] = self.__data_downloader.download()
        self.__attribute_tables: list[pandas.DataFrame] = []

    @property
    def county_geo_json(self) -> dict | None:
        """
        Select a GeoJson object from the geodata that represents the counties.

        Returns
        -------
        dict | None
            The county GeoJson-Object as a dictionary if exists, else None.
        """
        for geo_json in self.__geo_json:
            if geo_json.get("totalFeatures") == DataProcessor.__COUNTY_AMOUNT:
                return geo_json

    @property
    def state_boundaries_geo_json(self) -> dict | None:
        """
        Select a GeoJson object from the geodata that represents the
        states-boundaries.

        Returns
        -------
        dict | None
            The state GeoJson-Object as a dictionary if exists, else None.
        """
        for geo_json in self.__geo_json:
            if geo_json.get("totalFeatures") != DataProcessor.__COUNTY_AMOUNT:
                return self.__get_polygon_boundaries(geo_json)

    def __add_symbolizing_values_to_geo_json(self) -> None:
        """
        Calculate the symbolizing-values for the change-layers and
        hotspot-layer. Save them as properties in feature properties.
        """
        for _, feature in enumerate(self.county_geo_json["features"]):
            for risk in [
                risk for risk in utilities.RISKS if risk != "HotSpots"
            ]:
                change_value = (
                    feature["properties"][f"{risk} Zukunft"]
                    - feature["properties"][f"{risk} Gegenwart"]
                )
                feature["properties"].update(
                    {f"{risk} Veränderung": change_value},
                )
            total_future_score = sum(
                [
                    feature["properties"][f"{risk} Zukunft"]
                    for risk in utilities.LAYER_METADATA
                ]
            )
            total_current_score = sum(
                [
                    feature["properties"][f"{risk} Gegenwart"]
                    for risk in utilities.LAYER_METADATA
                ]
            )
            feature["properties"].update(
                {
                    "HotSpots Gegenwart": total_current_score
                    / DataProcessor.__RISKS_AMOUNT,
                    "HotSpots Zukunft": total_future_score
                    / DataProcessor.__RISKS_AMOUNT,
                }
            )
            # define hotspots-change using class-difference
            current_class, future_class = None, None
            for class_name, upper_bound in DataProcessor.__VALUE_CLASSIFICATION[
                "risk"
            ].items():
                if (
                    feature["properties"]["HotSpots Zukunft"] <= upper_bound
                    and future_class is None
                ):
                    future_class = class_name
                if (
                    feature["properties"]["HotSpots Gegenwart"] <= upper_bound
                    and current_class is None
                ):
                    current_class = class_name
                if future_class and current_class:
                    break
            feature["properties"].update(
                {
                    "HotSpots Veränderung": list(
                        DataProcessor.__VALUE_CLASSIFICATION["risk"]
                    ).index(future_class)
                    - list(DataProcessor.__VALUE_CLASSIFICATION["risk"]).index(
                        current_class
                    )
                }
            )

    def __remove_properties_from_geojson(
        self,
        geo_json: dict,
        properties_to_preserve: list[str],
    ) -> None:
        """
        Remove properties from every feature in the provided GeoJson.

        Parameters
        ----------
        geo_json: dict
            The GeoJson to modify.
        properties_to_preserve: list[str]
            An optional list of properties that should not get removed because
            of further usage.
        """
        for _, feature in enumerate(geo_json["features"]):
            cleaned_up_properties = {
                property_name: value
                for property_name, value in feature["properties"].items()
                if property_name in properties_to_preserve
            }
            feature["properties"] = cleaned_up_properties

    def __join_attribute_tables_with_features(self) -> None:
        """
        Join the features from county-GeoJson with the attribute-tables values
        based on county-key.
        """
        for attribute_table in self.__attribute_tables:
            for feature_index, feature in enumerate(
                self.county_geo_json["features"]
            ):
                feature["properties"].update(
                    attribute_table.loc[
                        attribute_table[
                            DataProcessor.__ATTRIBUTE_TABLE_KEY_COLUMN
                        ]
                        == feature["properties"].get(
                            DataProcessor.__COUNTY_KEY_PROPERTY
                        )
                    ]
                    .to_dict("index")
                    .get(feature_index)
                )

    def __get_polygon_boundaries(self, geo_json: dict) -> dict:
        """
        Convert a passed GeoJson containing Polygons or MultiPolygons into
        LineStrings or MultiLineStrings to retrieve the boundaries.

        Parameters
        ----------
        geo_json: dict
            The GeoJson to convert.

        Returns
        -------
        dict
            A new GeoJson-object containing the boundaries of the input-GeoJson
            as MultiLineStrings.
        """
        boundaries_geo_json = copy.deepcopy(geo_json)
        for _, feature in enumerate(boundaries_geo_json["features"]):
            feature["geometry"]["coordinates"] = [
                point[0] for point in feature["geometry"]["coordinates"]
            ]
            feature["geometry"]["type"] = "MultiLineString"
        return boundaries_geo_json

    def __get_attribute_tables(self) -> None:
        """
        Get attribute-tables from the source excel-file and store them into
        attribute_tables property.
        """
        for sheet_name, metadata in utilities.LAYER_METADATA.items():
            attribute_table = pandas.read_excel(
                self.__attribute_table_data_path,
                sheet_name=sheet_name,
                skiprows=3,
                dtype={1: str},  # interpret county-keys as str
            )
            attribute_table.columns = (
                DataProcessor.__BASE_ATTRIBUTE_TABLE_COLUMNS
                + list(metadata["Gegenwart"]["headers"].keys())
                + list(metadata["Zukunft"]["headers"].keys())
            )
            self.__attribute_tables.append(attribute_table)

    def process_data(self) -> None:
        """
        Process the geodata and attribute tables by joining them and computing
        further values from features resulting properties.
        """
        for geo_json in self.__geo_json:
            self.__remove_properties_from_geojson(
                geo_json,
                [
                    utilities.COUNTY_NAME_PROPERTY,
                    self.__COUNTY_KEY_PROPERTY,
                ],
            )
        self.__get_attribute_tables()
        self.__join_attribute_tables_with_features()
        self.__add_symbolizing_values_to_geo_json()
