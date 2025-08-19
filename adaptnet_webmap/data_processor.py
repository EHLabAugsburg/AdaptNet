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
        for sheet_name, column_names in utilities.LAYER_METADATA.items():
            attribute_table = pandas.read_excel(
                self.__attribute_table_data_path,
                sheet_name=sheet_name,
                skiprows=3,
                usecols=("A,B,C,D,K,R,S" if sheet_name == "HotSpots" else None),
                dtype={1: str},  # interpret county-keys as str
            )
            attribute_table.columns = (
                DataProcessor.__BASE_ATTRIBUTE_TABLE_COLUMNS
                + list(column_names["Vergangenheit"])
                + list(column_names["Zukunft"])
                + [f"{sheet_name} Veränderung"]
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
