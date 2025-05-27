import folium

from adaptnet_webmap.data_processor import DataProcessor


class MapLayerCreator:

    def __init__(self, data_processor: DataProcessor):
        self.__data_processor = data_processor

    def create_layers(self) -> list[folium.FeatureGroup]:
        """
        Create layers using processed data from injected DataProcessor-instance.

        Returns
        -------
        list[folium.FeatureGroup]
            A list of the created layers from pre-processed GeoJson as
            folium.FeatureGroup-instances. Each layer contains a
            folium.GeoJson-instance for every feature.
        """
        self.__data_processor.process_data()
        states_base_layer = folium.GeoJson(
            data=self.__data_processor.state_boundaries_geo_json,
            style_function=lambda _: {
                "color": "black",
                "weight": 2,
                "fillOpacity": 0,
            },
            overlay=True,
            control=False,
            pane="base-layer",
        )
        counties_layer = folium.GeoJson(
            self.__data_processor.county_geo_json,
            style_function=lambda _: {
                "color": "black",
                "weight": 1,
                "fillOpacity": 0,
            },
            zoom_on_click=True,
            overlay=True,
            control=False,
            pane="risk-layer",
        )
        counties_layer._id = "counties"  # modified to access layers with JS
        return [states_base_layer, counties_layer]
