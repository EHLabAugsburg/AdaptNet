import folium

from adaptnet_webmap import styles, utilities
from adaptnet_webmap.data_processor import DataProcessor


class MapLayerCreator:

    __MAP_LAYER_HIGHLIGHT = {"color": "black", "weight": 4}

    def __init__(self, data_processor: DataProcessor):
        self.__data_processor = data_processor

    def __create_map_layer(
        self,
        risk: str,
        time: str,
    ) -> folium.FeatureGroup:
        """
        Create a layer displaying thematic-values based on the provided
        risk as well as time.

        Parameters
        ----------
        risk : str
            The risk the created layer contains attributes about.
        time: str
            The time the created layer contains attributes about.

        Returns
        -------
        folium.FeatureGroup
            A of folium.FeatureGroup-instance containing the rendered feature
            with the attribute-based symbiolization as well as
            the corresponding popup.
        """
        layer = folium.FeatureGroup(name=f"{risk} {time}", show=False)
        if risk == "HotSpots":
            for feature in self.__data_processor.county_geo_json["features"]:
                feature_layer = folium.GeoJson(
                    data=feature,
                    highlight_function=lambda _: MapLayerCreator.__MAP_LAYER_HIGHLIGHT,  # noqa
                    style_function=styles.get_hotspot_layer_feature_style(time),
                    tooltip=folium.GeoJsonTooltip(
                        fields=[utilities.COUNTY_NAME_PROPERTY],
                        labels=False,
                    ),
                    zoom_on_click=True,
                    pane="risk-layer",
                )
                utilities.generate_feature_popup(feature, risk, time).add_to(
                    feature_layer
                )
                feature_layer.add_to(layer)
        elif time in ("Gegenwart", "Zukunft"):
            for feature in self.__data_processor.county_geo_json["features"]:
                feature_layer = folium.GeoJson(
                    data=feature,
                    highlight_function=lambda _: MapLayerCreator.__MAP_LAYER_HIGHLIGHT,  # noqa
                    style_function=styles.get_risk_layer_feature_style(
                        risk,
                        time,
                    ),
                    tooltip=folium.GeoJsonTooltip(
                        fields=[utilities.COUNTY_NAME_PROPERTY],
                        labels=False,
                    ),
                    zoom_on_click=True,
                    pane="risk-layer",
                )
                utilities.generate_feature_popup(feature, risk, time).add_to(
                    feature_layer
                )
                feature_layer.add_to(layer)
        else:  # create risk-change-layer
            for feature in self.__data_processor.county_geo_json["features"]:
                feature_layer = folium.GeoJson(
                    data=feature,
                    highlight_function=lambda _: MapLayerCreator.__MAP_LAYER_HIGHLIGHT,  # noqa
                    style_function=styles.get_change_layer_feature_style(risk),
                    tooltip=folium.GeoJsonTooltip(
                        fields=[utilities.COUNTY_NAME_PROPERTY],
                        labels=False,
                    ),
                    zoom_on_click=True,
                    pane="risk-layer",
                )
                utilities.generate_feature_popup(feature, risk, time).add_to(
                    feature_layer
                )
                feature_layer.add_to(layer)
        return layer

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
        layers = []
        self.__data_processor.process_data()
        layers.append(
            folium.GeoJson(
                data=self.__data_processor.county_boundaries_geo_json,
                name="counties",
                style_function=lambda _: {
                    "color": "black",
                    "weight": 1,
                    "fillOpacity": 0,
                },
                overlay=True,
                control=False,
                pane="base-layer",
            )
        )  # add counties base-layer
        layers.append(
            folium.GeoJson(
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
        )  # add states base-layer
        for time in utilities.TIMES:
            for risk in utilities.RISKS:
                layers.append(self.__create_map_layer(risk, time))
        return layers
