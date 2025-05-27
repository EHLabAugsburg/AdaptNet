import asyncio

import aiohttp


class DataDownloader:

    __ADMINISTRATIVE_KEYS = {"counties": "vg2500_krs", "states": "vg2500_lan"}
    TEMPLATE_RESOURCE_URL = "https://sgx.geodatenzentrum.de/wfs_vg2500?service=wfs&version=2.0.0&request=GetFeature&TYPENAMES=ADMINISTRATIVE_KEY&SRSName=urn:ogc:def:crs:EPSG::4326&outputformat=JSON"  # noqa

    async def __fetch_all_resources(self) -> list[asyncio.Future]:
        """
        Coordinate the concurrent execution of the downloads for every required
        resource.

        Returns
        -------
        list[asyncio.Future]
            A list of future-objects calculating the data for every resource.
        """
        async with aiohttp.ClientSession() as session:
            downloads = [
                self.__fetch_resource(session, admin_key)
                for admin_key in self.__ADMINISTRATIVE_KEYS.values()
            ]
            return await asyncio.gather(*downloads)

    async def __fetch_resource(
        self,
        session: aiohttp.ClientSession,
        typenames_parameter: str,
    ) -> dict:
        """
        Fetch the features from the resource-url (WFS) which are contained in
        the typenames-parameter.

        Parameters
        ----------
        session : aiohttp.ClientSession
            A open HTTP-client session to use for fetching the resource.
        typenames_parameter : str
            The typenames-value to inset into the template-resource url.

        Returns
        -------
        dict
            The GeoJson-result fron HTTP-request. If fetching fails, an empty
            dict get's returned instead.
        """
        resource_url = DataDownloader.TEMPLATE_RESOURCE_URL.replace(
            "ADMINISTRATIVE_KEY",
            typenames_parameter,
        )
        try:
            async with session.get(resource_url) as response:
                return await response.json()
        except aiohttp.ClientError as ce:
            print(f"Fetching {typenames_parameter} failed: {ce.__cause__}.")
            exit(1)

    def download(self) -> tuple[dict]:
        """
        Download the required data from the WFS.

        Returns
        -------
        tuple[dict]
            A tuple containing the GeoJson-encoded content from the
            WFS-Requests.
        """
        return asyncio.run(self.__fetch_all_resources())
