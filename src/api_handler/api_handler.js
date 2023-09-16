import axios from 'axios';
const fetchRssFeed = async () => {
    try {


        const response = await axios.get(
            // 'https://www.rotanacareers.com/rss/all/'
            'http://localhost:4050/feed'
        );

        const text = await response.data;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');
        const items = xmlDoc.querySelectorAll('item');
        const countriesMap = {};
        const parsedItems = Array.from(items).map((item) => {
            if (!countriesMap[item.querySelector('country').textContent]) {
                countriesMap[item.querySelector('country').textContent] = [];
            }

            countriesMap[item.querySelector('country').textContent].push(
                `${item.querySelector('title').textContent}`
            );

            return ({
                title: item.querySelector('title').textContent,
                link: item.querySelector('link').textContent,
                description: item.querySelector('description').textContent,
                country: item.querySelector('country').textContent,
            })
        });
        return [parsedItems, countriesMap];

    } catch (error) {
        console.error('Error fetching or parsing RSS feed:', error);
    }
};

export default fetchRssFeed;