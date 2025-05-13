from pathlib import Path

import pandas
import pytest

from adaptnet_webmap import utilities
from adaptnet_webmap.data_processor import DataProcessor


class TestDataProcessor:

    @pytest.fixture(autouse=True)
    def initialize_tests(self):
        self.data_processor = DataProcessor(
            Path("H:\\koehnphi\\Auswertung_Kreise_Deutschland.xlsx")
        )
        yield

    @pytest.mark.parametrize(
        "path,expected_return",
        [
            (Path("H:\\koehnphi\\Auswertung_Kreise_Deutschland.xlsx"), True),
            (Path("C:\\path\\does_not\\exist"), False),
            (
                Path(
                    "H:\\koehnphi\\anleitungen\\20250117_Anleitung_Luftqualität.docx"  # noqa
                ),
                False,
            ),
        ],
    )
    def test_check_attribute_table_data_path(
        self, path: Path, expected_return: bool
    ):
        assert (
            self.data_processor._DataProcessor__check_attribute_table_data_path(
                path
            )
            == expected_return
        ), f"Incorrect checking of {path}."

    @pytest.mark.parametrize(
        "sheet_name,sheet_metadata",
        [
            ("Luftqualität", utilities.LAYER_METADATA["Luftqualität"]),
            ("Allergene", utilities.LAYER_METADATA["Allergene"]),
        ],
    )
    def test_get_attribute_table(self, sheet_name: str, sheet_metadata: dict):
        self.data_processor._DataProcessor__get_attribute_table(
            sheet_name, sheet_metadata
        )
        assert (
            self.data_processor._DataProcessor__attribute_tables[0].shape[0]
            == DataProcessor._DataProcessor__COUNTY_AMOUNT
        ), "Retrieved unexpected amount of rows."
        assert self.data_processor._DataProcessor__attribute_tables[0].shape[
            1
        ] == len(
            (
                DataProcessor._DataProcessor__BASE_ATTRIBUTE_TABLE_COLUMNS
                + sheet_metadata["Gegenwart"]["headers"]
                + sheet_metadata["Zukunft"]["headers"]
            )
        ), "Retrieved unexpected amount of columns."

    @pytest.mark.parametrize(
        "risk", [(risk) for risk in utilities.LAYER_METADATA]
    )
    def test_bind_attribute_table_with_geodata(self, risk: str):
        self.data_processor._DataProcessor__get_attribute_table(
            risk,
            utilities.LAYER_METADATA[risk],
        )
        self.data_processor._DataProcessor__bind_attribute_table_with_geodata(
            self.data_processor._DataProcessor__attribute_tables[0]
        )
        expected_headers = set(
            utilities.LAYER_METADATA[risk]["Gegenwart"]["headers"]
            + utilities.LAYER_METADATA[risk]["Zukunft"]["headers"]
        )
        for feature_index, feature in enumerate(
            self.data_processor.county_geo_json["features"]
        ):
            assert expected_headers.issubset(
                set(feature["properties"].keys())
            ), f"""
            Missing attributes in feature no.{feature_index} in
            attribute_table {risk}.
            """

    @pytest.mark.parametrize(
        "risk_column,county_key",
        [
            ("Luftqualität Veränderung", "09778"),
            ("Hitze Veränderung", "03453"),
            ("Allergene Veränderung", "05315"),
            ("HotSpots", "06437"),
        ],
    )
    def test_add_symbolizing_values_to_geo_json(
        self,
        risk_column: str,
        county_key: str,
    ):
        self.data_processor.process_data()
        for _, feature in enumerate(
            self.data_processor.county_geo_json["features"]
        ):
            if feature["properties"]["ags"] == county_key:
                added_symbolizing_value = feature["properties"][risk_column]
                score_dataframe = pandas.read_excel(
                    "H:\\koehnphi\\AdaptNet_Score_Evaluation.xlsx",
                    sheet_name="Evaluation",
                    dtype={"Kreis": str},
                )
                expected_symbolizing_value = score_dataframe.loc[
                    score_dataframe["Kreis"] == county_key, risk_column
                ].item()
                assert (
                    added_symbolizing_value == expected_symbolizing_value
                ), f"""
                Added unexpected value to feature with key {county_key}:
                {risk_column} is {added_symbolizing_value}, should be
                {expected_symbolizing_value}
                """
                break
