import pytest

from adaptnet_webmap import data_downloader


class TestDataDownloader:

    @pytest.fixture(autouse=True)
    def initialize_test(self):
        self.__data_downloader = data_downloader.DataDownloader()
        self.__county_features_amount = 400
        self.__state_features_amount = 24
        yield

    def test_fetch_resource(self):
        geo_json_collection = self.__data_downloader.download()
        for geo_json in geo_json_collection:
            assert geo_json["numberReturned"] in (
                self.__county_features_amount,
                self.__state_features_amount,
            ), "Downloaded a unexpected amount of features."
