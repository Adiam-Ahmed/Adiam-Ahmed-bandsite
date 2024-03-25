const apiKey = "ad131f42-c497-46c7-9e46-41dca19a8e15";

class BandsiteApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://unit-2-project-api-25c1595833b2.herokuapp.com/';
    }

    async getShowDates() {
        const showEndPoint = 'showdates'
        try {
            const fetchDataResponse = await axios.get(`${this.baseUrl}${showEndPoint}`, {
                params: {
                    api_key: this.apiKey
                }
            });
            return fetchDataResponse.data;
        } catch (error) {
            console.log('Sorry, Show data could not be fetched')
        }
    }
    async getComments() {
        const commentEndPoint = 'comments';
        try {
            const fetchCommentResponse = await axios.get(`${this.baseUrl}${commentEndPoint}`, {
                params: {
                    api_key: this.apiKey
                }
            });
            const fetchCommentDataResponseData = fetchCommentResponse.data;
            fetchCommentDataResponseData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            console.log(fetchCommentDataResponseData)
            return fetchCommentDataResponseData;
        } catch (error) {
            console.log('Sorry, Show data could not be fetched')
        }
    }
    async postComments(userComment) {
        const postCommentEndPoint = 'comments';
        try {
            const postResponse = await axios.post(`${this.baseUrl}${postCommentEndPoint}?api_key=${this.apiKey}`, userComment)
            console.log("Post response:", postResponse.data);
            return postResponse.data;
        } catch (error) {
            console.log('Sorry, data could not be fetched')
        }
    }
};



