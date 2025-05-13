from typing import Callable

import branca.colormap
from matplotlib import colors

HOTSPOT_CHANGE_LAYER_COLORMAP = branca.colormap.StepColormap(
    colors=[
        "#e0f3f8",
        "#fee090",
        "#d73027",
    ],
    index=[0, 1, 2],
)

CHANGE_LAYER_COLORMAP = branca.colormap.StepColormap(
    colors=[
        "#4575b4",
        "#91bfdb",
        "#ffffb2",
        "#fecc5c",
        "#fd8d3c",
        "#f03b20",
        "#bd0026",
    ],
    index=[-100, -9.999, 0.001, 10.001, 20.001, 30.001, 40.001],
)

RISK_LAYER_COLORMAP = branca.colormap.StepColormap(
    colors=["#FEF0D9", "#FDD49E", "#FDBB84", "#FC8D59", "#E34A33", "#B30000"],
    index=[0, 20.001, 40.001, 60.001, 80.001, 100.001],
)

COLORMAPS = {  # mapping of colormaps to their HEX color-schemes
    "HOTSPOT_CHANGE_LAYER_COLORMAP": [
        colors.to_hex(color, keep_alpha=True)
        for color in HOTSPOT_CHANGE_LAYER_COLORMAP.colors
    ],
    "CHANGE_LAYER_COLORMAP": [
        colors.to_hex(color, keep_alpha=True)
        for color in CHANGE_LAYER_COLORMAP.colors
    ],
    "RISK_LAYER_COLORMAP": [
        colors.to_hex(color, keep_alpha=True)
        for color in RISK_LAYER_COLORMAP.colors
    ],
}


def get_risk_layer_feature_style(risk: str, time: str) -> Callable:
    """
    Get the style-function of the passed feature based on it's
    symbolization-value for risk-layers at the provided time.

    Parameters
    ----------
    risk : str
        The risk the feature should display.
    time: str
        The time to symbolize.

    Returns
    -------
    Callable
        The style callable to use for the feature.
    """

    def style_feature(feature: dict) -> dict:
        """
        Get the style-propertes of the passed feature based on it's
        symbolization-value for the risk-layers.

        Parameters
        ----------
        feature : dict
            The feature to determine the style for.

        Returns
        -------
        dict
            The style properties to use for the feature.
        """
        return {
            "fillColor": RISK_LAYER_COLORMAP(
                feature["properties"][f"{risk} {time}"]
            ),
            "fillOpacity": 1,
            "weight": 0,
        }

    return style_feature


def get_change_layer_feature_style(risk: str) -> Callable:
    """
    Get the style-function of the passed feature based on it's
    symbolization-value for change-layers.

    Parameters
    ----------
    risk : str
        The risk the feature should display.

    Returns
    -------
    Callable
        The style callable to use for the feature.
    """

    def style_feature(feature: dict) -> dict:
        """
        Get the style-propertes of the passed feature based on it's
        symbolization-value for the change-layers.

        Parameters
        ----------
        feature : dict
            The feature to determine the style for.

        Returns
        -------
        dict
            The style properties to use for the feature.
        """
        return {
            "fillColor": CHANGE_LAYER_COLORMAP(
                feature["properties"][f"{risk} Veränderung"]
            ),
            "fillOpacity": 1,
            "weight": 0,
        }

    return style_feature


def get_hotspot_layer_feature_style(time: str) -> Callable:
    """
    Get the style-function of the passed feature based on it's
    symbolization-value for hotspot-layers at provided time.

    Parameters
    ----------
    time : str
        The time the feature should display.

    Returns
    -------
    Callable
        The style callable to use for the feature.
    """

    def style_feature(feature: dict) -> dict:
        """
        Get the style-propertes of the passed feature based on it's
        symbolization-value for the hotspot-layer.

        Parameters
        ----------
        feature : dict
            The feature to determine the style for.

        Returns
        -------
        dict
            The style properties to use for the feature.
        """
        if time == "Veränderung":
            return {
                "fillColor": HOTSPOT_CHANGE_LAYER_COLORMAP(
                    feature["properties"][f"HotSpots {time}"]
                ),
                "fillOpacity": 1,
                "weight": 0,
            }
        return {
            "fillColor": RISK_LAYER_COLORMAP(
                feature["properties"][f"HotSpots {time}"]
            ),
            "fillOpacity": 1,
            "weight": 0,
        }

    return style_feature
