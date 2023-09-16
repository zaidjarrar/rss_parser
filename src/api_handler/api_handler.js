import axios from 'axios';
const RSS_FEED_URL = 'http://localhost:4050/feed';
const COUNTIES_ADDRESS_URL = 'http://localhost:4050/address/';

const fetchRssFeed = async () => {
    try {
        const response = await axios.get(RSS_FEED_URL);
        const xmlText = await response.data;

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        const items = xmlDoc.querySelectorAll('item');
        const countriesMap = {};

        const processItem = (item) => {
            const countryElement = item.querySelector('country');
            const titleElement = item.querySelector('title');


            if (!countriesMap[countryElement.textContent]) {
                countriesMap[countryElement.textContent] = [];
            }

            countriesMap[countryElement.textContent].push(titleElement.textContent);

            return {
                title: titleElement.textContent,
                country: countryElement.textContent,
            };
        };
        const rssItems = Array.from(items).map(processItem);



        return { rssItems, countriesMap };
    } catch (error) {
        console.error('Error fetching or parsing RSS feed:', error);
        throw error;
    }
};



const fetchCountryAddress = async (
    country
) => {
    try {
        const response = await axios.get(
            `${COUNTIES_ADDRESS_URL}${country}`
        );
        if (response.data.status === "OK") {

            const location = response.data.results[0].geometry.location;
            const locationData = {
                lat: location.lat,
                lng: location.lng,
                title: country,
            }
            return locationData;
        }
    } catch (error) {
        console.error(
            `Error fetching coordinates for ${country} : `,
            error
        );
    }
}

export default { fetchRssFeed, fetchCountryAddress };