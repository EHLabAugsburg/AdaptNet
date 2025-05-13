import argparse
from pathlib import Path

from adaptnet_webmap.map_builder import MapBuilder


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "-o",
        "--output_path",
        default="map.html",
        type=Path,
        help="Provide a path, where the generated map gets stored.",
    )
    parser.add_argument(
        "-s",
        "--source",
        required=True,
        type=Path,
        help="The path to an excel-file where the attribute tables are stored.",
    )
    arguments = parser.parse_args()
    builder = MapBuilder(arguments.source)
    builder.build(arguments.output_path)


if __name__ == "__main__":
    main()
