from pathlib import Path

import folium
import folium.map
import folium.plugins
import folium.raster_layers
import jinja2

from adaptnet_webmap import utilities
from adaptnet_webmap.data_processor import DataProcessor
from adaptnet_webmap.map_layer_creator import MapLayerCreator


class MapBuilder:

    __TIMES = ["Gegenwart", "Zukunft", "Veränderung"]

    def __init__(self, attribute_table_source_path: Path):
        self.__map_layers = MapLayerCreator(
            DataProcessor(attribute_table_source_path)
        ).create_layers()
        self.__map = folium.Map(
            control_scale=True,
            location=[51.5, 10.5],
            max_bounds=True,
            max_lon=20,
            max_lat=60,
            min_lat=40,
            min_lon=0,
            tiles=folium.raster_layers.TileLayer(
                tiles="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",  # noqa
                attr="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors, &copy; <a href='https://cartodb.com/attributions'>CartoDB</a>",  # noqa
                control=False,
            ),
            zoom_control=False,
            zoom_start=6,
        )

    def __add_external_file_dependencies(self) -> None:
        for script in filter(
            lambda script: script.name != "main.js", Path("js").iterdir()
        ):
            self.__map.add_js_link(script.name, f"js\\{script.name}")
        with open("js\\main.js", "r", encoding="utf-8") as script:
            script_code = folium.Element(script.read())
            self.__map.get_root().script.add_child(script_code)
        for stylesheet in Path("css").iterdir():
            self.__map.add_css_link(
                stylesheet.name,
                f"css\\{stylesheet.name}",
            )

    def __add_layers_to_map(self) -> None:
        """
        Add all layers from map-layers property to the map.
        """
        folium.map.CustomPane("base-layer", z_index=630).add_to(
            self.__map
        )  # to ensure base-layer visibility
        folium.map.CustomPane("risk-layer").add_to(self.__map)
        for layer in self.__map_layers:
            layer.add_to(self.__map)

    def __add_interface(self) -> None:
        """
        Add the custom user-interface to the map.
        """
        self.__add_external_file_dependencies()
        with open(
            "templates\\interface.html",
            encoding="utf-8",
        ) as interface_template:
            template = jinja2.Template(interface_template.read())
        control_pane_html = template.render(
            risks=utilities.RISKS,
            times=MapBuilder.__TIMES,
        )
        self.__map.get_root().html.add_child(folium.Element(control_pane_html))
        search_bar = folium.plugins.Search(
            geom_type="Line",
            layer=self.__map_layers[1],
            position="topright",
            search_label=utilities.COUNTY_NAME_PROPERTY,
        )
        search_bar.add_to(self.__map)

    def build(self, html_destination_path: Path) -> str | None:
        """
        Build the map and store it at provided destination as html-file.

        Parameters
        ----------
        html_destination_path: Path
            The path of the destination to store generated html-file.
        """
        self.__add_layers_to_map()
        self.__add_interface()
        self.__map.save(html_destination_path)
